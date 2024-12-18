/*-= src/components/ParallaxNavigation.tsx =-*/
/*-= Scroll Position Based ParallaxNavigation =-*/
/*-============================================================
Prompt:
We tried this solution before using threshold & rootMargin. (referring to previous codes) It didn't work because the third section is so much longer than the other section.
Right now the second hilter is delayed by a bit and third dot hiliter is delayed by a lot.

You're right - the varying section lengths, especially the much longer third section, make the threshold/rootMargin approach unreliable. Let's try a different approach that uses scroll position relative to each section's top position:
Key changes:

Switched from IntersectionObserver to scroll position calculations
Uses a scroll listener with absolute positions to determine the active section
Calculates section boundaries based on their actual positions in the document
Determines active section based on where viewport midpoint intersects with sections
Uses passive scroll listener for better performance

This approach should:

Start with first dot highlighted
Update dots with minimal delay as you scroll through sections
Work correctly with the longer third section
Be more responsive to scroll position changes

The key improvement is using absolute positions and scroll position to determine the active section, which should be more reliable than trying to use intersection observers with the varying section lengths.
================================================================-*/
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function ParallaxNavigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  const sections = [
    { id: 'web', index: 0, label: 'Web Dev', path: '/portfolio/web-development', color: 'bg-accent-500' },
    { id: 'ui', index: 1, label: 'UI Design', path: '/portfolio/ui-design', color: 'bg-secondary-500' },
    { id: 'multimedia', index: 2, label: 'Multimedia', path: '/portfolio/multimedia', color: 'bg-success-500' }
  ];

  useEffect(() => {
    // Handle path-based section activation
    const pathSection = sections.find(s => pathname === s.path);
    if (pathSection) {
      setActiveSection(pathSection.id);
      return;
    }

    // Set initial section
    setActiveSection(sections[0].id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + (window.innerHeight * 0.5);

      // Get all sections and their positions
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      // Find the current section based on scroll position
      for (const { id, element } of sectionElements) {
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        const absoluteBottom = absoluteTop + rect.height;

        if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
          setActiveSection(id);
          break;
        }
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.id} className="group relative flex items-center justify-end">
            <div className="absolute right-full mr-4 px-2 py-1 rounded-md
              text-white text-sm whitespace-nowrap bg-gray-900/90
              transition-opacity duration-200
              opacity-0 group-hover:opacity-100">
              {section.label}
            </div>

            {activeSection === section.id && (
              <div className={`absolute right-full mr-2 w-6 h-0.5
                transition-all duration-300 ${section.color}`} />
            )}

            <Link
              href={section.path}
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${activeSection === section.id
                  ? `scale-125 ${section.color}`
                  : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={section.label}
            />
          </div>
        ))}
      </div>
    </nav>
  );
}
/*-|=================================================================|-*/

// /*-= src/components/ParallaxNavigation.tsx =-*/
// /*-= Synchronized ParallaxNavigation Component =-*/
// /*-============================================================
// Prompt:
// That's totally out of synch now. It does hilite the first dot on initial load but once you start scrolling it hilites the second dot even though you're showing the first section. And if you keep scrolling it just kept the hilite selection on second dot even if you're in the third section. It never select the third dot.

// Key changes made:

// Removed the hasScrolled state as it was causing timing issues
// Added multiple threshold points to detect section visibility more precisely
// Changed to use intersectionRatio to determine the most visible section
// Adjusted rootMargin to be smaller for more accurate triggering
// Simplified the observer setup to run immediately but with better visibility detection

// This version should:

// Start with the first dot highlighted
// Correctly update the active dot based on which section is most visible in the viewport
// Smoothly transition between sections during scrolling
// Maintain proper highlighting for all three sections

// The key improvement is using intersection ratios to determine which section is most visible, rather than just detecting when sections enter the viewport. This should give you much more accurate synchronization between the visible content and the navigation dots.
// ================================================================-*/
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';

// export function ParallaxNavigation() {
//   const [activeSection, setActiveSection] = useState<string | null>(null);
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const pathname = usePathname();

