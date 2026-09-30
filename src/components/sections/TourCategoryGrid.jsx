"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { tourCategories } from "@/data/home";

export default function TourCategoryGrid() {
  const items = tourCategories.items;
  const total = items.length;
  const VISIBLE_LG = 4;
  const maxIndex = total - VISIBLE_LG;

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-brand-mist">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="mb-10 grid items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading lines={tourCategories.heading} />
          </Reveal>
          <p className="max-w-md text-[15px] leading-relaxed text-black lg:col-span-5">{tourCategories.copy}</p>
          {/* Prev / Next buttons */}
          <div className="flex items-center gap-3 lg:col-span-3 lg:justify-end">
            <button
              onClick={prev}
              aria-label="Previous categories"
              className="grid size-11 place-items-center rounded-full border border-brand-line bg-white text-brand-navy shadow-sm transition-all duration-200 hover:bg-brand-navy hover:text-white hover:border-brand-navy"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next categories"
              className="grid size-11 place-items-center rounded-full border border-brand-navy bg-brand-navy text-white shadow-sm transition-all duration-200 hover:bg-brand-navy/80"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="overflow-hidden">
          <ul
            className="flex gap-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-5 [--slide-width:calc(100%+16px)] sm:[--slide-width:calc(50%+10px)] lg:[--slide-width:calc(25%+5px)]"
            style={{
              transform: `translateX(calc(${-index} * var(--slide-width)))`,
            }}
          >
            {items.map((item) => (
              <li
                key={item.label}
                className="relative shrink-0 overflow-hidden rounded-card bg-brand-navy shadow-card group w-[calc(100%-0px)] aspect-[3/4] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
              >
                <Link
                  href={item.href}
                  className="group relative block h-full w-full"
                >
                  <SmartImage
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.85)_100%)]"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                    <span className="text-lg font-bold leading-tight">{item.label}</span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-brand-blue">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, i) => {
            if (i > maxIndex) return null;
            return (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to category ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-brand-navy"
                    : "w-1.5 bg-brand-navy/30 hover:bg-brand-navy/60"
                }`}
              />
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-10 flex justify-center">
          <Button href={tourCategories.cta.href} size="lg" variant="primary">
            {tourCategories.cta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
