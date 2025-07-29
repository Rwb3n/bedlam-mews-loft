import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="pb-20 lg:pb-4">
      <div className="px-6 max-w-2xl lg:max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          
          {/* Left Column: Business Info + Address */}
          <div className="text-center lg:text-left">
            <h3 className="font-serif text-2xl mb-4">Bedlam Mews Loft</h3>
            <div className="text-lg mb-6 font-light leading-relaxed">
              <p>off Walnut Tree Walk</p>
              <p>North Lambeth</p>
              <p>SE11 6DF</p>
            </div>
            <div className="text-lg font-light">
              <p className="mb-2">8am - till late</p>
              <p>7 days a week</p>
            </div>
            
            {/* Mobile separator - inside left column */}
            <Separator className="lg:hidden mt-6" />
          </div>
          
          {/* Right Column: Contact + Booking CTA */}
          <div className="text-center">
            <h4 className="font-medium text-xl mb-4">Get In Touch</h4>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <a 
                href="mailto:hello@bedlammewsloft.com" 
                className="text-center block hover:opacity-80 transition-opacity"
              >
                <div className="text-2xl mb-2">📧</div>
                <div className="text-primary hover:text-primary/80 transition-colors font-light text-lg">
                  Email
                </div>
              </a>
              <a 
                href="https://wa.me/447700000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center block hover:opacity-80 transition-opacity"
              >
                <div className="text-2xl mb-2">📱</div>
                <div className="text-primary hover:text-primary/80 transition-colors font-light text-lg">
                  WhatsApp
                </div>
              </a>
              <a 
                href="https://instagram.com/bedlammewsloft" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center block hover:opacity-80 transition-opacity"
              >
                <div className="text-2xl mb-2">📷</div>
                <div className="text-primary hover:text-primary/80 transition-colors font-light text-lg">
                  Instagram
                </div>
              </a>
            </div>
            
            <Button asChild size="lg" className="text-lg rounded-full">
              <a 
                href="https://calendly.com/bedlammewsloft" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Book Your Session
              </a>
            </Button>
          </div>
          
          {/* Separator between columns - positioned absolutely */}
          <Separator 
            orientation="vertical" 
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 h-32 w-px" 
          />
          
        </div>
        
        <Separator className="mt-8 mb-6" />
        <div className="text-center">
          <div className="flex justify-center gap-4 text-sm font-light mb-3">
            <a 
              href="/terms-conditions" 
              className="text-primary hover:text-primary/80 transition-colors underline"
            >
              Terms & Conditions
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="/privacy-policy" 
              className="text-primary hover:text-primary/80 transition-colors underline"
            >
              Privacy Policy
            </a>
          </div>
          <p className="text-sm font-light">
            Built by <a 
              href="https://rubenpires.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors underline"
            >
              Ruben
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}