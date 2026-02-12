"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

interface LenisContextType {
  scrollY: number;
}

const LenisContext = createContext<LenisContextType>({
  scrollY: 0,
});

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Add lenis class to HTML element
    document.documentElement.classList.add("lenis");

    // Initialize Lenis with smooth scroll settings
    lenisRef.current = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    // Update scroll position for components
    lenisRef.current.on("scroll", (e: { scroll: number }) => {
      setScrollY(e.scroll);
      // Dispatch scroll event for other integrations
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

  return (
    <LenisContext.Provider value={{ scrollY }}>
      {children}
    </LenisContext.Provider>
  );
}
