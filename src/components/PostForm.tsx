// src/components/PostForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { ImageUpload } from "@/components/ImageUpload";
import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
import { Loader2 } from "lucide-react";
import { categories, CategoryId } from "@/data/categories";

export function PostForm() {
	const router = useRouter();
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		excerpt: "",
		cover_image: "",
		category: "tech" as CategoryId,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;

		setIsSubmitting(true);
		setError("");

		try {
			const slug = formData.title
				.toLowerCase()
				.trim()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)+/g, "");

			const { error: postError } = await supabaseClient.from("posts").insert([
				{
					...formData,
					slug,
					published: true,
					author_id: user.id,
				},
			]);

			if (postError) throw postError;

			// Call revalidation API
			await fetch("/api/revalidate", { method: "POST" });
			router.push("/blog");
		} catch (err) {
			console.error("Error:", err);
			setError(err instanceof Error ? err.message : "Failed to create post");
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && <div className="bg-red-500/10 text-red-500 p-4 rounded">{error}</div>}

			<div>
				<label className="block text-sm font-medium mb-2">Title</label>
				<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100" required />
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Category</label>
				<select value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))} className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100" required>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Cover Image</label>
				<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Excerpt</label>
				<textarea value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100" />
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Content</label>
				<div className="border border-gray-700 rounded-lg overflow-hidden">
					<RichMarkdownEditor initialContent={formData.content} onChange={(content) => setFormData((prev) => ({ ...prev, content }))} />
				</div>
			</div>

			<button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2">
				{isSubmitting && <Loader2 className="animate-spin" size={16} />}
				{isSubmitting ? "Creating..." : "Create Post"}
			</button>
		</form>
	);
}
// // src/components/PostForm.tsx
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseClient } from "@/lib/auth";
// import { useAuth } from "@/hooks/useAuth";
// import { ImageUpload } from "@/components/ImageUpload";
// import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// import { Loader2 } from "lucide-react";
// import { categories, CategoryId } from "@/data/categories";

// export function PostForm() {
// 	const router = useRouter();
// 	const { user } = useAuth();
// 	const [formData, setFormData] = useState({
// 		title: "",
// 		content: "",
// 		excerpt: "",
// 		cover_image: "",
// 		category: "tech" as CategoryId,
// 	});
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [error, setError] = useState("");

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!user) return;

// 		setIsSubmitting(true);
// 		setError("");

// 		try {
// 			const slug = formData.title
// 				.toLowerCase()
// 				.trim()
// 				.replace(/[^a-z0-9]+/g, "-")
// 				.replace(/(^-|-$)+/g, "");

// 			const { error: postError } = await supabaseClient.from("posts").insert([
// 				{
// 					...formData,
// 					slug,
// 					published: true,
// 					author_id: user.id,
// 				},
// 			]);

// 			if (postError) throw postError;

// 			// Force revalidation of the blog page
// 			await fetch("/blog", { method: "GET", cache: "no-store" });
// 			router.refresh();
// 			router.push("/blog");
// 		} catch (err) {
// 			console.error("Error:", err);
// 			setError(err instanceof Error ? err.message : "Failed to create post");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	return (
// 		<form onSubmit={handleSubmit} className="space-y-6">
// 			{error && <div className="bg-red-500/10 text-red-500 p-4 rounded">{error}</div>}

// 			<div>
// 				<label className="block text-sm font-medium mb-2">Title</label>
// 				<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100" required />
// 			</div>

// 			<div>
// 				<label className="block text-sm font-medium mb-2">Category</label>
// 				<select value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))} className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100" required>
// 					{categories.map((category) => (
// 						<option key={category.id} value={category.id}>
// 							{category.name}
// 						</option>
// 					))}
// 				</select>
// 			</div>

// 			<div>
// 				<label className="block text-sm font-medium mb-2">Cover Image</label>
// 				<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// 			</div>

// 			<div>
// 				<label className="block text-sm font-medium mb-2">Excerpt</label>
// 				<textarea value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100" />
// 			</div>

