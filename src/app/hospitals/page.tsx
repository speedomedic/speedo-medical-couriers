import Link from "next/link";
import Image from "next/image";
import {
  Hospital, ArrowRight, CheckCircle, Phone, Clock,
  Building2, FlaskConical, Truck, FileText, Package,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospital & AHS Medical Courier Services | Speedo Medical Edmonton",
  description: "Dedicated medical courier services for Edmonton hospitals, AHS facilities, and health authorities. Cross-facility transport, STAT dispatch, and surgical supply delivery.",
};

const EDMONTON_HOSPITALS = [
  {
    name: "University of Alberta Hospital",
    address: "8440 112 St NW, Edmonton",
    type: "Academic Health Centre",
    services: ["Cross-facility specimens", "Patient medication transfers", "Surgical supply delivery"],
  },
  {
    name: "Royal Alexandra Hospital",
    address: "10240 Kingsway Ave NW, Edmonton",
    type: "Acute Care / Trauma",
    services: ["Trauma specimen transport", "Pharmacy inter-site transfers", "Medical records"],
  },
  {
    name: "Grey Nuns Community Hospital",
    address: "1100 Youville Drive W, Edmonton",
    type: "Community Acute Care",
    services: ["Lab specimen pickups", "Medication delivery", "Cross-facility logistics"],
  },
  {
    name: "Misericordia Community Hospital",
    address: "16940 87 Ave NW, Edmonton",
    type: "Community Acute Care",
    services: ["Outpatient medication", "Specimen transport", "Document courier"],
  },
  {
    name: "Stollery Children&apos;s Hospital",
    address: "8440 112 St NW, Edmonton",
    type: "Pediatric Tertiary Care",
    services: ["Pediatric medication", "Lab specimens", "Equipment delivery"],
  },
  {
    name: "Glenrose Rehabilitation Hospital",
    address: "10230 111 Ave NW, Edmonton",
    type: "Rehabilitation",
    services: ["Patient supplies", "Pharmaceutical transfers", "Therapy equipment"],
  },
];

const SERVICES = [
  {
    icon: Truck,
    title: "Cross-Facility AHS Transport",
    desc: "Coordinated inter-facility transfers between AHS sites — specimens, medications, surgical supplies, and medical records moving efficiently between Edmonton's hospital campuses.",
  },
  {
    icon: Clock,
    title: "STAT Dispatch",
    desc: "Priority response for urgent hospital requests. When a time-sensitive specimen, medication, or equipment need arises, we dispatch immediately — not into a queue.",
  },
  {
    icon: FlaskConical,
    title: "Specimen & Lab Logistics",
    desc: "WHMIS-trained couriers handling blood, tissue, and culture specimens between collection points and the processing lab. Chain-of-custody documentation at every step.",
  },
  {
    icon: Package,
    title: "Surgical Supply Delivery",
    desc: "Implants, prosthetics, instrument sets, and disposable surgical supplies moving from supplier to OR on your timeline — including same-day urgent delivery.",
  },
  {
    icon: FileText,
    title: "Medical Records & Documents",
    desc: "Confidential medical record transfers between facilities, secure referral letter delivery, and consent document courier with signature confirmation.",
  },
  {
    icon: Building2,
    title: "Outpatient Medication",
    desc: "Hospital pharmacy to outpatient home delivery — reducing readmission risk by ensuring patients receive discharge medications before leaving or on the same day.",
  },
];

const CASE_STUDIES = [
  {
    label: "Case Study 01",
    title: "Reducing Specimen Transit Time for a South Edmonton Clinic Network",
    excerpt: "A multi-site clinic network in south Edmonton was experiencing specimen rejection rates above 8% — driven by transit delays between their satellite collection sites and the main processing lab.",
    challenge: "Four collection sites spread across Windermere, Heritage Valley, and Terwillegar were using a general courier that combined medical and non-medical deliveries. Average transit from southernmost site to the University-area lab exceeded 3.5 hours.",
    solution: "Speedo Medical built a dedicated specimen circuit — a fixed-time route visiting all four sites in succession, with an express direct run to the lab. The route runs twice daily, timed around peak collection windows.",
    outcome: "Specimen rejection rate dropped from 8.2% to under 1.5% within 60 days. Lab reported a measurable increase in same-day result availability for the clinic's afternoon patient appointments.",
    color: "border-[var(--color-brand-blue)]",
    accentColor: "text-[var(--color-brand-blue)]",
    accentBg: "bg-[var(--color-brand-blue-pale)]",
  },
  {
    label: "Case Study 02",
    title: "Cross-Facility Pharmacy Transfers Between AHS Sites",
    excerpt: "An AHS pharmacy department needed a reliable method for transferring bulk medication between two facilities when one site ran out of stock mid-week.",
    challenge: "Informal driver arrangements meant transfer times were unpredictable — sometimes 4+ hours, sometimes never completed on the same day. Staff time was being consumed coordinating each transfer manually.",
    solution: "Speedo Medical established a standing STAT agreement with the AHS pharmacy team. Any inter-site medication transfer request receives a 60-minute pickup guarantee with real-time ETA updates to both pharmacy teams.",
    outcome: "Transfer coordination time reduced from 45 minutes per event to under 5 minutes. Same-day completion rate reached 100% for all standard transfer requests.",
    color: "border-rose-200",
    accentColor: "text-rose-600",
    accentBg: "bg-rose-50",
  },
  {
    label: "Case Study 03",
    title: "Discharge Medication Delivery for a Cardiac Unit",
    excerpt: "A cardiac unit was experiencing preventable readmissions partly linked to patients leaving without their discharge medications — or not obtaining them within 48 hours.",
    challenge: "Patients were being discharged with instructions to pick up prescriptions at their local pharmacy, but transportation barriers and cognitive load post-discharge meant a significant percentage of prescriptions went unfilled in the critical first 48 hours.",
    solution: "Speedo Medical partnered with the unit's discharge pharmacy to offer same-day home delivery for discharge prescriptions. Patients provide delivery consent before discharge; the pharmacy dispenses and hands off to Speedo Medical that afternoon.",
    outcome: "Pilot cohort showed a 31% reduction in pharmacy non-adherence calls within the first 48 hours post-discharge. The program was expanded from the cardiac unit to two additional units within 6 months.",
    color: "border-emerald-200",
    accentColor: "text-emerald-600",
    accentBg: "bg-emerald-50",
  },
];

