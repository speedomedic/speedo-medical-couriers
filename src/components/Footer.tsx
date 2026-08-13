import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const serviceLinks = [
  { label: "Prescription Delivery", href: "/services#rx" },
  { label: "Specimen Transport", href: "/services#specimens" },
  { label: "Medical Equipment", href: "/services#equipment" },
  { label: "Same-Day Rush", href: "/services#rush" },
  { label: "Medical Documents", href: "/services#documents" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Service Area", href: "/service-area" },
  { label: "Book a Pickup", href: "/book" },
  { label: "Track Delivery", href: "/track" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo-horizontal-transparent.png"
              alt="Speedo Medical Couriers"
              width={180}
              height={54}
              className="h-10 w-auto object-contain brightness-0 invert mb-4"
            />
            <p className="text-white/55 text-sm leading-relaxed mt-3 max-w-xs">
              Edmonton's dedicated medical courier — precision delivery for pharmacies, hospitals, clinics, and labs, 7 days a week.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm">
              <a href="tel:7808070000" className="flex items-center gap-2.5 text-white/65 hover:text-white transition-colors group">
                <span className="w-7 h-7 rounded-lg bg-[var(--color-brand-blue)]/20 flex items-center justify-center group-hover:bg-[var(--color-brand-blue)]/40 transition-colors flex-shrink-0">
                  <Phone size={13} className="text-[var(--color-brand-blue-light)]" />
                </span>
                (780) 807-0000
              </a>
              <a href="mailto:speedomedical@gmail.com" className="flex items-center gap-2.5 text-white/65 hover:text-white transition-colors group">
                <span className="w-7 h-7 rounded-lg bg-[var(--color-brand-blue)]/20 flex items-center justify-center group-hover:bg-[var(--color-brand-blue)]/40 transition-colors flex-shrink-0">
                  <Mail size={13} className="text-[var(--color-brand-blue-light)]" />
                </span>
                speedomedical@gmail.com
              </a>
              <span className="flex items-start gap-2.5 text-white/65">
                <span className="w-7 h-7 rounded-lg bg-[var(--color-brand-blue)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={13} className="text-[var(--color-brand-blue-light)]" />
                </span>
                Edmonton, AB, Canada
              </span>
              <span className="flex items-center gap-2.5 text-white/65">
                <span className="w-7 h-7 rounded-lg bg-[var(--color-brand-blue)]/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={13} className="text-[var(--color-brand-blue-light)]" />
                </span>
                7 Days a Week, 365 Days a Year
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/35 mb-5">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight size={10} className="text-[var(--color-brand-blue-light)] opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/35 mb-5">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight size={10} className="text-[var(--color-brand-blue-light)] opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/35 mb-5">Get Started</h3>
            <p className="text-sm text-white/55 mb-5 leading-relaxed">
              Ready to simplify your medical deliveries? Book online or give us a call — we respond within minutes.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white text-sm font-semibold px-5 py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/20"
            >
              Book a Pickup
              <ArrowRight size={14} />
            </Link>
            <div className="mt-4 space-y-2">
              <Link href="/quote" className="block text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4">
                Get a Free Quote
              </Link>
              <Link href="/track" className="block text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4">
                Track Your Delivery
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-2">
              {["Privacy Protected", "Bonded & Insured", "Background Checked", "7-Day Service"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-[10px] text-white/40 font-medium">
                  <span className="w-1 h-1 rounded-full bg-[var(--color-brand-blue-light)]" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/35">
          <p>© {new Date().getFullYear()} Speedo Medical Couriers. All rights reserved.</p>
          <p>Edmonton · St. Albert · Sherwood Park · Leduc · Spruce Grove · Fort Saskatchewan · Beaumont · Red Deer</p>
        </div>
      </div>
    </footer>
  );
}
