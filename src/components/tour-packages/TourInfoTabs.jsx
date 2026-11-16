"use client";

import { useId, useRef, useState } from "react";
import { Check, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  included: { Icon: Check, tone: "bg-brand-sky text-brand-blue" },
  excluded: { Icon: X, tone: "bg-brand-mist text-brand-muted" },
  info: { Icon: Info, tone: "bg-amber-50 text-amber-600" },
};

/**
 * Accessible tabs (WAI-ARIA tabs pattern, automatic activation).
 * tabs: [{ id, label, kind: "included" | "excluded" | "info", items: [] }]
 * All panels stay in the HTML for SEO; inactive ones are hidden.
 */
export default function TourInfoTabs({ tabs }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const refs = useRef([]);

  const onKeyDown = (e) => {
    const last = tabs.length - 1;
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="overflow-hidden rounded-card border border-brand-line bg-white shadow-card">
      <div role="tablist" aria-label="Tour information" className="rail flex overflow-x-auto border-b border-brand-line bg-brand-mist p-1.5">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${baseId}-tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${t.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
            className={cn(
              "flex-1 whitespace-nowrap rounded-xl px-4 py-3 text-[14px] font-bold transition-colors sm:text-[15px]",
              active === i ? "bg-white text-brand-navy shadow-sm" : "text-brand-muted hover:text-brand-navy"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.map((t, i) => {
        const { Icon, tone } = ICONS[t.kind];
        return (
          <div
            key={t.id}
            id={`${baseId}-panel-${t.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${t.id}`}
            hidden={active !== i}
            tabIndex={0}
            className="p-6 focus-visible:outline-offset-[-4px] sm:p-8"
          >
            <ul className="space-y-3.5">
              {t.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-brand-ink">
                  <span className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full", tone)}>
                    <Icon className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
