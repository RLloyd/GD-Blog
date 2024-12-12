"use client";
import React, { useState, useEffect } from "react";
import "./ImageLoader.css"; // Import the separated CSS file
import "./articles/PercentageSVG2.css";
import Image from "next/image";
import CircularSVG2 from "./articles/CircularSVG2";

import { AnimatePresence } from "framer-motion";


// interface ImageLoaderProps {
// 	src: string;
// 	alt: string;
// 	className?: string;
// }

// const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, className }) => {
const ImageLoader = ({ src, alt }: { src: string; alt: string }) => {
	const [progress, setProgress] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// const loadImage = (): Promise<void> => {
      const loadImage = (src: string): Promise<void> => {
			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.open("GET", src, true);
				xhr.responseType = "arraybuffer";

				xhr.onprogress = (event) => {
					if (event.lengthComputable) {
						const percentComplete = (event.loaded / event.total) * 100;
						setProgress(Math.round(percentComplete));
					}
				};

				xhr.onload = () => {
					if (xhr.status === 200) {
						setProgress(100);
						resolve();
					} else {
						reject(new Error(`Failed to load image: ${xhr.statusText}`));
					}
				};

				xhr.onerror = () => reject(new Error("Error loading image"));
				xhr.send();
			});
		};

		loadImage(src)
			.then(() => setIsLoaded(true))
			.catch((err) => console.error(err));

		return () => {
			// Optional cleanup if needed
		};
	}, [src]);

	return (
      <>
		<div className='image-loader-container'>
			{!isLoaded && (
				<div className='loader-overlay'>
					<div className='loader-animation'>
					</div>
               <CircularSVG2 />
					<div className='loader-progress'>
						{progress}% {/* Shows the loading percentage */}
					</div>
				</div>
			)}
			<Image
				src={src}
				alt={alt}
            width={500} // Replace with actual image width
            height={300} // Replace with actual image height
			/>
		</div>
      </>
	);
};

export default ImageLoader;
