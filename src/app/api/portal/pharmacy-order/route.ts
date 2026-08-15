import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildOrderPayload, createOrder } from "@/lib/shipday";

function validateCode(code: string): boolean {
  const portalCode = process.env.PHARMACY_PORTAL_CODE;
  return !!portalCode && code === portalCode;
}

async function sendNotificationEmail(data: {
  orderNumber: string;
  pharmacyName: string;
  pharmacistName: string;
  pharmacyPhone: string;
  patientName: string;
  patientPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  medicationNotes: string;
  urgency: string;
  deliveryDate: string;
  deliveryTime: string;
  temperatureSensitive: boolean;
  trackingLink: string;
}) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return;

  const urgencyLabel =
    data.urgency === "stat"     ? "⚡ STAT RUSH (under 60 min)" :
    data.urgency === "same_day" ? "🚚 Same-Day" :
                                  "📦 Standard (2–4 hrs)";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#F8FAFF;padding:32px;border-radius:16px;">
      <div style="background:#0D1B3E;padding:20px 24px;border-radius:12px;margin-bottom:24px;">
        <h1 style="color:white;margin:0 0 4px 0;font-size:20px;">🏥 New Pharmacy Portal Order</h1>
        <p style="color:rgba(255,255,255,0.6);margin:0;font-size:13px;">
          ${data.orderNumber} · ${urgencyLabel}
        </p>
      </div>

      ${data.trackingLink ? `
      <div style="background:#EBF3FF;border:1px solid #1B6FEB;border-radius:10px;padding:12px 16px;margin-bottom:16px;text-align:center;">
        <p style="margin:0 0 4px 0;font-weight:700;color:#0D1B3E;font-size:13px;">📍 Live Tracking</p>
        <a href="${data.trackingLink}" style="color:#1B6FEB;font-size:12px;">${data.trackingLink}</a>
      </div>` : ""}

      <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;border:1px solid #C8E1F8;margin-bottom:16px;">
        <thead><tr style="background:#1B6FEB;"><th colspan="2" style="color:white;padding:12px 16px;text-align:left;font-size:13px;">💊 PHARMACY (PICKUP)</th></tr></thead>
        <tbody>
          ${[
            ["Pharmacy",   data.pharmacyName],
            ["Pharmacist", data.pharmacistName],
            ["Phone",      data.pharmacyPhone || "—"],
            ["Urgency",    urgencyLabel],
          ].map(([k, v]) => `
            <tr style="border-bottom:1px solid #EBF3FF;">
              <td style="padding:8px 16px;font-weight:600;color:#64748B;width:35%;font-size:12px;">${k}</td>
              <td style="padding:8px 16px;font-size:12px;">${v}</td>
            </tr>`).join("")}
        </tbody>
      </table>

      <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;border:1px solid #C8E1F8;margin-bottom:16px;">
        <thead><tr style="background:#1B6FEB;"><th colspan="2" style="color:white;padding:12px 16px;text-align:left;font-size:13px;">🏠 PATIENT (DELIVERY)</th></tr></thead>
        <tbody>
          ${[
            ["Patient",   data.patientName],
            ["Phone",     data.patientPhone || "—"],
            ["Address",   `${data.deliveryAddress}, ${data.deliveryCity}`],
            ["Date",      data.deliveryDate],
            ["Time",      data.deliveryTime],
            ["Cold Chain", data.temperatureSensitive ? "⚠️ YES — cold chain required" : "No"],
          ].map(([k, v]) => `
            <tr style="border-bottom:1px solid #EBF3FF;">
              <td style="padding:8px 16px;font-weight:600;color:#64748B;width:35%;font-size:12px;">${k}</td>
              <td style="padding:8px 16px;font-size:12px;">${v}</td>
            </tr>`).join("")}
        </tbody>
      </table>

      ${data.medicationNotes ? `
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;border:1px solid #C8E1F8;margin-bottom:16px;">
        <thead><tr style="background:#64748B;"><th colspan="2" style="color:white;padding:12px 16px;text-align:left;font-size:13px;">📝 NOTES</th></tr></thead>
        <tbody>
          <tr><td style="padding:12px 16px;font-size:12px;">${data.medicationNotes}</td></tr>
        </tbody>
      </table>` : ""}

      <p style="margin-top:24px;font-size:11px;color:#94A3B8;text-align:center;">
        Speedo Medical Couriers · Edmonton, AB · speedomedical@gmail.com · (780) 807-0000
      </p>
    </div>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from:    `"Speedo Pharmacy Portal" <${process.env.GMAIL_USER}>`,
    to:      "speedomedical@gmail.com",
    subject: `[PHARMACY ORDER] ${data.orderNumber} — ${data.urgency === "stat" ? "⚡ STAT" : "New"} · ${data.pharmacyName} → ${data.patientName}`,
    html,
  });
}

