"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Kill every leftover ScrollTrigger from the previous page so they
    // don't hold stale DOM references or block the new page's layout.
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Scroll the native window to the top before Lenis takes over,
    // so the new page always starts at the top.
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      normalizeWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Tell ScrollTrigger to use Lenis's scroll position, not raw window.scrollY
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // After a brief frame, refresh ScrollTrigger so it picks up
    // the new page's DOM dimensions correctly.
    const refreshTimer = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshTimer);
      gsap.ticker.remove(update);
      ScrollTrigger.scrollerProxy(document.documentElement, null);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, [pathname]); // ← re-run on every route change

  return <>{children}</>;
}
