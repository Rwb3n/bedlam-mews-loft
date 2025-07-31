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
      gsap.set(Array.from(navItems), { 
        opacity: 0, 
        x: 20,
        scale: 0.95 
      });
    }
  }, []);

  useEffect(() => {
    // Scroll-controlled bi-directional sidebar animation
    const handleSidebarAnimation = () => {
      const scrollY = window.scrollY;
      
      // Animation trigger: starts at 400px, completes at 600px
      const startScroll = 400;  // Hero H1 exit point
      const endScroll = 600;    // Full reveal point
      const scrollRange = endScroll - startScroll;
      
      if (scrollY < startScroll) {
        // Before trigger: sidebar hidden
        updateSidebarState(0);
      } else if (scrollY >= endScroll) {
        // After trigger: sidebar fully revealed
        updateSidebarState(1);
      } else {
        // During trigger: progressive reveal based on scroll position
        const rawProgress = (scrollY - startScroll) / scrollRange; // 0-1
        const progress = gsap.parseEase("power2.out")(rawProgress); // Smooth easing
        updateSidebarState(progress);
      }
    };

    // Update sidebar elements based on progress (0-1)
    const updateSidebarState = (progress: number) => {
      if (!navRef.current || !titleRef.current || !navItemsRef.current) return;
      
      const navItems = navItemsRef.current.querySelectorAll('button');
      
      // Container fade + slide from right (0-0.2 progress range)
      const containerOpacity = Math.min(progress / 0.2, 1);
      const containerX = (1 - containerOpacity) * 100; // 100px to 0px (right to left)
      
      gsap.set(navRef.current, {
        opacity: containerOpacity,
        visibility: containerOpacity > 0 ? 'visible' : 'hidden',
        x: containerX
      });
      
      // Title bounce in from right (0.2-0.5 progress range)
      const titleProgress = Math.max(0, Math.min((progress - 0.2) / 0.3, 1));
      const titleX = (1 - titleProgress) * 30; // 30px to 0px (right to left)
      const titleScale = 0.9 + (titleProgress * 0.1); // 0.9 to 1.0 (subtle bounce)
      gsap.set(titleRef.current, {
        opacity: titleProgress,
        x: titleX,
        scale: titleScale
      });
      
      // Nav items sequential bounce from right (0.5-1.0 progress range)
      const itemsProgress = Math.max(0, (progress - 0.5) / 0.5);
      navItems.forEach((item, index) => {
        const itemDelay = index * 0.2; // Stagger delay per item
        const itemProgress = Math.max(0, Math.min(itemsProgress - itemDelay, 1));
        
        const itemX = (1 - itemProgress) * 20; // 20px to 0px (right to left)
        const itemScale = 0.95 + (itemProgress * 0.05); // 0.95 to 1.0 (subtle bounce)
        gsap.set(item, {
          opacity: itemProgress,
          x: itemX,
          scale: itemScale
        });
      });
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