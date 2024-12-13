/*---= src/components/modal-components/MultiStepModal.tsx =---*/
/*-= Loader Illustration Modal Component • Typed Loader Modal Component =-*/
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface LoaderDetails {
   title: string;
   subtitle?: string;
   description?: string;
   isCode: boolean;
   code?: string;
   language?: string;
   imageUrl?: string;
   altText?: string;
}

interface Props {
   steps: LoaderDetails[];
   onClose: () => void;
}

const MultiStepModal: React.FC<Props> = ({ steps, onClose }) => {
   const [currentStep, setCurrentStep] = useState(0);
   const [copied, setCopied] = useState(false);

   const handleNext = () => {
      if (currentStep < steps.length - 1) {
         setCurrentStep(currentStep + 1);
         setCopied(false); // Reset copy state when navigating
      }
   };

   const handlePrevious = () => {
      if (currentStep > 0) {
         setCurrentStep(currentStep - 1);
         setCopied(false); // Reset copy state when navigating
      }
   };

   const handleCopy = (code: string | undefined) => {
      if (code) {
         navigator.clipboard.writeText(code);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000); // Reset copy status after 2 seconds
      }
   };

   const currentDetail = steps[currentStep];

   return (
      <div
         style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
         }}
         onClick={onClose} // Close modal when clicking the backdrop
      >
         <div
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
            style={{
               backgroundColor: '#fff',
               borderRadius: '8px',
               padding: '2rem',
               width: '90%',
               maxWidth: '600px',
               overflowY: 'auto',
               position: 'relative',
            }}
         >
            <button
               onClick={onClose}
               style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
               }}
            >
               &times;
            </button>

            <h1 className="text-5xl font-semibold text-primary-800 dark:text-white mb-0">{currentDetail.title}</h1>
            {/* <h1 id="modal-title" className="text-4xl font-semibold text-gray-900 dark:text-white mb-0"></h1> */}
            {/* {currentDetail.subtitle &&  */}
            <h2 className="text-2xl font-normal text-accent-600 dark:text-white mt-3 mb-0">{currentDetail.subtitle}</h2>
            {/* <h3 style={{ color: 'text-primary-500' }}>{currentDetail.subtitle}</h3>} */}
            {currentDetail.description && <p style={{ margin: '1rem 0' }}>{currentDetail.description}</p>}

            {currentDetail.isCode ? (
               currentDetail.code ? (
                  <div style={{ marginTop: '1rem', position: 'relative' }}>
                     {currentDetail.language && (
                        <p className='text-base font-normal text-gray-600 dark:text-white mt-5 mb-0'>
                           Language: {currentDetail.language}
                           {/* Language: {currentDetail.language.toUpperCase()} */}
                        </p>
                     )}
                     <div style={{ position: 'relative' }}>
                        <SyntaxHighlighter language={currentDetail.language} style={vscDarkPlus}>
                           {currentDetail.code}
                        </SyntaxHighlighter>
                        <button
                           onClick={() => handleCopy(currentDetail.code)}
                           className='
                              absolute
                              top-2 right-2 py-2 px-4
                              bg-accent-700
                              text-sm
                              text-white font-semibold
                              rounded-lg shadow-md
                              hover:bg-accent-800
                              focus:outline-none
                              focus:ring-2
                              focus:ring-primary-400
                              focus:ring-opacity-75
                              '
                           // style={{
                           //    position: 'absolute',
                           //    top: '1rem',
                           //    right: '1rem',
                           //    padding: '0.3rem 0.6rem',
                           //    fontSize: '0.8rem',
                           //    backgroundColor: copied ? 'bg-gray-800' : 'bg-primary-600',
                           //    color: 'white',
                           //    border: 'none',
                           //    borderRadius: '4px',
                           //    cursor: 'pointer',
                           // }}
                        >
                           {copied ? 'Copied!' : 'Copy'}
                        </button>
                     </div>
                  </div>
               ) : (
                  <p>No code provided.</p>
               )
            ) : currentDetail.imageUrl ? (
               <Image
                  src={currentDetail.imageUrl}
                  alt={currentDetail.altText || 'Image preview'}
                  width={500}
                  height={300}
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
               />
            ) : (
               <p>No content provided.</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
               <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className='py-4 px-8
                     bg-primary-600 text-white
                     font-semibold rounded-lg shadow-md
                     hover:bg-primary-700
                     focus:outline-none
                     focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75
                     disabled:bg-gray-300
                     disabled:cursor-not-allowed
                     '
                  >
                  Previous
               </button>
               <button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className='py-4 px-8
                     bg-primary-600 text-white
                     font-semibold rounded-lg shadow-md
                     hover:bg-primary-700
                     focus:outline-none
                     focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75
                     disabled:bg-gray-300
                     disabled:cursor-not-allowed
                     '
                  >
                  Next
               </button>
            </div>
         </div>
      </div>
   );
};

export default MultiStepModal;
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// interface LoaderDetails {
//   title: string;
//   subtitle?: string;
//   description?: string;
//   isCode: boolean;
//   code?: string;
//   language?: string;
//   imageUrl?: string;
//   altText?: string;
// }

// interface Props {
//   steps: LoaderDetails[];
//   onClose: () => void;
// }

// const MultiStepModal: React.FC<Props> = ({ steps, onClose }) => {
//   const [currentStep, setCurrentStep] = useState(0);

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const currentDetail = steps[currentStep];

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1000,
//       }}
//       onClick={onClose} // Close modal when clicking the backdrop
//     >
//       <div
//         onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
//         style={{
//           backgroundColor: '#fff',
//           borderRadius: '8px',
//           padding: '2rem',
//           width: '90%',
//           maxWidth: '600px',
//           overflowY: 'auto',
//           position: 'relative',
//         }}
//       >
//         <button
//           onClick={onClose}
//           style={{
//             position: 'absolute',
//             top: '1rem',
//             right: '1rem',
//             border: 'none',
//             background: 'transparent',
//             fontSize: '1.5rem',
//             cursor: 'pointer',
//           }}
//         >
//           &times;
//         </button>

//         <h1>{currentDetail.title}</h1>
//         {currentDetail.subtitle && <h2 style={{ color: '#555' }}>{currentDetail.subtitle}</h2>}
//         {currentDetail.description && <p style={{ margin: '1rem 0' }}>{currentDetail.description}</p>}

//         {currentDetail.isCode ? (
//           currentDetail.code ? (
//             <SyntaxHighlighter language={currentDetail.language} style={vscDarkPlus}>
//               {currentDetail.code}
//             </SyntaxHighlighter>
//           ) : (
//             <p>No code provided.</p>
//           )
//         ) : currentDetail.imageUrl ? (
//           <Image
//             src={currentDetail.imageUrl}
//             alt={currentDetail.altText || 'Image preview'}
//             width={500}
//             height={300}
//             style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
//           />
//         ) : (
//           <p>No content provided.</p>
//         )}

//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
//           <button
//             onClick={handlePrevious}
//             disabled={currentStep === 0}
//             style={{
//               padding: '0.5rem 1rem',
//               backgroundColor: currentStep === 0 ? '#ccc' : '#0070f3',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
//             }}
//           >
//             Previous
//           </button>
//           <button
//             onClick={handleNext}
//             disabled={currentStep === steps.length - 1}
//             style={{
//               padding: '0.5rem 1rem',
//               backgroundColor: currentStep === steps.length - 1 ? '#ccc' : '#0070f3',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiStepModal;