// src/components/portfolio/ProjectSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Reveal animation for projects
    gsap.from(section.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: section,
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-100 dark:bg-gray-900"
    >
      {/* Add your project cards/content here */}
    </section>
  )
}

