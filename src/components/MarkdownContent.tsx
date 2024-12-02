// src/components/MarkdownContent.tsx
'use client'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Prism from 'prismjs'
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-css"
import "prismjs/components/prism-python"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"

export function MarkdownContent({ content }: { content: string }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [content])

  return (
    <div className="prose prose-invert prose-lg max-w-none
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
      prose-blockquote:border-gray-500 prose-blockquote:text-gray-300"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''

            if (!inline && language) {
              return (
                <pre className={`language-${language}`}>
                  <code className={`language-${language}`} {...props}>
                    {String(children).replace(/\n$/, '')}
                  </code>
                </pre>
              )
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// // src/components/MarkdownContent.tsx
// 'use client'
// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'

// export function MarkdownContent({ content }: { content: string }) {
//   return (
//     <div className="prose prose-invert prose-lg max-w-none
//       prose-h1:text-4xl prose-h1:font-serif prose-h1:text-gray-100 prose-h1:mb-6
//       prose-h2:text-3xl prose-h2:font-serif prose-h2:text-gray-200 prose-h2:mb-4
//       prose-h3:text-2xl prose-h3:font-serif prose-h3:text-gray-200 prose-h3:mb-3
//       prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4
//       prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
//       prose-strong:text-gray-200
//       prose-ul:text-gray-300
//       prose-ol:text-gray-300
//       prose-code:bg-gray-800 prose-code:text-gray-200
//       prose-pre:bg-gray-800 prose-pre:text-gray-200
//       prose-blockquote:border-gray-500 prose-blockquote:text-gray-300"
//     >
//       <ReactMarkdown remarkPlugins={[remarkGfm]}>
//         {content}
//       </ReactMarkdown>
//     </div>
//   )
// }

// // // src/components/MarkdownContent.tsx
// // 'use client'
// // import ReactMarkdown from 'react-markdown'
// // import remarkGfm from 'remark-gfm'

// // export function MarkdownContent({ content }: { content: string }) {
// //   return (
// //     <div className="prose prose-lg prose-slate max-w-none
// //       prose-headings:font-bold
// //       prose-h1:text-3xl prose-h1:mb-4
// //       prose-h2:text-2xl prose-h2:mb-3
// //       prose-h3:text-xl prose-h3:mb-2
// //       prose-p:mb-4
// //       prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
// //       prose-strong:text-gray-900
// //       prose-ul:list-disc prose-ul:pl-4
// //       prose-ol:list-decimal prose-ol:pl-4
// //       prose-li:mb-1
// //       prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
// //       prose-pre:bg-gray-100 prose-pre:p-4
// //       prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
// //       prose-img:rounded-lg prose-img:shadow-md"
// //     >
// //       <ReactMarkdown remarkPlugins={[remarkGfm]}>
// //         {content}
// //       </ReactMarkdown>
// //     </div>
// //   )
// // }

// // // // src/components/MarkdownContent.tsx
// // // 'use client'
// // // import ReactMarkdown from 'react-markdown'
// // // import remarkGfm from 'remark-gfm'

// // // export function MarkdownContent({ content }: { content: string }) {
// // //   console.log('Markdown content:', content)
// // //   return (
// // //     <div className="prose prose-lg max-w-none">
// // //       <ReactMarkdown
// // //         remarkPlugins={[remarkGfm]}
// // //         components={{
// // //           h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
// // //           h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3" {...props} />,
// // //           p: ({node, ...props}) => <p className="my-2" {...props} />,
// // //         }}
// // //       >
// // //         {content}
// // //       </ReactMarkdown>
// // //     </div>
// // //   )
// // // }



// // // // // First install:
// // // // // npm install react-markdown remark-gfm

// // // // // src/components/MarkdownContent.tsx
// // // // 'use client'
// // // // import ReactMarkdown from 'react-markdown'
// // // // import remarkGfm from 'remark-gfm'

// // // // export function MarkdownContent({ content }: { content: string }) {
// // // //   return (
// // // //     <ReactMarkdown
// // // //       remarkPlugins={[remarkGfm]}
// // // //       className="prose prose-blue max-w-none"
// // // //       components={{
// // // //         // Custom components for markdown elements
// // // //         h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
// // // //         h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3" {...props} />,
// // // //         h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2" {...props} />,
// // // //         a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
// // // //         code: ({node, inline, ...props}) =>
// // // //           inline ?
// // // //             <code className="bg-gray-100 rounded px-1" {...props} /> :
// // // //             <code className="block bg-gray-100 p-4 rounded my-2" {...props} />
// // // //       }}
// // // //     />
// // // //   )
// // // // }

