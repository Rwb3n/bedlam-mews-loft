'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useNavigationAnimation } from '@/app/hooks/useNavigationAnimation';
// import { useScrollZone } from '../hooks/useScrollZone'; // Disabled for development

interface DesktopNavigationProps {
  floatingActionsRef?: React.RefObject<HTMLDivElement | null>;
}

export default function DesktopNavigation({ floatingActionsRef }: DesktopNavigationProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  
  // Navigation animation hooks for title and nav items
  const titleAnimationRef = useNavigationAnimation<HTMLHeadingElement>();
  const nav1AnimationRef = useNavigationAnimation<HTMLButtonElement>();
  const nav2AnimationRef = useNavigationAnimation<HTMLButtonElement>();
  
  // Callback refs to combine existing functionality with animation
  const setTitleRefs = useCallback((node: HTMLHeadingElement | null) => {
    titleRef.current = node;
    titleAnimationRef.current = node;
  }, []);
  
  const setNav1Refs = useCallback((node: HTMLButtonElement | null) => {
    nav1AnimationRef.current = node;
  }, []);
  
  const setNav2Refs = useCallback((node: HTMLButtonElement | null) => {
    nav2AnimationRef.current = node;
  }, []);
  // const isContentZone = useScrollZone(); // Disabled for development

  const sections = [
    { id: 'details', name: 'Space Details' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'location', name: 'Location' },
    { id: 'host', name: 'Host' }
  ];

  // ACT 3 Animation Configuration
  const navAnimationConfig = {
    foundation: { delay: 0, duration: 300 },
    items: [
      { delay: 400, duration: 600 }, // Nav Item 1
      { delay: 600, duration: 600 }, // Nav Item 2  
      { delay: 800, duration: 600 }, // Nav Item 3
      { delay: 1000, duration: 600 }, // Nav Item 4
      { delay: 1200, duration: 600 } // FloatingActions (5th item)
    ]
  };

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

  // Initial setup - set sidebar to hidden state immediately  
  useEffect(() => {
    if (navRef.current && titleRef.current && navItemsRef.current) {
      gsap.set(navRef.current, { opacity: 0, visibility: 'hidden' });
      gsap.set(titleRef.current, { 
        opacity: 0, 
        x: 30,
        scale: 0.9 
      });
      
      const navItems = navItemsRef.current.querySelectorAll('button');
      
      // Set initial hidden state for all nav items (ACT 3 pattern)
      gsap.set(Array.from(navItems), {
        filter: 'blur(8px)',
        x: 30,
        opacity: 0
      });
    }
  }, []);

  useEffect(() => {
    // DISABLED: Scroll-controlled bi-directional sidebar animation
    const handleSidebarAnimation = () => {
      const scrollY = window.scrollY;
      
      // Animation trigger: starts at 400px, completes at 600px
      const startScroll = 400;  // Hero H1 exit point
      const endScroll = 600;    // Full reveal point
      
      if (scrollY < startScroll) {
        // Before trigger: sidebar hidden
        updateSidebarState(0);
      } else {
        // After trigger: sidebar fully revealed (static)
        updateSidebarState(1);
      }
    };

    // Single animation function for nav items and floating actions
    const animateItem = (element: HTMLElement, itemIndex: number) => {
      const config = navAnimationConfig.items[itemIndex];
      
      setTimeout(() => {
        gsap.to(element, {
          filter: 'blur(0px)',
          x: 0,
          opacity: 1,
          duration: config.duration / 1000, // Convert to seconds
          ease: 'power2.out'
        });
      }, config.delay);
    };

    // Update sidebar elements with config-driven animation system
    const updateSidebarState = (progress: number) => {
      if (!navRef.current || !titleRef.current || !navItemsRef.current) return;
      
      const navItems = navItemsRef.current.querySelectorAll('button');
      
      // Reset state when hiding
      if (progress === 0) {
        // Kill any running animations and reset immediately
        gsap.killTweensOf(navRef.current);
        gsap.killTweensOf(Array.from(navItems));
        if (floatingActionsRef?.current) {
          gsap.killTweensOf(floatingActionsRef.current);
        }
        gsap.set(navRef.current, {
          opacity: 0,
          visibility: 'hidden'
        });
        // Reset all nav items to hidden state
        gsap.set(Array.from(navItems), {
          filter: 'blur(8px)',
          x: 30,
          opacity: 0
        });
        // Reset floating actions to hidden state
        if (floatingActionsRef?.current) {
          gsap.set(floatingActionsRef.current, {
            filter: 'blur(8px)',
            x: 30,
            opacity: 0
          });
        }
      } else {
        // ACT 3: Container fade-in (foundation layer)
        gsap.to(navRef.current, {
          opacity: 1,
          visibility: 'visible',
          duration: navAnimationConfig.foundation.duration / 1000,
          ease: 'power2.out',
          onComplete: () => {
            // Set title to visible state immediately after container fades in
            gsap.set(titleRef.current, {
              opacity: 1,
              x: 0,
              scale: 1
            });
            
            // Animate each nav item with staggered timing
            Array.from(navItems).forEach((item, index) => {
              animateItem(item as HTMLButtonElement, index);
            });
            
            // Animate floating actions as 5th item
            if (floatingActionsRef?.current) {
              animateItem(floatingActionsRef.current, 4); // Index 4 = 5th item
            }
          }
        });
      }
    };

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

    // Listen to regular scroll events
    window.addEventListener('scroll', handleSidebarAnimation, { passive: true });
    window.addEventListener('scroll', handleActiveSection, { passive: true });
    
    // Set initial states
    handleSidebarAnimation();
    handleActiveSection();
    
    return () => {
      gsap.killTweensOf(navRef.current);
      if (navItemsRef.current) {
        const navItems = navItemsRef.current.querySelectorAll('button');
        gsap.killTweensOf(Array.from(navItems));
      }
      if (floatingActionsRef?.current) {
        gsap.killTweensOf(floatingActionsRef.current);
      }
      window.removeEventListener('scroll', handleSidebarAnimation);
      window.removeEventListener('scroll', handleActiveSection);
    };
  }, []);

  return (
    <nav 
      ref={navRef}
      style={{ willChange: 'opacity, visibility' }}
    >
      {/* Sidebar Title */}
      <div className="mb-6 text-center">
        <h1 
          ref={setTitleRefs}
          className="text-3xl font-serif text-foreground cursor-pointer hover:opacity-80"
          onClick={scrollToHero}
        >
          Bedlam Mews Loft
        </h1>
      </div>
      
      {/* Navigation Buttons */}
      <div 
        ref={navItemsRef}
        className="space-y-4 w-full"
      >
        {sections.map((section, index) => (
          <button
            key={section.id}
            ref={index === 0 ? setNav1Refs : index === 1 ? setNav2Refs : undefined}
            onClick={() => scrollToSection(section.id)}
            className={`w-full justify-center text-center px-6 py-4 text-xl rounded-sm transition-colors ${
              activeSection === section.id 
                ? "bg-neutral text-foreground font-medium" 
                : "hover:bg-muted"
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>
    </nav>
  );
}