export default function Footer() {
  return (
    <footer className="bg-wood/10 py-12 px-6">
      <div className="text-center max-w-sm mx-auto">
        <h3 className="font-[family-name:var(--font-castoro)] text-xl mb-4 text-wood-dark">The Loft in Bedlam Mews</h3>
        <div className="text-base text-sage-dark mb-6 font-light leading-relaxed">
          <p>Walnut Tree Walk</p>
          <p>Lambeth</p>
          <p>SE11 6DF</p>
        </div>
        
        <div className="space-y-3 text-base">
          <a 
            href="mailto:hello@bedlammewsloft.com" 
            className="block text-sage hover:text-sage-dark transition-colors font-light"
          >
            Email
          </a>
          <a 
            href="https://wa.me/447700000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-sage hover:text-sage-dark transition-colors font-light"
          >
            WhatsApp
          </a>
          <a 
            href="https://instagram.com/bedlammewsloft" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-sage hover:text-sage-dark transition-colors font-light"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}