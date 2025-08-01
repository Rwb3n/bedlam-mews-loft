'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { respectMotionPreference } from '@/app/utils/motionPreference';

/**
 * Custom hook for PRIMARY CTA 3-phase interaction animation
 * Implements: Anticipation → Press → Follow-through sequence
 * Only for FloatingActions "Book Now" buttons
 */
export const usePrimaryCTAAnimation = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Three-phase animation configuration
    const createInteractionTimeline = () => {
      const tl = gsap.timeline({ paused: true });
      
      // Phase 1: Anticipation (0.1s) - Gentle prepare movement
      tl.to(button, { 
        y: 2, 
        duration: 0.1, 
        ease: "power2.out" 
      })
      // Phase 2: Press (0.15s) - Sharp, definitive action  
      .to(button, { 
        y: -1, 
        duration: 0.15, 
        ease: "power2.inOut" 
      })
      // Phase 3: Follow-through (0.2s) - Subtle bounce settle
      .to(button, { 
        y: 0, 
        duration: 0.2, 
        ease: "elastic.out(1, 0.5)" 
      });
      
      return tl;
    };

    // Create timeline instance
    let interactionTimeline: gsap.core.Timeline;

    // Apply animation with motion preference respect
    respectMotionPreference(() => {
      interactionTimeline = createInteractionTimeline();

      // Click handler - trigger full 3-phase sequence
      const handleClick = (e: Event) => {
        e.preventDefault(); // Prevent immediate navigation
        
        // Play the interaction timeline
        interactionTimeline.restart().then(() => {
          // Navigate after animation completes
          const href = button.getAttribute('href');
          if (href) {
            window.open(href, '_blank', 'noopener,noreferrer');
          }
        });
      };

      // Hover enhancement - gentle scale
      const handleMouseEnter = () => {
        gsap.to(button, { 
          scale: 1.02, 
          duration: 0.2, 
          ease: "power2.out" 
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, { 
          scale: 1, 
          duration: 0.2, 
          ease: "power2.out" 
        });
      };

      // Add event listeners
      button.addEventListener('click', handleClick);
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function
      return () => {
        button.removeEventListener('click', handleClick);
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
        if (interactionTimeline) {
          interactionTimeline.kill();
        }
        gsap.killTweensOf(button);
      };
    });

    // For reduced motion users, no special cleanup needed
    // since respectMotionPreference won't execute the animation function
    
  }, []);

  return buttonRef;
};