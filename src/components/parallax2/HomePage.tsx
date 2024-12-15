/*-= src/components/parallax2/HomePage.tsx =-*/
/*-= Fixed Portfolio Page with Image Component =-*/
'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { RevealSection } from '@/components/parallax2/RevealSection';
import Image from 'next/image';

export default function HomePage() {
   useEffect(() => {
      const lenis = new Lenis({
         duration: 1.2,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         orientation: 'vertical',
         gestureOrientation: 'vertical',
         smoothWheel: true,
         wheelMultiplier: 1,
         smoothTouch: false,
         touchMultiplier: 2,
      });

      function raf(time: number) {
         lenis.raf(time);
         requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
         lenis.destroy();
      };
   }, []);

   const sections = [
      {
         image: "/assets/images/hero.webp",
         title: "Welcome"
      },
      {
         image: "/assets/images/second.webp",
         title: "Portfolio"
      },
      {
         image: "/assets/images/third.webp",
         title: "About",
         additionalImages: [
            "/assets/images/fourth.webp",
            "/assets/images/third.webp",
            "/assets/images/fifth.webp"
         ]
      }
   ];

   //   const additionalImages = [
   //     "/assets/images/fourth.webp",
   //     "/assets/images/third.webp",
   //     "/assets/images/fifth.webp"
   //   ];

   return (
      <div className="homepageContainer relative">
         {/* Main parallax sections */}
         <div style={{ height: `${sections.length * 100}vh` }}>
            <RevealSection sections={sections} />
         </div>

         {/* <div style={{ height: '300vh' }}>
            <RevealSection sections={sections} />
         </div> */}
         {/* <div style={{ height: `${(sections.length - 1) * 100}vh`}}>
        <RevealSection sections={sections} />
      </div> */}

         {/* Additional images section */}
         {/* <div className="w-screen">
        {additionalImages.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-screen"
          >
            <Image
              src={img}
              alt={`Additional view ${index + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div> */}
      </div>
   );
}

// /*-= Fixed Portfolio Page =-*/
// 'use client';
// import { useEffect } from 'react';
// import Lenis from '@studio-freight/lenis';
// import { RevealSection } from '@/components/parallax2/RevealSection';

