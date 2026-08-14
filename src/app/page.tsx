import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, CheckCircle, Clock, MapPin, Phone,
  Package, Thermometer, FileText, FlaskConical, Truck,
  AlertCircle, ChevronRight, Heart, RefreshCw, Building2,
  Stethoscope, HeartHandshake, Activity, X,
} from "lucide-react";

import VideoHero from "@/components/VideoHero";
import AnimatedStats from "@/components/AnimatedStats";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FAQSection from "@/components/FAQSection";

/* ── Data ─────────────────────────────────────────────── */

const partners = [
  "Shoppers Drug Mart", "Rexall Pharmacy", "Edmonton General Hospital",
  "Covenant Health", "DynaLIFE Medical Labs", "Alberta Health Services",
  "Glenora Medical Clinic", "Kaye Edmonton Clinic", "McKnight Pharmacy",
  "Medicentres Canada", "Bonnie Doon Clinic", "Edmonton Diagnostic Labs",
  "Millwoods Pharmacy", "South Edmonton Pharmacy", "Westmount Pharmacy",
];

/* Bento: large featured, tall, then smaller — 3-column grid */
const services = [
  {
    id: "rx",
    icon: Package,
    title: "Prescription Delivery",
    price: "$35",
    desc: "Pharmacy-to-patient medication transport. Temperature-controlled, chain-of-custody documented.",
    href: "/services#rx",
    gradient: "from-blue-600 to-blue-400",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80",
    bento: "col-span-2",    // large wide card
    imgH: "h-56",
  },
  {
    id: "specimen",
    icon: FlaskConical,
    title: "Specimen Transport",
    price: "$55",
    desc: "Time-sensitive biological samples with documented chain of custody from clinic to lab.",
    href: "/services#specimens",
    gradient: "from-indigo-600 to-sky-400",
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
    bento: "row-span-2",    // tall right card
    imgH: "h-72",
  },
  {
    id: "rush",
    icon: Truck,
    title: "Same-Day Rush / STAT",
    price: "$85",
    desc: "Urgent dispatch within the hour. Because timing saves lives.",
    href: "/services#rush",
    gradient: "from-orange-500 to-red-500",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    bento: "",
    imgH: "h-36",
  },
  {
    id: "cold",
    icon: Thermometer,
    title: "Cold Chain / Vaccines",
    price: "$55+",
    desc: "Biologics, vaccines & insulin with 2–8°C precision handling.",
    href: "/services#cold",
    gradient: "from-cyan-600 to-blue-500",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80",
    bento: "",
    imgH: "h-36",
  },
  {
    id: "iv",
    icon: Heart,
    title: "IV & Infusion Delivery",
    price: "$55",
    desc: "IV bags, infusion supplies & LTC medication, same-day.",
    href: "/services#iv",
    gradient: "from-rose-600 to-pink-400",
    img: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=600&q=80",
    bento: "",
    imgH: "h-36",
  },
  {
    id: "ltc",
    icon: Building2,
    title: "Long-Term Care Runs",
    price: "Route",
    desc: "Scheduled daily / weekly routes to nursing homes & assisted-living facilities.",
    href: "/services#ltc",
    gradient: "from-teal-600 to-emerald-400",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    bento: "",
    imgH: "h-36",
  },
  {
    id: "documents",
    icon: FileText,
    title: "Medical Records",
    price: "$35",
    desc: "Confidential transport for medical records, lab reports & clinical files.",
    href: "/services#documents",
    gradient: "from-slate-600 to-slate-400",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
    bento: "",
    imgH: "h-36",
  },
  {
    id: "equipment",
    icon: AlertCircle,
    title: "Medical Equipment",
    price: "$35+",
    desc: "Devices, supplies & equipment safely delivered to clinics and care facilities.",
    href: "/services#equipment",
    gradient: "from-violet-600 to-purple-400",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    bento: "",
    imgH: "h-36",
  },
  {
    id: "returns",
    icon: RefreshCw,
    title: "Pharmaceutical Returns",
    price: "$35",
    desc: "Expired medications, product recalls & controlled substance returns — compliantly handled.",
    href: "/services#returns",
    gradient: "from-amber-600 to-yellow-400",
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    bento: "",
    imgH: "h-36",
  },
];

