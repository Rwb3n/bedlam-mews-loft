'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, SquareArrowOutUpRight, MessageCircle, Share2 } from "lucide-react"

interface MobileFloatingActionsProps {
  visible?: boolean;
}

export default function MobileFloatingActions({ visible = true }: MobileFloatingActionsProps) {
  const floatingActionsRef = useRef<HTMLDivElement>(null);

  // Set initial states based on visibility
  useEffect(() => {
    if (floatingActionsRef.current) {
      if (visible) {
        gsap.set(floatingActionsRef.current, {
          opacity: 1,
          y: 0 // Default visible position
        });
      } else {
        gsap.set(floatingActionsRef.current, {
          opacity: 0,
          y: 100 // Hidden below screen
        });
      }
    }
  }, []);

  // Update visibility when prop changes
  useEffect(() => {
    if (floatingActionsRef.current) {
      if (visible) {
        gsap.set(floatingActionsRef.current, {
          opacity: 1,
          y: 0
        });
      } else {
        gsap.set(floatingActionsRef.current, {
          opacity: 0,
          y: 100
        });
      }
    }
  }, [visible]);

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
        <span className="bg-green-500 text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center mr-2">
          <Check className="w-2 h-2 md:w-3 md:h-3" />
        </span>
        <span className="flex-1 text-center">slots available from £30/hour</span>
      </Badge>
      
      {/* Book Now - Primary CTA */}
      <Button 
        asChild
        size="lg"
        className="text-lg md:text-xl shadow-lg rounded-full pl-3 pr-8 w-full"
      >
        <a 
          href="https://calendly.com/neonroobz" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <SquareArrowOutUpRight className="w-4 h-4 text-primary-foreground" />
          <span className="flex-1 text-center">Book Now</span>
        </a>
      </Button>
      
      {/* Secondary Actions */}
      <div className="flex gap-2 w-full">
        <Button
          asChild
          variant="outline"
          size="default"
          className="flex-1 text-xs md:text-sm rounded-full font-light pl-2 pr-4"
        >
          <a 
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