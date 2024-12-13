import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const SkeletonLoaderAppApp = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Skeleton Loader Example</h1>
      <SkeletonLoader height="h-10" width="w-3/4" rounded="rounded-lg" />
      <SkeletonLoader height="h-6" width="w-1/2" />
      <SkeletonLoader height="h-6" width="w-full" />
    </div>
  );
};

export default SkeletonLoaderAppApp;