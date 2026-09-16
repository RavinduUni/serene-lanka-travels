"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import DayTourCard from "@/components/tours/DayTourCard";
import { cn } from "@/lib/utils";

/**
 * Landing-page grid with filter chips. Day Tours has no category routes
 * (a flat set of 7 tours), so grouping is a client-side filter only.
 */
export default function DayTourExplorer({ tours, groups }) {
  const [active, setActive] = useState("all");
  const reduce = useReducedMotion();
  const visible = active === "all" ? tours : tours.filter((t) => t.group === active);

  return (
    <div>
      <div role="group" aria-label="Filter day tours" className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            aria-pressed={active === g.id}
            onClick={() => setActive(g.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors",
              active === g.id
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-brand-line bg-white text-brand-ink hover:border-brand-blue hover:text-brand-blue"
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      <motion.ul layout={!reduce} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((tour) => (
            <motion.li
              key={tour.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <DayTourCard tour={tour} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
