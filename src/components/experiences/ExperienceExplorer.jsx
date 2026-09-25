"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import ExperienceCard from "@/components/experiences/ExperienceCard";

export default function ExperienceExplorer({ experiences }) {
  const reduce = useReducedMotion();

  return (
    <div>

      {/* ── Card grid ─────────────────────────────────────────────── */}
      <motion.ul layout={!reduce} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {experiences.map((e) => (
            <motion.li
              key={e.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ExperienceCard experience={e} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
