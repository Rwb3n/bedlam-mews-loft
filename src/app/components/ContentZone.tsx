'use client';

import { ReactNode } from 'react';

interface ContentZoneProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export default function ContentZone({ children, sidebar }: ContentZoneProps) {
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto grid gap-0 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_0.8fr]">
      {/* Content Area - spans 2 columns on desktop */}
      <main className="md:col-span-2 lg:col-span-2">
        {children}
      </main>
      
      {/* Sidebar Area - third column on desktop, hidden on mobile/tablet */}
      <aside className="hidden lg:block lg:col-start-3">
        <div className="sticky top-4 pt-8 pb-16 space-y-4 pr-6">
          {sidebar}
        </div>
      </aside>
    </div>
  );
}