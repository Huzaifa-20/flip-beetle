import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Flip Beetle",
  description:
    "Meet the team behind Flip Beetle. We're a gritty team that finds meaning in the work, cares about the details, and shows up ready to do it right.",
  openGraph: {
    title: "About Us | Flip Beetle",
    description:
      "Meet the team behind Flip Beetle. A digital agency built on genuine partnership and strategic expertise.",
    images: ["/images/og-about.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
