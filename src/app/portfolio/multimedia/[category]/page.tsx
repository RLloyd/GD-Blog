/*-= src/app/portfolio/multimedia/[category]/page.tsx =-*/
/*-|================================================================================|-*/
'use client';
import { PortfolioSection } from '@/app/layout';
import { isMultimediaSection, portfolioSections } from '@/data/portfolioData';
import Image from 'next/image';
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

//   if (!isMultimediaSection(multimediaSection)) {
//     notFound();
//   }

// Type guard and early return if section not found
if (!multimediaSection || !isMultimediaSection(multimediaSection)) {
   notFound();
 }

  const categoryData = multimediaSection.subsections.find(
    subsection => subsection.id === resolvedParams.category
  );

  if (!categoryData) {
    notFound();
  }

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
          {categoryData.component && (
            <div>{/* Component content will be rendered here */}</div>
          )}
        </div>
      </div>
    </PortfolioSection>
  );
}

// import Image from 'next/image';
// import { notFound } from 'next/navigation';

// interface Props {
//    params: {
//       category: string;
//    }
// }

// const categoryData: Record<string, {
//    title: string;
//    description: string;
//    image: string;
//    content: React.ReactNode;
// }> = {
//    video: {
//       title: 'Video Editing',
//       description: 'Professional video editing and post-production services.',
//       image: '/assets/images/third.webp',
//       content: (
//          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Add your video projects here */}
//          </div>
//       )
//    },
//    motion: {
//       title: 'Motion Graphics',
//       description: 'Engaging motion graphics and visual effects.',
//       image: '/assets/images/fourth.webp',
//       content: (
//          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Add your motion graphics projects here */}
//             <iframe id="ytplayer" type="text/html" width="720" height="405"
//                src="https://www.youtube.com/watch?v=R16RDhbeKD8"
//                frameborder="0" allowfullscreen>
//             </iframe>
//          </div>
//       )
//    },
//    sound: {
//       title: 'Sound Design XXX',
//       description: 'Immersive audio experiences and sound engineering.',
//       image: '/assets/images/fifth.webp',
//       content: (
//          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <h1>
//                Add your sound design projects here
//             </h1>
//          </div>
//       )
//    }
// };

// export default function MultimediaCategoryPage({ params }: Props) {
//    const data = categoryData[params.category];

//    if (!data) {
//       notFound();
//    }

//    return (
//       <div className="min-h-screen bg-black text-white">
//          <div className="relative h-[50vh] mb-16">
//             <Image
//                src={data.image}
//                alt={data.title}
//                fill
//                className="object-cover"
//                priority
//             />
//             <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
//                <h1 className="text-6xl font-garamond mb-4">{data.title}</h1>
//                <p className="text-xl max-w-2xl text-center font-nunitosans px-4">
//                   {data.description}
//                </p>
//             </div>
//          </div>

//          <div className="max-w-7xl mx-auto px-4 py-16">
//             {data.content}
//          </div>
//       </div>
//    );
// }

// /*-|================================================================================|-*/

// // interface Props {
// //    params: {
// //      category: 'video' | 'motion' | 'sound'
// //    }
// //  }

// //  const categoryData = {
// //    video: {
// //      title: 'Video Editing',
// //      description: 'Professional video editing and post-production services.',
// //      image: '/assets/images/third.webp'
// //    },
// //    motion: {
// //      title: 'Motion Graphics',
// //      description: 'Engaging motion graphics and visual effects.',
// //      image: '/assets/images/fourth.webp'
// //    },
// //    sound: {
// //      title: 'Sound Design',
// //      description: 'Immersive audio experiences and sound engineering.',
// //      image: '/assets/images/fifth.webp'
// //    }
// //  };

// //  export default function MultimediaPage({ params }: Props) {
// //    const data = categoryData[params.category];

// //    return (
// //      <main className="min-h-screen bg-black text-white">
// //        <div className="relative h-[50vh] mb-16">
// //          <Image
// //            src={data.image}
// //            alt={data.title}
// //            fill
// //            className="object-cover"
// //            priority
// //          />
// //          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
// //            <h1 className="text-6xl font-garamond mb-4">{data.title}</h1>
// //            <p className="text-xl max-w-2xl text-center font-nunitosans">
// //              {data.description}
// //            </p>
// //          </div>
// //        </div>

// //        <div className="max-w-7xl mx-auto px-4 py-16">
// //          {/* Add your category-specific content here */}
// //          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //            {/* Projects will go here */}
// //          </div>
// //        </div>
// //      </main>
// //    )
// //  }
// /*-|================================================================================|-*/