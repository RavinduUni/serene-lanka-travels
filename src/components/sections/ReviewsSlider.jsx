"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { reviews } from "@/data/home";
import { cn } from "@/lib/utils";

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
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Watercolor traveller illustration – decorative corner accent */}
      <img
        src="/side3.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -left-50 hidden w-[340px] select-none opacity-90 lg:block xl:w-[550px]"
        style={{ transform: "translateX(33%)" }}
      />
      <span className="watermark top-6 lg:top-4" aria-hidden="true">
        {reviews.watermark}
      </span>

      <Container className="relative">
        <Reveal>
          <SectionHeading lines={reviews.heading} align="center" className="mx-auto" />
        </Reveal>

        <div
          className="mx-auto mt-12 max-w-3xl rounded-card border border-brand-line bg-white p-8 text-center shadow-card sm:p-12 lg:mt-16"
          aria-live="polite"
        >
          <Quote className="mx-auto size-8 text-brand-blue" aria-hidden="true" />
          <div className="mt-4 flex justify-center gap-1" aria-label={`${r.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("size-4", i < r.rating ? "fill-brand-blue text-brand-blue" : "text-brand-line")}
                aria-hidden="true"
              />
            ))}
          </div>
          <blockquote className="mt-5 text-lg leading-relaxed text-brand-ink sm:text-xl">
            “{r.text}”
          </blockquote>
          <figcaption className="mt-7 flex items-center justify-center gap-4">
            <span className="relative size-12 overflow-hidden rounded-full bg-brand-sky">
              <SmartImage src={r.avatar} alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span className="text-left">
              <span className="block text-[15px] font-bold text-brand-navy">{r.name}</span>
              <span className="block text-[13px] text-brand-muted">
                {r.country} · {r.tour}
              </span>
            </span>
          </figcaption>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous review"
            className="grid size-11 place-items-center rounded-full border border-brand-line text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Choose review">
            {reviews.items.map((item, i) => (
              <button
                key={item.tour}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Review ${i + 1}`}
                onClick={() => go(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-8 bg-brand-blue" : "w-2 bg-brand-line hover:bg-brand-muted"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next review"
            className="grid size-11 place-items-center rounded-full border border-brand-line text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 text-center">
          <Button href="/reviews" variant="outline">
            Read All Reviews
          </Button>
        </div>
      </Container>
    </section>
  );
}
