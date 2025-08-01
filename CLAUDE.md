{
  "project": {
    "name": "Bedlam Mews Loft Landing Page",
    "vision": "Professional landing page for London creative space rental with Calendly booking integration",
    "Ai orchestrator": "Ruben Pires, never execute code without Ruben's approval"
  },
  
  "architecture": {
    "framework": "Next.js 15 + React 19 + TypeScript",
    "styling": "Tailwind CSS v4 + shadcn/ui components",
    "fonts": "Geist (sans-serif, primary) + Inter 700 (serif/headings, optical sizing)",
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
    "beforeCommit": "Did you run build and test all links work?",
    "beforeScrollAnimations": "Does this conflict with CSS sticky positioning? ScrollSmoother breaks native sticky behavior"
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
    "Using hardcoded colors (bg-orange-50) instead of semantic tokens (bg-accent/10)",
    "Using font-[family-name:var(--font-castoro)] instead of font-serif",
    "Creating custom components when shadcn/ui equivalents exist",
    "Committing without testing build and functionality",
    "Adding colors anywhere except src/app/globals.css :root section"
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
    "animationTesting": "Other section animations (parallax, sidebar, etc.) disabled during hero system implementation - restore methodically",
    "scrollSmootherConflict": "ScrollSmoother breaks CSS sticky positioning - these are mutually exclusive. Choose one or the other, never both",
    "debuggingScrollIssues": "When position: sticky stops working, disable ScrollSmoother first - it overrides native browser scroll behavior"
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
    "hero-animation-system-2act": "Complete 2-Act hero animation system: Act 1 (fixed entrance 0-4.8s) + Act 2 (user-controlled scroll transformation)",
    "dark-theme-color-system": "Complete dark sophisticated theme with semantic token architecture - single source of truth in globals.css for rapid color iteration",
    "full-site-grain-filter": "Global SVG fractal noise overlay via body::before - subtle organic texture at 0.08 opacity with accessibility compliance",
    "strategic-interaction-animations": "Complete professional animation craft system: PRIMARY (3-phase), Primary-Minor (2-phase), Secondary (press-down), Navigation (color transitions) - all with motion preference compliance",
    "light-theme-strategic-colors": "Professional light theme with strategic color language: Orange=Action (CTAs), Neutral=Content (90% interface), Teal=Information - semantic token system with instant theme switching capability"
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
  },

  "colorSystem": {
    "architecture": "Light theme with strategic color language - semantic token system",
    "file": "src/app/globals.css - ALL color changes happen here only",
    "format": "oklch() color space for better browser compatibility and color accuracy",
    "strategicColorLanguage": {
      "orange": "Take Action Now - CTAs and critical warnings only",
      "neutral": "Supporting Content - 90% of interface for clean focus",
      "teal": "Important Information - questions, success states, info accents"
    },
    "tokens": {
      "primary": "oklch(0.65 0.18 45) - Electric orange for conversion-critical CTAs",
      "accent": "oklch(0.7139 0.15 165) - Vibrant teal for information hierarchy",
      "background": "oklch(0.98 0 0) - Pure clean white base",
      "foreground": "oklch(0.15 0 0) - Rich dark charcoal for excellent readability",
      "surface": "oklch(0.97 0 0) - Clean white cards/sections (90% of interface)",
      "neutral": "oklch(0.94 0 0) - Subtle gray backgrounds for supporting elements"
    },
    "principles": {
      "semanticOnly": "Components use semantic tokens (bg-primary, text-accent) - NEVER hardcoded colors",
      "accessibilityBuiltIn": "All token combinations exceed WCAG AA standards (15:1+ contrast ratios)",
      "singleSourceOfTruth": "Color changes take 30 seconds - update CSS variables only",
      "conversionOptimized": "Orange CTAs dominate visual hierarchy against neutral background",
      "professionalRestraint": "Color usage demonstrates design expertise to creative professionals"
    },
    "usage": {
      "rapidIteration": "Change any color by updating single CSS variable in :root",
      "themeSwitch": "Dark theme available via CSS variable swap (zero component changes)",
      "brandAlignment": "Easy brand color updates without touching component code",
      "maintenance": "Zero risk color changes - semantic system prevents breaking changes"
    },
    "implementation": {
      "cssVariables": "All colors defined in :root as oklch() values with semantic mappings",
      "tailwindMapping": "@theme inline section maps CSS variables to Tailwind classes",
      "componentIntegration": "All components use semantic classes (bg-surface vs bg-white)",
      "auditCompliant": "Eliminated all hardcoded colors through systematic component audit"
    },
    "status": "Production ready - strategic color language maximizes conversion and credibility"
  },

  "interactionAnimationSystem": {
    "architecture": "4-tier hierarchical animation system with GSAP-only implementation",
    "accessibility": "Full motion preference compliance via respectMotionPreference() wrapper",
    "performance": "60fps hardware-accelerated transforms, +1KB bundle impact",
    "tiers": {
      "PRIMARY": {
        "elements": "FloatingActions 'Book Now' buttons (2 total)",
        "animation": "3-phase: Anticipation (0.1s) → Press (0.15s) → Follow-through (0.2s)",
        "purpose": "Full animation craft to demonstrate creative mastery and drive conversions"
      },
      "primaryMinor": {
        "elements": "Contact/Directions buttons (6 total)",
        "animation": "2-phase: Press (0.15s) → Quick bounce (0.1s)",
        "purpose": "Refined interaction feedback faster than PRIMARY"
      },
      "secondary": {
        "elements": "Chevron, carousel dots, interactive elements",
        "animation": "Single press-down: 3px down (0.15s) → snap back (0.15s)",
        "purpose": "Immediate tactile feedback without distraction"
      },
      "navigation": {
        "elements": "Footer links, sidebar nav, mobile nav",
        "animation": "GSAP color transitions: foreground ↔ primary (0.2s)",
        "purpose": "Professional polish for navigation elements"
      }
    },
    "hooks": {
      "usePrimaryCTAAnimation": "3-phase interaction with hover enhancement",
      "usePrimaryMinorCTAAnimation": "2-phase press + bounce with generic typing",
      "useSecondaryElementAnimation": "Press-down feedback with mousedown/up/leave",
      "useNavigationAnimation": "GSAP color transitions on hover"
    },
    "status": "Complete and deployed - all Quality Gates passed, production ready"
  }
}