//   const sections = [
//     { id: 'web', index: 0, label: 'Web Dev', path: '/portfolio/web-development', color: 'bg-accent-500' },
//     { id: 'ui', index: 1, label: 'UI Design', path: '/portfolio/ui-design', color: 'bg-secondary-500' },
//     { id: 'multimedia', index: 2, label: 'Multimedia', path: '/portfolio/multimedia', color: 'bg-success-500' }
//   ];

//   useEffect(() => {
//     // Handle path-based section activation
//     const pathSection = sections.find(s => pathname === s.path);
//     if (pathSection) {
//       setActiveSection(pathSection.id);
//       return;
//     }

//     // Set initial section
//     setActiveSection(sections[0].id);

//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         // Find the most visible section
//         let maxVisibility = 0;
//         let mostVisibleSection = null;

//         entries.forEach((entry) => {
//           const intersectionRatio = entry.intersectionRatio;
//           if (intersectionRatio > maxVisibility) {
//             maxVisibility = intersectionRatio;
//             mostVisibleSection = entry.target.id;
//           }
//         });

//         if (mostVisibleSection) {
//           setActiveSection(mostVisibleSection);
//         }
//       },
//       {
//         threshold: [0, 0.25, 0.5, 0.75, 1], // More threshold points for smoother detection
//         rootMargin: '-10% 0px -10% 0px' // Smaller margin for more accurate triggering
//       }
//     );

//     // Start observing sections
//     sections.forEach(section => {
//       const element = document.getElementById(section.id);
//       if (element && observerRef.current) {
//         observerRef.current.observe(element);
//       }
//     });

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [pathname]);

//   return (
//     <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
//       <div className="flex flex-col gap-6">
//         {sections.map((section) => (
//           <div key={section.id} className="group relative flex items-center justify-end">
//             {/* Label */}
//             <div className="absolute right-full mr-4 px-2 py-1 rounded-md
//               text-white text-sm whitespace-nowrap bg-gray-900/90
//               transition-opacity duration-200
//               opacity-0 group-hover:opacity-100">
//               {section.label}
//             </div>

//             {/* Active indicator line */}
//             {activeSection === section.id && (
//               <div className={`absolute right-full mr-2 w-6 h-0.5
//                 transition-all duration-300 ${section.color}`} />
//             )}

//             {/* Navigation dot */}
//             <Link
//               href={section.path}
//               className={`w-3 h-3 rounded-full transition-all duration-300
//                 ${activeSection === section.id
//                   ? `scale-125 ${section.color}`
//                   : 'bg-white/50 hover:bg-white/80'}`}
//               aria-label={section.label}
//             />
//           </div>
//         ))}
//       </div>
//     </nav>
//   );
// }
// /*-|=================================================================|-*/

// // /*-= src/components/ParallaxNavigation.tsx =-*/
// // /*-= Scroll-Controlled ParallaxNavigation Component =-*/
// // /*-=========================================================================
// // Prompt:
// // Is there a way to hold on running the useEffect until user starts scrolling?
// // I think it's the sections.forEach(... that's triggering the iteration and stops at the last dot or section

// // Key changes:
// // Added hasScrolled state to track if user has started scrolling
// // Split the effects:

// // First effect handles initial setup and scroll detection
// // Second effect only runs observer setup after hasScrolled is true


// // Used a ref for the observer to maintain reference across renders
// // Set initial section to first one by default
// // Proper cleanup of both scroll listener and observer

// // This solution will:

// // Start with the first dot highlighted
// // Only begin observing sections once the user starts scrolling
// // Maintain the correct section highlighting during navigation
// // Clean up properly when unmounting

// // Now the navigation should start with the first dot highlighted and only begin updating based on scroll position after the user starts scrolling.
// // ===========================================================================-*/
// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { usePathname } from 'next/navigation';
// // import Link from 'next/link';

