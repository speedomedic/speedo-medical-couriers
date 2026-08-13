"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Phone, Shield, CheckCircle, Clock, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* CSS entrance animations — reliable across React lifecycles */
const fadeUp = (delay: number, extra = "") =>
  ({
    style: {
      animation: `vh-fade-up 0.65s ease both`,
      animationDelay: `${delay}ms`,
      ...extra ? { animationName: extra } : {},
    },
  } as React.HTMLAttributes<HTMLElement>);

export default function VideoHero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* GSAP only for scroll-driven parallax — no entrance tweens */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".vh-video-wrap", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".vh-scroll-ind", {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=180 top",
          end: "top+=380 top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes vh-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vh-fade-right {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes vh-pop {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "100svh" }}
      >
        {/* ── Video layer ── */}
        <div className="vh-video-wrap absolute inset-0" style={{ transform: "scale(1.18)", transformOrigin: "center center" }}>
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=85"
          >
            <source
              src="https://videos.pexels.com/video-files/8926166/8926166-hd_1280_720_25fps.mp4"
              type="video/mp4"
            />
          </video>

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(125deg, rgba(13,27,62,0.95) 0%, rgba(13,27,62,0.82) 40%, rgba(27,111,235,0.28) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: "linear-gradient(to top, rgba(255,255,255,0.08), transparent)" }}
          />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 lg:pt-40 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* LEFT — copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 mb-7 border border-white/25 bg-white/10 backdrop-blur-sm text-white text-[11px] font-black uppercase tracking-[0.12em] px-4 py-2.5 rounded-full"
                style={{ animation: "vh-fade-up 0.55s 100ms ease both" }}
              >
                <span className="w-2 h-2 rounded-full bg-[#E5191E] animate-pulse" />
                Edmonton&apos;s Dedicated Medical Courier
              </div>

              <h1 className="text-[64px] lg:text-[88px] xl:text-[108px] font-black leading-[0.98] tracking-tight mb-6">
                <span
                  className="block text-white"
                  style={{ animation: "vh-fade-up 0.65s 250ms ease both" }}
                >
                  Medical Delivery.
                </span>
                <span
                  className="block"
                  style={{
                    animation: "vh-fade-up 0.65s 370ms ease both",
                    backgroundImage: "linear-gradient(130deg, #60a5fa 0%, #93c5fd 60%, #bfdbfe 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Done Right.
                </span>
              </h1>

              <p
                className="text-white/72 text-lg leading-relaxed mb-9 max-w-[480px]"
                style={{ animation: "vh-fade-up 0.6s 500ms ease both" }}
              >
                Trusted by pharmacies, hospitals, clinics &amp; labs across Edmonton
                and surrounding communities. On-time. Compliant. 365 days a year.
              </p>

              <div
                className="flex flex-wrap gap-3 mb-9"
                style={{ animation: "vh-fade-up 0.5s 640ms ease both" }}
              >
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-8 py-4 rounded-full text-base transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
                >
                  Get a Free Quote <ArrowRight size={16} />
                </Link>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-white/12 hover:bg-white/22 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full text-base transition-all border border-white/25"
                >
                  Book a Pickup
                </Link>
                <a
                  href="tel:7808070000"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold px-4 py-4 text-base transition-colors"
                >
                  <Phone size={15} /> 780-807-0000
                </a>
              </div>

              {/* Trust pills */}
              <div
                className="flex flex-wrap gap-2.5"
                style={{ animation: "vh-pop 0.4s 800ms ease both" }}
              >
                {[
                  { icon: Shield,       label: "Bonded & Insured" },
                  { icon: CheckCircle,  label: "Background Checked" },
                  { icon: Clock,        label: "7 Days a Week" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/18 text-white/88 text-sm font-medium px-4 py-2 rounded-full"
                  >
                    <Icon size={13} className="text-blue-300" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — glassmorphism delivery card */}
            <div
              className="hidden lg:block space-y-3"
              style={{ animation: "vh-fade-right 0.85s 300ms ease both" }}
            >
              {/* Live delivery card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/55 text-[11px] font-bold uppercase tracking-widest mb-1">
                      Live Delivery
                    </p>
                    <p className="text-white font-bold text-lg">Order #SMC-2847</p>
                  </div>
                  <span className="flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    In Transit
                  </span>
                </div>

                <div className="bg-white/8 rounded-xl p-4 mb-4">
                  <svg viewBox="0 0 280 90" className="w-full">
                    <path d="M 30 70 Q 80 50 140 40 Q 190 32 250 18" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeDasharray="5 4" />
                    <path d="M 30 70 Q 80 50 140 40 Q 168 35 178 30" stroke="#60a5fa" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <circle cx="30" cy="70" r="6" fill="#E5191E" />
                    <circle cx="30" cy="70" r="11" fill="#E5191E" fillOpacity="0.2" />
                    <text x="44" y="74" fontSize="8" fill="rgba(255,255,255,0.7)" fontWeight="600">McKnight Rx</text>
                    <circle cx="178" cy="30" r="8" fill="white" fillOpacity="0.15" stroke="#60a5fa" strokeWidth="2" />
                    <circle cx="178" cy="30" r="4" fill="#60a5fa" />
                    <circle cx="250" cy="18" r="6" fill="#F59E0B" />
                    <circle cx="250" cy="18" r="11" fill="#F59E0B" fillOpacity="0.2" />
                    <text x="200" y="15" fontSize="8" fill="rgba(255,255,255,0.7)" fontWeight="600">Patient Home</text>
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/8 rounded-xl p-3">
                    <p className="text-white/45 text-[10px] font-bold uppercase tracking-wider mb-1">Driver</p>
                    <p className="text-white text-sm font-bold">Raj K.</p>
                  </div>
                  <div className="bg-white/8 rounded-xl p-3">
                    <p className="text-white/45 text-[10px] font-bold uppercase tracking-wider mb-1">ETA</p>
                    <p className="text-blue-300 text-sm font-bold">~18 min</p>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "500+",  label: "Deliveries" },
                  { val: "99.8%", label: "On-Time" },
                  { val: "24/7",  label: "Dispatch" },
                ].map(({ val, label }) => (
                  <div key={label} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-white mb-0.5">{val}</p>
                    <p className="text-white/50 text-xs font-medium">{label}</p>
                  </div>
                ))}
              </div>

              {/* Compliance badge */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B6FEB] flex items-center justify-center flex-shrink-0">
                  <Truck size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Bonded &amp; Insured</p>
                  <p className="text-white/50 text-xs">Fully insured · Chain of custody documented</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="vh-scroll-ind absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>
    </>
  );
}
