// app/checkout/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useState, useMemo } from "react";

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const [location, setLocation] = useState<"kampala" | "outside">("kampala");
  const [placingOrder, setPlacingOrder] = useState(false);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    return location === "kampala" ? 0 : 2;
  }, [location, items.length]);

  const total = subtotal + shipping;

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
                  className="card p-4 sm:p-5 flex gap-4 sm:gap-5"
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
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-white/15 text-xs flex items-center justify-center hover:bg-white/10"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-white/15 text-xs flex items-center justify-center hover:bg-white/10"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
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
            <aside className="card p-6 sm:p-7 space-y-6">
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
                <div className="flex justify-between text-neutral-50 font-semibold text-base mt-1">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder || items.length === 0}
                className="button-primary w-full text-sm disabled:opacity-60"
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
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
    </main>
  );
}
