"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const VALUES = [
  {
    title: "PEOPLE CENTRIC",
    description: "People over titles. Your story drives everything we create.",
    icon: "/values/People_Centric.png",
    width: { mobile: 180, desktop: 180 },
    height: { mobile: 180, desktop: 180 },
  },
  {
    title: "CRAFT & QUALITY",
    description: "Every pixel matters. We're obsessed with the details.",
    icon: "/values/Craft_&_Quality.png",
    width: { mobile: 230, desktop: 160 },
    height: { mobile: 230, desktop: 160 },
  },
  {
    title: "BOLD & CONFIDENT",
    description: "Pushing boundaries. Making statements that turn heads.",
    icon: "/values/Bold_&_Confident.png",
    width: { mobile: 180, desktop: 250 },
    height: { mobile: 180, desktop: 250 },
  },
  {
    title: "PARTNERSHIP",
    description: "Your success is ours. Partners, not vendors.",
    icon: "/values/Partnership.png",
    width: { mobile: 180, desktop: 300 },
    height: { mobile: 180, desktop: 250 },
  },
  {
    title: "IMPACT-DRIVEN",
    description: "Real results, not just pretty pixels.",
    icon: "/values/Impact_Driven.png",
    width: { mobile: 180, desktop: 230 },
    height: { mobile: 180, desktop: 230 },
  },
  {
    title: "AUTHENTIC & HONEST",
    description: "No jargon. Just honest work and transparency.",
    icon: "/values/Authentic_&_Honest.png",
    width: { mobile: 200, desktop: 250 },
    height: { mobile: 200, desktop: 250 },
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
                <h3 className="text-2xl md:text-3xl riposte font-bold mb-8 md:mb-12">
                  {value.title}
                </h3>

                {/* Icon/Illustration */}
                <div className="relative w-full h-[180px] md:h-[220px] mb-6 md:mb-8 flex items-center justify-center select-none">
                  <div
                    className="relative md:hidden">
                    <Image
                      src={value.icon}
                      alt={value.title}
                      width={value.width.desktop}
                      height={value.height.desktop}
                      draggable={false}
                    />
                  </div>
                  <div
                    className="relative hidden md:block"

                  >
                    <Image
                      src={value.icon}
                      alt={value.title}
                      width={value.width.desktop}
                      height={value.height.desktop}
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg riposte leading-relaxed">
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
