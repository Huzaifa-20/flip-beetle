"use client";

import React from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  /** aria-label for assistive tech. */
  alt?: string;
  className?: string;
  /**
   * How aggressively to preload before the observer fires.
   * "metadata" (default) fetches a few KB so the player can size itself;
   * "none" fetches nothing until visible — best for assets that may
   * never be reached.
   */
  preload?: "none" | "metadata" | "auto";
}

/**
 * Autoplaying background-style video that plays only while visible and
 * pauses when scrolled out of view — saves CPU, GPU, and battery on
 * pages with multiple videos.
 */
export default function LazyVideo({
  src,
  poster,
  alt,
  className,
  preload = "metadata",
}: LazyVideoProps) {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            // Autoplay may be blocked (e.g. low-power mode on iOS) —
            // ignore; poster stays visible.
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={alt}
      muted
      loop
      playsInline
      preload={preload}
      className={className}
    />
  );
}
