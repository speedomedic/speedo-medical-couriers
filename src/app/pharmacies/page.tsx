import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight, CheckCircle, Package } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edmonton Pharmacies Directory | Locations, Hours & Delivery Info",
  description: "Complete directory of pharmacies in Edmonton, AB. Find Shoppers Drug Mart, Rexall, London Drugs, Safeway Pharmacy, and independent pharmacies near you — with addresses, hours, and delivery information.",
  keywords: "Edmonton pharmacies, Shoppers Drug Mart Edmonton, Rexall Edmonton, London Drugs Edmonton, pharmacy near me Edmonton, prescription delivery Edmonton",
};

const CHAINS = [
  {
    chain: "Shoppers Drug Mart",
    description: "Canada's largest pharmacy chain with dozens of Edmonton locations including many 24-hour stores. Most locations have in-store clinics, Beauty Boutiques, and Canada Post outlets.",
    color: "bg-red-600",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    findUrl: "shoppers.com",
    locations: [
      { name: "Shoppers Drug Mart #1024 – Whitemud Crossing", address: "4211 106 St NW, Edmonton", phone: "(780) 435-9150", hours: "8am–10pm daily", note: "Pharmacy counter, beauty, post" },
      { name: "Shoppers Drug Mart #0360 – South Common", address: "2020 111 St NW, Edmonton", phone: "(780) 988-3636", hours: "24 hours", note: "24/7 pharmacy" },
      { name: "Shoppers Drug Mart #0175 – West Edmonton Mall", address: "8882 170 St NW, Edmonton", phone: "(780) 484-2833", hours: "9am–9pm daily", note: "Inside WEM" },
      { name: "Shoppers Drug Mart #1440 – Kingsway", address: "10155 107 Ave NW, Edmonton", phone: "(780) 425-5955", hours: "24 hours", note: "Downtown, 24/7" },
      { name: "Shoppers Drug Mart – Millbourne", address: "38 Ave & 91 St NW, Mill Woods", phone: "(780) 463-3220", hours: "8am–10pm daily", note: "SE Edmonton" },
    ],
  },
  {
    chain: "Rexall",
    description: "A major Canadian pharmacy chain with a strong Edmonton presence. Offers prescription services, wellness programs, and the Be Well loyalty app. Some locations open 24 hours.",
    color: "bg-blue-700",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    findUrl: "rexall.ca",
    locations: [
      { name: "Rexall – Meadowlark Health Centre", address: "156 St & Meadowlark Rd NW, Edmonton", phone: "(780) 489-2141", hours: "9am–9pm daily", note: "Clinic complex" },
      { name: "Rexall – Jasper Gates", address: "15710 87 Ave NW, Edmonton", phone: "(780) 484-5155", hours: "9am–9pm daily", note: "West Edmonton" },
      { name: "Rexall – MacEwan", address: "9704 41 Ave NW, Edmonton", phone: "(780) 434-6717", hours: "9am–9pm daily", note: "South Edmonton" },
      { name: "Rexall – Castledowns", address: "14203 Castle Downs Rd NW, Edmonton", phone: "(780) 456-6464", hours: "9am–9pm daily", note: "North Edmonton" },
      { name: "Rexall – Bonnie Doon", address: "82 Ave & 83 St NW, Edmonton", phone: "(780) 466-5621", hours: "9am–9pm daily", note: "East Edmonton" },
    ],
  },
  {
    chain: "London Drugs",
    description: "Western Canada's beloved pharmacy and electronics retailer. Known for knowledgeable pharmacists, compounding services, and photo printing. Eight Edmonton-area locations.",
    color: "bg-purple-700",
    textColor: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    findUrl: "londondrugs.com",
    locations: [
      { name: "London Drugs – Southgate Centre", address: "5015 111 St NW, Edmonton", phone: "(780) 988-8888", hours: "9am–9pm Mon–Sat, 10am–6pm Sun", note: "Southgate mall" },
      { name: "London Drugs – West Edmonton Mall", address: "17790 100 Ave NW, Edmonton", phone: "(780) 484-5700", hours: "9:30am–9pm Mon–Sat, 10am–6pm Sun", note: "WEM lower level" },
      { name: "London Drugs – Kingsway Mall", address: "109 St & Princess Elizabeth Ave", phone: "(780) 474-9001", hours: "9:30am–9pm Mon–Sat, 11am–6pm Sun", note: "Kingsway mall" },
      { name: "London Drugs – Millbourne Mall", address: "38 Ave & 91 St NW, Mill Woods", phone: "(780) 462-8814", hours: "9:30am–9pm Mon–Sat, 11am–6pm Sun", note: "SE Edmonton" },
      { name: "London Drugs – Skyview Power Centre", address: "99 St & 34 Ave NW, South Edmonton", phone: "(780) 944-9001", hours: "9:30am–9pm Mon–Sat, 10am–6pm Sun", note: "South Common area" },
    ],
  },
  {
    chain: "Safeway Pharmacy",
    description: "Full-service pharmacy counters inside Sobeys-owned Safeway grocery stores across Edmonton. Convenient for combining grocery shopping with prescription pickup. Offers immunization clinics.",
    color: "bg-orange-600",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    findUrl: "safeway.ca",
    locations: [
      { name: "Safeway Pharmacy – Strathcona", address: "8225 105 St NW, Edmonton", phone: "(780) 433-1115", hours: "Mon–Fri 9am–8pm, Sat 9am–6pm, Sun 10am–5pm", note: "South-central Edmonton" },
      { name: "Safeway Pharmacy – Northgate", address: "9450 137 Ave NW, Edmonton", phone: "(780) 472-3116", hours: "Mon–Fri 9am–8pm, Sat 9am–6pm, Sun 10am–5pm", note: "North Edmonton" },
      { name: "Safeway Pharmacy – Lessard", address: "6633 177 St NW, Edmonton", phone: "(780) 486-0665", hours: "Mon–Fri 9am–8pm, Sat 9am–6pm, Sun 10am–5pm", note: "West Edmonton" },
      { name: "Safeway Pharmacy – Mill Woods Town Centre", address: "2331 66 St NW, Edmonton", phone: "(780) 461-5636", hours: "Mon–Fri 9am–8pm, Sat 9am–6pm, Sun 10am–5pm", note: "Mill Woods" },
    ],
  },
];

