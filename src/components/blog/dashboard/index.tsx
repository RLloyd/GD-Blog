// src/components/dashboard/index.tsx
"use client";
import { useState, useEffect } from "react";
import { categories, CategoryId } from "@/data/categories";
import { CategoryButtons } from "./CategoryButtons";
import { FeaturedCard } from "./FeaturedCard";
import { PostGrid } from "./PostGrid";
import type { Post, FeaturedSetup } from "./types";

type DashboardProps = {
	posts: Post[];
	featuredSetup: FeaturedSetup;
};

// export default function BlogDashboard({ posts, featuredSetup }: { posts: Post[]; featuredSetup: FeaturedSetup }) {
export default function BlogDashboard({ posts, featuredSetup }: DashboardProps) {
	const [mounted, setMounted] = useState(false);
	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const featuredPosts = featuredSetup.map((setup) => ({
		post: posts.find((p) => p.category === setup.category),
		...setup,
	}));

	// const featuredIds = featuredPosts.map((f) => f.post?.id).filter(Boolean);
	const featuredIds = featuredPosts.map((f) => f.post?.id).filter(Boolean) as string[];
	const remainingPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => !featuredIds.includes(post.id));

	const activeCategoryData = activeCategory ? categories.find((c): c is (typeof categories)[number] => c.id === activeCategory) : null;

	return (
		<div className='max-w-page mx-auto px-4 py-8 space-y-8'>
			<CategoryButtons
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
			/>

			{/* {!activeCategory && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
					{featuredPosts.map(({ post, category, size, title, description }) => (
						<FeaturedCard
							key={post?.id}
							post={post}
							category={categories.find((c) => c.id === category)!}
							size={size}
							title={title}
							description={description}
						/>
					))}
				</div>
			)} */}

			{!activeCategory && (
				<div className='featuredPostsContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
					{featuredPosts.map(({ post, category, size, title, description }) => {
						const categoryData = categories.find((c): c is (typeof categories)[number] => c.id === category);
						if (!categoryData) return null;

						return (
							<FeaturedCard
								key={post?.id ?? category}
								post={post}
								category={categoryData}
								size={size}
								title={title}
								description={description}
							/>
						);
					})}
				</div>
			)}

			{/* <div>
				<h2 className='text-2xl font-bold mb-2'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
				{activeCategory && <p className='text-gray-400 text-lg mt-0 mb-6'>{categories.find((c) => c.id === activeCategory)?.description}</p>}
				<PostGrid posts={remainingPosts} />
			</div> */}
			<div>
				<h2 className='text-2xl font-bold mb-2'>{activeCategoryData?.name ?? "All Posts"}</h2>
				{activeCategoryData && <p className='text-gray-400 text-lg mt-0 mb-6'>{activeCategoryData.description}</p>}
				<PostGrid posts={remainingPosts} />
			</div>
		</div>
	);
}
