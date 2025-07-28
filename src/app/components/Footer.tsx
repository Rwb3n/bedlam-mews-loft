export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="text-center max-w-sm mx-auto">
        <h3 className="font-bold text-lg mb-2">The Loft in Bedlam Mews</h3>
        <div className="text-sm text-gray-700 mb-4">
          <p>Walnut Tree Walk</p>
          <p>Lambeth</p>
          <p>SE11 6DF</p>
        </div>
        
        <div className="space-y-2 text-sm">
          <a 
            href="mailto:hello@bedlammewsloft.com" 
            className="block text-blue-600 hover:underline"
          >
            Email
          </a>
          <a 
            href="https://wa.me/447700000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-blue-600 hover:underline"
          >
            WhatsApp
          </a>
          <a 
            href="https://instagram.com/bedlammewsloft" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-blue-600 hover:underline"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}