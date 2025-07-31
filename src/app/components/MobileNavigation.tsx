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

  // Set base animation states
  useEffect(() => {
    if (modalRef.current && contentRef.current) {
      // Set initial hidden state for future animations
      gsap.set(modalRef.current, {
        opacity: 0,
        visibility: 'hidden'
      });
      gsap.set(contentRef.current, {
        opacity: 0,
        y: 50
      });
    }
  }, [mounted]);

  // Notify parent of state changes
  useEffect(() => {
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

  const ModalContent = () => (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
      onClick={closeNav}
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center h-full px-6"
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
        <div className="flex flex-col items-center space-y-8 max-w-sm w-full">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              onClick={() => scrollToSection(section.id)}
              className="text-2xl font-medium py-4 px-6 w-full rounded-lg hover:bg-primary/10"
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