"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone, Mail, Clock, CheckCircle, ArrowRight, Shield,
  Truck, FlaskConical, Thermometer, FileText, Package, Heart, Building2, RefreshCw, AlertCircle,
} from "lucide-react";

const SERVICE_TYPES = [
  { value: "Prescription Delivery",        icon: Package,      label: "Prescription Delivery" },
  { value: "Specimen Transport",           icon: FlaskConical, label: "Specimen Transport" },
  { value: "Rush / STAT Delivery",         icon: Truck,        label: "Rush / STAT Delivery" },
  { value: "Cold Chain / Vaccines",        icon: Thermometer,  label: "Cold Chain / Vaccines" },
  { value: "IV & Infusion Delivery",       icon: Heart,        label: "IV & Infusion Delivery" },
  { value: "Scheduled Route (recurring)",  icon: Building2,    label: "Scheduled Route (recurring)" },
  { value: "Medical Records / Documents",  icon: FileText,     label: "Medical Records / Documents" },
  { value: "Medical Equipment",            icon: AlertCircle,  label: "Medical Equipment" },
  { value: "Pharmaceutical Returns",       icon: RefreshCw,    label: "Pharmaceutical Returns" },
  { value: "Not sure — need advice",       icon: Shield,       label: "Not sure — need advice" },
];

