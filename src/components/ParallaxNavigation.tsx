// /*-= src/components/ParallaxNavigation.tsx =-*/
// /*-=========================================================================
// Prompt:
// Nope! That didn't work.
// When scrolling the dot hiliter works. When you scroll to "ui" it hilites the second dot, scroll to "multimedia" it hilites the third dot, scroll back to "web" and it hilites the first dot. Can we use that same mechanism to hilite the first dot on initial load?

// Let's modify the code to treat the initial load like a scroll event:

// Key changes:

// Added explicit check for portfolio page and web section on initial load
// Removed rootMargin to match scroll behavior
// Simplified intersection observer logic
// ===========================================================================-*/
// 'use client';

// import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';

// export function ParallaxNavigation() {
//    const [activeSection, setActiveSection] = useState('web');
//    const pathname = usePathname();

//    const sections = [
//      { id: 'web', index: 0, label: 'Web Dev', path: '/portfolio/web-development', color: 'bg-accent-500' },
//      { id: 'ui', index: 1, label: 'UI Design', path: '/portfolio/ui-design', color: 'bg-secondary-500' },
//      { id: 'multimedia', index: 2, label: 'Multimedia', path: '/portfolio/multimedia', color: 'bg-success-500' }
//    ];

//    useEffect(() => {
//      if (pathname === '/portfolio') {
//        const element = document.getElementById('web');
//        if (element) {
//          setActiveSection('web');
//        }
//      }

//      const observer = new IntersectionObserver(
//        (entries) => {
//          entries.forEach((entry) => {
//            const sectionId = entry.target.id;
//            const currentIndex = sections.find(s => s.id === sectionId)?.index || 0;

//            if (entry.isIntersecting) {
//              setActiveSection(sectionId);
//            } else if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
//              const nextSection = sections[currentIndex + 1];
//              if (nextSection) {
//                setActiveSection(nextSection.id);
//              }
//            }
//          });
//        },
//        { threshold: [0, 1] }
//      );

//      sections.forEach(section => {
//        const element = document.getElementById(section.id);
//        if (element) {
//          observer.observe(element);
//        }
//      });

//      return () => observer.disconnect();
//    }, [pathname]);

//   return (
//     <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
//       {sections.map((section) => (
//         <div key={section.id} className="group relative flex items-center">
//           <div className="absolute right-full mr-4 px-2 py-1 rounded
//             bg-black/80 text-white text-sm opacity-0 group-hover:opacity-100
//             transition-opacity whitespace-nowrap">
//             {section.label}
//           </div>

//           <Link
//             href={section.path}
//             className={`w-3 h-3 rounded-full transition-all duration-300
//               ${activeSection === section.id
//                 ? `w-4 h-4 ${section.color}`
//                 : 'bg-white/50 hover:bg-white/80'}`}
//             aria-label={section.label}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }
/*-|================================================================================|-*/


