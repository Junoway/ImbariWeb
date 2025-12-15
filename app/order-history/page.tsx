// app/order-history/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Image from "next/image";

export default function OrderHistoryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    // Fetch real orders from backend
    fetch(`/api/orders-api.js?user=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, router]);

  if (!user) return null;

  if (loading) return <div className="p-8 text-center">Loading order history...</div>;

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
              <span className="font-semibold text-emerald-700">Order #{order.sessionId || order.timestamp}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "success" ? "bg-emerald-100 text-emerald-700" : order.status === "failed" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{order.status}</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">{order.timestamp && new Date(order.timestamp).toLocaleString()}</div>
            <div className="flex flex-wrap gap-4 mb-2">
              {order.items && order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {item.image && (
                    <Image src={item.image} alt={item.name} width={40} height={40} className="rounded" />
                  )}
                  <span>{item.name} x{item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="text-right font-semibold text-emerald-800">Total: ${order.total}</div>
          </div>
        ))}
      </div>
    </main>
  );
}



