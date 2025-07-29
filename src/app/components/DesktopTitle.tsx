'use client';

export default function DesktopTitle() {
  const scrollToHero = () => {
    const element = document.getElementById('hero');
    if (element) {
      const elementPosition = element.offsetTop;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="hidden lg:block fixed right-0 top-0 h-16 w-[27rem] z-40">
      <div className="pt-6 pl-0 pr-6 flex justify-center">
        <h1 
          className="text-3xl font-serif text-foreground cursor-pointer hover:opacity-80 transition-opacity"
          onClick={scrollToHero}
        >
          Bedlam Mews Loft
        </h1>
      </div>
    </nav>
  );
}