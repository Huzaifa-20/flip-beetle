"use client";

import React, { createContext, useContext, useState } from "react";

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
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("cream");
  const [isAlternateTheme, setIsAlternateTheme] = useState(false);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        isAlternateTheme,
        setIsAlternateTheme,
      }}
    >
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
