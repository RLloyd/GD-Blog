// src/app/blog/[slug]/page.tsx
import { supabaseClient } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarkdownContent } from "@/components/MarkdownContent";
import { DeletePost } from "@/components/DeletePost";
import { Comments } from "@/components/Comments";
import { Reactions } from "@/components/Reactions";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default async function BlogPost({ params: { slug } }: { params: { slug: string } }) {
	const { data: post } = await supabaseClient.from("posts").select("*, profiles(username)").eq("slug", slug).single();

	if (!post) notFound();

	return (
		<article className="max-w-3xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<Link href="/blog" className="text-blue-400 hover:text-blue-300">
					← Back to posts
				</Link>
				<div className="space-x-4">
					<Link href={`/blog/edit/${slug}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
						Edit Post
					</Link>
					<DeletePost postId={post.id} />
				</div>
			</div>

			{post.cover_image && (
				<div className="relative rounded-lg overflow-hidden mb-8 aspect-video">
					<ImageWithFallback
						src={post.cover_image}
						alt={post.title}
						className="w-full h-full"
						// Use priority since this is the main post image
						priority
					/>
				</div>
			)}

			<header className="mb-8">
				<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
				<div className="text-gray-400">
					{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
				</div>
			</header>

			{post.excerpt && <p className="text-xl text-gray-300 mb-8 font-serif italic">{post.excerpt}</p>}

			<div className="prose prose-lg max-w-none">
				<MarkdownContent content={post.content} />
			</div>

			<div className="mt-8 border-t border-gray-700 pt-8">
				<Reactions postId={post.id} />
			</div>

			<Comments postId={post.id} />
		</article>
	);
}
// // src/app/blog/[slug]/page.tsx
// import { supabaseClient } from '@/lib/auth'
// import { notFound } from 'next/navigation'
// import Link from 'next/link'
// import { MarkdownContent } from '@/components/MarkdownContent'
// import { DeletePost } from '@/components/DeletePost'
// import { Comments } from '@/components/Comments'
// import { Reactions } from '@/components/Reactions'

// export default async function BlogPost({
//   params: { slug }
// }: {
//   params: { slug: string }
// }) {
//   const { data: post } = await supabaseClient
//     .from('posts')
//     .select('*, profiles(username)')
//     .eq('slug', slug)
//     .single()

//   if (!post) notFound()

//   return (
//     <article className="max-w-3xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <Link href="/blog" className="text-blue-500 hover:text-blue-600">
//           ← Back to posts
//         </Link>
//         <div className="space-x-4">
//           <Link
//             href={`/blog/edit/${slug}`}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Edit Post
//           </Link>
//           <DeletePost postId={post.id} />
//         </div>
//       </div>

//       <header className="mb-8">
//         <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
//         <div className="text-gray-600">
//           {new Date(post.created_at).toLocaleDateString()}
//         </div>
//       </header>

//       {post.excerpt && (
//         <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
//       )}

//       <div className="prose prose-lg max-w-none">
//         <MarkdownContent content={post.content} />

//         {/*---= Reactions =---*/}
//         <div className="mt-8">
//             <Reactions postId={post.id} />
//          </div>
//       </div>
//       <Comments postId={post.id} />
//     </article>
//   )
// }

// // // src/app/blog/[slug]/page.tsx
// // import { supabaseClient } from '@/lib/auth'
// // import { notFound } from 'next/navigation'
// // import Link from 'next/link'
// // import { MarkdownContent } from '@/components/MarkdownContent'

// // export default async function BlogPost({
// //   params: { slug }
// // }: {
// //   params: { slug: string }
// // }) {
// //   const { data: post } = await supabaseClient
// //     .from('posts')
// //     .select('*, profiles(username)')
// //     .eq('slug', slug)
// //     .single()

// //   if (!post) notFound()

// //   return (
// //     <article className="max-w-3xl mx-auto">
// //       <div className="flex justify-between items-center mb-8">
// //         <Link href="/blog" className="text-blue-500 hover:text-blue-600">
// //           ← Back to posts
// //         </Link>
// //         <Link
// //           href={`/blog/edit/${slug}`}
// //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //         >
// //           Edit Post
// //         </Link>
// //       </div>

// //       <header className="mb-8">
// //         <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// //         <div className="text-gray-600">
// //           {new Date(post.created_at).toLocaleDateString()}
// //         </div>
// //       </header>

// //       {post.excerpt && (
// //         <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
// //       )}

// //       <div className="prose prose-lg max-w-none">
// //         <MarkdownContent content={post.content} />
// //       </div>
// //     </article>
// //   )
// // }
// // // // src/app/blog/[slug]/page.tsx
// // // import { supabaseClient } from '@/lib/auth'
// // // import { notFound } from 'next/navigation'
// // // import Link from 'next/link'
// // // import { MarkdownContent } from '@/components/MarkdownContent'

// // // export default async function BlogPost({
// // //   params
// // // }: {
// // //   params: { slug: string }
// // // }) {
// // //   const slug = await Promise.resolve(params.slug)

// // //   const { data: post } = await supabaseClient
// // //     .from('posts')
// // //     .select('*, profiles(username)')
// // //     .eq('slug', slug)
// // //     .single()

// // //   if (!post) {
// // //     notFound()
// // //   }

// // //   console.log('Post data:', post)

// // //   return (
// // //     <article className="max-w-3xl mx-auto">
// // //       <Link href="/blog" className="text-blue-500 hover:text-blue-600 mb-8 inline-block">
// // //         ← Back to posts
// // //       </Link>

// // //       <header className="mb-8">
// // //         <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// // //         <div className="text-gray-600">
// // //           {new Date(post.created_at).toLocaleDateString()}
// // //         </div>
// // //       </header>

// // //       {post.excerpt && (
// // //         <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
// // //       )}

// // //       <div className="prose prose-lg max-w-none">
// // //         <MarkdownContent content={post.content} />
// // //       </div>
// // //     </article>
// // //   )
// // // }

// // // // // src/app/blog/[slug]/page.tsx
// // // // import { supabaseClient } from '@/lib/auth'
// // // // import { notFound } from 'next/navigation'
// // // // import Link from 'next/link'
// // // // import { MarkdownContent } from '@/components/MarkdownContent'

// // // // export default async function BlogPost({
// // // //   params: { slug }
// // // // }: {
// // // //   params: { slug: string }
// // // // }) {
// // // //   const { data: post } = await supabaseClient
// // // //     .from('posts')
// // // //     .select('*, profiles(username)')
// // // //     .eq('slug', slug)
// // // //     .single()

// // // //   if (!post) {
// // // //     notFound()
// // // //   }

// // // //   return (
// // // //     <article className="max-w-3xl mx-auto">
// // // //       <Link
// // // //         href="/blog"
// // // //         className="text-blue-500 hover:text-blue-600 mb-8 inline-block"
// // // //       >
// // // //         ← Back to posts
// // // //       </Link>

// // // //       <header className="mb-8">
// // // //         <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// // // //         <div className="text-gray-600">
// // // //           {new Date(post.created_at).toLocaleDateString()} ·
// // // //           {post.profiles?.username || 'Anonymous'}
// // // //         </div>
// // // //       </header>

// // // //       {post.excerpt && (
// // // //         <p className="text-xl text-gray-600 mb-8">
// // // //           {post.excerpt}
// // // //         </p>
// // // //       )}

// // // //       <div className="prose max-w-none">
// // // //          <MarkdownContent content={post.content} />
// // // //       </div>
// // // //     </article>
// // // //   )
// // // // }

// // // // // // src/app/blog/[slug]/page.tsx
// // // // // import { blogApi } from '@/lib/supabase'
// // // // // import { notFound } from 'next/navigation'

// // // // // export default async function BlogPost({
// // // // //   params: { slug }
// // // // // }: {
// // // // //   params: { slug: string }
// // // // // }) {
// // // // //   try {
// // // // //     const post = await blogApi.getPostBySlug(slug)

// // // // //     if (!post) {
// // // // //       notFound()
// // // // //     }

// // // // //     return (
// // // // //       <article className="max-w-3xl mx-auto">
// // // // //         <header className="mb-8">
// // // // //           <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// // // // //           <div className="text-gray-600">
// // // // //             {new Date(post.created_at).toLocaleDateString()}
// // // // //           </div>
// // // // //         </header>

// // // // //         <div className="prose max-w-none">
// // // // //           {post.content}
// // // // //         </div>
// // // // //       </article>
// // // // //     )
// // // // //   } catch (error) {
// // // // //     notFound()
// // // // //   }
// // // // // }
