// components/BlogPostContent.tsx
import dynamic from "next/dynamic";
import { MarkdownRenderer } from "./blog/MarkdownRenderer";
import type { Post } from "@/types/blog";

export default function BlogPostContent({ post }: { post: Post }) {
	const { title, category, cover_image, excerpt, created_at } = post;

	return (
		<div className='max-w-page mx-auto px-4'>
			{/* Common header section */}
			<header>
				<h1>{title}</h1>
				<div className='meta'>{/* ... meta info ... */}</div>
			</header>

			{/* Conditional content rendering */}
			{post.type === "markdown" ? (
				<MarkdownRenderer content={post.content} />
			) : (
				<DynamicComponentRenderer
					componentName={post.component_name}
					props={post.props}
				/>
			)}
		</div>
	);
}

// Component renderer with dynamic imports
function DynamicComponentRenderer({ componentName, props = {} }: { componentName: string; props?: Record<string, unknown> }) {
	const Component = dynamic(() => import(`@/components/blog-components/${componentName}`), {
		loading: () => <div>Loading component...</div>,
	});

	return <Component {...props} />;
}

// // src/components/BlogPostContent.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import ReactMarkdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import rehypePrism from "rehype-prism-plus";
// import { Reactions } from "@/components/Reactions";
// import { Comments } from "@/components/Comments";
// import { useAuth } from "@/hooks/useAuth";
// import { DeletePost } from "./DeletePost";
// // import 'highlight.js/styles/github-dark.css';
// // import 'highlight.js/styles/monokai-sublime.css'
// // import 'highlight.js/styles/tokyo-night-dark.css'
// import "highlight.js/styles/base16/material-darker.css";
// import rehypeRaw from "rehype-raw";
// import rehypeSanitize from "rehype-sanitize";
// import remarkGfm from "remark-gfm";
// // import 'highlight.js/styles/base16/tomorrow-night.css'

// /*-= Restrict which HTML tags & attributes are allowed =-*/
// const ALLOWED_TAGS = ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "blockquote", "hr", "br", "a", "img"];

// const ALLOWED_ATTRIBUTES = {
// 	a: ["href", "title", "target", "rel"],
// 	img: ["src", "alt", "title", "width", "height", "loading"],
// 	div: ["class", "style"],
// 	span: ["class", "style"],
// 	code: ["class", "language"],
// };

// type Post = {
// 	id: string;
// 	title: string;
// 	content: string;
// 	excerpt?: string;
// 	cover_image?: string;
// 	created_at: string;
// 	slug: string;
// 	profiles?: {
// 		username?: string;
// 	};
// };

// export default function BlogPostContent({ post }: { post: Post }) {
// 	const { isAuthenticated } = useAuth();

// 	const formatDate = (date: string) => {
// 		return new Date(date).toLocaleDateString("en-US", {
// 			month: "long",
// 			day: "numeric",
// 			year: "numeric",
// 		});
// 	};

// 	return (
// 		// <div className='max-w-screen-2xl mx-auto px-4'>
// 		<div className='max-w-page mx-auto px-4'>
// 			{/* Header Section */}
// 			<div className='flex justify-between items-center mb-8'>
// 				<Link
// 					href='/blog'
// 					className='text-primary-400 hover:text-primary-300'
// 				>
// 					← Back to posts
// 				</Link>
// 				{/* {isAuthenticated && (
// 					<div className='space-x-4'>
// 						<Link
// 							href={`/blog/edit/${post.slug}`}
// 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// 						>
// 							Edit Post
// 						</Link>
// 						<DeletePost postId={post.id} />
// 					</div>
// 				)} */}
// 			</div>

// 			{/* Main Content Grid */}
// 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// 				{/* Left Column - Article Content */}
// 				<article className='relative'>
// 					{post.cover_image && (
// 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// 							<Image
// 								src={post.cover_image}
// 								alt='Cover image'
// 								fill
// 								className='object-cover'
// 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// 								priority
// 							/>
// 						</div>
// 					)}

// 					{/* Content */}
// 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

// 						{/* Author Info */}
// 						<div className='flex items-start gap-4 mb-8'>
// 							<Image
// 								src='/assets/LittleLloyd-FB.jpg'
// 								alt='R.Lloyd Gonzales'
// 								width={56}
// 								height={56}
// 								className='border border-gray-500 rounded-full'
// 							/>
// 							<div>
// 								<h3 className='text-lg font-semibold text-gray-600 dark:text-gray-400 mb-0'>Lloyd</h3>
// 								<p className='text-gray-600 dark:text-gray-400 text-sm mb-0 m-0'>Software Engineer</p>
// 								<time className='text-gray-500 dark:text-gray-500 text-sm mt-0'>{formatDate(post.created_at)}</time>
// 							</div>
// 						</div>

// 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// 						<ReactMarkdown
// 							remarkPlugins={[remarkGfm]}
// 							rehypePlugins={[
// 								rehypePrism,
// 								rehypeRaw,
// 								[
// 									rehypeSanitize,
// 									{
// 										allowedTags: ALLOWED_TAGS,
// 										allowedAttributes: ALLOWED_ATTRIBUTES,
// 									},
// 								],
// 							]}
// 							components={{
// 								// p: ({ children }) => <p className='text-gray-600 mb-4'>{children}</p>,
// 								p: ({ node, children }) => {
// 									if (node?.children[0]?.type === "element" && node.children[0].tagName === "img") {
// 										return <div>{children}</div>;
// 									}
// 									return <p>{children}</p>;
// 								},
// 								h1: ({ children }) => <h1 className='text-4xl font-bold mb-6'>{children}</h1>,
// 								h2: ({ children }) => <h2 className='text-3xl font-bold mb-4'>{children}</h2>,
// 								h3: ({ children }) => <h3 className='text-2xl font-bold mb-3'>{children}</h3>,
// 								h4: ({ children }) => <h4 className='text-xl font-bold mb-2'>{children}</h4>,

// 								ul: ({ children }) => <ul className='list-disc pl-6 mb-4 text-gray-600'>{children}</ul>,
// 								ol: ({ children }) => <ol className='list-decimal pl-6 mb-4 text-gray-600'>{children}</ol>,
// 								blockquote: ({ children }) => <blockquote className='border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400'>{children}</blockquote>,
// 								img: ({ src, alt, ...props }) => {
// 									if (!src) return null;
// 									const imageSrc = src.startsWith("/") ? src : src.startsWith("http") ? src : `/${src}`;

// 									return (
// 										<div className='relative w-full aspect-[16/9] my-8'>
// 											<Image
// 												src={imageSrc}
// 												alt={alt || ""}
// 												fill
// 												className='object-cover rounded-lg'
// 												sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// 												loading='lazy'
// 												{...props}
// 											/>
// 										</div>
// 									);
// 								},
// 								a: ({ href, children, ...props }) => {
// 									if (!href) return null;
// 									const isExternal = href.startsWith("http");
// 									return (
// 										<a
// 											href={href}
// 											{...props}
// 											{...(isExternal
// 												? {
// 														target: "_blank",
// 														rel: "noopener noreferrer",
// 												  }
// 												: {})}
// 											className='text-primary-400 hover:text-primary-300 transition-colors'
// 										>
// 											{children}
// 										</a>
// 									);
// 								},
// 								code: ({ node, inline, className, children, ...props }) => {
// 									const match = /language-(\w+)/.exec(className || "");
// 									return !inline && match ? (
// 										<pre className={`language-${match[1]} overflow-x-auto`}>
// 											<code
// 												className={className}
// 												{...props}
// 											>
// 												{children}
// 											</code>
// 										</pre>
// 									) : (
// 										<code
// 											className={className}
// 											{...props}
// 										>
// 											{children}
// 										</code>
// 									);
// 								},
// 								/*---+++++++++++++++++++++++++++++++++++++++++++++++++++++---*/
// 							}}
// 						>
// 							{post.content}
// 						</ReactMarkdown>
// 					</div>

// 					{/* Engagement Bar */}
// 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// 						<Reactions postId={post.id} />
// 					</div>
// 				</article>

// 				{/* Right Column - Comments */}
// 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// 					<Comments postId={post.id} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
// // // src/components/BlogPostContent.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import ReactMarkdown from "react-markdown";
// // import { Reactions } from "@/components/Reactions";
// // import { Comments } from "@/components/Comments";
// // import { useAuth } from "@/hooks/useAuth";
// // import { DeletePost } from "./DeletePost";
// // import Prism from "prismjs";
// // import "prismjs/themes/prism-tomorrow.css";
// // import "prismjs/components/prism-javascript";
// // import "prismjs/components/prism-typescript";
// // import "prismjs/components/prism-css";
// // import "prismjs/components/prism-python";

