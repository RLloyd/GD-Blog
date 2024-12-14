/*-= src/hooks/useLazyLoadComponentWithVisibility.ts =-*/
import { useState, useEffect, useRef, useCallback } from 'react';

type UseLazyLoadComponentOptions = {
   importComponent: () => Promise<{ default: React.ComponentType<any> }>;
   threshold?: number; // IntersectionObserver threshold
};

export const useLazyLoadComponentWithVisibility = ({
   importComponent,
   threshold = 0.5,
}: UseLazyLoadComponentOptions) => {
   const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
   const [loading, setLoading] = useState(false);
   const [isVisible, setIsVisible] = useState(false);
   const ref = useRef<HTMLDivElement | null>(null);

   const loadComponent = useCallback(async () => {
      setLoading(true);
      try {
         const { default: loadedComponent } = await importComponent();
         setComponent(() => loadedComponent);
      } catch (error) {
         console.error('Error loading component:', error);
      } finally {
         setLoading(false);
      }
   }, [importComponent]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  setIsVisible(true);
                  if (!Component) loadComponent();
               } else {
                  setIsVisible(false);
                  setComponent(null); // Reset the component when out of view
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
   }, [Component, loadComponent, threshold]);

   return { Component, loading, isVisible, ref };
};

//    const loadComponent = async () => {
//       setLoading(true);
//       try {
//          const { default: loadedComponent } = await importComponent();
//          setComponent(() => loadedComponent);
//       } catch (error) {
//          console.error('Error loading component:', error);
//       } finally {
//          setLoading(false);
//       }
//    };

//    useEffect(() => {
//       const observer = new IntersectionObserver(
//          (entries) => {
//             entries.forEach((entry) => {
//                if (entry.isIntersecting) {
//                   setIsVisible(true);
//                   if (!Component) loadComponent();
//                } else {
//                   setIsVisible(false);
//                   setComponent(null); // Reset the component when out of view
//                }
//             });
//          },
//          { threshold }
//       );

//       if (ref.current) {
//          observer.observe(ref.current);
//       }

//       return () => {
//          observer.disconnect();
//       };
//    }, []);

//    return { Component, loading, isVisible, ref };
// };