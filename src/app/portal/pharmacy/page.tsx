"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pill, Lock, CheckCircle, ExternalLink, ArrowLeft,
  Truck, Zap, Thermometer, Clock, User, MapPin,
  FileText, ChevronRight, RefreshCw, Phone, AlertCircle,
} from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";

/* ── Types ── */
type Urgency = "standard" | "same_day" | "stat";
type TimeSlot = "morning" | "afternoon" | "evening" | "custom";

interface OrderForm {
  pharmacyName:        string;
  pharmacyAddress:     string;
  pharmacyCity:        string;
  pharmacyPhone:       string;
  pharmacistName:      string;
  patientName:         string;
  patientPhone:        string;
  deliveryAddress:     string;
  deliveryCity:        string;
  medicationNotes:     string;
  urgency:             Urgency;
  temperatureSensitive: boolean;
  deliveryDate:        string;
  deliveryTime:        TimeSlot | "";
}

const BLANK_FORM: OrderForm = {
  pharmacyName: "", pharmacyAddress: "", pharmacyCity: "Edmonton",
  pharmacyPhone: "", pharmacistName: "",
  patientName: "", patientPhone: "", deliveryAddress: "", deliveryCity: "",
  medicationNotes: "", urgency: "standard", temperatureSensitive: false,
  deliveryDate: "", deliveryTime: "",
};

const CITIES = ["Edmonton", "St. Albert", "Sherwood Park", "Leduc", "Spruce Grove", "Fort Saskatchewan", "Beaumont", "Other"];
const TIMES: { id: TimeSlot; label: string }[] = [
  { id: "morning",   label: "Morning (8am–12pm)" },
  { id: "afternoon", label: "Afternoon (12pm–5pm)" },
  { id: "evening",   label: "Evening (5pm–9pm)" },
  { id: "custom",    label: "Custom (specify in notes)" },
];

