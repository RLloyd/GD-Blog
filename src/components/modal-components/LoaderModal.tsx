/*---= src/components/modal-components/LoaderModal.tsx =---*/
/*-= Loader Illustration Modal Component • Typed Loader Modal Component =-*/
"use client";
import React from 'react';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export interface LoaderDetails {
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
  loaderDetail: LoaderDetails;
  onClose: () => void; // Callback to close the modal
}

const LoaderModal: React.FC<Props> = ({ loaderDetail, onClose }) => {
  const {
    title,
    subtitle,
    description,
    isCode,
    code,
    language = 'typescript',
    imageUrl,
    altText = 'Image preview',
  } = loaderDetail;

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
        <h1>{title}</h1>
        {subtitle && <h2 style={{ color: '#555' }}>{subtitle}</h2>}
        {description && <p style={{ margin: '1rem 0' }}>{description}</p>}
        {isCode ? (
          code ? (
            <SyntaxHighlighter language={language} style={vscDarkPlus}>
              {code}
            </SyntaxHighlighter>
          ) : (
            <p>No code provided.</p>
          )
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={altText}
            width={500}
            height={300}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        ) : (
          <p>No image provided.</p>
        )}
      </div>
    </div>
  );
};

export default LoaderModal;

// import React, { useState, useCallback, useEffect } from 'react';
// import { X, ChevronLeft, ChevronRight, Code } from 'lucide-react';
// import Image from 'next/image';

// export interface LoaderDetails {
//    title: string;
//    subtitle?: string;
//    description: string;
//    isCode: boolean;
//    code: string;
//    language: 'typescript' | 'javascript' | 'css' | 'html';
//    //   preview: React.ReactNode;
//    imageUrl?: string;
//    altText?: string;
// }

// interface LoaderModalProps {
//    isOpen: boolean;
//    onClose: () => void;
//    loaderDetails: LoaderDetails[];
//    initialIndex?: number;
// }

// const LoaderModal: React.FC<LoaderModalProps> = ({
//    isOpen,
//    onClose,
//    loaderDetails,
//    initialIndex = 0
//    }) => {
//    const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
//    const [showCode, setShowCode] = useState<boolean>(false);

//    // Reset state when modal closes
//    useEffect(() => {
//       if (!isOpen) {
//          setShowCode(false);
//          setCurrentIndex(initialIndex);
//       }
//    }, [isOpen, initialIndex]);

//    // Handle keyboard navigation
//    useEffect(() => {
//       const handleKeyDown = (event: KeyboardEvent) => {
//          if (!isOpen) return;

//          switch (event.key) {
//             case 'Escape':
//                onClose();
//                break;
//             case 'ArrowLeft':
//                handlePrevious();
//                break;
//             case 'ArrowRight':
//                handleNext();
//                break;
//             case 'c':
//                if (event.ctrlKey || event.metaKey) {
//                   setShowCode(prev => !prev);
//                }
//                break;
//             default:
//                break;
//          }
//       };

//       window.addEventListener('keydown', handleKeyDown);
//       return () => window.removeEventListener('keydown', handleKeyDown);
//    }, [isOpen, onClose]);

//    const handlePrevious = useCallback(() => {
//       setCurrentIndex(prev => (prev === 0 ? loaderDetails.length - 1 : prev - 1));
//       setShowCode(false);
//    }, [loaderDetails.length]);

//    const handleNext = useCallback(() => {
//       setCurrentIndex(prev => (prev === loaderDetails.length - 1 ? 0 : prev + 1));
//       setShowCode(false);
//    }, [loaderDetails.length]);

//    // Early return if modal is closed
//    if (!isOpen) return null;

//    const currentLoader = loaderDetails[currentIndex];

//    return (
//       <div
//          className="fixed inset-0 z-50 flex items-center justify-center p-4"
//          role="dialog"
//          aria-modal="true"
//          aria-labelledby="modal-title"
//       >
//          {/* Backdrop */}
//          <div
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={onClose}
//             role="button"
//             tabIndex={-1}
//             aria-label="Close modal"
//          />

//          {/* Modal */}
//          <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col shadow-xl">
//             {/* Header */}
//             <div className="flex justify-between items-center p-[2rem] border-b dark:border-gray-700">
//                <div className='modalHeadersContainer'>
//                   <h1 id="modal-title" className="text-4xl font-semibold text-gray-900 dark:text-white mb-0">
//                      {currentLoader.title}
//                   </h1>
//                   <p className="text-xl font-normal text-gray-900 dark:text-white m-0">{currentLoader.subtitle}</p>
//                </div>
//                <div className="flex items-center gap-2">
//                   <button
//                      onClick={() => setShowCode(!showCode)}
//                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
//                      aria-label={showCode ? "Show preview" : "Show code"}
//                      title={showCode ? "Show preview" : "Show code"}
//                   >
//                      <Code size={20} />
//                   </button>
//                   <button
//                      onClick={onClose}
//                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
//                      aria-label="Close modal"
//                   >
//                      <X size={20} />
//                   </button>
//                </div>
//             </div>

//             {/* Content */}
//             <div className="flex-1 overflow-y-auto p-6">
//                {/* {showCode ? (
//                   <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
//                      <code className={`language-${currentLoader.language} text-gray-100`}>
//                         {currentLoader.code}
//                      </code>
//                   </pre>
//                ) : ( */}
//                   {!isCode ? (
//                      // <div className="space-y-6">
//                      <div className="">
//                         <p className="text-gray-600 dark:text-gray-300">
//                            {/* {currentLoader.description} */}
//                         </p>
//                         <div className="flex flex-col items-start justify-center px-10 bg-white dark:bg-gray-900 rounded-lg">
//                            {/* {currentLoader.preview} */}
//                            <p className='text-gray-600 dark:text-gray-300 text-start m-0'>
//                            {currentLoader.description}
//                            </p>
//                            <Image
//                               src={currentLoader.imageUrl}
//                               alt={currentLoader.altText}
//                               width={600}
//                               height={200}
//                               style={{ borderRadius: '8px' }}
//                            />
//                         </div>
//                      </div>
//                   ) : (
//                      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
//                      <code className={`language-${currentLoader.language} text-gray-100`}>
//                         {currentLoader.code}
//                      </code>
//                   </pre>
//                   )}
//                )}
//             </div>

//             {/* Footer */}
//             <div className="flex justify-between items-center p-4 border-t dark:border-gray-700">
//                <button
//                   onClick={handlePrevious}
//                   className="flex items-center gap-2 px-3 py-2 border border-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                   aria-label="Previous loader"
//                >
//                   <ChevronLeft size={16} />
//                   Previous
//                </button>

//                <div className="text-sm text-gray-500" aria-live="polite">
//                   {currentIndex + 1} of {loaderDetails.length}
//                </div>

//                <button
//                   onClick={handleNext}
//                   className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                   aria-label="Next loader"
//                >
//                   Next
//                   <ChevronRight size={16} />
//                </button>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default LoaderModal;