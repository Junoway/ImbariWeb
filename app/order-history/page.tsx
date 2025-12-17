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

function formatMoney(amount: number | string | undefined, currency?: string) {
  if (amount == null) return "—";
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(n)) return String(amount);

  const cur = (currency || "usd").toUpperCase();
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: cur }).format(n);
  } catch {
    // Fallback if currency code is invalid
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
      label: "PAID",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      dot: "bg-emerald-500",
    };
  }
  if (s === "failed") {
    return {
      label: "FAILED",
      badge: "bg-red-100 text-red-800 border-red-200",
      dot: "bg-red-500",
    };
  }
  if (s === "expired") {
    return {
      label: "EXPIRED",
      badge: "bg-amber-100 text-amber-900 border-amber-200",
      dot: "bg-amber-500",
    };
  }
  if (s === "pending") {
    return {
      label: "PENDING",
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

export default function OrderHistoryPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const API_BASE = useMemo(() => {
    // Prefer your env var, but keep safe fallback
    return (
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.imbaricoffee.com"
    );
  }, []);

  // Best-effort token retrieval (supports both your old and new storage names)
  const token = useMemo(() => {
    if (typeof window === "undefined") return "";
    return (
      localStorage.getItem("imbari_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("jwt") ||
      ""
    );
  }, []);

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

        // Production-ready approach:
        // - Prefer JWT auth (Authorization header) so users can’t query other users’ emails.
        // - Fallback to email query ONLY if token is missing (temporary compatibility).
        const email =
          (user as any)?.email ||
          (user as any)?.user?.email ||
          "";

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        let url = `${API_BASE}/api/orders`;

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        } else {
          // Temporary fallback: requires your backend CORS + email-query path
          if (!email) {
            throw new Error("Missing identity. Please sign out and sign in again.");
          }
          url = `${API_BASE}/api/orders?email=${encodeURIComponent(String(email).trim().toLowerCase())}`;
        }

        const res = await fetch(url, { method: "GET", headers });

        // If CORS is misconfigured, fetch throws before here.
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          // Helpful error message for common CORS/auth issues
          const msg =
            data?.error ||
            (res.status === 401 ? "Please log in again. Session expired." : "Failed to fetch orders.");
          throw new Error(msg);
        }

        if (!canceled) {
          setOrders(Array.isArray(data.orders) ? data.orders : []);
        }
      } catch (e) {
        if (!canceled) {
          setErrorMsg(e instanceof Error ? e.message : "Failed to load orders");
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [user, router, API_BASE, token]);

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
              Track your purchases, payment status, and receipts.
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

        {/* Body */}
        <section className="bg-white rounded-2xl shadow-2xl border-4 border-emerald-300 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-yellow-50 to-orange-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="text-emerald-900 font-bold">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-emerald-700">{user.email}</div>
            </div>
          </div>

          {loading && (
            <div className="p-10 text-center">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Loading your order history…
              </div>
            </div>
          )}

          {!loading && errorMsg && (
            <div className="p-10 text-center">
              <div className="max-w-xl mx-auto">
                <div className="bg-red-50 text-red-800 border-2 border-red-200 rounded-2xl px-6 py-5 shadow">
                  <div className="font-extrabold mb-1">Could not load orders</div>
                  <div className="text-sm">{errorMsg}</div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
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

                <p className="mt-4 text-xs text-gray-500">
                  If this keeps happening, it is usually a CORS configuration issue in the backend
                  (ALLOWED_ORIGIN must include https://www.imbaricoffee.com) or a missing JWT token.
                </p>
              </div>
            </div>
          )}

          {!loading && !errorMsg && !orders.length && (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">☕</div>
              <div className="text-xl font-extrabold text-emerald-800 mb-1">
                No orders yet
              </div>
              <div className="text-emerald-700 mb-6">
                When you place an order, it will appear here with status and details.
              </div>
              <Link
                href="/shop"
                className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-imbari-very-dark-brown font-bold text-lg shadow-xl hover:shadow-2xl transition-all border-4 border-emerald-700"
              >
                Browse Products →
              </Link>
            </div>
          )}

          {!loading && !errorMsg && !!orders.length && (
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                {orders.map((order) => {
                  const created = toLocalTime(order.created_at);
                  const paid = toLocalTime(order.paid_at);
                  const meta = statusMeta(order.status);

                  return (
                    <article
                      key={order.session_id}
                      className="rounded-2xl border-2 border-emerald-200 shadow-lg overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-50 via-yellow-50 to-orange-50 border-b border-emerald-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-3">
                              <span className={`w-3 h-3 rounded-full ${meta.dot}`} />
                              <div className="font-extrabold text-emerald-900 truncate">
                                Order <span className="text-emerald-700">#{order.session_id}</span>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-emerald-800/80">
                              {created && <span>Created: <span className="font-semibold">{created}</span></span>}
                              {paid && <span>Paid: <span className="font-semibold">{paid}</span></span>}
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
                              <div className="text-xs text-emerald-700 font-semibold">
                                Total
                              </div>
                              <div className="text-lg font-extrabold text-emerald-900">
                                {formatMoney(order.total, order.currency)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Error */}
                      {order.error && (
                        <div className="px-5 sm:px-6 py-4 bg-red-50 border-b border-red-100">
                          <div className="text-sm font-bold text-red-800">Payment note</div>
                          <div className="text-sm text-red-700 break-words">{order.error}</div>
                        </div>
                      )}

                      {/* Items */}
                      <div className="p-5 sm:p-6 bg-white">
                        {order.items && order.items.length ? (
                          <div className="space-y-3">
                            <div className="text-sm font-extrabold text-emerald-900">
                              Items
                            </div>

                            <div className="divide-y divide-emerald-100 rounded-xl border border-emerald-100 overflow-hidden">
                              {order.items.map((item, i) => {
                                const qty = Math.max(1, Number(item.quantity || 1));
                                return (
                                  <div key={i} className="flex items-center gap-4 p-4 bg-white">
                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-emerald-100 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
                                      {item.image ? (
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          fill
                                          className="object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full" />
                                      )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <div className="font-bold text-emerald-900 truncate">
                                        {item.name}
                                      </div>
                                      <div className="text-sm text-emerald-700">
                                        Quantity: <span className="font-semibold">x{qty}</span>
                                      </div>
                                    </div>

                                    {typeof item.price === "number" && (
                                      <div className="text-sm font-extrabold text-emerald-900">
                                        {formatMoney(item.price * qty, order.currency)}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Breakdown (optional fields if your DB stores them) */}
                            <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
                              {order.shipping != null && (
                                <div className="flex justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                                  <span className="text-emerald-800 font-semibold">Shipping</span>
                                  <span className="text-emerald-900 font-extrabold">
                                    {formatMoney(order.shipping as any, order.currency)}
                                  </span>
                                </div>
                              )}
                              {order.tax != null && (
                                <div className="flex justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                                  <span className="text-emerald-800 font-semibold">Tax</span>
                                  <span className="text-emerald-900 font-extrabold">
                                    {formatMoney(order.tax as any, order.currency)}
                                  </span>
                                </div>
                              )}
                              {order.tip_amount != null && (
                                <div className="flex justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                                  <span className="text-emerald-800 font-semibold">Tip</span>
                                  <span className="text-emerald-900 font-extrabold">
                                    {formatMoney(order.tip_amount as any, order.currency)}
                                  </span>
                                </div>
                              )}
                              {order.discount_amount != null && (
                                <div className="flex justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                                  <span className="text-emerald-800 font-semibold">
                                    Discount{order.discount_code ? ` (${order.discount_code})` : ""}
                                  </span>
                                  <span className="text-emerald-900 font-extrabold">
                                    -{formatMoney(order.discount_amount as any, order.currency)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-10 border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50">
                            <div className="text-4xl mb-3">🧾</div>
                            <div className="font-extrabold text-emerald-800">
                              Item details unavailable
                            </div>
                            <div className="text-sm text-emerald-700 mt-1">
                              This order was recorded, but line items were not stored for this session.
                            </div>
                          </div>
                        )}

                        {/* Footer actions */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                          <div className="text-xs text-gray-500 break-all">
                            Customer: {order.email || user.email}
                          </div>

                          <div className="flex gap-3">
                            <Link
                              href="/shop"
                              className="px-5 py-3 rounded-full bg-white border-2 border-emerald-200 text-emerald-800 font-bold hover:bg-emerald-50 transition"
                            >
                              Buy Again
                            </Link>
                            <Link
                              href={`/checkout/success?session_id=${encodeURIComponent(order.session_id)}`}
                              className="px-5 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-imbari-very-dark-brown font-extrabold border-2 border-orange-600 hover:shadow-lg transition"
                            >
                              View Receipt
                            </Link>
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

