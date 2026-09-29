"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Single, restrained scroll reveal using GSAP.
 */
export default function Reveal({ children, className, delay = 0, type = "fade-up" }) {
  const container = useRef(null);

  useGSAP(() => {
    if (!container.current) return;

    let yOffset = 40;
    let xOffset = 0;
    let scale = 1;
    
    if (type === "fade-down") yOffset = -40;
    if (type === "fade-left") xOffset = 40;
    if (type === "fade-right") xOffset = -40;
    if (type === "zoom-in") { yOffset = 0; scale = 0.9; }

    gsap.fromTo(
      container.current,
      { opacity: 0, y: yOffset, x: xOffset, scale: scale },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 1.0,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
