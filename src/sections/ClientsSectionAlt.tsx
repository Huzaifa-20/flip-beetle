"use client";

import React from "react";
import { InteractiveHoverLinks } from "@/components/ui/interactive-hover-links";

const CLIENTS_LINKS = [
  {
    heading: "Chefs & Culinary Artists",
    subheading: "From kitchen to customers—food brands that sell",
    videoSrc: "/clients/Cook_Beetle.webm",
    href: "#contact",
  },
  {
    heading: "Fitness Coaches",
    subheading: "Turn your passion into paying clients",
    videoSrc: "/clients/Gym_Beetle.webm",
    href: "#contact",
  },
  {
    heading: "Freelancers & Creatives",
    subheading: "Stand out and attract your dream clients",
    videoSrc: "/clients/Cook_Beetle.webm",
    href: "#contact",
  },
  {
    heading: "Photographers & Artists",
    subheading: "Portfolios that book you solid",
    videoSrc: "/clients/Gym_Beetle.webm",
    href: "#contact",
  },
  {
    heading: "Business Owners",
    subheading: "Digital presence built to convert and scale",
    videoSrc: "/clients/CEO_Beetle.webm",
    href: "#contact",
  },
];

const ClientsSectionAlt = () => {
  return (
    <section data-theme="black" className="w-screen py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl riposte uppercase tracking-tight mb-6">
            We Build For The People
            {/* <br /> */}
            {/* Not Industries */}
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl riposte max-w-4xl leading-relaxed">
            Chef or coach. Artist or entrepreneur. We don&apos;t care about your job title—we care about your vision.
            <span className="block mt-4">
              Custom branding and websites that turn your story into sales.
            </span>
          </p>
        </div>

        {/* Interactive Links */}
        <InteractiveHoverLinks links={CLIENTS_LINKS} />

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-lg md:text-xl riposte mb-6">
            Ready to build your digital identity?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 border riposte text-sm md:text-base uppercase tracking-wider hover:bg-transparent hover:text-primary transition-all duration-300"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientsSectionAlt;
