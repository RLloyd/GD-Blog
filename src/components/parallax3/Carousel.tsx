/*-= src/components/parallax3/Carousel.tsx =-*/
/*-= Claude's version =-*/
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface CarouselProps {
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const carouselImages = [
  '/assets/images/carousel1.jpg',
  '/assets/images/carousel2.jpg',
  '/assets/images/carousel3.png',
];

const Carousel: React.FC<CarouselProps> = ({
  autoSlide = false,
  autoSlideInterval = 3000
}) => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent(current => (
      current === 0 ? carouselImages.length - 1 : current - 1
    ));
  };

  const next = () => {
    setCurrent(current => (
      current === carouselImages.length - 1 ? 0 : current + 1
    ));
  };

  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="overflow-hidden relative rounded-lg">
      <div className="flex relative aspect-[16/9]">
        {carouselImages.map((src, index) => (
          <motion.div
            key={src}
            className="min-w-full relative"
            initial={{ opacity: 0 }}
            animate={{
              opacity: current === index ? 1 : 0,
              x: `${(index - current) * 100}%`
            }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
        >
          <BiChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
        >
          <BiChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

// // Carousel Component (Typescript)
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

// interface CarouselProps {
//   children: React.Node;
//   autoSlide?: boolean;
//   autoSlideInterval?: number;
// }

// const Carousel: React.FC<CarouselProps> = ({ children, autoSlide = false, autoSlideInterval = 3000 }) => {
//   const [current, setCurrent] = useState(0);

//   const carouselAnimVariant = {
//     hidden: { translateX: 0 },
//     visible: {
//       translateX: `-${current * 100}%`,
//       transition: { type: "spring", stiffness: 300, damping: 30 }
//     }
//   };

//   const prev = () => {
//     setCurrent((current) => (current === 0 ? children.length - 1 : current - 1));
//   };

//   const next = () => {
//     setCurrent((current) => (current === children.length - 1 ? 0 : current + 1));
//   };

//   useEffect(() => {
//     if (!autoSlide) return;
//     const slideInterval = setInterval(next, autoSlideInterval);
//     return () => clearInterval(slideInterval);
//   }, [autoSlide, autoSlideInterval]);

//   return (
//     <div className="carouselContainer overflow-hidden relative w-auto max-w-640 h-auto rounded-lg">
//       <motion.div className="carouselWrapper gap-0" variants={carouselAnimVariant} initial="hidden" animate="visible">
//         {children}
//       </motion.div>

//       {/* Buttons */}
//       <div className="buttonsWrapper absolute flex items-center justify-between p-4 inset-0">
//         <button type="button" onClick={prev} className="btn btn-primary rounded-full">
//           <BiChevronLeft size={40} />
//         </button>
//         <button type="button" onClick={next} className="btn btn-primary rounded-full">
//           <BiChevronRight size={40} />
//         </button>
//       </div>

//       {/* Dots */}
//       <div className="dotsContainer absolute bottom-4 right-0 left-0 flex items-center justify-center gap-2">
//         {React.Children.map(children, (_, index) => (
//           <div key={index} className="dot rounded-full w-2 h-2 bg-white opacity-50" style={{ backgroundColor: current === index ? '#fff' : 'rgba(0, 0, 0, 0.35)' }} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;