"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/utils/animations";
import { PARALLAX_SPEEDS } from "@/utils/parallaxConfig";
import AnimatedTextSection from "@/components/AnimatedTextSection";

interface Service {
  id: string;
  price: string;
  title: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  tags: string[];
  description: string;
}

const services: Service[] = [
  {
    id: "landing-page",
    price: "$1 500",
    title: "Landing page",
    image: "/images/Landing_Page.svg",
    imageWidth: 528.26,
    imageHeight: 442.82,
    tags: ["startups", "service providers", "small businesses"],
    description:
      "A fully built one page with a focused goal—like promoting a single product, service, or event. It's ideal for those who want a simple, compelling introduction that drives immediate action.",
  },
  {
    id: "multi-page",
    price: "$2 000",
    title: "Multi-page websites",
    image: "/images/Landing_Page.svg", // You can replace with actual multi-page image
    imageWidth: 528.26,
    imageHeight: 442.82,
    tags: ["established businesses", "growing brands", "professionals"],
    description:
      "A fully developed website that provides detailed information about multiple services, builds client trust, and helps establish a strong online presence for your business.",
  },
];

const ServicesSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Price badge rotation - useTransform handles optimization internally
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen flex justify-center items-center my-32 px-12"
    >
      <div className="w-full flex flex-col gap-20 justify-start items-center">
        <AnimatedTextSection
          sentence="Ways we can help you get on the right track"
          highlightWord="right"
          animationType="fade-in"
        />

        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="w-full flex justify-start items-start gap-10"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="relative"
              variants={fadeInLeft}
              transition={{ delay: 0.3 + index * 0.2 }}
            // style={{ y: imageY }}
            >
              {/* Price Badge */}
              <div className="absolute -left-8 top-8 z-10">
                <div className="relative flex items-center justify-center w-32 h-32">
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                    style={{ rotate }}
                  >
                    {/* Create scalloped badge - 24 scallops around the circle */}
                    <g>
                      {/* Base circle */}
                      <circle cx="50" cy="50" r="38" fill="#E89B92" />
                      {/* Scallops around the edge */}
                      {[...Array(24)].map((_, i) => {
                        const angle = (i * 360) / 24;
                        const rad = (angle * Math.PI) / 180;
                        const x = 50 + Math.cos(rad) * 38;
                        const y = 50 + Math.sin(rad) * 38;
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="3.8"
                            fill="#E89B92"
                          />
                        );
                      })}
                    </g>
                  </motion.svg>
                  <div className="relative z-10 text-center">
                    <p className="text-background text-sm riposte uppercase">
                      From
                    </p>
                    <p className="text-background text-xl riposte">
                      {service.price}
                    </p>
                  </div>
                </div>
              </div>

              <Image
                src={service.image}
                alt={service.title}
                width={service.imageWidth}
                height={service.imageHeight}
              />
            </motion.div>

            <motion.div
              className="flex flex-col items-start gap-6"
              variants={fadeInRight}
              transition={{ delay: 0.5 + index * 0.2 }}
            // style={{ y: textY }}
            >
              <div className="flex items-center gap-4">
                <h1 className="text-6xl text-start text-nowrap">
                  {service.title}
                </h1>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/30">
                  <span className="text-secondary text-2xl font-bold">?</span>
                </div>
              </div>

              <p className="text-xl riposte">Perfect for:</p>

              <div className="flex gap-3 flex-wrap">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-6 py-2 rounded-full border-2 border-primary text-primary riposte text-base"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-lg riposte leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
