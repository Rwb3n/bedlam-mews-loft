'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { CircleHelp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavigationProps {
  onNavStateChange?: (isOpen: boolean) => void;
}

export default function MobileNavigation({ onNavStateChange }: MobileNavigationProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const iconRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'details', name: 'Space Details' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'location', name: 'Location' },
    { id: 'host', name: 'Host' }
  ];

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Removed problematic early GSAP setup - moved to just-in-time execution

  // Modal animation controller with just-in-time setup
  const animateModal = (opening: boolean) => {
    if (!modalRef.current || !contentRef.current || !navItemsRef.current) return;
    
    const navItems = navItemsRef.current.querySelectorAll('button');
    
    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf([modalRef.current, contentRef.current, navItems]);
    
    if (opening) {
      // Set initial states just-in-time (elements exist NOW)
      gsap.set(modalRef.current, {
        opacity: 0,
        visibility: 'visible'
      });
      gsap.set(contentRef.current, {
        opacity: 0,
        y: 50
      });
      gsap.set(navItems, {
        opacity: 0,
        y: 20
      });
      
      // Entrance animation sequence
      const timeline = gsap.timeline();
      
      // 1. Fade in overlay
      timeline.to(modalRef.current, {
                 opacity: 1,
                 duration: 0.3,
                 ease: 'power2.out'
               })
               // 2. Slide content up and fade in
               .to(contentRef.current, {
                 opacity: 1,
                 y: 0,
                 duration: 0.4,
                 ease: 'power2.out'
               }, '-=0.1') // Start slightly before overlay completes
               // 3. Staggered nav items entrance
               .to(navItems, {
                 opacity: 1,
                 y: 0,
                 duration: 0.3,
                 stagger: 0.1, // 100ms delay between each item
                 ease: 'power2.out'
               }, '-=0.2'); // Start before content completes
               
    } else {
      // Exit animation sequence (reverse order)
      const timeline = gsap.timeline();
      
      // 1. Staggered nav items exit (reverse stagger)
      timeline.to(navItems, {
                 opacity: 0,
                 y: -10,
                 duration: 0.2,
                 stagger: -0.05, // Reverse stagger (faster)
                 ease: 'power2.in'
               })
               // 2. Slide content down and fade out
               .to(contentRef.current, {
                 opacity: 0,
                 y: 30,
                 duration: 0.3,
                 ease: 'power2.in'
               }, '-=0.1')
               // 3. Fade out overlay and hide
               .to(modalRef.current, {
                 opacity: 0,
                 duration: 0.25,
                 ease: 'power2.in'
               }, '-=0.1') // Start before content completes
               .set(modalRef.current, { visibility: 'hidden' });
    }
  };

  // Handle navigation state changes with animations
  useEffect(() => {
    animateModal(isNavOpen);
    onNavStateChange?.(isNavOpen);
  }, [isNavOpen, onNavStateChange]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 0; // No header now
      const sectionPadding = 32;
      const elementPosition = element.offsetTop - headerHeight + sectionPadding;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setIsNavOpen(false); // Close modal after navigation
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isNavOpen) {
        closeNav();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isNavOpen]);

  // Cleanup GSAP animations on unmount
  useEffect(() => {
    return () => {
      if (modalRef.current) gsap.killTweensOf(modalRef.current);
      if (contentRef.current) gsap.killTweensOf(contentRef.current);
      if (navItemsRef.current) {
        const navItems = navItemsRef.current.querySelectorAll('button');
        gsap.killTweensOf(navItems);
      }
    };
  }, []);

  const ModalContent = () => (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
      style={{ opacity: 0, visibility: 'hidden' }}
      onClick={closeNav}
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center h-full px-6"
        style={{ opacity: 0, transform: 'translateY(50px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={closeNav}
          className="absolute top-6 right-6 rounded-full"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation items */}
        <div ref={navItemsRef} className="flex flex-col items-center space-y-8 max-w-sm w-full">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              onClick={() => scrollToSection(section.id)}
              className="text-2xl font-medium py-4 px-6 w-full rounded-lg hover:bg-primary/10"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              {section.name}
            </Button>
          ))}
        </div>

        {/* Space for FloatingActions will be added later */}
        <div className="mt-12">
          {/* FloatingActions will appear here when nav is open */}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating question mark icon */}
      <Button
        ref={iconRef}
        variant="secondary"
        size="icon"
        onClick={toggleNav}
        className="lg:hidden fixed top-6 right-6 z-40 w-12 h-12 rounded-full shadow-lg"
      >
        <CircleHelp className="w-6 h-6" />
      </Button>

      {/* Portal modal */}
      {mounted && isNavOpen && createPortal(<ModalContent />, document.body)}
    </>
  );
}