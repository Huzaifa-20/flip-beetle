"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useLenis } from "@/contexts/LenisContext";
import { useBeetleLogo } from "@/hooks/useBeetleLogo";
import { Mail, Phone, Instagram } from "lucide-react";
import { MENU_ITEMS } from "@/constants/navigation";
import { MenuVertical } from "@/components/ui/menu-vertical";
import { getSidebarColors } from "@/utils/themeColors";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useLenis();
  const prevScrollYRef = useRef(0);
  const { currentTheme } = useTheme();
  const beetleLogo = useBeetleLogo();

  // Get centralized theme colors for sidebar
  const { background: sidebarBg, text: sidebarText, hamburger: hamburgerColor } = getSidebarColors(currentTheme);

  // Track scroll direction and show/hide navbar accordingly
  // This effect responds to external scroll position from Lenis
  useEffect(() => {
    const prevScrollY = prevScrollYRef.current;
    const isScrollingDown = scrollY > prevScrollY && scrollY > 50;
    const isScrollingUp = scrollY < prevScrollY;

    // Defer state update to avoid synchronous setState in effect
    queueMicrotask(() => {
      if (isScrollingDown) {
        setHidden(true);
      } else if (isScrollingUp) {
        setHidden(false);
      }
    });

    prevScrollYRef.current = scrollY;
  }, [scrollY]);

  return (
    <>
      <motion.div
        id="navbar"
        className="w-screen flex justify-center fixed top-0 z-50"
        initial="visible"
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
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: 1,
              y: 0
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
                sizes="60px"
                quality={95}
              />
            </Link>
          </motion.div>

          {/* Hamburger Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 cursor-pointer p-2"
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{ duration: 0.5, delay: 0, ease: [0.43, 0.13, 0.23, 0.96] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="w-8 h-0.5 transition-all duration-300"
              style={{ backgroundColor: hamburgerColor }}
            ></span>
            <span
              className="w-8 h-0.5 transition-all duration-300"
              style={{ backgroundColor: hamburgerColor }}
            ></span>
            <span
              className="w-8 h-0.5 transition-all duration-300"
              style={{ backgroundColor: hamburgerColor }}
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
              style={{ backgroundColor: sidebarBg }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 sm:top-7 md:top-8 right-5 sm:right-8 md:right-12 text-3xl sm:text-4xl transition-colors duration-300 cursor-pointer hover:scale-110 active:scale-95"
                style={{ color: sidebarText }}
                aria-label="Close menu"
              >
                ×
              </button>

              {/* Menu Items */}
              <nav className="mt-16 sm:mt-18 md:mt-20">
                <MenuVertical
                  menuItems={MENU_ITEMS}
                  color={sidebarText}
                  skew={-1}
                  onItemClick={() => setIsMenuOpen(false)}
                />
              </nav>

              {/* Social & Contact Icons */}
              <div className="flex items-center gap-5">
                <a href="mailto:flipbeetle@studiocrobe.com" aria-label="Email" className="transition-opacity duration-300 hover:opacity-70" style={{ color: sidebarText }}>
                  <Mail className="w-5 h-5" />
                </a>
                <a href="tel:+971525021443" aria-label="Phone" className="transition-opacity duration-300 hover:opacity-70" style={{ color: sidebarText }}>
                  <Phone className="w-5 h-5" />
                </a>
                <a href="https://wa.me/971525021443" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-opacity duration-300 hover:opacity-70" style={{ color: sidebarText }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href="https://www.instagram.com/flipbeetle" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-opacity duration-300 hover:opacity-70" style={{ color: sidebarText }}>
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
