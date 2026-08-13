"use client";

import { useState } from "react";
import {
  CheckCircle, ArrowRight, ArrowLeft, Plus, Trash2,
  Truck, FlaskConical, Package, Zap, FileText, Shield,
  CreditCard, MapPin, Heart, RefreshCw, Building2, Thermometer,
} from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";

/* ── Types ──────────────────────────────────────────────── */

type ServiceType = "prescription" | "specimen" | "equipment" | "rush" | "documents" | "supplies" | "cold_chain" | "iv_infusion" | "returns" | "ltc";
type TimeSlot    = "asap" | "morning" | "afternoon" | "evening" | "custom";

interface PickupStop {
  name:               string;
  org:                string;
  address:            string;
  city:               string;
  phone:              string;
  date:               string;
  time:               TimeSlot | "";
  temperatureSensitive: boolean;
}

interface FormState {
  serviceType:        ServiceType | "";
  pickups:            PickupStop[];
  dropoffName:        string;
  dropoffOrg:         string;
  dropoffAddress:     string;
  dropoffCity:        string;
  dropoffPhone:       string;
  contactName:        string;
  contactEmail:       string;
  contactPhone:       string;
  specialInstructions: string;
}

const SERVICE_OPTIONS: { id: ServiceType; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "prescription", label: "Prescription Delivery",  icon: <Truck size={24} />,         desc: "Medications from pharmacy to patient or facility" },
  { id: "specimen",     label: "Specimen Transport",     icon: <FlaskConical size={24} />,   desc: "Lab specimens with WHMIS-compliant chain of custody" },
  { id: "equipment",   label: "Medical Equipment",       icon: <Package size={24} />,        desc: "Devices, supplies, and healthcare equipment" },
  { id: "rush",        label: "Same-Day Rush / STAT",    icon: <Zap size={24} />,            desc: "Urgent dispatch — driver sent within 60 min" },
  { id: "documents",  label: "Medical Documents",        icon: <FileText size={24} />,       desc: "Fully confidential document transport" },
  { id: "supplies",   label: "Medical Supplies",         icon: <Shield size={24} />,         desc: "PPE, consumables, and recurring supply runs" },
  { id: "cold_chain", label: "Cold Chain / Vaccines",    icon: <Thermometer size={24} />,    desc: "Biologics, vaccines & insulin requiring 2–8°C handling" },
  { id: "iv_infusion",label: "IV & Infusion Delivery",   icon: <Heart size={24} />,          desc: "IV bags, infusion supplies, and LTC medication delivery" },
  { id: "returns",    label: "Pharmaceutical Returns",   icon: <RefreshCw size={24} />,      desc: "Expired medications, recalls, and controlled substances" },
  { id: "ltc",        label: "Long-Term Care Runs",      icon: <Building2 size={24} />,      desc: "Scheduled daily / weekly routes to nursing homes & ALFs" },
];

const CITY_OPTIONS = [
  "Edmonton", "St. Albert", "Sherwood Park", "Leduc",
  "Spruce Grove", "Fort Saskatchewan", "Beaumont", "Red Deer", "Other",
];

const TIME_OPTIONS: { id: TimeSlot; label: string }[] = [
  { id: "asap",      label: "ASAP / Rush" },
  { id: "morning",   label: "Morning (8am – 12pm)" },
  { id: "afternoon", label: "Afternoon (12pm – 5pm)" },
  { id: "evening",   label: "Evening (5pm – 9pm)" },
  { id: "custom",    label: "Custom time (specify in notes)" },
];

const BLANK_PICKUP: PickupStop = {
  name: "", org: "", address: "", city: "", phone: "", date: "", time: "", temperatureSensitive: false,
};

const INITIAL: FormState = {
  serviceType: "",
  pickups: [{ ...BLANK_PICKUP }],
  dropoffName: "", dropoffOrg: "", dropoffAddress: "", dropoffCity: "", dropoffPhone: "",
  contactName: "", contactEmail: "", contactPhone: "", specialInstructions: "",
};

/* ── Pricing ─────────────────────────────────────────────── */

const EXTRA_STOP_FEE = 25;

function basePrice(serviceType: string, pickupTime: string): number {
  if (serviceType === "rush" || pickupTime === "asap") return 85;
  if (serviceType === "specimen") return 55;
  return 35;
}

function calcTotal(serviceType: string, pickups: PickupStop[]): number {
  const base  = basePrice(serviceType, pickups[0]?.time ?? "");
  const extra = Math.max(0, pickups.length - 1) * EXTRA_STOP_FEE;
  return base + extra;
}

