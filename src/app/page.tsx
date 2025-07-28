import Header from './components/Header';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import PhotoSlider from './components/PhotoSlider';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <FloatingActions />
      
      {/* Main content with desktop sidebar offset */}
      <main className="md:ml-64">
      
      {/* Section 1: Hero */}
      <section id="hero" className="h-screen bg-card flex items-center justify-center pt-20 pb-32">
        <div className="text-center px-6 max-w-2xl w-full">
          <PhotoSlider title="Studio Space" height="h-64" />
          
          <h1 className="text-[24px] md:text-[40px] font-serif mb-2 leading-tight">
            Rehearsal Space in the heart of London
          </h1>
          <p className="text-lg md:text-xl mb-6 font-light">Bedlam Mews</p>
          
          <div className="space-y-2 text-sm">
            <p className="font-medium">Book with confidence:</p>
            <div className="space-y-1">
              <p className="flex items-center justify-center">
                <span className="text-primary mr-2">✓</span>
                Direct contact with the host
              </p>
              <p className="flex items-center justify-center">
                <span className="text-primary mr-2">✓</span>
                Cancel if needed
              </p>
              <p className="flex items-center justify-center">
                <span className="text-accent mr-2">⭐</span>
                Fast & Secure payments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Space Details */}
      <section id="details" className="h-screen bg-primary/20 flex items-center justify-center py-20">
        <div className="text-center px-6 max-w-2xl w-full">
          <h2 className="text-[20px] md:text-[32px] font-serif mb-4 leading-tight">Your Creative Space in Bedlam Mews</h2>
          
          <PhotoSlider title="Space Features" height="h-48" />
          
          <p className="text-sm mb-6 font-light leading-relaxed">
            This well-lit and versatile creative studio is perfect for rehearsals, classes, workshops, 
            meetup events, and photo or film shoots.
          </p>
          
          <div className="text-left space-y-3">
            <div>
              <h3 className="font-medium mb-2">What You&apos;ll Find:</h3>
              <ul className="text-sm space-y-1 font-light">
                <li>• Exposed brick walls and wooden floors</li>
                <li>• Large windows for natural light</li>
                <li>• Open-plan layout accommodating 20+ people</li>
                <li>• Basic seating and tables available upon request</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Perfect For:</h3>
              <ul className="text-sm space-y-1 font-light">
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
      <section id="host" className="h-screen bg-secondary/10 flex items-center justify-center">
        <div className="text-center px-6 max-w-sm">
          <h2 className="text-[24px] md:text-[36px] font-serif mb-8 leading-tight">Location Host</h2>
          
          <div className="mb-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Photo</span>
            </div>
            <h3 className="text-xl font-medium mb-2">Elina</h3>
            <p className="text-base mb-4 font-light">(replies in one hour)</p>
            
            <a 
              href="https://wa.me/447700000000?text=Hi%20I%27m%20interested%20in%20booking%20The%20Loft" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full text-base font-medium hover:bg-primary/80 transition-colors"
            >
              message host
            </a>
          </div>
          
          <div className="border-t border-gray-300 pt-6">
            <h3 className="font-medium mb-3 text-lg">Availability</h3>
            <p className="text-base font-light">9:00 - 18:00 Mondays to Sundays</p>
          </div>
        </div>
      </section>

      {/* Section 4: Amenities */}
      <section id="amenities" className="h-screen bg-secondary/20 flex items-center justify-center">
        <div className="text-center px-6 max-w-sm">
          <h2 className="text-[24px] md:text-[36px] font-serif mb-8 leading-tight">Features & Amenities</h2>
          
          <div className="mb-6">
            <h3 className="font-medium mb-4 text-lg">Features</h3>
            <div className="flex gap-3 justify-center flex-wrap">
              <span className="bg-primary/20 px-4 py-2 rounded-full text-base border border-primary/30">Bathroom</span>
              <span className="bg-primary/20 px-4 py-2 rounded-full text-base border border-primary/30">Kitchen</span>
              <span className="bg-primary/20 px-4 py-2 rounded-full text-base border border-primary/30">Blackout</span>
            </div>
          </div>
          
          <div className="border-t border-gray-300 pt-6">
            <h3 className="font-medium mb-5 text-lg">Amenities</h3>
            <div className="text-left space-y-3 text-base">
              <p className="flex items-center font-light"><span className="text-primary mr-3">✓</span><span>Entrance size: 2m</span></p>
              <p className="flex items-center font-light"><span className="text-primary mr-3">✓</span><span>Space Size: 44Sqm</span></p>
              <p className="flex items-center font-light"><span className="text-primary mr-3">✓</span><span>Noise level: Quiet</span></p>
              <p className="flex items-center font-light"><span className="text-primary mr-3">✓</span><span>Plugs and power output: Yes</span></p>
              <p className="flex items-center font-light"><span className="text-primary mr-3">✓</span><span>On-site parking: 2</span></p>
              <p className="flex items-center font-light"><span className="text-primary mr-3">✓</span><span>Toilets available</span></p>
              <p className="flex items-center font-light"><span className="text-primary mr-3">✓</span><span>Wifi</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Location & Rules */}
      <section id="location" className="h-screen bg-secondary/10 flex items-center justify-center pb-32">
        <div className="text-center px-6 max-w-md w-full">
          <h2 className="text-[24px] md:text-[36px] font-serif mb-6 leading-tight">Location & Rules</h2>
          
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
          
          <p className="text-base mb-8 font-light">Walnut Tree Walk, Lambeth SE11 6DF</p>
          
          <div className="border-t border-gray-300 pt-6">
            <h3 className="font-medium mb-5 text-lg">House Rules</h3>
            <div className="text-left space-y-3 text-base font-light">
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
      </main>
    </div>
  );
}
