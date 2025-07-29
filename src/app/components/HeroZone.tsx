'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import DesktopTitle from './DesktopTitle';

export default function HeroZone() {
  return (
    <div className="relative w-full">
      {/* Full-width hero image - clean implementation */}
      <div className="w-full aspect-[5/2] overflow-hidden">
        <Image
          src="/img/studio/studio-placehold.png"
          alt="Bedlam Mews Loft - Creative Space"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      
      {/* Desktop title floats over hero */}
      <DesktopTitle />
      
      {/* Hero content overlay */}
      <div className="absolute inset-0">
        {/* Text content block - centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-2xl lg:max-w-4xl w-full text-white">
            <h1 className="text-[32px] md:text-[56px] font-serif mb-2 leading-tight">
              Rehearsal Space for hire<br />in the heart of London
            </h1>
            <p className="text-xl md:text-2xl mb-6 font-light">Bedlam Mews, North Lambeth, SE11 6DF</p>
          </div>
        </div>
        
        {/* Chevron block - positioned at bottom */}
        <div className="absolute bottom-4 lg:bottom-16 left-0 right-0 flex justify-center">
          <ChevronDown className="w-6 h-6 lg:w-16 lg:h-16 text-white/80 animate-bounce" />
        </div>
      </div>
    </div>
  );
}