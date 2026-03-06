"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

type ScrollCallback = (scrollY: number) => void;

interface LenisContextType {
  lenis: Lenis | null;
  getScrollY: () => number;
  onScroll: (callback: ScrollCallback) => () => void;
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  getScrollY: () => 0,
  onScroll: () => () => {},
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const scrollCallbacksRef = useRef<Set<ScrollCallback>>(new Set());

  const getScrollY = useCallback(() => scrollYRef.current, []);

  const onScroll = useCallback((callback: ScrollCallback) => {
    scrollCallbacksRef.current.add(callback);
    return () => {
      scrollCallbacksRef.current.delete(callback);
    };
  }, []);

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

    // Update scroll position via ref + notify subscribers (no React state update)
    lenisRef.current.on("scroll", (e: { scroll: number }) => {
      scrollYRef.current = e.scroll;
      scrollCallbacksRef.current.forEach((cb) => cb(e.scroll));
    });

    // Handle anchor link clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = anchor.getAttribute("href")?.slice(1);
        if (id && lenisRef.current) {
          const element = document.getElementById(id);
          if (element) {
            lenisRef.current.scrollTo(element, {
              offset: 0,
              duration: 1.5,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Animation loop for smooth scroll
    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove("lenis");
      document.removeEventListener("click", handleAnchorClick);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, []);

  // Scroll to helper function
  const scrollTo = (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => {
    if (!lenisRef.current) return;

    lenisRef.current.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.5,
    });
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, getScrollY, onScroll, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
