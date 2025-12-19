    // Add-to-Subscriptions helper for recommended products
    const addToSubscriptions = async (p: { id: number | string; name: string; price: number; image: string; }) => {
      setSubError("");
      setSubmitting(true);

      try {
        if (!token) throw new Error("Please log in again.");

        const r = await fetch(`${API_BASE}/api/subscriptions`, {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({
            productId: String(p.id),
            name: p.name,
            unitPrice: p.price, // store current price snapshot
            image: p.image,
            quantity: 1,
            cadence: "monthly",
          }),
        });

        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data?.error || "Failed to add to subscriptions");

        router.refresh();
      } catch (e: any) {
        setSubError(e?.message || "Failed to add subscription item");
      } finally {
        setSubmitting(false);
      }
    };
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchSubscriptionItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";

type SubscriptionItem = {
  product_id: string;
  name: string;
  image?: string | null;
  unit_price?: number | string | null;
  quantity: number;
  cadence?: string;
  active?: boolean;
};

const RECOMMENDED_PRODUCTS = [
  {
    id: 1,
    name: "Medium Roast – Whole Beans",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/arabica.jpg"),
    description: "Single-origin Mt. Elgon Arabica beans",
  },
  {
    id: 6,
    name: "Medium Roast – Ground Coffee",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/shop.jpg"),
    description: "Smooth grind for pour-over and French press",
  },
  {
    id: 18,
    name: "Keurig K-Cups Pods",
    size: "Box of 24",
    price: 20.99,
    image: withBasePath("/images/shop2.jpg"),
    description: "Keurig-compatible K-Cup pods",
  },
  {
    id: 5,
    name: "Espresso Roast – Whole Beans",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/robusta.jpg"),
    description: "Crafted for espresso machines with thick crema",
  },
];

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://api.imbaricoffee.com";

function formatMoney(n: number) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

