"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme, ThemeType } from "@/contexts/ThemeContext";

/**
 * Theme color mappings
 * Using actual hex values since Framer Motion can't animate CSS variables
 */
const themeColors: Record<ThemeType, string> = {
  green: "#606c38",
  cream: "#fefae0",
  black: "#000000",
};

const themeTextColors: Record<ThemeType, string> = {
  green: "var(--color-text-on-green)",
  cream: "var(--color-text-on-cream)",
  black: "var(--color-text-on-black)",
};

/**
 * ThemeTransition Component
 *
 * Creates a smooth background color transition as the user scrolls.
 * Also updates text colors for proper contrast on each theme.
 */
export default function ThemeTransition() {
  const { currentTheme } = useTheme();

  // Update CSS variable for text color - much more performant than style tag injection
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--theme-text-color',
      themeTextColors[currentTheme]
    );
  }, [currentTheme]);

  return (
    <>
      {/* Background color overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[-1]"
        initial={{ backgroundColor: themeColors.green }}
        animate={{
          backgroundColor: themeColors[currentTheme],
        }}
        transition={{
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smooth feel
        }}
      />
    </>
  );
}
