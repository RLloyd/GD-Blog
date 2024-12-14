/*-= src/components/lazy-load-components/LazyLoaderApp.tsx =-*/
import React from 'react';
import LazyLoader from './LazyLoader';
import SkeletonLoader from './SkeletonLoader';
import CircularLoaderModalApp from "../modal-components/CircularLoaderModalApp";

const LazyLoaderApp = () => {
   return (
      <div className="space-y-12">
         <LazyLoader
            importComponent={() => import('./../blog-components/articles/PercentageSVG2')}
            minHeight="900px"  // Matches the expected content height
            skeleton={
               <div className="space-y-4 p-4 bg-gray-100 dark:bg-gray-800 rounded shadow
                  grid place-items-center min-h-[900px] transition-all duration-300">
                  <SkeletonLoader
                     height="h-80"
                     width={{
                        mobile: 'w-full',
                        tablet: 'md:w-3/4',
                        desktop: 'lg:w-1/2'
                     }}
                     rounded="rounded-lg"
                  />
                  <SkeletonLoader height="h-60" width="w-full" rounded="rounded-lg" />
                  <SkeletonLoader height="h-60" width="w-full" rounded="rounded-lg" />
                  <SkeletonLoader height="h-60" width="w-full" rounded="rounded-lg" />
                  <SkeletonLoader height="h-60" width="w-full" rounded="rounded-lg" />
               </div>
            }
         />

         <div className="mt-10">
            <CircularLoaderModalApp />
         </div>
      </div>
   );
};

export default LazyLoaderApp;


// import React from 'react';
// import LazyLoader from './LazyLoader';
// import SkeletonLoader from './SkeletonLoader';
// import CircularLoaderModalApp from "../modal-components/CircularLoaderModalApp";

// const LazyLoaderApp = () => {
//    return (
//       <div className="space-y-12">
//          {/* <h1 className="text-2xl font-bold">Lazy Loading with Reset and Skeleton</h1>
//          <p>Scroll down to see the dynamically loaded component with a skeleton placeholder:</p> */}

//          {/* <div style={{ height: '100vh', backgroundColor: '#f4f4f4' }}></div> */}

//          <LazyLoader
//             importComponent={() => import('./../blog-components/articles/PercentageSVG2')}
//             // skeleton={
//             //    <div className="mt-12 space-y-4">
//             //       {/* <SkeletonLoader height="h-20" width="w-1/2" />
//             //       <SkeletonLoader height="h-26" width="w-3/4" /> */}
//             //       <SkeletonLoader height="h-500" width="w-full" rounded="rounded-lg" />
//             //    </div>
//             // }
//             skeleton={
//                <div className="space-y-4 p-4 bg-gray-100 rounded shadow grid place-items-center min-h-[900px]"> {/* you can find this min-h in Inspect/computed/height */}
//                   <SkeletonLoader
//                      height="h-80"
//                      width={{
//                         mobile: 'w-full',
//                         tablet: 'md:w-1/2',
//                         desktop: 'lg:w-1/2'
//                      }}
//                      // className="bg-accent-300" // to add more styles
//                      rounded="rounded-lg"/>
//                   <SkeletonLoader height="h-80" width="w-full" rounded="rounded-lg" />
//                   <SkeletonLoader height="h-80" width="w-full" rounded="rounded-lg" />
//                   <SkeletonLoader height="h-100" width="w-full" rounded="rounded-lg" />
//                   <SkeletonLoader height="h-80" width="w-full" rounded="rounded-lg" />
//                   {/* <SkeletonLoader height="h-70" width="w-full" rounded="rounded-lg" /> */}
//                </div>
//             }
//          />

//          <div className="mt-10">
//             <CircularLoaderModalApp />
//          </div>

//          {/* <div style={{ height: '100vh', backgroundColor: '#f4f4f4' }}></div> */}
//       </div>
//    );
// };

// export default LazyLoaderApp;

// // import React from 'react';
// // import SkeletonLoader from './SkeletonLoader';
// // import LazyLoader from './LazyLoader';

// // const LazyLoaderApp = () => {
// //    return (
// //       <div className="space-y-12">
// //          <h1 className="text-2xl font-bold">Lazy Loading with Skeleton LoaderX</h1>
// //          <p>Scroll down to see the dynamically loaded component:</p>

// //          {/* <div style={{ height: '100vh', backgroundColor: '#f4f4f4' }}></div> Spacer */}

// //          <LazyLoader
// //             // importComponent={() => import('./../blog-components/articles/PercentageSVG2')}
// //             importComponent={() => import('./../blog-components/articles/PercentageSVG2')}
// //             skeleton={
// //                <div className="mt-12 space-y-4">
// //                   <SkeletonLoader height="h-8" width="w-1/2" />
// //                   <SkeletonLoader height="h-6" width="w-3/4" />
// //                   <SkeletonLoader height="h-20" width="w-full" rounded="rounded-lg" />
// //                </div>
// //             }
// //          />

// //          {/* <div style={{ height: '100vh', backgroundColor: '#f4f4f4' }}></div> Spacer */}
// //       </div>
// //    );
// // };

// // export default LazyLoaderApp;