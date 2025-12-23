import type { Metadata } from "next";
import { Bangers, Oxygen } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const oxygen = Oxygen({
  variable: "--font-oxygen",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flip Beetle",
  description: "Get a digital presence, flip right side up",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bangers.variable} ${oxygen.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
