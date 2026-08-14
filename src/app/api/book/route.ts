import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildOrderPayload, createOrder, formatOrderNumber } from "@/lib/shipday";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      serviceType, pickupName, pickupOrg, pickupAddress, pickupCity, pickupPhone,
      pickupDate, pickupTime, dropoffName, dropoffOrg, dropoffAddress, dropoffCity,
      dropoffPhone, contactName, contactEmail, contactPhone, specialInstructions,
      temperatureSensitive,
    } = data;

    // ── 1. Create Shipday order ────────────────────────────
    let orderNumber = `SMC-${Date.now()}`;
    let trackingLink = "";
    let shipdayError = "";

    if (process.env.SHIPDAY_API_KEY) {
      try {
        const { payload } = buildOrderPayload(data);
        const result = await createOrder(payload);
        // Use Shipday's numeric orderId in our order number so tracking can resolve it
        orderNumber = formatOrderNumber(result.orderId);
        trackingLink = result.trackingLink;
        console.log("[SHIPDAY] Order created:", result.orderId, orderNumber);
      } catch (err) {
        shipdayError = err instanceof Error ? err.message : String(err);
        console.error("[SHIPDAY ERROR]", shipdayError);
        // Non-fatal — email is the fallback
      }
    }

    // ── 2. Send email notification ─────────────────────────
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #F8FAFF; padding: 32px; border-radius: 16px;">
        <div style="background: #0D1B3E; padding: 20px 24px; border-radius: 12px; margin-bottom: 24px;">
          <h1 style="color: white; margin: 0 0 4px 0; font-size: 20px;">🚑 New Booking — Speedo Medical Couriers</h1>
          <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 13px;">Order ${orderNumber}</p>
        </div>

        ${trackingLink ? `
        <div style="background: #EBF3FF; border: 1px solid #1B6FEB; border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: center;">
          <p style="margin: 0 0 8px 0; font-weight: 700; color: #0D1B3E; font-size: 14px;">📍 Live Shipday Tracking</p>
          <a href="${trackingLink}" style="color: #1B6FEB; font-size: 13px; word-break: break-all;">${trackingLink}</a>
        </div>` : ""}

        ${shipdayError ? `
        <div style="background: #FEE2E2; border: 1px solid #E5191E; border-radius: 8px; padding: 12px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 12px; color: #C01218;"><strong>Shipday sync failed</strong> — order was NOT created in dispatch system. Manual entry required.<br/>${shipdayError}</p>
        </div>` : ""}

        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #C8E1F8; margin-bottom: 16px;">
          <thead>
            <tr style="background: #1B6FEB;">
              <th colspan="2" style="color: white; padding: 12px 16px; text-align: left; font-size: 13px;">SERVICE DETAILS</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ["Order #",           orderNumber],
              ["Service Type",      serviceType],
              ["Temp. Sensitive",   temperatureSensitive ? "YES — cold chain required" : "No"],
            ].map(([k, v]) => `
              <tr style="border-bottom: 1px solid #EBF3FF;">
                <td style="padding: 10px 16px; font-weight: 600; color: #64748B; width: 40%; font-size: 13px;">${k}</td>
                <td style="padding: 10px 16px; font-size: 13px;">${v}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #C8E1F8; margin-bottom: 16px;">
          <thead>
            <tr style="background: #1B6FEB;">
              <th colspan="2" style="color: white; padding: 12px 16px; text-align: left; font-size: 13px;">📍 PICKUP</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ["Name",        pickupName],
              ["Organization",pickupOrg || "—"],
              ["Address",     `${pickupAddress}, ${pickupCity}`],
              ["Phone",       pickupPhone || "—"],
              ["Date",        pickupDate],
              ["Time Window", pickupTime],
            ].map(([k, v]) => `
              <tr style="border-bottom: 1px solid #EBF3FF;">
                <td style="padding: 10px 16px; font-weight: 600; color: #64748B; width: 40%; font-size: 13px;">${k}</td>
                <td style="padding: 10px 16px; font-size: 13px;">${v}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #C8E1F8; margin-bottom: 16px;">
          <thead>
            <tr style="background: #1B6FEB;">
              <th colspan="2" style="color: white; padding: 12px 16px; text-align: left; font-size: 13px;">🏥 DELIVERY</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ["Name",        dropoffName],
              ["Organization",dropoffOrg || "—"],
              ["Address",     `${dropoffAddress}, ${dropoffCity}`],
              ["Phone",       dropoffPhone || "—"],
            ].map(([k, v]) => `
              <tr style="border-bottom: 1px solid #EBF3FF;">
                <td style="padding: 10px 16px; font-weight: 600; color: #64748B; width: 40%; font-size: 13px;">${k}</td>
                <td style="padding: 10px 16px; font-size: 13px;">${v}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #C8E1F8; margin-bottom: 16px;">
          <thead>
            <tr style="background: #0D1B3E;">
              <th colspan="2" style="color: white; padding: 12px 16px; text-align: left; font-size: 13px;">👤 REQUESTER</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ["Name",   contactName],
              ["Email",  contactEmail],
              ["Phone",  contactPhone],
              ["Notes",  specialInstructions || "—"],
            ].map(([k, v]) => `
              <tr style="border-bottom: 1px solid #EBF3FF;">
                <td style="padding: 10px 16px; font-weight: 600; color: #64748B; width: 40%; font-size: 13px;">${k}</td>
                <td style="padding: 10px 16px; font-size: 13px;">${v}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <p style="margin-top: 24px; font-size: 11px; color: #94A3B8; text-align: center;">
          Speedo Medical Couriers · Edmonton, AB · speedomedical@gmail.com · (780) 807-0000
        </p>
      </div>
    `;

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      });
      await transporter.sendMail({
        from:    `"Speedo Website" <${process.env.GMAIL_USER}>`,
        to:      "speedomedical@gmail.com",
        subject: `[${orderNumber}] ${serviceType} — ${pickupCity} → ${dropoffCity} (${pickupDate})`,
        html,
        replyTo: contactEmail,
      });
    } else {
      console.log("[BOOKING]", JSON.stringify({ orderNumber, trackingLink, ...data }, null, 2));
    }

    return NextResponse.json({ ok: true, orderNumber, trackingLink });
  } catch (err) {
    console.error("[BOOKING ERROR]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
