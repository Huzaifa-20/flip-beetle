"use client";

import React, { useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { createStaggerContainer, fadeInUp } from "@/utils/animations";
import ProjectCard from "@/components/work/ProjectCard";
import ScrollToTop from "@/components/work/ScrollToTop";
import {
  projectMatchesFilter,
  type Project,
  type ProjectFilter,
} from "@/data/projects";

interface WorkListingClientProps {
  projects: readonly Project[];
}

const FILTERS = ["ALL", "BRANDING", "DESIGN", "DEVELOPMENT"] as const;

function WorkListingClient({ projects }: WorkListingClientProps) {
  const headerRef = React.useRef(null);
  const gridRef = React.useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  const isGridInView = useInView(gridRef, { once: true, amount: 0.2 });

  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>("ALL");

  const filteredProjects = useMemo(
    () => projects.filter((p) => projectMatchesFilter(p, selectedFilter)),
    [projects, selectedFilter],
  );

  return (
    <>
      <ScrollToTop />
      <main
        data-theme="black"
        className="min-h-screen w-screen bg-black px-6 md:px-12 py-24 md:py-36"
      >
      <div className="mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="mb-16 lg:mb-24"
          variants={createStaggerContainer(0.1, 0)}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeInUp}
            className="text-sm riposte font-semibold text-white/60 tracking-wider mb-4"
          >
            WORK
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl riposte font-bold text-white mb-6 leading-tight"
          >
            BRANDS, WEBSITES,
            <br />
            AND BRAVE IDEAS.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg lg:text-xl riposte text-white/70 mb-12 lg:mb-16"
          >
            Selected projects we&apos;re proud of
          </motion.p>

          {/* Filter */}
          <motion.div variants={fadeInUp}>
            <p className="text-sm riposte font-semibold text-white/60 tracking-wider mb-4">
              FILTER WORK
            </p>
            <div className="flex flex-wrap gap-3">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-2.5 rounded-full riposte font-semibold text-sm transition-all duration-300 ${
                    selectedFilter === filter
                      ? "bg-white text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            key={selectedFilter}
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={createStaggerContainer(0.08, 0.2)}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl riposte text-white/60">
              No projects found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </main>
    </>
  );
}

export default React.memo(WorkListingClient);
