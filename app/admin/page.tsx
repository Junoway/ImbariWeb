"use client";

import { useState, useEffect, useRef } from "react";
import { database, auth } from "@/lib/firebase";
import { ref, onValue, push, set, update, serverTimestamp, query, orderByChild } from "firebase/database";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Types
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

type Review = {
  id: string;
  productId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  timestamp: number;
  response?: string;
  responseTimestamp?: number;
  status?: 'pending' | 'responded';
};

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"chats" | "reviews">("chats");
  
  // Chat state
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatReply, setChatReply] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Review state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [reviewReply, setReviewReply] = useState("");

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

    const sessionsRef = ref(database, "chats");
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
        sessionList.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
        setSessions(sessionList);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Load messages for selected session
  useEffect(() => {
    if (!selectedSession || !user || !database) return;

    const messagesRef = ref(database, `chats/${selectedSession}/messages`);
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
          const db = database;
          messageList.forEach((msg) => {
            if (msg.from === "customer" && !msg.read) {
              const msgRef = ref(db, `chats/${selectedSession}/messages/${msg.id}`);
              set(msgRef, { ...msg, read: true });
            }
          });
          
          const sessionRef = ref(db, `chats/${selectedSession}`);
          const session = sessions.find(s => s.id === selectedSession);
          if (session) {
            update(sessionRef, { unreadCount: 0 });
          }
        }
      }
    });

    return () => unsubscribe();
  }, [selectedSession, user]);

  // Load all reviews
  useEffect(() => {
    if (!user || !database) return;

    const reviewsRef = ref(database, "reviews");
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewList: Review[] = [];
        
        Object.entries(data).forEach(([productId, productReviews]: [string, any]) => {
          Object.entries(productReviews).forEach(([reviewId, review]: [string, any]) => {
            reviewList.push({
              id: reviewId,
              productId,
              name: review.name,
              email: review.email,
              rating: review.rating,
              comment: review.comment,
              timestamp: review.timestamp,
              response: review.response,
              responseTimestamp: review.responseTimestamp,
              status: review.status || 'pending',
            });
          });
        });

        reviewList.sort((a, b) => b.timestamp - a.timestamp);
        setReviews(reviewList);
      }
    });

    return () => unsubscribe();
  }, [user]);

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
    setSelectedReview(null);
  };

  const sendChatReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatReply.trim() || !selectedSession || !database) return;

    const messagesRef = ref(database, `chats/${selectedSession}/messages`);
    const newMessageRef = push(messagesRef);
    
    await set(newMessageRef, {
      text: chatReply.trim(),
      from: "admin",
      timestamp: serverTimestamp(),
      read: false,
    });

    const session = sessions.find(s => s.id === selectedSession);
    if (session) {
      const sessionRef = ref(database, `chats/${selectedSession}`);
      await update(sessionRef, {
        lastMessage: chatReply.trim(),
        lastMessageTime: Date.now(),
      });
    }

    setChatReply("");
  };

  const markChatAsResolved = async (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session || !database) return;
    
    const sessionRef = ref(database, `chats/${sessionId}`);
    await update(sessionRef, { status: "resolved" });
  };

  const sendReviewResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewReply.trim() || !selectedReview || !database) return;

    const review = reviews.find(r => r.id === selectedReview);
    if (!review) return;

    const reviewRef = ref(database, `reviews/${review.productId}/${review.id}`);
    await update(reviewRef, {
      response: reviewReply.trim(),
      responseTimestamp: Date.now(),
      status: 'responded',
    });

    setReviewReply("");
    setSelectedReview(null);
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
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-emerald-400 mb-2">Imbari Admin</h1>
            <p className="text-imbari-coffee-brown">Unified Dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-white font-semibold">Email</label>
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
              <label className="text-sm text-white font-semibold">Password</label>
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
      <div className="bg-black/30 border-b border-white/10 px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 lg:max-w-7xl lg:mx-auto">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-emerald-400">Imbari Coffee Admin</h1>
            <p className="text-xs md:text-sm text-imbari-coffee-brown">Manage Chats, Reviews & Analytics</p>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-sm md:text-base text-white truncate">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 md:px-4 py-2 rounded-lg transition border border-red-500/30 text-sm whitespace-nowrap"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-black/20 border-b border-white/10">
        <div className="lg:max-w-7xl lg:mx-auto px-4 md:px-6">
          <div className="flex gap-1 md:gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("chats")}
              className={`px-4 md:px-6 py-3 font-semibold transition whitespace-nowrap text-sm md:text-base ${
                activeTab === "chats"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-white hover:text-white"
              }`}
            >
              💬 <span className="hidden sm:inline">Live </span>Chats
              {sessions.filter(s => s.unreadCount > 0).length > 0 && (
                <span className="ml-2 bg-emerald-500 text-black text-xs font-bold rounded-full px-2 py-0.5">
                  {sessions.filter(s => s.unreadCount > 0).length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 md:px-6 py-3 font-semibold transition whitespace-nowrap text-sm md:text-base ${
                activeTab === "reviews"
                  ? "text-emerald-400 border-b-2 border-emerald-400"
                  : "text-white hover:text-white"
              }`}
            >
              ⭐ <span className="hidden sm:inline">Product </span>Reviews
              {reviews.filter(r => r.status === 'pending').length > 0 && (
                <span className="ml-2 bg-yellow-500 text-black text-xs font-bold rounded-full px-2 py-0.5">
                  {reviews.filter(r => r.status === 'pending').length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === "chats" ? (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] lg:h-[calc(100vh-160px)]">
          {/* Chat Sessions Sidebar */}
          <div className={`w-full lg:w-80 bg-black/20 border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto ${selectedSession ? 'hidden lg:block' : 'block'}`}>
            <div className="p-4 border-b border-white/10 sticky top-0 bg-black/30 backdrop-blur">
              <h2 className="text-base md:text-lg font-bold text-white">Active Conversations</h2>
              <p className="text-xs text-white mt-1">
                {sessions.filter(s => s.status === "active").length} active chats
              </p>
            </div>
            
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session.id)}
                className={`p-3 md:p-4 border-b border-white/5 cursor-pointer transition ${
                  selectedSession === session.id
                    ? "bg-emerald-500/20 border-l-4 border-l-emerald-400"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-white text-sm md:text-base">{session.customerName}</h3>
                  {session.unreadCount > 0 && (
                    <span className="bg-emerald-500 text-black text-xs font-bold rounded-full px-2 py-0.5 flex-shrink-0">
                      {session.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-imbari-coffee-brown truncate mb-1">{session.customerEmail}</p>
                <p className="text-xs md:text-sm text-imbari-coffee-brown truncate">{session.lastMessage}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-neutral-500">
                    {new Date(session.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
              <div className="p-8 text-center text-white text-sm">
                No conversations yet
              </div>
            )}
          </div>

          {/* Chat Messages */}
          <div className={`flex-1 flex flex-col ${selectedSession ? 'block' : 'hidden lg:flex'}`}>
            {selectedSession ? (
              <>
                <div className="bg-black/20 border-b border-white/10 p-3 md:p-4">
                  {(() => {
                    const session = sessions.find(s => s.id === selectedSession);
                    return session ? (
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedSession(null)}
                            className="lg:hidden bg-white/10 hover:bg-white/20 p-2 rounded-lg transition"
                          >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-white">{session.customerName}</h3>
                            <p className="text-xs md:text-sm text-imbari-coffee-brown">{session.customerEmail}</p>
                            {session.customerPhone && (
                              <p className="text-xs md:text-sm text-emerald-400">📱 {session.customerPhone}</p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => markChatAsResolved(selectedSession)}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 md:px-4 py-2 rounded-lg transition border border-green-500/30 text-xs md:text-sm whitespace-nowrap"
                        >
                          Mark Resolved
                        </button>
                      </div>
                    ) : null;
                  })()}
                </div>

                <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.from === "admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[70%] rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                          msg.from === "admin"
                            ? "bg-emerald-500 text-black"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.from === "admin" ? "text-black/60" : "text-white"}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={sendChatReply} className="bg-black/20 border-t border-white/10 p-3 md:p-4">
                  <div className="flex gap-2 md:gap-3">
                    <input
                      type="text"
                      value={chatReply}
                      onChange={(e) => setChatReply(e.target.value)}
                      placeholder="Type your response..."
                      className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg transition text-sm md:text-base whitespace-nowrap"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 hidden lg:flex items-center justify-center text-white text-sm md:text-base px-4">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] lg:h-[calc(100vh-160px)]">
          {/* Reviews List */}
          <div className={`w-full lg:w-80 bg-black/20 border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto ${selectedReview ? 'hidden lg:block' : 'block'}`}>
            <div className="p-4 border-b border-white/10 sticky top-0 bg-black/30 backdrop-blur">
              <h2 className="text-base md:text-lg font-bold text-white">Product Reviews</h2>
              <p className="text-xs text-white mt-1">
                {reviews.filter(r => r.status === 'pending').length} pending responses
              </p>
            </div>
            
            {reviews.map((review) => (
              <div
                key={review.id}
                onClick={() => setSelectedReview(review.id)}
                className={`p-3 md:p-4 border-b border-white/5 cursor-pointer transition ${
                  selectedReview === review.id
                    ? "bg-emerald-500/20 border-l-4 border-l-emerald-400"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-white text-sm md:text-base truncate flex-1">{review.name}</h3>
                  <div className="flex gap-0.5 flex-shrink-0 ml-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-imbari-coffee-brown truncate mb-1">Product: {review.productId}</p>
                <p className="text-xs md:text-sm text-imbari-coffee-brown truncate mb-2">{review.comment}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neutral-500">
                    {new Date(review.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                  {review.status === 'responded' ? (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                      Responded
                    </span>
                  ) : (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {reviews.length === 0 && (
              <div className="p-8 text-center text-white text-sm">
                No reviews yet
              </div>
            )}
          </div>

          {/* Review Details */}
          <div className={`flex-1 flex flex-col ${selectedReview ? 'block' : 'hidden lg:flex'}`}>
            {selectedReview ? (
              <>
                {(() => {
                  const review = reviews.find(r => r.id === selectedReview);
                  return review ? (
                    <>
                      <div className="bg-black/20 border-b border-white/10 p-3 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => setSelectedReview(null)}
                              className="lg:hidden bg-white/10 hover:bg-white/20 p-2 rounded-lg transition flex-shrink-0"
                            >
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <div className="flex-1">
                              <h3 className="text-lg md:text-xl font-bold text-white">{review.name}</h3>
                              <p className="text-xs md:text-sm text-imbari-coffee-brown break-all">{review.email}</p>
                              <p className="text-xs md:text-sm text-emerald-400 mt-1">Product: {review.productId}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5 flex-shrink-0">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={`text-xl md:text-2xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6">
                        <div className="bg-white/10 rounded-2xl p-4 md:p-6">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-sm md:text-base flex-shrink-0">
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-imbari-coffee-brown leading-relaxed text-sm md:text-base break-words">{review.comment}</p>
                              <p className="text-xs text-white mt-2">
                                {new Date(review.timestamp).toLocaleString([], { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                          </div>
                        </div>

                        {review.response && (
                          <div className="bg-emerald-500/20 rounded-2xl p-4 md:p-6 border border-emerald-500/30">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-400 flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 md:w-6 md:h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs md:text-sm font-semibold text-emerald-400 mb-1">Imbari Team Response</div>
                                <p className="text-imbari-coffee-brown leading-relaxed text-sm md:text-base break-words">{review.response}</p>
                                <p className="text-xs text-white mt-2">
                                  {new Date(review.responseTimestamp || Date.now()).toLocaleString([], { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <form onSubmit={sendReviewResponse} className="bg-black/20 border-t border-white/10 p-3 md:p-6">
                        <div className="flex gap-2 md:gap-3">
                          <input
                            type="text"
                            value={reviewReply}
                            onChange={(e) => setReviewReply(e.target.value)}
                            placeholder={review.response ? "Update response..." : "Type your response..."}
                            className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                          />
                          <button
                            type="submit"
                            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg transition text-sm md:text-base whitespace-nowrap"
                          >
                            {review.response ? 'Update' : 'Send'}
                          </button>
                        </div>
                      </form>
                    </>
                  ) : null;
                })()}
              </>
            ) : (
              <div className="flex-1 hidden lg:flex items-center justify-center text-white text-sm md:text-base px-4">
                Select a review to view details and respond
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}





