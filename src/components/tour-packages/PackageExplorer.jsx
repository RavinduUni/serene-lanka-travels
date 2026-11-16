"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpDown, Compass, SlidersHorizontal, X } from "lucide-react";
import PackageCard from "@/components/tour-packages/PackageCard";
import PackageFilters from "@/components/tour-packages/PackageFilters";
import CustomizeCta from "@/components/tour-packages/CustomizeCta";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  tourTypes as tourTypeOptions,
  packageThemes,
  packageDestinations,
  packageExperiences,
  sortOptions,
} from "@/data/tour-packages";
import { formatMoney } from "@/lib/tour-packages";
import { cn } from "@/lib/utils";

const LIST_KEYS = ["durations", "tourTypes", "themes", "destinations", "experiences"];

/** Which card field each list filter reads. */
const FIELD = {
  durations: (p) => [String(p.days)],
  tourTypes: (p) => [p.tourType],
  themes: (p) => p.themes,
  destinations: (p) => p.destinations,
  experiences: (p) => p.experiences,
};

function priceBounds(packages) {
  const usd = packages.map((p) => p.priceUsd);
  const lkr = packages.map((p) => p.priceLkr);
  return {
    USD: { min: Math.floor(Math.min(...usd) / 50) * 50, max: Math.ceil(Math.max(...usd) / 50) * 50, step: 25 },
    LKR: { min: Math.floor(Math.min(...lkr) / 10000) * 10000, max: Math.ceil(Math.max(...lkr) / 10000) * 10000, step: 5000 },
  };
}

const emptyFilters = (bounds, currency = "USD") => ({
  query: "",
  durations: [],
  tourTypes: [],
  themes: [],
  destinations: [],
  experiences: [],
  currency,
  price: [bounds[currency].min, bounds[currency].max],
});

/**
 * AND across filter groups, OR inside a group. `skip` leaves one group out –
 * used to compute the live result count shown next to each option.
 */
function matches(p, f, skip) {
  const words = f.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length && !words.every((w) => p.searchText.includes(w))) return false;
  for (const key of LIST_KEYS) {
    if (key === skip || f[key].length === 0) continue;
    if (!FIELD[key](p).some((v) => f[key].includes(v))) return false;
  }
  if (skip !== "price") {
    const value = f.currency === "LKR" ? p.priceLkr : p.priceUsd;
    if (value < f.price[0] || value > f.price[1]) return false;
  }
  return true;
}

const SORTERS = {
  recommended: (a, b) => a.order - b.order,
  "price-asc": (a, b) => a.priceUsd - b.priceUsd,
  "price-desc": (a, b) => b.priceUsd - a.priceUsd,
  "duration-asc": (a, b) => a.days - b.days,
  "duration-desc": (a, b) => b.days - a.days,
};

