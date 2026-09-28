"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/motion/Reveal";

export default function BrandMeaningCarousel({ cards }) {
  const total = cards.length;
  const VISIBLE_LG = 3;
  const maxIndex = total - VISIBLE_LG;

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  return (
    <div className="mt-auto flex w-full flex-col pt-8 lg:pt-12 relative pb-8">
      {/* Navigation Buttons */}
      <div className="absolute right-0 -top-16 flex items-center gap-3 pr-4 z-20">
        <button
          onClick={prev}
          aria-label="Previous cards"
          className="grid size-11 place-items-center rounded-full border border-gray-300 bg-white/90 text-brand-navy shadow-sm transition-all duration-200 hover:bg-brand-navy hover:text-white hover:border-brand-navy backdrop-blur-sm"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next cards"
          className="grid size-11 place-items-center rounded-full border border-gray-300 bg-white/90 text-brand-navy shadow-sm transition-all duration-200 hover:bg-brand-navy hover:text-white hover:border-brand-navy backdrop-blur-sm"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="overflow-hidden w-full">
        <ul
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            gap: "20px",
            transform: `translateX(calc(${-index} * (100% / 3 + 20px / 3)))`,
          }}
        >
          {cards.map((card, i) => {
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
