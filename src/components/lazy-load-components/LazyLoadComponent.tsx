/*-= src/components/lazy-load-components/LazyLoadComponent.tsx =-*/
import { useLazyLoadComponent } from '@/hooks/useLazyLoadComponent';
import React from 'react';

type LazyLoadComponentProps = {
   importComponent: () => Promise<{ default: React.ComponentType<any> }>;
   fallback?: React.ReactNode; // Optional loading indicator
   onIntersect?: boolean;
};

const LazyLoadComponent: React.FC<LazyLoadComponentProps> = ({
   importComponent,
   fallback = <p>Loading component...</p>,
   onIntersect = true,
}) => {
   const { Component, loading, ref } = useLazyLoadComponent({
      importComponent,
      onIntersect,
   });

   return (
      <div ref={ref}>
         {loading && fallback}
         {Component && <Component />}
      </div>
   );
};

export default LazyLoadComponent;