/* ── Submitted order card ── */
function OrderConfirmation({ orderNumber, trackingLink, onNew }: {
  orderNumber: string; trackingLink: string; onNew: () => void;
}) {
  return (
    <div className="max-w-md mx-auto py-16 px-4 text-center">
      <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-[var(--shadow-card)] p-8">
        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-black text-[var(--color-brand-navy)] mb-1">Order Dispatched!</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Your delivery has been sent to Speedo&apos;s dispatch team.
        </p>
        <div className="bg-[var(--color-brand-blue-pale)] border border-blue-200 rounded-2xl p-4 mb-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-blue)] mb-1">Order Number</p>
          <p className="text-xl font-black text-[var(--color-brand-navy)] font-mono">{orderNumber}</p>
        </div>
        {trackingLink && (
          <a
            href={trackingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-full justify-center bg-[var(--color-brand-blue)] text-white font-bold px-5 py-3 rounded-xl text-sm mb-3 hover:bg-[var(--color-brand-blue-dark)] transition-colors"
          >
            <ExternalLink size={14} /> Live Tracking
          </a>
        )}
        <button
          onClick={onNew}
          className="w-full inline-flex items-center justify-center gap-2 border-2 border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] font-bold px-5 py-3 rounded-xl text-sm hover:bg-[var(--color-brand-blue-pale)] transition-colors"
        >
          <RefreshCw size={14} /> Submit Another Order
        </button>
        <a
          href="tel:7808070000"
          className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand-blue)] transition-colors"
        >
          <Phone size={13} /> (780) 807-0000 · Call Dispatch
        </a>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function PharmacyPortalPage() {
  const [code,        setCode]        = useState("");
  const [codeInput,   setCodeInput]   = useState("");
  const [codeError,   setCodeError]   = useState("");
  const [checking,    setChecking]    = useState(false);
  const [form,        setForm]        = useState<OrderForm>({ ...BLANK_FORM });
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmed,   setConfirmed]   = useState<{ orderNumber: string; trackingLink: string } | null>(null);

  const isLoggedIn = !!code;

  /* — verify code — */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setCodeError("");
    setChecking(true);
    try {
      const res  = await fetch("/api/portal/pharmacy-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          code:            codeInput,
          pharmacyName:    "_verify_",
          pharmacyAddress: "_verify_",
          patientName:     "_verify_",
          deliveryAddress: "_verify_",
          deliveryCity:    "Edmonton",
        }),
      });
      const json = await res.json();
      if (res.status === 401) {
        setCodeError("Invalid access code. Please contact Speedo at (780) 807-0000.");
      } else if (json.error && !json.ok) {
        setCodeError(json.error);
      } else {
        setCode(codeInput);
      }
    } catch {
      setCodeError("Network error. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  /* — submit order — */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const res  = await fetch("/api/portal/pharmacy-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ code, ...form }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setSubmitError(json.error ?? "Something went wrong. Please try again.");
      } else {
        setConfirmed({ orderNumber: json.orderNumber, trackingLink: json.trackingLink ?? "" });
        setForm({ ...BLANK_FORM, pharmacyName: form.pharmacyName, pharmacyAddress: form.pharmacyAddress, pharmacyCity: form.pharmacyCity, pharmacyPhone: form.pharmacyPhone, pharmacistName: form.pharmacistName });
      }
    } catch {
      setSubmitError("Network error. Please call (780) 807-0000.");
    } finally {
      setSubmitting(false);
    }
  }

  const set = (k: keyof OrderForm, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  /* ── Login screen ── */
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] pt-28 pb-16">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-blue)] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/20">
              <Pill size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-[var(--color-brand-navy)]">Pharmacy Portal</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Submit deliveries directly to Speedo dispatch — no hold times.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-[var(--shadow-card)] p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lock size={15} className="text-[var(--color-text-muted)]" />
              <h2 className="text-sm font-bold text-[var(--color-text)]">Enter your pharmacy access code</h2>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                placeholder="e.g. PHARM001"
                autoCapitalize="characters"
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm font-mono tracking-widest text-center text-[var(--color-brand-navy)] text-lg"
              />
              {codeError && (
                <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                  {codeError}
                </div>
              )}
              <button
                type="submit"
                disabled={!codeInput.trim() || checking}
                className="w-full bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                {checking ? "Checking…" : "Access Portal"}
              </button>
            </form>
            <div className="mt-6 pt-5 border-t border-[var(--color-border)] text-center">
              <p className="text-xs text-[var(--color-text-muted)] mb-2">Don&apos;t have a code?</p>
              <div className="flex flex-col gap-2">
                <a href="tel:7808070000" className="text-sm font-bold text-[var(--color-brand-blue)] hover:underline flex items-center justify-center gap-1.5">
                  <Phone size={13} /> (780) 807-0000
                </a>
                <Link href="/partner" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand-blue)] hover:underline flex items-center justify-center gap-1">
                  Become a partner <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link href="/portal" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-brand-blue)] flex items-center justify-center gap-1">
              <ArrowLeft size={11} /> Business portal (track orders)
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ── Order confirmed ── */
  if (confirmed) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] pt-28 pb-16">
        <OrderConfirmation
          orderNumber={confirmed.orderNumber}
          trackingLink={confirmed.trackingLink}
          onNew={() => setConfirmed(null)}
        />
      </main>
    );
  }

  /* ── Order form ── */
  const canSubmit =
    form.pharmacyName && form.pharmacyAddress && form.pharmacistName &&
    form.patientName && form.deliveryAddress && form.deliveryCity && form.deliveryDate && form.deliveryTime;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-0 pb-16">
      {/* Header bar */}
      <div className="bg-[var(--color-brand-navy)] pt-28 pb-10">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Pharmacy Portal</p>
            <h1 className="text-2xl font-black text-white">New Delivery Order</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg border border-white/20 transition-colors"
            >
              <Truck size={12} /> Track Orders
            </Link>
            <button
              onClick={() => { setCode(""); setCodeInput(""); }}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white/70 text-xs font-bold px-4 py-2 rounded-lg border border-white/20 transition-colors"
            >
              <Lock size={12} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Urgency selector */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
            <h2 className="text-sm font-black text-[var(--color-brand-navy)] mb-4 flex items-center gap-2">
              <Zap size={15} className="text-[var(--color-brand-blue)]" />
              Urgency Level
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {([
                { id: "standard" as Urgency, label: "Standard",  sub: "2–4 hours",   icon: Clock },
                { id: "same_day" as Urgency, label: "Same-Day",  sub: "Within today", icon: Truck },
                { id: "stat"     as Urgency, label: "STAT Rush", sub: "Under 60 min", icon: Zap   },
              ] as const).map(({ id, label, sub, icon: Icon }) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => set("urgency", id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    form.urgency === id
                      ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-brand-blue-light)]"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    form.urgency === id ? "bg-[var(--color-brand-blue)] text-white" : "bg-[var(--color-muted)] text-[var(--color-text-muted)]"
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-brand-navy)]">{label}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pharmacy info */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
            <h2 className="text-sm font-black text-[var(--color-brand-navy)] mb-4 flex items-center gap-2">
              <Pill size={15} className="text-[var(--color-brand-blue)]" />
              Your Pharmacy (Pickup)
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Pharmacy Name <span className="text-red-500">*</span></label>
                  <input
                    required
                    value={form.pharmacyName}
                    onChange={(e) => set("pharmacyName", e.target.value)}
                    placeholder="Westside Pharmacy"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm bg-[var(--color-bg)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Pharmacist Name <span className="text-red-500">*</span></label>
                  <input
                    required
                    value={form.pharmacistName}
                    onChange={(e) => set("pharmacistName", e.target.value)}
                    placeholder="Dr. Jane Smith"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm bg-[var(--color-bg)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Pharmacy Address <span className="text-red-500">*</span></label>
                <AddressAutocomplete
                  required
                  value={form.pharmacyAddress}
                  placeholder="Start typing your pharmacy address…"
                  onChange={(addr, city) => {
                    set("pharmacyAddress", addr);
                    if (city) set("pharmacyCity", city);
                  }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">City</label>
                  <select
                    value={form.pharmacyCity}
                    onChange={(e) => set("pharmacyCity", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm bg-[var(--color-bg)]"
                  >
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Pharmacy Phone</label>
                  <input
                    type="tel"
                    value={form.pharmacyPhone}
                    onChange={(e) => set("pharmacyPhone", e.target.value)}
                    placeholder="(780) 555-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm bg-[var(--color-bg)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Patient / delivery info */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
            <h2 className="text-sm font-black text-[var(--color-brand-navy)] mb-4 flex items-center gap-2">
              <User size={15} className="text-[var(--color-brand-blue)]" />
              Patient Delivery Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Patient Name <span className="text-red-500">*</span></label>
                  <input
                    required
                    value={form.patientName}
                    onChange={(e) => set("patientName", e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm bg-[var(--color-bg)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Patient Phone</label>
                  <input
                    type="tel"
                    value={form.patientPhone}
                    onChange={(e) => set("patientPhone", e.target.value)}
                    placeholder="(780) 555-0001"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm bg-[var(--color-bg)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">
                  <MapPin size={11} className="inline mr-1 text-[var(--color-brand-blue)]" />
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <AddressAutocomplete
                  required
                  value={form.deliveryAddress}
                  placeholder="Patient's home or care facility…"
                  onChange={(addr, city) => {
                    set("deliveryAddress", addr);
                    if (city) set("deliveryCity", city);
                  }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Delivery City <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={form.deliveryCity}
                    onChange={(e) => set("deliveryCity", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm bg-[var(--color-bg)]"
                  >
                    <option value="">Select city</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Date <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="date"
                    value={form.deliveryDate}
                    onChange={(e) => set("deliveryDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm bg-[var(--color-bg)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Time Window <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={form.deliveryTime}
                    onChange={(e) => set("deliveryTime", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm bg-[var(--color-bg)]"
                  >
                    <option value="">Select</option>
                    {TIMES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Medication notes */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
            <h2 className="text-sm font-black text-[var(--color-brand-navy)] mb-4 flex items-center gap-2">
              <FileText size={15} className="text-[var(--color-brand-blue)]" />
              Medication &amp; Special Instructions
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--color-text)] mb-1.5">Medication / Notes</label>
                <textarea
                  rows={3}
                  value={form.medicationNotes}
                  onChange={(e) => set("medicationNotes", e.target.value)}
                  placeholder="e.g. Metformin 500mg × 30 tabs. Requires signature. Delivery instructions: ring doorbell…"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] text-sm bg-[var(--color-bg)] resize-none"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.temperatureSensitive}
                  onChange={(e) => set("temperatureSensitive", e.target.checked)}
                  className="w-4 h-4 rounded accent-[#1B6FEB]"
                />
                <span className="flex items-center gap-1.5 text-sm text-[var(--color-text)]">
                  <Thermometer size={13} className="text-[var(--color-brand-blue)]" />
                  Temperature-sensitive medication (requires cold chain bag)
                </span>
              </label>
            </div>
          </div>

          {/* Submit */}
          {submitError && (
            <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 border border-red-200">
              <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="w-full bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Sending to Dispatch…
              </>
            ) : (
              <>
                <Truck size={16} />
                Submit Delivery Order
              </>
            )}
          </button>

          <p className="text-xs text-center text-[var(--color-text-muted)]">
            This order goes directly to Speedo&apos;s dispatch system. Monthly billing applies per your contract.
          </p>
        </form>
      </div>
    </main>
  );
}
