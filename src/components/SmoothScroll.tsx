"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Add lenis class to HTML element
    document.documentElement.classList.add("lenis");

    // Initialize Lenis with smooth scroll settings
    lenisRef.current = new Lenis({
      duration: 1.5, // Duration of scroll animation (higher = slower/more sluggish)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    // Integration with Framer Motion: dispatch custom scroll events
    lenisRef.current.on("scroll", () => {
      // Dispatch a scroll event so Framer Motion can detect it
      window.dispatchEvent(new Event("scroll"));
    });

    // Animation loop for smooth scroll
    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove("lenis");
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
