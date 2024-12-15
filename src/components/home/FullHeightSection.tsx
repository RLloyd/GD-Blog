// src/components/home/FullHeightSection.tsx
'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface FullHeightSectionProps {
  title: string;
  subtitle?: string;
  image: string;
  backgroundColor: string;
  align?: 'left' | 'right' | 'center';
  children?: React.ReactNode;
}

export function FullHeightSection({
  title,
  subtitle,
  image,
  backgroundColor,
  align = 'center',
  children
}: FullHeightSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const imageWrapper = imageRef.current;

    if (!section || !content || !imageWrapper) return;

    gsap.set(content, { yPercent: 30, opacity: 0 });
    gsap.set(imageWrapper, { scale: 1.2 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });

    tl.to(content, {
      yPercent: 0,
      opacity: 1,
      duration: 1
    })
    .to(imageWrapper, {
      scale: 1,
      duration: 1
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  const alignmentClasses = {
    left: 'items-start text-left',
    right: 'items-end text-right',
    center: 'items-center text-center'
  };

  return (
   <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      >
      {/* Image container with lower z-index */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full z-0"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Colored overlay on top of image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: backgroundColor,
            opacity: 0.07  // Adjust this value to control overlay intensity
          }}
        />
      </div>

      {/* Content with higher z-index */}
      <div
        ref={contentRef}
        className={`relative z-10 container mx-auto px-4 py-20 flex flex-col ${alignmentClasses[align]}`}
      >
        <h2 className="text-5xl sm:text-7xl font-garamond text-white mb-6">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>

   //  <section
   //    ref={sectionRef}
   //    className="relative min-h-screen flex items-center"
   //    style={{ backgroundColor }}
   //    >
   //    <div
   //      ref={imageRef}
   //      className="absolute inset-0 w-full h-full -z-10"
   //    >
   //      <Image
   //          src={image}
   //          alt={title}
   //          fill
   //          quality={85}  // Adjust quality (default is 75)
   //          priority={true}  // For above-the-fold images
   //          className="object-cover"
   //          sizes="100vw"  // Since it's full-width
   //          placeholder="blur"  // Optional: Add blur effect while loading
   //          blurDataURL="data:image/jpeg;base64,/9j..." // Base64 blur placeholder
   //          />

   //      <div className="absolute inset-0"
   //       style={{
   //          backgroundColor: backgroundColor,
   //          opacity: 0.7  // Adjust this value to control overlay intensity
   //        }}  />
   //    </div>

   //    <div
   //      ref={contentRef}
   //      className={`relative z-10 container mx-auto px-4 py-20 flex flex-col ${alignmentClasses[align]}`}
   //    >
   //      <h2 className="text-5xl sm:text-7xl font-garamond text-white mb-6">
   //        {title}
   //      </h2>
   //      {subtitle && (
   //        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl">
   //          {subtitle}
   //        </p>
   //      )}
   //      {children}
   //    </div>
   //  </section>
  );
}

