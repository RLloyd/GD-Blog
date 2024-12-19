/*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
/*-= ParallaxScroll with Lenis =-*/
/*-=========================================================================
Key changes made:
Added Lenis initialization with custom configuration
Connected Lenis to GSAP's requestAnimationFrame loop
Added proper cleanup in the useEffect hook
Maintained all our existing functionality including:
   - The myMainContainer class fix
   - The h-[200vh] height for the third section
   - All the section content and animations
Added the ParallaxNavigation component : 12.17.2024
===========================================================================-*/
'use client';
import { isMultimediaSection, portfolioSections } from '@/data/portfolioData';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import { ParallaxNavigation } from '../ParallaxNavigation';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxScroll() {
   const containerRef = useRef<HTMLDivElement>(null);
   const section1Ref = useRef<HTMLDivElement>(null);
   const section2Ref = useRef<HTMLDivElement>(null);
   const section3Ref = useRef<HTMLDivElement>(null);
   const lenisRef = useRef<Lenis | null>(null);
   // const [isMobile, setIsMobile] = useState(false);

   /*-= Marites: GSAP React Animation Explanation =-*/
   useEffect(() => {
      // Responsiveness on displayin title
      // const checkMobile = () => {
      //    setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
      // };
      // checkMobile();
      // window.addEventListener('resize', checkMobile);

      // Initialize Lenis
      lenisRef.current = new Lenis({
         duration: 2,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease out expo
         orientation: 'vertical',
         gestureOrientation: 'vertical',
         smoothWheel: true,
         wheelMultiplier: 1,
         // smoothTouch: false,
         touchMultiplier: 2,
      });

      // Connect Lenis to GSAP
      function raf(time: number) {
         lenisRef.current?.raf(time);
         requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // GSAP Animation
      if (!containerRef.current) return;

      // Reset initial positions
      //   gsap.set(section2Ref.current, { yPercent: 100 });
      //   gsap.set(section3Ref.current, { yPercent: 200 });

      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
            pin: true,
            // invalidateOnRefresh: true,
         },
      });
      tl.to(section1Ref.current, {
         yPercent: -100,
         ease: 'none',
         duration: 3,
      });

      tl.to(section2Ref.current, {
         yPercent: -100,
         ease: 'none',
         delay: 0.5,
         duration: 1.5,
      }, '>');

      tl.to(section3Ref.current, {
         yPercent: -100,
         ease: 'none',
         delay: 0.5,
         duration: 3,
      }, '>');

      // Cleanup
      return () => {
         lenisRef.current?.destroy();
         tl.kill();
         ScrollTrigger.getAll().forEach(t => t.kill());
         // window.removeEventListener('resize', checkMobile);
      };
   }, []);

   const webSection = portfolioSections[0];
   const uiSection = portfolioSections[1];
   const multimediaSection = portfolioSections[2];

   if (!isMultimediaSection(multimediaSection) ||
      isMultimediaSection(webSection) ||
      isMultimediaSection(uiSection)) {
      throw new Error('Invalid portfolio section configuration');
   }

   return (
      <>
         <ParallaxNavigation />
         <div ref={containerRef} className="myMainContainer relative h-[400vh] w-full overflow-hidden bg-black">
            {/*-----= First Section ===--------------------------------*/}
            <div
               id={webSection.id}
               ref={section1Ref}
               // className="fixed top-0 right-0 left-0 h-screen bg-black z-30"
               // style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
               className="fixed top-0 right-0 h-screen bg-black z-30 m-0 w-screen left-1/2 -translate-x-1/2"
            >
               <div className="relative h-full">
                  <Image
                     src={webSection.image}
                     alt={webSection.title}
                     fill
                     className="object-cover"
                     priority
                  />
                  <div className="absolute inset-0
                     bg-primary-500/50
                     dark:bg-gradient-to-b from-black to-black/10
                     flex flex-col items-center justify-center text-white
                     ">
                     {/*--= Web Title =-------------------------------------=*/}
                     {/* Hide title on mobile */}
                     <h1 className="hidden md:block text-6xl font-garamond mb-4">
                        {webSection.title}
                     </h1>
                     {/* Show mobile title */}
                     <h1 className="md:hidden text-6xl font-garamond mb-4">
                        {webSection.titleMobile || webSection.title} {/* Fallback to main title if no mobile title */}
                     </h1>
                     {/*=--------------------------------------------------=*/}
                     <p className="text-2xl mb-8 max-w-2xl text-center font-nunitosans text-primary-50">
                        {webSection.description}
                     </p>
                     <Link
                        href={webSection.path}
                        className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
                     >
                        View Projects
                     </Link>

                     <p className='absolute bottom-4 text-4xl'><SlArrowDown /></p>
                  </div>
               </div>
            </div>

            {/*-----= Second Section ===--------------------------------*/}
            <div
               id={uiSection.id}
               ref={section2Ref}
               className="fixed top-0 right-0 left-0 h-screen bg-black z-20"
               style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
            >
               <div className="relative h-full">
                  <Image
                     src={uiSection.image}
                     alt={uiSection.title}
                     fill
                     className="object-cover"
                     priority
                  />
                  {/* dark:bg-gradient-to-b from-secondary-500/70 to-secondary-50/50 */}
                  {/* bg-orange-500/10 */}
                  <div className="absolute inset-0
                     flex flex-col items-center justify-center text-white
                     bg-primary-50/50
                     dark:bg-gradient-to-b from-white/20 to-white/10
                     ">
                     <h1 className="text-6xl font-garamond
                        bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text text-transparent
                        mb-4">{uiSection.title}</h1>
                     <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans text-primary-700">
                        {uiSection.description}
                     </p>
                     <Link
                        href={uiSection.path}
                        className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
                     >
                        View Projects
                     </Link>
                  </div>
               </div>
            </div>

            {/*-----= Third Section with Multiple Images ===--------------------------------*/}
            <div
               id={multimediaSection.id}
               ref={section3Ref}
               className="fixed top-0 right-0 left-0 h-[200vh] z-10"
               style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
            >
               {multimediaSection.subsections.map((item, index) => (
                  <div key={index} className="absolute top-0 right-0 left-0 h-screen bg-black"
                     style={{ top: `${index * 100}vh` }}>
                     <div className="relative h-full">
                        <Image
                           src={item.image}
                           alt={item.title}
                           fill
                           className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-transparent flex flex-col items-center justify-center text-white">
                           {/* <h1 className="text-6xl font-garamond mb-4">{item.title}</h1> */}
                           {/*--= Third Section Title =-------------------------------------=*/}
                           {/* Hide title on mobile */}
                           <h1 className="hidden md:block text-6xl font-garamond mb-4">
                              {item.title}
                           </h1>
                           {/* Show mobile title */}
                           <h1 className="md:hidden text-6xl font-garamond mb-4">
                              {item.titleMobile || item.title} {/* Fallback to main title if no mobile title */}
                           </h1>
                           {/*=--------------------------------------------------=*/}
                           <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans">
                              {item.description}
                           </p>
                           <Link
                              href={item.path}
                              className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
                              >
                              Learn More
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}
/*-|================================================================================|-*/

// /*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
// /*-= ParallaxScroll with Lenis =-*/
// /*-=========================================================================
// Key changes made:
// Added Lenis initialization with custom configuration
// Connected Lenis to GSAP's requestAnimationFrame loop
// Added proper cleanup in the useEffect hook
// Maintained all our existing functionality including:
//    - The myMainContainer class fix
//    - The h-[200vh] height for the third section
//    - All the section content and animations
// Added the ParallaxNavigation component : 12.17.2024
// ===========================================================================-*/
// 'use client';
// import Lenis from '@studio-freight/lenis';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useRef } from 'react';
// import { ParallaxNavigation } from '../ParallaxNavigation';
// import { portfolioSections, isMultimediaSection } from '@/data/portfolioData';

// gsap.registerPlugin(ScrollTrigger);

// export default function ParallaxScroll() {
//    const containerRef = useRef<HTMLDivElement>(null);
//    const section1Ref = useRef<HTMLDivElement>(null);
//    const section2Ref = useRef<HTMLDivElement>(null);
//    const section3Ref = useRef<HTMLDivElement>(null);
//    const lenisRef = useRef<Lenis | null>(null);

//    useEffect(() => {
//       // Initialize Lenis
//       lenisRef.current = new Lenis({
//          duration: 1.2,
//          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease out expo
//          orientation: 'vertical',
//          gestureOrientation: 'vertical',
//          smoothWheel: true,
//          wheelMultiplier: 1,
//          // smoothTouch: false,
//          touchMultiplier: 2,
//       });

//       // Connect Lenis to GSAP
//       function raf(time: number) {
//          lenisRef.current?.raf(time);
//          requestAnimationFrame(raf);
//       }
//       requestAnimationFrame(raf);

//       // GSAP Animation
//       if (!containerRef.current) return;

//           // Reset initial positions
//    //   gsap.set(section2Ref.current, { yPercent: 100 });
//    //   gsap.set(section3Ref.current, { yPercent: 200 });

//       const tl = gsap.timeline({
//          scrollTrigger: {
//             trigger: containerRef.current,
//             start: 'top top',
//             end: 'bottom bottom',
//             scrub: 1,
//             pin: true,
//             // invalidateOnRefresh: true,
//          },
//       });
//       tl.to(section1Ref.current, {
//          yPercent: -100,
//          ease: 'none',
//       });

//       tl.to(section2Ref.current, {
//          yPercent: -100,
//          ease: 'none',
//       }, '>');

//       tl.to(section3Ref.current, {
//          yPercent: -100,
//          ease: 'none',
//       }, '>');

// tl.to(section1Ref.current, {
//    yPercent: -100,
//    ease: 'none',
// });

// // tl.to(section2Ref.current, {
// //    yPercent: -100,
// //    ease: 'none',
// // }, "<");
// tl.to(section2Ref.current, {
//    yPercent: -100,
//    ease: "none",
//  }, "<");

// // tl.to(section3Ref.current, {
// //    yPercent: -100,
// //    ease: 'none',
// // }, '>');
// tl.to(section2Ref.current, {
//    yPercent: 0,
//    ease: "none",
//  }, "<");

//  tl.to(section2Ref.current, {
//    yPercent: -100,
//    ease: "none",
//  }, ">");

//  tl.to(section3Ref.current, {
//    yPercent: 0,
//    ease: "none",
//  }, "<");

// Cleanup
//       return () => {
//          lenisRef.current?.destroy();
//          tl.kill();
//          ScrollTrigger.getAll().forEach(t => t.kill());
//       };
//    }, []);

//    const webSection = portfolioSections[0];
//    const uiSection = portfolioSections[1];
//    const multimediaSection = portfolioSections[2];

//    if (!isMultimediaSection(multimediaSection) ||
//       isMultimediaSection(webSection) ||
//       isMultimediaSection(uiSection)) {
//       throw new Error('Invalid portfolio section configuration');
//    }

//    return (
//       <>
//          <ParallaxNavigation />
//          <div ref={containerRef} className="myMainContainer relative h-[400vh] w-full overflow-hidden bg-black">

//             {/* First Section =----------------------------------------------*/}
//             <div
//                id={webSection.id}
//                ref={section1Ref}
//                className="fixed top-0 right-0 left-0 h-screen bg-black z-30"
//                style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
//                >
//                <div className="relative h-full">
//                   <Image
//                      src={webSection.image}
//                      alt={webSection.title}
//                      fill
//                      className="object-cover"
//                      priority
//                   />
//                   <div className="absolute inset-0 bg-primary-800/70 flex flex-col items-center justify-center text-white">
//                      <h1 className="text-6xl font-garamond mb-4">{webSection.title}</h1>
//                      <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans text-primary-50">
//                         {webSection.description}
//                      </p>
//                      <Link
//                         href={webSection.path}
//                         className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
//                      >
//                         View Projects
//                      </Link>
//                   </div>
//                </div>
//             </div>

//             {/* Second Section =----------------------------------------------*/}
//             <div
//                id={uiSection.id}
//                ref={section2Ref}
//                className="fixed top-0 right-0 left-0 h-screen bg-black z-30"
//                style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
//                >
//                <div className="relative h-full">
//                   <Image
//                      src={uiSection.image}
//                      alt={uiSection.title}
//                      fill
//                      className="object-cover"
//                      priority
//                   />
//                   <div className="absolute inset-0 bg-secondary-800/70 flex flex-col items-center justify-center text-white">
//                      <h1 className="text-6xl font-garamond mb-4">{uiSection.title}</h1>
//                      <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans text-primary-50">
//                         {uiSection.description}
//                      </p>
//                      <Link
//                         href={uiSection.path}
//                         className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
//                      >
//                         View Projects
//                      </Link>
//                   </div>
//                </div>
//             </div>

//             {/* Third Section with Multiple Images =----------------------------------------------*/}
//             <div
//                id={multimediaSection.id}
//                ref={section3Ref}
//                className="fixed top-0 right-0 left-0 h-[200vh] z-10"
//                style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
//                >
//                {multimediaSection.subsections.map((item, index) => (
//                   <div key={index} className="absolute top-0 right-0 left-0 h-screen bg-black"
//                      style={{ top: `${index * 100}vh` }}>
//                      <div className="relative h-full">
//                         <Image
//                            src={item.image}
//                            alt={item.title}
//                            fill
//                            className="object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-transparent flex flex-col items-center justify-center text-white">
//                            <h1 className="text-6xl font-garamond mb-4">{item.title}</h1>
//                            <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans">
//                               {item.description}
//                            </p>
//                            <Link
//                               href={item.path}
//                               className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
//                            >
//                               Learn More
//                            </Link>
//                         </div>
//                      </div>
//                   </div>
//                ))}
//             </div>

//          </div>
//       </>

//    );
// }
// /*-|================================================================================|-*/
// /*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
// /*-= Enhanced ParallaxScroll Component • 8 =-*/
// /*-=========================================================================
// Key changes made:
// Added the myMainContainer class to prevent GSAP transform issues
// Maintained the working structure with proper positioning
// Added content overlays with titles, descriptions, and buttons
// Kept the clean transition animations between sections
// Added proper font classes for typography
// ===========================================================================-*/
// 'use client';
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';
// import Link from 'next/link';

// gsap.registerPlugin(ScrollTrigger);

// export default function ParallaxScroll() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const section1Ref = useRef<HTMLDivElement>(null);
//   const section2Ref = useRef<HTMLDivElement>(null);
//   const section3Ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: 'top top',
//         end: 'bottom bottom',
//         scrub: 1,
//         pin: true,
//       },
//     });

//     tl.to(section1Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     });

//     tl.to(section2Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     }, '>');

//     tl.to(section3Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     }, '>');

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="myMainContainer relative h-[400vh] w-full overflow-hidden bg-black">
//       {/* First Section */}
//       <div
//         ref={section1Ref}
//         className="fixed top-0 right-0 left-0 h-screen bg-black z-30"
//         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
//       >
//         <div className="relative h-full">
//           <Image
//             src="/assets/images/first.webp"
//             alt="Web Development"
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
//             <h1 className="text-6xl font-garamond mb-4">Web Development</h1>
//             <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans">
//               Creating modern, responsive web applications with cutting-edge technologies.
//             </p>
//             <Link
//               href="/portfolio/web-development"
//               className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
//             >
//               View Projects
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Second Section */}
//       <div
//         ref={section2Ref}
//         className="fixed top-0 right-0 left-0 h-screen bg-black z-20"
//         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
//       >
//         <div className="relative h-full">
//           <Image
//             src="/assets/images/second.webp"
//             alt="UI Design"
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
//             <h1 className="text-6xl font-garamond mb-4">UI Design</h1>
//             <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans">
//               Crafting beautiful user interfaces that deliver exceptional experiences.
//             </p>
//             <Link
//               href="/portfolio/ui-design"
//               className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
//             >
//               See Designs
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Third Section with Multiple Images */}
//       <div
//         ref={section3Ref}
//       //   className="fixed top-0 right-0 left-0 h-screen z-10" //this line don't work!
//         className="fixed top-0 right-0 left-0 h-[200vh] z-10" //this line works
//         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
//       >
//         {[
//           {
//             src: '/assets/images/third.webp',
//             title: 'Video Editing',
//             description: 'Professional video editing and post-production services.',
//             link: '/portfolio/multimedia/video'
//           },
//           {
//             src: '/assets/images/fourth.webp',
//             title: 'Motion Graphics',
//             description: 'Engaging motion graphics and visual effects.',
//             link: '/portfolio/multimedia/motion'
//           },
//           {
//             src: '/assets/images/fifth.webp',
//             title: 'Sound Design',
//             description: 'Immersive audio experiences and sound engineering.',
//             link: '/portfolio/multimedia/sound'
//           }
//         ].map((item, index) => (
//           <div key={index} className="absolute top-0 right-0 left-0 h-screen bg-black"
//                style={{ top: `${index * 100}vh` }}>
//             <div className="relative h-full">
//               <Image
//                 src={item.src}
//                 alt={item.title}
//                 fill
//                 className="object-cover"
//               />
//               <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
//                 <h1 className="text-6xl font-garamond mb-4">{item.title}</h1>
//                 <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans">
//                   {item.description}
//                 </p>
//                 <Link
//                   href={item.link}
//                   className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
//                 >
//                   Learn More
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// /*-|================================================================================|-*/


// /*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
// /*-= Enhanced ParallaxScroll Component • 8 =-*/
// /*-=========================================================================
// This setup provides:
// An enhanced ParallaxScroll component with:
// Titles, descriptions, and buttons for each section
// Smooth transitions and overlay effects
// Proper typography using our font families
// =----------------------------------------=
// A portfolio section structure with:
// A dedicated layout file
// A main portfolio page using the ParallaxScroll
// Dynamic category pages with a consistent layout
// =----------------------------------------=
// Improvements to the parallax effect:
// Better organization of section data
// Proper typing for all props and data
// Enhanced visual styling with overlays and text
// =----------------------------------------=
// To use this:
// Place the ParallaxScroll component in your components directory
// Create the portfolio directory structure in your app directory
// Add the necessary pages and layout files
// Add your actual project data to the categories object
// ===========================================================================-*/


// 'use client';
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';
// import Link from 'next/link';

// gsap.registerPlugin(ScrollTrigger);

// interface Section {
//   id: string;
//   image: string;
//   title: string;
//   description: string;
//   buttonText: string;
//   buttonLink: string;
// }

// const sections: Section[] = [
//   {
//     id: 'web-development',
//     image: '/assets/images/first.webp',
//     title: 'Web Development',
//     description: 'Creating modern, responsive web applications with cutting-edge technologies.',
//     buttonText: 'View Projects',
//     buttonLink: '/portfolio/web-development'
//   },
//   {
//     id: 'ui-design',
//     image: '/assets/images/second.webp',
//     title: 'UI Design',
//     description: 'Crafting beautiful user interfaces that deliver exceptional user experiences.',
//     buttonText: 'See Designs',
//     buttonLink: '/portfolio/ui-design'
//   },
//   {
//     id: 'multimedia',
//     image: '/assets/images/third.webp',
//     title: 'Multimedia',
//     description: 'Video editing and motion graphics that tell compelling stories.',
//     buttonText: 'Watch Showreel',
//     buttonLink: '/portfolio/multimedia'
//   }
// ];

// export default function ParallaxScroll() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const section1Ref = useRef<HTMLDivElement>(null);
//   const section2Ref = useRef<HTMLDivElement>(null);
//   const section3Ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: 'top top',
//         end: 'bottom bottom',
//         scrub: 1,
//         pin: true,
//       },
//     });

//     tl.to(section1Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     })
//     .to(section2Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     }, '>')
//     .to(section3Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     }, '>');

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, []);

