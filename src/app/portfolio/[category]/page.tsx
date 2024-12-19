/*-= src/app/portfolio/[category]/page.tsx =-*/
/*-= Portfolio Category Page =-*/
/*-=========================================================================
The key changes are:
   Added proper import of PortfolioSection from root layout
   Wrapped the entire content with PortfolioSection
   Maintained consistent font usage with font-garamond and font-nunitosans classes
   Added support for all categories including multimedia subcategories
   Used consistent styling with the main portfolio page
===========================================================================-*/
// src/app/portfolio/[category]/page.tsx
'use client';
import { PortfolioSection } from '@/app/layout';
import { isMultimediaSection, portfolioSections } from '@/data/portfolioData';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: Props) {
  const resolvedParams = use(params);

  const sectionData = portfolioSections.find(section => {
    if (section.id === resolvedParams.category) return true;
    if (isMultimediaSection(section)) {
      return section.subsections.some(sub => sub.id === resolvedParams.category);
    }
    return false;
  });

  if (!sectionData) {
    notFound();
  }

  const data = isMultimediaSection(sectionData)
    ? sectionData.subsections.find(sub => sub.id === resolvedParams.category) || sectionData
    : sectionData;

  const DynamicComponent = data.component?.name
    ? dynamic(() => import(`@/components/portfolio-components/${data.component.name}`), {
        loading: () => <div>Loading component...</div>
      })
    : null;

  return (
    <PortfolioSection>
      <div className="min-h-screen bg-black text-white">
        {('image' in data) && (
          <div className="relative h-[50vh] mb-16">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              <h1 className="text-6xl font-garamond mb-4">{data.title}</h1>
              <p className="text-xl max-w-2xl text-center font-nunitosans px-4">
                {data.description}
              </p>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-16">
          {DynamicComponent && (
            <DynamicComponent {...(data.component?.props || {})} />
          )}
        </div>
      </div>
    </PortfolioSection>
  );
}

// // src/app/portfolio/[category]/page.tsx
// 'use client';

// import { PortfolioSection as PortfolioLayout } from '@/app/layout';
// import { isMultimediaSection, portfolioSections } from '@/data/portfolioData';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';

// interface Props {
//    params: {
//       category: string;
//    }
// }

// export default function CategoryPage({ params }: Props) {
//    const sectionData = portfolioSections.find(section => {
//       if (section.id === params.category) return true;
//       if (isMultimediaSection(section)) {
//          return section.subsections.some(sub => sub.id === params.category);
//       }
//       return false;
//    });

//    if (!sectionData) {
//       notFound();
//    }

//    const data = isMultimediaSection(sectionData)
//       ? sectionData.subsections.find(sub => sub.id === params.category) || sectionData
//       : sectionData;

//    // Handle dynamic component loading
//    const DynamicComponent = data.component?.name
//       ? dynamic(() => import(`@/components/portfolio-components/${data.component.name}`), {
//          loading: () => <div>Loading component...</div>
//       })
//       : null;

//    return (
//       <PortfolioLayout>
//          <div className="min-h-screen bg-black text-white">
//             {('image' in data) && (
//                <div className="relative h-[50vh] mb-16">
//                   <Image
//                      src={data.image}
//                      alt={data.title}
//                      fill
//                      className="object-cover"
//                      priority
//                   />
//                   <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
//                      <h1 className="text-6xl font-garamond mb-4">{data.title}</h1>
//                      <p className="text-xl max-w-2xl text-center font-nunitosans px-4">
//                         {data.description}
//                      </p>
//                   </div>
//                </div>
//             )}

//             <div className="max-w-7xl mx-auto px-4 py-16">
//                {DynamicComponent && (
//                   <DynamicComponent {...(data.component?.props || {})} />
//                )}
//             </div>
//          </div>
//       </PortfolioLayout>
//    );
// }

// /*-|================================================================================|-*/

// // 'use client';

// // import { portfolioSections } from '@/data/portfolioData';
// // import Image from 'next/image';
// // import { notFound } from 'next/navigation';
// // import { PortfolioSection } from '@/app/layout';
// // import dynamic from 'next/dynamic';

// // interface Props {
// //   params: {
// //     category: string;
// //   }
// // }

// // export default function CategoryPage({ params }: Props) {
// //   const sectionData = portfolioSections.find(section => {
// //     if (section.id === params.category) return true;
// //     if ('subsections' in section) {
// //       return section.subsections.some(sub => sub.id === params.category);
// //     }
// //     return false;
// //   });

// //   const subsectionData = 'subsections' in sectionData
// //     ? sectionData.subsections?.find(sub => sub.id === params.category)
// //     : null;

// //   const data = subsectionData || sectionData;

// //   if (!data) {
// //     notFound();
// //   }

// //   // Dynamically load component if specified
// //   const DynamicComponent = data.component?.name
// //     ? dynamic(() => import(`@/components/portfolio/${data.component.name}`))
// //     : null;

// //   return (
// //     <PortfolioSection>
// //       <div className="min-h-screen bg-black text-white">
// //         <div className="relative h-[50vh] mb-16">
// //           <Image
// //             src={data.image}
// //             alt={data.title}
// //             fill
// //             className="object-cover"
// //             priority
// //           />
// //           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
// //             <h1 className="text-6xl font-garamond mb-4">{data.title}</h1>
// //             <p className="text-xl max-w-2xl text-center font-nunitosans px-4">
// //               {data.description}
// //             </p>
// //           </div>
// //         </div>

// //         <div className="max-w-7xl mx-auto px-4 py-16">
// //           {DynamicComponent && (
// //             <DynamicComponent {...(data.component?.props || {})} />
// //           )}
// //         </div>
// //       </div>
// //     </PortfolioSection>
// //   );
// // }

// // /*-|================================================================================|-*/

// // // /*-= src/app/portfolio/[category]/page.tsx =-*/
// // // /*-= Portfolio Category Page =-*/
// // // /*-=========================================================================
// // // The key changes are:

// // // Added proper import of PortfolioSection from root layout
// // // Wrapped the entire content with PortfolioSection
// // // Maintained consistent font usage with font-garamond and font-nunitosans classes
// // // Added support for all categories including multimedia subcategories
// // // Used consistent styling with the main portfolio page
// // // ===========================================================================-*/
// // // import { PortfolioSection } from '@/app/layout';
// // // import Image from 'next/image';
// // // import { notFound } from 'next/navigation';

// // // interface Props {
// // //   params: {
// // //     category: string;
// // //   }
// // // }

// // // const categoryData: Record<string, {
// // //   title: string;
// // //   description: string;
// // //   image: string;
// // //   content: React.ReactNode;
// // //    }> = {
// // //   'web-development': {
// // //     title: 'Web Development Detailed',
// // //     description: 'Modern web applications built with cutting-edge technologies.',
// // //     image: '/assets/images/first.webp',
// // //     content: (
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //         {/* Add your web development projects here */}
// // //       </div>
// // //     )
// // //   },
// // //   'ui-design': {
// // //     title: 'UI Design',
// // //     description: 'Beautiful user interfaces that deliver exceptional experiences.',
// // //     image: '/assets/images/second.webp',
// // //     content: (
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //         {/* Add your UI design projects here */}
// // //       </div>
// // //     )
// // //   },
// // //   'multimedia': {
// // //     title: 'Multimedia Production',
// // //     description: 'Comprehensive multimedia solutions for modern storytelling.',
// // //     image: '/assets/images/third.webp',
// // //     content: (
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //         {/* Add your multimedia projects here */}
// // //       </div>
// // //     )
// // //   },
// // //   'video': {
// // //     title: 'Video Editing',
// // //     description: 'Professional video editing and post-production services.',
// // //     image: '/assets/images/third.webp',
// // //     content: (
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //         {/* Add your video projects here */}
// // //       </div>
// // //     )
// // //   },
// // //   'motion': {
// // //     title: 'Motion Graphics',
// // //     description: 'Engaging motion graphics and visual effects.',
// // //     image: '/assets/images/fourth.webp',
// // //     content: (
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //         {/* Add your motion graphics projects here */}
// // //       </div>
// // //     )
// // //   },
// // //   'sound': {
// // //     title: 'Sound Design',
// // //     description: 'Immersive audio experiences and sound engineering.',
// // //     image: '/assets/images/fifth.webp',
// // //     content: (
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //         {/* Add your sound design projects here */}
// // //       </div>
// // //     )
// // //   }
// // // };

// // // export default function CategoryPage({ params }: Props) {
// // //   const data = categoryData[params.category];

// // //   if (!data) {
// // //     notFound();
// // //   }

// // //   return (
// // //     <PortfolioSection>
// // //       <div className="min-h-screen bg-black text-white">
// // //         <div className="relative h-[50vh] mb-16">
// // //           <Image
// // //             src={data.image}
// // //             alt={data.title}
// // //             fill
// // //             className="object-cover"
// // //             priority
// // //           />
// // //           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
// // //             <h1 className="text-6xl font-garamond mb-4">{data.title}</h1>
// // //             <p className="text-xl max-w-2xl text-center font-nunitosans px-4">
// // //               {data.description}
// // //             </p>
// // //           </div>
// // //         </div>

// // //         <div className="max-w-7xl mx-auto px-4 py-16">
// // //           {data.content}
// // //         </div>
// // //       </div>
// // //     </PortfolioSection>
// // //   );
// // // }
// // // /*-|================================================================================|-*/