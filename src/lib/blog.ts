import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import readingTime from "reading-time";
import type { BlogPost, BlogMetadata } from "@/types/blog";

const contentDirectory = path.join(process.cwd(), "content/blog");

/**
 * Get all blog posts from the content/blog directory
 * Returns posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  // Ensure content directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Calculate read time if not provided
      const readTime = data.readTime || Math.ceil(readingTime(content).minutes);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        content,
        coverImage: data.coverImage,
        date: data.date,
        author: data.author,
        tags: data.tags || [],
        readTime,
        featured: data.featured || false,
        seo: data.seo,
      } as BlogPost;
    });

  // Sort by date descending (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Calculate read time if not provided
  const readTime = data.readTime || Math.ceil(readingTime(content).minutes);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    content,
    coverImage: data.coverImage,
    date: data.date,
    author: data.author,
    tags: data.tags || [],
    readTime,
    featured: data.featured || false,
    seo: data.seo,
  };
}

/**
 * Get featured blog posts for homepage
 */
export async function getFeaturedPosts(count: number = 4): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.featured).slice(0, count);
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

/**
 * Get adjacent posts (prev/next) for navigation
 */
export async function getAdjacentPosts(
  slug: string
): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

/**
 * Parse markdown content to HTML
 */
export function parseMarkdown(content: string): string {
  return marked(content) as string;
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tagsSet = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get blog metadata (without full content) for listing pages
 */
export async function getAllPostsMetadata(): Promise<BlogMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    date: post.date,
    tags: post.tags,
    readTime: post.readTime,
    featured: post.featured,
  }));
}
