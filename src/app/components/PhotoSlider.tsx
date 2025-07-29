'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface PhotoSliderProps {
  title: string;
  height?: string;
}

export default function PhotoSlider({ title, height = "h-64" }: PhotoSliderProps) {
  // Local studio image for all slides
  const studioImage = "/img/studio/studio-placehold.png";
  
  const placeholderImages = [
    { id: 1, alt: `${title} - View 1`, src: studioImage },
    { id: 2, alt: `${title} - View 2`, src: studioImage },
    { id: 3, alt: `${title} - View 3`, src: studioImage },
    { id: 4, alt: `${title} - View 4`, src: studioImage }
  ];

  return (
    <div className={`${height} mb-6 overflow-hidden`}>
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {placeholderImages.map((image) => (
            <CarouselItem key={image.id} className="h-full">
              <div className="h-full relative overflow-hidden rounded-lg">
                <Image 
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}