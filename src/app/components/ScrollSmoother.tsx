'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollSmootherInit() {
  useEffect(() => {
    // Create ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      smooth: 1, // 1 second catch-up time
      effects: true, // Enable data-speed and data-lag attributes
      smoothTouch: 0.1, // Minimal smoothing on touch devices
      normalizeScroll: true, // Better mobile behavior
    });

    // Cleanup
    return () => {
      smoother?.kill();
    };
  }, []);

  return null; // This component doesn't render anything
}