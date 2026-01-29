import type { Metadata } from "next";
import { Bangers, Josefin_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import NavbarAlt from "@/components/NavbarAlt";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeTransition from "@/components/ThemeTransition";
import ScrollThemeController from "@/components/ScrollThemeController";
import Footer from "@/components/Footer";

const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
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
      <body className={`${bangers.variable} ${josefinSans.variable} antialiased`}>
        <ThemeProvider>
          <ThemeTransition />
          <ScrollThemeController />
          {/* <Navbar /> */}
          <NavbarAlt />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
