'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CircleHelp } from 'lucide-react';
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
    { id: 'details', name: 'Space Details' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'location', name: 'Location' },
    { id: 'host', name: 'Host' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Mobile header height
      const sectionPadding = 32; // Half the py-16 section padding
      const elementPosition = element.offsetTop - headerHeight + sectionPadding;
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
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 
          className="text-2xl font-serif cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => scrollToSection('hero')}
        >
          Bedlam Mews Loft
        </h1>
        <Menubar className="bg-transparent border-none p-0">
          <MenubarMenu>
            <MenubarTrigger 
              className="
                bg-white hover:bg-gray-50 
                text-primary 
                rounded-full p-2 
                data-[state=open]:bg-gray-50
                focus:ring-2 focus:ring-primary/50 focus:outline-none
                transition-all duration-200
              "
              aria-label="Open navigation menu"
            >
              <CircleHelp className="w-5 h-5 text-primary" />
            </MenubarTrigger>
            <MenubarContent 
              className="
                w-screen max-w-none 
                mx-0 mt-4 
                rounded-t-none rounded-b-xl
                border-0 
                shadow-2xl
                !bg-transparent backdrop-blur
                animate-in slide-in-from-top-2 duration-200
              "
              align="end"
              sideOffset={0}
            >
              <div className="py-2">
                {sections.map((section, index) => (
                  <MenubarItem 
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      text-xl font-medium
                      flex items-center justify-center 
                      py-5 px-6 mx-2 my-1
                      rounded-lg
                      transition-all duration-200 ease-out
                      active:scale-95
                      ${activeSection === section.id 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "hover:bg-primary/5 active:bg-primary/10"
                      }
                    `}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animation: 'fadeInUp 300ms ease-out forwards'
                    }}
                  >
                    {section.name}
                  </MenubarItem>
                ))}
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
}