const INDEPENDENT = [
  {
    name: "Terra Health Pharmacy",
    address: "10004 Jasper Ave NW, Edmonton",
    phone: "(780) 428-3440",
    specialty: "Compounding, IV therapy, travel health",
    hours: "Mon–Fri 9am–6pm",
  },
  {
    name: "Idylwylde Pharmacy",
    address: "8426 Argyll Rd NW, Edmonton",
    phone: "(780) 469-4882",
    specialty: "Compounding, seniors care, blister packs",
    hours: "Mon–Fri 9am–6pm, Sat 10am–4pm",
  },
  {
    name: "MedPharm Dispensaries",
    address: "Multiple Edmonton locations",
    phone: "(780) 439-6477",
    specialty: "Compounding, medical cannabis consultations",
    hours: "Varies by location",
  },
  {
    name: "Glengarry Pharmacy",
    address: "13544 Victoria Trail NW, Edmonton",
    phone: "(780) 473-5020",
    specialty: "Seniors medication management, blister packs",
    hours: "Mon–Sat 9am–6pm",
  },
  {
    name: "NewCare Pharmacy",
    address: "10240 124 St NW, Edmonton",
    phone: "(780) 482-7750",
    specialty: "Specialty medications, fertility drugs",
    hours: "Mon–Fri 9am–6pm, Sat 10am–3pm",
  },
  {
    name: "Kingsway Professional Centre Pharmacy",
    address: "10611 Kingsway Ave NW, Edmonton",
    phone: "(780) 477-4111",
    specialty: "Clinical pharmacy, specialist referral coordination",
    hours: "Mon–Fri 8am–5pm",
  },
];

