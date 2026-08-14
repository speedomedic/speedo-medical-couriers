import Link from "next/link";
import { CheckCircle, ArrowRight, Phone, Zap, RefreshCw, Building2 } from "lucide-react";

export const metadata = {
  title: "Pricing | Speedo Medical Couriers",
  description: "Transparent flat-rate pricing for Edmonton medical courier services. Same-day, STAT, and scheduled routes for pharmacies, labs, hospitals, and clinics.",
};

const TIERS = [
  {
    icon: RefreshCw,
    name: "Scheduled Route",
    tagline: "Best for pharmacies, LTC & labs",
    badge: "Most Popular",
    badgeColor: "bg-[var(--color-brand-blue)] text-white",
    price: "Custom",
    priceSub: "Volume-based monthly rate",
    color: "border-[var(--color-brand-blue)]",
    highlight: true,
    features: [
      "Fixed recurring routes (daily or weekly)",
      "Priority scheduling — same courier every time",
      "Monthly consolidated invoicing",
      "Cold-chain & specimen handling",
      "Chain-of-custody documentation",
      "Volume discounts — the more you ship, the less you pay",
      "Dedicated account manager",
      "Flexible coverage windows — contact us to discuss",
    ],
    cta: "Get a Route Quote",
    href: "/partner",
  },
  {
    icon: Zap,
    name: "Same-Day On-Demand",
    tagline: "Pay per delivery, no commitment",
    badge: null,
    price: "From $18",
    priceSub: "Per delivery within Edmonton",
    color: "border-[var(--color-border)]",
    highlight: false,
    features: [
      "Book online or by phone",
      "Pickup within 2 hours",
      "Live GPS tracking",
      "Photo proof of delivery",
      "Secure handling for all cargo",
      "Extended Edmonton area included",
      "No monthly minimum",
      "Pay-per-delivery invoicing",
    ],
    cta: "Book Now",
    href: "/book",
  },
  {
    icon: Building2,
    name: "Enterprise / AHS",
    tagline: "Hospitals, multi-site, government",
    badge: "Contract",
    badgeColor: "bg-rose-600 text-white",
    price: "Custom",
    priceSub: "SLA-backed contract pricing",
    color: "border-[var(--color-border)]",
    highlight: false,
    features: [
      "SLA-guaranteed response times",
      "Multi-site cross-facility transport",
      "STAT dispatch < 30 minutes",
      "Dedicated fleet allocation",
      "Audit-ready chain-of-custody logs",
      "Custom reporting & analytics",
      "AHS & provincial compliance",
      "Priority 24/7 support line",
    ],
    cta: "Contact Us",
    href: "/contact",
  },
];

const ZONE_PRICING = [
  { zone: "Edmonton Core", desc: "Downtown, Oliver, Glenora, Queen Mary Park", time: "1–2 hr", from: "$18" },
  { zone: "South Edmonton", desc: "Mill Woods, Windermere, Ellerslie, Heritage Valley", time: "1–3 hr", from: "$22" },
  { zone: "North Edmonton", desc: "Castle Downs, Beaumaris, Griesbach, Clareview", time: "1–3 hr", from: "$22" },
  { zone: "West Edmonton", desc: "West Jasper Place, Lewis Farms, Lymburn, Callingwood", time: "1–3 hr", from: "$22" },
  { zone: "St. Albert", desc: "All St. Albert communities", time: "2–3 hr", from: "$28" },
  { zone: "Sherwood Park", desc: "All Sherwood Park communities", time: "2–3 hr", from: "$28" },
  { zone: "Leduc / Beaumont", desc: "Leduc, Beaumont, Devon", time: "2–4 hr", from: "$35" },
  { zone: "Spruce Grove / Stony Plain", desc: "Spruce Grove, Stony Plain, Parkland County", time: "2–4 hr", from: "$35" },
  { zone: "Fort Saskatchewan", desc: "Fort Saskatchewan, Gibbons", time: "2–4 hr", from: "$35" },
];

