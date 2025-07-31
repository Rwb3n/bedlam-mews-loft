'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Simple, unified animation configuration
const FADE_UP_ANIMATION = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  duration: 0.3,
  ease: "power2.out"
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animationType?: 'fadeUp' | 'none';
  threshold?: number;
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  id,
  animationType = 'fadeUp',
  threshold = 0.25
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || animationType === 'none') return;

    const sectionElement = sectionRef.current;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // For users who prefer reduced motion, just ensure content is visible
      gsap.set(sectionElement, { opacity: 1, y: 0 });
      return;
    }

    if (animationType === 'fadeUp') {
      // Set initial state
      gsap.set(sectionElement, {
        ...FADE_UP_ANIMATION.initial,
        willChange: 'transform, opacity'
      });

      // Create ScrollTrigger for intersection-based animation
      ScrollTrigger.create({
        trigger: sectionElement,
        start: `top ${Math.round((1 - threshold) * 100)}%`, // Convert threshold to start position
        once: true, // Only trigger once, never re-trigger
        onEnter: () => {
          gsap.to(sectionElement, {
            ...FADE_UP_ANIMATION.animate,
            duration: FADE_UP_ANIMATION.duration,
            ease: FADE_UP_ANIMATION.ease,
            force3D: true, // GPU acceleration
            onComplete: () => {
              // Remove performance hints after animation completes
              gsap.set(sectionElement, { clearProps: 'willChange' });
            }
          });
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionElement) {
          trigger.kill();
        }
      });
    };

  }, [animationType, threshold]);

  return (
    <section 
      ref={sectionRef}
      className={className}
      id={id}
    >
      {children}
    </section>
  );
}