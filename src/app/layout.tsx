import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavbarAlt from "@/components/NavbarAlt";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SplashAnimationProvider } from "@/contexts/SplashAnimationContext";
import ThemeTransition from "@/components/ThemeTransition";
import ScrollThemeController from "@/components/ScrollThemeController";
import Footer from "@/components/Footer";

const riposte = localFont({
  src: "../../public/fonts/RiposteLight.ttf",
  variable: "--riposte",
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
      <body className={`${riposte.variable} ${interTight.variable} antialiased`}>
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
