"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navigation, Phone, Mail, ArrowRight, Search, CheckCircle,
  Clock, Truck, AlertCircle, ExternalLink, Package,
} from "lucide-react";

type TrackStatus =
  | "idle"
  | "loading"
  | "found"
  | "not_found"
  | "error";

interface OrderData {
  orderNumber:           string;
  status:                string;
  trackingLink:          string;
  driverName:            string | null;
  driverPhone:           string | null;
  estimatedDeliveryTime: string | null;
  customerName:          string | null;
  customerAddress:       string | null;
  pickupAddress:         string | null;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Truck }> = {
  WAITING:     { label: "Order Received",     color: "text-amber-600 bg-amber-50 border-amber-200",   icon: Package },
  UNASSIGNED:  { label: "Awaiting Dispatch",  color: "text-amber-600 bg-amber-50 border-amber-200",   icon: Package },
  ASSIGNED:    { label: "Driver Assigned",    color: "text-blue-600 bg-blue-50 border-blue-200",      icon: Truck },
  PICKED_UP:   { label: "Picked Up",          color: "text-blue-700 bg-blue-50 border-blue-200",      icon: Truck },
  IN_TRANSIT:  { label: "En Route",           color: "text-indigo-600 bg-indigo-50 border-indigo-200",icon: Truck },
  DELIVERED:   { label: "Delivered",          color: "text-green-700 bg-green-50 border-green-200",   icon: CheckCircle },
  CANCELLED:   { label: "Cancelled",          color: "text-red-600 bg-red-50 border-red-200",         icon: AlertCircle },
};