const steps = [
  { num: "01", title: "Book Online or Call", desc: "Request a pickup in under 2 minutes via our booking form or (780) 807-0000. No contracts, no minimums." },
  { num: "02", title: "We Pick Up, Fast", desc: "Our uniformed courier arrives at your pharmacy, clinic, or lab — often within the hour of dispatch." },
  { num: "03", title: "Real-Time Updates", desc: "You and your patient both receive live status updates via Shipday so nobody is left wondering." },
  { num: "04", title: "Confirmed Delivery", desc: "Proof-of-delivery confirmation sent instantly. Every handoff documented for compliance." },
];

const features = [
  { title: "Privacy Protected",   desc: "Your patient data and medical records handled with full confidentiality on every delivery." },
  { title: "Bonded & Insured",    desc: "Full commercial coverage so your shipment is protected from pickup to delivery." },
  { title: "Background Checked",  desc: "Every courier undergoes criminal record checks before joining our team." },
  { title: "Chain of Custody",    desc: "Documented handoffs at every stage — audit-ready records available on demand." },
  { title: "Temperature Control", desc: "Cold-chain packaging for biologics, vaccines, and sensitive medications." },
  { title: "Extended Hours",      desc: "Ask us about our availability windows — we work around your operational schedule." },
];

const cities = ["Edmonton", "St. Albert", "Sherwood Park", "Leduc", "Spruce Grove", "Fort Saskatchewan", "Beaumont", "Red Deer"];

/* ── Page ─────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="bg-white">

      {/* ══ 1. CINEMATIC VIDEO HERO ════════════════════════════ */}
      <VideoHero />

      {/* ══ 2. PARTNER TICKER ═════════════════════════════════ */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-subtle)] py-5 overflow-hidden">
        <p className="text-center text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
          Trusted by Edmonton Healthcare
        </p>
        <div className="flex animate-ticker whitespace-nowrap">
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-6 text-sm font-semibold text-[var(--color-text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-red)] flex-shrink-0" />
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ══ 3. ANIMATED STATS ═════════════════════════════════ */}
      <AnimatedStats />

      {/* ══ 3a. WHO WE SERVE — 6 Healthcare Verticals ════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">Who We Serve</p>
              <h2 className="text-5xl lg:text-6xl font-black text-[var(--color-text)] leading-[1.02]">
                Every Healthcare Setting.<br />
                <span className="text-[var(--color-brand-blue)]">One Trusted Courier.</span>
              </h2>
            </div>
            <p className="text-lg text-[var(--color-text-muted)] max-w-sm lg:text-right lg:pb-1">
              Pharmacy, lab, hospital, clinic, long-term care, or patient at home — we built this for all of you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Pharmacies */}
            <div className="group relative rounded-3xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-brand-blue)] hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="h-40 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-400">
                <Image src="https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&w=700&q=80" alt="Pharmacy" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Package size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-[var(--color-text)] mb-2">Pharmacies &amp; Drug Stores</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">Same-day patient delivery direct from your dispensary. Recurring routes so you never think about it.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Prescription delivery to patients", "Recurring daily/weekly routes", "Cold-chain biologics & vaccines", "Controlled substance compliance"].map(i => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[var(--color-text)]"><CheckCircle size={11} className="text-[var(--color-brand-blue)] flex-shrink-0" /> {i}</li>
                  ))}
                </ul>
                <Link href="/partner" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-blue)] hover:gap-2.5 transition-all">Set up a pharmacy account <ArrowRight size={13} /></Link>
              </div>
            </div>

            {/* Home Health & Rehabilitation */}
            <div className="group relative rounded-3xl overflow-hidden border border-[var(--color-border)] hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
              <div className="h-40 relative overflow-hidden bg-gradient-to-br from-violet-600 to-purple-400">
                <Image src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=700&q=80" alt="Home health" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Activity size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-[var(--color-text)] mb-2">Home Health &amp; Rehab Agencies</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">IV supplies, wound care kits, and infusion medications delivered to homecare clients across Edmonton — reliably and on time.</p>
                <ul className="space-y-1.5 mb-5">
                  {["IV & infusion supply delivery", "Wound care & dressing kits", "Rehabilitation equipment", "Scheduled client routes"].map(i => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[var(--color-text)]"><CheckCircle size={11} className="text-violet-600 flex-shrink-0" /> {i}</li>
                  ))}
                </ul>
                <Link href="/partner" className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-600 hover:gap-2.5 transition-all">Set up an agency account <ArrowRight size={13} /></Link>
              </div>
            </div>

            {/* Diagnostic Labs */}
            <div className="group relative rounded-3xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-brand-blue)] hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="h-40 relative overflow-hidden bg-gradient-to-br from-indigo-600 to-sky-400">
                <Image src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=700&q=80" alt="Medical lab" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FlaskConical size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-[var(--color-text)] mb-2">Diagnostic Labs</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">Trained couriers moving biohazardous specimens from collection sites to DynaLIFE and partner labs.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Clinic-to-lab specimen transport", "Biohazard-compliant handling", "STAT same-day priority pickup", "Chain of custody documented"].map(i => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[var(--color-text)]"><CheckCircle size={11} className="text-[var(--color-brand-blue)] flex-shrink-0" /> {i}</li>
                  ))}
                </ul>
                <Link href="/partner" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-blue)] hover:gap-2.5 transition-all">Open a lab account <ArrowRight size={13} /></Link>
              </div>
            </div>

            {/* Clinics */}
            <div className="group relative rounded-3xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-brand-blue)] hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="h-40 relative overflow-hidden bg-gradient-to-br from-teal-600 to-cyan-400">
                <Image src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=700&q=80" alt="Clinic" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Stethoscope size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-[var(--color-text)] mb-2">Clinics &amp; Physician Offices</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">Referral letters, specimen drops, prescription forwarding — the everyday logistics your staff shouldn&apos;t be doing.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Specimen drops to DynaLIFE", "Referral & records forwarding", "Prescription forwarding to pharmacy", "Same-day urgent pickups"].map(i => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[var(--color-text)]"><CheckCircle size={11} className="text-[var(--color-brand-blue)] flex-shrink-0" /> {i}</li>
                  ))}
                </ul>
                <Link href="/partner" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-blue)] hover:gap-2.5 transition-all">Set up a clinic account <ArrowRight size={13} /></Link>
              </div>
            </div>

            {/* Long-Term Care */}
            <div className="group relative rounded-3xl overflow-hidden border border-[var(--color-border)] hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
              <div className="h-40 relative overflow-hidden bg-gradient-to-br from-emerald-600 to-green-400">
                <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80" alt="Long-term care" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <HeartHandshake size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-[var(--color-text)] mb-2">Long-Term Care &amp; Assisted Living</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">Scheduled medication routes to nursing homes and assisted-living facilities — reliable enough to plan your whole week around.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Daily/weekly medication routes", "Blister pack & unit-dose delivery", "Dedicated consistent courier", "Flexible window scheduling"].map(i => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[var(--color-text)]"><CheckCircle size={11} className="text-emerald-600 flex-shrink-0" /> {i}</li>
                  ))}
                </ul>
                <Link href="/partner" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:gap-2.5 transition-all">Set up an LTC route <ArrowRight size={13} /></Link>
              </div>
            </div>

            {/* Patients */}
            <div className="group relative rounded-3xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-brand-blue)] hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="h-40 relative overflow-hidden bg-gradient-to-br from-rose-500 to-orange-400">
                <Image src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80" alt="Patient at home" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Heart size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-[var(--color-text)] mb-2">Patients &amp; Families</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">Can&apos;t pick up your medication? We bring it to your door — affordable, private, same-day.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Medication delivered to your home", "Elderly & mobility-limited patients", "Live tracking to your door", "Discreet plain-package delivery"].map(i => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[var(--color-text)]"><CheckCircle size={11} className="text-[var(--color-brand-blue)] flex-shrink-0" /> {i}</li>
                  ))}
                </ul>
                <Link href="/book" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-blue)] hover:gap-2.5 transition-all">Book a delivery <ArrowRight size={13} /></Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ 4. SERVICES — BENTO GRID ══════════════════════════ */}
      <section className="py-20 bg-[var(--color-bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">What We Deliver</p>
              <h2 className="text-5xl lg:text-6xl font-black text-[var(--color-text)] leading-[1.02]">
                9 Specialist Services,<br />
                <span className="text-[var(--color-brand-blue)]">One Trusted Courier</span>
              </h2>
            </div>
            <p className="text-lg text-[var(--color-text-muted)] max-w-sm lg:text-right lg:pb-1">
              Designed around medical compliance, patient privacy, and clinical urgency.
            </p>
          </div>

          {/* Bento grid — 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.id}
                  href={svc.href}
                  className={`feature-card group overflow-hidden flex flex-col ${svc.bento}`}
                >
                  {/* Image header */}
                  <div className={`relative ${svc.imgH} bg-gradient-to-br ${svc.gradient} overflow-hidden flex-shrink-0`}>
                    <Image
                      src={svc.img}
                      alt={svc.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover mix-blend-overlay opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {/* Price chip */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-black px-2.5 py-1 rounded-full">
                      {svc.price}
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon size={18} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-[var(--color-text)] mb-2">{svc.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 flex-1">{svc.desc}</p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-blue)] group-hover:gap-2 transition-all">
                      Learn more <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-blue-500/25"
            >
              Explore All Services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 4b. B2B CALLOUT ═══════════════════════════════════ */}
      <section className="py-14 bg-[var(--color-brand-navy)] relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                ✦ For Healthcare Businesses
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
                Run a pharmacy, clinic, or lab?<br />
                <span className="text-amber-400">We built a business account for you.</span>
              </h2>
              <p className="text-white/60 max-w-lg leading-relaxed text-sm">
                Dedicated routes, volume pricing, monthly invoicing, and a single contact
                who knows your operation. Set up in under 24 hours. No long-term contract required.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/business"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-7 py-4 rounded-full transition-all text-sm hover:shadow-lg hover:shadow-amber-500/30"
              >
                See Business Plans <ArrowRight size={15} />
              </Link>
              <a
                href="tel:7808070000"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-4 rounded-full border border-white/20 transition-all text-sm"
              >
                <Phone size={15} /> Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. WHY A HEALTHCARE SPECIALIST ═══════════════════ */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">Why It Matters</p>
              <h2 className="text-5xl lg:text-6xl font-black text-[var(--color-text)] leading-[1.02]">
                Healthcare courier.<br />
                <span className="text-[var(--color-brand-blue)]">Not a courier that does healthcare.</span>
              </h2>
            </div>
            <p className="text-lg text-[var(--color-text-muted)] max-w-md lg:text-right lg:pb-1">
              General couriers handle boxes. We handle chain-of-custody, cold-chain, proper biohazard protocols, and STAT response — purpose-built for healthcare.
            </p>
          </div>

          {/* Vs table callout */}
          <div className="bg-white rounded-3xl border border-[var(--color-border)] overflow-hidden mb-8">
            <div className="grid grid-cols-3 text-sm font-black uppercase tracking-widest">
              <div className="p-5 text-[var(--color-text-muted)] border-b border-[var(--color-border)]">Capability</div>
              <div className="p-5 text-center text-[var(--color-text-muted)] bg-[#F8FAFC] border-b border-l border-[var(--color-border)]">General Courier</div>
              <div className="p-5 text-center text-[var(--color-brand-blue)] border-b border-l border-[var(--color-border)]">Speedo Medical</div>
            </div>
            {[
              ["Biohazard handling training", false, true],
              ["Cold-chain & temperature monitoring", false, true],
              ["Chain-of-custody documentation", false, true],
              ["STAT dispatch (< 60 min)", false, true],
              ["Healthcare-specialist focus", false, true],
              ["Healthcare-only focus", false, true],
            ].map(([label, general, speedo]) => (
              <div key={label as string} className="grid grid-cols-3 border-b border-[var(--color-border)] last:border-0">
                <div className="p-4 text-sm text-[var(--color-text)] flex items-center">{label as string}</div>
                <div className="p-4 flex items-center justify-center border-l border-[var(--color-border)] bg-[#F8FAFC]">
                  {general ? <CheckCircle size={18} className="text-emerald-500" /> : <X size={18} className="text-red-400" />}
                </div>
                <div className="p-4 flex items-center justify-center border-l border-[var(--color-border)]">
                  {speedo ? <CheckCircle size={18} className="text-[var(--color-brand-blue)]" /> : <X size={18} className="text-red-400" />}
                </div>
              </div>
            ))}
          </div>

          {/* 6 advantage cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Activity, color: "text-[var(--color-brand-blue)]", bg: "bg-blue-50", title: "STAT Response < 60 Min", body: "When a lab result changes a diagnosis, minutes matter. Our STAT service guarantees dispatch within minutes and delivery in under an hour within Edmonton." },
              { icon: Thermometer, color: "text-sky-600", bg: "bg-sky-50", title: "Cold-Chain Integrity", body: "Vaccines, biologics, and insulin require precise temperature control. We use medical-grade insulated carriers with temperature logs every step of the way." },
              { icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50", title: "Chain of Custody", body: "Every pickup and delivery is documented with timestamps, signatures, and photo confirmation — ready for audit, insurance, and regulatory review." },
              { icon: FlaskConical, color: "text-emerald-600", bg: "bg-emerald-50", title: "Biohazard Handling Trained", body: "Our couriers are trained to handle specimen transport bags and biohazard materials with proper containment protocols." },
              { icon: RefreshCw, color: "text-amber-600", bg: "bg-amber-50", title: "Flexible Availability", body: "Your patients don't follow a 9-to-5 schedule. Ask us about extended availability windows — we work around what your operation needs." },
              { icon: Building2, color: "text-rose-600", bg: "bg-rose-50", title: "Local. Accountable.", body: "Unlike national carriers, we're Edmonton-based. One number to call. A real person who knows your name, your routes, and your clients." },
            ].map(({ icon: Icon, color, bg, title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-[var(--color-border)] p-6 hover:shadow-lg hover:shadow-black/5 transition-all">
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="text-base font-black text-[var(--color-text)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. HOW IT WORKS ═══════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">How It Works</p>
            <h2 className="text-5xl lg:text-6xl font-black text-[var(--color-text)] leading-[1.02]">
              Booked in 2 minutes.<br />
              <span className="text-[var(--color-brand-blue)]">Delivered the same day.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 w-6 h-0.5 bg-[var(--color-border)] z-10" />
                )}
                <div className="text-5xl font-black text-[var(--color-brand-blue-pale)] mb-3 leading-none">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-[var(--color-text)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. LIVE TRACKING (Shipday) ════════════════════════ */}
      <section className="py-20 bg-[var(--color-bg-subtle)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[var(--color-brand-blue-pale)] border border-blue-200 text-[var(--color-brand-blue)] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)] animate-pulse" />
                Powered by Shipday
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-[var(--color-text)] mb-5 leading-[1.02]">
                Track Every Delivery.<br />
                <span className="gradient-text">Live.</span>
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-8">
                We use Shipday — a professional dispatch and real-time tracking platform —
                so you and your patient always know exactly where the delivery is.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: MapPin,      text: "Live GPS driver location updated every 30 seconds" },
                  { icon: Clock,       text: "Real-time ETA so patients can plan around arrival" },
                  { icon: CheckCircle, text: "Proof-of-delivery confirmation sent automatically" },
                  { icon: Phone,       text: "Direct driver contact when you need it" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-blue-pale)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={14} className="text-[var(--color-brand-blue)]" />
                    </div>
                    <p className="text-[var(--color-text)] text-sm leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-blue-500/25 text-sm"
              >
                Book &amp; Get a Tracking Link <ArrowRight size={15} />
              </Link>
            </div>

            {/* Shipday mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-[0_12px_60px_rgba(13,27,62,0.16)] border border-[var(--color-border)] overflow-hidden">
                <div className="bg-slate-100 border-b border-[var(--color-border)] px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-[11px] text-slate-400 font-mono border border-slate-200 truncate">
                    track.shipday.com/smc-2847 — Raj K. · En Route
                  </div>
                </div>
                <div className="relative bg-[#e8eff8] h-52 overflow-hidden">
                  <svg viewBox="0 0 560 210" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                    {[0,1,2,3,4,5,6].map(i => <line key={`h${i}`} x1="0" y1={30*i} x2="560" y2={30*i} stroke="#d4dce8" strokeWidth="1"/>)}
                    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => <line key={`v${i}`} x1={56*i} y1="0" x2={56*i} y2="210" stroke="#d4dce8" strokeWidth="1"/>)}
                    <rect x="0" y="58" width="560" height="8" fill="#c8d5e5" rx="0"/>
                    <rect x="0" y="118" width="560" height="6" fill="#c8d5e5" rx="0"/>
                    <rect x="168" y="0" width="6" height="210" fill="#c8d5e5" rx="0"/>
                    <rect x="336" y="0" width="6" height="210" fill="#c8d5e5" rx="0"/>
                    {[[20,10,50,40],[80,15,60,35],[175,70,55,40],[255,15,45,35],[355,70,60,40],[410,15,50,30],[460,80,45,35],[20,130,55,35],[95,135,45,30],[175,140,55,35],[260,130,50,40],[350,135,60,30],[430,140,50,30]].map(([x,y,w,h],i) => (
                      <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#dce6f0" stroke="#c8d5e5" strokeWidth="0.5"/>
                    ))}
                    <path d="M 80 170 Q 140 170 168 130 Q 168 90 220 62 Q 260 62 310 62 Q 340 62 336 100 Q 336 140 380 155" stroke="#1B6FEB" strokeWidth="3" fill="none" strokeDasharray="8 5" strokeLinecap="round" opacity="0.4"/>
                    <path d="M 80 170 Q 140 170 168 130 Q 168 90 220 62 Q 255 62 280 62" stroke="#1B6FEB" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                    <circle cx="80" cy="170" r="8" fill="#E5191E"/>
                    <circle cx="80" cy="170" r="14" fill="#E5191E" fillOpacity="0.2"/>
                    <text x="80" y="174" textAnchor="middle" fontSize="8" fill="white" fontWeight="800">P</text>
                    <rect x="94" y="162" width="64" height="16" rx="4" fill="white" fillOpacity="0.9"/>
                    <text x="126" y="174" textAnchor="middle" fontSize="8" fill="#C01218" fontWeight="700">McKnight Rx</text>
                    <circle cx="280" cy="62" r="10" fill="white" stroke="#1B6FEB" strokeWidth="2.5"/>
                    <circle cx="280" cy="62" r="5" fill="#1B6FEB"/>
                    <circle cx="280" cy="62" r="18" fill="#1B6FEB" fillOpacity="0.12"/>
                    <circle cx="380" cy="155" r="8" fill="#F59E0B"/>
                    <circle cx="380" cy="155" r="14" fill="#F59E0B" fillOpacity="0.2"/>
                    <text x="380" y="159" textAnchor="middle" fontSize="8" fill="white" fontWeight="800">D</text>
                    <rect x="394" y="147" width="56" height="16" rx="4" fill="white" fillOpacity="0.9"/>
                    <text x="422" y="159" textAnchor="middle" fontSize="8" fill="#92400E" fontWeight="700">Patient Home</text>
                  </svg>
                </div>
                <div className="px-4 py-3 bg-[var(--color-brand-blue)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"/>
                    <span className="text-white text-xs font-bold">LIVE · En Route to Delivery</span>
                  </div>
                  <span className="text-white/80 text-xs font-semibold">ETA ~18 min</span>
                </div>
                <div className="grid grid-cols-3 divide-x divide-[var(--color-border)]">
                  {[{ label:"Driver", value:"Raj K." },{ label:"Order", value:"SMC-2847" },{ label:"Status", value:"En Route" }].map(({label,value}) => (
                    <div key={label} className="px-4 py-3 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-0.5">{label}</p>
                      <p className="text-sm font-bold text-[var(--color-text)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. WHY SPEEDO ═════════════════════════════════════ */}
      <section className="py-20 bg-[var(--color-brand-navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-blue-400 text-xs font-black uppercase tracking-[0.18em] mb-3">Why Choose Speedo</p>
            <h2 className="text-5xl lg:text-6xl font-black text-white leading-[1.02]">
              The compliance you need.<br />
              <span className="text-amber-400">The speed you demand.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="glass-card rounded-2xl p-6 hover:bg-white/12 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-red)] flex items-center justify-center mb-3">
                  <CheckCircle size={16} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8b. FAQ SECTION ═══════════════════════════════════ */}
      <FAQSection />

      {/* ══ 9. TESTIMONIALS CAROUSEL ══════════════════════════ */}
      <section className="py-20 bg-[var(--color-bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">Customer Stories</p>
            <h2 className="text-5xl lg:text-6xl font-black text-[var(--color-text)] leading-[1.02]">
              Loved by Edmonton&apos;s<br />
              <span className="text-[var(--color-brand-blue)]">Healthcare Community</span>
            </h2>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ══ 10. SERVICE AREA ══════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-badge mb-4">✦ Where We Operate</div>
              <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-4">
                Edmonton &amp; All Surrounding Areas
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg mb-8">
                Our courier network spans the greater Edmonton region, reaching every major city within 60 km.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {cities.map((city) => (
                  <div key={city} className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
                    <MapPin size={14} className="text-[var(--color-brand-blue)]" />
                    {city}
                  </div>
                ))}
              </div>
              <Link
                href="/service-area"
                className="inline-flex items-center gap-2 text-[var(--color-brand-blue)] font-bold hover:gap-3 transition-all"
              >
                View full coverage map <ArrowRight size={16} />
              </Link>
            </div>

            {/* SVG map */}
            <div className="bg-[var(--color-bg-subtle)] rounded-3xl p-8 border border-[var(--color-border)]">
              <svg viewBox="0 0 340 300" className="w-full max-h-72">
                <rect width="340" height="300" fill="#F8FAFC" rx="12"/>
                {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={60*i} x2="340" y2={60*i} stroke="#E2E8F0" strokeWidth="0.5"/>)}
                {[0,1,2,3,4,5].map(i => <line key={`v${i}`} x1={68*i} y1="0" x2={68*i} y2="300" stroke="#E2E8F0" strokeWidth="0.5"/>)}
                <circle cx="170" cy="148" r="100" fill="#EBF3FF" fillOpacity="0.7" stroke="#1B6FEB" strokeWidth="1.5" strokeDasharray="6 3"/>
                <circle cx="170" cy="148" r="14" fill="#1B6FEB"/>
                <circle cx="170" cy="148" r="22" fill="#1B6FEB" fillOpacity="0.15"/>
                <text x="170" y="152" textAnchor="middle" fontSize="7" fill="white" fontWeight="800">YEG</text>
                {[
                  {cx:135,cy:100,name:"St. Albert"},
                  {cx:222,cy:112,name:"Fort Sask."},
                  {cx:228,cy:180,name:"Sherwood Pk"},
                  {cx:168,cy:206,name:"Beaumont"},
                  {cx:118,cy:196,name:"Leduc"},
                  {cx:108,cy:148,name:"Spruce Gr."},
                  {cx:168,cy:260,name:"Red Deer"},
                ].map(({cx,cy,name}) => (
                  <g key={name}>
                    <line x1="170" y1="148" x2={cx} y2={cy} stroke="#1B6FEB" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 2"/>
                    <circle cx={cx} cy={cy} r="6" fill="white" stroke="#1B6FEB" strokeWidth="2"/>
                    <circle cx={cx} cy={cy} r="3" fill="#E5191E"/>
                    <text x={cx} y={cy+17} textAnchor="middle" fontSize="7.5" fill="#1E293B" fontWeight="600">{name}</text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 11. CTA BANNER ════════════════════════════════════ */}
      <section className="py-20 bg-[var(--color-brand-navy)] relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[var(--color-brand-blue)]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[var(--color-brand-red)]/10 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-amber-400 text-xs font-black uppercase tracking-[0.18em] mb-5">Get Started Today</p>
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-4 leading-[1.0]">
            Let&apos;s Talk About<br />Your Delivery<br />Needs.
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            No contracts. No minimums. Just a quick conversation and a custom quote
            built around what you actually need.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-10 py-4 rounded-full text-lg transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
            >
              Get a Free Quote <ArrowRight size={18} />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-full text-lg transition-all border border-white/20"
            >
              Book a Pickup Now
            </Link>
            <a
              href="https://wa.me/17808070000?text=Hi%20Speedo%20Medical%20Couriers!%20I%27d%20like%20to%20book%20a%20medical%20courier%20pickup%20or%20get%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:opacity-90 text-white font-bold px-8 py-4 rounded-xl text-base transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
            <a
              href="tel:7808070000"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium px-6 py-4 text-base transition-colors"
            >
              <Phone size={16} /> (780) 807-0000
            </a>
          </div>
          <p className="mt-8 text-white/40 text-sm">Personal response · No obligation · Same-day service available</p>
        </div>
      </section>

    </main>
  );
}
