// src/components/blog-components/LazyImageLoader.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";

// Lazy load the BubbleLoader component
const BubbleLoader = React.lazy(() => import("./BubbleLoader"));

const LazyImageLoader: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the loader is visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  const handleLoaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={loaderRef} style={{ position: "relative", minHeight: "300px" }}>
      {!isLoaded && isVisible && (
        <React.Suspense fallback={<div>Loading animation...</div>}>
          <BubbleLoader duration={5000} onComplete={handleLoaderComplete} />
        </React.Suspense>
      )}
      {isLoaded && (
        <img
          src={src}
          alt={alt}
          style={{ display: "block", width: "100%", height: "auto", objectFit: "cover" }}
        />
      )}
    </div>
  );
};

export default LazyImageLoader;