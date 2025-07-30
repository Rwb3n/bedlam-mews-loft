'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
// import DesktopTitle from './DesktopTitle'; // Disabled for grid migration

export default function HeroZone() {
  return (
    <section 
      className="relative w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[5/2] overflow-hidden"
      id="hero"
    >
      {/* Background Image Layer */}
      <Image
        src="/img/studio/studio-placehold.png"
        alt="Bedlam Mews Loft - Creative Space"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />
      
      {/* Content Overlay Layer */}
      <div className="absolute inset-0 flex flex-col justify-between items-center text-white py-4 lg:py-16 xl:py-20">
        {/* Spacer */}
        <div></div>
        
        {/* Main Content */}
        <div className="text-center px-6 max-w-2xl lg:max-w-4xl w-full space-y-2 xl:space-y-4">
          <h1 className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[86px] xl:text-[86px] 2xl:text-[96px] font-serif leading-tight">
            Bedlam Mews Loft
          </h1>
          <h2 className="text-[20px] sm:text-[28px] md:text-[36px] lg:text-[43px] xl:text-[43px] 2xl:text-[48px] font-sans leading-tight">
            Rehearsal Space for hire<br />in the heart of London
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-light">
            Bedlam Mews, North Lambeth, SE11 6DF
          </p>
        </div>
        
        {/* Scroll Indicator */}
        <ChevronDown 
          className="w-8 h-8 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 text-white/80 animate-bounce" 
          aria-label="Scroll down"
        />
      </div>
    </section>
  );
}