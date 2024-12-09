// src/app/blog/page.tsx
import Link from "next/link";
import { supabaseClient } from "@/lib/auth";
// import BlogDashboard from "@/components/BlogDashboard";
import { CategoryId } from "@/data/categories";
import { GridSize } from "@/components/BlogDashboard";
import { unstable_noStore } from "next/cache";
import BlogDashboard from "@/components/blog/dashboard";

// Define featured setup type
type FeaturedSetup = {
	category: CategoryId;
	size: GridSize;
	order: number;
	title?: string;
	description?: string;
}[];

// Featured setup configuration
const featuredSetup: FeaturedSetup = [
	{
		category: "tech",
		size: "large",
		order: 0,
		title: "Latest in Tech",
		description: "Latest tech insights and tutorials",
	},
	{
		category: "media",
		size: "medium",
		order: 1,
		title: "Media & Reviews",
	},
];

export default async function BlogList() {
	unstable_noStore();

	const { data: posts, error } = await supabaseClient.from("posts").select("*").order("created_at", { ascending: false });

	if (error) {
		console.error("Supabase error:", error);
		return <div>Error loading posts</div>;
	}

	const formattedPosts =
		posts?.map((post) => ({
			id: post.id,
			title: post.title,
			excerpt: post.excerpt || "",
			category: (post.category || "tech") as CategoryId,
			date: new Date(post.created_at).toLocaleDateString(),
			slug: post.slug,
			cover_image: post.cover_image,
		})) || [];

	return (
		// <div className='max-w-7xl mx-auto'>
		<div className='max-w-page mx-auto'>
			<div className='flex justify-between items-center mb-8 px-4'>
				<h1 className='text-3xl font-bold'>Blog Posts</h1>
			</div>

			<BlogDashboard
				posts={posts}
				featuredSetup={featuredSetup}
			/>
		</div>
	);
}
