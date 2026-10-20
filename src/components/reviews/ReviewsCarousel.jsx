"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "@/components/reviews/ReviewCard";
import { cn } from "@/lib/utils";

/**
 * Scroll-snap review rail with previous/next arrows (reference layout).
 * Native scrolling keeps it swipeable on touch and fully keyboard/screen-reader
 * friendly; arrows move one card at a time and disable at each end.
 */
export default function ReviewsCarousel({ reviews }) {
  const railRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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

  const arrow = (dir, disabled, Icon, label) => (
    <button
      type="button"
      onClick={() => scrollByCard(dir)}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "grid size-11 place-items-center rounded-full border bg-white shadow-card transition-colors",
        disabled ? "cursor-not-allowed border-brand-line text-brand-line" : "border-brand-line text-brand-navy hover:border-brand-blue hover:text-brand-blue",
        Icon == ChevronRight ? "bg-brand-navy" : "bg-brand-blue"
      )}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );

  return (
    <div>
      <div ref={railRef} className="rail -mx-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0" tabIndex={0} aria-label="Guest reviews – scroll for more">
        <ul className="flex snap-x snap-mandatory gap-5">
          {reviews.map((r) => (
            <li key={r.id} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>
      </div>
      {reviews.length > 1 && (
        <div className="mt-4 flex justify-center gap-3">
          {arrow(-1, atStart, ChevronLeft, "Previous reviews")}
          {arrow(1, atEnd, ChevronRight, "Next reviews")}
        </div>
      )}
    </div>
  );
}