const FAQ = [
  {
    q: "Which Edmonton pharmacy offers 24-hour prescription service?",
    a: "Shoppers Drug Mart has multiple 24-hour locations in Edmonton, including the Kingsway location (10155 107 Ave NW) and South Common location (2020 111 St NW). Call ahead to confirm that the pharmacy counter is open, as hours can change.",
  },
  {
    q: "Can pharmacies in Edmonton deliver prescriptions to my home?",
    a: "Yes. Many Edmonton pharmacies partner with delivery services like Speedo Medical Couriers to offer same-day or scheduled home delivery. Contact your pharmacy to arrange delivery, or book directly through Speedo Medical Couriers.",
  },
  {
    q: "Which Edmonton pharmacies offer medication compounding?",
    a: "Several independent pharmacies in Edmonton specialize in compounding — custom-formulated medications not available commercially. Terra Health Pharmacy, Idylwylde Pharmacy, and MedPharm Dispensaries all offer compounding services.",
  },
  {
    q: "Can I transfer my prescription to a different pharmacy in Edmonton?",
    a: "Yes. In Alberta, you can transfer a prescription to any pharmacy. Simply bring your prescription bottle or have the new pharmacy call your previous one. Electronic prescriptions can be transferred between PharmaCare-linked systems.",
  },
  {
    q: "Does Alberta Health Care cover prescriptions at Edmonton pharmacies?",
    a: "AHCIP (Alberta Health Care Insurance Plan) does not cover most prescription drugs. However, the Alberta Drug Benefit program covers many drugs for eligible Albertans including seniors, income support recipients, and those with high drug costs. Check with your pharmacist.",
  },
  {
    q: "How do I find a pharmacy open on Sundays in Edmonton?",
    a: "Shoppers Drug Mart and Rexall locations generally maintain Sunday hours (typically 10am–6pm or longer). 24-hour Shoppers locations are always open. Large grocery-store pharmacies like Safeway are also open on Sundays, typically 10am–5pm.",
  },
];

export default function PharmaciesDirectoryPage() {
  return (
    <main className="pt-28 pb-24">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Edmonton Pharmacies Directory",
            "description": "Complete directory of pharmacies in Edmonton, Alberta, Canada",
            "itemListElement": CHAINS.flatMap((c, ci) =>
              c.locations.map((loc, li) => ({
                "@type": "ListItem",
                "position": ci * 10 + li + 1,
                "item": {
                  "@type": "Pharmacy",
                  "name": loc.name,
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": loc.address.split(",")[0],
                    "addressLocality": "Edmonton",
                    "addressRegion": "AB",
                    "addressCountry": "CA",
                  },
                  "telephone": loc.phone,
                  "openingHours": loc.hours,
                },
              }))
            ),
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--color-brand-navy)] py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              ✦ Edmonton Pharmacy Directory
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.02]">
              Edmonton Pharmacies<br />
              <span className="text-amber-400">Directory & Hours</span>
            </h1>
            <p className="text-xl text-white/70 mb-6 leading-relaxed max-w-2xl">
              Find pharmacies near you across Edmonton — with addresses, phone numbers, hours, and home delivery information.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-red-400 rounded-full" />Shoppers Drug Mart</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-400 rounded-full" />Rexall</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-400 rounded-full" />London Drugs</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-orange-400 rounded-full" />Safeway Pharmacy</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full" />Independent</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-[var(--color-brand-blue)] py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-white text-sm font-semibold">
          {[
            { val: "70+", label: "Pharmacy Locations" },
            { val: "4", label: "Major Chains" },
            { val: "24h", label: "Some Open 24/7" },
            { val: "Same Day", label: "Home Delivery Available" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-black">{val}</p>
              <p className="text-white/70 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chain listings */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[var(--color-brand-blue)] text-xs font-black uppercase tracking-[0.18em] mb-2">Major Chains</p>
            <h2 className="text-4xl font-black text-[var(--color-text)]">Pharmacy Chains in Edmonton</h2>
            <p className="text-[var(--color-text-muted)] mt-2 max-w-xl">Sample locations for each major chain. Visit their websites or call to find the location nearest you.</p>
          </div>

          <div className="space-y-12">
            {CHAINS.map((chain) => (
              <div key={chain.chain}>
                <div className={`inline-flex items-center gap-3 ${chain.bgColor} ${chain.borderColor} border rounded-2xl px-5 py-3 mb-5`}>
                  <div className={`w-3 h-3 rounded-full ${chain.color}`} />
                  <h3 className={`text-lg font-black ${chain.textColor}`}>{chain.chain}</h3>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-5 max-w-2xl">{chain.description}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chain.locations.map((loc) => (
                    <div key={loc.name} className={`bg-white border ${chain.borderColor} rounded-2xl p-5 hover:shadow-md transition-all`}>
                      <p className="font-black text-[var(--color-text)] text-sm mb-3 leading-tight">{loc.name}</p>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                          <MapPin size={11} className="mt-0.5 flex-shrink-0" /><span>{loc.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Phone size={11} className={`flex-shrink-0 ${chain.textColor}`} />
                          <a href={`tel:${loc.phone.replace(/\D/g, "")}`} className={`${chain.textColor} font-semibold`}>{loc.phone}</a>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                          <Clock size={11} className="mt-0.5 flex-shrink-0" /><span>{loc.hours}</span>
                        </div>
                      </div>
                      {loc.note && (
                        <span className={`inline-block mt-3 text-[10px] font-bold ${chain.textColor} ${chain.bgColor} px-2 py-0.5 rounded-full`}>{loc.note}</span>
                      )}
                    </div>
                  ))}
                  {/* "Find more" card */}
                  <div className={`bg-white border-2 border-dashed ${chain.borderColor} rounded-2xl p-5 flex flex-col items-center justify-center text-center`}>
                    <p className={`text-sm font-bold ${chain.textColor} mb-1`}>More locations</p>
                    <p className="text-xs text-[var(--color-text-muted)] mb-3">Edmonton has many more {chain.chain} locations</p>
                    <span className="text-xs text-[var(--color-text-muted)]">Visit {chain.findUrl}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Independent pharmacies */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-green-700 text-xs font-black uppercase tracking-[0.18em] mb-2">Independent</p>
            <h2 className="text-3xl font-black text-[var(--color-text)]">Independent & Specialty Pharmacies</h2>
            <p className="text-[var(--color-text-muted)] mt-2 max-w-xl">Edmonton's independent pharmacies often offer specialized services like compounding, seniors packaging, and longer consultations.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDEPENDENT.map((p) => (
              <div key={p.name} className="bg-white border border-green-200 rounded-2xl p-5 hover:shadow-md transition-all">
                <h3 className="font-black text-[var(--color-text)] mb-2">{p.name}</h3>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                    <MapPin size={11} className="mt-0.5 flex-shrink-0" /><span>{p.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Phone size={11} className="flex-shrink-0 text-green-700" />
                    <a href={`tel:${p.phone.replace(/\D/g, "")}`} className="text-green-700 font-semibold">{p.phone}</a>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                    <Clock size={11} className="mt-0.5 flex-shrink-0" /><span>{p.hours}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{p.specialty}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pharmacy delivery CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--color-brand-blue-pale)] border border-[var(--color-brand-blue)]/20 rounded-3xl p-8 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  For Pharmacies
                </div>
                <h2 className="text-3xl font-black text-[var(--color-text)] mb-3">
                  Does your pharmacy need<br />
                  a delivery partner?
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-5">
                  Speedo Medical Couriers partners with Edmonton pharmacies to offer same-day and scheduled prescription home delivery. If your pharmacy is looking for a reliable, healthcare-trained delivery team, we'd love to talk.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/partner" className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">
                    Register Your Pharmacy <ArrowRight size={14} />
                  </Link>
                  <a href="tel:7808070000" className="inline-flex items-center justify-center gap-2 border border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] font-bold px-6 py-3 rounded-xl text-sm hover:bg-white transition-all">
                    <Phone size={14} /> (780) 807-0000
                  </a>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: CheckCircle, text: "Same-day prescription delivery across Edmonton" },
                  { icon: Package, text: "Cold-chain handling for temperature-sensitive medications" },
                  { icon: CheckCircle, text: "Chain of custody documentation on every delivery" },
                  { icon: CheckCircle, text: "Shipday-integrated dispatch and real-time tracking" },
                  { icon: CheckCircle, text: "Background-checked, specialist-trained couriers" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-[var(--color-border)]">
                    <Icon size={14} className="text-[var(--color-brand-blue)] flex-shrink-0" />
                    <p className="text-sm text-[var(--color-text)]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient delivery CTA */}
      <section className="py-12 bg-[#F8FAFC] border-y border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[var(--color-brand-blue)] mb-1">For Patients</p>
              <h3 className="text-xl font-black text-[var(--color-text)]">Need your prescription delivered home?</h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">Ask your pharmacist about same-day delivery through Speedo Medical Couriers, or book directly.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/book" className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[var(--color-brand-blue-dark)] transition-all">
                Book Delivery <ArrowRight size={13} />
              </Link>
              <a href="tel:7808070000" className="inline-flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] font-bold px-5 py-2.5 rounded-xl text-sm hover:border-[var(--color-brand-blue)] transition-all">
                <Phone size={13} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[var(--color-text)] mb-8">Edmonton Pharmacy FAQs</h2>
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

      {/* Related directories */}
      <section className="py-10 bg-[#F8FAFC] border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-black text-[var(--color-text)] mb-4">Related Edmonton Healthcare Resources</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Edmonton Hospitals Directory", href: "/hospitals" },
              { label: "Medical Courier Services", href: "/services" },
              { label: "Same-Day Delivery Pricing", href: "/pricing" },
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
