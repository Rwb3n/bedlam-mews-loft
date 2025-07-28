{
  "project": {
    "name": "Bedlam Mews Loft Landing Page",
    "vision": "Professional landing page for London creative space rental with Calendly booking integration"
  },
  
  "architecture": {
    "framework": "Next.js 15 + React 19 + TypeScript",
    "styling": "Tailwind CSS v4 + shadcn/ui components",
    "fonts": "Castoro (serif) + Montserrat (sans-serif)",
    "animations": "Framer Motion",
    "deployment": "Vercel"
  },
  
  "documentation": {
    "[component]_[stage]_specs.md": "specs for components"},

  "principles": {
    "plainEnglish": "Use simple language for discussions and documentation",
    "noCustomWork": "Use professional libraries over custom solutions",
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

  "gotchas": {
    "useClient": "Add 'use client' directive for onClick handlers in App Router",
    "asChild": "Use asChild pattern for shadcn Buttons wrapping <a> tags",
    "replaceAll": "Use replace_all: true for MultiEdit when classes repeat",
    "webShare": "Web Share API needs fallback to clipboard for desktop"
  }
}