// src/components/blog/MarkdownRenderer.tsx
"use client";

import ReactMarkdown from "react-markdown";
import Image from "next/image";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";
import type { ReactNode } from "react";

type CodeBlockProps = {
	code: string;
	language?: string;
};

type MarkdownRendererProps = {
	content: string;
};

const CodeBlock = ({ code, language }: CodeBlockProps) => {
	const [copied, setCopied] = useState(false);
	const lines = code.split("\n");

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='relative mt-4 mb-8'>
			<div className='absolute top-0 right-0 left-0 flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg z-10'>
				<span className='text-sm text-gray-400'>{language || "text"}</span>
				<button
					onClick={handleCopy}
					className='flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors'
				>
					{copied ? (
						<>
							<CheckCheck size={16} />
							<span>Copied!</span>
						</>
					) : (
						<>
							<Copy size={16} />
							<span>Copy</span>
						</>
					)}
				</button>
			</div>

			<pre className='overflow-x-auto bg-gray-900 rounded-lg pt-12 pb-4'>
				<code className='block min-w-full'>
					{lines.map((line, i) => (
						<div
							key={i}
							className='table-row'
						>
							<span className='table-cell text-right pr-4 text-gray-500 select-none w-12'>{i + 1}</span>
							<span className='table-cell pl-4 text-gray-200'>{line || "\n"}</span>
						</div>
					))}
				</code>
			</pre>
		</div>
	);
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw, rehypeSanitize]}
			components={{
				p: ({ children }: { children?: ReactNode }) => {
					if (!children) return <p />;

					const child = Array.isArray(children) ? children[0] : children;
					if (typeof child === "object" && child !== null && "type" in child && (child.type === "code" || child.type === "img")) {
						return <>{children}</>;
					}
					return <p>{children}</p>;
				},
				code({ className, children, ...props }) {
					if (!children) return null;
					const match = /language-(\w+)/.exec(className || "");
					const language = match ? match[1] : undefined;
					const content = String(children).trim();

					if (props.inline) {
						return <code className='px-1.5 py-0.5 bg-gray-800 text-gray-200 rounded'>{content}</code>;
					}

					return (
						<CodeBlock
							code={content}
							language={language}
						/>
					);
				},
				img: ({ src, alt, ...props }) => {
					if (!src) return null;

					if (src.startsWith("http")) {
						return (
							<img
								src={src}
								alt={alt || ""}
								className='rounded-lg max-w-full h-auto my-4'
							/>
						);
					}

					const imageSrc = src.startsWith("/") ? src : `/${src}`;
					return (
						<div className='relative w-full aspect-[16/9] my-8'>
							<Image
								src={imageSrc}
								alt={alt || ""}
								fill
								className='object-cover rounded-lg'
								sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
								loading='lazy'
							/>
						</div>
					);
				},
			}}
		>
			{content}
		</ReactMarkdown>
	);
}

// // src/components/blog/MarkdownRenderer.tsx
// "use client";

// import ReactMarkdown from "react-markdown";
// import Image from "next/image";
// import rehypeRaw from "rehype-raw";
// import rehypeSanitize from "rehype-sanitize";
// import remarkGfm from "remark-gfm";
// import { useState } from "react";
// import { Copy, CheckCheck } from "lucide-react";

// const CodeBlock = ({ code, language }: { code: string; language?: string }) => {
// 	const [copied, setCopied] = useState(false);
// 	const lines = code.split("\n");

// 	const handleCopy = async () => {
// 		await navigator.clipboard.writeText(code);
// 		setCopied(true);
// 		setTimeout(() => setCopied(false), 2000);
// 	};

// 	return (
// 		<div className='relative mt-4 mb-8'>
// 			<div className='absolute top-0 right-0 left-0 flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg z-10'>
// 				<span className='text-sm text-gray-400'>{language || "text"}</span>
// 				<button
// 					onClick={handleCopy}
// 					className='flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors'
// 				>
// 					{copied ? (
// 						<>
// 							<CheckCheck size={16} />
// 							<span>Copied!</span>
// 						</>
// 					) : (
// 						<>
// 							<Copy size={16} />
// 							<span>Copy</span>
// 						</>
// 					)}
// 				</button>
// 			</div>

