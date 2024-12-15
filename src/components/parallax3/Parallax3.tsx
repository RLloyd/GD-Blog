"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ParallaxUno from './ParallaxUno'
import ParallaxDos from './ParallaxDos'
import ParallaxTres from './ParallaxTres'
import MultiColumnCaroParallax from './MultiColumnCaroParallax'

// Reusable MotionBox component
const MotionBox = motion.div;


interface LayoutProps {
   children: React.ReactNode;
}

// interface GridContentTemplateProps {
//   numero: string;
//   title: string;
//   buttonLabel: string;
// }
// // Grid Content Template Component
// const GridContentTemplate: React.FC<GridContentTemplateProps> = ({
//   numero,
//   title,
//   buttonLabel,
// }) => (
//   <div className="flex gap-4 my-6 pt-[0.6rem] border-t border-primary-100">
//     <div className="font-light text-[2rem] md:text-[3rem] leading-none w-[4rem]">
//       {numero}
//     </div>
//     <div>
//       <p className="text-xs uppercase">{title}</p>
//       <button className="text-[1.65rem] font-light text-left">
//         {buttonLabel}
//       </button>
//     </div>
//   </div>
// );

// Layout Component
const Layout: React.FC<LayoutProps> = ({ children }) => {
   return (
      <>
         {/* <Navbar /> */}
         {children}
         {/* <Footer /> */}
      </>
   );
};

