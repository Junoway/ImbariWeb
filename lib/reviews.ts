import { ref, push, set, onValue, off, query, orderByChild, getDatabase } from 'firebase/database';
import { app } from './firebase';

export interface Review {
  id?: string;
  productId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  verified: boolean;
  timestamp?: number; // Optional for backward compatibility with old reviews
  response?: string;
  responseTimestamp?: number;
  status?: 'pending' | 'responded';
}

/**
 * Get database instance (client-side only)
 */
function getDatabaseInstance() {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return getDatabase(app);
  } catch (error) {
    console.error('Firebase database error:', error);
    return null;
  }
}

/**
 * Submit a new review to Firebase
 */
export async function submitReview(review: Omit<Review, 'id' | 'timestamp' | 'verified'>): Promise<string> {
  const database = getDatabaseInstance();
  if (!database) {
    throw new Error('Firebase database not initialized. Please check your Firebase configuration.');
  }

  const reviewsRef = ref(database, `reviews/${review.productId}`);
  const newReviewRef = push(reviewsRef);
  
  const reviewData: Omit<Review, 'id'> = {
    ...review,
    verified: false, // Admin can verify later
    timestamp: Date.now(),
  };

  await set(newReviewRef, reviewData);
  return newReviewRef.key || '';
}

/**
 * Get all reviews for a specific product
 */
export function getProductReviews(
  productId: string,
  callback: (reviews: Review[]) => void
): () => void {
  const database = getDatabaseInstance();
  if (!database) {
    callback([]);
    return () => {};
  }

  const reviewsRef = ref(database, `reviews/${productId}`);
  const reviewsQuery = query(reviewsRef, orderByChild('timestamp'));
  
  console.log('🔥 Firebase: Listening for reviews at path:', `reviews/${productId}`);

  const handleValue = (snapshot: any) => {
    console.log('🔥 Firebase: Reviews snapshot received:', snapshot.exists());
    const reviews: Review[] = [];
    snapshot.forEach((childSnapshot: any) => {
      const reviewData = childSnapshot.val();
      console.log('🔥 Firebase: Review data:', childSnapshot.key, reviewData);
      reviews.push({
        id: childSnapshot.key,
        ...reviewData,
      });
    });
    console.log('✅ Firebase: Total reviews parsed:', reviews.length);
    // Reverse to show newest first
    callback(reviews.reverse());
  };

  onValue(reviewsQuery, handleValue);

  // Return unsubscribe function
  return () => off(reviewsQuery, 'value', handleValue);
}

/**
 * Calculate average rating for a product
 */
export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal
}

/**
 * Get rating distribution
 */
export function getRatingDistribution(reviews: Review[]): Record<number, number> {
  const distribution: Record<number, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach(review => {
    distribution[review.rating] = (distribution[review.rating] || 0) + 1;
  });

  return distribution;
}
