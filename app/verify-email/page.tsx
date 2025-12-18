// app/verify-email/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { verifyEmail } = useAuth();

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-fill email from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pendingEmail = localStorage.getItem("pending_verify_email");
      if (pendingEmail) {
        setEmail(pendingEmail);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (code.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setLoading(true);

    // verifyEmail expects 2 args in your AuthContext typings/implementation
    const success = await verifyEmail(code, email.trim());

    setLoading(false);

    if (success) {
      router.push("/account");
    } else {
      setError("Invalid verification code. Please try again.");
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
            {/* Email Input (required because verifyEmail expects 2 args) */}
            <div>
              <label className="block text-sm font-bold text-emerald-800 mb-2 text-center">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition text-center text-base font-semibold"
                placeholder="you@example.com"
              />
            </div>

            {/* Code Input */}
            <div>
              <label className="block text-sm font-bold text-emerald-800 mb-2 text-center">
                Enter Verification Code
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-4 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition text-center text-2xl font-bold tracking-widest"
                placeholder="000000"
              />
              <p className="text-xs text-emerald-600 mt-2 text-center">
                Check your email inbox and spam folder
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || code.length !== 6 || !email.trim()}
              className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-imbari-very-dark-brown font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 border-4 border-emerald-700"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          {/* Resend Link */}
          <p className="text-center mt-6 text-emerald-700 text-sm">
            Didn't receive the code?{" "}
            <button className="font-bold text-emerald-600 hover:text-orange-500 transition">
              Resend
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

