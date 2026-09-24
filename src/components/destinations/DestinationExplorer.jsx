"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import DestinationCard from "@/components/destinations/DestinationCard";
import { cn } from "@/lib/utils";

/** Landing-page grid with region filter chips (same pattern as DayTourExplorer). */
export default function DestinationExplorer({ destinations, regions }) {

  const reduce = useReducedMotion();
  const visible = destinations;

  return (
    <div>
      <motion.ul layout={!reduce} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((d) => (
            <motion.li
              key={d.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <DestinationCard destination={d} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
