import type { Metadata } from "next";
import Link from "next/link";
import {
  Package, FlaskConical, Thermometer, Truck, FileText, Shield,
  CheckCircle, ArrowRight, Clock, Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Medical Courier Services | Speedo Medical Couriers",
  description:
    "Edmonton's specialist medical courier — prescription delivery, specimen transport, cold-chain logistics, same-day rush, and more. Bonded, insured & background-checked. on your schedule.",
};

/* ── Service data ───────────────────────────────────────── */
const services = [
  {
    id: "rx",
    icon: Package,
    label: "Prescription Delivery",
    tagline: "Pharmacy to patient, every time.",
    gradient: "from-blue-600 to-blue-400",
    desc: "We move medications directly from dispensing pharmacy to patient or care facility with full chain-of-custody documentation, real-time status updates, and proof-of-delivery confirmation on every run.",
    pills: ["Chain of Custody", "Privacy Protected", "Proof of Delivery", "Signature Capture", "Same-Day Available"],
  },
  {
    id: "specimens",
    icon: FlaskConical,
    label: "Specimen Transport",
    tagline: "Lab samples handled with precision.",
    gradient: "from-indigo-600 to-sky-400",
    desc: "Time-sensitive biological specimens require specialist handling. Our trained couriers transport cultures, blood samples, biopsies, and pathology with proper containment and temperature protocols.",
    pills: ["Specialist Trained", "Biohazard Handling", "Temperature Control", "Chain of Custody", "Lab-to-Lab Capable"],
  },
  {
    id: "cold",
    icon: Thermometer,
    label: "Cold Chain Logistics",
    tagline: "Biologics that stay the right temperature.",
    gradient: "from-cyan-600 to-blue-500",
    desc: "Vaccines, biologics, insulin, and any medication requiring 2–8°C or frozen transport is packaged in validated cold-chain containers. We monitor temperature integrity from pickup to handoff.",
    pills: ["2–8°C Validated", "Frozen Capable", "Temperature Monitoring", "Insulated Packaging", "Vaccine Ready"],
  },
  {
    id: "rush",
    icon: Zap,
    label: "Same-Day Rush / STAT",
    tagline: "When minutes matter.",
    gradient: "from-orange-500 to-red-500",
    desc: "For medical urgencies, STAT orders are dispatched within 60 minutes of confirmation. Priority orders within 90 minutes. We maintain a dedicated rapid-response fleet specifically for same-day critical deliveries across Edmonton.",
    pills: ["STAT: <60 min dispatch", "Priority: <90 min", "7 Days a Week", "Direct Driver Contact", "Real-Time Tracking"],
  },
  {
    id: "documents",
    icon: FileText,
    label: "Medical Records & Documents",
    tagline: "Privacy-compliant document courier.",
    gradient: "from-slate-600 to-slate-400",
    desc: "We transport health records, lab reports, referral letters, and clinical files with full confidentiality. Tamper-evident packaging, documented handoffs, and recipient verification on every document delivery.",
    pills: ["Fully Confidential", "Tamper-Evident Sealing", "Recipient Verification", "Audit Trail", "PHI Secure"],
  },
  {
    id: "equipment",
    icon: Shield,
    label: "Medical Equipment & Supplies",
    tagline: "Devices and supplies, safely delivered.",
    gradient: "from-teal-600 to-emerald-500",
    desc: "From durable medical equipment to PPE restocking and consumable supply runs for clinics and long-term care facilities. We handle large-format deliveries and recurring scheduled supply routes.",
    pills: ["Scheduled Routes", "Large Format Capable", "Clinic & LTC Delivery", "PPE Restocking", "Recurring Runs"],
  },
];

