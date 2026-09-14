"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible single-open accordion (WAI-ARIA disclosure pattern).
 * items: [{ q, a }]
 */
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="divide-y divide-brand-line border-y border-brand-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] font-semibold text-brand-ink transition-colors hover:text-brand-blue sm:text-base"
              >
                <span>{item.q}</span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border border-brand-line text-brand-navy transition-transform duration-300",
                    isOpen && "rotate-45 border-brand-blue bg-brand-blue text-white"
                  )}
                >
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pr-10 text-[15px] leading-relaxed text-brand-muted"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
