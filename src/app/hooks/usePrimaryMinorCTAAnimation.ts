'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { respectMotionPreference } from '@/app/utils/motionPreference';

/**
 * Custom hook for Primary-Minor CTA 2-phase interaction animation
 * Implements: Press + Quick Bounce sequence (0.25s total)
 * For Contact/Directions buttons - faster than PRIMARY CTAs
 */
export const usePrimaryMinorCTAAnimation = <T extends HTMLElement = HTMLElement>() => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Two-phase animation configuration
    const createInteractionTimeline = () => {
      const tl = gsap.timeline({ paused: true });
      
      // Phase 1: Press (0.15s) - Sharp press-down
      tl.to(element, { 
        y: 2, 
        duration: 0.15, 
        ease: "power2.out" 
      })
      // Phase 2: Bounce (0.1s) - Quick settle bounce
      .to(element, { 
        y: 0, 
        duration: 0.1, 
        ease: "back.out(1.2)" 
      });
      
      return tl;
    };

    let interactionTimeline: gsap.core.Timeline | undefined;
    let handleClick: ((e: Event) => void) | undefined;

    // Apply animation with motion preference respect
    respectMotionPreference(() => {
      interactionTimeline = createInteractionTimeline();

      // Click handler - trigger 2-phase sequence
      handleClick = () => {
        if (interactionTimeline) {
          interactionTimeline.restart();
        }
      };

      // Add event listener
      element.addEventListener('click', handleClick);
    });

    // Cleanup on unmount
    return () => {
      if (handleClick && element) {
        element.removeEventListener('click', handleClick);
      }
      if (interactionTimeline) {
        interactionTimeline.kill();
      }
      if (element) {
        gsap.killTweensOf(element);
      }
    };
    
  }, []);

  return elementRef;
};