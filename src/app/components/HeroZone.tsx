'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { EasePack } from 'gsap/EasePack';
import SplitText from './SplitText';

// Register EasePack for expoScale, slow, rough eases
gsap.registerPlugin(EasePack);
// import DesktopTitle from './DesktopTitle'; // Disabled for grid migration

export default function HeroZone() {
  const backgroundRef = useRef<HTMLImageElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current || !chevronRef.current || !heroSectionRef.current) return;

    // Set initial clean state for image (prevent any residual transforms)
    gsap.set(imageRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      z: 0,
      opacity: 1,
      transformOrigin: 'center center',
      force3D: true,
      clearProps: 'all' // Clear any existing properties
    });

    // Ken Burns Background Effect (90s single cycle) - DISABLED
    // const kenBurnsTimeline = gsap.timeline({ repeat: 0 });
    // kenBurnsTimeline.to(imageRef.current, {
    //   scale: 1.02,
    //   x: -10,
    //   y: -5,
    //   duration: 22.5,
    //   ease: "none"
    // });
    // kenBurnsTimeline.to(imageRef.current, {
    //   scale: 1.05,
    //   x: -20,
    //   y: -10,
    //   duration: 22.5,
    //   ease: "none"
    // });
    // kenBurnsTimeline.to(imageRef.current, {
    //   scale: 1.03,
    //   x: -15,
    //   y: -8,
    //   duration: 22.5,
    //   ease: "none"
    // });
    // kenBurnsTimeline.to(imageRef.current, {
    //   scale: 1.01,
    //   x: -5,
    //   y: -3,
    //   duration: 22.5,
    //   ease: "none"
    // });

    // DISABLED: ChevronDown Clean Animation - For debugging transforms
    const chevronElement = chevronRef.current;
    
    // Set chevron to visible state (no animation)
    gsap.set(chevronElement, {
      opacity: 0.8,
      filter: 'blur(0px)'
    });
    
    // DISABLED: All chevron animations for debugging
    // const chevronTimeline = gsap.timeline({ delay: 3.2 });
    // ... chevron animations disabled for debugging

    // Create responsive ease functions (mobile-optimized)
    let customEase, baseEase;
    const isMobile = window.innerWidth < 768; // md breakpoint
    
    try {
      if (isMobile) {
        // Gentler easing for mobile touch scrolling
        customEase = gsap.parseEase("power2.out");
        baseEase = null; // Single ease for mobile
      } else {
        // More dramatic easing for desktop mouse/scrollbar
        customEase = gsap.parseEase("expoScale(0.5,7)");
        baseEase = gsap.parseEase("power1.in");
      }
    } catch (error) {
      console.warn("Failed to create custom ease, falling back to sine.out:", error);
      customEase = gsap.parseEase("sine.out");
      baseEase = null;
    }

    // ACT 2: User-Controlled Hero Transformation (3 Keys)
    const updateHeroTransformation = (scrollY: number) => {
      // Step 1: Explicit reset at scroll zero
      if (scrollY === 0) {
        if (heroSectionRef.current) {
          gsap.set(heroSectionRef.current, {
            borderRadius: '0rem'
          });
        }
        if (imageRef.current) {
          gsap.set(imageRef.current, {
            scale: 1,
            y: 0,
            z: 0,
            opacity: 1,
            transformOrigin: 'center center',
            force3D: true
          });
        }
        return;
      }

      const maxScroll = 400; // 0-400px scroll range
      const rawProgress = Math.min(scrollY / maxScroll, 1); // 0-1 raw progress
      
      // Apply compound easing if available, otherwise fallback
      let progress;
      if (baseEase && customEase) {
        progress = customEase(baseEase(rawProgress));
      } else if (customEase) {
        progress = customEase(rawProgress);
      } else {
        progress = rawProgress; // Fallback to linear if no easing available
      }
      
      // KEY 1: Framing (Visual only - no layout impact) - Container only
      if (heroSectionRef.current) {
        const borderRadius = progress * 1; // 0rem → 1rem
        gsap.set(heroSectionRef.current, {
          borderRadius: `${borderRadius}rem`
        });
      }
      
      // KEY 2 & 3: Visual transforms - Image only
      if (imageRef.current) {
        // KEY 2: Scaling (Size transformation) - Mobile optimized
        const scaleAmount = isMobile ? 0.025 : 0.05; // Mobile: 2.5% vs Desktop: 5%
        const scale = 1 - (progress * scaleAmount);
        
        // KEY 3: Recession (Spatial movement) - Mobile optimized
        const translateZAmount = 50; // Both: -50px
        const translateYAmount = isMobile ? 112.5 : 150; // Mobile: -112.5px (+50% from -75px) vs Desktop: -150px
        const opacityAmount = isMobile ? 0.1 : 0.15; // Mobile: 0.9 vs Desktop: 0.85
        
        const translateZ = -(progress * translateZAmount);
        const translateY = -(progress * translateYAmount);
        const opacity = 1 - (progress * opacityAmount);
        
        // Apply visual transforms to image
        gsap.set(imageRef.current, {
          scale: scale,
          z: translateZ,
          y: translateY,
          opacity: opacity,
          transformOrigin: 'center center',
          force3D: true
        });
      }
    };

    // Throttled handler for regular scroll events
    let scrollTicking = false;
    const handleRegularScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          updateHeroTransformation(window.scrollY);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };
    
    // Listen to regular scroll events
    window.addEventListener('scroll', handleRegularScroll, { passive: true });

    // Cleanup - Act 2 only (Act 1 disabled for debugging)
    return () => {
      // kenBurnsTimeline.kill(); // DISABLED
      // chevronTimeline.kill(); // DISABLED
      gsap.killTweensOf(chevronElement);
      gsap.killTweensOf(imageRef.current); // Kill any transforms on image
      gsap.killTweensOf(heroSectionRef.current); // Kill any transforms on container
      // window.removeEventListener('scroll', handleScrollPause); // DISABLED
      window.removeEventListener('scroll', handleRegularScroll);
      // clearTimeout(scrollTimeout); // DISABLED
    };
  }, []);

  return (
    // Hero Container - starts full screen, animates to framed
    <div className="w-full" id="hero-container">
      <section 
        ref={heroSectionRef}
        className="relative w-full h-screen overflow-hidden"
        id="hero"
      >
        {/* Background Image Layer with Ken Burns */}
        <Image
          ref={imageRef}
          src="/img/studio/studio-placehold.png"
          alt="Bedlam Mews Loft - Creative Space"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        
        {/* Content Overlay Layer */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white py-14 sm:py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-20">
          
          {/* Main Content with SplitText Animations */}
          <div className="text-center px-6 max-w-2xl lg:max-w-4xl w-full space-y-2 xl:space-y-4">
            {/* DISABLED: Main Title - Static for debugging */}
            <div className="title-container">
              <h1 className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[86px] xl:text-[86px] 2xl:text-[96px] font-serif leading-tight">
                Bedlam Mews Loft
              </h1>
            </div>
            
            {/* DISABLED: Subtitle - Static for debugging */}
            <div className="subtitle-container">
              <h2 className="text-[20px] sm:text-[28px] md:text-[36px] lg:text-[43px] xl:text-[43px] 2xl:text-[48px] font-sans leading-tight">
                Rehearsal Space for hire in the heart of London
              </h2>
            </div>
            
            {/* DISABLED: Address - Static for debugging */}
            <div className="address-container text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-light">
              Bedlam Mews, North Lambeth, SE11 6DF
            </div>
          </div>
          
          {/* Scroll Indicator with Smart Bounce - Halved distance from address */}
          <div className="mt-8 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-20 2xl:mt-20">
            <ChevronDown 
              ref={chevronRef}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-19 xl:h-19 2xl:w-26 2xl:h-26 text-white/80" 
              aria-label="Scroll down"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// CSS for address fade-in animation
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}