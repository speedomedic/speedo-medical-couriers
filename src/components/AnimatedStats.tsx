"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500,  suffix: "+",  label: "Deliveries",   sub: "Completed", decimals: 0 },
  { value: 50,   suffix: "+",  label: "Healthcare",    sub: "Partners",  decimals: 0 },
  { value: 99.8, suffix: "%",  label: "On-Time",       sub: "Rate",      decimals: 1 },
  { value: 7,    suffix: "",   label: "Days",          sub: "Per Week",  decimals: 0 },
];

export default function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".astat-item", {
        opacity: 0, y: 40, duration: 0.7,
        stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });

      ref.current?.querySelectorAll<HTMLElement>(".astat-num").forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const decimals = parseInt(el.dataset.decimals ?? "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2.2, ease: "power2.out",
          onUpdate() { el.textContent = obj.val.toFixed(decimals) + suffix; },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: "#0D1B3E" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-900/20 blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-white/35 text-[11px] font-black uppercase tracking-[0.2em] mb-14">
          The Numbers Behind Every Delivery
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`astat-item px-6 py-6 text-center ${i < stats.length - 1 ? "border-r border-white/10" : ""}`}
            >
              <p
                className="astat-num text-[68px] lg:text-[92px] xl:text-[104px] font-black text-white leading-none tabular-nums mb-4"
                data-target={s.value}
                data-suffix={s.suffix}
                data-decimals={s.decimals}
              >
                {s.value}{s.suffix}
              </p>
              <p className="text-white/90 font-bold text-base lg:text-lg mb-0.5">{s.label}</p>
              <p className="text-white/35 text-sm">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