// // type Post = {
// //     id: string;
// //     title: string;
// //     content: string;
// //     excerpt?: string;
// //     cover_image?: string;
// //     created_at: string;
// //     slug: string;
// //     profiles?: {
// //         username?: string;
// //     };
// // };

// // export default function BlogPostContent({ post }: { post: Post }) {
// //     const { isAuthenticated } = useAuth();

// //     useEffect(() => {
// //         Prism.highlightAll();
// //     }, [post.content]);

// //     return (
// //         <div className='max-w-screen-2xl mx-auto px-4'>
// //             <div className='flex justify-between items-center mb-8'>
// //                 <Link href='/blog' className='text-primary-400 hover:text-primary-300'>
// //                     ← Back to posts
// //                 </Link>
// //                 {isAuthenticated && (
// //                     <div className='space-x-4'>
// //                         <Link href={`/blog/edit/${post.slug}`} className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'>
// //                             Edit Post
// //                         </Link>
// //                         <DeletePost postId={post.id} />
// //                     </div>
// //                 )}
// //             </div>

// //             <div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// //                 <article className='relative'>
// //                     {post.cover_image && (
// //                         <div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// //                             <img src={post.cover_image} alt={post.title} className='w-full h-full object-cover' />
// //                         </div>
// //                     )}

// //                     <div className='prose prose-lg dark:prose-invert max-w-none'>
// //                         <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// //                         <div className='text-gray-400 mb-8'>
// //                             {new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// //                         </div>

// //                         {post.excerpt &&
// //                             <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>
// //                                 {post.excerpt}
// //                             </p>
// //                         }

// //                         <ReactMarkdown
// //                             components={{
// //                                 code({node, inline, className, children, ...props}) {
// //                                     const match = /language-(\w+)/.exec(className || '');
// //                                     const language = match ? match[1] : '';

// //                                     if (!inline && language) {
// //                                         return (
// //                                             <pre className={`language-${language}`}>
// //                                                 <code className={`language-${language}`} {...props}>
// //                                                     {String(children).replace(/\n$/, '')}
// //                                                 </code>
// //                                             </pre>
// //                                         );
// //                                     }

// //                                     return (
// //                                         <code className={className} {...props}>
// //                                             {children}
// //                                         </code>
// //                                     );
// //                                 },
// //                                 p: ({children}) => <p className="text-gray-300 mb-4">{children}</p>,
// //                                 h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
// //                                 h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
// //                                 ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
// //                                 ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
// //                                 blockquote: ({children}) => (
// //                                     <blockquote className="border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400">
// //                                         {children}
// //                                     </blockquote>
// //                                 ),
// //                             }}
// //                         >
// //                             {post.content}
// //                         </ReactMarkdown>
// //                     </div>

// //                     <div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// //                         <Reactions postId={post.id} />
// //                     </div>
// //                 </article>

// //                 <div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// //                     <Comments postId={post.id} />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// // // // src/components/BlogPostContent.tsx
// // // "use client";
// // // import { useState } from "react";
// // // import Link from "next/link";
// // // import ReactMarkdown from "react-markdown";
// // // import { Reactions } from "@/components/Reactions";
// // // import { Comments } from "@/components/Comments";
// // // import { useAuth } from "@/hooks/useAuth";
// // // import { DeletePost } from "./DeletePost";

// // // type Post = {
// // //     id: string;
// // //     title: string;
// // //     content: string;
// // //     excerpt?: string;
// // //     cover_image?: string;
// // //     created_at: string;
// // //     slug: string;
// // //     profiles?: {
// // //         username?: string;
// // //     };
// // // };

// // // export default function BlogPostContent({ post }: { post: Post }) {
// // //     const { isAuthenticated } = useAuth();

// // //     return (
// // //         <div className='max-w-screen-2xl mx-auto px-4'>
// // //             <div className='flex justify-between items-center mb-8'>
// // //                 <Link href='/blog' className='text-primary-400 hover:text-primary-300'>
// // //                     ← Back to posts
// // //                 </Link>
// // //                 {isAuthenticated && (
// // //                     <div className='space-x-4'>
// // //                         <Link href={`/blog/edit/${post.slug}`} className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'>
// // //                             Edit Post
// // //                         </Link>
// // //                         <DeletePost postId={post.id} />
// // //                     </div>
// // //                 )}
// // //             </div>

// // //             <div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // //                 <article className='relative'>
// // //                     {post.cover_image && (
// // //                         <div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // //                             <img src={post.cover_image} alt={post.title} className='w-full h-full object-cover' />
// // //                         </div>
// // //                     )}

// // //                     <div className='prose prose-lg dark:prose-invert max-w-none'>
// // //                         <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // //                         <div className='text-gray-400 mb-8'>
// // //                             {new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // //                         </div>

// // //                         {post.excerpt &&
// // //                             <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>
// // //                                 {post.excerpt}
// // //                             </p>
// // //                         }

// // //                         <ReactMarkdown
// // //                             components={{
// // //                                 code({node, inline, className, children, ...props}) {
// // //                                     return (
// // //                                         <code className="block bg-gray-800 rounded-md p-4 text-gray-100 my-4" {...props}>
// // //                                             {children}
// // //                                         </code>
// // //                                     );
// // //                                 },
// // //                                 p: ({children}) => <p className="text-gray-300 mb-4">{children}</p>,
// // //                                 h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
// // //                                 h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
// // //                                 ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
// // //                                 ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
// // //                                 blockquote: ({children}) => (
// // //                                     <blockquote className="border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400">
// // //                                         {children}
// // //                                     </blockquote>
// // //                                 ),
// // //                             }}
// // //                         >
// // //                             {post.content}
// // //                         </ReactMarkdown>
// // //                     </div>

// // //                     <div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // //                         <Reactions postId={post.id} />
// // //                     </div>
// // //                 </article>

// // //                 <div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // //                     <Comments postId={post.id} />
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // // // src/components/BlogPostContent.tsx
// // // // "use client";
// // // // import ReactMarkdown from "react-markdown";
// // // // import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// // // // import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// // // // type Post = {
// // // // 	id: string;
// // // // 	title: string;
// // // // 	content: string;
// // // // 	excerpt?: string;
// // // // 	cover_image?: string;
// // // // 	created_at: string;
// // // // 	slug: string;
// // // // 	profiles?: {
// // // // 		username?: string;
// // // // 	};
// // // // };

// // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // 	return (
// // // // 		<div className='max-w-4xl mx-auto p-4'>
// // // // 			<h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
// // // // 			<ReactMarkdown
// // // // 				components={{
// // // // 					code({ node, inline, className, children, ...props }) {
// // // // 						const match = /language-(\w+)/.exec(className || "");
// // // // 						return !inline && match ? (
// // // // 							<SyntaxHighlighter
// // // // 								style={atomDark}
// // // // 								language={match[1]}
// // // // 								PreTag='div'
// // // // 								{...props}
// // // // 							>
// // // // 								{String(children).replace(/\n$/, "")}
// // // // 							</SyntaxHighlighter>
// // // // 						) : (
// // // // 							<code
// // // // 								className={className}
// // // // 								{...props}
// // // // 							>
// // // // 								{children}
// // // // 							</code>
// // // // 						);
// // // // 					},
// // // // 				}}
// // // // 			>
// // // // 				{post.content}
// // // // 			</ReactMarkdown>
// // // // 		</div>
// // // // 	);
// // // // }
// // // // // // src/components/BlogPostContent.tsx
// // // // // "use client";
// // // // // import ReactMarkdown from "react-markdown";

// // // // // type Post = {
// // // // // 	id: string;
// // // // // 	title: string;
// // // // // 	content: string;
// // // // // 	excerpt?: string;
// // // // // 	cover_image?: string;
// // // // // 	created_at: string;
// // // // // 	slug: string;
// // // // // 	profiles?: {
// // // // // 		username?: string;
// // // // // 	};
// // // // // };

// // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // 	// Debug: Log the content to verify what we're receiving
// // // // // 	console.log("Content being passed to ReactMarkdown:", post.content);

