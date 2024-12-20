/*-= src/components/BlogParallax.tsx =-*/
/*-= Blog Parallax Component =-*/
/*-============================================================
Created on: December 19, 2024
================================================================-*/
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import Lenis from '@studio-freight/lenis';
import { categories } from '@/data/categories';

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
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
        pin: true,
      },
    });

    tl.to(featuredRef.current, {
      yPercent: -100,
      ease: 'none',
      duration: 3,
    });

    return () => {
      lenisRef.current?.destroy();
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="myMainContainer relative h-[200vh] w-full overflow-hidden bg-primary-950">
      {/* Featured Post Section */}
      <div
        ref={featuredRef}
        className="fixed top-0 right-0 h-screen bg-primary-950 z-30 m-0 w-screen left-1/2 -translate-x-1/2"
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
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 to-transparent flex flex-col items-center justify-center text-white px-4">
            <div className="max-w-4xl mx-auto text-center">
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

// 'use client';

// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Lenis from '@studio-freight/lenis';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useRef } from 'react';
// import { Post } from '@/types/blog';
// import { categories, CategoryId } from '@/data/categories';

// gsap.registerPlugin(ScrollTrigger);

// interface BlogParallaxProps {
//   posts: Post[];
// }

// export default function BlogParallax({ posts }: BlogParallaxProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const section1Ref = useRef<HTMLDivElement>(null);
//   const section2Ref = useRef<HTMLDivElement>(null);
//   const lenisRef = useRef<Lenis | null>(null);

//   const latestTechPost = posts.find(post => post.category === 'tech');
//   const remainingPosts = posts.filter(post => post.id !== latestTechPost?.id);

//   useEffect(() => {
//     lenisRef.current = new Lenis({
//       duration: 2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       orientation: 'vertical',
//       gestureOrientation: 'vertical',
//       smoothWheel: true,
//       wheelMultiplier: 1,
//       touchMultiplier: 2,
//     });

//     function raf(time: number) {
//       lenisRef.current?.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     if (!containerRef.current) return;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: 'top top',
//         end: 'bottom bottom',
//         scrub: 2,
//         pin: true,
//       },
//     });

//     tl.to(section1Ref.current, {
//       yPercent: -100,
//       ease: 'none',
//       duration: 3,
//     });

//     return () => {
//       lenisRef.current?.destroy();
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, []);

//   if (!latestTechPost) return null;

//   return (
//     <div ref={containerRef} className="myMainContainer relative  overflow-visible bg-red-600">
//     {/* <div ref={containerRef} className="myMainContainer relative h-[300vh] w-full overflow-hidden bg-red-600"> */}

//       {/* Featured Tech Article */}
//       <div data-component="FeaturedTechArticle"
//         ref={section1Ref}
//         className="fixed top-0 left-0 w-screen h-screen bg-accent-500 z-30"
//       >
//         <div className="relative h-full">
//           {latestTechPost.cover_image ? (
//             <Image
//               src={latestTechPost.cover_image}
//               alt={latestTechPost.title}
//               fill
//               className="object-cover opacity-15"
//               priority
//             />
//           ) : (
//             <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700" />
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent flex flex-col items-center justify-center text-white px-4">
//             <div className="text-sm font-medium text-primary-300 mb-2">
//               {categories.find(c => c.id === 'tech')?.name || 'Tech Articles'}
//             </div>
//             <h1 className="text-4xl md:text-6xl font-garamond mb-4 max-w-4xl text-center">
//               {latestTechPost.title}
//             </h1>
//             <p className="text-lg md:text-xl mb-8 max-w-2xl text-center font-nunitosans">
//               {latestTechPost.excerpt}
//             </p>
//             <Link
//               href={`/blog/${latestTechPost.slug}`}
//               className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
//             >
//               Read Article
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* <div
//          ref={section2Ref}
//          className="fixed top-[100vh] left-0 w-full bg-gradient-to-b from-black to-gray-900 z-20 py-24">
//          HELLO WORLD
//       </div> */}


//       {/* All Posts Grid */}
//       <div data-component="AllPostsGridContainer"
//         ref={section2Ref}
//         className="fixed top-[100vh] left-0 w-full bg-gradient-to-b from-black to-gray-900 z-20 py-24"
//          >
//         <div data-component="AllPostsGrid" className="max-w-7xl mx-auto px-4">
//           <h2 className="text-4xl font-garamond text-white mb-12">All Articles</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {remainingPosts.map((post) => (
//               <Link
//                 key={post.id}
//                 href={`/blog/${post.slug}`}
//                 className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all"
//               >
//                 <div className="aspect-[16/9] relative bg-gray-900">
//                   {post.cover_image ? (
//                     <Image
//                       src={post.cover_image}
//                       alt={post.title}
//                       fill
//                       className="object-cover transition-transform duration-500 group-hover:scale-105"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                   ) : (
//                     <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />
//                   )}
//                 </div>
//                 <div className="p-6">
//                   <div className="text-sm font-medium text-primary-400 mb-2">
//                     {categories.find(c => c.id === post.category)?.name || 'Uncategorized'}
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">
//                     {post.title}
//                   </h3>
//                   <p className="text-gray-300 text-sm line-clamp-2">
//                     {post.excerpt}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // 'use client';

