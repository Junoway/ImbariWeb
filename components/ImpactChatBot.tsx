"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type Message = {
  from: "bot" | "user";
  text: string;
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
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Welcome to Imbari Coffee. How can we help you today?",
    },
    {
      from: "bot",
      text:
        "We connect African farms to global buyers, empower women in coffee, and move Imbari across Africa and worldwide.",
    },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addUserMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: text.trim() }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Thank you for sharing. Our team will review this and contact you by email or WhatsApp with next steps.",
        },
      ]);
    }, 400);
  };

  const handleQuickTopic = (topic: string) => {
    addUserMessage(topic);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !input) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Please fill in your name, email, and your main inquiry so we can respond properly.",
        },
      ]);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Covenant received. 😊 The Imbari team has your request and will get back to you shortly.",
        },
      ]);
      setInput("");
    }, 600);
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
            <p className="text-sm text-neutral-200 font-medium">
              Talk to us about sourcing, impact, and partnerships.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition text-neutral-300 text-xl font-bold shadow"
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
                m.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-2.5 leading-snug shadow-lg ${
                  m.from === "user"
                    ? "bg-emerald-500 text-black"
                    : "bg-white/10 text-neutral-100"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Quick Topic Chips */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleQuickTopic(topic)}
                className="rounded-full border border-emerald-400/60 bg-black/50 px-4 py-2 text-xs text-emerald-200 hover:bg-emerald-500/10 transition font-semibold shadow-sm hover:scale-105 active:scale-95"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Lead Capture Form */}
        <form
          onSubmit={handleSubmitLead}
          className="border-t border-white/10 px-8 py-6 space-y-4 bg-black/60"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-neutral-400 font-semibold">
                Name
              </label>
              <input
                className="mt-1 w-full rounded-lg bg-black/70 border border-white/15 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition placeholder:text-neutral-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-400 font-semibold">
                Email
              </label>
              <input
                className="mt-1 w-full rounded-lg bg-black/70 border border-white/15 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition placeholder:text-neutral-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-neutral-400 font-semibold">
              WhatsApp / Phone (optional)
            </label>
            <input
              className="mt-1 w-full rounded-lg bg-black/70 border border-white/15 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition placeholder:text-neutral-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+256..."
              autoComplete="tel"
            />
          </div>

          <div>
            <label className="text-xs text-neutral-400 font-semibold">
              Your main question or request
            </label>
            <textarea
              className="mt-1 w-full rounded-lg bg-black/70 border border-white/15 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition resize-none placeholder:text-neutral-500"
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell us how you want to work with Imbari..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="block mx-auto w-full max-w-[240px] rounded-xl bg-emerald-400 text-base font-bold text-black py-3 px-6 mt-2 hover:bg-emerald-300 transition disabled:opacity-60 shadow-lg shadow-emerald-400/20"
          >
            {submitting ? "Sending..." : "Send to Imbari Team"}
          </button>
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
        className="!fixed !bottom-4 !right-4 !z-50 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 transition"
        aria-label="Chat with Imbari Coffee"
      >
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
