"use client";

import React, { useRef } from "react";
import Image from "next/image";
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

// Helper function to get the video path based on client name
const getClientVideo = (clientName: string): string => {
  const videoMap: Record<string, string> = {
    "Cook": "/clients/Chef_Beetle.webm",
    "Freelancer": "/clients/Chef_Beetle.webm",
    "Gym Instructor": "/clients/Chef_Beetle.webm",
    "Padel Coach": "/clients/Chef_Beetle.webm",
    "Photographer": "/clients/Chef_Beetle.webm",
    "Tech CEO": "/clients/Chef_Beetle.webm",
    "Therapist": "/clients/Chef_Beetle.webm",
  };
  return videoMap[clientName] || "/images/Anxious_Beetle.mp4";
};

// Component to handle play/pause video on hover
const AnimatedClientVideo = ({ client }: { client: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  if (client === "You")
    return (
      <Image
        src={getClientVideo(client)}
        alt={client}
        width={200}
        height={200}
      />)

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-[200px] h-[200px] cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      <video
        ref={videoRef}
        src={getClientVideo(client)}
        width={200}
        height={200}
        loop
        muted
        playsInline
        className="w-full h-full object-contain"
      />
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

  // Unified parallax effect for all cards
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
