import { RefObject } from "react";
import { useScroll, useTransform, MotionValue, UseScrollOptions } from "framer-motion";

export interface ParallaxOptions {
  /**
   * Speed multiplier for parallax effect
   * - < 1.0: Element moves slower than scroll (background layer effect)
   * - 1.0: Element moves with scroll (no parallax)
   * - > 1.0: Element moves faster than scroll (foreground layer effect)
   * @default 1.0
   */
  speed?: number;

  /**
   * Direction of parallax movement
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";

  /**
   * Scroll offset range for when parallax activates
   * Format: [start offset, end offset]
   * @default ["start end", "end start"]
   */
  offset?: UseScrollOptions["offset"];

  /**
   * Custom output range for transform
   * If not provided, calculated from speed
   * Format: [start position, end position]
   */
  range?: [number, number];

  /**
   * Disable parallax effect
   * @default false
   */
  disabled?: boolean;
}

/**
 * Custom hook for creating smooth parallax scroll effects
 *
 * @param ref - Reference to the element to apply parallax to
 * @param options - Configuration options for parallax behavior
 * @returns MotionValue for transform property (undefined if disabled)
 *
 * @example
 * ```tsx
 * const ref = useRef(null);
 * const y = useParallax(ref, { speed: 0.5, direction: "vertical" });
 *
 * return <motion.div ref={ref} style={{ y }}>Content</motion.div>;
 * ```
 */
export function useParallax(
  ref: RefObject<HTMLElement>,
  {
    speed = 1,
    direction = "vertical",
    offset = ["start end", "end start"],
    range,
    disabled = false,
  }: ParallaxOptions = {}
): MotionValue<number> | undefined {

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Always call hooks unconditionally (Rules of Hooks)
  // Get scroll progress for the target element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Calculate output range based on speed and direction
  const defaultRange: [number, number] =
    direction === "vertical"
      ? [0, -50 * speed] // Negative for upward movement as you scroll down
      : [0, 50 * speed]; // Positive for rightward movement

  const outputRange = range || defaultRange;

  // Transform scroll progress to parallax movement
  const transform = useTransform(scrollYProgress, [0, 1], outputRange);

  // Return undefined if parallax should be disabled
  // This happens AFTER all hooks are called
  if (disabled || prefersReducedMotion) {
    return undefined;
  }

  return transform;
}
