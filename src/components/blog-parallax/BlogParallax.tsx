/*-= src/components/blog-parallax/BlogParallax.tsx =-*/
/*-= Responsive Blog Parallax Component =-*/
/*-============================================================
Updated code: 12.20.2024 : 12:40pm
Key changes made:
Thank you for bringing these issues to my attention. Let me help you resolve both the visual problem and the TypeScript errors.
The visual issue (only seeing "Blog Posts" centered on screen) suggests that we need to properly implement the JSX structure of the component. For the TypeScript errors, we need to add proper type definitions and fix unused imports.
================================================================-*/
"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import Lenis from '@studio-freight/lenis';
import { categories } from '@/data/categories';
import { SlArrowDown } from 'react-icons/sl';
import CircularSVG2 from '../circular-loader/CircularSVG2';

gsap.registerPlugin(ScrollTrigger);

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  cover_image?: string;
  slug: string;
  category: string;
}

interface BlogParallaxProps {
  featuredPost: Post;
  posts: Post[];
}

export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const allPostsRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    if (!containerRef.current) return;

    const mm = gsap.matchMedia();
    let timeoutId: NodeJS.Timeout;

    const updateAnimation = () => {
      ScrollTrigger.getAll().forEach(st => st.kill());

      mm.add("(min-width: 1px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          },
        });

        tl.to(featuredRef.current, {
          yPercent: -100,
          ease: 'power2.inOut',
          duration: 2.5,
        }).to(allPostsRef.current, {
          y: (index, target) => {
            const viewportHeight = window.innerHeight;
            const targetHeight = target.scrollHeight;
            return -(targetHeight - viewportHeight);
          },
          ease: 'power2.inOut',
          duration: 2.5,
          delay: 1.5,
        }, '-=1.5');
      });
    };

    updateAnimation();

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateAnimation, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mm.revert();
      window.removeEventListener('resize', handleResize);
      lenisRef.current?.destroy();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={containerRef} className="myMainContainer relative h-[300vh] w-full overflow-hidden bg-black">
      {/* Featured Post Section */}
      <div
        ref={featuredRef}
        className="fixed top-0 right-0 h-screen bg-black z-30 m-0 w-screen left-1/2 -translate-x-1/2"
      >
        <div className="relative h-full">
          {featuredPost.cover_image && (
            <Image
              src={featuredPost.cover_image}
              alt={featuredPost.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-center text-white px-4 border-4 border-yellow-200">
            <div className="max-w-4xl mx-auto text-center border-purple-500 border bottom-[-200px] relative">
              <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
                {categories.find(c => c.id === featuredPost.category)?.name}
              </span>
              <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
              {featuredPost.excerpt && (
                <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
                  {featuredPost.excerpt}
                </p>
              )}
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
              >
                Read More
              </Link>
            </div>
            <CircularSVG2 />
            <p className='absolute bottom-4 text-4xl'><SlArrowDown /></p>
          </div>
        </div>
      </div>

      {/* All Posts Grid */}
      <div
        ref={allPostsRef}
        className="fixed top-0 right-0 h-screen z-20"
        style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-primary-900/50 rounded-lg overflow-hidden hover:bg-primary-900/70 transition-colors"
              >
                {post.cover_image && (
                  <div className="aspect-video relative">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
                    {categories.find(c => c.id === post.category)?.name}
                  </span>
                  <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// /*-============================================================
// Updated code: 12.20.2024 : 12:30pm
// Key changes made:
// Thank you for the important context about the responsiveness issues. You're absolutely right - I recall now that the matchMedia implementation was specifically added to handle responsive behavior and dynamic height calculations when the browser window is resized.
// Let me propose a solution that combines the smooth scrolling benefits of the timeline approach while maintaining the responsive handling from matchMedia:
// ================================================================-*/
// "use client";
// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';
// import Link from 'next/link';
// import Lenis from '@studio-freight/lenis';
// import { categories } from '@/data/categories';

// gsap.registerPlugin(ScrollTrigger);

// export default function BlogParallax({ featuredPost, posts }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const featuredRef = useRef<HTMLDivElement>(null);
//   const allPostsRef = useRef<HTMLDivElement>(null);
//   const lenisRef = useRef<Lenis | null>(null);

//   useEffect(() => {
//     lenisRef.current = new Lenis({
//       duration: 1.8,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//       wheelMultiplier: 0.8,
//       touchMultiplier: 1.5,
//     });

//     const raf = (time: number) => {
//       lenisRef.current?.raf(time);
//       requestAnimationFrame(raf);
//     };
//     requestAnimationFrame(raf);

//     if (!containerRef.current) return;

//     const mm = gsap.matchMedia();

//     const updateAnimation = () => {
//       // Clear existing ScrollTriggers before creating new ones
//       ScrollTrigger.getAll().forEach(st => st.kill());

//       mm.add("(min-width: 1px)", () => {
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: 'top top',
//             end: 'bottom bottom',
//             scrub: 1.2,
//             pin: true,
//             anticipatePin: 1,
//             invalidateOnRefresh: true, // Important for handling resize
//             onUpdate: self => {
//               // Optionally add smooth transitions during resize
//               gsap.to([featuredRef.current, allPostsRef.current], {
//                 duration: 0.3,
//                 ease: 'power2.out'
//               });
//             }
//           },
//         });

//         tl.to(featuredRef.current, {
//           yPercent: -100,
//           ease: 'power2.inOut',
//           duration: 2.5,
//         }).to(allPostsRef.current, {
//           y: (index, target) => {
//             // Dynamically calculate height on each update
//             const viewportHeight = window.innerHeight;
//             const targetHeight = target.scrollHeight;
//             return -(targetHeight - viewportHeight);
//           },
//           ease: 'power2.inOut',
//           duration: 2.5,
//         }, '-=1.5');
//       });
//     };

//     // Initial setup
//     updateAnimation();

//     // Handle resize events with debouncing
//     let resizeTimeout;
//     const handleResize = () => {
//       clearTimeout(resizeTimeout);
//       resizeTimeout = setTimeout(updateAnimation, 250);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       mm.revert();
//       window.removeEventListener('resize', handleResize);
//       lenisRef.current?.destroy();
//       clearTimeout(resizeTimeout);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="myMainContainer relative h-[400vh] w-full overflow-hidden bg-black">
//       {/* Component JSX remains the same */}
//     </div>
//   );
// }

// // /* Latest from codebase: src/components/blog-parallax/BlogParallax.tsx */
// // "use client";
// // import { useEffect, useRef } from 'react';
// // import { gsap } from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // import Image from 'next/image';
// // import Link from 'next/link';
// // import Lenis from '@studio-freight/lenis';
// // import { categories } from '@/data/categories';

// // gsap.registerPlugin(ScrollTrigger);

// // interface Post {
// //    id: string;
// //    title: string;
// //    excerpt?: string;
// //    cover_image?: string;
// //    slug: string;
// //    category: string;
// // }

// // interface BlogParallaxProps {
// //    featuredPost: Post;
// //    posts: Post[];
// // }

// // export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
// //    const containerRef = useRef<HTMLDivElement>(null);
// //    const featuredRef = useRef<HTMLDivElement>(null);
// //    const allPostsRef = useRef<HTMLDivElement>(null);
// //    const lenisRef = useRef<Lenis | null>(null);

// //    //    useEffect(() => {
// //    //       if (allPostsRef.current) {
// //    //           const allPostsHeight = allPostsRef.current.scrollHeight;
// //    //           const totalHeight = window.innerHeight + allPostsHeight;
// //    //           containerRef.current?.style.setProperty('height', `${totalHeight}px`);
// //    //           console.log("allPostsHeight: ", allPostsHeight);
// //    //           console.log("totalHeight: ", totalHeight);
// //    //       }
// //    //   }, [posts]);

// //    //    useEffect(() => {
// //    //       lenisRef.current = new Lenis({
// //    //          duration: 2,
// //    //          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// //    //          orientation: 'vertical',
// //    //          gestureOrientation: 'vertical',
// //    //          smoothWheel: true,
// //    //          wheelMultiplier: 1,
// //    //          touchMultiplier: 2,
// //    //       });

// //    //       if (allPostsRef.current) {
// //    //          const allPostsHeight = allPostsRef.current.scrollHeight;
// //    //          const totalHeight = window.innerHeight + allPostsHeight;
// //    //          containerRef.current?.style.setProperty('height', `${totalHeight}px`);

// //    //          console.log("allPostsHeight: ", allPostsHeight);
// //    //          console.log("totalHeight: ", totalHeight);
// //    //          console.log("containerRef: ", containerRef);
// //    //      }

// //    //       function raf(time: number) {
// //    //          lenisRef.current?.raf(time);
// //    //          requestAnimationFrame(raf);
// //    //       }
// //    //       requestAnimationFrame(raf);

// //    //       if (!containerRef.current) return;

// //    //       // const tl = gsap.timeline({
// //    //       //    scrollTrigger: {
// //    //       //       trigger: containerRef.current,
// //    //       //       start: 'top top',
// //    //       //       end: 'bottom bottom',
// //    //       //       // end: '+=200%',
// //    //       //       scrub: 3,
// //    //       //       pin: true,
// //    //       //    },
// //    //       // });
// //    //       const tl = gsap.timeline({
// //    //          scrollTrigger: {
// //    //              trigger: containerRef.current,
// //    //              start: 'top top',
// //    //              end: 'bottom bottom',
// //    //              scrub: 2,
// //    //              pin: true,
// //    //             //  invalidateOnRefresh: true
// //    //          },
// //    //      });

// //    //       tl.to(featuredRef.current, {
// //    //          yPercent: -100,
// //    //          ease: 'none',
// //    //          duration: 3,
// //    //        }).to(allPostsRef.current, {
// //    //          // yPercent: -100,
// //    //          y: (index, target) => -(target.scrollHeight - window.innerHeight),
// //    //          ease: 'none',
// //    //          duration: 3,
// //    //        }, '>');

// //    //       return () => {
// //    //          lenisRef.current?.destroy();
// //    //          tl.kill();
// //    //          ScrollTrigger.getAll().forEach(t => t.kill());
// //    //       };
// //    //    // }, []);
// //    // }, [posts]);

// //    useEffect(() => {

// //       lenisRef.current = new Lenis({
// //          // duration: 2,
// //          // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// //          // orientation: 'vertical',
// //          // gestureOrientation: 'vertical',
// //          // smoothWheel: true,
// //          // wheelMultiplier: 1,
// //          // touchMultiplier: 2,
// //          duration: 1.8,
// //          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// //          // smoothWheel: true,
// //          // wheelMultiplier: 0.8,
// //          // touchMultiplier: 1.5,
// //          orientation: 'vertical',
// //          gestureOrientation: 'vertical',
// //          smoothWheel: true,
// //          wheelMultiplier: 1,
// //          // smoothTouch: false,
// //          touchMultiplier: 2,
// //       });
// //       const raf = (time: number) => {
// //          lenisRef.current?.raf(time);
// //          requestAnimationFrame(raf);
// //       };
// //       requestAnimationFrame(raf);

// //       if (!containerRef.current) return;

// //       const mm = gsap.matchMedia();
// //       // const updateAnimation = () => {
// //       //    mm.add("(min-width: 1px)", () => {
// //       //       const tl = gsap.timeline({
// //       //          scrollTrigger: {
// //       //             trigger: containerRef.current,
// //       //             start: 'top top',
// //       //             end: 'bottom bottom',
// //       //             scrub: 1,
// //       //             pin: true,
// //       //             invalidateOnRefresh: true
// //       //          },
// //       //       });

// //       //       tl.to(featuredRef.current, {
// //       //          yPercent: -100,
// //       //          ease: 'none',
// //       //          duration: 0.5,
// //       //       }).to(allPostsRef.current, {
// //       //          y: (index, target) => -(target.scrollHeight - window.innerHeight),
// //       //          ease: 'none',
// //       //          duration: 1,
// //       //          delay: 3,
// //       //       }, '>');
// //       //    });
// //       // };
// //       const updateAnimation = () => {
// //          mm.add("(min-width: 1px)", () => {
// //             const tl = gsap.timeline({
// //                scrollTrigger: {
// //                   trigger: containerRef.current,
// //                   start: 'top top',
// //                   end: 'bottom bottom',
// //                   scrub: 2,
// //                   pin: true,
// //                   // anticipatePin: 1,
// //                   // invalidateOnRefresh: true,
// //                   // ease: "power1.inOut"
// //                },
// //             });

// //             tl.to(featuredRef.current, {
// //                yPercent: -100,
// //                ease: "power2.inOut",
// //                // ease: 'none',
// //                duration: 0.5,
// //             })
// //             // .to(allPostsRef.current, {
// //             //    y: (index, target) => -(target.scrollHeight - window.innerHeight),
// //             //    ease: "power2.inOut",
// //             //    duration: 2.5,
// //             // }, '-=1.5');
// //             tl.to(allPostsRef.current, {
// //                y: (index, target) => -(target.scrollHeight - window.innerHeight),
// //                ease: "power2.inOut",
// //                duration: 2.5,
// //                // delay: 2,
// //             }, '-=1.5');
// //          });
// //       };

// //       updateAnimation();
// //       window.addEventListener('resize', updateAnimation);

// //       return () => {
// //          mm.revert();
// //          window.removeEventListener('resize', updateAnimation);
// //          lenisRef.current?.destroy();
// //       };
// //    }, []);

// //    return (
// //       <div ref={containerRef} className="myMainContainer relative h-[100vh] w-full overflow-visible bg-accent-800">
// //          {/* <div ref={containerRef} className="myMainContainer relative h-[300vh] w-full overflow-hidden bg-primary-950"> */}

// //          {/* Featured Post Section */}
// //          <div
// //             ref={featuredRef}
// //             className="fixed top-0 right-0 h-screen z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// //          >
// //             <div className="relative h-full">
// //                {featuredPost.cover_image && (
// //                   <Image
// //                      src={featuredPost.cover_image}
// //                      alt={featuredPost.title}
// //                      fill
// //                      className="object-cover"
// //                      priority
// //                   />
// //                )}
// //                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
// //                   <div className="max-w-4xl mx-auto text-center relative bottom-[-30rem]">
// //                      <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
// //                         {categories.find(c => c.id === featuredPost.category)?.name}
// //                      </span>
// //                      <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
// //                      {featuredPost.excerpt && (
// //                         <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
// //                            {featuredPost.excerpt}
// //                         </p>
// //                      )}
// //                      <Link
// //                         href={`/blog/${featuredPost.slug}`}
// //                         className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// //                      >
// //                         Read More
// //                      </Link>
// //                   </div>
// //                </div>
// //             </div>
// //          </div>

// //          {/* All Posts Section */}
// //          <div
// //             ref={allPostsRef}
// //             className="fixed top-0 right-0 h-screen z-20 m-0 w-screen left-1/2 -translate-x-1/2"
// //          >
// //             {/* <div className="min-h-screen bg-primary-900 p-8">
// //           <div className="max-w-7xl mx-auto"> */}
// //             {/* <div className="h-screenX overflow-y-auto py-16 bg-primary-900"> */}
// //             <div className="max-w-7xl mx-auto px-4 py-16 bg-primary-900">
// //                <div className="max-w-7xl mx-auto px-4">
// //                   <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                      {posts.map((post) => (
// //                         <Link
// //                            key={post.id}
// //                            href={`/blog/${post.slug}`}
// //                            className="group bg-primary-800/50 rounded-lg overflow-hidden hover:bg-primary-800/70 transition-colors"
// //                         >
// //                            {post.cover_image && (
// //                               <div className="aspect-video relative">
// //                                  <Image
// //                                     src={post.cover_image}
// //                                     alt={post.title}
// //                                     fill
// //                                     className="object-cover"
// //                                  />
// //                               </div>
// //                            )}
// //                            <div className="p-4">
// //                               <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
// //                                  {categories.find(c => c.id === post.category)?.name}
// //                               </span>
// //                               <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
// //                               {post.excerpt && (
// //                                  <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
// //                               )}
// //                            </div>
// //                         </Link>
// //                      ))}
// //                   </div>
// //                </div>
// //             </div>
// //          </div>
// //       </div>
// //    );
// // }

// // // /* src/components/blog-parallax/BlogParallax.tsx */
// // // 'use client';
// // // import { useEffect, useRef, useState } from 'react';
// // // import { gsap } from 'gsap';
// // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // import Image from 'next/image';
// // // import Link from 'next/link';
// // // import Lenis from '@studio-freight/lenis';
// // // import { categories } from '@/data/categories';

// // // gsap.registerPlugin(ScrollTrigger);

// // // interface Post {
// // //    id: string;
// // //    title: string;
// // //    excerpt?: string;
// // //    cover_image?: string;
// // //    slug: string;
// // //    category: string;
// // // }

// // // interface BlogParallaxProps {
// // //    featuredPost: Post;
// // //    posts: Post[];
// // // }

// // // export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
// // //    const containerRef = useRef<HTMLDivElement>(null);
// // //    const featuredRef = useRef<HTMLDivElement>(null);
// // //    const allPostsRef = useRef<HTMLDivElement>(null);
// // //    const lenisRef = useRef<Lenis | null>(null);
// // //    const [contentHeight, setContentHeight] = useState(0);

// // //    // Calculate dynamic height based on content
// // //    useEffect(() => {
// // //       if (allPostsRef.current) {
// // //          const gridContent = allPostsRef.current.querySelector('.grid');
// // //          if (gridContent) {
// // //             const height = gridContent.getBoundingClientRect().height;
// // //             setContentHeight(height + 200); // Add padding
// // //          }
// // //       }
// // //    }, [posts]);

// // //    useEffect(() => {
// // //       lenisRef.current = new Lenis({
// // //          duration: 2,
// // //          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // //          orientation: 'vertical',
// // //          gestureOrientation: 'vertical',
// // //          smoothWheel: true,
// // //          wheelMultiplier: 1,
// // //          touchMultiplier: 2,
// // //       });

// // //       function raf(time: number) {
// // //          lenisRef.current?.raf(time);
// // //          requestAnimationFrame(raf);
// // //       }
// // //       requestAnimationFrame(raf);

// // //       if (!containerRef.current || !featuredRef.current || !allPostsRef.current) return;

// // //       // Set up the main timeline
// // //       const tl = gsap.timeline({
// // //          scrollTrigger: {
// // //             trigger: containerRef.current,
// // //             start: 'top top',
// // //             end: 'bottom bottom',
// // //             scrub: 2,
// // //             pin: true,
// // //             // end: '+=200%',
// // //             // scrub: 1,
// // //             // pin: true,
// // //             // anticipatePin: 1,
// // //             // invalidateOnRefresh: true,
// // //          },
// // //       });

// // //       // Animate the featured post section
// // //       // tl.to(featuredRef.current, {
// // //       //    yPercent: -100,
// // //       //    ease: 'none',
// // //       // })
// // //       //    // Animate the all posts section
// // //       //    .to(allPostsRef.current, {
// // //       //       yPercent: -100,
// // //       //       ease: 'none',
// // //       //    }, '>-0.5');
// // //       tl.to(featuredRef.current, {
// // //          yPercent: -100,
// // //          ease: 'none',
// // //          duration: 3,
// // //        }).to(allPostsRef.current, {
// // //          yPercent: -100,
// // //          ease: 'none',
// // //          delay: 0.5,
// // //          duration: 1.5,
// // //        }, '>');

// // //       return () => {
// // //          lenisRef.current?.destroy();
// // //          tl.kill();
// // //          ScrollTrigger.getAll().forEach(t => t.kill());
// // //       };
// // //    }, []);

// // //    return (
// // //       <div
// // //          ref={containerRef}
// // //          className="myMainContainer relative w-full overflow-hidden bg-primary-950"
// // //          style={{ height: '300vh' }}  // Fixed height for proper scrolling
// // //       >
// // //          {/* Featured Post Section */}
// // //          <div
// // //             ref={featuredRef}
// // //             className="fixed top-0 right-0 h-screen bg-primary-950 z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// // //          >
// // //             <div className="relative h-full">
// // //                {featuredPost.cover_image && (
// // //                   <Image
// // //                      src={featuredPost.cover_image}
// // //                      alt={featuredPost.title}
// // //                      fill
// // //                      className="object-cover"
// // //                      priority
// // //                   />
// // //                )}
// // //                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
// // //                   <div className="max-w-4xl mx-auto text-center">
// // //                      <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
// // //                         {categories.find(c => c.id === featuredPost.category)?.name}
// // //                      </span>
// // //                      <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
// // //                      {featuredPost.excerpt && (
// // //                         <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
// // //                            {featuredPost.excerpt}
// // //                         </p>
// // //                      )}
// // //                      <Link
// // //                         href={`/blog/${featuredPost.slug}`}
// // //                         className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// // //                      >
// // //                         Read More
// // //                      </Link>
// // //                   </div>
// // //                </div>
// // //             </div>
// // //          </div>

// // //          {/* All Posts Grid */}
// // //          <div
// // //             ref={allPostsRef}
// // //             className="fixed top-0 right-0 h-screen z-20"
// // //             style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// // //          >
// // //             <div className="max-w-7xl mx-auto px-4 py-16">
// // //                <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
// // //                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                   {posts.map((post) => (
// // //                      <Link
// // //                         key={post.id}
// // //                         href={`/blog/${post.slug}`}
// // //                         className="group bg-primary-900/50 rounded-lg overflow-hidden hover:bg-primary-900/70 transition-colors"
// // //                      >
// // //                         {post.cover_image && (
// // //                            <div className="aspect-video relative">
// // //                               <Image
// // //                                  src={post.cover_image}
// // //                                  alt={post.title}
// // //                                  fill
// // //                                  className="object-cover"
// // //                               />
// // //                            </div>
// // //                         )}
// // //                         <div className="p-4">
// // //                            <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
// // //                               {categories.find(c => c.id === post.category)?.name}
// // //                            </span>
// // //                            <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
// // //                            {post.excerpt && (
// // //                               <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
// // //                            )}
// // //                         </div>
// // //                      </Link>
// // //                   ))}
// // //                </div>
// // //             </div>
// // //          </div>
// // //       </div>
// // //    );
// // // }
// // // // /* src/components/blog-parallax/BlogParallax.tsx */
// // // // 'use client';
// // // // import { useEffect, useRef, useState } from 'react';
// // // // import { gsap } from 'gsap';
// // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // import Image from 'next/image';
// // // // import Link from 'next/link';
// // // // import Lenis from '@studio-freight/lenis';
// // // // import { categories } from '@/data/categories';

// // // // gsap.registerPlugin(ScrollTrigger);

// // // // interface Post {
// // // //    id: string;
// // // //    title: string;
// // // //    excerpt?: string;
// // // //    cover_image?: string;
// // // //    slug: string;
// // // //    category: string;
// // // // }

// // // // interface BlogParallaxProps {
// // // //    featuredPost: Post;
// // // //    posts: Post[];
// // // // }

// // // // export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
// // // //    const containerRef = useRef<HTMLDivElement>(null);
// // // //    const featuredRef = useRef<HTMLDivElement>(null);
// // // //    const allPostsRef = useRef<HTMLDivElement>(null);
// // // //    const lenisRef = useRef<Lenis | null>(null);
// // // //    const [contentHeight, setContentHeight] = useState(0);

// // // //    // Calculate dynamic height based on content
// // // //    useEffect(() => {
// // // //       if (allPostsRef.current) {
// // // //          const gridContent = allPostsRef.current.querySelector('.grid');
// // // //          if (gridContent) {
// // // //             const height = gridContent.getBoundingClientRect().height;
// // // //             setContentHeight(height + 200); // Add padding
// // // //          }
// // // //       }
// // // //    }, [posts]);

// // // //    useEffect(() => {
// // // //       lenisRef.current = new Lenis({
// // // //          duration: 2,
// // // //          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // //          orientation: 'vertical',
// // // //          gestureOrientation: 'vertical',
// // // //          smoothWheel: true,
// // // //          wheelMultiplier: 1,
// // // //          touchMultiplier: 2,
// // // //       });

// // // //       function raf(time: number) {
// // // //          lenisRef.current?.raf(time);
// // // //          requestAnimationFrame(raf);
// // // //       }
// // // //       requestAnimationFrame(raf);

// // // //       if (!containerRef.current || !featuredRef.current || !allPostsRef.current) return;

// // // //       // Set up the main timeline
// // // //       const tl = gsap.timeline({
// // // //          scrollTrigger: {
// // // //             trigger: containerRef.current,
// // // //             start: 'top top',
// // // //             end: '+=200%',
// // // //             scrub: 1,
// // // //             pin: true,
// // // //             anticipatePin: 1,
// // // //             invalidateOnRefresh: true,
// // // //          },
// // // //       });

// // // //       // Animate the featured post section
// // // //       tl.to(featuredRef.current, {
// // // //          yPercent: -100,
// // // //          ease: 'none',
// // // //       })
// // // //       // Animate the all posts section
// // // //       .to(allPostsRef.current, {
// // // //          yPercent: -100,
// // // //          ease: 'none',
// // // //       }, '>-0.5');

// // // //       return () => {
// // // //          lenisRef.current?.destroy();
// // // //          tl.kill();
// // // //          ScrollTrigger.getAll().forEach(t => t.kill());
// // // //       };
// // // //    }, []);

// // // //    return (
// // // //       <div
// // // //          ref={containerRef}
// // // //          className="myMainContainer relative w-full overflow-hidden bg-primary-950"
// // // //          style={{ height: `${200 + contentHeight}px` }}  // Dynamic height
// // // //       >
// // // //          {/* Featured Post Section */}
// // // //          <div
// // // //             ref={featuredRef}
// // // //             className="fixed top-0 right-0 h-screen bg-primary-950 z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// // // //          >
// // // //             <div className="relative h-full">
// // // //                {featuredPost.cover_image && (
// // // //                   <Image
// // // //                      src={featuredPost.cover_image}
// // // //                      alt={featuredPost.title}
// // // //                      fill
// // // //                      className="object-cover"
// // // //                      priority
// // // //                   />
// // // //                )}
// // // //                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
// // // //                   <div className="max-w-4xl mx-auto text-center">
// // // //                      <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
// // // //                         {categories.find(c => c.id === featuredPost.category)?.name}
// // // //                      </span>
// // // //                      <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
// // // //                      {featuredPost.excerpt && (
// // // //                         <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
// // // //                            {featuredPost.excerpt}
// // // //                         </p>
// // // //                      )}
// // // //                      <Link
// // // //                         href={`/blog/${featuredPost.slug}`}
// // // //                         className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// // // //                      >
// // // //                         Read More
// // // //                      </Link>
// // // //                   </div>
// // // //                </div>
// // // //             </div>
// // // //          </div>

// // // //          {/* All Posts Grid */}
// // // //          <div
// // // //             ref={allPostsRef}
// // // //             className="fixed top-0 right-0 h-screen z-20"
// // // //             style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// // // //          >
// // // //             <div className="max-w-7xl mx-auto px-4 py-16">
// // // //                <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
// // // //                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //                   {posts.map((post) => (
// // // //                      <Link
// // // //                         key={post.id}
// // // //                         href={`/blog/${post.slug}`}
// // // //                         className="group bg-primary-900/50 rounded-lg overflow-hidden hover:bg-primary-900/70 transition-colors"
// // // //                      >
// // // //                         {post.cover_image && (
// // // //                            <div className="aspect-video relative">
// // // //                               <Image
// // // //                                  src={post.cover_image}
// // // //                                  alt={post.title}
// // // //                                  fill
// // // //                                  className="object-cover"
// // // //                               />
// // // //                            </div>
// // // //                         )}
// // // //                         <div className="p-4">
// // // //                            <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
// // // //                               {categories.find(c => c.id === post.category)?.name}
// // // //                            </span>
// // // //                            <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
// // // //                            {post.excerpt && (
// // // //                               <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
// // // //                            )}
// // // //                         </div>
// // // //                      </Link>
// // // //                   ))}
// // // //                </div>
// // // //             </div>
// // // //          </div>
// // // //       </div>
// // // //    );
// // // // }
// // // // // /* src/components/blog-parallax/BlogParallax.tsx */
// // // // // 'use client';
// // // // // import { useEffect, useRef, useState } from 'react';
// // // // // import { gsap } from 'gsap';
// // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // import Image from 'next/image';
// // // // // import Link from 'next/link';
// // // // // import Lenis from '@studio-freight/lenis';
// // // // // import { categories } from '@/data/categories';

// // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // interface Post {
// // // // //    id: string;
// // // // //    title: string;
// // // // //    excerpt?: string;
// // // // //    cover_image?: string;
// // // // //    slug: string;
// // // // //    category: string;
// // // // // }

// // // // // interface BlogParallaxProps {
// // // // //    featuredPost: Post;
// // // // //    posts: Post[];
// // // // // }

// // // // // export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
// // // // //    const containerRef = useRef<HTMLDivElement>(null);
// // // // //    const featuredRef = useRef<HTMLDivElement>(null);
// // // // //    const allPostsRef = useRef<HTMLDivElement>(null);
// // // // //    const lenisRef = useRef<Lenis | null>(null);
// // // // //    const [contentHeight, setContentHeight] = useState(0);

// // // // //    // Calculate dynamic height based on content
// // // // //    useEffect(() => {
// // // // //       if (allPostsRef.current) {
// // // // //          const gridContent = allPostsRef.current.querySelector('.grid');
// // // // //          if (gridContent) {
// // // // //             const height = gridContent.getBoundingClientRect().height;
// // // // //             setContentHeight(height + 200); // Add padding
// // // // //          }
// // // // //       }
// // // // //    }, [posts]);

// // // // //    useEffect(() => {
// // // // //       lenisRef.current = new Lenis({
// // // // //          duration: 2,
// // // // //          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // //          orientation: 'vertical',
// // // // //          gestureOrientation: 'vertical',
// // // // //          smoothWheel: true,
// // // // //          wheelMultiplier: 1,
// // // // //          touchMultiplier: 2,
// // // // //       });

// // // // //       function raf(time: number) {
// // // // //          lenisRef.current?.raf(time);
// // // // //          requestAnimationFrame(raf);
// // // // //       }
// // // // //       requestAnimationFrame(raf);

// // // // //       if (!containerRef.current) return;

// // // // //       const tl = gsap.timeline({
// // // // //          scrollTrigger: {
// // // // //             trigger: containerRef.current,
// // // // //             start: 'top top',
// // // // //             end: 'bottom bottom',
// // // // //             scrub: 2,
// // // // //             pin: true,
// // // // //          },
// // // // //       });

// // // // //       tl.to(featuredRef.current, {
// // // // //          yPercent: -100,
// // // // //          ease: 'none',
// // // // //          duration: 3,
// // // // //       });

// // // // //       return () => {
// // // // //          lenisRef.current?.destroy();
// // // // //          tl.kill();
// // // // //          ScrollTrigger.getAll().forEach(t => t.kill());
// // // // //       };
// // // // //    }, []);

// // // // //    return (
// // // // //       <div data-component="BlogParallax"
// // // // //          ref={containerRef}
// // // // //          className="myMainContainer relative w-full overflow-hidden bg-primary-950"
// // // // //          style={{ height: `${200 + contentHeight}px` }}  // Dynamic height
// // // // //       >
// // // // //          {/* Featured Post Section */}
// // // // //          <div
// // // // //             ref={featuredRef}
// // // // //             className="fixed top-0 right-0 h-screen bg-primary-950 z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // //          >
// // // // //             <div className="relative h-full">
// // // // //                {featuredPost.cover_image && (
// // // // //                   <Image
// // // // //                      src={featuredPost.cover_image}
// // // // //                      alt={featuredPost.title}
// // // // //                      fill
// // // // //                      className="object-cover"
// // // // //                      priority
// // // // //                   />
// // // // //                )}
// // // // //                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
// // // // //                   <div className="max-w-4xl mx-auto text-center">
// // // // //                      <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
// // // // //                         {categories.find(c => c.id === featuredPost.category)?.name}
// // // // //                      </span>
// // // // //                      <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
// // // // //                      {featuredPost.excerpt && (
// // // // //                         <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
// // // // //                            {featuredPost.excerpt}
// // // // //                         </p>
// // // // //                      )}
// // // // //                      <Link
// // // // //                         href={`/blog/${featuredPost.slug}`}
// // // // //                         className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// // // // //                      >
// // // // //                         Read More
// // // // //                      </Link>
// // // // //                   </div>
// // // // //                </div>
// // // // //             </div>
// // // // //          </div>

// // // // //          {/* All Posts Grid */}
// // // // //          <div
// // // // //             ref={allPostsRef}
// // // // //             className="fixed top-0 right-0 h-screen z-20"
// // // // //             style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// // // // //          >
// // // // //             <div className="max-w-7xl mx-auto px-4 py-16">
// // // // //                <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
// // // // //                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                   {posts.map((post) => (
// // // // //                      <Link
// // // // //                         key={post.id}
// // // // //                         href={`/blog/${post.slug}`}
// // // // //                         className="group bg-primary-900/50 rounded-lg overflow-hidden hover:bg-primary-900/70 transition-colors"
// // // // //                      >
// // // // //                         {post.cover_image && (
// // // // //                            <div className="aspect-video relative">
// // // // //                               <Image
// // // // //                                  src={post.cover_image}
// // // // //                                  alt={post.title}
// // // // //                                  fill
// // // // //                                  className="object-cover"
// // // // //                               />
// // // // //                            </div>
// // // // //                         )}
// // // // //                         <div className="p-4">
// // // // //                            <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
// // // // //                               {categories.find(c => c.id === post.category)?.name}
// // // // //                            </span>
// // // // //                            <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
// // // // //                            {post.excerpt && (
// // // // //                               <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
// // // // //                            )}
// // // // //                         </div>
// // // // //                      </Link>
// // // // //                   ))}
// // // // //                </div>
// // // // //             </div>
// // // // //          </div>
// // // // //       </div>
// // // // //    );
// // // // // }

// // // // // /***-|================================================================================|-***/

// // // // // // "use client";
// // // // // // import { useEffect, useRef } from 'react';
// // // // // // import { gsap } from 'gsap';
// // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // import Image from 'next/image';
// // // // // // import Link from 'next/link';
// // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // import { categories } from '@/data/categories';

// // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // interface Post {
// // // // // //    id: string;
// // // // // //    title: string;
// // // // // //    excerpt?: string;
// // // // // //    cover_image?: string;
// // // // // //    slug: string;
// // // // // //    category: string;
// // // // // // }

// // // // // // interface BlogParallaxProps {
// // // // // //    featuredPost: Post;
// // // // // //    posts: Post[];
// // // // // // }

// // // // // // export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
// // // // // //    const containerRef = useRef<HTMLDivElement>(null);
// // // // // //    const featuredRef = useRef<HTMLDivElement>(null);
// // // // // //    const allPostsRef = useRef<HTMLDivElement>(null);
// // // // // //    const lenisRef = useRef<Lenis | null>(null);

// // // // // //    useEffect(() => {
// // // // // //       lenisRef.current = new Lenis({
// // // // // //          duration: 2,
// // // // // //          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // //          orientation: 'vertical',
// // // // // //          gestureOrientation: 'vertical',
// // // // // //          smoothWheel: true,
// // // // // //          wheelMultiplier: 1,
// // // // // //          touchMultiplier: 2,
// // // // // //       });

// // // // // //       function raf(time: number) {
// // // // // //          lenisRef.current?.raf(time);
// // // // // //          requestAnimationFrame(raf);
// // // // // //       }
// // // // // //       requestAnimationFrame(raf);

// // // // // //       if (!containerRef.current) return;

// // // // // //       const tl = gsap.timeline({
// // // // // //          scrollTrigger: {
// // // // // //             trigger: containerRef.current,
// // // // // //             start: 'top top',
// // // // // //             end: 'bottom bottom',
// // // // // //             scrub: 2,
// // // // // //             pin: true,
// // // // // //          },
// // // // // //       });

// // // // // //       // Animate featured post up first
// // // // // //       tl.to(featuredRef.current, {
// // // // // //          yPercent: -100,
// // // // // //          ease: 'none',
// // // // // //          duration: 3,
// // // // // //       });

// // // // // //       // Then animate all posts section
// // // // // //       tl.to(allPostsRef.current, {
// // // // // //          yPercent: -100,
// // // // // //          ease: 'none',
// // // // // //          duration: 3,
// // // // // //       }, '>');

// // // // // //       return () => {
// // // // // //          lenisRef.current?.destroy();
// // // // // //          tl.kill();
// // // // // //          ScrollTrigger.getAll().forEach(t => t.kill());
// // // // // //       };
// // // // // //    }, []);

// // // // // //    return (
// // // // // //       <div ref={containerRef} className="myMainContainer relative h-[300vh] w-full overflow-hidden bg-primary-950">
// // // // // //          {/* Featured Post Section */}
// // // // // //          <div
// // // // // //             ref={featuredRef}
// // // // // //             className="fixed top-0 right-0 h-screen z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // //          >
// // // // // //             <div className="relative h-full">
// // // // // //                {featuredPost.cover_image && (
// // // // // //                   <Image
// // // // // //                      src={featuredPost.cover_image}
// // // // // //                      alt={featuredPost.title}
// // // // // //                      fill
// // // // // //                      className="object-cover"
// // // // // //                      priority
// // // // // //                   />
// // // // // //                )}
// // // // // //                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
// // // // // //                   <div className="max-w-4xl mx-auto text-center relative bottom-[-32rem]">
// // // // // //                      <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
// // // // // //                         {categories.find(c => c.id === featuredPost.category)?.name}
// // // // // //                      </span>
// // // // // //                      <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
// // // // // //                      {featuredPost.excerpt && (
// // // // // //                         <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
// // // // // //                            {featuredPost.excerpt}
// // // // // //                         </p>
// // // // // //                      )}
// // // // // //                      <Link
// // // // // //                         href={`/blog/${featuredPost.slug}`}
// // // // // //                         className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// // // // // //                      >
// // // // // //                         Read More
// // // // // //                      </Link>
// // // // // //                   </div>
// // // // // //                </div>
// // // // // //             </div>
// // // // // //          </div>

// // // // // //          {/* All Posts Section */}
// // // // // //          <div
// // // // // //             ref={allPostsRef}
// // // // // //             className="fixed top-0 right-0 h-screen z-20 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // //          >
// // // // // //             {/* <div className="min-h-screen bg-primary-900 p-8">
// // // // // //           <div className="max-w-7xl mx-auto"> */}
// // // // // //             <div className="h-screen overflow-y-auto py-16 bg-primary-900">
// // // // // //                <div className="max-w-7xl mx-auto px-4">
// // // // // //                   <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
// // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //                      {posts.map((post) => (
// // // // // //                         <Link
// // // // // //                            key={post.id}
// // // // // //                            href={`/blog/${post.slug}`}
// // // // // //                            className="group bg-primary-800/50 rounded-lg overflow-hidden hover:bg-primary-800/70 transition-colors"
// // // // // //                         >
// // // // // //                            {post.cover_image && (
// // // // // //                               <div className="aspect-video relative">
// // // // // //                                  <Image
// // // // // //                                     src={post.cover_image}
// // // // // //                                     alt={post.title}
// // // // // //                                     fill
// // // // // //                                     className="object-cover"
// // // // // //                                  />
// // // // // //                               </div>
// // // // // //                            )}
// // // // // //                            <div className="p-4">
// // // // // //                               <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
// // // // // //                                  {categories.find(c => c.id === post.category)?.name}
// // // // // //                               </span>
// // // // // //                               <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
// // // // // //                               {post.excerpt && (
// // // // // //                                  <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
// // // // // //                               )}
// // // // // //                            </div>
// // // // // //                         </Link>
// // // // // //                      ))}
// // // // // //                   </div>
// // // // // //                </div>
// // // // // //             </div>
// // // // // //          </div>
// // // // // //       </div>
// // // // // //    );
// // // // // // }
// // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // import { gsap } from 'gsap';
// // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // import Image from 'next/image';
// // // // // // // import Link from 'next/link';
// // // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // // import { categories } from '@/data/categories';

// // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // interface Post {
// // // // // // //    id: string;
// // // // // // //    title: string;
// // // // // // //    excerpt?: string;
// // // // // // //    cover_image?: string;
// // // // // // //    slug: string;
// // // // // // //    category: string;
// // // // // // // }

// // // // // // // interface BlogParallaxProps {
// // // // // // //    featuredPost: Post;
// // // // // // //    posts: Post[];
// // // // // // // }

// // // // // // // export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
// // // // // // //    const containerRef = useRef<HTMLDivElement>(null);
// // // // // // //    const featuredRef = useRef<HTMLDivElement>(null);
// // // // // // //    const allPostsRef = useRef<HTMLDivElement>(null);
// // // // // // //    const lenisRef = useRef<Lenis | null>(null);

// // // // // // //    useEffect(() => {
// // // // // // //       lenisRef.current = new Lenis({
// // // // // // //          duration: 1,
// // // // // // //          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // //          orientation: 'vertical',
// // // // // // //          gestureOrientation: 'vertical',
// // // // // // //          smoothWheel: true,
// // // // // // //          wheelMultiplier: 1,
// // // // // // //          touchMultiplier: 2,
// // // // // // //       });

// // // // // // //       function raf(time: number) {
// // // // // // //          lenisRef.current?.raf(time);
// // // // // // //          requestAnimationFrame(raf);
// // // // // // //       }
// // // // // // //       requestAnimationFrame(raf);

// // // // // // //       if (!containerRef.current) return;

// // // // // // //       const tl = gsap.timeline({
// // // // // // //          scrollTrigger: {
// // // // // // //             trigger: containerRef.current,
// // // // // // //             start: 'top top',
// // // // // // //             end: 'bottom bottom',
// // // // // // //             // end: '400% bottom', // Increased scroll length
// // // // // // //             scrub: 1,
// // // // // // //             pin: true,
// // // // // // //          },
// // // // // // //       });

// // // // // // //       // Animate featured post up first
// // // // // // //       tl.to(featuredRef.current, {
// // // // // // //          yPercent: -100,
// // // // // // //          ease: 'none',
// // // // // // //          duration: 1,
// // // // // // //       });

// // // // // // //       // Then animate all posts section
// // // // // // //       tl.to(allPostsRef.current, {
// // // // // // //          yPercent: -100,
// // // // // // //          ease: 'none',
// // // // // // //          duration: 1,
// // // // // // //          delay: .5,
// // // // // // //       }, '>');

// // // // // // //       return () => {
// // // // // // //          lenisRef.current?.destroy();
// // // // // // //          tl.kill();
// // // // // // //          ScrollTrigger.getAll().forEach(t => t.kill());
// // // // // // //       };
// // // // // // //    }, []);

// // // // // // //    return (
// // // // // // //       // <div ref={containerRef} className="myMainContainer relative h-[300vh] w-full overflow-hidden bg-primary-950">
// // // // // // //       <div ref={containerRef} className="myMainContainer relative h-[300vh] w-full overflow-hidden bg-primary-950">
// // // // // // //             {/* Featured Post Section */}
// // // // // // //             <div
// // // // // // //                ref={featuredRef}
// // // // // // //                className="fixed top-0 right-0 h-screen z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // // //             >
// // // // // // //                <div className="relative h-full">
// // // // // // //                   {featuredPost.cover_image && (
// // // // // // //                      <Image
// // // // // // //                         src={featuredPost.cover_image}
// // // // // // //                         alt={featuredPost.title}
// // // // // // //                         fill
// // // // // // //                         className="object-cover"
// // // // // // //                         priority
// // // // // // //                      />
// // // // // // //                   )}
// // // // // // //                   <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
// // // // // // //                      <div className="max-w-4xl mx-auto text-center">
// // // // // // //                         <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
// // // // // // //                            {categories.find(c => c.id === featuredPost.category)?.name}
// // // // // // //                         </span>
// // // // // // //                         <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
// // // // // // //                         {featuredPost.excerpt && (
// // // // // // //                            <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
// // // // // // //                               {featuredPost.excerpt}
// // // // // // //                            </p>
// // // // // // //                         )}
// // // // // // //                         <Link
// // // // // // //                            href={`/blog/${featuredPost.slug}`}
// // // // // // //                            className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// // // // // // //                         >
// // // // // // //                            Read More
// // // // // // //                         </Link>
// // // // // // //                      </div>
// // // // // // //                   </div>
// // // // // // //                </div>
// // // // // // //             </div>

// // // // // // //             {/* All Posts Section */}
// // // // // // //             <div
// // // // // // //                ref={allPostsRef}
// // // // // // //                className="fixed top-0 right-0 h-screen z-20 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // // //                // className="fixed top-0 right-0 h-auto min-h-screen z-20 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // // //                // className="fixed top-0 right-0 h-screen z-20 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // // //             //   className="fixed top-0 right-0 h-[200vh] z-20 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // // //             >
// // // // // // //                {/* <div className="min-h-[300vh] bg-primary-900 p-8"> */}
// // // // // // //                {/* <div className="min-h-screen bg-primary-900 p-8">
// // // // // // //                   <div className="max-w-7xl mx-auto"> */}
// // // // // // //                {/* <div className="py-16 bg-primary-900">
// // // // // // //                   <div className="max-w-7xl mx-auto px-4"> */}
// // // // // // //                <div className="h-screen overflow-y-auto py-16 bg-primary-900">
// // // // // // //                   <div className="max-w-7xl mx-auto px-4">
// // // // // // //                      <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
// // // // // // //                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // //                         {posts.map((post) => (
// // // // // // //                            <Link
// // // // // // //                               key={post.id}
// // // // // // //                               href={`/blog/${post.slug}`}
// // // // // // //                               className="group bg-primary-800/50 rounded-lg overflow-hidden hover:bg-primary-800/70 transition-colors"
// // // // // // //                            >
// // // // // // //                               {post.cover_image && (
// // // // // // //                                  <div className="aspect-video relative">
// // // // // // //                                     <Image
// // // // // // //                                        src={post.cover_image}
// // // // // // //                                        alt={post.title}
// // // // // // //                                        fill
// // // // // // //                                        className="object-cover"
// // // // // // //                                     />
// // // // // // //                                  </div>
// // // // // // //                               )}
// // // // // // //                               <div className="p-4">
// // // // // // //                                  <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
// // // // // // //                                     {categories.find(c => c.id === post.category)?.name}
// // // // // // //                                  </span>
// // // // // // //                                  <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
// // // // // // //                                  {post.excerpt && (
// // // // // // //                                     <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
// // // // // // //                                  )}
// // // // // // //                               </div>
// // // // // // //                            </Link>
// // // // // // //                         ))}
// // // // // // //                      </div>
// // // // // // //                   </div>
// // // // // // //                </div>
// // // // // // //             </div>
// // // // // // //          </div>
// // // // // // //          );
// // // // // // // }


// // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // import { gsap } from 'gsap';
// // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // import Image from 'next/image';
// // // // // // // // import Link from 'next/link';
// // // // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // // // import { categories } from '@/data/categories';

// // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // interface Post {
// // // // // // // //   id: string;
// // // // // // // //   title: string;
// // // // // // // //   excerpt?: string;
// // // // // // // //   cover_image?: string;
// // // // // // // //   slug: string;
// // // // // // // //   category: string;
// // // // // // // // }

// // // // // // // // interface BlogParallaxProps {
// // // // // // // //   featuredPost: Post;
// // // // // // // //   posts: Post[];
// // // // // // // // }

// // // // // // // // export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
// // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // //   const featuredRef = useRef<HTMLDivElement>(null);
// // // // // // // //   const allPostsRef = useRef<HTMLDivElement>(null);
// // // // // // // //   const contentRef = useRef<HTMLDivElement>(null);
// // // // // // // //   const lenisRef = useRef<Lenis | null>(null);

// // // // // // // //   useEffect(() => {
// // // // // // // //     lenisRef.current = new Lenis({
// // // // // // // //       duration: 2,
// // // // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // // //       orientation: 'vertical',
// // // // // // // //       gestureOrientation: 'vertical',
// // // // // // // //       smoothWheel: true,
// // // // // // // //       wheelMultiplier: 1,
// // // // // // // //       touchMultiplier: 2,
// // // // // // // //     });

// // // // // // // //     function raf(time: number) {
// // // // // // // //       lenisRef.current?.raf(time);
// // // // // // // //       requestAnimationFrame(raf);
// // // // // // // //     }
// // // // // // // //     requestAnimationFrame(raf);

// // // // // // // //     if (!containerRef.current) return;

// // // // // // // //     const tl = gsap.timeline({
// // // // // // // //       scrollTrigger: {
// // // // // // // //         trigger: containerRef.current,
// // // // // // // //         start: 'top top',
// // // // // // // //         end: 'bottom bottom',
// // // // // // // //         scrub: 2,
// // // // // // // //         pin: true,
// // // // // // // //       },
// // // // // // // //     });

// // // // // // // //     tl.to(featuredRef.current, {
// // // // // // // //       yPercent: -100,
// // // // // // // //       ease: 'none',
// // // // // // // //       duration: 3,
// // // // // // // //     });

// // // // // // // //     tl.to(contentRef.current, {
// // // // // // // //       yPercent: -50,
// // // // // // // //       ease: 'none',
// // // // // // // //       duration: 3,
// // // // // // // //     }, ">-1.5");

// // // // // // // //     return () => {
// // // // // // // //       lenisRef.current?.destroy();
// // // // // // // //       tl.kill();
// // // // // // // //       ScrollTrigger.getAll().forEach(t => t.kill());
// // // // // // // //     };
// // // // // // // //   }, []);

// // // // // // // //   return (
// // // // // // // //     <div ref={containerRef} className="myMainContainer relative h-[200vh] w-full overflow-hidden bg-primary-950">
// // // // // // // //       {/* Featured Post Section */}
// // // // // // // //       <div
// // // // // // // //         ref={featuredRef}
// // // // // // // //         className="fixed top-0 right-0 h-screen bg-primary-950 z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // // // //       >
// // // // // // // //         <div className="relative h-full">
// // // // // // // //           {featuredPost.cover_image && (
// // // // // // // //             <Image
// // // // // // // //               src={featuredPost.cover_image}
// // // // // // // //               alt={featuredPost.title}
// // // // // // // //               fill
// // // // // // // //               className="object-cover"
// // // // // // // //               priority
// // // // // // // //             />
// // // // // // // //           )}
// // // // // // // //           <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
// // // // // // // //             <div className="max-w-4xl mx-auto text-center">
// // // // // // // //               <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
// // // // // // // //                 {categories.find(c => c.id === featuredPost.category)?.name}
// // // // // // // //               </span>
// // // // // // // //               <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
// // // // // // // //               {featuredPost.excerpt && (
// // // // // // // //                 <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
// // // // // // // //                   {featuredPost.excerpt}
// // // // // // // //                 </p>
// // // // // // // //               )}
// // // // // // // //               <Link
// // // // // // // //                 href={`/blog/${featuredPost.slug}`}
// // // // // // // //                 className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// // // // // // // //               >
// // // // // // // //                 Read More
// // // // // // // //               </Link>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* All Posts Grid */}
// // // // // // // //       <div
// // // // // // // //         ref={allPostsRef}
// // // // // // // //         className="fixed top-0 right-0 h-[200vh] z-20"
// // // // // // // //         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// // // // // // // //       >
// // // // // // // //         <div
// // // // // // // //           ref={contentRef}
// // // // // // // //           className="max-w-7xl mx-auto px-4 py-16"
// // // // // // // //         >
// // // // // // // //           <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
// // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // //             {posts.map((post) => (
// // // // // // // //               <Link
// // // // // // // //                 key={post.id}
// // // // // // // //                 href={`/blog/${post.slug}`}
// // // // // // // //                 className="group bg-primary-900/50 rounded-lg overflow-hidden hover:bg-primary-900/70 transition-colors"
// // // // // // // //               >
// // // // // // // //                 {post.cover_image && (
// // // // // // // //                   <div className="aspect-video relative">
// // // // // // // //                     <Image
// // // // // // // //                       src={post.cover_image}
// // // // // // // //                       alt={post.title}
// // // // // // // //                       fill
// // // // // // // //                       className="object-cover"
// // // // // // // //                     />
// // // // // // // //                   </div>
// // // // // // // //                 )}
// // // // // // // //                 <div className="p-4">
// // // // // // // //                   <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
// // // // // // // //                     {categories.find(c => c.id === post.category)?.name}
// // // // // // // //                   </span>
// // // // // // // //                   <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
// // // // // // // //                   {post.excerpt && (
// // // // // // // //                     <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
// // // // // // // //                   )}
// // // // // // // //                 </div>
// // // // // // // //               </Link>
// // // // // // // //             ))}
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }



// // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // import Image from 'next/image';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // // // // import { categories } from '@/data/categories';

// // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // interface Post {
// // // // // // // // //   id: string;
// // // // // // // // //   title: string;
// // // // // // // // //   excerpt?: string;
// // // // // // // // //   cover_image?: string;
// // // // // // // // //   slug: string;
// // // // // // // // //   category: string;
// // // // // // // // // }

// // // // // // // // // interface BlogParallaxProps {
// // // // // // // // //   featuredPost: Post;
// // // // // // // // //   posts: Post[];
// // // // // // // // // }

// // // // // // // // // export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
// // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // //   const featuredRef = useRef<HTMLDivElement>(null);
// // // // // // // // //   const allPostsRef = useRef<HTMLDivElement>(null);
// // // // // // // // //   const contentRef = useRef<HTMLDivElement>(null);
// // // // // // // // //   const lenisRef = useRef<Lenis | null>(null);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     lenisRef.current = new Lenis({
// // // // // // // // //       duration: 2,
// // // // // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // // // //       orientation: 'vertical',
// // // // // // // // //       gestureOrientation: 'vertical',
// // // // // // // // //       smoothWheel: true,
// // // // // // // // //       wheelMultiplier: 1,
// // // // // // // // //       touchMultiplier: 2,
// // // // // // // // //     });

// // // // // // // // //     function raf(time: number) {
// // // // // // // // //       lenisRef.current?.raf(time);
// // // // // // // // //       requestAnimationFrame(raf);
// // // // // // // // //     }
// // // // // // // // //     requestAnimationFrame(raf);

// // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // //     const tl = gsap.timeline({
// // // // // // // // //       scrollTrigger: {
// // // // // // // // //         trigger: containerRef.current,
// // // // // // // // //         start: 'top top',
// // // // // // // // //         end: 'bottom bottom',
// // // // // // // // //         scrub: 2,
// // // // // // // // //         pin: true,
// // // // // // // // //       },
// // // // // // // // //     });

// // // // // // // // //     tl.to(featuredRef.current, {
// // // // // // // // //       yPercent: -100,
// // // // // // // // //       ease: 'none',
// // // // // // // // //       duration: 3,
// // // // // // // // //     });

// // // // // // // // //     tl.to(contentRef.current, {
// // // // // // // // //       yPercent: -50,
// // // // // // // // //       ease: 'none',
// // // // // // // // //       duration: 3,
// // // // // // // // //     }, ">-1.5");

// // // // // // // // //     return () => {
// // // // // // // // //       lenisRef.current?.destroy();
// // // // // // // // //       tl.kill();
// // // // // // // // //       ScrollTrigger.getAll().forEach(t => t.kill());
// // // // // // // // //     };
// // // // // // // // //   }, []);

// // // // // // // // //   return (
// // // // // // // // //     <div ref={containerRef} className="myMainContainer relative h-[200vh] w-full overflow-hidden bg-primary-950">
// // // // // // // // //       {/* Featured Post Section */}
// // // // // // // // //       <div
// // // // // // // // //         ref={featuredRef}
// // // // // // // // //         className="fixed top-0 right-0 h-screen bg-primary-950 z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // // // // //       >
// // // // // // // // //         <div className="relative h-full">
// // // // // // // // //           {featuredPost.cover_image && (
// // // // // // // // //             <Image
// // // // // // // // //               src={featuredPost.cover_image}
// // // // // // // // //               alt={featuredPost.title}
// // // // // // // // //               fill
// // // // // // // // //               className="object-cover"
// // // // // // // // //               priority
// // // // // // // // //             />
// // // // // // // // //           )}
// // // // // // // // //           <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
// // // // // // // // //             <div className="max-w-4xl mx-auto text-center">
// // // // // // // // //               <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
// // // // // // // // //                 {categories.find(c => c.id === featuredPost.category)?.name}
// // // // // // // // //               </span>
// // // // // // // // //               <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
// // // // // // // // //               {featuredPost.excerpt && (
// // // // // // // // //                 <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
// // // // // // // // //                   {featuredPost.excerpt}
// // // // // // // // //                 </p>
// // // // // // // // //               )}
// // // // // // // // //               <Link
// // // // // // // // //                 href={`/blog/${featuredPost.slug}`}
// // // // // // // // //                 className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// // // // // // // // //               >
// // // // // // // // //                 Read More
// // // // // // // // //               </Link>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* All Posts Grid */}
// // // // // // // // //       <div
// // // // // // // // //         ref={allPostsRef}
// // // // // // // // //         className="fixed top-0 right-0 h-screen z-20"
// // // // // // // // //         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// // // // // // // // //       >
// // // // // // // // //         <div className="max-w-7xl mx-auto px-4 py-16">
// // // // // // // // //           <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
// // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // // //             {posts.map((post) => (
// // // // // // // // //               <Link
// // // // // // // // //                 key={post.id}
// // // // // // // // //                 href={`/blog/${post.slug}`}
// // // // // // // // //                 className="group bg-primary-900/50 rounded-lg overflow-hidden hover:bg-primary-900/70 transition-colors"
// // // // // // // // //               >
// // // // // // // // //                 {post.cover_image && (
// // // // // // // // //                   <div className="aspect-video relative">
// // // // // // // // //                     <Image
// // // // // // // // //                       src={post.cover_image}
// // // // // // // // //                       alt={post.title}
// // // // // // // // //                       fill
// // // // // // // // //                       className="object-cover"
// // // // // // // // //                     />
// // // // // // // // //                   </div>
// // // // // // // // //                 )}
// // // // // // // // //                 <div className="p-4">
// // // // // // // // //                   <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
// // // // // // // // //                     {categories.find(c => c.id === post.category)?.name}
// // // // // // // // //                   </span>
// // // // // // // // //                   <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
// // // // // // // // //                   {post.excerpt && (
// // // // // // // // //                     <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
// // // // // // // // //                   )}
// // // // // // // // //                 </div>
// // // // // // // // //               </Link>
// // // // // // // // //             ))}
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }



// // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // import Image from 'next/image';
// // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // // // // // import { categories } from '@/data/categories';

// // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // interface Post {
// // // // // // // // // //   id: string;
// // // // // // // // // //   title: string;
// // // // // // // // // //   excerpt?: string;
// // // // // // // // // //   cover_image?: string;
// // // // // // // // // //   slug: string;
// // // // // // // // // //   category: string;
// // // // // // // // // // }

// // // // // // // // // // interface BlogParallaxProps {
// // // // // // // // // //   featuredPost: Post;
// // // // // // // // // //   posts: Post[];
// // // // // // // // // // }

// // // // // // // // // // export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
// // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // //   const featuredRef = useRef<HTMLDivElement>(null);
// // // // // // // // // //   const allPostsRef = useRef<HTMLDivElement>(null);
// // // // // // // // // //   const contentRef = useRef<HTMLDivElement>(null);
// // // // // // // // // //   const lenisRef = useRef<Lenis | null>(null);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     lenisRef.current = new Lenis({
// // // // // // // // // //       duration: 2,
// // // // // // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // // // // //       orientation: 'vertical',
// // // // // // // // // //       gestureOrientation: 'vertical',
// // // // // // // // // //       smoothWheel: true,
// // // // // // // // // //       wheelMultiplier: 1,
// // // // // // // // // //       touchMultiplier: 2,
// // // // // // // // // //     });

// // // // // // // // // //     function raf(time: number) {
// // // // // // // // // //       lenisRef.current?.raf(time);
// // // // // // // // // //       requestAnimationFrame(raf);
// // // // // // // // // //     }
// // // // // // // // // //     requestAnimationFrame(raf);

// // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // //     const tl = gsap.timeline({
// // // // // // // // // //       scrollTrigger: {
// // // // // // // // // //         trigger: containerRef.current,
// // // // // // // // // //         start: 'top top',
// // // // // // // // // //         end: 'bottom bottom',
// // // // // // // // // //         scrub: 2,
// // // // // // // // // //         pin: true,
// // // // // // // // // //       },
// // // // // // // // // //     });

// // // // // // // // // //     tl.to(featuredRef.current, {
// // // // // // // // // //       yPercent: -100,
// // // // // // // // // //       ease: 'none',
// // // // // // // // // //       duration: 3,
// // // // // // // // // //     });

// // // // // // // // // //     return () => {
// // // // // // // // // //       lenisRef.current?.destroy();
// // // // // // // // // //       tl.kill();
// // // // // // // // // //       ScrollTrigger.getAll().forEach(t => t.kill());
// // // // // // // // // //     };
// // // // // // // // // //   }, []);

// // // // // // // // // //   return (
// // // // // // // // // //     <div ref={containerRef} className="myMainContainer relative h-[200vh] w-full overflow-hidden bg-primary-950">
// // // // // // // // // //       {/* Featured Post Section */}
// // // // // // // // // //       <div
// // // // // // // // // //         ref={featuredRef}
// // // // // // // // // //         className="fixed top-0 right-0 h-screen bg-primary-950 z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // // // // // //       >
// // // // // // // // // //         <div className="relative h-full">
// // // // // // // // // //           {featuredPost.cover_image && (
// // // // // // // // // //             <Image
// // // // // // // // // //               src={featuredPost.cover_image}
// // // // // // // // // //               alt={featuredPost.title}
// // // // // // // // // //               fill
// // // // // // // // // //               className="object-cover"
// // // // // // // // // //               priority
// // // // // // // // // //             />
// // // // // // // // // //           )}
// // // // // // // // // //           <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
// // // // // // // // // //             <div className="max-w-4xl mx-auto text-center">
// // // // // // // // // //               <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
// // // // // // // // // //                 {categories.find(c => c.id === featuredPost.category)?.name}
// // // // // // // // // //               </span>
// // // // // // // // // //               <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
// // // // // // // // // //               {featuredPost.excerpt && (
// // // // // // // // // //                 <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
// // // // // // // // // //                   {featuredPost.excerpt}
// // // // // // // // // //                 </p>
// // // // // // // // // //               )}
// // // // // // // // // //               <Link
// // // // // // // // // //                 href={`/blog/${featuredPost.slug}`}
// // // // // // // // // //                 className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// // // // // // // // // //               >
// // // // // // // // // //                 Read More
// // // // // // // // // //               </Link>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* All Posts Grid */}
// // // // // // // // // //       <div
// // // // // // // // // //         ref={allPostsRef}
// // // // // // // // // //         className="fixed top-0 right-0 h-screen z-20"
// // // // // // // // // //         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// // // // // // // // // //       >
// // // // // // // // // //         <div className="max-w-7xl mx-auto px-4 py-16">
// // // // // // // // // //           <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
// // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // // // //             {posts.map((post) => (
// // // // // // // // // //               <Link
// // // // // // // // // //                 key={post.id}
// // // // // // // // // //                 href={`/blog/${post.slug}`}
// // // // // // // // // //                 className="group bg-primary-900/50 rounded-lg overflow-hidden hover:bg-primary-900/70 transition-colors"
// // // // // // // // // //               >
// // // // // // // // // //                 {post.cover_image && (
// // // // // // // // // //                   <div className="aspect-video relative">
// // // // // // // // // //                     <Image
// // // // // // // // // //                       src={post.cover_image}
// // // // // // // // // //                       alt={post.title}
// // // // // // // // // //                       fill
// // // // // // // // // //                       className="object-cover"
// // // // // // // // // //                     />
// // // // // // // // // //                   </div>
// // // // // // // // // //                 )}
// // // // // // // // // //                 <div className="p-4">
// // // // // // // // // //                   <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
// // // // // // // // // //                     {categories.find(c => c.id === post.category)?.name}
// // // // // // // // // //                   </span>
// // // // // // // // // //                   <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
// // // // // // // // // //                   {post.excerpt && (
// // // // // // // // // //                     <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
// // // // // // // // // //                   )}
// // // // // // // // // //                 </div>
// // // // // // // // // //               </Link>
// // // // // // // // // //             ))}
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // // // "use client";
// // // // // // // // // // // import { useEffect, useRef } from 'react';
// // // // // // // // // // // import { gsap } from 'gsap';
// // // // // // // // // // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // // // // // // // // // import Image from 'next/image';
// // // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // // import Lenis from '@studio-freight/lenis';
// // // // // // // // // // // import { categories } from '@/data/categories';

// // // // // // // // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // // // // // // // interface Post {
// // // // // // // // // // //   id: string;
// // // // // // // // // // //   title: string;
// // // // // // // // // // //   excerpt?: string;
// // // // // // // // // // //   cover_image?: string;
// // // // // // // // // // //   slug: string;
// // // // // // // // // // //   category: string;
// // // // // // // // // // // }

// // // // // // // // // // // interface BlogParallaxProps {
// // // // // // // // // // //   featuredPost: Post;
// // // // // // // // // // //   posts: Post[];
// // // // // // // // // // // }

// // // // // // // // // // // export default function BlogParallax({ featuredPost, posts }: BlogParallaxProps) {
// // // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // //   const featuredRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // //   const allPostsRef = useRef<HTMLDivElement>(null);
// // // // // // // // // // //   const lenisRef = useRef<Lenis | null>(null);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     lenisRef.current = new Lenis({
// // // // // // // // // // //       duration: 2,
// // // // // // // // // // //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// // // // // // // // // // //       orientation: 'vertical',
// // // // // // // // // // //       gestureOrientation: 'vertical',
// // // // // // // // // // //       smoothWheel: true,
// // // // // // // // // // //       wheelMultiplier: 1,
// // // // // // // // // // //       touchMultiplier: 2,
// // // // // // // // // // //     });

// // // // // // // // // // //     function raf(time: number) {
// // // // // // // // // // //       lenisRef.current?.raf(time);
// // // // // // // // // // //       requestAnimationFrame(raf);
// // // // // // // // // // //     }
// // // // // // // // // // //     requestAnimationFrame(raf);

// // // // // // // // // // //     if (!containerRef.current) return;

// // // // // // // // // // //     const tl = gsap.timeline({
// // // // // // // // // // //       scrollTrigger: {
// // // // // // // // // // //         trigger: containerRef.current,
// // // // // // // // // // //         start: 'top top',
// // // // // // // // // // //         end: 'bottom bottom',
// // // // // // // // // // //         scrub: 2,
// // // // // // // // // // //         pin: true,
// // // // // // // // // // //       },
// // // // // // // // // // //     });

// // // // // // // // // // //     tl.to(featuredRef.current, {
// // // // // // // // // // //       yPercent: -100,
// // // // // // // // // // //       ease: 'none',
// // // // // // // // // // //       duration: 3,
// // // // // // // // // // //     });

// // // // // // // // // // //     return () => {
// // // // // // // // // // //       lenisRef.current?.destroy();
// // // // // // // // // // //       tl.kill();
// // // // // // // // // // //       ScrollTrigger.getAll().forEach(t => t.kill());
// // // // // // // // // // //     };
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div ref={containerRef} className="myMainContainer relative h-[200vh] w-full overflow-hidden bg-primary-950">
// // // // // // // // // // //       {/* Featured Post Section */}
// // // // // // // // // // //       <div
// // // // // // // // // // //         ref={featuredRef}
// // // // // // // // // // //         className="fixed top-0 right-0 h-screen bg-primary-950 z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// // // // // // // // // // //       >
// // // // // // // // // // //         <div className="relative h-full">
// // // // // // // // // // //           {featuredPost.cover_image && (
// // // // // // // // // // //             <Image
// // // // // // // // // // //               src={featuredPost.cover_image}
// // // // // // // // // // //               alt={featuredPost.title}
// // // // // // // // // // //               fill
// // // // // // // // // // //               className="object-cover"
// // // // // // // // // // //               priority
// // // // // // // // // // //             />
// // // // // // // // // // //           )}
// // // // // // // // // // //           <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
// // // // // // // // // // //             <div className="max-w-4xl mx-auto text-center">
// // // // // // // // // // //               <span className={`text-sm ${categories.find(c => c.id === featuredPost.category)?.textColor}`}>
// // // // // // // // // // //                 {categories.find(c => c.id === featuredPost.category)?.name}
// // // // // // // // // // //               </span>
// // // // // // // // // // //               <h1 className="text-4xl md:text-6xl font-garamond mb-4">{featuredPost.title}</h1>
// // // // // // // // // // //               {featuredPost.excerpt && (
// // // // // // // // // // //                 <p className="text-xl mb-8 max-w-2xl mx-auto font-nunitosans text-primary-50">
// // // // // // // // // // //                   {featuredPost.excerpt}
// // // // // // // // // // //                 </p>
// // // // // // // // // // //               )}
// // // // // // // // // // //               <Link
// // // // // // // // // // //                 href={`/blog/${featuredPost.slug}`}
// // // // // // // // // // //                 className="px-8 py-3 bg-white text-primary-950 rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// // // // // // // // // // //               >
// // // // // // // // // // //                 Read More
// // // // // // // // // // //               </Link>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* All Posts Grid */}
// // // // // // // // // // //       <div
// // // // // // // // // // //         ref={allPostsRef}
// // // // // // // // // // //         className="fixed top-0 right-0 h-screen z-20"
// // // // // // // // // // //         style={{ margin: 0, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
// // // // // // // // // // //       >
// // // // // // // // // // //         <div className="max-w-7xl mx-auto px-4 py-16">
// // // // // // // // // // //           <h2 className="text-3xl font-garamond text-white mb-8">Latest Posts</h2>
// // // // // // // // // // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // // // // //             {posts.map((post) => (
// // // // // // // // // // //               <Link
// // // // // // // // // // //                 key={post.id}
// // // // // // // // // // //                 href={`/blog/${post.slug}`}
// // // // // // // // // // //                 className="group bg-primary-900/50 rounded-lg overflow-hidden hover:bg-primary-900/70 transition-colors"
// // // // // // // // // // //               >
// // // // // // // // // // //                 {post.cover_image && (
// // // // // // // // // // //                   <div className="aspect-video relative">
// // // // // // // // // // //                     <Image
// // // // // // // // // // //                       src={post.cover_image}
// // // // // // // // // // //                       alt={post.title}
// // // // // // // // // // //                       fill
// // // // // // // // // // //                       className="object-cover"
// // // // // // // // // // //                     />
// // // // // // // // // // //                   </div>
// // // // // // // // // // //                 )}
// // // // // // // // // // //                 <div className="p-4">
// // // // // // // // // // //                   <span className={`text-sm ${categories.find(c => c.id === post.category)?.textColor}`}>
// // // // // // // // // // //                     {categories.find(c => c.id === post.category)?.name}
// // // // // // // // // // //                   </span>
// // // // // // // // // // //                   <h3 className="text-xl font-garamond text-white mb-2">{post.title}</h3>
// // // // // // // // // // //                   {post.excerpt && (
// // // // // // // // // // //                     <p className="text-primary-100 line-clamp-2">{post.excerpt}</p>
// // // // // // // // // // //                   )}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </Link>
// // // // // // // // // // //             ))}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }