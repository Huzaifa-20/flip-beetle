"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isBlogPage = pathname?.startsWith("/blog");

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Clients", href: "#clients" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Twitter (X)", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Telegram", href: "https://telegram.org" },
  ];

  // Use black background for blog pages, primary color for others
  const bgColor = isBlogPage ? "bg-black" : "bg-primary";
  const textColor = isBlogPage ? "text-white" : "text-background";
  const borderColor = isBlogPage ? "border-white/20" : "border-background/20";
  const hoverColor = isBlogPage ? "hover:text-gray-300" : "hover:text-secondary";

  return (
    <footer className={`w-screen min-h-screen ${bgColor} ${textColor} px-12 py-16 flex flex-col justify-between max-md:px-6 max-md:min-h-[100dvh]`}>
      <div className="w-full max-w-full mx-auto flex-1 flex flex-col justify-between">
        {/* Main Footer Content */}
        <div className="grid grid-cols-12 gap-12 max-md:grid-cols-1 max-md:gap-8">
          {/* Left Section - Brand & CTA */}
          <div className="col-span-4 max-md:col-span-1">
            <div className="mb-6">
              <h1 className="text-[4rem] md:text-[5rem] lg:text-[6rem] font-inter-tight leading-none text-background">
                FLIP BEETLE
              </h1>
            </div>
            <h2 className="text-2xl font-inter-tight mb-6 leading-tight max-w-60">
              PARTNER WITH A DIGITAL AGENCY THAT&apos;S AS AMBITIOUS AS YOU ARE.
            </h2>
            <a
              href="#contact"
              className={`inline-block px-8 py-3 border-2 ${isBlogPage ? 'border-white text-white hover:bg-white hover:text-black' : 'border-background text-background hover:bg-background hover:text-primary'} font-mono text-sm uppercase rounded-sm transition-all duration-300`}
            >
              Contact
            </a>
          </div>

          {/* Right Section - Three Columns */}
          <div className="col-span-8 grid grid-cols-3 gap-8 max-md:col-span-1 max-md:grid-cols-1">
            {/* Navigate Column */}
            <div>
              <h3 className="font-mono text-xs uppercase mb-6 tracking-wider">
                Navigate
              </h3>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-lg font-josefin ${hoverColor} transition-colors duration-300`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h3 className="font-mono text-xs uppercase mb-6 tracking-wider">
                Social & Stuff
              </h3>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-lg font-josefin ${hoverColor} transition-colors duration-300`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="font-mono text-xs uppercase mb-6 tracking-wider">
                Contact Deets
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+1234567890"
                  className={`block text-lg font-josefin ${hoverColor} transition-colors duration-300`}
                >
                  (123) 456-7890
                </a>
                <a
                  href="mailto:hello@flipbeetle.com"
                  className={`block text-lg font-josefin ${hoverColor} transition-colors duration-300 break-words`}
                >
                  hello@flipbeetle.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Location */}
        <div className={`pt-8 border-t ${borderColor} flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-4 mt-auto`}>
          <div className="flex items-center gap-6 max-md:flex-col max-md:items-start max-md:gap-2">
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
          <div className="font-mono text-xs uppercase text-right max-md:text-left">
            <p>WE&apos;RE READY TO FLIP</p>
            <p className={isBlogPage ? "text-gray-400" : "text-secondary"}>WORLDWIDE, REMOTE, AMBITIOUS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
