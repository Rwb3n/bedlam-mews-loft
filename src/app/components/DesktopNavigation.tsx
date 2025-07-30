'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// import { useScrollZone } from '../hooks/useScrollZone'; // Disabled for development

export default function DesktopNavigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isRevealed, setIsRevealed] = useState(false);
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
      gsap.set(titleRef.current, { opacity: 0, x: 30 });
      
      const navItems = navItemsRef.current.querySelectorAll('button');
      gsap.set(Array.from(navItems), { opacity: 0, x: 20 });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if hero H1 has exited viewport (400px scroll trigger)
      const heroH1 = document.querySelector('#hero h1, #hero .title-container');
      const shouldReveal = heroH1 && heroH1.getBoundingClientRect().top <= 0;
      
      // Progressive reveal animation (DISABLED for hero testing)
      if (false && shouldReveal && !isRevealed && navRef.current && titleRef.current && navItemsRef.current) {
        setIsRevealed(true);
        
        // Get all navigation items
        const navItems = navItemsRef.current?.querySelectorAll('button');
        
        if (navItems) {
          // Progressive reveal timeline
          const revealTimeline = gsap.timeline();
          
          // 0.0s → Sidebar container fades in (300ms)
          revealTimeline.to(navRef.current, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // 0.1s → "Bedlam Mews Loft" title slides from right (500ms)
          revealTimeline.to(titleRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }, 0.1);
          
          // 0.4s → Navigation items stagger in (300ms each, 100ms stagger)
          revealTimeline.to(Array.from(navItems!), {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }, 0.4);
        }
      }
      
      // Update active section
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial active section
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isRevealed]);

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