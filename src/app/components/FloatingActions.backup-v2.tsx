'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useScrollZone } from '../hooks/useScrollZone';
import { useEffect, useState } from 'react';

export default function FloatingActions() {
  const isContentZone = useScrollZone();
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
  return (
    <div className={`fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 lg:static lg:sticky lg:bottom-4 lg:left-auto lg:right-auto z-40 flex flex-col gap-3 md:gap-4 ${
      isContentZone ? 'block lg:block' : 'hidden'
    }`}>
      {/* Pricing Display - Now at TOP */}
      <div className="flex justify-center">
        <Badge variant="secondary" className="text-base md:text-lg font-medium w-full flex items-center">
          <span className="bg-green-500 text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-2">
            <Check className="w-3 h-3 md:w-4 md:h-4" />
          </span>
          <span className="flex-1 text-center">slots available from £30/hour</span>
        </Badge>
      </div>
      
      {/* Book Now - Primary CTA */}
      <Button 
        asChild
        size="lg"
        className="text-lg md:text-xl shadow-lg rounded-full"
      >
        <a 
          href="https://app.acuityscheduling.com/schedule.php?owner=36519584" 
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Now
        </a>
      </Button>
      
      {/* Secondary Actions */}
      <div className="flex gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-1 text-sm md:text-base rounded-full font-light"
        >
          <a 
            href="https://wa.me/447700000000?text=Hi%20I%27m%20interested%20in%20booking%20The%20Loft" 
            target="_blank"
            rel="noopener noreferrer"
          >
            message host
          </a>
        </Button>
        <Button 
          variant="outline"
          size="sm"
          className="flex-1 text-sm md:text-base rounded-full font-light"
          onClick={handleShare}
        >
          share with friend
        </Button>
      </div>
    </div>
  );
}