// 			<div>
// 				<label className="block text-sm font-medium mb-2">Content</label>
// 				<div className="border border-gray-700 rounded-lg overflow-hidden">
// 					<RichMarkdownEditor initialContent={formData.content} onChange={(content) => setFormData((prev) => ({ ...prev, content }))} />
// 				</div>
// 			</div>

// 			<button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2">
// 				{isSubmitting && <Loader2 className="animate-spin" size={16} />}
// 				{isSubmitting ? "Creating..." : "Create Post"}
// 			</button>
// 		</form>
// 	);
// }

// // 'use client'
// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { supabaseClient } from '@/lib/auth'
// // import { useAuth } from '@/hooks/useAuth'
// // import { ImageUpload } from '@/components/ImageUpload'
// // import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
// // import { Loader2 } from 'lucide-react'
// // import { categories, CategoryId } from '@/data/categories'

// // export function PostForm() {
// //   const router = useRouter()
// //   const { user } = useAuth()
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     content: '',
// //     excerpt: '',
// //     cover_image: '',
// //     category: 'tech' as CategoryId
// //   })
// //   const [isSubmitting, setIsSubmitting] = useState(false)
// //   const [error, setError] = useState('')

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!user) return

// //     setIsSubmitting(true)
// //     setError('')

// //     try {
// //       const slug = formData.title
// //         .toLowerCase()
// //         .trim()
// //         .replace(/[^a-z0-9]+/g, '-')
// //         .replace(/(^-|-$)+/g, '')

// //       const { error: postError } = await supabaseClient
// //         .from('posts')
// //         .insert([{
// //           ...formData,
// //           slug,
// //           published: true,
// //           author_id: user.id
// //         }])

// //       if (postError) throw postError

// //       router.push('/blog')
// //       router.refresh()
// //     } catch (err) {
// //       console.error('Error:', err)
// //       setError(err instanceof Error ? err.message : 'Failed to create post')
// //     } finally {
// //       setIsSubmitting(false)
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
// //         <label className="block text-sm font-medium mb-2">Category</label>
// //         <select
// //           value={formData.category}
// //           onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as CategoryId }))}
// //           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
// //           required
// //         >
// //           {categories.map(category => (
// //             <option key={category.id} value={category.id}>
// //               {category.name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium mb-2">Cover Image</label>
// //         <ImageUpload
// //           onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
// //         />
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
// //         <label className="block text-sm font-medium mb-2">Content</label>
// //         <div className="border border-gray-700 rounded-lg overflow-hidden">
// //           <RichMarkdownEditor
// //             initialContent={formData.content}
// //             onChange={(content) => setFormData(prev => ({...prev, content}))}
// //           />
// //         </div>
// //       </div>

// //       <button
// //         type="submit"
// //         disabled={isSubmitting}
// //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
// //       >
// //         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
// //         {isSubmitting ? 'Creating...' : 'Create Post'}
// //       </button>
// //     </form>
// //   )
// // }

// // // 'use client'
// // // import { useState } from 'react'
// // // import { useRouter } from 'next/navigation'
// // // import { supabaseClient } from '@/lib/auth'
// // // import { useAuth } from '@/hooks/useAuth'
// // // import { ImageUpload } from '@/components/ImageUpload'
// // // import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
// // // import { Loader2 } from 'lucide-react'

// // // export function PostForm() {
// // //   const router = useRouter()
// // //   const { user } = useAuth()
// // //   const [formData, setFormData] = useState({
// // //     title: '',
// // //     content: '',
// // //     excerpt: '',
// // //     cover_image: ''
// // //   })
// // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // //   const [error, setError] = useState('')

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     if (!user) return

// // //     setIsSubmitting(true)
// // //     setError('')

// // //     try {
// // //       const slug = formData.title
// // //         .toLowerCase()
// // //         .trim()
// // //         .replace(/[^a-z0-9]+/g, '-')
// // //         .replace(/(^-|-$)+/g, '')

// // //       const { error: postError } = await supabaseClient
// // //         .from('posts')
// // //         .insert([{
// // //           ...formData,
// // //           slug,
// // //           published: true,
// // //           author_id: user.id
// // //         }])

