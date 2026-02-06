import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal | Flip Beetle",
  description:
    "Web design insights, trends, and case studies from Flip Beetle design agency.",
  openGraph: {
    title: "Journal | Flip Beetle",
    description: "Web design insights, trends, and case studies.",
    images: ["/images/blog-og.jpg"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
