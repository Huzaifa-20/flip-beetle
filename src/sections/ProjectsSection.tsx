"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { createStaggerContainer, fadeInUp } from "@/utils/animations";
import Button from "@/components/ui/Button";
import { CursorProvider, Cursor } from "@/components/ui/cursor";

const PROJECTS = [
  {
    title: "Multipool Finance",
    category: "Design & Development",
    video:
      "https://res.cloudinary.com/dajccfztx/video/upload/c_fill,ar_16:10,f_auto,q_auto/v1778083374/multipool_cjn5af.mp4",
    poster:
      "https://res.cloudinary.com/dajccfztx/video/upload/c_fill,ar_16:10,so_0,f_auto,q_auto/v1778083374/multipool_cjn5af.jpg",
    href: "#",
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[16/10]",
  },
  {
    title: "Prep'd",
    category: "Branding, Design, & Development",
    image: "/projects/prepd.webp",
    href: "#",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[4/5]",
    offsetTop: true,
  },
  {
    title: "Camaradly",
    category: "Design",
    image: "/projects/camaradly.webp",
    href: "#",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[4/5]",
    offsetTop: true,
  },
  {
    title: "Studio Crobe",
    category: "Branding, Design, & Development",
    image: "/projects/Studio_Crobe.webp",
    href: "#",
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[16/10]",
  },
  {
    title: "Knot",
    category: "Branding",
    image: "/projects/knot.jpg",
    href: "#",
    colSpan: "md:col-span-7",
    aspectRatio: "aspect-[16/10]",
  },
  {
    title: "Tokinvest",
    category: "Development",
    image: "/projects/Tokinvest.webp",
    href: "#",
    colSpan: "md:col-span-5",
    aspectRatio: "aspect-[4/5]",
    offsetTop: true,
  },
] as const;

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  eager: boolean;
}

const ProjectCard = ({ project, eager }: ProjectCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      className={`${project.colSpan} col-span-12 ${"offsetTop" in project && project.offsetTop ? "md:-mt-16" : ""}`}
    >
      <a href={project.href} className="block group">
        <div className="relative">
          <CursorProvider>
            <Cursor>
              <div className="bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-2 text-xs uppercase tracking-widest riposte font-medium whitespace-nowrap rounded-sm shadow-md">
                View Project
              </div>
            </Cursor>
          </CursorProvider>

          {/* Media */}
          <figure
            className={`relative overflow-hidden rounded-lg ${project.aspectRatio}`}
          >
            {"video" in project ? (
              <video
                src={project.video}
                poster={project.poster}
                aria-label={`${project.title} preview`}
                autoPlay
                muted
                loop
                playsInline
                preload={eager ? "auto" : "metadata"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px"
                priority={eager}
                className="bg-white object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
          </figure>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl riposte uppercase mt-4 mb-1">
          {project.title}
        </h3>
        <p className="text-sm riposte opacity-60">{project.category}</p>
      </a>
    </motion.div>
  );
};

const MemoizedProjectCard = React.memo(ProjectCard);

const HEADING_ANIMATE = { opacity: 1, y: 0 };
const HEADING_INITIAL = { opacity: 0, y: 30 };
const HEADING_TRANSITION = { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const };
const CTA_INITIAL = { opacity: 0, y: 20 };
const CTA_ANIMATE = { opacity: 1, y: 0 };
const CTA_TRANSITION = {
  duration: 0.5,
  delay: 0.8,
  ease: [0.33, 1, 0.68, 1] as const,
};
const STAGGER_VARIANTS = createStaggerContainer(0.15, 0.1);

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      data-theme="cream"
      className="w-screen py-16 md:py-36 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={HEADING_INITIAL}
          animate={isInView ? HEADING_ANIMATE : HEADING_INITIAL}
          transition={HEADING_TRANSITION}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light riposte max-w-3xl mb-16 md:mb-24 leading-tight"
        >
          Featured work where design drives clarity and brand growth.
        </motion.h2>

        <motion.div
          variants={STAGGER_VARIANTS}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-12 gap-8 md:gap-12"
        >
          {PROJECTS.map((project, index) => (
            <MemoizedProjectCard
              key={project.title}
              project={project}
              eager={index < 2}
            />
          ))}
        </motion.div>

        <motion.div
          initial={CTA_INITIAL}
          animate={isInView ? CTA_ANIMATE : CTA_INITIAL}
          transition={CTA_TRANSITION}
          className="mt-16 md:mt-24"
        >
          <Button href="/work" variant="outlined" theme="cream">
            See All Work &rarr;
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(ProjectsSection);
