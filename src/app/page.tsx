
/*-= src/app/page.tsx =-*/
import ParallaxSection from '@/components/parallax/ParallaxSection'
import HomePage from '@/components/parallax2/HomePage'
import Parallax from '@/components/parallax3/Parallax3'
import React from 'react'
import { PortfolioSection } from './layout'
import { MultiRevealSection } from '@/components/parallax4/MultiRevealSection'
import Parallax5 from '@/components/parallax5/Parallax5'
import ParallaxScroll from '@/components/parallaxScroll/ParallaxScroll'

const page = () => {


   const sections = [
      { images: ['/assets/images/first.webp'] }, // First section with 1 image
      { images: ['/assets/images/second.webp'] }, // Second section with 1 image
      // { images: ['/assets/images/third.webp'] }, // Third section with 3 images
      { images: ['/assets/images/third.webp', '/assets/images/fourth.webp', '/assets/images/fifth.webp'] }, // Third section with 3 images
   ];

  return (
   // //  <div className="relative h-[4000px] main-container">
   // //  <div className="relative h-[4000px] main-container max-w-screen-xl mx-auto overflow-x-hidden">
   //  <div className="relative h-[4000px] main-container overflow-x-hidden">
   //    {/* <ParallaxSection /> */}
   //    {/* <HomePage /> */}
   //    <Parallax />
   //  </div>

   // {/* // Full width content */}
   // {/*  */}

   // {/* <HomePage /> */}
   // {/* <Parallax /> //works */}
   // <MultiRevealSection sections={sections} />
   // <Parallax5 />

      <PortfolioSection>
         <ParallaxScroll />
      </PortfolioSection>
  )
}

export default page


// /*-= src/app/page.tsx =-*/
// 'use client';
// import { useEffect } from 'react';
// import Lenis from '@studio-freight/lenis';
// import { RevealSection } from '@/components/home/RevealSection';

// const sections = [
//   {
//     image: "/assets/images/hero.webp",
//     title: "Welcome",
//     subtitle: "Discover our vision"
//   },
//   {
//     image: "/assets/images/second.webp",
//     title: "Our Work",
//     subtitle: "Creating digital experiences"
//   },
//   {
//     image: "/assets/images/third.webp",
//     title: "About Us",
//     subtitle: "The story behind our craft"
//   }
// ];

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

//   return (
//     <main className="relative">
//       <div style={{ height: `${sections.length * 100}vh` }}>
//         {sections.map((section, index) => (
//           <RevealSection
//             key={index}
//             image={section.image}
//             title={section.title}
//             subtitle={section.subtitle}
//             index={index}
//           />
//         ))}
//       </div>
//     </main>
//   );
// }
// // 'use client';
// // import { useEffect } from 'react';
// // import Lenis from '@studio-freight/lenis';
// // // import { FullHeightSection } from '@/components/home/FullHeightSection';
// // import { RevealSection } from '@/components/home/RevealSection';

// // export default function HomePage() {
// //    useEffect(() => {
// //       const lenis = new Lenis({
// //          duration: 1.2,
// //          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// //          orientation: 'vertical',
// //          gestureOrientation: 'vertical',
// //          smoothWheel: true,
// //          wheelMultiplier: 1,
// //          smoothTouch: false,
// //          touchMultiplier: 2,
// //       });

// //       function raf(time: number) {
// //          lenis.raf(time);
// //          requestAnimationFrame(raf);
// //       }

// //       requestAnimationFrame(raf);

// //       return () => {
// //          lenis.destroy();
// //       };
// //    }, []);

// //    return (
// //       <main className="relative w-full" style={{ height: '400vh' }}>
// //          <RevealSection
// //             image="/assets/images/hero.webp"
// //             title="Welcome"
// //             zIndex={3}
// //          />
// //          <RevealSection
// //             image="/assets/images/second.webp"
// //             title="Our Work"
// //             zIndex={2}
// //          />
// //          <RevealSection
// //             image="/assets/images/third.webp"
// //             title="About Us"
// //             zIndex={1}
// //          />
// //       </main>
// //    );
// // }

