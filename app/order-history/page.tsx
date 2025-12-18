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

function toLocalDateTime(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

function safeItemName(name?: string) {
  const s = String(name || "").trim();
  return s || "Item";
}

function normalizeStatus(status?: string) {
  return (status || "pending").toLowerCase();
}

function statusCopy(status?: string, error?: string | null) {
  const s = normalizeStatus(status);

  if (s === "paid") {
    return {
      label: "Paid",
      helper: "Payment completed successfully.",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      dot: "bg-emerald-500",
    };
  }
  if (s === "failed") {
    return {
      label: "Payment Declined",
      helper: error ? humanizePaymentNote(error) : "Payment was not completed.",
      badge: "bg-red-100 text-red-800 border-red-200",
      dot: "bg-red-500",
    };
  }
  if (s === "expired") {
    return {
      label: "Checkout Expired",
      helper: error ? humanizePaymentNote(error) : "Checkout expired before payment was completed.",
      badge: "bg-amber-100 text-amber-900 border-amber-200",
      dot: "bg-amber-500",
    };
  }
  if (s === "pending") {
    return {
      label: "Pending",
      helper: "Awaiting payment confirmation.",
      badge: "bg-gray-100 text-gray-800 border-gray-200",
      dot: "bg-gray-500",
    };
  }

  return {
    label: s.toUpperCase(),
    helper: error ? humanizePaymentNote(error) : "Order status updated.",
    badge: "bg-gray-100 text-gray-800 border-gray-200",
    dot: "bg-gray-500",
  };
}

function humanizePaymentNote(note: string) {
  const n = String(note || "").trim();
  if (!n) return "";

  // Common Stripe-ish internal notes you showed
  if (n === "checkout_session_expired") return "Checkout expired before payment was completed.";
  if (n === "payment_failed") return "Payment failed. Please try another payment method.";
  if (n === "requires_payment_method") return "Payment method was declined. Please try another card.";
  if (n === "canceled") return "Checkout was canceled before payment was completed.";

  // Default: show a clean sentence (no snake_case ugliness)
  const cleaned = n.replace(/_/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function makeFriendlyOrderId(sessionId: string, createdAt?: string) {
  // IMB-YYYYMMDD-XXXXXX (last 6 of session id)
  const tail = String(sessionId || "").slice(-6) || "ORDER";
  const d = createdAt ? new Date(createdAt) : null;
  const yyyy = d && !Number.isNaN(d.getTime()) ? d.getFullYear() : new Date().getFullYear();
  const mm = d && !Number.isNaN(d.getTime()) ? String(d.getMonth() + 1).padStart(2, "0") : "01";
  const dd = d && !Number.isNaN(d.getTime()) ? String(d.getDate()).padStart(2, "0") : "01";
  return `IMB-${yyyy}${mm}${dd}-${tail}`;
}

function summarizeItems(items?: OrderItem[] | null) {
  const list = Array.isArray(items) ? items : [];
  const totalQty = list.reduce((acc, it) => acc + Math.max(1, Number(it?.quantity || 1)), 0);
  if (list.length === 0) return { title: "Items unavailable", subtitle: "" };
  if (list.length === 1) {
    const it = list[0];
    return {
      title: `${safeItemName(it?.name)} x${Math.max(1, Number(it?.quantity || 1))}`,
      subtitle: "",
    };
  }
  return {
    title: `${safeItemName(list[0]?.name)} x${Math.max(1, Number(list[0]?.quantity || 1))}`,
    subtitle: `+ ${list.length - 1} more item${list.length - 1 === 1 ? "" : "s"} (${totalQty} total)`,
  };
}

function bestHeroImage(items?: OrderItem[] | null) {
  const list = Array.isArray(items) ? items : [];
  const firstWithImage = list.find((it) => !!it?.image);
  return firstWithImage?.image || list[0]?.image || "";
}

function storeBuyAgainItems(items?: OrderItem[] | null) {
  if (typeof window === "undefined") return;
  const list = Array.isArray(items) ? items : [];
  // Store a lightweight payload; your Shop page can read this later if you implement it.
  localStorage.setItem(
    "imbari_buy_again_items",
    JSON.stringify(
      list.map((it) => ({
        name: safeItemName(it?.name),
        quantity: Math.max(1, Number(it?.quantity || 1)),
        image: it?.image || null,
        price: typeof it?.price === "number" ? it.price : null,
      }))
    )
  );
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
    const first = (u.firstName || u.firstname || u.given_name || "").trim();
    const last = (u.lastName || u.lastname || u.family_name || "").trim();
    const combined = `${first}${first && last ? " " : ""}${last}`.trim();
    return combined || u.name || u.fullName || "Customer";
  }, [user]);

  const displayEmail = useMemo(() => {
    const u: any = user || {};
    return (u.email || u.user?.email || "").trim();
  }, [user]);

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;

    return orders.filter((o) => {
      const status = (o.status || "").toLowerCase();
      const email = (o.email || "").toLowerCase();
      const items = (o.items || []).map((it) => it?.name || "").join(" ").toLowerCase();
      const friendly = makeFriendlyOrderId(o.session_id, o.created_at).toLowerCase();
      return status.includes(q) || email.includes(q) || items.includes(q) || friendly.includes(q);
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

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-800 tracking-tight">Your Orders</h1>
            <p className="text-emerald-700 mt-1">See what you ordered, when, and what happened with payment.</p>
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
          <div className="p-6 sm:p-8 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-yellow-50 to-orange-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <div className="text-emerald-900 font-bold truncate">{displayName}</div>
                <div className="text-sm text-emerald-700 truncate">{displayEmail}</div>
              </div>

              <div className="w-full sm:w-[320px]">
                <label htmlFor="orderSearch" className="sr-only">
                  Search orders
                </label>
                <input
                  id="orderSearch"
                  name="orderSearch"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by item or status…"
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
              <div className="max-w-xl mx-auto">
                <div className="bg-red-50 text-red-800 border-2 border-red-200 rounded-2xl px-6 py-5 shadow">
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
            </div>
          )}

          {!loading && !errorMsg && !filteredOrders.length && (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">☕</div>
              <div className="text-xl font-extrabold text-emerald-800 mb-1">No orders found</div>
              <div className="text-emerald-700 mb-6">
                {orders.length ? "Try clearing your search." : "When you place an order, it will appear here."}
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
                  const created = toLocalDateTime(order.created_at);
                  const paid = toLocalDateTime(order.paid_at);
                  const meta = statusCopy(order.status, order.error);
                  const friendlyId = makeFriendlyOrderId(order.session_id, order.created_at);

                  const heroImage = bestHeroImage(order.items);
                  const summary = summarizeItems(order.items);

                  const isPaid = normalizeStatus(order.status) === "paid";
                  const isFailed = normalizeStatus(order.status) === "failed";
                  const isExpired = normalizeStatus(order.status) === "expired";

                  return (
                    <article
                      key={order.session_id}
                      className="rounded-2xl border-2 border-emerald-200 shadow-lg overflow-hidden"
                    >
                      {/* Card Header (customer-friendly) */}
                      <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-50 via-yellow-50 to-orange-50 border-b border-emerald-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          {/* Left: Hero item */}
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-emerald-100 bg-white">
                              {heroImage ? (
                                <Image
                                  src={heroImage}
                                  alt={summary.title}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${meta.dot}`} />
                                <div className="font-extrabold text-emerald-900 truncate">{summary.title}</div>
                              </div>
                              {summary.subtitle ? (
                                <div className="text-xs text-emerald-700 mt-1 truncate">{summary.subtitle}</div>
                              ) : null}

                              <div className="mt-2 text-xs text-emerald-800/80 flex flex-wrap gap-x-3 gap-y-1">
                                <span className="font-semibold text-emerald-900">{friendlyId}</span>
                                {created ? (
                                  <span>
                                    Order placed: <span className="font-semibold">{created}</span>
                                  </span>
                                ) : null}
                                {isPaid && paid ? (
                                  <span>
                                    Paid on: <span className="font-semibold">{paid}</span>
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          {/* Right: Status + Total */}
                          <div className="flex items-center justify-between sm:justify-end gap-3">
                            <span className={`px-4 py-2 rounded-full text-xs font-extrabold border ${meta.badge}`}>
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

                        {/* Helper note (human language) */}
                        {!isPaid && meta.helper ? (
                          <div className="mt-4 text-sm text-emerald-900/80">
                            <span className="font-bold">Note:</span> {meta.helper}
                          </div>
                        ) : null}
                      </div>

                      {/* Items list (kept, but now secondary) */}
                      <div className="p-5 sm:p-6 bg-white">
                        {order.items && order.items.length ? (
                          <div className="space-y-3">
                            <div className="text-sm font-extrabold text-emerald-900">Items</div>

                            <div className="divide-y divide-emerald-100 rounded-xl border border-emerald-100 overflow-hidden">
                              {order.items.map((item, i) => {
                                const qty = Math.max(1, Number(item.quantity || 1));
                                const name = safeItemName(item.name);
                                return (
                                  <div key={`${order.session_id}-${i}`} className="flex items-center gap-4 p-4 bg-white">
                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-emerald-100 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
                                      {item.image ? (
                                        <Image
                                          src={item.image}
                                          alt={name}
                                          fill
                                          className="object-cover"
                                          sizes="56px"
                                        />
                                      ) : (
                                        <div className="w-full h-full" aria-hidden="true" />
                                      )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <div className="font-bold text-emerald-900 truncate">{name}</div>
                                      <div className="text-sm text-emerald-700">
                                        Qty: <span className="font-semibold">x{qty}</span>
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
                        ) : (
                          <div className="text-center py-10 border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50">
                            <div className="text-4xl mb-3">🧾</div>
                            <div className="font-extrabold text-emerald-800">Item details unavailable</div>
                            <div className="text-sm text-emerald-700 mt-1">
                              This order was recorded, but item details were not stored for this session.
                            </div>
                          </div>
                        )}

                        {/* Footer actions */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                          <div className="text-xs text-gray-500 break-all">
                            Customer: {order.email || displayEmail}
                          </div>

                          <div className="flex flex-wrap gap-3 justify-end">
                            {/* Buy Again (restores items in localStorage) */}
                            <button
                              type="button"
                              onClick={() => {
                                storeBuyAgainItems(order.items);
                                router.push("/shop");
                              }}
                              className="px-5 py-3 rounded-full bg-white border-2 border-emerald-200 text-emerald-800 font-bold hover:bg-emerald-50 transition"
                            >
                              Buy Again
                            </button>

                            {/* Try Again for failed/expired */}
                            {(isFailed || isExpired) && (
                              <button
                                type="button"
                                onClick={() => {
                                  storeBuyAgainItems(order.items);
                                  router.push("/shop");
                                }}
                                className="px-5 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-imbari-very-dark-brown font-extrabold border-2 border-orange-600 hover:shadow-lg transition"
                              >
                                Try Again
                              </button>
                            )}

                            {/* View Receipt only if paid */}
                            {isPaid && (
                              <Link
                                href={`/checkout/success?session_id=${encodeURIComponent(order.session_id)}`}
                                className="px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-imbari-very-dark-brown font-extrabold border-4 border-emerald-700 hover:shadow-lg transition"
                              >
                                View Receipt
                              </Link>
                            )}
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


