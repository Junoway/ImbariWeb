export async function fetchAdminSales() {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.imbaricoffee.com";

  const res = await fetch(`${API_BASE}/api/orders?admin=true`);
  // keep the same “best effort” behavior
  try {
    return await res.json();
  } catch {
    return { orders: [] };
  }
}
