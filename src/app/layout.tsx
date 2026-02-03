import type { Metadata } from "next";
import { Josefin_Sans, Inter_Tight } from "next/font/google";
import "./globals.css";
import NavbarAlt from "@/components/NavbarAlt";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SplashAnimationProvider } from "@/contexts/SplashAnimationContext";
import ThemeTransition from "@/components/ThemeTransition";
import ScrollThemeController from "@/components/ScrollThemeController";
import Footer from "@/components/Footer";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
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
      <body className={`${josefinSans.variable} ${interTight.variable} antialiased`}>
        <ThemeProvider>
          <SplashAnimationProvider>
            <ThemeTransition />
            <ScrollThemeController />
            <NavbarAlt />
            {children}
            <Footer />
          </SplashAnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
