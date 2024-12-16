// /*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
// /*-= Fixed Parallax Component • 7 =-*/
// /*-=========================================================================
// Key changes made:

// ===========================================================================-*/
// 'use client';
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

// gsap.registerPlugin(ScrollTrigger);

// export default function ParallaxScroll() {
//    const containerRef = useRef<HTMLDivElement | null>(null);
//    const section1Ref = useRef<HTMLDivElement | null>(null);
//    const section2Ref = useRef<HTMLDivElement | null>(null);
//    const section3Ref = useRef<HTMLDivElement | null>(null);

//    useEffect(() => {
//       const container = containerRef.current;
//       const section1 = section1Ref.current;
//       const section2 = section2Ref.current;
//       const section3 = section3Ref.current;

//       if (!container || !section1 || !section2 || !section3) return;

//       // Kill any existing ScrollTriggers first
//       ScrollTrigger.getAll().forEach(t => t.kill());

//       const tl = gsap.timeline({
//          scrollTrigger: {
//             trigger: container,
//             start: 'top top',
//             end: 'bottom bottom',
//             scrub: 1,
//             pin: true,
//             anticipatePin: 1,
//             fastScrollEnd: true,
//             preventOverlaps: true,
//          },
//       });

//       // First section animation
//       tl.to(section1, {
//          yPercent: -100,
//          ease: 'none',
//       });

//       // Second section animation
//       tl.to(section2, {
//          yPercent: -100,
//          ease: 'none',
//       }, '>');

//       // Third section animation (all images move together)
//       tl.to(section3, {
//          yPercent: -100,
//          ease: 'none',
//       }, '>');

//       return () => {
//          tl.kill();
//       };
//    }, []);

//    return (
//       <div className="wrapper relative w-screen">
//          <div data-component="myMainContainer"
//             ref={containerRef}
//             className="myMainContainer relative h-[400vh] w-screen"
//             // className="relative h-[400vh] w-screen translate-x-0 overflow-x-hidden"
//          >
//             {/* First Section */}
//             <div data-component="firstSectionContainer"
//                ref={section1Ref}
//                className="fixed top-0 left-0 w-screen h-screen bg-black z-30"
//             >
//                <Image
//                   src="/assets/images/first.webp"
//                   alt="First Section"
//                   fill
//                   className="object-cover"
//                   priority
//                />
//             </div>

//             {/* Second Section */}
//             <div
//                ref={section2Ref}
//                className="fixed top-0 left-0 w-screen h-screen bg-black z-20"
//             >
//                <Image
//                   src="/assets/images/second.webp"
//                   alt="Second Section"
//                   fill
//                   className="object-cover"
//                />
//             </div>

//             {/* Third Section - Stacked Images */}
//             <div
//                ref={section3Ref}
//                className="fixed top-0 left-0 w-screen h-[200vh] z-10"
//             >
//                {[
//                   '/assets/images/third.webp',
//                   '/assets/images/fourth.webp',
//                   '/assets/images/fifth.webp'
//                ].map((src, index) => (
//                   <div
//                      key={index}
//                      className="absolute w-screen h-screen bg-black"
//                      style={{ top: `${index * 100}vh` }}
//                   >
//                      <Image
//                         src={src}
//                         alt={`Third Section Image ${index + 1}`}
//                         fill
//                         className="object-cover"
//                      />
//                   </div>
//                ))}
//             </div>
//          </div>
//       </div>
//    );
// }
/*-|================================================================================|-*/

// /*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
// /*-= Parallax Component with Fixed Transform • 6 =-*/
// /*-=========================================================================
// Key changes made:
// Added gsap.set(containerRef.current, { clearProps: "transform" }) to remove the unwanted transform
// Simplified the container and section classes back to the original working version
// Kept the 200vh height for the third section
// Removed unnecessary positioning styles that were trying to fix the width issue
// Added pinSpacing: true to ensure proper pin behavior
// This should now:
// Fill the entire viewport width without any left margin
// Remove the unwanted transform
// Maintain smooth scrolling behavior
// Stop at the correct point with the last image
// ===========================================================================-*/
// 'use client';
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

