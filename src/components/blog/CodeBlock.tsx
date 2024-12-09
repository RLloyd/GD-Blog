// src/components/blog/CodeBlock.tsx
"use client";
import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";

type CodeBlockProps = {
	code: string;
	language?: string;
	showLineNumbers?: boolean;
};

export function CodeBlock({ code, language, showLineNumbers = true }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='relative group'>
			{/* Language Label */}
			{language && <div className='absolute top-2 right-12 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded'>{language}</div>}

			{/* Copy Button */}
			<button
				onClick={handleCopy}
				className='absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors'
				aria-label='Copy code'
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

			{/* Code Content */}
			<pre className='p-4 bg-gray-900 rounded-lg overflow-x-auto'>
				<code className='relative flex'>
					{showLineNumbers && (
						<div className='pr-4 text-gray-500 select-none text-right'>
							{code.split("\n").map((_, i) => (
								<span
									key={i}
									className='block'
								>
									{i + 1}
								</span>
							))}
						</div>
					)}
					<div className='flex-1'>{code}</div>
				</code>
			</pre>
		</div>
	);
}
