/**
 * Centralized blog utility functions
 * Single source of truth for blog-related logic
 */

export type BlogCategory = 'design' | 'development' | 'accessibility' | 'branding' | 'trends';

/**
 * Get the primary tag from a post's tags array
 */
export function getPrimaryTag(tags: string[]): string {
  return tags[0] || 'General';
}

/**
 * Get the category color based on tag or slug
 */
export function getCategoryColor(category: string): string {
  const lowerCategory = category.toLowerCase();

  if (lowerCategory.includes('design')) return 'var(--color-accent)';
  if (lowerCategory.includes('develop')) return 'var(--color-theme-green)';
  if (lowerCategory.includes('access')) return 'var(--color-theme-black)';
  if (lowerCategory.includes('brand')) return 'var(--color-primary)';
  if (lowerCategory.includes('trend')) return 'var(--color-accent-secondary)';

  return 'var(--color-primary)';
}

/**
 * Get the tag color based on the tag name
 */
export function getTagColor(tag: string): string {
  const lowerTag = tag.toLowerCase();

  if (lowerTag.includes('design')) return '#10b981';
  if (lowerTag.includes('development')) return '#3b82f6';
  if (lowerTag.includes('ui') || lowerTag.includes('ux')) return '#8b5cf6';
  if (lowerTag.includes('accessibility')) return '#f59e0b';
  if (lowerTag.includes('branding')) return '#ec4899';
  if (lowerTag.includes('typography')) return '#6366f1';
  if (lowerTag.includes('color')) return '#14b8a6';
  if (lowerTag.includes('responsive')) return '#06b6d4';
  if (lowerTag.includes('animation')) return '#f97316';
  if (lowerTag.includes('performance')) return '#eab308';
  if (lowerTag.includes('seo')) return '#84cc16';
  if (lowerTag.includes('minimalist')) return '#64748b';

  return '#6b7280';
}

/**
 * Get the post category based on tags
 */
export function getPostCategory(tags: string[]): BlogCategory {
  const lowerTags = tags.map(t => t.toLowerCase()).join(' ');

  if (lowerTags.includes('design') || lowerTags.includes('ui') || lowerTags.includes('ux')) {
    return 'design';
  }
  if (lowerTags.includes('development') || lowerTags.includes('code') || lowerTags.includes('responsive')) {
    return 'development';
  }
  if (lowerTags.includes('accessibility') || lowerTags.includes('a11y')) {
    return 'accessibility';
  }
  if (lowerTags.includes('brand') || lowerTags.includes('typography') || lowerTags.includes('color')) {
    return 'branding';
  }
  if (lowerTags.includes('trend') || lowerTags.includes('2026') || lowerTags.includes('modern')) {
    return 'trends';
  }

  return 'design';
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate reading time based on content length
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
