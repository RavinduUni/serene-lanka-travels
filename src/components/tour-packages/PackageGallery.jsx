"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

/**
 * Lead landscape photo with arrows, swipe and a thumbnail strip (guide §05).
 * images: [{ src, caption }] – captions double as alt text, so keep them accurate.
 */
export default function PackageGallery({ images, title }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const thumbs = useRef(null);
  const count = images.length;
  const current = images[index];

  const go = (next) => {
    const i = (next + count) % count;
    setDirection(next > index ? 1 : -1);
    setIndex(i);
    thumbs.current?.children[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section aria-roledescription="carousel" aria-label={`${title} photo gallery`}>
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-card bg-brand-navy-deep sm:aspect-[16/10]"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(index - 1);
          if (e.key === "ArrowRight") go(index + 1);
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current.src}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            custom={direction}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1);
              else if (info.offset.x > 60) go(index - 1);
            }}
          >
            <SmartImage
              src={current.src}
              alt={current.caption}
              fill
              priority={index === 0}
              draggable={false}
              sizes="(min-width:1280px) 800px, (min-width:1024px) 62vw, 100vw"
              className="pointer-events-none object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,rgba(6,19,59,0)_0%,rgba(6,19,59,0.75)_100%)]"
          aria-hidden="true"
        />
        <p className="pointer-events-none absolute bottom-4 left-4 right-28 text-[14px] font-semibold text-white sm:bottom-5 sm:left-6 sm:text-base" aria-live="polite">
          {current.caption}
        </p>
        <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-navy/75 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur-sm">
          <Images className="size-3.5" aria-hidden="true" />
          {index + 1} / {count}
        </span>

        {count > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-2 sm:bottom-4 sm:right-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous photo"
              className="grid size-10 place-items-center rounded-full bg-white/90 text-brand-navy shadow-card transition-colors hover:bg-white"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next photo"
              className="grid size-10 place-items-center rounded-full bg-brand-blue text-white shadow-card transition-colors hover:bg-brand-blue-dark"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {count > 1 && (
        <div ref={thumbs} className="rail mt-3 flex gap-2.5 overflow-x-auto pb-1 sm:gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photo ${i + 1}: ${img.caption}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-xl ring-offset-2 transition sm:w-24",
                i === index ? "ring-2 ring-brand-blue" : "opacity-70 hover:opacity-100"
              )}
            >
              <SmartImage src={img.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
