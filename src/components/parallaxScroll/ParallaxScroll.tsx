/*-= src/components/parallaxScroll/ParallaxScroll.tsx =-*/
/*-= Fixed Parallax Component • 1 =-*/
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

    // Third section animations (multiple images)
    const images = section3Ref.current?.querySelectorAll('.parallax-image') || [];
    images.forEach((image, index) => {
      tl.to(image, {
        yPercent: -100,
        ease: 'none',
      }, index === 0 ? '>' : '<+=0.5');
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh] w-screen overflow-x-hidden"
    >
      {/* First Section */}
      <div
        ref={section1Ref}
        className="fixed top-0 left-0 w-screen h-screen bg-black z-30"
      >
        <Image
          src="/assets/images/first.webp"  // Update with your image path
          alt="First Section"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Second Section */}
      <div
        ref={section2Ref}
        className="fixed top-0 left-0 w-screen h-screen bg-black z-20"
      >
        <Image
          src="/assets/images/second.webp"  // Update with your image path
          alt="Second Section"
          fill
          className="object-cover"
        />
      </div>

      {/* Third Section */}
      <div
        ref={section3Ref}
        className="fixed top-0 left-0 w-screen h-screen z-10"
      >
        {[
          '/assets/images/third.webp',
          '/assets/images/fourth.webp',
          '/assets/images/fifth.webp'
        ].map((src, index) => (
          <div
            key={index}
            className="parallax-image absolute top-0 left-0 w-screen h-screen bg-black"
            style={{ zIndex: 10 - index }}
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