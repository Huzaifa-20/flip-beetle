"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

interface SplashAnimationContextType {
  isSplashComplete: boolean;
  setIsSplashComplete: (value: boolean) => void;
}

const SplashAnimationContext = createContext<
  SplashAnimationContextType | undefined
>(undefined);

export function SplashAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isSplashComplete,
      setIsSplashComplete,
    }),
    [isSplashComplete]
  );

  return (
    <SplashAnimationContext.Provider value={value}>
      {children}
    </SplashAnimationContext.Provider>
  );
}

export function useSplashAnimation() {
  const context = useContext(SplashAnimationContext);
  if (context === undefined) {
    throw new Error(
      "useSplashAnimation must be used within a SplashAnimationProvider"
    );
  }
  return context;
}
