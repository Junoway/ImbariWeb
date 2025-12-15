// app/order-history/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/components/AuthContext";

type OrderItem = {
  name: string;
  quantity: number;
  image?: string;
};

type Order = {
  userId?: string;
  status?: string; // e.g. "created", "paid"
  total?: number | string;
  items?: OrderItem[];
  timestamp?: string;
  sessionId?: string;
};

export default function OrderHistoryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const API = useMemo(() => {
    // Your backend base URL (Vercel backend project custom domain)
    return process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.imbaricoffee.com";
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const userId = (user as any)?.id || (user as any)?.userId || "";
    if (!userId) {
      setErrorMsg("Missing user id. Please sign out and sign in again.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setErrorMsg(null);

        const res = await fetch(`${API}/api/orders?user=${encodeURIComponent(userId)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Failed to fetch orders");

        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    })();
  }, [user, router, API]);

  if (!user) return null;

  if (loading) return <div className="p-8 text-center">Loading order history...</div>;

  if (errorMsg) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3">
          {errorMsg}
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return <div className="p-8 text-center">No orders found.</div>;
  }

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      <div className="space-y-6">
        {orders.map((order, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-emerald-700">
                Order #{order.sessionId || order.timestamp || idx + 1}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === "paid"
                    ? "bg-emerald-100 text-emerald-700"
                    : order.status === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status || "created"}
              </span>
            </div>

            {order.timestamp && (
              <div className="text-xs text-gray-500 mb-3">
                {new Date(order.timestamp).toLocaleString()}
              </div>
            )}

            <div className="flex flex-col gap-2 mb-3">
              {order.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={44}
                      height={44}
                      className="rounded"
                    />
                  ) : (
                    <div className="w-[44px] h-[44px] bg-gray-100 rounded" />
                  )}
                  <span className="text-sm">
                    {item.name} <span className="text-gray-500">x{item.quantity}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="text-right font-semibold text-emerald-800">
              Total: ${order.total ?? "—"}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
