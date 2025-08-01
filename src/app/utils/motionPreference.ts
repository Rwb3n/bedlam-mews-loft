/**
 * Motion Preference Utility
 * Centralizes accessibility compliance for all interaction animations
 */

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  // Server-side rendering check
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

// Wrapper function that respects motion preferences
export const respectMotionPreference = (animationFunction: () => void): void => {
  if (!prefersReducedMotion()) {
    animationFunction();
  }
};

// Listen for changes in motion preference
export const onMotionPreferenceChange = (callback: (prefersReduced: boolean) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
};

// Animation-safe wrapper for GSAP animations
export const createAccessibleAnimation = (animationConfig: {
  element: HTMLElement;
  animation: () => void;
  fallback?: () => void;
}): void => {
  const { animation, fallback } = animationConfig;
  
  if (prefersReducedMotion()) {
    // Apply fallback state instead of animation
    if (fallback) {
      fallback();
    }
  } else {
    // Run the animation
    animation();
  }
};