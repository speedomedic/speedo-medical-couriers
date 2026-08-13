"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Navigation, Phone, ExternalLink, AlertCircle, Loader2 } from "lucide-react";

function SuccessContent() {
  const params    = useSearchParams();
  const sessionId = params.get("session_id");
  const orderParam = params.get("order");

  const [status, setStatus]             = useState<"loading" | "success" | "error">("loading");
  const [orderNumber, setOrderNumber]   = useState(orderParam ?? "");
  const [trackingLink, setTrackingLink] = useState("");
  const [error, setError]               = useState("");

  useEffect(() => {
    if (!sessionId) { setStatus("error"); setError("Missing payment session."); return; }

    fetch(`/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.ok) {
          setOrderNumber(json.orderNumber ?? orderParam ?? "");
          setTrackingLink(json.trackingLink ?? "");
          setStatus("success");
        } else {
          setError(json.error ?? "Payment verification failed.");
          setStatus("error");
        }
      })
      .catch(() => { setError("Network error — please contact us."); setStatus("error"); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] pt-24">
        <div className="text-center space-y-4">
          <Loader2 size={40} className="text-[var(--color-brand-blue)] animate-spin mx-auto" />
          <p className="text-[var(--color-text-muted)] font-medium">Confirming your payment and setting up your order…</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4 pt-24 pb-16">
        <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-[var(--shadow-card)] max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Something went wrong</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">{error}</p>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            If you were charged, call us immediately and we&apos;ll resolve it.
          </p>
          <div className="flex flex-col gap-3">
            <a href="tel:7808070000" className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] text-white font-bold px-6 py-3 rounded-xl">
              <Phone size={15} /> (780) 807-0000
            </a>
            <Link href="/book" className="text-sm text-[var(--color-brand-blue)] hover:underline">Try booking again</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4 pt-24 pb-16">
      <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-[var(--shadow-card)] max-w-md w-full overflow-hidden">

        {/* Header */}
        <div className="bg-[var(--color-brand-navy)] p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #1B6FEB 0%, transparent 60%)" }} />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-blue)] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <CheckCircle size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-white mb-1">Payment Confirmed!</h2>
            <p className="text-white/60 text-sm">Your order is in our dispatch system.</p>
          </div>
        </div>

        <div className="p-8 space-y-5">
          {/* Order number */}
          {orderNumber && (
            <div className="bg-[var(--color-brand-blue-pale)] border border-blue-200 rounded-2xl p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-blue)] mb-1">Your Order Number</p>
              <p className="text-xl font-black text-[var(--color-brand-navy)] font-mono">{orderNumber}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Use this to track your delivery</p>
            </div>
          )}

          {/* Shipday tracking card */}
          {trackingLink && (
            <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
              <div className="bg-slate-900 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-slate-400 text-xs font-mono flex-1 text-center">shipday · live tracking</span>
                <ExternalLink size={12} className="text-slate-500" />
              </div>
              <div className="bg-[#1a1f36] px-4 py-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-blue)] flex items-center justify-center">
                    <Navigation size={16} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-bold">Shipday Live Tracking</p>
                    <p className="text-slate-400 text-xs">Driver location updated every 30s</p>
                  </div>
                </div>
                {/* Fake map preview dots */}
                <div className="relative w-full h-20 rounded-xl overflow-hidden bg-slate-800 mb-4">
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(27,111,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(27,111,235,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                  <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-brand-blue)] shadow-[0_0_8px_rgba(27,111,235,0.8)]" />
                  <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-[var(--color-brand-red)] shadow-[0_0_8px_rgba(229,25,30,0.8)]" />
                  <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
                  <div className="absolute bottom-2 left-2 text-[10px] text-slate-400 font-mono">● driver en route</div>
                </div>
                <a
                  href={trackingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-blue-500/30"
                >
                  Open Live Map <ExternalLink size={13} />
                </a>
              </div>
            </div>
          )}

          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed text-center">
            Confirmation and live tracking link sent to your email. Our team will contact you shortly to confirm pickup.
          </p>

          <div className="flex flex-col gap-3">
            {orderNumber && (
              <Link href="/track" className="inline-flex items-center justify-center gap-2 border-2 border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] font-bold px-6 py-3 rounded-xl hover:bg-[var(--color-brand-blue-pale)] transition-colors text-sm">
                Track Order {orderNumber}
              </Link>
            )}
            <a href="tel:7808070000" className="inline-flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] font-semibold px-6 py-3 rounded-xl hover:border-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue)] transition-colors text-sm">
              <Phone size={14} /> (780) 807-0000
            </a>
            <Link href="/book" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand-blue)] underline text-center transition-colors">
              Submit another booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] pt-24">
        <Loader2 size={40} className="text-[var(--color-brand-blue)] animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
