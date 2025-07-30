'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, SquareArrowOutUpRight, MessageCircle, Share2 } from "lucide-react"

interface FloatingActionsProps {
  showTransition?: boolean;
}

export default function FloatingActions({ 
  showTransition = true 
}: FloatingActionsProps) {

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

  const containerClasses = `
    fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-6
    lg:static lg:left-auto lg:right-auto lg:transform-none lg:translate-x-0 lg:w-auto lg:max-w-none lg:px-0 z-40 
    flex flex-col gap-1 items-center
    ${showTransition ? 'transition-opacity duration-300 ease-in-out' : ''}
  `.trim().replace(/\s+/g, ' ');

  // Always visible - scroll logic disabled

  return (
    <div className={containerClasses}>
      {/* Pricing Display - Now at TOP */}
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
  );
}