"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

// Types for d1HeroData
interface HeroData {
  imageIntro: string;
  shortIntro: string;
  pageTitle: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
  linkTarget: string;
}

const d1HeroData: HeroData = {
  imageIntro: "/path-to-hero-image.jpg",
  shortIntro: "Explore the Parallax Effect",
  pageTitle: "Parallax Tres",
  description:
    "Parallax scrolling creates depth and interactivity, bringing your pages to life.",
  buttonLabel: "Learn More",
  buttonLink: "/learn-more",
  linkTarget: "_self",
};

// Reusable Button Component
interface PrimaryAccentButtonProps {
  label: string;
  link: string;
  target: string;
  icon: React.ReactNode;
}

const PrimaryAccentButton: React.FC<PrimaryAccentButtonProps> = ({
  label,
  link,
  target,
  icon,
}) => {
  return (
    <a
      href={link}
      target={target}
      className="flex items-center gap-2 bg-primary-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-600 transition-all"
    >
      {label} {icon}
    </a>
  );
};

const ParallaxTres: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-primary-200 dark:bg-primary-500 rounded-lg overflow-hidden h-[630px] relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={d1HeroData.imageIntro}
          alt="Parallax Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 text-center max-w-4xl flex flex-col items-center">
        {/* Short Intro */}
        <p className="text-sm uppercase tracking-wide text-primary-900 dark:text-primary-100 mb-4">
          {d1HeroData.shortIntro}
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-4">
          {d1HeroData.pageTitle}
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-primary-700 dark:text-primary-300 mb-6">
          {d1HeroData.description}
        </p>

        {/* Button */}
        <PrimaryAccentButton
          label={d1HeroData.buttonLabel}
          link={d1HeroData.buttonLink}
          target={d1HeroData.linkTarget}
          icon={<FaArrowRight />}
        />
      </div>
    </div>
  );
};

export default ParallaxTres;