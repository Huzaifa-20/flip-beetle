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

// Helper function to map tags to main categories
const getPostCategory = (tags: string[]): string => {
  // Design: Visual design, aesthetics, minimalism, branding
  if (tags.some(tag => ["Minimalism", "Branding", "Typography", "Best Practices"].includes(tag))) {
    return "DESIGN";
  }
  // News: Trends, what's new in the industry
  if (tags.some(tag => ["Trends", "2026"].includes(tag))) {
    return "NEWS";
  }
  // Insights: Technical deep-dives, accessibility, responsive design, performance
  if (tags.some(tag => ["Accessibility", "WCAG", "Responsive Design", "CSS", "Mobile First", "Animation", "Performance", "Framer Motion"].includes(tag))) {
    return "INSIGHTS";
  }
  // Pulp Fiction: Creative content, stories
  if (tags.some(tag => ["Pulp Fiction", "Story", "Creative"].includes(tag))) {
    return "PULP FICTION";
  }
  return "DESIGN"; // default
};

// Helper function to get category color
const getCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    "DESIGN": "bg-[#ff8c6b]",
    "NEWS": "bg-[#c5a882]",
    "INSIGHTS": "bg-[#a0c4d9]",
    "PULP FICTION": "bg-[#b5a8d4]",
  };
  return colorMap[category] || "bg-[#ff8c6b]";
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

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fixed categories
  const categories = ["ALL", "DESIGN", "NEWS", "PULP FICTION", "INSIGHTS"];

  // Filter posts by selected category
  const filteredPosts =
    selectedCategory === "ALL"
      ? posts
      : posts.filter((post) => {
        const postCategory = getPostCategory(post.tags);
        return postCategory === selectedCategory;
      });

  // Featured post is the first one
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <main className="min-h-screen w-screen bg-black px-6 md:px-12 py-24 md:py-36">
      <div className="mx-auto">
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
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-inter-tight font-semibold text-sm transition-all duration-300 ${selectedCategory === category
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                >
                  {category}
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
            <div className="bg-transparent overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-[300px] md:h-[400px] lg:h-[600px]">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="inline-block px-4 py-1.5 bg-white text-black text-xs font-inter-tight font-bold tracking-wider rounded-full mb-4">
                      FEATURED
                    </span>
                    <span
                      className={`inline-block ml-2 px-4 py-1.5 text-white text-xs font-inter-tight font-bold tracking-wider rounded-full ${getCategoryColor(
                        getPostCategory(featuredPost.tags)
                      )}`}
                    >
                      {getPostCategory(featuredPost.tags)}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-inter-tight font-bold text-white mb-4 lg:mb-6 leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-base lg:text-lg font-josefin text-white/70 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-josefin text-white/60">
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      • {featuredPost.readTime} min read
                    </span>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <span className="text-sm font-inter-tight font-semibold text-white hover:underline cursor-pointer">
                        Read more →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Remaining Articles Grid */}
        {remainingPosts.length > 0 && (
          <motion.div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={createStaggerContainer(0.08, 0.2)}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
          >
            {remainingPosts.map((post) => (
              <motion.div key={post.slug} variants={fadeInUp} className="flex justify-center">
                <Link href={`/blog/${post.slug}`} className="w-full max-w-[374px]">
                  <div className="bg-transparent overflow-hidden cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 md:h-56">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="pt-6 pr-6 flex-1 flex flex-col">
                      <span
                        className={`inline-block px-3 py-1 text-white text-xs font-inter-tight font-bold tracking-wider rounded-full mb-4 self-start ${getCategoryColor(
                          getPostCategory(post.tags)
                        )}`}
                      >
                        {getPostCategory(post.tags)}
                      </span>

                      <h3 className="text-lg font-josefin text-white mb-3 line-clamp-2 flex-1 leading-tight">
                        {post.title}
                      </h3>

                      <div className="text-xs font-josefin text-white/50 mt-auto">
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
