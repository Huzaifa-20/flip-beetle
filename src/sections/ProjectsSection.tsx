"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { createStaggerContainer, fadeInUp } from "@/utils/animations";
import Button from "@/components/ui/Button";
import LazyVideo from "@/components/ui/LazyVideo";
import { CursorProvider, Cursor } from "@/components/ui/cursor";
import { PROJECTS, type Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
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
            {project.video ? (
              <LazyVideo
                src={project.video}
                poster={project.poster}
                alt={`${project.title} preview`}
                preload={eager ? "auto" : "metadata"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <Image
                src={project.verticalImage ?? project.horizontalImage ?? ""}
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
          {PROJECTS.filter((project) => project.featured).map(
            (project, index) => (
              <MemoizedProjectCard
                key={project.title}
                project={project}
                eager={index < 2}
              />
            ),
          )}
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
