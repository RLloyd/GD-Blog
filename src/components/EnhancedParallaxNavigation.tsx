/*-= src/components/EnhancedParallaxNavigation.tsx =-*/
/*-= Fixed Portfolio Navigation =-*/
/*-=========================================================================
Key improvements:

Better scroll observation:

Added rootMargin to improve trigger accuracy
Higher threshold for more precise section detection


Proper route handling:

Checks for exact path matches
Updates active state based on current route
Maintains state across navigation


Improved visibility:

Always visible on all portfolio pages
Smoother transitions between states
Better contrast for labels


More reliable state management:

Proper cleanup of observers
Clear separation of route and scroll logic
Better state initialization
===========================================================================-*/
"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function EnhancedParallaxNavigation() {
  const [activeSection, setActiveSection] = useState<string>('web');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const pathname = usePathname();

  const sections = [
    {
      id: 'web',
      label: 'Web Development',
      path: '/portfolio/web-development',
      color: 'bg-accent-500'
    },
    {
      id: 'ui',
      label: 'UI Design',
      path: '/portfolio/ui-design',
      color: 'bg-secondary-500'
    },
    {
      id: 'multimedia',
      label: 'Multimedia',
      path: '/portfolio/multimedia',
      color: 'bg-success-500'
    }
  ];

  useEffect(() => {
    // Handle route-based activation
    const currentSection = sections.find(section => pathname === section.path);
    if (currentSection) {
      setActiveSection(currentSection.id);
      return;
    }

    // Handle scroll-based activation only on main portfolio page
    if (pathname === '/portfolio') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id;
              setActiveSection(sectionId);
            }
          });
        },
        {
          threshold: 0.6,
          rootMargin: '-20% 0px -20% 0px'
        }
      );

      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    }
  }, [pathname]);

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-6">
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <div
              key={section.id}
              className="group relative flex items-center justify-end"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Label */}
              <div
                className={`absolute right-full mr-4 px-2 py-1 rounded-md
                  text-white text-sm whitespace-nowrap bg-gray-900/90
                  transition-opacity duration-200
                  ${hoveredSection === section.id ? 'opacity-100' : 'opacity-0'}`}
              >
                {section.label}
              </div>

              {/* Active indicator line */}
              {isActive && (
                <div
                  className={`absolute right-full mr-2 w-6 h-0.5
                    transition-all duration-300 ${section.color}`}
                />
              )}

              {/* Navigation dot */}
              <Link
                href={section.path}
                className={`w-3 h-3 rounded-full transition-all duration-300
                  ${isActive
                    ? `scale-125 ${section.color}`
                    : 'bg-white/50 hover:bg-white/80'
                  }
                  hover:scale-125`}
                aria-label={section.label}
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
}
/*-|================================================================================|-*/

// /*-= src/components/EnhancedParallaxNavigation.tsx =-*/
// /*-= Enhanced Portfolio Navigation =-*/
// /*-=========================================================================
// The key improvements:
// Handles both scroll-based and route-based activation:
//    Observes sections when on the main portfolio page
//    Checks current route when on detail pages
//    Updates active dot accordingly
// Consistent color scheme:
//    Orange for Web Development
//    Purple for UI Design
//    Green for Multimedia
// Maintains visibility across all portfolio pages
// Clear visual feedback:
//    Dots enlarge when active
//    Color indicates current section
//    Hover labels show section names
//    Indicator lines for active section
// ===========================================================================-*/
// import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';

// export default function EnhancedParallaxNavigation() {
//   const [activeSection, setActiveSection] = useState<string>('web');
//   const [hoveredSection, setHoveredSection] = useState<string | null>(null);
//   const pathname = usePathname();

//   const sections = [
//     {
//       id: 'web',
//       label: 'Web Development',
//       path: '/portfolio/web-development',
//       color: 'bg-accent-500',
//       hoverColor: 'hover:bg-accent-400'
//     },
//     {
//       id: 'ui',
//       label: 'UI Design',
//       path: '/portfolio/ui-design',
//       color: 'bg-secondary-500',
//       hoverColor: 'hover:bg-secondary-400'
//     },
//     {
//       id: 'multimedia',
//       label: 'Multimedia',
//       path: '/portfolio/multimedia',
//       color: 'bg-success-500',
//       hoverColor: 'hover:bg-success-400'
//     }
//   ];

//   // Handle scroll-based activation on main portfolio page
//   useEffect(() => {
//     if (pathname === '/portfolio') {
//       const observerCallback = (entries: IntersectionObserverEntry[]) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.id);
//           }
//         });
//       };

//       const observer = new IntersectionObserver(observerCallback, {
//         threshold: 0.6
//       });

//       sections.forEach(section => {
//         const element = document.getElementById(section.id);
//         if (element) observer.observe(element);
//       });

//       return () => observer.disconnect();
//     }
//   }, [pathname]);

//   // Handle route-based activation on detail pages
//   useEffect(() => {
//     sections.forEach(section => {
//       if (pathname === section.path) {
//         setActiveSection(section.id);
//       }
//     });
//   }, [pathname]);

//   return (
//     <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
//       {sections.map((section) => {
//         const isActive = activeSection === section.id;

//         return (
//           <div
//             key={section.id}
//             className="group relative flex items-center"
//             onMouseEnter={() => setHoveredSection(section.id)}
//             onMouseLeave={() => setHoveredSection(null)}
//           >
//             {/* Section Label */}
//             {hoveredSection === section.id && (
//               <div className="absolute right-full mr-4 px-2 py-1 rounded
//                 bg-black/80 text-white text-sm whitespace-nowrap">
//                 {section.label}
//               </div>
//             )}

