/*-= src/components/parallax2/RevealSection.tsx =-*/
/*-= Went back to version before git backup =-*/




// /*-= Went back to version before git backup =-*/
// /*-= Fixed RevealSection Component • Reverse z-index =-*/
// 'use client';
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

// gsap.registerPlugin(ScrollTrigger);

// interface Section {
//   image: string;
//   title: string;
// }

// interface RevealSectionProps {
//   sections: Section[];
// }

// export function RevealSection({ sections }: RevealSectionProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: 'top top',
//           end: '+=200%',
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });

//       // Animate sections sequentially
//       sections.forEach((_, index) => {
//         if (index === sections.length - 1) return; // Skip last section
//         const section = sectionRefs.current[index];

//         tl.to(section, {
//           yPercent: -100,
//           duration: 1
//         });
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="fixed inset-0 w-screen h-screen">
//       <div
//         ref={containerRef}
//         className="relative h-full w-full overflow-hidden"
//       >
//         {sections.map((section, index) => (
//           <div
//             key={index}
//             ref={el => sectionRefs.current[index] = el}
//             className="absolute inset-0 w-full h-full"
//             style={{
//               zIndex: sections.length - index, // Reverse z-index order
//             }}
//           >
//             <div className="absolute inset-0">
//               <Image
//                 src={section.image}
//                 alt={section.title}
//                 fill
//                 className="object-cover"
//                 priority={index === 0}
//                 sizes="100vw"
//               />
//             </div>
//             <div className="relative h-full flex items-center justify-center">
//               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
//                 {section.title}
//               </h2>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // /*-= Framer Motion RevealSection =-*/
// // 'use client';
// // import { useRef } from 'react';
// // import { motion, useScroll, useTransform } from 'framer-motion';
// // import Image from 'next/image';

// // interface Section {
// //   image: string;
// //   title: string;
// // }

// // interface RevealSectionProps {
// //   sections: Section[];
// //   additionalImages: string[];
// // }

// // export function RevealSection({ sections, additionalImages }: RevealSectionProps) {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const { scrollYProgress } = useScroll({
// //     target: containerRef,
// //     offset: ["start start", "end end"]
// //   });

// //   const y1 = useTransform(scrollYProgress, [0, 0.33], [0, -100]);
// //   const y2 = useTransform(scrollYProgress, [0.33, 0.66], [0, -100]);
// //   const y3 = useTransform(scrollYProgress, [0.66, 1], [0, -100]);

// //   return (
// //     <div ref={containerRef} className="relative w-screen">
// //       {/* Welcome Section */}
// //       <motion.div
// //         className="fixed inset-0 w-full h-full"
// //         style={{ zIndex: 30 }}
// //         animate={{ y: `${y1.get()}%` }}
// //       >
// //         <Image
// //           src={sections[0].image}
// //           alt={sections[0].title}
// //           fill
// //           className="object-cover"
// //           priority
// //           sizes="100vw"
// //         />
// //         <div className="relative h-full flex items-center justify-center">
// //           <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// //             {sections[0].title}
// //           </h2>
// //         </div>
// //       </motion.div>

// //       {/* Portfolio Section */}
// //       <motion.div
// //         className="fixed inset-0 w-full h-full"
// //         style={{ zIndex: 20, y: '100%' }}
// //         animate={{ y: `${100 + y2.get()}%` }}
// //       >
// //         <Image
// //           src={sections[1].image}
// //           alt={sections[1].title}
// //           fill
// //           className="object-cover"
// //           sizes="100vw"
// //         />
// //         <div className="relative h-full flex items-center justify-center">
// //           <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// //             {sections[1].title}
// //           </h2>
// //         </div>
// //       </motion.div>

// //       {/* About Section with Additional Images */}
// //       <motion.div
// //         className="fixed inset-0 w-full h-full"
// //         style={{ zIndex: 10, y: '200%' }}
// //         animate={{ y: `${200 + y3.get()}%` }}
// //       >
// //         <Image
// //           src={sections[2].image}
// //           alt={sections[2].title}
// //           fill
// //           className="object-cover"
// //           sizes="100vw"
// //         />
// //         <div className="relative h-full flex items-center justify-center">
// //           <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// //             {sections[2].title}
// //           </h2>
// //         </div>

// //         {/* Additional Images */}
// //         {additionalImages.map((img, index) => (
// //           <motion.div
// //             key={index}
// //             className="absolute inset-0 w-full h-full"
// //             style={{
// //               zIndex: index + 1,
// //               y: `${300 + (index * 100)}%`
// //             }}
// //             animate={{
// //               y: `${300 + (index * 100) + useTransform(scrollYProgress,
// //                 [0.66 + ((index + 1) * 0.11), 0.66 + ((index + 2) * 0.11)],
// //                 [0, -100]).get()}%`
// //             }}
// //           >
// //             <Image
// //               src={img}
// //               alt={`Additional view ${index + 1}`}
// //               fill
// //               className="object-cover"
// //               sizes="100vw"
// //             />
// //           </motion.div>
// //         ))}
// //       </motion.div>
// //     </div>
// //   );
// // }

// // // /*-= Fixed RevealSection Component =-*/
// // // 'use client';
// // // import { useEffect, useRef } from 'react';
// // // import { gsap } from 'gsap';
// // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // import Image from 'next/image';

// // // gsap.registerPlugin(ScrollTrigger);

// // // interface Section {
// // //   image: string;
// // //   title: string;
// // // }

// // // interface RevealSectionProps {
// // //   sections: Section[];
// // //   additionalImages: string[];
// // // }

// // // export function RevealSection({ sections, additionalImages }: RevealSectionProps) {
// // //   const containerRef = useRef<HTMLDivElement>(null);

// // //   useEffect(() => {
// // //     const tl = gsap.timeline({
// // //       scrollTrigger: {
// // //         trigger: containerRef.current,
// // //         start: 'top top',
// // //         end: 'bottom bottom',
// // //         scrub: 1,
// // //       },
// // //     });

// // //     tl.to('.section', {
// // //       yPercent: -100,
// // //       duration: 1,
// // //       stagger: 1,
// // //       ease: 'none'
// // //     });

// // //     return () => {
// // //       // Clean up by killing the timeline and all ScrollTriggers
// // //       tl.kill();
// // //       ScrollTrigger.getAll().forEach(st => st.kill());
// // //     };
// // //   }, []);

// // //   return (
// // //     <div ref={containerRef} className="w-screen">
// // //       {sections.map((section, index) => (
// // //         <div
// // //           key={index}
// // //           className={`section fixed inset-0 w-full h-full`}
// // //           style={{
// // //             zIndex: sections.length - index,
// // //             transform: index === 0 ? 'none' : 'translateY(100%)'
// // //           }}
// // //         >
// // //           <div className="absolute inset-0">
// // //             <Image
// // //               src={section.image}
// // //               alt={section.title}
// // //               fill
// // //               className="object-cover"
// // //               priority={index === 0}
// // //               sizes="100vw"
// // //             />
// // //           </div>
// // //           <div className="relative h-full flex items-center justify-center">
// // //             <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // //               {section.title}
// // //             </h2>
// // //           </div>

// // //           {/* Additional images for About section */}
// // //           {index === 2 && additionalImages.map((img, imgIndex) => (
// // //             <div
// // //               key={`additional-${imgIndex}`}
// // //               className="section absolute inset-0 w-full h-full"
// // //               style={{
// // //                 zIndex: 1,
// // //                 transform: 'translateY(100%)'
// // //               }}
// // //             >
// // //               <Image
// // //                 src={img}
// // //                 alt={`Additional view ${imgIndex + 1}`}
// // //                 fill
// // //                 className="object-cover"
// // //                 sizes="100vw"
// // //               />
// // //             </div>
// // //           ))}
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }
// // // // /*-= Simplified RevealSection Component =-*/
// // // // 'use client';
// // // // import { useEffect, useRef } from 'react';
// // // // import { gsap } from 'gsap';
// // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // import Image from 'next/image';

// // // // gsap.registerPlugin(ScrollTrigger);

// // // // interface Section {
// // // //   image: string;
// // // //   title: string;
// // // // }

// // // // interface RevealSectionProps {
// // // //   sections: Section[];
// // // //   additionalImages: string[];
// // // // }

// // // // export function RevealSection({ sections, additionalImages }: RevealSectionProps) {
// // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // //   useEffect(() => {
// // // //     const tl = gsap.timeline({
// // // //       scrollTrigger: {
// // // //         trigger: containerRef.current,
// // // //         start: 'top top',
// // // //         end: 'bottom bottom',
// // // //         scrub: 1,
// // // //       },
// // // //     });

// // // //     tl.to('.section', {
// // // //       yPercent: -100,
// // // //       duration: 1,
// // // //       stagger: 1,
// // // //       ease: 'none'
// // // //     });

// // // //     return () => {
// // // //       // Clean up by killing both the timeline and ScrollTrigger
// // // //       tl.kill();
// // // //       ScrollTrigger.kill();
// // // //     };
// // // //   }, []);

// // // //   return (
// // // //     <div ref={containerRef} className="w-screen">
// // // //       {sections.map((section, index) => (
// // // //         <div
// // // //           key={index}
// // // //           className={`section fixed inset-0 w-full h-full`}
// // // //           style={{
// // // //             zIndex: sections.length - index,
// // // //             transform: index === 0 ? 'none' : 'translateY(100%)'
// // // //           }}
// // // //         >
// // // //           <div className="absolute inset-0">
// // // //             <Image
// // // //               src={section.image}
// // // //               alt={section.title}
// // // //               fill
// // // //               className="object-cover"
// // // //               priority={index === 0}
// // // //               sizes="100vw"
// // // //             />
// // // //           </div>
// // // //           <div className="relative h-full flex items-center justify-center">
// // // //             <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // //               {section.title}
// // // //             </h2>
// // // //           </div>

