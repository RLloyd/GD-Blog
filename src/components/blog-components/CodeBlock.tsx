// src/components/blog-components/CodeBlock.tsx
"use client";
import Prism from "prismjs";
import { useState, useEffect } from "react";
import { Copy, CheckCircle } from "lucide-react";
import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-markup"; // For HTML
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

// type Theme = "tomorrow" | "twilight" | "okaidia" | "dark" | "funky";

type CodeBlockProps = {
	code: string;
	language?: string;
	fontSize?: string;
};

export function CodeBlock({
	code,
	language = "typescript",
	fontSize = "1.875rem", // Default size (14px)
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	// useEffect(() => {
	// 	Prism.highlightAll();
	// }, [code]);
	useEffect(() => {
		Prism.plugins.NormalizeWhitespace.setDefaults({
			"remove-trailing": true,
			"remove-indent": true,
			"left-trim": true,
			"right-trim": true,
		});

		Prism.highlightAll();
	}, [code]);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='relative group my-0'>
			<div className='absolute right-2 top-2 flex items-center space-x-2'>
				<span className='text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded'>{language}</span>
				<button
					onClick={handleCopy}
					className='p-2 text-gray-400 hover:text-white transition-colors'
				>
					{copied ? (
						<CheckCircle
							size={16}
							className='text-green-500'
						/>
					) : (
						<Copy size={16} />
					)}
				</button>
			</div>

			<pre
				className='!bg-[#282c34] max-h-[300px] max-w-[700px] p-4 mt-0 mb-8'
				// className='!mt-0 !bg-[#282c34] max-h-[300px] max-w-[700px] p-4 mt-0 mb-8'
				style={{ fontSize }}
			>
				<code className={`language-${language}`}>{code}</code>
			</pre>
		</div>
	);
}

// Usage:
{
	/* <CodeBlock
  code={sampleCode}
  language="javascript"
  fontSize="1rem" // 16px
/> */
}
// // src/components/blog-components/CodeBlock.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { Copy, CheckCircle } from "lucide-react";
// import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
// // import "prismjs/themes/prism-funky.css";
// // Import language support
// import "prismjs/components/prism-typescript";
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-jsx";
// import "prismjs/components/prism-tsx";
// import "prismjs/components/prism-css";
// import "prismjs/components/prism-json";

// type Theme = "tomorrow" | "twilight" | "okaidia" | "dark" | "funky";

// type CodeBlockProps = {
// 	code: string;
// 	language?: string;
// 	theme?: Theme;
// 	showLineNumbers?: boolean;
// };

// export function CodeBlock({ code, language = "typescript", showLineNumbers = true }: CodeBlockProps) {
// 	const [copied, setCopied] = useState(false);

// 	useEffect(() => {
// 		Prism.highlightAll();
// 	}, [code]);

// 	const handleCopy = async () => {
// 		await navigator.clipboard.writeText(code);
// 		setCopied(true);
// 		setTimeout(() => setCopied(false), 2000);
// 	};

// 	return (
// 		<div className='relative group my-6'>
// 			<div className='absolute right-2 top-2 flex items-center space-x-2'>
// 				<span className='text-xs text-primary-400 bg-gray-800/50 px-2 py-1 rounded'>{language}</span>
// 				<button
// 					onClick={handleCopy}
// 					className='p-2 text-primary-400 hover:text-white transition-colors'
// 				>
// 					{copied ? (
// 						<CheckCircle
// 							size={16}
// 							className='text-green-500'
// 						/>
// 					) : (
// 						<Copy size={16} />
// 					)}
// 				</button>
// 			</div>

// 			<pre className='!mt-0 !bg-[#282c34]'>
// 				<code className={`language-${language}`}>{code}</code>
// 			</pre>
// 		</div>
// 	);
// }
// // // src/components/blog-components/CodeBlock.tsx
// // "use client";
// // import { useState } from "react";
// // import { Copy, CheckCircle } from "lucide-react";

// // type Theme = "monokai" | "github-dark" | "dracula" | "nord" | "one-dark";

// // type CodeBlockProps = {
// // 	code: string;
// // 	language?: string;
// // 	theme?: Theme;
// // };

// // const themes = {
// // 	monokai: {
// // 		bg: "bg-[#272822]",
// // 		text: "text-[#F8F8F2]",
// // 		lineNumbers: "text-[#75715E]",
// // 		keywords: "text-[#F92672]",
// // 		strings: "text-[#E6DB74]",
// // 		numbers: "text-[#AE81FF]",
// // 		comments: "text-[#75715E]",
// // 	},
// // 	"github-dark": {
// // 		bg: "bg-[#24292e]",
// // 		text: "text-[#e1e4e8]",
// // 		lineNumbers: "text-[#6a737d]",
// // 		keywords: "text-[#ff7b72]",
// // 		strings: "text-[#a5d6ff]",
// // 		numbers: "text-[#79c0ff]",
// // 		comments: "text-[#8b949e]",
// // 	},
// // 	dracula: {
// // 		bg: "bg-[#282a36]",
// // 		text: "text-[#f8f8f2]",
// // 		lineNumbers: "text-[#6272a4]",
// // 		keywords: "text-[#ff79c6]",
// // 		strings: "text-[#f1fa8c]",
// // 		numbers: "text-[#bd93f9]",
// // 		comments: "text-[#6272a4]",
// // 	},
// // 	nord: {
// // 		bg: "bg-[#2e3440]",
// // 		text: "text-[#d8dee9]",
// // 		lineNumbers: "text-[#4c566a]",
// // 		keywords: "text-[#81a1c1]",
// // 		strings: "text-[#a3be8c]",
// // 		numbers: "text-[#b48ead]",
// // 		comments: "text-[#4c566a]",
// // 	},
// // 	"one-dark": {
// // 		bg: "bg-[#282c34]",
// // 		text: "text-[#abb2bf]",
// // 		lineNumbers: "text-[#495162]",
// // 		keywords: "text-[#c678dd]",
// // 		strings: "text-[#98c379]",
// // 		numbers: "text-[#d19a66]",
// // 		comments: "text-[#7f848e]",
// // 	},
// // };

