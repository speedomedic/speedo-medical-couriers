"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2, FlaskConical, Hospital, Stethoscope, HeartHandshake,
  Package, CheckCircle, ArrowRight, Phone, Mail, Clock,
} from "lucide-react";

const BUSINESS_TYPES = [
  { value: "pharmacy", label: "Pharmacy / Drug Store", icon: Package },
  { value: "hospital", label: "Hospital / AHS Facility", icon: Hospital },
  { value: "lab", label: "Diagnostic Laboratory", icon: FlaskConical },
  { value: "clinic", label: "Clinic / Physician Office", icon: Stethoscope },
  { value: "ltc", label: "Long-Term Care / Assisted Living", icon: HeartHandshake },
  { value: "other", label: "Other Healthcare Business", icon: Building2 },
];

const SERVICES = [
  "Scheduled daily/weekly routes",
  "Same-day delivery",
  "STAT (urgent < 60 min)",
  "Specimen transport",
  "Cold-chain / vaccine delivery",
  "Patient home delivery",
  "Medical records & documents",
  "Medical equipment",
];

const VOLUME_OPTIONS = [
  "1–10 deliveries/month",
  "11–50 deliveries/month",
  "51–200 deliveries/month",
  "200+ deliveries/month",
];

type FormState = {
  businessName: string;
  businessType: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  monthlyVolume: string;
  services: string[];
  notes: string;
};

export default function PartnerPage() {
  const [form, setForm] = useState<FormState>({
    businessName: "",
    businessType: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    monthlyVolume: "",
    services: [],
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function toggle(service: string) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us at (780) 807-0000 or try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-32">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 bg-[var(--color-brand-blue-pale)] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[var(--color-brand-blue)]" />
          </div>
          <h1 className="text-4xl font-black text-[var(--color-text)] mb-4">You&apos;re on board!</h1>
          <p className="text-lg text-[var(--color-text-muted)] mb-8 leading-relaxed">
            Welcome to the Speedo Medical network. We&apos;ve sent a confirmation to <strong>{form.email}</strong>.
            Someone from our team will call you within 24 hours to finalize your account.
          </p>
          <div className="bg-[#F0F4FF] rounded-2xl p-6 mb-8">
            <p className="text-sm text-[var(--color-text-muted)] mb-1">Need something urgently?</p>
            <a href="tel:7808070000" className="text-2xl font-black text-[var(--color-brand-blue)]">(780) 807-0000</a>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-blue)]">
            ← Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-24">
      {/* Hero */}
      <section className="bg-[var(--color-brand-navy)] py-20 mb-0 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            ✦ B2B Partner Registration
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.02]">
            Become a Speedo<br />
            <span className="text-amber-400">Medical Partner</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Set up a business account in minutes. Get dedicated routes, volume pricing, and
            a courier team that knows healthcare inside out.
          </p>
        </div>
      </section>

      {/* Benefits strip */}
      <div className="bg-[var(--color-brand-blue)] py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-6 lg:gap-10">
          {[
            { icon: Clock, text: "Account live in 24 hours" },
            { icon: CheckCircle, text: "No long-term contract" },
            { icon: Phone, text: "Dedicated account contact" },
            { icon: Mail, text: "Flexible invoicing options" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white text-sm font-semibold">
              <Icon size={15} className="text-white/70" /> {text}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-black text-[var(--color-text)] mb-2">What you get</h2>
              <ul className="space-y-3">
                {[
                  "Dedicated routes tailored to your schedule",
                  "Volume pricing — the more you ship, the less you pay",
                  "Single point of contact who knows your operation",
                  "Monthly consolidated invoicing",
                  "WHMIS-trained couriers for specimens & biologics",
                  "Live tracking and delivery confirmation",
                  "Flexible scheduling — ask about your coverage needs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]">
                    <CheckCircle size={14} className="text-[var(--color-brand-blue)] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--color-brand-blue-pale)] rounded-2xl p-5">
              <p className="text-xs font-black uppercase tracking-widest text-[var(--color-brand-blue)] mb-2">Need help?</p>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">Prefer to talk before filling out the form? We&apos;re standing by.</p>
              <a href="tel:7808070000" className="flex items-center gap-2 font-black text-[var(--color-brand-blue)] text-lg">
                <Phone size={16} /> (780) 807-0000
              </a>
              <a href="mailto:speedomedical@gmail.com" className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mt-2 hover:text-[var(--color-brand-blue)] transition-colors">
                <Mail size={13} /> speedomedical@gmail.com
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Business type */}
              <div>
                <label className="block text-sm font-black text-[var(--color-text)] mb-3">
                  What type of business are you? <span className="text-[var(--color-brand-red)]">*</span>
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {BUSINESS_TYPES.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, businessType: value }))}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        form.businessType === value
                          ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)] text-[var(--color-brand-blue)]"
                          : "border-[var(--color-border)] hover:border-[var(--color-brand-blue)]/50 text-[var(--color-text)]"
                      }`}
                    >
                      <Icon size={18} className="flex-shrink-0" />
                      <span className="text-sm font-semibold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business details */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">
                    Business Name <span className="text-[var(--color-brand-red)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                    required
                    placeholder="e.g. Westside Pharmacy"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 focus:border-[var(--color-brand-blue)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">
                    Contact Name <span className="text-[var(--color-brand-red)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 focus:border-[var(--color-brand-blue)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">
                    Email Address <span className="text-[var(--color-brand-red)]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    placeholder="you@yourpharmacy.ca"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 focus:border-[var(--color-brand-blue)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="(780) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 focus:border-[var(--color-brand-blue)] transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">Business Address</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    placeholder="123 Main St, Edmonton, AB"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 focus:border-[var(--color-brand-blue)] transition-all"
                  />
                </div>
              </div>

              {/* Volume */}
              <div>
                <label className="block text-sm font-black text-[var(--color-text)] mb-3">
                  Estimated monthly delivery volume
                </label>
                <div className="flex flex-wrap gap-3">
                  {VOLUME_OPTIONS.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, monthlyVolume: v }))}
                      className={`px-4 py-2.5 rounded-full text-sm font-semibold border-2 transition-all ${
                        form.monthlyVolume === v
                          ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)] text-white"
                          : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-brand-blue)]"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm font-black text-[var(--color-text)] mb-3">
                  What services do you need? <span className="text-xs font-normal text-[var(--color-text-muted)]">(select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggle(s)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        form.services.includes(s)
                          ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)] text-[var(--color-brand-blue)]"
                          : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-brand-blue)]/40"
                      }`}
                    >
                      {form.services.includes(s) && <span className="mr-1">✓</span>}
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">
                  Anything else we should know?
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  placeholder="Special handling requirements, delivery windows, existing courier issues we can solve..."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 focus:border-[var(--color-brand-blue)] transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-[var(--color-brand-red)] bg-red-50 rounded-xl px-4 py-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting || !form.businessName || !form.email || !form.contactName || !form.businessType}
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-base px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
              >
                {submitting ? "Submitting…" : "Register as a Partner"}
                {!submitting && <ArrowRight size={16} />}
              </button>
              <p className="text-xs text-center text-[var(--color-text-muted)]">
                We respond within 24 hours · No contract required · Free account setup
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
