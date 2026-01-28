"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/utils/animations";

const HeroSectionAlt = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative w-screen h-screen flex items-center justify-center bg-primary overflow-hidden px-12"
    >
      <motion.div
        className="w-full h-full flex flex-col justify-between"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main Content - Large Text with Beetle */}
        <div className="flex-1 flex items-center justify-center relative pt-20">
          {/* Large "FLIPBEETLE" Text with hollow/outlined style */}
          <motion.div
            className="relative -mt-12"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <div className="relative flex items-center justify-center">
              {/* FLIP BEETLE Text */}
              <h1
                className="text-[14rem] md:text-[18rem] lg:text-[22rem] font-bangers leading-none text-nowrap text-background"
              >
                FLIP BEETLE
              </h1>

              {/* Beetle positioned absolutely in center, moved up */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 z-20"
                style={{ transform: 'translateX(-50%) translateY(-65%)' }}
                initial={{ scale: 0, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 120,
                }}
              >
                <Image
                  src="/images/Anxious_Beetle.gif"
                  alt="Flip Beetle"
                  width={500}
                  height={500}
                  className="drop-shadow-2xl"
                  unoptimized
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Content - Both texts aligned at same height */}
        <div className="flex justify-between items-start pb-12 gap-12">
          {/* Left Side Text */}
          <motion.div
            className="max-w-96"
            variants={fadeInLeft}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-xl md:text-2xl font-josefin text-background leading-tighter mb-4">
              THE DIGITAL AGENCY THAT LOVES TO SHOW OFF A THING OR TWO.
            </h2>
            <p className="text-xl md:text-2xl font-josefin text-background leading-tighter">
              STARTING WITH YOUR BRAND.
            </p>
          </motion.div>

          {/* Right Side Text */}
          <motion.div
            className="text-right shrink-0"
            variants={fadeInRight}
            transition={{ delay: 0.9 }}
          >
            <p className="font-josefin text-background text-xs uppercase tracking-wider leading-relaxed">
              IMPACTFUL DIGITAL
              <br />
              EXPERIENCES FOR AMBITIOUS
              <br />
              BRANDS
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSectionAlt;
