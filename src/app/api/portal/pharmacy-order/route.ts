import { NextRequest, NextResponse } from "next/server";
import { buildOrderPayload, createOrder } from "@/lib/shipday";

export async function POST(req: NextRequest) {
  const portalCode = process.env.PHARMACY_PORTAL_CODE;
  if (!portalCode) {
    return NextResponse.json({ error: "Portal not configured" }, { status: 503 });
  }

  const body = await req.json();
  const {
    code,
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

  if (!code || code !== portalCode) {
    return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
  }

  const missing = [];
  if (!pharmacyName)    missing.push("pharmacyName");
  if (!pharmacyAddress) missing.push("pharmacyAddress");
  if (!patientName)     missing.push("patientName");
  if (!deliveryAddress) missing.push("deliveryAddress");
  if (!deliveryCity)    missing.push("deliveryCity");
  if (missing.length)
    return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });

  const orderNumber = `SMC-PH-${Date.now()}`;

  if (!process.env.SHIPDAY_API_KEY) {
    return NextResponse.json({
      ok: true,
      orderNumber,
      trackingLink: "",
      message: "Order logged (Shipday not configured — Speedo will call to confirm)",
    });
  }

  const serviceType = urgency === "stat" ? "rush" : "prescription";
  const timeSlot    = urgency === "stat" ? "asap" : deliveryTime ?? "morning";

  try {
    const { payload } = buildOrderPayload({
      serviceType,
      pickupName:          pharmacistName ?? pharmacyName,
      pickupOrg:           pharmacyName,
      pickupAddress:       pharmacyAddress,
      pickupCity:          pharmacyCity ?? "Edmonton",
      pickupPhone:         pharmacyPhone ?? "",
      pickupDate:          deliveryDate ?? new Date().toISOString().split("T")[0],
      pickupTime:          timeSlot,
      dropoffName:         patientName,
      dropoffOrg:          "",
      dropoffAddress:      deliveryAddress,
      dropoffCity:         deliveryCity,
      dropoffPhone:        patientPhone ?? "",
      contactName:         pharmacistName ?? pharmacyName,
      contactEmail:        "",
      contactPhone:        pharmacyPhone ?? "",
      specialInstructions: medicationNotes ?? "",
      temperatureSensitive: temperatureSensitive ?? false,
    });

    const result = await createOrder({ ...payload, orderNumber });

    return NextResponse.json({
      ok: true,
      orderNumber,
      trackingLink: result.trackingLink ?? "",
    });
  } catch (err) {
    console.error("[PHARMACY ORDER ERROR]", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
