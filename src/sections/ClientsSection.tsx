"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { scaleIn, createStaggerContainer, cardHover } from "@/utils/animations";

const clientTypes = [
  // First Row
  ["Cook", "Freelancer", "Gym Instructor"],
  // Second Row
  ["Padel Coach", "Photographer"],
  // Third Row
  ["Tech CEO", "You", "Therapist"],
  // Fourth Row
  ["Freelancer", "Gym Instructor"],
];

// Helper function to get the image path based on client name
const getClientImage = (clientName: string): string => {
  const imageMap: Record<string, string> = {
    "Cook": "/clients/cook.png",
    "Freelancer": "/clients/freelance.png",
    "Gym Instructor": "/clients/gym-instructor.png",
    "Padel Coach": "/clients/padel-coach.png",
    "Photographer": "/clients/photographer.png",
    "Tech CEO": "/clients/tech-ceo.png",
    "You": "/images/Anxious_Beetle.gif",
    "Therapist": "/clients/therapist.png",
  };
  return imageMap[clientName] || "/images/Anxious_Beetle.gif";
};

const ClientsSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen flex justify-center items-center my-32 px-12"
    >
      <motion.div
        className="w-full flex flex-col gap-10 justify-center items-center"
        variants={createStaggerContainer(0.08, 0)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* First Row */}
        <div className="w-full flex items-center justify-between">
          {clientTypes[0].map((client, index) => (
            <motion.div
              key={`${client}-${index}`}
              className={`flex flex-col items-center justify-center gap-4 ${index === 1 ? "-translate-y-12" : ""
                }`}
              variants={scaleIn}
              whileHover={cardHover}
            >
              <motion.div whileHover={{ rotate: 3 }}>
                <Image
                  src={getClientImage(client)}
                  alt={client}
                  width={200}
                  height={200}
                />
              </motion.div>
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
              whileHover={cardHover}
            >
              <motion.div whileHover={{ rotate: 3 }}>
                <Image
                  src={getClientImage(client)}
                  alt={client}
                  width={200}
                  height={200}
                />
              </motion.div>
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
              className="flex flex-col items-center justify-center gap-4"
              variants={scaleIn}
              whileHover={cardHover}
            >
              <motion.div whileHover={{ rotate: 3 }}>
                <Image
                  src={getClientImage(client)}
                  alt={client}
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.h1
                className="text-xl"
                whileHover={{ color: "var(--color-secondary)" }}
              >
                {client}
              </motion.h1>
            </motion.div>
          ))}
        </div>

        {/* Fourth Row */}
        <div className="w-1/2 flex items-center justify-between">
          {clientTypes[3].map((client, index) => (
            <motion.div
              key={`${client}-${index}`}
              className="flex flex-col items-center justify-center gap-4"
              variants={scaleIn}
              whileHover={cardHover}
            >
              <motion.div whileHover={{ rotate: 3 }}>
                <Image
                  src={getClientImage(client)}
                  alt={client}
                  width={200}
                  height={200}
                />
              </motion.div>
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