export default function PackageExplorer({ packages, heading, intro, priceNote, cta }) {
  const reduce = useReducedMotion();
  const bounds = useMemo(() => priceBounds(packages), [packages]);
  const [filters, setFilters] = useState(() => emptyFilters(bounds));
  const [sort, setSort] = useState("recommended");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);

  const groups = useMemo(
    () => ({
      durations: [...new Set(packages.map((p) => p.days))]
        .sort((a, b) => a - b)
        .map((d) => ({ id: String(d), label: `${d} Days` })),
      tourTypes: tourTypeOptions,
      themes: packageThemes,
      destinations: packageDestinations,
      experiences: packageExperiences,
    }),
    [packages]
  );

  const visible = useMemo(
    () => packages.filter((p) => matches(p, filters)).sort(SORTERS[sort]),
    [packages, filters, sort]
  );

  const counts = useMemo(() => {
    const out = {};
    for (const key of LIST_KEYS) {
      const pool = packages.filter((p) => matches(p, filters, key));
      out[key] = Object.fromEntries(
        groups[key].map((o) => [o.id, pool.filter((p) => FIELD[key](p).includes(o.id)).length])
      );
    }
    return out;
  }, [packages, filters, groups]);

  const range = bounds[filters.currency];
  const priceActive = filters.price[0] > range.min || filters.price[1] < range.max;

  /* ---------------------------------------------------------------- actions */
  const actions = {
    setQuery: (query) => setFilters((f) => ({ ...f, query })),
    toggle: (key, id) =>
      setFilters((f) => ({
        ...f,
        [key]: f[key].includes(id) ? f[key].filter((v) => v !== id) : [...f[key], id],
      })),
    setCurrency: (currency) =>
      setFilters((f) => ({ ...f, currency, price: [bounds[currency].min, bounds[currency].max] })),
    setPrice: (price) => setFilters((f) => ({ ...f, price })),
  };
  const clearAll = () => setFilters((f) => emptyFilters(bounds, f.currency));

  /* ------------------------------------------------- active filter chips */
  const labelOf = (key, id) => groups[key].find((o) => o.id === id)?.label || id;
  const chips = [
    ...(filters.query.trim()
      ? [{ key: "query", label: `“${filters.query.trim()}”`, remove: () => actions.setQuery("") }]
      : []),
    ...LIST_KEYS.flatMap((key) =>
      filters[key].map((id) => ({ key: `${key}-${id}`, label: labelOf(key, id), remove: () => actions.toggle(key, id) }))
    ),
    ...(priceActive
      ? [
          {
            key: "price",
            label: `${formatMoney(filters.price[0], filters.currency)} – ${formatMoney(filters.price[1], filters.currency)}`,
            remove: () => actions.setPrice([range.min, range.max]),
          },
        ]
      : []),
  ];

  /* ------------------------------------------------------- mobile drawer */
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    const trigger = triggerRef.current;
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  const filterPanelProps = { state: filters, actions, groups, counts, bounds };
  const total = packages.length;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
      {/* ── Desktop sidebar ─────────────────────────────────────────── */}
      <aside aria-label="Filter tour packages" className="hidden lg:block">
        <div className="rounded-card border border-brand-line bg-white p-6 shadow-card">
          <div className="mb-5 flex items-center justify-between">
            <p className="flex items-center gap-2 text-lg font-bold text-black">
              <SlidersHorizontal className="size-5 text-black" aria-hidden="true" />
              Filters
            </p>
            {chips.length > 0 && (
              <button type="button" onClick={clearAll} className="text-[13px] font-semibold text-brand-blue hover:text-brand-blue-dark">
                Clear filters
              </button>
            )}
          </div>
          <PackageFilters idPrefix="tp-side" {...filterPanelProps} />
        </div>
      </aside>

      {/* ── Results column ─────────────────────────────────────────── */}
      <div className="min-w-0">
        <SectionHeading lines={heading} size="md" />
        {intro && <p className="mt-4 max-w-2xl text-[15px] leading-[1.8] text-black sm:text-base">{intro}</p>}

        {/* Toolbar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-brand-line pb-4">
          <p className="text-[14px] text-brand-muted" aria-live="polite">
            Showing <strong className="text-brand-navy">{visible.length}</strong> of {total} private{" "}
            {total === 1 ? "tour" : "tours"}
          </p>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={drawerOpen}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-brand-navy/20 bg-white px-4 text-[14px] font-semibold text-brand-navy hover:border-black sm:flex-none lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters
              {chips.length > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-brand-blue text-[11px] font-bold text-white">
                  {chips.length}
                </span>
              )}
            </button>
            <label htmlFor="tp-sort" className="sr-only">
              Sort tours
            </label>
            <div className="relative flex-1 sm:flex-none">
              <ArrowUpDown className="pointer-events-none absolute left-3.5 top-1/2 hidden size-4 -translate-y-1/2 text-black sm:block" aria-hidden="true" />
              <select
                id="tp-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-11 w-full cursor-pointer appearance-none rounded-full border border-brand-navy/20 bg-white pl-4 pr-9 text-[14px] sm:pl-10 font-semibold text-black hover:border-brand-navy focus:border-brand-blue focus:outline-none sm:w-auto"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-brand-navy" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Active filters */}
        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={c.remove}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-sky py-1.5 pl-3.5 pr-2 text-[13px] font-semibold text-brand-navy transition-colors hover:bg-brand-sky-strong"
              >
                {c.label}
                <X className="size-3.5" aria-hidden="true" />
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
            <button type="button" onClick={clearAll} className="px-2 text-[13px] font-semibold text-brand-blue hover:text-brand-blue-dark">
              Clear all
            </button>
          </div>
        )}

        {/* Grid / empty state */}
        {visible.length > 0 ? (
          <motion.ul layout={!reduce} className="mt-6 grid gap-6 sm:grid-cols-2">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((pkg, i) => (
                <motion.li
                  key={pkg.slug}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <PackageCard pkg={pkg} currency={filters.currency} priority={i < 2} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="mt-6 flex flex-col items-center rounded-card border border-dashed border-brand-line bg-brand-mist px-6 py-14 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-white text-brand-blue shadow-card">
              <Compass className="size-7" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-brand-navy">No tours match these filters</h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-brand-muted">
              Try removing a filter or widening the price range. Or tell us what you have in mind and we&apos;ll plan a
              private tour around it.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex h-12 items-center justify-center rounded-full bg-brand-blue px-6 text-[15px] font-semibold text-white hover:bg-brand-blue-dark"
              >
                Clear Filters
              </button>
              <Link
                href="/tailor-made-tours"
                className="inline-flex h-12 items-center justify-center rounded-full border border-brand-navy/20 bg-white px-6 text-[15px] font-semibold text-brand-navy hover:border-brand-navy"
              >
                Customize My Tour
              </Link>
            </div>
          </div>
        )}
        
      </div>

      {/* ── Mobile / tablet drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-brand-navy-deep/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="tp-drawer-title"
              initial={reduce ? { opacity: 0 } : { x: "-100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 flex w-[min(92vw,400px)] flex-col bg-white shadow-lift"
            >
              <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
                <p id="tp-drawer-title" className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                  <SlidersHorizontal className="size-5 text-brand-blue" aria-hidden="true" />
                  Filters
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close filters"
                  className="grid size-10 place-items-center rounded-full border border-brand-line text-brand-navy hover:bg-brand-mist"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5" data-lenis-prevent>
                <PackageFilters idPrefix="tp-drawer" {...filterPanelProps} />
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-3 border-t border-brand-line px-5 py-4">
                <button
                  type="button"
                  onClick={clearAll}
                  disabled={chips.length === 0}
                  className="h-12 rounded-full px-4 text-[14px] font-semibold text-brand-blue disabled:text-brand-muted/60"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className={cn(
                    "h-12 rounded-full bg-brand-blue px-6 text-[15px] font-semibold text-white hover:bg-brand-blue-dark"
                  )}
                >
                  Show {visible.length} {visible.length === 1 ? "tour" : "tours"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
