import StickyHeader from './components/StickyHeader';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <FloatingActions />
      
      {/* Section 1: Hero */}
      <section id="hero" className="h-screen bg-blue-50 flex items-center justify-center pt-16">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold mb-2">Rehearsal Space in the heart of London</h1>
          <p className="text-lg text-gray-700 mb-6">Bedlam Mews</p>
          
          <div className="space-y-2 text-sm">
            <p className="font-medium">Book with confidence:</p>
            <div className="space-y-1">
              <p className="flex items-center justify-center">
                <span className="text-green-600 mr-2">✓</span>
                Direct contact with the host
              </p>
              <p className="flex items-center justify-center">
                <span className="text-green-600 mr-2">✓</span>
                Cancel if needed
              </p>
              <p className="flex items-center justify-center">
                <span className="text-yellow-500 mr-2">⭐</span>
                Fast & Secure payments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Space Details */}
      <section id="details" className="h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Your Creative Space in Bedlam Mews</h2>
          <p className="text-sm text-gray-700 mb-6">
            This well-lit and versatile creative studio is perfect for rehearsals, classes, workshops, 
            meetup events, and photo or film shoots.
          </p>
          
          <div className="text-left space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What You&apos;ll Find:</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Exposed brick walls and wooden floors</li>
                <li>• Large windows for natural light</li>
                <li>• Open-plan layout accommodating 20+ people</li>
                <li>• Basic seating and tables available upon request</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Perfect For:</h3>
              <ul className="text-sm space-y-1 text-gray-700">
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
      <section id="host" className="h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center px-4 max-w-sm">
          <h2 className="text-2xl font-bold mb-6">Location Host</h2>
          
          <div className="mb-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Photo</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Elina</h3>
            <p className="text-sm text-gray-600 mb-3">(replies in one hour)</p>
            
            <a 
              href="https://wa.me/447700000000?text=Hi%20I%27m%20interested%20in%20booking%20The%20Loft" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
            >
              message host
            </a>
          </div>
          
          <div className="border-t border-gray-300 pt-6">
            <h3 className="font-semibold mb-2">Availability</h3>
            <p className="text-sm text-gray-700">9:00 - 18:00 Mondays to Sundays</p>
          </div>
        </div>
      </section>

      {/* Section 4: Amenities */}
      <section id="amenities" className="h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center px-4 max-w-sm">
          <h2 className="text-2xl font-bold mb-6">Features & Amenities</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Features</h3>
            <div className="flex gap-2 justify-center">
              <span className="bg-white px-3 py-1 rounded-full text-sm border">Bathroom</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm border">Kitchen</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm border">Blackout</span>
            </div>
          </div>
          
          <div className="border-t border-gray-300 pt-6">
            <h3 className="font-semibold mb-4">Amenities</h3>
            <div className="text-left space-y-2 text-sm">
              <p className="flex items-center"><span className="text-green-600 mr-2">✓</span>Entrance size: 2m</p>
              <p className="flex items-center"><span className="text-green-600 mr-2">✓</span>Space Size: 44Sqm</p>
              <p className="flex items-center"><span className="text-green-600 mr-2">✓</span>Noise level: Quiet</p>
              <p className="flex items-center"><span className="text-green-600 mr-2">✓</span>Plugs and power output: Yes</p>
              <p className="flex items-center"><span className="text-green-600 mr-2">✓</span>On-site parking: 2</p>
              <p className="flex items-center"><span className="text-green-600 mr-2">✓</span>Toilets available</p>
              <p className="flex items-center"><span className="text-green-600 mr-2">✓</span>Wifi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Location & Rules */}
      <section id="location" className="h-screen bg-orange-50 flex items-center justify-center pb-32">
        <div className="text-center px-4 max-w-md w-full">
          <h2 className="text-3xl font-bold mb-4">Location & Rules</h2>
          
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
          
          <p className="text-gray-600 text-sm mb-6">Walnut Tree Walk, Lambeth SE11 6DF</p>
          
          <div className="border-t border-gray-300 pt-6">
            <h3 className="font-semibold mb-4">House Rules</h3>
            <div className="text-left space-y-2 text-sm text-gray-700">
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
