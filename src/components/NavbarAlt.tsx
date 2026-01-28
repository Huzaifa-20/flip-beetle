"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const MenuItems = [
  { label: "HOME", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "WORK", href: "#" },
  { label: "JOURNAL", href: "#" },
  { label: "CONTACT", href: "#" },
];

const SocialLinks = [
  { label: "LINKEDIN", href: "https://linkedin.com" },
  { label: "TWITTER", href: "https://twitter.com" },
  { label: "INSTAGRAM", href: "https://instagram.com" },
];

const NavbarAlt = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);

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
        <div className="w-full flex justify-end items-center py-4 px-12">
          {/* Hamburger Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 cursor-pointer p-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="w-8 h-0.5 bg-background transition-all duration-300"></span>
            <span className="w-8 h-0.5 bg-background transition-all duration-300"></span>
            <span className="w-8 h-0.5 bg-background transition-all duration-300"></span>
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
              className="fixed right-0 top-0 h-screen w-[500px] bg-[#2a2a2a] z-70 flex flex-col justify-between p-12"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-12 text-background text-4xl hover:text-secondary transition-colors"
              >
                ×
              </button>

              {/* Menu Items */}
              <nav className="flex flex-col gap-8 mt-20">
                {MenuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-5xl font-bangers text-background hover:text-secondary transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Social Links */}
              <div className="flex gap-8">
                {SocialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-josefin text-background hover:text-secondary transition-colors duration-300 uppercase tracking-wider"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarAlt;
