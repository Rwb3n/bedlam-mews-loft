'use client';

import { useState } from 'react';

interface PhotoSliderProps {
  title: string;
  height?: string;
}

export default function PhotoSlider({ title, height = "h-64" }: PhotoSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Placeholder images - will be replaced with real photos
  const placeholderImages = [
    { id: 1, alt: `${title} - View 1` },
    { id: 2, alt: `${title} - View 2` },
    { id: 3, alt: `${title} - View 3` },
    { id: 4, alt: `${title} - View 4` }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % placeholderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + placeholderImages.length) % placeholderImages.length);
  };

  return (
    <div className={`relative ${height} bg-primary/10 rounded-lg overflow-hidden mb-6`}>
      {/* Current Image Placeholder */}
      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📸</div>
          <p className="text-primary-foreground font-light">
            {title} Photo {currentSlide + 1}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center transition-colors"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center transition-colors"
      >
        →
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {placeholderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}