import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const {
    businessName,
    businessType,
    contactName,
    email,
    phone,
    address,
    monthlyVolume,
    services,
    notes,
  } = data;

  if (!businessName || !email || !contactName || !businessType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const servicesList = Array.isArray(services) ? services.join(", ") : services;

  // Internal notification to Speedo team
  await transporter.sendMail({
    from: `"Speedo Medical Couriers" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `New Partner Registration: ${businessName}`,
    html: `
      <h2>New Business Partner Registration</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Business Name</td><td style="padding:8px;border:1px solid #eee">${businessName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Business Type</td><td style="padding:8px;border:1px solid #eee">${businessType}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Contact Name</td><td style="padding:8px;border:1px solid #eee">${contactName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #eee">${phone || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Address</td><td style="padding:8px;border:1px solid #eee">${address || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Est. Monthly Volume</td><td style="padding:8px;border:1px solid #eee">${monthlyVolume || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Services Needed</td><td style="padding:8px;border:1px solid #eee">${servicesList || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Notes</td><td style="padding:8px;border:1px solid #eee">${notes || "—"}</td></tr>
      </table>
      <p style="margin-top:16px;color:#666">Reply to this email or call <strong>${phone}</strong> to follow up within 24 hours.</p>
    `,
  });

  // Welcome email to the business
  await transporter.sendMail({
    from: `"Speedo Medical Couriers" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Welcome to Speedo Medical Couriers, ${businessName}!`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0D1B3E;padding:32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:24px">Welcome to Speedo Medical Couriers</h1>
          <p style="color:rgba(255,255,255,0.7);margin:8px 0 0">Edmonton's dedicated healthcare courier</p>
        </div>
        <div style="background:white;padding:32px;border-radius:0 0 12px 12px;border:1px solid #eee">
          <p style="font-size:16px;color:#333">Hi ${contactName},</p>
          <p style="color:#555;line-height:1.6">
            Thank you for registering <strong>${businessName}</strong> as a Speedo Medical partner.
            We've received your application and a member of our team will reach out within
            <strong>24 hours</strong> to finalize your account setup and discuss your route requirements.
          </p>
          <p style="color:#555;line-height:1.6">
            In the meantime, if you have an urgent delivery need, don't hesitate to call us directly:
          </p>
          <div style="background:#F0F4FF;border-radius:8px;padding:16px;text-align:center;margin:20px 0">
            <p style="margin:0;font-size:20px;font-weight:bold;color:#1B4FD8">(780) 807-0000</p>
            <p style="margin:4px 0 0;color:#666;font-size:14px">Available 365 days/year</p>
          </div>
          <p style="color:#555;line-height:1.6">
            We look forward to supporting <strong>${businessName}</strong> and the patients you serve.
          </p>
          <p style="color:#333;font-weight:bold">The Speedo Medical Team</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
          <p style="font-size:12px;color:#999">speedomedic.ca · Edmonton, AB · (780) 807-0000</p>
        </div>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
