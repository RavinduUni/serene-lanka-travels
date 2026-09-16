"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 5000;

/**
 * "Places you will visit" showcase (Blue Lanka reference style):
 * one large featured image that crossfades automatically, the place name and
 * description overlaid, a clickable thumbnail strip and prev/next arrows.
 *
 * Performance: every image is mounted once and only opacity animates, so after
 * the first cycle there are no network requests or remounts. Auto-play pauses
 * on hover, on keyboard focus, when the tab is hidden and for reduced motion.
 */
export default function PlacesCarousel({ places }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const total = places.length;
  const liveRef = useRef(null);

  const go = useCallback((n) => setActive(((n % total) + total) % total), [total]);

  useEffect(() => {
    if (reduce || paused || total < 2) return undefined;
    const id = setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [reduce, paused, total]);

  if (!total) return null;
  const place = places[active];

  return (
    <div
      className="group relative overflow-hidden rounded-card bg-brand-navy-deep shadow-lift"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Places you will visit"
    >
      {/* Stage */}
      <div className="relative aspect-4/5 sm:aspect-16/10 lg:aspect-21/10">
        {places.map((p, i) => (
          <motion.div
            key={p.name}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.9, ease: "easeInOut" }}
            aria-hidden={i !== active}
          >
            <SmartImage
              src={p.image}
              alt={i === active ? p.name : ""}
              fill
              sizes="(min-width:1024px) 90vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        ))}
        <div
          className="absolute inset-0 bg-[linear-gradient(75deg,rgba(6,19,59,0.82)_0%,rgba(6,19,59,0.35)_45%,rgba(6,19,59,0.15)_70%,rgba(6,19,59,0.55)_100%)]"
          aria-hidden="true"
        />

        {/* Caption */}
        <div className="absolute inset-x-0 top-0 p-6 sm:max-w-md sm:p-9 lg:max-w-lg lg:p-12" aria-live="polite" ref={liveRef}>
          <motion.div
            key={place.name}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[13px] font-semibold text-white/70">
              {active + 1} / {total}
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{place.name}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-white/85 sm:text-[15px]">{place.blurb}</p>
          </motion.div>
        </div>

        {/* Arrows */}
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 sm:left-6">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous place"
            className="grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-brand-blue"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 sm:right-6">
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next place"
            className="grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-brand-blue"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:flex lg:justify-end lg:p-8">
          <ul className="rail flex gap-3 overflow-x-auto" role="tablist" aria-label="Choose a place">
            {places.map((p, i) => (
              <li key={p.name} className="shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={p.name}
                  onClick={() => go(i)}
                  className={cn(
                    "group/thumb relative block h-20 w-24 overflow-hidden rounded-xl border-2 transition-all sm:h-28 sm:w-32",
                    i === active
                      ? "border-brand-blue shadow-[0_0_0_3px_rgba(26,140,255,0.35)]"
                      : "border-white/25 opacity-75 hover:opacity-100"
                  )}
                >
                  <SmartImage src={p.image} alt="" fill sizes="128px" className="object-cover" />
                  <span
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0)_35%,rgba(6,19,59,0.8)_100%)]"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-1.5 text-left text-[11px] font-bold leading-tight text-white sm:p-2 sm:text-[12px]">
                    {p.name}
                  </span>
                  {i === active && !reduce && (
                    <motion.span
                      key={`bar-${active}-${paused}`}
                      className="absolute inset-x-0 top-0 h-1 origin-left bg-brand-blue"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={{ duration: paused ? 0 : AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