// 			<pre className='overflow-x-auto bg-gray-900 rounded-lg pt-12 pb-4'>
// 				<code className='block min-w-full'>
// 					{lines.map((line, i) => (
// 						<div
// 							key={i}
// 							className='table-row'
// 						>
// 							<span className='table-cell text-right pr-4 text-gray-500 select-none w-12'>{i + 1}</span>
// 							<span className='table-cell pl-4 text-gray-200'>{line || "\n"}</span>
// 						</div>
// 					))}
// 				</code>
// 			</pre>
// 		</div>
// 	);
// };

// export function MarkdownRenderer({ content }: { content: string }) {
// 	return (
// 		<ReactMarkdown
// 			remarkPlugins={[remarkGfm]}
// 			rehypePlugins={[rehypeRaw, rehypeSanitize]}
// 			components={{
// 				// Override paragraph rendering when it contains code or images
// 				p: ({ children }) => {
// 					const child = children[0];
// 					if (typeof child === "object" && child !== null && "type" in child) {
// 						if (child.type === "code" || child.type === "img") {
// 							return <>{children}</>;
// 						}
// 					}
// 					return <p>{children}</p>;
// 				},
// 				code({ inline, className, children }) {
// 					const match = /language-(\w+)/.exec(className || "");
// 					const language = match ? match[1] : undefined;
// 					const content = String(children).trim();

// 					if (inline) {
// 						return <code className='px-1.5 py-0.5 bg-gray-800 text-gray-200 rounded'>{content}</code>;
// 					}

// 					return (
// 						<CodeBlock
// 							code={content}
// 							language={language}
// 						/>
// 					);
// 				},
// 				img: ({ src, alt, ...props }) => {
// 					if (!src) return null;

// 					if (src.startsWith("http")) {
// 						return (
// 							<img
// 								src={src}
// 								alt={alt || ""}
// 								className='rounded-lg max-w-full h-auto my-4'
// 								{...props}
// 							/>
// 						);
// 					}

// 					const imageSrc = src.startsWith("/") ? src : `/${src}`;
// 					return (
// 						<div className='relative w-full aspect-[16/9] my-8'>
// 							<Image
// 								src={imageSrc}
// 								alt={alt || ""}
// 								fill
// 								className='object-cover rounded-lg'
// 								sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// 								loading='lazy'
// 								{...props}
// 							/>
// 						</div>
// 					);
// 				},
// 			}}
// 		>
// 			{content}
// 		</ReactMarkdown>
// 	);
// }
// // // src/components/blog/MarkdownRenderer.tsx
// // "use client";

// // import ReactMarkdown from "react-markdown";
// // import Image from "next/image";
// // import rehypeRaw from "rehype-raw";
// // import rehypeSanitize from "rehype-sanitize";
// // import remarkGfm from "remark-gfm";
// // import { useState } from "react";
// // import { Copy, CheckCheck } from "lucide-react";

// // const CodeBlock = ({ code, language }: { code: string; language?: string }) => {
// // 	const [copied, setCopied] = useState(false);
// // 	const lines = code.split("\n");

// // 	const handleCopy = async () => {
// // 		await navigator.clipboard.writeText(code);
// // 		setCopied(true);
// // 		setTimeout(() => setCopied(false), 2000);
// // 	};

// // 	return (
// // 		<div className='relative mt-4 mb-8'>
// // 			<div className='absolute top-0 right-0 left-0 flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg'>
// // 				<span className='text-sm text-gray-400'>{language || "text"}</span>
// // 				<button
// // 					onClick={handleCopy}
// // 					className='flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors'
// // 				>
// // 					{copied ? (
// // 						<>
// // 							<CheckCheck size={16} />
// // 							<span>Copied!</span>
// // 						</>
// // 					) : (
// // 						<>
// // 							<Copy size={16} />
// // 							<span>Copy</span>
// // 						</>
// // 					)}
// // 				</button>
// // 			</div>

// // 			<div className='relative'>
// // 				<pre className='overflow-x-auto bg-gray-900 rounded-lg pt-12 pb-4'>
// // 					<code className='block min-w-full'>
// // 						{lines.map((line, i) => (
// // 							<div
// // 								key={i}
// // 								className='table-row'
// // 							>
// // 								<span className='table-cell text-right pr-4 text-gray-500 select-none w-12'>{i + 1}</span>
// // 								<span className='table-cell pl-4 text-gray-200'>{line || "\n"}</span>
// // 							</div>
// // 						))}
// // 					</code>
// // 				</pre>
// // 			</div>
// // 		</div>
// // 	);
// // };

