import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-07-29.dahlia" });

const EXTRA_STOP_FEE = 25_00; // cents

function baseAmountCents(serviceType: string, pickupTime: string): number {
  if (serviceType === "rush" || pickupTime === "asap") return 85_00;
  if (serviceType === "specimen") return 55_00;
  return 35_00;
}

function calcTotal(serviceType: string, pickups: { time?: string }[]): number {
  const base  = baseAmountCents(serviceType, pickups[0]?.time ?? "");
  const extra = Math.max(0, pickups.length - 1) * EXTRA_STOP_FEE;
  return base + extra;
}

function serviceLabel(serviceType: string, pickupTime: string, numStops: number): string {
  const type =
    serviceType === "rush" || pickupTime === "asap" ? "STAT Rush Delivery (under 60 min)"
    : serviceType === "specimen" ? "Priority Specimen Transport (within 90 min)"
    : "Standard Same-Day Delivery (2–4 hrs)";
  return numStops > 1 ? `${type} — ${numStops} pickup stops` : type;
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY)
    return NextResponse.json({ error: "Payment not configured" }, { status: 503 });

  try {
    const form = await req.json();

    // Support both old flat format (single pickup) and new multi-pickup array
    const pickups: {
      name: string; org: string; address: string; city: string;
      phone: string; date: string; time: string; temperatureSensitive: boolean;
    }[] = Array.isArray(form.pickups)
      ? form.pickups
      : [{
          name:               form.pickupName    ?? "",
          org:                form.pickupOrg     ?? "",
          address:            form.pickupAddress ?? "",
          city:               form.pickupCity    ?? "",
          phone:              form.pickupPhone   ?? "",
          date:               form.pickupDate    ?? "",
          time:               form.pickupTime    ?? "",
          temperatureSensitive: form.temperatureSensitive ?? false,
        }];

    const orderNumber = `SMC-${Date.now()}`;
    const totalCents  = calcTotal(form.serviceType, pickups);
    const siteUrl     = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    // Build per-pickup metadata keys (max 5 stops)
    const pickupMeta: Record<string, string> = { pickup_count: String(pickups.length) };
    pickups.slice(0, 5).forEach((p, i) => {
      pickupMeta[`pickup_${i}_name`]    = (p.name    ?? "").substring(0, 500);
      pickupMeta[`pickup_${i}_org`]     = (p.org     ?? "").substring(0, 500);
      pickupMeta[`pickup_${i}_address`] = (p.address ?? "").substring(0, 500);
      pickupMeta[`pickup_${i}_city`]    = (p.city    ?? "").substring(0, 100);
      pickupMeta[`pickup_${i}_phone`]   = (p.phone   ?? "").substring(0, 50);
      pickupMeta[`pickup_${i}_date`]    = (p.date    ?? "").substring(0, 20);
      pickupMeta[`pickup_${i}_time`]    = (p.time    ?? "").substring(0, 20);
      pickupMeta[`pickup_${i}_temp`]    = p.temperatureSensitive ? "true" : "false";
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency:     "cad",
            product_data: {
              name:        serviceLabel(form.serviceType, pickups[0]?.time ?? "", pickups.length),
              description: `Speedo Medical Couriers — ${pickups.length} pickup${pickups.length > 1 ? "s" : ""} → ${form.dropoffCity ?? ""}`,
            },
            unit_amount: totalCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/book/success?session_id={CHECKOUT_SESSION_ID}&order=${encodeURIComponent(orderNumber)}`,
      cancel_url:  `${siteUrl}/book`,
      customer_email: form.contactEmail || undefined,
      metadata: {
        orderNumber,
        serviceType:         form.serviceType          ?? "",
        dropoffName:         (form.dropoffName         ?? "").substring(0, 500),
        dropoffOrg:          (form.dropoffOrg          ?? "").substring(0, 500),
        dropoffAddress:      (form.dropoffAddress      ?? "").substring(0, 500),
        dropoffCity:         (form.dropoffCity         ?? "").substring(0, 100),
        dropoffPhone:        (form.dropoffPhone        ?? "").substring(0, 50),
        contactName:         (form.contactName         ?? "").substring(0, 500),
        contactEmail:        (form.contactEmail        ?? "").substring(0, 500),
        contactPhone:        (form.contactPhone        ?? "").substring(0, 50),
        specialInstructions: (form.specialInstructions ?? "").substring(0, 500),
        ...pickupMeta,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[CHECKOUT ERROR]", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
