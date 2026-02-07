"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";

interface ArticleNavigationProps {
  prev: BlogPost | null;
  next: BlogPost | null;
}

const ArticleNavigation: React.FC<ArticleNavigationProps> = ({ prev, next }) => {
  if (!prev && !next) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Article */}
        {prev ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={`/blog/${prev.slug}`}
              className="block p-6 rounded-2xl h-full"
            >
              <div className="flex items-center gap-3 mb-3">
                <ArrowLeft className="w-5 h-5 text-[var(--color-white)]" />
                <span className="text-sm font-inter-tight uppercase tracking-wider text-white/60">
                  Previous Article
                </span>
              </div>
              <h3 className="text-2xl font-inter-tight text-white line-clamp-2">
                {prev.title}
              </h3>
            </Link>
          </motion.div>
        ) : (
          <div />
        )}

        {/* Next Article */}
        {next ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={`/blog/${next.slug}`}
              className="block p-6 h-full text-right"
            >
              <div className="flex items-center justify-end gap-3 mb-3">
                <span className="text-sm font-inter-tight uppercase tracking-wider text-white/60">
                  Next Article
                </span>
                <ArrowRight className="w-5 h-5 text-[var(--color-white)]" />
              </div>
              <h3 className="text-2xl font-inter-tight text-white line-clamp-2">
                {next.title}
              </h3>
            </Link>
          </motion.div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default ArticleNavigation;
