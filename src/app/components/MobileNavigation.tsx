'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';

export default function MobileNavigation() {
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
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-primary/20">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-serif">Bedlam Mews Loft</h1>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-2xl hover:text-primary transition-colors"
              >
                ☰
              </Button>
            </MenubarTrigger>
            <MenubarContent 
              className="w-screen left-0 right-0 mx-0 rounded-none border-l-0 border-r-0"
              sideOffset={0}
              alignOffset={0}
            >
              {sections.map((section) => (
                <MenubarItem 
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={activeSection === section.id 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-primary/5"
                  }
                >
                  {section.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
}