'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DesktopSidebarNavigation() {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'details', name: 'Space Details' },
    { id: 'host', name: 'Host' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'location', name: 'Location' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'details', 'host', 'amenities', 'location'];
      
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
    <nav className="hidden md:block fixed left-0 top-0 h-full w-64 bg-card border-r border-primary/20 z-40">
      <div className="pt-20 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-foreground">Bedlam Mews Loft</h1>
        </div>
        
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full justify-start text-left px-2 py-1.5 text-lg rounded-sm transition-colors ${
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