// // // // // 	return (
// // // // // 		<div className='max-w-4xl mx-auto p-4'>
// // // // // 			<h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
// // // // // 			<ReactMarkdown>{post.content}</ReactMarkdown>
// // // // // 		</div>
// // // // // 	);
// // // // // }
// // // // // // // src/components/BlogPostContent.tsx
// // // // // // "use client";
// // // // // // import { useState } from "react";
// // // // // // import Link from "next/link";
// // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // import { Comments } from "@/components/Comments";
// // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // import { DeletePost } from "./DeletePost";
// // // // // // import ReactMarkdown from "react-markdown";
// // // // // // import remarkGfm from "remark-gfm";

// // // // // // type Post = {
// // // // // // 	id: string;
// // // // // // 	title: string;
// // // // // // 	content: string;
// // // // // // 	excerpt?: string;
// // // // // // 	cover_image?: string;
// // // // // // 	created_at: string;
// // // // // // 	slug: string;
// // // // // // 	profiles?: {
// // // // // // 		username?: string;
// // // // // // 	};
// // // // // // };

// // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // 	return (
// // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // 			{/* Header Section */}
// // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // 				<Link
// // // // // // 					href='/blog'
// // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // 				>
// // // // // // 					← Back to posts
// // // // // // 				</Link>
// // // // // // 				{isAuthenticated && (
// // // // // // 					<div className='space-x-4'>
// // // // // // 						<Link
// // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // 						>
// // // // // // 							Edit Post
// // // // // // 						</Link>
// // // // // // 						<DeletePost postId={post.id} />
// // // // // // 					</div>
// // // // // // 				)}
// // // // // // 			</div>

// // // // // // 			{/* Main Content Grid */}
// // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // 				{/* Left Column - Article Content */}
// // // // // // 				<article className='relative'>
// // // // // // 					{post.cover_image && (
// // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // 							<img
// // // // // // 								src={post.cover_image}
// // // // // // 								alt={post.title}
// // // // // // 								className='w-full h-full object-cover'
// // // // // // 							/>
// // // // // // 						</div>
// // // // // // 					)}

// // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // 						</div>

// // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // 						<div className='mt-8'>
// // // // // // 							<ReactMarkdown
// // // // // // 								remarkPlugins={[remarkGfm]}
// // // // // // 								className='prose dark:prose-invert'
// // // // // // 							>
// // // // // // 								{post.content}
// // // // // // 							</ReactMarkdown>
// // // // // // 						</div>
// // // // // // 					</div>

// // // // // // 					{/* Engagement Bar */}
// // // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // 						<Reactions postId={post.id} />
// // // // // // 					</div>
// // // // // // 				</article>

// // // // // // 				{/* Right Column - Comments */}
// // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // 					<Comments postId={post.id} />
// // // // // // 				</div>
// // // // // // 			</div>
// // // // // // 		</div>
// // // // // // 	);
// // // // // // }
// // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // "use client";
// // // // // // // import { useState } from "react";
// // // // // // // import Link from "next/link";
// // // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // import { DeletePost } from "./DeletePost";

// // // // // // // type Post = {
// // // // // // // 	id: string;
// // // // // // // 	title: string;
// // // // // // // 	content: string;
// // // // // // // 	excerpt?: string;
// // // // // // // 	cover_image?: string;
// // // // // // // 	created_at: string;
// // // // // // // 	slug: string;
// // // // // // // 	profiles?: {
// // // // // // // 		username?: string;
// // // // // // // 	};
// // // // // // // };

// // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // // 	return (
// // // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // 			{/* Header Section */}
// // // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // // 				<Link
// // // // // // // 					href='/blog'
// // // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // // 				>
// // // // // // // 					← Back to posts
// // // // // // // 				</Link>
// // // // // // // 				{isAuthenticated && (
// // // // // // // 					<div className='space-x-4'>
// // // // // // // 						<Link
// // // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // // 						>
// // // // // // // 							Edit Post
// // // // // // // 						</Link>
// // // // // // // 						<DeletePost postId={post.id} />
// // // // // // // 					</div>
// // // // // // // 				)}
// // // // // // // 			</div>

// // // // // // // 			{/* Main Content Grid */}
// // // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // 				{/* Left Column - Article Content */}
// // // // // // // 				<article className='relative'>
// // // // // // // 					{post.cover_image && (
// // // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // 							<img
// // // // // // // 								src={post.cover_image}
// // // // // // // 								alt={post.title}
// // // // // // // 								className='w-full h-full object-cover'
// // // // // // // 							/>
// // // // // // // 						</div>
// // // // // // // 					)}
// // // // // // // 					{/* Content */}
// // // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // 						<h1 className='postTitle text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // 						</div>

// // // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // // 						<div className='mt-8 content'>
// // // // // // // 							<img
// // // // // // // 								src={post.content.match(/!\[.*?\]\((.*?)\)/)?.[1]}
// // // // // // // 								alt={post.content.match(/!\[(.*?)\]/)?.[1] || ""}
// // // // // // // 								className='w-full h-auto rounded-lg my-4'
// // // // // // // 							/>
// // // // // // // 							{post.content.replace(/!\[.*?\]\(.*?\)/g, "")}
// // // // // // // 						</div>
// // // // // // // 					</div>

// // // // // // // 					{/* Engagement Bar */}
// // // // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // 						<Reactions postId={post.id} />
// // // // // // // 					</div>
// // // // // // // 				</article>

// // // // // // // 				{/* Right Column - Comments */}
// // // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // 					<Comments postId={post.id} />
// // // // // // // 				</div>
// // // // // // // 			</div>
// // // // // // // 		</div>
// // // // // // // 	);
// // // // // // // }

// // // // // // // // "use client";
// // // // // // // // import { useState } from "react";
// // // // // // // // import Link from "next/link";
// // // // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // // import { DeletePost } from "./DeletePost";

// // // // // // // // type Post = {
// // // // // // // // 	id: string;
// // // // // // // // 	title: string;
// // // // // // // // 	content: string;
// // // // // // // // 	excerpt?: string;
// // // // // // // // 	cover_image?: string;
// // // // // // // // 	created_at: string;
// // // // // // // // 	slug: string;
// // // // // // // // 	profiles?: {
// // // // // // // // 		username?: string;
// // // // // // // // 	};
// // // // // // // // };

// // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // // // 	return (
// // // // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // // 			{/* Header Section */}
// // // // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // // // 				<Link
// // // // // // // // 					href='/blog'
// // // // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // // // 				>
// // // // // // // // 					← Back to posts
// // // // // // // // 				</Link>
// // // // // // // // 				{isAuthenticated && (
// // // // // // // // 					<div className='space-x-4'>
// // // // // // // // 						<Link
// // // // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // // // 						>
// // // // // // // // 							Edit Post
// // // // // // // // 						</Link>
// // // // // // // // 						<DeletePost postId={post.id} />
// // // // // // // // 					</div>
// // // // // // // // 				)}
// // // // // // // // 			</div>

// // // // // // // // 			{/* Main Content Grid */}
// // // // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // // 				{/* Left Column - Article Content */}
// // // // // // // // 				<article className='relative'>
// // // // // // // // 					{post.cover_image && (
// // // // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // // 							<ImageWithFallback
// // // // // // // // 								src={post.cover_image}
// // // // // // // // 								alt={post.title}
// // // // // // // // 								className='w-full h-full object-cover'
// // // // // // // // 								priority
// // // // // // // // 							/>
// // // // // // // // 						</div>
// // // // // // // // 					)}
// // // // // // // // 					{/* Content */}
// // // // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // // 						</div>

// // // // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // // // 						<div className='mt-8'>{post.content}</div>

// // // // // // // // 						{/* Engagement Bar */}
// // // // // // // // 						<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // // 							<Reactions postId={post.id} />
// // // // // // // // 						</div>
// // // // // // // // 					</div>
// // // // // // // // 				</article>

// // // // // // // // 				{/* Right Column - Comments */}
// // // // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // // 					<Comments postId={post.id} />
// // // // // // // // 				</div>
// // // // // // // // 			</div>
// // // // // // // // 		</div>
// // // // // // // // 	);
// // // // // // // // }
// // // src/components/BlogPostContent.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { Reactions } from "@/components/Reactions";
// // import { Comments } from "@/components/Comments";
// // import ReactMarkdown from "react-markdown";
// // import remarkGfm from "remark-gfm";
// // import { MarkdownContent } from "./MarkdownContent";

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
// // 	const formatDate = (date: string) => {
// // 		return new Date(date).toLocaleDateString("en-US", {
// // 			month: "long",
// // 			day: "numeric",
// // 			year: "numeric",
// // 		});
// // 	};