export default function TrackPage() {
  const [input, setInput]   = useState("");
  const [status, setStatus] = useState<TrackStatus>("idle");
  const [order, setOrder]   = useState<OrderData | null>(null);
  const [error, setError]   = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim().toUpperCase();
    if (!q) return;

    setStatus("loading");
    setOrder(null);
    setError("");

    try {
      const res  = await fetch(`/api/track?order=${encodeURIComponent(q)}`);
      const json = await res.json();

      if (res.status === 404) {
        setStatus("not_found");
        return;
      }
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Failed to look up order.");
        setStatus("error");
        return;
      }

      setOrder(json);
      setStatus("found");
    } catch {
      setError("Network error — please try again.");
      setStatus("error");
    }
  };

  const statusInfo = order
    ? (STATUS_CONFIG[order.status.toUpperCase()] ?? {
        label: order.status,
        color: "text-slate-600 bg-slate-50 border-slate-200",
        icon: Clock,
      })
    : null;

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
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/15">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Powered by Shipday
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">
            Track Your Delivery
          </h1>
          <p className="text-white/65 text-xl max-w-xl mx-auto">
            Enter your order number to get live status, driver info, and a real-time tracking link.
          </p>
        </div>
      </section>

      {/* Search + Result */}
      <section className="py-20 bg-[var(--color-bg)]">
        <div className="max-w-2xl mx-auto px-4">

          {/* Search card */}
          <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 shadow-[var(--shadow-card)] mb-8">
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
              Enter Your Order Number
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Your order number (e.g. <span className="font-mono font-semibold text-[var(--color-brand-blue)]">SMC-1234567890</span>) was sent in your booking confirmation email.
            </p>

            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="SMC-XXXXXXXXXX"
                className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent text-sm font-mono uppercase placeholder:normal-case placeholder:font-sans bg-[var(--color-bg)]"
              />
              <button
                type="submit"
                disabled={status === "loading" || !input.trim()}
                className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-xl transition-colors cursor-pointer"
              >
                {status === "loading"
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  : <Search size={16}/>}
                Track
              </button>
            </form>
          </div>

          {/* Not found */}
          {status === "not_found" && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4 mb-8">
              <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5"/>
              <div>
                <p className="font-bold text-amber-800 mb-1">Order not found</p>
                <p className="text-sm text-amber-700">
                  We couldn&apos;t find an order matching &ldquo;{input.trim().toUpperCase()}&rdquo;.
                  Double-check your confirmation email or call us at{" "}
                  <a href="tel:7808070000" className="font-semibold underline">(780) 807-0000</a>.
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex gap-4 mb-8">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5"/>
              <div>
                <p className="font-bold text-red-800 mb-1">Lookup failed</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Found — order details */}
          {status === "found" && order && statusInfo && (() => {
            const StatusIcon = statusInfo.icon;
            return (
              <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 shadow-[var(--shadow-card)] mb-8 space-y-6">

                {/* Header */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Order Number</p>
                    <p className="text-xl font-black text-[var(--color-text)] font-mono">{order.orderNumber}</p>
                  </div>
                  <span className={`inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border ${statusInfo.color}`}>
                    <StatusIcon size={14}/>{statusInfo.label}
                  </span>
                </div>

                {/* Live tracking button */}
                {order.trackingLink && (
                  <a
                    href={order.trackingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 text-sm"
                  >
                    <Navigation size={16}/>
                    Open Live Tracking Map
                    <ExternalLink size={14} className="opacity-60"/>
                  </a>
                )}

                {/* Details grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {order.pickupAddress && (
                    <div className="bg-[var(--color-bg-subtle)] rounded-xl p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Pickup</p>
                      <p className="text-sm font-medium text-[var(--color-text)]">{order.pickupAddress}</p>
                    </div>
                  )}
                  {order.customerAddress && (
                    <div className="bg-[var(--color-bg-subtle)] rounded-xl p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Delivery</p>
                      <p className="text-sm font-medium text-[var(--color-text)]">{order.customerAddress}</p>
                    </div>
                  )}
                  {order.driverName && (
                    <div className="bg-[var(--color-bg-subtle)] rounded-xl p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Driver</p>
                      <p className="text-sm font-bold text-[var(--color-text)]">{order.driverName}</p>
                      {order.driverPhone && (
                        <a href={`tel:${order.driverPhone}`} className="text-xs text-[var(--color-brand-blue)] font-medium">
                          {order.driverPhone}
                        </a>
                      )}
                    </div>
                  )}
                  {order.estimatedDeliveryTime && (
                    <div className="bg-[var(--color-bg-subtle)] rounded-xl p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Estimated Delivery</p>
                      <p className="text-sm font-bold text-[var(--color-brand-blue)]">{order.estimatedDeliveryTime}</p>
                    </div>
                  )}
                </div>

                <p className="text-xs text-[var(--color-text-muted)] text-center">
                  Questions about this delivery?{" "}
                  <a href="tel:7808070000" className="text-[var(--color-brand-blue)] font-semibold">(780) 807-0000</a>
                  {" "}or{" "}
                  <a href="mailto:speedomedical@gmail.com" className="text-[var(--color-brand-blue)] font-semibold">speedomedical@gmail.com</a>
                </p>
              </div>
            );
          })()}

          {/* No order yet — how tracking works */}
          {status === "idle" && (
            <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 shadow-[var(--shadow-card)]">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-blue-pale)] flex items-center justify-center mx-auto mb-5">
                <Navigation size={28} className="text-[var(--color-brand-blue)]"/>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] text-center mb-2">
                How Tracking Works
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] text-center leading-relaxed mb-6">
                When your pickup is booked, we create an order in Shipday — our real-time dispatch platform. Your confirmation email includes your order number and a live tracking link.
              </p>
              <ol className="space-y-3">
                {[
                  "Book a pickup online or by phone",
                  "Receive your confirmation with order number (SMC-XXXXXXXXXX)",
                  "Enter it above to see live driver location and ETA",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text)]">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-brand-blue)] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-3">
                <Link
                  href="/book"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
                >
                  Book a Pickup <ArrowRight size={14}/>
                </Link>
                <a
                  href="tel:7808070000"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] font-semibold px-5 py-3 rounded-xl hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] transition-colors text-sm"
                >
                  <Phone size={14}/>(780) 807-0000
                </a>
              </div>
              <p className="mt-5 text-xs text-[var(--color-text-muted)] text-center">
                Already have a tracking link?{" "}
                <a href="mailto:speedomedical@gmail.com" className="inline-flex items-center gap-1 text-[var(--color-brand-blue)] hover:underline">
                  <Mail size={11}/> speedomedical@gmail.com
                </a>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
