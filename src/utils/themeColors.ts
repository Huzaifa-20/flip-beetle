/**
 * Centralized theme color mapping
 * Single source of truth for theme-based colors across the application
 */

export type ThemeType = 'cream' | 'green' | 'black';

export const THEME_BACKGROUND_COLORS: Record<ThemeType, string> = {
  cream: 'var(--color-theme-cream)',
  green: 'var(--color-theme-green)',
  black: 'var(--color-theme-black)',
};

export const THEME_TEXT_COLORS: Record<ThemeType, string> = {
  cream: 'var(--color-primary)',
  green: 'var(--color-background)',
  black: 'var(--color-background)',
};

// Sidebar colors - inverted from background for contrast
export const SIDEBAR_BACKGROUND_COLORS: Record<ThemeType, string> = {
  cream: 'var(--color-theme-green)',
  green: 'var(--color-theme-cream)',
  black: 'var(--color-theme-cream)',
};

export const SIDEBAR_TEXT_COLORS: Record<ThemeType, string> = {
  cream: 'var(--color-background)', // sidebar is green, needs light text
  green: 'var(--color-primary)', // sidebar is cream, needs dark text
  black: 'var(--color-primary)', // sidebar is cream, needs dark text
};

// Hamburger icon colors
export const HAMBURGER_COLORS: Record<ThemeType, string> = {
  cream: 'var(--color-primary)',
  green: 'var(--color-background)',
  black: 'var(--color-background)',
};

/**
 * Get theme colors for a given theme type
 */
export function getThemeColors(theme: ThemeType) {
  return {
    background: THEME_BACKGROUND_COLORS[theme],
    text: THEME_TEXT_COLORS[theme],
  };
}

/**
 * Get sidebar colors for a given theme type
 */
export function getSidebarColors(theme: ThemeType) {
  return {
    background: SIDEBAR_BACKGROUND_COLORS[theme],
    text: SIDEBAR_TEXT_COLORS[theme],
    hamburger: HAMBURGER_COLORS[theme],
  };
}
