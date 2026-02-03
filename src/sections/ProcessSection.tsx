"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import AnimatedTextSection from "@/components/AnimatedTextSection";

const processSteps = [
  {
    number: "1",
    title: "ACQUAINTANCE",
    description:
      "We start with a friendly call focused on your business's unique goals, audience, and needs. This conversation helps me see how I can best assist you",
  },
  {
    number: "2",
    title: "QUOTATION",
    description:
      "After the initial meeting, I'll create a custom proposal outlining the project plan and pricing. If everything aligns with your vision and expectations, we move forward",
  },
  {
    number: "3",
    title: "RESEARCH",
    description:
      "Competitor website research, the Personas method and Jobs-to-be-Done approach. These tools help me understand your customers' motivations and needs.",
  },
  {
    number: "4",
    title: "DESIGN",
    description:
      "Creating wireframes and high-fidelity designs that bring your vision to life. We iterate based on your feedback to ensure every detail is perfect.",
  },
  {
    number: "5",
    title: "DEVELOPMENT",
    description:
      "Building your website with clean, maintainable code. Using modern technologies to ensure speed, responsiveness, and seamless user experience.",
  },
  {
    number: "6",
    title: "LAUNCH",
    description:
      "Final testing, deployment, and training. I'll make sure you're comfortable managing your new website and provide ongoing support as needed.",
  },
];

const ProcessSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const isInView = useInView(cardsRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate the horizontal scroll based on vertical scroll
  // Stop scrolling when the last card is visible on the right edge
  const cardWidth = 458; // Width of each card (450px) + gap (8px)
  const cardsToScroll = processSteps.length - 2.8; // Leave last card more visible on right
  const totalScrollWidth = cardsToScroll * cardWidth;

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalScrollWidth]);

  return (
    <section
      ref={containerRef}
      data-theme="cream"
      className="relative"
      style={{ height: `${150 + processSteps.length * 10}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full px-12">
          {/* Section Header */}
          <AnimatedTextSection
            sentence="From start to end, we go through a process"
            animationType="word-by-word"
          />

          <div className="h-24" />

          {/* Horizontally Scrolling Cards */}
          <motion.div
            ref={cardsRef}
            className="flex gap-8"
            style={{ x }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="min-w-[450px] bg-(--color-primary) rounded-3xl p-8 relative"
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-josefin text-white">
                    {step.number}. {step.title}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="bg-(--color-background) rounded-2xl p-6 min-h-[200px]">
                  <p className="text-gray-800 text-lg font-josefin leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
