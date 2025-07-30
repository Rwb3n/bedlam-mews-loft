'use client';

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Note: SplitText is a premium GSAP plugin. For development, we'll create a simple fallback
// For production, uncomment the import below if you have a GSAP license:
// import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  trigger?: "immediate" | "scroll";
  startDelay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  trigger = "scroll",
  startDelay = 0,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const animationCompletedRef = useRef(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || !text) return;

    const el = ref.current;
    animationCompletedRef.current = false;

    // Simple fallback implementation without SplitText plugin
    // This creates individual spans for each character or word
    const createSplitElements = () => {
      if (splitType === "chars") {
        const chars = text.split('');
        el.innerHTML = chars.map(char => 
          char === ' ' ? ' ' : `<span class="split-char" style="display: inline-block;">${char}</span>`
        ).join('');
        return el.querySelectorAll('.split-char');
      } else if (splitType === "words") {
        const words = text.split(' ');
        el.innerHTML = words.map(word => 
          `<span class="split-word" style="display: inline-block;">${word}</span>`
        ).join(' ');
        return el.querySelectorAll('.split-word');
      }
      return [];
    };

    let targets: Element[];
    try {
      targets = Array.from(createSplitElements());
    } catch (error) {
      console.error("Failed to create split text:", error);
      return;
    }

    if (!targets || targets.length === 0) {
      console.warn("No targets found for SplitText animation");
      return;
    }

    // Set will-change for performance AND initial state to prevent flash
    targets.forEach((t) => {
      (t as HTMLElement).style.willChange = "transform, opacity";
    });
    
    // Immediately set initial state to prevent FOUC
    gsap.set(targets, { ...from, immediateRender: true, force3D: true });

    const createTimeline = () => {
      const tl = gsap.timeline({
        delay: startDelay,
        onComplete: () => {
          animationCompletedRef.current = true;
          gsap.set(targets, {
            ...to,
            clearProps: "willChange",
            immediateRender: true,
          });
          onLetterAnimationComplete?.();
        },
      });

      tl.set(targets, { ...from, immediateRender: false, force3D: true });
      tl.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        force3D: true,
      });

      return tl;
    };

    if (trigger === "immediate") {
      // For immediate animations (like hero text on page load)
      const tl = createTimeline();
      return () => {
        tl.kill();
        gsap.killTweensOf(targets);
      };
    } else {
      // For scroll-triggered animations
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? (marginMatch[2] || "px") : "px";
      const sign = marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
          once: true,
          onToggle: (self) => {
            scrollTriggerRef.current = self;
          },
        },
        smoothChildTiming: true,
        onComplete: () => {
          animationCompletedRef.current = true;
          gsap.set(targets, {
            ...to,
            clearProps: "willChange",
            immediateRender: true,
          });
          onLetterAnimationComplete?.();
        },
      });

      tl.set(targets, { ...from, immediateRender: false, force3D: true });
      tl.to(targets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        force3D: true,
      });

      return () => {
        tl.kill();
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
          scrollTriggerRef.current = null;
        }
        gsap.killTweensOf(targets);
      };
    }
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
    trigger,
    startDelay,
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;