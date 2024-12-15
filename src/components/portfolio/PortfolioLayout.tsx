// src/components/portfolio/PortfolioLayout.tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    // Connect GSAP and Lenis
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000)
    })

    // Clean up
    return () => {
      lenisRef.current?.destroy()
      gsap.ticker.remove((time) => {
        lenisRef.current?.raf(time * 1000)
      })
    }
  }, [])

  return <div className="portfolio-container">{children}</div>
}