// gsap.registerPlugin(ScrollTrigger);

// export default function ParallaxScroll() {
//    const containerRef = useRef<HTMLDivElement>(null);
//    const section1Ref = useRef<HTMLDivElement>(null);
//    const section2Ref = useRef<HTMLDivElement>(null);
//    const section3Ref = useRef<HTMLDivElement>(null);

//    useEffect(() => {
//       if (!containerRef.current) return;

//       // Force GSAP to use a different transform origin
//       ScrollTrigger.config({
//          autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
//          ignoreMobileResize: true
//       });

//       // Clear any existing pins
//       ScrollTrigger.getAll().forEach(st => st.kill());

//       const tl = gsap.timeline({
//          scrollTrigger: {
//             trigger: containerRef.current,
//             start: 'top top',
//             end: 'bottom bottom',
//             scrub: 1,
//             pin: true,
//             pinSpacing: true,
//             invalidateOnRefresh: true, // This might help with transform issues
//             onEnter: () => {
//                gsap.set(containerRef.current.parentElement, {
//                   xPercent: 0,
//                   x: 0,
//                   force3D: false // Disable 3D transforms
//                });
//             }
//          },
//       });

//       // Remove the transform that GSAP adds to the container
//       // gsap.set(containerRef.current, { clearProps: "transform" });

//       // const tl = gsap.timeline({
//       //    scrollTrigger: {
//       //       trigger: containerRef.current,
//       //       start: 'top top',
//       //       end: 'bottom bottom',
//       //       scrub: 1,
//       //       pin: true,
//       //       pinReparent: true, // This might help prevent the transform
//       //       onEnter: () => { // Clear the transform immediately when pinning starts
//       //          gsap.set(containerRef.current, { transform: 'none' });
//       //       }
//       //    },
//       // });
//       // const tl = gsap.timeline({
//       //    scrollTrigger: {
//       //      trigger: containerRef.current.parentElement,
//       //      start: 'top top',
//       //      end: 'bottom bottom',
//       //      scrub: 1,
//       //      pin: true
//       //    },
//       //  });

//       // First section animation
//       tl.to(section1Ref.current, {
//          yPercent: -100,
//          ease: 'none',
//       });

//       // Second section animation
//       tl.to(section2Ref.current, {
//          yPercent: -100,
//          ease: 'none',
//       }, '>');

//       // Third section animation (all images move together)
//       tl.to(section3Ref.current, {
//          yPercent: -100,
//          ease: 'none',
//       }, '>');

//       return () => {
//          tl.kill();
//          ScrollTrigger.getAll().forEach(t => t.kill());
//       };
//    }, []);

//    return (
//       <div
//          className="pin-wrapper"
//          style={{ width: '100vw', overflow: 'hidden' }} // Ensure wrapper takes full width
//       >
//          <div
//             ref={containerRef}
//             className="myMainContainer relative h-[400vh] w-[100vw] overflow-x-hidden"
//             style={{
//                marginLeft: 'calc(-50vw + 50%)', // This centers the content regardless of transform
//                marginRight: 'calc(-50vw + 50%)',
//                width: '100vw'
//             }}
//          >
//             {/* First Section */}
//             <div
//                ref={section1Ref}
//                className="fixed top-0 left-0 w-screen h-screen bg-black z-30"
//             >
//                <Image
//                   src="/assets/images/first.webp"
//                   alt="First Section"
//                   fill
//                   className="object-cover"
//                   priority
//                />
//             </div>

//             {/* Second Section */}
//             <div
//                ref={section2Ref}
//                className="fixed top-0 left-0 w-screen h-screen bg-black z-20"
//             >
//                <Image
//                   src="/assets/images/second.webp"
//                   alt="Second Section"
//                   fill
//                   className="object-cover"
//                />
//             </div>

