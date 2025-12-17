import { database } from "@/lib/firebase";
import { ref, update } from "firebase/database";
import type { Review } from "@/lib/admin/types";

export async function sendReviewResponse(
  selectedReviewId: string,
  reviewReply: string,
  reviews: Review[]
) {
  if (!reviewReply.trim() || !selectedReviewId || !database) return;

  const review = reviews.find((r) => r.id === selectedReviewId);
  if (!review) return;

  const reviewRef = ref(database, `reviews/${review.productId}/${review.id}`);
  await update(reviewRef, {
    response: reviewReply.trim(),
    responseTimestamp: Date.now(),
    status: "responded",
  });
}
