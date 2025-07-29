'use client';

import { useState, useEffect } from 'react';

export function useScrollZone() {
  const [isContentZone, setIsContentZone] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detect when user has scrolled past the hero zone
      // Hero has aspect-ratio 16:9, so we calculate its height
      const heroHeight = window.innerWidth * (9/16);
      const scrollY = window.scrollY;
      
      // Content zone is active when scrolled past 70% of hero height
      const threshold = heroHeight * 0.7;
      setIsContentZone(scrollY > threshold);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Set initial state
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return isContentZone;
}