const ADDONS = [
  { name: "STAT Rush (< 60 min guaranteed)", price: "+$25" },
  { name: "Cold-chain insulated carrier", price: "+$5" },
  { name: "Biohazard specimen transport kit", price: "+$8" },
  { name: "After-hours delivery (8 pm–7 am)", price: "+$15" },
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
            No fuel surcharges. No mystery fees. Flat-rate delivery within Edmonton,
            with volume discounts for business accounts.
          </p>
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
                  <div className="mb-6">
                    <span className="text-4xl font-black text-[var(--color-text)]">{tier.price}</span>
                    <span className="text-sm text-[var(--color-text-muted)] ml-2">{tier.priceSub}</span>
                  </div>
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

      {/* Zone pricing */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">Service Zones</p>
            <h2 className="text-4xl font-black text-[var(--color-text)]">
              On-demand pricing by zone
            </h2>
            <p className="text-[var(--color-text-muted)] mt-3 max-w-lg">
              Flat rate per delivery based on destination zone. No mileage calculation, no guesswork.
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-[var(--color-border)] overflow-hidden">
            <div className="grid grid-cols-4 text-xs font-black uppercase tracking-widest bg-[#F8FAFC] border-b border-[var(--color-border)]">
              <div className="p-4 col-span-1">Zone</div>
              <div className="p-4 col-span-2">Coverage</div>
              <div className="p-4 text-right">Est. Time / From</div>
            </div>
            {ZONE_PRICING.map((row, i) => (
              <div key={row.zone} className={`grid grid-cols-4 border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[#F8FAFC]" : "bg-white"}`}>
                <div className="p-4 text-sm font-bold text-[var(--color-text)]">{row.zone}</div>
                <div className="p-4 text-sm text-[var(--color-text-muted)] col-span-2">{row.desc}</div>
                <div className="p-4 text-right">
                  <span className="text-xs text-[var(--color-text-muted)] block">{row.time}</span>
                  <span className="text-sm font-black text-[var(--color-brand-blue)]">{row.from}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            * Prices shown are starting rates for standard cargo. Cold-chain, biohazard, and after-hours add-ons apply separately.
          </p>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">Add-Ons</p>
            <h2 className="text-4xl font-black text-[var(--color-text)]">Optional service upgrades</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDONS.map((addon) => (
              <div key={addon.name} className="flex items-center justify-between bg-[#F8FAFC] rounded-2xl px-5 py-4 border border-[var(--color-border)]">
                <span className="text-sm text-[var(--color-text)]">{addon.name}</span>
                <span className="text-sm font-black text-[var(--color-brand-blue)] ml-3 flex-shrink-0">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-[var(--color-text)] mb-10">Pricing FAQ</h2>
          <div className="space-y-6">
            {[
              {
                q: "Are there fuel surcharges or hidden fees?",
                a: "No. Our flat-rate pricing is all-in. The price you see is the price you pay — fuel, insurance, and courier labour included.",
              },
              {
                q: "How does volume pricing work?",
                a: "Business accounts with scheduled routes get tiered discounts — the more deliveries per month, the lower your per-delivery cost. We build a custom rate card based on your volume and locations when you register.",
              },
              {
                q: "Can I get a quote before committing?",
                a: "Yes. Use the 'Get a Route Quote' button to register as a partner and we'll send you a custom proposal within 24 hours — no obligation.",
              },
              {
                q: "Is there a minimum spend or contract?",
                a: "On-demand bookings have no minimum. Scheduled route accounts require no long-term contract — 30-day notice to cancel.",
              },
              {
                q: "Do you charge extra for weekends or holidays?",
                a: "Weekend deliveries are included at standard rates. After-hours (8 pm–7 am) deliveries carry a $15 surcharge. Holiday STAT requests may carry additional fees — call to confirm.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-6 border border-[var(--color-border)]">
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
          <h2 className="text-4xl font-black text-white mb-4">Ready to get started?</h2>
          <p className="text-white/60 mb-8">One call or form and your account is live within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/partner"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-8 py-4 rounded-full transition-all text-sm hover:shadow-lg"
            >
              Register Your Business <ArrowRight size={15} />
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
