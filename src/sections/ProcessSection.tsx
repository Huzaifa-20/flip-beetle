"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import AnimatedTextSection from "@/components/AnimatedTextSection";
import { ChevronLeft, ChevronRight } from "lucide-react";

const processSteps = [
  {
    number: "1",
    title: "DISCOVERY",
    description:
      "We dig into your business, vision, and goals. Real conversation, no cookie-cutter questionnaires.",
  },
  {
    number: "2",
    title: "STRATEGY",
    description:
      "We analyze your competition and market. Strategic thinking backed by research, not guesswork.",
  },
  {
    number: "3",
    title: "DESIGN",
    description:
      "Designs that work, not just look good. Every pixel has a purpose.",
  },
  {
    number: "4",
    title: "BUILD",
    description:
      "Clean code. Fast loading. Works everywhere. Mobile-first and accessible.",
  },
  {
    number: "5",
    title: "REFINE",
    description:
      "We test everything across all devices and browsers. Catching bugs before your users do.",
  },
  {
    number: "6",
    title: "LAUNCH",
    description:
      "We deploy and show you how to manage it. You own your site, we help you run it.",
  },
];

const ProcessSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const isInView = useInView(cardsRef, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate the horizontal scroll based on vertical scroll (Desktop only)
  const cardWidth = 458;
  const cardsToScroll = processSteps.length - 2.8;
  const totalScrollWidth = cardsToScroll * cardWidth;
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalScrollWidth]);

  // Carousel navigation
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % processSteps.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Swipe handlers
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section
      ref={containerRef}
      data-theme="black"
      className="relative"
      style={{ height: isMobile ? 'auto' : `${150 + processSteps.length * 10}vh` }}
    >
      {/* Desktop: Horizontal Scroll */}
      <div className={`${isMobile ? 'hidden' : 'sticky'} top-0 h-screen flex items-center overflow-hidden`}>
        <div className="w-full px-6 md:px-12">
          <AnimatedTextSection
            sentence="HOW WE WORK TOGETHER"
            animationType="word-by-word"
          />

          <div className="h-12" />

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
                className="min-w-[400px] border rounded-lg p-4 relative"
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-4xl riposte font-bold">
                    {step.number}. {step.title}
                  </h2>
                </div>
                <p className="text-lg riposte leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: Carousel */}
      {isMobile && (
        <div className="py-12 px-8">
          <div className="mb-12">
            <AnimatedTextSection
              sentence="HOW WE WORK TOGETHER"
              animationType="word-by-word"
            />
          </div>

          {/* Carousel Container */}
          <div className="min-h-[240px] relative">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (direction: number) => ({
                    opacity: 0,
                    x: 300 * direction,
                  }),
                  center: {
                    opacity: 1,
                    x: 0,
                  },
                  exit: (direction: number) => ({
                    opacity: 0,
                    x: -300 * direction,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    nextSlide();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevSlide();
                  }
                }}
                className="min-h-[240px] border rounded-lg p-4 pb-12"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl riposte">
                    {processSteps[currentIndex].number}. {processSteps[currentIndex].title}
                  </h3>
                </div>
                <p className="text-base riposte">
                  {processSteps[currentIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white border border-black rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-black rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-black w-8'
                  : 'bg-black/30 hover:bg-black/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Text */}
          <div className="text-center mt-4">
            <span className="text-sm riposte text-black/60">
              {currentIndex + 1} / {processSteps.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProcessSection;
