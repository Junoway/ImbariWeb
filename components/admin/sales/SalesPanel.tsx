"use client";

import React from "react";
import type { SaleOrder } from "@/lib/admin/types";

type Props = {
  sales: SaleOrder[];
  salesLoading: boolean;
};

export default function SalesPanel({ sales, salesLoading }: Props) {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] lg:h-[calc(100vh-160px)]">
      <div className="w-full lg:w-80 bg-black/20 border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto">
        <div className="p-4 border-b border-white/10 sticky top-0 bg-black/30 backdrop-blur">
          <h2 className="text-base md:text-lg font-bold text-white">
            Sales Analytics
          </h2>
        </div>

        {salesLoading ? (
          <div className="p-8 text-center text-imbari-very-dark-brown text-sm">
            Loading sales data...
          </div>
        ) : sales.length === 0 ? (
          <div className="p-8 text-center text-imbari-very-dark-brown text-sm">
            No sales data found.
          </div>
        ) : (
          <div className="p-4 md:p-6 space-y-4">
            {sales.map((order: any, idx: number) => (
              <div key={idx} className="border-b pb-3 mb-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-700">
                    Order #{order.sessionId || order.timestamp}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === "success"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-1">
                  {order.timestamp && new Date(order.timestamp).toLocaleString()}
                </div>

                <div className="flex flex-wrap gap-2 mb-1">
                  {order.items?.map((item: { name: string; quantity: number }, i: number) => (
                    <span key={i}>
                      {item.name} x{item.quantity}
                    </span>
                  ))}
                </div>

                <div className="text-right font-semibold text-emerald-800">
                  Total: ${order.total}
                </div>

                {order.status === "failed" && order.error && (
                  <div className="text-xs text-red-500 mt-1">
                    Error: {order.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 hidden lg:flex items-center justify-center text-imbari-very-dark-brown text-sm md:text-base px-4">
        Sales data overview
      </div>
    </div>
  );
}
