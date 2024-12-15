"use client";

import { useEffect } from "react";
import Image from "next/image";

interface H1HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const H1Header: React.FC<H1HeaderProps> = ({ children, className }) => {
  return (
    <h1
      className={`text-[2.25rem] md:text-[3rem] font-normal md:w-[600px] leading-[1.2] ${
        className || ""
      }`}
    >
      {children}
    </h1>
  );
};

interface ImageSrcStyleProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageSrcStyle: React.FC<ImageSrcStyleProps> = ({ src, alt, className }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={300}
      height={300}
      className={`m-[2rem] border border-primary-400 shadow-2xl ${className || ""}`}
    />
  );
};

const ParallaxUno: React.FC = () => {
  useEffect(() => {
    document.title = "Parallax Page";
  }, []);

  return (
    <div className="flex flex-col items-center h-[650px] bg-primary-200 dark:bg-primary-500 rounded-[1rem]">
      <p className="text-[1rem] uppercase my-[2rem]">
        Visual Appeal
      </p>
      <H1Header>
        Parallax scrolling adds a dynamic element to web pages
      </H1Header>
      <ImageSrcStyle
        src="/path/to/loaderImg.png"
        alt="Loader Image"
      />
    </div>
  );
};

export default ParallaxUno;