// // //       if (postError) throw postError

// // //       router.push('/blog')
// // //       router.refresh()
// // //     } catch (err) {
// // //       console.error('Error:', err)
// // //       setError(err instanceof Error ? err.message : 'Failed to create post')
// // //     } finally {
// // //       setIsSubmitting(false)
// // //     }
// // //   }

// // //   return (
// // //     <form onSubmit={handleSubmit} className="space-y-6">
// // //       {error && (
// // //         <div className="bg-red-500/10 text-red-500 p-4 rounded">
// // //           {error}
// // //         </div>
// // //       )}

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Title</label>
// // //         <input
// // //           type="text"
// // //           value={formData.title}
// // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // //           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
// // //           required
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Cover Image</label>
// // //         <ImageUpload
// // //           onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// // //         <textarea
// // //           value={formData.excerpt}
// // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // //           className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Content</label>
// // //         <div className="border border-gray-700 rounded-lg overflow-hidden">
// // //           <RichMarkdownEditor
// // //             initialContent={formData.content}
// // //             onChange={(content) => setFormData(prev => ({...prev, content}))}
// // //           />
// // //         </div>
// // //       </div>

// // //       <button
// // //         type="submit"
// // //         disabled={isSubmitting}
// // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
// // //       >
// // //         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
// // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // //       </button>
// // //     </form>
// // //   )
// // // }
// // // // 'use client'
// // // // import { useState } from 'react'
// // // // import { useRouter } from 'next/navigation'
// // // // import { supabaseClient } from '@/lib/auth'
// // // // import { useAuth } from '@/hooks/useAuth'
// // // // import { ImageUpload } from '@/components/ImageUpload'
// // // // import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
// // // // import { Loader2 } from 'lucide-react'

// // // // export function PostForm() {
// // // //   const router = useRouter()
// // // //   const { user } = useAuth()
// // // //   const [formData, setFormData] = useState({
// // // //     title: '',
// // // //     content: '',
// // // //     excerpt: '',
// // // //     cover_image: ''
// // // //   })
// // // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // //   const [error, setError] = useState('')

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     if (!user) return

// // // //     setIsSubmitting(true)
// // // //     setError('')

// // // //     try {
// // // //       // First, ensure profile exists
// // // //       const { error: profileError } = await supabaseClient
// // // //         .from('profiles')
// // // //         .insert([{
// // // //           id: user.id,
// // // //           username: user.email?.split('@')[0] || 'anonymous'
// // // //         }])
// // // //         .select()
// // // //         .single()

// // // //       // Ignore if profile already exists
// // // //       if (profileError && !profileError.message.includes('duplicate')) {
// // // //         throw profileError
// // // //       }

// // // //       // Create post
// // // //       const slug = formData.title
// // // //         .toLowerCase()
// // // //         .trim()
// // // //         .replace(/[^a-z0-9]+/g, '-')
// // // //         .replace(/(^-|-$)+/g, '')

// // // //       const { error: postError } = await supabaseClient
// // // //         .from('posts')
// // // //         .insert([{
// // // //           ...formData,
// // // //           slug,
// // // //           published: true,
// // // //           author_id: user.id
// // // //         }])

// // // //       if (postError) throw postError

// // // //       router.push('/blog')
// // // //       router.refresh()
// // // //     } catch (err) {
// // // //       console.error('Error:', err)
// // // //       setError(err instanceof Error ? err.message : 'Failed to create post')
// // // //     } finally {
// // // //       setIsSubmitting(false)
// // // //     }
// // // //   }

