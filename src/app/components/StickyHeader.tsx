export default function StickyHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold">The Loft</h1>
        <button className="text-gray-600">
          ☰
        </button>
      </div>
    </header>
  );
}