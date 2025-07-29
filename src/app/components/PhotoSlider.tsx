'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { X } from "lucide-react";

interface PhotoSliderProps {
  title: string;
  height?: string;
  showDots?: boolean;
}

export default function PhotoSlider({ title, height = "h-64", showDots = false }: PhotoSliderProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  
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

  const handleImageClick = (index: number) => {
    setModalImageIndex(index)
    setModalOpen(true)
  }

  return (
    <div className="w-full">
      <div className={`${height === "h-64" ? "" : height} overflow-hidden relative`}>
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {placeholderImages.map((image, index) => (
              <CarouselItem key={image.id}>
                <div 
                  className="relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority={false}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        
        {showDots && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-3">
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

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl w-full h-full max-h-screen p-0 bg-black/90">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Modal Image */}
            <div className="relative max-w-full max-h-full">
              <Image
                src={placeholderImages[modalImageIndex].src}
                alt={placeholderImages[modalImageIndex].alt}
                width={1200}
                height={900}
                className="max-w-full max-h-full object-contain"
                priority
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}