//             {/* Third Section - Stacked Images */}
//             <div
//                ref={section3Ref}
//                className="fixed top-0 left-0 w-screen h-[200vh] z-10"
//             >
//                {[
//                   '/assets/images/third.webp',
//                   '/assets/images/fourth.webp',
//                   '/assets/images/fifth.webp'
//                ].map((src, index) => (
//                   <div
//                      key={index}
//                      className="absolute w-screen h-screen bg-black"
//                      style={{ top: `${index * 100}vh` }}
//                   >
//                      <Image
//                         src={src}
//                         alt={`Third Section Image ${index + 1}`}
//                         fill
//                         className="object-cover"
//                      />
//                   </div>
//                ))}
//             </div>
//          </div>
//       </div>
//    );
// }
// /*-|================================================================================|-*/

/*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
/*-= Parallax Component with Fixed Width • 5 =-*/
/*-= This is a modified version of the "Fixed Parallax Component with Stacked Third Section • 2" =-*/
/*-=========================================================================
Key changes made:
Added explicit width: 100vw to all sections
Used left: 50% and transform: translateX(-50%) to center the sections properly
Added explicit margin and padding resets
Used right/left/top positioning instead of just width/height
Kept the 200vh height for the third section as you mentioned it works better
===========================================================================-*/
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: true,
      },
    });

    // First section animation
    tl.to(section1Ref.current, {
      yPercent: -100,
      ease: 'none',
    });

    // Second section animation
    tl.to(section2Ref.current, {
      yPercent: -100,
      ease: 'none',
    }, '>');

    // Third section animation (all images move together)
    tl.to(section3Ref.current, {
      yPercent: -100,
      ease: 'none',
    }, '>');

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef}
      className="myMainContainer relative h-[400vh] w-full overflow-hidden"
      style={{ margin: 0, padding: 0 }}
    >
      {/* First Section */}
      <div ref={section1Ref}
        className="firstContainwer fixed top-0 right-0 left-0 h-screen bg-black z-30"
        style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
      >
        <Image
          src="/assets/images/first.webp"
          alt="First Section"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Second Section */}
      <div
        ref={section2Ref}
        className="fixed top-0 right-0 left-0 h-screen bg-accent-600 z-20"
        style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
      >
        {/* <Image
          src="/assets/images/second.webp"
          alt="Second Section"
          fill
          className="object-cover"
        /> */}
      </div>

      {/* Third Section - Stacked Images */}
      <div
        ref={section3Ref}
        className="fixed top-0 right-0 left-0 h-[200vh] z-10"
        style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
      >
        {[
          '/assets/images/third.webp',
          '/assets/images/fourth.webp',
          '/assets/images/fifth.webp'
        ].map((src, index) => (
          <div
            key={index}
            className="absolute top-0 right-0 left-0 h-screen bg-black"
            style={{ top: `${index * 100}vh`, margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
          >
            <Image
              src={src}
              alt={`Third Section Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
/*-|================================================================================|-*/

// /*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
// /*-= Fixed Parallax Component with Section Wrapper • 4 =-*/
// 'use client';
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

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

//     // First section animation
//     tl.to(section1Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     });

//     // Second section animation
//     tl.to(section2Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     }, '>');

//     // Third section animation (all images move together)
//     tl.to(section3Ref.current, {
//       yPercent: -66.67,
//       ease: 'none',
//     }, '>');

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="relative h-[400vh]"
//     >
//       {/* First Section */}
//       <div
//         ref={section1Ref}
//         className="sticky top-0 left-0 w-full h-screen bg-black"
//       >
//         <Image
//           src="/assets/images/first.webp"
//           alt="First Section"
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>

//       {/* Second Section */}
//       <div
//         ref={section2Ref}
//         className="sticky top-0 left-0 w-full h-screen bg-black"
//       >
//         <Image
//           src="/assets/images/second.webp"
//           alt="Second Section"
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Third Section - Stacked Images */}
//       <div
//         ref={section3Ref}
//         className="sticky top-0 left-0 w-full h-[300vh]"
//       >
//         {[
//           '/assets/images/third.webp',
//           '/assets/images/fourth.webp',
//           '/assets/images/fifth.webp'
//         ].map((src, index) => (
//           <div
//             key={index}
//             className="absolute w-full h-screen bg-black"
//             style={{ top: `${index * 100}vh` }}
//           >
//             <Image
//               src={src}
//               alt={`Third Section Image ${index + 1}`}
//               fill
//               className="object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// /*-|================================================================================|-*/

// /*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
// /*-= Parallax Component with Fixed Layout and Scroll • 3 =-*/
// 'use client';
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

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
//         end: '+=300%', // Adjust to match the total scroll height
//         scrub: 1,
//         pin: true,
//         anticipatePin: 1,
//       },
//     });

//     // First section animation
//     tl.to(section1Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     });

//     // Second section animation
//     tl.to(section2Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     }, '>');

//     // Third section animation (all images move together)
//     tl.to(section3Ref.current, {
//       yPercent: -66.67, // Adjusted to show exactly the last image
//       ease: 'none',
//     }, '>');

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, []);

//   return (
//     <div className="fixed inset-0">
//       <div
//         ref={containerRef}
//         className="relative h-[400vh] w-full"
//       >
//         {/* First Section */}
//         <div
//           ref={section1Ref}
//           className="fixed inset-0 bg-black z-30"
//         >
//           <Image
//             src="/assets/images/first.webp"
//             alt="First Section"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>

//         {/* Second Section */}
//         <div
//           ref={section2Ref}
//           className="fixed inset-0 bg-black z-20"
//         >
//           <Image
//             src="/assets/images/second.webp"
//             alt="Second Section"
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* Third Section - Stacked Images */}
//         <div
//           ref={section3Ref}
//           className="fixed inset-0 h-[300vh] z-10"
//         >
//           {[
//             '/assets/images/third.webp',
//             '/assets/images/fourth.webp',
//             '/assets/images/fifth.webp'
//           ].map((src, index) => (
//             <div
//               key={index}
//               className="absolute inset-0 bg-black"
//               style={{ top: `${index * 100}vh` }}
//             >
//               <Image
//                 src={src}
//                 alt={`Third Section Image ${index + 1}`}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
/*-|================================================================================|-*/

// /*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
// /*-= Fixed Parallax Component with Stacked Third Section • 2 =-*/
// 'use client';
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

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

//     // First section animation
//     tl.to(section1Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     });

//     // Second section animation
//     tl.to(section2Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     }, '>');

//     // Third section animation (all images move together)
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
//     <div ref={containerRef}
//       className="mainContainer relative h-[400vh] w-screen"
//       // className="mainContainer relative h-[400vh] w-screen overflow-x-hidden"
//     >
//       {/* First Section */}
//       <div ref={section1Ref}
//         className="fixed top-0 left-0 w-screen h-screen bg-black z-30"
//       >
//         <Image
//           src="/assets/images/first.webp"
//           alt="First Section"
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>

//       {/* Second Section */}
//       <div
//         ref={section2Ref}
//         className="fixed top-0 left-0 w-screen h-screen bg-black z-20"
//       >
//         <Image
//           src="/assets/images/second.webp"
//           alt="Second Section"
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Third Section - Stacked Images */}
//       <div ref={section3Ref}
//         className="fixed top-0 left-0 w-screen h-[200vh] z-10" //this works. stops at the bottom of the last image
//       //   className="fixed top-0 left-0 w-screen h-[300vh] z-10" //overshoot
//          // className="sticky top-0 left-0 w-full h-[300vh]"
//       >
//         {[
//           '/assets/images/third.webp',
//           '/assets/images/fourth.webp',
//           '/assets/images/fifth.webp'
//         ].map((src, index) => (
//           <div
//             key={index}
//             className="w-screen h-screen bg-black"
//             style={{ position: 'absolute', top: `${index * 100}vh` }}
//             // className="absolute w-full h-screen bg-black"
//             // style={{ top: `${index * 100}vh` }}
//           >
//             <Image
//               src={src}
//               alt={`Third Section Image ${index + 1}`}
//               fill
//               className="object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

/*-|================================================================================|-*/
/*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
/*-= Fixed Parallax Component • 1 =-*/
// 'use client';
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

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

//     // First section animation
//     tl.to(section1Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     });

//     // Second section animation
//     tl.to(section2Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     }, '>');

//     // Third section animations (multiple images)
//     const images = section3Ref.current?.querySelectorAll('.parallax-image') || [];
//     images.forEach((image, index) => {
//       tl.to(image, {
//         yPercent: -100,
//         ease: 'none',
//       }, index === 0 ? '>' : '<+=0.5');
//     });

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="relative h-[400vh] w-screen overflow-x-hidden"
//     >
//       {/* First Section */}
//       <div
//         ref={section1Ref}
//         className="fixed top-0 left-0 w-screen h-screen bg-black z-30"
//       >
//         <Image
//           src="/assets/images/first.webp"  // Update with your image path
//           alt="First Section"
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>

//       {/* Second Section */}
//       <div
//         ref={section2Ref}
//         className="fixed top-0 left-0 w-screen h-screen bg-black z-20"
//       >
//         <Image
//           src="/assets/images/second.webp"  // Update with your image path
//           alt="Second Section"
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Third Section */}
//       <div
//         ref={section3Ref}
//         className="fixed top-0 left-0 w-screen h-screen z-10"
//       >
//         {[
//           '/assets/images/third.webp',
//           '/assets/images/fourth.webp',
//           '/assets/images/fifth.webp'
//         ].map((src, index) => (
//           <div
//             key={index}
//             className="parallax-image absolute top-0 left-0 w-screen h-screen bg-black"
//             style={{ zIndex: 10 - index }}
//           >
//             <Image
//               src={src}
//               alt={`Third Section Image ${index + 1}`}
//               fill
//               className="object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
// /*-================================================================================
// Original prompt:
// Create a parallax effect using GSAP, Next, Tailwind.
// Firstly, I want three divs stack to one another at an absolute zero top and absolute full screen width. First div will have one image, second will have one image, third div will have three images.
// First div will scroll up and reveal second div underneath. When the first div is out of view the second div will start to scroll up and revealing the third div container with three images stack vertically that will also start to scroll up when the second div is out of the view. Did I miss anything before you start writing the code?
// ================================================================================-*/
// 'use client';
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

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

//     // First section animation
//     tl.to(section1Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     });

//     // Second section animation
//     tl.to(section2Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//     }, '>');

//     // Third section animations (multiple images)
//     tl.to(section3Ref.current?.children, {
//       yPercent: -100,
//       ease: 'none',
//       stagger: 0.1
//     }, '>');

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="relative h-[400vh] w-full overflow-hidden"
//     >
//       {/* First Section */}
//       <div
//         ref={section1Ref}
//         className="fixed top-0 left-0 w-full h-screen bg-blue-600"
//       >
//         <Image
//           src="/path-to-first-image.jpg"
//           alt="First Section"
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>

//       {/* Second Section */}
//       <div
//         ref={section2Ref}
//         className="fixed top-0 left-0 w-full h-screen bg-gray-800"
//       >
//         <Image
//           src="/path-to-second-image.jpg"
//           alt="Second Section"
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Third Section */}
//       <div
//         ref={section3Ref}
//         className="fixed top-0 left-0 w-full h-screen"
//       >
//         {[1, 2, 3].map((index) => (
//           <div
//             key={index}
//             className="absolute top-0 left-0 w-full h-screen bg-orange-500"
//           >
//             <Image
//               src={`/path-to-third-image-${index}.jpg`}
//               alt={`Third Section Image ${index}`}
//               fill
//               className="object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }