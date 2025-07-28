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
    "specs": "docs/enhancement-specs.md - Plain English feature requirements",
    "migration": "docs/library-migration-plan.md - Risk-gated upgrade strategy", 
    "colors": "docs/color-migration-mapping.md - Custom to shadcn color mapping",
    "changelog": "docs/project-changelog_1.md + project-changelog_2.md"
  },

  "principles": {
    "plainEnglish": "Use simple language for discussions and documentation",
    "noCustomWork": "Use professional libraries over custom solutions",
    "riskGates": "Test each technical risk before moving forward",
    "singleSourceOfTruth": "One consistent color/component system",
    "mobileFirst": "Mobile-responsive with 5 full-height sections"
  },
  
  "ask yourself": {
    "beforeCustomCSS": "Does shadcn/ui have a component for this?",
    "beforeColors": "Are you using bg-primary/text-foreground semantic naming?",
    "beforeCommit": "Did you run build and test all links work?"
  },

  "commands": {
    "dev": "npm run dev",
    "build": "npm run build", 
    "deploy": "Push to main branch (auto-deploys to Vercel)"
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