/*-= src/app/portfolio/layout.tsx =-*/
import { ParallaxNavigation } from '@/components/ParallaxNavigation';
import React from 'react';

export default function PortfolioLayout({ children, }: { children: React.ReactNode }) {
   return (
      <div className="relative">
         <ParallaxNavigation />
         {/* <EnhancedParallaxNavigation /> */}
         {children}
      </div>
   );
}