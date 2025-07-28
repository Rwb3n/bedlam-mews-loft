export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 flex flex-col gap-2">
      {/* Book Now - Primary CTA */}
      <a 
        href="https://calendly.com/neonroobz" 
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sage text-white px-8 py-4 rounded-full font-medium text-center block text-lg hover:bg-sage-dark transition-colors shadow-lg"
      >
        Book Now
      </a>
      
      {/* Secondary Actions */}
      <div className="flex gap-2">
        <a 
          href="https://wa.me/447700000000?text=Hi%20I%27m%20interested%20in%20booking%20The%20Loft" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-warm-white border border-sage/30 text-sage-dark px-4 py-3 rounded-full text-sm flex-1 text-center block hover:bg-sage/10 transition-colors font-light"
        >
          message host
        </a>
        <button className="bg-warm-white border border-sage/30 text-sage-dark px-4 py-3 rounded-full text-sm flex-1 hover:bg-sage/10 transition-colors font-light">
          share with friend
        </button>
      </div>
      
      {/* Pricing Display */}
      <div className="bg-accent/20 text-wood-dark px-6 py-3 rounded-full text-base text-center font-medium">
        slots available £30/hour
      </div>
    </div>
  );
}