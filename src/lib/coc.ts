import { kv } from "@vercel/kv";

export type CoCStatus = "pending_pickup" | "pending_delivery" | "completed";

export interface CoCPickup {
  signedBy: string;
  signature: string; // data:image/png;base64,...
  timestamp: string;
}

export interface CoCDelivery {
  signedBy: string;
  signature: string;
  timestamp: string;
  condition: "intact" | "damaged";
  notes: string;
}

export interface CoCRecord {
  orderNumber: string;
  createdAt: string;
  status: CoCStatus;
  // Sender
  pharmacyName: string;
  pharmacyAddress: string;
  pharmacyCity: string;
  pharmacyPhone: string;
  pharmacyEmail: string;
  pharmacistName: string;
  // Recipient
  patientName: string;
  patientAddress: string;
  patientCity: string;
  patientPhone: string;
  patientEmail: string;
  // Shipment
  medications: string;
  urgency: string;
  coldChain: boolean;
  // Signatures
  pickup?: CoCPickup;
  delivery?: CoCDelivery;
}

const TTL = 60 * 60 * 24 * 90; // 90 days

export async function createCoC(data: Omit<CoCRecord, "createdAt" | "status">): Promise<void> {
  const record: CoCRecord = { ...data, createdAt: new Date().toISOString(), status: "pending_pickup" };
  await kv.set(`coc:${data.orderNumber}`, record, { ex: TTL });
}

export async function getCoC(orderNumber: string): Promise<CoCRecord | null> {
  return kv.get<CoCRecord>(`coc:${orderNumber}`);
}

export async function updateCoC(record: CoCRecord): Promise<void> {
  await kv.set(`coc:${record.orderNumber}`, record, { ex: TTL });
}