// // export function MarkdownRenderer({ content }: { content: string }) {
// // 	return (
// // 		<ReactMarkdown
// // 			remarkPlugins={[remarkGfm]}
// // 			rehypePlugins={[rehypeRaw, rehypeSanitize]}
// // 			components={{
// // 				code({ inline, className, children }) {
// // 					const match = /language-(\w+)/.exec(className || "");
// // 					const language = match ? match[1] : undefined;
// // 					const content = String(children).trim();

// // 					if (inline) {
// // 						return <code className='px-1.5 py-0.5 bg-gray-800 text-gray-200 rounded'>{content}</code>;
// // 					}

// // 					return (
// // 						<CodeBlock
// // 							code={content}
// // 							language={language}
// // 						/>
// // 					);
// // 				},
// // 				img: ({ src, alt, ...props }) => {
// // 					if (!src) return null;

// // 					if (src.startsWith("http")) {
// // 						return (
// // 							<img
// // 								src={src}
// // 								alt={alt || ""}
// // 								className='rounded-lg max-w-full h-auto my-4'
// // 								{...props}
// // 							/>
// // 						);
// // 					}

// // 					const imageSrc = src.startsWith("/") ? src : `/${src}`;
// // 					return (
// // 						<div className='relative w-full aspect-[16/9] my-8'>
// // 							<Image
// // 								src={imageSrc}
// // 								alt={alt || ""}
// // 								fill
// // 								className='object-cover rounded-lg'
// // 								sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// // 								loading='lazy'
// // 								{...props}
// // 							/>
// // 						</div>
// // 					);
// // 				},
// // 			}}
// // 		>
// // 			{content}
// // 		</ReactMarkdown>
// // 	);
// // }

// // // // src/components/blog/MarkdownRenderer.tsx
// // // import ReactMarkdown from "react-markdown";
// // // import Image from "next/image";
// // // import rehypeHighlight from "rehype-highlight";
// // // import rehypeRaw from "rehype-raw";
// // // import rehypeSanitize from "rehype-sanitize";
// // // import remarkGfm from "remark-gfm";
// // // import hljs from "highlight.js/lib/core";
// // // import javascript from "highlight.js/lib/languages/javascript";
// // // import typescript from "highlight.js/lib/languages/typescript";
// // // import xml from "highlight.js/lib/languages/xml";
// // // import css from "highlight.js/lib/languages/css";
// // // import markdown from "highlight.js/lib/languages/markdown";
// // // import json from "highlight.js/lib/languages/json";
// // // import bash from "highlight.js/lib/languages/bash";
// // // import sql from "highlight.js/lib/languages/sql";

// // // // Import base style
// // // import "highlight.js/styles/base16/material-darker.css";
// // // import { CodeBlock } from "./CodeBlock";

// // // // Register languages
// // // hljs.registerLanguage("javascript", javascript);
// // // hljs.registerLanguage("typescript", typescript);
// // // hljs.registerLanguage("html", xml);
// // // hljs.registerLanguage("xml", xml);
// // // hljs.registerLanguage("css", css);
// // // hljs.registerLanguage("markdown", markdown);
// // // hljs.registerLanguage("json", json);
// // // hljs.registerLanguage("bash", bash);
// // // hljs.registerLanguage("sql", sql);

// // // const ALLOWED_TAGS = ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "blockquote", "hr", "br", "a", "img"];

// // // const ALLOWED_ATTRIBUTES = {
// // // 	a: ["href", "title", "target", "rel"],
// // // 	img: ["src", "alt", "title", "width", "height", "loading"],
// // // 	div: ["class", "style"],
// // // 	span: ["class", "style"],
// // // 	code: ["class", "language"],
// // // };

// // // type MarkdownRendererProps = {
// // // 	content: string;
// // // };

// // // export function MarkdownRenderer({ content }: MarkdownRendererProps) {
// // // 	return (
// // // 		<ReactMarkdown
// // // 			remarkPlugins={[remarkGfm]}
// // // 			rehypePlugins={[rehypeRaw, rehypeSanitize]}
// // // 			components={{
// // // 				p: ({ node, children }) => {
// // // 					if (node?.children[0]?.type === "element" && node.children[0].tagName === "img") {
// // // 						return <div>{children}</div>;
// // // 					}
// // // 					return <p>{children}</p>;
// // // 				},
// // // 				img: ({ src, alt, ...props }) => {
// // // 					if (!src) return null;

