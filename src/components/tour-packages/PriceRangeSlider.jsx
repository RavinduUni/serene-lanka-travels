"use client";

import { formatMoney } from "@/lib/tour-packages";

const thumb =
  "pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent focus:outline-none " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-blue [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(11,31,92,0.35)] " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-blue [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(11,31,92,0.35)] " +
  "focus-visible:[&::-webkit-slider-thumb]:ring-4 focus-visible:[&::-webkit-slider-thumb]:ring-brand-blue/30 focus-visible:[&::-moz-range-thumb]:ring-4 focus-visible:[&::-moz-range-thumb]:ring-brand-blue/30";

/**
 * Two native range inputs layered on one track (keyboard + screen-reader
 * accessible out of the box). value = [low, high].
 */
export default function PriceRangeSlider({ min, max, step, value, currency, onChange, idPrefix = "price" }) {
  const [lo, hi] = value;
  const span = max - min || 1;
  const left = ((lo - min) / span) * 100;
  const right = 100 - ((hi - min) / span) * 100;

  return (
    <div>
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-line" aria-hidden="true" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-blue"
          style={{ left: `${left}%`, right: `${right}%` }}
          aria-hidden="true"
        />
        <input
          id={`${idPrefix}-min`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          aria-label={`Minimum price per person (${currency})`}
          aria-valuetext={formatMoney(lo, currency)}
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi - step), hi])}
          className={thumb}
        />
        <input
          id={`${idPrefix}-max`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          aria-label={`Maximum price per person (${currency})`}
          aria-valuetext={formatMoney(hi, currency)}
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + step)])}
          className={thumb}
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 text-[13px] font-semibold text-brand-navy">
        <span className="rounded-lg border border-brand-line bg-white px-2.5 py-1.5">{formatMoney(lo, currency)}</span>
        <span className="h-px flex-1 bg-brand-line" aria-hidden="true" />
        <span className="rounded-lg border border-brand-line bg-white px-2.5 py-1.5">{formatMoney(hi, currency)}</span>
      </div>
    </div>
  );
}
