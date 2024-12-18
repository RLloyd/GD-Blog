/*-= src/app/page.tsx =-*/
import ParallaxScroll from '@/components/parallaxScroll/ParallaxScroll'
import { PortfolioSection } from './layout'

/*** Page component that renders the main portfolio page.
 * @returns {ReactElement} The main portfolio page component **/

const page = () => {
   return (
      <PortfolioSection>
         <ParallaxScroll />
      </PortfolioSection>
   )
}

export default page

