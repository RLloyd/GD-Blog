/*-= src/components/lazy-load-components/SkeletonLoader.tsx =-*/
// Similar to the one in skeleton-components with minor diff.
// The skeleton loader is a reusable placeholder that mimics the size and shape of the component being loaded.

import React from 'react';

type SkeletonLoaderProps = {
   height?: string;
   width?: {
      mobile?: string;
      tablet?: string;
      desktop?: string;
   } | string;
   rounded?: string;
   className?: string;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ height, width, rounded = 'rounded', className }) => {
   const getWidthClasses = () => {
      if (typeof width === 'string') {
         return width;
      }

      return `
        ${width.mobile || 'w-full'}
        ${width.tablet || ''}
        ${width.desktop || ''}
      `.trim();
   };

   return (
      // <div
      //    className={`bg-gray-300 animate-pulse ${height} ${width} ${rounded}`}
      //    style={{ marginBottom: '1rem' }}
      // ></div>
      <div
         className={`
        bg-gray-300 dark:bg-gray-700
        ${height}
        ${getWidthClasses()}
        ${rounded}
        animate-pulse
        ${className}
      `}
      />
   );
};

export default SkeletonLoader;