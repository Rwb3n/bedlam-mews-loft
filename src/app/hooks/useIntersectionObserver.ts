'use client';

import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

export function useIntersectionObserver(
  targetSelector: string,
  options: UseIntersectionObserverOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Find target element
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) {
      return;
    }

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Fallback for browsers without IntersectionObserver
    if (!window.IntersectionObserver) {
      // Simple scroll-based fallback
      const handleScroll = () => {
        const rect = targetElement.getBoundingClientRect();
        const threshold = typeof options.threshold === 'number' ? options.threshold : 0.3;
        const windowHeight = window.innerHeight;
        
        // Element is intersecting if it's within the threshold
        const intersecting = rect.top <= windowHeight * (1 - threshold);
        setIsIntersecting(intersecting);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Check initial state

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    // Create new observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: options.threshold || 0.3,
        rootMargin: options.rootMargin || '0px',
        root: options.root || null,
      }
    );

    observer.observe(targetElement);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [targetSelector, options.threshold, options.rootMargin, options.root]);

  return { isIntersecting, entry };
}