// // // //           {/* Additional images for About section */}
// // // //           {index === 2 && additionalImages.map((img, imgIndex) => (
// // // //             <div
// // // //               key={`additional-${imgIndex}`}
// // // //               className="section absolute inset-0 w-full h-full"
// // // //               style={{
// // // //                 zIndex: 1,
// // // //                 transform: 'translateY(100%)'
// // // //               }}
// // // //             >
// // // //               <Image
// // // //                 src={img}
// // // //                 alt={`Additional view ${imgIndex + 1}`}
// // // //                 fill
// // // //                 className="object-cover"
// // // //                 sizes="100vw"
// // // //               />
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }
// // // // // /*-= Simplified RevealSection Component =-*/
// // // // // 'use client';
// // // // // import { useEffect, useRef } from 'react';
// // // // // import { gsap } from 'gsap';
// // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // import Image from 'next/image';

// // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // interface Section {
// // // // //   image: string;
// // // // //   title: string;
// // // // // }

// // // // // interface RevealSectionProps {
// // // // //   sections: Section[];
// // // // //   additionalImages: string[];
// // // // // }

// // // // // export function RevealSection({ sections, additionalImages }: RevealSectionProps) {
// // // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // // //   useEffect(() => {
// // // // //     const tl = gsap.timeline({
// // // // //       scrollTrigger: {
// // // // //         trigger: containerRef.current,
// // // // //         start: 'top top',
// // // // //         end: 'bottom bottom',
// // // // //         scrub: 1,
// // // // //       },
// // // // //     });

// // // // //     tl.to('.section', {
// // // // //       yPercent: -100,
// // // // //       duration: 1,
// // // // //       stagger: 1,
// // // // //       ease: 'none'
// // // // //     });

// // // // //     return () => tl.kill();
// // // // //   }, []);

// // // // //   return (
// // // // //     <div ref={containerRef} className="w-screen">
// // // // //       {sections.map((section, index) => (
// // // // //         <div
// // // // //           key={index}
// // // // //           className={`section fixed inset-0 w-full h-full`}
// // // // //           style={{
// // // // //             zIndex: sections.length - index,
// // // // //             transform: index === 0 ? 'none' : 'translateY(100%)'
// // // // //           }}
// // // // //         >
// // // // //           <div className="absolute inset-0">
// // // // //             <Image
// // // // //               src={section.image}
// // // // //               alt={section.title}
// // // // //               fill
// // // // //               className="object-cover"
// // // // //               priority={index === 0}
// // // // //               sizes="100vw"
// // // // //             />
// // // // //           </div>
// // // // //           <div className="relative h-full flex items-center justify-center">
// // // // //             <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // //               {section.title}
// // // // //             </h2>
// // // // //           </div>

// // // // //           {/* Additional images for About section */}
// // // // //           {index === 2 && additionalImages.map((img, imgIndex) => (
// // // // //             <div
// // // // //               key={`additional-${imgIndex}`}
// // // // //               className="section absolute inset-0 w-full h-full"
// // // // //               style={{
// // // // //                 zIndex: 1,
// // // // //                 transform: 'translateY(100%)'
// // // // //               }}
// // // // //             >
// // // // //               <Image
// // // // //                 src={img}
// // // // //                 alt={`Additional view ${imgIndex + 1}`}
// // // // //                 fill
// // // // //                 className="object-cover"
// // // // //                 sizes="100vw"
// // // // //               />
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // // /*-= Fixed RevealSection Component =-*/
// // // // // // 'use client';
// // // // // // import { useEffect, useRef } from 'react';
// // // // // // import { gsap } from 'gsap';
// // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // import Image from 'next/image';

// // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // interface Section {
// // // // // //   image: string;
// // // // // //   title: string;
// // // // // // }

// // // // // // interface RevealSectionProps {
// // // // // //   sections: Section[];
// // // // // //   additionalImages: string[];
// // // // // // }

// // // // // // export function RevealSection({ sections, additionalImages }: RevealSectionProps) {
// // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
// // // // // //   const additionalImageRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // //   useEffect(() => {
// // // // // //     if (!containerRef.current) return;

// // // // // //     const ctx = gsap.context(() => {
// // // // // //       const totalLength = sections.length + additionalImages.length;

// // // // // //       const tl = gsap.timeline({
// // // // // //         scrollTrigger: {
// // // // // //           trigger: containerRef.current,
// // // // // //           start: 'top top',
// // // // // //           end: `+=${(totalLength - 1) * 100}%`,
// // // // // //           scrub: 1,
// // // // // //           pin: true,
// // // // // //           anticipatePin: 1,
// // // // // //         },
// // // // // //       });

// // // // // //       // Animate initial sections (Welcome, Portfolio, About)
// // // // // //       sections.forEach((_, index) => {
// // // // // //         if (index === 0) return; // Skip Welcome (it stays fixed)
// // // // // //         const section = sectionRefs.current[index];

// // // // // //         tl.fromTo(section,
// // // // // //           { yPercent: 100, opacity: 1 },
// // // // // //           { yPercent: 0, opacity: 1, duration: 1 }
// // // // // //         );

// // // // // //         if (index < sections.length - 1) {
// // // // // //           tl.to(section, {
// // // // // //             yPercent: -100,
// // // // // //             duration: 1
// // // // // //           });
// // // // // //         }
// // // // // //       });

// // // // // //       // Animate additional images after About section
// // // // // //       additionalImageRefs.current.forEach((imgRef, index) => {
// // // // // //         tl.fromTo(imgRef,
// // // // // //           { yPercent: 100, opacity: 1 },
// // // // // //           { yPercent: 0, opacity: 1, duration: 1 }
// // // // // //         );

// // // // // //         // Don't animate the last image out of view
// // // // // //         if (index < additionalImages.length - 1) {
// // // // // //           tl.to(imgRef, {
// // // // // //             yPercent: -100,
// // // // // //             duration: 1
// // // // // //           });
// // // // // //         }
// // // // // //       });
// // // // // //     });

// // // // // //     return () => ctx.revert();
// // // // // //   }, [sections, additionalImages]);

// // // // // //   return (
// // // // // //     <div className="fixed inset-0 w-screen h-screen">
// // // // // //       <div
// // // // // //         ref={containerRef}
// // // // // //         className="relative h-full w-full overflow-hidden"
// // // // // //       >
// // // // // //         {/* Main sections */}
// // // // // //         {sections.map((section, index) => (
// // // // // //           <div
// // // // // //             key={index}
// // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // //             className="absolute inset-0 w-full h-full"
// // // // // //             style={{
// // // // // //               zIndex: sections.length - index,
// // // // // //               transform: index === 0 ? 'none' : 'translateY(100%)'
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className="absolute inset-0">
// // // // // //               <Image
// // // // // //                 src={section.image}
// // // // // //                 alt={section.title}
// // // // // //                 fill
// // // // // //                 className="object-cover"
// // // // // //                 priority={index === 0}
// // // // // //                 sizes="100vw"
// // // // // //               />
// // // // // //             </div>
// // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // //                 {section.title}
// // // // // //               </h2>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}

// // // // // //         {/* Additional images */}
// // // // // //         {additionalImages.map((img, index) => (
// // // // // //           <div
// // // // // //             key={`additional-${index}`}
// // // // // //             ref={el => additionalImageRefs.current[index] = el}
// // // // // //             className="absolute inset-0 w-full h-full"
// // // // // //             style={{
// // // // // //               zIndex: 1,
// // // // // //               transform: 'translateY(100%)'
// // // // // //             }}
// // // // // //           >
// // // // // //             <div className="absolute inset-0">
// // // // // //               <Image
// // // // // //                 src={img}
// // // // // //                 alt={`Additional view ${index + 1}`}
// // // // // //                 fill
// // // // // //                 className="object-cover"
// // // // // //                 sizes="100vw"
// // // // // //               />
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // // // /*-= Fixed RevealSection Component =-*/
// // // // // // // 'use client';
// // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // import { gsap } from 'gsap';
// // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // import Image from 'next/image';

// // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // interface Section {
// // // // // // //   image: string;
// // // // // // //   title: string;
// // // // // // // }

// // // // // // // interface RevealSectionProps {
// // // // // // //   sections: Section[];
// // // // // // //   additionalImages: string[];
// // // // // // // }

// // // // // // // export function RevealSection({ sections, additionalImages }: RevealSectionProps) {
// // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
// // // // // // //   const additionalImageRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // //   useEffect(() => {
// // // // // // //     const ctx = gsap.context(() => {
// // // // // // //       const tl = gsap.timeline({
// // // // // // //         scrollTrigger: {
// // // // // // //           trigger: containerRef.current,
// // // // // // //           start: 'top top',
// // // // // // //           end: `+=${(sections.length + additionalImages.length - 1) * 100}%`,
// // // // // // //           scrub: 1,
// // // // // // //           pin: true,
// // // // // // //           anticipatePin: 1,
// // // // // // //         },
// // // // // // //       });

// // // // // // //       sections.forEach((_, index) => {
// // // // // // //         if (index === sections.length - 1) return;
// // // // // // //         const section = sectionRefs.current[index];
// // // // // // //         tl.to(section, {
// // // // // // //           yPercent: -100,
// // // // // // //           duration: 1
// // // // // // //         });
// // // // // // //       });

// // // // // // //       additionalImageRefs.current.forEach((imgRef, index) => {
// // // // // // //         tl.fromTo(imgRef,
// // // // // // //           { yPercent: 100 },
// // // // // // //           { yPercent: 0, duration: 1 },
// // // // // // //         ).to(imgRef, {
// // // // // // //           yPercent: -100,
// // // // // // //           duration: 1
// // // // // // //         }, index === additionalImages.length - 1 ? '>' : '>');
// // // // // // //       });
// // // // // // //     });

// // // // // // //     return () => ctx.revert();
// // // // // // //   }, [sections, additionalImages]);

// // // // // // //   return (
// // // // // // //     <div className="fixed inset-0 w-screen h-screen">
// // // // // // //       <div
// // // // // // //         ref={containerRef}
// // // // // // //         className="relative h-full w-full overflow-hidden"
// // // // // // //       >
// // // // // // //         {sections.map((section, index) => (
// // // // // // //           <div
// // // // // // //             key={index}
// // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // //             style={{ zIndex: sections.length - index }}
// // // // // // //           >
// // // // // // //             <div className="absolute inset-0">
// // // // // // //               <Image
// // // // // // //                 src={section.image}
// // // // // // //                 alt={section.title}
// // // // // // //                 fill
// // // // // // //                 className="object-cover"
// // // // // // //                 priority={index === 0}
// // // // // // //                 sizes="100vw"
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // //                 {section.title}
// // // // // // //               </h2>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         ))}

