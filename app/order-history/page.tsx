// app/order-history/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Image from "next/image";

type Order = {
  id: string;
  date: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  status: "Delivered" | "Processing" | "Shipped";
};

// Demo orders - in production, fetch from backend
const DEMO_ORDERS: Order[] = [
  {
    id: "ORD-2025-001",
    date: "2025-12-01",
    status: "Delivered",
    total: 27.00,
    items: [
      {
        id: 1,
        name: "Medium Roast – Whole Beans",
        price: 9.00,
        quantity: 3,
        image: "/images/arabica.jpg"
      }
    ]
  },
  {
    id: "ORD-2025-002",
    date: "2025-11-28",
    status: "Delivered",
    total: 48.00,
    items: [
      {
        id: 2,
        name: "Medium Roast – Whole Beans",
        price: 16.00,
        quantity: 2,
        image: "/images/arabica.jpg"
      },
      {
        id: 6,
        name: "Medium Roast – Ground Coffee",
        price: 8.00,
        quantity: 2,
        image: "/images/shop.jpg"
      }
    ]
  },
  {
    id: "ORD-2025-003",
    date: "2025-11-15",
    status: "Delivered",
    total: 34.00,
    items: [
      {
        id: 3,
        name: "Medium Roast – Whole Beans",
        price: 28.00,
        quantity: 1,
        image: "/images/arabica.jpg"
      },
      {
        id: 11,
        name: "Instant Coffee Sachet",
        price: 6.00,
        quantity: 1,
        image: "/images/shop2.jpg"
      }
    ]
  }
];

export default function OrderHistoryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Simulate loading orders
    setTimeout(() => {
      setOrders(DEMO_ORDERS);
      setLoading(false);
    }, 500);
  }, [user, router]);

  if (!user) return null;

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/account")}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-semibold mb-4 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Account
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Order History
          </h1>
          <p className="text-emerald-700">View all your past orders and track deliveries</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-emerald-600 mt-4">Loading orders...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-4 border-emerald-200">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-emerald-800 mb-2">No Orders Yet</h2>
            <p className="text-emerald-600 mb-6">Start shopping to see your order history here</p>
            <button
              onClick={() => router.push("/shop")}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl transition-all border-4 border-emerald-700"
            >
              Browse Products
            </button>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg border-4 border-emerald-200 overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-emerald-100 via-yellow-50 to-orange-50 px-6 py-4 border-b-2 border-emerald-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs text-emerald-600 font-semibold">Order ID</p>
                        <p className="text-lg font-bold text-emerald-800">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600 font-semibold">Date</p>
                        <p className="text-lg font-bold text-emerald-800">
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600 font-semibold">Total</p>
                        <p className="text-lg font-bold text-emerald-800">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-full border-2 font-bold text-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 pb-4 border-b border-emerald-100 last:border-0">
                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100 border-2 border-emerald-200 flex items-center justify-center overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-16 h-16 object-contain"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-bold text-emerald-800">{item.name}</h3>
                          <p className="text-sm text-emerald-600">
                            Quantity: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-emerald-700">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reorder Button */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => {
                        // In production, add all items to cart
                        router.push("/shop");
                      }}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold shadow-md hover:shadow-lg transition-all border-2 border-emerald-600"
                    >
                      Reorder These Items
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

