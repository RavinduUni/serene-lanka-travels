"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Persistent enquiry action for phones/tablets (guide §05). It appears after
 * the hero and hides while the enquiry form is on screen, so it never covers
 * the form fields (guide §12).
 */
export default function MobileEnquiryBar({
  price,
  priceNote,
  whatsappMessage,
  heroId = "package-hero",
  formId = "enquire",
}) {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const form = document.getElementById(formId);
    const observers = [];
    if (hero) {
      const o = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0 });
      o.observe(hero);
      observers.push(o);
    }
    if (form) {
      const o = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0 });
      o.observe(form);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [heroId, formId]);

  const show = pastHero && !formVisible;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-brand-line bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_-12px_rgba(11,31,92,0.25)] backdrop-blur-md transition-transform duration-300 lg:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      )}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">From / person</p>
          <p className="truncate text-lg font-bold leading-tight text-brand-navy">{price}</p>
          <p className="truncate text-[11.5px] text-brand-muted">{priceNote}</p>
        </div>
        <a
          href={`#${formId}`}
          tabIndex={show ? 0 : -1}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-brand-blue px-5 text-[15px] font-semibold text-white"
        >
          Request a Quote
        </a>
      </div>
    </div>
  );
}
