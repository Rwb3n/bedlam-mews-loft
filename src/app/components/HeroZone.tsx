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

  useEffect(() => {
    if (!backgroundRef.current || !chevronRef.current || !heroSectionRef.current) return;

    // Ken Burns Background Effect (90s single cycle)
    const kenBurnsTimeline = gsap.timeline({ repeat: 0 });
    kenBurnsTimeline.to(backgroundRef.current, {
      scale: 1.02,
      x: -10,
      y: -5,
      duration: 22.5,
      ease: "none"
    });
    kenBurnsTimeline.to(backgroundRef.current, {
      scale: 1.05,
      x: -20,
      y: -10,
      duration: 22.5,
      ease: "none"
    });
    kenBurnsTimeline.to(backgroundRef.current, {
      scale: 1.03,
      x: -15,
      y: -8,
      duration: 22.5,
      ease: "none"
    });
    kenBurnsTimeline.to(backgroundRef.current, {
      scale: 1.01,
      x: -5,
      y: -3,
      duration: 22.5,
      ease: "none"
    });

    // ChevronDown Clean Animation - After framing completes
    const chevronElement = chevronRef.current;
    
    // Set initial state
    gsap.set(chevronElement, {
      opacity: 0,
      filter: 'blur(8px)'
    });
    
    // DISABLED: Auto-framing animation - Moving to scroll-controlled
    // const framingTimeline = gsap.timeline({ delay: 3.0 });
    // ... auto-framing disabled for reorganization
    
    // ACT 1 Addition: Chevron entrance after text completes
    const chevronTimeline = gsap.timeline({ delay: 3.2 }); // After address completes
    
    // Elegant blur focus + fade in
    chevronTimeline.to(chevronElement, {
      opacity: 0.8,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    });
    
    // Gentle bounce system - starts after entrance completes
    let bounceCount = 0;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    
    const gentleBounce = () => {
      if (bounceCount >= 6 || isScrolling) return; // Max 6 cycles
      
      gsap.to(chevronElement, {
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
    
    // Start gentle bounce after entrance completes
    setTimeout(gentleBounce, 4000); // 3.2s + 0.8s entrance
    
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
      
      if (heroSectionRef.current) {
        // KEY 1: Framing (Visual only - no layout impact)
        const borderRadius = progress * 1; // 0rem → 1rem
        
        // KEY 2: Scaling (Size transformation) - Mobile optimized
        const scaleAmount = isMobile ? 0.025 : 0.05; // Mobile: 2.5% vs Desktop: 5%
        const scale = 1 - (progress * scaleAmount);
        
        // KEY 3: Recession (Spatial movement) - Mobile optimized
        const translateZAmount = isMobile ? 25 : 50; // Mobile: -25px vs Desktop: -50px
        const translateYAmount = isMobile ? 75 : 150; // Mobile: -75px (-50%) vs Desktop: -150px
        const opacityAmount = isMobile ? 0.1 : 0.15; // Mobile: 0.9 vs Desktop: 0.85
        
        const translateZ = -(progress * translateZAmount);
        const translateY = -(progress * translateYAmount);
        const opacity = 1 - (progress * opacityAmount);
        
        // Apply all 3 keys in coordinated transformation
        gsap.set(heroSectionRef.current, {
          borderRadius: `${borderRadius}rem`,
          scale: scale,
          z: translateZ,
          y: translateY,
          opacity: opacity,
          transformOrigin: 'center center',
          force3D: true
        });
      }
    };

    // Handler for smooth scroll events
    const handleSmoothScroll = (event: Event) => {
      const customEvent = event as CustomEvent;
      const scrollY = customEvent.detail?.scrollTop ?? window.scrollY;
      updateHeroTransformation(scrollY);
    };

    // Handler for regular scroll events (fallback)
    const handleRegularScroll = () => {
      updateHeroTransformation(window.scrollY);
    };
    
    // Listen to smooth scroll events instead of raw scroll
    window.addEventListener('smoothScroll', handleSmoothScroll, { passive: true });
    // Fallback to regular scroll for initial state or if ScrollSmoother isn't ready
    window.addEventListener('scroll', handleRegularScroll, { passive: true });

    // Cleanup - Act 1 + Chevron + Act 2
    return () => {
      kenBurnsTimeline.kill();
      chevronTimeline.kill();
      gsap.killTweensOf(chevronElement);
      window.removeEventListener('scroll', handleScrollPause);
      window.removeEventListener('smoothScroll', handleSmoothScroll);
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
        {/* Background Image Layer with Ken Burns */}
        <Image
          ref={backgroundRef}
          src="/img/studio/studio-placehold.png"
          alt="Bedlam Mews Loft - Creative Space"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        
        {/* Content Overlay Layer */}
        <div className="absolute inset-0 flex flex-col justify-between items-center text-white py-14 sm:py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-20">
          {/* Spacer */}
          <div></div>
          
          {/* Main Content with SplitText Animations */}
          <div className="text-center px-6 max-w-2xl lg:max-w-4xl w-full space-y-2 xl:space-y-4">
            {/* Main Title - Character by Character (starts 0.3s) */}
            <div className="title-container">
              <SplitText
                text="Bedlam Mews Loft"
                className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[86px] xl:text-[86px] 2xl:text-[96px] font-serif leading-tight"
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
            
            {/* Subtitle - Word by Word (starts 1.4s) */}
            <div className="subtitle-container">
              <SplitText
                text="Rehearsal Space for hire in the heart of London"
                className="text-[20px] sm:text-[28px] md:text-[36px] lg:text-[43px] xl:text-[43px] 2xl:text-[48px] font-sans leading-tight"
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
            
            {/* Address - Single Unit (starts 2.6s) */}
            <div 
              className="address-container text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-light opacity-0"
              style={{
                animation: 'fadeInUp 0.5s ease-out 2.6s forwards'
              }}
            >
              Bedlam Mews, North Lambeth, SE11 6DF
            </div>
          </div>
          
          {/* Scroll Indicator with Smart Bounce */}
          <ChevronDown 
            ref={chevronRef}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-19 xl:h-19 2xl:w-26 2xl:h-26 text-white/80" 
            aria-label="Scroll down"
          />
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