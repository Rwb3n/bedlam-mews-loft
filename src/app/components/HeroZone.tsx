'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { EasePack } from 'gsap/EasePack';
import { useSecondaryElementAnimation } from '@/app/hooks/useSecondaryElementAnimation';
import SplitText from './SplitText';

// Register EasePack for expoScale, slow, rough eases
gsap.registerPlugin(EasePack);

export default function HeroZone() {
  const chevronRef = useRef<HTMLButtonElement>(null);
  const innerChevronRef = useRef<SVGSVGElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Secondary element animation for chevron press feedback
  const chevronAnimationRef = useSecondaryElementAnimation<HTMLButtonElement>();
  
  // Callback ref to set both refs on the same element
  const setChevronRefs = useCallback((node: HTMLButtonElement | null) => {
    chevronRef.current = node;
    chevronAnimationRef.current = node;
  }, []);

  useEffect(() => {
    if (!imageRef.current || !chevronRef.current || !innerChevronRef.current || !heroSectionRef.current || !contentRef.current) return;

    // Set initial clean state for image and content (prevent any residual transforms)
    gsap.set(imageRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      z: 0,
      opacity: 1,
      transformOrigin: 'center center',
      force3D: true,
      clearProps: 'all'
    });

    gsap.set(contentRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      z: 0,
      opacity: 1,
      transformOrigin: 'center center',
      force3D: true,
      clearProps: 'all'
    });


    // ACT 1: Chevron Entrance Animation
    const chevronElement = chevronRef.current;
    const innerChevronElement = innerChevronRef.current;
    
    // Set initial hidden state for container
    gsap.set(chevronElement, {
      opacity: 0,
      filter: 'blur(8px)'
    });
    
    // KEY 1: Chevron blur-in entrance (starts 3.0s)
    const chevronTimeline = gsap.timeline({ delay: 3.0 });
    chevronTimeline.to(chevronElement, {
      opacity: 0.8,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    });
    
    // KEY 2: Chevron bouncing animation (starts after entrance)
    let bounceCount = 0;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    
    const gentleBounce = () => {
      if (bounceCount >= 6 || isScrolling) return; // Max 6 cycles
      
      gsap.to(innerChevronElement, {
        y: 6,
        duration: 1.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          bounceCount++;
          setTimeout(gentleBounce, 300); // 300ms pause between bounces
        }
      });
    };
    
    // Start bouncing after entrance completes
    setTimeout(gentleBounce, 3800); // 3.0s + 0.8s entrance
    
    // Pause bouncing during scroll
    const handleScrollPause = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };
    
    window.addEventListener('scroll', handleScrollPause, { passive: true });

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
        if (imageRef.current) {
          gsap.set(imageRef.current, {
            borderRadius: '0rem',
            scale: 1,
            y: 0,
            z: 0,
            opacity: 1,
            transformOrigin: 'center center',
            force3D: true
          });
        }
        if (contentRef.current) {
          gsap.set(contentRef.current, {
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
      
      // KEY 1: Framing - Image only (border-radius)
      // KEY 2 & 3: Visual transforms - Image and Content (identical spatial movement)
      
      // Calculate shared transform values
      const scaleAmount = isMobile ? 0.025 : 0.05; // Mobile: 2.5% vs Desktop: 5%
      const scale = 1 - (progress * scaleAmount);
      
      const translateZAmount = 50; // Both: -50px
      const translateYAmount = isMobile ? 112.5 : 150; // Mobile: -112.5px vs Desktop: -150px
      const opacityAmount = isMobile ? 0.1 : 0.15; // Mobile: 0.9 vs Desktop: 0.85
      
      const translateZ = -(progress * translateZAmount);
      const translateY = -(progress * translateYAmount);
      const opacity = 1 - (progress * opacityAmount);
      
      // Apply transforms to image (with border-radius)
      if (imageRef.current) {
        const borderRadius = progress * 1.5; // 0rem → 1.5rem
        gsap.set(imageRef.current, {
          borderRadius: `${borderRadius}rem`,
          scale: scale,
          z: translateZ,
          y: translateY,
          opacity: opacity,
          transformOrigin: 'center center',
          force3D: true
        });
      }
      
      // Apply identical spatial transforms to content
      if (contentRef.current) {
        gsap.set(contentRef.current, {
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

    // Cleanup
    return () => {
      chevronTimeline.kill();
      gsap.killTweensOf(chevronElement);
      gsap.killTweensOf(innerChevronElement);
      gsap.killTweensOf(imageRef.current);
      gsap.killTweensOf(contentRef.current);
      gsap.killTweensOf(heroSectionRef.current);
      window.removeEventListener('scroll', handleScrollPause);
      window.removeEventListener('scroll', handleRegularScroll);
      clearTimeout(scrollTimeout);
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
        {/* Background Image Layer */}
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
        <div 
          ref={contentRef}
          className="absolute inset-0 flex flex-col justify-center items-center text-foreground py-14 sm:py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-20"
        >
          
          {/* Main Content with SplitText Animations */}
          <div className="text-center px-6 max-w-2xl lg:max-w-4xl w-full space-y-2 xl:space-y-4">
            {/* Main Title - Character by Character (starts 0.3s) */}
            <div className="title-container">
              <SplitText
                text="Bedlam Mews Loft"
                className="text-[36px] sm:text-[52px] md:text-[68px] lg:text-[80px] xl:text-[80px] 2xl:text-[88px] font-serif leading-tight"
                splitType="chars"
                delay={60}
                duration={0.8}
                ease="power3.out"
                from={{ opacity: 0, y: 40, rotationX: 90 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
                trigger="immediate"
                startDelay={0.3}
                textAlign="center"
              />
            </div>
            
            {/* Subtitle Line 1 - Word by Word (starts 1.4s) */}
            <div className="subtitle-container">
              <SplitText
                text="Rehearsal Space for hire"
                className="text-[27px] sm:text-[31px] md:text-[40px] lg:text-[43px] xl:text-[43px] 2xl:text-[48px] font-sans leading-tight"
                splitType="words"
                delay={120}
                duration={0.6}
                ease="power2.out"
                from={{ opacity: 0, y: 30, scale: 0.8 }}
                to={{ opacity: 1, y: 0, scale: 1.0 }}
                trigger="immediate"
                startDelay={1.4}
                textAlign="center"
              />
            </div>
            
            {/* Subtitle Line 2 - Word by Word (starts 1.8s) */}
            <div className="subtitle-container">
              <SplitText
                text="in the heart of London"
                className="text-[20px] sm:text-[28px] md:text-[36px] lg:text-[43px] xl:text-[43px] 2xl:text-[48px] font-sans leading-tight"
                splitType="words"
                delay={120}
                duration={0.6}
                ease="power2.out"
                from={{ opacity: 0, y: 30, scale: 0.8 }}
                to={{ opacity: 1, y: 0, scale: 1.0 }}
                trigger="immediate"
                startDelay={1.8}
                textAlign="center"
              />
            </div>
            
            {/* Address - Single Unit (starts 2.6s) */}
            <div 
              className="address-container text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-light opacity-0"
              style={{
                animation: 'fadeInUp 0.5s ease-out 2.6s forwards'
              }}
            >
              <span className="whitespace-nowrap">Bedlam Mews, North Lambeth,</span> <span className="whitespace-nowrap">SE11 6DF</span>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="mt-8 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-20 2xl:mt-20">
            <button 
              ref={setChevronRefs}
              onClick={() => {
                const detailsSection = document.getElementById('details');
                if (detailsSection) {
                  detailsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-19 xl:h-19 2xl:w-26 2xl:h-26 bg-primary hover:bg-primary/90 transition-colors duration-200 cursor-pointer rounded-full flex items-center justify-center"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(232, 93, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              aria-label="Scroll to Space Details section"
            >
              <ChevronDown 
                ref={innerChevronRef}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-13 2xl:h-13 text-primary-foreground" 
              />
            </button>
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