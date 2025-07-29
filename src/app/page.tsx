import Header from './components/Header';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import PhotoSlider from './components/PhotoSlider';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen lg:mr-[27rem]">
      <Header />
      <FloatingActions />
      
      {/* Section 1: Hero */}
      <section id="hero" className="pt-24 pb-16 lg:py-16 bg-card flex items-center justify-center">
        <div className="w-full">
          <div className="w-full px-6">
            <PhotoSlider title="Studio Space" />
          </div>
          
          <div className="text-center px-6 max-w-2xl lg:max-w-4xl w-full mx-auto">
            <h1 className="text-[24px] md:text-[40px] font-serif mb-2 leading-tight mt-6">
              Creative Space in the heart of London
            </h1>
            <p className="text-xl md:text-2xl mb-6 font-light">Bedlam Mews, North Lambeth, SE11 6DF</p>
            
            {/* Scroll indicator */}
            <div className="flex justify-center mt-8 -mb-4">
              <ChevronDown className="w-6 h-6 lg:w-16 lg:h-16 text-muted-foreground animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Credential Banner */}
      <section className="py-6 bg-card/50">
        <div className="text-center px-6 max-w-2xl lg:max-w-4xl w-full mx-auto">
          <p className="text-lg mb-6 font-light text-center">Where BBC shoots, Netflix creates, and National Theatre rehearses:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">BBC</Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">ITV</Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">Channel 4</Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">Netflix</Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">Amazon Studios</Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">Sky</Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">National Theatre</Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">Royal Opera House</Badge>
          </div>
        </div>
      </section>

      {/* Section 2: Space Details */}
      <section id="details" className="py-16 bg-primary/20 flex items-center justify-center">
        <div className="text-center px-6 max-w-2xl lg:max-w-4xl w-full">
          <h2 className="text-[20px] md:text-[32px] font-serif mb-4 leading-tight text-left">Where Creative Breakthroughs Happen</h2>
          
          <p className="text-lg mb-6 font-light leading-relaxed text-left">
            It&apos;s deliberately simple. 44 square meters of open space, natural light, and the kind of blank-canvas flexibility that lets your project breathe. No distractions, no constraints - just the raw potential that&apos;s launched careers, sparked collaborations, and turned rough ideas into standing ovations.
          </p>
          
          <div className="py-4">
            <PhotoSlider title="Space Features" showDots={true} />
          </div>
          
          <div className="text-left space-y-3 mt-6">
            <div>
              <h3 className="font-medium mb-2">Why Creative Professionals Choose This Space:</h3>
              <ul className="text-lg space-y-1 font-light">
                <li>• Natural light from large windows that makes 14-hour rehearsal days feel effortless</li>
                <li>• Exposed brick and wooden floors that look good on camera without trying too hard</li>
                <li>• The quiet focus of a dedicated space (not a borrowed room or shared facility)</li>
                <li>• Wide-open layout that reshapes around your vision (20+ people, perfect acoustics)</li>
              </ul>
            </div>
            
            <div className="mt-4 p-6 bg-white rounded-lg">
              <p className="text-lg font-light text-center lg:text-left">8am till late, 7 days a week. <a href="https://calendly.com/neonroobz" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors font-medium underline">Book it empty, make it yours.</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Amenities */}
      <section id="amenities" className="py-16 bg-secondary/20 flex items-center justify-center">
        <div className="text-center px-6 max-w-2xl lg:max-w-4xl w-full">
          <h2 className="text-[24px] md:text-[36px] font-serif mb-4 leading-tight text-left">Everything Ready for Your Vision</h2>
          
          <p className="text-lg mb-8 font-light leading-relaxed text-left">
            Walk in and start creating. No setup time, no missing pieces, no excuses - just everything your project needs to come alive.
          </p>
          
          <div className="space-y-8">
            {/* Essential Features */}
            <div>
              <h3 className="font-medium mb-4 text-xl text-left">Essential Features</h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Shower</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>WC</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Kitchen</span>
              </div>
            </div>
            
            {/* Space Features */}
            <div>
              <h3 className="font-medium mb-4 text-xl text-left">Space Features</h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>44 sqm open-plan layout</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>2m tall entrance</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Quiet area - perfect for focus</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Full lighting control</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Multiple power outlets</span>
              </div>
            </div>
            
            {/* Comfort & Convenience */}
            <div>
              <h3 className="font-medium mb-4 text-xl text-left">Comfort & Convenience</h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>High-speed Wi-Fi</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Heating and cooling</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>On-site parking (upon request)</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Full kitchen facilities</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Private shower</span>
              </div>
            </div>
            
            {/* House Guidelines */}
            <div>
              <h3 className="font-medium mb-4 text-xl text-left">House Guidelines</h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Smoke-free building</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Family-friendly space</span>
                <span className="bg-primary/10 px-4 py-2 rounded-full text-sm border border-primary/20 flex items-center"><span className="text-primary mr-2">✓</span>Pet-friendly</span>
              </div>
            </div>
            
            {/* Accessibility */}
            <div>
              <h3 className="font-medium mb-4 text-xl text-left">Accessibility</h3>
              <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                <div className="mb-3">
                  <span className="bg-orange-100 px-3 py-1 rounded-full text-sm font-semibold text-orange-600 border border-orange-200 inline-flex items-center">
                    <span className="bg-orange-300 text-orange-800 rounded-full w-5 h-5 flex items-center justify-center text-sm mr-2">!</span>Please note
                  </span>
                </div>
                <p className="text-base font-light text-orange-800">
                  Access requires two flights of stairs - not wheelchair accessible
                </p>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="p-6 bg-primary/10 rounded-lg">
            <div className="mb-3">
              <span className="bg-primary/20 px-3 py-1 rounded-full text-sm font-semibold text-primary border border-primary/30 inline-flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-sm mr-2">?</span>Questions
              </span>
            </div>
            <p className="text-lg font-light">Questions about setup or special requirements? <Button asChild variant="link" className="p-0 h-auto font-medium text-lg underline"><a href="#host">Let&apos;s chat</a></Button> - Elina responds within the hour.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Location */}
      <section id="location" className="py-16 bg-secondary/10 flex items-center justify-center">
        <div className="text-center px-6 max-w-2xl lg:max-w-4xl w-full">
          <h2 className="text-[24px] md:text-[36px] font-serif mb-4 leading-tight text-left">In the Heart of London&apos;s Creative Quarter</h2>
          
          <p className="text-lg mb-6 font-light leading-relaxed text-left">
            Lambeth isn&apos;t just convenient - it&apos;s where London&apos;s creative energy lives. Minutes from the South Bank, surrounded by galleries, theaters, and the kind of creative community that feeds breakthrough work.
          </p>
          
          {/* Google Maps Embed */}
          <div className="mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4967.197565568589!2d-0.12108382346542577!3d51.49635327179558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f12.1!3m3!1m2!1s0x487604c59b5d3c45%3A0x7ff893c1b7b4d7c5!2sWalnut%20Tree%20Walk%2C%20London%20SE11%206DF%2C%20UK!5e0!3m2!1sen!2sus!4v1643273689582!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12">
            <div className="flex flex-col p-4">
              <Button 
                asChild 
                className="mb-4 bg-primary text-primary-foreground hover:bg-primary/80"
              >
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Walnut+Tree+Walk,+London+SE11+6DF,+UK" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </Button>
              
              <p className="text-lg font-light">Walnut Tree Walk, Lambeth SE11 6DF</p>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <h3 className="font-medium mb-2 text-lg text-left">Transport Links</h3>
              <div className="text-left space-y-2 text-base font-light">
                <p>🚇 <strong>Nearest Tube:</strong> Lambeth North (15 min walk)</p>
                <p>🚌 <strong>Nearest Bus Stop:</strong> 133, 59, 159, 333</p>
                <p>🚆 <strong>Nearest Train:</strong> Elephant & Castle (20 min walk)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Host & Availability */}
      <section id="host" className="pb-16 bg-secondary/20 flex items-center justify-center">
        <div className="px-6 max-w-2xl lg:max-w-4xl w-full">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Host Info Block */}
                <div className="flex-1 text-center">
                  <CardTitle className="text-xl mb-4">Your Creative Ally</CardTitle>
                  
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage 
                        src="/img/studio/avatar.png" 
                        alt="Elina - Host" 
                      />
                      <AvatarFallback>E</AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-medium">Elina</h3>
                  </div>
                  
                  <p className="text-lg mb-4 font-light">(replies within 1 hour)</p>
                  
                  <a 
                    href="https://wa.me/447700000000?text=Hi%20I%27m%20interested%20in%20booking%20The%20Loft" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full text-xl font-medium hover:bg-primary/80 transition-colors"
                  >
                    message host
                  </a>
                </div>
                
                {/* Separator */}
                <Separator orientation="vertical" className="hidden lg:block h-32" />
                <Separator orientation="horizontal" className="lg:hidden" />
                
                {/* Availability Block */}
                <div className="flex-1 text-center flex flex-col justify-center">
                  <CardTitle className="text-xl mb-4">Space Availability</CardTitle>
                  <p className="text-lg font-light mb-6">8:00 - till late Mondays to Sundays</p>
                  
                  {/* Book with confidence elements */}
                  <div>
                    <p className="font-medium mb-3 text-base">Book with confidence:</p>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center justify-center">
                        <span className="mr-2">💬</span>
                        Direct contact with the host
                      </p>
                      <p className="flex items-center justify-center">
                        <span className="mr-2">🕐</span>
                        Cancel anytime up to 24 hours before
                      </p>
                      <p className="flex items-center justify-center">
                        <span className="mr-2">🔒</span>
                        Secure payments via PayPal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
