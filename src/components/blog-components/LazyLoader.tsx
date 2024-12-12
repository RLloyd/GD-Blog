/*-= src/components/blog-components/LazyLoader.tsx =-*/
/*-= Auto-playing Lazy Bubble Loader =-*/
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const BubbleLoader = dynamic(() => import("./BubbleLoader"), {
  loading: () => (
    <div className="w-full max-w-2xl mx-auto aspect-[16/9] bg-gray-800 rounded-lg animate-pulse" />
  ),
});

interface LazyLoaderProps {
  threshold?: number;
  duration?: number;
  onComplete?: () => void;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({
  threshold = 0.1,
  duration = 5000,
  onComplete
}) => {
  const [autoStart, setAutoStart] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setAutoStart(true);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {inView && (
        <BubbleLoader
          duration={duration}
          onComplete={onComplete}
          autoStart={autoStart}
        />
      )}
    </div>
  );
};

export default LazyLoader;

// // src/components/blog-components/LazyLoader.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import dynamic from "next/dynamic";
// import { useInView } from "react-intersection-observer";

// const LazyBubbleLoader = dynamic(() => import("./BubbleLoader"), {
//   loading: () => (
//     <div className="w-full max-w-2xl mx-auto aspect-[16/9] bg-gray-800 rounded-lg animate-pulse" />
//   ),
//   suspense: true,
// });

// interface LazyLoaderProps {
//   threshold?: number;
//   duration?: number;
//   onComplete?: () => void;
// }

// const LazyLoader: React.FC<LazyLoaderProps> = ({
//   threshold = 0.1,
//   duration,
//   onComplete
// }) => {
//   const [shouldLoad, setShouldLoad] = useState(false);
//   const { ref, inView } = useInView({
//     threshold,
//     triggerOnce: true
//   });

//   useEffect(() => {
//     if (inView) {
//       setShouldLoad(true);
//     }
//   }, [inView]);

//   return (
//     <div ref={ref}>
//       {shouldLoad && (
//         <React.Suspense
//           fallback={
//             <div className="w-full max-w-2xl mx-auto aspect-[16/9] bg-gray-800 rounded-lg animate-pulse" />
//           }
//         >
//           <LazyBubbleLoader
//             duration={duration}
//             onComplete={onComplete}
//           />
//         </React.Suspense>
//       )}
//     </div>
//   );
// };

// export default LazyLoader;