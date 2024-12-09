// src/components/blog/dashboard/FeaturedCard.tsx
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { DynamicComponentPreview } from "./DynamicComponentPreview";
import type { Post, GridSize } from "./types";

type Category = (typeof categories)[number] & {
	gradient: string;
};

type FeaturedCardProps = {
	post?: Post;
	// category: (typeof categories)[number];
	category: Category;
	size: GridSize;
	title?: string;
	description?: string;
};

function PostContent({ post, category }: { post: Post; category: Category }) {
	if (post.type === "component" && post.component_name) {
		return (
			<div className='absolute inset-0'>
				<DynamicComponentPreview
					componentName={post.component_name}
					props={post.component_props}
				/>
			</div>
		);
	}

	if (post.cover_image) {
		return (
			<div className='absolute inset-0'>
				<Image
					src={post.cover_image}
					alt={post.title}
					fill
					className='object-cover transition-transform duration-500 group-hover:scale-105'
					sizes='(max-width: 768px) 100vw, 50vw'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
			</div>
		);
	}

	return <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />;
}

function PostInfo({ post, title, description, category }: { post: Post; title?: string; description?: string; category: Category }) {
	return (
		<div className='absolute inset-0 p-4 sm:p-6 flex flex-col justify-end'>
			<div
				className='flex flex-col gap-2 self-start border border-primary-200/20 rounded-lg p-3 pr-6 sm:pr-10
         bg-gradient-to-t from-primary-900/70 via-primary-800/70 to-primary-600/70'
			>
				<div className='text-sm font-medium text-primary-300'>{title || category.name}</div>
				<h3
					className='text-lg sm:text-2xl font-bold text-white group-hover:text-brand-primary-200
           transition-colors line-clamp-2'
				>
					{post.title}
				</h3>
				<p className='text-gray-300 line-clamp-2 text-sm sm:text-base'>{description || post.excerpt}</p>
			</div>
		</div>
	);
}

export function FeaturedCard({ post, category, size = "medium", title, description }: FeaturedCardProps) {
	if (!post) {
		return (
			<div className='aspect-[16/9] relative'>
				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
					<div className='absolute inset-0 p-6 flex items-center justify-center'>
						<p className='text-xl text-white/70'>No {category.name} posts yet</p>
					</div>
				</div>
			</div>
		);
	}

	// return (
	// 	<div
	// 		className={`relative overflow-hidden rounded-xl bg-primary-800
	//    ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
	//    transition-transform duration-300 hover:scale-[1.02]`}
	// 	>
	// 		<Link
	// 			href={`/blog/${post.slug}`}
	// 			className='block h-64 sm:h-96 aspect-[16/9]'
	// 		>
	// 			<PostContent
	// 				post={post}
	// 				category={category}
	// 			/>
	// 			<PostInfo
	// 				post={post}
	// 				title={title}
	// 				description={description}
	// 				category={category}
	// 			/>
	// 		</Link>
	// 	</div>
	// );
	const cardClasses = `relative overflow-hidden rounded-xl bg-primary-800
    ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
    transition-transform duration-300 hover:scale-[1.02]`;

	return (
		<div className={cardClasses}>
			<Link
				href={`/blog/${post.slug}`}
				className='block h-64 sm:h-96 aspect-[16/9]'
			>
				<PostContent
					post={post}
					category={category}
				/>
				<PostInfo
					post={post}
					title={title}
					description={description}
					category={category}
				/>
			</Link>
		</div>
	);
}
