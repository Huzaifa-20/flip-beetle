"use client";

import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
  isAlternateTheme: boolean;
  setIsAlternateTheme: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isAlternateTheme, setIsAlternateTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ isAlternateTheme, setIsAlternateTheme }}>
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
