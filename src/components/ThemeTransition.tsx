"use client";

import { motion } from "framer-motion";
import { useTheme, ThemeType } from "@/contexts/ThemeContext";

/**
 * Theme color mappings
 * These correspond to the CSS variables defined in globals.css
 */
const themeColors: Record<ThemeType, string> = {
  green: "#606c38",
  cream: "#fefae0",
  black: "#1a1a1a",
  "dark-cream": "#e8dcc4",
};

const themeTextColors: Record<ThemeType, string> = {
  green: "#fefae0",
  cream: "#1a1a1a",
  black: "#fefae0",
  "dark-cream": "#1a1a1a",
};

/**
 * ThemeTransition Component
 *
 * Creates a smooth background color transition as the user scrolls.
 * Also updates text colors for proper contrast on each theme.
 */
export default function ThemeTransition() {
  const { currentTheme } = useTheme();

  return (
    <>
      {/* Background color overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[-1]"
        initial={{ backgroundColor: themeColors.cream }}
        animate={{
          backgroundColor: themeColors[currentTheme],
        }}
        transition={{
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smooth feel
        }}
      />

      {/* This style tag dynamically updates the text color */}
      <style jsx global>{`
        body {
          color: ${themeTextColors[currentTheme]};
          transition: color 0.8s cubic-bezier(0.43, 0.13, 0.23, 0.96);
        }
      `}</style>
    </>
  );
}
