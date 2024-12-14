/*-= src/hooks/useVisibilityToggleComponent.ts =-*/
import { useState, useEffect, useRef } from 'react';

type UseVisibilityToggleComponentOptions = {
   importComponent: () => Promise<{ default: React.ComponentType<any> }>;
   threshold?: number; // IntersectionObserver threshold
};

export const useVisibilityToggleComponent = ({
   importComponent,
   threshold = 0.5,
}: UseVisibilityToggleComponentOptions) => {
   const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
   const [loading, setLoading] = useState(false);
   const ref = useRef<HTMLDivElement | null>(null);

   const loadComponent = async () => {
      setLoading(true);
      try {
         const { default: loadedComponent } = await importComponent();
         setComponent(() => loadedComponent);
      } catch (error) {
         console.error('Error loading component:', error);
      } finally {
         setLoading(false);
      }
   };

   const unloadComponent = () => {
      setComponent(null);
   };

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  loadComponent();
               } else {
                  unloadComponent();
               }
            });
         },
         { threshold }
      );

      if (ref.current) {
         observer.observe(ref.current);
      }

      return () => {
         observer.disconnect();
      };
   }, []);

   return { Component, loading, ref };
};