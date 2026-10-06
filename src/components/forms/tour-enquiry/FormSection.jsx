"use client";

import { ChevronDown, Check, CircleCheck, CircleAlert, Asterisk, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Badge per spec p.2 – text + icon, never colour alone. */
const BADGES = {
  required: { label: "Required", Icon: Asterisk, className: "border-brand-navy/20 bg-white text-brand-navy" },
  complete: { label: "Complete", Icon: CircleCheck, className: "border-brand-blue/30 bg-brand-sky text-brand-blue" },
  optional: { label: "Optional", Icon: Plus, className: "border-brand-line bg-brand-mist text-brand-muted" },
  added: { label: "Added", Icon: Check, className: "border-brand-blue/30 bg-brand-sky text-brand-blue" },
  attention: { label: "Needs attention", Icon: CircleAlert, className: "border-red-200 bg-red-50 text-red-700" },
};

/**
 * One accordion section. The whole heading is a real <button> toggle with
 * aria-expanded / aria-controls. The panel stays mounted (hidden) so values
 * and DOM ids survive closing (spec p.2, p.8).
 */
export default function FormSection({ section, status, open, onToggle, children }) {
  const headerId = `tes-${section.id}-header`;
  const panelId = `tes-${section.id}-panel`;
  const badge = BADGES[status] || BADGES.optional;
  const BadgeIcon = badge.Icon;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border bg-white shadow-card transition-colors",
        status === "attention" ? "border-red-300" : open ? "border-brand-blue/40" : "border-brand-line"
      )}
    >
      <h2 className="m-0">
        <button
          id={headerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-brand-mist/60 sm:gap-4 sm:px-6 sm:py-5"
        >
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full text-[13px] font-bold sm:size-11",
              status === "complete" || status === "added" ? "bg-brand-blue text-white" : "bg-brand-sky text-brand-navy"
            )}
            aria-hidden="true"
          >
            {status === "complete" || status === "added" ? <Check className="size-5" /> : section.number}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[16px] font-bold leading-tight text-brand-navy sm:text-[17px]">
              <span className="sr-only">Section {section.number}: </span>
              {section.title}
            </span>
            <span className="mt-0.5 block text-[13px] leading-snug text-brand-muted sm:text-[14px]">{section.subtitle}</span>
          </span>
          <span
            className={cn(
              "hidden shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-bold sm:inline-flex",
              badge.className
            )}
          >
            <BadgeIcon className="size-3.5" aria-hidden="true" />
            {badge.label}
          </span>
          {/* compact badge on phones – still text, not colour alone */}
          <span className={cn("inline-flex shrink-0 items-center rounded-full border p-1.5 sm:hidden", badge.className)}>
            <BadgeIcon className="size-3.5" aria-hidden="true" />
            <span className="sr-only">{badge.label}</span>
          </span>
          <ChevronDown
            className={cn("size-5 shrink-0 text-brand-blue transition-transform duration-200 motion-reduce:transition-none", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div id={panelId} role="region" aria-labelledby={headerId} hidden={!open} className="border-t border-brand-line px-4 pb-6 pt-5 sm:px-6">
        <p className={cn("mb-4 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-bold sm:hidden", badge.className)} aria-hidden="true">
          <BadgeIcon className="size-3.5" />
          {badge.label}
        </p>
        {children}
      </div>
    </div>
  );
}
