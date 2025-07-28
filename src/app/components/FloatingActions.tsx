'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export default function FloatingActions() {
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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-40 flex flex-col gap-2">
      {/* Pricing Display - Now at TOP */}
      <div className="flex justify-center">
        <Badge className="text-sm md:text-lg font-medium">
          <Check className="w-4 h-4 mr-1" />
          spaces available from £30/hour
        </Badge>
      </div>
      
      {/* Book Now - Primary CTA */}
      <Button 
        asChild
        size="lg"
        className="text-lg md:text-2xl md:h-14 shadow-lg rounded-full"
      >
        <a 
          href="https://calendly.com/neonroobz" 
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
          className="flex-1 md:h-12 md:text-lg rounded-full font-light"
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
          className="flex-1 md:h-12 md:text-lg rounded-full font-light"
          onClick={handleShare}
        >
          share with friend
        </Button>
      </div>
    </div>
  );
}