function fmtCAD(amount: number): string {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount);
}

/* ── Small shared UI ─────────────────────────────────────── */

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
      {children}{required && <span className="text-[var(--color-brand-red)] ml-0.5">*</span>}
    </label>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent text-sm bg-[var(--color-bg)]"
    />
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <select
      {...props}
      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent text-sm bg-[var(--color-bg)] cursor-pointer"
    >
      {children}
    </select>
  );
}

/* ── Page ─────────────────────────────────────────────────── */

export default function BookPage() {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  /* helpers */
  const set = (key: keyof Omit<FormState, "pickups">, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setPickup = (idx: number, key: keyof PickupStop, value: string | boolean) =>
    setForm((f) => {
      const pickups = f.pickups.map((p, i) => i === idx ? { ...p, [key]: value } : p);
      return { ...f, pickups };
    });

  const addPickup = () =>
    setForm((f) => ({ ...f, pickups: [...f.pickups, { ...BLANK_PICKUP }] }));

  const removePickup = (idx: number) =>
    setForm((f) => ({ ...f, pickups: f.pickups.filter((_, i) => i !== idx) }));

  /* validation */
  const pickupValid = (p: PickupStop) =>
    !!(p.name && p.address && p.city && p.date && p.time);

  const canProceed = () => {
    if (step === 1) return form.serviceType !== "";
    if (step === 2) return form.pickups.every(pickupValid);
    if (step === 3) return !!(form.dropoffName && form.dropoffAddress && form.dropoffCity);
    if (step === 4) return !!(form.contactName && form.contactEmail && form.contactPhone);
    return true;
  };

  const total = calcTotal(form.serviceType, form.pickups);

  /* submit → Stripe checkout */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res  = await fetch("/api/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const json = await res.json();
      if (res.ok && json.url) {
        window.location.href = json.url;
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const steps = [
    { n: 1, label: "Service" },
    { n: 2, label: "Pickups" },
    { n: 3, label: "Delivery" },
    { n: 4, label: "Review & Pay" },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="pt-36 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D1B3E 0%, #1A3464 55%, #1B6FEB 140%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/15">
            ✦ Get Started
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">Book a Pickup</h1>
          <p className="text-white/65 text-lg">Complete the form and pay securely. Confirmation sent instantly.</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-14 bg-[var(--color-bg)]">
        <div className="max-w-2xl mx-auto px-4">

          {/* Progress */}
          <div className="flex items-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                  s.n < step  ? "bg-[var(--color-brand-blue)] text-white"
                  : s.n === step ? "bg-[var(--color-brand-blue)] text-white"
                  : "bg-white border-2 border-[var(--color-border)] text-[var(--color-text-muted)]"
                }`}>
                  {s.n < step ? <CheckCircle size={14} /> : s.n}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${s.n === step ? "text-[var(--color-brand-navy)]" : "text-[var(--color-text-muted)]"}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 ${s.n < step ? "bg-[var(--color-brand-blue)]" : "bg-[var(--color-border)]"}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 shadow-[var(--shadow-card)]">

              {/* ── Step 1: Service Type ── */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-[var(--color-brand-navy)] mb-2">What are we delivering?</h2>
                  <p className="text-sm text-[var(--color-text-muted)] mb-6">Select the type of delivery service you need.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICE_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => set("serviceType", opt.id)}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                          form.serviceType === opt.id
                            ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)]"
                            : "border-[var(--color-border)] hover:border-[var(--color-brand-blue-light)]"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          form.serviceType === opt.id
                            ? "bg-[var(--color-brand-blue)] text-white"
                            : "bg-[var(--color-muted)] text-[var(--color-text-muted)]"
                        }`}>
                          {opt.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--color-brand-navy)] text-sm">{opt.label}</p>
                          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 2: Pickups (multiple) ── */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-[var(--color-brand-navy)] mb-1">Pickup Details</h2>
                  <p className="text-sm text-[var(--color-text-muted)] mb-6">
                    Add one or more pickup stops. Each additional stop is +{fmtCAD(EXTRA_STOP_FEE)}.
                  </p>

                  <div className="space-y-5">
                    {form.pickups.map((pickup, idx) => (
                      <div
                        key={idx}
                        className="border border-[var(--color-border)] rounded-2xl p-5 relative"
                      >
                        {/* Stop header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[var(--color-brand-blue)] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {idx + 1}
                            </div>
                            <h3 className="text-sm font-bold text-[var(--color-brand-navy)]">
                              {idx === 0 ? "Pickup Stop" : `Stop ${idx + 1}`}
                            </h3>
                            {idx > 0 && (
                              <span className="text-xs font-semibold text-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)] px-2 py-0.5 rounded-full">
                                +{fmtCAD(EXTRA_STOP_FEE)}
                              </span>
                            )}
                          </div>
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={() => removePickup(idx)}
                              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                            >
                              <Trash2 size={13} /> Remove
                            </button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <FieldLabel required>Contact Name</FieldLabel>
                              <Input
                                required
                                value={pickup.name}
                                onChange={(e) => setPickup(idx, "name", e.target.value)}
                                placeholder="Jane Smith"
                              />
                            </div>
                            <div>
                              <FieldLabel>Organization</FieldLabel>
                              <Input
                                value={pickup.org}
                                onChange={(e) => setPickup(idx, "org", e.target.value)}
                                placeholder="Pharmacy / Clinic"
                              />
                            </div>
                          </div>
                          <div>
                            <FieldLabel required>Pickup Address</FieldLabel>
                            <AddressAutocomplete
                              required
                              value={pickup.address}
                              placeholder="Start typing a pickup address…"
                              onChange={(addr, city) => {
                                setPickup(idx, "address", addr);
                                if (city) setPickup(idx, "city", city);
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <FieldLabel required>City</FieldLabel>
                              <Select
                                required
                                value={pickup.city}
                                onChange={(e) => setPickup(idx, "city", e.target.value)}
                              >
                                <option value="">Select city</option>
                                {CITY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                              </Select>
                            </div>
                            <div>
                              <FieldLabel>Phone</FieldLabel>
                              <Input
                                type="tel"
                                value={pickup.phone}
                                onChange={(e) => setPickup(idx, "phone", e.target.value)}
                                placeholder="(780) 555-0000"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <FieldLabel required>Pickup Date</FieldLabel>
                              <Input
                                required
                                type="date"
                                value={pickup.date}
                                onChange={(e) => setPickup(idx, "date", e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                              />
                            </div>
                            <div>
                              <FieldLabel required>Time Window</FieldLabel>
                              <Select
                                required
                                value={pickup.time}
                                onChange={(e) => setPickup(idx, "time", e.target.value as TimeSlot)}
                              >
                                <option value="">Select window</option>
                                {TIME_OPTIONS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                              </Select>
                            </div>
                          </div>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={pickup.temperatureSensitive}
                              onChange={(e) => setPickup(idx, "temperatureSensitive", e.target.checked)}
                              className="w-4 h-4 rounded accent-[#1B6FEB] cursor-pointer"
                            />
                            <span className="text-sm text-[var(--color-text)]">Temperature-sensitive (requires cold chain)</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add stop button */}
                  {form.pickups.length < 5 && (
                    <button
                      type="button"
                      onClick={addPickup}
                      className="mt-4 w-full flex items-center justify-center gap-2 border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-brand-blue)] text-[var(--color-text-muted)] hover:text-[var(--color-brand-blue)] rounded-2xl py-3 text-sm font-medium transition-all"
                    >
                      <Plus size={15} />
                      Add Another Pickup Stop <span className="text-xs opacity-70">(+{fmtCAD(EXTRA_STOP_FEE)})</span>
                    </button>
                  )}
                </div>
              )}

              {/* ── Step 3: Delivery ── */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-[var(--color-brand-navy)] mb-2">Delivery Details</h2>
                  <p className="text-sm text-[var(--color-text-muted)] mb-6">Where is everything going?</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>Recipient Name</FieldLabel>
                        <Input required value={form.dropoffName} onChange={(e) => set("dropoffName", e.target.value)} placeholder="John Doe" />
                      </div>
                      <div>
                        <FieldLabel>Organization</FieldLabel>
                        <Input value={form.dropoffOrg} onChange={(e) => set("dropoffOrg", e.target.value)} placeholder="Clinic / Patient" />
                      </div>
                    </div>
                    <div>
                      <FieldLabel required>Delivery Address</FieldLabel>
                      <AddressAutocomplete
                        required
                        value={form.dropoffAddress}
                        placeholder="Start typing a delivery address…"
                        onChange={(addr, city) => {
                          set("dropoffAddress", addr);
                          if (city) set("dropoffCity", city);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>City</FieldLabel>
                        <Select required value={form.dropoffCity} onChange={(e) => set("dropoffCity", e.target.value)}>
                          <option value="">Select city</option>
                          {CITY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                        </Select>
                      </div>
                      <div>
                        <FieldLabel>Recipient Phone</FieldLabel>
                        <Input type="tel" value={form.dropoffPhone} onChange={(e) => set("dropoffPhone", e.target.value)} placeholder="(780) 555-0001" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 4: Contact + Review ── */}
              {step === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-[var(--color-brand-navy)] mb-2">Review & Pay</h2>
                  <p className="text-sm text-[var(--color-text-muted)] mb-6">Confirm your details and pay securely via Stripe.</p>
                  <div className="space-y-4">
                    <div>
                      <FieldLabel required>Your Name</FieldLabel>
                      <Input required value={form.contactName} onChange={(e) => set("contactName", e.target.value)} placeholder="Your full name" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>Email</FieldLabel>
                        <Input required type="email" value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} placeholder="you@example.com" />
                      </div>
                      <div>
                        <FieldLabel required>Phone</FieldLabel>
                        <Input required type="tel" value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} placeholder="(780) 555-0000" />
                      </div>
                    </div>
                    <div>
                      <FieldLabel>Special Instructions</FieldLabel>
                      <textarea
                        rows={3}
                        value={form.specialInstructions}
                        onChange={(e) => set("specialInstructions", e.target.value)}
                        placeholder="Access codes, handling notes, or driver instructions…"
                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent text-sm bg-[var(--color-bg)] resize-none"
                      />
                    </div>

                    {/* Booking summary */}
                    <div className="bg-[var(--color-brand-blue-pale)] rounded-2xl p-5 border border-blue-200 text-sm space-y-3">
                      <p className="font-bold text-[var(--color-brand-navy)]">Booking Summary</p>

                      <div className="flex justify-between">
                        <span className="text-[var(--color-text-muted)]">Service</span>
                        <span className="font-medium text-[var(--color-brand-navy)]">
                          {SERVICE_OPTIONS.find((s) => s.id === form.serviceType)?.label}
                        </span>
                      </div>

                      {/* Pickup stops */}
                      {form.pickups.map((p, i) => (
                        <div key={i} className="flex items-start justify-between gap-4">
                          <span className="text-[var(--color-text-muted)] flex items-center gap-1 shrink-0">
                            <MapPin size={11} />
                            Stop {i + 1}
                          </span>
                          <span className="text-[var(--color-brand-navy)] font-medium text-right text-xs leading-relaxed">
                            {p.address}, {p.city}<br/>
                            <span className="text-[var(--color-text-muted)]">{p.date} · {TIME_OPTIONS.find((t) => t.id === p.time)?.label}</span>
                          </span>
                        </div>
                      ))}

                      <div className="flex justify-between">
                        <span className="text-[var(--color-text-muted)]">Delivery to</span>
                        <span className="font-medium text-[var(--color-brand-navy)] text-right text-xs">
                          {form.dropoffAddress}, {form.dropoffCity}
                        </span>
                      </div>

                      {/* Price breakdown */}
                      <div className="pt-3 border-t border-blue-200 space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-[var(--color-text-muted)]">Base rate</span>
                          <span className="text-[var(--color-brand-navy)]">{fmtCAD(basePrice(form.serviceType, form.pickups[0]?.time ?? ""))}</span>
                        </div>
                        {form.pickups.length > 1 && (
                          <div className="flex justify-between text-xs">
                            <span className="text-[var(--color-text-muted)]">{form.pickups.length - 1} additional stop{form.pickups.length > 2 ? "s" : ""}</span>
                            <span className="text-[var(--color-brand-navy)]">+{fmtCAD((form.pickups.length - 1) * EXTRA_STOP_FEE)}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-1 border-t border-blue-200">
                          <span className="font-bold text-[var(--color-brand-navy)]">Total</span>
                          <span className="text-xl font-black text-[var(--color-brand-blue)]">{fmtCAD(total)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Secure payment note */}
                    <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] bg-slate-50 rounded-xl px-4 py-3 border border-[var(--color-border)]">
                      <CreditCard size={14} className="flex-shrink-0 text-[var(--color-brand-blue)]" />
                      Payments processed securely by Stripe. You&apos;ll be redirected to checkout after clicking Pay.
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
                        Something went wrong. Please try again or call (780) 807-0000.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Nav buttons */}
            <div className={`mt-5 flex gap-3 ${step > 1 ? "justify-between" : "justify-end"}`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] font-medium px-6 py-3 rounded-xl hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] transition-colors cursor-pointer"
                >
                  <ArrowLeft size={15} /> Back
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canProceed()}
                  className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Continue <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === "loading" || !canProceed()}
                  className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Redirecting to Stripe…
                    </>
                  ) : (
                    <>
                      <CreditCard size={15} />
                      Pay {fmtCAD(total)} & Confirm
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
