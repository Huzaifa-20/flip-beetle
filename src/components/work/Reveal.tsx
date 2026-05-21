"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { createStaggerContainer, fadeInUp } from "@/utils/animations";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /**
   * When set, motion-component children stagger using framer-motion
   * variants (children must use `variants={fadeInUp}` to participate).
   * When omitted, the whole block fades+slides up as one unit and plain
   * HTML children work fine — letting the rest of the page stay
   * server-rendered.
   */
  stagger?: number;
  /** Fraction of the element in view before triggering (0–1). */
  amount?: number;
}

/**
 * Thin client island that fades its children in on scroll. Use this to
 * keep most of a page rendered on the server while still getting the
 * scroll-in animations we use across the site.
 */
export default function Reveal({
  children,
  className,
  stagger,
  amount = 0.2,
}: RevealProps) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const variants = stagger ? createStaggerContainer(stagger, 0) : fadeInUp;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
