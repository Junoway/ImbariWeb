// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) router.push("/account");
  }, [user, router]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(formData.email, formData.password);

    setLoading(false);

    if (success) router.push("/account");
    else setError("Invalid email or password");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Welcome Back!
          </h1>
          <p className="text-emerald-700">Log in to your Imbari Coffee account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-emerald-300">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="loginEmail" className="block text-sm font-bold text-emerald-800 mb-2">
                Email Address
              </label>
              <input
                id="loginEmail"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="loginPassword" className="block text-sm font-bold text-emerald-800 mb-2">
                Password
              </label>
              <input
                id="loginPassword"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                placeholder="Enter your password"
              />
            </div>

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-emerald-600 hover:text-orange-500 font-semibold transition"
              >
                Forgot Password?
              </Link>
            </div>

            {error && (
              <div role="alert" className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-imbari-very-dark-brown font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 border-4 border-emerald-700"
            >
              {loading ? "Logging In..." : "🐒 Log In"}
            </button>
          </form>

          <p className="text-center mt-6 text-emerald-700">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-emerald-600 hover:text-orange-500 transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}