// Parallax Component
const Parallax: React.FC = () => {
   const containerRef = useRef<HTMLDivElement | null>(null);

   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"],
   });

   const yImg1 = useTransform(scrollYProgress, [0, 1], ["100px", "-200px"]);
   const yImg2 = useTransform(scrollYProgress, [0, 1], ["220px", "-400px"]);
   const yImg3 = useTransform(scrollYProgress, [0, 1], ["950px", "-2000px"]);
   const sImg3 = useTransform(scrollYProgress, [0.05, 1], [0.15, 2.25]);

   return (
      <Layout>
         {/* Main Container */}
         <div
            className="relative h-[4000px] w-[100%] mx-auto main-container border-2 border-accent-700"
            //   className="relative h-[4000px] w-[90%] mx-auto main-container"
            //   className="relative h-[4000px] main-container max-w-screen-xl mx-auto overflow-x-hidden"
            //   className="relative h-[4000px] main-container max-w-screen-xl mx-auto"
            ref={containerRef}
         >
            {/* Parallax Group 1 */}
            <div className="relative h-[1600px] z-10 parallax-group-1">
               {/* Image 01 Parallax Uno */}
               <MotionBox
                  className="paralxUnoParentContainer sticky top-[50px] z-1 image-wrapper w-screen border-4 border-primary-800 rounded-2xl"
                  style={{ y: yImg1 }}
               >
                  <ParallaxUno />
               </MotionBox>

               {/* Image 02: Parallax Dos */}
               <MotionBox
                  className="paralxDosParentContainer sticky top-[70px] z-2 image-wrapper w-screen border-4 border-primary-800 rounded-2xl"
                  style={{ y: yImg2 }}
               >
                  <ParallaxDos />
               </MotionBox>

               {/* Image 03: Parallax Tres */}
               <MotionBox
                  className="sticky top-0 z-5 image-wrapper w-screen border-4 border-primary-800 rounded-2xl"
                  style={{ y: yImg3, scale: sImg3 }}
               >
                  <ParallaxTres />
               </MotionBox>
            </div>

            {/* Parallax Group 2 */}
            <div className="parallax-group-2 w-screen border-4 border-primary-800 rounded-2xl">
               <div className="bg-primary-50 p-4 rounded-xl group-wrapper">
                  <div className="relative flex flex-col lg:flex-row gap-4 caro-group-wrapper">
                     <MotionBox
                        className="relative text-left text-primary-900"
                        style={{
                           width: "auto",
                           maxWidth: "500px",
                           margin: "0 auto",
                        }}
                     >
                        <h1 className="text-primary-400 text-[1.5rem] uppercase my-[3rem]">
                           Multi Column Parallax
                        </h1>

                        <MultiColumnCaroParallax />

                        {/* <GridContentTemplate
                  numero="1"
                  title="Position"
                  buttonLabel="Parallax is the apparent shift in the position of an object."
                />
                <GridContentTemplate
                  numero="2"
                  title="Observation"
                  buttonLabel="Observed by looking at an object first with one eye closed, then with the other."
                />
                <GridContentTemplate
                  numero="3"
                  title="Astronomy"
                  buttonLabel="In astronomy, parallax measures the distance of nearby stars from Earth."
                />
                <div className="my-10">
                  <Image
                    src="/path/to/carousel07.jpg"
                    alt="Carousel Image 07"
                    width={500}
                    height={300}
                    className="image-src"
                  />
                </div>
                <GridContentTemplate
                  numero="4"
                  title="Distance"
                  buttonLabel="Earth's orbit allows calculation of its distance based on the angle of apparent shift."
                />
                <GridContentTemplate
                  numero="5"
                  title="Imaging"
                  buttonLabel="Parallax is crucial in 3D imaging and photography."
                />
                <GridContentTemplate
                  numero="6"
                  title="Illusion"
                  buttonLabel="It creates the illusion of depth by presenting slightly different images to each eye."
                />
                <div className="mt-0">
                  <Image
                    src="/path/to/carousel08.jpg"
                    alt="Carousel Image 08"
                    width={500}
                    height={300}
                    className="image-src"
                  />
                </div> */}
                     </MotionBox>
                  </div>
                  <div className="mt-20">
                     {/* <ParallaxCinco /> */}
                  </div>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default Parallax;

// "use client";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import Image from "next/image";
// // import { Layout } from './Layout';


// // Reusable MotionBox component
// const MotionBox = motion.div;

// // const Parallax = () => {
// export default function Parallax() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   const yImg1 = useTransform(scrollYProgress, [0, 1], ["100px", "-200px"]);
//   const yImg2 = useTransform(scrollYProgress, [0, 1], ["220px", "-400px"]);x
//   const yImg3 = useTransform(scrollYProgress, [0, 1], ["950px", "-2000px"]);
//   const sImg3 = useTransform(scrollYProgress, [0.05, 1], [0.15, 2.25]);

//   return (
//     <Layout>
//       // {/* Sticky Submenu */}
//       // <MotionBox className="sticky top-[-34px] z-[5000] submenu-wrapper">
//       //   {/* <StyleguideSubMenus /> */}
//       // </MotionBox>

//       {/* Main Container */}
//       <div
//         className="relative h-[4000px] w-[90%] mx-auto main-container"
//         ref={containerRef}
//       >
//         {/* Parallax Group 1 */}
//         <div className="relative h-[1600px] z-10 parallax-group-1">
//           {/* Image 01 */}
//           <MotionBox
//             className="sticky top-[50px] z-1 image-wrapper"
//             style={{ y: yImg1 }}
//           >
//             <ParallaxUno />
//           </MotionBox>

//           {/* Image 02 */}
//           <MotionBox
//             className="sticky top-[70px] z-2 image-wrapper"
//             style={{ y: yImg2 }}
//           >
//             <ParallaxDos />
//           </MotionBox>

//           {/* Image 03 */}
//           <MotionBox
//             className="sticky top-0 z-5 image-wrapper"
//             style={{ y: yImg3, scale: sImg3 }}
//           >
//             <ParallaxTres />
//           </MotionBox>
//         </div>

//         {/* Parallax Group 2 */}
//         <div className="parallax-group-2">
//           <div className="bg-primary-50 p-4 rounded-xl group-wrapper">
//             <div className="relative flex flex-col lg:flex-row gap-4 caro-group-wrapper">
//               <MotionBox
//                 className="relative text-left text-primary-900"
//                 style={{
//                   width: "auto",
//                   maxWidth: "500px",
//                   margin: "0 auto",
//                 }}
//               >
//                 <h1 className="text-primary-400 text-[1.5rem] uppercase my-[3rem]">
//                   Multi Column Parallax
//                 </h1>
//                 <GridContentTemplate
//                   numero="1"
//                   title="Position"
//                   buttonLabel="Parallax is the apparent shift in the position of an object."
//                 />
//                 <GridContentTemplate
//                   numero="2"
//                   title="Observation"
//                   buttonLabel="Observed by looking at an object first with one eye closed, then with the other."
//                 />
//                 <GridContentTemplate
//                   numero="3"
//                   title="Astronomy"
//                   buttonLabel="In astronomy, parallax measures the distance of nearby stars from Earth."
//                 />
//                 <div className="my-10">
//                   <Image
//                     src="/path/to/carousel07.jpg"
//                     alt="Carousel Image 07"
//                     width={500}
//                     height={300}
//                     className="image-src"
//                   />
//                 </div>
//                 <GridContentTemplate
//                   numero="4"
//                   title="Distance"
//                   buttonLabel="Earth's orbit allows calculation of its distance based on the angle of apparent shift."
//                 />
//                 <GridContentTemplate
//                   numero="5"
//                   title="Imaging"
//                   buttonLabel="Parallax is crucial in 3D imaging and photography."
//                 />
//                 <GridContentTemplate
//                   numero="6"
//                   title="Illusion"
//                   buttonLabel="It creates the illusion of depth by presenting slightly different images to each eye."
//                 />
//                 <div className="mt-0">
//                   <Image
//                     src="/path/to/carousel08.jpg"
//                     alt="Carousel Image 08"
//                     width={500}
//                     height={300}
//                     className="image-src"
//                   />
//                 </div>
//               </MotionBox>
//             </div>
//             <div className="mt-20">
//               <ParallaxCinco />
//             </div>
//           </div>
//         </div>
//       </div>
//    </Layout>
//   );
// };

// // export default Parallax;

// // Grid Content Template Component
// const GridContentTemplate = ({ numero, title, buttonLabel }) => (
//   <div className="flex gap-4 my-6 pt-[0.6rem] border-t border-primary-100">
//     <div className="font-light text-[2rem] md:text-[3rem] leading-none w-[4rem]">
//       {numero}
//     </div>
//     <div>
//       <p className="text-xs uppercase">{title}</p>
//       <button className="text-[1.65rem] font-light text-left">
//         {buttonLabel}
//       </button>
//     </div>
//   </div>
// );

// type LayoutProps = {
//    children: React.ReactNode;
// }

// const Layout = ({ children }: LayoutProps) => {
//   return (
//     <>
//       {/* <Navbar /> */}
//       {children}
//       {/* <Footer /> */}
//     </>
//   );
// }