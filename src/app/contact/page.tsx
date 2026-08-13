"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

const contactInfo = [
  { icon: <Phone size={18} />, label: "Phone", value: "(780) 807-0000", href: "tel:7808070000" },
  { icon: <Mail size={18} />, label: "Email", value: "speedomedical@gmail.com", href: "mailto:speedomedical@gmail.com" },
  { icon: <MapPin size={18} />, label: "Location", value: "Edmonton, AB, Canada", href: undefined },
  { icon: <Clock size={18} />, label: "Hours", value: "7 Days a Week, All Hours", href: undefined },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", org: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D1B3E 0%, #1A3464 55%, #1B6FEB 140%)" }}
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/15">
            ✦ Get in Touch
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">
            We Actually<br /><span className="text-amber-400">Answer the Phone.</span>
          </h1>
          <p className="text-white/65 text-xl max-w-xl mx-auto">
            Questions, recurring accounts, one-off bookings — whatever you need, a real person is on the other end.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[var(--color-bg)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 mb-10 lg:mb-0">
              <h2 className="text-xl font-bold text-[var(--color-brand-navy)] mb-6">Contact Information</h2>
              <div className="space-y-5">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-blue-pale)] text-[var(--color-brand-blue)] flex items-center justify-center flex-shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider mb-0.5">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-[var(--color-brand-navy)] font-semibold hover:text-[var(--color-brand-blue)] transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-[var(--color-brand-navy)] font-semibold">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-[var(--color-brand-navy)] rounded-2xl p-6 text-white">
                <p className="font-bold text-lg mb-2">Prefer to call?</p>
                <p className="text-white/60 text-sm mb-4">For urgent or same-day requests, calling is the fastest way to dispatch a driver.</p>
                <a
                  href="tel:7808070000"
                  className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  <Phone size={14} />
                  (780) 807-0000
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 shadow-[var(--shadow-card)]">
                <h2 className="text-xl font-bold text-[var(--color-brand-navy)] mb-6">Send Us a Message</h2>

                {status === "success" ? (
                  <div className="text-center py-12">
                    <CheckCircle size={48} className="text-[var(--color-accent)] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[var(--color-brand-navy)] mb-2">Message Sent!</h3>
                    <p className="text-[var(--color-text-muted)]">We'll get back to you within a few hours.</p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm text-[var(--color-brand-blue)] underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                          Your Name <span className="text-[var(--color-brand-red)]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Jane Smith"
                          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent text-sm bg-[var(--color-bg)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                          Organization
                        </label>
                        <input
                          type="text"
                          value={form.org}
                          onChange={(e) => setForm({ ...form, org: e.target.value })}
                          placeholder="Pharmacy / Clinic / Hospital"
                          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent text-sm bg-[var(--color-bg)]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                          Email <span className="text-[var(--color-brand-red)]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent text-sm bg-[var(--color-bg)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="(780) 555-0000"
                          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent text-sm bg-[var(--color-bg)]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                        Message <span className="text-[var(--color-brand-red)]">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your delivery needs, volume, schedule, or any questions..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent text-sm bg-[var(--color-bg)] resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-[var(--color-destructive)] bg-red-50 rounded-lg px-4 py-2">
                        Something went wrong. Please try again or call us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        <>
                          Send Message <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
