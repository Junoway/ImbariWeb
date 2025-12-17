"use client";

import React from "react";

type Props = {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function LoginCard({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">
            Imbari Admin
          </h1>
          <p className="text-white">Unified Dashboard</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-imbari-very-dark-brown font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg bg-black/30 border border-white/20 px-4 py-3 text-imbari-very-dark-brown outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
              placeholder="admin@imbaricoffee.com"
              required
            />
          </div>

          <div>
            <label className="text-sm text-imbari-very-dark-brown font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg bg-black/30 border border-white/20 px-4 py-3 text-imbari-very-dark-brown outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
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
