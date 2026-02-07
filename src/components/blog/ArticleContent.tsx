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
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Rich Text Content */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </motion.article>
  );
};

export default ArticleContent;
