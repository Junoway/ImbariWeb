"use client";

import { useState, useEffect } from "react";
import { database, auth } from "@/lib/firebase";
import { ref, onValue, push, set, update } from "firebase/database";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

type Review = {
  id: string;
  productId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  timestamp: number;
  response?: string;
  responseTimestamp?: number;
  status?: 'pending' | 'responded';
};

export default function AdminReviewsDashboard() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Check authentication state
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load all reviews from all products
  useEffect(() => {
    if (!user || !database) return;

    const reviewsRef = ref(database, "reviews");
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewList: Review[] = [];
        
        // Iterate through products
        Object.entries(data).forEach(([productId, productReviews]: [string, any]) => {
          // Iterate through reviews for each product
          Object.entries(productReviews).forEach(([reviewId, review]: [string, any]) => {
            reviewList.push({
              id: reviewId,
              productId,
              name: review.name,
              email: review.email,
              rating: review.rating,
              comment: review.comment,
              timestamp: review.timestamp,
              response: review.response,
              responseTimestamp: review.responseTimestamp,
              status: review.status || 'pending',
            });
          });
        });

        // Sort by most recent
        reviewList.sort((a, b) => b.timestamp - a.timestamp);
        setReviews(reviewList);
      }
    });

    return () => unsubscribe();
  }, [user]);

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
    setSelectedReview(null);
  };

  const sendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedReview || !database) return;

    const review = reviews.find(r => r.id === selectedReview);
    if (!review) return;

    const reviewRef = ref(database, `reviews/${review.productId}/${review.id}`);
    await update(reviewRef, {
      response: replyText.trim(),
      responseTimestamp: Date.now(),
      status: 'responded',
    });

    setReplyText("");
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Imbari Admin</h1>
          <p className="text-neutral-300 mb-6">Reviews Management Dashboard</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-neutral-400 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/20 px-4 py-3 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                placeholder="admin@imbaricoffee.com"
                required
              />
            </div>
            
            <div>
              <label className="text-sm text-neutral-400 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg bg-black/30 border border-white/20 px-4 py-3 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Header */}
      <div className="bg-black/30 border-b border-white/10 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400">Imbari Reviews Management</h1>
            <p className="text-sm text-neutral-400">Customer Product Reviews Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-300">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition border border-red-500/30"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Reviews List */}
        <div className="w-80 bg-black/20 border-r border-white/10 overflow-y-auto">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">Product Reviews</h2>
            <p className="text-xs text-neutral-400 mt-1">
              {reviews.filter(r => r.status === 'pending').length} pending responses
            </p>
          </div>
          
          {reviews.map((review) => (
            <div
              key={review.id}
              onClick={() => setSelectedReview(review.id)}
              className={`p-4 border-b border-white/5 cursor-pointer transition ${
                selectedReview === review.id
                  ? "bg-emerald-500/20 border-l-4 border-l-emerald-400"
                  : "hover:bg-white/5"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-white">{review.name}</h3>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-neutral-400 truncate mb-1">Product: {review.productId}</p>
              <p className="text-sm text-neutral-300 truncate mb-2">{review.comment}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-500">
                  {new Date(review.timestamp).toLocaleDateString()}
                </span>
                {review.status === 'responded' ? (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                    Responded
                  </span>
                ) : (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {reviews.length === 0 && (
            <div className="p-8 text-center text-neutral-400">
              No reviews yet. Waiting for customer feedback...
            </div>
          )}
        </div>

        {/* Review Details */}
        <div className="flex-1 flex flex-col">
          {selectedReview ? (
            <>
              {(() => {
                const review = reviews.find(r => r.id === selectedReview);
                return review ? (
                  <>
                    {/* Review Header */}
                    <div className="bg-black/20 border-b border-white/10 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-white">{review.name}</h3>
                          <p className="text-sm text-neutral-400">{review.email}</p>
                          <p className="text-sm text-emerald-400 mt-1">Product: {review.productId}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-2xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      <div className="bg-white/10 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
                            {review.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="text-white leading-relaxed">{review.comment}</p>
                            <p className="text-xs text-neutral-400 mt-2">
                              {new Date(review.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {review.response && (
                        <div className="bg-emerald-500/20 rounded-2xl p-6 border border-emerald-500/30">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center">
                              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-emerald-400 mb-1">Imbari Team Response</div>
                              <p className="text-white leading-relaxed">{review.response}</p>
                              <p className="text-xs text-neutral-400 mt-2">
                                {new Date(review.responseTimestamp || Date.now()).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Response Form */}
                    <form onSubmit={sendResponse} className="bg-black/20 border-t border-white/10 p-6">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={review.response ? "Update your response..." : "Type your response to this review..."}
                          className="flex-1 rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                        />
                        <button
                          type="submit"
                          className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-lg transition"
                        >
                          {review.response ? 'Update' : 'Send'} Response
                        </button>
                      </div>
                    </form>
                  </>
                ) : null;
              })()}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-neutral-400">
              Select a review to view details and respond
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
