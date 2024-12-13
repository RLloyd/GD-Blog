// Codes for the actual codeblocks. Not the same as the sample playing on the article.

import React from "react";
import "./CircularLoader.css";

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string; // Optional className
}

const ImageLoaderApp: React.FC<ImageLoaderProps> = ({ src, alt, className }) => {
  // Component logic here
  return (
    <div className="image-loader-container">
      <div className="loader-overlay">Loading...</div>
      <img
        src={src}
        alt={alt}
        className={`image-loader-image ${className || ""}`}
      />
    </div>
  );
};

export default ImageLoaderApp;

// import React from "react";
// import CircularLoader from "./ImageLoaderApp";

// const ImageLoaderApp = () => {
// 	return (
// 		<div>
// 			<CircularLoader
// 				src='./../../../public/assets/somethingBig.png'
// 				alt='Sample Image'
// 			/>
// 		</div>
// 	);
// };

// export default ImageLoaderApp;