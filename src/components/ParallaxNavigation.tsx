/*-= src/components/ParallaxNavigation.tsx =-*/
/*-= Enhanced ParallaxNavigation with Subsection Dots =-*/
/*-============================================================
Updated code: 12.19.2024
Key changes made:
   • Added activeSubsection state to track the current multimedia subsection
   • Updated the effect to handle both main sections and subsections
   • Added subsection dots that appear when the multimedia section is active
   • Styled subsection dots to be slightly smaller than main dots
   • Each subsection dot has its own hover label and active state
   • Maintained the existing scroll-based activation logic
   • Kept all the smooth transitions and animations
   • Excluded the first subsection (blog) from the navigation dots
================================================================-*/

'use client';

import { portfolioSections, isMultimediaSection } from '@/data/portfolioData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ParallaxNavigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // First check for exact path matches
    const pathSection = portfolioSections.find(s => {
      if (isMultimediaSection(s)) {
        const subsectionMatch = s.subsections.find(sub => pathname === sub.path);
        if (subsectionMatch) {
          setActiveSubsection(subsectionMatch.id);
          return true;
        }
      }
      return pathname === s.path;
    });

    if (pathSection) {
      setActiveSection(pathSection.id);
      return;
    }

    setActiveSection(portfolioSections[0].id);

    // Handle scroll-based section detection
    const handleScroll = () => {
      const scrollPosition = window.scrollY + (window.innerHeight * 0.5);

      for (const section of portfolioSections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        const absoluteBottom = absoluteTop + rect.height;

        if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
          setActiveSection(section.id);

          // Check subsections if this is the multimedia section
          if (isMultimediaSection(section)) {
            for (const subsection of section.subsections) {
              const subElement = document.getElementById(subsection.id);
              if (!subElement) continue;

              const subRect = subElement.getBoundingClientRect();
              const subAbsoluteTop = window.scrollY + subRect.top;
              const subAbsoluteBottom = subAbsoluteTop + subRect.height;

              if (scrollPosition >= subAbsoluteTop && scrollPosition <= subAbsoluteBottom) {
                setActiveSubsection(subsection.id);
                break;
              }
            }
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <nav data-component="ParallaxNavigation"
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 border rounded-full py-4 px-2 border-gray-400/75">
      <div className="flex flex-col gap-6">
        {portfolioSections.map((section) => {
          const isMultimedia = isMultimediaSection(section);
          const path = isMultimedia ? section.subsections[0].path : section.path;

          return (
            <div key={section.id} className="relative">
              {/* Main section dot */}
              <div className="group relative flex items-center justify-end">
                {/* Label */}
                <div className="absolute right-full mr-4 px-2 py-1 rounded-md
                  text-white text-sm whitespace-nowrap bg-gray-900/90
                  transition-opacity duration-200
                  opacity-0 group-hover:opacity-100">
                  {section.title}
                </div>

                {/* Active indicator line */}
                {activeSection === section.id && (
                  <div className={`absolute right-full mr-2 w-0 h-0.5
                    transition-all duration-300 ${section.color}`} />
                )}

                {/* Navigation dot */}
                <Link
                  href={path}
                  className={`w-3 h-3 rounded-full transition-all duration-300
                    ${activeSection === section.id
                      ? `scale-125 ${section.color}`
                      : 'bg-white/50 hover:bg-white/80'}`}
                  aria-label={section.title}
                />
              </div>

              {/* Subsection dots for multimedia */}
              {isMultimedia && activeSection === section.id && (
                <div className="mt-5 space-y-4 flex flex-col items-center">
                  {section.subsections.slice(1).map((subsection) => (
                    <div key={subsection.id} className="group relative flex items-center justify-end">
                      {/* Subsection label */}
                      <div className="absolute right-full mr-4 px-2 py-1 rounded-md
                        text-white text-sm whitespace-nowrap bg-gray-900/90
                        transition-opacity duration-200
                        opacity-0 group-hover:opacity-100">
                        {subsection.title}
                      </div>

                      {/* Subsection dot */}
                      <Link
                        href={subsection.path}
                        className={`w-2 h-2 rounded-full transition-all duration-300
                          ${activeSubsection === subsection.id
                            ? `scale-225 ${subsection.color}`
                            : 'bg-white/30 hover:bg-white/60'}`}
                        aria-label={subsection.title}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

/*-|=================================================================|-*/

// /*-= src/components/ParallaxNavigation.tsx =-*/
// /*-============================================================
// Updated code: 12.19.2024
// Key changes:
//    Proper path handling for all sections, including multimedia subsections
//    Active section detection based on both pathname and scroll position
//    Proper link generation for each section type
//    Maintained all existing visual features (hover states, active indicators, etc.)
// This will ensure:
//    Regular sections link directly to their paths
//    Multimedia section links to its first subsection
//    Active state is correctly maintained across all sections
//    Navigation works consistently with the call-to-action buttons
// ================================================================-*/
// 'use client';

// import { portfolioSections, isMultimediaSection } from '@/data/portfolioData';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export function ParallaxNavigation() {
//   const [activeSection, setActiveSection] = useState<string | null>(null);
//   const pathname = usePathname();

//   useEffect(() => {
//     // Handle initial active section based on pathname
//     const pathSection = portfolioSections.find(s => {
//       if (isMultimediaSection(s)) {
//         // Check if current path matches any multimedia subsection
//         return s.subsections.some(sub => pathname === sub.path);
//       }
//       return pathname === s.path;
//     });

//     if (pathSection) {
//       setActiveSection(pathSection.id);
//       return;
//     }

//     setActiveSection(portfolioSections[0].id);

//     // Handle scroll-based active section
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + (window.innerHeight * 0.5);

//       for (const section of portfolioSections) {
//         const element = document.getElementById(section.id);
//         if (!element) continue;

//         const rect = element.getBoundingClientRect();
//         const absoluteTop = window.scrollY + rect.top;
//         const absoluteBottom = absoluteTop + rect.height;

//         if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
//           setActiveSection(section.id);
//           break;
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll();

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [pathname]);

//   return (
//     <nav data-component="ParallaxNavigation"
//       className="fixed right-8 top-1/2 -translate-y-1/2 z-50 border rounded-full py-4 px-2">
//       <div className="flex flex-col gap-6">
//         {portfolioSections.map((section) => {
//           // Determine the correct path for each section
//           const path = isMultimediaSection(section)
//             ? section.subsections[0].path  // Use first subsection for multimedia
//             : section.path;  // Use direct path for other sections

//           return (
//             <div key={section.id} className="group relative flex items-center justify-end">
//               {/* Label */}
//               <div className="absolute right-full mr-4 px-2 py-1 rounded-md
//                 text-white text-sm whitespace-nowrap bg-gray-900/90
//                 transition-opacity duration-200
//                 opacity-0 group-hover:opacity-100">
//                 {section.title}
//               </div>

//               {/* Active indicator line */}
//               {activeSection === section.id && (
//                 <div className={`absolute right-full mr-2 w-0 h-0.5
//                   transition-all duration-300 ${section.color}`} />
//               )}

//               {/* Navigation dot */}
//               <Link
//                 href={path}
//                 className={`w-3 h-3 rounded-full transition-all duration-300
//                   ${activeSection === section.id
//                     ? `scale-125 ${section.color}`
//                     : 'bg-white/50 hover:bg-white/80'}`}
//                 aria-label={section.title}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }
// // /*-= src/components/ParallaxNavigation.tsx =-*/
// // /*-============================================================
// // Prompt:
// // We tried this solution before using threshold & rootMargin. (referring to previous codes) It didn't work because the third section is so much longer than the other section.

// // You're right - the varying section lengths, especially the much longer third section, make the threshold/rootMargin approach unreliable. Let's try a different approach that uses scroll position relative to each section's top position:

// // Key changes:
// //    Switched from IntersectionObserver to scroll position calculations
// //    Uses a scroll listener with absolute positions to determine the active section
// //    Calculates section boundaries based on their actual positions in the document
// //    Determines active section based on where viewport midpoint intersects with sections
// //    Uses passive scroll listener for better performance

// // This approach should:
// //    Start with first dot highlighted
// //    Update dots with minimal delay as you scroll through sections
// //    Work correctly with the longer third section
// //    Be more responsive to scroll position changes

// //    The key improvement is using absolute positions and scroll position to determine the active section, which should be more reliable than trying to use intersection observers with the varying section lengths.

// //    |-=++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=-|

// // Updated code: 12.18.2024
// // Prompt:
// //    src/components/ParallaxNavigation.tsx, sections{} should be using data from src/data/portfolioData.ts. We need to add color property.
// //    We also need to be able to add components in the detailed pages. Similar to what we did in blog section creating post type using component.
// // Key changes:
// //    Update to use data from src/data/portfolioData.ts
// // ================================================================-*/
// // 'use client';
// // // absolute right-full mr-2 w-6 h-0.5 transition-all duration-300 bg-success-500
// // import { portfolioSections } from '@/data/portfolioData';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { useEffect, useState } from 'react';

// // export function ParallaxNavigation() {
// //   const [activeSection, setActiveSection] = useState<string | null>(null);
// //   const pathname = usePathname();

// //   useEffect(() => {
// //     const pathSection = portfolioSections.find(s => pathname === s.path);
// //     if (pathSection) {
// //       setActiveSection(pathSection.id);
// //       return;
// //     }

// //     setActiveSection(portfolioSections[0].id);

// //     const handleScroll = () => {
// //       const scrollPosition = window.scrollY + (window.innerHeight * 0.5);

// //       for (const section of portfolioSections) {
// //         const element = document.getElementById(section.id);
// //         if (!element) continue;

// //         const rect = element.getBoundingClientRect();
// //         const absoluteTop = window.scrollY + rect.top;
// //         const absoluteBottom = absoluteTop + rect.height;

// //         if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
// //           setActiveSection(section.id);
// //           break;
// //         }
// //       }
// //     };

// //     window.addEventListener('scroll', handleScroll, { passive: true });
// //     handleScroll();

// //     return () => {
// //       window.removeEventListener('scroll', handleScroll);
// //     };
// //   }, [pathname]);

// //   return (
// //     <nav data-component="ParallaxNavigation"
// //       className="fixed right-8 top-1/2 -translate-y-1/2 z-50 border rounded-full py-4 px-2">
// //       <div className="flex flex-col gap-6">
// //         {portfolioSections.map((section) => (
// //           <div key={section.id} className="group relative flex items-center justify-end">
// //             <div className="absolute right-full mr-4 px-2 py-1 rounded-md
// //               text-white text-sm whitespace-nowrap bg-gray-900/90
// //               transition-opacity duration-200
// //               opacity-0 group-hover:opacity-100">
// //               {section.title}
// //             </div>

// //             {activeSection === section.id && (
// //               <div data-component="ActiveIndicatorLine" className={`absolute right-full mr-2 w-0 h-0.5
// //                 transition-all duration-300 ${section.color}`} />
// //             )}

// //             <Link
// //               href={section.path}
// //               className={`w-3 h-3 rounded-full transition-all duration-300
// //                 ${activeSection === section.id
// //                   ? `scale-125 ${section.color}`
// //                   : 'bg-white/50 hover:bg-white/80'}`}
// //               aria-label={section.title}
// //             />
// //           </div>
// //         ))}
// //       </div>
// //     </nav>
// //   );
// // }

// // /*-|=================================================================|-*/

// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { usePathname } from 'next/navigation';
// // // import Link from 'next/link';

// // // export function ParallaxNavigation() {
// // //   const [activeSection, setActiveSection] = useState<string | null>(null);
// // //   const pathname = usePathname();

// // //   const sections = [
// // //     { id: 'web',        index: 0, label: 'Web Dev',      path: '/portfolio/web-development', color: 'bg-accent-500' },
// // //     { id: 'ui',         index: 1, label: 'UI Design',    path: '/portfolio/ui-design',       color: 'bg-secondary-500' },
// // //     { id: 'multimedia', index: 2, label: 'Multimedia',   path: '/portfolio/multimedia',      color: 'bg-success-500' }
// // //   ];

// // //   useEffect(() => {
// // //     // Handle path-based section activation
// // //     const pathSection = sections.find(s => pathname === s.path);
// // //     if (pathSection) {
// // //       setActiveSection(pathSection.id);
// // //       return;
// // //     }

// // //     // Set initial section
// // //     setActiveSection(sections[0].id);

// // //     const handleScroll = () => {
// // //       const scrollPosition = window.scrollY + (window.innerHeight * 0.5);

// // //       // Get all sections and their positions
// // //       const sectionElements = sections.map(section => ({
// // //         id: section.id,
// // //         element: document.getElementById(section.id),
// // //       }));

// // //       // Find the current section based on scroll position
// // //       for (const { id, element } of sectionElements) {
// // //         if (!element) continue;

// // //         const rect = element.getBoundingClientRect();
// // //         const absoluteTop = window.scrollY + rect.top;
// // //         const absoluteBottom = absoluteTop + rect.height;

// // //         if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
// // //           setActiveSection(id);
// // //           break;
// // //         }
// // //       }
// // //     };

// // //     // Add scroll listener
// // //     window.addEventListener('scroll', handleScroll, { passive: true });
// // //     handleScroll(); // Initial check

// // //     return () => {
// // //       window.removeEventListener('scroll', handleScroll);
// // //     };
// // //   }, [pathname]);

// // //   return (
// // //     <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
// // //       <div className="flex flex-col gap-6">
// // //         {sections.map((section) => (
// // //           <div key={section.id} className="group relative flex items-center justify-end">
// // //             <div className="absolute right-full mr-4 px-2 py-1 rounded-md
// // //               text-white text-sm whitespace-nowrap bg-gray-900/90
// // //               transition-opacity duration-200
// // //               opacity-0 group-hover:opacity-100">
// // //               {section.label}
// // //             </div>

// // //             {activeSection === section.id && (
// // //               <div className={`absolute right-full mr-2 w-6 h-0.5
// // //                 transition-all duration-300 ${section.color}`} />
// // //             )}

// // //             <Link
// // //               href={section.path}
// // //               className={`w-3 h-3 rounded-full transition-all duration-300
// // //                 ${activeSection === section.id
// // //                   ? `scale-125 ${section.color}`
// // //                   : 'bg-white/50 hover:bg-white/80'}`}
// // //               aria-label={section.label}
// // //             />
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </nav>
// // //   );
// // // }
// // // /*-|=================================================================|-*/
