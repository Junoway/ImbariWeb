"use client";

import React, { useState } from "react";
import type { Review } from "@/lib/admin/types";
import { sendReviewResponse } from "@/lib/admin/firebaseReviews";

type Props = {
  reviews: Review[];
  selectedReview: string | null;
  setSelectedReview: (v: string | null) => void;
};

export default function ReviewsPanel({
  reviews,
  selectedReview,
  setSelectedReview,
}: Props) {
  const [reviewReply, setReviewReply] = useState("");

  const onSendReviewResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewReply.trim() || !selectedReview) return;

    await sendReviewResponse(selectedReview, reviewReply, reviews);
    setReviewReply("");
    setSelectedReview(null);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] lg:h-[calc(100vh-160px)]">
      {/* Reviews List */}
      <div
        className={`w-full lg:w-80 bg-black/20 border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto ${
          selectedReview ? "hidden lg:block" : "block"
        }`}
      >
        <div className="p-4 border-b border-white/10 sticky top-0 bg-black/30 backdrop-blur">
          <h2 className="text-base md:text-lg font-bold text-white">
            Product Reviews
          </h2>
          <p className="text-xs text-imbari-very-dark-brown mt-1">
            {reviews.filter((r) => r.status === "pending").length} pending
            responses
          </p>
        </div>

        {reviews.map((review) => (
          <div
            key={review.id}
            onClick={() => setSelectedReview(review.id)}
            className={`p-3 md:p-4 border-b border-white/5 cursor-pointer transition ${
              selectedReview === review.id
                ? "bg-emerald-500/20 border-l-4 border-l-emerald-400"
                : "hover:bg-white/5"
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-white text-sm md:text-base truncate flex-1">
                {review.name}
              </h3>
              <div className="flex gap-0.5 flex-shrink-0 ml-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xs">
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs text-white truncate mb-1">
              Product: {review.productId}
            </p>
            <p className="text-xs md:text-sm text-white truncate mb-2">
              {review.comment}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-500">
                {new Date(review.timestamp).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {review.status === "responded" ? (
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
          <div className="p-8 text-center text-white text-sm">
            No reviews yet
          </div>
        )}
      </div>

      {/* Review Details */}
      <div
        className={`flex-1 flex flex-col ${
          selectedReview ? "block" : "hidden lg:flex"
        }`}
      >
        {selectedReview ? (
          (() => {
            const review = reviews.find((r) => r.id === selectedReview);
            return review ? (
              <>
                <div className="bg-black/20 border-b border-white/10 p-3 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => setSelectedReview(null)}
                        className="lg:hidden bg-white/10 hover:bg-white/20 p-2 rounded-lg transition flex-shrink-0"
                      >
                        <svg
                          className="w-5 h-5 text-white"
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
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-imbari-very-dark-brown">
                          {review.name}
                        </h3>
                        <p className="text-xs md:text-sm text-imbari-coffee-brown break-all">
                          {review.email}
                        </p>
                        <p className="text-xs md:text-sm text-emerald-400 mt-1">
                          Product: {review.productId}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl md:text-2xl ${
                            i < review.rating ? "text-yellow-400" : "text-gray-600"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6">
                  <div className="bg-white/10 rounded-2xl p-4 md:p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-sm md:text-base flex-shrink-0">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-imbari-coffee-brown leading-relaxed text-sm md:text-base break-words">
                          {review.comment}
                        </p>
                        <p className="text-xs text-imbari-very-dark-brown mt-2">
                          {new Date(review.timestamp).toLocaleString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {review.response && (
                    <div className="bg-emerald-500/20 rounded-2xl p-4 md:p-6 border border-emerald-500/30">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-400 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 md:w-6 md:h-6 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs md:text-sm font-semibold text-emerald-400 mb-1">
                            Imbari Team Response
                          </div>
                          <p className="text-imbari-coffee-brown leading-relaxed text-sm md:text-base break-words">
                            {review.response}
                          </p>
                          <p className="text-xs text-imbari-very-dark-brown mt-2">
                            {new Date(
                              review.responseTimestamp || Date.now()
                            ).toLocaleString([], {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form
                  onSubmit={onSendReviewResponse}
                  className="bg-black/20 border-t border-white/10 p-3 md:p-6"
                >
                  <div className="flex gap-2 md:gap-3">
                    <input
                      type="text"
                      value={reviewReply}
                      onChange={(e) => setReviewReply(e.target.value)}
                      placeholder={review.response ? "Update response..." : "Type your response..."}
                      className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-imbari-very-dark-brown outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg transition text-sm md:text-base whitespace-nowrap"
                    >
                      {review.response ? "Update" : "Send"}
                    </button>
                  </div>
                </form>
              </>
            ) : null;
          })()
        ) : (
          <div className="flex-1 hidden lg:flex items-center justify-center text-imbari-very-dark-brown text-sm md:text-base px-4">
            Select a review to view details and respond
          </div>
        )}
      </div>
    </div>
  );
}
