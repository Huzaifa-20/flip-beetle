"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";

export type ThemeType = "green" | "cream" | "black" | "dark-cream";

interface ThemeContextType {
  currentTheme: ThemeType;
  setCurrentTheme: (theme: ThemeType) => void;
  // Deprecated: keeping for backwards compatibility
  isAlternateTheme: boolean;
  setIsAlternateTheme: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("green");
  const [isAlternateTheme, setIsAlternateTheme] = useState(false);
  const pathname = usePathname();

  // Reset theme to green when navigating to homepage
  useEffect(() => {
    if (pathname === "/") {
      setCurrentTheme("green");
      setIsAlternateTheme(false);
    }
  }, [pathname]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      currentTheme,
      setCurrentTheme,
      isAlternateTheme,
      setIsAlternateTheme,
    }),
    [currentTheme, isAlternateTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
