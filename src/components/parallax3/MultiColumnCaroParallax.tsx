/*-= src/components/parallax3/MultiColumnCaroParallax.tsx =-=*/
/*-= Claude's version =-=*/
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Carousel from './Carousel';

interface GridContentProps {
  numero: string;
  title: string;
  buttonLabel: string;
}

const GridContentTemplate: React.FC<GridContentProps> = ({ numero, title, buttonLabel }) => (
  <div className="flex gap-4 my-6 pt-[0.6rem] border-t border-primary-100">
    <div className="font-light text-[2rem] md:text-[3rem] leading-none w-[4rem]">
      {numero}
    </div>
    <div>
      <p className="text-xs uppercase">{title}</p>
      <button className="text-[1.65rem] font-light text-left hover:text-primary-600 transition-colors">
        {buttonLabel}
      </button>
    </div>
  </div>
);

const MultiColumnCaroParallax: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 relative h-auto">
      {/* Carousel Section */}
      <div className="lg:sticky lg:top-1/2 lg:h-fit-content">
        <h1 className="text-left text-primary-500 font-light mb-4">Carousel</h1>
        <Carousel autoSlide autoSlideInterval={5000} />
      </div>

      {/* Content Section */}
      <div className="relative text-left lg:w-[500px] text-primary-900">
        <h1 className="text-primary-400 text-[1.5rem] uppercase mb-3">
          Multi Column Parallax
        </h1>

        <GridContentTemplate
          numero="1"
          title="Position"
          buttonLabel="Parallax is the apparent shift in the position of an object."
        />
        <GridContentTemplate
          numero="2"
          title="Observation"
          buttonLabel="Observed by looking at an object first with one eye closed, then with the other."
        />
        <GridContentTemplate
          numero="3"
          title="Astronomy"
          buttonLabel="In astronomy, parallax measures the distance of nearby stars from Earth."
        />

        <div className="my-10 relative aspect-video">
          <Image
            src="/assets/images/carousel-07.jpg"
            alt="Parallax explanation"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <GridContentTemplate
          numero="4"
          title="Distance"
          buttonLabel="Earth's orbit allows calculation of its distance based on the angle of apparent shift."
        />
        <GridContentTemplate
          numero="5"
          title="Imaging"
          buttonLabel="Parallax is crucial in 3D imaging and photography."
        />
        <GridContentTemplate
          numero="6"
          title="Illusion"
          buttonLabel="It creates the illusion of depth by presenting slightly different images to each eye."
        />

        <div className="mt-10 relative aspect-video">
          <Image
            src="/assets/images/carousel-08.jpg"
            alt="Depth illustration"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default MultiColumnCaroParallax;
// // Multi Columns Parallax Component (Typescript)
// import React from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import Carousel from './Carousel';

// interface GridContentProps {
//   numero: string;
//   title: string;
//   buttonLabel: string;
// }

// const GridContentTemplate: React.FC<GridContentProps> = ({ numero, title, buttonLabel }) => (
//   <div className="flex gap-4 my-6 pt-[0.6rem] border-t border-primary-100">
//     <div className="font-light text-[2rem] md:text-[3rem] leading-none w-[4rem]">
//       {numero}
//     </div>
//     <div>
//       <p className="text-xs uppercase">{title}</p>
//       <button className="text-[1.65rem] font-light text-left hover:text-primary-600 transition-colors">
//         {buttonLabel}
//       </button>
//     </div>
//   </div>
// );

// const MultiColumnCaroParallax: React.FC = () => {
//   return (
//     <div className="flex flex-col lg:flex-row gap-4 relative h-auto">
//       {/* Carousel Section */}
//       <div className="lg:sticky lg:top-1/2 lg:h-fit-content">
//         <h1 className="text-left text-primary-500 font-light mb-4">Carousel</h1>
//         <Carousel autoSlide autoSlideInterval={5000} />
//       </div>

//       {/* Content Section */}
//       <div className="relative text-left lg:w-[500px] text-primary-900">
//         <h1 className="text-primary-400 text-[1.5rem] uppercase mb-3">
//           Multi Column Parallax
//         </h1>

//         <GridContentTemplate
//           numero="1"
//           title="Position"
//           buttonLabel="Parallax is the apparent shift in the position of an object."
//         />
//         <GridContentTemplate
//           numero="2"
//           title="Observation"
//           buttonLabel="Observed by looking at an object first with one eye closed, then with the other."
//         />
//         <GridContentTemplate
//           numero="3"
//           title="Astronomy"
//           buttonLabel="In astronomy, parallax measures the distance of nearby stars from Earth."
//         />

//         <div className="my-10 relative aspect-video">
//           <Image
//             src="/assets/images/carousel-07.jpg"
//             alt="Parallax explanation"
//             fill
//             className="object-cover rounded-lg"
//           />
//         </div>

//         <GridContentTemplate
//           numero="4"
//           title="Distance"
//           buttonLabel="Earth's orbit allows calculation of its distance based on the angle of apparent shift."
//         />
//         <GridContentTemplate
//           numero="5"
//           title="Imaging"
//           buttonLabel="Parallax is crucial in 3D imaging and photography."
//         />
//         <GridContentTemplate
//           numero="6"
//           title="Illusion"
//           buttonLabel="It creates the illusion of depth by presenting slightly different images to each eye."
//         />

