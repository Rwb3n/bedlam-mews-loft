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

    if (animationType === 'layered-emergence' && trigger === 'hero-exit') {
      // Layered emergence animation for first ContentZone section
      const handleScroll = () => {
        // Check if hero H1 has exited viewport (same trigger as sidebar)
        const heroH1 = document.querySelector('#hero h1, #hero .title-container');
        const shouldAnimate = heroH1 && heroH1.getBoundingClientRect().top <= 0;
        
        if (shouldAnimate && !isAnimatedRef.current) {
          isAnimatedRef.current = true;
          
          // Initial state - below/behind
          gsap.set(sectionElement, {
            opacity: 0.7,
            y: 80,
            z: -30,
            scale: 0.96,
            willChange: 'transform, opacity'
          });
          
          // Layered emergence animation (1200ms total)
          gsap.to(sectionElement, {
            opacity: 1.0,
            y: 0,
            z: 0,
            scale: 1.0,
            duration: 1.2,
            ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
            onComplete: () => {
              gsap.set(sectionElement, { clearProps: 'willChange' });
            }
          });
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Check initial state

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    if (animationType === 'elegant-fade' && trigger === 'intersection') {
      // Elegant fade for Section 2 (Amenities)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isAnimatedRef.current) {
              isAnimatedRef.current = true;
              
              gsap.set(sectionElement, {
                opacity: 0,
                y: 30,
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