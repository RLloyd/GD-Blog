// src/components/parallax/ParallaxSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface GridContentProps {
   number: string;
   title: string;
   description: string;
}

const GridContent = ({ number, title, description }: GridContentProps) => {
   return (
      <div className="flex gap-2 mt-4 pt-2 border-t border-primary-100">
         <div className="text-3xl md:text-4xl font-light w-16 leading-none">
            {number}
         </div>
         <div>
            <p className="text-xs uppercase">{title}</p>
            <button className="text-left text-xl font-light hover:text-primary-600 transition-colors">
               {description}
            </button>
         </div>
      </div>
   );
};

interface CarouselProps {
   images: string[];
   interval?: number;
}

const Carousel = ({ images, interval = 5000 }: CarouselProps) => {
   const carouselRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      let currentSlide = 0;
      const slides = carousel.children;
      const numSlides = slides.length;

      gsap.set(slides, { opacity: 0 });
      gsap.set(slides[0], { opacity: 1 });

      const slideshow = setInterval(() => {
         gsap.to(slides[currentSlide], { opacity: 0, duration: 1 });
         currentSlide = (currentSlide + 1) % numSlides;
         gsap.to(slides[currentSlide], { opacity: 1, duration: 1 });
      }, interval);

      return () => clearInterval(slideshow);
   }, [interval]);

   return (
      <div ref={carouselRef} className="relative w-full aspect-[16/9]">
         {images.map((src, index) => (
            <div key={index} className="absolute inset-0">
               <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  priority={index === 0}
               />
            </div>
         ))}
      </div>
   );
};

export default function ParallaxSection() {
   const containerRef = useRef<HTMLDivElement>(null);

   //  GSAP Parallax setup:
   useEffect(() => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: containerRef.current, // Element that triggers the animation
            start: 'top top', // Animation starts when top of element hits top of viewport
            end: 'bottom bottom', // Ends when bottom of element hits bottom of viewport
            scrub: 1, // Smooth animation that follows scroll position
         },
      });

      // Parallax animations for each layer
      tl.fromTo('.parallax-1',
         { y: 100 },  // Starting position
         { y: -200 }  // Ending position
      )
         .fromTo('.parallax-2',
            { y: 220 },
            { y: -400 },
            '<' // The '<' makes this animation start at same time as previous
         )
         .fromTo('.parallax-3',
            { y: 950, scale: 0.15 },
            { y: -2000, scale: 2.25 },
            '<'
         );

      return () => {
         tl.kill();
      };
   }, []);

   return (
      <div ref={containerRef} className="relative h-[4000px] w-11/12 mx-auto">
         <div className="relative h-[1600px] z-10">
            {/* Parallax Images */}
            <div className="sticky top-[50px] z-[1] parallax-1">
               <Image
                  src="/assets/images/parallax1.jpg"
                  alt="Parallax 1"
                  width={1920}
                  height={1080}
                  className="rounded-lg"
               />
            </div>

            <div className="sticky top-[70px] z-[2] parallax-2">
               <Image
                  src="/assets/images/parallax2.jpg"
                  alt="Parallax 2"
                  width={800}
                  height={600}
                  className="rounded-lg"
               />
            </div>

            <div className="sticky top-0 z-[5] parallax-3">
               <Image
                  src="/assets/images/parallax3.jpg"
                  alt="Parallax 3"
                  width={800}
                  height={600}
                  className="rounded-lg"
               />
            </div>
         </div>

         <div className="bg-primary-50 p-4 rounded-lg">
            <div className="flex flex-col lg:flex-row gap-4">
               <div className="lg:sticky lg:top-1/2 lg:h-fit-content">
                  <h1 className="text-4xl font-light text-primary-500">Carousel</h1>
                  <Carousel
                     images={[
                        '/assets/images/carousel1.jpg',
                        '/assets/images/carousel2.jpg',
                        '/assets/images/carousel3.jpg'
                     ]}
                  />
               </div>

               <div className="relative w-full md:w-[500px] text-left text-primary-900">
                  <h2 className="text-2xl font-light text-primary-400 uppercase tracking-wide mt-12 mb-4">
                     Multi Column Parallax
                  </h2>

                  <GridContent
                     number="1"
                     title="Position"
                     description="Parallax is the apparent shift in the position of an object."
                  />
                  {/* Add more GridContent components as needed */}
               </div>
            </div>
         </div>
      </div>
   );
}