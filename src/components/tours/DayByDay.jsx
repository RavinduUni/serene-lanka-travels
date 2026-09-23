"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DayByDay({ items }) {
  const [open, setOpen] = useState(() => new Set([0]));
  const baseId = useId();
  const allOpen = open.size === items.length;

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((_, i) => i)))}
          className="text-[13px] font-semibold text-brand-blue hover:text-brand-blue-dark"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ol className="space-y-3">
        {items.map((d, i) => {
          const isOpen = open.has(i);
          const panelId = `${baseId}-day-${i}`;
          return (
            <li key={d.day} className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-[0_1px_0_0_#e6eaf1]">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="flex w-full items-stretch text-left"
                >
                  <span className="flex w-24 shrink-0 items-center justify-center bg-brand-navy px-3 text-[13px] font-bold uppercase tracking-wide text-white sm:w-28">
                    Day {String(d.day).padStart(2, "0")}
                  </span>
                  <span className="flex flex-1 items-center justify-between gap-4 px-4 py-4 sm:px-6">
                    <span className="text-[15px] font-bold text-brand-ink sm:text-base">{d.title}</span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-brand-blue transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                hidden={!isOpen}
                className="border-t border-brand-line px-5 py-5 sm:px-7"
              >
                <ul className="space-y-2.5">
                  {d.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[14px] leading-relaxed text-brand-muted">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
