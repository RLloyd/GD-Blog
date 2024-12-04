// src/components/BlogPostContent.tsx
"use client";
import BlogPostLayout from "./BlogPostLayout";
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

					<div className='prose prose-lg dark:prose-invert max-w-none'>
						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
						<div className='text-gray-500 dark:text-gray-400 mb-8'>
							{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
						</div>

						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

						<div className='mt-8 content'>{post.content}</div>

						{/* Engagement Bar */}
						<div className='sticky bottom-0 bg-gray-900/80 backdrop-blur mt-8 p-4 rounded-lg'>
							<Reactions postId={post.id} />
						</div>
					</div>
				</article>

				{/* Right Column - Comments */}
				<div className='lg:sticky lg:top-4 space-y-6'>
					<Comments postId={post.id} />
				</div>
			</div>
		</div>
	);
}
// // src/components/BlogPostContent.tsx
// "use client";
// import BlogPostLayout from "./BlogPostLayout";

// type BlogPostProps = {
// 	post: {
// 		id: string;
// 		title: string;
// 		content: string;
// 		excerpt?: string;
// 		cover_image?: string;
// 		created_at: string;
// 		slug: string;
// 		profiles?: {
// 			username?: string;
// 		};
// 	};
// };

// export default function BlogPostContent({ post }: BlogPostProps) {
// 	return (
// 		<article className='max-w-3xl mx-auto'>
// 			<header className='mb-8'>
// 				<h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
// 				<div className='text-sm text-gray-600 dark:text-gray-400'>
// 					{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
// 				</div>
// 			</header>

// 			{post.excerpt && <p className='text-xl text-gray-600 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// 			<div className='prose dark:prose-invert max-w-none'>
// 				{/* Your content rendering here */}
// 				{post.content}
// 			</div>
// 		</article>
// 	);
// }

// // // src/components/BlogPostContent.tsx
// // "use client";
// // import BlogPostLayout from "./BlogPostLayout";

// // type Post = {
// // 	id: string;
// // 	title: string;
// // 	content: string;
// // 	excerpt?: string;
// // 	cover_image?: string;
// // 	created_at: string;
// // 	slug: string;
// // 	profiles?: {
// // 		username?: string;
// // 	};
// // };

// // export default function BlogPostContent({ post }: { post: Post }) {
// // 	return <BlogPostLayout post={post} />;
// // }
// // // // src/components/BlogPostContent.tsx - Client Component
// // // "use client";
// // // import { Article, Title, Metadata, Content } from "./BlogPost.styles";
// // // import { MarkdownContent } from "@/components/MarkdownContent";
// // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // import { Reactions } from "@/components/Reactions";
// // // import { Comments } from "@/components/Comments";
// // // import Link from "next/link";
// // // import { DeletePost } from "@/components/DeletePost";
// // // import { useAuth } from "@/hooks/useAuth";

// // // type Post = {
// // // 	id: string;
// // // 	title: string;
// // // 	content: string;
// // // 	excerpt?: string;
// // // 	cover_image?: string;
// // // 	created_at: string;
// // // 	slug: string;
// // // 	profiles?: {
// // // 		username?: string;
// // // 	};
// // // };

// // // /*-=====================================================================================
// // // BlogPostContent component serves as the main display template for individual blog posts,
// // // combining content presentation with interactive features.
// // // ======================================================================================-*/
// // // export default function BlogPostContent({ post }: { post: Post }) {
// // //    const { isAuthenticated } = useAuth();

// // // 	return (
// // // 		<Article>
// // // 			<div className="flex justify-between items-center mb-8">
// // // 				<Link href="/blog" className="text-blue-400 hover:text-blue-300">
// // // 					← Back to posts
// // // 				</Link>
// // // 				{isAuthenticated && (
// // // 					<div className="space-x-4">
// // // 						<Link href={`/blog/edit/${post.slug}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// // // 							Edit Post
// // // 						</Link>
// // // 						<DeletePost postId={post.id} />
// // // 					</div>
// // // 				)}
// // // 			</div>

// // // 			{post.cover_image && (
// // // 				<div className="relative rounded-lg overflow-hidden mb-8 aspect-video">
// // // 					<ImageWithFallback src={post.cover_image} alt={post.title} className="w-full h-full" priority />
// // // 				</div>
// // // 			)}

// // // 			<header>
// // // 				<Title>{post.title}</Title>
// // // 				<Metadata>
// // // 					{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
// // // 				</Metadata>
// // // 			</header>

// // // 			{post.excerpt && <p className="text-xl text-gray-300 mb-8 font-serif italic">{post.excerpt}</p>}

// // // 			<Content>
// // // 				<MarkdownContent content={post.content} />
// // // 				<div className="mt-8 border-t border-gray-700 pt-8">
// // // 					<Reactions postId={post.id} />
// // // 				</div>
// // // 			</Content>

// // // 			<Comments postId={post.id} />
// // // 		</Article>
// // // 	);
// // // }

// // // // // src/components/BlogPostContent.tsx - Client Component
// // // // 'use client'
// // // // import { Article, Title, Metadata, Content } from './BlogPost.styles'
// // // // import { MarkdownContent } from '@/components/MarkdownContent'
// // // // import { ImageWithFallback } from '@/components/ImageWithFallback'
// // // // import { Reactions } from '@/components/Reactions'
// // // // import { Comments } from '@/components/Comments'
// // // // import Link from 'next/link'
// // // // import { DeletePost } from '@/components/DeletePost'

// // // // type Post = {
// // // //   id: string
// // // //   title: string
// // // //   content: string
// // // //   excerpt?: string
// // // //   cover_image?: string
// // // //   created_at: string
// // // //   slug: string
// // // //   profiles?: {
// // // //     username?: string
// // // //   }
// // // // }

// // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // //   return (
// // // //     <Article>
// // // //       <div className="flex justify-between items-center mb-8">
// // // //         <Link href="/blog" className="text-blue-400 hover:text-blue-300">
// // // //           ← Back to posts
// // // //         </Link>
// // // //         <div className="space-x-4">
// // // //           <Link href={`/blog/edit/${post.slug}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// // // //             Edit Post
// // // //           </Link>
// // // //           <DeletePost postId={post.id} />
// // // //         </div>
// // // //       </div>

// // // //       {post.cover_image && (
// // // //         <div className="relative rounded-lg overflow-hidden mb-8 aspect-video">
// // // //           <ImageWithFallback
// // // //             src={post.cover_image}
// // // //             alt={post.title}
// // // //             className="w-full h-full"
// // // //             priority
// // // //           />
// // // //         </div>
// // // //       )}

// // // //       <header>
// // // //         <Title>{post.title}</Title>
// // // //         <Metadata>
// // // //           {new Date(post.created_at).toLocaleDateString()} •
// // // //           {post.profiles?.username || 'Anonymous'}
// // // //         </Metadata>
// // // //       </header>

// // // //       {post.excerpt && (
// // // //         <p className="text-xl text-gray-300 mb-8 font-serif italic">
// // // //           {post.excerpt}
// // // //         </p>
// // // //       )}

// // // //       <Content>
// // // //         <MarkdownContent content={post.content} />
// // // //         <div className="mt-8 border-t border-gray-700 pt-8">
// // // //           <Reactions postId={post.id} />
// // // //         </div>
// // // //       </Content>

// // // //       <Comments postId={post.id} />
// // // //     </Article>
// // // //   )
// // // // }