// // // // // // //         {additionalImages.map((img, index) => (
// // // // // // //           <div
// // // // // // //             key={`additional-${index}`}
// // // // // // //             ref={el => additionalImageRefs.current[index] = el}
// // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // //             style={{
// // // // // // //               zIndex: sections.length - (sections.length - 1) - 1,
// // // // // // //               transform: 'translateY(100%)'
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <div className="absolute inset-0">
// // // // // // //               <Image
// // // // // // //                 src={img}
// // // // // // //                 alt={`Additional view ${index + 1}`}
// // // // // // //                 fill
// // // // // // //                 className="object-cover"
// // // // // // //                 sizes="100vw"
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // // // /*-= Updated RevealSection with Additional Images =-*/
// // // // // // // // 'use client';
// // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // import { gsap } from 'gsap';
// // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // import Image from 'next/image';

// // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // interface Section {
// // // // // // // //   image: string;
// // // // // // // //   title: string;
// // // // // // // // }

// // // // // // // // interface RevealSectionProps {
// // // // // // // //   sections: Section[];
// // // // // // // //   additionalImages: string[];
// // // // // // // // }

// // // // // // // // export function RevealSection({ sections, additionalImages }: RevealSectionProps) {
// // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
// // // // // // // //   const additionalImageRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const ctx = gsap.context(() => {
// // // // // // // //       const tl = gsap.timeline({
// // // // // // // //         scrollTrigger: {
// // // // // // // //           trigger: containerRef.current,
// // // // // // // //           start: 'top top',
// // // // // // // //           end: `+=${(sections.length + additionalImages.length - 1) * 100}%`,
// // // // // // // //           scrub: 1,
// // // // // // // //           pin: true,
// // // // // // // //           anticipatePin: 1,
// // // // // // // //         },
// // // // // // // //       });

// // // // // // // //       // Animate main sections
// // // // // // // //       sections.forEach((_, index) => {
// // // // // // // //         if (index === sections.length - 1) return;
// // // // // // // //         const section = sectionRefs.current[index];
// // // // // // // //         tl.to(section, {
// // // // // // // //           yPercent: -100,
// // // // // // // //           duration: 1
// // // // // // // //         });
// // // // // // // //       });

// // // // // // // //       // Animate additional images
// // // // // // // //       additionalImageRefs.current.forEach((imgRef, index) => {
// // // // // // // //         tl.fromTo(imgRef,
// // // // // // // //           { yPercent: 100 },
// // // // // // // //           { yPercent: 0, duration: 1 },
// // // // // // // //         ).to(imgRef, {
// // // // // // // //           yPercent: -100,
// // // // // // // //           duration: 1
// // // // // // // //         }, index === additionalImages.length - 1 ? '>' : '>');
// // // // // // // //       });
// // // // // // // //     });

// // // // // // // //     return () => ctx.revert();
// // // // // // // //   }, [sections.length, additionalImages.length]);

// // // // // // // //   return (
// // // // // // // //     <div className="fixed inset-0 w-screen h-screen">
// // // // // // // //       <div
// // // // // // // //         ref={containerRef}
// // // // // // // //         className="relative h-full w-full overflow-hidden"
// // // // // // // //       >
// // // // // // // //         {/* Main sections */}
// // // // // // // //         {sections.map((section, index) => (
// // // // // // // //           <div
// // // // // // // //             key={index}
// // // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // // //             style={{ zIndex: sections.length - index }}
// // // // // // // //           >
// // // // // // // //             <div className="absolute inset-0">
// // // // // // // //               <Image
// // // // // // // //                 src={section.image}
// // // // // // // //                 alt={section.title}
// // // // // // // //                 fill
// // // // // // // //                 className="object-cover"
// // // // // // // //                 priority={index === 0}
// // // // // // // //                 sizes="100vw"
// // // // // // // //               />
// // // // // // // //             </div>
// // // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // //                 {section.title}
// // // // // // // //               </h2>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         ))}

// // // // // // // //         {/* Additional images */}
// // // // // // // //         {additionalImages.map((img, index) => (
// // // // // // // //           <div
// // // // // // // //             key={`additional-${index}`}
// // // // // // // //             ref={el => additionalImageRefs.current[index] = el}
// // // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // // //             style={{
// // // // // // // //               zIndex: sections.length - (sections.length - 1) - 1,
// // // // // // // //               transform: 'translateY(100%)'
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <div className="absolute inset-0">
// // // // // // // //               <Image
// // // // // // // //                 src={img}
// // // // // // // //                 alt={`Additional view ${index + 1}`}
// // // // // // // //                 fill
// // // // // // // //                 className="object-cover"
// // // // // // // //                 sizes="100vw"
// // // // // // // //               />
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         ))}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // // // /*-= Fixed RevealSection Component • Reverse z-index =-*/
// // // // // // // // // 'use client';
// // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // import Image from 'next/image';

// // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // interface Section {
// // // // // // // // //   image: string;
// // // // // // // // //   title: string;
// // // // // // // // // }

// // // // // // // // // interface RevealSectionProps {
// // // // // // // // //   sections: Section[];
// // // // // // // // // }

// // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const ctx = gsap.context(() => {
// // // // // // // // //       const tl = gsap.timeline({
// // // // // // // // //         scrollTrigger: {
// // // // // // // // //           trigger: containerRef.current,
// // // // // // // // //           start: 'top top',
// // // // // // // // //           end: '+=200%',
// // // // // // // // //           scrub: 1,
// // // // // // // // //           pin: true,
// // // // // // // // //           anticipatePin: 1,
// // // // // // // // //         },
// // // // // // // // //       });

// // // // // // // // //       // Animate sections sequentially
// // // // // // // // //       sections.forEach((_, index) => {
// // // // // // // // //         if (index === sections.length - 1) return; // Skip last section
// // // // // // // // //         const section = sectionRefs.current[index];

// // // // // // // // //         tl.to(section, {
// // // // // // // // //           yPercent: -100,
// // // // // // // // //           duration: 1
// // // // // // // // //         });
// // // // // // // // //       });
// // // // // // // // //     });

// // // // // // // // //     return () => ctx.revert();
// // // // // // // // //   }, []);

// // // // // // // // //   return (
// // // // // // // // //     <div className="fixed inset-0 w-screen h-screen">
// // // // // // // // //       <div
// // // // // // // // //         ref={containerRef}
// // // // // // // // //         className="relative h-full w-full overflow-hidden"
// // // // // // // // //       >
// // // // // // // // //         {sections.map((section, index) => (
// // // // // // // // //           <div
// // // // // // // // //             key={index}
// // // // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // // // //             style={{
// // // // // // // // //               zIndex: sections.length - index, // Reverse z-index order
// // // // // // // // //             }}
// // // // // // // // //           >
// // // // // // // // //             <div className="absolute inset-0">
// // // // // // // // //               <Image
// // // // // // // // //                 src={section.image}
// // // // // // // // //                 alt={section.title}
// // // // // // // // //                 fill
// // // // // // // // //                 className="object-cover"
// // // // // // // // //                 priority={index === 0}
// // // // // // // // //                 sizes="100vw"
// // // // // // // // //               />
// // // // // // // // //             </div>
// // // // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // //                 {section.title}
// // // // // // // // //               </h2>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         ))}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // // /*-= Fixed RevealSection Component =-*/
// // // // // // // // // // 'use client';
// // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // interface Section {
// // // // // // // // // //   image: string;
// // // // // // // // // //   title: string;
// // // // // // // // // // }

// // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // //   sections: Section[];
// // // // // // // // // // }

// // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const ctx = gsap.context(() => {
// // // // // // // // // //       const tl = gsap.timeline({
// // // // // // // // // //         scrollTrigger: {
// // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // //           start: 'top top',
// // // // // // // // // //           end: '+=200%',
// // // // // // // // // //           scrub: 1,
// // // // // // // // // //           pin: true,
// // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // //         },
// // // // // // // // // //       });

// // // // // // // // // //       // Animate sections sequentially
// // // // // // // // // //       sections.forEach((_, index) => {
// // // // // // // // // //         if (index === 0) return; // Skip first section
// // // // // // // // // //         const section = sectionRefs.current[index];

// // // // // // // // // //         tl.fromTo(section,
// // // // // // // // // //           { yPercent: 100 },
// // // // // // // // // //           { yPercent: 0, duration: 1 },
// // // // // // // // // //           index === 1 ? 0 : '>'
// // // // // // // // // //         ).to(section, {
// // // // // // // // // //           yPercent: -100,
// // // // // // // // // //           duration: 1
// // // // // // // // // //         });
// // // // // // // // // //       });
// // // // // // // // // //     });

// // // // // // // // // //     return () => ctx.revert();
// // // // // // // // // //   }, []);

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="fixed inset-0 w-screen h-screen">
// // // // // // // // // //       <div
// // // // // // // // // //         ref={containerRef}
// // // // // // // // // //         className="relative h-full w-full overflow-hidden"
// // // // // // // // // //       >
// // // // // // // // // //         {sections.map((section, index) => (
// // // // // // // // // //           <div
// // // // // // // // // //             key={index}
// // // // // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // // // // //             style={{
// // // // // // // // // //               zIndex: index === 0 ? 1 : 2 + index,
// // // // // // // // // //               transform: index === 0 ? 'none' : 'translateY(100%)'
// // // // // // // // // //             }}
// // // // // // // // // //           >
// // // // // // // // // //             <div className="absolute inset-0">
// // // // // // // // // //               <Image
// // // // // // // // // //                 src={section.image}
// // // // // // // // // //                 alt={section.title}
// // // // // // // // // //                 fill
// // // // // // // // // //                 className="object-cover"
// // // // // // // // // //                 priority={index === 0}
// // // // // // // // // //                 sizes="100vw"
// // // // // // // // // //               />
// // // // // // // // // //             </div>
// // // // // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // //                 {section.title}
// // // // // // // // // //               </h2>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // // // /*-= Fixed RevealSection Component =-*/
// // // // // // // // // // // 'use client';
// // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // interface Section {
// // // // // // // // // // //   image: string;
// // // // // // // // // // //   title: string;
// // // // // // // // // // // }

// // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // }

// // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const ctx = gsap.context(() => {
// // // // // // // // // // //       gsap.to(sectionRefs.current.slice(1), {
// // // // // // // // // // //         yPercent: -100,
// // // // // // // // // // //         ease: 'none',
// // // // // // // // // // //         stagger: 0.5,
// // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // // //           start: 'top top',
// // // // // // // // // // //           end: '+=200%',
// // // // // // // // // // //           scrub: 1,
// // // // // // // // // // //           pin: true,
// // // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // // //         },
// // // // // // // // // // //       });
// // // // // // // // // // //     });

// // // // // // // // // // //     return () => ctx.revert();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="fixed inset-0 w-screen h-screen">
// // // // // // // // // // //       <div
// // // // // // // // // // //         ref={containerRef}
// // // // // // // // // // //         className="relative h-full w-full overflow-hidden"
// // // // // // // // // // //       >
// // // // // // // // // // //         {sections.map((section, index) => (
// // // // // // // // // // //           <div
// // // // // // // // // // //             key={index}
// // // // // // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // // // // // //           >
// // // // // // // // // // //             <div className="absolute inset-0">
// // // // // // // // // // //               <Image
// // // // // // // // // // //                 src={section.image}
// // // // // // // // // // //                 alt={section.title}
// // // // // // // // // // //                 fill
// // // // // // // // // // //                 className="object-cover"
// // // // // // // // // // //                 priority={index === 0}
// // // // // // // // // // //                 sizes="100vw"
// // // // // // // // // // //               />
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // //                 {section.title}
// // // // // // // // // // //               </h2>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ))}
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }
// // // // // // // // // // // // /*-= src/components/parallax2/RevealSection.tsx =-*/
// // // // // // // // // // // // /*-= Fixed RevealSection Component: Only "About" showing up. No scrolling =-*/
// // // // // // // // // // // // 'use client';
// // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // interface Section {
// // // // // // // // // // // //   image: string;
// // // // // // // // // // // //   title: string;
// // // // // // // // // // // // }

// // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // }

// // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // //     const container = containerRef.current;
// // // // // // // // // // // //     const sectionElements = sectionRefs.current;

// // // // // // // // // // // //     gsap.to(container, {
// // // // // // // // // // // //       scrollTrigger: {
// // // // // // // // // // // //         trigger: container,
// // // // // // // // // // // //         start: 'top top',
// // // // // // // // // // // //         end: `+=${window.innerHeight * (sections.length - 1)}`,
// // // // // // // // // // // //         pin: true,
// // // // // // // // // // // //         anticipatePin: 1,
// // // // // // // // // // // //         scrub: true,
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     // Create individual animations for each section
// // // // // // // // // // // //     sectionElements.forEach((section, index) => {
// // // // // // // // // // // //       if (!section || index === sections.length - 1) return;

// // // // // // // // // // // //       gsap.to(section, {
// // // // // // // // // // // //         yPercent: -100,
// // // // // // // // // // // //         ease: 'none',
// // // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // // //           trigger: container,
// // // // // // // // // // // //           start: `${index * window.innerHeight} top`,
// // // // // // // // // // // //           end: `+=${window.innerHeight}`,
// // // // // // // // // // // //           scrub: true,
// // // // // // // // // // // //         }
// // // // // // // // // // // //       });
// // // // // // // // // // // //     });

// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="fixed inset-0 w-screen h-screen">
// // // // // // // // // // // //       <div
// // // // // // // // // // // //         ref={containerRef}
// // // // // // // // // // // //         className="relative h-full w-full overflow-hidden"
// // // // // // // // // // // //       >
// // // // // // // // // // // //         {sections.map((section, index) => (
// // // // // // // // // // // //           <div
// // // // // // // // // // // //             key={index}
// // // // // // // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // // // // // // //           >
// // // // // // // // // // // //             <div className="absolute inset-0">
// // // // // // // // // // // //               <Image
// // // // // // // // // // // //                 src={section.image}
// // // // // // // // // // // //                 alt={section.title}
// // // // // // // // // // // //                 fill
// // // // // // // // // // // //                 className="object-cover"
// // // // // // // // // // // //                 priority={index === 0}
// // // // // // // // // // // //                 sizes="100vw"
// // // // // // // // // // // //               />
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // //                 {section.title}
// // // // // // // // // // // //               </h2>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         ))}
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }
// // // // // // // // // // // // // /*-= src/components/parallax2/RevealSection.tsx =-*/
// // // // // // // // // // // // // /*-= Updated RevealSection Component =-*/
// // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // interface Section {
// // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // //   additionalImages?: string[];
// // // // // // // // // // // // // }

// // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // // }

// // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // //     const mm = gsap.matchMedia();

// // // // // // // // // // // // //     mm.add("(min-width: 100px)", () => {
// // // // // // // // // // // // //       const mainTl = gsap.timeline({
// // // // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // // // // //           start: 'top top',
// // // // // // // // // // // // //           end: `+=${(sections.length - 1) * 100}%`,
// // // // // // // // // // // // //           pin: true,
// // // // // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // // // // //           scrub: 1,
// // // // // // // // // // // // //         },
// // // // // // // // // // // // //       });

// // // // // // // // // // // // //       // Animate main sections
// // // // // // // // // // // // //       sectionRefs.current.forEach((section, index) => {
// // // // // // // // // // // // //         if (!section || index === sections.length - 1) return;
// // // // // // // // // // // // //         mainTl.to(section, {
// // // // // // // // // // // // //           yPercent: -100,
// // // // // // // // // // // // //           ease: 'none',
// // // // // // // // // // // // //         }, index);
// // // // // // // // // // // // //       });

// // // // // // // // // // // // //       // Add additional scroll animations for the About section
// // // // // // // // // // // // //       sections.forEach((section, index) => {
// // // // // // // // // // // // //         if (index === 2 && section.additionalImages) { // About section
// // // // // // // // // // // // //           section.additionalImages.forEach((_, imgIndex) => {
// // // // // // // // // // // // //             mainTl.to(`#additional-image-${imgIndex}`, {
// // // // // // // // // // // // //               yPercent: -100,
// // // // // // // // // // // // //               ease: 'none',
// // // // // // // // // // // // //             }, `>-0.5`);
// // // // // // // // // // // // //           });
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // //       mm.revert();
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //   }, [sections.length]);

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="revealSectionContainer fixed inset-0 w-screen">
// // // // // // // // // // // // //       <div
// // // // // // // // // // // // //         ref={containerRef}
// // // // // // // // // // // // //         className="containerRefContainer relative h-screen w-full"
// // // // // // // // // // // // //       >
// // // // // // // // // // // // //         {sections.map((section, index) => (
// // // // // // // // // // // // //           <div
// // // // // // // // // // // // //             key={index}
// // // // // // // // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // //             className="sectionContainer absolute inset-0 w-full h-full"
// // // // // // // // // // // // //             style={{ zIndex: sections.length - index }}
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             <div className="imageContainer absolute inset-0">
// // // // // // // // // // // // //               <Image
// // // // // // // // // // // // //                 src={section.image}
// // // // // // // // // // // // //                 alt={section.title}
// // // // // // // // // // // // //                 fill
// // // // // // // // // // // // //                 className="imageWrapper object-cover"
// // // // // // // // // // // // //                 priority
// // // // // // // // // // // // //                 sizes="100vw"
// // // // // // // // // // // // //               />
// // // // // // // // // // // // //               {index === 2 && section.additionalImages && section.additionalImages.map((img, imgIndex) => (
// // // // // // // // // // // // //                 <div
// // // // // // // // // // // // //                   key={imgIndex}
// // // // // // // // // // // // //                   id={`additional-image-${imgIndex}`}
// // // // // // // // // // // // //                   className="absolute inset-0"
// // // // // // // // // // // // //                   style={{ top: `${(imgIndex + 1) * 100}%` }}
// // // // // // // // // // // // //                 >
// // // // // // // // // // // // //                   <Image
// // // // // // // // // // // // //                     src={img}
// // // // // // // // // // // // //                     alt={`Additional view ${imgIndex + 1}`}
// // // // // // // // // // // // //                     fill
// // // // // // // // // // // // //                     className="object-cover"
// // // // // // // // // // // // //                     sizes="100vw"
// // // // // // // // // // // // //                   />
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               ))}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // // //                 {section.title}
// // // // // // // // // // // // //               </h2>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         ))}
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }
// // // // // // // // // // // // // // /*-= src/components/parallax2/RevealSection.tsx =-*/
// // // // // // // // // // // // // // /*-= Fixed Full Viewport Reveal Section =-*/
// // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // interface Section {
// // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // //   additionalImages?: string[];
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // // //     const mm = gsap.matchMedia();

// // // // // // // // // // // // // //     mm.add("(min-width: 100px)", () => {
// // // // // // // // // // // // // //       const mainTl = gsap.timeline({
// // // // // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // // // // // //           start: 'top top',
// // // // // // // // // // // // // //           end: `+=${(sections.length - 1) * 100}%`,
// // // // // // // // // // // // // //           pin: true,
// // // // // // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // // // // // //           scrub: 1,
// // // // // // // // // // // // // //         },
// // // // // // // // // // // // // //       });

// // // // // // // // // // // // // //       sectionRefs.current.forEach((section, index) => {
// // // // // // // // // // // // // //         if (!section || index === sections.length - 1) return;
// // // // // // // // // // // // // //         mainTl.to(section, {
// // // // // // // // // // // // // //           yPercent: -100,
// // // // // // // // // // // // // //           ease: 'none',
// // // // // // // // // // // // // //         }, index);
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // //       mm.revert();
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //   }, [sections.length]);

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className="revealSectionContainer fixed inset-0 w-screen">
// // // // // // // // // // // // // //       {/* Main scrolling sections */}
// // // // // // // // // // // // // //       <div
// // // // // // // // // // // // // //         ref={containerRef}
// // // // // // // // // // // // // //         className="containerRefContainer relative h-screen w-full"
// // // // // // // // // // // // // //       >
// // // // // // // // // // // // // //         {sections.map((section, index) => (
// // // // // // // // // // // // // //           <div
// // // // // // // // // // // // // //             key={index}
// // // // // // // // // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // // //             className="sectionContainer absolute inset-0 w-full h-full"
// // // // // // // // // // // // // //             style={{ zIndex: sections.length - index }}
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             <div className="imageContainer absolute inset-0">
// // // // // // // // // // // // // //               <Image
// // // // // // // // // // // // // //                 src={section.image}
// // // // // // // // // // // // // //                 alt={section.title}
// // // // // // // // // // // // // //                 fill
// // // // // // // // // // // // // //                 className="imageWrapper object-cover"
// // // // // // // // // // // // // //                 priority
// // // // // // // // // // // // // //                 sizes="100vw"
// // // // // // // // // // // // // //               />
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // // // //                 {section.title}
// // // // // // // // // // // // // //               </h2>
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //         ))}
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // interface Section {
// // // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // // // //     // Create a timeline for smooth animations
// // // // // // // // // // // // // // //     const tl = gsap.timeline({
// // // // // // // // // // // // // // //       scrollTrigger: {
// // // // // // // // // // // // // // //         trigger: containerRef.current,
// // // // // // // // // // // // // // //         start: 'top top',
// // // // // // // // // // // // // // //         end: '+=100%',
// // // // // // // // // // // // // // //         pin: true,
// // // // // // // // // // // // // // //         scrub: 1,
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     // Set initial positions
// // // // // // // // // // // // // // //     gsap.set(sectionRefs.current[1], {
// // // // // // // // // // // // // // //       yPercent: 100,
// // // // // // // // // // // // // // //       opacity: 0,
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     // Add animations to timeline
// // // // // // // // // // // // // // //     tl.to(sectionRefs.current[0], {
// // // // // // // // // // // // // // //       yPercent: -100,
// // // // // // // // // // // // // // //       opacity: 0,
// // // // // // // // // // // // // // //       ease: 'none',
// // // // // // // // // // // // // // //     })
// // // // // // // // // // // // // // //     .to(sectionRefs.current[1], {
// // // // // // // // // // // // // // //       yPercent: 0,
// // // // // // // // // // // // // // //       opacity: 1,
// // // // // // // // // // // // // // //       ease: 'none',
// // // // // // // // // // // // // // //     }, '<');

// // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // //       tl.kill();
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div
// // // // // // // // // // // // // // //       ref={containerRef}
// // // // // // // // // // // // // // //       className="fixed inset-0 w-full h-screen overflow-hidden"
// // // // // // // // // // // // // // //     >
// // // // // // // // // // // // // // //       {sections.map((section, index) => (
// // // // // // // // // // // // // // //         <div
// // // // // // // // // // // // // // //           key={index}
// // // // // // // // // // // // // // //           ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // // // //           className="absolute inset-0 w-full h-full"
// // // // // // // // // // // // // // //           style={{ zIndex: sections.length - index }}
// // // // // // // // // // // // // // //         >
// // // // // // // // // // // // // // //           <Image
// // // // // // // // // // // // // // //             src={section.image}
// // // // // // // // // // // // // // //             alt={section.title}
// // // // // // // // // // // // // // //             fill
// // // // // // // // // // // // // // //             className="object-cover"
// // // // // // // // // // // // // // //             priority
// // // // // // // // // // // // // // //             sizes="100vw"
// // // // // // // // // // // // // // //           />
// // // // // // // // // // // // // // //           <div className="absolute inset-0 bg-black/30" />
// // // // // // // // // // // // // // //           <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // //             <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // // // // //               {section.title}
// // // // // // // // // // // // // // //             </h2>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       ))}
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // /*-= src/components/parallax2/RevealSection.tsx =-*/
// // // // // // // // // // // // // // // // /*-= Fixed Reveal Section =-*/
// // // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // // interface Section {
// // // // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // // // // //     const tl = gsap.timeline({
// // // // // // // // // // // // // // // //       scrollTrigger: {
// // // // // // // // // // // // // // // //         trigger: containerRef.current,
// // // // // // // // // // // // // // // //         start: 'top top',
// // // // // // // // // // // // // // // //         end: '+=100%',
// // // // // // // // // // // // // // // //         pin: true,
// // // // // // // // // // // // // // // //         anticipatePin: 1,
// // // // // // // // // // // // // // // //         scrub: true,
// // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // //     tl.to(sectionRefs.current[0], {
// // // // // // // // // // // // // // // //       yPercent: -100,
// // // // // // // // // // // // // // // //       ease: 'none',
// // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // //       tl.kill();
// // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // //     <div
// // // // // // // // // // // // // // // //       ref={containerRef}
// // // // // // // // // // // // // // // //       className="fixed inset-0 w-screen"
// // // // // // // // // // // // // // // //     >
// // // // // // // // // // // // // // // //       {sections.map((section, index) => (
// // // // // // // // // // // // // // // //         <div
// // // // // // // // // // // // // // // //           key={index}
// // // // // // // // // // // // // // // //           ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // // // // //           className="absolute inset-0 w-full h-screen"
// // // // // // // // // // // // // // // //           style={{ zIndex: sections.length - index }}
// // // // // // // // // // // // // // // //         >
// // // // // // // // // // // // // // // //           <div className="absolute inset-0">
// // // // // // // // // // // // // // // //             <Image
// // // // // // // // // // // // // // // //               src={section.image}
// // // // // // // // // // // // // // // //               alt={section.title}
// // // // // // // // // // // // // // // //               fill
// // // // // // // // // // // // // // // //               className="object-cover"
// // // // // // // // // // // // // // // //               priority
// // // // // // // // // // // // // // // //               sizes="100vw"
// // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // // //             <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // // // // // //               {section.title}
// // // // // // // // // // // // // // // //             </h2>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // //       ))}
// // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // /*-= Corrected Reveal Section =-*/
// // // // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // // // interface Section {
// // // // // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // // // // // //     sectionRefs.current.forEach((section, index) => {
// // // // // // // // // // // // // // // // //       if (!section || index === sections.length - 1) return;

// // // // // // // // // // // // // // // // //       // Create a timeline for each section
// // // // // // // // // // // // // // // // //       gsap.to(section, {
// // // // // // // // // // // // // // // // //         yPercent: -100,
// // // // // // // // // // // // // // // // //         ease: 'none',
// // // // // // // // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // // // // // // // // //           start: `${index * 100}% top`,
// // // // // // // // // // // // // // // // //           end: `${(index + 1) * 100}% top`,
// // // // // // // // // // // // // // // // //           pin: true,
// // // // // // // // // // // // // // // // //           pinSpacing: false,
// // // // // // // // // // // // // // // // //           scrub: 1,
// // // // // // // // // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // // // // // // // // //           invalidateOnRefresh: true
// // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // // //       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
// // // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // // //   }, [sections.length]);

// // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // //     <div
// // // // // // // // // // // // // // // // //       ref={containerRef}
// // // // // // // // // // // // // // // // //       className="fixed inset-0 w-screen h-screen"
// // // // // // // // // // // // // // // // //     >
// // // // // // // // // // // // // // // // //       {sections.map((section, index) => (
// // // // // // // // // // // // // // // // //         <div
// // // // // // // // // // // // // // // // //           key={index}
// // // // // // // // // // // // // // // // //           ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // // // // // //           className="absolute inset-0 w-full h-full"
// // // // // // // // // // // // // // // // //           style={{
// // // // // // // // // // // // // // // // //             zIndex: sections.length - index,
// // // // // // // // // // // // // // // // //           }}
// // // // // // // // // // // // // // // // //         >
// // // // // // // // // // // // // // // // //           <div className="absolute inset-0 bg-black">
// // // // // // // // // // // // // // // // //             <Image
// // // // // // // // // // // // // // // // //               src={section.image}
// // // // // // // // // // // // // // // // //               alt={section.title}
// // // // // // // // // // // // // // // // //               fill
// // // // // // // // // // // // // // // // //               className="object-cover"
// // // // // // // // // // // // // // // // //               priority
// // // // // // // // // // // // // // // // //               sizes="100vw"
// // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // // // //             <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // // // // // // //               {section.title}
// // // // // // // // // // // // // // // // //             </h2>
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // //       ))}
// // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // // // // interface Section {
// // // // // // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // // // // // // //     const mm = gsap.matchMedia();

// // // // // // // // // // // // // // // // // //     mm.add("(min-width: 100px)", () => {
// // // // // // // // // // // // // // // // // //       const mainTl = gsap.timeline({
// // // // // // // // // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // // // // // // // // // //           start: 'top top',
// // // // // // // // // // // // // // // // // //           end: `+=${(sections.length - 1) * 100}%`,
// // // // // // // // // // // // // // // // // //           pin: true,
// // // // // // // // // // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // // // // // // // // // //           scrub: 1,
// // // // // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // // //       // Animate each section
// // // // // // // // // // // // // // // // // //       sectionRefs.current.forEach((section, index) => {
// // // // // // // // // // // // // // // // // //         if (!section || index === sections.length - 1) return;

// // // // // // // // // // // // // // // // // //         // Move section up and out of view
// // // // // // // // // // // // // // // // // //         mainTl.to(section, {
// // // // // // // // // // // // // // // // // //           yPercent: -100,
// // // // // // // // // // // // // // // // // //           ease: 'none',
// // // // // // // // // // // // // // // // // //           onComplete: () => {
// // // // // // // // // // // // // // // // // //             // Ensure the section stays hidden after animation
// // // // // // // // // // // // // // // // // //             if (section) {
// // // // // // // // // // // // // // // // // //               section.style.visibility = 'hidden';
// // // // // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //         }, index);
// // // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // // // //       mm.revert();
// // // // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // // // //   }, [sections.length]);

// // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // //     <div className="fixed inset-0 w-screen">
// // // // // // // // // // // // // // // // // //       <div
// // // // // // // // // // // // // // // // // //         ref={containerRef}
// // // // // // // // // // // // // // // // // //         className="relative h-screen w-full"
// // // // // // // // // // // // // // // // // //       >
// // // // // // // // // // // // // // // // // //         {sections.map((section, index) => (
// // // // // // // // // // // // // // // // // //           <div
// // // // // // // // // // // // // // // // // //             key={index}
// // // // // // // // // // // // // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // // // // // // // // // // // // //             style={{
// // // // // // // // // // // // // // // // // //               zIndex: sections.length - index,
// // // // // // // // // // // // // // // // // //               visibility: 'visible' // Ensure initial visibility
// // // // // // // // // // // // // // // // // //             }}
// // // // // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // // // // //             <div className="absolute inset-0">
// // // // // // // // // // // // // // // // // //               <Image
// // // // // // // // // // // // // // // // // //                 src={section.image}
// // // // // // // // // // // // // // // // // //                 alt={section.title}
// // // // // // // // // // // // // // // // // //                 fill
// // // // // // // // // // // // // // // // // //                 className="object-cover"
// // // // // // // // // // // // // // // // // //                 priority
// // // // // // // // // // // // // // // // // //                 sizes="100vw"
// // // // // // // // // // // // // // // // // //               />
// // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // // // // // // // //                 {section.title}
// // // // // // // // // // // // // // // // // //               </h2>
// // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // //         ))}
// // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // // // // // interface Section {
// // // // // // // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // //   additionalImages?: string[];
// // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // // // // // // // //     const mm = gsap.matchMedia();

// // // // // // // // // // // // // // // // // // //     mm.add("(min-width: 100px)", () => {
// // // // // // // // // // // // // // // // // // //       const mainTl = gsap.timeline({
// // // // // // // // // // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // // // // // // // // // // //           start: 'top top',
// // // // // // // // // // // // // // // // // // //           end: `+=${(sections.length - 1) * 100}%`,
// // // // // // // // // // // // // // // // // // //           pin: true,
// // // // // // // // // // // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // // // // // // // // // // //           scrub: 1,
// // // // // // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // // // //       sectionRefs.current.forEach((section, index) => {
// // // // // // // // // // // // // // // // // // //         if (!section || index === sections.length - 1) return;
// // // // // // // // // // // // // // // // // // //         mainTl.to(section, {
// // // // // // // // // // // // // // // // // // //           yPercent: -100,
// // // // // // // // // // // // // // // // // // //           ease: 'none',
// // // // // // // // // // // // // // // // // // //         }, index);
// // // // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // // // // //       mm.revert();
// // // // // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // // // // //   }, [sections.length]);

// // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // //     <div className="fixed inset-0 w-screen">
// // // // // // // // // // // // // // // // // // //       {/* Main scrolling sections */}
// // // // // // // // // // // // // // // // // // //       <div
// // // // // // // // // // // // // // // // // // //         ref={containerRef}
// // // // // // // // // // // // // // // // // // //         className="relative h-screen w-full"
// // // // // // // // // // // // // // // // // // //       >
// // // // // // // // // // // // // // // // // // //         {sections.map((section, index) => (
// // // // // // // // // // // // // // // // // // //           <div
// // // // // // // // // // // // // // // // // // //             key={index}
// // // // // // // // // // // // // // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // // // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // // // // // // // // // // // // // //             style={{ zIndex: sections.length - index }}
// // // // // // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // // // // // //             <div className="absolute inset-0">
// // // // // // // // // // // // // // // // // // //               <Image
// // // // // // // // // // // // // // // // // // //                 src={section.image}
// // // // // // // // // // // // // // // // // // //                 alt={section.title}
// // // // // // // // // // // // // // // // // // //                 fill
// // // // // // // // // // // // // // // // // // //                 className="object-cover"
// // // // // // // // // // // // // // // // // // //                 priority
// // // // // // // // // // // // // // // // // // //                 sizes="100vw"
// // // // // // // // // // // // // // // // // // //               />
// // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // // // // // // // // //                 {section.title}
// // // // // // // // // // // // // // // // // // //               </h2>
// // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // //         ))}
// // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // // // // // // interface Section {
// // // // // // // // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // // //   additionalImages?: string[];
// // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // // // // // // // // //     const mm = gsap.matchMedia();

// // // // // // // // // // // // // // // // // // // //     mm.add("(min-width: 100px)", () => {
// // // // // // // // // // // // // // // // // // // //       const mainTl = gsap.timeline({
// // // // // // // // // // // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // // // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // // // // // // // // // // // //           start: 'top top',
// // // // // // // // // // // // // // // // // // // //           end: `+=${(sections.length - 1) * 100}%`,
// // // // // // // // // // // // // // // // // // // //           pin: true,
// // // // // // // // // // // // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // // // // // // // // // // // //           scrub: 1,
// // // // // // // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // // // // //       sectionRefs.current.forEach((section, index) => {
// // // // // // // // // // // // // // // // // // // //         if (!section || index === sections.length - 1) return;
// // // // // // // // // // // // // // // // // // // //         mainTl.to(section, {
// // // // // // // // // // // // // // // // // // // //           yPercent: -100,
// // // // // // // // // // // // // // // // // // // //           ease: 'none',
// // // // // // // // // // // // // // // // // // // //         }, index);
// // // // // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // // // // // //       mm.revert();
// // // // // // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // // // // // //   }, [sections.length]);

// // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // //     <>
// // // // // // // // // // // // // // // // // // // //       {/* Container that breaks out of page width */}
// // // // // // // // // // // // // // // // // // // //       <div className="relative left-[50%] right-[50%] mx-[-50vw] w-screen">
// // // // // // // // // // // // // // // // // // // //         {/* Main scrolling sections */}
// // // // // // // // // // // // // // // // // // // //         <div
// // // // // // // // // // // // // // // // // // // //           ref={containerRef}
// // // // // // // // // // // // // // // // // // // //           className="h-screen w-full overflow-hidden"
// // // // // // // // // // // // // // // // // // // //         >
// // // // // // // // // // // // // // // // // // // //           {sections.map((section, index) => (
// // // // // // // // // // // // // // // // // // // //             <div
// // // // // // // // // // // // // // // // // // // //               key={index}
// // // // // // // // // // // // // // // // // // // //               ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // // // // // // // // //               className="absolute inset-0 w-full h-full"
// // // // // // // // // // // // // // // // // // // //               style={{ zIndex: sections.length - index }}
// // // // // // // // // // // // // // // // // // // //             >
// // // // // // // // // // // // // // // // // // // //               <div className="absolute inset-0">
// // // // // // // // // // // // // // // // // // // //                 <Image
// // // // // // // // // // // // // // // // // // // //                   src={section.image}
// // // // // // // // // // // // // // // // // // // //                   alt={section.title}
// // // // // // // // // // // // // // // // // // // //                   fill
// // // // // // // // // // // // // // // // // // // //                   className="object-cover"
// // // // // // // // // // // // // // // // // // // //                   priority
// // // // // // // // // // // // // // // // // // // //                   sizes="100vw"
// // // // // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // // // // // //               <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // // // // // // //                 <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // // // // // // // // // //                   {section.title}
// // // // // // // // // // // // // // // // // // // //                 </h2>
// // // // // // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // //           ))}
// // // // // // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // // // // // //         {/* Additional images section */}
// // // // // // // // // // // // // // // // // // // //         {sections[sections.length - 1].additionalImages && (
// // // // // // // // // // // // // // // // // // // //           <div className="w-full">
// // // // // // // // // // // // // // // // // // // //             {sections[sections.length - 1].additionalImages?.map((img, index) => (
// // // // // // // // // // // // // // // // // // // //               <div
// // // // // // // // // // // // // // // // // // // //                 key={index}
// // // // // // // // // // // // // // // // // // // //                 className="relative w-full h-screen"
// // // // // // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // // // // // //                 <Image
// // // // // // // // // // // // // // // // // // // //                   src={img}
// // // // // // // // // // // // // // // // // // // //                   alt={`Additional view ${index + 1}`}
// // // // // // // // // // // // // // // // // // // //                   fill
// // // // // // // // // // // // // // // // // // // //                   className="object-cover"
// // // // // // // // // // // // // // // // // // // //                   sizes="100vw"
// // // // // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // // // // // //             ))}
// // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // //     </>
// // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // // // // // // // interface Section {
// // // // // // // // // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // // // //   additionalImages?: string[];
// // // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
// // // // // // // // // // // // // // // // // // // // //   const lastSectionRef = useRef<HTMLDivElement>(null);

// // // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // // // // // // // // // //     const mm = gsap.matchMedia();

// // // // // // // // // // // // // // // // // // // // //     mm.add("(min-width: 100px)", () => {
// // // // // // // // // // // // // // // // // // // // //       // Main sections animation
// // // // // // // // // // // // // // // // // // // // //       const mainTl = gsap.timeline({
// // // // // // // // // // // // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // // // // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // // // // // // // // // // // // //           start: 'top top',
// // // // // // // // // // // // // // // // // // // // //           end: `+=${(sections.length - 1) * 100}%`,
// // // // // // // // // // // // // // // // // // // // //           pin: true,
// // // // // // // // // // // // // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // // // // // // // // // // // // //           scrub: 1,
// // // // // // // // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // // // // // //       // Animate main sections (except last)
// // // // // // // // // // // // // // // // // // // // //       sectionRefs.current.forEach((section, index) => {
// // // // // // // // // // // // // // // // // // // // //         if (!section || index === sections.length - 1) return;
// // // // // // // // // // // // // // // // // // // // //         mainTl.to(section, {
// // // // // // // // // // // // // // // // // // // // //           yPercent: -100,
// // // // // // // // // // // // // // // // // // // // //           ease: 'none',
// // // // // // // // // // // // // // // // // // // // //         }, index);
// // // // // // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // // // // // // //       mm.revert();
// // // // // // // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // // // // // // //   }, [sections.length]);

// // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // //     <>
// // // // // // // // // // // // // // // // // // // // //       {/* Main scrolling sections */}
// // // // // // // // // // // // // // // // // // // // //       <div
// // // // // // // // // // // // // // // // // // // // //         ref={containerRef}
// // // // // // // // // // // // // // // // // // // // //         className="w-full h-screen overflow-hidden"
// // // // // // // // // // // // // // // // // // // // //       >
// // // // // // // // // // // // // // // // // // // // //         {sections.map((section, index) => (
// // // // // // // // // // // // // // // // // // // // //           <div
// // // // // // // // // // // // // // // // // // // // //             key={index}
// // // // // // // // // // // // // // // // // // // // //             ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // // // // // // // // // //             className="absolute inset-0 w-full h-full"
// // // // // // // // // // // // // // // // // // // // //             style={{ zIndex: sections.length - index }}
// // // // // // // // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // // // // // // // //             <div className="absolute inset-0">
// // // // // // // // // // // // // // // // // // // // //               <Image
// // // // // // // // // // // // // // // // // // // // //                 src={section.image}
// // // // // // // // // // // // // // // // // // // // //                 alt={section.title}
// // // // // // // // // // // // // // // // // // // // //                 fill
// // // // // // // // // // // // // // // // // // // // //                 className="object-cover w-full h-full"
// // // // // // // // // // // // // // // // // // // // //                 priority
// // // // // // // // // // // // // // // // // // // // //                 sizes="100vw"
// // // // // // // // // // // // // // // // // // // // //               />
// // // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // // //             <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // // // // // // // //               <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // // // // // // // // // // //                 {section.title}
// // // // // // // // // // // // // // // // // // // // //               </h2>
// // // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // //         ))}
// // // // // // // // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // // // // // // // //       {/* Additional images section */}
// // // // // // // // // // // // // // // // // // // // //       {sections[sections.length - 1].additionalImages && (
// // // // // // // // // // // // // // // // // // // // //         <div className="w-full">
// // // // // // // // // // // // // // // // // // // // //           {sections[sections.length - 1].additionalImages?.map((img, index) => (
// // // // // // // // // // // // // // // // // // // // //             <div
// // // // // // // // // // // // // // // // // // // // //               key={index}
// // // // // // // // // // // // // // // // // // // // //               className="relative w-full h-screen"
// // // // // // // // // // // // // // // // // // // // //             >
// // // // // // // // // // // // // // // // // // // // //               <Image
// // // // // // // // // // // // // // // // // // // // //                 src={img}
// // // // // // // // // // // // // // // // // // // // //                 alt={`Additional view ${index + 1}`}
// // // // // // // // // // // // // // // // // // // // //                 fill
// // // // // // // // // // // // // // // // // // // // //                 className="object-cover w-full h-full"
// // // // // // // // // // // // // // // // // // // // //                 sizes="100vw"
// // // // // // // // // // // // // // // // // // // // //               />
// // // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // // //           ))}
// // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // //       )}
// // // // // // // // // // // // // // // // // // // // //     </>
// // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // // // // // // // // interface Section {
// // // // // // // // // // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // // // // //   additionalImages?: string[]; // Optional array for additional images
// // // // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // // // // // // // // //   sections: Section[];
// // // // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // // // // // // // // // // //     // Create responsive breakpoint matching
// // // // // // // // // // // // // // // // // // // // // //     const mm = gsap.matchMedia();

// // // // // // // // // // // // // // // // // // // // // //     // Tablet and desktop animation
// // // // // // // // // // // // // // // // // // // // // //     mm.add("(min-width: 768px)", () => {
// // // // // // // // // // // // // // // // // // // // // //       const tl = gsap.timeline({
// // // // // // // // // // // // // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // // // // // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // // // // // // // // // // // // // //           start: 'top top',
// // // // // // // // // // // // // // // // // // // // // //           end: `+=${sections.length * 100}%`,
// // // // // // // // // // // // // // // // // // // // // //           pin: true,
// // // // // // // // // // // // // // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // // // // // // // // // // // // // //           scrub: 1,
// // // // // // // // // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // // // // // // //       sectionRefs.current.forEach((section, index) => {
// // // // // // // // // // // // // // // // // // // // // //         if (!section || index === sections.length - 1) return;
// // // // // // // // // // // // // // // // // // // // // //         tl.to(section, {
// // // // // // // // // // // // // // // // // // // // // //           yPercent: -100,
// // // // // // // // // // // // // // // // // // // // // //           ease: 'none',
// // // // // // // // // // // // // // // // // // // // // //         }, index);
// // // // // // // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // // // // // // //       // For the last section's additional images
// // // // // // // // // // // // // // // // // // // // // //       if (sections[sections.length - 1].additionalImages) {
// // // // // // // // // // // // // // // // // // // // // //         const additionalImagesContainer = document.querySelector('.additional-images');
// // // // // // // // // // // // // // // // // // // // // //         if (additionalImagesContainer) {
// // // // // // // // // // // // // // // // // // // // // //           tl.from(additionalImagesContainer.children, {
// // // // // // // // // // // // // // // // // // // // // //             y: '100vh',
// // // // // // // // // // // // // // // // // // // // // //             stagger: 0.2,
// // // // // // // // // // // // // // // // // // // // // //             ease: 'none',
// // // // // // // // // // // // // // // // // // // // // //           }, sections.length - 1);
// // // // // // // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // // // // //     // Mobile animation adjustments
// // // // // // // // // // // // // // // // // // // // // //     mm.add("(max-width: 767px)", () => {
// // // // // // // // // // // // // // // // // // // // // //       const tl = gsap.timeline({
// // // // // // // // // // // // // // // // // // // // // //         scrollTrigger: {
// // // // // // // // // // // // // // // // // // // // // //           trigger: containerRef.current,
// // // // // // // // // // // // // // // // // // // // // //           start: 'top top',
// // // // // // // // // // // // // // // // // // // // // //           end: `+=${sections.length * 100}%`,
// // // // // // // // // // // // // // // // // // // // // //           pin: true,
// // // // // // // // // // // // // // // // // // // // // //           anticipatePin: 1,
// // // // // // // // // // // // // // // // // // // // // //           scrub: 1,
// // // // // // // // // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // // // // // // //       // Adjust animations for mobile
// // // // // // // // // // // // // // // // // // // // // //       sectionRefs.current.forEach((section, index) => {
// // // // // // // // // // // // // // // // // // // // // //         if (!section || index === sections.length - 1) return;
// // // // // // // // // // // // // // // // // // // // // //         tl.to(section, {
// // // // // // // // // // // // // // // // // // // // // //           yPercent: -100,
// // // // // // // // // // // // // // // // // // // // // //           ease: 'none',
// // // // // // // // // // // // // // // // // // // // // //         }, index);
// // // // // // // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // // // // // // // //       mm.revert();
// // // // // // // // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // // // // // // // //   }, [sections.length]);

// // // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // // //     <div
// // // // // // // // // // // // // // // // // // // // // //       ref={containerRef}
// // // // // // // // // // // // // // // // // // // // // //       className="relative w-full h-screen overflow-hidden"
// // // // // // // // // // // // // // // // // // // // // //     >
// // // // // // // // // // // // // // // // // // // // // //       {sections.map((section, index) => (
// // // // // // // // // // // // // // // // // // // // // //         <div
// // // // // // // // // // // // // // // // // // // // // //           key={index}
// // // // // // // // // // // // // // // // // // // // // //           ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // // // // // // // // // // //           className="absolute inset-0 w-full h-full"
// // // // // // // // // // // // // // // // // // // // // //           style={{ zIndex: sections.length - index }}
// // // // // // // // // // // // // // // // // // // // // //         >
// // // // // // // // // // // // // // // // // // // // // //           <div className="absolute inset-0">
// // // // // // // // // // // // // // // // // // // // // //             <Image
// // // // // // // // // // // // // // // // // // // // // //               src={section.image}
// // // // // // // // // // // // // // // // // // // // // //               alt={section.title}
// // // // // // // // // // // // // // // // // // // // // //               fill
// // // // // // // // // // // // // // // // // // // // // //               className="object-cover"
// // // // // // // // // // // // // // // // // // // // // //               priority
// // // // // // // // // // // // // // // // // // // // // //               sizes="(max-width: 768px) 100vw, 100vw"
// // // // // // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // // // // // //           </div>

// // // // // // // // // // // // // // // // // // // // // //           {/* Additional images for the last section */}
// // // // // // // // // // // // // // // // // // // // // //           {index === sections.length - 1 && section.additionalImages && (
// // // // // // // // // // // // // // // // // // // // // //             <div className="additional-images absolute inset-0 z-10">
// // // // // // // // // // // // // // // // // // // // // //               {section.additionalImages.map((img, imgIndex) => (
// // // // // // // // // // // // // // // // // // // // // //                 <div
// // // // // // // // // // // // // // // // // // // // // //                   key={imgIndex}
// // // // // // // // // // // // // // // // // // // // // //                   className="absolute w-full h-screen"
// // // // // // // // // // // // // // // // // // // // // //                   style={{ top: `${(imgIndex + 1) * 100}vh` }}
// // // // // // // // // // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // // // // // // // // // //                   <Image
// // // // // // // // // // // // // // // // // // // // // //                     src={img}
// // // // // // // // // // // // // // // // // // // // // //                     alt={`Additional image ${imgIndex + 1}`}
// // // // // // // // // // // // // // // // // // // // // //                     fill
// // // // // // // // // // // // // // // // // // // // // //                     className="object-cover"
// // // // // // // // // // // // // // // // // // // // // //                     sizes="(max-width: 768px) 100vw, 100vw"
// // // // // // // // // // // // // // // // // // // // // //                   />
// // // // // // // // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // // // // // // // //               ))}
// // // // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // // // //           )}

