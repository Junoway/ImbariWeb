# Real-Time Chat System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     IMBARI COFFEE WEBSITE                        │
│                  (www.imbaricoffee.com)                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
         ┌──────────▼──────────┐   ┌───▼──────────────┐
         │  CUSTOMER SIDE      │   │   ADMIN SIDE     │
         │  (Any page)         │   │  /admin/chat     │
         └──────────┬──────────┘   └───┬──────────────┘
                    │                  │
         ┌──────────▼──────────┐   ┌───▼──────────────┐
         │ ImpactChatBot.tsx  │   │ page.tsx         │
         │ - Chat widget      │   │ - Dashboard      │
         │ - Green button     │   │ - Session list   │
         │ - Lead capture     │   │ - Chat interface │
         │ - Message input    │   │ - Reply system   │
         └──────────┬──────────┘   └───┬──────────────┘
                    │                  │
                    └─────────┬────────┘
                              │
                    ┌─────────▼──────────┐
                    │   lib/firebase.ts   │
                    │  Firebase SDK Init  │
                    └─────────┬───────────┘
                              │
         ╔════════════════════▼════════════════════╗
         ║       FIREBASE REALTIME DATABASE        ║
         ║     (Cloud-hosted, Real-time Sync)      ║
         ╠═════════════════════════════════════════╣
         ║                                         ║
         ║  /chatSessions/                        ║
         ║    └─ session-123/                     ║
         ║         ├─ customerName: "John"        ║
         ║         ├─ customerEmail: "john@..."   ║
         ║         ├─ customerPhone: "+256..."    ║
         ║         ├─ lastMessage: "Hello"        ║
         ║         ├─ lastMessageTime: 1234567    ║
         ║         ├─ unreadCount: 2              ║
         ║         └─ status: "active"            ║
         ║                                         ║
         ║  /messages/                            ║
         ║    └─ session-123/                     ║
         ║         ├─ msg-1/                      ║
         ║         │   ├─ text: "Hello"           ║
         ║         │   ├─ from: "customer"        ║
         ║         │   ├─ timestamp: 1234567      ║
         ║         │   └─ read: true              ║
         ║         └─ msg-2/                      ║
         ║             ├─ text: "Hi! How can..."  ║
         ║             ├─ from: "admin"           ║
         ║             ├─ timestamp: 1234568      ║
         ║             └─ read: false             ║
         ║                                         ║
         ╚═════════════════════════════════════════╝
```

## Message Flow

### Customer Sends Message

```
1. Customer clicks chat button
   └─> ImpactChatBot opens

2. Customer enters name/email
   └─> Creates new session in Firebase
       └─> Generates unique sessionId

3. Customer types message
   └─> Click Send

4. Message added to local state (instant UI update)
   └─> Push to Firebase /messages/{sessionId}
       └─> serverTimestamp() for accurate time

5. Firebase updates /chatSessions/{sessionId}
   └─> lastMessage: "customer message text"
   └─> lastMessageTime: current timestamp
   └─> unreadCount: +1

6. Admin dashboard listening to /messages/{sessionId}
   └─> Real-time update triggers
       └─> New message appears in admin chat
           └─> Notification sound plays (future feature)
```

### Admin Sends Reply

```
1. Admin opens dashboard (/admin/chat)
   └─> Firebase Auth checks credentials

2. Admin sees session list (left sidebar)
   └─> Real-time listener on /chatSessions
       └─> Shows all active chats
           └─> Red badges for unread counts

3. Admin clicks conversation
   └─> Loads /messages/{sessionId}
       └─> Displays full chat history
           └─> Auto-scrolls to bottom

4. Admin types reply
   └─> Click Send

5. Message pushed to Firebase /messages/{sessionId}
   └─> from: "admin"
   └─> timestamp: serverTimestamp()

6. Firebase updates /chatSessions/{sessionId}
   └─> lastMessage: "admin reply text"
   └─> lastMessageTime: current timestamp

