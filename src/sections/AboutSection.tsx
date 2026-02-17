"use client";

import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/utils/animations";

const AboutSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen flex justify-center items-center px-6 md:px-12 py-24 md:py-36"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left - Text Content */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInLeft}
          className="flex flex-col gap-6 sm:gap-12 order-2 sm:order-1"
        >
          <p className="max-w-[450px] text-base sm:text-lg riposte">
            Flip Beetle is where strategy, design, and technology come together
            to build brands people believe in and empower them to grow with
            purpose.
          </p>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-base sm:text-lg riposte uppercase border-b w-fit transition-colors duration-300 hover:text-accent"
          >
            MORE ABOUT FLIP BEETLE
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        {/* Right - Video */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInRight}
          className="relative w-full order-1 sm:order-2 aspect-[4/3] rounded-lg overflow-hidden shadow-2xl"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/about_us.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