// // // 					// Use regular img tag for external URLs
// // // 					if (src.startsWith("http")) {
// // // 						return (
// // // 							<img
// // // 								src={src}
// // // 								alt={alt || ""}
// // // 								className='rounded-lg max-w-full h-auto my-4'
// // // 								{...props}
// // // 							/>
// // // 						);
// // // 					}

// // // 					// Use Next/Image for local images
// // // 					const imageSrc = src.startsWith("/") ? src : `/${src}`;
// // // 					return (
// // // 						<div className='relative w-full aspect-[16/9] my-8'>
// // // 							<Image
// // // 								src={imageSrc}
// // // 								alt={alt || ""}
// // // 								fill
// // // 								className='object-cover rounded-lg'
// // // 								sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// // // 								loading='lazy'
// // // 								{...props}
// // // 							/>
// // // 						</div>
// // // 					);
// // // 				},
// // // 				// img: ({ src, alt, ...props }) => {
// // // 				// 	if (!src) return null;

// // // 				// const imageSrc = src.startsWith("/") ? src : src.startsWith("http") ? src : `/${src}`;

// // // 				// return (
// // // 				// 	<div className='relative w-full aspect-[16/9] my-8'>
// // // 				// 		<Image
// // // 				// 			src={imageSrc}
// // // 				// 			alt={alt || ""}
// // // 				// 			fill
// // // 				// 			className='object-cover rounded-lg'
// // // 				// 			sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// // // 				// 			loading='lazy'
// // // 				// 			{...props}
// // // 				// 		/>
// // // 				// 	</div>
// // // 				// );
// // // 				// },
// // // 				a: ({ href, children, ...props }) => {
// // // 					if (!href) return null;
// // // 					const isExternal = href.startsWith("http");
// // // 					return (
// // // 						<a
// // // 							href={href}
// // // 							{...props}
// // // 							{...(isExternal
// // // 								? {
// // // 										target: "_blank",
// // // 										rel: "noopener noreferrer",
// // // 								  }
// // // 								: {})}
// // // 							className='text-primary-400 hover:text-primary-300 transition-colors'
// // // 						>
// // // 							{children}
// // // 						</a>
// // // 					);
// // // 				},
// // // 				code: ({ node, inline, className, children, ...props }) => {
// // // 					const match = /language-(\w+)/.exec(className || "");
// // // 					const language = match ? match[1] : "";
// // // 					const codeString = Array.isArray(children) ? children.join("") : String(children);

// // // 					if (!inline && language) {
// // // 						let highlighted;
// // // 						try {
// // // 							highlighted = language && hljs.highlight(codeString, { language }).value;
// // // 						} catch (err) {
// // // 							highlighted = codeString;
// // // 						}

// // // 						return (
// // // 							<pre className={`language-${language} relative overflow-x-auto p-4 bg-gray-900 rounded-lg`}>
// // // 								<code
// // // 									className={className}
// // // 									dangerouslySetInnerHTML={{ __html: highlighted }}
// // // 									{...props}
// // // 								/>
// // // 							</pre>
// // // 						);
// // // 					}

// // // 					// return <code className='px-1.5 py-0.5 bg-gray-800 text-gray-200 rounded'>{codeString}</code>;
// // // 					return (
// // // 						<CodeBlock
// // // 							code={content}
// // // 							language={language}
// // // 						/>
// // // 					);
// // // 				},
// // // 			}}
// // // 		>
// // // 			{content}
// // // 		</ReactMarkdown>
// // // 	);
// // // }

// // // // // src/components/blog/MarkdownRenderer.tsx
// // // // import ReactMarkdown from "react-markdown";
// // // // import Image from "next/image";
// // // // import rehypeHighlight from "rehype-highlight";
// // // // import rehypeRaw from "rehype-raw";
// // // // import rehypeSanitize from "rehype-sanitize";
// // // // import remarkGfm from "remark-gfm";
// // // // import hljs from "highlight.js/lib/core";
// // // // import javascript from "highlight.js/lib/languages/javascript";
// // // // import typescript from "highlight.js/lib/languages/typescript";
// // // // import xml from "highlight.js/lib/languages/xml";
// // // // import css from "highlight.js/lib/languages/css";
// // // // import markdown from "highlight.js/lib/languages/markdown";
// // // // import json from "highlight.js/lib/languages/json";
// // // // import bash from "highlight.js/lib/languages/bash";
// // // // import sql from "highlight.js/lib/languages/sql";

// // // // // Import base style
// // // // import "highlight.js/styles/base16/material-darker.css";

