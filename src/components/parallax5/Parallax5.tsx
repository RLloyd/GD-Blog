/*-= src/components/parallax5/Parallax5.tsx =-*/
/*-= Converted from Chakra version =-*/

'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const MotionBox = motion.div;

interface LayoutProps {
   children: React.ReactNode;
}

interface GridContentProps {
  numero: string;
  title: string;
  buttonLabel: string;
}

const GridContentTemplate: React.FC<GridContentProps> = ({ numero, title, buttonLabel }) => {
  return (
    <div className="flex gap-2 my-4 pt-2 border-t border-primary-100">
      <div className="text-2xl md:text-3xl font-light w-16 leading-none">
        {numero}
      </div>
      <div>
        <p className="text-xs uppercase">{title}</p>
        <button className="text-left text-[1.65rem] font-light hover:text-primary-600 transition-colors">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
   return (
      <>
         {/* <Navbar /> */}
         {children}
         {/* <Footer /> */}
      </>
   );
};

// const Parallax5 = () => {
const Parallax5: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yImg1 = useTransform(scrollYProgress, [0, 1], ["100px", "-200px"]);
  const yImg2 = useTransform(scrollYProgress, [0, 1], ["220px", "-400px"]);
  const yImg3 = useTransform(scrollYProgress, [0, 1], ["950px", "-2000px"]);
  const sImg3 = useTransform(scrollYProgress, [.05, 1], [.15, 2.25]);

  return (
   <Layout>
      <div ref={containerRef} className="relative h-[4000px] w-[90%] mx-auto">
         <div className="relative h-[1600px] z-10">

         {/* Image 01 */}
         <MotionBox
            style={{ y: yImg1 }}
            className="sticky top-[50px] z-[1]"
         >
            <div className="
               flex flex-col items-center
               h-[750px] w-screen
               mx-0 px-0
               left-0
               border-2 border-primary-100
               bg-primary-50 dark:bg-accent-500
               rounded-lg
               z-[12]"
               >
               {/* ParallaxUno content */}
            </div>
         </MotionBox>

         {/* Image 02 */}
         <MotionBox
            style={{ y: yImg2 }}
            className="sticky top-[70px] z-[1]"
         >
            <div className="flex flex-col items-center h-[650px] bg-primary-50 dark:bg-primary-800/50 rounded-lg">
               {/* ParallaxDos content */}
            </div>
         </MotionBox>

         {/* Image 03 */}
         <MotionBox
            style={{ y: yImg3, scale: sImg3 }}
            className="sticky top-0 z-[5]"
         >
            <div className="flex flex-col items-center h-[650px] bg-primary-50 dark:bg-success-500 rounded-lg">
               {/* ParallaxTres content */}
            </div>
         </MotionBox>
         </div>

         <div className="bg-primary-50 p-4 rounded-lg">
         <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:sticky lg:top-1/2 lg:h-fit-content">
               <h1 className="text-4xl font-light text-primary-500">Carousel</h1>
               {/* Carousel component */}
            </div>

            <div className="relative w-full md:w-[500px] text-left text-primary-900">
               <h2 className="text-2xl font-light text-primary-400 uppercase tracking-wide mt-12 mb-4">
               Multi Column Parallax
               </h2>

               <GridContentTemplate
               numero="1"
               title="Position"
               buttonLabel="Parallax is the apparent shift in the position of an object."
               />
               {/* Add more GridContentTemplate components as needed */}
            </div>
         </div>
         </div>
      </div>
    </Layout>
  );
};

export default Parallax5;