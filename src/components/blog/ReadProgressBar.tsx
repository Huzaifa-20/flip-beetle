"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ReadProgressBar = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress of the document
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to width (0% to 100%)
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-theme-cream)] z-50"
    >
      <motion.div
        className="h-full bg-[var(--color-primary)] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ReadProgressBar;
