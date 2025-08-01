'use client'

import { useEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, SquareArrowOutUpRight, MessageCircle, Share2 } from "lucide-react"
import { usePrimaryCTAAnimation } from '@/app/hooks/usePrimaryCTAAnimation';
import { usePrimaryMinorCTAAnimation } from '@/app/hooks/usePrimaryMinorCTAAnimation';

const DesktopFloatingActions = forwardRef<HTMLDivElement>((props, ref) => {
  // PRIMARY CTA Animation Hook - 3-phase interaction system
  const primaryCTARef = usePrimaryCTAAnimation();
  
  // Primary-Minor CTA Animation Hooks - 2-phase interaction system
  const messageHostRef = usePrimaryMinorCTAAnimation<HTMLAnchorElement>();
  const shareButtonRef = usePrimaryMinorCTAAnimation<HTMLButtonElement>();

  // Set initial hidden state for ACT 3 integration
  useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      gsap.set(ref.current, {
        opacity: 0,
        filter: 'blur(8px)',
        x: 30
      });
    }
  }, [ref]);

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

  // Desktop-only: Static positioning within sidebar layout
  return (
    <div 
      ref={ref}
      className="flex flex-col gap-1 items-center"
      style={{ willChange: 'opacity, filter, transform' }}
    >
      {/* Pricing Display */}
      <Badge variant="secondary" className="text-sm font-medium w-full flex items-center pl-1 pr-3 py-1">
        <span className="bg-accent text-accent-foreground rounded-full w-4 h-4 flex items-center justify-center mr-2">
          <Check className="w-2 h-2" />
        </span>
        <span className="flex-1 text-center">slots available from £30/hour</span>
      </Badge>
      
      {/* Book Now - Primary CTA with 3-phase interaction animation */}
      <Button 
        asChild
        size="lg"
        className="text-lg shadow-lg rounded-full pl-3 pr-8 w-full"
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
          className="flex-1 text-xs rounded-full font-light pl-2 pr-4"
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
          className="flex-1 text-xs rounded-full font-light pl-2 pr-4"
          onClick={handleShare}
        >
          <span className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
            <Share2 className="w-3 h-3 text-primary" />
          </span>
          <span className="flex-1 text-center">share with friend</span>
        </Button>
      </div>
    </div>
  );
});

DesktopFloatingActions.displayName = 'DesktopFloatingActions';

export default DesktopFloatingActions;