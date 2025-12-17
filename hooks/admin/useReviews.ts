"use client";

import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { onValue, ref } from "firebase/database";
import type { Review } from "@/lib/admin/types";

export function useReviews(user: any) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!user || !database) return;

    const reviewsRef = ref(database, "reviews");
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewList: Review[] = [];

        Object.entries(data).forEach(([productId, productReviews]: [string, any]) => {
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
              status: review.status || "pending",
            });
          });
        });

        reviewList.sort((a, b) => b.timestamp - a.timestamp);
        setReviews(reviewList);
      } else {
        setReviews([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const pendingCount = reviews.filter((r) => r.status === "pending").length;

  return { reviews, pendingCount };
}
