// app/checkout/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useState, useMemo, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "pk_test_123"; // Replace with your real key
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
const TAX_RATE = 0.10;

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const [location, setLocation] = useState<"kampala" | "outside">("kampala");
  const [placingOrder, setPlacingOrder] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Modal state for remove confirmation
  const [removeModal, setRemoveModal] = useState<{ open: boolean; itemId: string | number | null }>({ open: false, itemId: null });

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return location === "kampala" ? 0 : 2;
  }, [location, items.length]);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    setPlacingOrder(true);

    // Here you’d call your backend / payment integration.
    // For now, just simulate and clear cart.
    setTimeout(() => {
      setPlacingOrder(false);
      clearCart();
      alert(
        "Thank you for your order. Our team will contact you to confirm delivery and payment."
      );
    }, 600);
  };

  async function handleStripeCheckout() {
    if (items.length === 0) return;
    const stripe = await stripePromise;
    // Prepare line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Call your backend to create a Stripe Checkout session
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lineItems }),
    });
    const data = await res.json();
    if (data.sessionId) {
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    }
  }

  // Remove item handler
  function handleRemove(itemId: string | number) {
    setRemoveModal({ open: true, itemId });
  }
  function confirmRemove() {
    if (removeModal.itemId != null) {
      removeItem(removeModal.itemId);
      setToast({ message: "Item removed from cart", type: "success" });
    }
    setRemoveModal({ open: false, itemId: null });
  }
  function cancelRemove() {
    setRemoveModal({ open: false, itemId: null });
  }

  return (
    <main className="bg-[#050304] text-neutral-50 min-h-screen">
      <section className="main-container py-16 space-y-10">
        <header className="space-y-3 max-w-3xl">
          <p className="badge mb-1">Checkout</p>
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Your Imbari Cart
          </h1>
          <p className="text-sm sm:text-base text-neutral-300">
            Review your items, choose your location, and confirm your order. A
            flat <span className="font-semibold">$2 shipping</span> is applied
            if you are outside Kampala.
          </p>
        </header>

        {/* If cart is empty */}
        {items.length === 0 ? (
          <div className="card p-6 sm:p-8 text-center space-y-4">
            <p className="text-sm sm:text-base text-neutral-300">
              Your cart is empty.
            </p>
            <Link href="/shop" className="button-primary inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <section className="grid gap-8 lg:grid-cols-[2fr,1.4fr] items-start">
            {/* CART ITEMS */}
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="card p-4 sm:p-5 flex gap-4 sm:gap-5 animate-fade-in"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <h2 className="text-sm sm:text-base font-semibold">
                      {item.name}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-neutral-400">
                      ${item.price.toFixed(2)} per unit
                    </p>

                    {/* Quantity & remove */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            updateQuantity(item.id, item.quantity - 1);
                            setToast({ message: "Quantity updated", type: "success" });
                          }}
                          className="w-7 h-7 rounded-full border border-white/15 text-xs flex items-center justify-center hover:bg-white/10 transition-transform duration-200"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-6 text-center animate-bounce-in">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            updateQuantity(item.id, item.quantity + 1);
                            setToast({ message: "Quantity updated", type: "success" });
                          }}
                          className="w-7 h-7 rounded-full border border-white/15 text-xs flex items-center justify-center hover:bg-white/10 transition-transform duration-200"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-[11px] text-neutral-400 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* SUMMARY & LOCATION */}
            <aside className="card p-6 sm:p-7 space-y-6 lg:sticky lg:top-24">
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-semibold">
                  Order Summary
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Confirm your location so we can apply the correct shipping.
                  Inside Kampala: <strong>free</strong>. Outside Kampala:{" "}
                  <strong>$2 flat</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-neutral-200">
                  Delivery Location
                </p>
                <div className="flex flex-col gap-2 text-xs sm:text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="location"
                      value="kampala"
                      checked={location === "kampala"}
                      onChange={() => setLocation("kampala")}
                      className="accent-emerald-400"
                    />
                    <span>Inside Kampala</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="location"
                      value="outside"
                      checked={location === "outside"}
                      onChange={() => setLocation("outside")}
                      className="accent-emerald-400"
                    />
                    <span>Outside Kampala (flat $2 shipping)</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-50 font-bold text-lg mt-2 border-t border-white/10 pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleStripeCheckout}
                disabled={placingOrder || items.length === 0}
                className="button-primary w-full text-base font-bold py-3 mt-2 disabled:opacity-60 shadow-lg shadow-emerald-400/20 hover:scale-105 transition-transform flex items-center justify-center"
              >
                {placingOrder ? (
                  <span className="flex items-center gap-2"><span className="loader border-t-emerald-400 border-4 w-5 h-5 rounded-full animate-spin"></span> Placing Order...</span>
                ) : (
                  `Place Order & Pay $${total.toFixed(2)}`
                )}
              </button>

              <p className="text-[11px] text-neutral-500">
                After you place your order, our team will contact you to confirm
                delivery address, payment method (mobile money, card, or bank),
                and any wholesale or export details.
              </p>
            </aside>
          </section>
        )}
      </section>

      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-bold ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"} animate-fade-in`}>
          {toast.message}
        </div>
      )}

      {/* Remove confirmation modal */}
      {removeModal.open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-xl p-8 shadow-xl text-center max-w-xs">
            <h3 className="text-lg font-bold mb-2 text-emerald-700">Remove Item?</h3>
            <p className="text-sm text-neutral-700 mb-4">Are you sure you want to remove this item from your cart?</p>
            <div className="flex gap-4 justify-center">
              <button onClick={confirmRemove} className="px-4 py-2 rounded bg-emerald-500 text-white font-bold hover:bg-emerald-400">Yes, Remove</button>
              <button onClick={cancelRemove} className="px-4 py-2 rounded bg-neutral-200 text-neutral-700 font-bold hover:bg-neutral-300">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Add to global CSS or Tailwind config:
// .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1); }
// @keyframes fadeIn { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
// .animate-bounce-in { animation: bounceIn 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
// @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }
// .loader { border: 4px solid #d1fae5; border-top: 4px solid #34d399; border-radius: 50%; width: 20px; height: 20px; }
// .animate-spin { animation: spin 1s linear infinite; }
// @keyframes spin { 100% { transform: rotate(360deg); } }
