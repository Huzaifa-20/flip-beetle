"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  fadeInLeft,
  scaleIn,
  fadeInUp,
  createStaggerContainer,
  imageHover,
} from "@/utils/animations";
import { PARALLAX_SPEEDS, SCROLL_OFFSETS } from "@/utils/parallaxConfig";

const AboutSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Parallax scroll setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: SCROLL_OFFSETS.SECTION,
  });

  // Heading parallax - moves slightly slower (0.85x) for stability
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -40 * PARALLAX_SPEEDS.SLOWER]);

  // Image parallax - images move faster (1.3x-1.4x) with horizontal shifts
  const image1Y = useTransform(scrollYProgress, [0, 1], [0, 60 * PARALLAX_SPEEDS.VERY_FAST]);
  // const image1X = useTransform(scrollYProgress, [0, 1], [0, 15]); // Rightward shift

  const image2Y = useTransform(scrollYProgress, [0, 1], [0, 60 * PARALLAX_SPEEDS.HERO]); // Fastest

  const image3Y = useTransform(scrollYProgress, [0, 1], [0, 60 * PARALLAX_SPEEDS.VERY_FAST]);
  // const image3X = useTransform(scrollYProgress, [0, 1], [0, -15]); // Leftward shift

  // Bottom paragraph parallax - subtle upward float (0.9x)
  const paragraphY = useTransform(scrollYProgress, [0, 1], [0, -25 * PARALLAX_SPEEDS.MEDIUM]);

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen flex flex-col justify-center items-center my-32 px-12"
    >
      <div className="w-full flex justify-center items-center">
        <motion.div
          className="flex flex-col"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInLeft}
          style={{ y: headingY }}
        >
          <h1 className="text-7xl text-start text-nowrap">Hi, im Sulti</h1>
          <p className="text-2xl text-start">A freelance Autist</p>
          <p className="font-josefin text-lg text-start mt-4">
            I create comprehensive websites from scratch. Working with me you
            get memorable, unique websites tailored to your specific needs,
            hassle-free process and first class service.
          </p>
        </motion.div>
        <div className="w-full flex justify-center items-center">
          <motion.div
            className="flex items-center gap-4"
            variants={createStaggerContainer(0.1, 0.3)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {[1, 2, 3].map((imgIndex) => {
              // Apply different parallax based on image position
              const imageStyles = imgIndex === 1
                ? {
                  y: image1Y,
                  // x: image1X
                }
                : imgIndex === 2
                  ? { y: image2Y }
                  : {
                    y: image3Y,
                    // x: image3X 
                  };

              return (
                <motion.div
                  key={imgIndex}
                  variants={scaleIn}
                  whileHover={imageHover}
                // style={imageStyles}
                >
                  <Image
                    src="/images/Anxious_Beetle.gif"
                    alt="Animation"
                    width={150}
                    height={150}
                    unoptimized
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <motion.p
        className="w-full max-w-[700px] text-lg font-josefin text-center mt-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        style={{ y: paragraphY }}
        transition={{ delay: 0.5 }}
      >
        Whether you&apos;re an expert, a startup, or a small business,
        you&apos;re in the right place for a professionally crafted website.
      </motion.p>
    </section>
  );
};

export default AboutSection;
