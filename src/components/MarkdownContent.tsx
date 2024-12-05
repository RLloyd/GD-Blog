// src/components/MarkdownContent.tsx
"use client";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
		Prism.highlightAll();
	}, [content]);

	return (
		<div
			className='prose prose-invert prose-lg max-w-none
      prose-h1:text-4xl prose-h1:font-serif prose-h1:text-gray-100 prose-h1:mb-6
      prose-h2:text-3xl prose-h2:font-serif prose-h2:text-gray-200 prose-h2:mb-4
      prose-h3:text-2xl prose-h3:font-serif prose-h3:text-gray-200 prose-h3:mb-3
      prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-200
      prose-ul:text-gray-300
      prose-ol:text-gray-300
      prose-pre:bg-[#2d2d2d] prose-pre:text-gray-200
      prose-code:bg-[#2d2d2d] prose-code:text-gray-200
      prose-blockquote:border-gray-500 prose-blockquote:text-gray-300'
		>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					code({ node, inline, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");
						const language = match ? match[1] : "";

						if (!inline && language) {
							return (
								<pre className={`language-${language}`}>
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
								className={className}
								{...props}
							>
								{children}
							</code>
						);
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
