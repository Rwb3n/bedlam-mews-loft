export default function Footer() {
  return (
    <footer className="bg-secondary py-12 px-6">
      <div className="text-center max-w-sm mx-auto">
        <h3 className="font-serif text-2xl mb-4">The Loft in Bedlam Mews</h3>
        <div className="text-lg mb-6 font-light leading-relaxed">
          <p>Walnut Tree Walk</p>
          <p>Lambeth</p>
          <p>SE11 6DF</p>
        </div>
        
        <div className="space-y-3 text-lg">
          <a 
            href="mailto:hello@bedlammewsloft.com" 
            className="block text-primary hover:text-primary/80 transition-colors font-light"
          >
            Email
          </a>
          <a 
            href="https://wa.me/447700000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-primary hover:text-primary/80 transition-colors font-light"
          >
            WhatsApp
          </a>
          <a 
            href="https://instagram.com/bedlammewsloft" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-primary hover:text-primary/80 transition-colors font-light"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}