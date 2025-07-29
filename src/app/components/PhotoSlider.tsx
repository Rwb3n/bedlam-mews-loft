'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface PhotoSliderProps {
  title: string;
  height?: string;
  showDots?: boolean;
}

export default function PhotoSlider({ title, height = "h-64", showDots = false }: PhotoSliderProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  
  // Local studio image for all slides
  const studioImage = "/img/studio/studio-placehold.png"
  
  const placeholderImages = [
    { id: 1, alt: `${title} - View 1`, src: studioImage },
    { id: 2, alt: `${title} - View 2`, src: studioImage },
    { id: 3, alt: `${title} - View 3`, src: studioImage },
    { id: 4, alt: `${title} - View 4`, src: studioImage }
  ]

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full">
      <div className={`${height} mb-4 overflow-hidden`}>
        <Carousel className="w-full h-full" setApi={setApi}>
          <CarouselContent className="h-full">
            {placeholderImages.map((image) => (
              <CarouselItem key={image.id} className="h-full">
                <div className="h-full relative overflow-hidden rounded-lg">
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    priority={false}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
      
      {showDots && (
        <div className="flex justify-center items-center gap-3 py-2 mb-2">
          {placeholderImages.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-200 border-2 shadow-sm ${
                index === current 
                  ? 'bg-gray-800 border-gray-800 scale-110' 
                  : 'bg-white border-gray-400 hover:border-gray-600 hover:scale-105'
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}