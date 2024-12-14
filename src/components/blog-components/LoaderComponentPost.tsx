/*-= src/components/blog-components/LoaderComponentPost.tsx =-*/
"use client";
import React, { Suspense } from "react";
import Spinner from "./articles/Spinner";
// import CircularLoader from "./CircularLoader";
import LazyLoader from "./LazyLoader";
import dynamic from "next/dynamic";
import LoaderModalApp from "../modal-components/CircularLoaderModalApp";
// // import CircularLoaderModalApp from "../modal-components/CircularLoaderModalApp";
import SkeletonLoaderAppApp from "./../skeleton-components/SkeletonLoaderApp";
import UserProfile from "../skeleton-components/UserProfile";
import DataListApp from "../data-list-components/DataListApp";
import LazyLoadComponentApp from "../lazy-load-components/LazyLoadComponentApp";
import LazyToggleComponentApp from "../lazy-load-components/LazyToggleComponentApp";
import LazyLoaderApp from "../lazy-load-components/LazyLoaderApp";

const PercentageSVG2 = React.lazy(() => import("./articles/PercentageSVG2"));

const BubbleLoader = dynamic(() => import("./BubbleLoader"), {
   ssr: false,
   loading: () => <div className='w-full max-w-2xl mx-auto aspect-[16/9] bg-gray-800 rounded-lg' />,
});

