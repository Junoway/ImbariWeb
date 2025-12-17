"use client";

import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import LoginCard from "@/components/admin/LoginCard";
import Tabs from "@/components/admin/Tabs";
import ChatsPanel from "@/components/admin/chats/ChatsPanel";
import ReviewsPanel from "@/components/admin/reviews/ReviewsPanel";
import SalesPanel from "@/components/admin/sales/SalesPanel";

import { useAdminAuth } from "@/hooks/admin/useAdminAuth";
import { useChatSessions } from "@/hooks/admin/useChatSessions";
import { useChatMessages } from "@/hooks/admin/useChatMessages";
import { useReviews } from "@/hooks/admin/useReviews";
import { useSales } from "@/hooks/admin/useSales";

export default function AdminDashboardPage() {
  const { user, loading } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [activeTab, setActiveTab] = useState<"chats" | "reviews" | "sales">(
    "chats"
  );

  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  const { sessions, unreadSessionsCount } = useChatSessions(user);
  const { messages } = useChatMessages(user, selectedSession, sessions);

  const { reviews, pendingCount } = useReviews(user);

  const { sales, salesLoading } = useSales(activeTab);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <LoginCard
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Header */}
      <div className="bg-black/30 border-b border-white/10 px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 lg:max-w-7xl lg:mx-auto">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-emerald-400">
              Imbari Coffee Admin
            </h1>
            <p className="text-xs md:text-sm text-white">
              Manage Chats, Reviews & Analytics
            </p>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-sm md:text-base text-white truncate">
              {user.email}
            </span>
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
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadChatsCount={unreadSessionsCount}
        pendingReviewsCount={pendingCount}
      />

      {/* Content */}
      {activeTab === "chats" ? (
        <ChatsPanel
          sessions={sessions}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          messages={messages}
        />
      ) : activeTab === "reviews" ? (
        <ReviewsPanel
          reviews={reviews}
          selectedReview={selectedReview}
          setSelectedReview={setSelectedReview}
        />
      ) : (
        <SalesPanel sales={sales} salesLoading={salesLoading} />
      )}
    </div>
  );
}
