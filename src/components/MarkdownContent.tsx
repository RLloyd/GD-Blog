// src/components/MarkdownContent.tsx
"use client";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";

export function MarkdownContent({ content }: { content: string }) {
	useEffect(() => {
		// Initialize Prism for syntax highlighting
		if (typeof window !== "undefined") {
			Prism.highlightAll();
		}
	}, [content]);

	return (
		<div className='prose prose-invert prose-lg max-w-none'>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypePrism]}
				components={{
					// Handle headers
					h1: ({ children }) => <h1 className='text-4xl font-bold mb-6'>{children}</h1>,
					h2: ({ children }) => <h2 className='text-3xl font-bold mb-4'>{children}</h2>,
					h3: ({ children }) => <h3 className='text-2xl font-bold mb-3'>{children}</h3>,
					h4: ({ children }) => <h4 className='text-xl font-bold mb-2'>{children}</h4>,

					// Handle code blocks
					code: ({ node, inline, className, children, ...props }) => {
						const match = /language-(\w+)/.exec(className || "");
						const language = match ? match[1] : "";

						if (!inline && language) {
							return (
								<pre className={`language-${language} rounded-lg p-4 bg-gray-800`}>
									<code
										className={`language-${language}`}
										{...props}
									>
										{String(children).replace(/\n$/, "")}
									</code>
								</pre>
							);
						}

						return (
							<code
								className={`${className} bg-gray-800 rounded px-1`}
								{...props}
							>
								{children}
							</code>
						);
					},

					// Handle images
					img: ({ src, alt }) => (
						<img
							src={src}
							alt={alt || ""}
							className='w-full h-auto rounded-lg my-4'
							loading='lazy'
						/>
					),

					// Handle paragraphs
					p: ({ children }) => <p className='mb-4 text-gray-300'>{children}</p>,

					// Handle lists
					ul: ({ children }) => <ul className='list-disc pl-6 mb-4'>{children}</ul>,
					ol: ({ children }) => <ol className='list-decimal pl-6 mb-4'>{children}</ol>,

					// Handle blockquotes
					blockquote: ({ children }) => <blockquote className='border-l-4 border-gray-600 pl-4 italic my-4'>{children}</blockquote>,
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}

// // src/components/MarkdownContent.tsx
// "use client";
// import { useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypePrism from "rehype-prism-plus";
// import Prism from "prismjs";
// import Image from "next/image";
// import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/components/prism-typescript";
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-css";
// import "prismjs/components/prism-python";
// import "prismjs/components/prism-bash";
// import "prismjs/components/prism-json";
// import "prismjs/components/prism-markdown";

// export function MarkdownContent({ content }: { content: string }) {
// 	console.log("contnet: ", content);
// 	return (
// 		<div className='prose prose-invert prose-lg max-w-none'>
// 			<ReactMarkdown
// 				remarkPlugins={[remarkGfm]}
// 				components={{
// 					p: ({ node, children }) => {
// 						if (node?.children[0]?.type === "element" && node.children[0].tagName === "img") {
// 							return <div>{children}</div>;
// 						}
// 						return <p>{children}</p>;
// 					},
// 					img: ({ src, alt }) => (
// 						<img
// 							src={src}
// 							alt={alt || ""}
// 							className='w-full h-auto rounded-lg shadow-lg my-4'
// 							loading='lazy'
// 						/>
// 					),
// 				}}
// 			>
// 				{content}
// 			</ReactMarkdown>
// 		</div>
// 	);
// }

// // export function MarkdownContent({ content }: { content: string }) {
// // 	useEffect(() => {
// // 		if (typeof window !== "undefined") {
// // 			require("prismjs");
// // 		}
// // 	}, [content]);

// // 	return (
// // 		<div
// // 			className='prose prose-invert prose-lg max-w-none
// //       prose-h1:text-4xl prose-h1:font-serif prose-h1:text-gray-100 prose-h1:mb-6
// //       prose-h2:text-3xl prose-h2:font-serif prose-h2:text-gray-200 prose-h2:mb-4
// //       prose-h3:text-2xl prose-h3:font-serif prose-h3:text-gray-200 prose-h3:mb-3
// //       prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4
// //       prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
// //       prose-strong:text-gray-200
// //       prose-ul:text-gray-300
// //       prose-ol:text-gray-300
// //       prose-pre:bg-[#2d2d2d] prose-pre:text-gray-200
// //       prose-code:bg-[#2d2d2d] prose-code:text-gray-200
// //       prose-blockquote:border-gray-500 prose-blockquote:text-gray-300'
// // 		>
// // 			<ReactMarkdown
// // 				remarkPlugins={[remarkGfm]}
// // 				rehypePlugins={[rehypePrism]}
// // 				components={{
// // 					img: ({ node, src, alt, ...props }) => {
// // 						if (!src) return null;

// // 						return (
// // 							<div className='relative w-full my-8'>
// // 								<img
// // 									src={src}
// // 									alt={alt || ""}
// // 									className='rounded-lg w-full h-auto'
// // 									{...props}
// // 								/>
// // 							</div>
// // 						);
// // 					},
// // 					code: ({ node, inline, className, children, ...props }) => {
// // 						const match = /language-(\w+)/.exec(className || "");
// // 						const language = match ? match[1] : "";

// // 						if (!inline && language) {
// // 							return (
// // 								<pre className={`language-${language}`}>
// // 									<code
// // 										className={`language-${language}`}
// // 										{...props}
// // 									>
// // 										{String(children).replace(/\n$/, "")}
// // 									</code>
// // 								</pre>
// // 							);
// // 						}

// // 						return (
// // 							<code
// // 								className={className}
// // 								{...props}
// // 							>
// // 								{children}
// // 							</code>
// // 						);
// // 					},
// // 				}}
// // 			>
// // 				{content}
// // 			</ReactMarkdown>
// // 		</div>
// // 	);
// // }
