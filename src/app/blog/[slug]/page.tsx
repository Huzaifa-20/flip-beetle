import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import ReadProgressBar from "@/components/blog/ReadProgressBar";
import ArticleContent from "@/components/blog/ArticleContent";
import ArticleNavigation from "@/components/blog/ArticleNavigation";
import ScrollToTop from "@/components/blog/ScrollToTop";
import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
  parseMarkdown,
} from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    return {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      keywords: post.seo.keywords,
      openGraph: {
        title: post.seo.metaTitle,
        description: post.seo.metaDescription,
        images: [post.seo.ogImage],
        type: "article",
        publishedTime: post.date,
        authors: [post.author.name],
      },
      twitter: {
        card: "summary_large_image",
        title: post.seo.metaTitle,
        description: post.seo.metaDescription,
        images: [post.seo.ogImage],
      },
    };
  } catch (error) {
    return {
      title: "Article Not Found | Flip Beetle",
      description: "The requested article could not be found.",
    };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  // Fetch data - if any fetch fails, it will throw and Next.js will handle it
  let post, prev, next, htmlContent, formattedDate;

  try {
    post = await getPostBySlug(slug);
    const adjacentPosts = await getAdjacentPosts(slug);
    prev = adjacentPosts.prev;
    next = adjacentPosts.next;
    htmlContent = parseMarkdown(post.content);

    // Format date
    formattedDate = new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    notFound();
  }

  // Return JSX outside of try/catch to avoid React error
  return (
    <main
      data-theme="black"
      className="min-h-screen w-screen"
    >
      {/* Scroll to top on page load */}
      <ScrollToTop />

      {/* Read Progress Bar */}
      <ReadProgressBar />

      {/* Hero Section */}
      <article className="w-full">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-8">
          <nav className="flex items-center gap-2 text-sm riposte text-white/70">
            <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-[var(--color-accent)] transition-colors">
              Journal
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{post.title}</span>
          </nav>
        </div>

        {/* Title & Meta */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl riposte mb-8 leading-tight text-white">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 riposte text-white/70">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-3">
              <span>By {post.author.name}</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="w-full max-w-6xl mx-auto px-6 pb-16">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>

        {/* Article Content */}
        <ArticleContent htmlContent={htmlContent} />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm riposte uppercase tracking-wider rounded-full bg-white/10 text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Article Navigation */}
        <ArticleNavigation prev={prev} next={next} />

        {/* CTA Section */}
        <div className="w-full py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl riposte text-white mb-6">
              Ready to start your project?
            </h2>
            <p className="text-xl riposte text-white/80 mb-8">
              Let&apos;s create something amazing together
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-black riposte font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              image: post.coverImage,
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: post.author.name,
              },
              publisher: {
                "@type": "Organization",
                name: "Flip Beetle",
              },
            }),
          }}
        />
      </article>
    </main>
  );
}