//   return (
//     <div ref={containerRef} data-component="my-main-container"
//       className="myMainContainer relative h-[400vh] w-full overflow-hidden bg-black">

//       {/* First Section */}
//       <div ref={section1Ref} data-component="first-container"
//         className="fixed top-0 right-0 left-0 h-screen bg-black z-30"
//         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
//       >
//         <div className="relative h-full">
//           <Image
//             src={sections[0].image}
//             alt={sections[0].title}
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
//             <h1 className="text-6xl font-garamond mb-4">{sections[0].title}</h1>
//             <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans">{sections[0].description}</p>
//             <Link
//               href={sections[0].buttonLink}
//               className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
//             >
//               {sections[0].buttonText}
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Second Section */}
//       <div
//         ref={section2Ref}
//         className="fixed top-0 right-0 left-0 h-screen bg-black z-20"
//         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
//       >
//         <div className="relative h-full">
//           <Image
//             src={sections[1].image}
//             alt={sections[1].title}
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
//             <h1 className="text-6xl font-garamond mb-4">{sections[1].title}</h1>
//             <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans">{sections[1].description}</p>
//             <Link
//               href={sections[1].buttonLink}
//               className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
//             >
//               {sections[1].buttonText}
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Third Section */}
//       <div
//         ref={section3Ref}
//         className="fixed top-0 right-0 left-0 h-screen bg-black z-10"
//         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
//       >
//         <div className="relative h-full">
//           <Image
//             src={sections[2].image}
//             alt={sections[2].title}
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
//             <h1 className="text-6xl font-garamond mb-4">{sections[2].title}</h1>
//             <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans">{sections[2].description}</p>
//             <Link
//               href={sections[2].buttonLink}
//               className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
//             >
//               {sections[2].buttonText}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// /*-|================================================================================|-*/


