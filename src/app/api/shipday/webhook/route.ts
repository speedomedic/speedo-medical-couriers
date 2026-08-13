import { NextRequest, NextResponse } from "next/server";

// Shipday sends webhook events here when order status changes.
// Verify the shared secret from the Shipday dashboard: Settings → Webhooks → Secret.
const WEBHOOK_SECRET = process.env.SHIPDAY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Optionally verify the Shipday signature header
    if (WEBHOOK_SECRET) {
      const sig = req.headers.get("x-shipday-signature") ?? "";
      if (sig !== WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = await req.json();

    const {
      orderId,
      orderNumber,
      orderStatus,
      carrierName,
      estimatedDeliveryDate,
      trackingLink,
    } = body as {
      orderId?: string | number;
      orderNumber?: string;
      orderStatus?: string;
      carrierName?: string;
      estimatedDeliveryDate?: string;
      trackingLink?: string;
    };

    // Log for debugging — replace with your preferred logging/DB solution
    console.log("[Shipday Webhook]", {
      orderId,
      orderNumber,
      orderStatus,
      carrierName,
      estimatedDeliveryDate,
      trackingLink,
      receivedAt: new Date().toISOString(),
    });

    // TODO: Persist status update to your database here so the /track page
    // can surface real-time status without polling Shipday on every page load.
    // Example: await db.orderStatus.upsert({ where: { orderNumber }, data: { status: orderStatus, ... } })

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[Shipday Webhook] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Shipday may send a GET to verify the endpoint during setup
export async function GET() {
  return NextResponse.json({ status: "Speedo Medical Couriers — Shipday webhook active" });
}