// // // //   return (
// // // //     <form onSubmit={handleSubmit} className="space-y-6">
// // // //       {error && (
// // // //         <div className="bg-red-500/10 text-red-500 p-4 rounded">
// // // //           {error}
// // // //         </div>
// // // //       )}

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Title</label>
// // // //         <input
// // // //           type="text"
// // // //           value={formData.title}
// // // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // // //           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
// // // //           required
// // // //         />
// // // //       </div>

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Cover Image</label>
// // // //         <ImageUpload
// // // //           onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
// // // //         />
// // // //       </div>

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// // // //         <textarea
// // // //           value={formData.excerpt}
// // // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // // //           className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
// // // //         />
// // // //       </div>

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Content</label>
// // // //         <RichMarkdownEditor
// // // //           initialContent={formData.content}
// // // //           onChange={(content) => setFormData(prev => ({...prev, content}))}
// // // //         />
// // // //       </div>

// // // //       <button
// // // //         type="submit"
// // // //         disabled={isSubmitting}
// // // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
// // // //       >
// // // //         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
// // // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // // //       </button>
// // // //     </form>
// // // //   )
// // // // }

// // // // // // src/components/PostForm.tsx
// // // // // "use client";
// // // // // import { useState } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { supabaseClient } from "@/lib/auth";
// // // // // import { useAuth } from "@/hooks/useAuth";

// // // // // export function PostForm() {
// // // // // 	const router = useRouter();
// // // // // 	const { user } = useAuth();
// // // // // 	const [formData, setFormData] = useState({
// // // // // 		title: "",
// // // // // 		content: "",
// // // // // 		excerpt: "",
// // // // // 		category: "tech", // Add this line
// // // // // 	});
// // // // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // 	const [error, setError] = useState("");

// // // // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // // // 		e.preventDefault();
// // // // // 		if (!user) return;

// // // // // 		setIsSubmitting(true);
// // // // // 		setError("");

// // // // // 		try {
// // // // // 			// First, ensure profile exists
// // // // // 			const { error: profileError } = await supabaseClient
// // // // // 				.from("profiles")
// // // // // 				.insert([
// // // // // 					{
// // // // // 						id: user.id,
// // // // // 						username: user.email?.split("@")[0] || "anonymous",
// // // // // 					},
// // // // // 				])
// // // // // 				.select()
// // // // // 				.single();

// // // // // 			// Ignore if profile already exists
// // // // // 			if (profileError && !profileError.message.includes("duplicate")) {
// // // // // 				throw profileError;
// // // // // 			}

// // // // // 			// Then create post
// // // // // 			const slug = formData.title
// // // // // 				.toLowerCase()
// // // // // 				.trim()
// // // // // 				.replace(/[^a-z0-9]+/g, "-")
// // // // // 				.replace(/(^-|-$)+/g, "");

// // // // // 			const { error: postError } = await supabaseClient.from("posts").insert([
// // // // // 				{
// // // // // 					...formData,
// // // // // 					slug,
// // // // // 					published: true,
// // // // // 					author_id: user.id,
// // // // // 				},
// // // // // 			]);

// // // // // 			if (postError) throw postError;

// // // // // 			router.push("/blog");
// // // // // 			router.refresh();
// // // // // 		} catch (err) {
// // // // // 			console.error("Error:", err);
// // // // // 			setError(err instanceof Error ? err.message : "Failed to create post");
// // // // // 		} finally {
// // // // // 			setIsSubmitting(false);
// // // // // 		}
// // // // // 	};

// // // // // 	return (
// // // // // 		<form onSubmit={handleSubmit} className="space-y-6">
// // // // // 			{error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}
// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Title</label>
// // // // // 				<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded bg-white text-gray-900" required />
// // // // // 			</div>
// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Excerpt</label>
// // // // // 				<textarea value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-2 border rounded h-24 bg-white text-gray-900" />
// // // // // 			</div>
// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Content</label>
// // // // // 				<textarea value={formData.content} onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} className="w-full p-2 border rounded h-64 bg-white text-gray-900" required />
// // // // // 			</div>
// // // // // 			{/* // Add this to your form JSX, before the submit button */}
// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Category</label>
// // // // // 				<select value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} className="w-full p-2 border rounded bg-white text-gray-900" required>
// // // // // 					<option value="tech">Tech Articles</option>
// // // // // 					<option value="food">Fusion Food</option>
// // // // // 					<option value="media">Other Media</option>
// // // // // 					<option value="personal">Personal</option>
// // // // // 				</select>
// // // // // 			</div>
// // // // // 			<button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
// // // // // 				{isSubmitting ? "Creating..." : "Create Post"}
// // // // // 			</button>
// // // // // 		</form>
// // // // // 	);
// // // // // }

