"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { scaleIn, createStaggerContainer, cardHover } from "@/utils/animations";

const clientTypes = [
  // First Row
  ["Interior Designer", "Freelancer", "Restaurant Owner"],
  // Second Row
  ["Tech Startup", "IT Consultant"],
  // Third Row
  ["Fitness Trainer", "Still You", "Photographer"],
  // Fourth Row
  ["psychologist", "naturopath"],
];

const ClientsSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      ref={ref}
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
              key={client}
              className={`flex flex-col items-center justify-center gap-4 ${
                index === 1 ? "-translate-y-12" : ""
              }`}
              variants={scaleIn}
              whileHover={cardHover}
            >
              <motion.div whileHover={{ rotate: 3 }}>
                <Image
                  src="/images/Anxious_Beetle.gif"
                  alt="Animation"
                  width={150}
                  height={150}
                  unoptimized
                />
              </motion.div>
              <motion.h1
                className="text-xl text-primary"
                whileHover={{ color: "var(--color-secondary)" }}
              >
                {client}
              </motion.h1>
            </motion.div>
          ))}
        </div>

        {/* Second Row */}
        <div className="w-1/2 flex items-center justify-between">
          {clientTypes[1].map((client) => (
            <motion.div
              key={client}
              className="flex flex-col items-center justify-center gap-4"
              variants={scaleIn}
              whileHover={cardHover}
            >
              <motion.div whileHover={{ rotate: 3 }}>
                <Image
                  src="/images/Anxious_Beetle.gif"
                  alt="Animation"
                  width={150}
                  height={150}
                  unoptimized
                />
              </motion.div>
              <motion.h1
                className="text-xl text-primary"
                whileHover={{ color: "var(--color-secondary)" }}
              >
                {client}
              </motion.h1>
            </motion.div>
          ))}
        </div>

        {/* Third Row */}
        <div className="w-full flex items-center justify-between">
          {clientTypes[2].map((client) => (
            <motion.div
              key={client}
              className="flex flex-col items-center justify-center gap-4"
              variants={scaleIn}
              whileHover={cardHover}
            >
              <motion.div whileHover={{ rotate: 3 }}>
                <Image
                  src="/images/Anxious_Beetle.gif"
                  alt="Animation"
                  width={150}
                  height={150}
                  unoptimized
                />
              </motion.div>
              <motion.h1
                className="text-xl text-primary"
                whileHover={{ color: "var(--color-secondary)" }}
              >
                {client}
              </motion.h1>
            </motion.div>
          ))}
        </div>

        {/* Fourth Row */}
        <div className="w-1/2 flex items-center justify-between">
          {clientTypes[3].map((client) => (
            <motion.div
              key={client}
              className="flex flex-col items-center justify-center gap-4"
              variants={scaleIn}
              whileHover={cardHover}
            >
              <motion.div whileHover={{ rotate: 3 }}>
                <Image
                  src="/images/Anxious_Beetle.gif"
                  alt="Animation"
                  width={150}
                  height={150}
                  unoptimized
                />
              </motion.div>
              <motion.h1
                className="text-xl text-primary"
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
