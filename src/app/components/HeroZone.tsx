'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitText from './SplitText';
// import DesktopTitle from './DesktopTitle'; // Disabled for grid migration

export default function HeroZone() {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !backgroundRef.current || !chevronRef.current || !heroSectionRef.current) return;
    
    const heroContainer = heroRef.current;
    const heroSection = heroSectionRef.current;

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

    // ACT 2: User-Controlled Hero Transformation (2 Keys)
    const handleHeroTransformation = () => {
      const scrollY = window.scrollY;
      const maxScroll = 400; // 0-400px scroll range
      const rawProgress = Math.min(scrollY / maxScroll, 1); // 0-1 raw progress
      const progress = gsap.parseEase("power2.out")(rawProgress); // Easing applied
      
      // KEY 1: Framing (3 steps)
      if (heroRef.current && heroSectionRef.current) {
        // Step 1: Responsive Padding
        const screenWidth = window.innerWidth;
        let maxPadding = 1; // rem - Mobile default
        let maxHeight = 95; // vh - Mobile gets more height
        
        if (screenWidth >= 768) {
          maxPadding = 1.5; // md+
          maxHeight = 92; // Tablet slightly less
        }
        if (screenWidth >= 1024) {
          maxPadding = 2; // lg+
          maxHeight = 90; // Desktop least height
        }
        
        const currentPadding = progress * maxPadding; // 0rem → maxPadding
        const currentBorderRadius = progress * 1; // 0rem → 1rem
        const currentHeight = 100 - (progress * (100 - maxHeight)); // 100vh → responsive vh
        
        // Apply Key 1 transformations
        gsap.set(heroRef.current, {
          padding: `${currentPadding}rem`,
          transformOrigin: 'center center'
        });
        
        gsap.set(heroSectionRef.current, {
          borderRadius: `${currentBorderRadius}rem`,
          height: `${currentHeight}vh`,
          transformOrigin: 'center center'
        });
      }
      
      // KEY 2: Recession (5 steps)
      if (heroSectionRef.current) {
        // Step 1: TranslateZ - moves back in 3D space
        const translateZ = -(progress * 50); // 0px → -50px (moves back)
        
        // Step 2: TranslateY - flushed up out of screen  
        const translateY = -(progress * 300); // 0px → -300px (up/away)
        
        // Step 3: Scale - appears smaller/further
        const scale = 1 - (progress * 0.05); // 1.0 → 0.95 (smaller)
        
        // Step 4: Opacity - becomes less prominent
        const opacity = 1 - (progress * 0.15); // 1.0 → 0.85 (dimmer)
        
        // Step 5: Blur - REMOVED per request
        
        // Apply Key 2 transformations (on top of Key 1)
        gsap.set(heroSectionRef.current, {
          z: translateZ,
          y: translateY,
          scale: scale,
          opacity: opacity,
          force3D: true
        });
      }
    };
    
    window.addEventListener('scroll', handleHeroTransformation, { passive: true });

    // Cleanup - Act 1 + Chevron + Act 2
    return () => {
      kenBurnsTimeline.kill();
      chevronTimeline.kill();
      gsap.killTweensOf(chevronElement);
      window.removeEventListener('scroll', handleScrollPause);
      window.removeEventListener('scroll', handleHeroTransformation);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    // Hero Container - starts full screen, animates to framed
    <div ref={heroRef} className="w-full" id="hero-container">
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