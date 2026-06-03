"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { CursorProvider, Cursor } from "@/components/ui/cursor";
import LazyVideo from "@/components/ui/LazyVideo";
import {
  getPrimaryProjectCategory,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

const CATEGORY_COLOR: Record<ProjectCategory, string> = {
  BRANDING: "bg-[var(--color-tag-tan)]",
  DESIGN: "bg-[var(--color-tag-coral)]",
  DEVELOPMENT: "bg-[var(--color-tag-light-blue)]",
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const primaryCategory = getPrimaryProjectCategory(project);

  return (
    <motion.div variants={fadeInUp} className="flex justify-center">
      <Link href={project.href} className="w-full max-w-[374px]">
        <div className="bg-transparent overflow-hidden cursor-pointer h-full flex flex-col">
          {/* Media */}
          <div className="relative h-48 md:h-56">
            <CursorProvider>
              <Cursor>
                <div className="bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-2 text-xs uppercase tracking-widest riposte font-medium whitespace-nowrap rounded-sm shadow-md">
                  View Project
                </div>
              </Cursor>
            </CursorProvider>
            {project.video ? (
              <LazyVideo
                src={project.video}
                poster={project.poster}
                alt={`${project.title} preview`}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Image
                src={project.horizontalImage ?? project.verticalImage ?? ""}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="bg-white object-cover rounded-lg"
              />
            )}
          </div>

          {/* Content */}
          <div className="pt-6 pr-6 flex-1 flex flex-col">
            <span
              className={`inline-block px-3 py-1 text-xs riposte font-bold tracking-wider rounded-full mb-4 self-start ${CATEGORY_COLOR[primaryCategory]}`}
            >
              {primaryCategory}
            </span>

            <h3 className="text-lg riposte mb-3 line-clamp-2 flex-1 leading-tight text-white">
              {project.title}
            </h3>

            <div className="text-xs riposte mt-auto text-white/70">
              {project.category}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
