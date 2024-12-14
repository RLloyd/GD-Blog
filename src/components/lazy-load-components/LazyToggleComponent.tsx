import { useVisibilityToggleComponent } from '@/hooks/useVisibilityToggleComponent';
import React from 'react';


type LazyToggleComponentProps = {
   importComponent: () => Promise<{ default: React.ComponentType<any> }>;
   fallback?: React.ReactNode; // Optional loading indicator
};

const LazyToggleComponent: React.FC<LazyToggleComponentProps> = ({
   importComponent,
   fallback = <p>Loading...</p>,
}) => {
   const { Component, loading, ref } = useVisibilityToggleComponent({
      importComponent,
   });

   return (
      <div ref={ref}>
         {loading && fallback}
         {Component && <Component />}
      </div>
   );
};

export default LazyToggleComponent;