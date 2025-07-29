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
    <nav className={`fixed right-0 top-16 h-[calc(100vh-4rem)] w-[27rem] z-40 transition-all duration-300 ${
      isContentZone ? 'hidden lg:block' : 'hidden lg:hidden'
    }`}>
      <div className="h-full flex items-center justify-center pl-0 pr-6" style={{ paddingBottom: '176px' }}>
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
      </div>
    </nav>
  );
}