// // 	return (
// // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // 			{/* Header Section */}
// // 			<div className='flex justify-between items-center mb-8'>
// // 				<Link
// // 					href='/blog'
// // 					className='text-primary-400 hover:text-primary-300'
// // 				>
// // 					← Back to posts
// // 				</Link>
// // 			</div>

// // 			{/* Main Content Grid */}
// // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // 				{/* Left Column - Article Content */}
// // 				<article className='relative'>
// // 					{post.cover_image && (
// // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // 							<Image
// // 								src={post.cover_image}
// // 								alt='Cover image'
// // 								fill
// // 								className='object-cover'
// // 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // 								priority
// // 							/>
// // 						</div>
// // 					)}

// // 					{/* Author Info */}
// // 					<div className='flex items-start gap-4 mb-8'>
// // 						<Image
// // 							src='/assets/MashMediaStudio.png'
// // 							alt='R.Lloyd Gonzales'
// // 							width={56}
// // 							height={56}
// // 							className='rounded-full'
// // 							priority
// // 						/>
// // 						<div>
// // 							<h3 className='text-lg font-semibold mb-1'>R.Lloyd Gonzales</h3>
// // 							<p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Software Engineer</p>
// // 							<time className='text-gray-500 dark:text-gray-500 text-sm'>{formatDate(post.created_at)}</time>
// // 						</div>
// // 					</div>

// // 					{/* Content */}
// // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

// // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // 						<div className='mt-8'>
// // 							<MarkdownContent content={post.content} />
// // 						</div>
// // 					</div>

// // 					{/* Engagement Bar */}
// // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // 						<Reactions postId={post.id} />
// // 					</div>
// // 				</article>

// // 				{/* Right Column - Comments */}
// // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // 					<Comments postId={post.id} />
// // 				</div>
// // 			</div>
// // 		</div>
// // 	);
// // }
// // // "use client";
// // // // import { useState } from "react"
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { Reactions } from "@/components/Reactions";
// // // import { Comments } from "@/components/Comments";
// // // import ReactMarkdown from "react-markdown";
// // // import remarkGfm from "remark-gfm";
// // // import rehypePrism from "rehype-prism-plus";
// // // import "prismjs/themes/prism-tomorrow.css";
// // // import "prismjs/components/prism-typescript";
// // // import "prismjs/components/prism-javascript";
// // // import "prismjs/components/prism-css";
// // // import "prismjs/components/prism-bash";
// // // import "prismjs/components/prism-json";
// // // import "prismjs/components/prism-markdown";

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

// // // export default function BlogPostContent({ post }: { post: Post }) {
// // // 	const formatDate = (date: string) => {
// // // 		return new Date(date).toLocaleDateString("en-US", {
// // // 			month: "long",
// // // 			day: "numeric",
// // // 			year: "numeric",
// // // 		});
// // // 	};

// // // 	return (
// // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // 			{/* Header Section */}
// // // 			<div className='flex justify-between items-center mb-8'>
// // // 				<Link
// // // 					href='/blog'
// // // 					className='text-primary-400 hover:text-primary-300'
// // // 				>
// // // 					← Back to posts
// // // 				</Link>
// // // 			</div>

// // // 			{/* Main Content Grid */}
// // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // 				{/* Left Column - Article Content */}
// // // 				<article className='relative'>
// // // 					{post.cover_image && (
// // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // 							<Image
// // // 								src={post.cover_image}
// // // 								alt='Cover image'
// // // 								fill
// // // 								className='object-cover'
// // // 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // 								priority
// // // 							/>
// // // 						</div>
// // // 					)}

// // // 					{/* Author Info */}
// // // 					<div className='flex items-start gap-4 mb-8'>
// // // 						<Image
// // // 							src='/assets/MashMediaStudio.png'
// // // 							alt='R.Lloyd Gonzales'
// // // 							width={56}
// // // 							height={56}
// // // 							className='rounded-full'
// // // 							priority
// // // 						/>
// // // 						<div>
// // // 							<h3 className='text-lg font-semibold mb-1'>R.Lloyd Gonzales</h3>
// // // 							<p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Software Engineer</p>
// // // 							<time className='text-gray-500 dark:text-gray-500 text-sm'>{formatDate(post.created_at)}</time>
// // // 						</div>
// // // 					</div>

// // // 					{/* Content */}
// // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

// // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // 						<div className='mt-8'>
// // // 							<ReactMarkdown
// // // 								remarkPlugins={[remarkGfm]}
// // // 								rehypePlugins={[rehypePrism]}
// // // 								components={{
// // // 									p: ({ children }) => {
// // // 										if (typeof children === "object" && children && "type" in children && children.type === "img") {
// // // 											return <>{children}</>;
// // // 										}
// // // 										return <p>{children}</p>;
// // // 									},
// // // 									img: ({ src, alt }) => {
// // // 										if (!src) return null;
// // // 										return (
// // // 											<div className='relative w-full aspect-video mb-4'>
// // // 												<Image
// // // 													src={src}
// // // 													alt={alt || ""}
// // // 													fill
// // // 													className='rounded-lg object-cover'
// // // 													sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // 												/>
// // // 											</div>
// // // 										);
// // // 									},
// // // 								}}
// // // 							>
// // // 								{post.content}
// // // 							</ReactMarkdown>
// // // 						</div>
// // // 					</div>

// // // 					{/* Engagement Bar */}
// // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // 						<Reactions postId={post.id} />
// // // 					</div>
// // // 				</article>

// // // 				{/* Right Column - Comments */}
// // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // 					<Comments postId={post.id} />
// // // 				</div>
// // // 			</div>
// // // 		</div>
// // // 	);
// // // }
// // // // "use client";
// // // // // import { useState } from "react";
// // // // import Link from "next/link";
// // // // import Image from "next/image";
// // // // import { Reactions } from "@/components/Reactions";
// // // // import { Comments } from "@/components/Comments";
// // // // import ReactMarkdown from "react-markdown";
// // // // import remarkGfm from "remark-gfm";

// // // // import rehypePrism from "rehype-prism-plus";
// // // // import rehypeHighlight from "rehype-highlight";

// // // // import "prismjs/themes/prism-tomorrow.css";

// // // // type Post = {
// // // // 	id: string;
// // // // 	title: string;
// // // // 	content: string;
// // // // 	excerpt?: string;
// // // // 	cover_image?: string;
// // // // 	created_at: string;
// // // // 	slug: string;
// // // // 	profiles?: {
// // // // 		username?: string;
// // // // 	};
// // // // };

// // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // 	const formatDate = (date: string) => {
// // // // 		return new Date(date).toLocaleDateString("en-US", {
// // // // 			month: "long",
// // // // 			day: "numeric",
// // // // 			year: "numeric",
// // // // 		});
// // // // 	};

// // // // 	return (
// // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // 			{/* Header Section */}
// // // // 			<div className='flex justify-between items-center mb-8'>
// // // // 				<Link
// // // // 					href='/blog'
// // // // 					className='text-primary-400 hover:text-primary-300'
// // // // 				>
// // // // 					← Back to posts
// // // // 				</Link>
// // // // 			</div>

// // // // 			{/* Main Content Grid */}
// // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // 				{/* Left Column - Article Content */}
// // // // 				<article className='relative'>
// // // // 					{post.cover_image && (
// // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // 							<Image
// // // // 								src={post.cover_image}
// // // // 								alt='Cover image'
// // // // 								fill
// // // // 								className='object-cover'
// // // // 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // // 								priority
// // // // 							/>
// // // // 						</div>
// // // // 					)}

// // // // 					{/* Author Info */}
// // // // 					<div className='flex items-start gap-4 mb-8'>
// // // // 						<Image
// // // // 							src='/assets/MashMediaStudio.png'
// // // // 							alt='R.Lloyd Gonzales'
// // // // 							width={56}
// // // // 							height={56}
// // // // 							className='rounded-full'
// // // // 							priority
// // // // 						/>
// // // // 						<div>
// // // // 							<h3 className='text-lg font-semibold mb-1'>R.Lloyd Gonzales</h3>
// // // // 							<p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Software Engineer</p>
// // // // 							<time className='text-gray-500 dark:text-gray-500 text-sm'>{formatDate(post.created_at)}</time>
// // // // 						</div>
// // // // 					</div>

