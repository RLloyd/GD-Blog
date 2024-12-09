// // src/components/BlogDashboard.tsx : v2
// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowLeft } from "lucide-react";
// import { categories, CategoryId } from "@/data/categories";

// type Post = {
// 	id: string;
// 	title: string;
// 	excerpt: string;
// 	category: CategoryId;
// 	date: string;
// 	slug: string;
// 	cover_image?: string;
// };

// const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: "large" | "medium" | "full"; title?: string; description?: string }) => (
// 	<div
// 		className={`relative overflow-hidden rounded-xl bg-primary-800
//       ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
//          transition-transform duration-300 hover:scale-[1.02]`}
// 	>
// 		{post ? (
// 			<Link
// 				href={`/blog/${post.slug}`}
// 				// className='buttonContainer group block h-[250px] aspect-[16/9]'
// 				className='featuredGroup group block h-96 aspect-[16/9]'
// 			>
// 				{post.cover_image ? (
// 					<div className='absolute inset-0'>
// 						<Image
// 							src={post.cover_image}
// 							alt={post.title}
// 							fill
// 							className='object-cover transition-transform duration-500 group-hover:scale-105'
// 							sizes={size === "full" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
// 							priority={size === "large"}
// 						/>
// 						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
// 						{/* <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' /> */}
// 					</div>
// 				) : (
// 					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// 				)}
// 				<div className='featuredContainer absolute inset-0 p-6 flex flex-col justify-end'>
// 					{/*--=== Featured text container ===--*/}
// 					<div className='featuredTextContainer flex flex-col gap-2 self-start border border-primary-200/20 rounded-lg p-3 pr-10 bg-gradient-to-t from-primary-900/70 via-primary-800/70 to-primary-600/70'>
// 						<div className='text-sm font-medium text-primary-300'>{title || category.name}</div>
// 						<h3 className='text-2xl font-bold text-white group-hover:text-brand-primary-200 transition-colors'>{post.title}</h3>
// 						<p className='text-gray-300 line-clamp-2'>{description || post.excerpt}</p>
// 					</div>
// 					{/* <div className='featuredTextContainer inline-block border border-primary-200/20 rounded-lg p-4 bg-gradient-to-t from-primary-800/70 via-primary-600/70 to-primary-400/70'>
// 						<div className={`text-sm font-medium text-primary-300 mb-2`}>{title || category.name}</div>
// 						<h3 className='text-2xl font-bold text-white mb-2 group-hover:text-brand-primary-200 transition-colors'>{post.title}</h3>
// 						<p className='text-gray-300 line-clamp-2'>{description || post.excerpt}</p>
// 					</div> */}
// 				</div>
// 			</Link>
// 		) : (
// 			<div className='aspect-[16/9] relative'>
// 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// 					<div className='absolute inset-0 p-6 flex items-center justify-center'>
// 						<p className='text-xl text-white/70'>No {category.name} posts yet</p>
// 					</div>
// 				</div>
// 			</div>
// 		)}
// 	</div>
// );

// export default function BlogDashboard({ posts }: { posts: Post[] }) {
// 	const [mounted, setMounted] = useState(false);
// 	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

// 	useEffect(() => {
// 		setMounted(true);
// 	}, []);
// 	// Don't render anything until component is mounted to prevent hydration mismatch
// 	if (!mounted) {
// 		return null;
// 	}

// 	// Helper function to get category background color
// 	const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
// 		switch (categoryId) {
// 			case "tech":
// 				return isActive ? "bg-primary-600" : "bg-primary-800 hover:bg-gray-700";
// 			case "media":
// 				return isActive ? "bg-secondary-600" : "bg-primary-800 hover:bg-gray-700";
// 			case "food":
// 				return isActive ? "bg-accent-600" : "bg-primary-800 hover:bg-gray-700";
// 			case "personal":
// 				return isActive ? "bg-success-600" : "bg-primary-800 hover:bg-gray-700";
// 			default:
// 				return "bg-primary-800 hover:bg-gray-700";
// 		}
// 	};

// 	// Helper function to get text color
// 	const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
// 		if (isActive) return "text-white";

