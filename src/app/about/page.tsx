import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Speedo Medical Couriers",
  description: "Founded by Anand Mistry, Speedo Medical Couriers is Edmonton's purpose-built medical courier service — dedicated to precision, reliability, and healthcare compliance.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D1B3E 0%, #1A3464 55%, #1B6FEB 140%)", minHeight: "90vh", display: "flex", alignItems: "center" }}
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        {/* Glow orbs */}
        <div className="absolute top-20 right-0 w-[700px] h-[700px] rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-blue-900/30 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 border border-white/15">
                ✦ Our Story
              </div>
              <h1 className="text-5xl lg:text-[68px] font-black text-white leading-[1.03] mb-6">
                Born in Edmonton.<br />
                <span className="text-amber-400">Built for Healthcare.</span>
              </h1>
              <p className="text-white/65 text-xl leading-relaxed max-w-lg">
                We started with one vehicle and one belief: Edmonton's pharmacies, clinics, and patients deserve a courier service that actually understands what they need.
              </p>
            </div>

            {/* Stats column */}
            <div className="grid grid-cols-2 gap-4 hidden lg:grid">
              {[
                { val: "100%", label: "Medical Focus", sub: "Nothing generic, ever" },
                { val: "7",    label: "Days a Week",   sub: "365 days a year" },
                { val: "8+",   label: "Cities Served", sub: "Edmonton & region" },
                { val: "24h",  label: "Account Setup", sub: "Be ready tomorrow" },
              ].map(({ val, label, sub }) => (
                <div key={label} className="bg-white/8 border border-white/12 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-4xl font-black text-white mb-1">{val}</div>
                  <div className="text-white/80 font-semibold text-sm mb-0.5">{label}</div>
                  <div className="text-white/40 text-xs">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BIG NUMBERS STRIP ─────────────────────────────────── */}
      <section className="bg-amber-400 py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-2 text-amber-900">
            {["500+ Deliveries Completed", "99.8% On-Time Rate", "60 Min STAT Dispatch", "Chain of Custody on Every Run"].map(s => (
              <span key={s} className="flex items-center gap-2 text-sm font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 flex-shrink-0" />{s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY WE STARTED — Editorial ────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left — photo */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
                  alt="Speedo Medical Couriers team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1B6FEB] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                        AM
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Anand Mistry</p>
                        <p className="text-white/65 text-xs">Founder & Owner — Edmonton, AB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating quote card */}
              <div className="absolute -top-6 -right-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-xl max-w-[200px] hidden lg:block">
                <p className="text-amber-900 text-xs font-semibold leading-relaxed italic">
                  &ldquo;We treat every delivery like it&apos;s going to our own family.&rdquo;
                </p>
                <p className="text-amber-600 text-[10px] font-bold mt-2">— Anand Mistry</p>
              </div>
            </div>

            {/* Right — story */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-[var(--color-brand-blue-pale)] text-[var(--color-brand-blue)] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-blue-200">
                ✦ Why We Started
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] leading-tight mb-6">
                The Gap Nobody<br />
                <span className="text-[var(--color-brand-blue)]">Was Filling.</span>
              </h2>
              <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed text-[15px]">
                <p>
                  Speedo Medical Couriers was founded by <strong className="text-[var(--color-text)]">Anand Mistry</strong> after seeing a clear gap in the Edmonton market: general couriers were handling medical materials the same way they&apos;d handle a birthday gift.
                </p>
                <p>
                  A vial of blood specimens isn&apos;t like a parcel. A patient&apos;s prescription isn&apos;t a package. These deliveries require trained handling, strict chain of custody, temperature awareness, and a driver who understands the gravity of what they&apos;re carrying.
                </p>
                <p>
                  That gap — between what general couriers offer and what healthcare providers actually need — is exactly why Speedo Medical Couriers exists. We&apos;re Edmonton&apos;s first courier service built specifically for the medical industry, with every process, vehicle, and protocol designed around healthcare requirements.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  "Medical delivery is our only business — not a side service",
                  "Every courier is background-checked and WHMIS-trained",
                  "We answer the phone — not a voicemail, not a chatbot",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[var(--color-brand-blue)] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[var(--color-text)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR PROMISE — Full bleed ──────────────────────────── */}
      <section className="py-24 bg-[var(--color-brand-navy)] relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">Our Promise</p>
          <blockquote className="text-3xl lg:text-5xl font-black text-white leading-tight mb-8">
            &ldquo;Every package we carry represents someone&apos;s health,<br className="hidden lg:block" />
            someone&apos;s family. <span className="text-amber-400">We never forget that.&rdquo;</span>
          </blockquote>
          <p className="text-white/50 text-base">— Anand Mistry, Founder</p>
        </div>
      </section>

      {/* ── VALUES — Editorial numbered list ──────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto mb-4">✦ How We Operate</div>
            <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-text)]">
              The Standards We<br /><span className="text-[var(--color-brand-blue)]">Hold Ourselves To</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "Compliance First",
                desc: "Every delivery follows healthcare privacy and transport standards. We treat your materials with the same care a clinician would. Not because we have to — because it's the right thing to do.",
                color: "bg-blue-600",
              },
              {
                num: "02",
                title: "Always Available",
                desc: "Seven days a week, holidays included. Healthcare doesn't stop on Christmas, and neither do we. When you need us, we're there.",
                color: "bg-indigo-600",
              },
              {
                num: "03",
                title: "Purpose-Built Only",
                desc: "We are not a general courier that also does medical work. Medical delivery is our only focus. Every process, vehicle, and training program is built specifically for healthcare.",
                color: "bg-[var(--color-brand-navy)]",
              },
              {
                num: "04",
                title: "Accountable, Always",
                desc: "Chain of custody documentation on every single delivery. You always know what we picked up, when we picked it up, who received it, and when. Full audit trail on demand.",
                color: "bg-amber-500",
              },
            ].map(({ num, title, desc, color }) => (
              <div key={num} className="flex gap-6 p-7 rounded-3xl border border-[var(--color-border)] hover:border-[var(--color-brand-blue)]/30 hover:shadow-lg transition-all duration-300 group">
                <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {num}
                </div>
                <div>
                  <h3 className="text-xl font-black text-[var(--color-text)] mb-3">{title}</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGO + BRAND IDENTITY ─────────────────────────────── */}
      <section className="py-16 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <Image
                src="/images/logo-badge.png"
                alt="Speedo Medical Couriers"
                width={120}
                height={120}
                className="w-28 h-28 object-contain"
              />
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-black text-[var(--color-text)] mb-2">Speedo Medical Couriers</h3>
              <p className="text-[var(--color-text-muted)] max-w-lg">Edmonton&apos;s dedicated medical courier. Family-owned, locally operated, and focused on one thing: getting healthcare materials where they need to go, safely and on time.</p>
            </div>
            <div className="ml-auto hidden lg:flex flex-col items-end gap-1 text-right">
              <p className="text-sm font-bold text-[var(--color-text)]">Edmonton, Alberta</p>
              <p className="text-sm text-[var(--color-text-muted)]">Serving the greater Edmonton region</p>
              <p className="text-sm text-[var(--color-text-muted)]">7 days a week · 365 days a year</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="section-badge mx-auto mb-4">✦ Work With Us</div>
          <h2 className="text-4xl font-black text-[var(--color-text)] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg mb-8 max-w-xl mx-auto">
            Book your first delivery online, or call us directly — we answer every time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book"
              className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25">
              Book a Pickup <ArrowRight size={16} />
            </Link>
            <a href="tel:7808070000"
              className="inline-flex items-center gap-2 border-2 border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] font-bold px-8 py-4 rounded-xl hover:bg-[var(--color-brand-blue)] hover:text-white transition-all">
              <Phone size={16} /> (780) 807-0000
            </a>
            <Link href="/business"
              className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] font-medium px-6 py-4 text-sm transition-colors">
              For business accounts <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
