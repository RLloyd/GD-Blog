// src/components/PostCard.tsx
import Link from "next/link";
import Image from "next/image";
import { getCategoryName, getCategoryTextColor, CategoryId } from "@/data/categories";

type PostCardProps = {
	post: {
		id: string;
		title: string;
		excerpt: string;
		category: CategoryId;
		date: string;
		slug: string;
		cover_image?: string;
	};
};

export function PostCard({ post }: PostCardProps) {
	const categoryTextColor = getCategoryTextColor(post.category);

	return (
		<Link
			href={`/blog/${post.slug}`}
			className='group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow'
		>
			<div className='aspect-[16/9] relative bg-gray-900'>
				{post.cover_image ? (
					<Image
						src={post.cover_image}
						alt={post.title}
						fill
						className='object-cover'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				) : (
					<div className='absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800' />
				)}
			</div>
			<div className='p-4'>
				<div className='flex justify-between items-center mb-2'>
					<span className={`text-sm ${categoryTextColor}`}>{getCategoryName(post.category)}</span>
					<span className='text-sm text-gray-400'>{post.date}</span>
				</div>
				<h3 className='text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3>
				<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
			</div>
		</Link>
	);
}
