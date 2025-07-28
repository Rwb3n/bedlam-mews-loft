import StickyHeader from './components/StickyHeader';
import FloatingActions from './components/FloatingActions';

export default function Home() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <FloatingActions />
      
      {/* Section 1: Hero */}
      <section className="h-screen bg-blue-50 flex items-center justify-center pt-16">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold mb-4">Hero Section</h1>
          <p className="text-gray-600">Image slider + trust signals go here</p>
        </div>
      </section>

      {/* Section 2: Space Details */}
      <section className="h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Space Details</h2>
          <p className="text-gray-600">Features, use cases, description go here</p>
        </div>
      </section>

      {/* Section 3: Host & Availability */}
      <section className="h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Host & Availability</h2>
          <p className="text-gray-600">Elina profile + availability hours go here</p>
        </div>
      </section>

      {/* Section 4: Amenities */}
      <section className="h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Amenities</h2>
          <p className="text-gray-600">Features + amenities checklist go here</p>
        </div>
      </section>

      {/* Section 5: Location & Rules */}
      <section className="h-screen bg-orange-50 flex items-center justify-center pb-32">
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
          
          <p className="text-gray-600 text-sm">Walnut Tree Walk, Lambeth SE11 6DF</p>
        </div>
      </section>
    </div>
  );
}
