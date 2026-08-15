import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getCoC, updateCoC } from "@/lib/coc";
import { generateCoCPdf } from "@/lib/coc-pdf";

async function sendCoCEmail(to: string, name: string, orderNumber: string, pdf: Uint8Array) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
  await transporter.sendMail({
    from:    `"Speedo Medical Couriers" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Chain of Custody — ${orderNumber}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;">
        <div style="background:#0D1B3E;padding:20px 24px;border-radius:12px;margin-bottom:20px;">
          <h2 style="color:white;margin:0;font-size:18px;">Chain of Custody Document</h2>
          <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px;">Order ${orderNumber}</p>
        </div>
        <p style="color:#334155;">Hi ${name},</p>
        <p style="color:#334155;">Your chain of custody document for order <strong>${orderNumber}</strong> is attached. Both parties have signed and the delivery is confirmed complete.</p>
        <p style="color:#334155;">Please keep this document for your records.</p>
        <p style="color:#64748B;font-size:12px;margin-top:24px;">Speedo Medical Couriers · Edmonton, AB<br>(780) 807-0000 · speedomedical@gmail.com</p>
      </div>`,
    attachments: [{
      filename: `CoC-${orderNumber}.pdf`,
      content:  Buffer.from(pdf),
      contentType: "application/pdf",
    }],
  });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  try {
    const record = await getCoC(token);
    if (!record) return NextResponse.json({ error: "Record not found" }, { status: 404 });

    const body = await req.json() as {
      step: "pickup" | "delivery";
      signedBy: string;
      signature: string;
      condition?: "intact" | "damaged";
      notes?: string;
    };

    if (!body.signedBy || !body.signature) {
      return NextResponse.json({ error: "signedBy and signature are required" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    if (body.step === "pickup") {
      if (record.status !== "pending_pickup") {
        return NextResponse.json({ error: "Pickup already signed" }, { status: 409 });
      }
      record.pickup  = { signedBy: body.signedBy, signature: body.signature, timestamp };
      record.status  = "pending_delivery";
      await updateCoC(record);
      return NextResponse.json({ ok: true, status: record.status });
    }

    if (body.step === "delivery") {
      if (record.status !== "pending_delivery") {
        return NextResponse.json({ error: "Cannot sign delivery yet — pickup not signed, or already completed" }, { status: 409 });
      }
      record.delivery = {
        signedBy:  body.signedBy,
        signature: body.signature,
        timestamp,
        condition: body.condition ?? "intact",
        notes:     body.notes ?? "",
      };
      record.status = "completed";
      await updateCoC(record);

      // Generate PDF and email both parties
      try {
        const pdf = await generateCoCPdf(record);
        const emailJobs: Promise<void>[] = [];

        if (record.pharmacyEmail) {
          emailJobs.push(sendCoCEmail(record.pharmacyEmail, record.pharmacyName, record.orderNumber, pdf));
        }
        if (record.patientEmail) {
          emailJobs.push(sendCoCEmail(record.patientEmail, record.patientName, record.orderNumber, pdf));
        }
        // Always send to Speedo for our records
        emailJobs.push(sendCoCEmail(
          process.env.GMAIL_USER ?? "speedomedical@gmail.com",
          "Speedo Records",
          record.orderNumber,
          pdf
        ));

        await Promise.allSettled(emailJobs);
      } catch (err) {
        console.error("[COC PDF/EMAIL ERROR]", err);
        // Don't fail the sign request — record is already saved
      }

      return NextResponse.json({ ok: true, status: "completed" });
    }

    return NextResponse.json({ error: "step must be pickup or delivery" }, { status: 400 });

  } catch (err) {
    console.error("[COC SIGN ERROR]", err);
    return NextResponse.json({ error: "Failed to save signature" }, { status: 500 });
  }
}
