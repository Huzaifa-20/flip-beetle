"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { scaleIn, createStaggerContainer } from "@/utils/animations";

const clientTypes = [
  // First Row
  ["Cook", "Freelancer", "Gym Instructor"],
  // Second Row
  ["Padel Coach", "Photographer"],
  // Third Row
  ["Tech CEO", "Therapist", "Freelancer"],
];

// Optimized component - uses single video source for all clients
const AnimatedClientVideo = ({ client }: { client: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore play errors (e.g., if user hasn't interacted with page)
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Cleanup video on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-[200px] h-[200px] cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      <video
        ref={videoRef}
        width={200}
        height={200}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-contain"
      >
        <source src="/clients/Chef_Beetle.webm" type="video/webm" />
      </video>
    </div>
  );
};

const ClientsSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Parallax scroll setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect - useTransform handles optimization internally
  const cardY = useTransform(scrollYProgress, [0, 1], [30, -60]);

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen flex justify-center items-center my-32 px-12"
    >
      <motion.div
        className="max-w-[1136px] w-full flex flex-col gap-10 justify-center items-center"
        variants={createStaggerContainer(0.08, 0)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* First Row */}
        <div className="w-full flex items-center justify-between">
          {clientTypes[0].map((client, index) => (
            <motion.div
              key={`${client}-${index}`}
              className={`flex flex-col items-center justify-center gap-4 ${index === 1 && "-translate-y-12"}`}
              variants={scaleIn}
              style={{ y: cardY }}
            >
              <AnimatedClientVideo client={client} />
              <motion.h1
                className="text-xl"
                whileHover={{ color: "var(--color-secondary)" }}
              >
                {client}
              </motion.h1>
            </motion.div>
          ))}
        </div>

        {/* Second Row */}
        <div className="w-1/2 flex items-center justify-between">
          {clientTypes[1].map((client, index) => (
            <motion.div
              key={`${client}-${index}`}
              className="flex flex-col items-center justify-center gap-4"
              variants={scaleIn}
              style={{ y: cardY }}
            >
              <AnimatedClientVideo client={client} />
              <motion.h1
                className="text-xl"
                whileHover={{ color: "var(--color-secondary)" }}
              >
                {client}
              </motion.h1>
            </motion.div>
          ))}
        </div>

        {/* Third Row */}
        <div className="w-full flex items-center justify-between">
          {clientTypes[2].map((client, index) => (
            <motion.div
              key={`${client}-${index}`}
              className={`flex flex-col items-center justify-center gap-4 ${index === 1 && "translate-y-12"}`}
              variants={scaleIn}
              style={{ y: cardY }}
            >
              <AnimatedClientVideo client={client} />
              <motion.h1
                className="text-xl"
                whileHover={{ color: "var(--color-secondary)" }}
              >
                {client}
              </motion.h1>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ClientsSection;
