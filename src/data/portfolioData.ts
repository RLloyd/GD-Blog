/*-= src/data/portfolioData.ts =-*/
/*--------------------------------------------------------------------------=|
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
|=----------------------------------------------------------------------------*/
import { StaticImageData } from 'next/image';
// Import your images
// import webDevImage from '@/public/assets/images/first.webp';
// import uiDesignImage from '@/public/assets/images/second.webp';
// import videoImage from '@/public/assets/images/third.webp';
// import motionImage from '@/public/assets/images/fourth.webp';
// import soundImage from '@/public/assets/images/fifth.webp';
import webDevImage from '../../public/assets/images/first.webp';
import uiDesignImage from '../../public/assets/images/second.webp';
import videoImage from '../../public/assets/images/third.webp';
import motionImage from '../../public/assets/images/fourth.webp';
import soundImage from '../../public/assets/images/fifth.webp';

interface TitleProps {
   title: string;  // Keep as simple string
   titleMobile?: string;  // Add optional mobile title
 }
 interface BaseSection extends TitleProps {
   id: string;
   description: string;
   path: string;
   color: string;
   component?: {
      name: string;
      props?: Record<string, unknown>;
   };
}

interface PortfolioSection extends BaseSection {
   image: StaticImageData;
}

interface MultimediaSection extends BaseSection {
   subsections: PortfolioSection[];
}

export type Section = PortfolioSection | MultimediaSection;

export const portfolioSections: Section[] = [
   {
      id: 'web',
      title: 'SAAS Development', // Default/desktop title
      titleMobile: 'SAAS Dev',   // Mobile title
      description: 'Creating modern, responsive web applications with cutting-edge technologies.',
      image: webDevImage,
      path: '/portfolio/web-development',
      color: 'bg-primary-500',
      component: {
         name: 'WebDevShowcase'
      }
   },
   {
      id: 'ui',
      title: 'UI Design', // Default/desktop title
      titleMobile: 'UI',   // Mobile title
      description: 'Crafting beautiful user interfaces that deliver exceptional experiences.',
      image: uiDesignImage,
      path: '/portfolio/ui-design',
      color: 'bg-secondary-500',
      component: {
         name: 'UIDesignGallery'
      }
   },
   {
      id: 'multimedia',
      title: 'Multimedia', // Default/desktop title
      titleMobile: '',   // Mobile title
      description: 'Multimedia production services',
      // path: '/blog',
      // path: '/portfolio/multimedia',
      path: '',
      color: 'bg-success-500',
      subsections: [
         {
            id: 'blog',
            title: 'Blog Articles', // Default/desktop title
            titleMobile: 'Blog',   // Mobile title
            description: 'Professional video editing and post-production services.',
            image: videoImage,
            path: '/blog',
            color: 'bg-success-500',
            component: {
               name: ''
            }
         },
         {
            id: 'motion',
            title: 'Motion Graphics', // Default/desktop title
            titleMobile: 'Motion',   // Mobile title
            description: 'Engaging motion graphics and visual effects.',
            image: motionImage,
            path: '/portfolio/multimedia/motion',
            color: 'bg-secondary-500',
            component: {
               name: 'VideoShowcase'
            }
         },
         {
            id: 'sound',
            title: 'Software Skills & Profile', // Default/desktop title
            titleMobile: 'Profile',   // Mobile title
            description: 'Immersive audio experiences and sound engineering.',
            image: soundImage,
            path: '/portfolio/multimedia/sound',
            color: 'bg-success-500',
            component: {
               name: 'SoftwareSkillsProfile'
            }
         }
      ]
   }
];

// Type guard to check if a section has subsections
export function isMultimediaSection(section: Section): section is MultimediaSection {
   return 'subsections' in section;
}

// Utility function to get correct title based on viewport
export const getResponsiveTitle = (title: { mobile: string; desktop: string }, isMobile: boolean): string => {
   return isMobile ? title.mobile : title.desktop;
 };



