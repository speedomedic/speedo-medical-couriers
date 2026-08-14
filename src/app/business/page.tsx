import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle, Phone, Building2, FlaskConical,
  Package, Truck, Clock, Shield, Users, CalendarCheck, FileText,
  BarChart3, Repeat, Headphones,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Business Accounts | Speedo Medical Couriers | Edmonton",
  description:
    "Set up a recurring medical courier account for your pharmacy, clinic, hospital, or lab. Volume delivery. Dedicated support. Edmonton & surrounding areas.",
};

const plans = [
  {
    icon: Package,
    name: "On-Demand",
    tagline: "Pay per delivery",
    forWho: "Ideal for: Clinics with occasional courier needs",
    color: "from-blue-500 to-blue-400",
    features: [
      "Book any time — online, phone, or WhatsApp",
      "No minimum order volumes",
      "Same-day and STAT available",
      "Real-time Shipday tracking on every order",
      "Email confirmation & proof of delivery",
    ],
    cta: { label: "Book Now", href: "/book" },
    highlight: false,
  },
  {
    icon: Repeat,
    name: "Recurring Route",
    tagline: "Scheduled daily or weekly pickups",
    forWho: "Ideal for: Pharmacies, labs, LTC facilities",
    color: "from-[#1B6FEB] to-indigo-500",
    features: [
      "Fixed daily or weekly schedule — your terms",
      "Priority dispatch on your route days",
      "Dedicated courier for consistency",
      "Monthly invoicing available",
      "Volume discounts starting at 20+ deliveries/month",
      "Dedicated account manager",
    ],
    cta: { label: "Get a Custom Quote", href: "/quote" },
    highlight: true,
  },
  {
    icon: Building2,
    name: "Enterprise",
    tagline: "Multi-facility & hospital contracts",
    forWho: "Ideal for: Hospitals, health networks, large pharmacies",
    color: "from-[#0D1B3E] to-slate-600",
    features: [
      "Custom SLAs and response-time guarantees",
      "Multiple pickup/drop-off locations",
      "API or Shipday integration for dispatch",
      "Dedicated operations contact",
      "Monthly reporting & audit trail",
      "White-label delivery available",
    ],
    cta: { label: "Contact Us", href: "/contact" },
    highlight: false,
  },
];

const industries = [
  {
    icon: Package,
    name: "Pharmacies & Drug Stores",
    desc: "Medication delivery from your dispensary to patients' homes. Recurring routes, STAT orders, returns handling.",
    stats: "Avg. 15–40 deliveries/week",
  },
  {
    icon: FlaskConical,
    name: "Medical Labs & Diagnostics",
    desc: "Time-critical specimen transport from clinic collection to your lab. properly handled. Tracked, documented.",
    stats: "Turn-around in under 2 hours",
  },
  {
    icon: Building2,
    name: "Hospitals & Health Systems",
    desc: "Inter-facility transfers of medications, records, equipment, and specimens across your network.",
    stats: "Edmonton & 8+ surrounding cities",
  },
  {
    icon: Users,
    name: "Medical Clinics & GP Offices",
    desc: "Send lab requisitions, referral letters, and sample collections without tying up your admin staff.",
    stats: "Set up in under 24 hours",
  },
  {
    icon: Truck,
    name: "Long-Term Care Facilities",
    desc: "Regular medication and supply runs to your facility on a schedule that matches your formulary cycle.",
    stats: "Daily & weekly routes available",
  },
  {
    icon: Shield,
    name: "Specialty Pharmacies & Clinics",
    desc: "Cold-chain biologics, controlled substances, and specialty medications handled with full compliance.",
    stats: "2–8°C validated packaging",
  },
];

const benefits = [
  { icon: CalendarCheck, title: "Predictable Scheduling", desc: "We show up when you expect us. Consistent drivers who know your team and your protocols." },
  { icon: BarChart3,    title: "Monthly Reporting",     desc: "Full delivery logs, proof-of-delivery records, and volume summaries for your audit files." },
  { icon: Headphones,   title: "Dedicated Support",     desc: "One phone number. One contact. No call centres. You reach a human in seconds." },
  { icon: FileText,     title: "Invoicing Flexibility", desc: "Weekly, bi-weekly, or monthly invoicing. Net-15 or Net-30 terms for established accounts." },
  { icon: Repeat,       title: "Zero Minimums to Start",desc: "No commitment needed to open an account. We grow with your volume." },
  { icon: Shield,       title: "Full Documentation",    desc: "Chain of custody, recipient signatures, and delivery timestamps on every run." },
];

