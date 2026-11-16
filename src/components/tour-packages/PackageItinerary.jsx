"use client";

import { useId, useRef, useState } from "react";
import { BedDouble, Car, ChevronDown, Hotel, MapPin } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

const pad = (n) => String(n).padStart(2, "0");

/** Highlight tile – photo with label, or a branded tile when no approved photo exists yet. */
function Highlight({ item }) {
  return (
    <li className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-navy">
      {item.image ? (
        <>
          <SmartImage
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width:1024px) 240px, (min-width:640px) 30vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0)_40%,rgba(6,19,59,0.85)_100%)]"
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#1a8cff_0%,#0b1f5c_60%,#06133b_100%)]"
          aria-hidden="true"
        >
          <MapPin className="size-7 text-white/35" />
        </div>
      )}
      <span className="absolute inset-x-0 bottom-0 p-3 text-[13px] font-semibold leading-snug text-white sm:text-[14px]">
        {item.name}
      </span>
    </li>
  );
}

/**
 * Day-by-day accordion (guide §05 "Day accordion construction").
 * Every panel is rendered into the HTML (hidden when collapsed) so the full
 * itinerary stays indexable. Only Day 1 opens by default.
 * Keyboard: Up/Down/Home/End move between day headers.
 */
export default function PackageItinerary({ days }) {
  const [open, setOpen] = useState(() => new Set([0]));
  const baseId = useId();
  const headers = useRef([]);
  const allOpen = open.size === days.length;

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const onKeyDown = (e, i) => {
    const last = days.length - 1;
    const target = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    headers.current[target]?.focus();
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(days.map((_, i) => i)))}
          className="text-[14px] font-semibold text-black hover:text-brand-blue-dark"
        >
          {allOpen ? "Collapse all days" : "Expand all days"}
        </button>
      </div>

      <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[2.15rem] before:top-6 before:w-px before:bg-brand-line sm:before:left-[2.65rem]">
        {days.map((d, i) => {
          const isOpen = open.has(i);
          const panelId = `${baseId}-panel-${i}`;
          const buttonId = `${baseId}-button-${i}`;
          return (
            <li key={d.day} className="relative">
              <div
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition-shadow duration-300",
                  isOpen ? "border-brand-blue/30 shadow-card" : "border-brand-line"
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    ref={(el) => {
                      headers.current[i] = el;
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="flex w-full items-center gap-4 p-3 text-left sm:gap-5 sm:p-4"
                  >
                    <span
                      className={cn(
                        "flex size-11 shrink-0 flex-col items-center justify-center rounded-xl text-center transition-colors sm:size-[3.3rem]",
                        isOpen ? "bg-brand-blue text-white" : "bg-brand-navy text-white"
                      )}
                    >
                      <span className="text-[9px] font-semibold uppercase leading-none tracking-wider text-white/75 sm:text-[10px]">Day</span>
                      <span className="mt-0.5 text-lg font-bold leading-none sm:text-xl">{pad(d.day)}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold leading-snug text-black sm:text-[17px]">{d.title}</span>
                      <span className="mt-1 flex items-center gap-1.5 text-[12.5px] text-brand-muted sm:text-[13px]">
                        <BedDouble className="size-3.5 shrink-0" aria-hidden="true" />
                        {d.overnight ? `Overnight: ${d.overnight}` : "Departure day"}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        isOpen ? "rotate-180 border-brand-blue text-brand-blue" : "border-brand-line text-brand-navy"
                      )}
                    >
                      <ChevronDown className="size-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="border-t border-brand-line px-4 pb-6 pt-5 sm:px-6">
                  <p className="text-[15px] leading-[1.8] text-brand-ink sm:text-base">{d.intro}</p>

                  {d.image && (
                    <div className="relative mt-5 aspect-[16/8] overflow-hidden rounded-xl bg-brand-navy">
                      <SmartImage src={d.image.src} alt={d.image.alt} fill sizes="(min-width:1024px) 720px, 100vw" className="object-cover" />
                    </div>
                  )}

                  <div className="mt-5 rounded-xl bg-brand-mist p-5">
                    <h4 className="text-[14px] font-bold uppercase tracking-[0.08em] text-black">Day {pad(d.day)} Activities</h4>
                    <ul className="mt-3 space-y-2">
                      {d.activities.map((a) => (
                        <li key={a} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-brand-ink sm:text-[15px]">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-black" aria-hidden="true" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* <dl className="mt-6 grid gap-3 rounded-xl border border-brand-line p-4 text-[13.5px] sm:grid-cols-3">
                    <div className="flex items-start gap-2.5">
                      <BedDouble className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-brand-muted">Overnight</dt>
                        <dd className="font-semibold text-brand-navy">{d.overnight || "No overnight stay"}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Hotel className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-brand-muted">Accommodation</dt>
                        <dd className="font-semibold text-brand-navy">
                          {d.overnight ? d.accommodation || "Confirmed in your quotation" : "—"}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Car className="mt-0.5 size-4 shrink-0 text-brand-blue" aria-hidden="true" />
                      <div>
                        <dt className="font-semibold text-brand-muted">Transport</dt>
                        <dd className="font-semibold text-brand-navy">{d.transport}</dd>
                      </div>
                    </div>
                    {d.meals && (
                      <div className="flex items-start gap-2.5 sm:col-span-3">
                        <dt className="font-semibold text-brand-muted">Meals</dt>
                        <dd className="font-semibold text-brand-navy">{d.meals}</dd>
                      </div>
                    )}
                  </dl> */}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
