"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { database } from "@/lib/firebase";
import { ref, push, set, update, onValue, serverTimestamp, query, orderByChild } from "firebase/database";

type Message = {
  id?: string;
  from: "customer" | "admin" | "bot";
  text: string;
  timestamp?: number;
};

const QUICK_TOPICS = [
  "Exporting Imbari Coffee to my country",
  "Ordering instant coffee for supermarkets",
  "Women & farmer empowerment programs",
  "White label / private label partnership",
  "Bulk orders for hotels & cafés",
];

export default function ImpactChatBot() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [chatStarted, setChatStarted] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for session status (resolved by admin)
  useEffect(() => {
    if (!sessionId || !chatStarted || !database) return;

    const sessionRef = ref(database, `chats/${sessionId}`);
    
    const unsubscribe = onValue(sessionRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.status === "resolved") {
        // Admin marked as resolved - close chat and reset
        setOpen(false);
        setMessages([]);
        setChatStarted(false);
        setSessionId(null);
        setName("");
        setEmail("");
        setPhone("");
        setInput("");
      }
    });

    return () => unsubscribe();
  }, [sessionId, chatStarted]);

  // Listen for real-time messages from admin
  useEffect(() => {
    if (!sessionId || !chatStarted || !database) return;

    const messagesRef = ref(database, `chats/${sessionId}/messages`);
    const messagesQuery = query(messagesRef, orderByChild("timestamp"));
    
    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList: Message[] = Object.entries(data).map(([id, msg]: [string, any]) => ({
          id,
          text: msg.text,
          from: msg.from,
          timestamp: msg.timestamp,
        }));
        messageList.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        
        setMessages(messageList);
        
        // Show notification for new admin messages when chat is closed
        const hasAdminMessage = messageList.some(m => m.from === "admin" && !m.id?.includes("read"));
        if (hasAdminMessage && !open) {
          setHasNewMessage(true);
        }
      }
    });

    return () => unsubscribe();
  }, [sessionId, chatStarted]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Clear notification when opening chat
  useEffect(() => {
    if (open) {
      setHasNewMessage(false);
    }
  }, [open]);

  const startChat = async () => {
    if (!name || !email) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Please provide your name and email to start chatting with our team.",
        },
      ]);
      return;
    }

    if (!database) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Chat service is currently unavailable. Please try again later.",
        },
      ]);
      return;
    }

    try {
      // Create new chat session
      const sessionsRef = ref(database, "chats");
      console.log('🔥 Creating session at path:', 'chats');
      const newSessionRef = push(sessionsRef);
      const newSessionId = newSessionRef.key;

      if (!newSessionId) return;

      console.log('🔥 Session ID created:', newSessionId);
      await set(newSessionRef, {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        lastMessage: "Chat started",
        lastMessageTime: Date.now(),
        unreadCount: 0,
        status: "active",
      });
      console.log('✅ Session created successfully at chats/' + newSessionId);

      setSessionId(newSessionId);
      setChatStarted(true);

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `Thanks ${name}! You're now connected to our team. They'll respond shortly. Feel free to share your questions below.`,
        },
      ]);
    } catch (error) {
      console.error("Error starting chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, we couldn't connect right now. Please try again or email us at info@imbaricoffee.com",
        },
      ]);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || !sessionId || !database) return;

    const messageText = text.trim();
    
    // Add message to local state immediately
    setMessages((prev) => [
      ...prev,
      { from: "customer", text: messageText },
    ]);
    setInput("");

    try {
      // Send to Firebase
      const messagesRef = ref(database, `chats/${sessionId}/messages`);
      console.log('🔥 Sending message to path:', `chats/${sessionId}/messages`);
      const newMessageRef = push(messagesRef);
      
      await set(newMessageRef, {
        text: messageText,
        from: "customer",
        timestamp: serverTimestamp(),
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        read: false,
      });
      console.log('✅ Message sent successfully');

      // Update session (use update to preserve messages)
      const sessionRef = ref(database, `chats/${sessionId}`);
      await update(sessionRef, {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        lastMessage: messageText,
        lastMessageTime: Date.now(),
        unreadCount: 1,
        status: "active",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Message failed to send. Please check your connection and try again.",
        },
      ]);
    }
  };

  const addUserMessage = (text: string) => {
    if (!chatStarted) {
      setInput(text);
      return;
    }
    sendMessage(text);
  };

  const handleQuickTopic = (topic: string) => {
    if (!chatStarted) {
      setInput(topic);
      return;
    }
    sendMessage(topic);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatStarted) {
      startChat();
      return;
    }

    if (!input.trim()) return;
    sendMessage(input);
  };

  // --- MODAL CONTENT (CENTERED, NOT COVERING NAVBAR) ---
  const modalContent = open ? (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-end bg-black/70 backdrop-blur-sm"
      style={{ pointerEvents: "auto", paddingTop: "72px", paddingRight: "max(2vw,16px)", paddingBottom: "max(2vw,16px)" }} // 72px to avoid navbar
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-br from-[#0a1813] via-[#050403] to-black border border-emerald-500/40 shadow-2xl shadow-emerald-500/25 flex flex-col max-h-[90vh] overflow-hidden animate-fade-in scale-105 md:scale-100 md:mx-8 lg:mx-0 mr-0 mb-0">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-gradient-to-r from-emerald-500/20 via-emerald-400/10 to-transparent">
          <div>
            <h2 className="text-lg font-extrabold text-emerald-300 tracking-wider uppercase mb-1 drop-shadow-lg">
              Imbari Impact Concierge
            </h2>
            <p className="text-sm text-white font-medium">
              Talk to us about sourcing, impact, and partnerships.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition text-white text-xl font-bold shadow"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-3 text-[15px] bg-black/30 scrollbar-thin scrollbar-thumb-emerald-700/30 scrollbar-track-transparent">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${
                m.from === "customer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-2.5 leading-snug shadow-lg ${
                  m.from === "customer"
                    ? "bg-emerald-500 text-black"
                    : m.from === "admin"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white"
                }`}
              >
                {m.from === "admin" && (
                  <div className="text-xs font-semibold mb-1 opacity-80">
                    Imbari Team
                  </div>
                )}
                {m.text}
                {m.timestamp && (
                  <div className={`text-xs mt-1 ${m.from === "customer" ? "text-black/60" : "text-white/60"}`}>
                    {new Date(m.timestamp).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Lead Capture Form / Message Input */}
        <form
          onSubmit={handleSubmitLead}
          className="border-t border-white/10 px-8 py-6 space-y-4 bg-black/60"
        >
          {!chatStarted ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white font-semibold">
                    Name *
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg bg-black/70 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition placeholder:text-neutral-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-white font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-lg bg-black/70 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition placeholder:text-neutral-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white font-semibold">
                  WhatsApp / Phone (optional)
                </label>
                <input
                  className="mt-1 w-full rounded-lg bg-black/70 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition placeholder:text-neutral-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+256..."
                  autoComplete="tel"
                />
              </div>

              <div>
                <label className="text-xs text-white font-semibold">
                  How can we help? (optional)
                </label>
                <select
                  className="mt-1 w-full rounded-lg bg-black/70 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                >
                  <option value="">Select a topic or type your own below...</option>
                  {QUICK_TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-white font-semibold">
                  Additional details (optional)
                </label>
                <textarea
                  className="mt-1 w-full rounded-lg bg-black/70 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition resize-none placeholder:text-neutral-500"
                  rows={3}
                  value={input && !QUICK_TOPICS.includes(input) ? input : ""}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tell us more about your needs..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="block mx-auto w-full max-w-[240px] rounded-xl bg-emerald-400 text-base font-bold text-black py-3 px-6 mt-2 hover:bg-emerald-300 transition disabled:opacity-60 shadow-lg shadow-emerald-400/20"
              >
                {submitting ? "Connecting..." : "Start Chat"}
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg bg-black/70 border border-white/15 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition placeholder:text-neutral-500"
                autoFocus
              />
              <button
                type="submit"
                className="bg-emerald-400 hover:bg-emerald-300 text-black font-bold px-6 py-3 rounded-lg transition shadow-lg shadow-emerald-400/20"
              >
                Send
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* FLOATING CHAT BUTTON – BOTTOM RIGHT */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ position: 'fixed', bottom: 16, right: 16, left: 'auto', top: 'auto' }}
        className="!fixed !bottom-4 !right-4 !z-50 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 transition relative"
        aria-label="Chat with Imbari Coffee"
      >
        {/* Notification Badge */}
        {hasNewMessage && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
            !
          </span>
        )}
        
        {/* Chat Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#020617"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4 8.5 8.5 0 0 1-6.6 3.1 8.38 8.38 0 0 1-5.4-1.9L3 20.5l1.4-4.1A8.38 8.38 0 0 1 2.5 11c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      </button>

      {/* Only render portal on client after mount */}
      {mounted && open && createPortal(modalContent, document.body)}
    </>
  );
}




