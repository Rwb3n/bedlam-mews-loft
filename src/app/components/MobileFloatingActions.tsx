'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, SquareArrowOutUpRight, MessageCircle, Share2 } from "lucide-react"
import { usePrimaryCTAAnimation } from '@/app/hooks/usePrimaryCTAAnimation';
import { usePrimaryMinorCTAAnimation } from '@/app/hooks/usePrimaryMinorCTAAnimation';

type FloatingActionsState = 'visible' | 'hidden-hero' | 'hidden-footer' | 'hidden-nav';

interface MobileFloatingActionsProps {
  state?: FloatingActionsState;
}

export default function MobileFloatingActions({ state = 'visible' }: MobileFloatingActionsProps) {
  const floatingActionsRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);
  
  // PRIMARY CTA Animation Hook - 3-phase interaction system
  const primaryCTARef = usePrimaryCTAAnimation();
  
  // Primary-Minor CTA Animation Hooks - 2-phase interaction system
  const messageHostRef = usePrimaryMinorCTAAnimation<HTMLAnchorElement>();
  const shareButtonRef = usePrimaryMinorCTAAnimation<HTMLButtonElement>();

  // Consolidated Animation Controller
  const updateFloatingActions = (newState: FloatingActionsState) => {
    if (!floatingActionsRef.current) return;
    
    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf(floatingActionsRef.current);
    
    if (newState === 'visible') {
      // Animate to visible state
      gsap.to(floatingActionsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      // Animate to hidden state (all hidden states use same animation)
      gsap.to(floatingActionsRef.current, {
        opacity: 0,
        y: 100,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  // Handle state changes with consolidated animation controller
  useEffect(() => {
    if (!floatingActionsRef.current) return;
    
    if (isInitialRender.current) {
      // Set initial state immediately without animation
      const isVisible = state === 'visible';
      gsap.set(floatingActionsRef.current, {
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100
      });
      isInitialRender.current = false;
    } else {
      // Use animated transitions for subsequent changes
      updateFloatingActions(state);
    }
    
    // Cleanup function to kill animations on unmount
    return () => {
      if (floatingActionsRef.current) {
        gsap.killTweensOf(floatingActionsRef.current);
      }
    };
  }, [state]);

  const handleShare = async () => {
    const shareData = {
      title: 'Bedlam Mews Loft - Rehearsal Space London',
      text: 'Check out this creative rehearsal space in central London!',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        // Use native sharing if available (mobile)
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // Could add a toast notification here later
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      // If sharing fails or is cancelled, try clipboard as fallback
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch {
        console.error('Share failed:', error);
      }
    }
  };

  // Mobile-only: Fixed positioning overlay
  return (
    <div 
      ref={floatingActionsRef}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-40"
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="px-6 flex flex-col gap-1 items-center">
      {/* Pricing Display */}
      <Badge variant="secondary" className="text-sm md:text-base font-medium w-full flex items-center pl-1 pr-3 py-1">
        <span className="bg-accent text-accent-foreground rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center mr-2">
          <Check className="w-2 h-2 md:w-3 md:h-3" />
        </span>
        <span className="flex-1 text-center">slots available from £30/hour</span>
      </Badge>
      
      {/* Book Now - Primary CTA with 3-phase interaction animation */}
      <Button 
        asChild
        size="lg"
        className="text-lg md:text-xl shadow-lg rounded-full pl-3 pr-8 w-full"
      >
        <a 
          ref={primaryCTARef}
          href="https://app.acuityscheduling.com/schedule.php?owner=36519584" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <SquareArrowOutUpRight className="w-4 h-4 text-primary-foreground" />
          <span className="flex-1 text-center">Book Now</span>
        </a>
      </Button>
      
      {/* Secondary Actions with Primary-Minor animations */}
      <div className="flex gap-2 w-full">
        <Button
          asChild
          variant="outline"
          size="default"
          className="flex-1 text-xs md:text-sm rounded-full font-light pl-2 pr-4"
        >
          <a 
            ref={messageHostRef}
            href="https://wa.me/447700000000?text=Hi%20I%27m%20interested%20in%20booking%20The%20Loft" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
              <MessageCircle className="w-3 h-3 text-primary" />
            </span>
            <span className="flex-1 text-center">message host</span>
          </a>
        </Button>
        <Button 
          ref={shareButtonRef}
          variant="outline"
          size="default"
          className="flex-1 text-xs md:text-sm rounded-full font-light pl-2 pr-4"
          onClick={handleShare}
        >
          <span className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
            <Share2 className="w-3 h-3 text-primary" />
          </span>
          <span className="flex-1 text-center">share with friend</span>
        </Button>
      </div>
      </div>
    </div>
  );
}