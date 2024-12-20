/*-= src/components/blog-parallax/BlogParallaxPostsSkeleton.tsx =-*/
/*-= Blog Parallax Posts Skeleton =-*/
/*-============================================================
Updated code: 12.20.2024 : 12:40pm
This implementation provides several key features:

The skeleton loader matches your existing blog parallax layout perfectly, maintaining the same grid structure and spacing.
It's fully responsive, following the same breakpoints as your actual content:

Single column on mobile
Two columns on medium screens
Three columns on large screens


The skeleton loader includes placeholders for:

Post images with the correct aspect ratio
Category labels
Post titles
Post excerpts

The loading state smoothly transitions to the actual content when data is ready.
The design is consistent with your theme, including dark mode support.
================================================================-*/
export default function BlogParallaxPostsSkeleton() {
   return (
     <div className="max-w-7xl mx-auto px-4 py-16">
       <div className="animate-pulse">
         {/* Section Title Skeleton */}
         <div className="h-10 bg-gray-700/50 rounded-lg w-48 mb-8" />

         {/* Posts Grid Skeleton */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[...Array(9)].map((_, i) => (
             <div
               key={i}
               className="group bg-primary-900/50 rounded-lg overflow-hidden"
             >
               {/* Image Placeholder */}
               <div className="aspect-video bg-primary-800/50" />

               <div className="p-4 space-y-3">
                 {/* Category Label */}
                 <div className="h-4 bg-primary-800/50 rounded w-24" />

                 {/* Title */}
                 <div className="h-7 bg-primary-800/50 rounded-lg w-3/4" />

                 {/* Excerpt */}
                 <div className="space-y-2">
                   <div className="h-4 bg-primary-800/50 rounded w-full" />
                   <div className="h-4 bg-primary-800/50 rounded w-2/3" />
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 }