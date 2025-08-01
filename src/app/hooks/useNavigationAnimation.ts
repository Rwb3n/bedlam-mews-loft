'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { respectMotionPreference } from '@/app/utils/motionPreference';

/**
 * Custom hook for Navigation element color transition animation
 * Implements: Smooth color transitions on hover (0.2s total)
 * For footer links, sidebar navigation, and mobile nav items
 */
export const useNavigationAnimation = <T extends HTMLElement = HTMLElement>() => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let handleMouseEnter: ((e: Event) => void) | undefined;
    let handleMouseLeave: ((e: Event) => void) | undefined;

    // Apply animation with motion preference respect
    respectMotionPreference(() => {
      // Mouse enter - transition to primary color
      handleMouseEnter = () => {
        gsap.to(element, { 
          color: "var(--primary)", 
          duration: 0.2, 
          ease: "power1.out" 
        });
      };

      // Mouse leave - transition back to foreground color
      handleMouseLeave = () => {
        gsap.to(element, { 
          color: "var(--foreground)", 
          duration: 0.2, 
          ease: "power1.out" 
        });
      };

      // Add event listeners
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup on unmount
    return () => {
      if (handleMouseEnter && element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
      }
      if (handleMouseLeave && element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (element) {
        gsap.killTweensOf(element);
      }
    };
    
  }, []);

  return elementRef;
};