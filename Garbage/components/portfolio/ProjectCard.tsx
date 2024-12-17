// src/components/portfolio/ProjectCard.tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function ProjectCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop animations
    mm.add("(min-width: 768px)", () => {
      gsap.from(cardRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Mobile animations (simpler animation)
    mm.add("(max-width: 767px)", () => {
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    // ... component JSX
  );
}