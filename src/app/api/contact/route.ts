import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, org, email, phone, message } = await req.json();

    const html = `
      <div style="font-family: sans-serif; max-width: 560px; margin: auto; background: #F8FAFF; padding: 32px; border-radius: 16px;">
        <div style="background: #0D1B3E; padding: 20px 24px; border-radius: 12px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 18px;">📬 Contact Form — Speedo Medical Couriers</h1>
        </div>
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #C8E1F8;">
          <tbody>
            ${[
              ["Name", name],
              ["Organization", org || "—"],
              ["Email", email],
              ["Phone", phone || "—"],
            ].map(([k, v]) => `
              <tr style="border-bottom: 1px solid #EBF3FF;">
                <td style="padding: 10px 16px; font-weight: 600; color: #64748B; width: 35%; font-size: 13px;">${k}</td>
                <td style="padding: 10px 16px; font-size: 13px;">${v}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        <div style="margin-top: 16px; background: white; border-radius: 12px; border: 1px solid #C8E1F8; padding: 16px;">
          <p style="margin: 0 0 6px; font-weight: 600; color: #64748B; font-size: 13px;">Message</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 11px; color: #94A3B8; text-align: center;">
          Speedo Medical Couriers · Edmonton, AB · (780) 807-0000
        </p>
      </div>
    `;

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      });
      await transporter.sendMail({
        from: `"Speedo Website" <${process.env.GMAIL_USER}>`,
        to: "speedomedical@gmail.com",
        subject: `Contact form: ${name}${org ? ` (${org})` : ""}`,
        html,
        replyTo: email,
      });
    } else {
      console.log("[CONTACT]", { name, org, email, phone, message });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[CONTACT ERROR]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