export async function POST(req: NextRequest) {
  if (!process.env.PHARMACY_PORTAL_CODE) {
    return NextResponse.json({ error: "Portal not configured" }, { status: 503 });
  }

  const body = await req.json();
  const { code, _verifyOnly } = body;

  // Code-only login check — just validate the code, no order creation
  if (_verifyOnly) {
    if (!validateCode(code)) {
      return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
    }
    return NextResponse.json({ ok: true });
  }

  if (!validateCode(code)) {
    return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
  }

  const {
    pharmacyName,
    pharmacyAddress,
    pharmacyCity,
    pharmacyPhone,
    pharmacistName,
    patientName,
    patientPhone,
    deliveryAddress,
    deliveryCity,
    medicationNotes,
    urgency,
    temperatureSensitive,
    deliveryDate,
    deliveryTime,
  } = body;

  const missing = [];
  if (!pharmacyName)    missing.push("pharmacyName");
  if (!pharmacyAddress) missing.push("pharmacyAddress");
  if (!patientName)     missing.push("patientName");
  if (!deliveryAddress) missing.push("deliveryAddress");
  if (!deliveryCity)    missing.push("deliveryCity");
  if (!deliveryDate)    missing.push("deliveryDate");
  if (missing.length)
    return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });

  const orderNumber = `SMC-${Date.now()}`;
  const serviceType = urgency === "stat" ? "rush" : "prescription";
  const timeSlot    = urgency === "stat" ? "asap" : deliveryTime ?? "morning";

  let trackingLink = "";

  if (process.env.SHIPDAY_API_KEY) {
    try {
      const { payload } = buildOrderPayload({
        serviceType,
        pickupName:           pharmacistName ?? pharmacyName,
        pickupOrg:            pharmacyName,
        pickupAddress:        pharmacyAddress,
        pickupCity:           pharmacyCity ?? "Edmonton",
        pickupPhone:          pharmacyPhone ?? "",
        pickupDate:           deliveryDate,
        pickupTime:           timeSlot,
        dropoffName:          patientName,
        dropoffOrg:           "",
        dropoffAddress:       deliveryAddress,
        dropoffCity:          deliveryCity,
        dropoffPhone:         patientPhone ?? "",
        contactName:          pharmacistName ?? pharmacyName,
        contactEmail:         "",
        contactPhone:         pharmacyPhone ?? "",
        specialInstructions:  medicationNotes ?? "",
        temperatureSensitive: temperatureSensitive ?? false,
      });

      const result = await createOrder({ ...payload, orderNumber });
      trackingLink = result.trackingLink ?? "";
    } catch (err) {
      console.error("[PHARMACY SHIPDAY ERROR]", err);
      // Don't fail the request — email still goes out and Anand can dispatch manually
    }
  }

  // Always send email notification regardless of Shipday result
  try {
    await sendNotificationEmail({
      orderNumber,
      pharmacyName:        pharmacyName ?? "",
      pharmacistName:      pharmacistName ?? "",
      pharmacyPhone:       pharmacyPhone ?? "",
      patientName:         patientName ?? "",
      patientPhone:        patientPhone ?? "",
      deliveryAddress:     deliveryAddress ?? "",
      deliveryCity:        deliveryCity ?? "",
      medicationNotes:     medicationNotes ?? "",
      urgency:             urgency ?? "standard",
      deliveryDate:        deliveryDate ?? "",
      deliveryTime:        deliveryTime ?? "",
      temperatureSensitive: temperatureSensitive ?? false,
      trackingLink,
    });
  } catch (err) {
    console.error("[PHARMACY EMAIL ERROR]", err);
  }

  return NextResponse.json({ ok: true, orderNumber, trackingLink });
}
