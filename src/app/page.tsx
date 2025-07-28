import StickyHeader from './components/StickyHeader';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import PhotoSlider from './components/PhotoSlider';

export default function Home() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <FloatingActions />
      
      {/* Section 1: Hero */}
      <section id="hero" className="h-screen bg-warm-white flex items-center justify-center pt-16">
        <div className="text-center px-6 max-w-2xl w-full">
          <PhotoSlider title="Studio Space" height="h-80" />
          
          <h1 className="text-[30px] md:text-[48px] font-[family-name:var(--font-castoro)] text-sage-dark mb-3 leading-tight">
            Rehearsal Space in the heart of London
          </h1>
          <p className="text-xl md:text-2xl text-wood mb-8 font-light">Bedlam Mews</p>
          
          <div className="space-y-3 text-base">
            <p className="font-medium text-wood-dark">Book with confidence:</p>
            <div className="space-y-2">
              <p className="flex items-center justify-center text-sage-dark">
                <span className="text-sage mr-3">✓</span>
                Direct contact with the host
              </p>
              <p className="flex items-center justify-center text-sage-dark">
                <span className="text-sage mr-3">✓</span>
                Cancel if needed
              </p>
              <p className="flex items-center justify-center text-sage-dark">
                <span className="text-accent-dark mr-3">⭐</span>
                Fast & Secure payments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Space Details */}
      <section id="details" className="h-screen bg-sage-light/20 flex items-center justify-center py-20">
        <div className="text-center px-6 max-w-2xl w-full">
          <h2 className="text-[20px] md:text-[32px] font-[family-name:var(--font-castoro)] text-wood-dark mb-4 leading-tight">Your Creative Space in Bedlam Mews</h2>
          
          <PhotoSlider title="Space Features" height="h-48" />
          
          <p className="text-sm text-sage-dark mb-6 font-light leading-relaxed">
            This well-lit and versatile creative studio is perfect for rehearsals, classes, workshops, 
            meetup events, and photo or film shoots.
          </p>
          
          <div className="text-left space-y-3">
            <div>
              <h3 className="font-medium mb-2 text-wood-dark">What You&apos;ll Find:</h3>
              <ul className="text-sm space-y-1 text-sage-dark font-light">
                <li>• Exposed brick walls and wooden floors</li>
                <li>• Large windows for natural light</li>
                <li>• Open-plan layout accommodating 20+ people</li>
                <li>• Basic seating and tables available upon request</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-wood-dark">Perfect For:</h3>
              <ul className="text-sm space-y-1 text-sage-dark font-light">
                <li>• Acting rehearsals and workshops</li>
                <li>• Creative workshops and networking events</li>
                <li>• Meeting spaces and private events</li>
                <li>• Private classes and training sessions</li>
                <li>• Photo shoots - all day, this space is ready</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Host & Availability */}
      <section id="host" className="h-screen bg-accent/10 flex items-center justify-center">
        <div className="text-center px-6 max-w-sm">
          <h2 className="text-[24px] md:text-[36px] font-[family-name:var(--font-castoro)] text-wood-dark mb-8 leading-tight">Location Host</h2>
          
          <div className="mb-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Photo</span>
            </div>
            <h3 className="text-xl font-medium mb-2 text-sage-dark">Elina</h3>
            <p className="text-base text-wood mb-4 font-light">(replies in one hour)</p>
            
            <a 
              href="https://wa.me/447700000000?text=Hi%20I%27m%20interested%20in%20booking%20The%20Loft" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-sage text-white px-6 py-3 rounded-full text-base font-medium hover:bg-sage-dark transition-colors"
            >
              message host
            </a>
          </div>
          
          <div className="border-t border-gray-300 pt-6">
            <h3 className="font-medium mb-3 text-wood-dark text-lg">Availability</h3>
            <p className="text-base text-sage-dark font-light">9:00 - 18:00 Mondays to Sundays</p>
          </div>
        </div>
      </section>

      {/* Section 4: Amenities */}
      <section id="amenities" className="h-screen bg-terracotta/10 flex items-center justify-center">
        <div className="text-center px-6 max-w-sm">
          <h2 className="text-[24px] md:text-[36px] font-[family-name:var(--font-castoro)] text-wood-dark mb-8 leading-tight">Features & Amenities</h2>
          
          <div className="mb-6">
            <h3 className="font-medium mb-4 text-wood-dark text-lg">Features</h3>
            <div className="flex gap-3 justify-center flex-wrap">
              <span className="bg-sage/20 text-sage-dark px-4 py-2 rounded-full text-base border border-sage/30">Bathroom</span>
              <span className="bg-sage/20 text-sage-dark px-4 py-2 rounded-full text-base border border-sage/30">Kitchen</span>
              <span className="bg-sage/20 text-sage-dark px-4 py-2 rounded-full text-base border border-sage/30">Blackout</span>
            </div>
          </div>
          
          <div className="border-t border-gray-300 pt-6">
            <h3 className="font-medium mb-5 text-wood-dark text-lg">Amenities</h3>
            <div className="text-left space-y-3 text-base">
              <p className="flex items-center font-light"><span className="text-sage mr-3">✓</span><span className="text-sage-dark">Entrance size: 2m</span></p>
              <p className="flex items-center font-light"><span className="text-sage mr-3">✓</span><span className="text-sage-dark">Space Size: 44Sqm</span></p>
              <p className="flex items-center font-light"><span className="text-sage mr-3">✓</span><span className="text-sage-dark">Noise level: Quiet</span></p>
              <p className="flex items-center font-light"><span className="text-sage mr-3">✓</span><span className="text-sage-dark">Plugs and power output: Yes</span></p>
              <p className="flex items-center font-light"><span className="text-sage mr-3">✓</span><span className="text-sage-dark">On-site parking: 2</span></p>
              <p className="flex items-center font-light"><span className="text-sage mr-3">✓</span><span className="text-sage-dark">Toilets available</span></p>
              <p className="flex items-center font-light"><span className="text-sage mr-3">✓</span><span className="text-sage-dark">Wifi</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Location & Rules */}
      <section id="location" className="h-screen bg-wood/10 flex items-center justify-center pb-32">
        <div className="text-center px-6 max-w-md w-full">
          <h2 className="text-[24px] md:text-[36px] font-[family-name:var(--font-castoro)] text-wood-dark mb-6 leading-tight">Location & Rules</h2>
          
          {/* Google Maps Embed */}
          <div className="mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5987827842943!2d-0.12108382346542577!3d51.49635327179558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c59b5d3c45%3A0x7ff893c1b7b4d7c5!2sWalnut%20Tree%20Walk%2C%20London%20SE11%206DF%2C%20UK!5e0!3m2!1sen!2sus!4v1643273689582!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
          
          <p className="text-sage-dark text-base mb-8 font-light">Walnut Tree Walk, Lambeth SE11 6DF</p>
          
          <div className="border-t border-gray-300 pt-6">
            <h3 className="font-medium mb-5 text-wood-dark text-lg">House Rules</h3>
            <div className="text-left space-y-3 text-base text-sage-dark font-light">
              <p>• No smoking in the building</p>
              <p>• Outside catering allowed</p>
              <p>• You can play music</p>
              <p>• No alcohol</p>
              <p>• No adult content</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
