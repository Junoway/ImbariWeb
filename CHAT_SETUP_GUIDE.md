# Real-Time Chat System Setup Guide

## Overview
The Imbari Impact Concierge now features real-time chat with Firebase, allowing your support team to respond to customers instantly.

## Features
- ✅ Real-time messaging between customers and support team
- ✅ Admin dashboard for support team responses
- ✅ Visual notifications for new messages
- ✅ Chat history and session management
- ✅ Customer contact information capture
- ✅ Mark conversations as resolved
- ✅ Mobile responsive design

## Firebase Setup (5 minutes)

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Name it: `imbari-coffee-chat`
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Add Web App
1. In Firebase Console, click the web icon `</>`
2. App nickname: `Imbari Coffee Website`
3. Don't check "Firebase Hosting"
4. Click "Register app"
5. **Copy the firebaseConfig object** (you'll need these values)

### 3. Enable Realtime Database
1. In left sidebar, go to **Build > Realtime Database**
2. Click "Create Database"
3. Choose location: `us-central1` (or closest to Uganda)
4. Start in **test mode** (we'll secure it later)
5. Click "Enable"

### 4. Set Database Rules
Click on "Rules" tab and replace with:

```json
{
  "rules": {
    "chatSessions": {
      ".read": true,
      ".write": true,
      "$sessionId": {
        ".read": true,
        ".write": true
      }
    },
    "messages": {
      ".read": true,
      ".write": true,
      "$sessionId": {
        ".read": true,
        ".write": true,
        "$messageId": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

Click "Publish"

### 5. Enable Authentication
1. Go to **Build > Authentication**
2. Click "Get started"
3. Click "Email/Password" provider
4. Enable "Email/Password"
5. Click "Save"

### 6. Create Admin User
1. Still in Authentication, go to "Users" tab
2. Click "Add user"
3. Email: `imbaricoffee@gmail.com`
4. Password: Create a secure password (save it!)
5. Click "Add user"

## Environment Configuration

### 1. Update .env.local
Copy `.env.local.example` to `.env.local` if you haven't:

```bash
cp .env.local.example .env.local
```

### 2. Add Firebase Config
Open `.env.local` and add your Firebase values from step 2:

```env
# Firebase Configuration (from Firebase Console > Project Settings > Your apps)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=imbari-coffee-chat.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://imbari-coffee-chat-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=imbari-coffee-chat
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=imbari-coffee-chat.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Admin Email (for reference)
NEXT_PUBLIC_ADMIN_EMAIL=imbaricoffee@gmail.com
```

### 3. Keep Existing EmailJS Config
Make sure your existing EmailJS config is still there:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_aos7b6k
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_4dwwm4r
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YuQPIzjB3KW9rrpBc
```

## Testing Locally

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Customer Chat
1. Open http://localhost:3000
2. Click the green chat button (bottom right)
3. Fill in name, email (optional phone)
4. Click "Start Chat"
5. Send a test message

### 3. Test Admin Dashboard
1. Open http://localhost:3000/admin/chat in a NEW incognito/private window
2. Login with:
   - Email: `imbaricoffee@gmail.com`
   - Password: (the one you created in Firebase)
3. You should see the customer's chat session
4. Click on the session
5. Reply to the message

### 4. Verify Real-Time
1. Go back to the customer window
2. You should see the admin's reply appear automatically
3. Send another message from customer
4. It should appear in admin dashboard immediately

## Admin Dashboard Access

### For Your Support Team:

**URL:** `https://www.imbaricoffee.com/admin/chat`

**Login Credentials:**
- Email: `imbaricoffee@gmail.com`
- Password: (the secure password you created)

### Add More Admin Users:
1. Go to Firebase Console > Authentication > Users
2. Click "Add user"
3. Enter team member's email and password
4. Share credentials securely

## How It Works

### For Customers:
1. Click the green chat button on any page
2. Enter name and email to start
3. Type messages and get instant responses
4. Chat history is saved even if they close and reopen
5. Red notification badge when support team replies

### For Support Team:
1. Login to `/admin/chat` dashboard
2. See all active conversations in left sidebar
3. Unread messages show a badge
4. Click a conversation to view and reply
5. Type response and click "Send"
6. Customer receives message instantly
7. Mark conversations as "Resolved" when done

## Features Overview

### Customer Chat Widget:
- **Before Chat Starts:**
  - Welcome message from bot
  - Quick topic buttons
  - Lead capture form (name, email, phone)
  
- **During Chat:**
  - Real-time messaging
  - Message timestamps
  - "Typing..." indicator (future)
  - Chat history persists
  - Notification badge for new admin messages

### Admin Dashboard:
- **Session Management:**
  - List of all conversations
  - Sort by most recent
  - Unread message count
  - Active/Resolved status
  
- **Chat Interface:**
  - Customer info (name, email, phone)
  - Full message history
  - Send instant replies
  - Mark as resolved
  - Auto-scroll to new messages

## Production Deployment

### 1. Update Database Rules (Important!)
Before deploying to production, secure your database:

```json
{
  "rules": {
    "chatSessions": {
      ".read": "auth != null",
      ".write": true,
      "$sessionId": {
        ".read": true,
        ".write": true
      }
    },
    "messages": {
      "$sessionId": {
        ".read": true,
        ".write": true,
        "$messageId": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

### 2. Add to GitHub Secrets
In GitHub repository settings > Secrets and variables > Actions:

Add each Firebase config value as a secret:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### 3. Update next.config.ts
Make sure environment variables are exposed:

```typescript
env: {
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}
```

### 4. Deploy
```bash
git add .
git commit -m "Add real-time chat with Firebase"
git push origin main
```

## Monitoring

### View Chat Sessions:
Firebase Console > Realtime Database > Data

You'll see:
```
chatSessions/
  - session123/
    - customerName: "John Doe"
    - customerEmail: "john@example.com"
    - customerPhone: "+256..."
    - lastMessage: "..."
    - lastMessageTime: 1234567890
    - status: "active"
    - unreadCount: 2

messages/
  - session123/
    - msg1/
      - text: "Hello"
      - from: "customer"
      - timestamp: 1234567890
    - msg2/
      - text: "Hi! How can I help?"
      - from: "admin"
      - timestamp: 1234567891
```

## Troubleshooting

### Chat button not appearing
- Check browser console for errors
- Verify Firebase config in .env.local
- Make sure `ImpactChatBot` is imported in layout.tsx

### Messages not sending
- Check Firebase Realtime Database rules
- Verify database URL is correct
- Check browser network tab for 403 errors

### Admin can't login
- Verify user exists in Firebase Authentication
- Check email/password are correct
- Look for auth errors in browser console

### Messages not appearing in real-time
- Verify database rules allow read/write
- Check that database URL ends with `.firebaseio.com`
- Refresh both customer and admin windows

## Cost Estimate

Firebase Free Tier (Spark Plan):
- ✅ Realtime Database: 1GB storage, 10GB/month download
- ✅ Authentication: Unlimited users
- ✅ 100 simultaneous connections
- ✅ **Cost: $0/month** for typical usage

Estimated capacity:
- ~1,000 chat sessions/month
- ~10,000 messages/month
- ~50 concurrent chats

**You won't need to pay unless you get massive traffic!**

## Future Enhancements

Potential additions:
- [ ] Email notifications when customer sends message
- [ ] Browser push notifications for admin
- [ ] Typing indicators
- [ ] File/image upload
- [ ] Chat transcripts sent to customer email
- [ ] Auto-responses for common questions
- [ ] Chat analytics dashboard
- [ ] Multi-language support
- [ ] Voice messages
- [ ] Video chat integration

## Support

For issues with setup, contact your developer or check:
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Community: https://stackoverflow.com/questions/tagged/firebase

---

**Ready to connect with your customers in real-time! ☕💬**
