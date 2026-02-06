export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string; // ISO format: "2026-02-06"
  author: {
    name: string;
    role: string;
    image: string;
  };
  tags: string[];
  readTime: number; // in minutes
  featured: boolean; // for homepage display
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
}

export interface BlogMetadata {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  tags: string[];
  readTime: number;
  featured: boolean;
}
