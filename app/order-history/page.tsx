// app/order-history/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/AuthContext";

type OrderItem = {
  name: string;
  quantity: number;
  image?: string;
  price?: number;
};

type DbOrder = {
  session_id: string;
  status?: "pending" | "paid" | "failed" | "expired" | string;
  total?: number | string;
  currency?: string;

  email?: string | null;
  created_at?: string;
  paid_at?: string | null;
  error?: string | null;

  items?: OrderItem[] | null;
  location?: string | null;

  shipping?: number | string;
  tax?: number | string;
  discount_code?: string | null;
  discount_amount?: number | string;
  tip_amount?: number | string;
};

function getToken(): string {
  if (typeof window === "undefined") return "";
  return (
    localStorage.getItem("imbari_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

function formatMoney(amount: number | string | undefined, currency?: string) {
  if (amount == null) return "—";
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(n)) return String(amount);

  const cur = (currency || "usd").toUpperCase();
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: cur }).format(n);
  } catch {
    const prefix = cur === "USD" ? "$" : "";
    return `${prefix}${n.toFixed(2)} ${cur}`;
  }
}

function toLocalTime(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

function statusMeta(status?: string) {
  const s = (status || "pending").toLowerCase();

  if (s === "paid") {
    return {
      label: "Paid",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      dot: "bg-emerald-500",
    };
  }
  if (s === "failed") {
    return {
      label: "Payment Failed",
      badge: "bg-red-100 text-red-800 border-red-200",
      dot: "bg-red-500",
    };
  }
  if (s === "expired") {
    return {
      label: "Checkout Expired",
      badge: "bg-amber-100 text-amber-900 border-amber-200",
      dot: "bg-amber-500",
    };
  }
  if (s === "pending") {
    return {
      label: "Pending",
      badge: "bg-gray-100 text-gray-800 border-gray-200",
      dot: "bg-gray-500",
    };
  }

  return {
    label: s.toUpperCase(),
    badge: "bg-gray-100 text-gray-800 border-gray-200",
    dot: "bg-gray-500",
  };
}

function friendlyNote(error?: string | null, status?: string) {
  const e = (error || "").toLowerCase();
  const s = (status || "").toLowerCase();

  if (s === "expired" || e.includes("expired") || e.includes("checkout_session_expired")) {
    return "Checkout expired before payment was completed. No charge was made.";
  }
  if (s === "failed" || e.includes("failed") || e.includes("card")) {
    return "Payment did not go through. Please try again or use a different card.";
  }
  if (s === "pending") {
    return "Checkout started. Complete payment to finalize your order.";
  }
  if (s === "paid") {
    return "Payment received. Thank you for supporting Imbari Coffee.";
  }
  return error ? String(error) : "";
}

function safeString(s: any) {
  return typeof s === "string" ? s.trim() : "";
}

function orderRef(order: DbOrder) {
  // Prefer created_at for date portion
  const d = order.created_at ? new Date(order.created_at) : null;
  const yyyy = d && !Number.isNaN(d.getTime()) ? d.getFullYear() : new Date().getFullYear();
  const mm = d && !Number.isNaN(d.getTime()) ? String(d.getMonth() + 1).padStart(2, "0") : "01";
  const dd = d && !Number.isNaN(d.getTime()) ? String(d.getDate()).padStart(2, "0") : "01";

  const sid = safeString(order.session_id);
  const tail = sid ? sid.slice(-6).toUpperCase() : "------";
  return `IMB-${yyyy}${mm}${dd}-${tail}`;
}

function itemsSummary(items?: OrderItem[] | null) {
  const list = Array.isArray(items) ? items : [];
  const count = list.reduce((sum, it) => sum + Math.max(1, Number(it?.quantity || 1)), 0);

  const first = list[0];
  const firstName = safeString(first?.name) || "Coffee Item";
  const firstQty = Math.max(1, Number(first?.quantity || 1));

  const title = list.length ? `${firstName}${firstQty > 1 ? ` ×${firstQty}` : ""}` : "Items unavailable";
  const more =
    list.length <= 1
      ? count === 1
        ? "1 item"
        : `${count} items`
      : `${count} items (and more)`;

  const image = safeString(first?.image) || "";
  return { title, subtitle: list.length ? more : "This order was recorded, but items were not saved.", image, hasItems: list.length > 0 };
}

export default function OrderHistoryPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [query, setQuery] = useState("");

  const API_BASE = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.imbaricoffee.com"
    );
  }, []);

  const displayName = useMemo(() => {
    const u: any = user || {};
    const first = safeString(u.firstName || u.firstname || u.given_name);
    const last = safeString(u.lastName || u.lastname || u.family_name);
    const combined = `${first}${first && last ? " " : ""}${last}`.trim();
    return combined || safeString(u.name || u.fullName) || "Customer";
  }, [user]);

  const displayEmail = useMemo(() => {
    const u: any = user || {};
    return safeString(u.email || u.user?.email);
  }, [user]);

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;

    return orders.filter((o) => {
      const status = (o.status || "").toLowerCase();
      const ref = orderRef(o).toLowerCase();
      const email = (o.email || "").toLowerCase();
      const items = (o.items || []).map((it) => it?.name || "").join(" ").toLowerCase();
      return status.includes(q) || ref.includes(q) || email.includes(q) || items.includes(q);
    });
  }, [orders, query]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    let canceled = false;

    (async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        const token = getToken();
        if (!token) throw new Error("Missing session token. Please sign out and sign in again.");

        const res = await fetch(`${API_BASE}/api/orders`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const msg =
            data?.error ||
            (res.status === 401 ? "Please log in again. Session expired." : "Failed to fetch orders.");
          throw new Error(msg);
        }

        const list = Array.isArray(data?.orders) ? (data.orders as DbOrder[]) : [];
        if (!canceled) setOrders(list);
      } catch (e) {
        if (!canceled) {
          setErrorMsg(e instanceof Error ? e.message : "Failed to load orders");
          setOrders([]);
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [user, router, API_BASE]);

  function handleBuyAgain(order: DbOrder) {
    const list = Array.isArray(order.items) ? order.items : [];
    if (!list.length) return;

    // One-time cart restore payload for /shop
    try {
      localStorage.setItem("imbari_buy_again_items", JSON.stringify(list));
    } catch {
      // Ignore storage errors; still navigate to shop
    }
    router.push("/shop");
  }

  function handleTryAgain(order: DbOrder) {
    // If it’s expired/failed, user generally wants to re-shop quickly.
    // If we have items, "Try Again" behaves like Buy Again.
    const list = Array.isArray(order.items) ? order.items : [];
    if (list.length) return handleBuyAgain(order);

    router.push("/shop");
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-800 tracking-tight">
              Order History
            </h1>
            <p className="text-emerald-700 mt-1">
              Your purchases, payment status, and receipts in one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/account"
              className="px-5 py-3 rounded-full bg-white/80 backdrop-blur border-2 border-emerald-200 text-emerald-800 font-bold hover:bg-white transition shadow"
            >
              ← Back to Account
            </Link>
            <Link
              href="/shop"
              className="px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-imbari-very-dark-brown font-bold hover:shadow-lg transition border-4 border-emerald-700"
            >
              Shop
            </Link>
          </div>
        </div>

        <section className="bg-white rounded-2xl shadow-2xl border-4 border-emerald-300 overflow-hidden">
          {/* Identity + Search */}
          <div className="p-6 sm:p-8 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-yellow-50 to-orange-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <div className="text-emerald-900 font-bold truncate">{displayName}</div>
                <div className="text-sm text-emerald-700 truncate">{displayEmail}</div>
              </div>

              <div className="w-full sm:w-[340px]">
                <label htmlFor="orderSearch" className="sr-only">
                  Search orders
                </label>
                <input
                  id="orderSearch"
                  name="orderSearch"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by item, status, or order number…"
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl border-2 border-emerald-200 bg-white text-emerald-900 placeholder:text-emerald-400 outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          {loading && (
            <div className="p-10 text-center">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Loading your orders…
              </div>
            </div>
          )}

          {!loading && errorMsg && (
            <div className="p-10 text-center">
              <div className="max-w-xl mx-auto bg-red-50 text-red-800 border-2 border-red-200 rounded-2xl px-6 py-5 shadow">
                <div className="font-extrabold mb-1">Could not load orders</div>
                <div className="text-sm break-words">{errorMsg}</div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 rounded-full bg-white border-2 border-red-200 text-red-700 font-bold hover:bg-red-50 transition"
                  >
                    Retry
                  </button>
                  <Link
                    href="/account"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-imbari-very-dark-brown font-bold border-4 border-emerald-700 hover:shadow-lg transition"
                  >
                    Back to Account
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!loading && !errorMsg && !filteredOrders.length && (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">☕</div>
              <div className="text-xl font-extrabold text-emerald-800 mb-1">
                {orders.length ? "No matches" : "No orders yet"}
              </div>
              <div className="text-emerald-700 mb-6">
                {orders.length ? "Try clearing your search." : "Place an order and it will appear here."}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {orders.length ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="inline-block px-10 py-4 rounded-full bg-white border-2 border-emerald-200 text-emerald-800 font-bold hover:bg-emerald-50 transition"
                  >
                    Clear search
                  </button>
                ) : null}

                <Link
                  href="/shop"
                  className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-imbari-very-dark-brown font-bold text-lg shadow-xl hover:shadow-2xl transition-all border-4 border-emerald-700"
                >
                  Browse Products →
                </Link>
              </div>
            </div>
          )}

          {!loading && !errorMsg && !!filteredOrders.length && (
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                {filteredOrders.map((order) => {
                  const created = toLocalTime(order.created_at);
                  const paid = toLocalTime(order.paid_at);
                  const meta = statusMeta(order.status);

                  const summary = itemsSummary(order.items);
                  const note = friendlyNote(order.error, order.status);

                  const canBuyAgain = summary.hasItems;

                  return (
                    <article
                      key={order.session_id}
                      className="rounded-2xl border-2 border-emerald-200 shadow-lg overflow-hidden"
                    >
                      {/* Header */}
                      <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-50 via-yellow-50 to-orange-50 border-b border-emerald-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-3">
                              <span className={`w-3 h-3 rounded-full ${meta.dot}`} />
                              <div className="font-extrabold text-emerald-900 truncate">
                                {orderRef(order)}
                              </div>
                            </div>

                            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-emerald-800/80">
                              {created && (
                                <span>
                                  Order placed: <span className="font-semibold">{created}</span>
                                </span>
                              )}
                              {paid && (
                                <span>
                                  Paid: <span className="font-semibold">{paid}</span>
                                </span>
                              )}
                              {order.location && (
                                <span className="inline-flex items-center gap-1">
                                  <span className="font-semibold">Location:</span> {order.location}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`px-4 py-2 rounded-full text-xs font-extrabold border ${meta.badge}`}
                            >
                              {meta.label}
                            </span>

                            <div className="text-right">
                              <div className="text-xs text-emerald-700 font-semibold">Total</div>
                              <div className="text-lg font-extrabold text-emerald-900">
                                {formatMoney(order.total, order.currency)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {note ? (
                          <div className="mt-4 text-sm text-emerald-900 bg-white/70 border border-emerald-100 rounded-xl px-4 py-3">
                            <span className="font-bold">Note:</span> {note}
                          </div>
                        ) : null}
                      </div>

                      {/* Body */}
                      <div className="p-5 sm:p-6 bg-white">
                        {/* Item preview (single, user-friendly) */}
                        <div className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-emerald-100 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
                            {summary.image ? (
                              <Image
                                src={summary.image}
                                alt={summary.title}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            ) : (
                              <div className="w-full h-full" aria-hidden="true" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="font-extrabold text-emerald-900 truncate">
                              {summary.title}
                            </div>
                            <div className="text-sm text-emerald-700 truncate">
                              {summary.subtitle}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs text-emerald-700 font-semibold">Status</div>
                            <div className="text-sm font-extrabold text-emerald-900">
                              {meta.label}
                            </div>
                          </div>
                        </div>

                        {/* If items exist, optionally show full list (collapsible) */}
                        {summary.hasItems ? (
                          <details className="mt-4 rounded-2xl border border-emerald-100 bg-white">
                            <summary className="cursor-pointer px-4 py-3 font-bold text-emerald-800">
                              View item details
                            </summary>
                            <div className="px-4 pb-4">
                              <div className="divide-y divide-emerald-100 rounded-xl border border-emerald-100 overflow-hidden">
                                {(order.items || []).map((item, i) => {
                                  const qty = Math.max(1, Number(item.quantity || 1));
                                  const safeName = safeString(item.name) || "Item";
                                  return (
                                    <div key={`${order.session_id}-${i}`} className="flex items-center gap-4 p-4 bg-white">
                                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-emerald-100 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
                                        {item.image ? (
                                          <Image
                                            src={item.image}
                                            alt={safeName}
                                            fill
                                            className="object-cover"
                                            sizes="56px"
                                          />
                                        ) : (
                                          <div className="w-full h-full" aria-hidden="true" />
                                        )}
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <div className="font-bold text-emerald-900 truncate">{safeName}</div>
                                        <div className="text-sm text-emerald-700">
                                          Quantity: <span className="font-semibold">x{qty}</span>
                                        </div>
                                      </div>

                                      {typeof item.price === "number" ? (
                                        <div className="text-sm font-extrabold text-emerald-900">
                                          {formatMoney(item.price * qty, order.currency)}
                                        </div>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </details>
                        ) : (
                          <div className="mt-4 text-center py-8 border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50">
                            <div className="text-4xl mb-2">🧾</div>
                            <div className="font-extrabold text-emerald-800">Item details unavailable</div>
                            <div className="text-sm text-emerald-700 mt-1">
                              This order was recorded, but items were not saved for this session.
                            </div>
                          </div>
                        )}

                        {/* Footer actions */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                          <div className="text-xs text-gray-500 break-all">
                            Customer: {order.email || displayEmail}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              type="button"
                              onClick={() => handleBuyAgain(order)}
                              disabled={!canBuyAgain}
                              className={`px-5 py-3 rounded-full font-bold transition border-2 ${
                                canBuyAgain
                                  ? "bg-white border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                                  : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              Buy Again
                            </button>

                            <button
                              type="button"
                              onClick={() => handleTryAgain(order)}
                              className="px-5 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-imbari-very-dark-brown font-extrabold border-2 border-orange-600 hover:shadow-lg transition"
                            >
                              Try Again
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

