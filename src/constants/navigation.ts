/**
 * Navigation Constants
 * Centralized configuration for menu items and social links
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink extends NavItem {
  icon?: string; // Optional icon name for future icon support
}

export const MENU_ITEMS: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LINKEDIN", href: "https://linkedin.com" },
  { label: "INSTAGRAM", href: "https://instagram.com" },
];
