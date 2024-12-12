
"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// const DynamicBubbleLoader = dynamic(
const BubbleLoaderApp = dynamic(
  () => import('@/components/blog-components/BubbleLoader'),
  { ssr: false }
);

function MyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <DynamicBubbleLoader */}
      <BubbleLoaderApp
        duration={5000}
        onComplete={() => console.log('Complete!')}
      />
    </Suspense>
  );
}

export default BubbleLoaderApp;

// // pages/your-page.tsx
// import dynamic from 'next/dynamic';
// import { Suspense } from 'react';

// const DynamicBubbleLoader = dynamic(
//   () => import('@/components/blog-components/BubbleLoader'),
//   {
//     loading: () => (
//       <div className="w-full max-w-lg mx-auto h-80 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
//     ),
//     ssr: false
//   }
// );

// export default function YourPage() {
//   return (
//     <Suspense fallback={
//       <div className="w-full max-w-lg mx-auto h-80 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
//     }>
//       <DynamicBubbleLoader
//         duration={5000}
//         onComplete={() => console.log('Loading complete!')}
//       />
//     </Suspense>
//   );
// }

// // import React from "react";
// // import LazyImageLoader from "./LazyImageLoader";

// // const BubbleLoaderApp: React.FC = () => {
// //   return (
// //     <div>
// //       <h1>Scroll down to see the loader in action</h1>
// //       <div style={{ height: "100vh", background: "#f0f0f0" }}>Scroll...</div>
// //       <LazyImageLoader src="/path-to-your-image.jpg" alt="Beautiful Image" />
// //       <div style={{ height: "100vh", background: "#f0f0f0" }}>More content...</div>
// //     </div>
// //   );
// // };

// // export default BubbleLoaderApp;

// // // "use client";
// // // import React, { useState, Suspense } from "react";

// // // // Lazy load the BubbleLoader component
// // // const BubbleLoader = React.lazy(() => import("./BubbleLoader"));

// // // const BubbleLoaderApp: React.FC = () => {
// // // 	const [showLoader, setShowLoader] = useState(false);

// // // 	const triggerLoader = () => {
// // // 		setShowLoader(true);
// // // 		setTimeout(() => {
// // // 			setShowLoader(false); // Hide the loader after it's complete
// // // 		}, 60000); // Duration (5000ms) + a buffer
// // // 	};

// // // 	return (
// // // 		<div>
// // // 			<button onClick={triggerLoader} className='trigger-button'>
// // // 				Start Loading
// // // 			</button>
// // // 			{showLoader && (
// // // 				<Suspense fallback={<div>Loading...</div>}>
// // // 					<BubbleLoader duration={5000} onComplete={() => console.log("Loading complete!")} />
// // // 				</Suspense>
// // // 			)}
// // // 		</div>
// // // 	);
// // // };

// // // export default BubbleLoaderApp;

// // // // "use client"; // Add this if this is in a Client Component

// // // // import React, { useState } from "react";
// // // // import BubbleLoader from "./BubbleLoader";
// // // // // import BubbleLoader from "./components/BubbleLoader";
// // // // import Image from "next/image";

// // // // const BubbleLoaderApp = () => {
// // // // 	const [loading, setLoading] = useState(false);

// // // // 	const handleLoaderComplete = () => {
// // // // 		console.log("Loader complete!");
// // // // 		setLoading(false);
// // // // 	};

// // // // 	return (
// // // // 		<div>
// // // // 			{loading ? (
// // // // 				<BubbleLoader duration={30000} onComplete={handleLoaderComplete} />
// // // // 			) : (
// // // // 				<>
// // // // 					<p>Content is ready!</p>
// // // // 					<Image
// // // // 						src='/assets/Bubbles-Fishes.webp'
// // // // 						alt='Sample Image'
// // // // 						width={700} // Replace with actual image width
// // // // 						height={400} // Replace with actual image height
// // // // 					/>
// // // // 				</>
// // // // 			)}
// // // // 		</div>
// // // // 	);
// // // // };

// // // // export default BubbleLoaderApp;

// // // // // import React from "react";
// // // // // import BubbleLoader from "./BubbleLoader";

// // // // // function BubbleLoaderApp() {
// // // // //   const handleLoaderComplete = () => {
// // // // //     console.log("Loading complete!");
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <BubbleLoader duration={5000} onComplete={handleLoaderComplete} />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default BubbleLoaderApp;
