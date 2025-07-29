'use client';

import { ReactNode } from 'react';

interface ContentZoneProps {
  children: ReactNode;
}

export default function ContentZone({ children }: ContentZoneProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}