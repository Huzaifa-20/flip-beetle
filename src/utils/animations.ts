import { Variants } from "framer-motion";

// Timing constants
export const TIMING = {
  FAST: 0.2,
  MEDIUM: 0.4,
  SLOW: 0.6,
  VERY_SLOW: 0.8,
} as const;

// Easing curves
export const EASING = {
  EASE_OUT: [0.33, 1, 0.68, 1],
  EASE_IN_OUT: [0.65, 0, 0.35, 1],
  SPRING: { type: "spring", stiffness: 100, damping: 15 },
} as const;

// Fade in with upward slide
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT,
    },
  },
};

// Fade in with left slide
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT,
    },
  },
};

// Fade in with right slide
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT,
    },
  },
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT,
    },
  },
};

// Fade in only (no movement)
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT,
    },
  },
};

// Stagger container for children animations
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Stagger container with custom delay
export const createStaggerContainer = (
  staggerDelay: number = 0.1,
  childrenDelay: number = 0
): Variants => ({
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childrenDelay,
    },
  },
});

// Floating animation (continuous)
export const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Pulse animation (continuous)
export const pulseAnimation = {
  scale: [1, 1.1, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Navbar animations
export const navbarSlideDown: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT,
      delay: 0.3,
    },
  },
};

// Navbar item stagger
export const navItemStagger: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.FAST,
      ease: EASING.EASE_OUT,
    },
  },
};

// Hero section animations with delays
export const heroHeading: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.SLOW,
      ease: EASING.EASE_OUT,
      delay: 0.6,
    },
  },
};

export const heroBeetle: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.VERY_SLOW,
      ease: EASING.EASE_OUT,
      delay: 0.8,
    },
  },
};

export const heroArrow: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT,
      delay: 1.0,
    },
  },
};

export const heroParagraph: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT,
      delay: 1.2,
    },
  },
};

// Hover effects
export const cardHover = {
  scale: 1.08,
  y: -5,
  transition: {
    duration: TIMING.FAST,
    ease: EASING.EASE_IN_OUT,
  },
};

export const buttonHover = {
  scale: 1.05,
  transition: {
    duration: TIMING.FAST,
    ease: EASING.EASE_IN_OUT,
  },
};

export const imageHover = {
  scale: 1.05,
  rotate: 3,
  transition: {
    duration: TIMING.FAST,
    ease: EASING.EASE_IN_OUT,
  },
};

// Utility function to check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Get animation variants with reduced motion support
export const getVariants = (variants: Variants): Variants => {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  return variants;
};