// 		switch (categoryId) {
// 			case "tech":
// 				return "text-primary-300";
// 			case "media":
// 				return "text-primary-300";
// 			case "food":
// 				return "text-primary-300";
// 			case "personal":
// 				return "text-primary-200";
// 			default:
// 				return "text-gray-300";
// 		}
// 	};

// 	// Get featured posts
// 	const techPost = posts.find((post) => post.category === "tech");
// 	const mediaPost = posts.find((post) => post.category === "media");
// 	const foodPost = posts.find((post) => post.category === "food");

// 	// Filter remaining posts
// 	const featuredIds = [techPost?.id, mediaPost?.id, foodPost?.id].filter(Boolean);
// 	const remainingPosts = posts.filter((post) => !featuredIds.includes(post.id));

// 	return (
// 		// <div className='max-w-7xl mx-auto px-4 py-8 space-y-12'>
// 		<div className='max-w-page mx-auto px-4 py-8 space-y-12'>
// 			{/* Category buttons */}
// 			<div className='featuredButtonsContainer grid grid-cols-1 md:grid-cols-4 gap-4'>
// 				{categories.map((category) => {
// 					const Icon = category.icon;
// 					const isActive = activeCategory === category.id;
// 					// console.log("Button Classes:", `p-4 rounded-lg flex items-center space-x-3 transition-all ${activeCategory === category.id ? `${category.color} text-white` : "bg-primary-800 hover:bg-primary-700"}`);
// 					return (
// 						<button
// 							key={category.id}
// 							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
// 							className={`
//                         p-4 rounded-lg flex items-center space-x-3 transition-all
//                         ${getCategoryColor(category.id, isActive)}
//                       `}
// 						>
// 							<Icon
// 								size={24}
// 								className={getTextColor(category.id, isActive)}
// 							/>
// 							{/* orig */}
// 							{/* <span className={`font-medium ${isActive ? "text-white" : ""}`}>{category.name}</span> */}
// 							{/* manual */}
// 							{/* <span className={`font-medium ${isActive ? "text-white" : "text-gray-300 dark:text-gray-400"}`}>{category.name}</span> */}
// 							{/* using helper */}
// 							<span className={`font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
// 						</button>
// 					);
// 				})}
// 			</div>

// 			{/*---== Featured Posts Grid ===---*/}
// 			{!activeCategory && (
// 				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
// 					{techPost && (
// 						// <div className='md:col-span-4 md:row-span-2'>
// 						<div className='md:col-span-2 lg:col-span-2 lg:col-start-1'>
// 							<FeaturedCard
// 								post={techPost}
// 								category={categories[0]}
// 								size='full'
// 								// size='large'
// 								title='Featured Tech Article'
// 							/>
// 						</div>
// 					)}
// 					{mediaPost && (
// 						<div className='md:col-span-2'>
// 							<FeaturedCard
// 								post={mediaPost}
// 								category={categories[1]}
// 								size='medium'
// 								title='Latest Media'
// 							/>
// 						</div>
// 					)}
// 					{foodPost && (
// 						<div className='md:col-span-2 lg:col-span-4 lg:col-start-1'>
// 							<FeaturedCard
// 								post={foodPost}
// 								category={categories[2]}
// 								size='full'
// 								title='Latest Recipe'
// 							/>
// 						</div>
// 					)}
// 				</div>
// 			)}

// 			{/*---== Regular Posts Grid ===---*/}
// 			<div>
// 				{/*-== Category title ==-*/}
// 				<h2 className='text-2xl font-bold mb-2'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
// 				{/*-== Category description ==-*/}
// 				{activeCategory && <p className='text-gray-400 text-lg mt-0 mb-20'>{categories.find((c) => c.id === activeCategory)?.description}</p>}
// 				{/*-== Category all posts ==-*/}
// 				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
// 					{(activeCategory ? posts.filter((post) => post.category === activeCategory) : remainingPosts).map((post) => (
// 						<Link
// 							key={post.id}
// 							href={`/blog/${post.slug}`}
// 							/*-= Individual post container template style =-*/
// 							className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
// 						>
// 							<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
// 								{post.cover_image && (
// 									<Image
// 										src={post.cover_image}
// 										alt={post.title}
// 										fill
// 										className='object-cover'
// 										sizes='(max-width: 768px) 100vw, 25vw'
// 									/>
// 								)}
// 							</div>
// 							<div className='p-4'>
// 								<div className='flex justify-between items-center mb-2'>
// 									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
// 									<span className='text-sm text-gray-400'>{post.date}</span>
// 								</div>
// 								<h3 className='text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3>
// 								<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
// 							</div>
// 						</Link>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// src/components/BlogDashboard.tsx • Mobile-Friendly Blog Dashboard : v3
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, CategoryId } from "@/data/categories";