export default function BusinessPage() {
  return (
    <main className="bg-white">

      {/* ── Hero ────────────────────────────────────────── */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D1B3E 0%, #1B3A6B 60%, #1B6FEB 100%)" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                ✦ For Healthcare Businesses
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-6">
                Your Patients<br />
                <span className="text-amber-400">Can&apos;t Wait.</span><br />
                Neither Should You.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Set up a recurring business account with Speedo Medical Couriers.
                We&apos;ll build a delivery schedule around your clinic, pharmacy, or lab —
                with dedicated support, volume pricing, and zero surprises.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-7 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-amber-500/30 text-sm"
                >
                  Get a Custom Quote <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:7808070000"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-4 rounded-xl border border-white/20 transition-all text-sm"
                >
                  <Phone size={15} /> Call Us Directly
                </a>
              </div>
              <p className="mt-5 text-white/40 text-sm">No contracts required · Set up in under 24 hours</p>
            </div>

            {/* Stats card */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { val: "500+",  label: "Business Deliveries",  sub: "and growing weekly" },
                { val: "99.8%", label: "On-Time Rate",         sub: "across all routes" },
                { val: "8+",    label: "Cities Covered",       sub: "Edmonton & region" },
                { val: "24h",   label: "Account Setup",        sub: "start delivering tomorrow" },
              ].map(({ val, label, sub }) => (
                <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-white mb-1">{val}</div>
                  <div className="text-white/80 font-semibold text-sm">{label}</div>
                  <div className="text-white/40 text-xs mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ──────────────────────────── */}
      <section className="py-20 bg-[var(--color-bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-badge mx-auto mb-4">✦ Who We Work With</div>
            <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-4">
              Built for Every Healthcare<br />
              <span className="text-[var(--color-brand-blue)]">Business Type</span>
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
              From single-location pharmacies to multi-facility health systems — we work with every size.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map(({ icon: Icon, name, desc, stats }) => (
              <div key={name} className="feature-card p-6 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-blue-pale)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-brand-blue)] transition-colors">
                  <Icon size={22} className="text-[var(--color-brand-blue)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[var(--color-text)] text-base mb-2">{name}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">{desc}</p>
                <div className="text-xs font-bold text-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)] px-3 py-1.5 rounded-full inline-block">
                  {stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Tiers ────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-badge mx-auto mb-4">✦ Business Plans</div>
            <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-4">
              One Plan for Every Volume
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
              No contract required to start. We scale with you.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {plans.map(({ icon: Icon, name, tagline, forWho, color, features, cta, highlight }) => (
              <div
                key={name}
                className={`rounded-3xl overflow-hidden border ${highlight
                  ? "border-[var(--color-brand-blue)] shadow-[0_8px_40px_rgba(27,111,235,0.2)]"
                  : "border-[var(--color-border)] shadow-sm"
                } flex flex-col`}
              >
                {highlight && (
                  <div className="bg-[var(--color-brand-blue)] text-center py-2 text-white text-xs font-black uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                {/* Header */}
                <div className={`bg-gradient-to-br ${color} p-6`}>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">{name}</h3>
                  <p className="text-white/70 text-sm">{tagline}</p>
                </div>
                {/* Body */}
                <div className="p-6 flex flex-col flex-1 bg-white">
                  <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">{forWho}</p>
                  <ul className="space-y-3 mb-6 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-text)]">
                        <CheckCircle size={15} className="text-[var(--color-brand-blue)] flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={cta.href}
                    className={`flex items-center justify-center gap-2 font-bold px-5 py-3.5 rounded-xl text-sm transition-all ${highlight
                      ? "bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white hover:shadow-lg hover:shadow-blue-500/25"
                      : "border-2 border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)] hover:text-white"
                    }`}
                  >
                    {cta.label} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Account Benefits ─────────────────────────────── */}
      <section className="py-20 bg-[var(--color-bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-badge mx-auto mb-4">✦ Why Business Accounts</div>
            <h2 className="text-4xl font-black text-[var(--color-text)] mb-4">
              Less Admin. More Deliveries.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card p-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-blue)] flex items-center justify-center mb-4">
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="font-bold text-[var(--color-text)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shipday Integration callout ──────────────────── */}
      <section className="py-16 bg-[var(--color-brand-navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Powered by Shipday
              </div>
              <h2 className="text-3xl font-black text-white mb-3">
                Real-Time Tracking on Every Business Order
              </h2>
              <p className="text-white/60 max-w-lg leading-relaxed">
                All business account deliveries run through Shipday dispatch — professional-grade tracking
                with live GPS, proof-of-delivery photos, and electronic signatures. Your team always knows where the package is.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/track"
                className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                Track a Delivery <ArrowRight size={14} />
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-6 py-3.5 rounded-xl transition-all text-sm"
              >
                Get Started <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick contact form CTA ───────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="section-badge mx-auto mb-4">✦ Get Set Up Today</div>
          <h2 className="text-4xl font-black text-[var(--color-text)] mb-4">
            Ready to Open Your Account?
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg mb-8 max-w-xl mx-auto">
            Call us or fill out the quote form and we&apos;ll get back to you within the hour.
            Account setup typically takes less than 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
            >
              Start with a Free Quote <ArrowRight size={16} />
            </Link>
            <a
              href="tel:7808070000"
              className="inline-flex items-center gap-2 border-2 border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] font-bold px-8 py-4 rounded-xl hover:bg-[var(--color-brand-blue)] hover:text-white transition-all"
            >
              <Phone size={16} /> (780) 807-0000
            </a>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            Or{" "}
            <a
              href="https://wa.me/17808070000?text=Hi%2C%20I'd%20like%20to%20set%20up%20a%20business%20account%20with%20Speedo%20Medical%20Couriers."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] font-semibold hover:underline"
            >
              message us on WhatsApp
            </a>
            {" "}— we typically respond in minutes.
          </p>
        </div>
      </section>

    </main>
  );
}
