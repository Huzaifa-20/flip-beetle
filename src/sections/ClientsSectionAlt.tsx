"use client";

import React from "react";
import { InteractiveHoverLinks } from "@/components/ui/interactive-hover-links";

const CLIENTS_LINKS = [
  {
    heading: "Startups & Founders",
    subheading: "Launch with confidence—from idea to brand identity",
    videoSrc: "/clients/Cook_Beetle.webm",
    href: "#contact",
  },
  {
    heading: "Restaurants & Hospitality",
    subheading: "Share your passion through branding that brings people in",
    videoSrc: "/clients/Gym_Beetle.webm",
    href: "#contact",
  },
  {
    heading: "Fitness & Wellness",
    subheading: "Grow your community with a digital presence that inspires",
    videoSrc: "/clients/Cook_Beetle.webm",
    href: "#contact",
  },
  {
    heading: "Creative Professionals",
    subheading: "Showcase your work with a portfolio that opens doors",
    videoSrc: "/clients/Gym_Beetle.webm",
    href: "#contact",
  },
  {
    heading: "Business Owners",
    subheading: "Create digital experiences that drive real growth",
    videoSrc: "/clients/CEO_Beetle.webm",
    href: "#contact",
  },
];

const ClientsSectionAlt = () => {
  return (
    <section data-theme="black" className="w-screen py-20 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl riposte uppercase tracking-tight mb-6">
            We Work With People,
            <br />
            Not Titles
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl riposte max-w-4xl leading-relaxed">
            Chef or coach. Artist or entrepreneur. Startup founder or business owner. What matters isn&apos;t what you do—it&apos;s the passion behind it.
            <span className="block mt-4">
              If you&apos;ve got a vision you believe in, we&apos;d love to help bring it to life.
            </span>
          </p>
        </div>

        {/* Interactive Links */}
        <InteractiveHoverLinks links={CLIENTS_LINKS} />

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-lg md:text-xl riposte mb-6">
            Ready to bring your vision to life?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 border riposte text-sm md:text-base uppercase tracking-wider hover:bg-transparent hover:text-primary transition-all duration-300"
          >
            Let&apos;s Talk About Your Vision
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientsSectionAlt;
