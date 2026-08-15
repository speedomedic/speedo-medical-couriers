import Link from "next/link";
import { CheckCircle, ArrowRight, Phone, Zap, RefreshCw, Building2, Info } from "lucide-react";
import PriceCalculator from "@/components/PriceCalculator";

export const metadata = {
  title: "Pricing | Speedo Medical Couriers",
  description: "Medical courier pricing in Edmonton. On-demand: $16 base + $0.90/km. Contracted pharmacy routes from $9/delivery. No fuel surcharges, no hidden fees.",
};

const TIERS = [
  {
    icon: RefreshCw,
    name: "Contracted Route",
    tagline: "Pharmacies, LTC facilities & labs",
    badge: "Most Popular",
    badgeColor: "bg-[var(--color-brand-blue)] text-white",
    price: "From $9",
    priceSub: "per delivery on a contracted route",
    color: "border-[var(--color-brand-blue)]",
    highlight: true,
    note: "Exact rate depends on your delivery volume, stops, and geography. We build a custom rate card — call to get yours.",
    features: [
      "Daily or weekly fixed routes",
      "Same courier every run",
      "Photo proof of delivery on every drop",
      "Chain-of-custody documentation",
      "Cold-chain & specimen handling included",
      "Monthly consolidated invoicing",
      "Lower per-delivery cost as volume grows",
      "30-day cancellation — no long-term lock-in",
    ],
    cta: "Get a Route Quote",
    href: "/partner",
  },
  {
    icon: Zap,
    name: "On-Demand",
    tagline: "One-off runs, no commitment",
    badge: null,
    price: "$16 + $0.90/km",
    priceSub: "base rate + per kilometre",
    color: "border-[var(--color-border)]",
    highlight: false,
    note: null,
    features: [
      "Book online or by phone, any time",
      "Pickup within 2 hours",
      "Live GPS tracking",
      "Photo proof of delivery",
      "No monthly minimum",
      "Pay-per-delivery invoicing",
      "Extends to St. Albert, Sherwood Park & more",
      "STAT rush available",
    ],
    cta: "Book a Delivery",
    href: "/book",
  },
  {
    icon: Building2,
    name: "Enterprise",
    tagline: "Multi-site, high-volume, government",
    badge: "Contract",
    badgeColor: "bg-rose-600 text-white",
    price: "Custom",
    priceSub: "SLA-backed contract pricing",
    color: "border-[var(--color-border)]",
    highlight: false,
    note: null,
    features: [
      "SLA-guaranteed response times in writing",
      "Multi-site cross-facility transport",
      "STAT dispatch < 30 minutes",
      "Dedicated fleet allocation",
      "Audit-ready chain-of-custody logs",
      "Custom reporting & analytics",
      "Priority support line",
      "Tailored compliance documentation",
    ],
    cta: "Contact Us",
    href: "/contact",
  },
];

const ON_DEMAND_ZONES = [
  { zone: "5 km",  desc: "Downtown / local neighbourhood",          time: "1–2 hr", from: "$20.50" },
  { zone: "10 km", desc: "Cross-city Edmonton",                     time: "1–2 hr", from: "$25.00" },
  { zone: "20 km", desc: "South / north Edmonton to suburbs",       time: "1–3 hr", from: "$34.00" },
  { zone: "30 km", desc: "St. Albert · Sherwood Park · Leduc",      time: "2–3 hr", from: "$43.00" },
  { zone: "45 km", desc: "Spruce Grove · Fort Sask · Beaumont",     time: "2–4 hr", from: "$56.50" },
];

const ADDONS = [
  { name: "STAT Rush (guaranteed pickup < 60 min)", price: "+$25" },
  { name: "Cold-chain insulated carrier", price: "+$5" },
  { name: "Biohazard specimen transport kit", price: "+$8" },
  { name: "After-hours delivery (8 pm – 7 am)", price: "+$15" },
  { name: "Signature + ID verification", price: "+$5" },
  { name: "Return trip (pickup + drop)", price: "+50%" },
];

