"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session = searchParams?.get("session_id") || null;
    if (session) {
      setSessionId(session);
      // Clear cart after successful payment
      clearCart();
    }
  }, [searchParams, clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase from Imbari Coffee!
        </p>

        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-emerald-800 mb-3">
            <strong>What happens next:</strong>
          </p>
          <ul className="text-sm text-left text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">✓</span>
              <span>You'll receive an order confirmation email shortly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">✓</span>
              <span>Our team will contact you to confirm delivery details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">✓</span>
              <span>Your freshly roasted coffee will be prepared for shipment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">✓</span>
              <span>Track your order via email updates</span>
            </li>
          </ul>
        </div>

        {sessionId && (
          <p className="text-xs text-gray-500 mb-6">
            Order reference: {sessionId.slice(-12)}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-200"
          >
            Continue Shopping
          </Link>
          <Link
            href="/order-history"
            className="px-8 py-3 bg-white border-2 border-emerald-600 text-emerald-600 font-semibold rounded-full shadow hover:bg-emerald-50 transition-all duration-200"
          >
            View Order History
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Questions about your order?{" "}
            <Link href="/contact" className="text-emerald-600 hover:underline font-semibold">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
