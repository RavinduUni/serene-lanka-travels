"use client";

import { useState, useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { whyChoose } from "@/data/about";

export default function WhyChooseCarousel() {
  const items = whyChoose.items;
  const total = items.length;
  
  const [visibleCount, setVisibleCount] = useState(4);
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
        setVisibleCount(4);
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, total - visibleCount);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // Wrap-around navigation — never stops, always shows visible cards
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
      return `translateX(calc(${-index} * (100% + 16px)))`;
    }
    if (visibleCount === 2) {
      return `translateX(calc(${-index} * (50% + 10px)))`;
    }
    return `translateX(calc(${-index} * (25% + 5px)))`;
  };

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="mb-10 grid items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading lines={whyChoose.heading} />
          </Reveal>
          <p className="max-w-md text-[15px] leading-relaxed text-black lg:col-span-4">
            {whyChoose.copy}
          </p>
          {/* Prev / Next buttons */}
          <div className="flex items-center gap-3 lg:col-span-3 lg:justify-end">
            <button
              onClick={prev}
              aria-label="Previous cards"
              className="grid size-11 place-items-center rounded-full border border-brand-line bg-white text-brand-navy shadow-sm transition-all duration-200 hover:bg-brand-navy hover:text-white hover:border-brand-navy"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next cards"
              className="grid size-11 place-items-center rounded-full border border-brand-navy bg-brand-navy text-white shadow-sm transition-all duration-200 hover:bg-brand-navy/80"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div 
          className="overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ul
            className="flex gap-4 sm:gap-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-full"
            style={{
              transform: getTransform(),
            }}
          >
            {items.map((item) => {
              const Icon = Icons[item.icon] || Icons.Check;
              return (
                <li
                  key={item.label}
                  className="relative shrink-0 overflow-hidden rounded-card bg-brand-navy group
                    w-[calc(100%-0px)] aspect-[4/5]
                    sm:w-[calc(50%-10px)] sm:aspect-[3/4]
                    lg:w-[calc(25%-15px)]"
                >
                  {/* Photo – zooms on hover */}
                  <SmartImage
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Permanent bottom gradient */}
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_40%,rgba(0,0,0,0.93)_100%)]"
                    aria-hidden="true"
                  />

                  {/* Hover dark tint */}
                  <div
                    className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  {/* Default state – name + tag pinned bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0">
                    <p className="text-base font-bold leading-tight sm:text-lg">{item.label}</p>
                    <p className="mt-1 text-[12px] font-medium text-white/70">{item.tag}</p>
                  </div>

                  {/* Hover state – centred content */}
                  <div className="absolute inset-0 flex translate-y-4 flex-col items-center justify-center p-5 text-center opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="mb-3 grid size-12 place-items-center rounded-full bg-white/15 backdrop-blur-sm">
                      <Icon className="size-6 text-white" aria-hidden="true" />
                    </span>
                    <p className="text-xl font-bold text-white sm:text-2xl">{item.label}</p>
                    <p className="mt-3 max-w-[22ch] text-[13px] leading-relaxed text-white/80">
                      {item.blurb}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, i) => {
            // Only show dots up to maxIndex (each dot = one valid start position)
            if (i > maxIndex) return null;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to card group ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-brand-navy"
                    : "w-1.5 bg-brand-navy/30 hover:bg-brand-navy/60"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
