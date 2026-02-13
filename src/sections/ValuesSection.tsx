"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const VALUES = [
  {
    title: "PEOPLE CENTRIC",
    description: "We believe in people, not titles. Every project starts with understanding your story, your vision, and what matters most to you.",
    icon: "/values/human-first.svg",
  },
  {
    title: "CRAFT & QUALITY",
    description: "We're obsessed with the details. From the first sketch to the final pixel, we pour our hearts into creating work that stands out and lasts.",
    icon: "/values/craft.svg",
  },
  {
    title: "BOLD & CONFIDENT",
    description: "We're not afraid to push boundaries. Great design requires courage, and we're here to help you make a statement that turns heads.",
    icon: "/values/bold.svg",
  },
  {
    title: "PARTNERSHIP",
    description: "Your success is our success. We work alongside you as true partners, not just vendors, building something meaningful together.",
    icon: "/values/partnership.svg",
  },
  {
    title: "IMPACT-DRIVEN",
    description: "We don't just build pretty websites. We create digital experiences that drive real results and help your business grow.",
    icon: "/values/impact.svg",
  },
  {
    title: "AUTHENTIC & HONEST",
    description: "No jargon, no fluff. We tell it like it is, deliver on our promises, and build trust through transparency.",
    icon: "/values/authentic.svg",
  },
] as const;

const ValuesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen py-24 md:py-36 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl riposte uppercase text-center mb-16 md:mb-24 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          OUR VALUES SHAPE
          <br />
          THE WORK WE DO
        </motion.h2>

        {/* Carousel */}
        <motion.div
          ref={carouselRef}
          className="cursor-grab active:cursor-grabbing"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            drag="x"
            dragConstraints={carouselRef}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="flex gap-6 md:gap-8"
            style={{ width: "max-content" }}
          >
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                className="flex-shrink-0 w-[280px] md:w-[350px] lg:w-[400px] bg-[var(--color-theme-dark-cream)] rounded-2xl p-8 md:p-10"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ scale: isDragging ? 1 : 1.02 }}
              >
                {/* Value Title */}
                <h3 className="text-2xl md:text-3xl riposte font-bold mb-8 md:mb-12 text-[var(--color-text-on-dark-cream)]">
                  {value.title}
                </h3>

                {/* Icon/Illustration */}
                <div className="hidden relative w-full h-[200px] md:h-[250px] mb-8 md:mb-10 flex items-center justify-center">
                  <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]">
                    <Image
                      src={value.icon}
                      alt={value.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg riposte leading-relaxed text-[var(--color-text-on-dark-cream)]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Drag Hint */}
        <motion.p
          className="text-center text-sm md:text-base riposte mt-8 opacity-60"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          ← Drag to explore →
        </motion.p>
      </div>
    </section>
  );
};

export default ValuesSection;
