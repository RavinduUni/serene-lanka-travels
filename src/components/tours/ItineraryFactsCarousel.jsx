"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Moon, MapPin, Flag, BedDouble, UtensilsCrossed, Car, Languages } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 5000;

/**
 * "Tour at a glance" presented as a PlacesCarousel-style image carousel.
 * Each slide shows one itinerary fact (label + value + icon) overlaid on a
 * cycling background image drawn from tour.gallery (falls back to heroImage).
 */
export default function ItineraryFactsCarousel({ tour }) {
  const facts = [
    { label: "Duration",       value: tour.duration,                                Icon: Clock },
    { label: "Nights",         value: tour.nights ? `${tour.nights} nights` : null, Icon: Moon },
    { label: "Starts",         value: tour.startLocation,                           Icon: MapPin },
    { label: "Ends",           value: tour.endLocation,                             Icon: Flag },
    { label: "Accommodation",  value: tour.accommodation,                           Icon: BedDouble },
    { label: "Meal plan",      value: tour.mealPlan,                               Icon: UtensilsCrossed },
    { label: "Transportation", value: tour.transportation,                          Icon: Car },
    { label: "Driver / guide", value: tour.driverGuide,                            Icon: Languages },
  ].filter((f) => f.value);

  const images = (tour.gallery && tour.gallery.length > 0)
    ? tour.gallery
    : [tour.heroImage];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const total = facts.length;
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
  const fact = facts[active];

  return (
    <div
      className="group relative overflow-hidden rounded-card bg-brand-navy-deep shadow-lift"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Tour at a glance"
    >
      <div className="relative aspect-4/5 sm:aspect-16/10 lg:aspect-21/10">

        {images.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active % images.length ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 1.1, ease: "easeInOut" }}
            aria-hidden
          >
            <SmartImage
              src={src}
              alt=""
              fill
              sizes="(min-width:1024px) 90vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        ))}

        <div
          className="absolute inset-0 bg-[linear-gradient(75deg,rgba(6,19,59,0.88)_0%,rgba(6,19,59,0.45)_50%,rgba(6,19,59,0.25)_75%,rgba(6,19,59,0.6)_100%)]"
          aria-hidden="true"
        />

        <div
          className="absolute inset-x-0 top-0 p-6 sm:max-w-md sm:p-9 lg:max-w-lg lg:p-12"
          aria-live="polite"
          ref={liveRef}
        >
          <motion.div
            key={fact.label}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[13px] font-semibold text-white/70">
              {active + 1} / {total}
            </p>
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-widest text-white/60">
              {fact.label}
            </p>
            <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {fact.value}
            </h3>
          </motion.div>
        </div>

        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 sm:left-6">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous fact"
            className="grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-brand-blue"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 sm:right-6">
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next fact"
            className="grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-brand-blue"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:flex lg:justify-end lg:p-8">
          <ul className="rail flex gap-2.5 overflow-x-auto" role="tablist" aria-label="Choose a fact">
            {facts.map((f, i) => (
              <li key={f.label} className="shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={f.label}
                  onClick={() => go(i)}
                  className={cn(
                    "relative flex h-16 w-20 flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border-2 transition-all sm:h-20 sm:w-24",
                    i === active
                      ? "border-brand-blue"
                      : "border-white/25 opacity-75 hover:opacity-100"
                  )}
                >
                  {/* Background image */}
                  <SmartImage
                    src={images[i % images.length]}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  {/* Dark overlay */}
                  <span
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,19,59,0.35)_0%,rgba(6,19,59,0.75)_100%)]"
                    aria-hidden="true"
                  />
                  {/* Icon + label on top */}
                  <f.Icon
                    className={cn("relative z-10 size-4 sm:size-5", i === active ? "text-brand-blue" : "text-white")}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "relative z-10 text-center text-[10px] font-semibold leading-tight sm:text-[11px]",
                      i === active ? "text-white" : "text-white/80"
                    )}
                  >
                    {f.label}
                  </span>

                  {i === active && !reduce && (
                    <motion.span
                      key={`bar-${active}-${paused}`}
                      className="absolute inset-x-0 top-0 z-20 h-0.5 origin-left bg-brand-blue"
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