//             {/* Navigation Dot */}
//             <Link
//               href={section.path}
//               className={`w-3 h-3 rounded-full transition-all duration-300
//                 ${isActive ? `w-4 h-4 ${section.color}` : 'bg-white/50 hover:bg-white/80'}
//                 ${section.hoverColor}
//               `}
//               aria-label={section.label}
//             />

//             {/* Active indicator line */}
//             {isActive && (
//               <div className={`absolute right-full mr-2 w-8 h-0.5 ${section.color}`} />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// /*-|================================================================================|-*/

// /*-= src/components/EnhancedParallaxNavigation.tsx =-*/
// /*-= Enhanced Section Navigation Menu =-*/
// /*-=========================================================================
// Key improvements:

// Each dot is now a proper Link component that navigates to the corresponding section's detailed page
// On hover, shows an expanded menu card with:

// Section title
// Brief description
// Interactive hover effects


// The navigation menu stays accessible throughout all portfolio pages
// Smooth transitions and animations for better user experience
// Direct links to each section's dedicated page
// ===========================================================================-*/
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function EnhancedParallaxNavigation() {
//   const [hoveredSection, setHoveredSection] = useState<string | null>(null);

//   const sections = [
//     {
//       id: 'web',
//       label: 'Web Development',
//       color: 'from-blue-400 to-blue-600',
//       path: '/portfolio/web-development',
//       description: 'Modern web applications'
//     },
//     {
//       id: 'ui',
//       label: 'UI Design',
//       color: 'from-purple-400 to-purple-600',
//       path: '/portfolio/ui-design',
//       description: 'Beautiful interfaces'
//     },
//     {
//       id: 'multimedia',
//       label: 'Multimedia',
//       color: 'from-green-400 to-green-600',
//       path: '/portfolio/multimedia',
//       description: 'Video & motion graphics'
//     }
//   ];

//   return (
//     <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
//       {sections.map((section) => (
//         <div
//           key={section.id}
//           className="group relative flex items-center"
//           onMouseEnter={() => setHoveredSection(section.id)}
//           onMouseLeave={() => setHoveredSection(null)}
//         >
//           {/* Expanded Menu Card */}
//           {hoveredSection === section.id && (
//             <div className="absolute right-full mr-6 bg-black/90 rounded-lg overflow-hidden
//               w-48 transform transition-all duration-300 ease-out">
//               <Link
//                 href={section.path}
//                 className="block p-4 hover:bg-white/10 transition-colors"
//               >
//                 <h3 className="text-white font-medium text-sm">
//                   {section.label}
//                 </h3>
//                 <p className="text-gray-400 text-xs mt-1">
//                   {section.description}
//                 </p>
//               </Link>
//             </div>
//           )}

//           {/* Navigation Dot */}
//           <Link
//             href={section.path}
//             className={`w-3 h-3 rounded-full transition-all duration-300 relative
//               bg-white/50 hover:bg-white/80 hover:scale-150
//               ${hoveredSection === section.id ? 'scale-150 bg-white' : ''}
//             `}
//             aria-label={section.label}
//           />

//           {/* Active indicator line */}
//           {hoveredSection === section.id && (
//             <div className={`absolute right-full mr-2 w-8 h-0.5
//               bg-gradient-to-r ${section.color} transition-opacity`}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
/*-|================================================================================|-*/

/*-= src/components/EnhancedParallaxNavigation.tsx =-*/
/*-= Enhanced Parallax Navigation =-*/
/*-=========================================================================
The new navigation features:
   • Visual feedback for the active section
   • Hover labels showing section names
   • Animated indicator lines
   • Smooth scrolling to sections
   • Automatic section detection using Intersection Observer
   • Gradient colors matching your sections
   • Responsive design that works with your existing layout
===========================================================================-*/
// import { useState, useEffect } from 'react';

// export default function EnhancedParallaxNavigation() {
//   const sections = [
//     { id: 'web', label: 'Web Dev', color: 'from-blue-400 to-blue-600' },
//     { id: 'ui', label: 'UI Design', color: 'from-purple-400 to-purple-600' },
//     { id: 'multimedia', label: 'Multimedia', color: 'from-green-400 to-green-600' }
//   ];

//   const [activeSection, setActiveSection] = useState('web');

//   useEffect(() => {
//     const observerCallback = (entries: IntersectionObserverEntry[]) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           setActiveSection(entry.target.id);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(observerCallback, {
//       threshold: 0.6
//     });

//     sections.forEach(section => {
//       const element = document.getElementById(section.id);
//       if (element) observer.observe(element);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const handleClick = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
//       {sections.map((section) => (
//         <div key={section.id} className="group relative flex items-center">
//           {/* Label that appears on hover */}
//           <div className="absolute right-full mr-4 px-2 py-1 rounded bg-black/80 text-white text-sm
//             opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//             {section.label}
//           </div>

//           {/* Navigation dot */}
//           <button
//             onClick={() => handleClick(section.id)}
//             className={`w-3 h-3 rounded-full transition-all duration-300
//               ${activeSection === section.id
//                 ? `w-4 h-4 bg-gradient-to-r ${section.color}`
//                 : 'bg-white/50 hover:bg-white/80'
//               }`}
//             aria-label={section.label}
//           />

//           {/* Active section indicator line */}
//           {activeSection === section.id && (
//             <div className={`absolute right-full mr-2 w-8 h-0.5 bg-gradient-to-r ${section.color}
//               opacity-0 group-hover:opacity-100 transition-opacity`}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }