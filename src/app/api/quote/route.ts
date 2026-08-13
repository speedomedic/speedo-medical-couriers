import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      name, businessName, phone, email,
      serviceType, pickupArea, deliveryArea, frequency, urgency,
      specialRequirements, bestTimeToContact, heardAboutUs,
    } = data;

    if (!name || !phone || !email || !serviceType) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    const submittedAt = new Date().toLocaleString("en-CA", {
      timeZone: "America/Edmonton",
      dateStyle: "full",
      timeStyle: "short",
    });

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: auto; background: #F8FAFF; padding: 32px;">
        <div style="background: linear-gradient(135deg, #0D1B3E 0%, #1B6FEB 100%); padding: 28px 32px; border-radius: 16px; margin-bottom: 28px;">
          <h1 style="color: white; margin: 0 0 4px 0; font-size: 22px; font-weight: 800;">🚑 New Quote Request</h1>
          <p style="color: rgba(255,255,255,0.65); margin: 0; font-size: 14px;">Speedo Medical Couriers — ${submittedAt}</p>
        </div>

        <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; margin-bottom: 20px;">
          <div style="background: #EBF3FF; padding: 12px 20px; border-bottom: 1px solid #C8DDF8;">
            <h2 style="margin: 0; font-size: 13px; font-weight: 800; color: #0D1B3E; text-transform: uppercase; letter-spacing: 0.06em;">Contact Information</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B; width: 40%; border-bottom: 1px solid #F1F5F9;">Name</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E; border-bottom: 1px solid #F1F5F9;">${name}</td></tr>
            ${businessName ? `<tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B; border-bottom: 1px solid #F1F5F9;">Business / Clinic</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E; border-bottom: 1px solid #F1F5F9;">${businessName}</td></tr>` : ""}
            <tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B; border-bottom: 1px solid #F1F5F9;">Phone</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E; border-bottom: 1px solid #F1F5F9;"><a href="tel:${phone}" style="color: #1B6FEB;">${phone}</a></td></tr>
            <tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B;">Email</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E;"><a href="mailto:${email}" style="color: #1B6FEB;">${email}</a></td></tr>
          </table>
        </div>

        <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; margin-bottom: 20px;">
          <div style="background: #EBF3FF; padding: 12px 20px; border-bottom: 1px solid #C8DDF8;">
            <h2 style="margin: 0; font-size: 13px; font-weight: 800; color: #0D1B3E; text-transform: uppercase; letter-spacing: 0.06em;">Service Details</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B; width: 40%; border-bottom: 1px solid #F1F5F9;">Service Type</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E; border-bottom: 1px solid #F1F5F9;">${serviceType}</td></tr>
            ${pickupArea ? `<tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B; border-bottom: 1px solid #F1F5F9;">Pickup Area</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E; border-bottom: 1px solid #F1F5F9;">${pickupArea}</td></tr>` : ""}
            ${deliveryArea ? `<tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B; border-bottom: 1px solid #F1F5F9;">Delivery Area</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E; border-bottom: 1px solid #F1F5F9;">${deliveryArea}</td></tr>` : ""}
            <tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B; border-bottom: 1px solid #F1F5F9;">Frequency</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E; border-bottom: 1px solid #F1F5F9;">${frequency || "Not specified"}</td></tr>
            <tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B;">Urgency</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E;">${urgency || "Standard"}</td></tr>
          </table>
        </div>

        ${specialRequirements ? `
        <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; margin-bottom: 20px;">
          <div style="background: #EBF3FF; padding: 12px 20px; border-bottom: 1px solid #C8DDF8;">
            <h2 style="margin: 0; font-size: 13px; font-weight: 800; color: #0D1B3E; text-transform: uppercase; letter-spacing: 0.06em;">Special Requirements</h2>
          </div>
          <p style="margin: 0; padding: 16px 20px; font-size: 14px; color: #374151; line-height: 1.6;">${specialRequirements}</p>
        </div>` : ""}

        <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; margin-bottom: 28px;">
          <div style="background: #EBF3FF; padding: 12px 20px; border-bottom: 1px solid #C8DDF8;">
            <h2 style="margin: 0; font-size: 13px; font-weight: 800; color: #0D1B3E; text-transform: uppercase; letter-spacing: 0.06em;">Follow-Up Preferences</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            ${bestTimeToContact ? `<tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B; width: 40%; border-bottom: 1px solid #F1F5F9;">Best Time to Call</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E; border-bottom: 1px solid #F1F5F9;">${bestTimeToContact}</td></tr>` : ""}
            ${heardAboutUs ? `<tr><td style="padding: 10px 20px; font-size: 13px; color: #64748B;">Heard About Us</td><td style="padding: 10px 20px; font-size: 14px; font-weight: 600; color: #0D1B3E;">${heardAboutUs}</td></tr>` : ""}
          </table>
        </div>

        <div style="background: #0D1B3E; border-radius: 12px; padding: 18px 24px; text-align: center;">
          <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 13px;">
            Reply to this email or call <strong style="color: white;">${phone}</strong> to follow up with ${name}.
          </p>
        </div>
      </div>
    `;

    // Send to business
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      });

      await transporter.sendMail({
        from:    `"Speedo Website" <${process.env.GMAIL_USER}>`,
        to:      process.env.GMAIL_USER,
        replyTo: email,
        subject: `Quote Request — ${serviceType} — ${name}${businessName ? ` (${businessName})` : ""}`,
        html,
      });

      // Auto-reply to customer
      await transporter.sendMail({
        from:    `"Speedo Medical Couriers" <${process.env.GMAIL_USER}>`,
        to:      email,
        subject: "We received your quote request — Speedo Medical Couriers",
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 580px; margin: auto; padding: 32px; background: #F8FAFF;">
            <div style="background: linear-gradient(135deg, #0D1B3E, #1B6FEB); padding: 28px 32px; border-radius: 16px; margin-bottom: 24px;">
              <h1 style="color: white; margin: 0 0 6px; font-size: 22px; font-weight: 800;">Thank you, ${name.split(" ")[0]}!</h1>
              <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 14px;">We've received your quote request and will be in touch soon.</p>
            </div>
            <div style="background: white; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; margin-bottom: 20px;">
              <h2 style="color: #0D1B3E; font-size: 16px; margin: 0 0 12px;">What happens next?</h2>
              <ol style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 2;">
                <li>A member of our team reviews your request (usually within a few hours)</li>
                <li>We'll call or email you at your preferred time to discuss your needs</li>
                <li>We'll provide a custom quote tailored to your delivery requirements</li>
                <li>Once approved, your first delivery can be scheduled same-day</li>
              </ol>
            </div>
            <div style="background: #EBF3FF; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #0D1B3E;"><strong>Need something urgently?</strong> Call us directly at <a href="tel:7808070000" style="color: #1B6FEB; font-weight: 700;">(780) 807-0000</a> — we're available 7 days a week.</p>
            </div>
            <p style="color: #64748B; font-size: 13px; text-align: center; margin: 0;">Speedo Medical Couriers · Edmonton, Alberta · <a href="https://speedomedical.ca" style="color: #1B6FEB;">speedomedical.ca</a></p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[QUOTE API]", err);
    return NextResponse.json({ error: "Server error. Please try calling us directly." }, { status: 500 });
  }
}
