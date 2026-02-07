"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp } from "@/utils/animations";
import type { BlogMetadata } from "@/types/blog";

interface BlogSectionProps {
  posts: BlogMetadata[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Get primary tag for each post
  const getPrimaryTag = (tags: string[]) => {
    return tags[0] || "Article";
  };

  // Get tag color based on tag name
  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      "News": "bg-[#ff8c6b]",
      "Web Design": "bg-[#ff8c6b]",
      "Trends": "bg-[#ff8c6b]",
      "Case Study": "bg-[#ffb5a0]",
      "Branding": "bg-[#c5a882]",
      "Typography": "bg-[#c5a882]",
      "Accessibility": "bg-[#a0c4d9]",
      "UI/UX": "bg-[#a0c4d9]",
      "default": "bg-[#c5a882]"
    };
    return colors[tag] || colors.default;
  };

  return (
    <section
      ref={ref}
      data-theme="cream"
      className="w-screen flex justify-center items-center px-6 md:px-12 py-24 md:py-36 relative"
    >
      <div className="max-w-7xl w-full">
        {/* Section Header */}
        <div className="w-full flex items-center justify-between mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl lg:text-7xl font-inter-tight uppercase tracking-tight text-[var(--color-text-on-cream)]"
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
              className="inline-flex items-center gap-2 text-lg md:text-xl font-inter-tight uppercase tracking-wider text-[var(--color-text-on-cream)] hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              VIEW ALL
              <ArrowRight className="w-5 h-5" />
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
          {posts.slice(0, 4).map((post) => {
            const primaryTag = getPrimaryTag(post.tags);
            const tagColor = getTagColor(primaryTag);

            return (
              <motion.div key={post.slug} variants={fadeInUp} className="flex justify-center">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-transparent overflow-hidden w-full max-w-[374px]"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="pt-6 pr-6 flex flex-col gap-4">
                    {/* Title */}
                    <h3 className="text-lg font-josefin text-gray-900 line-clamp-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Tag */}
                    <div>
                      <span
                        className={`inline-block px-4 py-1.5 ${tagColor} text-gray-900 text-xs font-inter-tight uppercase tracking-wider rounded-md`}
                      >
                        {primaryTag}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