//         <div className="mt-10 relative aspect-video">
//           <Image
//             src="/assets/images/carousel-08.jpg"
//             alt="Depth illustration"
//             fill
//             className="object-cover rounded-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiColumnCaroParallax;

// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { Image } from 'next/image';
// // import Carousel from './Carousel'
// // import carousel01             from "/assets/images/carousel-filipinas/carousel-filipinas-01.webp";
// // import carousel02             from "/assets/images/carousel-filipinas/carousel-filipinas-02.webp";
// // import carousel03             from "/assets/images/carousel-filipinas/carousel-filipinas-03.webp";
// // import carousel04             from "/assets/images/carousel-filipinas/carousel-filipinas-04.webp";
// // import carousel05             from "/assets/images/carousel-filipinas/carousel-filipinas-05.webp";
// // import carousel07             from "/assets/images/carousel-filipinas/carousel-filipinas-07.webp";
// // import carousel08             from "/assets/images/carousel-filipinas/carousel-filipinas-08.webp";

// // interface GridContentProps {
// //   numero: string;
// //   title: string;
// //   buttonLabel: string;
// // }
// // const carouselImages = [
// //    {image: carousel01},
// //    {image: carousel02},
// //    {image: carousel03},
// //    {image: carousel04},
// //    {image: carousel05}
// // ];

// // const MultiColumnCaroParallax: React.FC = () => {

// //   return (
// //     <div className="caroParaGroupWrapper flex flex-col lg:flex-row gap-4 relative h-auto border border-solid border-gray-200 rounded-lg px-4 shadow-xl">
// //       {/* Left column: Carousel section */}
// //       <motion.div
// //         className="carouselWrapper sticky lg:sticky top-0 lg:top-1/2 h-fit-content"
// //       >
// //         <h1 className="text-left text-primary-500 font-light">Carousel</h1>
// //         <Carousel autoSlide autoSlideInterval={5000}>
// //          {/* <Image src="/assets/images/carousel-filipinas/carousel-filipinas-01.webp" alt="Image" />
// //          <Image src={carousel02} alt="Image" />
// //          <Image src={carousel03} alt="Image" /> */}
// //           {carouselImages.map((img, index) => (
// //             <Image key={index} src={img.image} alt="Carousel Image" />
// //           ))}
// //         </Carousel>
// //       </motion.div>

// //       {/* Right column */}
// //       <div
// //         className="rightLayoutWrapper relative text-left lg:w-500 top-0 text-primary-900"
// //       >
// //         <h1 className="multiColumnHeader text-primary-400 font-size-1.5rem letter-spacing-1 text-uppercase mb-3 mt-0">
// //           {useWindowBreakpoint ? (
// //             useWindowBreakpoint.lessMessage
// //           ) : (
// //             useWindowBreakpoint.moreMessage
// //           )}
// //         </h1>
// //         <GridContentTemplate numero="1" title="Position" buttonLabel="Parallax is the apparent shift in the position of an object." />
// //         <GridContentTemplate numero="2" title="Observation" buttonLabel="Observed by looking at an object first with one eye closed, then with the other." />
// //         <GridContentTemplate numero="3" title="Astronomy" buttonLabel="In astronomy, parallax measures the distance of nearby stars from Earth." />
// //         <div className="my-10">
// //           <Image src={carousel07} alt="Image" />
// //         </div>
// //         <GridContentTemplate numero="4" title="Distance" buttonLabel="Earth's orbit allows calculation of its distance based on the angle of apparent shift." />
// //         <GridContentTemplate numero="5" title="Imaging" buttonLabel="Parallax is crucial in 3D imaging and photography." />
// //         <GridContentTemplate numero="6" title="Illusion" buttonLabel="It creates the illusion of depth by presenting slightly different images to each eye." />
// //         <div className="mb-0">
// //           <Image src={carousel08} alt="Image" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MultiColumnCaroParallax;

// // interface GridContentTemplateProps {
// //    numero: string;
// //    title: string;
// //    buttonLabel: string;
// //  }
// //  // Grid Content Template Component
// //  const GridContentTemplate: React.FC<GridContentTemplateProps> = ({
// //    numero,
// //    title,
// //    buttonLabel,
// //  }) => (
// //    <div className="flex gap-4 my-6 pt-[0.6rem] border-t border-primary-100">
// //      <div className="font-light text-[2rem] md:text-[3rem] leading-none w-[4rem]">
// //        {numero}
// //      </div>
// //      <div>
// //        <p className="text-xs uppercase">{title}</p>
// //        <button className="text-[1.65rem] font-light text-left">
// //          {buttonLabel}
// //        </button>
// //      </div>
// //    </div>
// //  );

// // // GridContentTemplate Component (optional)
// // // const GridContentTemplate: React.FC<GridContentProps> = ({ numero, title, buttonLabel }) => {
// //   // ... your GridContentTemplate implementation
// // // };

// // // export default GridContentTemplate;