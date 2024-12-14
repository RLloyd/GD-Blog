/*-= src/components/blog-components/Spinner.jsx =-*/
"use client";
import { CodeBlock } from "@/components/blog-components/CodeBlock";

const Spinner = () => {

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
         animation: spin 4s ease-in-out infinite;
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
         <div className='spinner-container min-h-[200px] flex justify-center items-center'>
            <div className='spinner
               relative w-[120px] h-[120px]
               before:content-[""]
               before:absolute
               before:inset-0
               before:border-[16px]
               before:border-dashed
               before:rounded-full
               before:border-gray-400
               before:animate-spin-custom
               '>
            </div>
         </div>

         {/* Codeblocks */}
         <div className='mt-8 mb-1'>Simple Spinner Codes:</div>
         <p className='mt-0 mb-1'>Usage: HTML component</p>
         <CodeBlock code={htmlCode} language='HTML' fontSize='1rem' />
         <p className='mt-8 mb-1'>CSS Styling & Animation</p>
         <CodeBlock code={cssCode} language='CSS' fontSize='1rem' />

      </>
   );
};

export default Spinner;