// // // // // // // // // // // // // // // // // // // // // //           <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // // // // // // // // //             <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold text-center px-4">
// // // // // // // // // // // // // // // // // // // // // //               {section.title}
// // // // // // // // // // // // // // // // // // // // // //             </h2>
// // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // // //       ))}
// // // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // // // // // // // // // //   sections: {
// // // // // // // // // // // // // // // // // // // // // // //     image: string;
// // // // // // // // // // // // // // // // // // // // // // //     title: string;
// // // // // // // // // // // // // // // // // // // // // // //   }[];
// // // // // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // // // // export function RevealSection({ sections }: RevealSectionProps) {
// // // // // // // // // // // // // // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // // // // // // // // // // // // // //   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

// // // // // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // // // // // // // // // // // // // //     // Create a main timeline
// // // // // // // // // // // // // // // // // // // // // // //     const tl = gsap.timeline({
// // // // // // // // // // // // // // // // // // // // // // //       scrollTrigger: {
// // // // // // // // // // // // // // // // // // // // // // //         trigger: containerRef.current,
// // // // // // // // // // // // // // // // // // // // // // //         start: 'top top',
// // // // // // // // // // // // // // // // // // // // // // //         end: `+=${sections.length * 100}%`,
// // // // // // // // // // // // // // // // // // // // // // //         pin: true,
// // // // // // // // // // // // // // // // // // // // // // //         anticipatePin: 1,
// // // // // // // // // // // // // // // // // // // // // // //         scrub: 1,
// // // // // // // // // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // // // // // //     // Add animations for each section sequentially
// // // // // // // // // // // // // // // // // // // // // // //     sectionRefs.current.forEach((section, index) => {
// // // // // // // // // // // // // // // // // // // // // // //       if (!section || index === sections.length - 1) return;

// // // // // // // // // // // // // // // // // // // // // // //       tl.to(section, {
// // // // // // // // // // // // // // // // // // // // // // //         yPercent: -100,
// // // // // // // // // // // // // // // // // // // // // // //         ease: 'none',
// // // // // // // // // // // // // // // // // // // // // // //       }, index);
// // // // // // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // // // // // // // // //       tl.kill();
// // // // // // // // // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // // // // // // // // //   }, [sections.length]);

// // // // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // // // //     <div
// // // // // // // // // // // // // // // // // // // // // // //       ref={containerRef}
// // // // // // // // // // // // // // // // // // // // // // //       className="relative w-full h-screen overflow-hidden"
// // // // // // // // // // // // // // // // // // // // // // //     >
// // // // // // // // // // // // // // // // // // // // // // //       {sections.map((section, index) => (
// // // // // // // // // // // // // // // // // // // // // // //         <div
// // // // // // // // // // // // // // // // // // // // // // //           key={index}
// // // // // // // // // // // // // // // // // // // // // // //           ref={el => sectionRefs.current[index] = el}
// // // // // // // // // // // // // // // // // // // // // // //           className="absolute inset-0 w-full h-full"
// // // // // // // // // // // // // // // // // // // // // // //           style={{ zIndex: sections.length - index }}
// // // // // // // // // // // // // // // // // // // // // // //         >
// // // // // // // // // // // // // // // // // // // // // // //           <div className="absolute inset-0">
// // // // // // // // // // // // // // // // // // // // // // //             <Image
// // // // // // // // // // // // // // // // // // // // // // //               src={section.image}
// // // // // // // // // // // // // // // // // // // // // // //               alt={section.title}
// // // // // // // // // // // // // // // // // // // // // // //               fill
// // // // // // // // // // // // // // // // // // // // // // //               className="object-cover"
// // // // // // // // // // // // // // // // // // // // // // //               priority
// // // // // // // // // // // // // // // // // // // // // // //               sizes="100vw"
// // // // // // // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // // //           <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // // // // // // // // // //             <h2 className="text-6xl text-white font-bold">{section.title}</h2>
// // // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // // // //       ))}
// // // // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // // // // // // // // // // import { useRef, useEffect } from 'react';
// // // // // // // // // // // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // // // // // // //   zIndex?: number;
// // // // // // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // // // // // export function RevealSection({ image, title, zIndex = 1 }: RevealSectionProps) {
// // // // // // // // // // // // // // // // // // // // // // // //   const sectionRef = useRef<HTMLDivElement>(null);

// // // // // // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // // // // // //     const section = sectionRef.current;
// // // // // // // // // // // // // // // // // // // // // // // //     if (!section) return;

// // // // // // // // // // // // // // // // // // // // // // // //     const tl = gsap.timeline({
// // // // // // // // // // // // // // // // // // // // // // // //       scrollTrigger: {
// // // // // // // // // // // // // // // // // // // // // // // //         trigger: section,
// // // // // // // // // // // // // // // // // // // // // // // //         start: 'top top',
// // // // // // // // // // // // // // // // // // // // // // // //         end: '+=100%',
// // // // // // // // // // // // // // // // // // // // // // // //         pin: true,
// // // // // // // // // // // // // // // // // // // // // // // //         pinSpacing: false,
// // // // // // // // // // // // // // // // // // // // // // // //         scrub: true
// // // // // // // // // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // // // // // // //     tl.to(section, {
// // // // // // // // // // // // // // // // // // // // // // // //       yPercent: -100,
// // // // // // // // // // // // // // // // // // // // // // // //       ease: 'none'
// // // // // // // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // // // // // // // // // //       tl.kill();
// // // // // // // // // // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // // // // //     <div
// // // // // // // // // // // // // // // // // // // // // // // //       ref={sectionRef}
// // // // // // // // // // // // // // // // // // // // // // // //       className="absolute inset-0 w-full h-screen"
// // // // // // // // // // // // // // // // // // // // // // // //       style={{ zIndex }}
// // // // // // // // // // // // // // // // // // // // // // // //     >
// // // // // // // // // // // // // // // // // // // // // // // //       <div className="absolute inset-0">
// // // // // // // // // // // // // // // // // // // // // // // //         <Image
// // // // // // // // // // // // // // // // // // // // // // // //           src={image}
// // // // // // // // // // // // // // // // // // // // // // // //           alt={title}
// // // // // // // // // // // // // // // // // // // // // // // //           fill
// // // // // // // // // // // // // // // // // // // // // // // //           className="object-cover"
// // // // // // // // // // // // // // // // // // // // // // // //           priority
// // // // // // // // // // // // // // // // // // // // // // // //           sizes="100vw"
// // // // // // // // // // // // // // // // // // // // // // // //         />
// // // // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // // // //       <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // // // // // // // // // // //         <h2 className="text-6xl text-white font-bold">{title}</h2>
// // // // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // // // // // // // // 'use client';
// // // // // // // // // // // // // // // // // // // // // // // // // import { useRef, useEffect } from 'react';
// // // // // // // // // // // // // // // // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // // // // // // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // // // // // // // // // // // // // // // import Image from 'next/image';

// // // // // // // // // // // // // // // // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // // // // // // // // // // // // // // // interface RevealSectionProps {
// // // // // // // // // // // // // // // // // // // // // // // // //   image: string;
// // // // // // // // // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // // // // // // // //   zIndex?: number;
// // // // // // // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // // // // // // export function RevealSection({ image, title, zIndex = 1 }: RevealSectionProps) {
// // // // // // // // // // // // // // // // // // // // // // // // //   const sectionRef = useRef<HTMLDivElement>(null);

// // // // // // // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // // // // // // //     const section = sectionRef.current;
// // // // // // // // // // // // // // // // // // // // // // // // //     if (!section) return;

// // // // // // // // // // // // // // // // // // // // // // // // //     const tl = gsap.timeline({
// // // // // // // // // // // // // // // // // // // // // // // // //       scrollTrigger: {
// // // // // // // // // // // // // // // // // // // // // // // // //         trigger: section,
// // // // // // // // // // // // // // // // // // // // // // // // //         start: 'top top',
// // // // // // // // // // // // // // // // // // // // // // // // //         end: 'bottom top',
// // // // // // // // // // // // // // // // // // // // // // // // //         pin: true,
// // // // // // // // // // // // // // // // // // // // // // // // //         pinSpacing: true,
// // // // // // // // // // // // // // // // // // // // // // // // //         scrub: 1
// // // // // // // // // // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // // // // // // // //     tl.to(section, {
// // // // // // // // // // // // // // // // // // // // // // // // //       opacity: 1,
// // // // // // // // // // // // // // // // // // // // // // // // //       duration: 1
// // // // // // // // // // // // // // // // // // // // // // // // //     })
// // // // // // // // // // // // // // // // // // // // // // // // //     .to(section, {
// // // // // // // // // // // // // // // // // // // // // // // // //       opacity: 0,
// // // // // // // // // // // // // // // // // // // // // // // // //       duration: 1
// // // // // // // // // // // // // // // // // // // // // // // // //     }, 0.5);

// // // // // // // // // // // // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // // // // // // // // // // // //       tl.kill();
// // // // // // // // // // // // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // // // // // //     <div
// // // // // // // // // // // // // // // // // // // // // // // // //       ref={sectionRef}
// // // // // // // // // // // // // // // // // // // // // // // // //       className="fixed inset-0 w-full h-screen"
// // // // // // // // // // // // // // // // // // // // // // // // //       style={{ zIndex }}
// // // // // // // // // // // // // // // // // // // // // // // // //     >
// // // // // // // // // // // // // // // // // // // // // // // // //       <div className="absolute inset-0">
// // // // // // // // // // // // // // // // // // // // // // // // //         <Image
// // // // // // // // // // // // // // // // // // // // // // // // //           src={image}
// // // // // // // // // // // // // // // // // // // // // // // // //           alt={title}
// // // // // // // // // // // // // // // // // // // // // // // // //           fill
// // // // // // // // // // // // // // // // // // // // // // // // //           className="object-cover"
// // // // // // // // // // // // // // // // // // // // // // // // //           priority
// // // // // // // // // // // // // // // // // // // // // // // // //           sizes="100vw"
// // // // // // // // // // // // // // // // // // // // // // // // //         />
// // // // // // // // // // // // // // // // // // // // // // // // //         <div className="absolute inset-0 bg-black/20" />
// // // // // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // // // // //       <div className="relative h-full flex items-center justify-center">
// // // // // // // // // // // // // // // // // // // // // // // // //         <h2 className="text-6xl text-white font-garamond">{title}</h2>
// // // // // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // // // // // }