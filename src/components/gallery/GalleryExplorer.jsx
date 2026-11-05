"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { galleryCategories } from "@/data/gallery";

/* ─── Category Filter Bar ───────────────────────────────────────────────── */
function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {galleryCategories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          className={cn(
            "rounded-full px-4 py-2 text-[13px] sm:text-sm font-semibold transition-all duration-200",
            active === cat.id
              ? "bg-brand-blue text-white shadow-md scale-105"
              : "bg-brand-mist text-brand-muted hover:bg-brand-sky hover:text-brand-blue"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Lightbox ──────────────────────────────────────────────────────────── */
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() =>
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length]);

  const next = useCallback(() =>
    setCurrent((i) => (i === images.length - 1 ? 0 : i + 1)), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const img = images[current];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Panel – stop click propagation */}
      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <X className="size-5" />
        </button>

        {/* Counter */}
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1 text-[13px] font-medium text-white backdrop-blur-sm">
          {current + 1} / {images.length}
        </span>

        {/* Image */}
        <div className="relative w-full" style={{ height: "calc(100vh - 160px)" }}>
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 flex items-center gap-2 text-center text-white/80">
          {img.location && (
            <span className="flex items-center gap-1 text-[13px]">
              <MapPin className="size-3.5 text-brand-blue" aria-hidden="true" />
              {img.location}
            </span>
          )}
          {img.location && <span className="text-white/40">·</span>}
          <span className="max-w-lg text-[13px] leading-snug">{img.alt}</span>
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:left-4"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:right-4"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>
  );
}

/* ─── Gallery Grid ──────────────────────────────────────────────────────── */
function GalleryItem({ image, index, onClick }) {
  return (
    <li
      className="group relative cursor-pointer overflow-hidden rounded-card bg-brand-navy"
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${image.alt}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(index); }}
    >
      <div className="aspect-[4/3]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

     
    </li>
  );
}

/* ─── Main Export ───────────────────────────────────────────────────────── */
export default function GalleryExplorer({ images }) {
  const [category, setCategory] = useState("all");
  const [lightbox, setLightbox] = useState(null); // index into filtered list

  const filtered = category === "all"
    ? images
    : images.filter((img) => img.category === category);

  const handleOpen = useCallback((index) => setLightbox(index), []);
  const handleClose = useCallback(() => setLightbox(null), []);

  return (
    <>

      {/* Grid */}
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {filtered.map((img, i) => (
          <GalleryItem
            key={`${img.src}-${i}`}
            image={img}
            index={i}
            onClick={handleOpen}
          />
        ))}
      </ul>

      {filtered.length === 0 && (
        <div className="mt-20 text-center text-brand-muted">
          <p className="text-lg font-semibold">No photos in this category yet.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          images={filtered}
          startIndex={lightbox}
          onClose={handleClose}
        />
      )}
    </>
  );
}

