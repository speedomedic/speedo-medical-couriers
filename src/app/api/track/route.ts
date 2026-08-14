import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/shipday";

export async function GET(req: NextRequest) {
  const orderNumber = req.nextUrl.searchParams.get("order")?.trim().toUpperCase();

  if (!orderNumber) {
    return NextResponse.json({ error: "order parameter required" }, { status: 400 });
  }

  // Accept SMC-12345 or raw numeric Shipday ID
  if (!orderNumber.startsWith("SMC-") && isNaN(parseInt(orderNumber, 10))) {
    return NextResponse.json({ error: "Invalid order number. Expected SMC-NNNNN format." }, { status: 400 });
  }

  if (!process.env.SHIPDAY_API_KEY) {
    return NextResponse.json({ error: "Tracking not configured" }, { status: 503 });
  }

  try {
    const order = await getOrder(orderNumber);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      orderNumber:           order.orderNumber,
      status:                order.status,
      trackingLink:          order.trackingLink,
      driverName:            order.driverName  ?? null,
      driverPhone:           order.driverPhone ?? null,
      estimatedDeliveryTime: order.estimatedDeliveryTime ?? null,
      customerName:          order.customerName    ?? null,
      customerAddress:       order.customerAddress ?? null,
      pickupAddress:         order.pickupAddress   ?? null,
    });
  } catch (err) {
    console.error("[TRACK ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
