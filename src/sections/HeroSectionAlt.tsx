"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useSplashAnimation } from "@/contexts/SplashAnimationContext";
import { PARALLAX_SPEEDS, SCROLL_OFFSETS } from "@/utils/parallaxConfig";

const HeroSectionAlt = () => {
  const [progress, setProgress] = useState(0);
  const { setIsSplashComplete } = useSplashAnimation();
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Parallax scroll setup
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: SCROLL_OFFSETS.HERO,
  });

  // Parallax transforms - only active after splash completes and if motion is allowed
  const shouldAnimate = !prefersReducedMotion && progress >= 100;

  // Text moves slower (0.8x) for background depth effect
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? [0, -50 * PARALLAX_SPEEDS.SLOW] : [0, 0]
  );

  // Beetle moves faster (1.2x) for foreground prominence
  const beetleY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? [0, 40 * PARALLAX_SPEEDS.MEDIUM] : [0, 0]
  );

  // Bottom text moves slightly slower (0.9x) for subtle depth
  const bottomTextY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? [0, -90 * PARALLAX_SPEEDS.VERY_FAST] : [0, 0]
  );

  // Create motion values for the initial slide-up offsets
  const leftTextOffset = useMotionValue(40);
  const rightTextOffset = useMotionValue(40);

  // Animate the offsets when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      // Animate both texts together
      const leftControls = animate(leftTextOffset, 0, {
        duration: 0.4,
        delay: 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      });

      const rightControls = animate(rightTextOffset, 0, {
        duration: 0.4,
        delay: 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      });

      return () => {
        leftControls.stop();
        rightControls.stop();
      };
    }
  }, [progress, leftTextOffset, rightTextOffset]);

  // Combined Y transforms that include both initial slide-up and parallax
  const leftTextCombinedY = useTransform(
    [leftTextOffset, bottomTextY],
    (latest: number[]) => {
      const offset = latest[0];
      const parallax = latest[1];
      return offset + parallax;
    }
  );

  const rightTextCombinedY = useTransform(
    [rightTextOffset, bottomTextY],
    (latest: number[]) => {
      const offset = latest[0];
      const parallax = latest[1];
      return offset + parallax;
    }
  );

  // Manage body overflow - consolidated into single effect
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = animationComplete ? "unset" : "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [animationComplete]);

  // Animation effect with proper RAF cleanup
  useEffect(() => {
    let rafId: number | undefined;
    let cancelled = false;
    const timeoutIds: number[] = [];

    // Easing function for smooth acceleration/deceleration
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // Define animation segments with smooth easing
    const segments = [
      { start: 0, end: 100, duration: 2500, pauseAfter: 200 },
    ];

    let currentSegment = 0;
    let segmentStartTime: number | null = null;
    let isPausing = false;
    let pauseStartTime: number | null = null;

    const animate = () => {
      if (cancelled) return; // Stop if component unmounted

      if (currentSegment >= segments.length) {
        // Animation complete
        setProgress(100);
        const timeout1 = window.setTimeout(() => {
          if (cancelled) return;
          setShowProgressBar(false);
          const timeout2 = window.setTimeout(() => {
            if (cancelled) return;
            setIsSplashComplete(true);
            setAnimationComplete(true);
          }, 400);
          timeoutIds.push(timeout2);
        }, 100);
        timeoutIds.push(timeout1);
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
          rafId = requestAnimationFrame(animate);
        } else {
          // Still pausing, hold current value
          rafId = requestAnimationFrame(animate);
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
          rafId = requestAnimationFrame(animate);
        } else {
          currentSegment++;
          segmentStartTime = null;
          rafId = requestAnimationFrame(animate);
        }
      } else {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    // Cleanup function - cancels RAF and clears all timeouts
    return () => {
      cancelled = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [setIsSplashComplete]);

  return (
    <section
      ref={heroRef}
      data-theme="green"
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden px-12"
    >
      <div className="w-full h-full flex flex-col justify-between">
        {/* Main Content - Large Text with Beetle */}
        <div className="flex-1 flex items-center justify-center relative pt-20 px-0">
          <div className="relative -mt-12">
            <div className="relative flex items-center justify-center">
              {/* FLIP BEETLE Text - Outlined background with parallax */}
              <motion.div className="relative inline-block" style={{ y: textY }}>
                <h1
                  className="text-[8rem] md:text-[12rem] lg:text-[15rem] font-bold text-nowrap"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
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
                    className="text-[8rem] md:text-[12rem] lg:text-[15rem] font-bold text-nowrap"
                    style={{
                      fontFamily: "var(--font-inter-tight)",
                      color: "var(--color-background)",
                    }}
                  >
                    FLIP BEETLE
                  </h1>
                </div>
              </motion.div>

              {/* Beetle - appears after splash complete with parallax */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-20"
                style={{
                  top: "70%",
                  y: beetleY,
                }}
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
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="drop-shadow-2xl w-[350px] h-[350px] object-contain"
                >
                  <source src="/images/Anxious_Beetle.webm" type="video/webm" />
                  <source src="/images/Anxious_Beetle.mp4" type="video/mp4" />
                </video>
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

        {/* Bottom Content - appears after splash complete with parallax */}
        <div className="flex justify-between items-start pb-12 gap-12">
          {/* Left Side Text */}
          <motion.div
            className="max-w-96"
            initial={{ opacity: 0 }}
            animate={{
              opacity: progress >= 100 ? 1 : 0,
            }}
            style={{
              y: leftTextCombinedY,
            }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <h2 className="text-xl md:text-2xl font-josefin leading-tighter mb-4">
              THE DIGITAL AGENCY THAT LOVES TO SHOW OFF A THING OR TWO.
            </h2>
            <p className="text-xl md:text-2xl font-josefin leading-tighter">
              STARTING WITH YOUR BRAND.
            </p>
          </motion.div>

          {/* Right Side Text */}
          <motion.div
            className="text-right shrink-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: progress >= 100 ? 1 : 0,
            }}
            style={{
              y: rightTextCombinedY,
            }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <p className="font-josefin text-xs uppercase tracking-wider leading-relaxed">
              IMPACTFUL DIGITAL
              <br />
              EXPERIENCES FOR AMBITIOUS
              <br />
              BRANDS
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionAlt;
