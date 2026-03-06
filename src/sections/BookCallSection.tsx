"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Button from "@/components/ui/Button";

const BookCallSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen py-24 sm:py-32 px-4 sm:px-6 md:px-8"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-inter-tight font-bold uppercase leading-tight mb-6 sm:mb-8"
        >
          Let&apos;s Talk
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-lg sm:text-xl md:text-2xl riposte max-w-2xl mx-auto mb-10 sm:mb-14 opacity-80"
        >
          Got a project in mind? Book a free call and let&apos;s figure out how to bring your vision to life.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <Button
            href="https://cal.com/studio-crobe"
            external
            variant="outlined"
            theme="cream"
          >
            Book a Call
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(BookCallSection);
