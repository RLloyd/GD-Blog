/*-= src/components/lazy-load-components/LazyLoader.tsx =-*/
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useLazyLoadComponentWithVisibility } from '@/hooks/useLazyLoadComponentWithVisibility';

type LazyLoaderProps = {
   importComponent: () => Promise<{ default: React.ComponentType<any> }>;
   skeleton: React.ReactNode; // Custom skeleton placeholder
};

const LazyLoader: React.FC<LazyLoaderProps> = ({ importComponent, skeleton }) => {
   const { Component, loading, isVisible, ref } = useLazyLoadComponentWithVisibility({
      importComponent,
   });

//    return (
//       <div ref={ref}>
//          {loading || !isVisible ? skeleton : Component && <Component />}
//       </div>
//    );
// };
   const [height, setHeight] = useState<number | null>(null);
   const wrapperRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      // Measure the height of the current content (skeleton or component)
      if (wrapperRef.current) {
         setHeight(wrapperRef.current.offsetHeight);
      }
   }, [loading, Component]);

   return (
      <div ref={ref} style={{ minHeight: height || 'auto' }}>
         <div ref={wrapperRef}>
            {loading || !isVisible ? skeleton : Component && <Component />}
         </div>
      </div>
   );
};

export default LazyLoader;

// import React from 'react';
// import SkeletonLoader from './SkeletonLoader';
// import { useLazyLoadComponent } from '@/hooks/useLazyLoadComponent';

// type LazyLoaderProps = {
//    importComponent: () => Promise<{ default: React.ComponentType<any> }>;
//    skeleton: React.ReactNode; // Custom skeleton placeholder
// };

// const LazyLoader: React.FC<LazyLoaderProps> = ({ importComponent, skeleton }) => {
//    const { Component, loading, ref } = useLazyLoadComponent({ importComponent });

//    return (
//       <div ref={ref}>
//          {loading ? skeleton : Component && <Component />}
//       </div>
//    );
// };

// export default LazyLoader;