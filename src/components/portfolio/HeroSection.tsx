// src/components/portfolio/HeroSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export function HeroSection() {
   const sectionRef = useRef<HTMLElement>(null)
   const headingRef = useRef<HTMLHeadingElement>(null)
   const imageRef = useRef<HTMLDivElement>(null)

   //   useEffect(() => {
   //     const section = sectionRef.current
   //     const heading = headingRef.current
   //     const image = imageRef.current

   //     if (!section || !heading || !image) return

   //     // Create parallax effect
   //     gsap.to(image, {
   //       yPercent: 50,
   //       ease: 'none',
   //       scrollTrigger: {
   //         trigger: section,
   //         start: 'top top',
   //         end: 'bottom top',
   //         scrub: true
   //       }
   //     })

   //     // Fade in heading
   //     gsap.from(heading, {
   //       y: 100,
   //       opacity: 0,
   //       duration: 1.5,
   //       scrollTrigger: {
   //         trigger: heading,
   //         start: 'top center',
   //         toggleActions: 'play none none reverse'
   //       }
   //     })
   //   }, [])

   useEffect(() => {
      const mm = gsap.matchMedia();

      // Desktop animations
      mm.add("(min-width: 768px)", () => {
         gsap.to(imageRef.current, {
            yPercent: 50,
            ease: 'none',
            scrollTrigger: {
               trigger: sectionRef.current,
               start: 'top top',
               end: 'bottom top',
               scrub: true
            }
         });

         gsap.from(headingRef.current, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            scrollTrigger: {
               trigger: headingRef.current,
               start: 'top center',
               toggleActions: 'play none none reverse'
            }
         });
      });

      // Mobile animations (simplified for performance)
      mm.add("(max-width: 767px)", () => {
         gsap.to(imageRef.current, {
            yPercent: 30, // Less parallax movement on mobile
            ease: 'none',
            scrollTrigger: {
               trigger: sectionRef.current,
               start: 'top top',
               end: 'bottom top',
               scrub: true
            }
         });

         gsap.from(headingRef.current, {
            y: 50, // Smaller movement on mobile
            opacity: 0,
            duration: 1,
            scrollTrigger: {
               trigger: headingRef.current,
               start: 'top center+=100',
               toggleActions: 'play none none reverse'
            }
         });
      });

      return () => mm.revert(); // Cleanup
   }, []);

   return (
      <section
         ref={sectionRef}
         className="relative h-screen overflow-hidden"
      >
         <div
            ref={imageRef}
            className="absolute inset-0 w-full h-[120%]"
         >
            <Image
               src="/assets/bonsaiLightBg.webp"
               alt="Hero Background"
               fill
               className="object-cover"
               priority
            />
         </div>

         <div className="relative z-10 flex items-center justify-center h-full">
            <h1
               ref={headingRef}
               className="text-6xl font-bold text-accent-500 text-center"
            >
               Welcome to My Portfolio
            </h1>
         </div>
      </section>
   )
}

