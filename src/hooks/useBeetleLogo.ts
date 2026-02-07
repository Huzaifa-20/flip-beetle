import { useTheme } from "@/contexts/ThemeContext";

/**
 * Custom hook to get the appropriate beetle logo based on the current theme
 * @returns The path to the beetle image
 * - Returns Anxious_Beetle_Dark.png for cream/dark-cream backgrounds
 * - Returns Anxious_Beetle_Light.png for green/black backgrounds
 */
export const useBeetleLogo = (): string => {
  const { currentTheme } = useTheme();

  // Cream background -> use dark beetle
  // Green/Black background -> use light beetle
  return currentTheme === "cream" || currentTheme === "dark-cream"
    ? "/images/Anxious_Beetle_Dark.png"
    : "/images/Anxious_Beetle_Light.png";
};
