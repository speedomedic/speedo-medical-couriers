import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, CheckCircle, Clock, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Area | Speedo Medical Couriers",
  description:
    "Speedo Medical Couriers serves Edmonton, St. Albert, Sherwood Park, Leduc, Spruce Grove, Fort Saskatchewan, Beaumont, and Red Deer — 7 days a week.",
};

const cities = [
  { name: "Edmonton",            note: "Core + all suburbs",           km: "Hub",    primary: true },
  { name: "St. Albert",          note: "Northwest of Edmonton",        km: "~20 km"  },
  { name: "Sherwood Park",       note: "East of Edmonton",             km: "~15 km"  },
  { name: "Spruce Grove",        note: "West of Edmonton",             km: "~25 km"  },
  { name: "Leduc",               note: "South of Edmonton",            km: "~30 km"  },
  { name: "Fort Saskatchewan",   note: "Northeast of Edmonton",        km: "~30 km"  },
  { name: "Beaumont",            note: "Southeast of Edmonton",        km: "~25 km"  },
  { name: "Red Deer",            note: "South on Hwy 2",               km: "~150 km" },
];

const stats = [
  { value: "60+ km",   label: "Metro radius covered" },
  { value: "8",        label: "Cities served" },
  { value: "7 days",   label: "Per week, 365/year" },
  { value: "< 60 min", label: "STAT dispatch time" },
];

