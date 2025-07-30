import { Separator } from "@/components/ui/separator";
import FloatingActions from './FloatingActions';

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_0.8fr] py-16">
        {/* Main content area - spans full width on mobile/tablet like ContentZone */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact methods - Column 1 (first on mobile, left on desktop) */}
            <div className="flex items-center justify-center">
              <div className="text-center px-6 lg:px-12">
                <h4 className="font-medium text-xl mb-6">Get In Touch</h4>
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 mb-6">
                  <a 
                    href="mailto:hello@bedlammewsloft.com" 
                    className="flex items-center justify-center lg:justify-start gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="text-2xl">📧</div>
                    <div className="text-primary hover:text-primary/80 transition-colors font-light text-lg">
                      Email
                    </div>
                  </a>
                  <a 
                    href="https://wa.me/447700000000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center lg:justify-start gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="text-2xl">📱</div>
                    <div className="text-primary hover:text-primary/80 transition-colors font-light text-lg">
                      WhatsApp
                    </div>
                  </a>
                  <a 
                    href="https://instagram.com/bedlammewsloft" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center lg:justify-start gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="text-2xl">📷</div>
                    <div className="text-primary hover:text-primary/80 transition-colors font-light text-lg">
                      Instagram
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Address & Hours - Column 2 (second on mobile, right on desktop) */}
            <div className="flex items-center justify-center">
              <div className="text-center px-6 lg:px-12 w-full">
                
                {/* Address & Hours content */}
                <div className="text-center">
                  <h4 className="font-medium text-xl mb-4">Bedlam Mews Loft</h4>
                  
                  {/* Address container */}
                  <div className="mb-6">
                    <div className="text-lg font-light leading-relaxed">
                      <p>off Walnut Tree Walk</p>
                      <p>North Lambeth</p>
                      <p>SE11 6DF</p>
                    </div>
                  </div>
                  
                  {/* Hours container */}
                  <div>
                    <div className="text-lg font-medium">
                      <p className="mb-2">8am - till late</p>
                      <p>7 days a week</p>
                    </div>
                  </div>
                  
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
        
        
      </div>
      
      {/* Legal + Credit section - full width dark bar */}
      <div className="w-full bg-primary">
        <div className="px-12 py-6 flex justify-between items-center text-sm font-light text-primary-foreground">
          <div>© Bedlam Mews Loft</div>
          <a href="/terms-conditions" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors underline">Terms & Conditions</a>
          <a href="/privacy-policy" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors underline">Privacy Policy</a>
          <div>Built by <a href="https://rubenpires.co.uk" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors underline">Ruben</a></div>
        </div>
      </div>
    </footer>
  );
}