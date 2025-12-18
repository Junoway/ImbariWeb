// app/signup/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signup, user } = useAuth();

  useEffect(() => {
    if (user) router.push("/account");
  }, [user, router]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const success = await signup(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password
    );

    setLoading(false);

    if (success) {
      router.push("/verify-email");
    } else {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Join Imbari Coffee
          </h1>
          <p className="text-emerald-700">Create your account and enjoy exclusive benefits</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-emerald-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signupFirstName" className="block text-sm font-bold text-emerald-800 mb-2">
                First Name
              </label>
              <input
                id="signupFirstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                placeholder="Arthur"
              />
            </div>

            <div>
              <label htmlFor="signupLastName" className="block text-sm font-bold text-emerald-800 mb-2">
                Last Name
              </label>
              <input
                id="signupLastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                placeholder="Kenrald"
              />
            </div>

            <div>
              <label htmlFor="signupEmail" className="block text-sm font-bold text-emerald-800 mb-2">
                Email Address
              </label>
              <input
                id="signupEmail"
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
              <label htmlFor="signupPassword" className="block text-sm font-bold text-emerald-800 mb-2">
                Password
              </label>
              <input
                id="signupPassword"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                placeholder="Min. 6 characters"
              />
            </div>

            <div>
              <label htmlFor="signupConfirmPassword" className="block text-sm font-bold text-emerald-800 mb-2">
                Confirm Password
              </label>
              <input
                id="signupConfirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                placeholder="Re-enter password"
              />
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
              {loading ? "Creating Account..." : "🐒 Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-emerald-700">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-emerald-600 hover:text-orange-500 transition">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

