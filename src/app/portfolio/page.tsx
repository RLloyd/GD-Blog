
/*-= src/app/portfolio/page.tsx =-*/
import React from 'react'
// import { PortfolioSection } from './layout'
import { PortfolioSection } from '../layout'
import ParallaxScroll from '@/components/parallaxScroll/ParallaxScroll'

const page = () => {

  return (

   <PortfolioSection>
      <ParallaxScroll />
   </PortfolioSection>

  )
}

export default page

