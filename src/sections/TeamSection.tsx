"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

const TEAM_MEMBERS = [
  {
    name: "Huzaifa",
    role: "Tech",
    bio: "'Turning caffeine into clean code...",
    image: "/team/huzaifa.jpg",
  },
  {
    name: "Sultan",
    role: "Art",
    bio: "'Probably sketching something right now...",
    image: "/team/sultan.jpg",
  },
  {
    name: "Yumna",
    role: "Design",
    bio: "'UX is just empathy with better fonts...",
    image: "/team/yumna.jpg",
  },
] as const;

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl riposte mb-16 md:mb-24 max-w-4xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          We&apos;re a team that finds meaning in the work, cares about the craft,
          and shows up ready to create something remarkable.
        </motion.p>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Team Members List */}
          <motion.div
            className="space-y-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {TEAM_MEMBERS.map((member, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={member.name}
                  variants={fadeInUp}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(0)}
                  className={`
                    flex justify-between items-center py-8 px-6 border-t border-(--theme-text-color) border-opacity-20
                    ${isHovered ? "bg-(--color-accent)" : "bg-transparent"}
                    ${index === TEAM_MEMBERS.length - 1 ? "border-b" : ""}
                    cursor-pointer transition-colors duration-300
                  `}
                >
                  <div className="flex flex-col gap-2">
                    <motion.h3
                      className="text-2xl md:text-3xl lg:text-4xl riposte font-medium"
                      animate={{ x: isHovered ? 12 : 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {member.name}
                      <p className="text-sm md:text-base riposte opacity-70">
                        {member.bio}
                      </p>
                    </motion.h3>
                  </div>
                  <p className="text-lg md:text-xl riposte opacity-80">
                    ({member.role})
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Team Image */}
          <motion.div
            className="relative h-[400px] md:h-[600px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden bg-[var(--color-background)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={TEAM_MEMBERS[hoveredIndex].image}
                    alt={TEAM_MEMBERS[hoveredIndex].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(TeamSection);
