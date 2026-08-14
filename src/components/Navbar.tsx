"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Partner", href: "/partner" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Track", href: "/track" },
  { label: "Portal", href: "/portal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <div
        className={`w-full max-w-5xl pointer-events-auto transition-all duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-md rounded-2xl shadow-[0_4px_24px_rgba(13,27,62,0.12)] border border-[var(--color-border)]"
            : "bg-white rounded-2xl shadow-[0_4px_24px_rgba(13,27,62,0.10)] border border-[var(--color-border-light)]"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo-horizontal-transparent.png"
              alt="Speedo Medical Couriers"
              width={180}
              height={54}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-muted)] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:7808070000"
              className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <Phone size={13} />
              (780) 807-0000
            </a>
            <Link
              href="/book"
              className="bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25"
            >
              Book a Pickup
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-muted)] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-[var(--color-border)] px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-pale)] rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
              <a
                href="tel:7808070000"
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-muted)]"
              >
                <Phone size={13} />
                (780) 807-0000
              </a>
              <Link
                href="/book"
                className="block text-center bg-[var(--color-brand-blue)] text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors hover:bg-[var(--color-brand-blue-dark)]"
                onClick={() => setOpen(false)}
              >
                Book a Pickup
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
