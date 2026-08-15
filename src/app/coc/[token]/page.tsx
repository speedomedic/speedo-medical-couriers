"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { CheckCircle, Pen, RotateCcw, Package, Truck, AlertCircle, Loader2 } from "lucide-react";

// ── Signature canvas ──────────────────────────────────────────────
function SignaturePad({ onChange }: { onChange: (dataUrl: string | null) => void }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const drawing    = useRef(false);
  const lastPt     = useRef<{ x: number; y: number } | null>(null);
  const [hasInk, setHasInk] = useState(false);

  const getPos = (e: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect   = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width  / rect.width),
      y: (e.clientY - rect.top)  * (canvas.height / rect.height),
    };
  };

  const onDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    canvas.setPointerCapture(e.pointerId);
    drawing.current = true;
    lastPt.current  = getPos(e);
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(lastPt.current.x, lastPt.current.y);
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const pt     = getPos(e);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    lastPt.current = pt;
    if (!hasInk) {
      setHasInk(true);
      onChange(canvas.toDataURL("image/png"));
    }
  }, [hasInk, onChange]);

  const onUp = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    drawing.current = false;
    lastPt.current  = null;
    if (hasInk) onChange(canvasRef.current!.toDataURL("image/png"));
  }, [hasInk, onChange]);

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
    onChange(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    ctx.strokeStyle = "#0D1B3E";
    ctx.lineWidth   = 2.5;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={600}
        height={180}
        className="w-full border-2 border-dashed border-slate-300 rounded-2xl bg-white touch-none cursor-crosshair"
        style={{ height: 160 }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      />
      {!hasInk && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Pen size={14} /> Sign here with your finger
          </p>
        </div>
      )}
      {hasInk && (
        <button
          type="button"
          onClick={clear}
          className="absolute top-2 right-2 flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 bg-white rounded-lg px-2 py-1 border border-slate-200 shadow-sm"
        >
          <RotateCcw size={11} /> Clear
        </button>
      )}
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────
interface CoCRecord {
  orderNumber: string;
  status: "pending_pickup" | "pending_delivery" | "completed";
  pharmacyName: string;
  pharmacyAddress: string;
  pharmacyCity: string;
  pharmacistName: string;
  patientName: string;
  patientAddress: string;
  patientCity: string;
  medications: string;
  urgency: string;
  coldChain: boolean;
  pickup?: { signedBy: string; timestamp: string };
  delivery?: { signedBy: string; timestamp: string; condition: string };
}

// ── Info row component ────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</span>
      <span className="text-sm text-slate-700 text-right max-w-[60%]">{value}</span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────
export default function CoCSigningPage() {
  const { token } = useParams() as { token: string };

  const [record,    setRecord]    = useState<CoCRecord | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [signedBy,  setSignedBy]  = useState("");
  const [signature, setSignature] = useState<string | null>(null);
  const [condition, setCondition] = useState<"intact" | "damaged">("intact");
  const [notes,     setNotes]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitErr,  setSubmitErr]  = useState<string | null>(null);

  const fetchRecord = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/coc/${token}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error ?? "Order not found");
        return;
      }
      setRecord(await res.json());
    } catch {
      setError("Failed to load order. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchRecord(); }, [fetchRecord]);

  const submit = async (step: "pickup" | "delivery") => {
    if (!signedBy.trim()) { setSubmitErr("Please enter your name."); return; }
    if (!signature)       { setSubmitErr("Please sign before continuing."); return; }
    setSubmitErr(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/coc/${token}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step, signedBy: signedBy.trim(), signature, condition, notes }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setSubmitErr(j.error ?? "Failed to save. Try again.");
        return;
      }
      setSignedBy("");
      setSignature(null);
      setNotes("");
      setCondition("intact");
      await fetchRecord();
    } catch {
      setSubmitErr("Network error — check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="text-center max-w-sm">
        <AlertCircle size={40} className="text-red-400 mx-auto mb-3" />
        <p className="font-bold text-slate-800 mb-1">Order Not Found</p>
        <p className="text-slate-500 text-sm">{error}</p>
      </div>
    </div>
  );

  const urgencyLabel =
    record!.urgency === "stat"     ? "⚡ STAT Rush (< 60 min)" :
    record!.urgency === "same_day" ? "🚚 Same-Day" : "📦 Standard (2–4 hrs)";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#0D1B3E] text-white px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/50 font-semibold uppercase tracking-widest mb-0.5">Speedo Medical Couriers</p>
          <p className="font-black text-sm">Chain of Custody</p>
        </div>
        <span className="text-xs font-mono bg-white/10 rounded-lg px-3 py-1.5">{record!.orderNumber}</span>
      </div>

      {/* Progress bar */}
      <div className="flex border-b border-slate-200 bg-white">
        {(["Pickup", "Delivery", "Complete"] as const).map((label, i) => {
          const done = (i === 0 && (record!.status === "pending_delivery" || record!.status === "completed"))
            || (i === 1 && record!.status === "completed")
            || (i === 2 && record!.status === "completed");
          const active = (i === 0 && record!.status === "pending_pickup")
            || (i === 1 && record!.status === "pending_delivery")
            || (i === 2 && record!.status === "completed");
          return (
            <div key={label} className="flex-1 flex flex-col items-center py-3 gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black
                ${done   ? "bg-emerald-500 text-white" :
                  active ? "bg-blue-600 text-white" :
                           "bg-slate-200 text-slate-400"}`}>
                {done ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className={`text-[10px] font-semibold ${active ? "text-blue-600" : done ? "text-emerald-600" : "text-slate-400"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

        {/* Order summary card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Order Details</p>
          <InfoRow label="From"      value={`${record!.pharmacyName}${record!.pharmacistName ? ` · ${record!.pharmacistName}` : ""}`} />
          <InfoRow label="Pickup at" value={`${record!.pharmacyAddress}, ${record!.pharmacyCity}`} />
          <InfoRow label="To"        value={record!.patientName} />
          <InfoRow label="Deliver to" value={`${record!.patientAddress}, ${record!.patientCity}`} />
          <InfoRow label="Urgency"   value={urgencyLabel} />
          {record!.coldChain && <InfoRow label="Cold Chain" value="⚠️ Temperature sensitive" />}
          {record!.medications && <InfoRow label="Contents"  value={record!.medications} />}
        </div>

        {/* STEP 1 — Pickup */}
        {record!.status === "pending_pickup" && (
          <div className="bg-white rounded-2xl border-2 border-blue-500 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Package size={15} className="text-white" />
              </div>
              <div>
                <p className="font-black text-slate-800 text-sm">Step 1 of 2 — Pickup Confirmation</p>
                <p className="text-xs text-slate-500">Pharmacy staff: confirm handover to courier</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 bg-blue-50 rounded-xl p-3 mb-4 leading-relaxed">
              By signing below, I confirm that I am handing this package to the Speedo Medical Couriers driver
              in good condition, properly sealed and labelled.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Your full name</label>
                <input
                  type="text"
                  placeholder="e.g. Jane Smith"
                  value={signedBy}
                  onChange={e => setSignedBy(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Signature</label>
                <SignaturePad onChange={setSignature} />
              </div>
            </div>

            {submitErr && (
              <p className="mt-3 text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{submitErr}</p>
            )}

            <button
              onClick={() => submit("pickup")}
              disabled={submitting}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
              Confirm Pickup & Sign
            </button>
          </div>
        )}

        {/* STEP 2 — Delivery */}
        {record!.status === "pending_delivery" && (
          <>
            {/* Pickup done banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center gap-3">
              <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-emerald-800">Pickup signed ✓</p>
                <p className="text-xs text-emerald-600">
                  Signed by {record!.pickup?.signedBy} · {new Date(record!.pickup?.timestamp ?? "").toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-blue-500 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Truck size={15} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm">Step 2 of 2 — Delivery Confirmation</p>
                  <p className="text-xs text-slate-500">Patient: confirm you received this package</p>
                </div>
              </div>

              <p className="text-xs text-slate-500 bg-blue-50 rounded-xl p-3 mb-4 leading-relaxed">
                By signing below, I confirm that I received this package from Speedo Medical Couriers.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">Your full name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={signedBy}
                    onChange={e => setSignedBy(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">Package condition</label>
                  <div className="flex gap-3">
                    {(["intact", "damaged"] as const).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCondition(c)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all
                          ${condition === c
                            ? c === "intact"
                              ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                              : "bg-red-50 border-red-400 text-red-700"
                            : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
                      >
                        {c === "intact" ? "✓ Intact" : "⚠ Damaged"}
                      </button>
                    ))}
                  </div>
                </div>

                {condition === "damaged" && (
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1.5">Describe the damage (optional)</label>
                    <textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      rows={2}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
                      placeholder="e.g. outer bag torn, inner contents appear intact"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">Signature</label>
                  <SignaturePad onChange={setSignature} />
                </div>
              </div>

              {submitErr && (
                <p className="mt-3 text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{submitErr}</p>
              )}

              <button
                onClick={() => submit("delivery")}
                disabled={submitting}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                Confirm Receipt & Sign
              </button>
            </div>
          </>
        )}

        {/* COMPLETED */}
        {record!.status === "completed" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-500" />
            </div>
            <h2 className="text-lg font-black text-slate-800 mb-1">Chain of Custody Complete</h2>
            <p className="text-sm text-slate-500 mb-5">Both parties have signed. A PDF copy has been emailed to the pharmacy and patient for their records.</p>

            <div className="space-y-2 text-left">
              <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-700">Pickup signed by {record!.pickup?.signedBy}</p>
                  <p className="text-xs text-slate-400">{new Date(record!.pickup?.timestamp ?? "").toLocaleString("en-CA")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-700">Delivery signed by {record!.delivery?.signedBy}</p>
                  <p className="text-xs text-slate-400">{new Date(record!.delivery?.timestamp ?? "").toLocaleString("en-CA")}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-slate-400 pb-4">
          Speedo Medical Couriers · Edmonton, AB · (780) 807-0000
        </p>
      </div>
    </div>
  );
}