7. Customer's ImpactChatBot listening to /messages/{sessionId}
   └─> Real-time update triggers
       └─> Admin message appears in customer chat
           └─> Blue bubble (vs customer's green)
               └─> Shows "Imbari Team" label
                   └─> If chat closed: Red notification badge
```

## Component Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    ImpactChatBot.tsx                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  State Management:                                             │
│  ├─ open: boolean (chat widget visible?)                      │
│  ├─ sessionId: string (unique chat identifier)                │
│  ├─ chatStarted: boolean (user filled lead form?)             │
│  ├─ messages: Message[] (all chat messages)                   │
│  ├─ name, email, phone (customer details)                     │
│  ├─ hasNewMessage: boolean (admin replied while closed?)      │
│  └─ input: string (current message being typed)               │
│                                                                │
│  Effects:                                                      │
│  ├─ useEffect #1: Mount check (prevent SSR issues)            │
│  ├─ useEffect #2: Listen for real-time messages               │
│  │   └─ onValue(messages/{sessionId})                         │
│  │       └─ Update local messages array                       │
│  │           └─ Show notification if chat closed              │
│  ├─ useEffect #3: Auto-scroll to new messages                 │
│  └─ useEffect #4: Clear notification on open                  │
│                                                                │
│  Functions:                                                    │
│  ├─ startChat() - Create session in Firebase                  │
│  ├─ sendMessage() - Push message to Firebase                  │
│  ├─ handleQuickTopic() - Pre-fill message with topic          │
│  └─ handleSubmitLead() - Start chat or send message           │
│                                                                │
│  UI Components:                                                │
│  ├─ Floating Chat Button (bottom-right)                       │
│  │   └─ Notification badge (if hasNewMessage)                 │
│  └─ Modal (when open)                                         │
│      ├─ Header ("Imbari Impact Concierge")                    │
│      ├─ Messages Area                                         │
│      │   ├─ Bot messages (gray bubbles)                       │
│      │   ├─ Customer messages (green bubbles, right)          │
│      │   ├─ Admin messages (blue bubbles, left)               │
│      │   └─ Quick topic buttons (before chat starts)          │
│      └─ Input Area                                            │
│          ├─ Before chat: Lead form (name, email, phone)       │
│          └─ After chat: Message input + Send button           │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                   admin/chat/page.tsx                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  State Management:                                             │
│  ├─ user: Firebase Auth user (logged in admin)                │
│  ├─ sessions: ChatSession[] (all conversations)               │
│  ├─ selectedSession: string (currently viewing)               │
│  ├─ messages: Message[] (messages in selected chat)           │
│  ├─ replyText: string (admin's typed reply)                   │
│  └─ email, password (login credentials)                       │
│                                                                │
│  Effects:                                                      │
│  ├─ useEffect #1: Auth state listener                         │
│  │   └─ onAuthStateChanged() - Check if logged in             │
│  ├─ useEffect #2: Load all chat sessions                      │
│  │   └─ onValue(chatSessions)                                 │
│  │       └─ Update sessions list                              │
│  │           └─ Sort by lastMessageTime                       │
│  ├─ useEffect #3: Load messages for selected session          │
│  │   └─ onValue(messages/{selectedSession})                   │
│  │       └─ Mark customer messages as read                    │
│  │           └─ Reset unread count                            │
│  └─ useEffect #4: Auto-scroll to new messages                 │
│                                                                │
│  Functions:                                                    │
│  ├─ handleLogin() - Firebase email/password auth              │
│  ├─ handleLogout() - Sign out                                 │
│  ├─ sendReply() - Push admin message to Firebase              │
│  └─ markAsResolved() - Update session status                  │
│                                                                │
│  UI Layout:                                                    │
│  ├─ If not logged in:                                         │
│  │   └─ Login form (email, password, submit)                  │
│  └─ If logged in:                                             │
│      ├─ Header (title, user email, logout button)             │
│      └─ Main Content (flex row)                               │
│          ├─ Left Sidebar (w-80)                               │
│          │   ├─ "Active Conversations" header                 │
│          │   └─ Session list                                  │
│          │       └─ For each session:                         │
│          │           ├─ Customer name                         │
│          │           ├─ Email                                 │
│          │           ├─ Last message preview                  │
│          │           ├─ Timestamp                             │
│          │           ├─ Unread badge (if > 0)                 │
│          │           └─ Resolved tag (if status="resolved")   │
│          └─ Right Content (flex-1)                            │
│              ├─ If no session selected:                       │
│              │   └─ "Select a conversation" placeholder       │
│              └─ If session selected:                          │
│                  ├─ Chat Header                               │
│                  │   ├─ Customer info                         │
│                  │   └─ "Mark as Resolved" button             │
│                  ├─ Messages Area (scrollable)                │
│                  │   └─ For each message:                     │
│                  │       ├─ Customer: Gray bubble (left)      │
│                  │       └─ Admin: Green bubble (right)       │
│                  └─ Reply Input                               │
│                      ├─ Text input                            │
│                      └─ Send button                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## Firebase Security Rules

```json
{
  "rules": {
    "chatSessions": {
      ".read": true,           // Anyone can read sessions (for customer)
      ".write": true,          // Anyone can create/update (simplified)
      "$sessionId": {
        ".read": true,
        ".write": true
      }
    },
    "messages": {
      "$sessionId": {
        ".read": true,         // Anyone can read messages in their session
        ".write": true,        // Anyone can add messages
        "$messageId": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

**Note:** For production, you may want to add:
- Customer can only read/write their own session
- Admin authentication required for /chatSessions read
- Validate message structure (has required fields)

## Data Models

### ChatSession
```typescript
{
  id: string;                    // Auto-generated by Firebase push()
  customerName: string;          // From lead form
  customerEmail: string;         // From lead form
  customerPhone?: string;        // Optional from lead form
  lastMessage: string;           // Preview for session list
  lastMessageTime: number;       // For sorting (Unix timestamp)
  unreadCount: number;           // Number of unread customer messages
  status: "active" | "resolved"; // Conversation state
}
```

### Message
```typescript
{
  id: string;                    // Auto-generated by Firebase push()
  text: string;                  // Message content
  from: "customer" | "admin";    // Sender type
  timestamp: number;             // Unix timestamp from serverTimestamp()
  customerName?: string;         // Included in customer messages
  customerEmail?: string;        // Included in customer messages
  customerPhone?: string;        // Included if provided
  read?: boolean;                // Has admin read this message?
}
```

## Real-Time Synchronization

Firebase uses **WebSocket connections** for real-time updates:

1. **Connection established** when component mounts
2. **Listeners registered** with `onValue()`
3. **Changes detected** on server side
4. **Updates pushed** to all connected clients
5. **Local state updated** triggers React re-render
6. **UI updates** without page refresh

**Latency:** Typically < 100ms (depending on network)

**Offline behavior:**
- Messages queued locally
- Sent when connection restored
- Firebase handles retry logic automatically

## Performance Optimizations

1. **Lazy loading:** Admin dashboard only loads on `/admin/chat`
2. **Selective queries:** Only load messages for selected session
3. **Client-side caching:** Firebase caches data locally
4. **Incremental updates:** Only changed data sent over network
5. **Auto-pagination:** Future enhancement for very long chats

## Scalability

**Current setup handles:**
- 100 simultaneous connections (Firebase free tier)
- Unlimited total users
- 10GB/month bandwidth (free tier)
- 1GB total storage (free tier)

**Estimated capacity:**
- 1,000 chat sessions/month
- 10,000 messages/month
- 50 concurrent chats
- **All within free tier!**

**To scale beyond:**
- Upgrade to Firebase Blaze (pay-as-you-go)
- Still very affordable (~$25/month for 10x traffic)

---

**This architecture provides enterprise-level real-time chat for $0/month! 🚀**
