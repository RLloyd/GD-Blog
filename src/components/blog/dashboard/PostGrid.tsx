// src/components/dashboard/PostGrid.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { categories, CategoryId } from "@/data/categories";
// import { DynamicComponentPreview } from "./DynamicComponentPreview";
import type { Post } from "./types";

function PostContent({ post }: { post: Post }) {
	// For component-type posts, render the component in the card
	// if (post.type === "component" && post.component_name) {
	// 	return (
	// 		<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
	// 			<DynamicComponentPreview
	// 				componentName={post.component_name}
	// 				props={post.component_props}
	// 			/>
	// 		</div>
	// 	);
	// }
	if (post.cover_image) {
		return (
			<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
				<Image
					src={post.cover_image}
					alt={post.title}
					fill
					className='object-cover'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
			</div>
		);
	}

	// For markdown posts or if there's a cover image, show the image
	if (post.cover_image) {
		return (
			<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
				<Image
					src={post.cover_image}
					alt={post.title}
					fill
					className='object-cover'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
			</div>
		);
	}

	// Default gradient background if no image or component
	return <div className='aspect-[16/9] relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-md' />;
}

function CategoryLabel({ categoryId }: { categoryId: CategoryId }) {
	const category = categories.find((c) => c.id === categoryId);
	return <span className={`text-sm ${category?.textColor || "text-gray-400"}`}>{category?.name || "Uncategorized"}</span>;
}
// function PostInfo({ post }: { post: Post }) {
// 	const category = categories.find((c) => c.id === post.category);

// 	return (
// 		<div className='p-4'>
// 			<div className='flex justify-between items-center mb-2'>
// 				<span className={`text-sm ${category?.textColor || "text-gray-400"}`}>{category?.name || "Uncategorized"}</span>
// 				<span className='text-sm text-gray-400'>{post.date}</span>
// 			</div>
// 			<h3
// 				className='text-lg font-semibold mb-2 group-hover:text-blue-400
//          transition-colors line-clamp-2'
// 			>
// 				{post.title}
// 			</h3>
// 			<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
// 		</div>
// 	);
// }

// type PostGridProps = {
// 	posts: Post[];
// };

// export function PostGrid({ posts }: { posts: Post[] }) {
// 	return (
// 		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
// 			{posts.map((post) => (
// 				<Link
// 					key={post.id}
// 					href={`/blog/${post.slug}`}
// 					className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden
//             shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
// 				>
// 					<PostContent post={post} />
// 					<div className='p-4'>
// 						<div className='flex justify-between items-center mb-2'>
// 							<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
// 							<span className='text-sm text-gray-400'>{post.date}</span>
// 						</div>
// 						<h3
// 							className='text-lg font-semibold mb-2 group-hover:text-blue-400
//               transition-colors line-clamp-2'
// 						>
// 							{post.title}
// 						</h3>
// 						<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
// 					</div>
// 				</Link>
// 			))}
// 		</div>
// 	);
// }

export function PostGrid({ posts }: { posts: Post[] }) {
	return (
		<div className='allPostsGridContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
			{posts.map((post) => (
				// <Link
				// 	key={post.id}
				// 	href={`/blog/${post.slug}`}
				// 	className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden
				//  shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
				// >
				// 	<PostContent post={post} />
				// 	<div className='p-4'>
				// 		<div className='flex justify-between items-center mb-2'>
				// 			<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
				// 			<span className='text-sm text-gray-400'>{post.date}</span>
				// 		</div>
				// 		<h3
				// 			className='text-lg font-semibold mb-2 group-hover:text-blue-400
				//    transition-colors line-clamp-2'
				// 		>
				// 			{post.title}
				// 		</h3>
				// 		<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
				// 	</div>
				// </Link>
				<Link
					key={post.id}
					href={`/blog/${post.slug}`}
					className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden
            shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
				>
					<PostContent post={post} />
					<div className='p-4'>
						<div className='flex justify-between items-center mb-2'>
							<CategoryLabel categoryId={post.category} />
							<span className='text-sm text-gray-400'>{post.date}</span>
						</div>
						<h3
							className='text-lg font-semibold mb-2 group-hover:text-blue-400
              transition-colors line-clamp-2'
						>
							{post.title}
						</h3>
						<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
					</div>
				</Link>
			))}
		</div>
	);
}
