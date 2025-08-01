'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { respectMotionPreference } from '@/app/utils/motionPreference';

/**
 * Custom hook for Secondary element press feedback animation
 * Implements: Single press-down feedback only (0.15s total)
 * For badges, carousel controls, and other secondary interactive elements
 */
export const useSecondaryElementAnimation = <T extends HTMLElement = HTMLElement>() => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let handleMouseDown: ((e: Event) => void) | undefined;
    let handleMouseUp: ((e: Event) => void) | undefined;
    let handleMouseLeave: ((e: Event) => void) | undefined;

    // Apply animation with motion preference respect
    respectMotionPreference(() => {
      // Mouse down - press down
      handleMouseDown = () => {
        gsap.to(element, { 
          y: 3, 
          duration: 0.15, 
          ease: "power2.out" 
        });
      };

      // Mouse up - snap back
      handleMouseUp = () => {
        gsap.to(element, { 
          y: 0, 
          duration: 0.15, 
          ease: "power2.out" 
        });
      };

      // Mouse leave - ensure reset
      handleMouseLeave = () => {
        gsap.to(element, { 
          y: 0, 
          duration: 0.15, 
          ease: "power2.out" 
        });
      };

      // Add event listeners
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup on unmount
    return () => {
      if (handleMouseDown && element) {
        element.removeEventListener('mousedown', handleMouseDown);
      }
      if (handleMouseUp && element) {
        element.removeEventListener('mouseup', handleMouseUp);
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