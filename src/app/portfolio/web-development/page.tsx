// src/app/portfolio/web-development/page.tsx
'use client';
import { PortfolioSection } from '@/app/layout';
import { portfolioSections, isMultimediaSection } from '@/data/portfolioData';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

export default function WebDevelopmentPage() {
   const sectionData = portfolioSections.find(section => section.id === 'web');

   if (!sectionData || isMultimediaSection(sectionData)) {
      notFound();
   }

   // TypeScript now knows sectionData has a component property
   const DynamicComponent = dynamic(
      //  () => import(`./../components/portfolio-components/${sectionData.component.name}`),
      //  { loading: () => <div>Loading component...</div> }
      () => import('@/components/portfolio-components/WebDevShowcase').then(mod => mod.default),
      { loading: () => <div>Loading component...</div> }
   );

   return (
      <PortfolioSection>
         <div className="min-h-screen bg-black text-white">
            <div className="relative h-[50vh] mb-16">
               <Image
                  src={sectionData.image}
                  alt={sectionData.title}
                  fill
                  className="object-cover"
                  priority
               />
               <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                  <h1 className="text-6xl font-garamond mb-4">{sectionData.title}</h1>
                  <p className="text-xl max-w-2xl text-center font-nunitosans px-4">
                     {sectionData.description}
                  </p>
               </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
               <DynamicComponent />
            </div>
         </div>
      </PortfolioSection>
   );
}

// // src/app/portfolio/web-development/page.tsx
// 'use client';
// import { PortfolioSection } from '@/app/layout';
// import { portfolioSections, isMultimediaSection } from '@/data/portfolioData';
// import Image from 'next/image';
// import dynamic from 'next/dynamic';
// import { notFound } from 'next/navigation';

// export default function WebDevelopmentPage() {
//    const sectionData = portfolioSections.find(section => section.id === 'web');

//    if (!sectionData || isMultimediaSection(sectionData)) {
//       notFound();
//     }

//     const DynamicComponent = sectionData.component ? dynamic(
//       () => import(`@/components/portfolio-components/${sectionData.component.name}`),
//       { loading: () => <div>Loading component...</div> }
//     ) : null;


//   return (
//     <PortfolioSection>
//       <div className="min-h-screen bg-black text-white">
//         <div className="relative h-[50vh] mb-16">
//           <Image
//             src={sectionData.image}
//             alt={sectionData.title}
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
//             <h1 className="text-6xl font-garamond mb-4">{sectionData.title}</h1>
//             <p className="text-xl max-w-2xl text-center font-nunitosans px-4">
//               {sectionData.description}
//             </p>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 py-16">
//         {DynamicComponent && <DynamicComponent />}
//         </div>
//       </div>
//     </PortfolioSection>
//   );
// }