import Link from "next/link";
import { MapPin, Phone, Globe, ArrowRight, Clock, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edmonton Hospitals Directory | Addresses, Phone & Services",
  description: "Complete directory of Edmonton hospitals including University of Alberta Hospital, Royal Alexandra, Grey Nuns, Misericordia, Stollery, and more. Addresses, phone numbers, and department information.",
  keywords: "Edmonton hospitals, Edmonton hospital directory, AHS hospitals Edmonton, hospital addresses Edmonton, hospitals near me Edmonton",
};

const HOSPITALS = [
  {
    name: "University of Alberta Hospital",
    aka: "UAH",
    type: "Academic Health Centre / Level 1 Trauma",
    address: "8440 112 St NW, Edmonton, AB T6G 2B7",
    phone: "(780) 407-8822",
    website: "albertahealthservices.ca",
    emergency: true,
    beds: "750+",
    neighborhoods: ["McKernan", "Garneau", "South Campus"],
    departments: ["Cardiac Sciences", "Neurosciences", "Oncology", "Transplant", "Emergency (24/7)", "Orthopedics", "Women's Health"],
    note: "Edmonton's largest hospital and major trauma centre. Houses the Mazankowski Alberta Heart Institute on campus.",
    lat: 53.5228,
    lng: -113.5249,
  },
  {
    name: "Royal Alexandra Hospital",
    aka: "RAH",
    type: "Acute Care / Women's & Children's",
    address: "10240 Kingsway Ave NW, Edmonton, AB T5H 3V9",
    phone: "(780) 735-4444",
    website: "albertahealthservices.ca",
    emergency: true,
    beds: "670+",
    neighborhoods: ["Kingsway", "Alberta Avenue", "Central Edmonton"],
    departments: ["Maternal & Newborn Care", "Emergency (24/7)", "Psychiatry", "Surgery", "Intensive Care", "Dialysis"],
    note: "One of western Canada's largest hospitals. Home of the Royal Alexandra Hospital Foundation and a major birthing centre.",
    lat: 53.5556,
    lng: -113.5008,
  },
  {
    name: "Grey Nuns Community Hospital",
    aka: "Grey Nuns",
    type: "Community Acute Care",
    address: "1100 Youville Drive W, Edmonton, AB T6L 5X8",
    phone: "(780) 735-7000",
    website: "covenanthealth.ca",
    emergency: true,
    beds: "340+",
    neighborhoods: ["Mill Woods", "Twin Brooks", "Lakewood"],
    departments: ["Emergency (24/7)", "Orthopaedics", "Surgery", "Internal Medicine", "Oncology", "Mental Health"],
    note: "Operated by Covenant Health. Serves southeast Edmonton and is the primary acute care facility for Mill Woods and surrounding communities.",
    lat: 53.4699,
    lng: -113.4128,
  },
  {
    name: "Misericordia Community Hospital",
    aka: "Misericordia",
    type: "Community Acute Care / Surgery",
    address: "16940 87 Ave NW, Edmonton, AB T5R 4H5",
    phone: "(780) 735-2000",
    website: "covenanthealth.ca",
    emergency: false,
    beds: "225+",
    neighborhoods: ["Lynnwood", "Jasper Park", "West Edmonton"],
    departments: ["Eye Care", "Orthopedics", "Surgery", "Internal Medicine", "Geriatrics", "Oncology"],
    note: "Known for its eye care and surgical programs. A Covenant Health facility serving west and southwest Edmonton.",
    lat: 53.5399,
    lng: -113.5931,
  },
  {
    name: "Stollery Children's Hospital",
    aka: "Stollery",
    type: "Pediatric Tertiary Care",
    address: "8440 112 St NW, Edmonton, AB T6G 2B7",
    phone: "(780) 407-8822",
    website: "albertahealthservices.ca",
    emergency: true,
    beds: "250+",
    neighborhoods: ["South Campus", "University"],
    departments: ["Pediatric Emergency (24/7)", "Pediatric Surgery", "Pediatric Cardiology", "NICU", "Pediatric Oncology", "Pediatric Neurology"],
    note: "Western Canada's largest pediatric hospital, located within the University of Alberta Hospital complex. Serves children from across Alberta and beyond.",
    lat: 53.5228,
    lng: -113.5249,
  },
  {
    name: "Glenrose Rehabilitation Hospital",
    aka: "Glenrose",
    type: "Rehabilitation / Complex Care",
    address: "10230 111 Ave NW, Edmonton, AB T5G 0B7",
    phone: "(780) 735-7999",
    website: "albertahealthservices.ca",
    emergency: false,
    beds: "190+",
    neighborhoods: ["Westwood", "Prince Rupert", "Central Edmonton"],
    departments: ["Acquired Brain Injury", "Amputee Program", "Spinal Cord Injury", "Pediatric Rehabilitation", "Stroke Recovery", "Complex Care"],
    note: "Western Canada's largest rehabilitation facility. Specializes in intensive inpatient and outpatient rehabilitation for adults and children.",
    lat: 53.5572,
    lng: -113.5108,
  },
  {
    name: "Northeast Community Health Centre",
    aka: "NECHC",
    type: "Community Health Centre",
    address: "14007 50 St NW, Edmonton, AB T5A 5E4",
    phone: "(780) 472-5200",
    website: "albertahealthservices.ca",
    emergency: false,
    beds: null,
    neighborhoods: ["Clareview", "Beverly", "Casselman"],
    departments: ["Primary Care", "Immunization", "Mental Health", "Dental", "Pediatric Outpatient"],
    note: "A major AHS community health facility serving northeast Edmonton. Provides primary and preventive care without a traditional emergency department.",
    lat: 53.5899,
    lng: -113.4228,
  },
  {
    name: "Edmonton General Continuing Care Centre",
    aka: "Edmonton General",
    type: "Continuing Care / Palliative",
    address: "11111 Jasper Ave NW, Edmonton, AB T5K 0L4",
    phone: "(780) 342-7200",
    website: "covenanthealth.ca",
    emergency: false,
    beds: "400+",
    neighborhoods: ["Downtown", "Oliver", "Westmount"],
    departments: ["Palliative Care", "Long-Term Care", "Geriatric Assessment", "Restorative Care", "Spiritual Care"],
    note: "A Covenant Health facility providing long-term care and palliative services in central Edmonton. One of the largest continuing care facilities in the province.",
    lat: 53.5503,
    lng: -113.5143,
  },
];

