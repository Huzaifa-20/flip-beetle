"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useSplashAnimation } from "@/contexts/SplashAnimationContext";
import { useBeetleLogo } from "@/hooks/useBeetleLogo";
import { PARALLAX_SPEEDS, SCROLL_OFFSETS } from "@/utils/parallaxConfig";
import Image from "next/image";

const HeroSection = () => {
  // Check if splash animation has been shown in this browser session
  const [hasShownSplash, setHasShownSplash] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("flipBeetleSplashShown") === "true";
  });

  const [progress, setProgress] = useState(hasShownSplash ? 100 : 0);
  const { setIsSplashComplete } = useSplashAnimation();
  const [showProgressBar, setShowProgressBar] = useState(!hasShownSplash);
  const [animationComplete, setAnimationComplete] = useState(hasShownSplash);
  const beetleLogo = useBeetleLogo();

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

  // Reversed parallax for mobile left text
  const bottomTextYReversed = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? [0, 40 * PARALLAX_SPEEDS.MEDIUM_FAST] : [0, 0]
  );

  // Detect if mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  // Left text uses reversed parallax on mobile
  const leftTextCombinedY = useTransform(
    [leftTextOffset, isMobile ? bottomTextYReversed : bottomTextY],
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

  // If splash has been shown before, immediately set splash as complete
  useEffect(() => {
    if (hasShownSplash) {
      setIsSplashComplete(true);
    }
  }, [hasShownSplash, setIsSplashComplete]);

  // Manage body overflow - consolidated into single effect
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = (animationComplete || hasShownSplash) ? "unset" : "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [animationComplete, hasShownSplash]);

  // Animation effect with proper RAF cleanup
  useEffect(() => {
    // Skip animation if splash has already been shown this session
    if (hasShownSplash) {
      return;
    }

    let rafId: number | undefined;
    let cancelled = false;
    const timeoutIds: number[] = [];

    // Easing function for smooth acceleration/deceleration
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // Define animation segments with smooth easing
    const segments = [
      { start: 0, end: 100, duration: 1500, pauseAfter: 200 },
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
            // Mark splash as shown in this browser session
            sessionStorage.setItem("flipBeetleSplashShown", "true");
            setHasShownSplash(true);
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
  }, [setIsSplashComplete, hasShownSplash]);

  return (
    <section
      ref={heroRef}
      data-theme="green"
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8"
    >
      <div className="w-full h-full flex flex-col justify-between">
        {/* Main Content - Large Text with Beetle */}
        <div className="flex-1 flex items-start sm:items-center justify-center relative pt-24 sm:pt-20">
          <div className="relative -mt-12">
            <div className="relative flex items-center justify-center">
              {/* FLIP BEETLE Text - Outlined background with parallax */}
              <motion.div className="relative inline-block" style={{ y: textY }}>
                <h1
                  className="text-[6.5rem] sm:text-[7rem] md:text-[8rem] lg:text-[11rem] xl:text-[14rem] 2xl:text-[16rem] font-bold text-nowrap text-center sm:text-start leading-26 sm:leading-normal"
                  style={{
                    fontFamily: "var(--font-inter-tight)",
                    WebkitTextStroke: "2px var(--color-background)",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  FLIP <br className="flex sm:hidden" /> BEETLE
                </h1>

                {/* Filled text (animated overlay) */}
                <div
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  style={{
                    width: `${Math.min(progress + 3, 100)}%`,
                  }}
                >
                  <h1
                    className="flex text-[6.5rem] sm:text-[7rem] md:text-[8rem] lg:text-[11rem] xl:text-[14rem] 2xl:text-[16rem] font-bold text-nowrap text-center sm:text-start leading-26 sm:leading-normal"
                    style={{
                      fontFamily: "var(--font-inter-tight)",
                      color: "var(--color-background)",
                    }}
                  >
                    FLIP <br className="flex sm:hidden" />BEETLE
                  </h1>
                </div>
              </motion.div>

              {/* Beetle - appears after splash complete with parallax */}
              <motion.div
                className="w-[380px] h-[380px] sm:w-[350px] sm:h-[350px] absolute left-1/2 -translate-x-1/2 top-[100%] sm:top-[70%] z-20"
                style={{
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
                <Image
                  className="drop-shadow-2xl w-[350px] h-[350px] object-contain"
                  src={beetleLogo}
                  alt="Anxious Beetle"
                  width={350}
                  height={350}
                />
              </motion.div>
            </div>

            {/* Progress Bar - positioned below text */}
            <AnimatePresence>
              {showProgressBar && !hasShownSplash && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] max-w-[85vw] h-[8px] sm:h-[10px] md:h-[12px] rounded-full overflow-hidden"
                  style={{
                    border: "2px solid var(--color-background)",
                    top: "calc(100% + 1.5rem)",
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
        <div className="w-[80%] sm:w-full flex flex-col sm:flex-row justify-between items-start pb-6 sm:pb-8 md:pb-12 gap-8 md:gap-12">
          {/* Left Side Text */}
          <motion.div
            className="max-w-full sm:max-w-96 riposte"
            initial={{ opacity: 0 }}
            animate={{
              opacity: progress >= 100 ? 1 : 0,
            }}
            style={{
              y: leftTextCombinedY,
            }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <h2 className="flex text-base sm:text-2xl riposte leading-tighter mb-4">
              THE DIGITAL AGENCY THAT TURNS BOLD VISIONS INTO BRANDS WORTH REMEMBERING.
            </h2>
            <p className="flex text-base sm:text-2xl riposte leading-tighter">
              STARTING WITH YOURS.
            </p>
          </motion.div>

          {/* Right Side Text */}
          <motion.div
            className="riposte text-left sm:text-right shrink-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: progress >= 100 ? 1 : 0,
            }}
            style={{
              y: rightTextCombinedY,
            }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <p className="hidden sm:flex riposte text-xs uppercase tracking-wide sm:tracking-wider leading-relaxed">
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

export default HeroSection;
