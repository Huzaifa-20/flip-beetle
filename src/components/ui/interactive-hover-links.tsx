"use client";

import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

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

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="initial"
      whileHover="whileHover"
      className="w-full group relative flex flex-col md:flex-row items-start md:items-center justify-between border-b py-4 transition-colors duration-500 hover:border-accent md:py-8"
    >
      <div className="flex-1">
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
          initial: { scale: 0, rotate: "-12.5deg", opacity: 0 },
          whileHover: { scale: 1, rotate: "12.5deg", opacity: 1 },
        }}
        transition={{
          duration: 0.5,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="absolute z-0 md:block hidden"
      >
        <Image
          src={videoSrc}
          alt={heading}
          width={videoSrc.includes('Gym_Beetle') ? 240 : 200}
          height={videoSrc.includes('Gym_Beetle') ? 240 : 200}
          className="rounded-lg object-cover"
          sizes="(max-width: 768px) 0px, 240px"
          quality={90}
        />
      </motion.div>

      {/* Static image for mobile - always visible */}
      <div className="relative ml-auto mt-4 z-10 md:hidden block">
        <Image
          src={videoSrc}
          alt={heading}
          width={videoSrc.includes('Gym_Beetle') ? 220 : 180}
          height={videoSrc.includes('Gym_Beetle') ? 220 : 180}
          className="rounded-lg object-cover shadow-lg"
          sizes="(max-width: 768px) 220px, 0px"
          quality={90}
          priority={false}
        />
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
