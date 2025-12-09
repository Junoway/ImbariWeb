// app/subscriptions/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/components/AuthContext";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Medium Roast – Whole Beans",
    size: "12oz (340g)",
    price: 17.99,
    subscriberPrice: 16.19,
    image: withBasePath("/images/arabica.jpg"),
  },
  {
    id: 6,
    name: "Medium Roast – Ground Coffee",
    size: "12oz (340g)",
    price: 17.99,
    subscriberPrice: 16.19,
    image: withBasePath("/images/shop.jpg"),
  },
  {
    id: 18,
    name: "Keurig K-Cups Pods",
    size: "Box of 24",
    price: 20.99,
    subscriberPrice: 18.89,
    image: withBasePath("/images/shop2.jpg"),
  },
  {
    id: 5,
    name: "Espresso Roast – Whole Beans",
    size: "2lb (907g)",
    price: 44.99,
    subscriberPrice: 40.49,
    image: withBasePath("/images/robusta.jpg"),
  },
];

export default function SubscriptionsPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-700 to-green-600 text-white py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/farm.jpg')] bg-cover bg-center"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-emerald-900 font-bold text-sm mb-6 shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Named one of the Best Coffee Subscriptions by Bon Appétit!
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Subscribe & Save on Premium Ugandan Coffee
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
            Never run out of Africa's finest coffee. Get monthly deliveries with exclusive subscriber benefits and discounts.
          </p>
          
          {!user ? (
            <button
              onClick={() => router.push("/signup")}
              className="px-10 py-5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-emerald-900 font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-yellow-300"
            >
              Start Your Subscription Today
            </button>
          ) : (
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-emerald-900 font-bold text-xl shadow-2xl border-4 border-yellow-300">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>You're Already Subscribed! Enjoy 10% Off</span>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-12">
            Subscriber Benefits
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-emerald-200 text-center hover:shadow-2xl transition-all">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-3">10% Off Everything</h3>
              <p className="text-emerald-700 leading-relaxed">
                Save 10% on all bagged coffee, ground coffee, and instant sachets. Plus get 20% off Keurig® K-Cups®!
              </p>
              <div className="mt-4 text-sm text-emerald-600 font-semibold">
                *Based on full "Compare At" price
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-yellow-200 text-center hover:shadow-2xl transition-all">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-3">Free Shipping</h3>
              <p className="text-emerald-700 leading-relaxed">
                Free shipping on orders $30+. Discounted shipping at just $3.99 for subscriptions under $30.
              </p>
              <div className="mt-4 text-sm text-emerald-600 font-semibold">
                No minimum order quantity required
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-orange-200 text-center hover:shadow-2xl transition-all">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-3">Exclusive Perks</h3>
              <p className="text-emerald-700 leading-relaxed">
                Early access to new blends, surprise samples, exclusive subscriber-only offers, and priority customer support.
              </p>
              <div className="mt-4 text-sm text-emerald-600 font-semibold">
                More goodies every month!
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-br from-emerald-100 via-yellow-50 to-orange-50 rounded-2xl p-10 border-4 border-emerald-300 shadow-xl">
            <h3 className="text-3xl font-bold text-emerald-800 mb-6 text-center">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl mb-3">1️⃣</div>
                <h4 className="font-bold text-emerald-800 mb-2">Sign Up</h4>
                <p className="text-sm text-emerald-700">Create your free account in under 2 minutes</p>
              </div>
              <div>
                <div className="text-4xl mb-3">2️⃣</div>
                <h4 className="font-bold text-emerald-800 mb-2">Choose Products</h4>
                <p className="text-sm text-emerald-700">Select your favorite coffee and quantity</p>
              </div>
              <div>
                <div className="text-4xl mb-3">3️⃣</div>
                <h4 className="font-bold text-emerald-800 mb-2">Set Frequency</h4>
                <p className="text-sm text-emerald-700">Pick monthly, bi-weekly, or weekly deliveries</p>
              </div>
              <div>
                <div className="text-4xl mb-3">4️⃣</div>
                <h4 className="font-bold text-emerald-800 mb-2">Enjoy & Save</h4>
                <p className="text-sm text-emerald-700">Automatic deliveries with 10% off every order</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products with Subscriber Pricing */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Popular Subscriptions
          </h2>
          <p className="text-center text-emerald-700 mb-12 text-lg">
            See how much you'll save with a subscription!
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-xl border-4 border-emerald-200 p-6 hover:shadow-2xl transition-all hover:border-yellow-400"
              >
                <div className="w-full h-40 bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100 rounded-lg flex items-center justify-center mb-4 border-2 border-emerald-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="w-32 h-32 object-contain drop-shadow-lg"
                  />
                </div>
                
                <h3 className="font-bold text-emerald-800 mb-2 text-sm">{product.name}</h3>
                <p className="text-xs text-emerald-600 mb-3">{product.size}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Regular Price:</span>
                    <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700">Subscriber Price:</span>
                    <span className="text-xl font-bold text-emerald-600">${product.subscriberPrice.toFixed(2)}</span>
                  </div>
                  <div className="text-center py-1 px-2 bg-yellow-100 border-2 border-yellow-400 rounded-full">
                    <span className="text-xs font-bold text-yellow-700">Save ${(product.price - product.subscriberPrice).toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.subscriberPrice,
                      image: product.image,
                    }, 1);
                  }}
                  className="w-full py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button
              onClick={() => router.push("/shop")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all border-4 border-emerald-700"
            >
              Browse All Products →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section - Only show to non-logged-in users */}
      {!user && (
        <section className="py-20 px-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience Africa's Finest Coffee?
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Join thousands of coffee lovers enjoying premium Ugandan coffee delivered to their door every month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/signup")}
                className="px-10 py-5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-emerald-900 font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-yellow-300"
              >
                Subscribe Now
              </button>
              <button
                onClick={() => router.push("/shop")}
                className="px-10 py-5 rounded-full bg-white/10 backdrop-blur text-white font-bold text-xl shadow-xl hover:bg-white/20 transition-all border-4 border-white/30"
              >
                Shop Without Subscription
              </button>
            </div>
            <p className="text-sm text-emerald-200 mt-6">
              No commitment • Cancel anytime • Free shipping on orders $30+
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