/*-= src/components/ParallaxNavigation.tsx =-*/
/*-=========================================================================
Prompt:
Still nope! It select the first dot for a milliseconds then hilite the last dot.

Let's try a different approach by detecting which section is actually visible on initial load instead of trying to skip observations. Here's the modified version:

The key changes:

Added findVisibleSection function to check what's actually visible in the viewport on load
Set initial active section based on the visible section
Maintains the same scroll behavior after initial load

This should correctly identify and highlight the first dot when the page loads because the first section will be visible in the viewport.
===========================================================================-*/
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function ParallaxNavigation() {
  const [activeSection, setActiveSection] = useState('web');
  const pathname = usePathname();

  const sections = [
    { id: 'web', index: 0, label: 'Web Dev', path: '/portfolio/web-development', color: 'bg-accent-500' },
    { id: 'ui', index: 1, label: 'UI Design', path: '/portfolio/ui-design', color: 'bg-secondary-500' },
    { id: 'multimedia', index: 2, label: 'Multimedia', path: '/portfolio/multimedia', color: 'bg-success-500' }
  ];

  useEffect(() => {
    // Handle detailed pages
    const section = sections.find(s => pathname === s.path);
    if (section) {
      setActiveSection(section.id);
      return;
    }

    // Find initially visible section
    const findVisibleSection = () => {
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
            return section.id;
          }
        }
      }
      return 'web'; // Default to first section
    };

    // Set initial active section based on what's visible
    setActiveSection(findVisibleSection());

    // Handle scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const currentIndex = sections.find(s => s.id === sectionId)?.index || 0;

          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            // Section has scrolled up out of view, activate next section
            const nextSection = sections[currentIndex + 1];
            if (nextSection) {
              setActiveSection(nextSection.id);
            }
          } else if (entry.isIntersecting) {
            // Section is in view
            setActiveSection(sectionId);
          }
        });
      },
      {
        threshold: [0, 1],
        rootMargin: '-20px 0px -20px 0px'
      }
    );

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
      {sections.map((section) => (
        <div key={section.id} className="group relative flex items-center">
          <div className="absolute right-full mr-4 px-2 py-1 rounded
            bg-black/80 text-white text-sm opacity-0 group-hover:opacity-100
            transition-opacity whitespace-nowrap">
            {section.label}
          </div>

          <Link
            href={section.path}
            className={`w-3 h-3 rounded-full transition-all duration-300
              ${activeSection === section.id
                ? `w-4 h-4 ${section.color}`
                : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={section.label}
          />
        </div>
      ))}
    </div>
  );
}
/*-|================================================================================|-*/


// /*-= src/components/ParallaxNavigation.tsx =-*/
// /*-=========================================================================
// Prompt:
// That still didn't work. It kept hiliting "multimedia" or the last dot. I think it has something to do with iterating the whole sections[] and settles at the last one and ignoring what was setActiveSection.

// Ah, you're right! The observer is firing for all sections during initial load and settling on the last one. Let's fix this by adding a check for the initial load and handling the scroll events more carefully:

// Key changes:

// Added isInitialLoad ref to track first load
// Skip the initial intersection observations
// This ensures the initial activeSection state of 'web' remains until actual scrolling occurs

// Now the first dot should remain highlighted when the page loads, and then update correctly as you scroll through the sections.
// ===========================================================================-*/
// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { usePathname } from 'next/navigation';
// // import Link from 'next/link';

// // export function ParallaxNavigation() {
// //   const [activeSection, setActiveSection] = useState('web');
// //   const pathname = usePathname();
// //   const isInitialLoad = useRef(true);

// //   const sections = [
// //     { id: 'web', index: 0, label: 'Web Dev', path: '/portfolio/web-development', color: 'bg-accent-500' },
// //     { id: 'ui', index: 1, label: 'UI Design', path: '/portfolio/ui-design', color: 'bg-secondary-500' },
// //     { id: 'multimedia', index: 2, label: 'Multimedia', path: '/portfolio/multimedia', color: 'bg-success-500' }
// //   ];

// //   useEffect(() => {
// //     // Handle detailed pages
// //     const section = sections.find(s => pathname === s.path);
// //     if (section) {
// //       setActiveSection(section.id);
// //       return;
// //     }

// //     // Handle homepage scroll
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         // Skip initial observations if it's the first load
// //         if (isInitialLoad.current) {
// //           isInitialLoad.current = false;
// //           return;
// //         }

// //         entries.forEach((entry) => {
// //           const sectionId = entry.target.id;
// //           const currentIndex = sections.find(s => s.id === sectionId)?.index || 0;

// //           if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
// //             // Section has scrolled up out of view, activate next section
// //             const nextSection = sections[currentIndex + 1];
// //             if (nextSection) {
// //               setActiveSection(nextSection.id);
// //             }
// //           } else if (entry.isIntersecting) {
// //             // Section is in view
// //             setActiveSection(sectionId);
// //           }
// //         });
// //       },
// //       {
// //         threshold: [0, 1],
// //         rootMargin: '-20px 0px -20px 0px'
// //       }
// //     );

// //     sections.forEach(section => {
// //       const element = document.getElementById(section.id);
// //       if (element) {
// //         observer.observe(element);
// //       }
// //     });

// //     return () => observer.disconnect();
// //   }, [pathname]);

// //   return (
// //     <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
// //       {sections.map((section) => (
// //         <div key={section.id} className="group relative flex items-center">
// //           <div className="absolute right-full mr-4 px-2 py-1 rounded
// //             bg-black/80 text-white text-sm opacity-0 group-hover:opacity-100
// //             transition-opacity whitespace-nowrap">
// //             {section.label}
// //           </div>

// //           <Link
// //             href={section.path}
// //             className={`w-3 h-3 rounded-full transition-all duration-300
// //               ${activeSection === section.id
// //                 ? `w-4 h-4 ${section.color}`
// //                 : 'bg-white/50 hover:bg-white/80'}`}
// //             aria-label={section.label}
// //           />
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// /*-|================================================================================|-*/

// /*-= src/components/ParallaxNavigation.tsx =-*/
// /*-=========================================================================
// THIS IS THE WORKING VERSION EXCEPT THE DOT HILITER AS OF 2:40PM
// Prompt:
// That works so much better! The only things is when first enter the page the third dot is hilited it should be the first dot that's hilited.

// The key changes are:
// Set initial state to 'web' when component mounts
// Added explicit check to set activeSection to 'web' when on the portfolio homepage
// This ensures the first dot is highlighted when the page first loads

// Now when you first enter the page, the first dot should be highlighted, and then the dots will update correctly as you scroll through the sections.
// ===========================================================================-*/
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { usePathname } from 'next/navigation';
// // import Link from 'next/link';

// // export function ParallaxNavigation() {
// //   // Set initial active section to 'web'
// //   const [activeSection, setActiveSection] = useState('web'); //but then it gets overwritten
// //   const pathname = usePathname();

// //   const sections = [
// //     {
// //       id: 'web',
// //       index: 0,
// //       label: 'Web Dev',
// //       path: '/portfolio/web-development',
// //       color: 'bg-accent-500' },
// //     {
// //       id: 'ui',
// //       index: 1,
// //       label: 'UI Design',
// //       path: '/portfolio/ui-design',
// //       color: 'bg-secondary-500' },
// //     {
// //       id: 'multimedia',
// //       index: 2,
// //       label: 'Multimedia',
// //       path: '/portfolio/multimedia',
// //       color: 'bg-success-500' }
// //   ];

// //   useEffect(() => {
// //     // Set initial state for homepage
// //     if (pathname === '/portfolio') {
// //       setActiveSection('web');
// //     }

// //     // Handle detailed pages
// //     const section = sections.find(s => pathname === s.path);
// //     if (section) {
// //       setActiveSection(section.id);
// //       return;
// //     }

// //     // Handle homepage scroll
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           const sectionId = entry.target.id;
// //           const currentIndex = sections.find(s => s.id === sectionId)?.index || 0;

// //           if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
// //             // Section has scrolled up out of view, activate next section
// //             const nextSection = sections[currentIndex + 1];
// //             if (nextSection) {
// //               setActiveSection(nextSection.id);
// //             }
// //           } else if (entry.isIntersecting) {
// //             // Section is in view
// //             setActiveSection(sectionId);
// //           }
// //         });
// //       },
// //       {
// //         threshold: [0, 1],
// //         rootMargin: '-20px 0px -20px 0px'
// //       }
// //     );

// //     sections.forEach(section => {
// //       const element = document.getElementById(section.id);
// //       if (element) {
// //         observer.observe(element);
// //       }
// //     });

// //     return () => observer.disconnect();
// //   }, [pathname]);

// //   return (
// //     <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
// //       {sections.map((section) => (
// //         <div key={section.id} className="group relative flex items-center">
// //           <div className="absolute right-full mr-4 px-2 py-1 rounded
// //             bg-black/80 text-white text-sm opacity-0 group-hover:opacity-100
// //             transition-opacity whitespace-nowrap">
// //             {section.label}
// //           </div>

// //           <Link
// //             href={section.path}
// //             className={`w-3 h-3 rounded-full transition-all duration-300
// //               ${activeSection === section.id
// //                 ? `w-4 h-4 ${section.color}`
// //                 : 'bg-white/50 hover:bg-white/80'}`}
// //             aria-label={section.label}
// //           />
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// // /*-|================================================================================|-*/

// /*-= src/components/ParallaxNavigation.tsx =-*/
// /*-=  =-*/
// /*-=========================================================================
// Prompt:
// The previous one is more accurate than this one. This one only hi-lights the first dot.
// Can you calculate it from when the section is out of view then hilight the next dot. For instance, let say Web Development has an id:0 and the corresponding dot is also id:0, when Web Development section is on the screen the dot id:0 is hilited. When Web Development section is out of view dot id:1 is hilited, when UI Design section, id:1 is out of view, dot id:2 is hilited. Just a thought.

// Key changes:
// Added index property to each section
// Using threshold [0, 1] to detect when sections fully enter/exit viewport
// Checking boundingClientRect.top to determine if section scrolled up
// Activating next dot when current section leaves viewport

// Let me know if this approach works better for tracking the sections! We can fine-tune the threshold and rootMargin values if needed.
// ===========================================================================-*/
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { usePathname } from 'next/navigation';
// // import Link from 'next/link';

// // export function ParallaxNavigation() {
// //   const [activeSection, setActiveSection] = useState('web');
// //   const pathname = usePathname();

// //   const sections = [
// //     { id: 'web', index: 0, label: 'Web Dev', path: '/portfolio/web-development', color: 'bg-accent-500' },
// //     { id: 'ui', index: 1, label: 'UI Design', path: '/portfolio/ui-design', color: 'bg-secondary-500' },
// //     { id: 'multimedia', index: 2, label: 'Multimedia', path: '/portfolio/multimedia', color: 'bg-success-500' }
// //   ];

// //   useEffect(() => {
// //     // Set the active section based on the pathname or default to "web"
// //     const section = sections.find(s => pathname === s.path);
// //     if (section) {
// //       setActiveSection(section.id);
// //     } else {
// //       setActiveSection('web');
// //     }

// //     // IntersectionObserver to handle section visibility
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         // Find the first visible section
// //         const visibleEntry = entries.find(entry => entry.isIntersecting);

// //         if (visibleEntry) {
// //           const sectionId = visibleEntry.target.id;
// //           setActiveSection(sectionId);
// //         }
// //       },
// //       {
// //         threshold: [0.5], // Trigger when 50% of the section is visible
// //         rootMargin: '-20px 0px -20px 0px'
// //       }
// //     );

// //     // Observe each section
// //     sections.forEach(section => {
// //       const element = document.getElementById(section.id);
// //       if (element) {
// //         observer.observe(element);
// //       }
// //     });

// //     return () => observer.disconnect();
// //   }, [pathname]);

// //   return (
// //     <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
// //       {sections.map((section) => (
// //         <div key={section.id} className="group relative flex items-center">
// //           <div className="absolute right-full mr-4 px-2 py-1 rounded
// //             bg-black/80 text-white text-sm opacity-0 group-hover:opacity-100
// //             transition-opacity whitespace-nowrap">
// //             {section.label}
// //           </div>

// //           <Link
// //             href={section.path}
// //             className={`w-3 h-3 rounded-full transition-all duration-300
// //               ${activeSection === section.id
// //                 ? `w-4 h-4 ${section.color}`
// //                 : 'bg-white/50 hover:bg-white/80'}`}
// //             aria-label={section.label}
// //           />
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// /*-|================================================================================|-*/

// // // /*-= src/components/ParallaxNavigation.tsx =-*/
// // // /*-=  =-*/
// // // /*-=========================================================================
// // // Let's fix the navigation's scroll observation behavior.
// // // The issue is with the intersection observer settings.
// // // We need to adjust the threshold and rootMargin for better
// // // accuracy in both scroll directions.

// // // Key changes:
// // //    Added multiple threshold values to track visibility more precisely
// // //    Added rootMargin to adjust when sections are considered "visible"
// // //    Using intersectionRatio to determine the most visible section
// // //    Set initial state to 'web' to match the first section
// // //    Improved section observation logic to work in both scroll directions
// // // This should now:
// // //    Highlight the first dot when Web Development section is visible
// // //    Properly track sections when scrolling both up and down
// // //    Correctly highlight the third section (multimedia) when it's visible
// // //    Maintain smooth transitions between sections
// // // ===========================================================================-*/
// // // // src/components/ParallaxNavigation.tsx
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { usePathname } from 'next/navigation';
// // // import Link from 'next/link';

// // // export function ParallaxNavigation() {
// // //   const [activeSection, setActiveSection] = useState('web');
// // //   const pathname = usePathname();

// // //   const sections = [
// // //     { id: 'web', label: 'Web Dev', path: '/portfolio/web-development', color: 'bg-accent-500' },
// // //     { id: 'ui', label: 'UI Design', path: '/portfolio/ui-design', color: 'bg-secondary-500' },
// // //     { id: 'multimedia', label: 'Multimedia', path: '/portfolio/multimedia', color: 'bg-success-500' }
// // //   ];

// // //   useEffect(() => {
// // //     // Handle detailed pages
// // //     const section = sections.find(s => pathname === s.path);
// // //     if (section) {
// // //       setActiveSection(section.id);
// // //       return;
// // //     }

// // //     // Handle homepage scroll with improved settings
// // //     const observer = new IntersectionObserver(
// // //       (entries) => {
// // //         // Find the most visible section
// // //         const visibleSection = entries.reduce((max, entry) => {
// // //           return (entry.intersectionRatio > (max?.intersectionRatio ?? 0))
// // //             ? entry
// // //             : max;
// // //         }, null);

// // //         if (visibleSection?.target.id) {
// // //           setActiveSection(visibleSection.target.id);
// // //         }
// // //       },
// // //       {
// // //         threshold: [0.2, 0.4, 0.6, 0.8], // Multiple thresholds for better accuracy
// // //         rootMargin: '-10% 0px -10% 0px'   // Adjust the observation area
// // //       }
// // //     );

// // //     // Observe all sections
// // //     sections.forEach(section => {
// // //       const element = document.getElementById(section.id);
// // //       if (element) {
// // //         observer.observe(element);
// // //       }
// // //     });

// // //     return () => observer.disconnect();
// // //   }, [pathname]);

// // //   return (
// // //     <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
// // //       {sections.map((section) => (
// // //         <div key={section.id} className="group relative flex items-center">
// // //           <div className="absolute right-full mr-4 px-2 py-1 rounded
// // //             bg-black/80 text-white text-sm opacity-0 group-hover:opacity-100
// // //             transition-opacity whitespace-nowrap">
// // //             {section.label}
// // //           </div>

// // //           <Link
// // //             href={section.path}
// // //             className={`w-3 h-3 rounded-full transition-all duration-300
// // //               ${activeSection === section.id
// // //                 ? `w-4 h-4 ${section.color}`
// // //                 : 'bg-white/50 hover:bg-white/80'}`}
// // //             aria-label={section.label}
// // //           />
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }
// // // /*-|================================================================================|-*/

// // // // /*-= src/components/ParallaxNavigation.tsx =-*/
// // // // /*-=  =-*/
// // // // /*-=========================================================================
// // // // Ah, I understand now! You want the navigation dots to:

// // // // Highlight based on which section is visible when scrolling the homepage
// // // // Be present and navigable in all the detailed section pages
// // // // Highlight the corresponding dot when viewing a detailed section page
// // // // ===========================================================================-*/
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { usePathname } from 'next/navigation';
// // // // import Link from 'next/link';

// // // // export function ParallaxNavigation() {
// // // //   const [activeSection, setActiveSection] = useState('web');
// // // //   const pathname = usePathname();

// // // //   const sections = [
// // // //     { id: 'web', label: 'Web Dev', path: '/portfolio/web-development', color: 'bg-accent-500' },
// // // //     { id: 'ui', label: 'UI Design', path: '/portfolio/ui-design', color: 'bg-secondary-500' },
// // // //     { id: 'multimedia', label: 'Multimedia', path: '/portfolio/multimedia', color: 'bg-success-500' }
// // // //   ];

// // // //   useEffect(() => {
// // // //     // Handle detailed pages
// // // //     const section = sections.find(s => pathname === s.path);
// // // //     if (section) {
// // // //       setActiveSection(section.id);
// // // //       return;
// // // //     }

// // // //     // Handle homepage scroll
// // // //     const observer = new IntersectionObserver(
// // // //       (entries) => {
// // // //         entries.forEach((entry) => {
// // // //           if (entry.isIntersecting) {
// // // //             setActiveSection(entry.target.id);
// // // //           }
// // // //         });
// // // //       },
// // // //       { threshold: 0.6 }
// // // //     );

// // // //     sections.forEach(section => {
// // // //       const element = document.getElementById(section.id);
// // // //       if (element) observer.observe(element);
// // // //     });

// // // //     return () => observer.disconnect();
// // // //   }, [pathname]);

// // // //   return (
// // // //     <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
// // // //       {sections.map((section) => (
// // // //         <div key={section.id} className="group relative flex items-center">
// // // //           <div className="absolute right-full mr-4 px-2 py-1 rounded
// // // //             bg-black/80 text-white text-sm opacity-0 group-hover:opacity-100
// // // //             transition-opacity whitespace-nowrap">
// // // //             {section.label}
// // // //           </div>

// // // //           <Link
// // // //             href={section.path}
// // // //             className={`w-3 h-3 rounded-full transition-all duration-300
// // // //               ${activeSection === section.id
// // // //                 ? `w-4 h-4 ${section.color}`
// // // //                 : 'bg-white/50 hover:bg-white/80'}`}
// // // //             aria-label={section.label}
// // // //           />
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }
// // // // /*-|================================================================================|-*/

// // // // // /*-=  src/components/ParallaxNavigation.tsx =-*/
// // // // // /*-=========================================================================
// // // // // Navigation
// // // // // ===========================================================================-*/
// // // // // 'use client';

// // // // // const sections = [
// // // // //   { id: 'web', label: 'Web Dev' },
// // // // //   { id: 'ui', label: 'UI Design' },
// // // // //   { id: 'multimedia', label: 'Multimedia' }
// // // // // ];

// // // // // export function ParallaxNavigation() {
// // // // //    const handleClick = (sectionId: string) => {
// // // // //      const element = document.getElementById(sectionId);
// // // // //      if (element) {
// // // // //        element.scrollIntoView({ behavior: 'smooth' });
// // // // //      }
// // // // //    };

// // // // //    return (
// // // // //      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
// // // // //        {sections.map((section) => (
// // // // //          <button
// // // // //            key={section.id}
// // // // //            onClick={() => handleClick(section.id)}
// // // // //            className="w-3 h-3 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
// // // // //            aria-label={section.label}
// // // // //          />
// // // // //        ))}
// // // // //      </div>
// // // // //    );
// // // // //  }

// // // // // /*-|================================================================================|-*/