// // // // 					{/* Content */}
// // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

// // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // 						<div className='mt-8'>
// // // // 							<ReactMarkdown
// // // // 								remarkPlugins={[remarkGfm]}
// // // // 								rehypePlugins={[rehypeHighlight]}
// // // // 								components={{
// // // // 									p: ({ children }) => <p className='text-gray-300 mb-4'>{children}</p>,
// // // // 									h2: ({ children }) => <h2 className='text-2xl font-bold mt-8 mb-4'>{children}</h2>,
// // // // 									h3: ({ children }) => <h3 className='text-xl font-bold mt-6 mb-3'>{children}</h3>,
// // // // 									ul: ({ children }) => <ul className='list-disc pl-6 mb-4 text-gray-300'>{children}</ul>,
// // // // 									ol: ({ children }) => <ol className='list-decimal pl-6 mb-4 text-gray-300'>{children}</ol>,
// // // // 									blockquote: ({ children }) => <blockquote className='border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400'>{children}</blockquote>,
// // // // 									img: ({ src, alt, ...props }) => {
// // // // 										if (!src) return null;
// // // // 										return (
// // // // 											<div className='relative w-full aspect-video mb-4'>
// // // // 												<Image
// // // // 													src={src}
// // // // 													alt={alt || ""}
// // // // 													fill
// // // // 													className='rounded-lg object-cover'
// // // // 													sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // // 												/>
// // // // 											</div>
// // // // 										);
// // // // 									},
// // // // 									code: ({ inline, className, children, ...props }) => {
// // // // 										const match = /language-(\w+)/.exec(className || "");
// // // // 										const language = match ? match[1] : "";

// // // // 										if (!inline && language) {
// // // // 											return (
// // // // 												<pre className={`language-${language}`}>
// // // // 													<code
// // // // 														className={`language-${language}`}
// // // // 														{...props}
// // // // 													>
// // // // 														{String(children).replace(/\n$/, "")}
// // // // 													</code>
// // // // 												</pre>
// // // // 											);
// // // // 										}

// // // // 										return (
// // // // 											<code
// // // // 												className={className}
// // // // 												{...props}
// // // // 											>
// // // // 												{children}
// // // // 											</code>
// // // // 										);
// // // // 									},
// // // // 								}}
// // // // 							>
// // // // 								{post.content}
// // // // 							</ReactMarkdown>
// // // // 						</div>
// // // // 					</div>

// // // // 					{/* Engagement Bar */}
// // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // 						<Reactions postId={post.id} />
// // // // 					</div>
// // // // 				</article>

// // // // 				{/* Right Column - Comments */}
// // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // 					<Comments postId={post.id} />
// // // // 				</div>
// // // // 			</div>
// // // // 		</div>
// // // // 	);
// // // // }

// // // // // // src/components/BlogPostContent.tsx
// // // // // "use client";
// // // // // import Link from "next/link";
// // // // // import Image from "next/image";
// // // // // import { Reactions } from "@/components/Reactions";
// // // // // import { Comments } from "@/components/Comments";
// // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // import ReactMarkdown from "react-markdown";
// // // // // import remarkGfm from "remark-gfm";
// // // // // import rehypePrism from "rehype-prism-plus";
// // // // // // import Link from "next/link";
// // // // // // import Image from "next/image";
// // // // // // import ReactMarkdown from "react-markdown";
// // // // // import rehypeHighlight from "rehype-highlight";
// // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // import { Comments } from "@/components/Comments";
// // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // import { DeletePost } from "./DeletePost";
// // // // // // import 'highlight.js/styles/github-dark.css';
// // // // // // import 'highlight.js/styles/monokai-sublime.css'
// // // // // // import 'highlight.js/styles/tokyo-night-dark.css'
// // // // // import "highlight.js/styles/base16/material-darker.css";
// // // // // // import 'highlight.js/styles/base16/tomorrow-night.css'

// // // // // type Post = {
// // // // // 	id: string;
// // // // // 	title: string;
// // // // // 	content: string;
// // // // // 	excerpt?: string;
// // // // // 	cover_image?: string;
// // // // // 	created_at: string;
// // // // // 	slug: string;
// // // // // 	profiles?: {
// // // // // 		username?: string;
// // // // // 	};
// // // // // };

// // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // 	const { isAuthenticated } = useAuth();

// // // // // 	const formatDate = (date: string) => {
// // // // // 		return new Date(date).toLocaleDateString("en-US", {
// // // // // 			month: "long",
// // // // // 			day: "numeric",
// // // // // 			year: "numeric",
// // // // // 		});
// // // // // 	};

// // // // // 	return (
// // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // 			{/* Header Section */}
// // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // 				<Link
// // // // // 					href='/blog'
// // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // 				>
// // // // // 					← Back to posts
// // // // // 				</Link>
// // // // // 			</div>

// // // // // 			{/* Main Content Grid */}
// // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // 				{/* Left Column - Article Content */}
// // // // // 				<article className='relative'>
// // // // // 					{post.cover_image && (
// // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // 							<Image
// // // // // 								src={post.cover_image}
// // // // // 								alt='Cover image'
// // // // // 								fill
// // // // // 								className='object-cover'
// // // // // 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // // // 								priority
// // // // // 							/>
// // // // // 						</div>
// // // // // 					)}

// // // // // 					{/* Author Info */}
// // // // // 					<div className='flex items-start gap-4 mb-8'>
// // // // // 						<Image
// // // // // 							src='/assets/MashMediaStudio.png'
// // // // // 							alt='R.Lloyd Gonzales'
// // // // // 							width={56}
// // // // // 							height={56}
// // // // // 							className='rounded-full'
// // // // // 							priority
// // // // // 						/>
// // // // // 						<div>
// // // // // 							<h3 className='text-lg font-semibold mb-1'>R.Lloyd Gonzales</h3>
// // // // // 							<p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Software Engineer</p>
// // // // // 							<time className='text-gray-500 dark:text-gray-500 text-sm'>{formatDate(post.created_at)}</time>
// // // // // 						</div>
// // // // // 					</div>

// // // // // 					{/* Content */}
// // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

// // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // 						<div className='mt-8'>
// // // // // 							<ReactMarkdown
// // // // // 								remarkPlugins={[remarkGfm]}
// // // // // 								rehypePlugins={[rehypePrism]}
// // // // // 								components={{
// // // // // 									img: ({ node, src, alt, ...props }) => {
// // // // // 										if (!src) return null;
// // // // // 										return (
// // // // // 											<div className='relative w-full aspect-video mb-4'>
// // // // // 												<Image
// // // // // 													src={src}
// // // // // 													alt={alt || ""}
// // // // // 													fill
// // // // // 													className='rounded-lg object-cover'
// // // // // 													sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // // // 												/>
// // // // // 											</div>
// // // // // 										);
// // // // // 									},
// // // // // 									code: ({ node, inline, className, children, ...props }) => {
// // // // // 										const match = /language-(\w+)/.exec(className || "");
// // // // // 										const language = match ? match[1] : "";

// // // // // 										if (!inline && language) {
// // // // // 											return (
// // // // // 												<pre className={`language-${language}`}>
// // // // // 													<code
// // // // // 														className={`language-${language}`}
// // // // // 														{...props}
// // // // // 													>
// // // // // 														{String(children).replace(/\n$/, "")}
// // // // // 													</code>
// // // // // 												</pre>
// // // // // 											);
// // // // // 										}

// // // // // 										return (
// // // // // 											<code
// // // // // 												className={className}
// // // // // 												{...props}
// // // // // 											>
// // // // // 												{children}
// // // // // 											</code>
// // // // // 										);
// // // // // 									},
// // // // // 								}}
// // // // // 							>
// // // // // 								{post.content}
// // // // // 							</ReactMarkdown>
// // // // // 						</div>
// // // // // 					</div>

// // // // // 					{/* Engagement Bar */}
// // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // 						<Reactions postId={post.id} />
// // // // // 					</div>
// // // // // 				</article>

// // // // // 				{/* Right Column - Comments */}
// // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // 					<Comments postId={post.id} />
// // // // // 				</div>
// // // // // 			</div>
// // // // // 		</div>
// // // // // 	);
// // // // // }

