# Scroll-Based Theme Transition System

This project now features a smooth scroll-based theme transition system inspired by [juice.agency](https://www.juice.agency/). As users scroll through the website, the background color and text colors smoothly transition to maintain proper contrast and create an engaging user experience.

## How It Works

The system consists of several interconnected components that work together:

### 1. **Theme Context** ([ThemeContext.tsx](src/contexts/ThemeContext.tsx))
- Manages the global theme state
- Supports four theme types: `green`, `cream`, `black`, and `dark-cream`
- Provides `currentTheme` and `setCurrentTheme` to all components

### 2. **Scroll Theme Controller** ([ScrollThemeController.tsx](src/components/ScrollThemeController.tsx))
- Uses IntersectionObserver to detect which section is currently in view
- Tracks all sections with a `data-theme` attribute
- Automatically updates the global theme based on scroll position
- Works bidirectionally (scrolling up and down)

### 3. **Theme Transition** ([ThemeTransition.tsx](src/components/ThemeTransition.tsx))
- Creates smooth animated transitions between theme colors
- Updates both background and text colors
- Uses Framer Motion for fluid animations
- Ensures text always has proper contrast with the background

### 4. **CSS Variables** ([globals.css](src/app/globals.css))
- Defines theme colors and text colors for each theme
- Makes it easy to customize the color palette

## Usage

### Adding a Theme to a Section

Simply add a `data-theme` attribute to any section element:

```tsx
<section data-theme="green" className="...">
  {/* Your content */}
</section>
```

### Available Themes

- **`green`**: Dark green background (#606c38) with cream text (#fefae0)
- **`cream`**: Light cream background (#fefae0) with black text (#1a1a1a)
- **`black`**: Dark black background (#1a1a1a) with cream text (#fefae0)
- **`dark-cream`**: Medium cream background (#e8dcc4) with black text (#1a1a1a)

### Current Section Themes

Here's how the themes are currently applied across the website:

1. **HeroSectionAlt**: `green` - Bold opening with green background
2. **HeroSection**: `cream` - Light, welcoming section
3. **AboutSection**: `black` - Dramatic contrast for emphasis
4. **ClientsSection**: `dark-cream` - Subtle variation
5. **ServicesSection**: `cream` - Clean and professional
6. **ContactSection**: `black` - Strong call-to-action finish

## Customization

### Adding New Themes

1. **Update CSS variables** in [globals.css](src/app/globals.css):
```css
--color-theme-new-color: #hex-code;
--color-text-on-new-color: #hex-code;
```

2. **Update ThemeType** in [ThemeContext.tsx](src/contexts/ThemeContext.tsx):
```tsx
export type ThemeType = "green" | "cream" | "black" | "dark-cream" | "new-color";
```

3. **Add to color mappings** in [ThemeTransition.tsx](src/components/ThemeTransition.tsx):
```tsx
const themeColors: Record<ThemeType, string> = {
  // ... existing themes
  "new-color": "#hex-code",
};

const themeTextColors: Record<ThemeType, string> = {
  // ... existing themes
  "new-color": "#hex-code",
};
```

### Adjusting Transition Speed

In [ThemeTransition.tsx](src/components/ThemeTransition.tsx), modify the `transition` object:

```tsx
transition={{
  duration: 0.8, // Change this value (in seconds)
  ease: [0.43, 0.13, 0.23, 0.96],
}}
```

### Adjusting Scroll Detection Sensitivity

In [ScrollThemeController.tsx](src/components/ScrollThemeController.tsx), modify the IntersectionObserver options:

```tsx
{
  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
  rootMargin: "-10% 0px -10% 0px", // Adjust these values
}
```

- **threshold**: More values = more granular detection
- **rootMargin**: Negative values trigger the transition before/after the section fully enters the viewport

## Technical Details

### Performance Optimizations

- Uses IntersectionObserver API for efficient scroll detection
- Framer Motion handles animations with GPU acceleration
- Only observes sections with `data-theme` attribute
- Cleans up observers on component unmount

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IntersectionObserver is widely supported
- Graceful degradation in older browsers (no theme transitions)

## Troubleshooting

### Theme not changing on scroll
- Check that sections have the `data-theme` attribute
- Verify ScrollThemeController is included in layout
- Ensure sections are tall enough to trigger intersection

### Jerky transitions
- Increase the transition duration
- Add more threshold values in ScrollThemeController
- Check for conflicting CSS transitions

### Text not visible on certain backgrounds
- Review text color mappings in ThemeTransition.tsx
- Ensure proper contrast ratios for accessibility

## Credits

Inspired by the beautiful scroll transitions on [juice.agency](https://www.juice.agency/)
