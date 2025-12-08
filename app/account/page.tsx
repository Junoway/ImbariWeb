// app/account/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";

const RECOMMENDED_PRODUCTS = [
  {
    id: 1,
    name: "1893 Espresso",
    price: 19.99,
    image: withBasePath("/images/arabica.jpg"),
    description: "Bold and rich espresso blend"
  },
  {
    id: 2,
    name: "African Spice (Dirty Chai) - Medium Roast",
    price: 20.99,
    image: withBasePath("/images/shop2.jpg"),
    description: "Spiced medium roast with chai notes"
  },
  {
    id: 3,
    name: "Decaf Blend",
    price: 18.99,
    image: withBasePath("/images/shop3.jpg"),
    description: "Smooth decaf for anytime enjoyment"
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

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
                href="/account/orders"
                className="block px-4 py-3 rounded-lg hover:bg-emerald-50 text-emerald-800 font-semibold transition"
              >
                ORDER HISTORY
              </Link>
              <Link
                href="/account/settings"
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
            {/* Subscriptions Section */}
            <section className="bg-white rounded-2xl shadow-xl p-8 border-4 border-emerald-300">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">Subscriptions</h2>
              <div className="text-center py-12 border-2 border-dashed border-emerald-200 rounded-xl bg-emerald-50">
                <div className="text-6xl mb-4">☕</div>
                <p className="text-lg text-emerald-700 mb-4">
                  You don't have any subscriptions yet.
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl transition-all border-4 border-emerald-700"
                >
                  Start Shopping
                </Link>
              </div>
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {RECOMMENDED_PRODUCTS.map((product) => (
                  <article
                    key={product.id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-emerald-300 hover:border-orange-400 transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-emerald-800 mb-2 text-lg">
                        {product.name}
                      </h3>
                      <p className="text-sm text-emerald-600 mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-emerald-700">
                          ${product.price}
                        </span>
                        <Link
                          href={`/shop?product=${product.id}`}
                          className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold shadow-lg hover:shadow-xl transition border-2 border-orange-600"
                        >
                          Add
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
