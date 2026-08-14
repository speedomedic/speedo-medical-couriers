"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Building2, Pill } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Partner", href: "/partner" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Track", href: "/track" },
  { label: "Portal", href: "/portal" },
];

const directoryLinks = [
  { label: "Hospitals", href: "/hospitals", icon: Building2, desc: "Edmonton hospital directory" },
  { label: "Pharmacies", href: "/pharmacies", icon: Pill, desc: "Edmonton pharmacy directory" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dirOpen, setDirOpen] = useState(false);
  const dirRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dirRef.current && !dirRef.current.contains(e.target as Node)) {
        setDirOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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

            {/* Directory dropdown */}
            <div ref={dirRef} className="relative">
              <button
                onClick={() => setDirOpen((v) => !v)}
                className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  dirOpen
                    ? "text-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-muted)]"
                }`}
              >
                Directory
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${dirOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dirOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[var(--color-border)] overflow-hidden z-10">
                  {directoryLinks.map(({ label, href, icon: Icon, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setDirOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-brand-blue-pale)] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-blue-pale)] group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon size={14} className="text-[var(--color-brand-blue)]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-brand-blue)] transition-colors">{label}</p>
                        <p className="text-[11px] text-[var(--color-text-muted)]">{desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
            {/* Directory group in mobile */}
            <div className="pt-1">
              <p className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">Directory</p>
              {directoryLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-pale)] rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Icon size={13} className="text-[var(--color-brand-blue)]" />
                  {label}
                </Link>
              ))}
            </div>
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
