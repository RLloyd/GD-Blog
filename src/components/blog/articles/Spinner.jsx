// src/components/blog-components/Spinner.jsx
"use client";
import "./Spinner.css";
import { CodeBlock } from "@/components/blog-components/CodeBlock";
// import { useState, useEffect } from "react";

const Spinner = () => {
	// const [mounted, setMounted] = useState(false);

	// useEffect(() => {
	// 	setMounted(true);
	// }, []);

	// if (!mounted) return null;

	const htmlCode = `
      <div className='spinner-container'>
         <div className='spinner'></div>
      </div>
   `;

	const cssCode = `
      .spinner-container {
         display: flex;
         justify-content: center;
         align-items: center;
         min-height: 200px;
      }

      .spinner {
         position: relative;
         width: 120px;
         height: 120px;
      }

      .spinner::before {
         content: "";
         position: absolute;
         top: 0;
         right: 0;
         bottom: 0;
         left: 0;
         border: 16px dashed;
         border-color: gray;
         border-radius: 50%;
         animation: spin 4s ease-in-out 7;
      }

      /* Keyframes for spin animation */
      @keyframes spin {
         0% {
            transform: rotate(0deg);
         }
         100% {
            transform: rotate(360deg);
         }
      }
   `;

	return (
		<>
			<div className='spinner-container'>
				<div className='spinner'></div>
			</div>
			<h3>Basic Spinner Codes:</h3>
			<CodeBlock
				code={htmlCode}
				language='HTML'
				fontSize='1rem' // 16px
			/>
			<CodeBlock
				code={cssCode}
				language='CSS'
				fontSize='1rem' // 16px
			/>
		</>
	);
};

export default Spinner;
