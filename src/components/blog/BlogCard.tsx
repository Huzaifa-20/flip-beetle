"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import type { BlogMetadata } from "@/types/blog";

interface BlogCardProps {
  post: BlogMetadata;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="group relative"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block bg-[var(--color-theme-cream)] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      >
        {/* Cover Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[var(--color-primary)]/10">
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
                  className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-inter-tight uppercase tracking-wider rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-inter-tight text-[var(--color-text-on-cream)] mb-3 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-lg font-josefin text-[var(--color-text-on-cream)]/80 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm font-josefin text-[var(--color-text-on-cream)]/60">
            <span>{formattedDate}</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
