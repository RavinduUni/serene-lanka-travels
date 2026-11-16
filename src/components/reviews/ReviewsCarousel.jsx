"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "@/components/reviews/ReviewCard";
import { cn } from "@/lib/utils";

/**
 * Scroll-snap review rail with side previous/next arrows.
 * Supports single or two-row layout (rows = 1 | 2).
 * Left and right buttons float vertically centered on each side of the rail.
 */
export default function ReviewsCarousel({ reviews, rows = 2 }) {
  const railRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Group reviews into columns of `rows` cards
  const columns = [];
  if (rows === 2) {
    for (let i = 0; i < reviews.length; i += 2) {
      columns.push(reviews.slice(i, i + 2));
    }
  } else {
    for (let i = 0; i < reviews.length; i++) {
      columns.push([reviews[i]]);
    }
  }

  const update = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = railRef.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir) => {
    const el = railRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el.firstElementChild).columnGap || "20") || 20;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      {/* Left button */}
      {columns.length > 1 && (
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous reviews"
          className={cn(
            "absolute left-1 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 grid size-10 sm:size-11 lg:size-12 place-items-center rounded-full border border-brand-line bg-white/95 text-brand-navy shadow-lift backdrop-blur-sm transition-all hover:bg-brand-blue hover:text-white hover:border-brand-blue hover:scale-105 cursor-pointer",
            atStart
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          )}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
        </button>
      )}

      {/* Reviews rail */}
      <div
        ref={railRef}
        className="rail -mx-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
        tabIndex={0}
        aria-label="Guest reviews – scroll for more"
      >
        <ul className="flex snap-x snap-mandatory gap-5">
          {columns.map((col, idx) => (
            <li
              key={col[0]?.id || idx}
              className={cn(
                "w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]",
                rows === 2 ? "flex flex-col gap-5" : ""
              )}
            >
              {col.map((r) => (
                <div key={r.id} className={rows === 2 ? "flex flex-1 flex-col" : "h-full"}>
                  <ReviewCard review={r} />
                </div>
              ))}
              {rows === 2 && col.length === 1 && (
                <div className="flex-1 hidden sm:block" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right button */}
      {columns.length > 1 && (
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next reviews"
          className={cn(
            "absolute right-1 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 grid size-10 sm:size-11 lg:size-12 place-items-center rounded-full border border-brand-line bg-white/95 text-brand-navy shadow-lift backdrop-blur-sm transition-all hover:bg-brand-blue hover:text-white hover:border-brand-blue hover:scale-105 cursor-pointer",
            atEnd
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          )}
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
