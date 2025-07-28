export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Section 1: Hero */}
      <section className="h-screen bg-blue-50 flex items-center justify-center">
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
      <section className="h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Location & Rules</h2>
          <p className="text-gray-600">Google Maps + house rules go here</p>
        </div>
      </section>
    </div>
  );
}