export default function QuotePage() {
  const [form, setForm] = useState({
    name: "", businessName: "", phone: "", email: "",
    serviceType: "", pickupArea: "", deliveryArea: "",
    frequency: "", urgency: "", specialRequirements: "",
    bestTimeToContact: "", heardAboutUs: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.serviceType) {
      setErrorMsg("Please fill in your name, phone, email, and service type.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please call us at (780) 807-0000.");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-[var(--color-bg-subtle)] flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-[var(--color-text)] mb-3">
            We&apos;ve got your request!
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg mb-2">
            Thank you, <strong>{form.name.split(" ")[0]}</strong>. We&apos;ll review your details and reach out{" "}
            {form.bestTimeToContact ? `during ${form.bestTimeToContact.toLowerCase()}` : "soon"}.
          </p>
          <p className="text-[var(--color-text-muted)] mb-8">
            A confirmation has been sent to <strong>{form.email}</strong>.
          </p>
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 mb-8 text-left">
            <h3 className="font-bold text-[var(--color-text)] mb-4">What happens next</h3>
            <ul className="space-y-3">
              {[
                "Our team reviews your request — usually within a few hours",
                "We call or email you to discuss your specific needs",
                "You receive a custom quote with no obligation",
                "Schedule your first delivery — often same day",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--color-brand-blue)] text-white text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            Need something <strong>urgent right now?</strong>
          </p>
          <a
            href="tel:7808070000"
            className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] text-white font-bold px-7 py-3.5 rounded-xl text-base hover:bg-[var(--color-brand-blue-dark)] transition-all"
          >
            <Phone size={16} /> Call (780) 807-0000
          </a>
          <div className="mt-6">
            <Link href="/" className="text-sm text-[var(--color-brand-blue)] hover:underline">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--color-bg-subtle)] min-h-screen">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-16 lg:py-20"
        style={{
          background: "linear-gradient(135deg, #0D1B3E 0%, #0f2d6b 50%, #1B6FEB 100%)",
        }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[var(--color-brand-blue)]/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Free — No Obligation
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              Get a Custom Quote<br />
              <span className="text-blue-300">Tailored to Your Needs.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Every clinic, pharmacy, and lab has different delivery requirements.
              Tell us what you need and we&apos;ll build a solution that fits — with pricing
              you can actually plan around.
            </p>
            <div className="flex flex-wrap gap-5">
              {[
                { icon: Clock,   text: "Response within a few hours" },
                { icon: Phone,   text: "Personal callback included" },
                { icon: Shield,  text: "Zero pressure, zero obligation" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/80 text-sm">
                  <Icon size={14} className="text-blue-300" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">

            {/* ── FORM (2/3) ── */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">

              {/* Contact */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-7 shadow-sm">
                <h2 className="text-lg font-black text-[var(--color-text)] mb-1">Your Contact Details</h2>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">So we know who to reach out to with your quote.</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => set("name", e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                      Business / Clinic / Pharmacy
                    </label>
                    <input
                      type="text"
                      value={form.businessName}
                      onChange={e => set("businessName", e.target.value)}
                      placeholder="McKnight Pharmacy"
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={e => set("phone", e.target.value)}
                      placeholder="(780) 555-0000"
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => set("email", e.target.value)}
                      placeholder="jane@mcknight.ca"
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Service Type */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-7 shadow-sm">
                <h2 className="text-lg font-black text-[var(--color-text)] mb-1">What Do You Need Delivered?</h2>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">Select the service that best fits — you can always discuss specifics with us.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {SERVICE_TYPES.map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => set("serviceType", value)}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left text-sm font-semibold transition-all ${
                        form.serviceType === value
                          ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)] text-[var(--color-brand-blue)]"
                          : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-blue-200 hover:text-[var(--color-text)]"
                      }`}
                    >
                      <Icon size={16} className="flex-shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>
                {!form.serviceType && status === "error" && (
                  <p className="text-red-500 text-xs mt-2">Please select a service type.</p>
                )}
              </div>

              {/* Delivery Details */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-7 shadow-sm">
                <h2 className="text-lg font-black text-[var(--color-text)] mb-1">Delivery Details</h2>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">Even rough areas help us estimate — no exact addresses needed yet.</p>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                      Pickup Area / Neighbourhood
                    </label>
                    <input
                      type="text"
                      value={form.pickupArea}
                      onChange={e => set("pickupArea", e.target.value)}
                      placeholder="e.g. McKnight, St. Albert, Leduc"
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                      Delivery Area / Neighbourhood
                    </label>
                    <input
                      type="text"
                      value={form.deliveryArea}
                      onChange={e => set("deliveryArea", e.target.value)}
                      placeholder="e.g. Sherwood Park, Downtown Edmonton"
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                      How Often?
                    </label>
                    <select
                      value={form.frequency}
                      onChange={e => set("frequency", e.target.value)}
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] bg-white focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="">Select frequency…</option>
                      <option>One-time delivery</option>
                      <option>A few times a week</option>
                      <option>Daily</option>
                      <option>Multiple times daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Varies / I&apos;m not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                      Typical Urgency
                    </label>
                    <select
                      value={form.urgency}
                      onChange={e => set("urgency", e.target.value)}
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] bg-white focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="">Select urgency…</option>
                      <option>Standard (same business day)</option>
                      <option>Priority (within 2–4 hours)</option>
                      <option>STAT / Rush (within the hour)</option>
                      <option>Mix of urgencies</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes + Preferences */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-7 shadow-sm">
                <h2 className="text-lg font-black text-[var(--color-text)] mb-1">Anything Else We Should Know?</h2>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">Temperature requirements, number of stops, special packaging — anything helps.</p>
                <div className="mb-5">
                  <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                    Special Requirements / Notes
                  </label>
                  <textarea
                    rows={4}
                    value={form.specialRequirements}
                    onChange={e => set("specialRequirements", e.target.value)}
                    placeholder="e.g. Cold chain required, multiple stops, biologics, after-hours pickups…"
                    className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                      Best Time to Call You Back
                    </label>
                    <select
                      value={form.bestTimeToContact}
                      onChange={e => set("bestTimeToContact", e.target.value)}
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] bg-white focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="">Any time is fine</option>
                      <option>Morning (8am – 12pm)</option>
                      <option>Afternoon (12pm – 5pm)</option>
                      <option>Evening (5pm – 8pm)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
                      How Did You Hear About Us?
                    </label>
                    <select
                      value={form.heardAboutUs}
                      onChange={e => set("heardAboutUs", e.target.value)}
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] bg-white focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="">Select…</option>
                      <option>Google Search</option>
                      <option>Word of mouth / referral</option>
                      <option>Social media</option>
                      <option>Flyer / advertisement</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-3 rounded-xl">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] disabled:opacity-60 text-white font-bold py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
              >
                {status === "sending" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending your request…
                  </>
                ) : (
                  <>Send My Quote Request <ArrowRight size={16} /></>
                )}
              </button>
              <p className="text-center text-xs text-[var(--color-text-muted)]">
                No spam. No obligation. Just a helpful conversation about your delivery needs.
              </p>
            </form>

            {/* ── Sidebar (1/3) ── */}
            <div className="space-y-5 lg:sticky lg:top-24">

              {/* Call instead */}
              <div className="bg-[var(--color-brand-navy)] rounded-2xl p-6 text-white">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">Prefer to talk?</p>
                <p className="text-xl font-black mb-1">Call us directly</p>
                <a
                  href="tel:7808070000"
                  className="flex items-center gap-2 text-2xl font-black text-blue-300 hover:text-white transition-colors mb-4"
                >
                  <Phone size={20} /> (780) 807-0000
                </a>
                <p className="text-white/55 text-sm">Available 7 days a week · We pick up.</p>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-blue-pale)] flex items-center justify-center">
                    <Mail size={16} className="text-[var(--color-brand-blue)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium">Email us</p>
                    <a href="mailto:info@speedomedical.ca" className="text-sm font-bold text-[var(--color-brand-blue)]">
                      info@speedomedical.ca
                    </a>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
                <h3 className="font-black text-[var(--color-text)] mb-4">What to expect</h3>
                <ul className="space-y-4">
                  {[
                    { step: "1", title: "We review your needs", desc: "Usually within a few hours of submission" },
                    { step: "2", title: "Personal callback", desc: "A real person — not a bot — reaches out" },
                    { step: "3", title: "Custom quote sent", desc: "Priced for your exact volume & requirements" },
                    { step: "4", title: "You decide", desc: "No pressure, no commitment required" },
                  ].map(s => (
                    <li key={s.step} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[var(--color-brand-blue)] text-white text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        {s.step}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[var(--color-text)]">{s.title}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust signals */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="text-sm font-black text-amber-900 mb-3">Why businesses choose Speedo</p>
                {[
                  "Bonded, insured & background-checked couriers",
                  "7-day service — no blackout dates",
                  "Real-time tracking on every delivery",
                  "Edmonton-owned and operated",
                ].map(t => (
                  <div key={t} className="flex items-start gap-2 mb-2">
                    <CheckCircle size={13} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