export default function ServiceAreaPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="pt-36 pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D1B3E 0%, #1A3464 55%, #1B6FEB 140%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/15">
            ✦ Where We Go
          </div>
          <h1 className="text-5xl lg:text-[68px] font-black text-white leading-[1.04] mb-6">
            Serving Edmonton &amp;<br/>
            <span className="text-amber-400">the Entire Metro Region</span>
          </h1>
          <p className="text-white/65 text-xl max-w-2xl mx-auto">
            Our medical courier network covers the greater Edmonton area — pharmacies, hospitals,
            labs and clinics across 8 cities, 7 days a week.
          </p>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────── */}
      <section className="bg-[var(--color-brand-navy)] py-6 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/50 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE MAP ───────────────────────────────────── */}
      <section className="bg-[var(--color-brand-navy)] pb-0 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-0">
          <div className="text-center mb-6">
            <p className="text-white/50 text-sm font-medium uppercase tracking-widest">
              ✦ Edmonton Delivery Coverage — Live Map
            </p>
          </div>
        </div>

        {/* Full-width map */}
        <div className="relative w-full overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.4)]"
             style={{ height: "560px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d375096.4432738!2d-113.49380281347655!3d53.54442043750247!2m3!1f0!2f45!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0224580deff23%3A0x411fa00c4af6155d!2sEdmonton%2C+AB%2C+Canada!5e1!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
            width="100%"
            height="560"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Speedo Medical Couriers — Edmonton Service Area"
          />
          {/* Overlay badge */}
          <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-[var(--color-brand-red)] animate-pulse flex-shrink-0"/>
            <div>
              <p className="text-xs font-black text-[var(--color-brand-navy)] uppercase tracking-widest">Live Coverage Zone</p>
              <p className="text-[11px] text-[var(--color-text-muted)]">Edmonton + 8 surrounding cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW A DELIVERY WORKS ─────────────────────────── */}
      <section className="py-20 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-badge mx-auto mb-4">✦ Delivery Workflow</div>
            <h2 className="text-3xl lg:text-4xl font-black text-[var(--color-text)] mb-3">
              How a Delivery Works
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
              From booking to doorstep — every delivery in our coverage zone follows the same fast, compliant process.
            </p>
          </div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-0.5 bg-gradient-to-r from-[var(--color-brand-blue)] via-[var(--color-brand-blue-light)] to-[var(--color-brand-red)] z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                {
                  step: "01",
                  title: "You Request a Pickup",
                  desc: "Book online or call (780) 807-0000. Tell us the pickup address, delivery address, and service type. Takes under 2 minutes.",
                  icon: "📋",
                  color: "bg-[var(--color-brand-blue)]",
                },
                {
                  step: "02",
                  title: "We Dispatch a Courier",
                  desc: "A background-checked, WHMIS-trained courier in your city is dispatched immediately — typically arriving within 60–90 minutes.",
                  icon: "🚐",
                  color: "bg-[var(--color-brand-blue-dark)]",
                },
                {
                  step: "03",
                  title: "Live Tracking En Route",
                  desc: "You and the recipient both receive real-time status updates. Every handoff is documented with chain-of-custody records.",
                  icon: "📍",
                  color: "bg-indigo-600",
                },
                {
                  step: "04",
                  title: "Confirmed Delivery",
                  desc: "Proof-of-delivery with recipient signature is emailed instantly. Full audit trail available for compliance records.",
                  icon: "✅",
                  color: "bg-[var(--color-brand-red)]",
                },
              ].map((w) => (
                <div key={w.step} className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-sm flex flex-col">
                  <div className={`w-12 h-12 ${w.color} rounded-xl flex items-center justify-center text-xl mb-5 flex-shrink-0`}>
                    {w.icon}
                  </div>
                  <div className="text-4xl font-black text-[var(--color-brand-blue-pale)] leading-none mb-2">
                    {w.step}
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-text)] mb-2">{w.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
            >
              Start a Delivery Now <ArrowRight size={15}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CITY COVERAGE ────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* City grid */}
            <div>
              <div className="section-badge mb-4">✦ Covered Cities</div>
              <h2 className="text-3xl lg:text-4xl font-black text-[var(--color-text)] mb-4">
                Every Major Community<br/>Around Edmonton
              </h2>
              <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
                Our courier fleet operates across all of these communities daily — reaching pharmacies,
                hospitals, clinics, labs, and patients at home.
              </p>
              <div className="space-y-2.5">
                {cities.map((c) => (
                  <div
                    key={c.name}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                      c.primary
                        ? "bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)] text-white"
                        : "bg-white border-[var(--color-border)] hover:border-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-pale)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin size={15} className={c.primary ? "text-white/70" : "text-[var(--color-brand-blue)]"}/>
                      <div>
                        <p className={`font-bold text-sm ${c.primary ? "text-white" : "text-[var(--color-text)]"}`}>{c.name}</p>
                        <p className={`text-xs ${c.primary ? "text-white/65" : "text-[var(--color-text-muted)]"}`}>{c.note}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      c.primary
                        ? "bg-white/20 text-white"
                        : "bg-[var(--color-brand-blue-pale)] text-[var(--color-brand-blue)]"
                    }`}>
                      {c.km}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info column */}
            <div className="space-y-6">
              {/* What we cover */}
              <div className="bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-border)] p-6">
                <h3 className="font-bold text-[var(--color-text)] mb-4 text-lg">What We Deliver Across the Region</h3>
                <div className="space-y-3">
                  {[
                    "Prescription medications from any pharmacy",
                    "Lab specimens — clinic to laboratory",
                    "Vaccines and cold-chain biologics",
                    "Medical records and documents (confidential)",
                    "Medical equipment and clinical supplies",
                    "Same-day and STAT urgent deliveries",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle size={15} className="text-[var(--color-brand-blue)] flex-shrink-0 mt-0.5"/>
                      <p className="text-sm text-[var(--color-text)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="bg-[var(--color-brand-navy)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-blue)] flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-white"/>
                  </div>
                  <h3 className="font-bold text-white text-lg">Always On</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Monday – Friday", hours: "7:00 AM – 9:00 PM" },
                    { day: "Saturday",        hours: "8:00 AM – 7:00 PM" },
                    { day: "Sunday",          hours: "9:00 AM – 5:00 PM" },
                    { day: "STAT / Rush",     hours: "Available 7 days" },
                  ].map((row) => (
                    <div key={row.day} className="flex justify-between items-center py-1.5 border-b border-white/10 last:border-0">
                      <span className="text-white/60">{row.day}</span>
                      <span className="font-semibold text-white">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outside zone */}
              <div className="bg-[var(--color-brand-blue-pale)] rounded-2xl border border-[var(--color-border)] p-6">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-blue)] flex items-center justify-center flex-shrink-0">
                    <Zap size={16} className="text-white"/>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--color-brand-navy)] mb-1">Need delivery outside our zone?</p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
                      We accommodate out-of-area requests. Call us to discuss and we&apos;ll find a solution.
                    </p>
                    <a href="tel:7808070000" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-blue)]">
                      <Phone size={13}/> (780) 807-0000
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="py-16 bg-[var(--color-brand-navy)] relative overflow-hidden">
        <div className="absolute inset-0 hero-grid"/>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Ready to Book a Delivery?
          </h2>
          <p className="text-white/60 mb-8">
            Serving Edmonton and surrounding communities — 7 days a week.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-blue-500/30"
            >
              Book a Pickup <ArrowRight size={16}/>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all border border-white/20"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
