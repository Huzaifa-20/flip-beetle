import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SplashAnimationProvider } from "@/contexts/SplashAnimationContext";
import ThemeTransition from "@/components/ThemeTransition";
import ScrollThemeController from "@/components/ScrollThemeController";
import Footer from "@/components/Footer";
import { LenisProvider } from "@/contexts/LenisContext";

const riposte = localFont({
  src: "./fonts/RiposteLight.ttf",
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
  metadataBase: new URL('https://flipbeetle.com'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  title: {
    default: "Flip Beetle | Creative Digital Agency",
    template: "%s | Flip Beetle"
  },
  description: "The creative agency that turns visions into unforgettable brands. We create powerful digital experiences to elevate your brand, starting with yours.",
  keywords: [
    "digital agency",
    "creative agency",
    "web design",
    "branding",
    "digital experiences",
    "brand strategy",
    "web development",
    "UI/UX design",
    "creative studio",
    "design agency"
  ],
  authors: [{ name: "Flip Beetle" }],
  creator: "Flip Beetle",
  publisher: "Flip Beetle",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Flip Beetle",
    title: "Flip Beetle | Creative Digital Agency",
    description: "The creative agency that turns visions into unforgettable brands. We create powerful digital experiences to elevate your brand.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flip Beetle - Creative Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flip Beetle | Creative Digital Agency",
    description: "The creative agency that turns visions into unforgettable brands. We create powerful digital experiences to elevate your brand.",
    images: ["/og-image.png"],
    creator: "@flipbeetle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification tokens here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: [
      // Light mode (dark beetle on light background)
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png', media: '(prefers-color-scheme: light)' },
      // Dark mode (light beetle on dark background)
      { url: '/icon-16x16-dark.png', sizes: '16x16', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon-32x32-dark.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon-192x192-dark.png', sizes: '192x192', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon-512x512-dark.png', sizes: '512x512', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
            <LenisProvider>
              <ThemeTransition />
              <ScrollThemeController />
              <Navbar />
              {children}
              <Footer />
            </LenisProvider>
          </SplashAnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
