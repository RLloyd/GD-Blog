/*-= src/app/portfolio/layout.tsx =-*/
import React from 'react';
import { ParallaxNavigation } from '@/components/ParallaxNavigation';
import { EnhancedParallaxNavigation } from '@/components/EnhancedParallaxNavigation';

export default function PortfolioLayout({ children, }: { children: React.ReactNode }) {
   return (
      <div className="relative">
         <ParallaxNavigation />
         {/* <EnhancedParallaxNavigation /> */}
         {children}
      </div>
   );
}