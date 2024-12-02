// src/app/blog/page.tsx

import Link from 'next/link';
import { supabaseClient } from '@/lib/auth';
import BlogDashboard from '@/components/BlogDashboard';

export default async function BlogList() {
  const { data: posts, error } = await supabaseClient
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    return <div>Error loading posts</div>
  }

  // Transform the posts data
  const formattedPosts = posts?.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    category: post.category || 'tech',
    date: new Date(post.created_at).toLocaleDateString(),
    slug: post.slug,
    cover_image: post.cover_image
  })) || []

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 px-4">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link
          href="/blog/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Write Post
        </Link>
      </div>

      <BlogDashboard posts={formattedPosts} />
    </div>
  )
}
// // src/app/blog/page.tsx
// import Link from 'next/link'
// import { supabaseClient } from '@/lib/auth'
// import { ImageWithFallback } from '@/components/ImageWithFallback'

// export default async function BlogList() {
//   const { data: posts, error } = await supabaseClient
//     .from('posts')
//     .select('*')
//     .eq('published', true)
//     .order('created_at', { ascending: false })

//   if (error) {
//     console.error('Supabase error:', error)
//     return <div>Error loading posts</div>
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Blog Posts</h1>
//         <Link
//           href="/blog/new"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Write PostXXX
//         </Link>
//       </div>

//       <div className="grid gap-8 md:grid-cols-2">
//         {posts?.map((post, index) => (
//           <article
//             key={post.id}
//             className="cardContainer
//                border
//                border-gray-700
//                rounded-3xl
//                overflow-hidden
//                hover:shadow-lg
//                transition-shadow
//                bg-gray-700
//                p-4
//                ">
//             {/* border: 1rem solid #4f4f4f;
//     border-radius: 1rem;
//     background: #4f4f4f; */}
//             {post.cover_image && (
//               <div className="aspect-video w-full relative rounded-2xl overflow-hidden">
//                 <ImageWithFallback
//                   src={post.cover_image}
//                   alt={post.title}
//                   className="object-cover w-full h-full"
//                   priority={index < 2} // Prioritize loading first two images
//                 />
//               </div>
//             )}
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-2">
//                 <Link
//                   href={`/blog/${post.slug}`}
//                   className="hover:text-blue-400 transition-colors"
//                 >
//                   {post.title}
//                 </Link>
//               </h2>
//               {post.excerpt && (
//                 <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
//               )}
//               <div className="text-sm text-gray-400">
//                 {new Date(post.created_at).toLocaleDateString()}
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>

//       {!posts?.length && (
//         <p className="text-center text-gray-400">No posts yet. Be the first to write one!</p>
//       )}
//     </div>
//   )
// }
// // // src/app/blog/page.tsx
// // import Link from "next/link";
// // import { supabaseClient } from "@/lib/auth";
// // import { ImageWithFallback } from "@/components/ImageWithFallback";

// // export default async function BlogList() {
// // 	const { data: posts, error } = await supabaseClient.from("posts").select("*").eq("published", true).order("created_at", { ascending: false });

// // 	if (error) {
// // 		console.error("Supabase error:", error);
// // 		return <div>Error loading posts</div>;
// // 	}

// // 	return (
// // 		<div className="max-w-4xl mx-auto">
// // 			<div className="flex justify-between items-center mb-8">
// // 				<h1 className="text-3xl font-bold">Blog Posts</h1>
// // 				<Link href="/blog/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// // 					Write Post
// // 				</Link>
// // 			</div>

// // 			<div className="grid gap-8 md:grid-cols-2">
// // 				{posts?.map((post) => (
// // 					<article key={post.id} className="border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-gray-800">
// // 						{post.cover_image && (
// // 							<div className="relative aspect-video w-full">
// // 								<ImageWithFallback
// // 									src={post.cover_image}
// // 									alt={post.title}
// // 									className="w-full h-full"
// // 									// Use priority for images above the fold
// // 									priority={index === 0}
// // 								/>
// // 							</div>
// // 						)}

// // 						<div className="p-6">
// // 							<h2 className="text-xl font-semibold mb-2">
// // 								<Link href={`/blog/${post.slug}`} className="hover:text-blue-400 transition-colors">
// // 									{post.title}
// // 								</Link>
// // 							</h2>
// // 							{post.excerpt && <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>}
// // 							<div className="text-sm text-gray-400">{new Date(post.created_at).toLocaleDateString()}</div>
// // 						</div>
// // 					</article>
// // 				))}
// // 			</div>

// // 			{!posts?.length && <p className="text-center text-gray-400">No posts yet. Be the first to write one!</p>}
// // 		</div>
// // 	);
// // }
// // // // src/app/blog/page.tsx

