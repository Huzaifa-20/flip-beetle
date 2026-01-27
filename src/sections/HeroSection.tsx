"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  heroHeading,
  heroBeetle,
  heroArrow,
  heroParagraph,
} from "@/utils/animations";

const HeroSection = () => {
  return (
    <section
      className="w-screen min-h-screen flex flex-col justify-center items-center px-12"
      style={{
        backgroundImage:
          "radial-gradient(circle, #b3af9a 1.25px, transparent 1.25px)",
        backgroundSize: "36px 36px",
      }}
    >
      <motion.h1
        className="w-full max-w-[800px] text-7xl text-center"
        initial="hidden"
        animate="visible"
        variants={heroHeading}
      >
        Ready to FLIP the right side up?
      </motion.h1>
      <div className="w-full flex justify-center items-center -mt-4">
        <div className="relative flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroBeetle}
            className="-my-12"
          >
            <Image
              src="/images/Anxious_Beetle.gif"
              alt="Animation"
              width={350}
              height={350}
              unoptimized
            />
          </motion.div>
          <motion.div
            className="absolute flex items-center gap-6"
            style={{ left: "calc(50% + 120px)" }}
            initial="hidden"
            animate="visible"
            variants={heroArrow}
          >
            <motion.div
              className="shrink-0"
              animate={{
                x: [-8, 8, -8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/icons/ArrowIcon.svg"
                alt="ArrowIcon"
                width={90}
                height={28}
                style={{
                  filter: "brightness(0) saturate(100%)",
                  opacity: 0.7
                }}
              />
            </motion.div>
            <p className="font-josefin text-black whitespace-nowrap text-lg">
              This is you,
              <br />
              anxious to build a
              <br />
              digital presence
            </p>
          </motion.div>
        </div>
      </div>
      <motion.p
        className="w-full max-w-[800px] text-xl font-josefin text-black text-center"
        initial="hidden"
        animate="visible"
        variants={heroParagraph}
      >
        Whether you&apos;re an expert, a startup, or a small business,
        you&apos;re in the right place for a professionally crafted website.
      </motion.p>
    </section>
  );
};

export default HeroSection;
