"use client";

import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogMetadata } from "@/types/blog";

interface BlogSectionProps {
  posts: BlogMetadata[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen flex justify-center items-center px-6 md:px-12 py-8 md:py-32 relative"
    >
      <div className="max-w-7xl w-full">
        {/* Section Header */}
        <div className="w-full flex items-end justify-between mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl lg:text-7xl riposte uppercase tracking-tight"
          >
            LATEST
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-base sm:text-lg riposte uppercase border-b w-fit transition-colors duration-300 hover:text-accent"
            >
              VIEW ALL
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Blog Cards Grid */}
        <motion.div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {posts.slice(0, 4).map((post) => (
            <BlogCard key={post.slug} post={post} variant="homepage" />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(BlogSection);
