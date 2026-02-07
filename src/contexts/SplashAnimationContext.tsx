"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  // Reset splash animation when navigating to homepage
  useEffect(() => {
    if (pathname === "/") {
      setIsSplashComplete(false);
    }
  }, [pathname]);

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
