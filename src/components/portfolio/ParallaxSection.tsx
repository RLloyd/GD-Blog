// src/components/portfolio/ParallaxSection.tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function ParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop animations
    mm.add("(min-width: 768px)", () => {
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true
        }
      });
    });

    // Mobile animations
    mm.add("(max-width: 767px)", () => {
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 30%', // Less dramatic on mobile
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: false // No pinning on mobile
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    // ... component JSX
  );
}