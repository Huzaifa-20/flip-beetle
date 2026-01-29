"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  fadeInLeft,
  scaleIn,
  fadeInUp,
  createStaggerContainer,
  imageHover,
} from "@/utils/animations";

const AboutSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
            {[1, 2, 3].map((index) => (
              <motion.div key={index} variants={scaleIn} whileHover={imageHover}>
                <Image
                  src="/images/Anxious_Beetle.gif"
                  alt="Animation"
                  width={150}
                  height={150}
                  unoptimized
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <motion.p
        className="w-full max-w-[700px] text-lg font-josefin text-center mt-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ delay: 0.5 }}
      >
        Whether you&apos;re an expert, a startup, or a small business,
        you&apos;re in the right place for a professionally crafted website.
      </motion.p>
    </section>
  );
};

export default AboutSection;
