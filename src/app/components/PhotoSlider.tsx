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
  // Placeholder images - will be replaced with real photos
  const placeholderImage = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  
  const placeholderImages = [
    { id: 1, alt: `${title} - View 1`, src: placeholderImage },
    { id: 2, alt: `${title} - View 2`, src: placeholderImage },
    { id: 3, alt: `${title} - View 3`, src: placeholderImage },
    { id: 4, alt: `${title} - View 4`, src: placeholderImage }
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