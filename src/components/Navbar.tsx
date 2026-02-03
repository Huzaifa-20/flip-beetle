"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  navbarSlideDown,
  navItemStagger,
  buttonHover,
  createStaggerContainer,
} from "@/utils/animations";

const NavLinks = [
  {
    label: "Service",
    href: "#",
  },
  {
    label: "Portfolio",
    href: "#",
  },
  {
    label: "Process",
    href: "#",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  return (
    <motion.div
      className={`w-screen flex justify-center fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-background/80 shadow-md" : ""
      }`}
      initial="hidden"
      animate="visible"
      variants={navbarSlideDown}
    >
      <div className="w-full flex justify-between items-center py-4 px-12">
        <motion.div
          className="w-fit flex justify-center items-center gap-8"
          variants={createStaggerContainer(0.05, 0.5)}
          initial="hidden"
          animate="visible"
        >
          {NavLinks.map((navLink) => (
            <motion.div key={navLink.label} variants={navItemStagger}>
              <Link
                href={navLink.href}
                className="text-xl font-inter-tight relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:scale-105 transition-transform"
              >
                {navLink.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          className="w-fit text-background text-xl font-inter-tight px-4 pt-1.5 pb-2 rounded-4xl cursor-pointer bg-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
        >
          Let&apos;s Talk
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Navbar;
