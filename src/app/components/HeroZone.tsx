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

  useEffect(() => {
    if (!heroRef.current || !backgroundRef.current || !chevronRef.current) return;

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

    // ChevronDown Dramatic Entrance (starts at 3.0s)
    const chevronElement = chevronRef.current;
    gsap.set(chevronElement, {
      opacity: 0,
      scale: 0,
      rotation: -180,
      y: -50
    });

    // ChevronDown entrance animation
    const chevronEntranceTimeline = gsap.timeline({ delay: 3.0 });
    chevronEntranceTimeline.to(chevronElement, {
      opacity: 1,
      scale: 1.2,
      rotation: 0,
      y: -5,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
    chevronEntranceTimeline.to(chevronElement, {
      scale: 0.95,
      y: 2,
      duration: 0.15,
      ease: "power2.out"
    });
    chevronEntranceTimeline.to(chevronElement, {
      scale: 1.0,
      y: 0,
      duration: 0.15,
      ease: "power2.out"
    });

    // Smart Bounce System (starts at 3.6s)
    let bounceCount = 0;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const smartBounce = () => {
      if (bounceCount >= 8 || isScrolling) return;
      
      gsap.to(chevronElement, {
        y: 8,
        duration: 1.0,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          bounceCount++;
          setTimeout(smartBounce, 200); // 200ms pause between bounces
        }
      });
    };

    // Start smart bounce after entrance
    setTimeout(smartBounce, 3600);

    // Scroll detection for smart bounce
    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll-based Hero Shrinking
    const handleScrollShrinking = () => {
      const scrollY = window.scrollY;
      const maxScroll = 600;
      const progress = Math.min(scrollY / maxScroll, 1);
      
      if (heroRef.current) {
        const scale = 1 - (progress * 0.15); // Scale from 1.0 to 0.85
        const translateY = -(progress * 30); // Move up 30px max
        
        gsap.set(heroRef.current, {
          scale: scale,
          y: translateY,
          transformOrigin: "center center"
        });
      }
    };

    window.addEventListener('scroll', handleScrollShrinking, { passive: true });

    // Cleanup
    return () => {
      kenBurnsTimeline.kill();
      chevronEntranceTimeline.kill();
      gsap.killTweensOf(chevronElement);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollShrinking);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    // Hero Container with base spacing and rounded corners
    <div className="w-full px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
      <section 
        ref={heroRef}
        className="relative w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[5/2] overflow-hidden rounded-2xl"
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
        <div className="absolute inset-0 flex flex-col justify-between items-center text-white py-4 lg:py-16 xl:py-20">
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
            className="w-8 h-8 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 text-white/80" 
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