'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface RevealSectionProps {
  sections: Array<{
    images: string[]; // Array of image URLs for each section
  }>;
}

export function MultiRevealSection({ sections }: RevealSectionProps) {
  const { scrollYProgress } = useScroll();

  // Calculate height of each section
  const sectionHeight = 1 / sections.length;

  return (
    <div className="relative w-screen h-[300vh] overflow-hidden bg-black">
      {sections.map((section, index) => {
        const start = index * sectionHeight;
        const end = (index + 1) * sectionHeight;

        // Y and opacity transforms for each section
        const y = useTransform(scrollYProgress, [start, end], ['0%', '-100%']);
        const opacity = useTransform(scrollYProgress, [start, end - 0.1], [1, 0]);

        return (
          <motion.div
            key={index}
            style={{
              y,
              opacity,
            }}
            className="absolute inset-0 w-full h-screen z-[10]"
          >
            {section.images.length === 1 ? (
              // Single image section
              <Image
                src={section.images[0]}
                alt={`Section ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            ) : (
              // Multi-image section
              <div className="grid grid-cols-3 gap-4 h-full w-full">
                {section.images.map((img, imgIndex) => (
                  <div key={imgIndex} className="relative h-full w-full">
                    <Image
                      src={img}
                      alt={`Section ${index + 1} - Image ${imgIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// 'use client';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import Image from 'next/image';

// interface RevealSectionProps {
//   sections: Array<{
//     images: string[]; // Array of image URLs for each section
//   }>;
// }

// export function MultiRevealSection({ sections }: RevealSectionProps) {
//   const { scrollYProgress } = useScroll();

//   // Calculate individual section heights
//   const sectionHeight = 1 / sections.length;

//   return (
//     <div className="relative w-screen h-[300vh] overflow-hidden bg-black">
//       {sections.map((section, index) => {
//         const start = index * sectionHeight;
//         const end = (index + 1) * sectionHeight;

//         // Y and opacity transforms for each section
//         const y = useTransform(scrollYProgress, [start, end], ['0%', '-100%']);
//         const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

//         return (
//           <motion.div
//             key={index}
//             style={{
//               y,
//               opacity,
//             }}
//             className="absolute inset-0 w-full h-screen z-[10]"
//           >
//             {section.images.length === 1 ? (
//               // Single image section
//               <Image
//                 src={section.images[0]}
//                 alt={`Section ${index + 1}`}
//                 fill
//                 className="object-cover"
//                 sizes="100vw"
//                 priority={index === 0}
//               />
//             ) : (
//               // Multi-image section
//               <div className="grid grid-cols-3 gap-4 h-full w-full">
//                 {section.images.map((img, imgIndex) => (
//                   <div key={imgIndex} className="relative h-full w-full">
//                     <Image
//                       src={img}
//                       alt={`Section ${index + 1} - Image ${imgIndex + 1}`}
//                       fill
//                       className="object-cover"
//                       sizes="33vw"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }


// // 'use client';
// // import { motion, useScroll, useTransform } from 'framer-motion';
// // import Image from 'next/image';

// // interface RevealSectionProps {
// //   sections: Array<{
// //     images: string[]; // Array of image URLs for each section
// //   }>;
// // }

// // export function MultiRevealSection({ sections }: RevealSectionProps) {
// //   const { scrollYProgress } = useScroll();

// //   // Calculate the animation range for each section
// //   const sectionHeight = 1 / sections.length;

// //   const transforms = sections.map((_, index) => {
// //     const start = index * sectionHeight;
// //     const end = (index + 1) * sectionHeight;

// //     // Ensure y-transform and opacity animate for each section
// //     const y = useTransform(scrollYProgress, [start, end], ['0%', '-100%']);
// //     const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

// //     return { y, opacity };
// //   });

// //   return (
// //     <div className="relative w-screen h-[300vh] overflow-hidden">
// //       {sections.map((section, index) => (
// //         <motion.div
// //           key={index}
// //           style={{
// //             y: transforms[index].y,
// //             opacity: transforms[index].opacity,
// //           }}
// //           className="absolute inset-0 w-full h-screen z-[10] pointer-events-none"
// //         >
// //           {section.images.length === 1 ? (
// //             <Image
// //               src={section.images[0]}
// //               alt={`Section ${index + 1}`}
// //               fill
// //               className="object-cover"
// //               sizes="100vw"
// //               priority={index === 0}
// //             />
// //           ) : (
// //             <div className="grid grid-cols-3 gap-4 h-full w-full">
// //               {section.images.map((img, imgIndex) => (
// //                 <div key={imgIndex} className="relative h-full w-full">
// //                   <Image
// //                     src={img}
// //                     alt={`Section ${index + 1} - Image ${imgIndex + 1}`}
// //                     fill
// //                     className="object-cover"
// //                     sizes="33vw"
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </motion.div>
// //       ))}
// //     </div>
// //   );
// // }


// // // 'use client';
// // // import { motion, useScroll, useTransform } from 'framer-motion';
// // // import Image from 'next/image';

// // // interface RevealSectionProps {
// // //   sections: Array<{
// // //     images: string[]; // Array of image URLs for each section
// // //   }>;
// // // }

// // // export function MultiRevealSection({ sections }: RevealSectionProps) {
// // //   const { scrollYProgress } = useScroll();

// // //   // Total scroll height divided among sections
// // //   const sectionHeight = 1 / sections.length;

// // //   // Transforms for each section
// // //   const transforms = sections.map((_, index) => {
// // //     const start = index * sectionHeight;
// // //     const end = (index + 1) * sectionHeight;

// // //     const y = useTransform(scrollYProgress, [start, end], ['0%', '-100%']);
// // //     const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

// // //     return { y, opacity };
// // //   });

// // //   return (
// // //     <div className="relative w-screen h-[300vh]">
// // //       {sections.map((section, index) => (
// // //         <motion.div
// // //           key={index}
// // //           style={{
// // //             y: transforms[index].y,
// // //             opacity: transforms[index].opacity,
// // //           }}
// // //           className="absolute inset-0 w-full h-screen z-[10]"
// // //         >
// // //           {section.images.length === 1 ? (
// // //             <Image
// // //               src={section.images[0]}
// // //               alt={`Section ${index + 1}`}
// // //               fill
// // //               className="object-cover"
// // //               sizes="100vw"
// // //               priority={index === 0}
// // //             />
// // //           ) : (
// // //             <div className="grid grid-cols-3 gap-4 h-full w-full">
// // //               {section.images.map((img, imgIndex) => (
// // //                 <div key={imgIndex} className="relative h-full w-full">
// // //                   <Image
// // //                     src={img}
// // //                     alt={`Section ${index + 1} - Image ${imgIndex + 1}`}
// // //                     fill
// // //                     className="object-cover"
// // //                     sizes="33vw"
// // //                   />
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </motion.div>
// // //       ))}
// // //     </div>
// // //   );
// // // }



// // // // 'use client';
// // // // import { motion, useScroll, useTransform } from 'framer-motion';
// // // // import Image from 'next/image';

// // // // interface RevealSectionProps {
// // // //   sections: Array<{
// // // //     images: string[]; // Array of image URLs for each section
// // // //   }>;
// // // // }

// // // // export function MultiRevealSection({ sections }: RevealSectionProps) {
// // // //   const { scrollYProgress } = useScroll();

// // // //   // Generate transforms for each section
// // // //   const transforms = sections.map((_, index) => {
// // // //     const start = index / sections.length;
// // // //     const end = (index + 1) / sections.length;

// // // //     const y = useTransform(scrollYProgress, [start, end], ['0%', '-100%']);
// // // //     const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

// // // //     return { y, opacity };
// // // //   });

// // // //   return (
// // // //     <div className="relative w-screen h-[300vh] overflow-hidden">
// // // //       {sections.map((section, index) => (
// // // //         <motion.div
// // // //           key={index}
// // // //           style={{
// // // //             y: transforms[index].y,
// // // //             opacity: transforms[index].opacity,
// // // //           }}
// // // //           className="absolute inset-0 w-full h-screen"
// // // //         >
// // // //           <Image
// // // //             src={section.images[0]}
// // // //             alt={`Section ${index + 1}`}
// // // //             fill
// // // //             className="object-cover"
// // // //             sizes="100vw"
// // // //             priority={index === 0}
// // // //           />
// // // //         </motion.div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }
// // // // // 'use client';
// // // // // import { motion, useScroll, useTransform } from 'framer-motion';
// // // // // import Image from 'next/image';

// // // // // interface RevealSectionProps {
// // // // //   sections: Array<{
// // // // //     images: string[]; // Array of image URLs for each section
// // // // //   }>;
// // // // // }

// // // // // export function MultiRevealSection({ sections }: RevealSectionProps) {
// // // // //   const { scrollYProgress } = useScroll();

// // // // //   // Create transforms for each section's reveal
// // // // //   const transforms = sections.map((_, index) => {
// // // // //     const start = index / sections.length;
// // // // //     const end = (index + 1) / sections.length;

// // // // //     return {
// // // // //       opacity: useTransform(scrollYProgress, [start, end], [1, 0]),
// // // // //       y: useTransform(scrollYProgress, [start, end], ['0%', '-100%']),
// // // // //     };
// // // // //   });

// // // // //   return (
// // // // //     <div className="relative w-screen h-[300vh]">
// // // // //       {sections.map((section, index) => (
// // // // //         <motion.div
// // // // //           key={index}
// // // // //           style={{
// // // // //             y: transforms[index].y,
// // // // //             opacity: transforms[index].opacity,
// // // // //           }}
// // // // //           className="absolute inset-0 w-full h-screen"
// // // // //         >
// // // // //           <Image
// // // // //             src={section.images[0]}
// // // // //             alt={`Section ${index + 1}`}
// // // // //             fill
// // // // //             className="object-cover"
// // // // //             sizes="100vw"
// // // // //             priority={index === 0}
// // // // //           />
// // // // //         </motion.div>
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // // 'use client';
// // // // // // import { motion, useAnimation } from 'framer-motion';
// // // // // // import { useEffect } from 'react';
// // // // // // import { useInView } from 'react-intersection-observer';
// // // // // // import Image from 'next/image';

// // // // // // interface RevealSectionProps {
// // // // // //   sections: Array<{
// // // // // //     images: string[]; // Array of image URLs for each section
// // // // // //   }>;
// // // // // // }

// // // // // // export function MultiRevealSection({ sections }: RevealSectionProps) {
// // // // // //   const controls = useAnimation();
// // // // // //   const controls2 = useAnimation();
// // // // // //   const controls3 = useAnimation();

// // // // // //   // Intersection observers for sections
// // // // // //   const { ref: section1Ref, inView: section1InView } = useInView({ threshold: 0.5 });
// // // // // //   const { ref: section2Ref, inView: section2InView } = useInView({ threshold: 0.5 });
// // // // // //   const { ref: section3Ref, inView: section3InView } = useInView({ threshold: 0.5 });

// // // // // //   // Animate on visibility
// // // // // //   useEffect(() => {
// // // // // //     if (section1InView) controls.start('visible');
// // // // // //     else controls.start('hidden');
// // // // // //   }, [section1InView, controls]);

// // // // // //   useEffect(() => {
// // // // // //     if (section2InView) controls2.start('visible');
// // // // // //     else controls2.start('hidden');
// // // // // //   }, [section2InView, controls2]);

// // // // // //   useEffect(() => {
// // // // // //     if (section3InView) controls3.start('visible');
// // // // // //     else controls3.start('hidden');
// // // // // //   }, [section3InView, controls3]);

// // // // // //   // Animation variants
// // // // // //   const sectionVariants = {
// // // // // //     hidden: { opacity: 0, y: 100 },
// // // // // //     visible: { opacity: 1, y: 0, transition: { duration: 1 } },
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="relative w-screen h-[300vh] overflow-hidden">
// // // // // //       {/* First Section */}
// // // // // //       <div
// // // // // //         className="sticky top-0 h-screen w-full z-30 flex items-center justify-center bg-gray-800"
// // // // // //         ref={section1Ref}
// // // // // //       >
// // // // // //         <motion.div
// // // // // //           variants={sectionVariants}
// // // // // //           initial="hidden"
// // // // // //           animate={controls}
// // // // // //           className="absolute inset-0"
// // // // // //         >
// // // // // //           <Image
// // // // // //             src={sections[0].images[0]}
// // // // // //             alt="First Section"
// // // // // //             fill
// // // // // //             className="object-cover"
// // // // // //             sizes="100vw"
// // // // // //           />
// // // // // //         </motion.div>
// // // // // //       </div>

// // // // // //       {/* Second Section */}
// // // // // //       <div
// // // // // //         className="sticky top-0 h-screen w-full z-20 flex items-center justify-center bg-gray-700"
// // // // // //         ref={section2Ref}
// // // // // //       >
// // // // // //         <motion.div
// // // // // //           variants={sectionVariants}
// // // // // //           initial="hidden"
// // // // // //           animate={controls2}
// // // // // //           className="absolute inset-0"
// // // // // //         >
// // // // // //           <Image
// // // // // //             src={sections[1].images[0]}
// // // // // //             alt="Second Section"
// // // // // //             fill
// // // // // //             className="object-cover"
// // // // // //             sizes="100vw"
// // // // // //           />
// // // // // //         </motion.div>
// // // // // //       </div>

// // // // // //       {/* Third Section */}
// // // // // //       <div
// // // // // //         className="sticky top-0 h-screen w-full z-10 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-600"
// // // // // //         ref={section3Ref}
// // // // // //       >
// // // // // //         {sections[2].images.map((image, index) => (
// // // // // //           <motion.div
// // // // // //             key={index}
// // // // // //             variants={sectionVariants}
// // // // // //             initial="hidden"
// // // // // //             animate={controls3}
// // // // // //             className="relative h-full"
// // // // // //           >
// // // // // //             <Image
// // // // // //               src={image}
// // // // // //               alt={`Third Section Image ${index + 1}`}
// // // // // //               fill
// // // // // //               className="object-cover rounded-md"
// // // // // //               sizes="(max-width: 768px) 100vw, 33vw"
// // // // // //             />
// // // // // //           </motion.div>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // // // 'use client';
// // // // // // // import { useEffect } from 'react';
// // // // // // // import { motion, useAnimation } from 'framer-motion';
// // // // // // // import { useInView } from 'react-intersection-observer';
// // // // // // // import Image from 'next/image';

// // // // // // // interface RevealSectionProps {
// // // // // // //   sections: Array<{
// // // // // // //     images: string[]; // Array of image URLs for each section
// // // // // // //   }>;
// // // // // // // }

// // // // // // // export function MultiRevealSection({ sections }: RevealSectionProps) {
// // // // // // //   const controls1 = useAnimation();
// // // // // // //   const controls2 = useAnimation();
// // // // // // //   const controls3 = useAnimation();

// // // // // // //   // `useInView` setup
// // // // // // //   const { ref: firstDivRef, inView: firstInView } = useInView({ threshold: 0.5, triggerOnce: true });
// // // // // // //   const { ref: secondDivRef, inView: secondInView } = useInView({ threshold: 0.5, triggerOnce: true });
// // // // // // //   const { ref: thirdDivRef, inView: thirdInView } = useInView({ threshold: 0.5, triggerOnce: true });

// // // // // // //   // Trigger animations
// // // // // // //   useEffect(() => {
// // // // // // //     if (firstInView) controls1.start('visible');
// // // // // // //   }, [firstInView, controls1]);

// // // // // // //   useEffect(() => {
// // // // // // //     if (secondInView) controls2.start('visible');
// // // // // // //   }, [secondInView, controls2]);

// // // // // // //   useEffect(() => {
// // // // // // //     if (thirdInView) controls3.start('visible');
// // // // // // //   }, [thirdInView, controls3]);

// // // // // // //   // Animation variants
// // // // // // //   const sectionVariants = {
// // // // // // //     hidden: { y: '100%', opacity: 0 },
// // // // // // //     visible: {
// // // // // // //       y: 0,
// // // // // // //       opacity: 1,
// // // // // // //       transition: {
// // // // // // //         duration: 1,
// // // // // // //         ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier easing
// // // // // // //       },
// // // // // // //     },
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="relative w-screen h-[300vh]">
// // // // // // //       {/* First Section */}
// // // // // // //       <motion.div
// // // // // // //         ref={firstDivRef}
// // // // // // //         variants={sectionVariants}
// // // // // // //         initial="hidden"
// // // // // // //         animate={controls1}
// // // // // // //         className="absolute top-0 h-screen w-full bg-gray-800 flex items-center justify-center z-30 will-change-transform will-change-opacity"
// // // // // // //       >
// // // // // // //         <Image
// // // // // // //           src={sections[0].images[0]}
// // // // // // //           alt="First Section Image"
// // // // // // //           fill
// // // // // // //           className="object-cover"
// // // // // // //           sizes="100vw"
// // // // // // //         />
// // // // // // //       </motion.div>

// // // // // // //       {/* Second Section */}
// // // // // // //       <motion.div
// // // // // // //         ref={secondDivRef}
// // // // // // //         variants={sectionVariants}
// // // // // // //         initial="hidden"
// // // // // // //         animate={controls2}
// // // // // // //         className="absolute top-[100vh] h-screen w-full bg-gray-700 flex items-center justify-center z-20 will-change-transform will-change-opacity"
// // // // // // //       >
// // // // // // //         <Image
// // // // // // //           src={sections[1].images[0]}
// // // // // // //           alt="Second Section Image"
// // // // // // //           fill
// // // // // // //           className="object-cover"
// // // // // // //           sizes="100vw"
// // // // // // //         />
// // // // // // //       </motion.div>

// // // // // // //       {/* Third Section */}
// // // // // // //       <motion.div
// // // // // // //         ref={thirdDivRef}
// // // // // // //         variants={sectionVariants}
// // // // // // //         initial="hidden"
// // // // // // //         animate={controls3}
// // // // // // //         className="absolute top-[200vh] h-screen w-full bg-gray-600 grid grid-cols-1 md:grid-cols-3 gap-4 p-8 z-10 will-change-transform will-change-opacity"
// // // // // // //       >
// // // // // // //         {sections[2].images.map((image, index) => (
// // // // // // //           <div key={index} className="relative w-full h-full">
// // // // // // //             <Image
// // // // // // //               src={image}
// // // // // // //               alt={`Third Section Image ${index + 1}`}
// // // // // // //               fill
// // // // // // //               className="object-cover rounded-md"
// // // // // // //               sizes="(max-width: 768px) 100vw, 33vw"
// // // // // // //             />
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </motion.div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // // // 'use client';
// // // // // // // // import { useEffect } from 'react';
// // // // // // // // import { motion, useAnimation } from 'framer-motion';
// // // // // // // // import { useInView } from 'react-intersection-observer';
// // // // // // // // import Image from 'next/image';

// // // // // // // // interface RevealSectionProps {
// // // // // // // //   sections: Array<{
// // // // // // // //     images: string[]; // Array of image URLs for each section
// // // // // // // //   }>;
// // // // // // // // }

// // // // // // // // export function MultiRevealSection({ sections }: RevealSectionProps) {
// // // // // // // //   const controls1 = useAnimation();
// // // // // // // //   const controls2 = useAnimation();
// // // // // // // //   const controls3 = useAnimation();

// // // // // // // //   // Set up `useInView` for each section
// // // // // // // //   const { ref: firstDivRef, inView: firstInView } = useInView({ threshold: 0.5 });
// // // // // // // //   const { ref: secondDivRef, inView: secondInView } = useInView({ threshold: 0.5 });
// // // // // // // //   const { ref: thirdDivRef, inView: thirdInView } = useInView({ threshold: 0.5 });

// // // // // // // //   // Trigger animations when sections are in view
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (firstInView) controls1.start('visible');
// // // // // // // //     else controls1.start('hidden');
// // // // // // // //   }, [firstInView, controls1]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (secondInView) controls2.start('visible');
// // // // // // // //     else controls2.start('hidden');
// // // // // // // //   }, [secondInView, controls2]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (thirdInView) controls3.start('visible');
// // // // // // // //     else controls3.start('hidden');
// // // // // // // //   }, [thirdInView, controls3]);

// // // // // // // //   // Animation variants
// // // // // // // //   const sectionVariants = {
// // // // // // // //     hidden: { y: '100%', opacity: 0 },
// // // // // // // //     visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="relative w-screen h-[300vh]">
// // // // // // // //       {/* First Section */}
// // // // // // // //       <motion.div
// // // // // // // //         ref={firstDivRef}
// // // // // // // //         variants={sectionVariants}
// // // // // // // //         initial="hidden"
// // // // // // // //         animate={controls1}
// // // // // // // //         className="absolute top-0 h-screen w-full bg-gray-800 flex items-center justify-center z-30"
// // // // // // // //       >
// // // // // // // //         <Image
// // // // // // // //           src={sections[0].images[0]}
// // // // // // // //           alt="First Section Image"
// // // // // // // //           fill
// // // // // // // //           className="object-cover"
// // // // // // // //           sizes="100vw"
// // // // // // // //         />
// // // // // // // //       </motion.div>

// // // // // // // //       {/* Second Section */}
// // // // // // // //       <motion.div
// // // // // // // //         ref={secondDivRef}
// // // // // // // //         variants={sectionVariants}
// // // // // // // //         initial="hidden"
// // // // // // // //         animate={controls2}
// // // // // // // //         className="absolute top-[100vh] h-screen w-full bg-gray-700 flex items-center justify-center z-20"
// // // // // // // //       >
// // // // // // // //         <Image
// // // // // // // //           src={sections[1].images[0]}
// // // // // // // //           alt="Second Section Image"
// // // // // // // //           fill
// // // // // // // //           className="object-cover"
// // // // // // // //           sizes="100vw"
// // // // // // // //         />
// // // // // // // //       </motion.div>

// // // // // // // //       {/* Third Section */}
// // // // // // // //       <motion.div
// // // // // // // //         ref={thirdDivRef}
// // // // // // // //         variants={sectionVariants}
// // // // // // // //         initial="hidden"
// // // // // // // //         animate={controls3}
// // // // // // // //         className="absolute top-[200vh] h-screen w-full bg-gray-600 grid grid-cols-1 md:grid-cols-3 gap-4 p-8 z-10"
// // // // // // // //       >
// // // // // // // //         {sections[2].images.map((image, index) => (
// // // // // // // //           <div key={index} className="relative w-full h-full">
// // // // // // // //             <Image
// // // // // // // //               src={image}
// // // // // // // //               alt={`Third Section Image ${index + 1}`}
// // // // // // // //               fill
// // // // // // // //               className="object-cover rounded-md"
// // // // // // // //               sizes="(max-width: 768px) 100vw, 33vw"
// // // // // // // //             />
// // // // // // // //           </div>
// // // // // // // //         ))}
// // // // // // // //       </motion.div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // // 'use client';
// // // // // // // // // import { useRef, useEffect } from 'react';
// // // // // // // // // import { motion, useAnimation } from 'framer-motion';
// // // // // // // // // import { useInView } from 'react-intersection-observer';
// // // // // // // // // import Image from 'next/image';

// // // // // // // // // interface RevealSectionProps {
// // // // // // // // //   sections: Array<{
// // // // // // // // //     images: string[]; // Array of image URLs for each section
// // // // // // // // //   }>;
// // // // // // // // // }

// // // // // // // // // export function MultiRevealSection({ sections }: RevealSectionProps) {
// // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // //   const controls = useAnimation();

// // // // // // // // //   const { ref: firstDivRef, inView: firstInView } = useInView({ threshold: 0.2 });

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (firstInView) {
// // // // // // // // //       controls.start('visible');
// // // // // // // // //     } else {
// // // // // // // // //       controls.start('hidden');
// // // // // // // // //     }
// // // // // // // // //   }, [firstInView, controls]);

// // // // // // // // //   const scrollVariants = (index: number) => ({
// // // // // // // // //     hidden: { y: `${index * 100}%` },
// // // // // // // // //     visible: { y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
// // // // // // // // //   });

// // // // // // // // //   return (
// // // // // // // // //     <div ref={containerRef} className="relative h-screen overflow-hidden">
// // // // // // // // //       {/* First Div */}
// // // // // // // // //       <motion.div
// // // // // // // // //         ref={firstDivRef}
// // // // // // // // //         variants={scrollVariants(1)}
// // // // // // // // //         initial="hidden"
// // // // // // // // //         animate={controls}
// // // // // // // // //         className="absolute inset-0 h-full w-full bg-gray-800 flex items-center justify-center"
// // // // // // // // //       >
// // // // // // // // //         <Image
// // // // // // // // //           src={sections[0].images[0]}
// // // // // // // // //           alt="First Section Image"
// // // // // // // // //           fill
// // // // // // // // //           className="object-cover"
// // // // // // // // //           priority
// // // // // // // // //           sizes="100vw"
// // // // // // // // //         />
// // // // // // // // //       </motion.div>

// // // // // // // // //       {/* Second Div */}
// // // // // // // // //       <motion.div
// // // // // // // // //         variants={scrollVariants(2)}
// // // // // // // // //         initial="hidden"
// // // // // // // // //         animate={controls}
// // // // // // // // //         className="absolute inset-0 h-full w-full bg-gray-700 flex items-center justify-center"
// // // // // // // // //       >
// // // // // // // // //         <Image
// // // // // // // // //           src={sections[1].images[0]}
// // // // // // // // //           alt="Second Section Image"
// // // // // // // // //           fill
// // // // // // // // //           className="object-cover"
// // // // // // // // //           priority
// // // // // // // // //           sizes="100vw"
// // // // // // // // //         />
// // // // // // // // //       </motion.div>

// // // // // // // // //       {/* Third Div */}
// // // // // // // // //       <motion.div
// // // // // // // // //         variants={scrollVariants(3)}
// // // // // // // // //         initial="hidden"
// // // // // // // // //         animate={controls}
// // // // // // // // //         className="absolute inset-0 h-full w-full bg-gray-600 grid grid-cols-1 md:grid-cols-3 gap-4 p-8"
// // // // // // // // //       >
// // // // // // // // //         {sections[2].images.map((image, index) => (
// // // // // // // // //           <div key={index} className="relative w-full h-full">
// // // // // // // // //             <Image
// // // // // // // // //               src={image}
// // // // // // // // //               alt={`Third Section Image ${index + 1}`}
// // // // // // // // //               fill
// // // // // // // // //               className="object-cover rounded-md"
// // // // // // // // //               sizes="(max-width: 768px) 100vw, 33vw"
// // // // // // // // //             />
// // // // // // // // //           </div>
// // // // // // // // //         ))}
// // // // // // // // //       </motion.div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // // // import { useRef, useEffect } from 'react';
// // // // // // // // // // import { motion, useAnimation } from 'framer-motion';
// // // // // // // // // // import { useInView } from 'react-intersection-observer';
// // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // //   sections: Array<{
// // // // // // // // // //     images: string[]; // Array of image URLs for each section
// // // // // // // // // //   }>;
// // // // // // // // // // }

// // // // // // // // // // export function MultiRevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // //   const controls = useAnimation();

// // // // // // // // // //   const { ref: firstDivRef, inView: firstInView } = useInView({ threshold: 0.2 });
// // // // // // // // // //   const { ref: secondDivRef, inView: secondInView } = useInView({ threshold: 0.2 });
// // // // // // // // // //   const { ref: thirdDivRef, inView: thirdInView } = useInView({ threshold: 0.2 });

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (firstInView) {
// // // // // // // // // //       controls.start('visible');
// // // // // // // // // //     } else {
// // // // // // // // // //       controls.start('hidden');
// // // // // // // // // //     }
// // // // // // // // // //   }, [firstInView, controls]);

// // // // // // // // // //   const containerVariants = {
// // // // // // // // // //     hidden: { opacity: 0 },
// // // // // // // // // //     visible: { opacity: 1, transition: { duration: 0.5 } },
// // // // // // // // // //   };

// // // // // // // // // //   const scrollVariants = (index: number) => ({
// // // // // // // // // //     hidden: { y: `${index * 100}%` },
// // // // // // // // // //     visible: { y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
// // // // // // // // // //   });

// // // // // // // // // //   return (
// // // // // // // // // //     <div ref={containerRef} className="relative h-screen overflow-hidden">
// // // // // // // // // //       {/* First Div */}
// // // // // // // // // //       <motion.div
// // // // // // // // // //         ref={firstDivRef}
// // // // // // // // // //         variants={scrollVariants(1)}
// // // // // // // // // //         initial="hidden"
// // // // // // // // // //         animate={controls}
// // // // // // // // // //         className="absolute inset-0 h-full w-full bg-gray-800 flex items-center justify-center"
// // // // // // // // // //       >
// // // // // // // // // //         <Image
// // // // // // // // // //           src={sections[0].images[0]}
// // // // // // // // // //           alt="First Section Image"
// // // // // // // // // //           fill
// // // // // // // // // //           className="object-cover"
// // // // // // // // // //           priority
// // // // // // // // // //           sizes="100vw"
// // // // // // // // // //         />
// // // // // // // // // //       </motion.div>

// // // // // // // // // //       {/* Second Div */}
// // // // // // // // // //       <motion.div
// // // // // // // // // //         ref={secondDivRef}
// // // // // // // // // //         variants={scrollVariants(2)}
// // // // // // // // // //         initial="hidden"
// // // // // // // // // //         animate={controls}
// // // // // // // // // //         className="absolute inset-0 h-full w-full bg-gray-700 flex items-center justify-center"
// // // // // // // // // //       >
// // // // // // // // // //         <Image
// // // // // // // // // //           src={sections[1].images[0]}
// // // // // // // // // //           alt="Second Section Image"
// // // // // // // // // //           fill
// // // // // // // // // //           className="object-cover"
// // // // // // // // // //           priority
// // // // // // // // // //           sizes="100vw"
// // // // // // // // // //         />
// // // // // // // // // //       </motion.div>

// // // // // // // // // //       {/* Third Div */}
// // // // // // // // // //       <motion.div
// // // // // // // // // //         ref={thirdDivRef}
// // // // // // // // // //         variants={scrollVariants(3)}
// // // // // // // // // //         initial="hidden"
// // // // // // // // // //         animate={controls}
// // // // // // // // // //         className="absolute inset-0 h-full w-full bg-gray-600 grid grid-cols-1 md:grid-cols-3 gap-4 p-8"
// // // // // // // // // //       >
// // // // // // // // // //         {sections[2].images.map((image, index) => (
// // // // // // // // // //           <div key={index} className="relative w-full h-full">
// // // // // // // // // //             <Image
// // // // // // // // // //               src={image}
// // // // // // // // // //               alt={`Third Section Image ${index + 1}`}
// // // // // // // // // //               fill
// // // // // // // // // //               className="object-cover rounded-md"
// // // // // // // // // //               sizes="(max-width: 768px) 100vw, 33vw"
// // // // // // // // // //             />
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}
// // // // // // // // // //       </motion.div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // // // import { useRef, useEffect } from 'react';
// // // // // // // // // // // import { motion, useAnimation } from 'framer-motion';
// // // // // // // // // // // import { useInView } from 'react-intersection-observer';
// // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // //   sections: Array<{
// // // // // // // // // // //     images: string[]; // Array of image URLs for each section
// // // // // // // // // // //   }>;
// // // // // // // // // // // }

// // // // // // // // // // // export function MultiRevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // //   const controls = useAnimation();

// // // // // // // // // // //   const { ref: firstDivRef, inView: firstInView } = useInView({ threshold: 0.2 });
// // // // // // // // // // //   const { ref: secondDivRef, inView: secondInView } = useInView({ threshold: 0.2 });
// // // // // // // // // // //   const { ref: thirdDivRef, inView: thirdInView } = useInView({ threshold: 0.2 });

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (firstInView) controls.start('visible');
// // // // // // // // // // //     else controls.start('hidden');
// // // // // // // // // // //   }, [firstInView, controls]);

// // // // // // // // // // //   const containerVariants = {
// // // // // // // // // // //     hidden: { opacity: 0 },
// // // // // // // // // // //     visible: { opacity: 1, transition: { duration: 0.5 } },
// // // // // // // // // // //   };

// // // // // // // // // // //   const scrollVariants = (index: number) => ({
// // // // // // // // // // //     hidden: { y: `${index * 100}%` },
// // // // // // // // // // //     visible: { y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
// // // // // // // // // // //   });

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div
// // // // // // // // // // //       className="fixed inset-0 w-screen h-screen overflow-hidden"
// // // // // // // // // // //       ref={containerRef}
// // // // // // // // // // //       initial="hidden" // Set initial state for container
// // // // // // // // // // //     >
// // // // // // // // // // //       {/* First Div */}
// // // // // // // // // // //       <motion.div
// // // // // // // // // // //         ref={firstDivRef}
// // // // // // // // // // //         variants={scrollVariants(1)}
// // // // // // // // // // //         initial="hidden"
// // // // // // // // // // //         animate={controls}
// // // // // // // // // // //         className="absolute inset-0 h-screen w-screen bg-gray-800 flex items-center justify-center"
// // // // // // // // // // //       >
// // // // // // // // // // //         <Image
// // // // // // // // // // //           src={sections[0].images[0]} // First section's single image
// // // // // // // // // // //           alt="First Section Image"
// // // // // // // // // // //           fill
// // // // // // // // // // //           className="object-cover"
// // // // // // // // // // //           priority
// // // // // // // // // // //           sizes="100vw"
// // // // // // // // // // //         />
// // // // // // // // // // //       </motion.div>

// // // // // // // // // // //       {/* Second Div */}
// // // // // // // // // // //       <motion.div
// // // // // // // // // // //         ref={secondDivRef}
// // // // // // // // // // //         variants={scrollVariants(2)}
// // // // // // // // // // //         initial="hidden"
// // // // // // // // // // //         animate={controls}
// // // // // // // // // // //         className="absolute inset-0 h-screen w-screen bg-gray-700 flex items-center justify-center"
// // // // // // // // // // //       >
// // // // // // // // // // //         <Image
// // // // // // // // // // //           src={sections[1].images[0]} // Second section's single image
// // // // // // // // // // //           alt="Second Section Image"
// // // // // // // // // // //           fill
// // // // // // // // // // //           className="object-cover"
// // // // // // // // // // //           priority
// // // // // // // // // // //           sizes="100vw"
// // // // // // // // // // //         />
// // // // // // // // // // //       </motion.div>

// // // // // // // // // // //       {/* Third Div */}
// // // // // // // // // // //       <motion.div
// // // // // // // // // // //         ref={thirdDivRef}
// // // // // // // // // // //         variants={scrollVariants(3)}
// // // // // // // // // // //         initial="hidden"
// // // // // // // // // // //         animate={controls}
// // // // // // // // // // //         className="absolute inset-0 h-screen w-screen bg-gray-600 grid grid-cols-1 md:grid-cols-3 gap-4 p-8"
// // // // // // // // // // //       >
// // // // // // // // // // //         {sections[2].images.map((image, index) => (
// // // // // // // // // // //           <div key={index} className="relative w-full h-full">
// // // // // // // // // // //             <Image
// // // // // // // // // // //               src={image} // Third section's three images
// // // // // // // // // // //               alt={`Third Section Image ${index + 1}`}
// // // // // // // // // // //               fill
// // // // // // // // // // //               className="object-cover rounded-md"
// // // // // // // // // // //               sizes="(max-width: 768px) 100vw, 33vw"
// // // // // // // // // // //             />
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ))}
// // // // // // // // // // //       </motion.div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }