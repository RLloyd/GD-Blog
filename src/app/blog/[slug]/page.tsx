// app/blog/[slug]/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/BlogPostContent";

export default async function BlogPostPage({ params: { slug }, searchParams }: { params: { slug: string }; searchParams: { preview?: string } }) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const query = supabase.from("posts").select("*, profiles(username)").eq("slug", slug).single();

	// Only allow preview if user is authenticated
	if (!searchParams.preview || !session) {
		query.eq("published", true);
	}

	const { data: post } = await query;

	if (!post) notFound();

	return <BlogPostContent post={post} />;
}
// // src/app/blog/[slug]/page.tsx - Server Component
// import { supabaseClient } from '@/lib/auth'
// import { notFound } from 'next/navigation'
// import BlogPostContent from '@/components/BlogPostContent'

// export default async function BlogPostPage({
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

//   return <BlogPostContent post={post} />
// }
