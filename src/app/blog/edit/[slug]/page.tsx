// app/blog/edit/[slug]/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { EditForm } from "@/components/EditForm";

export default async function EditPost({ params: { slug } }: { params: { slug: string } }) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/auth/signin");
	}

	const { data: post } = await supabase.from("posts").select("*").eq("slug", slug).eq("author_id", session.user.id).single();

	if (!post) notFound();

	return (
		<div className='max-w-4xl mx-auto'>
			<h1 className='text-3xl font-bold mb-8'>Edit Post</h1>
			<EditForm post={post} />
		</div>
	);
}

// /*-= src/app/blog/edit/[slug]/page.tsx =-*/
// import { supabaseClient } from '@/lib/auth'
// import { notFound } from 'next/navigation'
// import { EditForm } from '@/components/EditForm'

// export default async function EditPost({
//   params: { slug }
// }: {
//   params: { slug: string }
// }) {
//   const { data: post } = await supabaseClient
//     .from('posts')
//     .select('*')
//     .eq('slug', slug)
//     .single()

//   if (!post) notFound()

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
//       <EditForm post={post} />
//     </div>
//   )
// }
