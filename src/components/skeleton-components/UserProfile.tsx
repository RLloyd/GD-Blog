/*---= src/components/skeleton-components/UserProfile.tsx =---*/
"use client";
import React, { useState, useEffect, useRef } from 'react';
import SkeletonLoader from './SkeletonLoader';
import { CodeBlock } from '../blog/CodeBlock';

const skeletonLoaderCode = `
   {loading ? (
      <div className="mt-12 space-y-4">
         <SkeletonLoader height="h-8" width="w-1/2" />
         <SkeletonLoader height="h-6" width="w-3/4" />
         <SkeletonLoader height="h-20" width="w-full" rounded="rounded-lg" />
      </div>
   ) : (
      <div className='space-y-4'>
         <h1 className="text-xl font-bold">{user?.name}</h1>
         <p className="text-gray-600">{user?.email}</p>
         <p className="text-gray-800 mt-4">{user?.bio}</p>
      </div>
   )}
`;

interface User {
   name: string;
   email: string;
   bio: string;
}

const UserProfile: React.FC = () => {
   const [loading, setLoading] = useState<boolean>(true);
   const [user, setUser] = useState<User | null>(null);
   const profileRef = useRef<HTMLDivElement>(null);

   const fetchData = () => {
      setLoading(true);
      setUser(null);
      setTimeout(() => {
         setUser({
            name: 'John Doe',
            email: 'john.doe@example.com',
            bio: 'Web developer and coffee enthusiast.',
         });
         setLoading(false);
      }, 3000);
   };

   useEffect(() => {
      fetchData();
   }, []);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  fetchData();
               }
            });
         },
         { threshold: 0.5 } // Trigger when 50% of the element is in view
      );

      if (profileRef.current) {
         observer.observe(profileRef.current);
      }

      return () => {
         if (profileRef.current) {
            observer.unobserve(profileRef.current);
         }
      };
   }, []);

   return (
      //  <div className="p-6 max-w-md mx-auto bg-white shadow rounded space-y-4" ref={profileRef}>
      <>
         <div className="p-6 max-w-md mx-3.5 bg-gray-50/50 shadow-xl rounded border " ref={profileRef}>
            <h1 className="text-2xl font-bold mb-0">Skeleton Loader Example</h1>
            <p className='mt-0 mb-10'>To experience the effect again, simply scroll this sample out of view and back into view. Powered by lazy-loading.</p>
            {loading ? (
               <div className="mt-12 space-y-4">
                  <SkeletonLoader height="h-8" width="w-1/2" />
                  <SkeletonLoader height="h-6" width="w-3/4" />
                  <SkeletonLoader height="h-20" width="w-full" rounded="rounded-lg" />
               </div>
            ) : (
               <div className='space-y-4'>
                  <h1 className="text-xl font-bold">{user?.name}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-gray-800 mt-4">{user?.bio}</p>
               </div>
            )}
         </div>
            <div>
               <p className='mt-8mb-1'>UserProfile.tsx</p>
               <CodeBlock
                  code={skeletonLoaderCode}
                  language='typescript'
                  fontSize='1rem' // 16px
               />
            </div>
      </>
   );
};

export default UserProfile;

// import React, { useState, useEffect } from 'react';
// import SkeletonLoader from './SkeletonLoader';
// import TechnicalPost from '../../../.next/static/chunks/src_cc9f3d._';

// const UserProfile = () => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Simulate an API call
//     setTimeout(() => {
//       setUser({
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         bio: 'Web developer and coffee enthusiast.',
//       });
//       setLoading(false);
//     }, 3000);
//   }, []);

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
//       {loading ? (
//         <div className="space-y-4">
//           {/* Skeleton loaders for each part of the content */}
//           <SkeletonLoader height="h-8" width="w-1/2" />
//           <SkeletonLoader height="h-6" width="w-3/4" />
//           <SkeletonLoader height="h-20" width="w-full" rounded="rounded-lg" />
//         </div>
//       ) : (
//         <div>
//           {/* Actual user content */}
//           <h1 className="text-xl font-bold">{user.name}</h1>
//           <p className="text-gray-600">{user.email}</p>
//           <p className="text-gray-800 mt-4">{user.bio}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;