/*-= src/components/lazy-load-components/LazyLoader.tsx =-*/
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useLazyLoadComponentWithVisibility } from '@/hooks/useLazyLoadComponentWithVisibility';

type LazyLoaderProps = {
   importComponent: () => Promise<{ default: React.ComponentType<any> }>;
   skeleton: React.ReactNode;
   minHeight?: string;
};

const LazyLoader: React.FC<LazyLoaderProps> = ({
   importComponent,
   skeleton,
   minHeight = "10px" // Default height based on content
}) => {
   const { Component, loading, isVisible, ref } = useLazyLoadComponentWithVisibility({
      importComponent,
   });

   const [height, setHeight] = useState<number | null>(null);
   const contentRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      // Capture initial content height
      if (contentRef.current) {
         setHeight(contentRef.current.offsetHeight);
      }
   }, [loading, Component]);

   return (
      <div
         ref={ref}
         className="transition-all duration-300 ease-in-out"
         style={{
            minHeight: height ? `${height}px` : minHeight,
            contain: 'layout paint',
            contentVisibility: 'auto'
         }}
      >
         <div
            ref={contentRef}
            className={`transition-opacity duration-300 ${loading || !isVisible ? 'opacity-0' : 'opacity-100'}`}
         >
            {loading || !isVisible ? skeleton : Component && <Component />}
         </div>
      </div>
   );
};

export default LazyLoader;


// import React, { useEffect, useRef, useState } from 'react';
// import { useLazyLoadComponentWithVisibility } from '@/hooks/useLazyLoadComponentWithVisibility';

// type LazyLoaderProps = {
//    importComponent: () => Promise<{ default: React.ComponentType<any> }>;
//    skeleton: React.ReactNode; // Custom skeleton placeholder
//    minHeight?: string;
// };

// const LazyLoader: React.FC<LazyLoaderProps> = ({ importComponent, skeleton }) => {
//    const { Component, loading, isVisible, ref } = useLazyLoadComponentWithVisibility({
//       importComponent,
//    });

// //    return (
// //       <div ref={ref}>
// //          {loading || !isVisible ? skeleton : Component && <Component />}
// //       </div>
// //    );
// // };
//    const [height, setHeight] = useState<number | null>(null);
//    const wrapperRef = useRef<HTMLDivElement | null>(null);

//    useEffect(() => {
//       // Measure the height of the current content (skeleton or component)
//       if (wrapperRef.current) {
//          setHeight(wrapperRef.current.offsetHeight);
//       }
//    }, [loading, Component]);

//    return (
//       <div ref={ref} style={{ minHeight: height || 'auto' }}>
//          <div ref={wrapperRef}>
//             {loading || !isVisible ? skeleton : Component && <Component />}
//          </div>
//       </div>
//    );
// };

// export default LazyLoader;

// // import React from 'react';
// // import SkeletonLoader from './SkeletonLoader';
// // import { useLazyLoadComponent } from '@/hooks/useLazyLoadComponent';

// // type LazyLoaderProps = {
// //    importComponent: () => Promise<{ default: React.ComponentType<any> }>;
// //    skeleton: React.ReactNode; // Custom skeleton placeholder
// // };

// // const LazyLoader: React.FC<LazyLoaderProps> = ({ importComponent, skeleton }) => {
// //    const { Component, loading, ref } = useLazyLoadComponent({ importComponent });

// //    return (
// //       <div ref={ref}>
// //          {loading ? skeleton : Component && <Component />}
// //       </div>
// //    );
// // };

// // export default LazyLoader;