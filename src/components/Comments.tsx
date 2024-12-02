// src/components/Comments.tsx
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabaseClient } from '@/lib/auth'

export function Comments({ postId }: { postId: string }) {
  const { user } = useAuth()
  const [comments, setComments] = useState<any[]>([])
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadComments()
  }, [postId])

  const loadComments = async () => {
    const { data } = await supabaseClient
      .from('comments')
      .select('*, profiles(username)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    setComments(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !content.trim()) return

    setIsSubmitting(true)
    try {
      await supabaseClient.from('comments').insert({
        content: content.trim(),
        post_id: postId,
        author_id: user.id
      })
      setContent('')
      loadComments()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
   <div className="mt-12">
     <h2 className="text-2xl font-bold mb-6 text-gray-100">Comments</h2>

     {user ? (
       <form onSubmit={handleSubmit} className="mb-8">
         <textarea
           value={content}
           onChange={(e) => setContent(e.target.value)}
           className="w-full p-2 border rounded bg-gray-800 text-gray-200 border-gray-700"
           rows={3}
           required
           placeholder="Write a comment..."
         />
         <button
           type="submit"
           disabled={isSubmitting}
           className="mt-2 bg-blue-500 text-gray-100 px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
         >
           {isSubmitting ? 'Posting...' : 'Post Comment'}
         </button>
       </form>
     ) : (
       <p className="mb-8 text-gray-300">Please sign in to comment</p>
     )}

     <div className="space-y-4">
       {comments.map((comment) => (
         <div key={comment.id} className="border border-gray-700 rounded p-4 bg-gray-800">
           <div className="text-sm text-gray-400 mb-2">
             {comment.profiles?.username || 'Anonymous'} • {' '}
             {new Date(comment.created_at).toLocaleDateString()}
           </div>
           <p className="text-gray-200">{comment.content}</p>
         </div>
       ))}
       {comments.length === 0 && (
         <p className="text-gray-400">No comments yet</p>
       )}
     </div>
   </div>
 )

//   return (
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold mb-6">Comments</h2>

//       {user ? (
//         <form onSubmit={handleSubmit} className="mb-8">
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full p-2 border rounded bg-white text-gray-900"
//             rows={3}
//             required
//             placeholder="Write a comment..."
//           />
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {isSubmitting ? 'Posting...' : 'Post Comment'}
//           </button>
//         </form>
//       ) : (
//         <p className="mb-8 text-gray-600">Please sign in to comment</p>
//       )}

//       <div className="space-y-4">
//         {comments.map((comment) => (
//           <div key={comment.id} className="border rounded p-4 bg-white">
//             <div className="text-sm text-gray-600 mb-2">
//               {comment.profiles?.username || 'Anonymous'} • {' '}
//               {new Date(comment.created_at).toLocaleDateString()}
//             </div>
//             <p>{comment.content}</p>
//           </div>
//         ))}
//         {comments.length === 0 && (
//           <p className="text-gray-500">No comments yet</p>
//         )}
//       </div>
//     </div>
//   )
// }
// 'use client'
// import { useState } from 'react'
// import { useAuth } from '@/hooks/useAuth'
// import { supabaseClient } from '@/lib/auth'

// export function Comments({ postId }: { postId: string }) {
//   const { user } = useAuth()
//   const [comments, setComments] = useState<any[]>([])
//   const [content, setContent] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const loadComments = async () => {
//     const { data } = await supabaseClient
//       .from('comments')
//       .select('*, profiles(username)')
//       .eq('post_id', postId)
//       .order('created_at', { ascending: true })

//     setComments(data || [])
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!user || !content.trim()) return

//     setIsSubmitting(true)
//     try {
//       await supabaseClient.from('comments').insert({
//         content: content.trim(),
//         post_id: postId,
//         author_id: user.id
//       })
//       setContent('')
//       loadComments()
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold mb-6">Comments</h2>

//       {user ? (
//         <form onSubmit={handleSubmit} className="mb-8">
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full p-2 border rounded bg-white text-gray-900"
//             rows={3}
//             required
//           />
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {isSubmitting ? 'Posting...' : 'Post Comment'}
//           </button>
//         </form>
//       ) : (
//         <p>Please sign in to comment</p>
//       )}

//       <div className="space-y-4">
//         {comments.map((comment) => (
//           <div key={comment.id} className="border rounded p-4">
//             <div className="text-sm text-gray-600 mb-2">
//               {comment.profiles?.username || 'Anonymous'} •
//               {new Date(comment.created_at).toLocaleDateString()}
//             </div>
//             <p>{comment.content}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }