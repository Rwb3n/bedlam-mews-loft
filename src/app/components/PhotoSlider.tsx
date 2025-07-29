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
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [imageLoading, setImageLoading] = useState(false)
  
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

  const handlePrevImage = () => {
    setImageLoading(true)
    setModalImageIndex((prev) => 
      prev === 0 ? placeholderImages.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setImageLoading(true)
    setModalImageIndex((prev) => 
      prev === placeholderImages.length - 1 ? 0 : prev + 1
    )
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!modalOpen) return
      
      switch (event.key) {
        case 'ArrowLeft':
          handlePrevImage()
          break
        case 'ArrowRight':
          handleNextImage()
          break
        case 'Escape':
          setModalOpen(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen])

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      handleNextImage()
    } else if (isRightSwipe) {
      handlePrevImage()
    }
    
    setTouchStart(null)
    setTouchEnd(null)
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
        <DialogContent className="!max-w-[95vw] !w-[95vw] !h-[95vh] p-0 bg-secondary/95 backdrop-blur-sm border-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {placeholderImages[modalImageIndex]?.alt || 'Image viewer'}
          </DialogTitle>
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Previous Button - Hidden on mobile (swipe instead) */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors hidden sm:block"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            
            {/* Next Button - Hidden on mobile (swipe instead) */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors hidden sm:block"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
            
            {/* Modal Image */}
            <div className="relative max-w-full max-h-full">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={placeholderImages[modalImageIndex].src}
                alt={placeholderImages[modalImageIndex].alt}
                width={1200}
                height={900}
                className="max-w-full max-h-full object-contain"
                priority
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
            </div>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-4 py-2">
              <span className="text-white text-sm">
                {modalImageIndex + 1} of {placeholderImages.length}
              </span>
              <span className="text-white/60 text-xs ml-2 sm:hidden">• Swipe to navigate</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}