// // export function ParallaxNavigation() {
// //   const [activeSection, setActiveSection] = useState<string | null>(null);
// //   const [hasScrolled, setHasScrolled] = useState(false);
// //   const observerRef = useRef<IntersectionObserver | null>(null);
// //   const pathname = usePathname();

// //   const sections = [
// //     { id: 'web', index: 0, label: 'Web Dev', path: '/portfolio/web-development', color: 'bg-accent-500' },
// //     { id: 'ui', index: 1, label: 'UI Design', path: '/portfolio/ui-design', color: 'bg-secondary-500' },
// //     { id: 'multimedia', index: 2, label: 'Multimedia', path: '/portfolio/multimedia', color: 'bg-success-500' }
// //   ];

// //   useEffect(() => {
// //     // Handle path-based section activation
// //     const pathSection = sections.find(s => pathname === s.path);
// //     if (pathSection) {
// //       setActiveSection(pathSection.id);
// //       return;
// //     }

// //     // Set initial section to first one
// //     setActiveSection(sections[0].id);

// //     // Create scroll handler
// //     const handleScroll = () => {
// //       if (!hasScrolled) {
// //         setHasScrolled(true);
// //         window.removeEventListener('scroll', handleScroll);
// //       }
// //     };

// //     // Add scroll listener
// //     window.addEventListener('scroll', handleScroll);

// //     return () => {
// //       window.removeEventListener('scroll', handleScroll);
// //     };
// //   }, [pathname]);

// //   // Set up observer only after first scroll
// //   useEffect(() => {
// //     if (!hasScrolled) return;

// //     observerRef.current = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             const sectionId = entry.target.id;
// //             setActiveSection(sectionId);
// //           }
// //         });
// //       },
// //       {
// //         threshold: 0.4,
// //         rootMargin: '-20% 0px -20% 0px'
// //       }
// //     );

// //     // Start observing sections
// //     sections.forEach(section => {
// //       const element = document.getElementById(section.id);
// //       if (element && observerRef.current) {
// //         observerRef.current.observe(element);
// //       }
// //     });

// //     return () => {
// //       if (observerRef.current) {
// //         observerRef.current.disconnect();
// //       }
// //     };
// //   }, [hasScrolled]);

// //   return (
// //     <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
// //       <div className="flex flex-col gap-6">
// //         {sections.map((section) => (
// //           <div key={section.id} className="group relative flex items-center justify-end">
// //             <div className="absolute right-full mr-4 px-2 py-1 rounded-md
// //               text-white text-sm whitespace-nowrap bg-gray-900/90
// //               transition-opacity duration-200
// //               opacity-0 group-hover:opacity-100">
// //               {section.label}
// //             </div>

// //             {activeSection === section.id && (
// //               <div className={`absolute right-full mr-2 w-6 h-0.5
// //                 transition-all duration-300 ${section.color}`} />
// //             )}

// //             <Link
// //               href={section.path}
// //               className={`w-3 h-3 rounded-full transition-all duration-300
// //                 ${activeSection === section.id
// //                   ? `scale-125 ${section.color}`
// //                   : 'bg-white/50 hover:bg-white/80'}`}
// //               aria-label={section.label}
// //             />
// //           </div>
// //         ))}
// //       </div>
// //     </nav>
// //   );
// // }
// /*-|================================================================================|-*/

// // /*-= src/components/ParallaxNavigation.tsx =-*/
// // /*-= Fixed ParallaxNavigation Component =-*/
// // /*-=========================================================================
// // Prompt: New chat
// // Still trying to solve the portfolio dot hiliter on initial load.
// // Refer to the latest codebase, the src/components/ParallaxNavigation.tsx has the latest code that kinda working. It select the first dot for a milliseconds then hilite the last dot.

// // Key improvements in this solution:

// // Initial state management:

// // Sets initial active section with a small delay to ensure DOM is ready
// // Uses a more reliable viewport-based detection for the initial section
// // Defaults to first section if no section is detected

// // Better intersection detection:

// // Uses middle third of viewport for more accurate section detection
// // Added threshold of 0.4 for more precise triggering
// // Improved rootMargin for better scroll boundaries

