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
    <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-6 lg:w-96 z-40 flex flex-col gap-2">
      {/* Pricing Display - Now at TOP */}
      <div className="flex justify-center">
        <Badge className="text-base lg:text-lg font-medium w-full flex items-center">
          <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2">
            <Check className="w-3 h-3" />
          </span>
          <span className="flex-1 text-center">slots available from £30/hour</span>
        </Badge>
      </div>
      
      {/* Book Now - Primary CTA */}
      <Button 
        asChild
        size="lg"
        className="text-xl lg:text-3xl lg:h-14 shadow-lg rounded-full"
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
          className="flex-1 lg:h-12 lg:text-xl rounded-full font-light"
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
          className="flex-1 lg:h-12 lg:text-xl rounded-full font-light"
          onClick={handleShare}
        >
          share with friend
        </Button>
      </div>
    </div>
  );
}