"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Constant arrays moved outside component for performance
const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Clients", href: "#clients" },
  { name: "Contact", href: "#contact" },
] as const;

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Facebook", href: "https://facebook.com" },
  { name: "Twitter (X)", href: "https://twitter.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Telegram", href: "https://telegram.org" },
] as const;

const Footer = () => {
  const pathname = usePathname();
  const isBlogPage = pathname?.startsWith("/blog");

  // Use black background for blog pages, primary color for others
  const bgColor = isBlogPage ? "bg-black" : "bg-primary";
  const textColor = isBlogPage ? "text-white" : "text-background";
  const borderColor = isBlogPage ? "border-white/20" : "border-background/20";
  const hoverColor = isBlogPage ? "hover:text-gray-300" : "hover:text-secondary";

  return (
    <footer className={`w-screen min-h-screen ${bgColor} ${textColor} px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-14 md:py-16 flex flex-col justify-between`}>
      <div className="w-full max-w-full mx-auto flex-1 flex flex-col justify-between">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left Section - Brand & CTA */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h1 className="text-[2.5rem] xs:text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] riposte leading-none text-background">
                FLIP BEETLE
              </h1>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl riposte mb-5 sm:mb-6 leading-tight max-w-full md:max-w-xs lg:max-w-md">
              PARTNER WITH A DIGITAL AGENCY THAT&apos;S AS AMBITIOUS AS YOU ARE.
            </h2>
            <a
              href="#contact"
              className={`inline-block px-6 sm:px-8 py-2.5 sm:py-3 border-2 ${isBlogPage ? 'border-white text-white hover:bg-white hover:text-black' : 'border-background text-background hover:bg-background hover:text-primary'} font-mono text-xs sm:text-sm uppercase rounded-sm transition-all duration-300`}
            >
              Contact
            </a>
          </div>

          {/* Right Section - Three Columns */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 md:gap-8">
            {/* Navigate Column */}
            <div>
              <h3 className="font-mono text-xs uppercase mb-4 sm:mb-5 md:mb-6 tracking-wider">
                Navigate
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                {NAVIGATION_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-base sm:text-lg riposte ${hoverColor} transition-colors duration-300`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h3 className="font-mono text-xs uppercase mb-4 sm:mb-5 md:mb-6 tracking-wider">
                Social & Stuff
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-base sm:text-lg riposte ${hoverColor} transition-colors duration-300`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="font-mono text-xs uppercase mb-4 sm:mb-5 md:mb-6 tracking-wider">
                Contact Deets
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="tel:+1234567890"
                  className={`block text-base sm:text-lg riposte ${hoverColor} transition-colors duration-300`}
                >
                  (123) 456-7890
                </a>
                <a
                  href="mailto:hello@flipbeetle.com"
                  className={`block text-base sm:text-lg riposte ${hoverColor} transition-colors duration-300 break-words`}
                >
                  hello@flipbeetle.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Location */}
        <div className={`pt-6 sm:pt-7 md:pt-8 mt-auto border-t ${borderColor} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
            <p className="font-mono text-xs uppercase">
              © {new Date().getFullYear()} Flip Beetle.
            </p>
            <a
              href="/privacy"
              className={`font-mono text-xs uppercase ${hoverColor} transition-colors duration-300`}
            >
              Privacy Policy
            </a>
          </div>
          <div className="font-mono text-xs uppercase text-left sm:text-right">
            <p>WE&apos;RE READY TO FLIP</p>
            <p className={isBlogPage ? "text-gray-400" : "text-secondary"}>WORLDWIDE, REMOTE, AMBITIOUS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
