"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextSectionProps {
  sentence: string;
  highlightWord?: string;
  animationType?: "word-by-word" | "fade-in";
  className?: string;
}

const AnimatedTextSection = ({
  sentence,
  highlightWord,
  animationType = "word-by-word",
  className = "",
}: AnimatedTextSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Split text into words
  const words = sentence.split(" ");

  // Calculate delay for each word (word-by-word animation)
  const totalDuration = 0.9;
  const delayPerWord = totalDuration / words.length;

  // Find the index of the highlight word
  const highlightIndex = highlightWord
    ? words.findIndex((word) => word.toLowerCase() === highlightWord.toLowerCase())
    : -1;

  // Fade-in animation variant
  const fadeInVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>
      {animationType === "fade-in" ? (
        // Simple fade-in animation
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl riposte text-center leading-tight sm:leading-tight md:leading-tight lg:leading-tight"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInVariant}
        >
          {words.map((word, index) => (
            <span key={index} className="inline-block mr-2 xs:mr-3 sm:mr-4 md:mr-5 lg:mr-6 relative">
              {index === highlightIndex && highlightWord && (
                <motion.span
                  className="absolute inset-0 -mx-1 sm:-mx-2 -my-1 bg-secondary/30 z-0 rounded"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{ transformOrigin: "left" }}
                />
              )}
              <span className="relative z-10">{word}</span>
            </span>
          ))}
        </motion.h2>
      ) : (
        // Word-by-word animation
        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl riposte text-center leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
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
              className="inline-block mr-2 xs:mr-3 sm:mr-4 md:mr-5 lg:mr-6 relative"
            >
              {index === highlightIndex && highlightWord && (
                <motion.span
                  className="absolute inset-0 -mx-1 sm:-mx-2 -my-1 bg-secondary/30 z-0 rounded"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: totalDuration,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{ transformOrigin: "left" }}
                />
              )}
              <span className="relative z-10">{word}</span>
            </motion.span>
          ))}
        </h2>
      )}
    </div>
  );
};

export default AnimatedTextSection;