export default function HospitalsPage() {
  return (
    <main className="pt-28 pb-24">
      {/* Hero */}
      <section className="bg-[var(--color-brand-navy)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                ✦ Hospital &amp; AHS Services
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.02]">
                Edmonton Hospital<br />
                <span className="text-amber-400">Medical Courier</span>
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Dedicated cross-facility transport for AHS sites, hospital pharmacies, surgical departments, and laboratory networks across Edmonton.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-7 py-4 rounded-full transition-all text-sm"
                >
                  Discuss a Hospital Contract <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:7808070000"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-4 rounded-full border border-white/20 transition-all text-sm"
                >
                  <Phone size={15} /> (780) 807-0000
                </a>
              </div>
            </div>
            <div className="hidden lg:block relative h-80">
              <div className="relative h-full w-full rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=80"
                  alt="Edmonton hospital"
                  fill
                  sizes="50vw"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-navy)] via-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">What We Deliver</p>
            <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-text)]">Hospital &amp; AHS Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#F8FAFC] rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-brand-blue)] hover:shadow-lg hover:shadow-blue-500/5 transition-all">
                <div className="w-11 h-11 bg-[var(--color-brand-blue-pale)] rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[var(--color-brand-blue)]" />
                </div>
                <h3 className="text-base font-black text-[var(--color-text)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Edmonton Hospitals directory */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">Service Coverage</p>
            <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-text)]">
              Edmonton Hospitals<br />
              <span className="text-[var(--color-brand-blue)]">We Serve</span>
            </h2>
            <p className="text-[var(--color-text-muted)] mt-4 max-w-2xl leading-relaxed">
              Speedo Medical provides dedicated courier services to and between all major Edmonton hospital campuses and AHS facilities. Whether you need regular routes or STAT on-demand service, we cover the complete Edmonton metro hospital network.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EDMONTON_HOSPITALS.map((h) => (
              <div key={h.name} className="bg-white rounded-2xl border border-[var(--color-border)] p-5 hover:border-[var(--color-brand-blue)] transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 bg-[var(--color-brand-blue-pale)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Hospital size={17} className="text-[var(--color-brand-blue)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[var(--color-text)] leading-snug" dangerouslySetInnerHTML={{ __html: h.name }} />
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{h.type}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mb-3">{h.address}</p>
                <ul className="space-y-1.5">
                  {h.services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-xs text-[var(--color-text)]">
                      <CheckCircle size={10} className="text-[var(--color-brand-blue)] flex-shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mt-6">
            Serving all Alberta Health Services facilities in the Edmonton Zone, including community health centres, continuing care facilities, and diagnostic imaging sites.
          </p>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">Results</p>
            <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-text)]">
              Case Studies
            </h2>
            <p className="text-[var(--color-text-muted)] mt-4 max-w-xl leading-relaxed">
              How Edmonton healthcare facilities improved delivery reliability, reduced errors, and freed up clinical staff time with dedicated medical courier services.
            </p>
          </div>
          <div className="space-y-8">
            {CASE_STUDIES.map((cs) => (
              <div key={cs.label} className={`bg-white rounded-3xl border-2 ${cs.color} p-8`}>
                <div className={`inline-flex items-center ${cs.accentBg} ${cs.accentColor} text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4`}>
                  {cs.label}
                </div>
                <h3 className="text-2xl font-black text-[var(--color-text)] mb-3">{cs.title}</h3>
                <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">{cs.excerpt}</p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { label: "Challenge", content: cs.challenge },
                    { label: "Solution", content: cs.solution },
                    { label: "Outcome", content: cs.outcome },
                  ].map(({ label, content }) => (
                    <div key={label}>
                      <p className={`text-xs font-black uppercase tracking-wider ${cs.accentColor} mb-2`}>{label}</p>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key requirements */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-3">Compliance</p>
              <h2 className="text-4xl font-black text-[var(--color-text)] mb-5">
                Built for hospital<br />compliance requirements
              </h2>
              <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
                Hospital procurement teams have strict vendor requirements. Speedo Medical is prepared to meet them — from insurance and bonding to WHMIS training records and chain-of-custody documentation.
              </p>
              <ul className="space-y-3">
                {[
                  "Fully bonded and insured to $2M general liability",
                  "Background-checked couriers on file",
                  "WHMIS 2015 certified for biohazardous materials",
                  "Chain-of-custody documentation for every delivery",
                  "Photo proof of delivery with timestamp",
                  "Audit-ready electronic records",
                  "Custom SLA agreements available",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--color-text-muted)]">
                    <CheckCircle size={14} className="text-[var(--color-brand-blue)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-80 rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80"
                alt="Medical compliance"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-brand-navy)] relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to discuss a hospital contract?</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Speak directly with our B2B team to design a service agreement that meets your facility&apos;s specific needs, SLA requirements, and compliance standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-8 py-4 rounded-full transition-all text-sm hover:shadow-lg"
            >
              Start the Conversation <ArrowRight size={15} />
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
