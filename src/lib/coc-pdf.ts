import { PDFDocument, StandardFonts, rgb, PDFFont, PDFPage } from "pdf-lib";
import type { CoCRecord } from "./coc";

const NAVY    = rgb(0.051, 0.106, 0.243); // #0D1B3E
const BLUE    = rgb(0.106, 0.435, 0.922); // #1B6FEB
const GRAY    = rgb(0.392, 0.455, 0.557); // #647080
const BLACK   = rgb(0.075, 0.094, 0.133); // #131820
const WHITE   = rgb(1, 1, 1);
const WHITE60 = rgb(0.8, 0.82, 0.85);    // muted white approximation
const GREEN   = rgb(0.059, 0.659, 0.420); // #0FA86B
const GREENLT = rgb(0.87, 0.98, 0.92);   // light green fill

const W = 595; // A4 width
const H = 842; // A4 height
const M = 44;  // margin

function row(page: PDFPage, label: string, value: string, y: number, font: PDFFont, bold: PDFFont) {
  page.drawText(label, { x: M, y, font: bold, size: 8, color: GRAY });
  page.drawText(value || "—", { x: M + 120, y, font, size: 8.5, color: BLACK, maxWidth: W - M - 120 - M });
}

function sectionHeader(page: PDFPage, title: string, y: number, bold: PDFFont) {
  page.drawRectangle({ x: M, y: y - 6, width: W - M * 2, height: 22, color: BLUE });
  page.drawText(title, { x: M + 10, y: y, font: bold, size: 9, color: WHITE });
}

