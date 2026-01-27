"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeTransition() {
  const { isAlternateTheme } = useTheme();

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-40"
      initial={{ backgroundColor: "transparent" }}
      animate={{
        backgroundColor: isAlternateTheme
          ? "rgb(96, 108, 56)"
          : "transparent",
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    />
  );
}
