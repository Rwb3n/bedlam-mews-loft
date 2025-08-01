'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion, onMotionPreferenceChange } from '@/app/utils/motionPreference';

/**
 * Accessibility Test Component
 * Displays current motion preference status for testing
 * Remove this component in production - for development testing only
 */
export default function AccessibilityTest() {
  const [motionReduced, setMotionReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMotionReduced(prefersReducedMotion());

    // Listen for changes in motion preference
    const cleanup = onMotionPreferenceChange((prefersReduced) => {
      setMotionReduced(prefersReduced);
    });

    return cleanup;
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 left-4 z-50 bg-secondary/90 backdrop-blur-sm border border-primary/20 rounded-lg p-3 text-xs">
      <div className="font-medium mb-1">Accessibility Status</div>
      <div className={`${motionReduced ? 'text-accent' : 'text-primary'}`}>
        Motion: {motionReduced ? 'REDUCED' : 'ENABLED'}
      </div>
      <div className="text-muted-foreground mt-1 text-xs">
        {motionReduced ? 'Animations disabled' : 'Animations active'}
      </div>
    </div>
  );
}