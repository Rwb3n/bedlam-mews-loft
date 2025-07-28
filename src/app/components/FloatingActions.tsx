export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 flex flex-col gap-2">
      {/* Book Now - Primary CTA */}
      <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium text-center">
        Book Now
      </button>
      
      {/* Secondary Actions */}
      <div className="flex gap-2">
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm flex-1">
          message host
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm flex-1">
          share with friend
        </button>
      </div>
      
      {/* Pricing Display */}
      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm text-center">
        spaces available £30/hour
      </div>
    </div>
  );
}