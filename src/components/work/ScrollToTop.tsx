"use client";

import { useEffect } from "react";

/**
 * Forces scroll position to the top when the case study page mounts.
 * Defensive — Lenis smooth-scroll occasionally preserves position across
 * client-side nav between case studies.
 */
export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}