// // import { gsap } from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // import Lenis from '@studio-freight/lenis';
// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { useEffect, useRef } from 'react';
// // import { Post } from '@/types/blog';
// // import { categories, CategoryId } from '@/data/categories';

// // gsap.registerPlugin(ScrollTrigger);

// // interface BlogParallaxProps {
// //   posts: Post[];
// // }

// // export default function BlogParallax({ posts }: BlogParallaxProps) {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const section1Ref = useRef<HTMLDivElement>(null);
// //   const section2Ref = useRef<HTMLDivElement>(null);
// //   const lenisRef = useRef<Lenis | null>(null);

// //   // Get the latest tech post for the hero section
// //   const latestTechPost = posts.find(post => post.category === 'tech');
// //   const remainingPosts = posts.filter(post => post.id !== latestTechPost?.id);

// //   useEffect(() => {
// //     lenisRef.current = new Lenis({
// //       duration: 2,
// //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
// //       orientation: 'vertical',
// //       gestureOrientation: 'vertical',
// //       smoothWheel: true,
// //       wheelMultiplier: 1,
// //       touchMultiplier: 2,
// //     });

// //     function raf(time: number) {
// //       lenisRef.current?.raf(time);
// //       requestAnimationFrame(raf);
// //     }
// //     requestAnimationFrame(raf);

// //     if (!containerRef.current) return;

// //     const tl = gsap.timeline({
// //       scrollTrigger: {
// //         trigger: containerRef.current,
// //         start: 'top top',
// //         end: 'bottom bottom',
// //         scrub: 2,
// //         pin: true,
// //       },
// //     });

// //     tl.to(section1Ref.current, {
// //       yPercent: -100,
// //       ease: 'none',
// //       duration: 3,
// //     });

// //     return () => {
// //       lenisRef.current?.destroy();
// //       tl.kill();
// //       ScrollTrigger.getAll().forEach(t => t.kill());
// //     };
// //   }, []);

// //   if (!latestTechPost) return null;

// //   return (
// //     <div ref={containerRef} className="myMainContainer relative h-[200vh] w-full overflow-hidden bg-black">
// //       {/* Latest Tech Article Section */}
// //       <div
// //         ref={section1Ref}
// //         className="fixed top-0 right-0 h-screen bg-black z-30 m-0 w-screen left-1/2 -translate-x-1/2"
// //       >
// //         <div className="relative h-full">
// //           {latestTechPost.cover_image ? (
// //             <Image
// //               src={latestTechPost.cover_image}
// //               alt={latestTechPost.title}
// //               fill
// //               className="object-cover"
// //               priority
// //             />
// //           ) : (
// //             <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700" />
// //           )}
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent flex flex-col items-center justify-center text-white">
// //             <div className="text-sm font-medium text-primary-300 mb-2">
// //               {categories.find(c => c.id === 'tech')?.name || 'Tech Articles'}
// //             </div>
// //             <h1 className="text-6xl font-garamond mb-4 max-w-4xl text-center">
// //               {latestTechPost.title}
// //             </h1>
// //             <p className="text-xl mb-8 max-w-2xl text-center font-nunitosans">
// //               {latestTechPost.excerpt}
// //             </p>
// //             <Link
// //               href={`/blog/${latestTechPost.slug}`}
// //               className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-nunitosans"
// //             >
// //               Read Article
// //             </Link>
// //           </div>
// //         </div>
// //       </div>

// //       {/* All Posts Grid Section */}
// //       {/* <div
// //         ref={section2Ref}
// //         className="fixed top-[100vh] right-0 min-h-screen w-screen bg-gradient-to-b from-black to-gray-900 z-20"
// //       > */}
// //       <div
// //         ref={section2Ref}
// //         className="absolute top-[100vh] right-0 min-h-screen w-screen bg-gradient-to-b from-black to-gray-900 z-20"
// //       >
// //         <div className="max-w-7xl mx-auto px-4 py-16">
// //           <h2 className="text-4xl font-garamond text-white mb-8">All Articles</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {remainingPosts.map((post) => (
// //               <Link
// //                 key={post.id}
// //                 href={`/blog/${post.slug}`}
// //                 className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all"
// //               >
// //                 <div className="aspect-[16/9] relative bg-gray-900">
// //                   {post.cover_image ? (
// //                     <Image
// //                       src={post.cover_image}
// //                       alt={post.title}
// //                       fill
// //                       className="object-cover transition-transform duration-500 group-hover:scale-105"
// //                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //                     />
// //                   ) : (
// //                     <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />
// //                   )}
// //                 </div>
// //                 <div className="p-6">
// //                   <div className="text-sm font-medium text-primary-400 mb-2">
// //                     {categories.find(c => c.id === post.category)?.name || 'Uncategorized'}
// //                   </div>
// //                   <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">
// //                     {post.title}
// //                   </h3>
// //                   <p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }