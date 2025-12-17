"use client";

import { useEffect, useState } from "react";
import type { SaleOrder } from "@/lib/admin/types";
import { fetchAdminSales } from "@/lib/admin/apiSales";

export function useSales(activeTab: "chats" | "reviews" | "sales") {
  const [sales, setSales] = useState<SaleOrder[]>([]);
  const [salesLoading, setSalesLoading] = useState(false);

  useEffect(() => {
    if (activeTab !== "sales") return;

    setSalesLoading(true);
    fetchAdminSales()
      .then((data) => {
        setSales(data.orders || []);
      })
      .finally(() => setSalesLoading(false));
  }, [activeTab]);

  return { sales, salesLoading };
}
