"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { reviews } from "@/data/home";
import Image from "next/image";

export default function ReviewsSlider() {
  const [index, setIndex] = useState(0);
  const total = reviews.items.length;
  const go = (n) => setIndex((n + total) % total);

  // Gentle auto-advance; pauses when the tab is hidden
  useEffect(() => {
    if (total < 2) return undefined;
    const id = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % total);
    }, 7000);
    return () => clearInterval(id);
  }, [total]);

  const r = reviews.items[index];

  return (
    <section className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden lg:min-h-[95vh] py-20 lg:py-28">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Parallax className="w-full h-full" speed={1.5}>
          <div className="absolute -inset-[15%] h-[130%] w-[130%]">
            <Image
              src={"https://images.unsplash.com/photo-1589373797397-d19670f47549?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="Reviews Background"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={false}
            />
          </div>
        </Parallax>
        {/* White gradient overlay to blend into white at top and ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      <Container className="relative z-10 flex h-full flex-1 flex-col py-20 lg:py-28">
        {/* Top Content */}
        <div className="relative mx-auto w-full max-w-4xl text-center">
          {/* Watermark */}
          <span
            className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 -translate-y-1/2 select-none text-[18vw] font-bold lowercase tracking-tighter text-gray-300 lg:text-[160px]"
            style={{ opacity: 0.6, lineHeight: 0.8 }}
            aria-hidden="true"
          >
            {reviews.watermark || "real stories"}
          </span>

          <div className="relative z-10 mt-16 lg:mt-24">
            <Reveal>
              <SectionHeading lines={reviews.heading} align="center" className="mx-auto" />
            </Reveal>
          </div>
        </div>

        {/* Center Content - The Review Slider */}
        <div className="relative mt-auto mb-auto w-full pt-16 lg:pt-24 flex items-center justify-center min-h-[300px]">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous review"
            className="absolute left-0 z-20 hidden md:flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-black text-black transition-colors hover:bg-black/5 hover:text-black"
          >
            <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </button>

          {/* Active Review Content */}
          <div className="max-w-4xl px-4 text-center md:px-16" aria-live="polite">
            <h3 className="text-sm lg:text-[18px] font-bold text-black mb-6">"{r.tour}"</h3>
            <p className="mx-auto max-w-3xl text-[14px] leading-relaxed text-black/80 sm:text-base lg:text-[17px] font-medium transition-opacity duration-300">
              {r.text}
            </p>
            <p className="mt-8 text-sm font-bold text-black lg:text-[15px]">
              - {r.name} -
            </p>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next review"
            className="absolute right-0 z-20 hidden md:flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-black text-black transition-colors hover:bg-black/5 hover:text-black"
          >
            <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Arrows (since absolute is hidden on md) */}
        <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous review"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 text-black transition-colors hover:bg-black/5"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next review"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 text-black transition-colors hover:bg-black/5"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

      </Container>
    </section>
  );
}
