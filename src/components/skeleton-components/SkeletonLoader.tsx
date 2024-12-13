import React from 'react';

const SkeletonLoader = ({ height = 'h-5', width = 'w-full', rounded = 'rounded-md' }) => {
  return (
    <div
      className={`bg-gray-200 ${height} ${width} ${rounded} animate-pulse`}
    ></div>
  );
};

export default SkeletonLoader;