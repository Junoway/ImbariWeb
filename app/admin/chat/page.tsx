"use client";

import { useState, useEffect, useRef } from "react";
import { database, auth } from "@/lib/firebase";
import { ref, onValue, push, set, serverTimestamp, query, orderByChild } from "firebase/database";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

type Message = {
  id: string;
  text: string;
  from: "customer" | "admin";
  timestamp: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  read?: boolean;
};

type ChatSession = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  status: "active" | "resolved";
};

export default function AdminChatDashboard() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check authentication state
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load chat sessions
  useEffect(() => {
    if (!user || !database) return;

    const sessionsRef = ref(database, "chatSessions");
    const unsubscribe = onValue(sessionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sessionList: ChatSession[] = Object.entries(data).map(([id, session]: [string, any]) => ({
          id,
          customerName: session.customerName || "Anonymous",
          customerEmail: session.customerEmail || "",
          customerPhone: session.customerPhone || "",
          lastMessage: session.lastMessage || "",
          lastMessageTime: session.lastMessageTime || 0,
          unreadCount: session.unreadCount || 0,
          status: session.status || "active",
        }));
        // Sort by most recent message
        sessionList.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
        setSessions(sessionList);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Load messages for selected session
  useEffect(() => {
    if (!selectedSession || !user || !database) return;

    const messagesRef = ref(database, `messages/${selectedSession}`);
    const messagesQuery = query(messagesRef, orderByChild("timestamp"));
    
    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList: Message[] = Object.entries(data).map(([id, msg]: [string, any]) => ({
          id,
          text: msg.text,
          from: msg.from,
          timestamp: msg.timestamp,
          customerName: msg.customerName,
          customerEmail: msg.customerEmail,
          customerPhone: msg.customerPhone,
          read: msg.read,
        }));
        messageList.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messageList);
        
        // Mark messages as read
        if (database) {
          const db = database; // Type narrowing for TypeScript
          messageList.forEach((msg) => {
            if (msg.from === "customer" && !msg.read) {
              const msgRef = ref(db, `messages/${selectedSession}/${msg.id}`);
              set(msgRef, { ...msg, read: true });
            }
          });
          
          // Reset unread count
          const sessionRef = ref(db, `chatSessions/${selectedSession}`);
          const session = sessions.find(s => s.id === selectedSession);
          if (session) {
            set(sessionRef, { ...session, unreadCount: 0 });
          }
        }
      }
    });

    return () => unsubscribe();
  }, [selectedSession, user]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setSelectedSession(null);
  };

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedSession || !database) return;

    const messagesRef = ref(database, `messages/${selectedSession}`);
    const newMessageRef = push(messagesRef);
    
    await set(newMessageRef, {
      text: replyText.trim(),
      from: "admin",
      timestamp: serverTimestamp(),
      read: false,
    });

    // Update session last message
    const session = sessions.find(s => s.id === selectedSession);
    if (session) {
      const sessionRef = ref(database, `chatSessions/${selectedSession}`);
      await set(sessionRef, {
        ...session,
        lastMessage: replyText.trim(),
        lastMessageTime: Date.now(),
      });
    }

    setReplyText("");
  };

  const markAsResolved = async (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session || !database) return;
    
    // TODO: Email backend will work when deployed to Vercel (not GitHub Pages)
    // For now, just mark as resolved - email system ready for future deployment
    
    // Mark session as resolved
    const sessionRef = ref(database, `chatSessions/${sessionId}`);
    await set(sessionRef, { ...session, status: "resolved" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Imbari Admin</h1>
          <p className="text-neutral-300 mb-6">Support Team Chat Dashboard</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-neutral-400 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/20 px-4 py-3 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                placeholder="admin@imbaricoffee.com"
                required
              />
            </div>
            
            <div>
              <label className="text-sm text-neutral-400 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/20 px-4 py-3 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-lg transition"
            >
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Header */}
      <div className="bg-black/30 border-b border-white/10 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400">Imbari Impact Concierge</h1>
            <p className="text-sm text-neutral-400">Support Team Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-300">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition border border-red-500/30"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat Sessions Sidebar */}
        <div className="w-80 bg-black/20 border-r border-white/10 overflow-y-auto">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">Active Conversations</h2>
            <p className="text-xs text-neutral-400 mt-1">
              {sessions.filter(s => s.status === "active").length} active chats
            </p>
          </div>
          
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelectedSession(session.id)}
              className={`p-4 border-b border-white/5 cursor-pointer transition ${
                selectedSession === session.id
                  ? "bg-emerald-500/20 border-l-4 border-l-emerald-400"
                  : "hover:bg-white/5"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-white">{session.customerName}</h3>
                {session.unreadCount > 0 && (
                  <span className="bg-emerald-500 text-black text-xs font-bold rounded-full px-2 py-0.5">
                    {session.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 truncate mb-1">{session.customerEmail}</p>
              <p className="text-sm text-neutral-300 truncate">{session.lastMessage}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-neutral-500">
                  {new Date(session.lastMessageTime).toLocaleTimeString()}
                </span>
                {session.status === "resolved" && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                    Resolved
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {sessions.length === 0 && (
            <div className="p-8 text-center text-neutral-400">
              No conversations yet. Waiting for customers...
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col">
          {selectedSession ? (
            <>
              {/* Chat Header */}
              <div className="bg-black/20 border-b border-white/10 p-4">
                {(() => {
                  const session = sessions.find(s => s.id === selectedSession);
                  return session ? (
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold text-white">{session.customerName}</h3>
                        <p className="text-sm text-neutral-400">{session.customerEmail}</p>
                        {session.customerPhone && (
                          <p className="text-sm text-emerald-400">📱 {session.customerPhone}</p>
                        )}
                      </div>
                      <button
                        onClick={() => markAsResolved(selectedSession)}
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg transition border border-green-500/30"
                      >
                        Mark as Resolved
                      </button>
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.from === "admin"
                          ? "bg-emerald-500 text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.from === "admin" ? "text-black/60" : "text-neutral-400"}`}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Form */}
              <form onSubmit={sendReply} className="bg-black/20 border-t border-white/10 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-lg transition"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-neutral-400">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
