
/*-= src/app/portfolio/page.tsx =-*/
// import React from 'react'
// import { PortfolioSection } from './layout'
import { PortfolioSection } from '../layout'
import ParallaxScroll from '@/components/parallaxScroll/ParallaxScroll'

export default function PortfolioPage() {
   return (
     <PortfolioSection>
       <ParallaxScroll />
     </PortfolioSection>
   );
 }

// const page = () => {
//   return (
//    <PortfolioSection>
//       <ParallaxScroll />
//    </PortfolioSection>
//   )
// }
// export default page

