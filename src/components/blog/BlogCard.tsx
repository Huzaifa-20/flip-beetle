"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import type { BlogMetadata } from "@/types/blog";

// Helper function to get primary tag
const getPrimaryTag = (tags: string[]) => {
  return tags[0] || "Article";
};

// Helper function to get tag color
const getTagColor = (tag: string) => {
  const colors: { [key: string]: string } = {
    "News": "bg-[var(--color-tag-coral)]",
    "Web Design": "bg-[var(--color-tag-coral)]",
    "Trends": "bg-[var(--color-tag-coral)]",
    "Case Study": "bg-[var(--color-tag-light-coral)]",
    "Branding": "bg-[var(--color-tag-tan)]",
    "Typography": "bg-[var(--color-tag-tan)]",
    "Accessibility": "bg-[var(--color-tag-light-blue)]",
    "UI/UX": "bg-[var(--color-tag-light-blue)]",
    "default": "bg-[var(--color-tag-tan)]"
  };
  return colors[tag] || colors.default;
};

// Helper function to get category from tags
const getPostCategory = (tags: string[]): string => {
  if (tags.some(tag => ["Minimalism", "Branding", "Typography", "Best Practices"].includes(tag))) {
    return "DESIGN";
  }
  if (tags.some(tag => ["Trends", "2026"].includes(tag))) {
    return "NEWS";
  }
  if (tags.some(tag => ["Accessibility", "WCAG", "Responsive Design", "CSS", "Mobile First", "Animation", "Performance", "Framer Motion"].includes(tag))) {
    return "INSIGHTS";
  }
  return "DESIGN";
};

// Helper function to get category color
const getCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    "DESIGN": "bg-[var(--color-tag-coral)]",
    "NEWS": "bg-[var(--color-tag-tan)]",
    "INSIGHTS": "bg-[var(--color-tag-light-blue)]",
  };
  return colorMap[category] || "bg-[var(--color-tag-coral)]";
};

type BlogCardVariant = "homepage" | "listing" | "default";

interface BlogCardProps {
  post: BlogMetadata;
  variant?: BlogCardVariant;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = "default", index = 0 }) => {
  // Format date based on variant
  const formattedDate = variant === "listing"
    ? new Date(post.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Homepage variant (used in BlogSection)
  if (variant === "homepage") {
    const primaryTag = getPrimaryTag(post.tags);
    const tagColor = getTagColor(primaryTag);

    return (
      <motion.div variants={fadeInUp} className="flex justify-center">
        <Link
          href={`/blog/${post.slug}`}
          className="group block bg-transparent overflow-hidden w-full max-w-[374px]"
        >
          {/* Image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden">
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
            <h3 className="text-lg riposte line-clamp-2">
              {post.title}
            </h3>

            {/* Tag */}
            <div>
              <span
                className={`inline-block px-4 py-1.5 ${tagColor} text-xs riposte uppercase tracking-wider rounded-md`}
              >
                {primaryTag}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Listing variant (used in BlogListingClient)
  if (variant === "listing") {
    const category = getPostCategory(post.tags);
    const categoryColor = getCategoryColor(category);

    return (
      <motion.div variants={fadeInUp} className="flex justify-center">
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
                className={`inline-block px-3 py-1 text-xs riposte font-bold tracking-wider rounded-full mb-4 self-start ${categoryColor}`}
              >
                {category}
              </span>

              <h3 className="text-lg riposte mb-3 line-clamp-2 flex-1 leading-tight">
                {post.title}
              </h3>

              <div className="text-xs riposte mt-auto">
                {formattedDate} • {post.readTime} min
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant (original implementation)
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="group relative"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      >
        {/* Cover Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs riposte uppercase tracking-wider rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl md:text-3xl riposte mb-3 line-clamp-2 transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-lg riposte mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm riposte">
            <span>{formattedDate}</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default React.memo(BlogCard);
