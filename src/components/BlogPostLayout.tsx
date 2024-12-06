// src/components/BlogPostLayout.tsx
import { useState } from "react";
import { Heart, Share2, MessageSquare } from "lucide-react";
import { Article, Title, Metadata, Content } from "./BlogPost.styles";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Reactions } from "@/components/Reactions";
import { Comments } from "@/components/Comments";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { DeletePost } from "./DeletePost";

type BlogPostLayoutProps = {
	post: {
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
	children?: React.ReactNode;
};

export default function BlogPostLayout({ post, children }: BlogPostLayoutProps) {
	const [isOpen, setIsOpen] = useState(true);
	const { isAuthenticated } = useAuth();

	return (
		<div className='max-w-screen-2xl mx-auto px-4'>
			{/* Header Section */}
			<div className='flex justify-between items-center mb-8'>
				<Link
					href='/blog'
					className='text-brand-primary-400 hover:text-brand-primary-300'
				>
					← Back to posts
				</Link>
				{isAuthenticated && (
					<div className='space-x-4'>
						<Link
							href={`/blog/edit/${post.slug}`}
							className='bg-brand-primary-500 text-white px-4 py-2 rounded hover:bg-brand-primary-600'
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
								className='w-full h-full'
								priority
							/>
						</div>
					)}

					<div className='prose prose-lg max-w-none'>
						{/* <Title>{post.title}</Title> • styled-components */}
						{/* <h1 className='text-3xl font-bold mb-4 text-primary-500 dark:text-primary-400'>{post.title}</h1> */}
						<h1 className='text-3xl font-bold mb-4'>{post.title}XSX</h1>
						<Metadata>
							{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
						</Metadata>
						<div className='dateContainer text-primary-400 mb-8 font-serif italic'>
							{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
						</div>

						{post.excerpt && <p className='text-xl text-gray-300 mb-8 font-serif italic'>{post.excerpt}</p>}

						<MarkdownContent content={post.content} />
					</div>

					{/* Engagement Bar */}
					<div className='sticky bottom-0 bg-gray-900/80 backdrop-blur mt-8 p-4 rounded-lg'>
						<div className='flex items-center justify-between'>
							<Reactions postId={post.id} />
							<div className='flex gap-4'>
								<button className='flex items-center gap-2 text-gray-300 hover:text-white'>
									<MessageSquare size={20} />
									<span>{isOpen ? "Hide" : "Show"} Comments</span>
								</button>
								<button className='flex items-center gap-2 text-gray-300 hover:text-white'>
									<Share2 size={20} />
									Share
								</button>
							</div>
						</div>
					</div>
				</article>

				{/* Right Column - Comments */}
				<div className={`lg:block ${isOpen ? "block" : "hidden"}`}>
					<div className='sticky top-4'>
						<Comments postId={post.id} />
					</div>
				</div>
			</div>
		</div>
	);
}
