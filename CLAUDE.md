{
  "project": {
    "name": "Bedlam Mews Loft Landing Page",
    "vision": "Professional landing page for London creative space rental with Calendly booking integration",
    "Ai orchestrator": "Ruben Pires"
  },
  
  "architecture": {
    "framework": "Next.js 15 + React 19 + TypeScript",
    "styling": "Tailwind CSS v4 + shadcn/ui components",
    "fonts": "Geist (sans-serif, primary) + Sorts Mill Goudy (serif, headings)",
    "animations": "GSAP only",
    "deployment": "Vercel",
    "breakpoints": "Mobile (375px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px) - full responsive system",
    "layout": "CSS Grid 3-column [1.1fr_1.1fr_0.8fr] with ContentZone wrapper",
    "currentLayout": "HeroZone + ContentZone(content + DesktopNavigation sidebar) + Footer(3-column + FloatingActions)"
  },
  
  "documentation": {
    "[component]_[stage]_specs.md": "specs for components"},

  "principles": {
    "plainEnglish": "Use simple language for discussions and documentation",
    "noCustomWork": "Use professional libraries over custom solutions",
    "nohacks": "Avoid hacks, use proper libraries, patterns, and components",
    "riskGates": "Test each technical risk before moving forward",
    "singleSourceOfTruth": "One consistent color/component system",
    "mobileFirst": "Mobile-responsive with 5 full-height sections",
    "KISS": "Keep it simple, no unnecessary complexity",
    "DRY": "Don't repeat yourself, use shadcn/ui components"
  },
  
  "ask yourself": {
    "beforeCustomCSS": "Do we have a library for this?",
    "beforeColors": "Are you using bg-primary/text-foreground semantic naming?",
    "beforeCommit": "Did you run build and test all links work?"
  },

  "commands you run": {
    "deploy": "Push to main branch (auto-deploys to Vercel)"
  },

  "commands Ruben runs": {
    "build": "npm run build",
    "dev": "npm run dev",
  },

  "qualityGates": {
    "gate1": "Libraries installed without breaking site",
    "gate2": "All functionality tested and working",
    "gate3": "Backups created and git committed"
  },

  "antiPatterns": [
    "Mixing custom colors (bg-sage) with shadcn colors (bg-primary)",
    "Using font-[family-name:var(--font-castoro)] instead of font-serif",
    "Creating custom components when shadcn/ui equivalents exist",
    "Committing without testing build and functionality"
  ],

  "designPatterns": {
    "buttonSpacing": {
      "primary": "pl-3 pr-8 asymmetric padding for visual balance with icons",
      "secondary": "pl-2 pr-4 proportionally scaled asymmetric padding",
      "structure": "Direct icon + text for primary, white circular containers for secondary",
      "iconSizing": "w-4 h-4 for primary buttons, w-3 h-3 for secondary buttons",
      "colors": "text-primary-foreground for primary icons, text-primary for secondary"
    },
    "badgeSpacing": {
      "padding": "pl-1 pr-3 py-1 for asymmetric visual balance",
      "iconGap": "mr-2 between icon and text",
      "principle": "4px left + 8px gap = 12px total left, 12px right for optical balance"
    },
    "responsiveTypography": {
      "approach": "Content-first progressive enhancement starting from mobile readability",
      "heroTitleProgression": "40px → 56px → 72px → 86px → 86px → 96px across breakpoints",
      "ratioMaintenance": "Maintain 2:1 title/subtitle ratio across all breakpoints",
      "spacingSystem": "space-y-2 xl:space-y-4 for content, py-4 lg:py-16 xl:py-20 for containers"
    },
    "aspectRatios": {
      "heroZone": "aspect-[4/3] md:aspect-[3/2] lg:aspect-[5/2] for device-optimized proportions",
      "principle": "Mobile (4:3) for readability, tablet (3:2) transition, desktop (5:2) cinematic"
    }
  },

  "gotchas": {
    "useClient": "Add 'use client' directive for onClick handlers in App Router",
    "asChild": "Use asChild pattern for shadcn Buttons wrapping <a> tags",
    "replaceAll": "Use replace_all: true for MultiEdit when classes repeat",
    "webShare": "Web Share API needs fallback to clipboard for desktop",
    "shadcnCLI": "NEVER use 'npx shadcn-ui@latest' - it's deprecated. Use 'npx shadcn@latest' only",
    "wFull": "Always add w-full to semantic footer/section elements for proper width",
    "maxWidth": "Tailwind v4 max-w-7xl may render as 1024px instead of 1280px - use explicit style={{maxWidth: '1280px'}} if needed",
    "gridLayout": "ContentZone uses CSS Grid [1.1fr_1.1fr_0.8fr] - content spans first 2 columns, sidebar in 3rd column",
    "buttonPattern": "Primary buttons use direct icons, secondary use white circular containers",
    "asymmetricSpacing": "Use pl-X pr-Y pattern for better visual balance than symmetric padding",
    "responsiveBreakpoints": "Always test typography scaling across all 6 breakpoints for readability",
    "spacingConventions": "Use space-y for content relationships, padding for container structure - never mix approaches",
    "animationLibrary": "GSAP only - for all animations including scroll-based, transitions, and complex sequences",
    "scrollAnimations": "All scroll-based parallax uses gsap.set() for 60fps performance. No Framer Motion anywhere",
    "heroAnimations": "Hero Zone uses methodical 2-Act system: fixed entrance timeline + user-controlled scroll transformation",
    "animationTesting": "Other section animations (parallax, sidebar, etc.) disabled during hero system implementation - restore methodically"
  },

  "availableComponents": {
    "shadcn": [
      "Avatar (AvatarImage, AvatarFallback)",
      "Badge", 
      "Button",
      "Card (CardContent, CardHeader, CardTitle, CardDescription, CardAction, CardFooter)",
      "Carousel (CarouselContent, CarouselItem, CarouselNext, CarouselPrevious)",
      "Menubar",
      "Separator"
    ],
    "custom": [
      "ContentZone (children, sidebar) - CSS Grid wrapper with 3-column layout",
      "FloatingActions (context: 'content' | 'footer') - Mobile-first with progressive enhancement",
      "PhotoSlider (title, height, showDots) - 16:9 aspect ratio carousel with modal",
      "HeroZone - Responsive section with progressive typography and aspect ratios",
      "MobileNavigation - Full-screen dropdown with blur backdrop and clean button styling",
      "useIntersectionObserver hook - For scroll-based visibility logic"
    ]
  },

  "recentArchitecturalChanges": {
    "three-column-migration": "Migrated from fixed positioning to CSS Grid 3-column layout",
    "footer-enhancement": "Footer matches ContentZone structure with FloatingActions integration",
    "mobile-first-floatingActions": "Progressive enhancement from mobile fixed to desktop sticky positioning",
    "font-standardization": "Geist as primary sans-serif, Sorts Mill Goudy for headings/serif text",
    "herozone-responsive-system": "Complete typography and layout overhaul with 6-breakpoint progressive scaling",
    "mobile-navigation-optimization": "Clean blur backdrop system with improved button styling and accessibility",
    "spacing-system-normalization": "Unified space-y/padding conventions across all components",
    "hero-animation-system-2act": "Complete 2-Act hero animation system: Act 1 (fixed entrance 0-4.8s) + Act 2 (user-controlled scroll transformation)"
  },

  "heroAnimationSystem": {
    "architecture": "2-Act system with GSAP-only implementation",
    "act1": {
      "duration": "0-4.8s fixed timeline",
      "elements": "Text animations (SplitText) + Ken Burns background + Chevron entrance + gentle bouncing",
      "responsive": "Chevron positioning py-14→py-20, sizes w-12→w-26 across breakpoints"
    },
    "act2": {
      "trigger": "User scroll 0-400px with power2.out easing",
      "key1_framing": "Responsive padding (1rem→2rem) + border radius (0→1rem) + height (100vh→90-95vh)",
      "key2_recession": "TranslateZ (-50px) + TranslateY (-300px) + Scale (0.95) + Opacity (0.85)",
      "coordination": "Both keys synchronized, fully reversible user control"
    },
    "performance": "Hardware accelerated transforms, 60fps, no conflicts with other animations",
    "status": "Complete and deployed, other section animations temporarily disabled for testing"
  }
}