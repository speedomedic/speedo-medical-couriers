"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Calendar } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 transition-all duration-500 lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[var(--color-brand-navy)] border-t border-white/10 px-4 py-3 flex gap-3 items-center safe-area-pb">
        <a
          href="tel:7808070000"
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm py-3 rounded-xl transition-colors border border-white/20"
        >
          <Phone size={15} /> Call Us
        </a>
        <Link
          href="/book"
          className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30"
        >
          <Calendar size={15} /> Book a Pickup
        </Link>
      </div>
    </div>
  );
}
