'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// import { useScrollZone } from '../hooks/useScrollZone'; // Disabled for development

export default function DesktopNavigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  // const isContentZone = useScrollZone(); // Disabled for development

  const sections = [
    { id: 'details', name: 'Space Details' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'location', name: 'Location' },
    { id: 'host', name: 'Host' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const sectionPadding = 16; // Reduced offset for better desktop positioning
      const elementPosition = element.offsetTop + sectionPadding;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToHero = () => {
    const element = document.getElementById('hero');
    if (element) {
      const elementPosition = element.offsetTop;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // GATE 1: Temporarily disable all animations to test pure sticky
  useEffect(() => {
    // Commented out for Gate 1 testing
    // if (navRef.current && titleRef.current && navItemsRef.current) {
    //   gsap.set(navRef.current, { opacity: 0, visibility: 'hidden' });
    //   gsap.set(titleRef.current, { 
    //     opacity: 0, 
    //     y: 20,
    //     scale: 0.9 
    //   });
    //   
    //   const navItems = navItemsRef.current.querySelectorAll('button');
    //   gsap.set(Array.from(navItems), { 
    //     opacity: 0, 
    //     y: 15,
    //     scale: 0.95 
    //   });
    // }
  }, []);

  useEffect(() => {
    // GATE 1: Disable animation logic to test pure sticky
    // const handleSidebarAnimation = (event?: Event) => {
    //   // Get smooth scroll position from ScrollSmoother or fallback
    //   const customEvent = event as CustomEvent;
    //   const scrollY = customEvent?.detail?.scrollTop ?? window.scrollY;
    //   
    //   // Animation trigger: starts at 400px, completes at 600px
    //   const startScroll = 400;  // Hero H1 exit point
    //   const endScroll = 600;    // Full reveal point
    //   const scrollRange = endScroll - startScroll;
    //   
    //   if (scrollY < startScroll) {
    //     // Before trigger: sidebar hidden
    //     updateSidebarState(0);
    //   } else if (scrollY >= endScroll) {
    //     // After trigger: sidebar fully revealed
    //     updateSidebarState(1);
    //   } else {
    //     // During trigger: progressive reveal based on scroll position
    //     const rawProgress = (scrollY - startScroll) / scrollRange; // 0-1
    //     const progress = gsap.parseEase("power2.out")(rawProgress); // Smooth easing
    //     updateSidebarState(progress);
    //   }
    // };

    // GATE 1: Disable animation state updates
    // const updateSidebarState = (progress: number) => {
    //   // Animation logic disabled for Gate 1 testing
    // };

    // Active section tracking (separate from animation)
    const handleActiveSection = () => {
      const sections = ['details', 'amenities', 'location', 'host'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider section active if it's in the top half of viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // GATE 1: Only keep active section tracking, disable animations
    // window.addEventListener('smoothScroll', handleSidebarAnimation, { passive: true });
    // window.addEventListener('scroll', handleSidebarAnimation, { passive: true });
    window.addEventListener('scroll', handleActiveSection, { passive: true });
    
    // Set initial states
    // handleSidebarAnimation();
    handleActiveSection();
    
    return () => {
      // window.removeEventListener('smoothScroll', handleSidebarAnimation);
      // window.removeEventListener('scroll', handleSidebarAnimation);
      window.removeEventListener('scroll', handleActiveSection);
    };
  }, []);

  return (
    <nav 
      ref={navRef}
      className="sticky top-8"
      style={{ willChange: 'opacity, visibility' }}
    >
      {/* Sidebar Title */}
      <div className="mb-6 text-center">
        <h1 
          ref={titleRef}
          className="text-3xl font-serif text-foreground cursor-pointer hover:opacity-80 transition-opacity"
          onClick={scrollToHero}
          style={{ willChange: 'transform, opacity' }}
        >
          Bedlam Mews Loft
        </h1>
      </div>
      
      {/* Navigation Buttons */}
      <div 
        ref={navItemsRef}
        className="space-y-4 w-full"
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full justify-center text-center px-6 py-4 text-xl rounded-sm transition-colors ${
              activeSection === section.id 
                ? "bg-primary/10 text-primary font-medium" 
                : "hover:bg-primary/5"
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            {section.name}
          </button>
        ))}
      </div>
    </nav>
  );
}