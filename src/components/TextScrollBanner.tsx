"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextScrollBannerProps {
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

const TextScrollBanner = ({
  direction = "left",
  speed = 1,
  className = "",
}: TextScrollBannerProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate horizontal movement based on scroll
  // Multiply by a large number to get significant horizontal movement
  const scrollMultiplier = direction === "left" ? -500 * speed : 500 * speed;
  const x = useTransform(scrollYProgress, [0, 1], [0, scrollMultiplier]);

  // Repeat the text multiple times to ensure it fills the screen
  const repeatedText = Array(10).fill("FLIPBEETLE").join(" ");

  return (
    <section
      ref={ref}
      className={`w-screen overflow-hidden py-12 ${className}`}
    >
      <motion.div
        style={{ x, rotate: -3 }}
        className="flex whitespace-nowrap"
      >
        <h2 className="text-[8rem] md:text-[12rem] lg:text-[14rem] font-inter-tight font-bold tracking-tighter">
          {repeatedText}
        </h2>
      </motion.div>
    </section >
  );
};

export default TextScrollBanner;
