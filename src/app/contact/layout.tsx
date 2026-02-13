import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Flip Beetle",
  description: "Get in touch with Flip Beetle. Let's build something remarkable together.",
  openGraph: {
    title: "Contact | Flip Beetle",
    description: "Get in touch with Flip Beetle. Let's build something remarkable together.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
