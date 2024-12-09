"use client";
import { useState } from "react";
// import LoadingSpinner from "../blog/articles/LoadingSpinner";
import Spinner from "../blog/articles/Spinner";

export default function InteractiveCounterPost() {
	const [count, setCount] = useState(0);
	const [theme, setTheme] = useState("blue");

	const colors = {
		blue: "bg-blue-500 hover:bg-blue-600",
		green: "bg-green-500 hover:bg-green-600",
		purple: "bg-purple-500 hover:bg-purple-600",
	};

	return (
		<>
			<div className='bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6'>
				<div className='flex justify-between items-center'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Interactive Counter Demo</h2>
					<div className='flex gap-2'>
						{Object.keys(colors).map((color) => (
							<button
								key={color}
								onClick={() => setTheme(color)}
								className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${theme === color ? `${colors[color]} text-white` : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"}`}
							>
								{color}
							</button>
						))}
					</div>
				</div>

				<div className='flex flex-col items-center gap-4 py-8'>
					<div className='text-6xl font-bold text-gray-900 dark:text-white'>{count}</div>
					<div className='flex gap-2'>
						<button
							onClick={() => setCount((c) => c - 1)}
							className={`px-4 py-2 rounded text-white ${colors[theme]}`}
						>
							Decrease
						</button>
						<button
							onClick={() => setCount(0)}
							className='px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white'
						>
							Reset
						</button>
						<button
							onClick={() => setCount((c) => c + 1)}
							className={`px-4 py-2 rounded text-white ${colors[theme]}`}
						>
							Increase
						</button>
					</div>
				</div>

				<div className='space-y-4 text-gray-600 dark:text-gray-300'>
					<p>This is a simple interactive component demonstrating how React components can be embedded in blog posts. Try these features:</p>
					<ul className='list-disc pl-5 space-y-2'>
						<li>Click the buttons to change the counter value</li>
						<li>Use the color buttons to change the theme</li>
						<li>Notice how the component maintains state</li>
					</ul>
				</div>
			</div>
			{/* <LoadingSpinner /> */}
			<Spinner />
		</>
	);
}