// // // // // // 'use client'
// // // // // // import { useState } from 'react'
// // // // // // import { useRouter } from 'next/navigation'
// // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // import { useAuth } from '@/hooks/useAuth'

// // // // // // export function PostForm() {
// // // // // //   const router = useRouter()
// // // // // //   const { user } = useAuth()
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     title: '',
// // // // // //     content: '',
// // // // // //     excerpt: ''
// // // // // //   })
// // // // // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // // // //   const [error, setError] = useState('')

// // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // //     e.preventDefault()
// // // // // //     if (!user) {
// // // // // //       setError('User not authenticated')
// // // // // //       return
// // // // // //     }

// // // // // //     setIsSubmitting(true)
// // // // // //     setError('')

// // // // // //     try {
// // // // // //       const slug = formData.title
// // // // // //         .toLowerCase()
// // // // // //         .trim()
// // // // // //         .replace(/[^a-z0-9]+/g, '-')
// // // // // //         .replace(/(^-|-$)+/g, '')

// // // // // //       console.log('Creating post:', {
// // // // // //         ...formData,
// // // // // //         slug,
// // // // // //         published: true,
// // // // // //         author_id: user.id
// // // // // //       })

// // // // // //       const { data, error: insertError } = await supabaseClient
// // // // // //         .from('posts')
// // // // // //         .insert([{
// // // // // //           ...formData,
// // // // // //           slug,
// // // // // //           published: true,
// // // // // //           author_id: user.id
// // // // // //         }])
// // // // // //         .select()
// // // // // //         .single()

// // // // // //       if (insertError) {
// // // // // //         throw insertError
// // // // // //       }

// // // // // //       console.log('Post created:', data)
// // // // // //       router.push('/blog')
// // // // // //       router.refresh()
// // // // // //     } catch (err) {
// // // // // //       console.error('Error details:', err)
// // // // // //       setError(err instanceof Error ? err.message : 'Failed to create post')
// // // // // //     } finally {
// // // // // //       setIsSubmitting(false)
// // // // // //     }
// // // // // //   }

// // // // // //   return (
// // // // // //     <form onSubmit={handleSubmit} className="space-y-6">
// // // // // //       {error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}

// // // // // //       <div>
// // // // // //         <label className="block text-sm font-medium mb-2">Title</label>
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           value={formData.title}
// // // // // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // // // // //           className="w-full p-2 border rounded bg-white text-gray-900"
// // // // // //           required
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div>
// // // // // //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// // // // // //         <textarea
// // // // // //           value={formData.excerpt}
// // // // // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // // // // //           className="w-full p-2 border rounded h-24 bg-white text-gray-900"
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div>
// // // // // //         <label className="block text-sm font-medium mb-2">Content</label>
// // // // // //         <textarea
// // // // // //           value={formData.content}
// // // // // //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// // // // // //           className="w-full p-2 border rounded h-64 bg-white text-gray-900"
// // // // // //           required
// // // // // //         />
// // // // // //       </div>

// // // // // //       <button
// // // // // //         type="submit"
// // // // // //         disabled={isSubmitting}
// // // // // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // // // //       >
// // // // // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // // // // //       </button>
// // // // // //     </form>
// // // // // //   )
// // // // // // }

// // // // // // // // src/components/PostForm.tsx
// // // // // // // 'use client'
// // // // // // // import { useState } from 'react'
// // // // // // // import { useRouter } from 'next/navigation'
// // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // import { useAuth } from '@/hooks/useAuth'

// // // // // // // export function PostForm() {
// // // // // // //   const router = useRouter()
// // // // // // //   const { user } = useAuth()
// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     title: '',
// // // // // // //     content: '',
// // // // // // //     excerpt: ''
// // // // // // //   })
// // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // // // // //   const [error, setError] = useState('')

// // // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // // //     e.preventDefault()
// // // // // // //     if (!user) return

// // // // // // //     setIsSubmitting(true)
// // // // // // //     setError('')

// // // // // // //     try {
// // // // // // //       const slug = formData.title
// // // // // // //         .toLowerCase()
// // // // // // //         .replace(/[^a-z0-9]+/g, '-')
// // // // // // //         .replace(/(^-|-$)+/g, '')

// // // // // // //       await supabaseClient.from('posts').insert([{
// // // // // // //         ...formData,
// // // // // // //         slug,
// // // // // // //         published: true,
// // // // // // //         author_id: user.id
// // // // // // //       }])

// // // // // // //       router.push('/blog')
// // // // // // //       router.refresh()
// // // // // // //     } catch (err) {
// // // // // // //       setError('Failed to create post')
// // // // // // //       console.error(err)
// // // // // // //     } finally {
// // // // // // //       setIsSubmitting(false)
// // // // // // //     }
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <form onSubmit={handleSubmit} className="space-y-6">
// // // // // // //       {error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}

// // // // // // //       <div>
// // // // // // //         <label className="block text-sm font-medium mb-2">Title</label>
// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           value={formData.title}
// // // // // // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // // // // // //           className="w-full p-2 border rounded"
// // // // // // //           required
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       <div>
// // // // // // //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// // // // // // //         <textarea
// // // // // // //           value={formData.excerpt}
// // // // // // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // // // // // //           className="w-full p-2 border rounded h-24"
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       <div>
// // // // // // //         <label className="block text-sm font-medium mb-2">Content</label>
// // // // // // //         <textarea
// // // // // // //           value={formData.content}
// // // // // // //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// // // // // // //           className="w-full p-2 border rounded h-64"
// // // // // // //           required
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       <button
// // // // // // //         type="submit"
// // // // // // //         disabled={isSubmitting}
// // // // // // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // // // // //       >
// // // // // // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // // // // // //       </button>
// // // // // // //     </form>
// // // // // // //   )
// // // // // // // }

// // // // // // // // // src/components/PostForm.tsx - Updated version
// // // // // // // // "use client";
// // // // // // // // import { useState } from "react";
// // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // import { blogApi } from "@/lib/supabase";
// // // // // // // // import { useAuth } from "@/hooks/useAuth";

// // // // // // // // export function PostForm() {
// // // // // // // // 	const { user, isAuthenticated } = useAuth();
// // // // // // // // 	const router = useRouter();
// // // // // // // // 	const [formData, setFormData] = useState({
// // // // // // // // 		title: "",
// // // // // // // // 		content: "",
// // // // // // // // 		excerpt: "",
// // // // // // // // 	});
// // // // // // // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // // // // 	const [error, setError] = useState("");

// // // // // // // // 	if (!isAuthenticated) {
// // // // // // // // 		return <div>Please sign in to create posts.</div>;
// // // // // // // // 	}

// // // // // // // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // 		e.preventDefault();
// // // // // // // // 		setIsSubmitting(true);
// // // // // // // // 		setError("");

// // // // // // // // 		try {
// // // // // // // // 			const slug = formData.title
// // // // // // // // 				.toLowerCase()
// // // // // // // // 				.replace(/[^a-z0-9]+/g, "-")
// // // // // // // // 				.replace(/(^-|-$)+/g, "");

// // // // // // // // 			await blogApi.createPost({
// // // // // // // // 				...formData,
// // // // // // // // 				slug,
// // // // // // // // 				published: false,
// // // // // // // // 				author_id: user.id,
// // // // // // // // 			});

// // // // // // // // 			router.push("/blog");
// // // // // // // // 			router.refresh();
// // // // // // // // 		} catch (err) {
// // // // // // // // 			setError("Failed to create post");
// // // // // // // // 			console.error(err);
// // // // // // // // 		} finally {
// // // // // // // // 			setIsSubmitting(false);
// // // // // // // // 		}
// // // // // // // // 	};