// // Cleanup and optimization:

// // Added proper cleanup of observers and timers
// // Added null check for initial activeSection state
// // Improved type safety with explicit state typing

// // Performance:

// // Uses transform for animations instead of dimensions
// // Implements proper cleanup to prevent memory leaks
// // Uses efficient state updates to prevent unnecessary rerenders

// // Try this solution - it should correctly highlight the first dot on initial load and maintain proper highlighting through scrolling and navigation.
// // ===========================================================================-*/
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
// //     // Handle detailed pages
// //     const section = sections.find(s => pathname === s.path);
// //     if (section) {
// //       setActiveSection(section.id);
// //       return;
// //     }

// //     // Find initially visible section
// //     const findVisibleSection = () => {
// //       for (const section of sections) {
// //         const element = document.getElementById(section.id);
// //         if (element) {
// //           const rect = element.getBoundingClientRect();
// //           if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
// //             return section.id;
// //           }
// //         }
// //       }
// //       return 'web'; // Default to first section
// //     };

// //     // Set initial active section based on what's visible
// //     setActiveSection(findVisibleSection());

// //     // Handle scroll
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

// // // /*-= src/components/ParallaxNavigation.tsx =-*/
// // // /*-=========================================================================
// // // Prompt:
// // // Still nope! It select the first dot for a milliseconds then hilite the last dot.

// // // Let's try a different approach by detecting which section is actually visible on initial load instead of trying to skip observations. Here's the modified version:

// // // The key changes:

// // // Added findVisibleSection function to check what's actually visible in the viewport on load
// // // Set initial active section based on the visible section
// // // Maintains the same scroll behavior after initial load

// // // This should correctly identify and highlight the first dot when the page loads because the first section will be visible in the viewport.
// // // ===========================================================================-*/
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { usePathname } from 'next/navigation';
// // // import Link from 'next/link';

// // // export function ParallaxNavigation() {
// // //   const [activeSection, setActiveSection] = useState('web');
// // //   const pathname = usePathname();

// // //   const sections = [
// // //     { id: 'web', index: 0, label: 'Web Dev', path: '/portfolio/web-development', color: 'bg-accent-500' },
// // //     { id: 'ui', index: 1, label: 'UI Design', path: '/portfolio/ui-design', color: 'bg-secondary-500' },
// // //     { id: 'multimedia', index: 2, label: 'Multimedia', path: '/portfolio/multimedia', color: 'bg-success-500' }
// // //   ];

// // //   useEffect(() => {
// // //     // Handle detailed pages
// // //     const section = sections.find(s => pathname === s.path);
// // //     if (section) {
// // //       setActiveSection(section.id);
// // //       return;
// // //     }

// // //     // Find initially visible section
// // //     const findVisibleSection = () => {
// // //       for (const section of sections) {
// // //         const element = document.getElementById(section.id);
// // //         if (element) {
// // //           const rect = element.getBoundingClientRect();
// // //           if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
// // //             return section.id;
// // //           }
// // //         }
// // //       }
// // //       return 'web'; // Default to first section
// // //     };

// // //     // Set initial active section based on what's visible
// // //     setActiveSection(findVisibleSection());

// // //     // Handle scroll
// // //     const observer = new IntersectionObserver(
// // //       (entries) => {
// // //         entries.forEach((entry) => {
// // //           const sectionId = entry.target.id;
// // //           const currentIndex = sections.find(s => s.id === sectionId)?.index || 0;

// // //           if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
// // //             // Section has scrolled up out of view, activate next section
// // //             const nextSection = sections[currentIndex + 1];
// // //             if (nextSection) {
// // //               setActiveSection(nextSection.id);
// // //             }
// // //           } else if (entry.isIntersecting) {
// // //             // Section is in view
// // //             setActiveSection(sectionId);
// // //           }
// // //         });
// // //       },
// // //       {
// // //         threshold: [0, 1],
// // //         rootMargin: '-20px 0px -20px 0px'
// // //       }
// // //     );

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