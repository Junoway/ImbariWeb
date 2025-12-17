"use client";

import React from "react";

type Tab = "chats" | "reviews" | "sales";

type Props = {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  unreadChatsCount: number;
  pendingReviewsCount: number;
};

export default function Tabs({
  activeTab,
  setActiveTab,
  unreadChatsCount,
  pendingReviewsCount,
}: Props) {
  return (
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
            {unreadChatsCount > 0 && (
              <span className="ml-2 bg-emerald-500 text-black text-xs font-bold rounded-full px-2 py-0.5">
                {unreadChatsCount}
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
            {pendingReviewsCount > 0 && (
              <span className="ml-2 bg-yellow-500 text-black text-xs font-bold rounded-full px-2 py-0.5">
                {pendingReviewsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("sales")}
            className={`px-4 md:px-6 py-3 font-semibold transition whitespace-nowrap text-sm md:text-base ${
              activeTab === "sales"
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-white hover:text-white"
            }`}
          >
            💰 <span className="hidden sm:inline">Sales </span>Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
