/**
 * Shipday delivery management API client.
 * Used server-side only — never import in client components.
 * Docs: https://docs.shipday.com
 */

const SHIPDAY_BASE = "https://api.shipday.com";

function authHeader(): string {
  return `Basic ${process.env.SHIPDAY_API_KEY}`;
}

// ── Types ──────────────────────────────────────────────────

export interface ShipdayOrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  addons?: string;
}

export interface ShipdayCreatePayload {
  orderNumber: string;
  customerName: string;
  customerAddress: string;
  customerEmail?: string;
  customerPhoneNumber?: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantPhoneNumber?: string;
  expectedDeliveryDate: string;    // MM/DD/YYYY
  expectedPickupTime: string;      // HH:MM (24-hour)
  expectedDeliveryTime?: string;
  orderItems: ShipdayOrderItem[];
  deliveryFee?: number;
  tips?: number;
  tax?: number;
  discountAmount?: number;
  totalOrderCost?: number;
  notes?: string;
}

export interface ShipdayOrderResult {
  orderId: number;
  orderNumber: string;
  trackingLink: string;
  status: string;
}

export interface ShipdayTrackingResult {
  orderId: number;
  orderNumber: string;
  status: string;
  trackingLink: string;
  driverName?: string;
  driverPhone?: string;
  estimatedDeliveryTime?: string;
  customerName?: string;
  customerAddress?: string;
  pickupAddress?: string;
}

// ── Helpers ────────────────────────────────────────────────

/** "2024-01-15" → "01/15/2024" */
export function formatShipdayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  return `${m}/${d}/${y}`;
}

/** Map our time slot strings to 24-hour HH:MM for Shipday */
export function mapTimeSlot(slot: string): string {
  const map: Record<string, string> = {
    asap:      "10:00",
    morning:   "10:00",
    afternoon: "14:00",
    evening:   "18:00",
    custom:    "12:00",
  };
  return map[slot] ?? "12:00";
}

/** Estimated delivery window (+2h standard, +1.5h priority, +1h STAT) */
export function estimatedDeliveryTime(slot: string, serviceType: string): string {
  const base = mapTimeSlot(slot);
  const [h, m] = base.split(":").map(Number);
  const offsetH = serviceType === "rush" ? 1 : 2;
  const deliveryH = (h + offsetH) % 24;
  return `${String(deliveryH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Derive delivery fee from service type */
export function deliveryFee(serviceType: string, timeSlot: string): number {
  if (serviceType === "rush" || timeSlot === "asap") return 85;
  if (serviceType === "specimen") return 55;
  return 35;
}

const SERVICE_LABELS: Record<string, string> = {
  prescription: "Prescription Delivery",
  specimen:     "Specimen Transport",
  equipment:    "Medical Equipment",
  rush:         "Same-Day STAT Rush",
  documents:    "Medical Documents",
  supplies:     "Medical Supplies",
};

// ── API Calls ──────────────────────────────────────────────

/**
 * Create a new Shipday delivery order.
 * Returns the Shipday order result including the live tracking link.
 */
export async function createOrder(payload: ShipdayCreatePayload): Promise<ShipdayOrderResult> {
  const res = await fetch(`${SHIPDAY_BASE}/orders`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Shipday createOrder ${res.status}: ${body}`);
  }

  const json = await res.json();

  // Normalise response — Shipday may wrap it in a data key
  const data = json.data ?? json;
  return {
    orderId:      data.orderId      ?? data.id      ?? 0,
    orderNumber:  data.orderNumber  ?? payload.orderNumber,
    trackingLink: data.trackingLink ?? data.tracking_link ?? "",
    status:       data.orderStatus  ?? data.status        ?? "WAITING",
  };
}

/**
 * Look up an order by our order number (e.g. SMC-1234567890).
 * Returns null if not found.
 */
export async function getOrder(orderNumber: string): Promise<ShipdayTrackingResult | null> {
  const res = await fetch(
    `${SHIPDAY_BASE}/orders/${encodeURIComponent(orderNumber)}`,
    { headers: { Authorization: authHeader() } }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Shipday getOrder ${res.status}`);

  const json = await res.json();
  const data = json.data ?? json;

  return {
    orderId:              data.orderId               ?? 0,
    orderNumber:          data.orderNumber            ?? orderNumber,
    status:               data.orderStatus            ?? data.status ?? "UNKNOWN",
    trackingLink:         data.trackingLink           ?? data.tracking_link ?? "",
    driverName:           data.carrierName            ?? data.driverName,
    driverPhone:          data.carrierPhone           ?? data.driverPhone,
    estimatedDeliveryTime:data.estimatedDeliveryTime  ?? undefined,
    customerName:         data.customerName           ?? undefined,
    customerAddress:      data.customerAddress        ?? undefined,
    pickupAddress:        data.restaurantAddress      ?? undefined,
  };
}

/**
 * Build a Shipday order payload from the booking form fields.
 * Returns both the payload and the generated order number.
 */
export function buildOrderPayload(form: {
  serviceType:        string;
  pickupName:         string;
  pickupOrg:          string;
  pickupAddress:      string;
  pickupCity:         string;
  pickupPhone:        string;
  pickupDate:         string;
  pickupTime:         string;
  dropoffName:        string;
  dropoffOrg:         string;
  dropoffAddress:     string;
  dropoffCity:        string;
  dropoffPhone:       string;
  contactName:        string;
  contactEmail:       string;
  contactPhone:       string;
  specialInstructions:string;
  temperatureSensitive:boolean;
}): { orderNumber: string; payload: ShipdayCreatePayload } {
  const orderNumber = `SMC-${Date.now()}`;
  const fee = deliveryFee(form.serviceType, form.pickupTime);
  const pickupFrom = `${form.pickupAddress}, ${form.pickupCity}, AB, Canada`;
  const deliverTo  = `${form.dropoffAddress}, ${form.dropoffCity}, AB, Canada`;

  const addons = [
    form.temperatureSensitive ? "COLD CHAIN REQUIRED — temperature-sensitive cargo" : "",
    form.dropoffOrg ? `Deliver to: ${form.dropoffOrg}` : "",
  ].filter(Boolean).join(" | ");

  const notes = [
    form.specialInstructions,
    form.temperatureSensitive ? "⚠️ Temperature-sensitive — cold chain required" : "",
  ].filter(Boolean).join(" | ");

  const payload: ShipdayCreatePayload = {
    orderNumber,
    customerName:         form.dropoffName,
    customerAddress:      deliverTo,
    customerEmail:        form.contactEmail,
    customerPhoneNumber:  form.dropoffPhone || form.contactPhone,
    restaurantName:       form.pickupOrg || "Speedo Medical Couriers Pickup",
    restaurantAddress:    pickupFrom,
    restaurantPhoneNumber:form.pickupPhone || "(780) 807-0000",
    expectedDeliveryDate: formatShipdayDate(form.pickupDate),
    expectedPickupTime:   mapTimeSlot(form.pickupTime),
    expectedDeliveryTime: estimatedDeliveryTime(form.pickupTime, form.serviceType),
    orderItems: [{
      name:      SERVICE_LABELS[form.serviceType] ?? form.serviceType,
      quantity:  1,
      unitPrice: fee,
      addons,
    }],
    deliveryFee:     fee,
    tips:            0,
    tax:             0,
    discountAmount:  0,
    totalOrderCost:  fee,
    notes,
  };

  return { orderNumber, payload };
}