// // export function CodeBlock({ code, language = "typescript", theme = "github-dark" }: CodeBlockProps) {
// // 	const [copied, setCopied] = useState(false);
// // 	const lines = code.split("\n");
// // 	const currentTheme = themes[theme];

// // 	const handleCopy = async () => {
// // 		await navigator.clipboard.writeText(code);
// // 		setCopied(true);
// // 		setTimeout(() => setCopied(false), 2000);
// // 	};

// // 	return (
// // 		<div className='relative group my-6'>
// // 			<div className='absolute right-2 top-2 flex items-center space-x-2 z-10'>
// // 				<span className={`text-xs ${currentTheme.text} px-2 py-1 rounded-md bg-opacity-50 ${currentTheme.bg}`}>{language}</span>
// // 				<button
// // 					onClick={handleCopy}
// // 					className={`p-2 ${currentTheme.text} hover:opacity-80 transition-opacity rounded-md`}
// // 					aria-label='Copy code'
// // 				>
// // 					{copied ? (
// // 						<CheckCircle
// // 							size={16}
// // 							className='text-green-500'
// // 						/>
// // 					) : (
// // 						<Copy size={16} />
// // 					)}
// // 				</button>
// // 			</div>

// // 			<pre className={`${currentTheme.bg} rounded-lg p-4 overflow-x-auto`}>
// // 				<code className='block'>
// // 					{lines.map((line, i) => (
// // 						<div
// // 							key={i}
// // 							className='table-row'
// // 						>
// // 							<span className={`table-cell text-right pr-4 ${currentTheme.lineNumbers} select-none w-8`}>{i + 1}</span>
// // 							<span className={`table-cell pl-4 ${currentTheme.text}`}>{line || "\n"}</span>
// // 						</div>
// // 					))}
// // 				</code>
// // 			</pre>
// // 		</div>
// // 	);
// // }

// // // Usage example:
// // // export default function TechnicalPost() {
// // // 	const sampleCode = `function example() {
// // //   const greeting = "Hello World";
// // //   console.log(greeting);
// // //   return greeting;
// // // }`;

// // // 	return (
// // // 		<div className='space-y-6'>
// // // 			<h2>Monokai Theme</h2>
// // // 			<CodeBlock
// // // 				code={sampleCode}
// // // 				language='javascript'
// // // 				theme='monokai'
// // // 			/>

// // // 			<h2>GitHub Dark Theme</h2>
// // // 			<CodeBlock
// // // 				code={sampleCode}
// // // 				language='javascript'
// // // 				theme='github-dark'
// // // 			/>

// // // 			<h2>Dracula Theme</h2>
// // // 			<CodeBlock
// // // 				code={sampleCode}
// // // 				language='javascript'
// // // 				theme='dracula'
// // // 			/>
// // // 		</div>
// // // 	);
// // // }
// // // // src/components/blog-components/CodeBlock.tsx
// // // "use client";
// // // import { useState } from "react";
// // // import { Copy, CheckCircle } from "lucide-react";

// // // type CodeBlockProps = {
// // // 	code: string;
// // // 	language?: string;
// // // };

// // // export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
// // // 	const [copied, setCopied] = useState(false);
// // // 	const lines = code.split("\n");

// // // 	const handleCopy = async () => {
// // // 		await navigator.clipboard.writeText(code);
// // // 		setCopied(true);
// // // 		setTimeout(() => setCopied(false), 2000);
// // // 	};

// // // 	return (
// // // 		<div className='relative group my-6'>
// // // 			<div className='absolute right-2 top-2 flex items-center space-x-2'>
// // // 				<span className='text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded'>{language}</span>
// // // 				<button
// // // 					onClick={handleCopy}
// // // 					className='p-2 text-gray-400 hover:text-white transition-colors'
// // // 					aria-label='Copy code'
// // // 				>
// // // 					{copied ? (
// // // 						<CheckCircle
// // // 							size={16}
// // // 							className='text-green-500'
// // // 						/>
// // // 					) : (
// // // 						<Copy size={16} />
// // // 					)}
// // // 				</button>
// // // 			</div>

// // // 			<pre className='bg-gray-900 rounded-lg p-4 overflow-x-auto'>
// // // 				<code>
// // // 					{lines.map((line, i) => (
// // // 						<div
// // // 							key={i}
// // // 							className='table-row'
// // // 						>
// // // 							<span className='table-cell text-right pr-4 text-gray-500 select-none w-8'>{i + 1}</span>
// // // 							<span className='table-cell pl-4 text-gray-200'>{line || "\n"}</span>
// // // 						</div>
// // // 					))}
// // // 				</code>
// // // 			</pre>
// // // 		</div>
// // // 	);
// // // }