// // /*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
// // /*-= Parallax Component with Fixed Width • 5 =-*/
// // /*-= This is a modified version of the "Fixed Parallax Component with Stacked Third Section • 2" =-*/
// // /*-=========================================================================
// // Key changes made:
// // Added explicit width: 100vw to all sections
// // Used left: 50% and transform: translateX(-50%) to center the sections properly
// // Added explicit margin and padding resets
// // Used right/left/top positioning instead of just width/height
// // Kept the 200vh height for the third section as you mentioned it works better
// // ===========================================================================-*/
// // 'use client';
// // import { useEffect, useRef } from 'react';
// // import { gsap } from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // import Image from 'next/image';

// // gsap.registerPlugin(ScrollTrigger);

// // export default function ParallaxScroll() {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const section1Ref = useRef<HTMLDivElement>(null);
// //   const section2Ref = useRef<HTMLDivElement>(null);
// //   const section3Ref = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     if (!containerRef.current) return;

// //     const tl = gsap.timeline({
// //       scrollTrigger: {
// //         trigger: containerRef.current,
// //         start: 'top top',
// //         end: 'bottom bottom',
// //         scrub: 1,
// //         pin: true,
// //       },
// //     });

// //     // First section animation
// //     tl.to(section1Ref.current, {
// //       yPercent: -100,
// //       ease: 'none',
// //     });

