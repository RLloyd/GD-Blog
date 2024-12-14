/*-= src/components/blog/CoverImage.tsx =-*/
import Image from "next/image";

type CoverImageProps = {
	src?: string;
	alt: string;
};

export function CoverImage({ src, alt }: CoverImageProps) {
	if (!src) return null;

	return (
		<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
			<Image
				src={src}
				alt={alt}
				fill
				className='object-cover'
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
				priority
			/>
		</div>
	);
}
