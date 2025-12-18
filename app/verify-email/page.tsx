// app/verify-email/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { verifyEmail } = useAuth();

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-fill email from localStorage if available
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pendingEmail = localStorage.getItem("pending_verify_email");
    if (pendingEmail) setEmail(String(pendingEmail).trim());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const cleanedEmail = String(email || "").trim().toLowerCase();
    const cleanedCode = String(code || "").trim();

    if (!cleanedEmail) {
      setError("Please enter your email address");
      return;
    }
    if (cleanedCode.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setLoading(true);
    try {
      // IMPORTANT: verifyEmail(email, code) — correct order
      const success = await verifyEmail(cleanedEmail, cleanedCode);

      if (success) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("pending_verify_email");
        }
        setSuccessMsg("Email verified successfully. You can now log in.");
        // Redirect to login (more reliable than /account if your backend requires re-login)
        setTimeout(() => router.push("/login"), 700);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📧</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Verify Your Email
          </h1>
          <p className="text-emerald-700">We've sent a 6-digit code to your email</p>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-emerald-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="verify-email"
                className="block text-sm font-bold text-emerald-800 mb-2 text-center"
              >
                Email Address
              </label>
              <input
                id="verify-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition text-center text-base font-semibold"
                placeholder="you@example.com"
              />
            </div>

            {/* Code Input */}
            <div>
              <label
                htmlFor="verify-code"
                className="block text-sm font-bold text-emerald-800 mb-2 text-center"
              >
                Enter Verification Code
              </label>
              <input
                id="verify-code"
                name="code"
                type="text"
                required
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full px-4 py-4 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition text-center text-2xl font-bold tracking-widest"
                placeholder="000000"
              />
              <p className="text-xs text-emerald-600 mt-2 text-center">
                Check your email inbox and spam folder
              </p>
            </div>

            {/* Error / Success */}
            {error && (
              <div
                role="alert"
                className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-center"
              >
                {error}
              </div>
            )}

            {successMsg && (
              <div
                role="status"
                className="bg-emerald-50 border-2 border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-center"
              >
                {successMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || code.trim().length !== 6 || !email.trim()}
              className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-imbari-very-dark-brown font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 border-4 border-emerald-700"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          {/* Resend Link (UI only for now) */}
          <p className="text-center mt-6 text-emerald-700 text-sm">
            Didn&apos;t receive the code?{" "}
            <span className="font-semibold text-emerald-700">
              Please try signing up again or check spam.
            </span>
          </p>

          <div className="mt-4 flex justify-between text-sm">
            <Link href="/signup" className="font-bold text-emerald-600 hover:text-orange-500 transition">
              ← Back to Sign Up
            </Link>
            <Link href="/login" className="font-bold text-emerald-600 hover:text-orange-500 transition">
              Go to Login →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
