'use client';

import { useState } from 'react';

export default function StickyHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-primary/20">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-serif text-primary-foreground">Bedlam Mews Loft</h1>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-muted-foreground text-xl hover:text-primary transition-colors"
        >
          ☰
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="bg-card border-t border-primary/20 py-3">
          <nav className="flex flex-col">
            <button
              onClick={() => scrollToSection('hero')}
              className="px-6 py-3 text-left hover:bg-primary/10 text-primary-foreground font-light transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('details')}
              className="px-6 py-3 text-left hover:bg-primary/10 text-primary-foreground font-light transition-colors"
            >
              Space Details
            </button>
            <button
              onClick={() => scrollToSection('host')}
              className="px-6 py-3 text-left hover:bg-primary/10 text-primary-foreground font-light transition-colors"
            >
              Host
            </button>
            <button
              onClick={() => scrollToSection('amenities')}
              className="px-6 py-3 text-left hover:bg-primary/10 text-primary-foreground font-light transition-colors"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="px-6 py-3 text-left hover:bg-primary/10 text-primary-foreground font-light transition-colors"
            >
              Location
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}