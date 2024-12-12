/*-= src/components/blog-components/BubbleLoader.tsx =-*/
/*- Bubble Loader with Completion Image -*/
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

interface BubbleLoaderProps {
  duration?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

interface Bubble {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
}

const BubbleLoader: React.FC<BubbleLoaderProps> = ({
  duration = 5000,
  onComplete,
  autoStart = false
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [points, setPoints] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timer>();
  const bubbleIntervalRef = useRef<NodeJS.Timer>();

  const colors = [
    "#60A5FA", "#C084FC", "#34D399", "#F472B6", "#A5B4FC",
    "#93C5FD", "#F9A8D4", "#86EFAC", "#38BDF8", "#FB7185",
    "#4ADE80", "#F472B6"
  ];

  useEffect(() => {
    if (autoStart) {
      startLoader();
    }
  }, [autoStart]);

  const handleBubblePop = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setPoints(prev => prev + 10);
  };

  const startLoader = () => {
    setIsActive(true);
    setProgress(0);
    setBubbles([]);
    setPoints(0);
    setIsComplete(false);

    bubbleIntervalRef.current = setInterval(() => {
      setBubbles(prev => [
        ...prev.slice(-40),
        {
          id: Date.now(),
          x: Math.random() * 1000,
          size: Math.random() * 30 + 15,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5
        }
      ]);
    }, 200);

    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 1, 100);
        if (newProgress === 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
          setIsComplete(true);
          onComplete?.();
        }
        return newProgress;
      });
    }, duration / 100);
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10"
            >
              <Image
                src="/assets/Bubbles-Fishes.webp"
                alt="Bubbles & Fishes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 32rem"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {(!isActive || isComplete) ? (
          <button
            onClick={startLoader}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary-400/60 hover:bg-primary-500/70 flex items-center justify-center text-white z-20"
          >
            <Play size={32} />
          </button>
        ) : (
          <>
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              {bubbles.map(bubble => (
                <motion.circle
                  key={bubble.id}
                  cx={bubble.x}
                  r={bubble.size}
                  fill={bubble.color}
                  initial={{ cy: 500, opacity: 0 }}
                  animate={{ cy: -50, opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: 4,
                    delay: bubble.delay,
                    ease: "easeOut"
                  }}
                  onMouseEnter={() => handleBubblePop(bubble.id)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </svg>

            <div
              className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 transition-all"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute top-4 left-4 flex justify-between w-full px-4">
              <span className="text-lg font-semibold text-white">
                {Math.floor(progress)}%
              </span>
              <span className="text-lg font-semibold text-success-400 mr-6">
                Points: {points}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BubbleLoader;
// /*-= src/components/blog-components/BubbleLoader.tsx =-*/
// /*- Updated BubbleLoader with Auto-start -*/
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Play } from "lucide-react";
// import Image from "next/image";

// interface BubbleLoaderProps {
//   duration?: number;
//   onComplete?: () => void;
//   autoStart?: boolean;
// }

// interface Bubble {
//   id: number;
//   x: number;
//   size: number;
//   color: string;
//   delay: number;
// }

// const BubbleLoader: React.FC<BubbleLoaderProps> = ({
//   duration = 5000,
//   onComplete,
//   autoStart = false
// }) => {
//   const [isActive, setIsActive] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [bubbles, setBubbles] = useState<Bubble[]>([]);
//   const [points, setPoints] = useState(0);
//   const progressIntervalRef = useRef<NodeJS.Timer>();
//   const bubbleIntervalRef = useRef<NodeJS.Timer>();

//   const colors = [
//     "#60A5FA", "#C084FC", "#34D399", "#F472B6", "#A5B4FC",
//     "#93C5FD", "#F9A8D4", "#86EFAC", "#38BDF8", "#FB7185",
//     "#4ADE80", "#F472B6"
//   ];

//   useEffect(() => {
//     if (autoStart) {
//       startLoader();
//     }
//   }, [autoStart]);

//   const handleBubblePop = (id: number) => {
//     setBubbles(prev => prev.filter(bubble => bubble.id !== id));
//     setPoints(prev => prev + 10);
//   };

//   const startLoader = () => {
//     setIsActive(true);
//     setProgress(0);
//     setBubbles([]);
//     setPoints(0);
//     setIsComplete(false);

//     bubbleIntervalRef.current = setInterval(() => {
//       setBubbles(prev => [
//         ...prev.slice(-20),
//         {
//           id: Date.now(),
//           x: Math.random() * 1000,
//           size: Math.random() * 30 + 15,
//           color: colors[Math.floor(Math.random() * colors.length)],
//           delay: Math.random() * 0.5
//         }
//       ]);
//     }, 200);

//     progressIntervalRef.current = setInterval(() => {
//       setProgress(prev => {
//         const newProgress = Math.min(prev + 1, 100);
//         if (newProgress === 100) {
//           if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
//           if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
//           setIsComplete(true);
//           onComplete?.();
//         }
//         return newProgress;
//       });
//     }, duration / 100);
//   };

//   useEffect(() => {
//     return () => {
//       if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
//       if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
//     };
//   }, []);

//   return (
//     <div className="relative w-full max-w-2xl mx-auto">
//       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
//         {(!isActive || isComplete) ? (
//           <button
//             onClick={startLoader}
//             className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white"
//           >
//             <Play size={32} />
//           </button>
//         ) : (
//           <>
//             <AnimatePresence>
//               <svg
//                 viewBox="0 0 1000 500"
//                 preserveAspectRatio="none"
//                 className="absolute inset-0 w-full h-full"
//               >
//                 {bubbles.map(bubble => (
//                   <motion.circle
//                     key={bubble.id}
//                     cx={bubble.x}
//                     r={bubble.size}
//                     fill={bubble.color}
//                     initial={{ cy: 500, opacity: 0 }}
//                     animate={{ cy: -50, opacity: [0, 0.8, 0] }}
//                     transition={{
//                       duration: 4,
//                       delay: bubble.delay,
//                       ease: "easeOut"
//                     }}
//                     onMouseEnter={() => handleBubblePop(bubble.id)}
//                     style={{ cursor: "pointer" }}
//                   />
//                 ))}
//               </svg>
//             </AnimatePresence>

//             <div
//               className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 transition-all"
//               style={{ width: `${progress}%` }}
//             />
//             <div className="absolute top-4 left-4 flex justify-between w-full px-4">
//               <span className="text-lg font-semibold text-white">
//                 {Math.floor(progress)}%
//               </span>
//               <span className="text-lg font-semibold text-yellow-400">
//                 Points: {points}
//               </span>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BubbleLoader;

// // /*-= src/components/blog-components/BubbleLoader.tsx =-*/
// // /*- Interactive Bubble Loader -*/
// // "use client";
// // import React, { useState, useEffect, useRef } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Play } from "lucide-react";
// // import Image from "next/image";

// // interface BubbleLoaderProps {
// //   duration?: number;
// //   onComplete?: () => void;
// // }

// // interface Bubble {
// //   id: number;
// //   x: number;
// //   size: number;
// //   color: string;
// //   delay: number;
// // }

// // const BubbleLoader: React.FC<BubbleLoaderProps> = ({ duration = 5000, onComplete }) => {
// //   const [isActive, setIsActive] = useState(false);
// //   const [isComplete, setIsComplete] = useState(false);
// //   const [progress, setProgress] = useState(0);
// //   const [bubbles, setBubbles] = useState<Bubble[]>([]);
// //   const [points, setPoints] = useState(0);
// //   const progressIntervalRef = useRef<NodeJS.Timer>();
// //   const bubbleIntervalRef = useRef<NodeJS.Timer>();

// //   const colors = [
// //     "#60A5FA", "#C084FC", "#34D399", "#F472B6", "#A5B4FC",
// //     "#93C5FD", "#F9A8D4", "#86EFAC", "#38BDF8", "#FB7185",
// //     "#4ADE80", "#F472B6"
// //   ];

// //   const handleBubblePop = (id: number) => {
// //     setBubbles(prev => prev.filter(bubble => bubble.id !== id));
// //     setPoints(prev => prev + 10);
// //   };

// //   const startLoader = () => {
// //     setIsActive(true);
// //     setProgress(0);
// //     setBubbles([]);
// //     setPoints(0);
// //     setIsComplete(false);

// //     bubbleIntervalRef.current = setInterval(() => {
// //       setBubbles(prev => [
// //         ...prev.slice(-20),
// //         {
// //           id: Date.now(),
// //           x: Math.random() * 1000,
// //           size: Math.random() * 30 + 15,
// //           color: colors[Math.floor(Math.random() * colors.length)],
// //           delay: Math.random() * 0.5
// //         }
// //       ]);
// //     }, 200);

// //     progressIntervalRef.current = setInterval(() => {
// //       setProgress(prev => {
// //         const newProgress = Math.min(prev + 1, 100);
// //         if (newProgress === 100) {
// //           if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// //           if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// //           setIsComplete(true);
// //           onComplete?.();
// //         }
// //         return newProgress;
// //       });
// //     }, duration / 100);
// //   };

// //   useEffect(() => {
// //     return () => {
// //       if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// //       if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// //     };
// //   }, []);

// //   return (
// //     <div className="relative w-full max-w-2xl mx-auto">
// //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// //         {!isActive ? (
// //           <button
// //             onClick={startLoader}
// //             className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white"
// //           >
// //             <Play size={32} />
// //           </button>
// //         ) : (
// //           <>
// //             <AnimatePresence>
// //               {isComplete ? (
// //                 <motion.div
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   className="absolute inset-0"
// //                 >
// //                   <Image
// //                     src="/assets/Bubbles-Fishes.webp"
// //                     alt="Bubbles & Fishes"
// //                     fill
// //                     className="object-cover"
// //                     sizes="(max-width: 768px) 100vw, 32rem"
// //                   />
// //                 </motion.div>
// //               ) : (
// //                 <svg
// //                   viewBox="0 0 1000 500"
// //                   preserveAspectRatio="none"
// //                   className="absolute inset-0 w-full h-full"
// //                 >
// //                   {bubbles.map(bubble => (
// //                     <motion.circle
// //                       key={bubble.id}
// //                       cx={bubble.x}
// //                       r={bubble.size}
// //                       fill={bubble.color}
// //                       initial={{ cy: 500, opacity: 0 }}
// //                       animate={{ cy: -50, opacity: [0, 0.8, 0] }}
// //                       transition={{
// //                         duration: 4,
// //                         delay: bubble.delay,
// //                         ease: "easeOut"
// //                       }}
// //                       onMouseEnter={() => handleBubblePop(bubble.id)}
// //                       style={{ cursor: "pointer" }}
// //                     />
// //                   ))}
// //                 </svg>
// //               )}
// //             </AnimatePresence>

// //             <div
// //               className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 transition-all"
// //               style={{ width: `${progress}%` }}
// //             />
// //             <div className="absolute top-4 left-4 flex justify-between w-full px-4">
// //               <span className="text-lg font-semibold text-white">
// //                 {Math.floor(progress)}%
// //               </span>
// //               <span className="text-lg font-semibold text-yellow-400">
// //                 Points: {points}
// //               </span>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BubbleLoader;
// // // /*- Interactive Bubble Loader -*/
// // // "use client";
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Play } from 'lucide-react';
// // // import Image from 'next/image';

// // // interface BubbleLoaderProps {
// // //   duration?: number;
// // //   onComplete?: () => void;
// // // }

// // // interface Bubble {
// // //   id: number;
// // //   x: number;
// // //   size: number;
// // //   color: string;
// // //   delay: number;
// // // }

// // // const BubbleLoader: React.FC<BubbleLoaderProps> = ({
// // //   duration = 5000,
// // //   onComplete
// // // }) => {
// // //   const [isActive, setIsActive] = useState(false);
// // //   const [isComplete, setIsComplete] = useState(false);
// // //   const [progress, setProgress] = useState(0);
// // //   const [bubbles, setBubbles] = useState<Bubble[]>([]);
// // //   const [points, setPoints] = useState(0);
// // //   const progressIntervalRef = useRef<NodeJS.Timer>();
// // //   const bubbleIntervalRef = useRef<NodeJS.Timer>();

// // //   const colors = [
// // //     '#60A5FA', '#C084FC', '#34D399', '#F472B6',
// // //     '#A5B4FC', '#93C5FD', '#F9A8D4', '#86EFAC',
// // //     '#38BDF8', '#FB7185', '#4ADE80', '#F472B6'
// // //   ];

// // //   const handleBubblePop = (id: number) => {
// // //     setBubbles(prev => prev.filter(bubble => bubble.id !== id));
// // //     setPoints(prev => prev + 10);
// // //   };

// // //   const startLoader = () => {
// // //     setIsActive(true);
// // //     setProgress(0);
// // //     setBubbles([]);
// // //     setPoints(0);
// // //     setIsComplete(false);

// // //     bubbleIntervalRef.current = setInterval(() => {
// // //       setBubbles(prev => [...prev.slice(-20), {
// // //         id: Date.now(),
// // //         x: Math.random() * 1000,
// // //         size: Math.random() * 30 + 15,
// // //         color: colors[Math.floor(Math.random() * colors.length)],
// // //         delay: Math.random() * 0.5
// // //       }]);
// // //     }, 200);

// // //     progressIntervalRef.current = setInterval(() => {
// // //       setProgress(prev => {
// // //         const newProgress = Math.min(prev + 1, 100);
// // //         if (newProgress === 100) {
// // //           if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// // //           if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// // //           setIsComplete(true);
// // //           onComplete?.();
// // //         }
// // //         return newProgress;
// // //       });
// // //     }, duration / 100);
// // //   };

// // //   useEffect(() => {
// // //     return () => {
// // //       if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// // //       if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// // //     };
// // //   }, []);

// // //   return (
// // //     <div className="relative w-full max-w-2xl mx-auto">
// // //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// // //         {!isActive ? (
// // //           <button
// // //             onClick={startLoader}
// // //             className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white"
// // //           >
// // //             <Play size={32} />
// // //           </button>
// // //         ) : (
// // //           <>
// // //             <AnimatePresence>
// // //               {isComplete ? (
// // //                 <motion.div
// // //                   initial={{ opacity: 0 }}
// // //                   animate={{ opacity: 1 }}
// // //                   className="absolute inset-0"
// // //                 >
// // //                   <Image
// // //                     src="/public/assets/Bubbles-Fishes.webp"
// // //                     alt="Bubbles & Fishes"
// // //                     fill
// // //                     className="object-cover"
// // //                     sizes="(max-width: 768px) 100vw, 32rem"
// // //                   />
// // //                 </motion.div>
// // //               ) : (
// // //                 <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
// // //                   {bubbles.map(bubble => (
// // //                     <motion.circle
// // //                       key={bubble.id}
// // //                       cx={bubble.x}
// // //                       r={bubble.size}
// // //                       fill={bubble.color}
// // //                       initial={{ cy: 500, opacity: 0 }}
// // //                       animate={{ cy: -50, opacity: [0, 0.8, 0] }}
// // //                       transition={{
// // //                         duration: 4,
// // //                         delay: bubble.delay,
// // //                         ease: "easeOut"
// // //                       }}
// // //                       onMouseEnter={() => handleBubblePop(bubble.id)}
// // //                       style={{ cursor: 'pointer' }}
// // //                     />
// // //                   ))}
// // //                 </svg>
// // //               )}
// // //             </AnimatePresence>

// // //             <div
// // //               className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 transition-all"
// // //               style={{ width: `${progress}%` }}
// // //             />
// // //             <div className="absolute top-4 left-4 flex justify-between w-full px-4">
// // //               <span className="text-lg font-semibold text-white">
// // //                 {Math.floor(progress)}%
// // //               </span>
// // //               <span className="text-lg font-semibold text-yellow-400">
// // //                 Points: {points}
// // //               </span>
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default BubbleLoader;
// // // // /*- Fixed Bubble Loader -*/
// // // // "use client";
// // // // // Increased max bubbles to 20
// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import { Play } from 'lucide-react';

// // // // interface BubbleLoaderProps {
// // // //   duration?: number;
// // // //   onComplete?: () => void;
// // // // }

// // // // interface Bubble {
// // // //   id: number;
// // // //   x: number;
// // // //   size: number;
// // // //   color: string;
// // // //   delay: number;
// // // // }

// // // // const BubbleLoader: React.FC<BubbleLoaderProps> = ({
// // // //   duration = 5000,
// // // //   onComplete
// // // // }) => {
// // // //   const [isActive, setIsActive] = useState(false);
// // // //   const [progress, setProgress] = useState(0);
// // // //   const [bubbles, setBubbles] = useState<Bubble[]>([]);
// // // //   const progressIntervalRef = useRef<NodeJS.Timer>();
// // // //   const bubbleIntervalRef = useRef<NodeJS.Timer>();

// // // //   const colors = [
// // // //     '#60A5FA', '#C084FC', '#34D399', '#F472B6',
// // // //     '#A5B4FC', '#93C5FD', '#F9A8D4', '#86EFAC',
// // // //     '#38BDF8', '#FB7185', '#4ADE80', '#F472B6'
// // // //   ];

// // // //   const startLoader = () => {
// // // //     setIsActive(true);
// // // //     setProgress(0);
// // // //     setBubbles([]);

// // // //     bubbleIntervalRef.current = setInterval(() => {
// // // //       setBubbles(prev => [...prev.slice(-30), {
// // // //         id: Date.now(),
// // // //         x: Math.random() * 1000,
// // // //         size: Math.random() * 30 + 15,
// // // //         color: colors[Math.floor(Math.random() * colors.length)],
// // // //         delay: Math.random() * 0.5
// // // //       }]);
// // // //     }, 200);

// // // //     progressIntervalRef.current = setInterval(() => {
// // // //       setProgress(prev => {
// // // //         const newProgress = Math.min(prev + 1, 100);
// // // //         if (newProgress === 100) {
// // // //           if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// // // //           if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// // // //           setIsActive(false);
// // // //           onComplete?.();
// // // //         }
// // // //         return newProgress;
// // // //       });
// // // //     }, duration / 100);
// // // //   };

// // // //   useEffect(() => {
// // // //     return () => {
// // // //       if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// // // //       if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// // // //     };
// // // //   }, []);

// // // //   return (
// // // //     <div className="relative w-full max-w-2xl mx-auto">
// // // //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// // // //         {!isActive ? (
// // // //           <button
// // // //             onClick={startLoader}
// // // //             className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white"
// // // //           >
// // // //             <Play size={32} />
// // // //           </button>
// // // //         ) : (
// // // //           <>
// // // //             <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
// // // //               {bubbles.map(bubble => (
// // // //                 <motion.circle
// // // //                   key={bubble.id}
// // // //                   cx={bubble.x}
// // // //                   r={bubble.size}
// // // //                   fill={bubble.color}
// // // //                   initial={{ cy: 500, opacity: 0 }}
// // // //                   animate={{ cy: -50, opacity: [0, 0.8, 0] }}
// // // //                   transition={{
// // // //                     duration: 4,
// // // //                     delay: bubble.delay,
// // // //                     ease: "easeOut"
// // // //                   }}
// // // //                 />
// // // //               ))}
// // // //             </svg>

// // // //             <div
// // // //               className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 transition-all"
// // // //               style={{ width: `${progress}%` }}
// // // //             />
// // // //             <div className="absolute top-4 left-4 text-lg font-semibold text-white">
// // // //               {Math.floor(progress)}%
// // // //             </div>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default BubbleLoader;
// // // // // /*- Fixed Bubble Loader -*/
// // // // // "use client";
// // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // import { motion } from 'framer-motion';
// // // // // import { Play } from 'lucide-react';

// // // // // interface BubbleLoaderProps {
// // // // //   duration?: number;
// // // // //   onComplete?: () => void;
// // // // // }

// // // // // interface Bubble {
// // // // //   id: number;
// // // // //   x: number;
// // // // //   size: number;
// // // // //   color: string;
// // // // // }

// // // // // const BubbleLoader: React.FC<BubbleLoaderProps> = ({
// // // // //   duration = 5000,
// // // // //   onComplete
// // // // // }) => {
// // // // //   const [isActive, setIsActive] = useState(false);
// // // // //   const [progress, setProgress] = useState(0);
// // // // //   const [bubbles, setBubbles] = useState<Bubble[]>([]);
// // // // //   const progressIntervalRef = useRef<NodeJS.Timer>();
// // // // //   const bubbleIntervalRef = useRef<NodeJS.Timer>();

// // // // //   const colors = [
// // // // //     '#60A5FA', '#C084FC', '#34D399', '#F472B6',
// // // // //     '#A5B4FC', '#93C5FD', '#F9A8D4', '#86EFAC'
// // // // //   ];

// // // // //   const startLoader = () => {
// // // // //     setIsActive(true);
// // // // //     setProgress(0);
// // // // //     setBubbles([]);

// // // // //     bubbleIntervalRef.current = setInterval(() => {
// // // // //       setBubbles(prev => [...prev.slice(-12), {
// // // // //         id: Date.now(),
// // // // //         x: Math.random() * 1000,
// // // // //         size: Math.random() * 30 + 15,
// // // // //         color: colors[Math.floor(Math.random() * colors.length)]
// // // // //       }]);
// // // // //     }, 300);

// // // // //     progressIntervalRef.current = setInterval(() => {
// // // // //       setProgress(prev => {
// // // // //         const newProgress = Math.min(prev + 1, 100);
// // // // //         if (newProgress === 100) {
// // // // //           if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// // // // //           if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// // // // //           setIsActive(false);
// // // // //           onComplete?.();
// // // // //         }
// // // // //         return newProgress;
// // // // //       });
// // // // //     }, duration / 100);
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     return () => {
// // // // //       if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// // // // //       if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// // // // //     };
// // // // //   }, []);

// // // // //   return (
// // // // //     <div className="relative w-full max-w-2xl mx-auto">
// // // // //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// // // // //         {!isActive ? (
// // // // //           <button
// // // // //             onClick={startLoader}
// // // // //             className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white"
// // // // //           >
// // // // //             <Play size={32} />
// // // // //           </button>
// // // // //         ) : (
// // // // //           <>
// // // // //             <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
// // // // //               {bubbles.map(bubble => (
// // // // //                 <motion.circle
// // // // //                   key={bubble.id}
// // // // //                   cx={bubble.x}
// // // // //                   r={bubble.size}
// // // // //                   fill={bubble.color}
// // // // //                   initial={{ cy: 500, opacity: 0 }}
// // // // //                   animate={{ cy: -50, opacity: [0, 0.8, 0] }}
// // // // //                   transition={{ duration: 4, ease: "easeOut" }}
// // // // //                 />
// // // // //               ))}
// // // // //             </svg>

// // // // //             <div
// // // // //               className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 transition-all"
// // // // //               style={{ width: `${progress}%` }}
// // // // //             />
// // // // //             <div className="absolute top-4 left-4 text-lg font-semibold text-white">
// // // // //               {Math.floor(progress)}%
// // // // //             </div>
// // // // //           </>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default BubbleLoader;
// // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // import { motion } from 'framer-motion';
// // // // // // import { Play } from 'lucide-react';

// // // // // // const BubbleLoader = ({ duration = 5000, onComplete }) => {
// // // // // //   const [isActive, setIsActive] = useState(false);
// // // // // //   const [progress, setProgress] = useState(0);
// // // // // //   const [bubbles, setBubbles] = useState([]);
// // // // // //   const progressIntervalRef = useRef();
// // // // // //   const bubbleIntervalRef = useRef();

// // // // // //   const colors = [
// // // // // //     '#60A5FA', '#C084FC', '#34D399', '#F472B6',
// // // // // //     '#A5B4FC', '#93C5FD', '#F9A8D4', '#86EFAC'
// // // // // //   ];

// // // // // //   useEffect(() => {
// // // // // //     const viewBox = "0 0 1000 500";
// // // // // //     const dimensions = viewBox.split(' ').map(Number);
// // // // // //     const width = dimensions[2];

// // // // // //     const startLoader = () => {
// // // // // //       setIsActive(true);
// // // // // //       setProgress(0);
// // // // // //       setBubbles([]);

// // // // // //       bubbleIntervalRef.current = setInterval(() => {
// // // // // //         setBubbles(prev => [...prev.slice(-12), {
// // // // // //           id: Math.random(),
// // // // // //           x: Math.random() * width,
// // // // // //           size: Math.random() * 30 + 15,
// // // // // //           color: colors[Math.floor(Math.random() * colors.length)]
// // // // // //         }]);
// // // // // //       }, 300);

// // // // // //       progressIntervalRef.current = setInterval(() => {
// // // // // //         setProgress(p => {
// // // // // //           if (p >= 100) {
// // // // // //             clearInterval(progressIntervalRef.current);
// // // // // //             clearInterval(bubbleIntervalRef.current);
// // // // // //             setIsActive(false);
// // // // // //             onComplete?.();
// // // // // //             return 100;
// // // // // //           }
// // // // // //           return p + 1;
// // // // // //         });
// // // // // //       }, duration / 100);
// // // // // //     };

// // // // // //     return () => {
// // // // // //       clearInterval(bubbleIntervalRef.current);
// // // // // //       clearInterval(progressIntervalRef.current);
// // // // // //     };
// // // // // //   }, [duration, onComplete]);

// // // // // //   return (
// // // // // //     <div className="relative w-full max-w-2xl mx-auto">
// // // // // //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// // // // // //         {!isActive ? (
// // // // // //           <button onClick={() => setIsActive(true)} className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white">
// // // // // //             <Play size={32} />
// // // // // //           </button>
// // // // // //         ) : (
// // // // // //           <>
// // // // // //             <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
// // // // // //               {bubbles.map(bubble => (
// // // // // //                 <motion.circle
// // // // // //                   key={bubble.id}
// // // // // //                   cx={bubble.x}
// // // // // //                   r={bubble.size}
// // // // // //                   fill={bubble.color}
// // // // // //                   initial={{ cy: 500, opacity: 0 }}
// // // // // //                   animate={{ cy: -50, opacity: [0, 0.8, 0] }}
// // // // // //                   transition={{ duration: 4, ease: "easeOut" }}
// // // // // //                 />
// // // // // //               ))}
// // // // // //             </svg>

// // // // // //             <div className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 transition-all" style={{ width: `${progress}%` }} />
// // // // // //             <div className="absolute top-4 left-4 text-lg font-semibold text-white">{Math.floor(progress)}%</div>
// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default BubbleLoader;
// // // // // // // /*- Enhanced SVG Bubble Loader -*/
// // // // // // // "use client";
// // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // import { motion } from 'framer-motion';
// // // // // // // import { Play } from 'lucide-react';

// // // // // // // interface Bubble {
// // // // // // //   id: number;
// // // // // // //   x: number;
// // // // // // //   size: number;
// // // // // // //   color: string;
// // // // // // // }

// // // // // // // const BubbleLoader = ({ duration = 5000, onComplete }) => {
// // // // // // //   const [isActive, setIsActive] = useState(false);
// // // // // // //   const [progress, setProgress] = useState(0);
// // // // // // //   const [bubbles, setBubbles] = useState<Bubble[]>([]);
// // // // // // //   const progressIntervalRef = useRef<NodeJS.Timeout>();
// // // // // // //   const bubbleIntervalRef = useRef<NodeJS.Timeout>();
// // // // // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // // // // //   const colors = [
// // // // // // //     '#60A5FA', // bright blue
// // // // // // //     '#C084FC', // bright purple
// // // // // // //     '#34D399', // bright green
// // // // // // //     '#F472B6', // bright pink
// // // // // // //     '#A5B4FC', // bright indigo
// // // // // // //     '#93C5FD', // lighter blue
// // // // // // //     '#F9A8D4', // lighter pink
// // // // // // //     '#86EFAC', // lighter green
// // // // // // //   ];

// // // // // // //   const startLoader = () => {
// // // // // // //     setIsActive(true);
// // // // // // //     setProgress(0);
// // // // // // //     setBubbles([]);

// // // // // // //     bubbleIntervalRef.current = setInterval(() => {
// // // // // // //       const containerWidth = containerRef.current?.offsetWidth || 800;
// // // // // // //       setBubbles(prev => [
// // // // // // //         ...prev.slice(-12),
// // // // // // //         {
// // // // // // //           id: Date.now(),
// // // // // // //           x: Math.random() * containerWidth,
// // // // // // //           size: Math.random() * 30 + 15, // Random size between 15-45px
// // // // // // //           color: colors[Math.floor(Math.random() * colors.length)]
// // // // // // //         }
// // // // // // //       ]);
// // // // // // //     }, 300);

// // // // // // //     progressIntervalRef.current = setInterval(() => {
// // // // // // //       setProgress(prev => {
// // // // // // //         const newProgress = Math.min(prev + 1, 100);
// // // // // // //         if (newProgress === 100) {
// // // // // // //           clearInterval(progressIntervalRef.current);
// // // // // // //           clearInterval(bubbleIntervalRef.current);
// // // // // // //           setIsActive(false);
// // // // // // //           onComplete?.();
// // // // // // //         }
// // // // // // //         return newProgress;
// // // // // // //       });
// // // // // // //     }, duration / 100);
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     return () => {
// // // // // // //       clearInterval(progressIntervalRef.current);
// // // // // // //       clearInterval(bubbleIntervalRef.current);
// // // // // // //     };
// // // // // // //   }, []);

// // // // // // //   return (
// // // // // // //     <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
// // // // // // //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// // // // // // //         {!isActive ? (
// // // // // // //           <button
// // // // // // //             onClick={startLoader}
// // // // // // //             className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white"
// // // // // // //           >
// // // // // // //             <Play size={32} />
// // // // // // //           </button>
// // // // // // //         ) : (
// // // // // // //           <>
// // // // // // //             <svg width="100%" height="100%" style={{ position: 'absolute' }}>
// // // // // // //               {bubbles.map(bubble => (
// // // // // // //                 <motion.circle
// // // // // // //                   key={bubble.id}
// // // // // // //                   cx={bubble.x}
// // // // // // //                   r={bubble.size}
// // // // // // //                   fill={bubble.color}
// // // // // // //                   fillOpacity={0.6}
// // // // // // //                   initial={{ cy: 400, scale: 0.2 }}
// // // // // // //                   animate={{
// // // // // // //                     cy: -50,
// // // // // // //                     scale: 1.2,
// // // // // // //                     opacity: [0.2, 0.8, 0.8, 0]
// // // // // // //                   }}
// // // // // // //                   transition={{
// // // // // // //                     duration: 4,
// // // // // // //                     ease: "easeOut",
// // // // // // //                     opacity: { times: [0, 0.2, 0.8, 1] }
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //               ))}
// // // // // // //             </svg>

// // // // // // //             <div
// // // // // // //               className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 transition-all"
// // // // // // //               style={{ width: `${progress}%` }}
// // // // // // //             />
// // // // // // //             <div className="absolute top-4 left-4 text-lg font-semibold text-white">
// // // // // // //               {Math.floor(progress)}%
// // // // // // //             </div>
// // // // // // //           </>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default BubbleLoader;
// // // // // // // // /*- Debugged SVG Bubble Loader -*/
// // // // // // // // "use client";
// // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // import { motion } from 'framer-motion';
// // // // // // // // import { Play } from 'lucide-react';

// // // // // // // // interface Bubble {
// // // // // // // //   id: number;
// // // // // // // //   x: number;
// // // // // // // //   color: string;
// // // // // // // // }

// // // // // // // // const BubbleLoader = ({ duration = 5000, onComplete }) => {
// // // // // // // //   const [isActive, setIsActive] = useState(false);
// // // // // // // //   const [progress, setProgress] = useState(0);
// // // // // // // //   const [bubbles, setBubbles] = useState<Bubble[]>([]);
// // // // // // // //   const progressIntervalRef = useRef<NodeJS.Timeout>();
// // // // // // // //   const bubbleIntervalRef = useRef<NodeJS.Timeout>();

// // // // // // // //   const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#6366F1', '#14B8A6'];

// // // // // // // //   const startLoader = () => {
// // // // // // // //     setIsActive(true);
// // // // // // // //     setProgress(0);
// // // // // // // //     setBubbles([]);

// // // // // // // //     bubbleIntervalRef.current = setInterval(() => {
// // // // // // // //       setBubbles(prev => [
// // // // // // // //         ...prev.slice(-12),
// // // // // // // //         {
// // // // // // // //           id: Date.now(),
// // // // // // // //           x: Math.random() * 400,
// // // // // // // //           color: colors[Math.floor(Math.random() * colors.length)]
// // // // // // // //         }
// // // // // // // //       ]);
// // // // // // // //     }, 300);

// // // // // // // //     progressIntervalRef.current = setInterval(() => {
// // // // // // // //       setProgress(prev => {
// // // // // // // //         const newProgress = Math.min(prev + 1, 100);
// // // // // // // //         if (newProgress === 100) {
// // // // // // // //           clearInterval(progressIntervalRef.current);
// // // // // // // //           clearInterval(bubbleIntervalRef.current);
// // // // // // // //           setIsActive(false);
// // // // // // // //           onComplete?.();
// // // // // // // //         }
// // // // // // // //         return newProgress;
// // // // // // // //       });
// // // // // // // //     }, duration / 100);
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     return () => {
// // // // // // // //       clearInterval(progressIntervalRef.current);
// // // // // // // //       clearInterval(bubbleIntervalRef.current);
// // // // // // // //     };
// // // // // // // //   }, []);

// // // // // // // //   return (
// // // // // // // //     <div className="relative w-full max-w-2xl mx-auto">
// // // // // // // //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// // // // // // // //         {!isActive ? (
// // // // // // // //           <button
// // // // // // // //             onClick={startLoader}
// // // // // // // //             className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white"
// // // // // // // //           >
// // // // // // // //             <Play size={32} />
// // // // // // // //           </button>
// // // // // // // //         ) : (
// // // // // // // //           <>
// // // // // // // //             <svg width="100%" height="100%" style={{ position: 'absolute' }}>
// // // // // // // //               {bubbles.map(bubble => (
// // // // // // // //                 <motion.circle
// // // // // // // //                   key={bubble.id}
// // // // // // // //                   cx={bubble.x}
// // // // // // // //                   r={20}
// // // // // // // //                   fill={bubble.color}
// // // // // // // //                   fillOpacity={0.5}
// // // // // // // //                   initial={{ cy: 400 }}
// // // // // // // //                   animate={{ cy: -20 }}
// // // // // // // //                   transition={{ duration: 4, ease: "easeOut" }}
// // // // // // // //                 />
// // // // // // // //               ))}
// // // // // // // //             </svg>

// // // // // // // //             <div
// // // // // // // //               className="absolute bottom-0 left-0 h-2 bg-blue-500 transition-all"
// // // // // // // //               style={{ width: `${progress}%` }}
// // // // // // // //             />
// // // // // // // //             <div className="absolute top-4 left-4 text-lg font-semibold text-white">
// // // // // // // //               {Math.floor(progress)}%
// // // // // // // //             </div>
// // // // // // // //           </>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default BubbleLoader;
// // // // // // // // // /*- Enhanced BubbleLoader Component • Multi colors & Increased bubbles -*/
// // // // // // // // // "use client";
// // // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // // import { Play } from "lucide-react";

// // // // // // // // // interface Bubble {
// // // // // // // // //   id: number;
// // // // // // // // //   size: number;
// // // // // // // // //   left: number;
// // // // // // // // //   color: string;
// // // // // // // // // }

// // // // // // // // // interface BubbleLoaderProps {
// // // // // // // // //   duration?: number;
// // // // // // // // //   onComplete?: () => void;
// // // // // // // // // }

// // // // // // // // // const BubbleLoader: React.FC<BubbleLoaderProps> = ({
// // // // // // // // //   duration = 5000,
// // // // // // // // //   onComplete
// // // // // // // // // }) => {
// // // // // // // // //   const [isActive, setIsActive] = useState(false);
// // // // // // // // //   const [progress, setProgress] = useState(0);
// // // // // // // // //   const [bubbles, setBubbles] = useState<Bubble[]>([]);
// // // // // // // // //   const progressIntervalRef = useRef<NodeJS.Timeout | undefined>();
// // // // // // // // //   const bubbleIntervalRef = useRef<NodeJS.Timeout | undefined>();

// // // // // // // // //   const colors = [
// // // // // // // // //     'bg-blue-500/50',
// // // // // // // // //     'bg-yellow-500/50',
// // // // // // // // //     'bg-purple-500/50',
// // // // // // // // //     'bg-orange-500/50',
// // // // // // // // //     'bg-indigo-500/50',
// // // // // // // // //     'bg-cyan-500/50',
// // // // // // // // //     'bg-teal-500/50'
// // // // // // // // //   ];

// // // // // // // // //   const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

// // // // // // // // //   const startLoader = () => {
// // // // // // // // //     setIsActive(true);
// // // // // // // // //     setProgress(0);
// // // // // // // // //     setBubbles([]);

// // // // // // // // //     bubbleIntervalRef.current = setInterval(() => {
// // // // // // // // //       setBubbles(prev => [
// // // // // // // // //         ...prev.slice(-12),
// // // // // // // // //       //   ...prev.slice(-15),
// // // // // // // // //         {
// // // // // // // // //           id: Date.now() + Math.random(),
// // // // // // // // //           size: Math.random() * 30 + 50,
// // // // // // // // //           left: Math.random() * 80 + 10,
// // // // // // // // //           color: getRandomColor()
// // // // // // // // //         }
// // // // // // // // //       ]);
// // // // // // // // //     }, 300);

// // // // // // // // //     progressIntervalRef.current = setInterval(() => {
// // // // // // // // //       setProgress(prev => {
// // // // // // // // //         const newProgress = Math.min(prev + 1, 100);
// // // // // // // // //         if (newProgress === 100) {
// // // // // // // // //           if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// // // // // // // // //           if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// // // // // // // // //           setIsActive(false);
// // // // // // // // //           onComplete?.();
// // // // // // // // //         }
// // // // // // // // //         return newProgress;
// // // // // // // // //       });
// // // // // // // // //     }, duration / 100);
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     return () => {
// // // // // // // // //       if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// // // // // // // // //       if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// // // // // // // // //     };
// // // // // // // // //   }, []);

// // // // // // // // //   return (
// // // // // // // // //     <div className="relative w-full max-w-2xl mx-auto">
// // // // // // // // //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// // // // // // // // //         {!isActive ? (
// // // // // // // // //           <button
// // // // // // // // //             onClick={startLoader}
// // // // // // // // //             className="absolute inset-0 m-auto w-16 h-16 rounded-full
// // // // // // // // //                      bg-blue-500 hover:bg-blue-600 flex items-center
// // // // // // // // //                      justify-center text-white transition-colors"
// // // // // // // // //           >
// // // // // // // // //             <Play size={32} />
// // // // // // // // //           </button>
// // // // // // // // //         ) : (
// // // // // // // // //           <>
// // // // // // // // //             {bubbles.map(bubble => (
// // // // // // // // //               <div
// // // // // // // // //                 key={bubble.id}
// // // // // // // // //                 className={`absolute rounded-full backdrop-blur ${bubble.color}`}
// // // // // // // // //                 style={{
// // // // // // // // //                   width: `${bubble.size}px`,
// // // // // // // // //                   height: `${bubble.size}px`,
// // // // // // // // //                   left: `${bubble.left}%`,
// // // // // // // // //                   bottom: 0,
// // // // // // // // //                   animation: 'simpleBubbleRise 4s forwards'
// // // // // // // // //                 }}
// // // // // // // // //               />
// // // // // // // // //             ))}

// // // // // // // // //             <div
// // // // // // // // //               className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
// // // // // // // // //               style={{ width: `${progress}%` }}
// // // // // // // // //             />
// // // // // // // // //             <div className="absolute top-4 left-4 text-lg font-semibold text-white">
// // // // // // // // //               Loading {Math.floor(progress)}%
// // // // // // // // //             </div>
// // // // // // // // //           </>
// // // // // // // // //         )}
// // // // // // // // //       </div>

// // // // // // // // //       <style>
// // // // // // // // //         {`
// // // // // // // // //           @keyframes simpleBubbleRise {
// // // // // // // // //             0% {
// // // // // // // // //               transform: translateY(0) scale(0.5);
// // // // // // // // //               opacity: 0;
// // // // // // // // //             }
// // // // // // // // //             20% {
// // // // // // // // //               transform: translateY(-20vh) scale(0.8);
// // // // // // // // //               opacity: 0.8;
// // // // // // // // //             }
// // // // // // // // //             50% {
// // // // // // // // //                transform: translateY(-40vh) scale(0.8);
// // // // // // // // //               opacity: 0.8;
// // // // // // // // //             }
// // // // // // // // //             80% {
// // // // // // // // //                transform: translateY(-80vh) scale(0.8);
// // // // // // // // //               opacity: 0.8;
// // // // // // // // //             }
// // // // // // // // //             100% {
// // // // // // // // //               transform: translateY(-120vh) scale(1);
// // // // // // // // //               opacity: 0;
// // // // // // // // //             }
// // // // // // // // //           }
// // // // // // // // //         `}
// // // // // // // // //       </style>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default BubbleLoader;
// // // // // // // // // // /*- Enhanced BubbleLoader Component -*/
// // // // // // // // // // "use client";
// // // // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // // // import { Play } from "lucide-react";

// // // // // // // // // // interface Bubble {
// // // // // // // // // //   id: number;
// // // // // // // // // //   size: number;
// // // // // // // // // //   left: number;
// // // // // // // // // //   color: string;
// // // // // // // // // // }

// // // // // // // // // // interface BubbleLoaderProps {
// // // // // // // // // //   duration?: number;
// // // // // // // // // //   onComplete?: () => void;
// // // // // // // // // //   colors?: string[];
// // // // // // // // // // }

// // // // // // // // // // const BubbleLoader: React.FC<BubbleLoaderProps> = ({
// // // // // // // // // //   duration = 5000,
// // // // // // // // // //   onComplete,
// // // // // // // // // //   colors = ['bg-blue-500/50', 'bg-indigo-500/50', 'bg-purple-500/50'],
// // // // // // // // // // }) => {
// // // // // // // // // //   const [isActive, setIsActive] = useState(false);
// // // // // // // // // //   const [progress, setProgress] = useState(0);
// // // // // // // // // //   const [bubbles, setBubbles] = useState<Bubble[]>([]);
// // // // // // // // // //   const progressIntervalRef = useRef<NodeJS.Timeout | undefined>();
// // // // // // // // // //   const bubbleIntervalRef = useRef<NodeJS.Timeout | undefined>();
// // // // // // // // // //   const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

// // // // // // // // // //   const startLoader = () => {
// // // // // // // // // //     setIsActive(true);
// // // // // // // // // //     setProgress(0);
// // // // // // // // // //     setBubbles([]);

// // // // // // // // // //     bubbleIntervalRef.current = setInterval(() => {
// // // // // // // // // //       setBubbles(prev => [
// // // // // // // // // //         ...prev.slice(-8),
// // // // // // // // // //         {
// // // // // // // // // //           id: Date.now(),
// // // // // // // // // //           size: Math.random() * 30 + 20,
// // // // // // // // // //           left: Math.random() * 80 + 10,
// // // // // // // // // //           color: getRandomColor(),
// // // // // // // // // //         }
// // // // // // // // // //       ]);
// // // // // // // // // //     }, 500);

// // // // // // // // // //     progressIntervalRef.current = setInterval(() => {
// // // // // // // // // //       setProgress(prev => {
// // // // // // // // // //         const newProgress = Math.min(prev + 1, 100);
// // // // // // // // // //         if (newProgress === 100) {
// // // // // // // // // //           if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// // // // // // // // // //           if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// // // // // // // // // //           setIsActive(false);
// // // // // // // // // //           onComplete?.();
// // // // // // // // // //         }
// // // // // // // // // //         return newProgress;
// // // // // // // // // //       });
// // // // // // // // // //     }, duration / 100);
// // // // // // // // // //   };

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     return () => {
// // // // // // // // // //       if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
// // // // // // // // // //       if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
// // // // // // // // // //     };
// // // // // // // // // //   }, []);

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="relative w-full max-w-2xl mx-auto">
// // // // // // // // // //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// // // // // // // // // //         {!isActive ? (
// // // // // // // // // //           <button
// // // // // // // // // //             onClick={startLoader}
// // // // // // // // // //             className="absolute inset-0 m-auto w-16 h-16 rounded-full
// // // // // // // // // //                      bg-blue-500 hover:bg-blue-600 flex items-center
// // // // // // // // // //                      justify-center text-white transition-colors"
// // // // // // // // // //           >
// // // // // // // // // //             <Play size={32} />
// // // // // // // // // //           </button>
// // // // // // // // // //         ) : (
// // // // // // // // // //           <>
// // // // // // // // // //             {bubbles.map(bubble => (
// // // // // // // // // //               <div
// // // // // // // // // //                 key={bubble.id}
// // // // // // // // // //                 className="absolute rounded-full bg-blue-500/50 backdrop-blur"
// // // // // // // // // //                 style={{
// // // // // // // // // //                   width: `${bubble.size}px`,
// // // // // // // // // //                   height: `${bubble.size}px`,
// // // // // // // // // //                   left: `${bubble.left}%`,
// // // // // // // // // //                   bottom: 0,
// // // // // // // // // //                   animation: 'simpleBubbleRise 4s forwards'
// // // // // // // // // //                 }}
// // // // // // // // // //               />
// // // // // // // // // //             ))}

// // // // // // // // // //             <div
// // // // // // // // // //               className="absolute bottom-0 left-0 h-2 bg-blue-500 transition-all"
// // // // // // // // // //               style={{ width: `${progress}%` }}
// // // // // // // // // //             />
// // // // // // // // // //             <div className="absolute top-4 left-4 text-lg font-semibold text-white">
// // // // // // // // // //               Loading {Math.floor(progress)}%
// // // // // // // // // //             </div>
// // // // // // // // // //           </>
// // // // // // // // // //         )}
// // // // // // // // // //       </div>

// // // // // // // // // //       <style>
// // // // // // // // // //         {`
// // // // // // // // // //           @keyframes simpleBubbleRise {
// // // // // // // // // //             0% {
// // // // // // // // // //               transform: translateY(0) scale(0.5);
// // // // // // // // // //               opacity: 0;
// // // // // // // // // //             }
// // // // // // // // // //             20% {
// // // // // // // // // //               transform: translateY(-20vh) scale(0.8);
// // // // // // // // // //               opacity: 0.8;
// // // // // // // // // //             }
// // // // // // // // // //             80% {
// // // // // // // // // //               opacity: 0.8;
// // // // // // // // // //             }
// // // // // // // // // //             100% {
// // // // // // // // // //               transform: translateY(-120vh) scale(1);
// // // // // // // // // //               opacity: 0;
// // // // // // // // // //             }
// // // // // // // // // //           }
// // // // // // // // // //         `}
// // // // // // // // // //       </style>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default BubbleLoader;

// // // // // // // // // // // /*- Enhanced BubbleLoader with Customization -*/
// // // // // // // // // // // "use client";
// // // // // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // // // // import { Play, Loader2 } from "lucide-react";

// // // // // // // // // // // interface Bubble {
// // // // // // // // // // //   id: number;
// // // // // // // // // // //   size: number;
// // // // // // // // // // //   left: number;
// // // // // // // // // // //   color: string;
// // // // // // // // // // //   duration: number;
// // // // // // // // // // // }

// // // // // // // // // // // interface BubbleLoaderProps {
// // // // // // // // // // //   duration?: number;
// // // // // // // // // // //   onComplete?: () => void;
// // // // // // // // // // //   colors?: string[];
// // // // // // // // // // //   maxBubbles?: number;
// // // // // // // // // // //   bubbleInterval?: number;
// // // // // // // // // // //   minSize?: number;
// // // // // // // // // // //   maxSize?: number;
// // // // // // // // // // //   className?: string;
// // // // // // // // // // // }

// // // // // // // // // // // const BubbleLoader: React.FC<BubbleLoaderProps> = ({
// // // // // // // // // // //   duration = 5000,
// // // // // // // // // // //   onComplete,
// // // // // // // // // // //   colors = ['bg-blue-500/50', 'bg-indigo-500/50', 'bg-purple-500/50'],
// // // // // // // // // // //   maxBubbles = 8,
// // // // // // // // // // //   bubbleInterval = 500,
// // // // // // // // // // //   minSize = 20,
// // // // // // // // // // //   maxSize = 50,
// // // // // // // // // // //   className = ''
// // // // // // // // // // // }) => {
// // // // // // // // // // //   const [isActive, setIsActive] = useState(false);
// // // // // // // // // // //   const [progress, setProgress] = useState(0);
// // // // // // // // // // //   const [bubbles, setBubbles] = useState<Bubble[]>([]);
// // // // // // // // // // //   const [isInitializing, setIsInitializing] = useState(false);
// // // // // // // // // // //   const progressInterval = useRef<NodeJS.Timeout>();
// // // // // // // // // // // //   const bubbleInterval = useRef<NodeJS.Timeout>();

// // // // // // // // // // //   const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
// // // // // // // // // // //   const getRandomDuration = () => Math.random() * 1000 + 3000; // 3-4s duration

// // // // // // // // // // //   const startLoader = async () => {
// // // // // // // // // // //     setIsInitializing(true);
// // // // // // // // // // //     // Small delay to show initialization state
// // // // // // // // // // //     await new Promise(resolve => setTimeout(resolve, 300));

// // // // // // // // // // //     setIsActive(true);
// // // // // // // // // // //     setProgress(0);
// // // // // // // // // // //     setBubbles([]);
// // // // // // // // // // //     setIsInitializing(false);

// // // // // // // // // // //     // Create bubbles periodically
// // // // // // // // // // //     bubbleInterval.current = setInterval(() => {
// // // // // // // // // // //       setBubbles(prev => [
// // // // // // // // // // //         ...prev.slice(-maxBubbles),
// // // // // // // // // // //         {
// // // // // // // // // // //           id: Date.now(),
// // // // // // // // // // //           size: Math.random() * (maxSize - minSize) + minSize,
// // // // // // // // // // //           left: Math.random() * 80 + 10,
// // // // // // // // // // //           color: getRandomColor(),
// // // // // // // // // // //           duration: getRandomDuration()
// // // // // // // // // // //         }
// // // // // // // // // // //       ]);
// // // // // // // // // // //     }, bubbleInterval);

// // // // // // // // // // //     // Progress bar
// // // // // // // // // // //     progressInterval.current = setInterval(() => {
// // // // // // // // // // //       setProgress(prev => {
// // // // // // // // // // //         const newProgress = Math.min(prev + 1, 100);
// // // // // // // // // // //         if (newProgress === 100) {
// // // // // // // // // // //           clearAllIntervals();
// // // // // // // // // // //           setIsActive(false);
// // // // // // // // // // //           onComplete?.();
// // // // // // // // // // //         }
// // // // // // // // // // //         return newProgress;
// // // // // // // // // // //       });
// // // // // // // // // // //     }, duration / 100);
// // // // // // // // // // //   };

// // // // // // // // // // //   const clearAllIntervals = () => {
// // // // // // // // // // //     if (progressInterval.current) clearInterval(progressInterval.current);
// // // // // // // // // // //     if (bubbleInterval.current) clearInterval(bubbleInterval.current);
// // // // // // // // // // //   };

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     return clearAllIntervals;
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
// // // // // // // // // // //       <div className="relative aspect-[16/9] bg-gray-800 dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl">
// // // // // // // // // // //         {!isActive ? (
// // // // // // // // // // //           <button
// // // // // // // // // // //             onClick={startLoader}
// // // // // // // // // // //             disabled={isInitializing}
// // // // // // // // // // //             className="absolute inset-0 m-auto w-16 h-16 rounded-full
// // // // // // // // // // //                      bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400
// // // // // // // // // // //                      flex items-center justify-center text-white
// // // // // // // // // // //                      transition-all transform hover:scale-105
// // // // // // // // // // //                      disabled:cursor-not-allowed"
// // // // // // // // // // //             aria-label="Start loading animation"
// // // // // // // // // // //           >
// // // // // // // // // // //             {isInitializing ? (
// // // // // // // // // // //               <Loader2 className="w-8 h-8 animate-spin" />
// // // // // // // // // // //             ) : (
// // // // // // // // // // //               <Play size={32} />
// // // // // // // // // // //             )}
// // // // // // // // // // //           </button>
// // // // // // // // // // //         ) : (
// // // // // // // // // // //           <>
// // // // // // // // // // //             {/* Multiple Bubbles */}
// // // // // // // // // // //             {bubbles.map(bubble => (
// // // // // // // // // // //               <div
// // // // // // // // // // //                 key={bubble.id}
// // // // // // // // // // //                 className={`absolute rounded-full backdrop-blur ${bubble.color}`}
// // // // // // // // // // //                 style={{
// // // // // // // // // // //                   width: `${bubble.size}px`,
// // // // // // // // // // //                   height: `${bubble.size}px`,
// // // // // // // // // // //                   left: `${bubble.left}%`,
// // // // // // // // // // //                   animation: `simpleBubbleRise ${bubble.duration}ms forwards`
// // // // // // // // // // //                 }}
// // // // // // // // // // //               />
// // // // // // // // // // //             ))}

// // // // // // // // // // //             {/* Progress Bar */}
// // // // // // // // // // //             <div
// // // // // // // // // // //               className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
// // // // // // // // // // //               style={{ width: `${progress}%` }}
// // // // // // // // // // //             />
// // // // // // // // // // //             <div className="absolute top-4 left-4 text-lg font-semibold text-white">
// // // // // // // // // // //               Loading {Math.floor(progress)}%
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </>
// // // // // // // // // // //         )}
// // // // // // // // // // //       </div>

// // // // // // // // // // //       <style>
// // // // // // // // // // //         {`
// // // // // // // // // // //           @keyframes simpleBubbleRise {
// // // // // // // // // // //             0% {
// // // // // // // // // // //               transform: translateY(100%) scale(0.5);
// // // // // // // // // // //               opacity: 0;
// // // // // // // // // // //             }
// // // // // // // // // // //             20% {
// // // // // // // // // // //               transform: translateY(80%) scale(0.8);
// // // // // // // // // // //               opacity: 0.8;
// // // // // // // // // // //             }
// // // // // // // // // // //             80% {
// // // // // // // // // // //               opacity: 0.8;
// // // // // // // // // // //             }
// // // // // // // // // // //             100% {
// // // // // // // // // // //               transform: translateY(-100%) scale(1);
// // // // // // // // // // //               opacity: 0;
// // // // // // // // // // //             }
// // // // // // // // // // //           }
// // // // // // // // // // //         `}
// // // // // // // // // // //       </style>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default BubbleLoader;
// // // // // // // // // // // // "use client";
// // // // // // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // // // // // import { Play } from "lucide-react";

// // // // // // // // // // // // interface Bubble {
// // // // // // // // // // // //   id: number;
// // // // // // // // // // // //   size: number;
// // // // // // // // // // // //   left: number;
// // // // // // // // // // // // }

// // // // // // // // // // // // interface BubbleLoaderProps {
// // // // // // // // // // // //   duration?: number;
// // // // // // // // // // // //   onComplete?: () => void;
// // // // // // // // // // // // }

// // // // // // // // // // // // const BubbleLoader: React.FC<BubbleLoaderProps> = ({
// // // // // // // // // // // //   duration = 5000,
// // // // // // // // // // // //   onComplete
// // // // // // // // // // // // }) => {
// // // // // // // // // // // //   const [isActive, setIsActive] = useState(false);
// // // // // // // // // // // //   const [progress, setProgress] = useState(0);
// // // // // // // // // // // //   const [bubbles, setBubbles] = useState<Bubble[]>([]);
// // // // // // // // // // // //   const progressInterval = useRef<NodeJS.Timeout>();
// // // // // // // // // // // //   const bubbleInterval = useRef<NodeJS.Timeout>();

// // // // // // // // // // // //   const startLoader = () => {
// // // // // // // // // // // //     setIsActive(true);
// // // // // // // // // // // //     setProgress(0);
// // // // // // // // // // // //     setBubbles([]);

// // // // // // // // // // // //     // Create bubbles periodically
// // // // // // // // // // // //     bubbleInterval.current = setInterval(() => {
// // // // // // // // // // // //       setBubbles(prev => [
// // // // // // // // // // // //         ...prev.slice(-8), // Keep only last 8 bubbles to manage performance
// // // // // // // // // // // //         {
// // // // // // // // // // // //           id: Date.now(),
// // // // // // // // // // // //           size: Math.random() * 30 + 20, // Size between 20-50px
// // // // // // // // // // // //           left: Math.random() * 80 + 10, // Position between 10-90%
// // // // // // // // // // // //         }
// // // // // // // // // // // //       ]);
// // // // // // // // // // // //     }, 500); // Create new bubble every 500ms

// // // // // // // // // // // //     // Progress bar
// // // // // // // // // // // //     progressInterval.current = setInterval(() => {
// // // // // // // // // // // //       setProgress(prev => {
// // // // // // // // // // // //         const newProgress = Math.min(prev + 1, 100);
// // // // // // // // // // // //         if (newProgress === 100) {
// // // // // // // // // // // //           if (progressInterval.current) clearInterval(progressInterval.current);
// // // // // // // // // // // //           if (bubbleInterval.current) clearInterval(bubbleInterval.current);
// // // // // // // // // // // //           setIsActive(false);
// // // // // // // // // // // //           onComplete?.();
// // // // // // // // // // // //         }
// // // // // // // // // // // //         return newProgress;
// // // // // // // // // // // //       });
// // // // // // // // // // // //     }, duration / 100);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Cleanup on unmount
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       if (progressInterval.current) clearInterval(progressInterval.current);
// // // // // // // // // // // //       if (bubbleInterval.current) clearInterval(bubbleInterval.current);
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="relative w-full max-w-2xl mx-auto">
// // // // // // // // // // // //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// // // // // // // // // // // //         {!isActive ? (
// // // // // // // // // // // //           <button
// // // // // // // // // // // //             onClick={startLoader}
// // // // // // // // // // // //             className="absolute inset-0 m-auto w-16 h-16 rounded-full
// // // // // // // // // // // //                      bg-blue-500 hover:bg-blue-600 flex items-center
// // // // // // // // // // // //                      justify-center text-white transition-colors"
// // // // // // // // // // // //           >
// // // // // // // // // // // //             <Play size={32} />
// // // // // // // // // // // //           </button>
// // // // // // // // // // // //         ) : (
// // // // // // // // // // // //           <>
// // // // // // // // // // // //             {/* Multiple Bubbles */}
// // // // // // // // // // // //             {bubbles.map(bubble => (
// // // // // // // // // // // //               <div
// // // // // // // // // // // //                 key={bubble.id}
// // // // // // // // // // // //                 className="absolute rounded-full bg-blue-500/50 backdrop-blur"
// // // // // // // // // // // //                 style={{
// // // // // // // // // // // //                   width: `${bubble.size}px`,
// // // // // // // // // // // //                   height: `${bubble.size}px`,
// // // // // // // // // // // //                   left: `${bubble.left}%`,
// // // // // // // // // // // //                   animation: 'simpleBubbleRise 4s forwards'
// // // // // // // // // // // //                 }}
// // // // // // // // // // // //               />
// // // // // // // // // // // //             ))}

// // // // // // // // // // // //             {/* Progress Bar */}
// // // // // // // // // // // //             <div
// // // // // // // // // // // //               className="absolute bottom-0 left-0 h-2 bg-blue-500 transition-all"
// // // // // // // // // // // //               style={{ width: `${progress}%` }}
// // // // // // // // // // // //             />
// // // // // // // // // // // //             <div className="absolute top-4 left-4 text-lg font-semibold text-white">
// // // // // // // // // // // //               Loading {Math.floor(progress)}%
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </>
// // // // // // // // // // // //         )}
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       <style>
// // // // // // // // // // // //         {`
// // // // // // // // // // // //           @keyframes simpleBubbleRise {
// // // // // // // // // // // //             0% {
// // // // // // // // // // // //               transform: translateY(100%) scale(0.5);
// // // // // // // // // // // //               opacity: 0;
// // // // // // // // // // // //             }
// // // // // // // // // // // //             20% {
// // // // // // // // // // // //               transform: translateY(80%) scale(0.8);
// // // // // // // // // // // //               opacity: 0.8;
// // // // // // // // // // // //             }
// // // // // // // // // // // //             80% {
// // // // // // // // // // // //               opacity: 0.8;
// // // // // // // // // // // //             }
// // // // // // // // // // // //             100% {
// // // // // // // // // // // //               transform: translateY(-100%) scale(1);
// // // // // // // // // // // //               opacity: 0;
// // // // // // // // // // // //             }
// // // // // // // // // // // //           }
// // // // // // // // // // // //         `}
// // // // // // // // // // // //       </style>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default BubbleLoader;

// // // // // // // // // // // // // // Basic Working Loader with Single Animation
// // // // // // // // // // // // // "use client";
// // // // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // // // import { Play } from "lucide-react";

// // // // // // // // // // // // // interface BubbleLoaderProps {
// // // // // // // // // // // // //   duration?: number;
// // // // // // // // // // // // //   onComplete?: () => void;
// // // // // // // // // // // // // }

// // // // // // // // // // // // // const BubbleLoader: React.FC<BubbleLoaderProps> = ({
// // // // // // // // // // // // //   duration = 5000,
// // // // // // // // // // // // //   onComplete
// // // // // // // // // // // // // }) => {
// // // // // // // // // // // // //   const [isActive, setIsActive] = useState(false);
// // // // // // // // // // // // //   const [progress, setProgress] = useState(0);

// // // // // // // // // // // // //   const startLoader = () => {
// // // // // // // // // // // // //     setIsActive(true);
// // // // // // // // // // // // //     setProgress(0);
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     let intervalId: NodeJS.Timeout | undefined;

// // // // // // // // // // // // //     if (isActive) {
// // // // // // // // // // // // //       intervalId = setInterval(() => {
// // // // // // // // // // // // //         setProgress(prev => {
// // // // // // // // // // // // //           const newProgress = Math.min(prev + 1, 100);
// // // // // // // // // // // // //           if (newProgress === 100) {
// // // // // // // // // // // // //             clearInterval(intervalId);
// // // // // // // // // // // // //             setIsActive(false);
// // // // // // // // // // // // //             onComplete?.();
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           return newProgress;
// // // // // // // // // // // // //         });
// // // // // // // // // // // // //       }, duration / 100);
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // //       if (intervalId) clearInterval(intervalId);
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //   }, [isActive, duration, onComplete]);

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="relative w-full max-w-2xl mx-auto">
// // // // // // // // // // // // //       <div className="relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
// // // // // // // // // // // // //         {!isActive ? (
// // // // // // // // // // // // //           <button
// // // // // // // // // // // // //             onClick={startLoader}
// // // // // // // // // // // // //             className="absolute inset-0 m-auto w-16 h-16 rounded-full
// // // // // // // // // // // // //                      bg-blue-500 hover:bg-blue-600 flex items-center
// // // // // // // // // // // // //                      justify-center text-white transition-colors"
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             <Play size={32} />
// // // // // // // // // // // // //           </button>
// // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // //           <>
// // // // // // // // // // // // //             {/* Single test bubble to verify animation works */}
// // // // // // // // // // // // //             <div
// // // // // // // // // // // // //               className="absolute rounded-full bg-blue-500/50 backdrop-blur"
// // // // // // // // // // // // //               style={{
// // // // // // // // // // // // //                 width: '40px',
// // // // // // // // // // // // //                 height: '40px',
// // // // // // // // // // // // //                 left: '50%',
// // // // // // // // // // // // //                 animation: 'simpleBubbleRise 4s infinite'
// // // // // // // // // // // // //               }}
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //             <div
// // // // // // // // // // // // //               className="absolute bottom-0 left-0 h-2 bg-blue-500 transition-all"
// // // // // // // // // // // // //               style={{ width: `${progress}%` }}
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //             <div className="absolute top-4 left-4 text-lg font-semibold text-white">
// // // // // // // // // // // // //               Loading {Math.floor(progress)}%
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </>
// // // // // // // // // // // // //         )}
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       <style>
// // // // // // // // // // // // //         {`
// // // // // // // // // // // // //           @keyframes simpleBubbleRise {
// // // // // // // // // // // // //             from { transform: translateY(100%); }
// // // // // // // // // // // // //             to { transform: translateY(-100%); }
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //         `}
// // // // // // // // // // // // //       </style>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default BubbleLoader;
