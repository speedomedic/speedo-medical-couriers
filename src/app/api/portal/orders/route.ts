import { NextRequest, NextResponse } from "next/server";

const SHIPDAY_BASE = "https://api.shipday.com";

function authHeader() {
  return `Basic ${process.env.SHIPDAY_API_KEY}`;
}

type ShipdayOrder = {
  orderId: number;
  orderNumber: string;
  orderStatus: string;
  trackingLink?: string;
  customerName?: string;
  customerAddress?: string;
  restaurantName?: string;
  carrierName?: string;
  estimatedDeliveryTime?: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function GET(req: NextRequest) {
  const businessName = req.nextUrl.searchParams.get("business")?.toLowerCase();

  if (!businessName) {
    return NextResponse.json({ error: "business parameter required" }, { status: 400 });
  }

  if (!process.env.SHIPDAY_API_KEY) {
    return NextResponse.json({ error: "Shipday not configured" }, { status: 503 });
  }

  try {
    // Fetch active orders
    const [activeRes, completedRes] = await Promise.all([
      fetch(`${SHIPDAY_BASE}/orders`, { headers: { Authorization: authHeader() } }),
      fetch(`${SHIPDAY_BASE}/orders/all/completed`, { headers: { Authorization: authHeader() } }),
    ]);

    const activeJson = activeRes.ok ? await activeRes.json() : [];
    const completedJson = completedRes.ok ? await completedRes.json() : [];

    const allOrders: ShipdayOrder[] = [
      ...(activeJson.data ?? activeJson ?? []),
      ...(completedJson.data ?? completedJson ?? []),
    ];

    // Filter by restaurantName matching business name (loose match)
    const filtered = allOrders.filter((o) =>
      o.restaurantName?.toLowerCase().includes(businessName) ||
      o.orderNumber?.toLowerCase().includes(businessName)
    );

    return NextResponse.json({
      orders: filtered.map((o) => ({
        orderId: o.orderId,
        orderNumber: o.orderNumber,
        status: o.orderStatus,
        trackingLink: o.trackingLink ?? null,
        customer: o.customerName ?? null,
        address: o.customerAddress ?? null,
        driver: o.carrierName ?? null,
        eta: o.estimatedDeliveryTime ?? null,
        updatedAt: o.updatedAt ?? o.createdAt ?? null,
      })),
    });
  } catch (err) {
    console.error("[PORTAL ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
