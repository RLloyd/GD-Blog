// src/components/EditForm.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/auth'
import { useAuth } from '@/hooks/useAuth'
import { ImageUpload } from '@/components/ImageUpload'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'//added Rich editor for edit
import { Loader2 } from 'lucide-react'

type Post = {
  id: string
  title: string
  content: string
  excerpt?: string
  cover_image?: string
  slug: string
}

export function EditForm({ post }: { post: Post }) {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    excerpt: post.excerpt || '',
    cover_image: post.cover_image || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isImageDeleting, setIsImageDeleting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)
    setError('')

    try {
      const { error: updateError } = await supabaseClient
        .from('posts')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id)

      if (updateError) throw updateError

      router.push(`/blog/${post.slug}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageDelete = async () => {
    if (!formData.cover_image) return

    setIsImageDeleting(true)
    try {
      const path = formData.cover_image.split('/').pop()
      if (!path) throw new Error('Invalid image path')

      const { error: deleteError } = await supabaseClient.storage
        .from('images')
        .remove([`blog-images/${path}`])

      if (deleteError) throw deleteError

      setFormData(prev => ({ ...prev, cover_image: '' }))
    } catch (err) {
      setError('Failed to delete image')
      console.error('Error deleting image:', err)
    } finally {
      setIsImageDeleting(false)
    }
  }

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push(`/blog/${post.slug}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Image</label>
        {formData.cover_image ? (
          <div className="space-y-4">
            <div className="relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden">
              <ImageWithFallback
                src={formData.cover_image}
                alt="Cover image"
                className="w-full h-full"
              />
            </div>
            <button
              type="button"
              onClick={handleImageDelete}
              disabled={isImageDeleting}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
            >
              {isImageDeleting && <Loader2 className="animate-spin" size={16} />}
              {isImageDeleting ? 'Removing...' : 'Remove Image'}
            </button>
          </div>
        ) : (
          <ImageUpload
            onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Excerpt</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
          className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <RichMarkdownEditor
            initialContent={formData.content}
            onChange={(content) => setFormData(prev => ({...prev, content}))}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin" size={16} />}
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { supabaseClient } from '@/lib/auth'
// import { useAuth } from '@/hooks/useAuth'
// import { ImageUpload } from '@/components/ImageUpload'
// import { ImageWithFallback } from '@/components/ImageWithFallback'
// import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
// import { Loader2 } from 'lucide-react'

// type Post = {
//   id: string
//   title: string
//   content: string
//   excerpt?: string
//   cover_image?: string
//   slug: string
// }

// export function EditForm({ post }: { post: Post }) {
//   const router = useRouter()
//   const { user } = useAuth()
//   const [formData, setFormData] = useState({
//     title: post.title,
//     content: post.content,
//     excerpt: post.excerpt || '',
//     cover_image: post.cover_image || ''
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState('')
//   const [isImageDeleting, setIsImageDeleting] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!user) return

//     setIsSubmitting(true)
//     setError('')

//     try {
//       const { error: updateError } = await supabaseClient
//         .from('posts')
//         .update({
//           ...formData,
//           updated_at: new Date().toISOString()
//         })
//         .eq('id', post.id)

//       if (updateError) throw updateError

//       router.push(`/blog/${post.slug}`)
//       router.refresh()
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to update post')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleImageDelete = async () => {
//     if (!formData.cover_image) return

//     setIsImageDeleting(true)
//     try {
//       // Extract the file path from the URL
//       const path = formData.cover_image.split('/').pop()
//       if (!path) throw new Error('Invalid image path')

//       // Delete from Supabase Storage
//       const { error: deleteError } = await supabaseClient.storage
//         .from('images')
//         .remove([`blog-images/${path}`])

//       if (deleteError) throw deleteError

//       // Update the post to remove the cover_image
//       setFormData(prev => ({ ...prev, cover_image: '' }))
//     } catch (err) {
//       setError('Failed to delete image')
//       console.error('Error deleting image:', err)
//     } finally {
//       setIsImageDeleting(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {error && (
//         <div className="bg-red-500/10 text-red-500 p-4 rounded">
//           {error}
//         </div>
//       )}

//       <div>
//         <label className="block text-sm font-medium mb-2">Title</label>
//         <input
//           type="text"
//           value={formData.title}
//           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
//           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Cover Image</label>
//         {formData.cover_image ? (
//           <div className="space-y-4">
//             <div className="relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden">
//               <ImageWithFallback
//                 src={formData.cover_image}
//                 alt="Cover image"
//                 className="w-full h-full"
//               />
//             </div>
//             <button
//               type="button"
//               onClick={handleImageDelete}
//               disabled={isImageDeleting}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
//             >
//               {isImageDeleting && <Loader2 className="animate-spin" size={16} />}
//               {isImageDeleting ? 'Removing...' : 'Remove Image'}
//             </button>
//           </div>
//         ) : (
//           <ImageUpload
//             onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
//           />
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Excerpt</label>
//         <textarea
//           value={formData.excerpt}
//           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
//           className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Content</label>
//         <div className="border border-gray-700 rounded-lg overflow-hidden">
//           <RichMarkdownEditor
//             initialContent={formData.content}
//             onChange={(content) => setFormData(prev => ({...prev, content}))}
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
//       >
//         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
//         {isSubmitting ? 'Saving...' : 'Save Changes'}
//       </button>
//     </form>
//   )
// }
// // 'use client'
// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { supabaseClient } from '@/lib/auth'
// // import { useAuth } from '@/hooks/useAuth'
// // import { ImageUpload } from '@/components/ImageUpload'
// // import { ImageWithFallback } from '@/components/ImageWithFallback'
// // import { Loader2 } from 'lucide-react'

// // type Post = {
// //   id: string
// //   title: string
// //   content: string
// //   excerpt?: string
// //   cover_image?: string
// //   slug: string
// // }

// // export function EditForm({ post }: { post: Post }) {
// //   const router = useRouter()
// //   const { user } = useAuth()
// //   const [formData, setFormData] = useState({
// //     title: post.title,
// //     content: post.content,
// //     excerpt: post.excerpt || '',
// //     cover_image: post.cover_image || ''
// //   })
// //   const [isSubmitting, setIsSubmitting] = useState(false)
// //   const [error, setError] = useState('')
// //   const [isImageDeleting, setIsImageDeleting] = useState(false)

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!user) return

// //     setIsSubmitting(true)
// //     setError('')

// //     try {
// //       const { error: updateError } = await supabaseClient
// //         .from('posts')
// //         .update({
// //           ...formData,
// //           updated_at: new Date().toISOString()
// //         })
// //         .eq('id', post.id)

// //       if (updateError) throw updateError

// //       router.push(`/blog/${post.slug}`)
// //       router.refresh()
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Failed to update post')
// //     } finally {
// //       setIsSubmitting(false)
// //     }
// //   }

// //   const handleImageDelete = async () => {
// //     if (!formData.cover_image) return

// //     setIsImageDeleting(true)
// //     try {
// //       // Extract the file path from the URL
// //       const path = formData.cover_image.split('/').pop()
// //       if (!path) throw new Error('Invalid image path')

// //       // Delete from Supabase Storage
// //       const { error: deleteError } = await supabaseClient.storage
// //         .from('images')
// //         .remove([`blog-images/${path}`])

// //       if (deleteError) throw deleteError

// //       // Update the post to remove the cover_image
// //       setFormData(prev => ({ ...prev, cover_image: '' }))
// //     } catch (err) {
// //       setError('Failed to delete image')
// //       console.error('Error deleting image:', err)
// //     } finally {
// //       setIsImageDeleting(false)
// //     }
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-6">
// //       {error && (
// //         <div className="bg-red-500/10 text-red-500 p-4 rounded">
// //           {error}
// //         </div>
// //       )}

// //       <div>
// //         <label className="block text-sm font-medium mb-2">Title</label>
// //         <input
// //           type="text"
// //           value={formData.title}
// //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// //           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
// //           required
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium mb-2">Cover Image</label>
// //         {formData.cover_image ? (
// //           <div className="space-y-4">
// //             <div className="relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden">
// //               <ImageWithFallback
// //                 src={formData.cover_image}
// //                 alt="Cover image"
// //                 className="w-full h-full"
// //               />
// //             </div>
// //             <button
// //               type="button"
// //               onClick={handleImageDelete}
// //               disabled={isImageDeleting}
// //               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
// //             >
// //               {isImageDeleting && <Loader2 className="animate-spin" size={16} />}
// //               {isImageDeleting ? 'Removing...' : 'Remove Image'}
// //             </button>
// //           </div>
// //         ) : (
// //           <ImageUpload
// //             onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
// //           />
// //         )}
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// //         <textarea
// //           value={formData.excerpt}
// //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// //           className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium mb-2">Content (Markdown supported)</label>
// //         <textarea
// //           value={formData.content}
// //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// //           className="w-full p-2 border rounded h-64 bg-gray-800 border-gray-700 text-gray-100 font-mono"
// //           required
// //         />
// //       </div>

// //       <button
// //         type="submit"
// //         disabled={isSubmitting}
// //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
// //       >
// //         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
// //         {isSubmitting ? 'Saving...' : 'Save Changes'}
// //       </button>
// //     </form>
// //   )
// // }