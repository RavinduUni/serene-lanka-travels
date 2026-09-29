"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Parallax({ children, className, speed = 1, type = "y" }) {
  const container = useRef(null);
  const target = useRef(null);

  useGSAP(() => {
    if (!container.current || !target.current) return;

    // Movement calculation
    const movement = type === "y" ? { yPercent: 15 * speed } : { scale: 1 + (0.1 * speed) };

    gsap.to(target.current, {
      ...movement,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom", 
        end: "bottom top",
        scrub: 1
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className={`relative overflow-hidden ${className || ""}`}>
      <div ref={target} className="w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