// // // // // Register languages
// // // // hljs.registerLanguage("javascript", javascript);
// // // // hljs.registerLanguage("typescript", typescript);
// // // // hljs.registerLanguage("html", xml);
// // // // hljs.registerLanguage("xml", xml);
// // // // hljs.registerLanguage("css", css);
// // // // hljs.registerLanguage("markdown", markdown);
// // // // hljs.registerLanguage("json", json);
// // // // hljs.registerLanguage("bash", bash);
// // // // hljs.registerLanguage("sql", sql);

// // // // const ALLOWED_TAGS = ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "blockquote", "hr", "br", "a", "img"];

// // // // const ALLOWED_ATTRIBUTES = {
// // // // 	a: ["href", "title", "target", "rel"],
// // // // 	img: ["src", "alt", "title", "width", "height", "loading"],
// // // // 	div: ["class", "style"],
// // // // 	span: ["class", "style"],
// // // // 	code: ["class", "language"],
// // // // };

// // // // type MarkdownRendererProps = {
// // // // 	content: string;
// // // // };

// // // // export function MarkdownRenderer({ content }: MarkdownRendererProps) {
// // // // 	return (
// // // // 		<ReactMarkdown
// // // // 			remarkPlugins={[remarkGfm]}
// // // // 			rehypePlugins={[
// // // // 				[rehypeHighlight, { ignoreMissing: true }],
// // // // 				rehypeRaw,
// // // // 				[
// // // // 					rehypeSanitize,
// // // // 					{
// // // // 						allowedTags: ALLOWED_TAGS,
// // // // 						allowedAttributes: ALLOWED_ATTRIBUTES,
// // // // 					},
// // // // 				],
// // // // 			]}
// // // // 			components={{
// // // // 				p: ({ node, children }) => {
// // // // 					if (node?.children[0]?.type === "element" && node.children[0].tagName === "img") {
// // // // 						return <div>{children}</div>;
// // // // 					}
// // // // 					return <p>{children}</p>;
// // // // 				},
// // // // 				img: ({ src, alt, ...props }) => {
// // // // 					if (!src) return null;
// // // // 					const imageSrc = src.startsWith("/") ? src : src.startsWith("http") ? src : `/${src}`;

// // // // 					return (
// // // // 						<div className='relative w-full aspect-[16/9] my-8'>
// // // // 							<Image
// // // // 								src={imageSrc}
// // // // 								alt={alt || ""}
// // // // 								fill
// // // // 								className='object-cover rounded-lg'
// // // // 								sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// // // // 								loading='lazy'
// // // // 								{...props}
// // // // 							/>
// // // // 						</div>
// // // // 					);
// // // // 				},
// // // // 				a: ({ href, children, ...props }) => {
// // // // 					if (!href) return null;
// // // // 					const isExternal = href.startsWith("http");
// // // // 					return (
// // // // 						<a
// // // // 							href={href}
// // // // 							{...props}
// // // // 							{...(isExternal
// // // // 								? {
// // // // 										target: "_blank",
// // // // 										rel: "noopener noreferrer",
// // // // 								  }
// // // // 								: {})}
// // // // 							className='text-primary-400 hover:text-primary-300 transition-colors'
// // // // 						>
// // // // 							{children}
// // // // 						</a>
// // // // 					);
// // // // 				},
// // // // 				code: ({ node, inline, className, children, ...props }) => {
// // // // 					const match = /language-(\w+)/.exec(className || "");
// // // // 					const language = match ? match[1] : "";
// // // // 					const codeString = Array.isArray(children) ? children.join("") : String(children);

// // // // 					if (!inline && language) {
// // // // 						let highlighted;
// // // // 						try {
// // // // 							highlighted = language && hljs.highlight(codeString, { language }).value;
// // // // 						} catch (err) {
// // // // 							highlighted = codeString;
// // // // 						}

// // // // 						return (
// // // // 							<pre className={`language-${language} relative overflow-x-auto p-4 bg-gray-900 rounded-lg`}>
// // // // 								<code
// // // // 									className={className}
// // // // 									dangerouslySetInnerHTML={{ __html: highlighted }}
// // // // 									{...props}
// // // // 								/>
// // // // 							</pre>
// // // // 						);
// // // // 					}

// // // // 					return <code className='px-1.5 py-0.5 bg-gray-800 text-gray-200 rounded'>{codeString}</code>;
// // // // 				},
// // // // 			}}
// // // // 		>
// // // // 			{content}
// // // // 		</ReactMarkdown>
// // // // 	);
// // // // }
