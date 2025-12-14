"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutCanceledPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        {/* Cancel Icon */}
        <div className="mx-auto w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Checkout Canceled
        </h1>
        
        <p className="text-lg text-gray-700 mb-6">
          Your payment was not processed. Your cart items are still saved.
        </p>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-700 mb-3">
            No charges were made to your account.
          </p>
          <p className="text-sm text-gray-600">
            If you experienced any issues during checkout, please{" "}
            <Link href="/contact" className="text-emerald-600 hover:underline font-semibold">
              contact our support team
            </Link>
            {" "}and we'll be happy to help!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/checkout"
            className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-200"
          >
            Return to Checkout
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-full shadow hover:bg-gray-50 transition-all duration-200"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Common reasons for cancellation:
          </h3>
          <ul className="text-sm text-left text-gray-600 space-y-1 max-w-md mx-auto">
            <li>• Changed your mind about the purchase</li>
            <li>• Need to update payment method</li>
            <li>• Want to add more items to your cart</li>
            <li>• Encountered a technical issue</li>
          </ul>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Your cart is preserved and you can complete your purchase whenever you're ready.
        </p>
      </div>
    </div>
  );
}
