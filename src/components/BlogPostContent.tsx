// src/components/BlogPostContent.tsx
import Link from "next/link";
import { Comments } from "@/components/Comments";
import { AuthorInfo } from "./blog/AuthorInfo";
import { CoverImage } from "./blog/CoverImage";
import { MarkdownRenderer } from "./blog/MarkdownRenderer";
import { EngagementBar } from "./blog/EngagementBar";
import dynamic from "next/dynamic";

type Post = {
	id: string;
	title: string;
	content: string;
	type: "markdown" | "component";
	component_name?: string;
	component_props?: Record<string, any>;
	excerpt?: string;
	cover_image?: string;
	created_at: string;
	slug: string;
	profiles?: {
		username?: string;
	};
};

// Dynamic component loader
const DynamicComponent = ({ componentName, props = {} }) => {
	const Component = dynamic(() => import(`@/components/blog-components/${componentName}`), {
		loading: () => (
			<div className='flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500'></div>
			</div>
		),
	});

	return <Component {...props} />;
};

export default function BlogPostContent({ post }: { post: Post }) {
	return (
		<div className='max-w-page mx-auto px-4'>
			{/* <div className='flex justify-between items-center mb-8'>
				<Link
					href='/blog'
					className='text-primary-400 hover:text-primary-300'
				>
					← Back to posts
				</Link>
			</div> */}

			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
				<article className='relative'>
					{/* Cover Image */}
					<CoverImage
						src={post.cover_image}
						alt={post.title}
					/>

					{/* Main Content Area */}
					<div className='prose prose-lg dark:prose-invert max-w-none'>
						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

						{/* Author Info */}
						<AuthorInfo date={post.created_at} />

						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

						{/* Conditional Content Rendering */}
						<div className='mt-8'>
							{post.type === "markdown" ? (
								<MarkdownRenderer content={post.content} />
							) : (
								<div className='bg-white dark:bg-gray-800 rounded-lg overflow-hidden'>
									<DynamicComponent
										componentName={post.component_name}
										props={post.component_props}
									/>
								</div>
							)}
						</div>
					</div>

					{/* Engagement Bar */}
					<EngagementBar postId={post.id} />
				</article>

				{/* Comments Section */}
				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
					<Comments postId={post.id} />
				</div>
			</div>
		</div>
	);
}

// // src/components/BlogPostContent.tsx
// "use client";
// import Link from "next/link";
// import { Comments } from "@/components/Comments";
// import { AuthorInfo } from "./blog/AuthorInfo";
// import { CoverImage } from "./blog/CoverImage";
// // import { MarkdownRenderer } from "./blog/MarkdownRenderer";
// import { EngagementBar } from "./blog/EngagementBar";

// import dynamic from "next/dynamic";
// import { MarkdownRenderer } from "./blog/MarkdownRenderer";
// import { Post } from "../../types/blog";

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

// export default function BlogPostContent({ post }: { post: Post }) {
// 	const { title, category, cover_image, excerpt, created_at } = post;

// 	return (
// 		<div className='max-w-page mx-auto px-4'>
// 			<div className='flex justify-between items-center mb-8'>
// 				<Link
// 					href='/blog'
// 					className='text-primary-400 hover:text-primary-300'
// 				>
// 					← Back to posts
// 				</Link>
// 			</div>

// 			{/* Common header section */}
// 			<header>
// 				<h1>{title}</h1>
// 				<div className='meta'>{/* ... meta info ... */}</div>
// 			</header>

// 			{/* Conditional content rendering */}
// 			{post.type === "markdown" ? (
// 				<MarkdownRenderer content={post.content} />
// 			) : (
// 				<DynamicComponentRenderer
// 					componentName={post.component_name}
// 					props={post.props}
// 				/>
// 			)}

// 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// 				<article className='relative'>
// 					<CoverImage
// 						src={post.cover_image}
// 						alt={post.title}
// 					/>

// 					<AuthorInfo date={post.created_at} />

// 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}
// 						<MarkdownRenderer content={post.content} />
// 					</div>

// 					<EngagementBar postId={post.id} />
// 				</article>

// 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// 					<Comments postId={post.id} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// // Component renderer with dynamic imports
// function DynamicComponentRenderer({ componentName, props = {} }: { componentName: string; props?: Record<string, unknown> }) {
// 	const Component = dynamic(() => import(`@/components/blog-components/${componentName}`), {
// 		loading: () => <div>Loading component...</div>,
// 	});

// 	return <Component {...props} />;
// }

// // // src/components/BlogPostContent.tsx (Refactored)
// // import Link from "next/link";
// // import { Comments } from "@/components/Comments";
// // import { AuthorInfo } from "./blog/AuthorInfo";
// // import { CoverImage } from "./blog/CoverImage";
// // import { MarkdownRenderer } from "./blog/MarkdownRenderer";
// // import { EngagementBar } from "./blog/EngagementBar";

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
// // 	return (
// // 		<div className='max-w-page mx-auto px-4'>
// // 			<div className='flex justify-between items-center mb-8'>
// // 				<Link
// // 					href='/blog'
// // 					className='text-primary-400 hover:text-primary-300'
// // 				>
// // 					← Back to posts
// // 				</Link>
// // 			</div>

// // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // 				<article className='relative'>
// // 					<CoverImage
// // 						src={post.cover_image}
// // 						alt={post.title}
// // 					/>

// // 					<AuthorInfo date={post.created_at} />

// // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}
// // 						<MarkdownRenderer content={post.content} />
// // 					</div>

// // 					<EngagementBar postId={post.id} />
// // 				</article>

// // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // 					<Comments postId={post.id} />
// // 				</div>
// // 			</div>
// // 		</div>
// // 	);
// // }
