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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold">Bedlam Mews Loft</h1>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600"
        >
          ☰
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="bg-white border-t border-gray-200 py-2">
          <nav className="flex flex-col">
            <button
              onClick={() => scrollToSection('hero')}
              className="px-4 py-2 text-left hover:bg-gray-50"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('details')}
              className="px-4 py-2 text-left hover:bg-gray-50"
            >
              Space Details
            </button>
            <button
              onClick={() => scrollToSection('host')}
              className="px-4 py-2 text-left hover:bg-gray-50"
            >
              Host
            </button>
            <button
              onClick={() => scrollToSection('amenities')}
              className="px-4 py-2 text-left hover:bg-gray-50"
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection('location')}
              className="px-4 py-2 text-left hover:bg-gray-50"
            >
              Location
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}