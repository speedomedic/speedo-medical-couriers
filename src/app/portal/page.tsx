"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Building2, Search, Truck, CheckCircle, Clock, Package,
  AlertCircle, ExternalLink, RefreshCw, ArrowRight, Phone,
} from "lucide-react";

type Order = {
  orderId: number;
  orderNumber: string;
  status: string;
  trackingLink: string | null;
  customer: string | null;
  address: string | null;
  driver: string | null;
  eta: string | null;
  updatedAt: string | null;
};

const STATUS_CONFIG: Record<string, { label: string; colorClass: string; icon: React.ElementType }> = {
  WAITING:    { label: "Received",       colorClass: "bg-amber-50 text-amber-700 border-amber-200", icon: Package },
  UNASSIGNED: { label: "Pending Driver", colorClass: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  ASSIGNED:   { label: "Driver Assigned",colorClass: "bg-blue-50 text-blue-700 border-blue-200",   icon: Truck },
  PICKED_UP:  { label: "Picked Up",      colorClass: "bg-blue-50 text-blue-700 border-blue-200",   icon: Truck },
  IN_TRANSIT: { label: "En Route",       colorClass: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: Truck },
  DELIVERED:  { label: "Delivered",      colorClass: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  CANCELLED:  { label: "Cancelled",      colorClass: "bg-red-50 text-red-700 border-red-200",       icon: AlertCircle },
};

export default function PortalPage() {
  const [businessName, setBusinessName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const fetchOrders = useCallback(async (name: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/portal/orders?business=${encodeURIComponent(name.toLowerCase())}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch");
      setOrders(json.orders);
      setBusinessName(name);
      setHasSearched(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    fetchOrders(inputValue.trim());
  }

  const activeOrders = orders.filter((o) => !["DELIVERED", "CANCELLED"].includes(o.status));
  const pastOrders = orders.filter((o) => ["DELIVERED", "CANCELLED"].includes(o.status));

  return (
    <main className="pt-28 pb-24 min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[var(--color-brand-navy)] py-12 mb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Partner Portal</p>
              <h1 className="text-3xl font-black text-white">
                {businessName ? businessName : "Business Dashboard"}
              </h1>
            </div>
            <div className="flex gap-3">
              <Link
                href="/portal/pharmacy"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
              >
                Pharmacy Portal <ArrowRight size={13} />
              </Link>
              <a
                href="tel:7808070000"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-xl border border-white/20 text-sm transition-all"
              >
                <Phone size={13} /> Call Dispatch
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Business lookup */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-[var(--color-brand-blue-pale)] rounded-lg flex items-center justify-center">
              <Building2 size={17} className="text-[var(--color-brand-blue)]" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[var(--color-text)]">Look Up Your Orders</h2>
              <p className="text-xs text-[var(--color-text-muted)]">Enter your registered business name to view your delivery history</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. Westside Pharmacy, Edmonton Cardiology Clinic..."
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/30 focus:border-[var(--color-brand-blue)]"
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all"
            >
              {loading ? <RefreshCw size={14} className="animate-spin" /> : <Search size={14} />}
              {loading ? "Loading..." : "Search"}
            </button>
          </form>
          {error && (
            <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
          )}
        </div>

        {/* Results */}
        {hasSearched && (
          <>
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={28} className="text-[var(--color-text-muted)]" />
                </div>
                <h3 className="text-lg font-black text-[var(--color-text)] mb-2">No orders found</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-sm mx-auto">
                  We couldn&apos;t find orders for &quot;{businessName}&quot;. Make sure you&apos;re using the exact business name from your registration.
                </p>
                <Link href="/partner" className="text-sm font-bold text-[var(--color-brand-blue)]">
                  Register your business →
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Total Orders", value: orders.length, color: "text-[var(--color-text)]" },
                    { label: "Active", value: activeOrders.length, color: "text-blue-600" },
                    { label: "Delivered", value: orders.filter(o => o.status === "DELIVERED").length, color: "text-green-600" },
                    { label: "This Month", value: orders.filter(o => {
                      if (!o.updatedAt) return false;
                      const d = new Date(o.updatedAt);
                      const now = new Date();
                      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                    }).length, color: "text-[var(--color-brand-blue)]" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-white rounded-2xl border border-[var(--color-border)] p-4 text-center">
                      <p className={`text-3xl font-black ${color}`}>{value}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Active orders */}
                {activeOrders.length > 0 && (
                  <div>
                    <h3 className="text-lg font-black text-[var(--color-text)] mb-4">Active Deliveries</h3>
                    <div className="space-y-3">
                      {activeOrders.map((order) => (
                        <OrderCard key={order.orderId} order={order} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Past orders */}
                {pastOrders.length > 0 && (
                  <div>
                    <h3 className="text-lg font-black text-[var(--color-text)] mb-4">Order History</h3>
                    <div className="space-y-3">
                      {pastOrders.map((order) => (
                        <OrderCard key={order.orderId} order={order} compact />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Not searched yet */}
        {!hasSearched && (
          <div className="grid sm:grid-cols-3 gap-5 mt-4">
            {[
              { icon: Package, title: "Pharmacy Portal", desc: "Submit prescription deliveries directly to Speedo dispatch — no hold times.", href: "/portal/pharmacy", label: "Open Portal" },
              { icon: Building2, title: "Become a Partner", desc: "Register your business for volume pricing and dedicated routes.", href: "/partner", label: "Register" },
              { icon: Phone, title: "Call Dispatch", desc: "Need an urgent STAT pickup? Call our team directly.", href: "tel:7808070000", label: "(780) 807-0000" },
            ].map(({ icon: Icon, title, desc, href, label }) => (
              <a key={title} href={href} className="bg-white rounded-2xl border border-[var(--color-border)] p-6 hover:border-[var(--color-brand-blue)] hover:shadow-lg transition-all group">
                <div className="w-11 h-11 bg-[var(--color-brand-blue-pale)] rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[var(--color-brand-blue)]" />
                </div>
                <h3 className="font-black text-[var(--color-text)] mb-1">{title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">{desc}</p>
                <span className="text-sm font-bold text-[var(--color-brand-blue)] group-hover:underline">{label} →</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function OrderCard({ order, compact = false }: { order: Order; compact?: boolean }) {
  const cfg = STATUS_CONFIG[order.status] ?? {
    label: order.status,
    colorClass: "bg-gray-50 text-gray-600 border-gray-200",
    icon: Package,
  };
  const StatusIcon = cfg.icon;

  return (
    <div className={`bg-white rounded-2xl border border-[var(--color-border)] ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${cfg.colorClass}`}>
            <StatusIcon size={15} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-[var(--color-text)] truncate">{order.orderNumber}</p>
            {order.customer && (
              <p className="text-xs text-[var(--color-text-muted)] truncate">{order.customer}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.colorClass}`}>
            {cfg.label}
          </span>
          {order.trackingLink && (
            <a
              href={order.trackingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-brand-blue)] hover:opacity-70"
              title="Track in Shipday"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
      {!compact && (
        <div className="mt-3 pt-3 border-t border-[var(--color-border)] grid grid-cols-2 gap-3">
          {order.address && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-muted)]">Destination</p>
              <p className="text-xs text-[var(--color-text)] mt-0.5">{order.address}</p>
            </div>
          )}
          {order.driver && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-muted)]">Driver</p>
              <p className="text-xs text-[var(--color-text)] mt-0.5">{order.driver}</p>
            </div>
          )}
          {order.eta && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-muted)]">ETA</p>
              <p className="text-xs text-[var(--color-text)] mt-0.5">{order.eta}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
