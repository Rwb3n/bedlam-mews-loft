'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animationType?: 'layered-emergence' | 'elegant-fade' | 'chunked-blur' | 'none';
  trigger?: 'hero-exit' | 'intersection';
  threshold?: number;
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  id,
  animationType = 'none',
  trigger = 'intersection',
  threshold = 0.25
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isAnimatedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || animationType === 'none') return;

    const sectionElement = sectionRef.current;

    if (false && animationType === 'layered-emergence' && trigger === 'hero-exit') { // DISABLED for hero testing
      // Continuous scroll-based parallax for first ContentZone section
      // Coordinated with hero shrinking animation (0px→600px scroll range)
      
      // Set initial performance hints
      gsap.set(sectionElement, {
        willChange: 'transform, opacity'
      });
      
      const handleParallaxScroll = () => {
        const scrollY = window.scrollY;
        const maxScroll = 600; // Match hero shrinking range
        const progress = Math.min(scrollY / maxScroll, 1); // 0-1 progress
        
        // Parallax movement specs from animation plan:
        // OPTION 1: Section starts closer to normal, creates hero overlap
        // scrollY: 0px    → opacity: 0.7, translateY: 0px,   translateZ: -30px, scale: 0.96
        // scrollY: 200px  → opacity: 0.85, translateY: -16px, translateZ: -15px, scale: 0.98
        // scrollY: 400px  → opacity: 1.0,  translateY: -32px, translateZ: 0px,   scale: 1.0
        // scrollY: 600px  → opacity: 1.0,  translateY: -40px, translateZ: 10px,  scale: 1.02
        
        const opacity = 0.7 + (progress * 0.3);     // 0.7 → 1.0
        const translateY = 0 - (progress * 40);      // 0px → -40px  
        const translateZ = -30 + (progress * 40);    // -30px → 10px
        const scale = 0.96 + (progress * 0.06);      // 0.96 → 1.02
        
        // Apply continuous parallax transformation
        gsap.set(sectionElement, {
          opacity: opacity,
          y: translateY,
          z: translateZ,
          scale: scale,
          transformOrigin: 'center center',
          force3D: true // Hardware acceleration
        });
      };

      window.addEventListener('scroll', handleParallaxScroll, { passive: true });
      handleParallaxScroll(); // Set initial state

      return () => {
        window.removeEventListener('scroll', handleParallaxScroll);
        gsap.set(sectionElement, { clearProps: 'willChange' });
      };
    }

    if (false && animationType === 'elegant-fade' && trigger === 'intersection') { // DISABLED for hero testing
      // Elegant fade for Section 2 (Amenities)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isAnimatedRef.current) {
              isAnimatedRef.current = true;
              
              gsap.set(sectionElement, {
                opacity: 0,
                y: 15,
                filter: 'blur(2px)',
                willChange: 'transform, opacity, filter'
              });
              
              gsap.to(sectionElement, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.6,
                ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                onComplete: () => {
                  gsap.set(sectionElement, { clearProps: 'willChange' });
                }
              });
            }
          });
        },
        { threshold }
      );

      observer.observe(sectionElement);

      return () => {
        observer.disconnect();
      };
    }

    // More animation types can be added here for chunked-blur, etc.

  }, [animationType, trigger, threshold]);

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