export default function AccountPage() {
  const router = useRouter();
  const { user, token, logout, isAuthenticated } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [subError, setSubError] = useState<string>("");
  const [toast, setToast] = useState<string>("");

  // Subscription items state
  const [subItems, setSubItems] = useState<SubscriptionItem[]>([]);
  const [subItemsLoading, setSubItemsLoading] = useState(false);
  const [subItemsError, setSubItemsError] = useState<string>("");

  const authHeaders = useMemo(() => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  async function fetchSubscriptionItems() {
    setSubItemsError("");
    setSubItemsLoading(true);
    try {
      if (!token) throw new Error("Missing token");
      const r = await fetch(`${API_BASE}/api/subscriptions`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || "Failed to load subscriptions");
      setSubItems(Array.isArray(data?.items) ? data.items : []);
    } catch (e: any) {
      setSubItems([]);
      setSubItemsError(e?.message || "Failed to load subscriptions");
    } finally {
      setSubItemsLoading(false);
    }
  }

  async function addToSubscriptions(p: any) {
    setSubItemsError("");
    try {
      if (!token) throw new Error("Please log in again.");
      if (!user?.isSubscribed) {
        throw new Error("Please subscribe first to enable monthly auto-orders.");
      }

      const r = await fetch(`${API_BASE}/api/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          productId: String(p.id),
          name: p.name,
          image: p.image,
          unitPrice: p.price,
          quantity: 1,
          cadence: "monthly",
        }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || "Failed to add subscription item");

      await fetchSubscriptionItems();
    } catch (e: any) {
      setSubItemsError(e?.message || "Failed to add subscription item");
    }
  }

  async function removeSubscriptionItem(productId: string) {
    setSubItemsError("");
    try {
      if (!token) throw new Error("Please log in again.");
      const r = await fetch(`${API_BASE}/api/subscriptions?productId=${encodeURIComponent(productId)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || "Failed to remove item");
      await fetchSubscriptionItems();
    } catch (e: any) {
      setSubItemsError(e?.message || "Failed to remove item");
    }
  }

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchSubscriptionItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);

  if (!user) return null;

  const isSubscriber = !!user.isSubscribed;
  const DISCOUNT_RATE = 0.10;

  const discounted = (price: number) => Number((price * (1 - DISCOUNT_RATE)).toFixed(2));

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const updateSubscription = async (nextSubscribed: boolean) => {
    setSubError("");
    setSubmitting(true);

    try {
      if (!token) throw new Error("Please log in again.");

      const r = await fetch(`${API_BASE}/api/user/subscription`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ isSubscribed: nextSubscribed }),
      });

      if (!r.ok) {
        const t = await r.text();
        throw new Error(t || "Failed to update subscription");
      }

      // Refresh user profile
      const me = await fetch(`${API_BASE}/api/user/me`, { method: "GET", headers: authHeaders });
      const data = await me.json().catch(() => ({}));

      const updatedUser = data?.user?.email ? data.user : { ...user, isSubscribed: nextSubscribed };
      localStorage.setItem("imbari_user", JSON.stringify(updatedUser));

      router.refresh();
      setToast(nextSubscribed ? "Subscription activated." : "Subscription canceled.");
      setTimeout(() => setToast(""), 2500);
    } catch (err: any) {
      setSubError(err?.message || "Subscription update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const addToSubscriptions = async (p: (typeof RECOMMENDED_PRODUCTS)[number]) => {
    setSubItemsError("");
    setToast("");

    if (!isSubscriber) {
      setToast("Subscribe first to start monthly deliveries.");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    try {
      if (!token) throw new Error("Please log in again.");

      const r = await fetch(`${API_BASE}/api/subscriptions`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          productId: p.id,
          quantity: 1,
          // Optionally pass display fields to backend to store snapshots:
          name: p.name,
          size: p.size,
          price: p.price,
          image: p.image,
        }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || "Failed to add subscription item");

      // optimistic refresh
      const next = Array.isArray(data?.items) ? (data.items as SubscriptionItem[]) : null;
      if (next) setSubItems(next);
      else {
        // fallback: fetch again
        const rr = await fetch(`${API_BASE}/api/subscriptions`, { method: "GET", headers: authHeaders });
        const dd = await rr.json().catch(() => ({}));
        setSubItems(Array.isArray(dd?.items) ? dd.items : []);
      }

      setToast("Added to your monthly subscriptions.");
      setTimeout(() => setToast(""), 2500);
    } catch (e) {
      setSubItemsError(e instanceof Error ? e.message : "Failed to add subscription item");
    }
  };

  const removeSubItem = async (productId: number) => {
    try {
      if (!token) throw new Error("Please log in again.");

      const r = await fetch(`${API_BASE}/api/subscriptions/${encodeURIComponent(String(productId))}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || "Failed to remove item");

      setSubItems(Array.isArray(data?.items) ? data.items : subItems.filter((x) => x.productId !== productId));
      setToast("Removed from subscriptions.");
      setTimeout(() => setToast(""), 2000);
    } catch (e) {
      setSubItemsError(e instanceof Error ? e.message : "Failed to remove subscription item");
    }
  };

  const updateSubQty = async (productId: number, quantity: number) => {
    const q = Math.max(1, Math.min(99, Number(quantity || 1)));
    try {
      if (!token) throw new Error("Please log in again.");

      const r = await fetch(`${API_BASE}/api/subscriptions/${encodeURIComponent(String(productId))}`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({ quantity: q }),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || "Failed to update quantity");

      setSubItems(Array.isArray(data?.items) ? data.items : subItems.map((x) => (x.productId === productId ? { ...x, quantity: q } : x)));
    } catch (e) {
      setSubItemsError(e instanceof Error ? e.message : "Failed to update quantity");
    }
  };

  const monthlyEstimate = useMemo(() => {
    const sum = subItems.reduce((acc, it) => {
      const unit = isSubscriber ? discounted(it.price) : it.price;
      return acc + unit * Math.max(1, it.quantity || 1);
    }, 0);
    return Number(sum.toFixed(2));
  }, [subItems, isSubscriber]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 mb-1">
            Hi, {user.firstName} {user.lastName}
          </h1>
          <p className="text-emerald-600">{user.email}</p>
        </div>

        {toast ? (
          <div className="mb-6 bg-emerald-50 border-2 border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl font-semibold">
            {toast}
          </div>
        ) : null}

        <div className="grid lg:grid-cols-[280px,1fr] gap-8">
          {/* Sidebar */}
          <aside className="bg-white rounded-2xl shadow-xl p-6 border-4 border-emerald-300 h-fit">
            <nav className="space-y-2">
              <Link
                href="/account"
                className="block px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-imbari-very-dark-brown font-bold transition"
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

          {/* Main */}
          <div className="space-y-8">
            {/* Subscription Status */}
            <section className="bg-white rounded-2xl shadow-xl p-8 border-4 border-emerald-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-emerald-800">Subscription Status</h2>
                {isSubscriber && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-imbari-very-dark-brown font-bold shadow-lg">
                    ACTIVE
                  </div>
                )}
              </div>

              {subError ? (
                <div className="mb-4 bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  {subError}
                </div>
              ) : null}

              {isSubscriber ? (
                <div className="space-y-4">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200">
                    <div className="font-bold text-emerald-800 mb-1">You’re subscribed.</div>
                    <div className="text-sm text-emerald-700">
                      Your monthly items below will be charged automatically. 10% discount applies.
                    </div>
                  </div>

                  <button
                    onClick={() => updateSubscription(false)}
                    disabled={submitting}
                    className="w-full py-3 rounded-full bg-gray-200 text-imbari-navy font-semibold hover:bg-gray-300 transition disabled:opacity-60"
                  >
                    {submitting ? "Updating..." : "Unsubscribe"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center py-8 border-2 border-dashed border-emerald-200 rounded-xl bg-emerald-50">
                    <div className="text-5xl mb-4">☕</div>
                    <p className="text-lg text-emerald-700 mb-2 font-semibold">Not subscribed yet</p>
                    <p className="text-sm text-emerald-600">
                      Subscribe to activate monthly deliveries and unlock 10% off.
                    </p>
                  </div>

                  <button
                    onClick={() => updateSubscription(true)}
                    disabled={submitting}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-imbari-very-dark-brown font-bold text-lg shadow-lg hover:shadow-xl transition-all border-4 border-emerald-700 disabled:opacity-60"
                  >
                    {submitting ? "Updating..." : "Subscribe Now & Save 10%"}
                  </button>
                </div>
              )}
            </section>

            {/* Your Monthly Subscriptions */}
            <section className="bg-white rounded-2xl shadow-xl p-8 border-4 border-emerald-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-emerald-800">Your Monthly Subscriptions</h2>
                <span className="text-sm text-emerald-700 font-semibold">Auto-order every month</span>
              </div>

              {subItemsError ? (
                <div className="mb-4 bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  {subItemsError}
                </div>
              ) : null}

              {!user.isSubscribed ? (
                <div className="text-center py-8 border-2 border-dashed border-emerald-200 rounded-xl bg-emerald-50">
                  <div className="text-4xl mb-3">📦</div>
                  <div className="font-bold text-emerald-800">Subscribe to activate monthly auto-orders</div>
                  <div className="text-sm text-emerald-700 mt-1">
                    After subscribing, add products below to your monthly box.
                  </div>
                </div>
              ) : subItemsLoading ? (
                <div className="py-8 text-center text-emerald-700 font-semibold">Loading your subscription box…</div>
              ) : subItems.length ? (
                <div className="space-y-3">
                  {subItems.map((it) => (
                    <div key={it.product_id} className="flex items-center gap-4 p-4 rounded-xl border border-emerald-200 bg-emerald-50">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-emerald-100 bg-white relative">
                        {it.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={it.image} alt={it.name} className="w-full h-full object-contain" />
                        ) : null}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-emerald-900 truncate">{it.name}</div>
                        <div className="text-sm text-emerald-700">
                          Qty: <span className="font-semibold">x{it.quantity}</span> •{" "}
                          <span className="font-semibold">{(it.cadence || "monthly").toUpperCase()}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeSubscriptionItem(it.product_id)}
                        className="px-4 py-2 rounded-full bg-white border-2 border-red-200 text-red-700 font-bold text-xs hover:bg-red-50 transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-emerald-200 rounded-xl bg-emerald-50">
                  <div className="text-4xl mb-3">📦</div>
                  <div className="font-bold text-emerald-800">No subscription items yet</div>
                  <div className="text-sm text-emerald-700 mt-1">
                    Add products below to build your monthly box.
                  </div>
                </div>
              )}
            </section>

            {/* My Subscriptions */}
            <section className="bg-white rounded-2xl shadow-xl p-8 border-4 border-emerald-300">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-emerald-800">My Monthly Subscriptions</h2>
                  <p className="text-sm text-emerald-700">
                    These items repeat every month. Edit quantities any time.
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-emerald-600 font-semibold">Estimated monthly total</div>
                  <div className="text-xl font-extrabold text-emerald-900">{formatMoney(monthlyEstimate)}</div>
                </div>
              </div>

              {subItemsError ? (
                <div className="mb-4 bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl">
                  {subItemsError}
                </div>
              ) : null}

              {subItemsLoading ? (
                <div className="py-10 text-center text-emerald-800 font-semibold">
                  Loading your subscriptions…
                </div>
              ) : subItems.length === 0 ? (
                <div className="py-10 text-center border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50">
                  <div className="text-4xl mb-3">📦</div>
                  <div className="font-extrabold text-emerald-800">No subscription items yet</div>
                  <div className="text-sm text-emerald-700 mt-1">
                    Add items below to start your monthly box.
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {subItems.map((it) => {
                    const unit = isSubscriber ? discounted(it.price) : it.price;
                    const qty = Math.max(1, it.quantity || 1);
                    return (
                      <div
                        key={it.productId}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border-2 border-emerald-200 bg-white"
                      >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-emerald-100 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
                          {it.image ? (
                            <Image src={it.image} alt={it.name} fill className="object-contain p-2" sizes="80px" />
                          ) : null}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-emerald-900 truncate">{it.name}</div>
                          {it.size ? <div className="text-sm text-emerald-600">{it.size}</div> : null}
                          <div className="text-sm text-emerald-800 mt-1">
                            Unit: <span className="font-bold">{formatMoney(unit)}</span>
                            {isSubscriber ? <span className="ml-2 text-xs text-emerald-600">(10% off)</span> : null}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="text-sm font-semibold text-emerald-800" htmlFor={`qty-${it.productId}`}>
                            Qty
                          </label>
                          <input
                            id={`qty-${it.productId}`}
                            name={`qty-${it.productId}`}
                            type="number"
                            min={1}
                            max={99}
                            value={qty}
                            onChange={(e) => updateSubQty(it.productId, Number(e.target.value))}
                            className="w-20 px-3 py-2 rounded-xl border-2 border-emerald-200 outline-none focus:border-emerald-400"
                          />
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-emerald-700 font-semibold">Monthly</div>
                          <div className="text-lg font-extrabold text-emerald-900">
                            {formatMoney(Number((unit * qty).toFixed(2)))}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSubItem(it.productId)}
                            className="mt-2 text-sm font-bold text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
                <Link
                  href="/shop"
                  className="px-6 py-3 rounded-full bg-white border-2 border-emerald-200 text-emerald-800 font-bold hover:bg-emerald-50 transition text-center"
                >
                  Buy once instead → Shop
                </Link>

                <Link
                  href="/order-history"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-imbari-very-dark-brown font-extrabold border-2 border-orange-600 hover:shadow-lg transition text-center"
                >
                  View Order History
                </Link>
              </div>
            </section>

            {/* Recommended for Subscription */}
            <section>
              <h2 className="text-2xl font-bold text-emerald-800 mb-6">
                Recommended for Subscription
              </h2>
              <p className="text-emerald-700 mb-4">
                Add these to your monthly box. Discount applies when subscribed.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {RECOMMENDED_PRODUCTS.map((product) => {
                  const priceShown = isSubscriber ? discounted(product.price) : product.price;
                  return (
                    <article
                      key={product.id}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-emerald-300 hover:border-orange-400 transition-all duration-300"
                    >
                      <div className="relative h-40 bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100">
                        <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-emerald-800 mb-1 text-sm">{product.name}</h3>
                        <p className="text-xs text-emerald-500 mb-2">{product.size}</p>
                        <p className="text-xs text-emerald-600 mb-3">{product.description}</p>

                        <div className="flex items-center justify-between">
                          <div>
                            {isSubscriber ? (
                              <div>
                                <div className="text-lg font-bold text-emerald-700">{formatMoney(priceShown)}</div>
                                <div className="text-xs text-gray-400 line-through">{formatMoney(product.price)}</div>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-emerald-700">{formatMoney(product.price)}</span>
                            )}
                          </div>

                          <button
                            onClick={() => addToSubscriptions({
                              id: product.id,
                              name: product.name,
                              price: isSubscriber ? discounted(product.price) : product.price,
                              image: product.image,
                            })}
                            disabled={submitting}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs shadow-lg hover:shadow-xl transition disabled:opacity-60"
                          >
                            Add to Subscriptions
                          </button>
                        </div>

                        {!isSubscriber && (
                          <div className="mt-3 text-[11px] text-emerald-700">
                            Subscribe first to activate monthly deliveries.
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/shop"
                  className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-imbari-very-dark-brown font-bold text-lg shadow-xl hover:shadow-2xl transition-all border-4 border-emerald-700"
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