// // // // // // // src/components/BlogPostContent.tsx
// // // // // // "use client";
// // // // // // import Link from "next/link";
// // // // // // import Image from "next/image";
// // // // // // import ReactMarkdown from "react-markdown";
// // // // // // import rehypeHighlight from "rehype-highlight";
// // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // import { Comments } from "@/components/Comments";
// // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // import { DeletePost } from "./DeletePost";
// // // // // // // import 'highlight.js/styles/github-dark.css';
// // // // // // // import 'highlight.js/styles/monokai-sublime.css'
// // // // // // // import 'highlight.js/styles/tokyo-night-dark.css'
// // // // // // import "highlight.js/styles/base16/material-darker.css";
// // // // // // // import 'highlight.js/styles/base16/tomorrow-night.css'

// // // // // // type Post = {
// // // // // // 	id: string;
// // // // // // 	title: string;
// // // // // // 	content: string;
// // // // // // 	excerpt?: string;
// // // // // // 	cover_image?: string;
// // // // // // 	created_at: string;
// // // // // // 	slug: string;
// // // // // // 	profiles?: {
// // // // // // 		username?: string;
// // // // // // 	};
// // // // // // };

// // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // 	return (
// // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // 				<Link
// // // // // // 					href='/blog'
// // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // 				>
// // // // // // 					← Back to posts
// // // // // // 				</Link>
// // // // // // 				{isAuthenticated && (
// // // // // // 					<div className='space-x-4'>
// // // // // // 						<Link
// // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // 						>
// // // // // // 							Edit Post
// // // // // // 						</Link>
// // // // // // 						<DeletePost postId={post.id} />
// // // // // // 					</div>
// // // // // // 				)}
// // // // // // 			</div>

// // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // 				<article className='relative'>
// // // // // // 					{post.cover_image && (
// // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // 							<Image
// // // // // // 								src={post.cover_image}
// // // // // // 								alt={post.title}
// // // // // // 								fill
// // // // // // 								className='object-cover'
// // // // // // 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
// // // // // // 								priority
// // // // // // 							/>
// // // // // // 							{/* <img
// // // // // // 								src={post.cover_image}
// // // // // // 								alt={post.title}
// // // // // // 								className='w-full h-full object-cover'
// // // // // // 							/> */}
// // // // // // 						</div>
// // // // // // 					)}

// // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // 						<div className='text-gray-400 mb-8 text-sm'>
// // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // 						</div>

// // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // 						<ReactMarkdown
// // // // // // 							rehypePlugins={[rehypeHighlight]}
// // // // // // 							components={{
// // // // // // 								p: ({ children }) => <p className='text-[1rem] text-gray-600 dark:text-gray-400 mb-4'>{children}</p>,
// // // // // // 								h2: ({ children }) => <h2 className='text-2xl font-bold mt-8 mb-4'>{children}</h2>,
// // // // // // 								h3: ({ children }) => <h3 className='text-xl font-bold mt-6 mb-3'>{children}</h3>,
// // // // // // 								ul: ({ children }) => <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-gray-400'>{children}</ul>,
// // // // // // 								ol: ({ children }) => <ol className='list-decimal pl-6 mb-4 text-gray-300'>{children}</ol>,
// // // // // // 								blockquote: ({ children }) => <blockquote className='border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400'>{children}</blockquote>,
// // // // // // 								img: ({ src, alt }) => (
// // // // // // 									<div className='relative aspect-[16/9] my-8'>
// // // // // // 										<Image
// // // // // // 											src={src || ""}
// // // // // // 											alt={alt || ""}
// // // // // // 											fill
// // // // // // 											className='object-cover rounded-lg'
// // // // // // 											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
// // // // // // 										/>
// // // // // // 									</div>
// // // // // // 								),
// // // // // // 							}}
// // // // // // 						>
// // // // // // 							{post.content}
// // // // // // 						</ReactMarkdown>
// // // // // // 					</div>

// // // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // 						<Reactions postId={post.id} />
// // // // // // 					</div>
// // // // // // 				</article>

// // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // 					<Comments postId={post.id} />
// // // // // // 				</div>
// // // // // // 			</div>
// // // // // // 		</div>
// // // // // // 	);
// // // // // // }
// // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // "use client";
// // // // // // // import { useState, useEffect } from "react";
// // // // // // // import Link from "next/link";
// // // // // // // import ReactMarkdown from "react-markdown";
// // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // import { DeletePost } from "./DeletePost";
// // // // // // // import Prism from "prismjs";
// // // // // // // import "prismjs/themes/prism-tomorrow.css";
// // // // // // // import "prismjs/components/prism-javascript";
// // // // // // // import "prismjs/components/prism-typescript";
// // // // // // // import "prismjs/components/prism-css";
// // // // // // // import "prismjs/components/prism-python";

// // // // // // // type Post = {
// // // // // // //     id: string;
// // // // // // //     title: string;
// // // // // // //     content: string;
// // // // // // //     excerpt?: string;
// // // // // // //     cover_image?: string;
// // // // // // //     created_at: string;
// // // // // // //     slug: string;
// // // // // // //     profiles?: {
// // // // // // //         username?: string;
// // // // // // //     };
// // // // // // // };

// // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // //     const { isAuthenticated } = useAuth();

// // // // // // //     useEffect(() => {
// // // // // // //         Prism.highlightAll();
// // // // // // //     }, [post.content]);

// // // // // // //     return (
// // // // // // //         <div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // //             <div className='flex justify-between items-center mb-8'>
// // // // // // //                 <Link href='/blog' className='text-primary-400 hover:text-primary-300'>
// // // // // // //                     ← Back to posts
// // // // // // //                 </Link>
// // // // // // //                 {isAuthenticated && (
// // // // // // //                     <div className='space-x-4'>
// // // // // // //                         <Link href={`/blog/edit/${post.slug}`} className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'>
// // // // // // //                             Edit Post
// // // // // // //                         </Link>
// // // // // // //                         <DeletePost postId={post.id} />
// // // // // // //                     </div>
// // // // // // //                 )}
// // // // // // //             </div>

// // // // // // //             <div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // //                 <article className='relative'>
// // // // // // //                     {post.cover_image && (
// // // // // // //                         <div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // //                             <img src={post.cover_image} alt={post.title} className='w-full h-full object-cover' />
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     <div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // //                         <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // //                         <div className='text-gray-400 mb-8'>
// // // // // // //                             {new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // //                         </div>

// // // // // // //                         {post.excerpt &&
// // // // // // //                             <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>
// // // // // // //                                 {post.excerpt}
// // // // // // //                             </p>
// // // // // // //                         }

// // // // // // //                         <ReactMarkdown
// // // // // // //                             components={{
// // // // // // //                                 code({node, inline, className, children, ...props}) {
// // // // // // //                                     const match = /language-(\w+)/.exec(className || '');
// // // // // // //                                     const language = match ? match[1] : '';

// // // // // // //                                     if (!inline && language) {
// // // // // // //                                         return (
// // // // // // //                                             <pre className={`language-${language}`}>
// // // // // // //                                                 <code className={`language-${language}`} {...props}>
// // // // // // //                                                     {String(children).replace(/\n$/, '')}
// // // // // // //                                                 </code>
// // // // // // //                                             </pre>
// // // // // // //                                         );
// // // // // // //                                     }

// // // // // // //                                     return (
// // // // // // //                                         <code className={className} {...props}>
// // // // // // //                                             {children}
// // // // // // //                                         </code>
// // // // // // //                                     );
// // // // // // //                                 },
// // // // // // //                                 p: ({children}) => <p className="text-gray-300 mb-4">{children}</p>,
// // // // // // //                                 h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
// // // // // // //                                 h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
// // // // // // //                                 ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
// // // // // // //                                 ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
// // // // // // //                                 blockquote: ({children}) => (
// // // // // // //                                     <blockquote className="border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400">
// // // // // // //                                         {children}
// // // // // // //                                     </blockquote>
// // // // // // //                                 ),
// // // // // // //                             }}
// // // // // // //                         >
// // // // // // //                             {post.content}
// // // // // // //                         </ReactMarkdown>
// // // // // // //                     </div>

// // // // // // //                     <div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // //                         <Reactions postId={post.id} />
// // // // // // //                     </div>
// // // // // // //                 </article>

// // // // // // //                 <div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // //                     <Comments postId={post.id} />
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }
// // // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // // "use client";
// // // // // // // // import { useState } from "react";
// // // // // // // // import Link from "next/link";
// // // // // // // // import ReactMarkdown from "react-markdown";
// // // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // // import { DeletePost } from "./DeletePost";

