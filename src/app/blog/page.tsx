import React from "react";
import { getAllPostsMetadata } from "@/lib/blog";
import BlogListingClient from "./BlogListingClient";

export default async function BlogPage() {
  const posts = await getAllPostsMetadata();

  return <BlogListingClient posts={posts} />;
}
