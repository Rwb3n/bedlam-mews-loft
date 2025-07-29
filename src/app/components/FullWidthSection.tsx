'use client';

import { ReactNode } from 'react';

interface FullWidthSectionProps {
  children: ReactNode;
  background?: string;
  className?: string;
}

export default function FullWidthSection({ 
  children, 
  background = '', 
  className = '' 
}: FullWidthSectionProps) {
  return (
    <div className={`w-full ${background} ${className}`}>
      {children}
    </div>
  );
}