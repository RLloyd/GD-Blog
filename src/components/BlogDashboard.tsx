// src/components/BlogDashboard.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { categories, CategoryId } from "@/data/categories";

type Post = {
	id: string;
	title: string;
	excerpt: string;
	category: CategoryId;
	date: string;
	slug: string;
	cover_image?: string;
};

const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: "large" | "medium" | "full"; title?: string; description?: string }) => (
	<div
		className={`relative overflow-hidden rounded-xl bg-primary-800
      ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
         transition-transform duration-300 hover:scale-[1.02]`}
	>
		{post ? (
			<Link
				href={`/blog/${post.slug}`}
				className='buttonContainer group block h-[250px] aspect-[16/9]'
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
						{/* <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' /> */}
					</div>
				) : (
					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
				)}
				<div className='absolute inset-0 p-6 flex flex-col justify-end'>
					<div className={`text-sm font-medium ${category.textColor} mb-2`}>{title || category.name}</div>
					{/* <div className={`text-sm font-medium text-primary-300 mb-2`}>{title || category.name}</div> */}
					{/* <div className={`text-sm font-medium ${category.textColor} mb-2`}>{title || category.name}</div> */}
					<h3 className='text-2xl font-bold text-white mb-2 group-hover:text-brand-primary-200 transition-colors'>{post.title}</h3>
					{/* bg-brand-primary text-white */}
					{/* <h3 className='text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3> */}
					<p className='text-gray-300 line-clamp-2'>{description || post.excerpt}</p>
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

export default function BlogDashboard({ posts }: { posts: Post[] }) {
	const [mounted, setMounted] = useState(false);
	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);
	// Don't render anything until component is mounted to prevent hydration mismatch
	if (!mounted) {
		return null;
	}

	// Helper function to get category background color
	const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
		switch (categoryId) {
			case "tech":
				return isActive ? "bg-primary-600" : "bg-primary-800 hover:bg-gray-700";
			case "media":
				return isActive ? "bg-secondary-600" : "bg-primary-800 hover:bg-gray-700";
			case "food":
				return isActive ? "bg-accent-600" : "bg-primary-800 hover:bg-gray-700";
			case "personal":
				return isActive ? "bg-success-600" : "bg-primary-800 hover:bg-gray-700";
			default:
				return "bg-primary-800 hover:bg-gray-700";
		}
	};

	// Helper function to get text color
	const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
		if (isActive) return "text-white";

		switch (categoryId) {
			case "tech":
				return "text-primary-300";
			case "media":
				return "text-secondary-300";
			case "food":
				return "text-accent-300";
			case "personal":
				return "text-primary-200";
			default:
				return "text-gray-300";
		}
	};

	// Get featured posts
	const techPost = posts.find((post) => post.category === "tech");
	const mediaPost = posts.find((post) => post.category === "media");
	const foodPost = posts.find((post) => post.category === "food");

	// Filter remaining posts
	const featuredIds = [techPost?.id, mediaPost?.id, foodPost?.id].filter(Boolean);
	const remainingPosts = posts.filter((post) => !featuredIds.includes(post.id));

	return (
		<div className='max-w-7xl mx-auto px-4 py-8 space-y-12'>
			{/* Category buttons */}
			<div className='featuredButtonsContainer grid grid-cols-1 md:grid-cols-4 gap-4'>
				{categories.map((category) => {
					const Icon = category.icon;
					const isActive = activeCategory === category.id;
					// console.log("Button Classes:", `p-4 rounded-lg flex items-center space-x-3 transition-all ${activeCategory === category.id ? `${category.color} text-white` : "bg-primary-800 hover:bg-primary-700"}`);
					return (
						<button
							key={category.id}
							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
							className={`
                        p-4 rounded-lg flex items-center space-x-3 transition-all
                        ${getCategoryColor(category.id, isActive)}
                      `}
						>
							<Icon
								size={24}
								className={getTextColor(category.id, isActive)}
							/>
							{/* orig */}
							{/* <span className={`font-medium ${isActive ? "text-white" : ""}`}>{category.name}</span> */}
							{/* manual */}
							{/* <span className={`font-medium ${isActive ? "text-white" : "text-gray-300 dark:text-gray-400"}`}>{category.name}</span> */}
							{/* using helper */}
							<span className={`font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
						</button>
					);
				})}
			</div>

			{/* Featured Posts Grid */}
			{!activeCategory && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{techPost && (
						<div className='md:col-span-2 md:row-span-2'>
							<FeaturedCard
								post={techPost}
								category={categories[0]}
								size='large'
								title='Featured Tech Article'
							/>
						</div>
					)}
					{mediaPost && (
						<div className='md:col-span-2'>
							<FeaturedCard
								post={mediaPost}
								category={categories[1]}
								size='medium'
								title='Latest Media'
							/>
						</div>
					)}
					{foodPost && (
						<div className='md:col-span-2 lg:col-span-4 lg:col-start-1'>
							<FeaturedCard
								post={foodPost}
								category={categories[2]}
								size='full'
								title='Latest Recipe'
							/>
						</div>
					)}
				</div>
			)}

			{/* Regular Posts Grid */}
			<div>
				<h2 className='text-2xl font-bold mb-6'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
					{(activeCategory ? posts.filter((post) => post.category === activeCategory) : remainingPosts).map((post) => (
						<Link
							key={post.id}
							href={`/blog/${post.slug}`}
							className='group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow'
						>
							<div className='aspect-[16/9] relative bg-gray-900'>
								{post.cover_image && (
									<Image
										src={post.cover_image}
										alt={post.title}
										fill
										className='object-cover'
										sizes='(max-width: 768px) 100vw, 25vw'
									/>
								)}
							</div>
							<div className='p-4'>
								<div className='flex justify-between items-center mb-2'>
									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
									<span className='text-sm text-gray-400'>{post.date}</span>
								</div>
								<h3 className='text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3>
								<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
