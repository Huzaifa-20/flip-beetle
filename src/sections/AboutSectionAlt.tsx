"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AboutSectionAlt = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 1 });

  // Split text into words for typing animation
  const text = "We partner with ambitious brands to create digital experiences that feel true and drive momentum.";
  const words = text.split(" ");

  // Calculate delay for each word (1s total / number of words)
  const totalDuration = 0.9;
  const delayPerWord = totalDuration / words.length;

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="relative w-screen flex items-center justify-center px-12 pt-32 pb-16"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-1xl md:text-2xl lg:text-3xl xl:text-5xl font-josefin text-center leading-tight">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: 0.3,
                delay: index * delayPerWord,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default AboutSectionAlt;
