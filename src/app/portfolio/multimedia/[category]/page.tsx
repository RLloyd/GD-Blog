/*-= src/app/portfolio/multimedia/[category]/page.tsx =-*/
/*--------------------------------------------------------------------------=|
Here's the fixed multimedia category page with proper dynamic component loading:

This will properly:
   Load the VideoShowcase component dynamically
   Pass the category prop to the component
   Show a loading state while the component is being loaded
   Handle cases where no component is specified
|=----------------------------------------------------------------------------*/

'use client';
import { PortfolioSection } from '@/app/layout';
import { isMultimediaSection, portfolioSections } from '@/data/portfolioData';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default function MultimediaCategoryPage({ params }: Props) {
  const resolvedParams = use(params);

  const multimediaSection = portfolioSections.find(section =>
    isMultimediaSection(section) && section.id === 'multimedia'
  );

  if (!multimediaSection || !isMultimediaSection(multimediaSection)) {
    notFound();
  }

  const categoryData = multimediaSection.subsections.find(
    subsection => subsection.id === resolvedParams.category
  );

  if (!categoryData) {
    notFound();
  }

  const DynamicComponent = categoryData.component?.name
    ? dynamic(() => import(`@/components/portfolio-components/${categoryData.component.name}`), {
        loading: () => <div>Loading component...</div>
      })
    : null;

  return (
    <PortfolioSection>
      <div className="min-h-screen bg-black text-white">
        <div className="relative h-[50vh] mb-16">
          <Image
            src={categoryData.image}
            alt={categoryData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-garamond mb-4">{categoryData.title}</h1>
            <p className="text-xl max-w-2xl text-center font-nunitosans px-4">
              {categoryData.description}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {DynamicComponent && (
            <DynamicComponent category={resolvedParams.category} />
          )}
        </div>
      </div>
    </PortfolioSection>
  );
}

/*-|================================================================================|-*/

// /*-= src/app/portfolio/multimedia/[category]/page.tsx =-*/
// /*-|================================================================================|-*/
// 'use client';
// import { PortfolioSection } from '@/app/layout';
// import { isMultimediaSection, portfolioSections } from '@/data/portfolioData';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';
// import { use } from 'react';

// interface Props {
//    params: Promise<{
//       category: string;
//    }>;
// }

// export default function MultimediaCategoryPage({ params }: Props) {
//    const resolvedParams = use(params);

//    const multimediaSection = portfolioSections.find(section =>
//       isMultimediaSection(section) && section.id === 'multimedia'
//    );

//    //   if (!isMultimediaSection(multimediaSection)) {
//    //     notFound();
//    //   }

//    // Type guard and early return if section not found
//    if (!multimediaSection || !isMultimediaSection(multimediaSection)) {
//       notFound();
//    }

//    const categoryData = multimediaSection.subsections.find(
//       subsection => subsection.id === resolvedParams.category
//    );

//    if (!categoryData) {
//       notFound();
//    }

//    return (
//       <PortfolioSection>
//          <div className="min-h-screen bg-black text-white">
//             <div className="relative h-[50vh] mb-16">
//                <Image
//                   src={categoryData.image}
//                   alt={categoryData.title}
//                   fill
//                   className="object-cover"
//                   priority
//                />
//                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
//                   <h1 className="text-6xl font-garamond mb-4">{categoryData.title}</h1>
//                   <p className="text-xl max-w-2xl text-center font-nunitosans px-4">
//                      {categoryData.description}
//                   </p>
//                </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 py-16">
//                {categoryData.component && (
//                   <div>
//                      <DynamicComponent category={resolvedParams.category} />
//                   </div>
//                )}
//             </div>
//          </div>
//       </PortfolioSection>
//    );
// }
// /*-|================================================================================|-*/