export default function PricingPage() {
  return (
    <main className="pt-28 pb-24">
      {/* Hero */}
      <section className="bg-[var(--color-brand-navy)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            ✦ Transparent Pricing
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.02]">
            Simple, honest<br />
            <span className="text-amber-400">medical courier pricing</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            On-demand: $16 base + $0.90/km — you pay for what we drive, nothing more.
            Contracted routes from $9/delivery for pharmacies and LTC. No fuel surcharges, no hidden fees.
          </p>
        </div>
      </section>

      {/* Two-track explainer */}
      <section className="py-10 bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-amber-900 mb-1">Two types of clients, two pricing tracks</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                <strong>Pharmacies, LTC facilities, and labs</strong> that need recurring daily or weekly routes get contracted pricing — from $9/delivery, built around your volume.
                {" "}<strong>Clinics, patients, and one-off needs</strong> use on-demand pricing — a flat rate per run with no commitment.
                Not sure which applies? <a href="tel:7808070000" className="font-bold underline">Call us</a> and we'll tell you in 2 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plan tiers */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-3xl border-2 ${tier.color} p-8 flex flex-col ${tier.highlight ? "shadow-2xl shadow-blue-500/10" : ""}`}
                >
                  {tier.badge && (
                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${tier.badgeColor} text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap`}>
                      {tier.badge}
                    </div>
                  )}
                  <div className={`w-12 h-12 ${tier.highlight ? "bg-[var(--color-brand-blue-pale)]" : "bg-[#F8FAFC]"} rounded-2xl flex items-center justify-center mb-5`}>
                    <Icon size={22} className={tier.highlight ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text-muted)]"} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-1">{tier.tagline}</p>
                  <h2 className="text-2xl font-black text-[var(--color-text)] mb-4">{tier.name}</h2>
                  <div className="mb-2">
                    <span className="text-4xl font-black text-[var(--color-text)]">{tier.price}</span>
                    <span className="text-sm text-[var(--color-text-muted)] ml-2">{tier.priceSub}</span>
                  </div>
                  {tier.note && (
                    <p className="text-xs text-[var(--color-text-muted)] bg-[#F8FAFC] rounded-xl px-3 py-2.5 mb-5 leading-relaxed border border-[var(--color-border)]">
                      {tier.note}
                    </p>
                  )}
                  {!tier.note && <div className="mb-5" />}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]">
                        <CheckCircle size={14} className={`${tier.highlight ? "text-[var(--color-brand-blue)]" : "text-emerald-500"} mt-0.5 flex-shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.href}
                    className={`flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-2xl text-sm transition-all ${
                      tier.highlight
                        ? "bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white hover:shadow-lg hover:shadow-blue-500/25"
                        : "border-2 border-[var(--color-border)] hover:border-[var(--color-brand-blue)] text-[var(--color-text)] hover:text-[var(--color-brand-blue)]"
                    }`}
                  >
                    {tier.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* On-demand zone table */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">On-Demand Rates</p>
            <h2 className="text-4xl font-black text-[var(--color-text)]">$16 base + $0.90 per kilometre</h2>
            <p className="text-[var(--color-text-muted)] mt-3 max-w-xl">
              Simple, transparent per-km pricing. You only pay for the distance we drive — no zone guessing, no flat-rate surprises for short runs.
            </p>
            <div className="mt-4 inline-flex items-center gap-3 bg-[var(--color-brand-blue-pale)] border border-blue-200 rounded-2xl px-5 py-3">
              <span className="text-2xl font-black text-[var(--color-brand-navy)]">$16</span>
              <span className="text-[var(--color-text-muted)] font-medium">base</span>
              <span className="text-[var(--color-brand-blue)] font-black text-lg">+</span>
              <span className="text-2xl font-black text-[var(--color-brand-navy)]">$0.90</span>
              <span className="text-[var(--color-text-muted)] font-medium">× km</span>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-[var(--color-border)] overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 text-xs font-black uppercase tracking-widest bg-[#F8FAFC] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
              <div className="p-4">Distance</div>
              <div className="p-4 col-span-2">Typical Route</div>
              <div className="p-4 text-right">Est. Time / Price</div>
            </div>
            {ON_DEMAND_ZONES.map((row, i) => (
              <div
                key={row.zone}
                className={`grid grid-cols-4 border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[#F8FAFC]" : "bg-white"} ${i === 0 ? "ring-2 ring-inset ring-[var(--color-brand-blue)]/10" : ""}`}
              >
                <div className="p-4 text-sm font-bold text-[var(--color-text)] flex items-center gap-2">
                  {i === 0 && <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] flex-shrink-0" />}
                  {row.zone}
                </div>
                <div className="p-4 text-sm text-[var(--color-text-muted)] col-span-2">{row.desc}</div>
                <div className="p-4 text-right">
                  <span className="text-xs text-[var(--color-text-muted)] block">{row.time}</span>
                  <span className="text-sm font-black text-[var(--color-brand-blue)]">{row.from}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-[var(--color-text-muted)]">
              * On-demand rates. STAT (+$25), cold-chain, biohazard, and after-hours add-ons apply separately.
            </p>
            <p className="text-xs font-semibold text-[var(--color-brand-blue)]">
              Pharmacy or LTC? Contracted routes from $9/delivery →{" "}
              <Link href="/partner" className="underline">Get a rate card</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Rate calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">On-Demand Estimator</p>
            <h2 className="text-4xl font-black text-[var(--color-text)]">
              Calculate your on-demand cost
            </h2>
            <p className="text-[var(--color-text-muted)] mt-3 max-w-lg mx-auto">
              Adjust the inputs to see a real-time estimate for on-demand deliveries.
              Contracted route pricing is lower — the estimate shows you what you save by committing to a route.
            </p>
          </div>
          <PriceCalculator />
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">Add-Ons</p>
            <h2 className="text-4xl font-black text-[var(--color-text)]">Service upgrades</h2>
            <p className="text-[var(--color-text-muted)] mt-2">Stack any combination on top of your base rate.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDONS.map((addon) => (
              <div key={addon.name} className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 border border-[var(--color-border)] shadow-sm">
                <span className="text-sm text-[var(--color-text)]">{addon.name}</span>
                <span className="text-sm font-black text-[var(--color-brand-blue)] ml-3 flex-shrink-0">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-[var(--color-text)] mb-10">Pricing FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: "What does a contracted route actually cost for a pharmacy?",
                a: "It depends on your delivery volume and geography. Pharmacies doing daily routes within Edmonton typically land between $9–$14 per delivery once we account for their stop count and schedule. The more deliveries per run, the lower your per-delivery cost. Call us and we'll quote you in one conversation.",
              },
              {
                q: "Why is on-demand more expensive than a contracted route?",
                a: "A contracted route lets us plan a courier's day efficiently — one driver, 15 stops, one loop. On-demand is a single trip dispatched in real time, which costs more to operate. Pharmacies doing consistent volume always save significantly by switching to a contracted route.",
              },
              {
                q: "Are there fuel surcharges or hidden fees?",
                a: "No. Our rates are all-in — fuel, insurance, and courier labour included. The price we quote is the price you pay.",
              },
              {
                q: "Is there a minimum spend or long-term contract?",
                a: "On-demand has no minimum. Contracted routes require 30-day notice to cancel — no long-term lock-in.",
              },
              {
                q: "Do you charge extra for weekends?",
                a: "Weekend deliveries are at standard rates. After-hours deliveries (8 pm – 7 am) carry a $15 surcharge. Call to confirm availability and rates for holidays.",
              },
              {
                q: "Can I get a written quote before committing?",
                a: "Yes — register as a partner and we'll send a custom rate card within 24 hours. No obligation.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-[#F8FAFC] rounded-2xl p-6 border border-[var(--color-border)]">
                <h3 className="font-black text-[var(--color-text)] mb-2">{q}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-brand-navy)] relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to get your rate card?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Register your business and we'll send a custom proposal within 24 hours.
            Or call and we'll quote you right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/partner"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-8 py-4 rounded-full transition-all text-sm hover:shadow-lg"
            >
              Get My Rate Card <ArrowRight size={15} />
            </Link>
            <a
              href="tel:7808070000"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full border border-white/20 transition-all text-sm"
            >
              <Phone size={15} /> (780) 807-0000
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
