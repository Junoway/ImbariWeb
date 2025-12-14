// app/checkout/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useState, useMemo, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "pk_test_123"; // Replace with your real key
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
const TAX_RATE = 0.10;

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal: cartSubtotal } = useCart();
  const [location, setLocation] = useState<"kampala" | "outside">("kampala");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [tip, setTip] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [cartOpen, setCartOpen] = useState(true);
  const router = useRouter();

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

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/shop");
    }
  }, [items.length, router]);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return location === "kampala" ? 0 : 2;
  }, [location, items.length]);

  const tax = cartSubtotal * TAX_RATE;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalPrice = subtotal > 0 ? subtotal.toFixed(2) : "0.00";
  const discountedSubtotal = subtotal - discount;
  const total = (discountedSubtotal + tip + shipping).toFixed(2);

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
    setPlacingOrder(true);
    try {
      // Get backend URL - use environment variable or deployed backend URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://imbari-coffee-backend.vercel.app';
      
      // Prepare checkout data
      const checkoutData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          description: '',
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        location: location,
        shipping: shipping,
        tax: tax,
        discountCode: discountApplied ? discountCode : undefined,
        discountAmount: discount,
        tipAmount: tip,
        subtotal: subtotal,
        total: parseFloat(total),
      };

      console.log('Initiating checkout with:', checkoutData);

      // Call backend to create Stripe Checkout session
      const res = await fetch(`${apiUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const data = await res.json();
      console.log('Stripe session created:', data);
      
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.assign(data.url);
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setToast({ 
        message: error instanceof Error ? error.message : 'Failed to start checkout', 
        type: 'error' 
      });
      setPlacingOrder(false);
    }
  }

  // Remove item handler
  function handleRemove(itemId: string | number) {
    setRemoveModal({ open: true, itemId });
  }
  function confirmRemove() {
    if (removeModal.itemId != null) {
      removeItem(String(removeModal.itemId)); // Ensure ID is a string
      setToast({ message: "Item removed from cart", type: "success" });
    }
    setRemoveModal({ open: false, itemId: null });
  }
  function cancelRemove() {
    setRemoveModal({ open: false, itemId: null });
  }

  return (
    <div className="bg-gradient-to-br from-yellow-100 via-orange-50 to-emerald-100 min-h-screen">
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-full shadow-2xl font-bold text-sm animate-fade-in border-4 ${
          toast.type === "success" ? "bg-emerald-500 text-imbari-very-dark-brown border-green-600" : "bg-red-500 text-imbari-very-dark-brown border-red-700"
        }`}>
          {toast.message}
        </div>
      )}
      {/* Cart Controls */}
      <div className="main-container pt-8 pb-4 flex flex-col gap-2">
        {cartOpen && (
          <button
            onClick={() => {
              setCartOpen(false);
              router.replace("/shop");
            }}
            className="self-end px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold shadow hover:bg-emerald-200 transition"
          >
            Close Cart
          </button>
        )}
        {cartOpen && (
          <>
            {/* Discount Code */}
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-2">
              <label htmlFor="discount" className="font-semibold text-emerald-700">Discount Code</label>
              <input
                id="discount"
                value={discountCode}
                onChange={e => setDiscountCode(e.target.value)}
                placeholder="Enter code"
                className="px-4 py-2 rounded-full border border-emerald-300 bg-emerald-50 text-sm shadow-sm focus:border-emerald-500"
              />
              <button
                onClick={() => {
                  // Apply a 25% discount for code 'UBUNTU88', otherwise no discount
                  if (discountCode.trim().toUpperCase() === "UBUNTU88") {
                    setDiscount(Number((subtotal * 0.25).toFixed(2)));
                    setDiscountApplied(true);
                  } else {
                    setDiscount(0);
                    setDiscountApplied(false);
                  }
                }}
                className="px-4 py-2 rounded-full bg-emerald-500 text-imbari-very-dark-brown font-bold hover:bg-emerald-400 transition shadow"
              >
                Apply
              </button>
              {discountApplied && <span className="ml-2 text-green-600 font-semibold">25% Discount Applied!</span>}
            </div>
            {/* Support our Farmers / Add a Tip */}
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
              <span className="font-semibold text-emerald-700">Support our Farmers</span>
              <button
                onClick={() => setShowTip((v) => !v)}
                className="px-4 py-2 rounded-full bg-yellow-200 text-yellow-900 font-bold hover:bg-yellow-300 transition shadow"
              >
                {showTip ? "Remove Tip" : "Add a Tip"}
              </button>
              {showTip && (
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={tip}
                  onChange={e => setTip(Number(e.target.value))}
                  className="ml-2 px-4 py-2 rounded-full border border-yellow-400 bg-yellow-50 text-sm shadow-sm focus:border-yellow-600 w-24"
                  placeholder="$2.00"
                />
              )}
            </div>
            {/* Shipping & taxes */}
            <div className="mt-4 text-sm text-emerald-700">Shipping & taxes collected at checkout</div>
            {/* Subtotal and Final Price */}
            <div className="mt-4 flex flex-col gap-1 text-right">
              <div className="text-xs text-emerald-700">Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})</div>
              <div className="text-lg font-bold text-emerald-900">
                Cart subtotal: ${subtotal.toFixed(2)}
              </div>
              {discount > 0 && (
                <div className="text-sm text-green-600">Discount: -${discount.toFixed(2)}</div>
              )}
              {tip > 0 && (
                <div className="text-sm text-yellow-700">Tip: +${tip.toFixed(2)}</div>
              )}
              <div className="text-lg font-bold text-emerald-900">
                Final price: {discount > 0 && (<span className="line-through text-red-400 mr-2">${originalPrice}</span>)} ${total}
              </div>
              <div className="text-xs text-emerald-700 mt-1">(Includes all discounts and tips)</div>
            </div>
            {/* Checkout Button */}
            <button
              onClick={() => {/* Stripe checkout logic here */}}
              className="mt-6 px-8 py-3 rounded-full bg-emerald-500 text-imbari-very-dark-brown font-bold text-lg shadow-lg hover:bg-emerald-600 transition"
            >
              Checkout &rarr;
            </button>
          </>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-6">Checkout</h1>
      <p className="mb-8 text-lg">Complete your purchase below.</p>

      {/* If cart is empty */}
      {items.length === 0 ? (
        <div className="card p-6 sm:p-8 text-center space-y-4">
          <p className="text-sm sm:text-base text-imbari-very-dark-brown">
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
                <div className="relative w-40 h-40 overflow-hidden rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-36 h-36 object-contain transition-transform duration-300 hover:scale-125"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h2 className="text-sm sm:text-base font-semibold">
                    {item.name}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-imbari-very-dark-brown">
                    ${item.price.toFixed(2)} per unit
                  </p>

                  {/* Quantity & remove */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          updateQuantity(String(item.id), item.quantity - 1);
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
                          updateQuantity(String(item.id), item.quantity + 1);
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
                        className="text-[11px] text-imbari-very-dark-brown hover:text-red-400"
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
              <p className="text-xs sm:text-sm text-imbari-very-dark-brown">
                Confirm your location so we can apply the correct shipping.
                Inside Kampala: <strong>free</strong>. Outside Kampala:{" "}
                <strong>$2 flat</strong>.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-imbari-very-dark-brown">
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
              <div className="flex justify-between text-imbari-very-dark-brown">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-imbari-very-dark-brown">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-imbari-very-dark-brown">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-50 font-bold text-lg mt-2 border-t border-white/10 pt-2">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <button
              onClick={handleStripeCheckout}
              disabled={placingOrder || items.length === 0}
              className="bg-[#10b981] hover:bg-[#22c55e] text-imbari-very-dark-brown font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 mb-4 w-full flex items-center justify-center"
            >
              {placingOrder ? (
                <span className="flex items-center gap-2"><span className="loader border-t-emerald-400 border-4 w-5 h-5 rounded-full animate-spin"></span> Placing Order...</span>
              ) : (
                `Place Order & Pay $${total}`
              )}
            </button>

            <button className="bg-white border-2 border-[#10b981] text-[#10b981] font-semibold py-3 px-8 rounded-full shadow hover:bg-[#f0fdf4] transition-all duration-200 w-full flex items-center justify-center">
              View Cart
            </button>

            <p className="text-[11px] text-neutral-500">
              After you place your order, our team will contact you to confirm
              delivery address, payment method (mobile money, card, or bank),
              and any wholesale or export details.
            </p>
          </aside>
        </section>
      )}

      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-imbari-very-dark-brown font-bold ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"} animate-fade-in`}>
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
              <button onClick={confirmRemove} className="px-4 py-2 rounded bg-emerald-500 text-imbari-very-dark-brown font-bold hover:bg-emerald-400">Yes, Remove</button>
              <button onClick={cancelRemove} className="px-4 py-2 rounded bg-neutral-200 text-neutral-700 font-bold hover:bg-neutral-300">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
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





