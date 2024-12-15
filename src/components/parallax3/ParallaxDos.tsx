"use client";

import { useEffect } from "react";

interface H1HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const H1Header: React.FC<H1HeaderProps> = ({ children, className }) => {
  return (
    <h1
      className={`text-[2.5rem] md:text-[4rem] font-extrabold md:w-[600px] leading-[1.2] ${
        className || ""
      }`}
    >
      {children}
    </h1>
  );
};

const ParallaxDos: React.FC = () => {
  useEffect(() => {
    document.title = "Parallax Page";
  }, []);

  return (
    <div className="paralxDosContainer flex flex-col items-center h-[650px] bg-primary-50 dark:bg-primary-800 rounded-[1rem]">
      <p className="text-[1rem] uppercase my-[2rem] tracking-[5px]">
        Parallax
      </p>
      <H1Header>
        Visual Appeal
      </H1Header>
      <p className="text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-normal w-[80%] leading-[1.3] text-center">
        By moving different layers of content at different speeds as the user scrolls, it creates an illusion of depth, making the interface feel immersive and interactive.
      </p>
    </div>
  );
};

export default ParallaxDos;