"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Single, restrained scroll reveal. Used on section headers only, so each
 * section has one orchestrated moment rather than motion on every card.
 */
export default function Reveal({ children, className, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