const LoaderComponentPost = () => {
   return (
      <div>
         <div className=''>The concept of loaders on the web has come a long way, mirroring the evolution of user expectations and advancements in web technologies. Initially a functional necessity, loaders have transformed into a critical UX element designed to improve user engagement and reduce perceived wait times. Here’s a look at their progression:</div>

         {/*---= Simple Spinner =---*/}
         <div>
            <h3>Simple Spinner:</h3>
            <div>Web Loaders In the early days of the web, spinner loaders were the norm. These were simple, often animated GIFs or CSS-based circular animations designed to inform users that the application was processing a request or loading content. While functional, spinners had several limitations:</div>
            <ul>
               <li>They provided no context or feedback about the progress or what was loading.</li>
               <li>Users had no way of knowing how long they needed to wait. </li>
            </ul>
            <div> Despite these drawbacks, spinners were lightweight and easy to implement, making them a staple in early web applications.</div>
            <div className='border border-gray-300 rounded-lg p-4 mt-8'>
               <Spinner />
            </div>
         </div>
         <div className='border border-gray-300 rounded-lg p-4 mt-8'>
            <h4>Simpler Still:</h4>
            <p>Loading...</p>
         </div>

         {/*---= Progress Indicator =---*/}
         <div className='mt-20'>
            <h3>Progress Indicators:</h3>
            <div>A step toward transparency to address the shortcomings of spinners, progress indicators became more common. These loaders, often seen as progress bars, circular percentage counters, or circular progress bars, provided users with real-time feedback on the percentage of data loaded. </div>
            <div>Examples included:</div>
            <ul>
               <li>Linear progress bars (e.g., the classic loading bar).</li>
               <li>Circular progress indicators showing incremental loading. Progress indicators improved user satisfaction by setting clearer expectations about wait times but were limited to applications where precise loading percentages could be calculated.</li>
               <li>Check out a sample usage and simulation: https://rlloydgonzales.com/loaders/</li>
            </ul>
         </div>

         <div className="text-accent-700">Component for ref only!: LazyLoaderApp</div>
         <div className='border border-gray-300 rounded-lg p-4 mt-8'>
            {/* <Suspense fallback={<div>Loading...</div>}>
               <PercentageSVG2 />
            </Suspense> */}
            <LazyLoaderApp />
            {/*---= Modal for creating and animating circular svg =---*/}
            {/* <div className="mt-10">
               // <CircularLoaderModalApp />
            </div> */}

         </div>

         {/*---= Skeleton Loader =---*/}
         <div>
            <h3>Content-Aware Loaders:</h3>
            <div>Placeholder and Skeleton Loaders As web applications became more dynamic and content-rich, spinners and progress bars were deemed insufficient. Users expected faster and more intuitive interactions. This led to the rise of placeholder and skeleton loaders, which provided a more contextual loading experience. Placeholder Loaders Placeholder loaders temporarily replaced content with blank or generic shapes resembling the final layout. These loaders made pages feel faster by giving users a visual cue about what to expect. Skeleton Loaders A more advanced version of placeholder loaders, skeleton loaders show a framework of the content being loaded (e.g., grey boxes for images or text). These loaders:</div>
            <ul>
               <li>Mimic the structure of the actual content.</li>
               <li>Create an illusion of faster loading by appearing closer to the final design.</li>
               <li>Offer a smoother visual transition from “loading” to “loaded.” Skeleton loaders became popular with modern frameworks like React, Angular, and Vue, where tools like React Content Loader and NgxSkeletonLoader emerged.</li>
            </ul>
            <h3>Shimmer Effects:</h3>
            <div>Adding Motion for Perceived Speed Skeleton loaders evolved further with the introduction of shimmer effects—animated gradients that sweep across the skeleton layout. Shimmer effects:</div>
            <ul>
               <li>Give users a sense of progress even when the loading time is static.</li>
               <li>Add a modern, polished touch to loaders.</li>
               <li>Are lightweight to implement using CSS or libraries. Apps like Facebook and LinkedIn popularized shimmer skeleton loaders, setting a new standard for modern web loaders.</li>
            </ul>

            <div className='border border-gray-300 rounded-lg p-4 mt-8'>
               <UserProfile />
            </div>

            {/* <div className='border border-gray-300 rounded-lg p-4 mt-8'> */}
               {/* <DataListApp /> */}
               {/* <LazyLoadComponentApp /> */}
               {/* <LazyToggleComponentApp /> */}
               {/* <LazyLoaderApp /> */}
            {/* </div> */}

            {/*---= Intelligent Loader =---*/}
            <h3>Intelligent Loaders:</h3>
            <div>AI and Predictive Loading Today, loaders are becoming smarter, leveraging AI and predictive techniques to optimize the loading experience. Examples include:</div>
            <ul>
               <li>Progressive Rendering: Content is rendered in chunks, with critical sections prioritized, reducing the need for noticeable loaders.</li>
               <li>Lazy Loading: With IntersectionObserver, loaders activate only when content enters the viewport, enhancing perceived performance. Refer to the UserProfile sample above for guidance.</li>
               <li>Preemptive Loading: AI analyzes user behavior to predict what they might view next and preloads content, reducing the need for loaders altogether.</li>
            </ul>

            {/*---= Gamified Loader =---*/}
            <h3>The Future of Loaders:</h3>
            <div>Micro-Interactions and Beyond Modern loaders are shifting away from “waiting indicators” toward micro-interactions that subtly entertain or engage users. This includes:</div>
            <ul>
               <li>Gamified Loaders: Interactive loaders that turn waiting into a playful experience.</li>
               <li>Personalized Loaders: Custom messages or visuals that align with user preferences.</li>
               <li>Invisible Loaders: Innovations like instantaneous loading states (e.g., skeleton loaders seamlessly integrated into the DOM) make traditional loaders less noticeable. With the rise of WebAssembly and edge computing, loaders might one day become obsolete as websites achieve near-instantaneous load times. </li>
            </ul>
            <div className='border border-gray-300 rounded-lg p-4 mt-8'>
               <LazyLoader
                  duration={10000}
                  threshold={0.1} // Optional: percentage of component visible before loading
                  onComplete={() => console.log("Animation complete")}
               />
            </div>

            {/*---= Conclusion =---*/}
            <h3>Conclusion:</h3>
            <div>The evolution of loaders reflects the changing landscape of web development and user expectations. From simple spinners to sophisticated skeleton loaders and intelligent predictive systems, loaders have transformed into a critical component of user experience. As web technologies continue to advance, the focus will increasingly shift toward making loaders seamless, invisible, or entirely unnecessary.</div>


         </div>
      </div>
   );
};

export default LoaderComponentPost;
