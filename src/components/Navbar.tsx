"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useSplashAnimation } from "@/contexts/SplashAnimationContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useBeetleLogo } from "@/hooks/useBeetleLogo";
import { MENU_ITEMS, SOCIAL_LINKS } from "@/constants/navigation";
import { MenuVertical } from "@/components/ui/menu-vertical";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const { isSplashComplete } = useSplashAnimation();
  const { currentTheme } = useTheme();
  const beetleLogo = useBeetleLogo();

  // Determine hamburger icon color based on current theme
  const getHamburgerColor = () => {
    // On light backgrounds (cream, dark-cream), use dark color
    // On dark backgrounds (green, black), use light color
    return currentTheme === "cream" || currentTheme === "dark-cream"
      ? "var(--color-primary)"
      : "var(--color-background)";
  };

  // Determine sidebar background color based on current theme
  const getSidebarBgColor = () => {
    switch (currentTheme) {
      case "cream":
        return "var(--color-theme-green)";
      case "dark-cream":
        return "var(--color-theme-dark-cream)";
      case "green":
        return "var(--color-theme-cream)";
      case "black":
        return "var(--color-theme-black)";
      default:
        return "var(--color-theme-black)";
    }
  };

  // Determine sidebar text color for contrast
  // Logic is inverted from theme because sidebar background is opposite
  const getSidebarTextColor = () => {
    switch (currentTheme) {
      case "cream": // sidebar is green, needs light text
        return "var(--color-background)";
      case "green": // sidebar is cream, needs dark text
        return "var(--color-primary)";
      case "dark-cream": // sidebar is dark-cream, needs dark text
        return "var(--color-primary)";
      case "black": // sidebar is black, needs light text
        return "var(--color-background)";
      default:
        return "var(--color-background)";
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingDown = latest > prevScrollY && latest > 50;
    const isScrollingUp = latest < prevScrollY;

    if (isScrollingDown) {
      setHidden(true);
    } else if (isScrollingUp) {
      setHidden(false);
    }

    setPrevScrollY(latest);
  });

  return (
    <>
      <motion.div
        className="w-screen flex justify-center fixed top-0 z-50"
        initial="hidden"
        animate={hidden ? "hidden" : "visible"}
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="w-full flex justify-between items-center px-4 sm:px-6 md:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: isSplashComplete ? 1 : 0,
              y: isSplashComplete ? 0 : -50
            }}
            transition={{ duration: 0.5, delay: 0, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <Link href="/" className="block relative z-10">
              <Image
                src={beetleLogo}
                alt="Flip Beetle Logo"
                width={60}
                height={60}
                priority
                className="object-contain hover:scale-110 transition-transform duration-300 translate-y-1"
                unoptimized
              />
            </Link>
          </motion.div>

          {/* Hamburger Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 cursor-pointer p-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: isSplashComplete ? 1 : 0,
              y: isSplashComplete ? 0 : -50
            }}
            transition={{ duration: 0.5, delay: 0, ease: [0.43, 0.13, 0.23, 0.96] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="w-8 h-0.5 transition-all duration-300"
              style={{ backgroundColor: getHamburgerColor() }}
            ></span>
            <span
              className="w-8 h-0.5 transition-all duration-300"
              style={{ backgroundColor: getHamburgerColor() }}
            ></span>
            <span
              className="w-8 h-0.5 transition-all duration-300"
              style={{ backgroundColor: getHamburgerColor() }}
            ></span>
          </motion.button>
        </div>
      </motion.div>

      {/* Side Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 h-screen w-[85vw] xs:w-[75vw] sm:w-[400px] md:w-[450px] lg:w-[500px] max-w-full z-70 flex flex-col justify-between py-8 sm:py-10 md:py-12 px-5 sm:px-6 md:px-8 transition-colors duration-500"
              style={{ backgroundColor: getSidebarBgColor() }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 sm:top-7 md:top-8 right-5 sm:right-8 md:right-12 text-3xl sm:text-4xl transition-colors duration-300 cursor-pointer hover:scale-110 active:scale-95"
                style={{ color: getSidebarTextColor() }}
                aria-label="Close menu"
              >
                ×
              </button>

              {/* Menu Items */}
              <nav className="mt-16 sm:mt-18 md:mt-20">
                <MenuVertical
                  menuItems={MENU_ITEMS}
                  color={getSidebarTextColor()}
                  skew={-1}
                  onItemClick={() => setIsMenuOpen(false)}
                />
              </nav>

              {/* Social Links */}
              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm riposte transition-colors duration-300 uppercase tracking-wider hover:opacity-70"
                    style={{ color: getSidebarTextColor() }}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
