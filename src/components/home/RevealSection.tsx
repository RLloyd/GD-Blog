// src/components/home/RevealSection.tsx
'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface RevealSectionProps {
  image: string;
  title: string;
  subtitle?: string;
  index: number;
}

export function RevealSection({ image, title, subtitle, index }: RevealSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.set(section, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: -index
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: `${index * 100}vh top`,
        end: `${(index + 1) * 100}vh top`,
        scrub: 1,
        pin: true,
        pinSpacing: false,
      }
    });

    tl.fromTo(content, {
      opacity: index === 0 ? 1 : 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5
    })
    .to(content, {
      opacity: 0,
      y: -50,
      duration: 0.5
    }, "+=0.5");

    return () => {
      tl.kill();
    };
  }, [index]);

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-white px-4 text-center"
      >
        <h2 className="text-6xl md:text-7xl font-garamond mb-4">{title}</h2>
        {subtitle && (
          <p className="text-xl md:text-2xl font-nunitosans max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}


// // src/components/home/RevealSection.tsx
// 'use client';
// import { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

// gsap.registerPlugin(ScrollTrigger);

// interface RevealSectionProps {
//   image: string;
//   title: string;
//   zIndex?: number;
// }

// export function RevealSection({ image, title, zIndex = 1 }: RevealSectionProps) {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: section,
//         start: 'top top',
//         end: 'bottom top',
//         pin: true,
//         pinSpacing: true,
//         scrub: 1
//       }
//     });

//     tl.to(section, {
//       opacity: 1,
//       duration: 1
//     })
//     .to(section, {
//       opacity: 0,
//       duration: 1
//     }, 0.5);

//     return () => {
//       tl.kill();
//     };
//   }, []);

//   return (
//     <div
//       ref={sectionRef}
//       className="fixed inset-0 w-full h-screen"
//       style={{ zIndex }}
//     >
//       <div className="absolute inset-0">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           className="object-cover"
//           priority
//           sizes="100vw"
//         />
//         <div className="absolute inset-0 bg-black/20" />
//       </div>
//       <div className="relative h-full flex items-center justify-center">
//         <h2 className="text-6xl text-white font-garamond">{title}</h2>
//       </div>
//     </div>
//   );
// }


// // 'use client';
// // import { useRef, useEffect } from 'react';
// // import { gsap } from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // import Image from 'next/image';

// // gsap.registerPlugin(ScrollTrigger);

// // interface RevealSectionProps {
// //   image: string;
// //   title: string;
// //   backgroundColor?: string;
// // }

// // export function RevealSection({ image, title, backgroundColor = '#1a1a1a' }: RevealSectionProps) {
// //   const sectionRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const section = sectionRef.current;
// //     if (!section) return;

// //     ScrollTrigger.create({
// //       trigger: section,
// //       start: 'top top',
// //       end: '+=100%',
// //       pin: true,
// //       pinSpacing: false
// //     });
// //   }, []);

// //   return (
// //     <div ref={sectionRef} className="w-full h-screen relative">
// //       <div className="absolute inset-0">
// //         <Image
// //           src={image}
// //           alt={title}
// //           fill
// //           className="object-cover"
// //           priority
// //           sizes="100vw"
// //         />
// //         <div
// //           className="absolute inset-0 bg-black/20"
// //           style={{ backgroundColor: backgroundColor + '33' }}
// //         />
// //       </div>
// //       <div className="relative z-10 h-full flex items-center justify-center">
// //         <h2 className="text-6xl text-white font-garamond">{title}</h2>
// //       </div>
// //     </div>
// //   );
// // }


// // // // src/components/home/RevealSection.tsx
// // // 'use client';
// // // import { useRef, useEffect } from 'react';
// // // import { gsap } from 'gsap';
// // // import Image from 'next/image';

// // // export function RevealSection() {
// // //   const sectionRef = useRef<HTMLElement>(null);

// // //   useEffect(() => {
// // //     const section = sectionRef.current;

// // //     gsap.fromTo(section,
// // //       {
// // //         clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
// // //       },
// // //       {
// // //         clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
// // //         ease: 'none',
// // //         scrollTrigger: {
// // //           trigger: section,
// // //           start: 'top center',
// // //           end: 'bottom center',
// // //           scrub: 1
// // //         }
// // //       }
// // //     );
// // //   }, []);

// // //   return (
// // //     <section
// // //       ref={sectionRef}
// // //       className="fixed inset-0 w-full min-h-screen"
// // //     >
// // //       <div className="absolute inset-0">
// // //         <Image
// // //           src="/assets/images/hero.webp"
// // //           alt="Hero"
// // //           fill
// // //           className="object-cover"
// // //           priority
// // //           sizes="100vw"
// // //         />
// // //         <div
// // //           className="absolute inset-0 bg-black/30" // Reduced opacity to 30%
// // //         />
// // //       </div>
// // //       {/* Content */}
// // //     </section>
// // //   );
// // // }

// // // // In your homepage, stack the sections:
// // // export default function HomePage() {
// // //   return (
// // //     <main className="relative min-h-[500vh]"> {/* 5x viewport height */}
// // //       <RevealSection /> {/* First section */}
// // //       <RevealSection /> {/* Second section */}
// // //       {/* Add more sections */}
// // //     </main>
// // //   );
// // // }