// /*-= src/data/portfolioData.ts =-*/
// /*-=========================================================================
// Components that imports this data:
//    typescriptCopy// In ParallaxScroll.tsx
//    import { portfolioSections } from '@/data/portfolioData';
//    // In [category]/page.tsx
//    import { portfolioSections } from '@/data/portfolioData';

// Refactor the data structure:
//    Data is managed in one place
//    Changes only need to be made once
//    We maintain consistency across components
//    TypeScript can properly type the data structure
// ===========================================================================-*/
// import { StaticImageData } from 'next/image';
// // Import your images
// // import webDevImage from '@/public/assets/images/first.webp';
// // import uiDesignImage from '@/public/assets/images/second.webp';
// // import videoImage from '@/public/assets/images/third.webp';
// // import motionImage from '@/public/assets/images/fourth.webp';
// // import soundImage from '@/public/assets/images/fifth.webp';
// import webDevImage from '../../public/assets/images/first.webp';
// import uiDesignImage from '../../public/assets/images/second.webp';
// import videoImage from '../../public/assets/images/third.webp';
// import motionImage from '../../public/assets/images/fourth.webp';
// import soundImage from '../../public/assets/images/fifth.webp';

// interface PortfolioSection {
//    id: string;
//    title: string;
//    description: string;
//    image: StaticImageData;
//    path: string;
//    color: string;
//    content?: React.ReactNode;
//    component?: {
//       name: string;
//       props?: Record<string, unknown>;
//    };
// }

// interface MultimediaSubsection extends PortfolioSection { }

// interface MultimediaSection extends Omit<PortfolioSection, 'image'> {
//    subsections: MultimediaSubsection[];
// }

// type Section = PortfolioSection | MultimediaSection;

// export const portfolioSections: Section[] = [
//    {
//       id: 'web',
//       title: 'SAAS Development',
//       description: 'Creating modern, responsive web applications with cutting-edge technologies.',
//       image: webDevImage,
//       path: '/portfolio/web-development',
//       color: 'bg-primary-500',
//       component: {
//          name: 'WebDevShowcase',
//          props: {
//             // any props the component needs
//             // whatever you need
//          }
//       }
//    },
//    {
//       id: 'ui',
//       title: 'UI Design',
//       description: 'Crafting beautiful user interfaces that deliver exceptional experiences.',
//       image: uiDesignImage,
//       path: '/portfolio/ui-design',
//       color: 'bg-secondary-500',
//       component: {
//          name: 'UIDesignGallery'
//       }
//    },
//    {
//       id: 'multimedia',
//       title: 'Multimedia',
//       description: 'Multimedia production services',
//       path: '/portfolio/multimedia',
//       color: 'bg-success-500',
//       subsections: [
//          {
//             id: 'video',
//             title: 'Video Editing',
//             description: 'Professional video editing and post-production services.',
//             image: videoImage,
//             path: '/portfolio/multimedia/video',
//             color: 'bg-success-500',
//             component: {
//                name: 'VideoShowcase'
//             }
//          },
//          {
//             id: 'motion',
//             title: 'Motion Graphics',
//             description: 'Engaging motion graphics and visual effects.',
//             image: motionImage,
//             path: '/portfolio/multimedia/motion',
//             color: 'bg-secondary-500',
//             component: {
//                name: 'VideoShowcase'
//             }
//          },
//          {
//             id: 'sound',
//             title: 'Sound Design',
//             description: 'Immersive audio experiences and sound engineering.',
//             image: soundImage,
//             path: '/portfolio/multimedia/sound',
//             color: 'bg-success-500',
//             component: {
//                name: 'VideoShowcase'
//             }
//          }
//       ]
//    }
// ];

// // Type guard to check if a section has subsections
// export function isMultimediaSection(section: Section): section is MultimediaSection {
//    return 'subsections' in section;
// }