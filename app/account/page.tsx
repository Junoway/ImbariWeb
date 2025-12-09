// app/account/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";
import { useCart } from "@/components/CartContext";

const RECOMMENDED_PRODUCTS = [
  {
    id: 1,
    name: "Medium Roast – Whole Beans",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/arabica.jpg"),
    description: "Single-origin Mt. Elgon Arabica beans"
  },
  {
    id: 6,
    name: "Medium Roast – Ground Coffee",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/shop.jpg"),
    description: "Smooth grind for pour-over and French press"
  },
  {
    id: 18,
    name: "Keurig K-Cups Pods",
    size: "Box of 24",
    price: 20.99,
    image: withBasePath("/images/shop2.jpg"),
    description: "Keurig-compatible K-Cup pods"
  },
  {
    id: 5,
    name: "Espresso Roast – Whole Beans",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/robusta.jpg"),
    description: "Crafted for espresso machines with thick crema"
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, toggleSubscription, isAuthenticated } = useAuth();
  const { addItem } = useCart();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 mb-1">
            Hi, {user.firstName} {user.lastName}
          </h1>
          <p className="text-emerald-600">{user.email}</p>
        </div>

        <div className="grid lg:grid-cols-[280px,1fr] gap-8">
          {/* Sidebar */}
          <aside className="bg-white rounded-2xl shadow-xl p-6 border-4 border-emerald-300 h-fit">
            <nav className="space-y-2">
              <Link
                href="/account"
                className="block px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold transition"
              >
                SUBSCRIPTIONS
              </Link>
              <Link
                href="/order-history"
                className="block px-4 py-3 rounded-lg hover:bg-emerald-50 text-emerald-800 font-semibold transition"
              >
                ORDER HISTORY
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-3 rounded-lg hover:bg-emerald-50 text-emerald-800 font-semibold transition"
              >
                SETTINGS
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 font-semibold transition"
              >
                LOG OUT
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Subscription Status Section */}
            <section className="bg-white rounded-2xl shadow-xl p-8 border-4 border-emerald-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-emerald-800">Subscription Status</h2>
                {user.isSubscribed && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    ACTIVE
                  </div>
                )}
              </div>
              
              {user.isSubscribed ? (
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">🎉</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-emerald-800 mb-2">
                          You're subscribed and saving 10%!
                        </h3>
                        <ul className="space-y-2 text-emerald-700">
                          <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>10% off all products automatically applied</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Free shipping on orders over $30</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Exclusive subscriber-only perks and offers</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={toggleSubscription}
                    className="w-full py-3 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                  >
                    Unsubscribe
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center py-8 border-2 border-dashed border-emerald-200 rounded-xl bg-emerald-50">
                    <div className="text-5xl mb-4">☕</div>
                    <p className="text-lg text-emerald-700 mb-2 font-semibold">
                      Not subscribed yet
                    </p>
                    <p className="text-sm text-emerald-600 mb-6">
                      Subscribe now and get 10% off all your orders!
                    </p>
                  </div>
                  <button
                    onClick={toggleSubscription}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all border-4 border-emerald-700"
                  >
                    Subscribe Now & Save 10%
                  </button>
                </div>
              )}
            </section>

            {/* Recommended Products */}
            <section>
              <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
                <span>Recommended For You</span>
                <span className="text-3xl">🐒</span>
              </h2>
              
              <div className="mb-4 text-lg font-semibold text-emerald-700">
                You might like...
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {RECOMMENDED_PRODUCTS.map((product) => {
                  const discountedPrice = user.isSubscribed 
                    ? Number((product.price * 0.9).toFixed(2)) 
                    : product.price;
                  
                  return (
                    <article
                      key={product.id}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-emerald-300 hover:border-orange-400 transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative h-40 bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-emerald-800 mb-1 text-sm">
                          {product.name}
                        </h3>
                        <p className="text-xs text-emerald-500 mb-2">
                          {product.size}
                        </p>
                        <p className="text-xs text-emerald-600 mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            {user.isSubscribed ? (
                              <div>
                                <div className="text-lg font-bold text-emerald-700">
                                  ${discountedPrice}
                                </div>
                                <div className="text-xs text-gray-400 line-through">
                                  ${product.price.toFixed(2)}
                                </div>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-emerald-700">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => addItem({
                              id: product.id,
                              name: product.name,
                              price: discountedPrice,
                              image: product.image,
                            }, 1)}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xs shadow-lg hover:shadow-xl transition border-2 border-orange-600"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              
              <div className="text-center mt-8">
                <Link
                  href="/shop"
                  className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all border-4 border-emerald-700"
                >
                  Browse All Products →
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
