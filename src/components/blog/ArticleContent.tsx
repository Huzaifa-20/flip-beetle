"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { fadeIn } from "@/utils/animations";

interface ArticleContentProps {
  htmlContent: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ htmlContent }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.article
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="prose prose-lg max-w-4xl mx-auto px-6 py-12"
      style={{
        // Custom prose styling for blog content
        "--tw-prose-body": "var(--color-text-on-cream)",
        "--tw-prose-headings": "var(--color-text-on-cream)",
        "--tw-prose-links": "var(--color-primary)",
        "--tw-prose-bold": "var(--color-text-on-cream)",
        "--tw-prose-quotes": "var(--color-text-on-cream)",
        "--tw-prose-quote-borders": "var(--color-primary)",
        "--tw-prose-code": "var(--color-primary)",
        "--tw-prose-pre-bg": "rgba(96, 108, 56, 0.1)",
      } as React.CSSProperties}
    >
      {/* Rich Text Content */}
      <div
        className="article-content font-josefin leading-relaxed"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        style={{
          // H2 Styling
          "& h2": {
            fontSize: "2.25rem",
            fontFamily: "var(--font-inter-tight)",
            fontWeight: "700",
            marginTop: "3rem",
            marginBottom: "1.5rem",
            color: "var(--color-text-on-cream)",
          },
          // H3 Styling
          "& h3": {
            fontSize: "1.875rem",
            fontFamily: "var(--font-inter-tight)",
            fontWeight: "600",
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "var(--color-text-on-cream)",
          },
          // Paragraph Styling
          "& p": {
            fontSize: "1.25rem",
            fontFamily: "var(--font-josefin)",
            lineHeight: "1.8",
            marginBottom: "1.5rem",
            color: "var(--color-text-on-cream)",
          },
          // List Styling
          "& ul, & ol": {
            paddingLeft: "1.5rem",
            marginBottom: "1.5rem",
          },
          "& li": {
            fontSize: "1.25rem",
            fontFamily: "var(--font-josefin)",
            marginBottom: "0.5rem",
          },
          // Blockquote Styling
          "& blockquote": {
            borderLeft: "4px solid var(--color-primary)",
            paddingLeft: "1.5rem",
            fontStyle: "italic",
            marginTop: "2rem",
            marginBottom: "2rem",
            color: "var(--color-text-on-cream)",
          },
          // Code Block Styling
          "& pre": {
            backgroundColor: "rgba(96, 108, 56, 0.1)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            overflowX: "auto",
            marginTop: "2rem",
            marginBottom: "2rem",
          },
          "& code": {
            fontFamily: "monospace",
            fontSize: "0.875rem",
            color: "var(--color-primary)",
          },
          // Image Styling
          "& img": {
            width: "100%",
            borderRadius: "1rem",
            marginTop: "2rem",
            marginBottom: "2rem",
          },
          // Link Styling
          "& a": {
            color: "var(--color-primary)",
            textDecoration: "underline",
            transition: "opacity 0.2s",
          },
          "& a:hover": {
            opacity: "0.8",
          },
        } as React.CSSProperties}
      />
    </motion.article>
  );
};

export default ArticleContent;