// // // import Link from 'next/link'
// // // import { supabaseClient } from '@/lib/auth'
// // // import BlogDashboard from '@/components/BlogDashboard'

// // // export default async function BlogList() {
// // //   const { data: posts, error } = await supabaseClient
// // //     .from('posts')
// // //     .select('*')
// // //     .eq('published', true)
// // //     .order('created_at', { ascending: false })

// // //   if (error) {
// // //     console.error('Supabase error:', error)
// // //     return <div>Error loading posts</div>
// // //   }

// // //   // Transform the posts data to match the dashboard requirements
// // //   const formattedPosts = posts?.map(post => ({
// // //     id: post.id,
// // //     title: post.title,
// // //     excerpt: post.excerpt || '',
// // //     category: post.category || 'tech', // You'll need to add category to your posts table
// // //     date: new Date(post.created_at).toLocaleDateString(),
// // //     slug: post.slug,
// // //   })) || []

// // //   return (
// // //     <div className="max-w-7xl mx-auto">
// // //       <div className="flex justify-between items-center mb-8 px-4">
// // //         <h1 className="text-3xl font-bold">Blog Posts</h1>
// // //         <Link
// // //           href="/blog/new"
// // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //         >
// // //           Write Post
// // //         </Link>
// // //       </div>

// // //       <BlogDashboard posts={formattedPosts} />
// // //     </div>
// // //   )
// // // }
// // // // // src/app/blog/page.tsx
// // // // import Link from 'next/link'
// // // // import { supabaseClient } from '@/lib/auth'

// // // // export default async function BlogList() {
// // // //   const { data: posts, error } = await supabaseClient
// // // //     .from('posts')
// // // //     .select('*')
// // // //     .eq('published', true)
// // // //     .order('created_at', { ascending: false })

// // // //   console.log('Posts:', posts)
// // // //   console.log('Error:', error)

// // // //   if (error) {
// // // //     console.error('Supabase error:', error)
// // // //     return <div>Error loading posts</div>
// // // //   }

// // // //   if (!posts?.length) {
// // // //     return (
// // // //       <div className="max-w-4xl mx-auto">
// // // //         <div className="flex justify-between items-center mb-8">
// // // //           <h1 className="text-3xl font-bold">Blog Posts</h1>
// // // //           <Link href="/blog/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// // // //             Write Post
// // // //           </Link>
// // // //         </div>
// // // //         <p>No posts yet. Be the first to write one!</p>
// // // //       </div>
// // // //     )
// // // //   }
// // // //   return (
// // // //     <div className="max-w-4xl mx-auto">
// // // //       <div className="flex justify-between items-center mb-8">
// // // //         <h1 className="text-3xl font-bold">Blog Posts</h1>
// // // //         <Link
// // // //           href="/blog/new"
// // // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // // //         >
// // // //           Write Post
// // // //         </Link>
// // // //       </div>

// // // //       <div className="space-y-8">
// // // //         {posts?.map((post) => (
// // // //           <article key={post.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
// // // //             <h2 className="text-2xl font-semibold mb-2">
// // // //               <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
// // // //                 {post.title}
// // // //               </Link>
// // // //             </h2>
// // // //             {post.excerpt && (
// // // //               <p className="text-gray-600 mb-4">{post.excerpt}</p>
// // // //             )}
// // // //             <div className="text-sm text-gray-500">
// // // //               {new Date(post.created_at).toLocaleDateString()}
// // // //             </div>
// // // //           </article>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // // // src/app/blog/page.tsx
// // // // // import Link from 'next/link'
// // // // // import { blogApi } from '@/lib/supabase'

// // // // // export default async function BlogPage() {
// // // // //   const posts = await blogApi.getAllPosts()

// // // // //   return (
// // // // //     <div className="max-w-4xl mx-auto">
// // // // //       <div className="flex justify-between items-center mb-8">
// // // // //         <h1 className="text-3xl font-bold">Blog Posts</h1>
// // // // //         <Link
// // // // //           href="/blog/new"
// // // // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // // // //         >
// // // // //           New Post
// // // // //         </Link>
// // // // //       </div>

// // // // //       <div className="space-y-8">
// // // // //         {posts.map((post) => (
// // // // //           <article key={post.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
// // // // //             <h2 className="text-2xl font-semibold mb-2">
// // // // //               <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
// // // // //                 {post.title}
// // // // //               </Link>
// // // // //             </h2>
// // // // //             {post.excerpt && (
// // // // //               <p className="text-gray-600 mb-4">{post.excerpt}</p>
// // // // //             )}
// // // // //             <div className="text-sm text-gray-500">
// // // // //               {new Date(post.created_at).toLocaleDateString()}
// // // // //             </div>
// // // // //           </article>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }
