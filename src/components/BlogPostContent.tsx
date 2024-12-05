// src/components/BlogPostContent.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Reactions } from "@/components/Reactions";
import { Comments } from "@/components/Comments";
import { useAuth } from "@/hooks/useAuth";
import { DeletePost } from "./DeletePost";

type Post = {
	id: string;
	title: string;
	content: string;
	excerpt?: string;
	cover_image?: string;
	created_at: string;
	slug: string;
	profiles?: {
		username?: string;
	};
};

export default function BlogPostContent({ post }: { post: Post }) {
	const { isAuthenticated } = useAuth();

	return (
		<div className='max-w-screen-2xl mx-auto px-4'>
			{/* Header Section */}
			<div className='flex justify-between items-center mb-8'>
				<Link
					href='/blog'
					className='text-primary-400 hover:text-primary-300'
				>
					← Back to posts
				</Link>
				{isAuthenticated && (
					<div className='space-x-4'>
						<Link
							href={`/blog/edit/${post.slug}`}
							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
						>
							Edit Post
						</Link>
						<DeletePost postId={post.id} />
					</div>
				)}
			</div>

			{/* Main Content Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
				{/* Left Column - Article Content */}
				<article className='relative'>
					{post.cover_image && (
						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
							<ImageWithFallback
								src={post.cover_image}
								alt={post.title}
								className='w-full h-full object-cover'
								priority
							/>
						</div>
					)}
					{/* Content */}
					<div className='prose prose-lg dark:prose-invert max-w-none'>
						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
						<div className='text-gray-400 dark:text-gray-400 mb-8'>
							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
						</div>

						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

						<div className='mt-8'>{post.content}</div>

						{/* Engagement Bar */}
						<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
							<Reactions postId={post.id} />
						</div>
					</div>
				</article>

				{/* Right Column - Comments */}
				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
					<Comments postId={post.id} />
				</div>
			</div>
		</div>
	);
}
