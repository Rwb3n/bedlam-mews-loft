'use client';

import { useState, useEffect } from 'react';
import { useScrollZone } from '../hooks/useScrollZone';

export default function DesktopNavigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const isContentZone = useScrollZone();

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

  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`transition-all duration-300 ${
      true ? 'block' : 'hidden'  // Always show for now
    }`}>
      {/* Sidebar Title */}
      <div className="mb-6 text-center">
        <h1 
          className="text-3xl font-serif text-foreground cursor-pointer hover:opacity-80 transition-opacity"
          onClick={scrollToHero}
        >
          Bedlam Mews Loft
        </h1>
      </div>
      
      {/* Navigation Buttons */}
      <div className="space-y-4 w-full">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full justify-center text-center px-6 py-4 text-xl rounded-sm transition-colors ${
              activeSection === section.id 
                ? "bg-primary/10 text-primary font-medium" 
                : "hover:bg-primary/5"
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>
    </nav>
  );
}