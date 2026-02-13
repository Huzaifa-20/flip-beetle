"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

// Constant arrays moved outside component for performance
const NAVIGATION_LINKS = [
  { name: "Homepage", href: "/" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Latest", href: "/blog" },
  { name: "Careers", href: "#careers" },
] as const;

const SOCIAL_LINKS = [
  { name: "Twitter (X)", href: "https://twitter.com" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Dribbble", href: "https://dribbble.com" },
  { name: "Behance", href: "https://behance.com" },
] as const;

const LOCATIONS = [
  "FLORIDA",
  "ARGENTINA",
  "GERMANY",
  "POLAND",
  "FRANCE",
] as const;

const Footer = () => {
  const pathname = usePathname();
  const isBlogPage = pathname?.startsWith("/blog");

  // Use black background for blog pages, primary color for others
  const bgColor = isBlogPage ? "bg-black" : "bg-primary";
  const textColor = isBlogPage ? "text-white" : "text-background";
  const hoverColor = isBlogPage ? "hover:opacity-70" : "hover:opacity-70";
  const accentColor = isBlogPage ? "text-gray-400" : "text-background/60";

  return (
    <footer className={`w-screen min-h-screen ${bgColor} ${textColor} px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 flex flex-col justify-between`}>
      <div className="w-full max-w-[1600px] mx-auto flex-1 flex flex-col justify-between gap-16 md:gap-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-20">
          {/* Left Section - Brand & CTA */}
          <div className="lg:col-span-5">
            <div className="mb-6 sm:mb-8">
              <h1
                className="text-[5rem] sm:text-[6rem] md:text-[7rem] lg:text-[7rem] xl:text-[9rem] font-inter-tight font-bold leading-22 sm:leading-[0.85]"
              >
                FLIP BEETLE
              </h1>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl riposte mb-8 sm:mb-10 max-w-[500px]">
              Your vision. Our craft. Let&apos;s build something meaningful together.
            </h2>
            <Button
              href="#contact"
              variant="outlined"
              theme={isBlogPage ? "black" : "green"}
            >
              CONTACT
            </Button>
          </div>

          {/* Right Section - Three Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-8 xl:gap-12">
            {/* Navigate Column */}
            <div>
              <h3 className="riposte text-xs uppercase mb-4">
                NAVIGATE
              </h3>
              <ul className="space-y-3">
                {NAVIGATION_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-lg sm:text-xl riposte transition-opacity duration-300 ${hoverColor}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h3 className="riposte text-xs uppercase mb-4">
                SOCIAL & STUFF
              </h3>
              <ul className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-lg sm:text-xl riposte transition-opacity duration-300 ${hoverColor}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="col-span-2 lg:col-span-1">
              <h3 className="riposte text-xs uppercase mb-4">
                CONTACT DEETS
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+14079999999"
                  className={`block text-lg sm:text-xl riposte transition-opacity duration-300 ${hoverColor}`}
                >
                  (407) 99-JUICE
                </a>
                <a
                  href="mailto:newbiz@juice.agency"
                  className={`block text-lg sm:text-xl riposte transition-opacity duration-300 ${hoverColor} wrap-break-word`}
                >
                  newbiz@juice.agency
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Locations */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Locations Section */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
            <p className="font-mono text-xs uppercase tracking-wider">
              WE&apos;RE GRITTY AF
            </p>
            <p className={`font-mono text-xs uppercase tracking-wider ${accentColor}`}>
              {LOCATIONS.join(", ")}
            </p>
          </div>

          {/* Copyright Row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-start">
            <p className="font-mono text-xs uppercase opacity-60">
              © {new Date().getFullYear()} FLIP BEETLE.
            </p>
            <a
              href="/privacy"
              className={`font-mono text-xs uppercase opacity-60 transition-opacity duration-300 hover:opacity-100`}
            >
              PRIVACY POLICY
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