/* ── Coverage zones for the map ──────────────────────────── */
const mapNodes = [
  { cx: 190, cy: 158, r: 14, label: "Edmonton", sublabel: "YEG Hub", main: true },
  { cx: 152, cy: 104, r: 7,  label: "St. Albert",       sublabel: "" },
  { cx: 243, cy: 118, r: 7,  label: "Fort Saskatchewan", sublabel: "" },
  { cx: 250, cy: 192, r: 7,  label: "Sherwood Park",    sublabel: "" },
  { cx: 190, cy: 222, r: 7,  label: "Beaumont",         sublabel: "" },
  { cx: 128, cy: 212, r: 7,  label: "Leduc",            sublabel: "" },
  { cx: 118, cy: 156, r: 7,  label: "Spruce Grove",     sublabel: "" },
  { cx: 190, cy: 278, r: 5,  label: "Red Deer",         sublabel: "" },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section
        className="pt-36 pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D1B3E 0%, #1A3464 55%, #1B6FEB 140%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-red-600/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/15">
            ✦ What We Deliver
          </div>
          <h1 className="text-5xl lg:text-[68px] font-black text-white leading-[1.04] mb-6">
            Purpose-Built for<br/>
            <span className="text-amber-400">Medical Logistics</span>
          </h1>
          <p className="text-white/65 text-xl max-w-2xl mx-auto leading-relaxed">
            Every service is designed around the demands of healthcare — compliance, chain-of-custody, temperature integrity, and genuine urgency. Nothing generic. Ever.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["Privacy Protected", "Specialist Trained", "Bonded & Insured", "7 Days a Week"].map(t => (
              <span key={t} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-white/75 text-xs font-medium px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICE CARDS ══════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-14">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              const isEven = i % 2 === 0;
              return (
                <div key={svc.id} id={svc.id} className={`grid lg:grid-cols-2 gap-10 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>

                  {/* Visual card */}
                  <div className={`order-1 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className={`relative rounded-3xl bg-gradient-to-br ${svc.gradient} p-8 min-h-[220px] flex flex-col justify-between overflow-hidden`}>
                      {/* BG grid */}
                      <div className="absolute inset-0 hero-grid opacity-30"/>
                      {/* Big icon watermark */}
                      <div className="absolute -right-6 -bottom-6 opacity-10">
                        <Icon size={140} className="text-white"/>
                      </div>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                          <Icon size={24} className="text-white"/>
                        </div>
                        <h2 className="text-2xl font-black text-white mb-1">{svc.label}</h2>
                        <p className="text-white/65 text-sm">{svc.tagline}</p>
                      </div>
                      {/* Pill row */}
                      <div className="relative flex flex-wrap gap-2 mt-6">
                        {svc.pills.map((pill) => (
                          <span key={pill} className="bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`order-2 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-blue-pale)] flex items-center justify-center">
                        <Icon size={16} className="text-[var(--color-brand-blue)]"/>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-blue)]">{svc.label}</span>
                    </div>
                    <h3 className="text-3xl font-black text-[var(--color-text)] mb-4 leading-tight">{svc.tagline}</h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">{svc.desc}</p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {svc.pills.map((p) => (
                        <div key={p} className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                          <CheckCircle size={14} className="text-[var(--color-brand-blue)] flex-shrink-0"/>
                          {p}
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      Book This Service <ArrowRight size={14}/>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 3D COVERAGE MAP ════════════════════════════════════ */}
      <section className="py-20 bg-[var(--color-brand-navy)] relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40"/>
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--color-brand-blue)]/10 blur-[100px]"/>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[var(--color-brand-red)]/10 blur-[80px]"/>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                ✦ Delivery Network
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Edmonton&apos;s Medical<br/>
                <span className="text-[var(--color-brand-blue-light)]">Delivery Network</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Our courier network radiates from downtown Edmonton, reaching every major hospital, pharmacy, clinic and lab within 60 km — on your schedule.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: "Edmonton (Core + Suburbs)", icon: "🏥" },
                  { label: "St. Albert",                icon: "📍" },
                  { label: "Sherwood Park",             icon: "📍" },
                  { label: "Leduc",                     icon: "📍" },
                  { label: "Spruce Grove",              icon: "📍" },
                  { label: "Fort Saskatchewan",         icon: "📍" },
                  { label: "Beaumont",                  icon: "📍" },
                  { label: "Red Deer",                  icon: "📍" },
                ].map(({ label, icon }) => (
                  <div key={label} className="flex items-center gap-2 text-white/70 text-sm font-medium">
                    <span>{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-white/50">
                  <Clock size={14}/> on your schedule
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <Truck size={14}/> 60+ km radius
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <Zap size={14}/> STAT in 60 min
                </div>
              </div>
            </div>

            {/* Right — 3D map */}
            <div className="relative">
              <div className="map-3d-wrapper">
                <div className="map-3d-inner">
                  <div className="relative bg-[#0a1628] rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(27,111,235,0.2)]">
                    <svg viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg" className="w-full">

                      {/* Background */}
                      <rect width="380" height="320" fill="#0a1628"/>

                      {/* Street grid */}
                      {[0,1,2,3,4,5,6,7].map(i=>(
                        <line key={`h${i}`} x1="0" y1={40*i} x2="380" y2={40*i}
                          stroke="#1B6FEB" strokeWidth="0.3" strokeOpacity="0.15"/>
                      ))}
                      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
                        <line key={`v${i}`} x1={42*i} y1="0" x2={42*i} y2="320"
                          stroke="#1B6FEB" strokeWidth="0.3" strokeOpacity="0.15"/>
                      ))}

                      {/* Coverage circle */}
                      <circle cx="190" cy="158" r="115"
                        fill="#1B6FEB" fillOpacity="0.06"
                        stroke="#1B6FEB" strokeWidth="1" strokeOpacity="0.25"
                        strokeDasharray="8 4"/>

                      {/* Outer reach circle */}
                      <circle cx="190" cy="158" r="150"
                        fill="none"
                        stroke="#E5191E" strokeWidth="0.5" strokeOpacity="0.2"
                        strokeDasharray="4 6"/>

                      {/* Route lines from Edmonton to each city */}
                      {mapNodes.slice(1).map((node, i) => (
                        <line key={`r${i}`}
                          x1="190" y1="158"
                          x2={node.cx} y2={node.cy}
                          stroke="#1B6FEB" strokeWidth="1.5"
                          strokeOpacity="0.4" strokeDasharray="5 3"
                          className="animate-dash"
                          style={{ animationDelay: `${i * 0.25}s` }}
                        />
                      ))}

                      {/* Satellite nodes */}
                      {mapNodes.slice(1).map((node) => (
                        <g key={node.label}>
                          {/* Pulse ring */}
                          <circle cx={node.cx} cy={node.cy} r={node.r + 6}
                            fill="#1B6FEB" fillOpacity="0.1"/>
                          {/* Node dot */}
                          <circle cx={node.cx} cy={node.cy} r={node.r}
                            fill="#1a2e5f" stroke="#1B6FEB" strokeWidth="1.5"/>
                          <circle cx={node.cx} cy={node.cy} r={node.r - 3}
                            fill="#E5191E"/>
                          {/* Label */}
                          <text x={node.cx} y={node.cy + node.r + 12}
                            textAnchor="middle" fontSize="7" fill="white"
                            fontWeight="600" fillOpacity="0.8">{node.label}</text>
                        </g>
                      ))}

                      {/* Delivery truck dots moving along routes */}
                      {[
                        { x1:190, y1:158, x2:152, y2:104, dur:"3s" },
                        { x1:190, y1:158, x2:250, y2:192, dur:"4s" },
                        { x1:190, y1:158, x2:128, y2:212, dur:"3.5s" },
                      ].map(({ x1, y1, x2, y2, dur }, i) => (
                        <circle key={`truck${i}`} r="3" fill="#F59E0B" fillOpacity="0.9">
                          <animateMotion
                            dur={dur}
                            repeatCount="indefinite"
                            path={`M${x1},${y1} L${x2},${y2}`}
                          />
                        </circle>
                      ))}

                      {/* Edmonton hub */}
                      <circle cx="190" cy="158" r="22"
                        fill="#1B6FEB" fillOpacity="0.15"/>
                      <circle cx="190" cy="158" r="14"
                        fill="#1B6FEB"/>
                      {/* Medical cross in hub */}
                      <rect x="186" y="151" width="8" height="14" rx="1" fill="white" fillOpacity="0.9"/>
                      <rect x="183" y="154" width="14" height="8" rx="1" fill="white" fillOpacity="0.9"/>
                      <text x="190" y="178" textAnchor="middle"
                        fontSize="8" fill="white" fontWeight="800" fillOpacity="0.9">
                        Edmonton
                      </text>

                      {/* Legend */}
                      <g transform="translate(14, 14)">
                        <rect width="120" height="56" rx="6" fill="#0d1b3e" fillOpacity="0.9" stroke="white" strokeWidth="0.3" strokeOpacity="0.2"/>
                        <circle cx="16" cy="16" r="4" fill="#1B6FEB"/>
                        <text x="26" y="20" fontSize="7" fill="white" fillOpacity="0.7">Coverage Hub</text>
                        <circle cx="16" cy="32" r="3" fill="#E5191E"/>
                        <text x="26" y="36" fontSize="7" fill="white" fillOpacity="0.7">Service City</text>
                        <circle cx="16" cy="48" r="3" fill="#F59E0B"/>
                        <text x="26" y="52" fontSize="7" fill="white" fillOpacity="0.7">Active Delivery</text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Glow effect under map */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-[var(--color-brand-blue)] blur-2xl opacity-20 rounded-full"/>
            </div>

          </div>
        </div>
      </section>

      {/* ══ COMPLIANCE STRIP ═══════════════════════════════════ */}
      <section className="py-14 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-10">
            Built for Healthcare Compliance
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { label: "Privacy Protected", desc: "Patient privacy on every run" },
              { label: "Specialist Trained", desc: "Biohazard trained couriers" },
              { label: "Bonded & Insured", desc: "Full commercial coverage" },
              { label: "Background Checked", desc: "All couriers vetted" },
              { label: "Chain of Custody", desc: "Documented every step" },
              { label: "7 Days / Week", desc: "" },
            ].map(({ label, desc }) => (
              <div key={label}>
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-blue-pale)] flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={18} className="text-[var(--color-brand-blue)]"/>
                </div>
                <p className="text-sm font-bold text-[var(--color-text)] mb-1">{label}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════ */}
      <section className="py-20 bg-[var(--color-brand-navy)] relative overflow-hidden">
        <div className="absolute inset-0 hero-grid"/>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            ✦ Start Today
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Ready to Streamline Your<br/>Medical Deliveries?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            Book a pickup in under 2 minutes, or call us to set up a monthly partnership.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book" className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5">
              Book a Pickup <ArrowRight size={16}/>
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-base transition-all border border-white/20">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