// // // // // // // // 	return (
// // // // // // // // 		<form onSubmit={handleSubmit} className="space-y-6">
// // // // // // // // 			{error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}

// // // // // // // // 			<div>
// // // // // // // // 				<label className="block text-sm font-medium mb-2">Title</label>
// // // // // // // // 				<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded" required />
// // // // // // // // 			</div>

// // // // // // // // 			<div>
// // // // // // // // 				<label className="block text-sm font-medium mb-2">Excerpt (optional)</label>
// // // // // // // // 				<textarea value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-2 border rounded h-24" />
// // // // // // // // 			</div>

// // // // // // // // 			<div>
// // // // // // // // 				<label className="block text-sm font-medium mb-2">Content</label>
// // // // // // // // 				<textarea value={formData.content} onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} className="w-full p-2 border rounded h-64" required />
// // // // // // // // 			</div>

// // // // // // // // 			<button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
// // // // // // // // 				{isSubmitting ? "Creating..." : "Create Post"}
// // // // // // // // 			</button>
// // // // // // // // 		</form>
// // // // // // // // 	);
// // // // // // // // }

// // // // // // // // // // src/components/PostForm.tsx
// // // // // // // // // 'use client'

// // // // // // // // // import { useState } from 'react'
// // // // // // // // // import { blogApi } from '@/lib/supabase'
// // // // // // // // // import { useRouter } from 'next/navigation'

// // // // // // // // // export function PostForm() {
// // // // // // // // //   const router = useRouter()
// // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // //     title: '',
// // // // // // // // //     content: '',
// // // // // // // // //     excerpt: ''
// // // // // // // // //   })
// // // // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // // // // // // //   const [error, setError] = useState('')

// // // // // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // //     e.preventDefault()
// // // // // // // // //     setIsSubmitting(true)
// // // // // // // // //     setError('')

// // // // // // // // //     try {
// // // // // // // // //       const slug = formData.title
// // // // // // // // //         .toLowerCase()
// // // // // // // // //         .replace(/[^a-z0-9]+/g, '-')
// // // // // // // // //         .replace(/(^-|-$)+/g, '')

// // // // // // // // //       await blogApi.createPost({
// // // // // // // // //         ...formData,
// // // // // // // // //         slug,
// // // // // // // // //         published: false,
// // // // // // // // //         author_id: 'placeholder-id' // Replace with actual auth user ID
// // // // // // // // //       })

// // // // // // // // //       router.push('/blog')
// // // // // // // // //       router.refresh()
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setError('Failed to create post')
// // // // // // // // //       console.error(err)
// // // // // // // // //     } finally {
// // // // // // // // //       setIsSubmitting(false)
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <form onSubmit={handleSubmit} className="space-y-6">
// // // // // // // // //       {error && (
// // // // // // // // //         <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>
// // // // // // // // //       )}

// // // // // // // // //       <div>
// // // // // // // // //         <label className="block text-sm font-medium mb-2">Title</label>
// // // // // // // // //         <input
// // // // // // // // //           type="text"
// // // // // // // // //           value={formData.title}
// // // // // // // // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // // // // // // // //           className="w-full p-2 border rounded"
// // // // // // // // //           required
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       <div>
// // // // // // // // //         <label className="block text-sm font-medium mb-2">Excerpt (optional)</label>
// // // // // // // // //         <textarea
// // // // // // // // //           value={formData.excerpt}
// // // // // // // // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // // // // // // // //           className="w-full p-2 border rounded h-24"
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       <div>
// // // // // // // // //         <label className="block text-sm font-medium mb-2">Content</label>
// // // // // // // // //         <textarea
// // // // // // // // //           value={formData.content}
// // // // // // // // //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// // // // // // // // //           className="w-full p-2 border rounded h-64"
// // // // // // // // //           required
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       <button
// // // // // // // // //         type="submit"
// // // // // // // // //         disabled={isSubmitting}
// // // // // // // // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // // // // // // //       >
// // // // // // // // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // // // // // // // //       </button>
// // // // // // // // //     </form>
// // // // // // // // //   )
// // // // // // // // // }