const URGENT_CARE = [
  { name: "Lessard Urgent Care", address: "6633 177 St NW, Edmonton", phone: "(780) 930-5999", area: "West Edmonton" },
  { name: "Meadowlark Health Centre", address: "156 St & Meadowlark Rd NW", phone: "(780) 489-8271", area: "West Edmonton" },
  { name: "South Health Campus Urgent Care", address: "4448 Front St SE, Calgary (AHS reference)", phone: "811", area: "Refer to AHS 811" },
  { name: "Millbourne Medical Walk-In", address: "38 Ave & 91 St NW", phone: "(780) 463-7000", area: "Mill Woods" },
  { name: "Kingsway Medical Walk-In", address: "10333 Kingsway Ave NW", phone: "(780) 482-4882", area: "Kingsway" },
];

const FAQ = [
  {
    q: "Which Edmonton hospital has the closest emergency department to me?",
    a: "Edmonton has three 24/7 emergency departments at UAH (University area), Royal Alexandra Hospital (central/north), and Grey Nuns (Mill Woods/southeast). For non-life-threatening concerns, consider an AHS Urgent Care Centre to reduce wait times. Call 811 (HealthLink) for guidance anytime.",
  },
  {
    q: "How do I find out which hospital my doctor is affiliated with?",
    a: "Most Edmonton specialists are affiliated with either AHS (Alberta Health Services) or Covenant Health facilities. You can call your physician's office directly or ask during referral. AHS facilities include UAH, Royal Alexandra, and Glenrose; Covenant Health operates Grey Nuns and Misericordia.",
  },
  {
    q: "Can I get my discharge medications delivered after leaving hospital?",
    a: "Yes. Many Edmonton pharmacies now offer same-day home delivery for discharge prescriptions. Speedo Medical Couriers partners with local pharmacies to deliver discharge medications directly to patients on the same day they leave hospital — reducing missed doses and readmissions.",
  },
  {
    q: "Is parking available at Edmonton hospitals?",
    a: "All major Edmonton hospitals have paid parking. UAH and Stollery share a parking structure with daily maximums. RAH has surface lots and a parkade. Grey Nuns and Misericordia have ample lot parking. Many hospitals offer reduced-rate monthly passes for frequent visitors.",
  },
  {
    q: "What is the Stollery Children's Hospital and how is it different from other Edmonton hospitals?",
    a: "Stollery Children's Hospital is Western Canada's largest pediatric hospital, physically located within the University of Alberta Hospital complex. It provides specialized care exclusively for infants, children, and teenagers, from emergency to complex cardiac surgery.",
  },
  {
    q: "How does pharmacy delivery work for hospital patients going home?",
    a: "When you're discharged, your doctor sends prescriptions to a pharmacy of your choice. That pharmacy can arrange home delivery through a service like Speedo Medical Couriers. Same-day delivery means your medication is at your door before you've even settled back in.",
  },
];

