"use client";

import { useState, useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";

export default function BrandMeaningCarousel({ cards }) {
  if (!cards || cards.length === 0) return null;

  const total = cards.length;
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVisibleCount(1);
      } else if (w < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, total - visibleCount);

  // Clamp index if viewport resize decreases maxIndex
  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      next();
    } else if (diff < -45) {
      prev();
    }
  };

  const getTransform = () => {
    if (visibleCount === 1) {
      return `translateX(calc(${-index} * (100% + 20px)))`;
    }
    if (visibleCount === 2) {
      return `translateX(calc(${-index} * (50% + 10px)))`;
    }
    return `translateX(calc(${-index} * (100% / 3 + 20px / 3)))`;
  };

  return (
    <div className="mt-auto flex w-full flex-col pt-8 lg:pt-12 relative pb-8">
      {/* Navigation Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-3 mb-4 lg:absolute lg:right-0 lg:-top-16 lg:mb-0 pr-1 lg:pr-4 z-20">
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brand-navy/80 sm:hidden">
          <span className="font-bold text-brand-blue">{index + 1}</span>
          <span>/</span>
          <span>{total}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous card"
            className="grid size-10 sm:size-11 place-items-center rounded-full border border-gray-300 bg-white/90 text-brand-navy shadow-sm transition-all duration-200 hover:bg-brand-navy hover:text-white hover:border-brand-navy backdrop-blur-sm active:scale-95"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next card"
            className="grid size-10 sm:size-11 place-items-center rounded-full border border-gray-300 bg-white/90 text-brand-navy shadow-sm transition-all duration-200 hover:bg-brand-navy hover:text-white hover:border-brand-navy backdrop-blur-sm active:scale-95"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden w-full touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ul
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-full"
          style={{
            gap: "20px",
            transform: getTransform(),
          }}
        >
          {cards.map((card) => {
            const Icon = Icons[card.icon] || Icons.Sparkles;
            return (
              <li
                key={card.label}
                className="group relative block overflow-hidden rounded-card bg-brand-navy shadow-xl transition-transform shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333333%-13.333333px)] aspect-[4/5] sm:aspect-[3/4]"
              >
                {/* Photo — scales on hover */}
                <SmartImage
                  src={card.image}
                  alt={card.label}
                  fill
                  sizes="(min-width:1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Permanent bottom gradient (name + tag always visible) */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_65%,rgba(0,0,0,0.92)_100%)]"
                  aria-hidden="true"
                />

                {/* Hover overlay — full dark tint that fades in */}
                <div
                  className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Default state: name + tag pinned to bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-white transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2 sm:p-5">
                  <p className="text-lg font-bold leading-tight sm:text-xl">{card.label}</p>
                  <p className="mt-1 text-[12px] font-medium text-white/75 sm:text-[13px]">{card.tag}</p>
                </div>

                {/* Hover state: centred overlay content that rises into view */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {/* Name */}
                  <p className="text-2xl font-bold text-white sm:text-3xl">{card.label}</p>
                  {/* Blurb */}
                  {card.subtitle && (
                    <p className="mt-3 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                      {card.subtitle}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
