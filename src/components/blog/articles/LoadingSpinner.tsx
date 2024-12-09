// src/components/blog/articles/LoadingSpinner.tsx
import { CodeBlock } from "@/components/blog-components/CodeBlock";
import { useState, useEffect } from "react";

const LoadingSpinner = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const sampleCode = `
   <div className='flex justify-center items-center min-h-[200px]'>
      <div className="relative w-[120px] h-[120px] before:content-['']
         before:absolute before:inset-0 before:border-[16px] before:border-gray-200 dark:before:border-gray-700
         before:border-dashed before:rounded-full before:border-t-primary-500 before:animate-[spin_4s_linear_3]"
      />
   </div>
   `;

	return (
		<>
			<div className='flex justify-center items-center min-h-[200px]'>
				<div
					className="
            relative w-[120px] h-[120px] before:content-['']
            before:absolute before:inset-0 before:border-[16px] before:border-gray-200 dark:before:border-gray-700
            before:border-dashed before:rounded-full before:border-t-primary-500 before:animate-[spin_4s_linear_3]"
				/>
			</div>

			<div className='space-y-6'>
				<h3>Codeblock Theme</h3>
				<CodeBlock
					code={sampleCode}
					language='HTML'
					// language='typescript'
					// theme='monokai'
					fontSize='1rem' // 16px
				/>

				{/* <h2>GitHub Dark Theme</h2>
				<CodeBlock
					code={sampleCode}
					language='javascript'
					theme='github-dark'
				/>

				<h2>Dracula Theme</h2>
				<CodeBlock
					code={sampleCode}
					language='javascript'
					theme='dracula'
				/> */}
			</div>
		</>
	);
};

export default LoadingSpinner;