// // // // // // // // type Post = {
// // // // // // // //     id: string;
// // // // // // // //     title: string;
// // // // // // // //     content: string;
// // // // // // // //     excerpt?: string;
// // // // // // // //     cover_image?: string;
// // // // // // // //     created_at: string;
// // // // // // // //     slug: string;
// // // // // // // //     profiles?: {
// // // // // // // //         username?: string;
// // // // // // // //     };
// // // // // // // // };

// // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // //     const { isAuthenticated } = useAuth();

// // // // // // // //     return (
// // // // // // // //         <div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // //             <div className='flex justify-between items-center mb-8'>
// // // // // // // //                 <Link href='/blog' className='text-primary-400 hover:text-primary-300'>
// // // // // // // //                     ← Back to posts
// // // // // // // //                 </Link>
// // // // // // // //                 {isAuthenticated && (
// // // // // // // //                     <div className='space-x-4'>
// // // // // // // //                         <Link href={`/blog/edit/${post.slug}`} className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'>
// // // // // // // //                             Edit Post
// // // // // // // //                         </Link>
// // // // // // // //                         <DeletePost postId={post.id} />
// // // // // // // //                     </div>
// // // // // // // //                 )}
// // // // // // // //             </div>

// // // // // // // //             <div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // //                 <article className='relative'>
// // // // // // // //                     {post.cover_image && (
// // // // // // // //                         <div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // //                             <img src={post.cover_image} alt={post.title} className='w-full h-full object-cover' />
// // // // // // // //                         </div>
// // // // // // // //                     )}

// // // // // // // //                     <div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // //                         <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // //                         <div className='text-gray-400 mb-8'>
// // // // // // // //                             {new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // //                         </div>

// // // // // // // //                         {post.excerpt &&
// // // // // // // //                             <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>
// // // // // // // //                                 {post.excerpt}
// // // // // // // //                             </p>
// // // // // // // //                         }

// // // // // // // //                         <ReactMarkdown
// // // // // // // //                             components={{
// // // // // // // //                                 code({node, inline, className, children, ...props}) {
// // // // // // // //                                     return (
// // // // // // // //                                         <code className="block bg-gray-800 rounded-md p-4 text-gray-100 my-4" {...props}>
// // // // // // // //                                             {children}
// // // // // // // //                                         </code>
// // // // // // // //                                     );
// // // // // // // //                                 },
// // // // // // // //                                 p: ({children}) => <p className="text-gray-300 mb-4">{children}</p>,
// // // // // // // //                                 h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
// // // // // // // //                                 h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
// // // // // // // //                                 ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
// // // // // // // //                                 ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
// // // // // // // //                                 blockquote: ({children}) => (
// // // // // // // //                                     <blockquote className="border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400">
// // // // // // // //                                         {children}
// // // // // // // //                                     </blockquote>
// // // // // // // //                                 ),
// // // // // // // //                             }}
// // // // // // // //                         >
// // // // // // // //                             {post.content}
// // // // // // // //                         </ReactMarkdown>
// // // // // // // //                     </div>

// // // // // // // //                     <div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // //                         <Reactions postId={post.id} />
// // // // // // // //                     </div>
// // // // // // // //                 </article>

// // // // // // // //                 <div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // //                     <Comments postId={post.id} />
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // // // "use client";
// // // // // // // // // import ReactMarkdown from "react-markdown";
// // // // // // // // // import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// // // // // // // // // import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// // // // // // // // // type Post = {
// // // // // // // // // 	id: string;
// // // // // // // // // 	title: string;
// // // // // // // // // 	content: string;
// // // // // // // // // 	excerpt?: string;
// // // // // // // // // 	cover_image?: string;
// // // // // // // // // 	created_at: string;
// // // // // // // // // 	slug: string;
// // // // // // // // // 	profiles?: {
// // // // // // // // // 		username?: string;
// // // // // // // // // 	};
// // // // // // // // // };

// // // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // // 	return (
// // // // // // // // // 		<div className='max-w-4xl mx-auto p-4'>
// // // // // // // // // 			<h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // // 			<ReactMarkdown
// // // // // // // // // 				components={{
// // // // // // // // // 					code({ node, inline, className, children, ...props }) {
// // // // // // // // // 						const match = /language-(\w+)/.exec(className || "");
// // // // // // // // // 						return !inline && match ? (
// // // // // // // // // 							<SyntaxHighlighter
// // // // // // // // // 								style={atomDark}
// // // // // // // // // 								language={match[1]}
// // // // // // // // // 								PreTag='div'
// // // // // // // // // 								{...props}
// // // // // // // // // 							>
// // // // // // // // // 								{String(children).replace(/\n$/, "")}
// // // // // // // // // 							</SyntaxHighlighter>
// // // // // // // // // 						) : (
// // // // // // // // // 							<code
// // // // // // // // // 								className={className}
// // // // // // // // // 								{...props}
// // // // // // // // // 							>
// // // // // // // // // 								{children}
// // // // // // // // // 							</code>
// // // // // // // // // 						);
// // // // // // // // // 					},
// // // // // // // // // 				}}
// // // // // // // // // 			>
// // // // // // // // // 				{post.content}
// // // // // // // // // 			</ReactMarkdown>
// // // // // // // // // 		</div>
// // // // // // // // // 	);
// // // // // // // // // }
// // // // // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // // // // "use client";
// // // // // // // // // // import ReactMarkdown from "react-markdown";

// // // // // // // // // // type Post = {
// // // // // // // // // // 	id: string;
// // // // // // // // // // 	title: string;
// // // // // // // // // // 	content: string;
// // // // // // // // // // 	excerpt?: string;
// // // // // // // // // // 	cover_image?: string;
// // // // // // // // // // 	created_at: string;
// // // // // // // // // // 	slug: string;
// // // // // // // // // // 	profiles?: {
// // // // // // // // // // 		username?: string;
// // // // // // // // // // 	};
// // // // // // // // // // };

// // // // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // // // 	// Debug: Log the content to verify what we're receiving
// // // // // // // // // // 	console.log("Content being passed to ReactMarkdown:", post.content);

// // // // // // // // // // 	return (
// // // // // // // // // // 		<div className='max-w-4xl mx-auto p-4'>
// // // // // // // // // // 			<h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // // // 			<ReactMarkdown>{post.content}</ReactMarkdown>
// // // // // // // // // // 		</div>
// // // // // // // // // // 	);
// // // // // // // // // // }
// // // // // // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // // // // // "use client";
// // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // import Link from "next/link";
// // // // // // // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // // // // // import { DeletePost } from "./DeletePost";
// // // // // // // // // // // import ReactMarkdown from "react-markdown";
// // // // // // // // // // // import remarkGfm from "remark-gfm";

// // // // // // // // // // // type Post = {
// // // // // // // // // // // 	id: string;
// // // // // // // // // // // 	title: string;
// // // // // // // // // // // 	content: string;
// // // // // // // // // // // 	excerpt?: string;
// // // // // // // // // // // 	cover_image?: string;
// // // // // // // // // // // 	created_at: string;
// // // // // // // // // // // 	slug: string;
// // // // // // // // // // // 	profiles?: {
// // // // // // // // // // // 		username?: string;
// // // // // // // // // // // 	};
// // // // // // // // // // // };

// // // // // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // // // // // // 	return (
// // // // // // // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // // // // // 			{/* Header Section */}
// // // // // // // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // // // // // // 				<Link
// // // // // // // // // // // 					href='/blog'
// // // // // // // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // // // // // // 				>
// // // // // // // // // // // 					← Back to posts
// // // // // // // // // // // 				</Link>
// // // // // // // // // // // 				{isAuthenticated && (
// // // // // // // // // // // 					<div className='space-x-4'>
// // // // // // // // // // // 						<Link
// // // // // // // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // // // // // // 						>
// // // // // // // // // // // 							Edit Post
// // // // // // // // // // // 						</Link>
// // // // // // // // // // // 						<DeletePost postId={post.id} />
// // // // // // // // // // // 					</div>
// // // // // // // // // // // 				)}
// // // // // // // // // // // 			</div>

// // // // // // // // // // // 			{/* Main Content Grid */}
// // // // // // // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // // // // // 				{/* Left Column - Article Content */}
// // // // // // // // // // // 				<article className='relative'>
// // // // // // // // // // // 					{post.cover_image && (
// // // // // // // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // // // // // 							<img
// // // // // // // // // // // 								src={post.cover_image}
// // // // // // // // // // // 								alt={post.title}
// // // // // // // // // // // 								className='w-full h-full object-cover'
// // // // // // // // // // // 							/>
// // // // // // // // // // // 						</div>
// // // // // // // // // // // 					)}

// // // // // // // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // // // // // 						</div>

// // // // // // // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // // // // // // 						<div className='mt-8'>
// // // // // // // // // // // 							<ReactMarkdown
// // // // // // // // // // // 								remarkPlugins={[remarkGfm]}
// // // // // // // // // // // 								className='prose dark:prose-invert'
// // // // // // // // // // // 							>
// // // // // // // // // // // 								{post.content}
// // // // // // // // // // // 							</ReactMarkdown>
// // // // // // // // // // // 						</div>
// // // // // // // // // // // 					</div>

// // // // // // // // // // // 					{/* Engagement Bar */}
// // // // // // // // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // // // // // 						<Reactions postId={post.id} />
// // // // // // // // // // // 					</div>
// // // // // // // // // // // 				</article>

// // // // // // // // // // // 				{/* Right Column - Comments */}
// // // // // // // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // // // // // 					<Comments postId={post.id} />
// // // // // // // // // // // 				</div>
// // // // // // // // // // // 			</div>
// // // // // // // // // // // 		</div>
// // // // // // // // // // // 	);
// // // // // // // // // // // }
// // // // // // // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // // // // // // "use client";
// // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // import Link from "next/link";
// // // // // // // // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // // // // // // import { DeletePost } from "./DeletePost";

// // // // // // // // // // // // type Post = {
// // // // // // // // // // // // 	id: string;
// // // // // // // // // // // // 	title: string;
// // // // // // // // // // // // 	content: string;
// // // // // // // // // // // // 	excerpt?: string;
// // // // // // // // // // // // 	cover_image?: string;
// // // // // // // // // // // // 	created_at: string;
// // // // // // // // // // // // 	slug: string;
// // // // // // // // // // // // 	profiles?: {
// // // // // // // // // // // // 		username?: string;
// // // // // // // // // // // // 	};
// // // // // // // // // // // // };

// // // // // // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // // // // // // // 	return (
// // // // // // // // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // // // // // // 			{/* Header Section */}
// // // // // // // // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // // // // // // // 				<Link
// // // // // // // // // // // // 					href='/blog'
// // // // // // // // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // // // // // // // 				>
// // // // // // // // // // // // 					← Back to posts
// // // // // // // // // // // // 				</Link>
// // // // // // // // // // // // 				{isAuthenticated && (
// // // // // // // // // // // // 					<div className='space-x-4'>
// // // // // // // // // // // // 						<Link
// // // // // // // // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // // // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // // // // // // // 						>
// // // // // // // // // // // // 							Edit Post
// // // // // // // // // // // // 						</Link>
// // // // // // // // // // // // 						<DeletePost postId={post.id} />
// // // // // // // // // // // // 					</div>
// // // // // // // // // // // // 				)}
// // // // // // // // // // // // 			</div>

// // // // // // // // // // // // 			{/* Main Content Grid */}
// // // // // // // // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // // // // // // 				{/* Left Column - Article Content */}
// // // // // // // // // // // // 				<article className='relative'>
// // // // // // // // // // // // 					{post.cover_image && (
// // // // // // // // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // // // // // // 							<img
// // // // // // // // // // // // 								src={post.cover_image}
// // // // // // // // // // // // 								alt={post.title}
// // // // // // // // // // // // 								className='w-full h-full object-cover'
// // // // // // // // // // // // 							/>
// // // // // // // // // // // // 						</div>
// // // // // // // // // // // // 					)}
// // // // // // // // // // // // 					{/* Content */}
// // // // // // // // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // // // // // // 						<h1 className='postTitle text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // // // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // // // // // // 						</div>

// // // // // // // // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // // // // // // // 						<div className='mt-8 content'>
// // // // // // // // // // // // 							<img
// // // // // // // // // // // // 								src={post.content.match(/!\[.*?\]\((.*?)\)/)?.[1]}
// // // // // // // // // // // // 								alt={post.content.match(/!\[(.*?)\]/)?.[1] || ""}
// // // // // // // // // // // // 								className='w-full h-auto rounded-lg my-4'
// // // // // // // // // // // // 							/>
// // // // // // // // // // // // 							{post.content.replace(/!\[.*?\]\(.*?\)/g, "")}
// // // // // // // // // // // // 						</div>
// // // // // // // // // // // // 					</div>

// // // // // // // // // // // // 					{/* Engagement Bar */}
// // // // // // // // // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // // // // // // 						<Reactions postId={post.id} />
// // // // // // // // // // // // 					</div>
// // // // // // // // // // // // 				</article>

// // // // // // // // // // // // 				{/* Right Column - Comments */}
// // // // // // // // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // // // // // // 					<Comments postId={post.id} />
// // // // // // // // // // // // 				</div>
// // // // // // // // // // // // 			</div>
// // // // // // // // // // // // 		</div>
// // // // // // // // // // // // 	);
// // // // // // // // // // // // }

// // // // // // // // // // // // // "use client";
// // // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // // import Link from "next/link";
// // // // // // // // // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // // // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // // // // // // // import { DeletePost } from "./DeletePost";

// // // // // // // // // // // // // type Post = {
// // // // // // // // // // // // // 	id: string;
// // // // // // // // // // // // // 	title: string;
// // // // // // // // // // // // // 	content: string;
// // // // // // // // // // // // // 	excerpt?: string;
// // // // // // // // // // // // // 	cover_image?: string;
// // // // // // // // // // // // // 	created_at: string;
// // // // // // // // // // // // // 	slug: string;
// // // // // // // // // // // // // 	profiles?: {
// // // // // // // // // // // // // 		username?: string;
// // // // // // // // // // // // // 	};
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // // // // // // // // 	return (
// // // // // // // // // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // // // // // // // 			{/* Header Section */}
// // // // // // // // // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // // // // // // // // 				<Link
// // // // // // // // // // // // // 					href='/blog'
// // // // // // // // // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // // // // // // // // 				>
// // // // // // // // // // // // // 					← Back to posts
// // // // // // // // // // // // // 				</Link>
// // // // // // // // // // // // // 				{isAuthenticated && (
// // // // // // // // // // // // // 					<div className='space-x-4'>
// // // // // // // // // // // // // 						<Link
// // // // // // // // // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // // // // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // // // // // // // // 						>
// // // // // // // // // // // // // 							Edit Post
// // // // // // // // // // // // // 						</Link>
// // // // // // // // // // // // // 						<DeletePost postId={post.id} />
// // // // // // // // // // // // // 					</div>
// // // // // // // // // // // // // 				)}
// // // // // // // // // // // // // 			</div>

// // // // // // // // // // // // // 			{/* Main Content Grid */}
// // // // // // // // // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // // // // // // // 				{/* Left Column - Article Content */}
// // // // // // // // // // // // // 				<article className='relative'>
// // // // // // // // // // // // // 					{post.cover_image && (
// // // // // // // // // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // // // // // // // 							<ImageWithFallback
// // // // // // // // // // // // // 								src={post.cover_image}
// // // // // // // // // // // // // 								alt={post.title}
// // // // // // // // // // // // // 								className='w-full h-full object-cover'
// // // // // // // // // // // // // 								priority
// // // // // // // // // // // // // 							/>
// // // // // // // // // // // // // 						</div>
// // // // // // // // // // // // // 					)}
// // // // // // // // // // // // // 					{/* Content */}
// // // // // // // // // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // // // // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // // // // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // // // // // // // 						</div>

// // // // // // // // // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // // // // // // // // 						<div className='mt-8'>{post.content}</div>

// // // // // // // // // // // // // 						{/* Engagement Bar */}
// // // // // // // // // // // // // 						<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // // // // // // // 							<Reactions postId={post.id} />
// // // // // // // // // // // // // 						</div>
// // // // // // // // // // // // // 					</div>
// // // // // // // // // // // // // 				</article>

// // // // // // // // // // // // // 				{/* Right Column - Comments */}
// // // // // // // // // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // // // // // // // 					<Comments postId={post.id} />
// // // // // // // // // // // // // 				</div>
// // // // // // // // // // // // // 			</div>
// // // // // // // // // // // // // 		</div>
// // // // // // // // // // // // // 	);
// // // // // // // // // // // // // }
