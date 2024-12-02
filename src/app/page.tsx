// src/app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Welcome to My Blog</h1>
      <p className="text-lg mb-4">
        Exploring ideas, sharing knowledge, and documenting my journey.
      </p>
      <Link
        href="/blog"
        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Read Blog Posts
      </Link>
    </div>
  )
}

// // app/page.tsx
// import { blogApi } from '@/lib/supabase'

// export default async function Home() {
//   // Fetch posts
//   const posts = await blogApi.getAllPosts()

//   return (
//     <main className="max-w-4xl mx-auto py-8 px-4">
//       <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

//       <div className="space-y-6">
//         {posts.map((post) => (
//           <article key={post.id} className="border rounded-lg p-6">
//             <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
//             {post.excerpt && (
//               <p className="text-gray-600 mb-4">{post.excerpt}</p>
//             )}
//             <div className="text-sm text-gray-500">
//               Published on {new Date(post.created_at).toLocaleDateString()}
//             </div>
//           </article>
//         ))}
//       </div>
//     </main>
//   )
// }