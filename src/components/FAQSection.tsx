"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "How fast can you pick up?",
    a: "For STAT / same-day rush orders, we dispatch within 60 minutes of confirmation. Standard orders are scheduled for your preferred time window — morning, afternoon, or evening. Call us at (780) 807-0000 and we'll give you an honest ETA.",
  },
  {
    q: "Do you serve patients, or just pharmacies and clinics?",
    a: "Both! We deliver directly to patients' homes from their pharmacy, and we also run routes between medical facilities (pharmacy → clinic, clinic → lab, hospital → patient, etc.). If a medical package needs to move in Edmonton, we handle it.",
  },
  {
    q: "Can we set up a recurring delivery account for our clinic?",
    a: "Absolutely — recurring accounts are our specialty. Many Edmonton clinics and pharmacies have daily or weekly route pickups with us. We build a custom schedule around your volume, and you get a dedicated contact so you're never starting from scratch. Visit our For Business page or call us to get set up.",
    link: { label: "Set up a business account →", href: "/business" },
  },
  {
    q: "How does tracking work?",
    a: "Every order is created in Shipday — our professional dispatch platform. You receive a confirmation with your order number (SMC-XXXXXXXXXX) and a live tracking link. You can also visit our Track page and enter your order number to see real-time driver location and ETA.",
    link: { label: "Track a delivery →", href: "/track" },
  },
  {
    q: "Do you handle temperature-sensitive medications?",
    a: "Yes. We have validated cold-chain packaging for medications requiring 2–8°C refrigeration (vaccines, biologics, insulin, etc.) and frozen transport. Our couriers are trained on cold-chain protocols and can carry temperature loggers on request.",
  },
  {
    q: "Is your service available on weekends and holidays?",
    a: "We operate 7 days a week, 365 days a year — including statutory holidays. Healthcare doesn't stop on Christmas, and neither do we. Weekend and holiday pickups are available at standard rates.",
  },
  {
    q: "What areas do you cover?",
    a: "We serve Edmonton and all surrounding communities — St. Albert, Sherwood Park, Leduc, Spruce Grove, Fort Saskatchewan, Beaumont, and Red Deer. If you're unsure whether we reach you, just call and we'll confirm in 30 seconds.",
    link: { label: "View service area →", href: "/service-area" },
  },
  {
    q: "How much does a delivery cost?",
    a: "Pricing depends on service type and distance. Prescription deliveries start around $35, specimen transport around $55, and STAT/rush orders around $85. We don't publish a fixed rate card because we'd rather give you an accurate quote. Fill out our quote form — takes 2 minutes.",
    link: { label: "Get a free quote →", href: "/quote" },
  },
  {
    q: "Are your couriers background-checked and insured?",
    a: "Yes. All Speedo couriers undergo criminal record checks before joining our team. We carry full commercial liability insurance, and we're bonded. Every delivery comes with chain-of-custody documentation.",
  },
  {
    q: "Can I speak to a real person?",
    a: "Always. We answer our phone. Call (780) 807-0000 and you'll reach a human — not a voicemail system. You can also WhatsApp us, email, or use the contact form. We typically respond within minutes during business hours.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-badge mx-auto mb-4">✦ Common Questions</div>
          <h2 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-4">
            Answers to the Questions<br />
            <span className="text-[var(--color-brand-blue)]">We Hear Every Day</span>
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
            Straight answers. No runaround. If you don't see your question here, just call us.
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-sm">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white hover:bg-[var(--color-bg-subtle)] transition-colors">
              <button
                className="w-full flex items-start gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="w-6 h-6 rounded-full bg-[var(--color-brand-blue-pale)] text-[var(--color-brand-blue)] text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="flex-1 font-bold text-[var(--color-text)] text-base leading-snug pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 mt-0.5 text-[var(--color-text-muted)] transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>

              {open === i && (
                <div className="px-6 pb-5 pl-16">
                  <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">{faq.a}</p>
                  {faq.link && (
                    <Link
                      href={faq.link.href}
                      className="inline-flex items-center gap-1.5 text-[var(--color-brand-blue)] font-semibold text-sm mt-3 hover:gap-2 transition-all"
                    >
                      {faq.link.label} <ArrowRight size={13} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-[var(--color-text-muted)] mb-4">Still have questions?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="tel:7808070000"
              className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] text-white font-bold px-6 py-3 rounded-xl hover:bg-[var(--color-brand-blue-dark)] transition-colors text-sm"
            >
              Call (780) 807-0000
            </a>
            <a
              href="https://wa.me/17808070000?text=Hi%2C%20I%20have%20a%20question%20about%20Speedo%20Medical%20Couriers."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
