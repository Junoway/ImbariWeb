// app/settings/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
  }, [user, router]);

  if (!user) return null;

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Simulate API call
    setTimeout(() => {
      // Update localStorage
      const updatedUser = { ...user, firstName, lastName, email };
      localStorage.setItem("imbari_user", JSON.stringify(updatedUser));
      
      setSuccessMessage("Profile updated successfully!");
      setLoading(false);
      
      // Reload to reflect changes
      setTimeout(() => window.location.reload(), 1500);
    }, 1000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords don't match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    // Verify current password
    const storedPassword = localStorage.getItem(`imbari_auth_${user.email}`);
    if (storedPassword !== currentPassword) {
      setErrorMessage("Current password is incorrect");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Update password in localStorage
      localStorage.setItem(`imbari_auth_${user.email}`, newPassword);
      
      setSuccessMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordSection(false);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Clear all user data
      localStorage.removeItem("imbari_user");
      localStorage.removeItem(`imbari_auth_${user.email}`);
      logout();
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/account")}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-semibold mb-4 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Account
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Account Settings
          </h1>
          <p className="text-emerald-700">Manage your profile and account preferences</p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 bg-emerald-100 border-2 border-emerald-400 text-emerald-700 px-4 py-3 rounded-lg">
            ✓ {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg">
            ✗ {errorMessage}
          </div>
        )}

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-lg border-4 border-emerald-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile Information
          </h2>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-emerald-800 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-emerald-800 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-emerald-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
              />
              <p className="text-xs text-emerald-600 mt-1">
                Changing your email will require re-verification
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 border-4 border-emerald-700"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>

        {/* Subscription Status */}
        <div className="bg-white rounded-2xl shadow-lg border-4 border-emerald-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Subscription Status
          </h2>

          {user.isSubscribed ? (
            <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 border-2 border-yellow-400 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-emerald-800 mb-1">Active Subscriber ⭐</p>
                  <p className="text-sm text-emerald-700">You're enjoying 10% off all products!</p>
                </div>
                <button
                  onClick={() => alert("Subscription management coming soon!")}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold shadow-md hover:shadow-lg transition-all border-2 border-emerald-600"
                >
                  Manage
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-emerald-800 mb-1">Not Subscribed</p>
                  <p className="text-sm text-emerald-700">Subscribe now to get 10% off all products!</p>
                </div>
                <button
                  onClick={() => router.push("/shop")}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-white font-bold shadow-md hover:shadow-lg transition-all border-2 border-orange-600"
                >
                  Subscribe
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-lg border-4 border-emerald-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Password & Security
          </h2>

          {!showPasswordSection ? (
            <button
              onClick={() => setShowPasswordSection(true)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold shadow-md hover:shadow-lg transition-all border-2 border-emerald-600"
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-emerald-800 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-emerald-800 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-emerald-800 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordSection(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setErrorMessage("");
                  }}
                  className="flex-1 py-3 rounded-full bg-gray-300 text-gray-700 font-bold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 border-2 border-emerald-600"
                >
                  {loading ? "Changing..." : "Update Password"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-lg border-4 border-red-300 p-8">
          <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Danger Zone
          </h2>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <p className="text-sm text-red-700 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="px-6 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition shadow-md border-2 border-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

