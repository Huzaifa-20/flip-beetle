import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Flip Beetle",
  description:
    "Selected projects we're proud of — branding, design, and development work from Flip Beetle.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work | Flip Beetle",
    description:
      "Selected projects we're proud of — branding, design, and development.",
    images: ["/og-image.png"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