export async function generateCoCPdf(record: CoCRecord): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page   = pdfDoc.addPage([W, H]);
  const font   = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold   = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = H - M;

  // ── Header bar ──────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: H - 68, width: W, height: 68, color: NAVY });
  page.drawText("CHAIN OF CUSTODY", { x: M, y: H - 30, font: bold, size: 14, color: WHITE });
  page.drawText("Speedo Medical Couriers · Edmonton, AB · speedomedic.ca · (780) 807-0000",
    { x: M, y: H - 46, font, size: 7.5, color: WHITE60 });
  // Order # and date right-aligned
  const orderStr = `Order #${record.orderNumber}`;
  const dateStr  = new Date(record.createdAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const orderW   = bold.widthOfTextAtSize(orderStr, 9);
  const dateW    = font.widthOfTextAtSize(dateStr, 8);
  page.drawText(orderStr, { x: W - M - orderW, y: H - 30, font: bold, size: 9, color: WHITE });
  page.drawText(dateStr,  { x: W - M - dateW,  y: H - 46, font, size: 8, color: WHITE60 });

  y = H - 80;

  // ── SENDER + RECIPIENT side by side ─────────────────────────────
  const halfW = (W - M * 2 - 16) / 2;

  // Left: Sender
  page.drawRectangle({ x: M, y: y - 20, width: halfW, height: 18, color: BLUE });
  page.drawText("SENDER (PHARMACY)", { x: M + 8, y: y - 14, font: bold, size: 8, color: WHITE });

  const senderLines = [
    record.pharmacyName,
    `${record.pharmacistName ? `c/o ${record.pharmacistName}` : ""}`,
    `${record.pharmacyAddress}, ${record.pharmacyCity}`,
    record.pharmacyPhone,
    record.pharmacyEmail,
  ].filter(Boolean);

  let sy = y - 36;
  for (const line of senderLines) {
    page.drawText(line, { x: M + 8, y: sy, font, size: 8.5, color: BLACK, maxWidth: halfW - 16 });
    sy -= 14;
  }

  // Right: Recipient
  const rx = M + halfW + 16;
  page.drawRectangle({ x: rx, y: y - 20, width: halfW, height: 18, color: BLUE });
  page.drawText("RECIPIENT (PATIENT)", { x: rx + 8, y: y - 14, font: bold, size: 8, color: WHITE });

  const recipLines = [
    record.patientName,
    `${record.patientAddress}, ${record.patientCity}`,
    record.patientPhone,
    record.patientEmail,
  ].filter(Boolean);

  let ry = y - 36;
  for (const line of recipLines) {
    page.drawText(line, { x: rx + 8, y: ry, font, size: 8.5, color: BLACK, maxWidth: halfW - 16 });
    ry -= 14;
  }

  y = Math.min(sy, ry) - 18;

  // ── SHIPMENT DETAILS ─────────────────────────────────────────────
  sectionHeader(page, "SHIPMENT DETAILS", y, bold);
  y -= 22;
  row(page, "Medications", record.medications, y, font, bold); y -= 16;
  row(page, "Urgency",
    record.urgency === "stat"     ? "STAT Rush (< 60 min)" :
    record.urgency === "same_day" ? "Same-Day" : "Standard (2–4 hrs)",
    y, font, bold); y -= 16;
  row(page, "Cold Chain", record.coldChain ? "YES — temperature sensitive" : "No", y, font, bold); y -= 20;

  // ── PICKUP CONFIRMATION ──────────────────────────────────────────
  sectionHeader(page, "PICKUP CONFIRMATION — Signed by Pharmacy", y, bold);
  y -= 22;

  if (record.pickup) {
    row(page, "Signed by", record.pickup.signedBy, y, font, bold); y -= 16;
    row(page, "Timestamp", new Date(record.pickup.timestamp).toLocaleString("en-CA"), y, font, bold); y -= 20;

    // Signature image
    try {
      const b64 = record.pickup.signature.split(",")[1];
      const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      const img = await pdfDoc.embedPng(bytes);
      const dims = img.scale(0.4);
      page.drawImage(img, { x: M, y: y - dims.height, width: dims.width, height: dims.height });
      page.drawRectangle({ x: M, y: y - dims.height - 2, width: dims.width + 4, height: dims.height + 4,
        borderColor: GRAY, borderWidth: 0.5 });
      y -= dims.height + 12;
    } catch {
      page.drawText("[Signature on file]", { x: M, y, font, size: 8, color: GRAY });
      y -= 14;
    }
  } else {
    page.drawText("Awaiting signature", { x: M, y, font, size: 9, color: GRAY });
    y -= 14;
  }

  y -= 8;

  // ── DELIVERY CONFIRMATION ────────────────────────────────────────
  sectionHeader(page, "DELIVERY CONFIRMATION — Signed by Patient", y, bold);
  y -= 22;

  if (record.delivery) {
    row(page, "Signed by", record.delivery.signedBy, y, font, bold); y -= 16;
    row(page, "Timestamp", new Date(record.delivery.timestamp).toLocaleString("en-CA"), y, font, bold); y -= 16;
    row(page, "Condition", record.delivery.condition === "intact" ? "Package received intact" : "Package received — damage noted", y, font, bold); y -= 16;
    if (record.delivery.notes) {
      row(page, "Notes", record.delivery.notes, y, font, bold); y -= 16;
    }
    y -= 4;

    // Signature image
    try {
      const b64 = record.delivery.signature.split(",")[1];
      const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      const img = await pdfDoc.embedPng(bytes);
      const dims = img.scale(0.4);
      page.drawImage(img, { x: M, y: y - dims.height, width: dims.width, height: dims.height });
      page.drawRectangle({ x: M, y: y - dims.height - 2, width: dims.width + 4, height: dims.height + 4,
        borderColor: GRAY, borderWidth: 0.5 });
      y -= dims.height + 12;
    } catch {
      page.drawText("[Signature on file]", { x: M, y, font, size: 8, color: GRAY });
      y -= 14;
    }

    // Completion stamp
    y -= 12;
    page.drawRectangle({ x: M, y: y - 24, width: W - M * 2, height: 24, color: GREENLT });
    page.drawRectangle({ x: M, y: y - 24, width: W - M * 2, height: 24, borderColor: GREEN, borderWidth: 1 });
    page.drawText("✓ CHAIN OF CUSTODY COMPLETE — Both parties have signed this document.",
      { x: M + 10, y: y - 16, font: bold, size: 8.5, color: GREEN });
    y -= 36;
  } else {
    page.drawText("Awaiting signature", { x: M, y, font, size: 9, color: GRAY });
    y -= 14;
  }

  // ── Footer ───────────────────────────────────────────────────────
  page.drawLine({ start: { x: M, y: 40 }, end: { x: W - M, y: 40 }, thickness: 0.5, color: GRAY });
  page.drawText(
    "This document is an official chain of custody record issued by Speedo Medical Couriers. " +
    "For questions: speedomedical@gmail.com · (780) 807-0000",
    { x: M, y: 26, font, size: 7, color: GRAY, maxWidth: W - M * 2 }
  );

  return pdfDoc.save();
}
