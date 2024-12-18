/*-= src/data/portfolioData.ts =-*/
/*-=========================================================================
Components that imports this data:
   typescriptCopy// In ParallaxScroll.tsx
   import { portfolioSections } from '@/data/portfolioData';
   // In [category]/page.tsx
   import { portfolioSections } from '@/data/portfolioData';

Refactor the data structure:
   Data is managed in one place
   Changes only need to be made once
   We maintain consistency across components
   TypeScript can properly type the data structure
===========================================================================-*/
export const portfolioSections = [
   {
     id: 'web',
     title: 'Web Development',
     description: 'Creating modern, responsive web applications with cutting-edge technologies.',
     image: '/assets/images/first.webp',
     path: '/portfolio/web-development',
     content: null // Optional: for additional content specific to the detail page
   },
   {
     id: 'ui',
     title: 'UI Design',
     description: 'Crafting beautiful user interfaces that deliver exceptional experiences.',
     image: '/assets/images/second.webp',
     path: '/portfolio/ui-design',
     content: null
   },
   {
     id: 'multimedia',
     subsections: [
       {
         id: 'video',
         title: 'Video Editing',
         description: 'Professional video editing and post-production services.',
         image: '/assets/images/third.webp',
         path: '/portfolio/multimedia/video'
       },
       {
         id: 'motion',
         title: 'Motion Graphics',
         description: 'Engaging motion graphics and visual effects.',
         image: '/assets/images/fourth.webp',
         path: '/portfolio/multimedia/motion'
       },
       {
         id: 'sound',
         title: 'Sound Design',
         description: 'Immersive audio experiences and sound engineering.',
         image: '/assets/images/fifth.webp',
         path: '/portfolio/multimedia/sound'
       }
     ]
   }
 ];