// src/components/blog/AuthorInfo.tsx
import Image from "next/image";

type AuthorInfoProps = {
	date: string;
};

export function AuthorInfo({ date }: AuthorInfoProps) {
	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<div className='flex items-start gap-4 mb-8'>
			<Image
				src='/assets/LittleLloyd-FB.jpg'
				alt='R.Lloyd Gonzales'
				width={56}
				height={56}
				className='border border-gray-500 rounded-full'
			/>
			<div>
				<h3 className='text-lg font-semibold text-gray-600 dark:text-gray-400 mb-0'>Lloyd</h3>
				<p className='text-gray-600 dark:text-gray-400 text-sm mb-0 m-0'>Software Engineer</p>
				<time className='text-gray-500 dark:text-gray-500 text-sm mt-0'>{formatDate(date)}</time>
			</div>
		</div>
	);
}
