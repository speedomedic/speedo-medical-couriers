"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Michael T.", role: "Pharmacy Manager", company: "McKnight Pharmacy",
    quote: "Speedo has become indispensable to our operation. Their couriers are professional, punctual, and we've had zero patient complaints since switching.",
    stars: 5, color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Dr. Priya S.", role: "Clinic Director", company: "Glenora Medical Centre",
    quote: "We switched from a general courier and the difference was night and day. They truly understand medical urgency — it shows in every delivery.",
    stars: 5, color: "from-violet-500 to-purple-600",
  },
  {
    name: "Jason K.", role: "Lab Manager", company: "Edmonton Diagnostic Labs",
    quote: "Specimen integrity is everything in our field. Speedo's specialist handling and cold-chain protocols gives us complete confidence on every run.",
    stars: 5, color: "from-teal-500 to-emerald-600",
  },
  {
    name: "Sarah M.", role: "Patient", company: "Edmonton",
    quote: "My medications arrived same-day, on time. The driver was courteous and kept me updated the whole way. Genuinely impressed.",
    stars: 5, color: "from-rose-500 to-pink-600",
  },
  {
    name: "Linda R.", role: "Office Manager", company: "Westmount Family Clinic",
    quote: "Reliable, responsive, and they genuinely care about healthcare outcomes. Over a year of daily service — not a single missed delivery.",
    stars: 5, color: "from-amber-500 to-orange-500",
  },
  {
    name: "Dr. Ahmed N.", role: "Cardiologist", company: "Kaye Edmonton Clinic",
    quote: "Real-time tracking means patients know exactly when to expect their delivery. It's reduced our front-desk call volume dramatically.",
    stars: 5, color: "from-sky-500 to-blue-600",
  },
];

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setActive(idx);
    setTimeout(() => setAnimating(false), 400);
  }, [animating]);

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = useCallback(() => goTo((active + 1) % testimonials.length), [active, goTo]);

  useEffect(() => {
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[active];

  return (
    <div>
      {/* Featured large card */}
      <div
        className="relative max-w-3xl mx-auto bg-white rounded-3xl border border-[var(--color-border)] shadow-xl p-8 lg:p-12 text-center transition-all duration-400"
        style={{ opacity: animating ? 0.6 : 1, transform: animating ? "translateY(4px)" : "translateY(0)" }}
      >
        {/* Quote icon */}
        <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-blue-pale)] flex items-center justify-center mx-auto mb-6">
          <Quote size={22} className="text-[var(--color-brand-blue)]" />
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-5">
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote text */}
        <blockquote className="text-xl lg:text-2xl font-medium text-[var(--color-text)] leading-relaxed mb-8">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-center gap-4 pt-6 border-t border-[var(--color-border)]">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-lg font-black flex-shrink-0`}
          >
            {t.name[0]}
          </div>
          <div className="text-left">
            <p className="font-bold text-[var(--color-text)]">{t.name}</p>
            <p className="text-sm text-[var(--color-text-muted)]">
              {t.role} &middot; {t.company}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 mt-8">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-white hover:bg-[var(--color-brand-blue)] hover:border-[var(--color-brand-blue)] hover:text-white text-[var(--color-text-muted)] flex items-center justify-center transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-7 bg-[var(--color-brand-blue)]"
                  : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-brand-blue-pale)]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-white hover:bg-[var(--color-brand-blue)] hover:border-[var(--color-brand-blue)] hover:text-white text-[var(--color-text-muted)] flex items-center justify-center transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* All reviewer avatars */}
      <div className="flex justify-center gap-3 mt-6">
        {testimonials.map((person, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-9 h-9 rounded-full bg-gradient-to-br ${person.color} flex items-center justify-center text-white text-xs font-black transition-all ${
              i === active ? "ring-2 ring-[var(--color-brand-blue)] ring-offset-2 scale-110" : "opacity-50 hover:opacity-75"
            }`}
          >
            {person.name[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
