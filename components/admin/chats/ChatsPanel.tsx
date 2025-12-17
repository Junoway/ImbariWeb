"use client";

import React, { useEffect, useRef, useState } from "react";
import type { ChatSession, Message } from "@/lib/admin/types";
import { sendChatReply, markChatAsResolved } from "@/lib/admin/firebaseChats";

type Props = {
  sessions: ChatSession[];
  selectedSession: string | null;
  setSelectedSession: (v: string | null) => void;
  messages: Message[];
};

export default function ChatsPanel({
  sessions,
  selectedSession,
  setSelectedSession,
  messages,
}: Props) {
  const [chatReply, setChatReply] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom (same behavior you had)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSendChatReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatReply.trim() || !selectedSession) return;

    await sendChatReply(selectedSession, chatReply);
    setChatReply("");
  };

  const onMarkResolved = async (sessionId: string) => {
    await markChatAsResolved(sessionId);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] lg:h-[calc(100vh-160px)]">
      {/* Chat Sessions Sidebar */}
      <div
        className={`w-full lg:w-80 bg-black/20 border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto ${
          selectedSession ? "hidden lg:block" : "block"
        }`}
      >
        <div className="p-4 border-b border-white/10 sticky top-0 bg-black/30 backdrop-blur">
          <h2 className="text-base md:text-lg font-bold text-white">
            Active Conversations
          </h2>
          <p className="text-xs text-imbari-very-dark-brown mt-1">
            {sessions.filter((s) => s.status === "active").length} active chats
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
              <h3 className="font-semibold text-imbari-very-dark-brown text-sm md:text-base">
                {session.customerName}
              </h3>
              {session.unreadCount > 0 && (
                <span className="bg-emerald-500 text-black text-xs font-bold rounded-full px-2 py-0.5 flex-shrink-0">
                  {session.unreadCount}
                </span>
              )}
            </div>
            <p className="text-xs text-imbari-coffee-brown truncate mb-1">
              {session.customerEmail}
            </p>
            <p className="text-xs md:text-sm text-imbari-coffee-brown truncate">
              {session.lastMessage}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-neutral-500">
                {new Date(session.lastMessageTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
          <div className="p-8 text-center text-imbari-very-dark-brown text-sm">
            No conversations yet
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div
        className={`flex-1 flex flex-col ${
          selectedSession ? "block" : "hidden lg:flex"
        }`}
      >
        {selectedSession ? (
          <>
            <div className="bg-black/20 border-b border-white/10 p-3 md:p-4">
              {(() => {
                const session = sessions.find((s) => s.id === selectedSession);
                return session ? (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedSession(null)}
                        className="lg:hidden bg-white/10 hover:bg-white/20 p-2 rounded-lg transition"
                      >
                        <svg
                          className="w-5 h-5 text-imbari-very-dark-brown"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-imbari-very-dark-brown">
                          {session.customerName}
                        </h3>
                        <p className="text-xs md:text-sm text-imbari-coffee-brown">
                          {session.customerEmail}
                        </p>
                        {session.customerPhone && (
                          <p className="text-xs md:text-sm text-emerald-400">
                            📱 {session.customerPhone}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onMarkResolved(selectedSession)}
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
                  className={`flex ${
                    msg.from === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[70%] rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                      msg.from === "admin"
                        ? "bg-emerald-500 text-black"
                        : "bg-white/10 text-imbari-very-dark-brown"
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">
                      {msg.text}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.from === "admin"
                          ? "text-black/60"
                          : "text-imbari-very-dark-brown"
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Reply Form (fixed: removed the accidental msg-render block) */}
            <form
              onSubmit={onSendChatReply}
              className="bg-black/20 border-t border-white/10 p-3 md:p-4"
            >
              <div className="flex gap-2 md:gap-3">
                <input
                  type="text"
                  value={chatReply}
                  onChange={(e) => setChatReply(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-imbari-very-dark-brown outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
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
          <div className="flex-1 hidden lg:flex items-center justify-center text-imbari-very-dark-brown text-sm md:text-base px-4">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