// //     // Second section animation
// //     tl.to(section2Ref.current, {
// //       yPercent: -100,
// //       ease: 'none',
// //     }, '>');

// //     // Third section animation (all images move together)
// //     tl.to(section3Ref.current, {
// //       yPercent: -100,
// //       ease: 'none',
// //     }, '>');

// //     return () => {
// //       tl.kill();
// //       ScrollTrigger.getAll().forEach(t => t.kill());
// //     };
// //   }, []);

// //   return (
// //     <div ref={containerRef} data-component="my-main-container"
// //       className="myMainContainer relative h-[400vh] w-full overflow-hidden"
// //       style={{ margin: 0, padding: 0 }}
// //     >
// //       {/* First Section */}
// //       <div ref={section1Ref} data-component="first-container"
// //         className="firstContainer fixed top-0 right-0 left-0 h-screen bg-black z-30"
// //         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// //       >
// //         <Image
// //           src="/assets/images/first.webp"
// //           alt="First Section"
// //           fill
// //           className="object-cover"
// //           priority
// //         />
// //       </div>

// //       {/* Second Section */}
// //       <div
// //         ref={section2Ref}
// //         className="fixed top-0 right-0 left-0 h-screen bg-accent-600 z-20"
// //         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// //       >
// //         {/* <Image
// //           src="/assets/images/second.webp"
// //           alt="Second Section"
// //           fill
// //           className="object-cover"
// //         /> */}
// //       </div>

// //       {/* Third Section - Stacked Images */}
// //       <div
// //         ref={section3Ref}
// //         className="fixed top-0 right-0 left-0 h-[200vh] z-10"
// //         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// //       >
// //         {[
// //           '/assets/images/third.webp',
// //           '/assets/images/fourth.webp',
// //           '/assets/images/fifth.webp'
// //         ].map((src, index) => (
// //           <div
// //             key={index}
// //             className="absolute top-0 right-0 left-0 h-screen bg-black"
// //             style={{ top: `${index * 100}vh`, margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// //           >
// //             <Image
// //               src={src}
// //               alt={`Third Section Image ${index + 1}`}
// //               fill
// //               className="object-cover"
// //             />
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// // /*-|================================================================================|-*/