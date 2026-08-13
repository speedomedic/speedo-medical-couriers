"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MapPin, Loader2, X } from "lucide-react";

interface Prediction {
  id:            string;
  fullText:      string;
  mainText:      string;
  secondaryText: string;
  city?:         string;
}

export interface AddressAutocompleteProps {
  value:       string;
  onChange:    (address: string, city?: string) => void;
  placeholder?: string;
  required?:   boolean;
}

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const CITIES = [
  "Edmonton", "St. Albert", "Sherwood Park", "Leduc",
  "Spruce Grove", "Fort Saskatchewan", "Beaumont", "Red Deer",
];

function extractCity(placeName: string): string | undefined {
  const parts = placeName.split(", ");
  for (const part of parts) {
    const t = part.trim().toLowerCase();
    const match = CITIES.find(
      (c) => c.toLowerCase() === t || t.includes(c.toLowerCase()) || c.toLowerCase().includes(t)
    );
    if (match) return match;
  }
  return undefined;
}

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Start typing an address…",
  required,
}: AddressAutocompleteProps) {
  const [inputVal,    setInputVal]    = useState(value);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [open,        setOpen]        = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [focused,     setFocused]     = useState(false);
  const [activeIdx,   setActiveIdx]   = useState(-1);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);

  useEffect(() => { setInputVal(value); }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchPredictions = useCallback(async (q: string) => {
    if (!TOKEN || q.length < 3) { setPredictions([]); setOpen(false); return; }
    setLoading(true);
    try {
      const url =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
        `?access_token=${TOKEN}&country=CA&proximity=-113.4938,53.5461&types=address&limit=6&language=en`;
      const res  = await fetch(url);
      const data = await res.json() as { features?: { id: string; place_name: string; text: string }[] };
      const preds: Prediction[] = (data.features ?? []).map((f) => ({
        id:            f.id,
        fullText:      f.place_name,
        mainText:      f.text,
        secondaryText: f.place_name.replace(f.text + ", ", ""),
        city:          extractCity(f.place_name),
      }));
      if (preds.length) { setPredictions(preds); setOpen(true); setActiveIdx(-1); }
      else              { setPredictions([]);     setOpen(false); }
    } catch {
      setPredictions([]); setOpen(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (val: string) => {
    setInputVal(val);
    onChange(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(val), 300);
  };

  const handleSelect = (p: Prediction) => {
    setInputVal(p.fullText);
    setOpen(false);
    setPredictions([]);
    setActiveIdx(-1);
    onChange(p.fullText, p.city);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, predictions.length - 1)); }
    else if (e.key === "ArrowUp")                   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, -1)); }
    else if (e.key === "Enter" && activeIdx >= 0)   { e.preventDefault(); handleSelect(predictions[activeIdx]); }
    else if (e.key === "Escape")                    { setOpen(false); }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className={`relative flex items-center rounded-xl border transition-all ${
        focused
          ? "border-[var(--color-brand-blue)] ring-2 ring-[var(--color-brand-blue)]/20"
          : "border-[var(--color-border)]"
      } bg-[var(--color-bg)]`}>
        <MapPin size={15} className={`absolute left-3 flex-shrink-0 pointer-events-none transition-colors ${
          focused ? "text-[var(--color-brand-blue)]" : "text-[var(--color-text-muted)]"
        }`} />
        <input
          ref={inputRef}
          type="text"
          required={required}
          value={inputVal}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="w-full pl-9 pr-9 py-2.5 bg-transparent focus:outline-none text-sm"
        />
        {loading ? (
          <Loader2 size={14} className="absolute right-3 text-[var(--color-text-muted)] animate-spin flex-shrink-0" />
        ) : inputVal ? (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setInputVal(""); onChange(""); setPredictions([]); setOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 text-[var(--color-text-muted)] hover:text-[var(--color-brand-red)] transition-colors"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>

      {open && predictions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white rounded-2xl border border-[var(--color-border)] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
          {predictions.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleSelect(p); }}
              className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors border-b border-[var(--color-border)] last:border-0 ${
                idx === activeIdx ? "bg-[var(--color-brand-blue-pale)]" : "hover:bg-slate-50"
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-blue-pale)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={12} className="text-[var(--color-brand-blue)]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text)] truncate">{p.mainText}</p>
                <p className="text-xs text-[var(--color-text-muted)] truncate">{p.secondaryText}</p>
              </div>
            </button>
          ))}
          <div className="px-4 py-2 bg-slate-50 border-t border-[var(--color-border)] flex items-center justify-end">
            <span className="text-[10px] text-[var(--color-text-muted)]">Powered by Mapbox</span>
          </div>
        </div>
      )}
    </div>
  );
}
