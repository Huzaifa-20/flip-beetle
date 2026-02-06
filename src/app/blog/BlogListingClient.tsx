"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createStaggerContainer } from "@/utils/animations";
import type { BlogMetadata } from "@/types/blog";

interface BlogListingClientProps {
  posts: BlogMetadata[];
}

// Helper function to get tag color
const getTagColor = (tag: string) => {
  const colorMap: { [key: string]: string } = {
    "Web Design": "bg-[#ff8c6b]",
    "Trends": "bg-[#ff8c6b]",
    "2026": "bg-[#ff8c6b]",
    "News": "bg-[#ff8c6b]",
    "Branding": "bg-[#c5a882]",
    "UI/UX": "bg-[#c5a882]",
    "Typography": "bg-[#c5a882]",
    "Accessibility": "bg-[#a0c4d9]",
    "WCAG": "bg-[#a0c4d9]",
    "CSS": "bg-[#8fb5d9]",
    "Mobile First": "bg-[#8fb5d9]",
    "Responsive Design": "bg-[#8fb5d9]",
    "Animation": "bg-[#b5a8d4]",
    "Performance": "bg-[#b5a8d4]",
    "Framer Motion": "bg-[#b5a8d4]",
    "Best Practices": "bg-[#a8d4b5]",
    "Minimalism": "bg-[#a8d4b5]",
  };

  return colorMap[tag] || "bg-gray-400";
};

// Fade in up animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] as const },
  },
};

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const headerRef = React.useRef(null);
  const featuredRef = React.useRef(null);
  const gridRef = React.useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.3 });
  const isGridInView = useInView(gridRef, { once: true, amount: 0.2 });

  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

  // Filter posts by selected tag
  const filteredPosts =
    selectedTag === "ALL"
      ? posts
      : posts.filter((post) => post.tags.includes(selectedTag));

  // Featured post is the first one
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <main className="min-h-screen w-screen bg-black px-6 md:px-12 py-24 md:py-36">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          className="mb-16 lg:mb-24"
          variants={createStaggerContainer(0.1, 0)}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeInUp}
            className="text-sm font-inter-tight font-semibold text-white/60 tracking-wider mb-4"
          >
            ARTICLES
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-inter-tight font-bold text-white mb-6 leading-tight"
          >
            NEWS, INSIGHTS,
            <br />
            AND PULP FICTIONS.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg lg:text-xl font-josefin text-white/70 mb-12 lg:mb-16"
          >
            Collection of content we&apos;re passionate about
          </motion.p>

          {/* Filter Section */}
          <motion.div variants={fadeInUp}>
            <p className="text-sm font-inter-tight font-semibold text-white/60 tracking-wider mb-4">
              FILTER WORK
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedTag("ALL")}
                className={`px-6 py-2.5 rounded-full font-inter-tight font-semibold text-sm transition-all duration-300 ${
                  selectedTag === "ALL"
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                ALL
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-6 py-2.5 rounded-full font-inter-tight font-semibold text-sm transition-all duration-300 ${
                    selectedTag === tag
                      ? "bg-white text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {tag.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Article Section */}
        {featuredPost && (
          <motion.div
            ref={featuredRef}
            initial="hidden"
            animate={isFeaturedInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-16 lg:mb-24"
          >
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="bg-white rounded-3xl overflow-hidden hover:scale-[1.01] transition-transform duration-500 cursor-pointer">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-[300px] md:h-[400px] lg:h-[600px]">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <span className="inline-block px-4 py-1.5 bg-black text-white text-xs font-inter-tight font-bold tracking-wider rounded-full mb-4">
                        FEATURED
                      </span>
                      {featuredPost.tags.length > 0 && (
                        <span
                          className={`inline-block ml-2 px-4 py-1.5 text-white text-xs font-inter-tight font-bold tracking-wider rounded-full ${getTagColor(
                            featuredPost.tags[0]
                          )}`}
                        >
                          {featuredPost.tags[0].toUpperCase()}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-inter-tight font-bold text-black mb-4 lg:mb-6 leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-base lg:text-lg font-josefin text-black/70 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-josefin text-black/60">
                        {new Date(featuredPost.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        • {featuredPost.readTime} min read
                      </span>
                      <span className="text-sm font-inter-tight font-semibold text-black hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Remaining Articles Grid */}
        {remainingPosts.length > 0 && (
          <motion.div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={createStaggerContainer(0.08, 0.2)}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
          >
            {remainingPosts.map((post) => (
              <motion.div key={post.slug} variants={fadeInUp}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 md:h-56">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {post.tags.length > 0 && (
                        <span
                          className={`inline-block px-3 py-1 text-white text-xs font-inter-tight font-bold tracking-wider rounded-full mb-4 self-start ${getTagColor(
                            post.tags[0]
                          )}`}
                        >
                          {post.tags[0].toUpperCase()}
                        </span>
                      )}

                      <h3 className="text-xl lg:text-2xl font-inter-tight font-bold text-black mb-3 line-clamp-2 flex-1">
                        {post.title}
                      </h3>

                      <p className="text-sm font-josefin text-black/60 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="text-xs font-josefin text-black/50 mt-auto">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        • {post.readTime} min
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl font-josefin text-white/60">
              No articles found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
