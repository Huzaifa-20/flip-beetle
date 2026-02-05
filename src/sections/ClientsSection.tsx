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

// Optimized component - shows appropriate beetle video based on client type
const AnimatedClientVideo = ({ client }: { client: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determine which beetle video to show based on client label
  const getBeetleVideo = (clientLabel: string) => {
    switch (clientLabel) {
      case "Cook":
        return "/clients/Cook_Beetle.webm";
      // Add more cases here as needed
      // case "Gym Instructor":
      //   return "/clients/Gym_Beetle.webm";
      default:
        return "/clients/Gym_Beetle.webm";
    }
  };

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
        <source src={getBeetleVideo(client)} type="video/webm" />
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
      className="w-screen flex justify-center items-center my-32 px-12 py-36 relative"
      style={{
        backgroundImage:
          "radial-gradient(circle, #b3af9a 1.25px, transparent 1.25px)",
        backgroundSize: "36px 36px",
      }}
    >
      {/* Top fade overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, #fefae0, transparent)"
        }}
      />
      {/* Bottom fade overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #fefae0, transparent)"
        }}
      />
      <motion.div
        className="max-w-[1136px] w-full flex flex-col gap-10 justify-center items-center relative z-20"
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
