"use client";

import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface InteractiveHoverLinksProps {
  links?: typeof INTERACTIVE_LINKS;
}

export function InteractiveHoverLinks({
  links = INTERACTIVE_LINKS,
}: InteractiveHoverLinksProps) {
  return (
    <section className="w-full">
      <div className="mx-auto">
        {links.map((link) => (
          <Link key={link.heading} {...link} />
        ))}
      </div>
    </section>
  );
}

interface LinkProps {
  heading: string;
  videoSrc: string;
  subheading: string;
  href: string;
}

function Link({ heading, videoSrc, subheading, href }: LinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = ref.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore play errors (e.g., if user hasn't interacted with page)
      });
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Cleanup video on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial="initial"
      whileHover="whileHover"
      className="w-full group relative flex items-center justify-between border-b py-4 transition-colors duration-500 hover:border-accent md:py-8"
    >
      <div>
        <span className="relative z-10 block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl transition-colors duration-500 group-hover:text-accent riposte">
          {heading}
        </span>
        <span className="relative z-10 mt-2 block text-base sm:text-lg transition-colors duration-500 group-hover:text-accent riposte">
          {subheading}
        </span>
      </div>

      <motion.div
        style={{
          top,
          left,
          translateX: "80%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{
          duration: 0.5,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="absolute z-0"
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-[200px] h-[200px] rounded-lg object-cover"
        >
          <source src={videoSrc} type="video/webm" />
        </video>
      </motion.div>
      <div className="overflow-hidden">
        <motion.div
          variants={{
            initial: {
              x: "100%",
              opacity: 0,
            },
            whileHover: {
              x: "0%",
              opacity: 1,
            },
          }}
          transition={{
            duration: 0.4,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="relative z-10 p-4"
        >
          <ArrowRight className="size-8 md:size-12 stroke-accent" />
        </motion.div>
      </div>
    </motion.a>
  );
}

export const INTERACTIVE_LINKS = [
  {
    heading: "Services",
    subheading: "Discover what we offer",
    videoSrc: "/clients/Cook_Beetle.webm",
    href: "#services",
  },
  {
    heading: "Team",
    subheading: "Meet the amazing people behind it",
    videoSrc: "/clients/Gym_Beetle.webm",
    href: "#about",
  },
  {
    heading: "Projects",
    subheading: "Explore our recent work",
    videoSrc: "/clients/Cook_Beetle.webm",
    href: "#work",
  },
  {
    heading: "Careers",
    subheading: "Join our growing team",
    videoSrc: "/clients/Gym_Beetle.webm",
    href: "#careers",
  },
  {
    heading: "Blog",
    subheading: "Read our latest insights",
    videoSrc: "/clients/Cook_Beetle.webm",
    href: "/blog",
  },
];
