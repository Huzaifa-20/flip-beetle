"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/utils/animations";

const ServicesSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="w-screen flex justify-center items-center my-32"
    >
      <div className="w-full max-w-[1136px] flex flex-col gap-10 justify-start items-center">
        <motion.h1
          className="w-full text-7xl text-start text-nowrap"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInLeft}
        >
          Ways I can help
        </motion.h1>
        <motion.div
          className="w-full flex justify-start items-start gap-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            y: -8,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            transition: { duration: 0.2 },
          }}
        >
          <motion.div
            variants={fadeInLeft}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src="/images/Landing_Page.svg"
              alt="Landing Page"
              width={528.26}
              height={442.82}
            />
          </motion.div>
          <motion.div
            className="flex flex-col items-start"
            variants={fadeInRight}
            transition={{ delay: 0.5 }}
          >
            <h1 className="w-full text-6xl text-start text-nowrap">
              Landing page
            </h1>
            <p className="text-xl font-oxygen text-black my-5">Perfect for:</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