export default function HospitalsDirectoryPage() {
  return (
    <main className="pt-28 pb-24">
      {/* JSON-LD for directory */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Edmonton Hospitals Directory",
            "description": "Complete directory of hospitals in Edmonton, Alberta, Canada",
            "numberOfItems": HOSPITALS.length,
            "itemListElement": HOSPITALS.map((h, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "Hospital",
                "name": h.name,
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": h.address.split(",")[0],
                  "addressLocality": "Edmonton",
                  "addressRegion": "AB",
                  "addressCountry": "CA",
                },
                "telephone": h.phone,
                "medicalSpecialty": h.departments.slice(0, 3),
              },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--color-brand-navy)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              ✦ Edmonton Hospital Directory
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.02]">
              Edmonton Hospitals<br />
              <span className="text-amber-400">Directory & Information</span>
            </h1>
            <p className="text-xl text-white/70 mb-6 leading-relaxed max-w-2xl">
              Addresses, phone numbers, departments, and visitor information for every major hospital and health facility in Edmonton, Alberta.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full" />Emergency 24/7</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-amber-400 rounded-full" />Urgent Care / Walk-In</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-400 rounded-full" />Specialized / Continuing Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <div className="bg-[var(--color-brand-blue)] py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-white text-sm font-semibold">
          {[
            { label: "Hospitals Listed", val: HOSPITALS.length },
            { label: "Emergency Depts", val: HOSPITALS.filter(h => h.emergency).length },
            { label: "AHS Facilities", val: "40+" },
            { label: "Urgent Care Sites", val: "8+" },
          ].map(({ label, val }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-black">{val}</p>
              <p className="text-white/70 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main hospital listings */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-2">Acute & Specialized Care</p>
              <h2 className="text-4xl font-black text-[var(--color-text)]">Edmonton Hospitals</h2>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xs">
              Information current as of 2026. Always call ahead to confirm hours, visitor policies, and department availability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {HOSPITALS.map((h) => (
              <div key={h.name} className="bg-white border border-[var(--color-border)] rounded-3xl p-6 hover:shadow-lg hover:border-[var(--color-brand-blue)] transition-all">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-[var(--color-text)]">{h.name}</h3>
                      {h.aka !== h.name && (
                        <span className="text-xs font-bold text-[var(--color-text-muted)] bg-[#F8FAFC] border border-[var(--color-border)] px-2 py-0.5 rounded-full">{h.aka}</span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">{h.type}</p>
                  </div>
                  {h.emergency && (
                    <span className="flex-shrink-0 bg-red-50 text-red-600 border border-red-200 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                      ER 24/7
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                    <MapPin size={13} className="mt-0.5 flex-shrink-0 text-[var(--color-brand-blue)]" />
                    <span>{h.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={13} className="flex-shrink-0 text-[var(--color-brand-blue)]" />
                    <a href={`tel:${h.phone.replace(/\D/g, "")}`} className="text-[var(--color-brand-blue)] font-semibold hover:underline">{h.phone}</a>
                  </div>
                  {h.beds && (
                    <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                      <span className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{h.beds} beds · {h.neighborhoods.join(", ")} area</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{h.note}</p>

                <div className="flex flex-wrap gap-1.5">
                  {h.departments.slice(0, 5).map((d) => (
                    <span key={d} className="text-[11px] font-medium text-[var(--color-text-muted)] bg-[#F8FAFC] border border-[var(--color-border)] px-2.5 py-1 rounded-full">{d}</span>
                  ))}
                  {h.departments.length > 5 && (
                    <span className="text-[11px] font-medium text-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)] px-2.5 py-1 rounded-full">+{h.departments.length - 5} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Care */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-amber-600 text-xs font-black uppercase tracking-[0.18em] mb-2">Non-Emergency</p>
            <h2 className="text-3xl font-black text-[var(--color-text)]">Urgent Care & Walk-In Clinics</h2>
            <p className="text-[var(--color-text-muted)] mt-2 max-w-xl">For non-life-threatening injuries and illnesses. Shorter wait times than emergency departments.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {URGENT_CARE.map((u) => (
              <div key={u.name} className="bg-white border border-[var(--color-border)] rounded-2xl p-5">
                <p className="text-xs font-black uppercase tracking-wider text-amber-600 mb-1">{u.area}</p>
                <h3 className="font-black text-[var(--color-text)] mb-2">{u.name}</h3>
                <div className="flex items-start gap-2 text-sm text-[var(--color-text-muted)] mb-1">
                  <MapPin size={12} className="mt-0.5 flex-shrink-0" /><span>{u.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={12} className="flex-shrink-0 text-[var(--color-brand-blue)]" />
                  <a href={`tel:${u.phone.replace(/\D/g, "")}`} className="text-[var(--color-brand-blue)] font-semibold">{u.phone}</a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mt-6">
            <strong>Health Advice Line:</strong> Call <a href="tel:811" className="text-[var(--color-brand-blue)] font-bold">811</a> (AHS HealthLink) 24/7 to speak with a registered nurse and determine whether you need emergency, urgent, or primary care.
          </p>
        </div>
      </section>

      {/* Delivery callout — accurate, not claiming hospital B2B */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--color-brand-blue-pale)] border border-[var(--color-brand-blue)]/20 rounded-3xl p-8 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  Patient Home Delivery
                </div>
                <h2 className="text-3xl font-black text-[var(--color-text)] mb-3">
                  Getting discharged from hospital?<br />
                  We deliver your medications home.
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-5">
                  Ask your hospital pharmacist to send your discharge prescriptions to any Edmonton pharmacy — then we pick them up and deliver to your door the same day. No need to make a stop on your way home.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/book" className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">
                    Book a Delivery <ArrowRight size={14} />
                  </Link>
                  <a href="tel:7808070000" className="inline-flex items-center justify-center gap-2 border border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] font-bold px-6 py-3 rounded-xl text-sm hover:bg-white transition-all">
                    <Phone size={14} /> (780) 807-0000
                  </a>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { step: "01", text: "Doctor sends prescription to your chosen Edmonton pharmacy" },
                  { step: "02", text: "Pharmacy fills your prescription and contacts Speedo Medical" },
                  { step: "03", text: "We pick up and deliver to your home — same day" },
                  { step: "04", text: "You receive your medication without leaving home" },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[var(--color-border)]">
                    <span className="w-8 h-8 bg-[var(--color-brand-blue)] text-white text-xs font-black rounded-lg flex items-center justify-center flex-shrink-0">{step}</span>
                    <p className="text-sm text-[var(--color-text)]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[var(--color-text)] mb-8">Hospital & Healthcare FAQs</h2>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": FAQ.map(({ q, a }) => ({
                  "@type": "Question",
                  "name": q,
                  "acceptedAnswer": { "@type": "Answer", "text": a },
                })),
              }),
            }}
          />
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white border border-[var(--color-border)] rounded-2xl p-6">
                <h3 className="font-black text-[var(--color-text)] mb-2">{q}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby resources */}
      <section className="py-12 bg-white border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-black text-[var(--color-text)] mb-6">Related Edmonton Healthcare Directories</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Edmonton Pharmacies", href: "/pharmacies" },
              { label: "Medical Courier Services", href: "/services" },
              { label: "Prescription Home Delivery", href: "/book" },
              { label: "Service Area Coverage", href: "/service-area" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)] px-4 py-2 rounded-full hover:bg-[var(--color-brand-blue)] hover:text-white transition-all">
                {label} <ArrowRight size={12} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
