import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import { buildOrderPayload, createOrder } from "@/lib/shipday";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-07-29.dahlia" });

interface PickupStop {
  name: string; org: string; address: string; city: string;
  phone: string; date: string; time: string; temperatureSensitive: boolean;
}

function readPickups(m: Record<string, string>): PickupStop[] {
  const count = Math.min(parseInt(m.pickup_count ?? "1") || 1, 5);
  const stops: PickupStop[] = [];
  for (let i = 0; i < count; i++) {
    stops.push({
      name:               m[`pickup_${i}_name`]    ?? m.pickupName    ?? "",
      org:                m[`pickup_${i}_org`]     ?? m.pickupOrg     ?? "",
      address:            m[`pickup_${i}_address`] ?? m.pickupAddress ?? "",
      city:               m[`pickup_${i}_city`]    ?? m.pickupCity    ?? "",
      phone:              m[`pickup_${i}_phone`]   ?? m.pickupPhone   ?? "",
      date:               m[`pickup_${i}_date`]    ?? m.pickupDate    ?? "",
      time:               m[`pickup_${i}_time`]    ?? m.pickupTime    ?? "",
      temperatureSensitive: (m[`pickup_${i}_temp`] ?? m.temperatureSensitive) === "true",
    });
  }
  return stops;
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId)
    return NextResponse.json({ error: "session_id required" }, { status: 400 });

  if (!process.env.STRIPE_SECRET_KEY)
    return NextResponse.json({ error: "Payment not configured" }, { status: 503 });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid")
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });

    const m           = session.metadata ?? {};
    const orderNumber = m.orderNumber ?? `SMC-${Date.now()}`;
    const pickups     = readPickups(m);
    const amountPaid  = session.amount_total ? (session.amount_total / 100).toFixed(2) : "—";

    // Create one Shipday order per pickup stop
    const trackingLinks: string[] = [];
    const shipdayErrors: string[] = [];

    if (process.env.SHIPDAY_API_KEY) {
      for (let i = 0; i < pickups.length; i++) {
        const p           = pickups[i];
        const stopNumber  = `${orderNumber}${pickups.length > 1 ? `-S${i + 1}` : ""}`;
        try {
          const { payload } = buildOrderPayload({
            serviceType:         m.serviceType          ?? "",
            pickupName:          p.name,
            pickupOrg:           p.org,
            pickupAddress:       p.address,
            pickupCity:          p.city,
            pickupPhone:         p.phone,
            pickupDate:          p.date,
            pickupTime:          p.time,
            dropoffName:         m.dropoffName          ?? "",
            dropoffOrg:          m.dropoffOrg           ?? "",
            dropoffAddress:      m.dropoffAddress       ?? "",
            dropoffCity:         m.dropoffCity          ?? "",
            dropoffPhone:        m.dropoffPhone         ?? "",
            contactName:         m.contactName          ?? "",
            contactEmail:        m.contactEmail         ?? "",
            contactPhone:        m.contactPhone         ?? "",
            specialInstructions: m.specialInstructions  ?? "",
            temperatureSensitive: p.temperatureSensitive,
          });
          const result = await createOrder({ ...payload, orderNumber: stopNumber });
          if (result.trackingLink) trackingLinks.push(result.trackingLink);
        } catch (err) {
          shipdayErrors.push(`Stop ${i + 1}: ${err instanceof Error ? err.message : String(err)}`);
          console.error(`[SHIPDAY stop ${i}]`, err);
        }
      }
    }

    // Confirmation email
    const pickupRows = pickups.map((p, i) => `
      <tr style="border-bottom:1px solid #EBF3FF;">
        <td colspan="2" style="padding:6px 16px;background:#F8FAFF;">
          <strong style="font-size:12px;color:#0D1B3E;">Stop ${i + 1}${pickups.length > 1 ? ` — ${orderNumber}-S${i + 1}` : ""}</strong>
        </td>
      </tr>
      ${[
        ["Name",    p.name],
        ["Org",     p.org || "—"],
        ["Address", `${p.address}, ${p.city}`],
        ["Phone",   p.phone || "—"],
        ["Date",    p.date],
        ["Time",    p.time],
        ["Temp.",   p.temperatureSensitive ? "Cold chain required" : "No"],
      ].map(([k, v]) => `
        <tr style="border-bottom:1px solid #EBF3FF;">
          <td style="padding:8px 16px;font-weight:600;color:#64748B;width:35%;font-size:12px;">${k}</td>
          <td style="padding:8px 16px;font-size:12px;">${v}</td>
        </tr>`).join("")}
    `).join("");

    const trackingSection = trackingLinks.map((link, i) => `
      <div style="background:#EBF3FF;border:1px solid #1B6FEB;border-radius:10px;padding:12px 16px;margin-bottom:10px;text-align:center;">
        <p style="margin:0 0 4px 0;font-weight:700;color:#0D1B3E;font-size:13px;">
          📍 Live Tracking${trackingLinks.length > 1 ? ` — Stop ${i + 1}` : ""}
        </p>
        <a href="${link}" style="color:#1B6FEB;font-size:12px;">${link}</a>
      </div>`).join("");

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#F8FAFF;padding:32px;border-radius:16px;">
        <div style="background:#0D1B3E;padding:20px 24px;border-radius:12px;margin-bottom:24px;">
          <h1 style="color:white;margin:0 0 4px 0;font-size:20px;">✅ Payment Confirmed — New Booking</h1>
          <p style="color:rgba(255,255,255,0.6);margin:0;font-size:13px;">
            ${orderNumber} · $${amountPaid} CAD · ${pickups.length} pickup stop${pickups.length > 1 ? "s" : ""}
          </p>
        </div>
        ${trackingSection}
        ${shipdayErrors.length ? `<div style="background:#FEE2E2;border:1px solid #E5191E;border-radius:8px;padding:12px;margin-bottom:16px;">
          <p style="margin:0;font-size:12px;color:#C01218;"><strong>Shipday sync issues:</strong><br/>${shipdayErrors.join("<br/>")}</p>
        </div>` : ""}
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;border:1px solid #C8E1F8;margin-bottom:16px;">
          <thead><tr style="background:#1B6FEB;"><th colspan="2" style="color:white;padding:12px 16px;text-align:left;font-size:13px;">SERVICE</th></tr></thead>
          <tbody>
            ${[["Service",m.serviceType],["Amount Paid",`$${amountPaid} CAD`]].map(([k,v])=>`
              <tr style="border-bottom:1px solid #EBF3FF;">
                <td style="padding:10px 16px;font-weight:600;color:#64748B;width:35%;font-size:13px;">${k}</td>
                <td style="padding:10px 16px;font-size:13px;">${v}</td>
              </tr>`).join("")}
          </tbody>
        </table>
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;border:1px solid #C8E1F8;margin-bottom:16px;">
          <thead><tr style="background:#1B6FEB;"><th colspan="2" style="color:white;padding:12px 16px;text-align:left;font-size:13px;">📍 PICKUPS (${pickups.length} stop${pickups.length>1?"s":""})</th></tr></thead>
          <tbody>${pickupRows}</tbody>
        </table>
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;border:1px solid #C8E1F8;margin-bottom:16px;">
          <thead><tr style="background:#1B6FEB;"><th colspan="2" style="color:white;padding:12px 16px;text-align:left;font-size:13px;">🏥 DELIVERY</th></tr></thead>
          <tbody>
            ${[["Name",m.dropoffName],["Org",m.dropoffOrg||"—"],["Address",`${m.dropoffAddress}, ${m.dropoffCity}`],["Phone",m.dropoffPhone||"—"]].map(([k,v])=>`
              <tr style="border-bottom:1px solid #EBF3FF;">
                <td style="padding:10px 16px;font-weight:600;color:#64748B;width:35%;font-size:13px;">${k}</td>
                <td style="padding:10px 16px;font-size:13px;">${v}</td>
              </tr>`).join("")}
          </tbody>
        </table>
        <p style="margin-top:24px;font-size:11px;color:#94A3B8;text-align:center;">
          Speedo Medical Couriers · Edmonton, AB · speedomedical@gmail.com · (780) 807-0000
        </p>
      </div>`;

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      });
      await transporter.sendMail({
        from:    `"Speedo Website" <${process.env.GMAIL_USER}>`,
        to:      "speedomedical@gmail.com",
        subject: `[PAID] [${orderNumber}] ${m.serviceType} — ${pickups.length} stop${pickups.length>1?"s":""} → ${m.dropoffCity}`,
        html,
        replyTo: m.contactEmail,
      });
    }

    return NextResponse.json({ ok: true, orderNumber, trackingLink: trackingLinks[0] ?? "" });
  } catch (err) {
    console.error("[VERIFY ERROR]", err);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
