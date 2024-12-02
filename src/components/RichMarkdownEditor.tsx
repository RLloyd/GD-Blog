// src/components/RichMarkdownEditor.tsx
'use client'
import { useState, useRef } from 'react'
import { supabaseClient } from '@/lib/auth'
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  Bold,
  Italic,
  Heading,
  List,
  ListOrdered,
  Link as LinkIcon,
  Quote,
  Code,
  Minus,
  AlertCircle
} from 'lucide-react'

interface EditorProps {
  initialContent: string
  onChange: (content: string) => void
}

type FormatAction = {
  icon: typeof Bold
  label: string
  prefix: string
  suffix: string
  block?: boolean
}

export function RichMarkdownEditor({ initialContent, onChange }: EditorProps) {
  const [content, setContent] = useState(initialContent)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatActions: FormatAction[] = [
    { icon: Bold, label: 'Bold', prefix: '**', suffix: '**' },
    { icon: Italic, label: 'Italic', prefix: '_', suffix: '_' },
    { icon: Heading, label: 'Heading', prefix: '## ', suffix: '', block: true },
    { icon: List, label: 'Bullet List', prefix: '- ', suffix: '', block: true },
    { icon: ListOrdered, label: 'Numbered List', prefix: '1. ', suffix: '', block: true },
    { icon: LinkIcon, label: 'Link', prefix: '[', suffix: '](url)' },
    { icon: Quote, label: 'Quote', prefix: '> ', suffix: '', block: true },
    { icon: Code, label: 'Code', prefix: '```\n', suffix: '\n```', block: true },
    { icon: Minus, label: 'Horizontal Rule', prefix: '\n---\n', suffix: '', block: true }
  ]

  const insertTextAtCursor = (prefix: string, suffix: string = '', block: boolean = false) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let newText = ''
    if (block) {
      // For block-level elements, ensure we're starting on a new line
      const beforeSelection = content.substring(0, start)
      const needsNewLine = beforeSelection.length > 0 && !beforeSelection.endsWith('\n')
      newText = (needsNewLine ? '\n' : '') + prefix + selectedText + suffix
    } else {
      newText = prefix + selectedText + suffix
    }

    const newContent =
      content.substring(0, start) +
      newText +
      content.substring(end)

    setContent(newContent)
    onChange(newContent)

    // Reset cursor position
    const newCursorPos = block ?
      start + prefix.length + selectedText.length + suffix.length :
      start + prefix.length + (selectedText.length || suffix.length)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    setIsUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { error: uploadError, data } = await supabaseClient
        .storage
        .from('images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(fileName)

      insertTextAtCursor(`\n![${file.name}](${publicUrl})\n`)
    } catch (err) {
      console.error('Upload error:', err)
      alert('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="relative">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-700 bg-gray-800">
        {formatActions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => insertTextAtCursor(action.prefix, action.suffix, action.block)}
            className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded"
            title={action.label}
          >
            <action.icon size={18} />
          </button>
        ))}
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded"
          disabled={isUploading}
          title="Upload Image"
        >
          {isUploading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <ImageIcon size={18} />
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowHelp(prev => !prev)}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded ml-auto"
          title="Markdown Help"
        >
          <AlertCircle size={18} />
        </button>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="absolute right-0 top-12 w-64 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
          <h3 className="font-medium mb-2">Markdown Shortcuts</h3>
          <div className="space-y-1 text-sm text-gray-300">
            <p>**bold**</p>
            <p>_italic_</p>
            <p># Heading 1</p>
            <p>## Heading 2</p>
            <p>- Bullet list</p>
            <p>1. Numbered list</p>
            <p>[Link](url)</p>
            <p>![Image](url)</p>
            <p>&gt; Quote</p>
            <p>`code`</p>
          </div>
        </div>
      )}

      {/* Editor Area */}
      <div
        className={`relative ${dragActive ? 'bg-blue-500/10' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          const file = e.dataTransfer.files[0]
          if (file) handleImageUpload(file)
        }}
      >
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            onChange(e.target.value)
          }}
          onPaste={(e) => {
            const items = e.clipboardData.items
            for (const item of items) {
              if (item.type.startsWith('image/')) {
                e.preventDefault()
                const file = item.getAsFile()
                if (file) handleImageUpload(file)
                break
              }
            }
          }}
          className="w-full min-h-[300px] p-4 bg-gray-800 text-gray-100 font-mono text-sm resize-y focus:outline-none"
          placeholder="Write your content here... You can drag & drop images or paste them directly!"
        />
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleImageUpload(file)
        }}
      />
    </div>
  )
}
// 'use client'
// import { useState, useRef } from 'react'
// import { supabaseClient } from '@/lib/auth'
// import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react'
// import Image from 'next/image'

// interface EditorProps {
//   initialContent: string
//   onChange: (content: string) => void
// }

// export function RichMarkdownEditor({ initialContent, onChange }: EditorProps) {
//   const [content, setContent] = useState(initialContent)
//   const [isUploading, setIsUploading] = useState(false)
//   const [dragActive, setDragActive] = useState(false)
//   const textareaRef = useRef<HTMLTextAreaElement>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const insertTextAtCursor = (text: string) => {
//     const textarea = textareaRef.current
//     if (!textarea) return

//     const start = textarea.selectionStart
//     const end = textarea.selectionEnd
//     const newContent = content.substring(0, start) + text + content.substring(end)

//     setContent(newContent)
//     onChange(newContent)

//     // Reset cursor position
//     setTimeout(() => {
//       textarea.focus()
//       textarea.setSelectionRange(start + text.length, start + text.length)
//     }, 0)
//   }

//   const handleImageUpload = async (file: File) => {
//     if (!file.type.startsWith('image/')) {
//       alert('Please select an image file')
//       return
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       alert('Image must be less than 5MB')
//       return
//     }

//     setIsUploading(true)

//     try {
//       const fileExt = file.name.split('.').pop()
//       const fileName = `${Date.now()}.${fileExt}`

//       const { error: uploadError, data } = await supabaseClient
//         .storage
//         .from('images')
//         .upload(fileName, file, {
//           cacheControl: '3600',
//           upsert: false
//         })

//       if (uploadError) throw uploadError

//       const { data: { publicUrl } } = supabaseClient
//         .storage
//         .from('images')
//         .getPublicUrl(fileName)

//       insertTextAtCursor(`\n![${file.name}](${publicUrl})\n`)
//     } catch (err) {
//       console.error('Upload error:', err)
//       alert('Failed to upload image')
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <div className="relative">
//       {/* Toolbar */}
//       <div className="flex items-center gap-2 p-2 border-b border-gray-700">
//         <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded"
//           disabled={isUploading}
//         >
//           {isUploading ? (
//             <Loader2 className="animate-spin" size={16} />
//           ) : (
//             <ImageIcon size={16} />
//           )}
//           Add Image
//         </button>
//       </div>

//       {/* Editor Area */}
//       <div
//         className={`relative ${dragActive ? 'bg-blue-500/10' : ''}`}
//         onDragOver={(e) => {
//           e.preventDefault()
//           setDragActive(true)
//         }}
//         onDragLeave={() => setDragActive(false)}
//         onDrop={(e) => {
//           e.preventDefault()
//           setDragActive(false)
//           const file = e.dataTransfer.files[0]
//           if (file) handleImageUpload(file)
//         }}
//       >
//         <textarea
//           ref={textareaRef}
//           value={content}
//           onChange={(e) => {
//             setContent(e.target.value)
//             onChange(e.target.value)
//           }}
//           onPaste={(e) => {
//             const items = e.clipboardData.items
//             for (const item of items) {
//               if (item.type.startsWith('image/')) {
//                 e.preventDefault()
//                 const file = item.getAsFile()
//                 if (file) handleImageUpload(file)
//                 break
//               }
//             }
//           }}
//           className="w-full min-h-[300px] p-4 bg-gray-800 text-gray-100 font-mono text-sm resize-y focus:outline-none"
//           placeholder="Write your content here... You can drag & drop images or paste them directly!"
//         />
//       </div>

//       {/* Hidden file input */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         className="hidden"
//         accept="image/*"
//         onChange={(e) => {
//           const file = e.target.files?.[0]
//           if (file) handleImageUpload(file)
//         }}
//       />
//     </div>
//   )
// }
// // 'use client'
// // import { useState, useRef } from 'react'
// // import { supabaseClient } from '@/lib/auth'
// // import { Upload, Image as ImageIcon, X, Plus } from 'lucide-react'
// // import Image from 'next/image'

// // interface EditorProps {
// //   initialContent: string
// //   onChange: (content: string) => void
// // }

// // export function RichMarkdownEditor({ initialContent, onChange }: EditorProps) {
// //   const [content, setContent] = useState(initialContent)
// //   const [isUploading, setIsUploading] = useState(false)
// //   const [dragActive, setDragActive] = useState(false)
// //   const textareaRef = useRef<HTMLTextAreaElement>(null)
// //   const fileInputRef = useRef<HTMLInputElement>(null)

// //   const insertTextAtCursor = (text: string) => {
// //     const textarea = textareaRef.current
// //     if (!textarea) return

// //     const start = textarea.selectionStart
// //     const end = textarea.selectionEnd

// //     const newContent =
// //       content.substring(0, start) +
// //       text +
// //       content.substring(end)

// //     setContent(newContent)
// //     onChange(newContent)

// //     // Reset cursor position
// //     setTimeout(() => {
// //       textarea.focus()
// //       textarea.setSelectionRange(
// //         start + text.length,
// //         start + text.length
// //       )
// //     }, 0)
// //   }

// //   const handleImageUpload = async (file: File) => {
// //     if (!file.type.startsWith('image/')) {
// //       alert('Please select an image file')
// //       return
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       alert('Image must be less than 5MB')
// //       return
// //     }

// //     setIsUploading(true)

// //     try {
// //       const fileExt = file.name.split('.').pop()
// //       const fileName = `${Date.now()}.${fileExt}`

// //       const { error: uploadError, data } = await supabaseClient
// //         .storage
// //         .from('images')
// //         .upload(fileName, file, {
// //           cacheControl: '3600',
// //           upsert: false
// //         })

// //       if (uploadError) throw uploadError

// //       const { data: { publicUrl } } = supabaseClient
// //         .storage
// //         .from('images')
// //         .getPublicUrl(fileName)

// //       // Insert markdown image syntax at cursor
// //       insertTextAtCursor(`\n![${file.name}](${publicUrl})\n`)
// //     } catch (err) {
// //       console.error('Upload error:', err)
// //       alert('Failed to upload image')
// //     } finally {
// //       setIsUploading(false)
// //     }
// //   }

// //   const handleDrop = async (e: React.DragEvent) => {
// //     e.preventDefault()
// //     setDragActive(false)

// //     const file = e.dataTransfer.files[0]
// //     if (file) {
// //       await handleImageUpload(file)
// //     }
// //   }

// //   const handlePaste = async (e: React.ClipboardEvent) => {
// //     const items = e.clipboardData.items
// //     for (const item of items) {
// //       if (item.type.startsWith('image/')) {
// //         e.preventDefault()
// //         const file = item.getAsFile()
// //         if (file) {
// //           await handleImageUpload(file)
// //         }
// //         break
// //       }
// //     }
// //   }

// //   return (
// //     <div className="space-y-2">
// //       <div className="flex gap-2">
// //         <button
// //           type="button"
// //           onClick={() => fileInputRef.current?.click()}
// //           className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-md"
// //         >
// //           <ImageIcon size={16} />
// //           Add Image
// //         </button>
// //       </div>

// //       <div
// //         className={`relative border rounded-md ${
// //           dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700'
// //         }`}
// //         onDragOver={(e) => {
// //           e.preventDefault()
// //           setDragActive(true)
// //         }}
// //         onDragLeave={() => setDragActive(false)}
// //         onDrop={handleDrop}
// //       >
// //         <textarea
// //           ref={textareaRef}
// //           value={content}
// //           onChange={(e) => {
// //             setContent(e.target.value)
// //             onChange(e.target.value)
// //           }}
// //           onPaste={handlePaste}
// //           className="w-full h-64 p-4 bg-transparent resize-y font-mono text-sm focus:outline-none"
// //           placeholder="Write your content here... You can drag & drop images or paste them directly!"
// //         />

// //         {isUploading && (
// //           <div className="absolute inset-0 flex items-center justify-center bg-black/50">
// //             <div className="text-white">Uploading image...</div>
// //           </div>
// //         )}

// //         <input
// //           ref={fileInputRef}
// //           type="file"
// //           className="hidden"
// //           accept="image/*"
// //           onChange={(e) => {
// //             const file = e.target.files?.[0]
// //             if (file) handleImageUpload(file)
// //           }}
// //         />
// //       </div>

// //       {dragActive && (
// //         <div className="absolute inset-0 bg-black/20 pointer-events-none" />
// //       )}
// //     </div>
// //   )
// // }