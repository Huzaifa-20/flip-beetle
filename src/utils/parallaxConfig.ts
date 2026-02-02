/**
 * Parallax Configuration
 *
 * Centralized constants for parallax effects across the application.
 * Provides consistent speed multipliers, transform ranges, and scroll offsets.
 */

/**
 * Parallax speed multipliers
 *
 * Speed < 1.0: Element moves slower than scroll (background layer effect)
 * Speed = 1.0: Element moves with scroll (no parallax)
 * Speed > 1.0: Element moves faster than scroll (foreground layer effect)
 */
export const PARALLAX_SPEEDS = {
  /** Very slow movement (0.5x scroll speed) - deep background layers */
  VERY_SLOW: 0.5,

  /** Slow movement (0.7x scroll speed) - background elements */
  SLOW: 0.7,

  /** Slightly slower (0.85x scroll speed) - stable elements like headings */
  SLOWER: 0.85,

  /** Slightly below normal (0.9x scroll speed) - subtle depth */
  MEDIUM: 0.9,

  /** Slightly above normal (1.05x scroll speed) - subtle forward motion */
  MEDIUM_FAST: 1.05,

  /** Fast movement (1.1x scroll speed) - foreground elements */
  FAST: 1.1,

  /** Faster movement (1.15x scroll speed) - prominent foreground */
  FASTER: 1.15,

  /** Very fast movement (1.3x scroll speed) - hero elements */
  VERY_FAST: 1.3,

  /** Hero speed (1.4x scroll speed) - maximum prominence */
  HERO: 1.4,
} as const;

/**
 * Parallax transform ranges (in pixels)
 *
 * Defines how far elements move during scroll.
 * Negative values for upward/leftward movement, positive for downward/rightward.
 */
export const PARALLAX_RANGES = {
  /** Subtle movement (±20px) - minimal effect for text */
  SUBTLE: [-20, 20] as [number, number],

  /** Small movement (±35px) - gentle parallax */
  SMALL: [-35, 35] as [number, number],

  /** Medium movement (±50px) - noticeable depth */
  MEDIUM: [-50, 50] as [number, number],

  /** Large movement (±70px) - strong depth effect */
  LARGE: [-70, 70] as [number, number],

  /** Extra large movement (±100px) - dramatic effect for hero elements */
  EXTRA_LARGE: [-100, 100] as [number, number],
} as const;

/**
 * Scroll offset presets
 *
 * Defines when parallax effects activate relative to viewport.
 * Format: [start offset, end offset]
 *
 * Note: These are typed as tuples to maintain compatibility with Framer Motion's useScroll
 */
export const SCROLL_OFFSETS = {
  /** For hero sections - activates from top of viewport */
  HERO: ["start start", "end start"] as ["start start", "end start"],

  /** For standard sections - activates as section enters/exits viewport */
  SECTION: ["start end", "end start"] as ["start end", "end start"],

  /** For sections near viewport bottom - activates earlier */
  EARLY: ["start 0.8", "end 0.2"] as ["start 0.8", "end 0.2"],

  /** For footer sections - activates as approaching bottom */
  FOOTER: ["start 0.7", "end start"] as ["start 0.7", "end start"],
};

/**
 * Performance optimization hints
 *
 * CSS properties to improve animation performance
 */
export const PARALLAX_PERFORMANCE = {
  /** Force GPU acceleration for transforms */
  willChange: "transform" as const,

  /** Prevent backface flickering */
  backfaceVisibility: "hidden" as const,

  /** Add perspective for 3D transforms */
  perspective: 1000,

  /** Translate Z to force GPU layer */
  translateZ: 0,
} as const;
