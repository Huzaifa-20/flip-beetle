"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { useBeetleLogo } from "@/hooks/useBeetleLogo";

// Service categories moved outside component for performance
const SERVICE_CATEGORIES = [
  {
    number: "01",
    title: "BRANDING",
    services: [
      "Brand Strategy",
      "Visual Identities",
      "Brand Guidelines",
    ],
  },
  {
    number: "02",
    title: "DESIGN",
    services: [
      "UI/UX Design",
      "Responsive Design",
      "Prototyping",
      "Design Systems",
    ],
  },
  {
    number: "03",
    title: "DEVELOPMENT",
    services: [
      "Website Development",
      "Interactive Web Experiences",
      "Content Management Systems",
      "Digital Media Solutions",
    ],
  },
] as const;

const ServicesSection = ({ theme }: { theme?: string }) => {
  const beetleLogo = useBeetleLogo();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      data-theme={theme ? theme : "black"}
      className="w-screen px-6 md:px-12 py-16 md:py-36"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {SERVICE_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.number}
              variants={fadeInUp}
              className="flex flex-row sm:flex-col justify-between sm:justify-start items-start"
            >
              <div>
                {/* Number */}
                <p className="text-sm sm:text-base riposte mb-5">
                  {category.number}
                </p>

                {/* Title */}
                <h2 className="text-4xl sm:text-5xl riposte font-bold mb-3">
                  {category.title}
                </h2>

                {/* Services List */}
                <ul className={`space-y-1 ${index === 2 ? "mb-0" : "mb-16"} flex-1`}>
                  {category.services.map((service, index) => (
                    <li
                      key={index}
                      className="text-base sm:text-lg riposte"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Icon at bottom */}
              <div className="mt-0 sm:mt-auto translate-y-8 sm:translate-y-0">
                <Image
                  src={beetleLogo}
                  alt="Anxious Beetle"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(ServicesSection);
