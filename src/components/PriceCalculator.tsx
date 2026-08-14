"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Minus, Plus } from "lucide-react";

const BUSINESS_TYPES = [
  { id: "pharmacy", label: "Pharmacy" },
  { id: "clinic", label: "Clinic / Physician" },
  { id: "lab", label: "Diagnostic Lab" },
  { id: "ltc", label: "Long-Term Care" },
  { id: "homehealth", label: "Home Health Agency" },
  { id: "other", label: "Other" },
];

const ZONES = [
  { id: "edmonton", label: "Edmonton", sub: "Anywhere within Edmonton city limits", base: 20 },
  { id: "suburbs", label: "St. Albert / Sherwood Park", sub: "All communities", base: 28 },
  { id: "outer", label: "Leduc / Beaumont / Spruce Grove / Fort Sask", sub: "Outer region", base: 35 },
];

const ADDONS = [
  { id: "coldchain", label: "Cold-chain carrier", sub: "Vaccines, biologics, insulin", price: 5 },
  { id: "biohazard", label: "Biohazard specimen kit", sub: "Blood, urine, tissue samples", price: 8 },
  { id: "signature", label: "Signature + ID verification", sub: "Controlled substances, narcotics", price: 5 },
];

function volumeDiscount(monthly: number): number {
  if (monthly >= 100) return 0.28;
  if (monthly >= 50) return 0.22;
  if (monthly >= 20) return 0.15;
  if (monthly >= 10) return 0.10;
  return 0;
}

function Counter({ value, onChange, min = 1, max = 100 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] transition-all"
        aria-label="Decrease"
      >
        <Minus size={14} />
      </button>
      <span className="w-12 text-center text-xl font-black text-[var(--color-text)]">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-9 h-9 rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] transition-all"
        aria-label="Increase"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export default function PriceCalculator() {
  const [bizType, setBizType] = useState("pharmacy");
  const [deliveriesPerWeek, setDeliveriesPerWeek] = useState(5);
  const [zone, setZone] = useState("edmonton");
  const [addons, setAddons] = useState<string[]>([]);
  const [afterHours, setAfterHours] = useState(false);
  const [stat, setStat] = useState(false);

  const toggleAddon = (id: string) =>
    setAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);

  const calc = useMemo(() => {
    const selectedZone = ZONES.find((z) => z.id === zone)!;
    const baseRate = selectedZone.base;
    const addonTotal = addons.reduce((sum, id) => {
      const a = ADDONS.find((a) => a.id === id);
      return sum + (a?.price ?? 0);
    }, 0);
    const afterHoursAdd = afterHours ? 15 : 0;
    const statAdd = stat ? 25 : 0;

    const perDelivery = baseRate + addonTotal + afterHoursAdd + statAdd;
    const monthlyDeliveries = Math.round(deliveriesPerWeek * 4.3);
    const onDemandMonthly = perDelivery * monthlyDeliveries;
    const discount = volumeDiscount(monthlyDeliveries);
    const routeMonthly = Math.round(onDemandMonthly * (1 - discount));
    const savings = onDemandMonthly - routeMonthly;

    return { perDelivery, monthlyDeliveries, onDemandMonthly, routeMonthly, savings, discount };
  }, [zone, addons, afterHours, stat, deliveriesPerWeek]);

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-xl shadow-black/5 overflow-hidden">
      <div className="bg-[var(--color-brand-navy)] px-8 py-6">
        <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-1">Rate Calculator</p>
        <h3 className="text-2xl font-black text-white">Estimate your monthly cost</h3>
        <p className="text-white/60 text-sm mt-1">Adjust the inputs below — your estimate updates instantly.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px]">
        {/* ── Inputs ─────────────────────────────── */}
        <div className="p-8 space-y-8 border-r border-[var(--color-border)]">

          {/* Business type */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Business type
            </label>
            <div className="flex flex-wrap gap-2">
              {BUSINESS_TYPES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBizType(b.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    bizType === b.id
                      ? "bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)] text-white"
                      : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)]"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Deliveries per week */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Deliveries per week
            </label>
            <Counter value={deliveriesPerWeek} onChange={setDeliveriesPerWeek} min={1} max={100} />
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              ≈ {calc.monthlyDeliveries} deliveries/month
            </p>
          </div>

          {/* Zone */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Primary delivery zone
            </label>
            <div className="space-y-2">
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setZone(z.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                    zone === z.id
                      ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-brand-blue)]/40"
                  }`}
                >
                  <div>
                    <p className={`text-sm font-bold ${zone === z.id ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text)]"}`}>
                      {z.label}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">{z.sub}</p>
                  </div>
                  <span className={`text-sm font-black flex-shrink-0 ml-4 ${zone === z.id ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text-muted)]"}`}>
                    from ${z.base}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Cargo requirements
            </label>
            <div className="space-y-2">
              {ADDONS.map((a) => {
                const selected = addons.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAddon(a.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                      selected
                        ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)]"
                        : "border-[var(--color-border)] hover:border-[var(--color-brand-blue)]/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        selected ? "bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)]" : "border-[var(--color-border)]"
                      }`}>
                        {selected && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${selected ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text)]"}`}>
                          {a.label}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">{a.sub}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-black flex-shrink-0 ml-4 ${selected ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text-muted)]"}`}>
                      +${a.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggles */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Delivery timing
            </label>
            <div className="space-y-2">
              {[
                { id: "afterhours", label: "After-hours deliveries", sub: "8 pm – 7 am", price: "+$15", value: afterHours, set: setAfterHours },
                { id: "stat", label: "STAT / urgent pickups", sub: "Guaranteed < 60 min", price: "+$25", value: stat, set: setStat },
              ].map(({ id, label, sub, price, value, set }) => (
                <button
                  key={id}
                  onClick={() => set((v) => !v)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                    value
                      ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-brand-blue)]/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      value ? "bg-[var(--color-brand-blue)] border-[var(--color-brand-blue)]" : "border-[var(--color-border)]"
                    }`}>
                      {value && <CheckCircle size={12} className="text-white" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${value ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text)]"}`}>{label}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{sub}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-black flex-shrink-0 ml-4 ${value ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text-muted)]"}`}>
                    {price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results panel ───────────────────────── */}
        <div className="p-8 bg-[#F8FAFC] flex flex-col gap-6">

          {/* Per delivery */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Per delivery</p>
            <p className="text-4xl font-black text-[var(--color-text)]">{fmt(calc.perDelivery)}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">on-demand, pay-per-run</p>
          </div>

          {/* Monthly on-demand */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
              Monthly — on-demand
            </p>
            <p className="text-3xl font-black text-[var(--color-text)]">{fmt(calc.onDemandMonthly)}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {calc.monthlyDeliveries} deliveries × {fmt(calc.perDelivery)}
            </p>
          </div>

          {/* Scheduled route */}
          <div className="bg-[var(--color-brand-blue)] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/10 -translate-y-10 translate-x-10" />
            <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-1">
              Monthly — scheduled route
            </p>
            <p className="text-3xl font-black text-white">{fmt(calc.routeMonthly)}</p>
            <p className="text-xs text-white/60 mt-1">
              {Math.round(calc.discount * 100)}% volume discount applied
            </p>
            {calc.savings > 0 && (
              <div className="mt-3 inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Save {fmt(calc.savings)}/month vs on-demand
              </div>
            )}
          </div>

          {/* Breakdown */}
          {(addons.length > 0 || afterHours || stat) && (
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
              <p className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Cost breakdown</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Base rate ({ZONES.find(z => z.id === zone)?.label})</span>
                  <span className="font-semibold text-[var(--color-text)]">${ZONES.find(z => z.id === zone)?.base}</span>
                </div>
                {addons.map((id) => {
                  const a = ADDONS.find((a) => a.id === id)!;
                  return (
                    <div key={id} className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">{a.label}</span>
                      <span className="font-semibold text-[var(--color-text)]">+${a.price}</span>
                    </div>
                  );
                })}
                {afterHours && (
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">After-hours</span>
                    <span className="font-semibold text-[var(--color-text)]">+$15</span>
                  </div>
                )}
                {stat && (
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">STAT rush</span>
                    <span className="font-semibold text-[var(--color-text)]">+$25</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[var(--color-border)] font-black">
                  <span className="text-[var(--color-text)]">Per delivery total</span>
                  <span className="text-[var(--color-brand-blue)]">{fmt(calc.perDelivery)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2 mt-auto">
            <p className="text-xs text-[var(--color-text-muted)] text-center leading-relaxed">
              Shows on-demand rates. Contracted pharmacy &amp; LTC routes start from $9/delivery — lower than what the calculator shows.
            </p>
            <Link
              href="/partner"
              className="flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25"
            >
              Get my exact quote <ArrowRight size={14} />
            </Link>
            <a
              href="tel:7808070000"
              className="flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] font-semibold px-6 py-3 rounded-2xl text-sm transition-all"
            >
              Call (780) 807-0000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
