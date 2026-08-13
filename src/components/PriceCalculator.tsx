"use client";

import { useState } from "react";
import Link from "next/link";

function money(v: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(v);
}

export default function PriceCalculator() {
  const [service, setService] = useState(35);
  const [zone, setZone] = useState(0);
  const [extraStops, setExtraStops] = useState(0);
  const [waitingMin, setWaitingMin] = useState(0);
  const [coldChain, setColdChain] = useState(false);
  const [tempLogger, setTempLogger] = useState(false);
  const [afterHours, setAfterHours] = useState(false);
  const [overnight, setOvernight] = useState(false);
  const [weekend, setWeekend] = useState(false);

  const fixedExtras =
    zone +
    Math.max(0, extraStops) * 25 +
    Math.max(0, waitingMin) * 1 +
    (coldChain ? 25 : 0) +
    (tempLogger ? 15 : 0);

  const subtotal = service + fixedExtras;
  const premiumRate = (overnight ? 0.5 : afterHours ? 0.25 : 0) + (weekend ? 0.25 : 0);
  const premium = subtotal * premiumRate;
  const total = subtotal + premium;

  return (
    <div className="pr-calculator-grid">
      {/* Inputs */}
      <div className="pr-calc-box">
        <div className="pr-form-grid">
          <div className="pr-field">
            <label htmlFor="pc-service">Service level</label>
            <select
              id="pc-service"
              value={service}
              onChange={(e) => setService(Number(e.target.value))}
            >
              <option value={35}>Standard Delivery — $35</option>
              <option value={55}>Specimen Transport — $55</option>
              <option value={85}>Rush / STAT — $85</option>
              <option value={85}>Critical Direct — from $85</option>
            </select>
          </div>

          <div className="pr-field">
            <label htmlFor="pc-zone">Delivery area</label>
            <select
              id="pc-zone"
              value={zone}
              onChange={(e) => setZone(Number(e.target.value))}
            >
              <option value={0}>Edmonton Core — included</option>
              <option value={5}>St. Albert / Sherwood Park — +$5</option>
              <option value={10}>Leduc / Spruce Grove / Beaumont — +$10</option>
              <option value={15}>Fort Saskatchewan / Outer area — +$15</option>
              <option value={30}>Red Deer / Regional — from +$30</option>
            </select>
          </div>

          <div className="pr-field">
            <label htmlFor="pc-stops">Additional pickup stops</label>
            <input
              id="pc-stops"
              type="number"
              min={0}
              value={extraStops}
              onChange={(e) => setExtraStops(Number(e.target.value))}
            />
          </div>

          <div className="pr-field">
            <label htmlFor="pc-wait">Chargeable waiting minutes</label>
            <input
              id="pc-wait"
              type="number"
              min={0}
              value={waitingMin}
              onChange={(e) => setWaitingMin(Number(e.target.value))}
            />
          </div>

          <div className="pr-field full">
            <label>Special services</label>

            <label className="pr-checkbox-row">
              <input type="checkbox" checked={coldChain} onChange={(e) => setColdChain(e.target.checked)} />
              Cold chain / refrigerated handling (+$25)
            </label>

            <label className="pr-checkbox-row">
              <input type="checkbox" checked={tempLogger} onChange={(e) => setTempLogger(e.target.checked)} />
              Temperature data logger (+$15)
            </label>

            <label className="pr-checkbox-row">
              <input type="checkbox" checked={afterHours} onChange={(e) => { setAfterHours(e.target.checked); if (e.target.checked) setOvernight(false); }} />
              Evening service 6 pm–10 pm (+25%)
            </label>

            <label className="pr-checkbox-row">
              <input type="checkbox" checked={overnight} onChange={(e) => { setOvernight(e.target.checked); if (e.target.checked) setAfterHours(false); }} />
              Overnight service 10 pm–6 am (+50%)
            </label>

            <label className="pr-checkbox-row">
              <input type="checkbox" checked={weekend} onChange={(e) => setWeekend(e.target.checked)} />
              Weekend service (+25%)
            </label>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="pr-estimate-box">
        <span className="pr-eyebrow">Estimated Price</span>

        <div className="pr-estimate-total">{money(total)}</div>

        <div className="pr-estimate-line">
          <span>Base service</span>
          <strong>{money(service)}</strong>
        </div>
        <div className="pr-estimate-line">
          <span>Additional services</span>
          <strong>{money(fixedExtras + premium)}</strong>
        </div>
        <div className="pr-estimate-line">
          <span>Estimated subtotal</span>
          <strong>{money(total)}</strong>
        </div>

        <p className="pr-price-note" style={{ marginTop: 16 }}>
          GST is additional. This estimate does not constitute a binding quote or guarantee of service.
        </p>

        <Link
          href="/book"
          className="pr-btn pr-btn-primary"
          style={{ marginTop: 20, width: "100%", justifyContent: "center" }}
        >
          Book This Delivery
        </Link>
      </div>
    </div>
  );
}
