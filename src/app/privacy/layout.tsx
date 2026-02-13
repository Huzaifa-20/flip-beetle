import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Flip Beetle",
  description: "Our commitment to protecting your privacy and data.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
