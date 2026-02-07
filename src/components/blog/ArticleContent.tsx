"use client";

import React, { useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { fadeIn } from "@/utils/animations";
import DOMPurify from "isomorphic-dompurify";

interface ArticleContentProps {
  htmlContent: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ htmlContent }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Sanitize HTML content to prevent XSS attacks - memoized for performance
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: [
        "h1", "h2", "h3", "h4", "h5", "h6",
        "p", "br", "strong", "em", "u", "s",
        "ul", "ol", "li",
        "blockquote", "pre", "code",
        "a", "img",
        "hr",
        "table", "thead", "tbody", "tr", "th", "td"
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
      ALLOW_DATA_ATTR: false,
    });
  }, [htmlContent]);

  return (
    <motion.article
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Rich Text Content - Sanitized to prevent XSS */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </motion.article>
  );
};

export default React.memo(ArticleContent);