// // {/* <FullHeightSection
// //         title="Welcome to Our Studio"
// //         subtitle="Creating digital experiences that inspire"
// //         image="/assets/images/hero.webp"
// //         backgroundColor="#1a1a1a"
// //         align="center"
// //       >
// //         <button className="px-8 py-3 bg-white text-black rounded-none hover:bg-gray-100 transition-colors">
// //           Explore Our Work
// //         </button>
// //       </FullHeightSection>

// //       <FullHeightSection
// //         title="Latest Projects"
// //         image="/assets/images/projects.webp"
// //         backgroundColor="#2a2a2a"
// //         align="left"
// //       />

// //       <FullHeightSection
// //         title="Our Approach"
// //         subtitle="Combining creativity with technical excellence"
// //         image="/assets/images/approach.webp"
// //         backgroundColor="#0a0a0a"
// //         align="right"
// //       />

// //       <FullHeightSection
// //         title="Featured Work"
// //         image="/assets/images/featured.png"
// //         backgroundColor="#1a1a1a"
// //         align="center"
// //       />

// //       <FullHeightSection
// //         title="Get in Touch"
// //         subtitle="Let's create something amazing together"
// //         image="/assets/images/contact.webp"
// //         backgroundColor="#2a2a2a"
// //         align="center"
// //       >
// //         <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-colors">
// //           Contact Us
// //         </button>
// //       </FullHeightSection> */}
// // //     </main>
// // //   );
// // // }
// // // "use client";
// // // // import { ThemeProvider } from "styled-components";
// // // // import { lightTheme } from "@/lib/theme-config";
// // // // import PortfolioLayout from '@/components/portfolio/PortfolioLayout'
// // // // import { HeroSection } from '@/components/portfolio/HeroSection'
// // // // import { ProjectSection } from '@/components/portfolio/ProjectSection'
// // // import PortfolioLayout from '@/components/portfolio/PortfolioLayout';
// // // import { HeroSection } from '@/components/portfolio/HeroSection';
// // // import { ProjectSection } from '@/components/portfolio/ProjectSection';

// // // /*---==================================================================
// // // The homepage serves as the entry point to our blog platform, providing:
// // // - Overview of recent blog posts
// // // - Summary of different content categories
// // // - Quick access to featured articles
// // // ==================================================================---*/
// // // export default function HomePage() {
// // //    return (
// // //       <>
// // //          <PortfolioLayout>
// // //             <HeroSection />
// // //             <ProjectSection />
// // //             {/* Add more portfolio sections as needed */}
// // //          </PortfolioLayout>

// // //          <main className='container mx-auto px-4 py-8'>
// // //             {/* <section className='max-w-4xl mx-auto space-y-8'> */}
// // //             <section className='max-w-page mx-auto space-y-8'>
// // //                <h1 className='text-4xl font-bold mb-4'>Welcome to My Blog</h1>
// // //                <div className='text-xl space-y-4'>
// // //                   <p>Dive into a world of creativity, innovation, and flavors! Here, you\'ll find:</p>
// // //                   <ul className='space-y-2'>
// // //                      <li>Tech Tutorials: Simplifying coding concepts and showcasing CSS & JavaScript animations</li>
// // //                      <li>Other Media: Explore the art of video production and animations</li>
// // //                      <li>Fusion Food: Savor the blend of Asian-inspired cuisine and global tastes</li>
// // //                      <li>Personal Stories: A window into my journey, thoughts, and experiences</li>
// // //                   </ul>
// // //                   <p>Whether you\'re here to learn, create, or simply be inspired, there\'s something for everyone.</p>
// // //                </div>
// // //             </section>
// // //          </main>
// // //       </>
// // //    );
// // // }
