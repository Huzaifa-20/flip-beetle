"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Button from "@/components/ui/Button";
import Reveal from "@/components/work/Reveal";

interface CaseStudyHeroProps {
  client: string;
  title: string;
  tagline: string;
  projectUrl?: string;
}

/**
 * Hero block: eyebrow → title → tagline → optional "View Project"
 * button, staggered in as one client island. Kept separate so the rest
 * of the case study page can render on the server.
 */
export default function CaseStudyHero({
  client,
  title,
  tagline,
  projectUrl,
}: CaseStudyHeroProps) {
  return (
    <Reveal
      className="max-w-6xl mx-auto px-6 mb-12 md:mb-16"
      stagger={0.12}
    >
      <motion.p
        variants={fadeInUp}
        className="text-sm riposte font-semibold text-white/60 tracking-widest uppercase mb-6"
      >
        Case Study · {client}
      </motion.p>
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl riposte font-bold text-white leading-[1.05] mb-8 max-w-5xl"
      >
        {title}
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-lg md:text-2xl riposte text-white/70 leading-relaxed max-w-3xl"
      >
        {tagline}
      </motion.p>
      {projectUrl && (
        <motion.div variants={fadeInUp} className="mt-10">
          <Button href={projectUrl} external theme="black">
            View Project
          </Button>
        </motion.div>
      )}
    </Reveal>
  );
}
