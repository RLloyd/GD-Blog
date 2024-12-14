/*-= src/hooks/useFetchData.ts =-*/
import { useState, useEffect, useRef } from 'react';

type FetchDataOptions<T> = {
   fetchData: () => Promise<T>; // Function to fetch data
   onIntersect?: boolean; // Whether to use IntersectionObserver
   threshold?: number; // IntersectionObserver threshold
   initialData?: T | null; // Initial state for data
};

export const useFetchData = <T>({
   fetchData,
   onIntersect = true,
   threshold = 0.5,
   initialData = null,
}: FetchDataOptions<T>) => {
   const [data, setData] = useState<T | null>(initialData);
   const [loading, setLoading] = useState(false);
   const ref = useRef<HTMLDivElement | null>(null);

   const loadData = async () => {
      setLoading(true);
      try {
         const result = await fetchData();
         setData(result);
      } catch (error) {
         console.error('Error fetching data:', error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      loadData();
   }, []);

   useEffect(() => {
      if (!onIntersect) return;

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  loadData();
               }
            });
         },
         { threshold }
      );

      if (ref.current) {
         observer.observe(ref.current);
      }

      return () => {
         if (ref.current) {
            observer.unobserve(ref.current);
         }
      };
   }, [onIntersect, threshold]);

   return { data, loading, ref };
};