export type GridSize = "large" | "medium" | "full";

// type Post = {
// 	id: string;
// 	title: string;
// 	excerpt: string;
// 	category: CategoryId;
// 	date: string;
// 	slug: string;
// 	cover_image?: string;
// };
type Post = {
	id: string;
	title: string;
	content: string;
	type: "markdown" | "component";
	component_name?: string;
	excerpt: string;
	category: CategoryId;
	date: string;
	slug: string;
	cover_image?: string;
};

type FeaturedSetup = {
	category: CategoryId;
	size: GridSize;
	order: number;
	title?: string;
	description?: string;
}[];

const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: GridSize; title?: string; description?: string }) => (
	<div
		className={`relative overflow-hidden rounded-xl bg-primary-800
    ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
    transition-transform duration-300 hover:scale-[1.02]`}
	>
		{post ? (
			<Link
				href={`/blog/${post.slug}`}
				className='block h-64 sm:h-96 aspect-[16/9]'
			>
				{post.cover_image ? (
					<div className='absolute inset-0'>
						<Image
							src={post.cover_image}
							alt={post.title}
							fill
							className='object-cover transition-transform duration-500 group-hover:scale-105'
							sizes={size === "full" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
							priority={size === "large"}
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
					</div>
				) : (
					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
				)}
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
			</Link>
		) : (
			<div className='aspect-[16/9] relative'>
				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
					<div className='absolute inset-0 p-6 flex items-center justify-center'>
						<p className='text-xl text-white/70'>No {category.name} posts yet</p>
					</div>
				</div>
			</div>
		)}
	</div>
);

export default function BlogDashboard({ posts, featuredSetup }: { posts: Post[]; featuredSetup: FeaturedSetup }) {
	const [mounted, setMounted] = useState(false);
	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
		const category = categories.find((c) => c.id === categoryId);
		return isActive ? `bg-${category?.id}-600` : `bg-primary-800 hover:bg-gray-700`;
	};

	const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
		if (isActive) return "text-white";
		const category = categories.find((c) => c.id === categoryId);
		return `text-${category?.id}-300`;
	};

	// Get featured posts
	const featuredPosts = featuredSetup.map((setup) => ({
		post: posts.find((p) => p.category === setup.category),
		...setup,
	}));

	// Filter remaining posts
	const featuredIds = featuredPosts.map((f) => f.post?.id).filter(Boolean);
	const remainingPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => !featuredIds.includes(post.id));

	return (
		<div className='max-w-page mx-auto px-4 py-8 space-y-8'>
			{/* Category buttons */}
			<div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4'>
				{categories.map((category) => {
					const Icon = category.icon;
					const isActive = activeCategory === category.id;
					return (
						<button
							key={category.id}
							onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
							className={`p-3 sm:p-4 rounded-lg flex items-center justify-center sm:justify-start
                space-x-2 transition-all ${getCategoryColor(category.id, isActive)}`}
						>
							<Icon
								size={20}
								className={getTextColor(category.id, isActive)}
							/>
							<span className={`hidden sm:inline font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
						</button>
					);
				})}
			</div>

			{/* Featured Posts Grid */}
			{!activeCategory && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
					{featuredPosts.map(
						({ post, category, size, title, description }) =>
							post && (
								<FeaturedCard
									key={post.id}
									post={post}
									category={categories.find((c) => c.id === category)!}
									size={size}
									title={title}
									description={description}
								/>
							)
					)}
				</div>
			)}

			{/* Regular Posts Grid */}
			<div>
				<h2 className='text-2xl font-bold mb-2'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
				{activeCategory && <p className='text-gray-400 text-lg mt-0 mb-6'>{categories.find((c) => c.id === activeCategory)?.description}</p>}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
					{remainingPosts.map((post) => (
						<Link
							key={post.id}
							href={`/blog/${post.slug}`}
							className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden
                shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
						>
							<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
								{post.cover_image && (
									<Image
										src={post.cover_image}
										alt={post.title}
										fill
										className='object-cover'
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									/>
								)}
							</div>
							<div className='p-4'>
								<div className='flex justify-between items-center mb-2'>
									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
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
			</div>
		</div>
	);
}

// // // src/components/BlogDashboard.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { categories, CategoryId } from "@/data/categories";

// // export type GridSize = "large" | "medium" | "full";

// // type Post = {
// // 	id: string;
// // 	title: string;
// // 	excerpt: string;
// // 	category: CategoryId;
// // 	date: string;
// // 	slug: string;
// // 	cover_image?: string;
// // };

// // type FeaturedSetup = {
// // 	category: CategoryId;
// // 	size: GridSize;
// // 	order: number;
// // 	title?: string;
// // 	description?: string;
// // }[];

// // const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: GridSize; title?: string; description?: string }) => (
// // 	<div
// // 		className={`relative overflow-hidden rounded-xl bg-primary-800
// //     ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
// //     transition-transform duration-300 hover:scale-[1.02]`}
// // 	>
// // 		{post ? (
// // 			<Link
// // 				href={`/blog/${post.slug}`}
// // 				className='block h-64 sm:h-96 aspect-[16/9]'
// // 			>
// // 				{post.cover_image ? (
// // 					<div className='absolute inset-0'>
// // 						<Image
// // 							src={post.cover_image}
// // 							alt={post.title}
// // 							fill
// // 							className='object-cover transition-transform duration-500 group-hover:scale-105'
// // 							sizes={size === "full" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
// // 							priority={size === "large"}
// // 						/>
// // 						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
// // 					</div>
// // 				) : (
// // 					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// // 				)}
// // 				<div className='absolute inset-0 p-4 sm:p-6 flex flex-col justify-end'>
// // 					<div
// // 						className='flex flex-col gap-2 self-start border border-primary-200/20 rounded-lg p-3 pr-6 sm:pr-10
// //             bg-gradient-to-t from-primary-900/70 via-primary-800/70 to-primary-600/70'
// // 					>
// // 						<div className='text-sm font-medium text-primary-300'>{title || category.name}</div>
// // 						<h3
// // 							className='text-lg sm:text-2xl font-bold text-white group-hover:text-brand-primary-200
// //               transition-colors line-clamp-2'
// // 						>
// // 							{post.title}
// // 						</h3>
// // 						<p className='text-gray-300 line-clamp-2 text-sm sm:text-base'>{description || post.excerpt}</p>
// // 					</div>
// // 				</div>
// // 			</Link>
// // 		) : (
// // 			<div className='aspect-[16/9] relative'>
// // 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// // 					<div className='absolute inset-0 p-6 flex items-center justify-center'>
// // 						<p className='text-xl text-white/70'>No {category.name} posts yet</p>
// // 					</div>
// // 				</div>
// // 			</div>
// // 		)}
// // 	</div>
// // );

// // export default function BlogDashboard({ posts, featuredSetup }: { posts: Post[]; featuredSetup: FeaturedSetup }) {
// // 	const [mounted, setMounted] = useState(false);
// // 	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

// // 	useEffect(() => {
// // 		setMounted(true);
// // 	}, []);

// // 	if (!mounted) return null;

// // 	const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
// // 		const category = categories.find((c) => c.id === categoryId);
// // 		return isActive ? `bg-${category?.id}-600` : `bg-primary-800 hover:bg-gray-700`;
// // 	};

// // 	const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
// // 		if (isActive) return "text-white";
// // 		const category = categories.find((c) => c.id === categoryId);
// // 		return `text-${category?.id}-300`;
// // 	};

// // 	// Get featured posts
// // 	const featuredPosts = featuredSetup.map((setup) => ({
// // 		post: posts.find((p) => p.category === setup.category),
// // 		...setup,
// // 	}));

// // 	// Filter remaining posts
// // 	const featuredIds = featuredPosts.map((f) => f.post?.id).filter(Boolean);
// // 	const remainingPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => !featuredIds.includes(post.id));

// // 	return (
// // 		<div className='max-w-page mx-auto px-4 py-8 space-y-8'>
// // 			{/* Category buttons */}
// // 			<div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4'>
// // 				{categories.map((category) => {
// // 					const Icon = category.icon;
// // 					const isActive = activeCategory === category.id;
// // 					return (
// // 						<button
// // 							key={category.id}
// // 							onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
// // 							className={`p-3 sm:p-4 rounded-lg flex items-center justify-center sm:justify-start
// //                 space-x-2 transition-all ${getCategoryColor(category.id, isActive)}`}
// // 						>
// // 							<Icon
// // 								size={20}
// // 								className={getTextColor(category.id, isActive)}
// // 							/>
// // 							<span className={`hidden sm:inline font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
// // 						</button>
// // 					);
// // 				})}
// // 			</div>

// // 			{/* Featured Posts Grid */}
// // 			{!activeCategory && (
// // 				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
// // 					{featuredPosts.map(
// // 						({ post, category, size, title, description }) =>
// // 							post && (
// // 								<FeaturedCard
// // 									key={post.id}
// // 									post={post}
// // 									category={categories.find((c) => c.id === category)!}
// // 									size={size}
// // 									title={title}
// // 									description={description}
// // 								/>
// // 							)
// // 					)}
// // 				</div>
// // 			)}

// // 			{/* Regular Posts Grid */}
// // 			<div>
// // 				<h2 className='text-2xl font-bold mb-2'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
// // 				{activeCategory && <p className='text-gray-400 text-lg mt-0 mb-6'>{categories.find((c) => c.id === activeCategory)?.description}</p>}
// // 				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
// // 					{remainingPosts.map((post) => (
// // 						<Link
// // 							key={post.id}
// // 							href={`/blog/${post.slug}`}
// // 							className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden
// //                 shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
// // 						>
// // 							<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
// // 								{post.cover_image && (
// // 									<Image
// // 										src={post.cover_image}
// // 										alt={post.title}
// // 										fill
// // 										className='object-cover'
// // 										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
// // 									/>
// // 								)}
// // 							</div>
// // 							<div className='p-4'>
// // 								<div className='flex justify-between items-center mb-2'>
// // 									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
// // 									<span className='text-sm text-gray-400'>{post.date}</span>
// // 								</div>
// // 								<h3
// // 									className='text-lg font-semibold mb-2 group-hover:text-blue-400
// //                   transition-colors line-clamp-2'
// // 								>
// // 									{post.title}
// // 								</h3>
// // 								<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
// // 							</div>
// // 						</Link>
// // 					))}
// // 				</div>
// // 			</div>
// // 		</div>
// // 	);
// // }

// // // // src/components/BlogDashboard.tsx
// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { ArrowLeft } from "lucide-react";
// // // import { categories, CategoryId } from "@/data/categories";

// // // type Post = {
// // // 	id: string;
// // // 	title: string;
// // // 	excerpt: string;
// // // 	category: CategoryId;
// // // 	date: string;
// // // 	slug: string;
// // // 	cover_image?: string;
// // // };

// // // const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: "large" | "medium" | "full"; title?: string; description?: string }) => (
// // // 	<div
// // // 		className={`relative overflow-hidden rounded-xl bg-primary-800
// // //       ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
// // //          transition-transform duration-300 hover:scale-[1.02]`}
// // // 	>
// // // 		{post ? (
// // // 			<Link
// // // 				href={`/blog/${post.slug}`}
// // // 				// className='buttonContainer group block h-[250px] aspect-[16/9]'
// // // 				className='featuredGroup group block h-96 aspect-[16/9]'
// // // 			>
// // // 				{post.cover_image ? (
// // // 					<div className='absolute inset-0'>
// // // 						<Image
// // // 							src={post.cover_image}
// // // 							alt={post.title}
// // // 							fill
// // // 							className='object-cover transition-transform duration-500 group-hover:scale-105'
// // // 							sizes={size === "full" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
// // // 							priority={size === "large"}
// // // 						/>
// // // 						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
// // // 						{/* <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' /> */}
// // // 					</div>
// // // 				) : (
// // // 					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// // // 				)}
// // // 				<div className='featuredContainer absolute inset-0 p-6 flex flex-col justify-end'>
// // // 					{/*--=== Featured text container ===--*/}
// // // 					<div className='featuredTextContainer flex flex-col gap-2 self-start border border-primary-200/20 rounded-lg p-3 pr-10 bg-gradient-to-t from-primary-900/70 via-primary-800/70 to-primary-600/70'>
// // // 						<div className='text-sm font-medium text-primary-300'>{title || category.name}</div>
// // // 						<h3 className='text-2xl font-bold text-white group-hover:text-brand-primary-200 transition-colors'>{post.title}</h3>
// // // 						<p className='text-gray-300 line-clamp-2'>{description || post.excerpt}</p>
// // // 					</div>
// // // 					{/* <div className='featuredTextContainer inline-block border border-primary-200/20 rounded-lg p-4 bg-gradient-to-t from-primary-800/70 via-primary-600/70 to-primary-400/70'>
// // // 						<div className={`text-sm font-medium text-primary-300 mb-2`}>{title || category.name}</div>
// // // 						<h3 className='text-2xl font-bold text-white mb-2 group-hover:text-brand-primary-200 transition-colors'>{post.title}</h3>
// // // 						<p className='text-gray-300 line-clamp-2'>{description || post.excerpt}</p>
// // // 					</div> */}
// // // 				</div>
// // // 			</Link>
// // // 		) : (
// // // 			<div className='aspect-[16/9] relative'>
// // // 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// // // 					<div className='absolute inset-0 p-6 flex items-center justify-center'>
// // // 						<p className='text-xl text-white/70'>No {category.name} posts yet</p>
// // // 					</div>
// // // 				</div>
// // // 			</div>
// // // 		)}
// // // 	</div>
// // // );

// // // export default function BlogDashboard({ posts }: { posts: Post[] }) {
// // // 	const [mounted, setMounted] = useState(false);
// // // 	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

// // // 	useEffect(() => {
// // // 		setMounted(true);
// // // 	}, []);
// // // 	// Don't render anything until component is mounted to prevent hydration mismatch
// // // 	if (!mounted) {
// // // 		return null;
// // // 	}

// // // 	// Helper function to get category background color
// // // 	const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
// // // 		switch (categoryId) {
// // // 			case "tech":
// // // 				return isActive ? "bg-primary-600" : "bg-primary-800 hover:bg-gray-700";
// // // 			case "media":
// // // 				return isActive ? "bg-secondary-600" : "bg-primary-800 hover:bg-gray-700";
// // // 			case "food":
// // // 				return isActive ? "bg-accent-600" : "bg-primary-800 hover:bg-gray-700";
// // // 			case "personal":
// // // 				return isActive ? "bg-success-600" : "bg-primary-800 hover:bg-gray-700";
// // // 			default:
// // // 				return "bg-primary-800 hover:bg-gray-700";
// // // 		}
// // // 	};

// // // 	// Helper function to get text color
// // // 	const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
// // // 		if (isActive) return "text-white";

// // // 		switch (categoryId) {
// // // 			case "tech":
// // // 				return "text-primary-300";
// // // 			case "media":
// // // 				return "text-primary-300";
// // // 			case "food":
// // // 				return "text-primary-300";
// // // 			case "personal":
// // // 				return "text-primary-200";
// // // 			default:
// // // 				return "text-gray-300";
// // // 		}
// // // 	};

// // // 	// Get featured posts
// // // 	const techPost = posts.find((post) => post.category === "tech");
// // // 	const mediaPost = posts.find((post) => post.category === "media");
// // // 	const foodPost = posts.find((post) => post.category === "food");

// // // 	// Filter remaining posts
// // // 	const featuredIds = [techPost?.id, mediaPost?.id, foodPost?.id].filter(Boolean);
// // // 	const remainingPosts = posts.filter((post) => !featuredIds.includes(post.id));

// // // 	return (
// // // 		// <div className='max-w-7xl mx-auto px-4 py-8 space-y-12'>
// // // 		<div className='max-w-page mx-auto px-4 py-8 space-y-12'>
// // // 			{/* Category buttons */}
// // // 			<div className='featuredButtonsContainer grid grid-cols-1 md:grid-cols-4 gap-4'>
// // // 				{categories.map((category) => {
// // // 					const Icon = category.icon;
// // // 					const isActive = activeCategory === category.id;
// // // 					// console.log("Button Classes:", `p-4 rounded-lg flex items-center space-x-3 transition-all ${activeCategory === category.id ? `${category.color} text-white` : "bg-primary-800 hover:bg-primary-700"}`);
// // // 					return (
// // // 						<button
// // // 							key={category.id}
// // // 							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
// // // 							className={`
// // //                         p-4 rounded-lg flex items-center space-x-3 transition-all
// // //                         ${getCategoryColor(category.id, isActive)}
// // //                       `}
// // // 						>
// // // 							<Icon
// // // 								size={24}
// // // 								className={getTextColor(category.id, isActive)}
// // // 							/>
// // // 							{/* orig */}
// // // 							{/* <span className={`font-medium ${isActive ? "text-white" : ""}`}>{category.name}</span> */}
// // // 							{/* manual */}
// // // 							{/* <span className={`font-medium ${isActive ? "text-white" : "text-gray-300 dark:text-gray-400"}`}>{category.name}</span> */}
// // // 							{/* using helper */}
// // // 							<span className={`font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
// // // 						</button>
// // // 					);
// // // 				})}
// // // 			</div>

// // // 			{/*---== Featured Posts Grid ===---*/}
// // // 			{!activeCategory && (
// // // 				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
// // // 					{techPost && (
// // // 						// <div className='md:col-span-4 md:row-span-2'>
// // // 						<div className='md:col-span-2 lg:col-span-2 lg:col-start-1'>
// // // 							<FeaturedCard
// // // 								post={techPost}
// // // 								category={categories[0]}
// // // 								size='full'
// // // 								// size='large'
// // // 								title='Featured Tech Article'
// // // 							/>
// // // 						</div>
// // // 					)}
// // // 					{mediaPost && (
// // // 						<div className='md:col-span-2'>
// // // 							<FeaturedCard
// // // 								post={mediaPost}
// // // 								category={categories[1]}
// // // 								size='medium'
// // // 								title='Latest Media'
// // // 							/>
// // // 						</div>
// // // 					)}
// // // 					{foodPost && (
// // // 						<div className='md:col-span-2 lg:col-span-4 lg:col-start-1'>
// // // 							<FeaturedCard
// // // 								post={foodPost}
// // // 								category={categories[2]}
// // // 								size='full'
// // // 								title='Latest Recipe'
// // // 							/>
// // // 						</div>
// // // 					)}
// // // 				</div>
// // // 			)}

// // // 			{/*---== Regular Posts Grid ===---*/}
// // // 			<div>
// // // 				{/*-== Category title ==-*/}
// // // 				<h2 className='text-2xl font-bold mb-2'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
// // // 				{/*-== Category description ==-*/}
// // // 				{activeCategory && <p className='text-gray-400 text-lg mt-0 mb-20'>{categories.find((c) => c.id === activeCategory)?.description}</p>}
// // // 				{/*-== Category all posts ==-*/}
// // // 				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
// // // 					{(activeCategory ? posts.filter((post) => post.category === activeCategory) : remainingPosts).map((post) => (
// // // 						<Link
// // // 							key={post.id}
// // // 							href={`/blog/${post.slug}`}
// // // 							/*-= Individual post container template style =-*/
// // // 							className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
// // // 						>
// // // 							<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
// // // 								{post.cover_image && (
// // // 									<Image
// // // 										src={post.cover_image}
// // // 										alt={post.title}
// // // 										fill
// // // 										className='object-cover'
// // // 										sizes='(max-width: 768px) 100vw, 25vw'
// // // 									/>
// // // 								)}
// // // 							</div>
// // // 							<div className='p-4'>
// // // 								<div className='flex justify-between items-center mb-2'>
// // // 									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
// // // 									<span className='text-sm text-gray-400'>{post.date}</span>
// // // 								</div>
// // // 								<h3 className='text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3>
// // // 								<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
// // // 							</div>
// // // 						</Link>
// // // 					))}
// // // 				</div>
// // // 			</div>
// // // 		</div>
// // // 	);
// // // }
