"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme, ThemeType } from "@/contexts/ThemeContext";

/**
 * ScrollThemeController
 *
 * Detects which section is currently in view and updates the theme accordingly.
 * Inspired by juice.agency's smooth scroll-based theme transitions.
 *
 * How it works:
 * 1. Observes all sections with a data-theme attribute
 * 2. When a section enters the viewport (crosses the threshold), updates the global theme
 * 3. Works bidirectionally - handles both scrolling down and up
 * 4. Uses IntersectionObserver for performant scroll detection
 */
export default function ScrollThemeController() {
  const { setCurrentTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    // Find all sections with a theme attribute
    const sections = document.querySelectorAll<HTMLElement>("[data-theme]");

    if (sections.length === 0) {
      console.warn("No sections with data-theme attribute found");
      return;
    }

    // Track which sections are currently intersecting
    const intersectingRatios = new Map<
      Element,
      { ratio: number; theme: ThemeType }
    >();

    // Function to check and update theme based on current scroll position
    const updateThemeFromScroll = () => {
      // Clear the map and recalculate which sections are in view
      intersectingRatios.clear();

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate intersection ratio manually
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(windowHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const ratio = visibleHeight / windowHeight;

        if (ratio > 0) {
          const theme = section.getAttribute("data-theme") as ThemeType;
          intersectingRatios.set(section, { ratio, theme });
        }
      });

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let dominantTheme: ThemeType = "green";

      intersectingRatios.forEach(({ ratio, theme }) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          dominantTheme = theme;
        }
      });

      // Update the theme
      if (maxRatio > 0) {
        setCurrentTheme(dominantTheme);
      }
    };

    // Use scroll-based detection for accurate, continuous ratio tracking
    let rafId: number | null = null;
    let lastTheme: ThemeType | null = null;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;

        let maxRatio = 0;
        let dominantTheme: ThemeType = "cream";

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const ratio = visibleHeight / windowHeight;

          if (ratio > maxRatio) {
            maxRatio = ratio;
            const theme = section.getAttribute("data-theme") as ThemeType;
            dominantTheme = theme;
          }
        });

        if (maxRatio > 0 && dominantTheme !== lastTheme) {
          lastTheme = dominantTheme;
          setCurrentTheme(dominantTheme);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Check theme based on current scroll position immediately
    updateThemeFromScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      intersectingRatios.clear();
    };
  }, [setCurrentTheme, pathname]);

  return null; // This component doesn't render anything
}
