"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Table of contents with scroll-spy. Desktop: sticky sidebar list.
 * Mobile/tablet: a collapsible <details> so it never pushes content far down.
 */
export default function LegalToc({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const list = (
    <ol className="space-y-0.5">
      {sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            aria-current={active === s.id ? "true" : undefined}
            className={cn(
              "flex gap-3 rounded-xl px-3 py-2 text-[14px] leading-snug transition-colors",
              active === s.id
                ? "bg-brand-sky font-semibold text-brand-navy"
                : "text-black hover:bg-brand-mist hover:text-brand-ink"
            )}
          >
            <span className={cn("w-5 shrink-0 tabular-nums", active === s.id ? "text-brand-blue" : "text-brand-muted/70")}>
              {i + 1}.
            </span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {/* Mobile / tablet */}
      <details className="group rounded-card border border-brand-line bg-white shadow-card lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-[15px] font-bold text-brand-navy [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <ListOrdered className="size-5 text-brand-blue" aria-hidden="true" />
            Contents
          </span>
          <ChevronDown className="size-5 text-brand-blue transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <nav aria-label="Contents" className="border-t border-brand-line px-2 py-3">
          {list}
        </nav>
      </details>

      {/* Desktop */}
      <nav aria-label="Contents" className="hidden rounded-card border border-brand-line bg-white p-4 shadow-card lg:block">
        <p className="flex items-center gap-2 px-3 pb-3 text-[13px] font-bold uppercase tracking-wide text-brand-navy">
          <ListOrdered className="size-4 text-brand-blue" aria-hidden="true" />
          Contents
        </p>
        {list}
      </nav>
    </>
  );
}
