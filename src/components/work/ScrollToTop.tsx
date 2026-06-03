"use client";

import { useEffect } from "react";
import { useLenis } from "@/contexts/LenisContext";

/**
 * Forces scroll position to the top when the page mounts.
 *
 * Uses Lenis's `scrollTo(0, { duration: 0 })` so it resets Lenis's
 * internal target as well — a plain `window.scrollTo` leaves Lenis
 * thinking it's still at the previous offset and the page renders
 * mid-scroll. The `window.scrollTo` call is a fallback for the very
 * first mount where Lenis may not be initialized yet (provider's
 * effect runs after children's).
 */
export default function ScrollToTop() {
  const { scrollTo } = useLenis();
  useEffect(() => {
    window.scrollTo(0, 0);
    scrollTo(0, { duration: 0 });
  }, [scrollTo]);
  return null;
}