// export default function HomePage() {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       orientation: 'vertical',
//       gestureOrientation: 'vertical',
//       smoothWheel: true,
//       wheelMultiplier: 1,
//       smoothTouch: false,
//       touchMultiplier: 2,
//     });

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   const sections = [
//     {
//       image: "/assets/images/hero.webp",
//       title: "Welcome"
//     },
//     {
//       image: "/assets/images/second.webp",
//       title: "Our Work"
//     },
//     {
//       image: "/assets/images/third.webp",
//       title: "About Us"
//     }
//   ];

//   const additionalImages = [
//     "/assets/images/fourth.webp",
//     "/assets/images/fifth.webp"
//   ];

//   return (
//     <>
//       {/* Main parallax sections */}
//       <div style={{ height: `${(sections.length - 1) * 100}vh` }}>
//         <RevealSection sections={sections} />
//       </div>

//       {/* Additional images section */}
//       {additionalImages.map((img, index) => (
//         <div
//           key={index}
//           className="relative w-screen h-screen"
//         >
//           <Image
//             src={img}
//             alt={`Additional view ${index + 1}`}
//             fill
//             className="object-cover"
//             sizes="100vw"
//           />
//         </div>
//       ))}
//     </>
//   );
// }
// // 'use client';
// // import { useEffect } from 'react';
// // import Lenis from '@studio-freight/lenis';
// // import { RevealSection } from './RevealSection';
// // import Image from 'next/image';

// // export default function HomePage() {
// //   useEffect(() => {
// //     const lenis = new Lenis({
// //       duration: 1.2,
// //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// //       orientation: 'vertical',
// //       smoothWheel: true,
// //     });

// //     function raf(time: number) {
// //       lenis.raf(time);
// //       requestAnimationFrame(raf);
// //     }

// //     requestAnimationFrame(raf);

// //     return () => {
// //       lenis.destroy();
// //     };
// //   }, []);

// //   const mainSections = [
// //     {
// //       image: "/assets/images/hero.webp",
// //       title: "Welcome"
// //     },
// //     {
// //       image: "/assets/images/second.webp",
// //       title: "Our Work"
// //     }
// //   ];

// //   const thirdGroupImages = [
// //     "/assets/images/third.webp",
// //     "/assets/images/fourth.webp",
// //     "/assets/images/fifth.webp"
// //   ];

// //   return (
// //     <main className="relative">
// //       {/* Parallax sections */}
// //       <div className="h-[200vh]">
// //         <RevealSection sections={mainSections} />
// //       </div>

// //       {/* Third group images - full-width static scroll */}
// //       <div className="w-full">
// //         {thirdGroupImages.map((img, index) => (
// //           <div
// //             key={index}
// //             className="relative w-full h-screen"
// //           >
// //             <Image
// //               src={img}
// //               alt={`View ${index + 1}`}
// //               fill
// //               className="object-cover"
// //               sizes="100vw"
// //               priority={index === 0}
// //             />
// //             <div className="absolute inset-0 bg-black/30" />
// //           </div>
// //         ))}
// //       </div>
// //     </main>
// //   );
// // }



// // // /*-= src/components/parallax2/HomePage.tsx =-*/
// // // /*-= Fixed Portfolio Page =-*/
// // // 'use client';
// // // import { useEffect } from 'react';
// // // import Lenis from '@studio-freight/lenis';
// // // import { RevealSection } from '@/components/parallax2/RevealSection';
// // // import Image from 'next/image';

// // // export default function HomePage() {
// // //   useEffect(() => {
// // //     const lenis = new Lenis({
// // //       duration: 1.2,
// // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // //       orientation: 'vertical',
// // //       gestureOrientation: 'vertical',
// // //       smoothWheel: true,
// // //       wheelMultiplier: 1,
// // //       smoothTouch: false,
// // //       touchMultiplier: 2,
// // //     });

// // //     function raf(time: number) {
// // //       lenis.raf(time);
// // //       requestAnimationFrame(raf);
// // //     }

// // //     requestAnimationFrame(raf);

// // //     return () => {
// // //       lenis.destroy();
// // //     };
// // //   }, []);

// // //   // First two sections for parallax
// // //   const mainSections = [
// // //     {
// // //       image: "/assets/images/hero.webp",
// // //       title: "Welcome"
// // //     },
// // //     {
// // //       image: "/assets/images/second.webp",
// // //       title: "Our Work"
// // //     }
// // //   ];

// // //   // Third section group images
// // //   const thirdGroupImages = [
// // //     "/assets/images/third.webp",
// // //     "/assets/images/fourth.webp",
// // //     "/assets/images/fifth.webp"
// // //   ];

// // //   return (
// // //     <main className="relative overflow-hidden">
// // //       {/* Parallax sections */}
// // //       <div style={{ height: '100vh' }}>
// // //         <RevealSection sections={mainSections} />
// // //       </div>

// // //       {/* Third group images - static scroll */}
// // //       <div className="relative">
// // //         {thirdGroupImages.map((img, index) => (
// // //           <div
// // //             key={index}
// // //             className="relative h-screen"
// // //           >
// // //             <div className="absolute inset-0">
// // //               <Image
// // //                 src={img}
// // //                 alt={`View ${index + 1}`}
// // //                 fill
// // //                 className="object-cover"
// // //                 sizes="100vw"
// // //                 priority={index === 0}
// // //               />
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </main>
// // //   );
// // // }
// // // // /*-= src/components/parallax2/HomePage.tsx =-*/
// // // // 'use client';
// // // // import { useEffect } from 'react';
// // // // import Lenis from '@studio-freight/lenis';
// // // // import { RevealSection } from '@/components/parallax2/RevealSection';
// // // // import Image from 'next/image';

// // // // export default function HomePage() {
// // // //   useEffect(() => {
// // // //     const lenis = new Lenis({
// // // //       duration: 1.2,
// // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // //       orientation: 'vertical',
// // // //       gestureOrientation: 'vertical',
// // // //       smoothWheel: true,
// // // //       wheelMultiplier: 1,
// // // //       smoothTouch: false,
// // // //       touchMultiplier: 2,
// // // //     });

// // // //     function raf(time: number) {
// // // //       lenis.raf(time);
// // // //       requestAnimationFrame(raf);
// // // //     }

// // // //     requestAnimationFrame(raf);

// // // //     return () => {
// // // //       lenis.destroy();
// // // //     };
// // // //   }, []);

// // // //   const sections = [
// // // //     {
// // // //       image: "/assets/images/hero.webp",
// // // //       title: "Welcome"
// // // //     },
// // // //     {
// // // //       image: "/assets/images/second.webp",
// // // //       title: "Our Work"
// // // //     }
// // // //   ];

// // // //   // All images for the third section group
// // // //   const thirdSectionImages = [
// // // //     "/assets/images/third.webp",
// // // //     "/assets/images/fourth.webp",
// // // //     "/assets/images/fifth.webp"
// // // //   ];

// // // //   return (
// // // //     <div className="relative">
// // // //       {/* Main parallax sections */}
// // // //       <div style={{ height: `${sections.length * 100}vh` }}>
// // // //         <RevealSection sections={sections} />
// // // //       </div>

// // // //       {/* Third section group with all scrolling images */}
// // // //       <div className="w-screen overflow-x-hidden">
// // // //         {thirdSectionImages.map((img, index) => (
// // // //           <div
// // // //             key={index}
// // // //             className="relative w-screen h-screen"
// // // //           >
// // // //             <div className="absolute inset-0">
// // // //               <Image
// // // //                 src={img}
// // // //                 alt={`Section ${index + 3}`}
// // // //                 fill
// // // //                 className="object-cover"
// // // //                 sizes="100vw"
// // // //                 priority={index === 0}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // // // export default function HomePage() {
// // // // //   useEffect(() => {
// // // // //     const lenis = new Lenis({
// // // // //       duration: 1.2,
// // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // //       orientation: 'vertical',
// // // // //       gestureOrientation: 'vertical',
// // // // //       smoothWheel: true,
// // // // //       wheelMultiplier: 1,
// // // // //       smoothTouch: false,
// // // // //       touchMultiplier: 2,
// // // // //     });

// // // // //     function raf(time: number) {
// // // // //       lenis.raf(time);
// // // // //       requestAnimationFrame(raf);
// // // // //     }

// // // // //     requestAnimationFrame(raf);

// // // // //     return () => {
// // // // //       lenis.destroy();
// // // // //     };
// // // // //   }, []);

// // // // //   const sections = [
// // // // //     {
// // // // //       image: "/assets/images/hero.webp",
// // // // //       title: "Welcome"
// // // // //     },
// // // // //     {
// // // // //       image: "/assets/images/second.webp",
// // // // //       title: "Our Work"
// // // // //     },
// // // // //     {
// // // // //       image: "/assets/images/third.webp",
// // // // //       title: "About Us"
// // // // //     }
// // // // //   ];

// // // // //   const additionalImages = [
// // // // //     "/assets/images/fourth.webp",
// // // // //     "/assets/images/fifth.webp"
// // // // //   ];

// // // // //   return (
// // // // //     <div className="relative">
// // // // //       {/* Main parallax sections */}
// // // // //       <div style={{ height: `${(sections.length - 1) * 100}vh` }}>
// // // // //         <RevealSection sections={sections} />
// // // // //       </div>

// // // // //       {/* Additional images section */}
// // // // //       <div className="w-screen">
// // // // //         {additionalImages.map((img, index) => (
// // // // //           <div
// // // // //             key={index}
// // // // //             className="relative w-full h-screen"
// // // // //           >
// // // // //             <Image
// // // // //               src={img}
// // // // //               alt={`Additional view ${index + 1}`}
// // // // //               fill
// // // // //               className="object-cover"
// // // // //               sizes="100vw"
// // // // //               priority={index === 0}
// // // // //             />
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // // 'use client';
// // // // // // import { useEffect } from 'react';
// // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // import { RevealSection } from '@/components/parallax2/RevealSection';

// // // // // // export default function HomePage() {
// // // // // //   useEffect(() => {
// // // // // //     const lenis = new Lenis({
// // // // // //       duration: 1.2,
// // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // //       orientation: 'vertical',
// // // // // //       gestureOrientation: 'vertical',
// // // // // //       smoothWheel: true,
// // // // // //       wheelMultiplier: 1,
// // // // // //       smoothTouch: false,
// // // // // //       touchMultiplier: 2,
// // // // // //     });

// // // // // //     function raf(time: number) {
// // // // // //       lenis.raf(time);
// // // // // //       requestAnimationFrame(raf);
// // // // // //     }

// // // // // //     requestAnimationFrame(raf);

// // // // // //     return () => {
// // // // // //       lenis.destroy();
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const sections = [
// // // // // //     {
// // // // // //       image: "/assets/images/hero.webp",
// // // // // //       title: "Welcome"
// // // // // //     },
// // // // // //     {
// // // // // //       image: "/assets/images/second.webp",
// // // // // //       title: "Our Work"
// // // // // //     },
// // // // // //     {
// // // // // //       image: "/assets/images/third.webp",
// // // // // //       title: "About Us"
// // // // // //     }
// // // // // //   ];

// // // // // //   const additionalImages = [
// // // // // //     "/assets/images/fourth.webp",
// // // // // //     "/assets/images/fifth.webp"
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="relative">
// // // // // //       {/* Main parallax sections */}
// // // // // //       <div style={{ height: `${(sections.length - 1) * 100}vh` }}>
// // // // // //         <RevealSection sections={sections} />
// // // // // //       </div>

// // // // // //       {/* Additional images section */}
// // // // // //       <div className="w-screen">
// // // // // //         {additionalImages.map((img, index) => (
// // // // // //           <div
// // // // // //             key={index}
// // // // // //             className="relative w-full h-screen"
// // // // // //           >
// // // // // //             <Image
// // // // // //               src={img}
// // // // // //               alt={`Additional view ${index + 1}`}
// // // // // //               fill
// // // // // //               className="object-cover"
// // // // // //               sizes="100vw"
// // // // // //               priority={index === 0}
// // // // // //             />
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // // // export default function HomePage() {
// // // // // // //   useEffect(() => {
// // // // // // //     const lenis = new Lenis({
// // // // // // //       duration: 1.2,
// // // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // //       orientation: 'vertical',
// // // // // // //       gestureOrientation: 'vertical',
// // // // // // //       smoothWheel: true,
// // // // // // //       wheelMultiplier: 1,
// // // // // // //       smoothTouch: false,
// // // // // // //       touchMultiplier: 2,
// // // // // // //     });

// // // // // // //     function raf(time: number) {
// // // // // // //       lenis.raf(time);
// // // // // // //       requestAnimationFrame(raf);
// // // // // // //     }

// // // // // // //     requestAnimationFrame(raf);

// // // // // // //     return () => {
// // // // // // //       lenis.destroy();
// // // // // // //     };
// // // // // // //   }, []);

// // // // // // //   const sections = [
// // // // // // //     {
// // // // // // //       image: "/assets/images/hero.webp",
// // // // // // //       title: "Welcome"
// // // // // // //     },
// // // // // // //     {
// // // // // // //       image: "/assets/images/second.webp",
// // // // // // //       title: "Our Work"
// // // // // // //     },
// // // // // // //     {
// // // // // // //       image: "/assets/images/third.webp",
// // // // // // //       title: "About Us",
// // // // // // //       additionalImages: [
// // // // // // //         "/assets/images/fourth.webp",
// // // // // // //         "/assets/images/fifth.webp"
// // // // // // //       ]
// // // // // // //     }
// // // // // // //   ];

// // // // // // //   const totalSections = sections.length - 1 +
// // // // // // //     (1 + (sections[sections.length - 1].additionalImages?.length || 0));

// // // // // // //   return (
// // // // // // //     <main
// // // // // // //       className="w-full overflow-x-hidden"
// // // // // // //       style={{ height: `${totalSections * 100}vh` }}
// // // // // // //     >
// // // // // // //       <RevealSection sections={sections} />
// // // // // // //     </main>
// // // // // // //   );
// // // // // // // }

// // // // // // // // export default function HomePage() {
// // // // // // // //   useEffect(() => {
// // // // // // // //     const lenis = new Lenis({
// // // // // // // //       duration: 1.2,
// // // // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // // //       orientation: 'vertical',
// // // // // // // //       gestureOrientation: 'vertical',
// // // // // // // //       smoothWheel: true,
// // // // // // // //       wheelMultiplier: 1,
// // // // // // // //       smoothTouch: false,
// // // // // // // //       touchMultiplier: 2,
// // // // // // // //     });

// // // // // // // //     function raf(time: number) {
// // // // // // // //       lenis.raf(time);
// // // // // // // //       requestAnimationFrame(raf);
// // // // // // // //     }

// // // // // // // //     requestAnimationFrame(raf);

// // // // // // // //     return () => {
// // // // // // // //       lenis.destroy();
// // // // // // // //     };
// // // // // // // //   }, []);

// // // // // // // //   const sections = [
// // // // // // // //     {
// // // // // // // //       image: "/assets/images/hero.webp",
// // // // // // // //       title: "Welcome"
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       image: "/assets/images/second.webp",
// // // // // // // //       title: "Our Work"
// // // // // // // //     },
// // // // // // // //     {
// // // // // // // //       image: "/assets/images/third.webp",
// // // // // // // //       title: "About Us",
// // // // // // // //       additionalImages: [
// // // // // // // //         "/assets/images/fourth.webp",
// // // // // // // //         "/assets/images/fifth.webp"
// // // // // // // //       ]
// // // // // // // //     }
// // // // // // // //   ];

// // // // // // // //   // Calculate total height including additional images
// // // // // // // //   const totalSections = sections.length - 1 + // Main sections minus last one
// // // // // // // //     (1 + (sections[sections.length - 1].additionalImages?.length || 0)); // Last section plus additional images

// // // // // // // //   return (
// // // // // // // //     <main
// // // // // // // //       className="w-full"
// // // // // // // //       style={{ height: `${totalSections * 100}vh` }}
// // // // // // // //     >
// // // // // // // //       <RevealSection sections={sections} />
// // // // // // // //     </main>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // // // 'use client';
// // // // // // // // // import { useEffect } from 'react';
// // // // // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // // // // import { RevealSection } from '@/components/parallax2/RevealSection';

// // // // // // // // // export default function HomePage() {
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const lenis = new Lenis({
// // // // // // // // //       duration: 1.2,
// // // // // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // // // //       orientation: 'vertical',
// // // // // // // // //       gestureOrientation: 'vertical',
// // // // // // // // //       smoothWheel: true,
// // // // // // // // //       wheelMultiplier: 1,
// // // // // // // // //       smoothTouch: false,
// // // // // // // // //       touchMultiplier: 2,
// // // // // // // // //     });

// // // // // // // // //     function raf(time: number) {
// // // // // // // // //       lenis.raf(time);
// // // // // // // // //       requestAnimationFrame(raf);
// // // // // // // // //     }

// // // // // // // // //     requestAnimationFrame(raf);

// // // // // // // // //     return () => {
// // // // // // // // //       lenis.destroy();
// // // // // // // // //     };
// // // // // // // // //   }, []);

// // // // // // // // //   const sections = [
// // // // // // // // //     {
// // // // // // // // //       image: "/assets/images/hero.webp",
// // // // // // // // //       title: "Welcome"
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       image: "/assets/images/second.webp",
// // // // // // // // //       title: "Our Work"
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       image: "/assets/images/third.webp",
// // // // // // // // //       title: "About Us",
// // // // // // // // //       additionalImages: [
// // // // // // // // //         "/assets/images/fourth.webp",
// // // // // // // // //         "/assets/images/fifth.webp"
// // // // // // // // //       ]
// // // // // // // // //     }
// // // // // // // // //   ];

// // // // // // // // //   // Calculate total height based on sections and additional images
// // // // // // // // //   const totalSections = sections.length +
// // // // // // // // //     (sections[sections.length - 1].additionalImages?.length || 0);

// // // // // // // // //   return (
// // // // // // // // //     <main
// // // // // // // // //       className="relative w-full"
// // // // // // // // //       style={{ height: `${totalSections * 100}vh` }}
// // // // // // // // //     >
// // // // // // // // //       <RevealSection sections={sections} />
// // // // // // // // //     </main>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // // // 'use client';
// // // // // // // // // // import { useEffect } from 'react';
// // // // // // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // // // // // import { RevealSection } from '@/components/parallax2/RevealSection';

// // // // // // // // // // export default function HomePage() {
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const lenis = new Lenis({
// // // // // // // // // //       duration: 1.2,
// // // // // // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // // // // //       orientation: 'vertical',
// // // // // // // // // //       gestureOrientation: 'vertical',
// // // // // // // // // //       smoothWheel: true,
// // // // // // // // // //       wheelMultiplier: 1,
// // // // // // // // // //       smoothTouch: false,
// // // // // // // // // //       touchMultiplier: 2,
// // // // // // // // // //     });

// // // // // // // // // //     function raf(time: number) {
// // // // // // // // // //       lenis.raf(time);
// // // // // // // // // //       requestAnimationFrame(raf);
// // // // // // // // // //     }

// // // // // // // // // //     requestAnimationFrame(raf);

// // // // // // // // // //     return () => {
// // // // // // // // // //       lenis.destroy();
// // // // // // // // // //     };
// // // // // // // // // //   }, []);

// // // // // // // // // //   const sections = [
// // // // // // // // // //     {
// // // // // // // // // //       image: "/assets/images/hero.webp",
// // // // // // // // // //       title: "Welcome"
// // // // // // // // // //     },
// // // // // // // // // //     {
// // // // // // // // // //       image: "/assets/images/second.webp",
// // // // // // // // // //       title: "Our Work"
// // // // // // // // // //     },
// // // // // // // // // //     {
// // // // // // // // // //       image: "/assets/images/third.webp",
// // // // // // // // // //       title: "About Us"
// // // // // // // // // //     }
// // // // // // // // // //   ];

// // // // // // // // // //   return (
// // // // // // // // // //     <main className="w-full" style={{ height: `${sections.length * 100}vh` }}>
// // // // // // // // // //       <RevealSection sections={sections} />
// // // // // // // // // //     </main>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // // // 'use client';
// // // // // // // // // // // import { useEffect } from 'react';
// // // // // // // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // // // // // // import { RevealSection } from '@/components/parallax2/RevealSection';

// // // // // // // // // // // export default function HomePage() {
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const lenis = new Lenis({
// // // // // // // // // // //       duration: 1.2,
// // // // // // // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // // // // // //       orientation: 'vertical',
// // // // // // // // // // //       gestureOrientation: 'vertical',
// // // // // // // // // // //       smoothWheel: true,
// // // // // // // // // // //       wheelMultiplier: 1,
// // // // // // // // // // //       smoothTouch: false,
// // // // // // // // // // //       touchMultiplier: 2,
// // // // // // // // // // //     });

// // // // // // // // // // //     function raf(time: number) {
// // // // // // // // // // //       lenis.raf(time);
// // // // // // // // // // //       requestAnimationFrame(raf);
// // // // // // // // // // //     }

// // // // // // // // // // //     requestAnimationFrame(raf);

// // // // // // // // // // //     return () => {
// // // // // // // // // // //       lenis.destroy();
// // // // // // // // // // //     };
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <main className="relative w-full" style={{ height: '300vh' }}>
// // // // // // // // // // //       <RevealSection
// // // // // // // // // // //         image="/assets/images/hero.webp"
// // // // // // // // // // //         title="Welcome"
// // // // // // // // // // //         zIndex={3}
// // // // // // // // // // //       />
// // // // // // // // // // //       <RevealSection
// // // // // // // // // // //         image="/assets/images/second.webp"
// // // // // // // // // // //         title="Our Work"
// // // // // // // // // // //         zIndex={2}
// // // // // // // // // // //       />
// // // // // // // // // // //       <RevealSection
// // // // // // // // // // //         image="/assets/images/third.webp"
// // // // // // // // // // //         title="About Us"
// // // // // // // // // // //         zIndex={1}
// // // // // // // // // // //       />
// // // // // // // // // // //     </main>
// // // // // // // // // // //   );
// // // // // // // // // // // }
// // // // // // // // // // // // 'use client';
// // // // // // // // // // // // import { useEffect } from 'react';
// // // // // // // // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // // // // // // // import { RevealSection } from '@/components/parallax2/RevealSection';

// // // // // // // // // // // // export default function HomePage() {
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const lenis = new Lenis({
// // // // // // // // // // // //       duration: 1.2,
// // // // // // // // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // // // // // // //       orientation: 'vertical',
// // // // // // // // // // // //       gestureOrientation: 'vertical',
// // // // // // // // // // // //       smoothWheel: true,
// // // // // // // // // // // //       wheelMultiplier: 1,
// // // // // // // // // // // //       smoothTouch: false,
// // // // // // // // // // // //       touchMultiplier: 2,
// // // // // // // // // // // //     });

// // // // // // // // // // // //     function raf(time: number) {
// // // // // // // // // // // //       lenis.raf(time);
// // // // // // // // // // // //       requestAnimationFrame(raf);
// // // // // // // // // // // //     }

// // // // // // // // // // // //     requestAnimationFrame(raf);

// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       lenis.destroy();
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <main className="relative w-full" style={{ height: '400vh' }}>
// // // // // // // // // // // //       <RevealSection
// // // // // // // // // // // //         image="/assets/images/hero.webp"
// // // // // // // // // // // //         title="Welcome"
// // // // // // // // // // // //         zIndex={3}
// // // // // // // // // // // //       />
// // // // // // // // // // // //       <RevealSection
// // // // // // // // // // // //         image="/assets/images/second.webp"
// // // // // // // // // // // //         title="Our Work"
// // // // // // // // // // // //         zIndex={2}
// // // // // // // // // // // //       />
// // // // // // // // // // // //       <RevealSection
// // // // // // // // // // // //         image="/assets/images/third.webp"
// // // // // // // // // // // //         title="About Us"
// // // // // // // // // // // //         zIndex={1}
// // // // // // // // // // // //       />
// // // // // // // // // // // //     </main>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }