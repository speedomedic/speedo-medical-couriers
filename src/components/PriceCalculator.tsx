"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Minus, Plus } from "lucide-react";

const BASE_RATE  = 16;    // $16 base
const PER_KM     = 0.90;  // $0.90/km
const STAT_FEE   = 25;    // STAT surcharge
const EXTRA_STOP = 10;    // extra pickup stop

const BUSINESS_TYPES = [
  { id: "pharmacy",   label: "Pharmacy" },
  { id: "clinic",     label: "Clinic / Physician" },
  { id: "lab",        label: "Diagnostic Lab" },
  { id: "ltc",        label: "Long-Term Care" },
  { id: "homehealth", label: "Home Health Agency" },
  { id: "other",      label: "Other" },
];

const ADDONS = [
  { id: "coldchain", label: "Cold-chain carrier", sub: "Vaccines, biologics, insulin", price: 5 },
  { id: "biohazard", label: "Biohazard specimen kit", sub: "Blood, urine, tissue samples", price: 8 },
  { id: "signature", label: "Signature + ID verification", sub: "Controlled substances, narcotics", price: 5 },
];

function volumeDiscount(monthly: number): number {
  if (monthly >= 100) return 0.28;
  if (monthly >= 50)  return 0.22;
  if (monthly >= 20)  return 0.15;
  if (monthly >= 10)  return 0.10;
  return 0;
}

function Counter({ value, onChange, min = 1, max = 100 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] transition-all"
        aria-label="Decrease"
      ><Minus size={14} /></button>
      <span className="w-12 text-center text-xl font-black text-[var(--color-text)]">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-9 h-9 rounded-xl border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] transition-all"
        aria-label="Increase"
      ><Plus size={14} /></button>
    </div>
  );
}

export default function PriceCalculator() {
  const [bizType,          setBizType]          = useState("pharmacy");
  const [deliveriesPerWeek,setDeliveriesPerWeek] = useState(5);
  const [distanceKm,       setDistanceKm]        = useState(10);
  const [addons,           setAddons]            = useState<string[]>([]);
  const [afterHours,       setAfterHours]        = useState(false);
  const [stat,             setStat]              = useState(false);

  const toggleAddon = (id: string) =>
    setAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);

  const calc = useMemo(() => {
    const km          = Math.max(1, distanceKm);
    const baseKm      = BASE_RATE + PER_KM * km;
    const addonTotal  = addons.reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0), 0);
    const statAdd     = stat ? STAT_FEE : 0;
    const afterAdd    = afterHours ? 15 : 0;
    const perDelivery = baseKm + addonTotal + statAdd + afterAdd;

    const monthlyDeliveries = Math.round(deliveriesPerWeek * 4.3);
    const onDemandMonthly   = perDelivery * monthlyDeliveries;
    const discount          = volumeDiscount(monthlyDeliveries);
    const routeMonthly      = Math.round(onDemandMonthly * (1 - discount));
    const savings           = onDemandMonthly - routeMonthly;

    return { perDelivery, monthlyDeliveries, onDemandMonthly, routeMonthly, savings, discount, km, baseKm };
  }, [distanceKm, addons, afterHours, stat, deliveriesPerWeek]);

  const fmt = (n: number) => `$${n % 1 === 0 ? Math.round(n).toLocaleString() : n.toFixed(2)}`;

  return (
    <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-xl shadow-black/5 overflow-hidden">
      <div className="bg-[var(--color-brand-navy)] px-8 py-6">
        <p className="text-amber-400 text-xs font-black uppercase tracking-widest mb-1">Rate Calculator</p>
        <h3 className="text-2xl font-black text-white">Estimate your delivery cost</h3>
        <p className="text-white/60 text-sm mt-1">$16 base + $0.90/km — adjust the inputs and see your estimate live.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px]">
        {/* ── Inputs ── */}
        <div className="p-8 space-y-8 border-r border-[var(--color-border)]">

          {/* Business type */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Business type</label>
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
                >{b.label}</button>
              ))}
            </div>
          </div>

          {/* Distance slider */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Delivery distance
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={1}
                max={60}
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="flex-1 accent-[#1B6FEB] cursor-pointer"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-2xl font-black text-[var(--color-text)]">{distanceKm}</span>
                <span className="text-sm text-[var(--color-text-muted)]">km</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
              <span>1 km (local)</span>
              <span className="font-semibold text-[var(--color-brand-blue)]">
                $16 + ($0.90 × {distanceKm}) = {fmt(BASE_RATE + PER_KM * distanceKm)}
              </span>
              <span>60 km</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-[var(--color-text-muted)]">
              {[
                { label: "Downtown", km: 5 },
                { label: "Cross-city", km: 15 },
                { label: "Sherwood Park", km: 25 },
              ].map(({ label, km }) => (
                <button
                  key={label}
                  onClick={() => setDistanceKm(km)}
                  className={`px-2 py-1.5 rounded-lg border transition-all text-xs font-medium ${
                    distanceKm === km
                      ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue-pale)] text-[var(--color-brand-blue)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-brand-blue)]/40"
                  }`}
                >
                  {label}<br/><span className="font-black">{km} km</span>
                </button>
              ))}
            </div>
          </div>

          {/* Deliveries per week */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Deliveries per week</label>
            <Counter value={deliveriesPerWeek} onChange={setDeliveriesPerWeek} min={1} max={100} />
            <p className="text-xs text-[var(--color-text-muted)] mt-2">≈ {calc.monthlyDeliveries} deliveries/month</p>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Cargo requirements</label>
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
                        <p className={`text-sm font-semibold ${selected ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text)]"}`}>{a.label}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{a.sub}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-black flex-shrink-0 ml-4 ${selected ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text-muted)]"}`}>+${a.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggles */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Delivery timing</label>
            <div className="space-y-2">
              {[
                { id: "afterhours", label: "After-hours deliveries", sub: "8 pm – 7 am", price: "+$15", value: afterHours, set: setAfterHours },
                { id: "stat",       label: "STAT / urgent pickups",   sub: "Guaranteed < 60 min", price: "+$25", value: stat, set: setStat },
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
                  <span className={`text-sm font-black flex-shrink-0 ml-4 ${value ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text-muted)]"}`}>{price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="p-8 bg-[#F8FAFC] flex flex-col gap-6">

          {/* Per delivery */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Per delivery</p>
            <p className="text-4xl font-black text-[var(--color-text)]">{fmt(calc.perDelivery)}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">on-demand, pay-per-run</p>
          </div>

          {/* Monthly on-demand */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Monthly — on-demand</p>
            <p className="text-3xl font-black text-[var(--color-text)]">{fmt(calc.onDemandMonthly)}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{calc.monthlyDeliveries} deliveries × {fmt(calc.perDelivery)}</p>
          </div>

          {/* Contracted route */}
          <div className="bg-[var(--color-brand-blue)] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/10 -translate-y-10 translate-x-10" />
            <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-1">Monthly — contracted route</p>
            <p className="text-3xl font-black text-white">{fmt(calc.routeMonthly)}</p>
            <p className="text-xs text-white/60 mt-1">{Math.round(calc.discount * 100)}% volume discount applied</p>
            {calc.savings > 0 && (
              <div className="mt-3 inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Save {fmt(calc.savings)}/month vs on-demand
              </div>
            )}
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Cost breakdown</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">Base rate</span>
                <span className="font-semibold text-[var(--color-text)]">$16.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">{calc.km} km × $0.90</span>
                <span className="font-semibold text-[var(--color-text)]">{fmt(PER_KM * calc.km)}</span>
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
                <span className="text-[var(--color-text)]">Per delivery</span>
                <span className="text-[var(--color-brand-blue)]">{fmt(calc.perDelivery)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-auto">
            <p className="text-xs text-[var(--color-text-muted)] text-center leading-relaxed">
              Contracted pharmacy &amp; LTC routes start from $9/delivery — significantly lower than on-demand.
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
