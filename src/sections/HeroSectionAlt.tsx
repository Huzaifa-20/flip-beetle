"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSplashAnimation } from "@/contexts/SplashAnimationContext";

const HeroSectionAlt = () => {
  const [progress, setProgress] = useState(0);
  const { setIsSplashComplete } = useSplashAnimation();
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Disable scrolling during animation
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Re-enable scrolling when animation completes
  useEffect(() => {
    if (animationComplete) {
      document.body.style.overflow = "unset";
    }
  }, [animationComplete]);

  useEffect(() => {
    // Easing function for smooth acceleration/deceleration
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // Define animation segments with smooth easing
    const segments = [
      { start: 0, end: 100, duration: 2500, pauseAfter: 200 },
      // { start: 25, end: 65, duration: 1000, pauseAfter: 300 },
      // { start: 65, end: 100, duration: 500, pauseAfter: 0 },
    ];

    let currentSegment = 0;
    let segmentStartTime: number | null = null;
    let isPausing = false;
    let pauseStartTime: number | null = null;

    const animate = () => {
      if (currentSegment >= segments.length) {
        // Animation complete
        setProgress(100);
        setTimeout(() => {
          setShowProgressBar(false);
          setTimeout(() => {
            setIsSplashComplete(true);
            setAnimationComplete(true);
          }, 400);
        }, 100);
        return;
      }

      const segment = segments[currentSegment];
      const now = Date.now();

      // Handle pausing
      if (isPausing) {
        if (pauseStartTime === null) {
          pauseStartTime = now;
        }
        const pauseElapsed = now - pauseStartTime;

        if (pauseElapsed >= segment.pauseAfter) {
          // Pause complete, move to next segment
          isPausing = false;
          pauseStartTime = null;
          currentSegment++;
          segmentStartTime = null;
          requestAnimationFrame(animate);
        } else {
          // Still pausing, hold current value
          requestAnimationFrame(animate);
        }
        return;
      }

      // Initialize segment
      if (segmentStartTime === null) {
        segmentStartTime = now;
      }

      // Calculate progress within current segment
      const segmentElapsed = now - segmentStartTime;
      const segmentProgress = Math.min(segmentElapsed / segment.duration, 1);
      const easedProgress = easeInOutCubic(segmentProgress);

      // Calculate actual progress value
      const progressValue = segment.start + (segment.end - segment.start) * easedProgress;
      setProgress(progressValue);

      // Check if segment is complete
      if (segmentProgress >= 1) {
        setProgress(segment.end);
        if (segment.pauseAfter > 0) {
          isPausing = true;
          requestAnimationFrame(animate);
        } else {
          currentSegment++;
          segmentStartTime = null;
          requestAnimationFrame(animate);
        }
      } else {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [setIsSplashComplete]);

  return (
    <section
      data-theme="green"
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden px-12"
    >
      <div className="w-full h-full flex flex-col justify-between">
        {/* Main Content - Large Text with Beetle */}
        <div className="flex-1 flex items-center justify-center relative pt-20 px-0">
          <div className="relative -mt-12">
            <div className="relative flex items-center justify-center">
              {/* FLIP BEETLE Text - Outlined background */}
              <div className="relative inline-block">
                <h1
                  className="text-[14rem] md:text-[18rem] lg:text-[22rem] font-bangers leading-none text-nowrap"
                  style={{
                    WebkitTextStroke: "3px var(--color-background)",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  FLIP BEETLE
                </h1>

                {/* Filled text (animated overlay) */}
                <div
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  style={{
                    width: `${Math.min(progress + 3, 103)}%`,
                  }}
                >
                  <h1
                    className="text-[14rem] md:text-[18rem] lg:text-[22rem] font-bangers leading-none text-nowrap"
                    style={{
                      color: "var(--color-background)",
                    }}
                  >
                    FLIP BEETLE
                  </h1>
                </div>
              </div>

              {/* Beetle - appears after splash complete */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-20"
                style={{ top: "70%", transform: "translateX(-50%)" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: progress >= 100 ? 1 : 0,
                  opacity: progress >= 100 ? 1 : 0,
                }}
                transition={{
                  delay: 0.7,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                }}
              >
                <Image
                  src="/images/Anxious_Beetle.gif"
                  alt="Flip Beetle"
                  width={350}
                  height={350}
                  className="drop-shadow-2xl"
                  unoptimized
                  priority
                />
              </motion.div>
            </div>

            {/* Progress Bar - positioned below text */}
            <AnimatePresence>
              {showProgressBar && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-[600px] max-w-[80vw] h-[12px] rounded-full overflow-hidden"
                  style={{
                    border: "2px solid var(--color-background)",
                    top: "calc(100% + 3rem)",
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Progress bar fill */}
                  <div
                    className="absolute top-0 left-0 h-full bg-background"
                    style={{
                      width: `${progress}%`,
                      transformOrigin: "left",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Content - appears after splash complete */}
        <motion.div
          className="flex justify-between items-start pb-12 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: progress >= 100 ? 1 : 0,
            y: progress >= 100 ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Left Side Text */}
          <div className="max-w-96">
            <h2 className="text-xl md:text-2xl font-josefin leading-tighter mb-4">
              THE DIGITAL AGENCY THAT LOVES TO SHOW OFF A THING OR TWO.
            </h2>
            <p className="text-xl md:text-2xl font-josefin leading-tighter">
              STARTING WITH YOUR BRAND.
            </p>
          </div>

          {/* Right Side Text */}
          <div className="text-right shrink-0">
            <p className="font-josefin text-xs uppercase tracking-wider leading-relaxed">
              IMPACTFUL DIGITAL
              <br />
              EXPERIENCES FOR AMBITIOUS
              <br />
              BRANDS
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSectionAlt;
