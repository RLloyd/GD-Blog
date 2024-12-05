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
	const [saveAsDraft, setSaveAsDraft] = useState(false);

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

			// Add logging
			console.log("Saving post with data:", {
				...formData,
				slug,
				published: !saveAsDraft,
				author_id: user.id,
			});

			const { data, error: postError } = await supabaseClient
				.from("posts")
				.insert([
					{
						...formData,
						slug,
						published: !saveAsDraft,
						author_id: user.id,
					},
				])
				.select();

			console.log("Save response:", { data, error: postError });

			if (postError) throw postError;

			router.push(saveAsDraft ? "/blog/drafts" : "/blog");
			router.refresh();
		} catch (err) {
			console.error("Error:", err);
			setError(err instanceof Error ? err.message : "Failed to create post");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-6'
		>
			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

			<div>
				<label className='block text-sm font-medium mb-2'>Title</label>
				<input
					type='text'
					value={formData.title}
					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
					required
				/>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Category</label>
				<select
					value={formData.category}
					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
					required
				>
					{categories.map((category) => (
						<option
							key={category.id}
							value={category.id}
						>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Cover Image</label>
				<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Excerpt</label>
				<textarea
					value={formData.excerpt}
					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
					className='w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100'
				/>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Content</label>
				<div className='border border-gray-700 rounded-lg overflow-hidden'>
					<RichMarkdownEditor
						initialContent={formData.content}
						onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
					/>
				</div>
			</div>

			<button
				type='submit'
				disabled={isSubmitting}
				className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
			>
				{isSubmitting && (
					<Loader2
						className='animate-spin'
						size={16}
					/>
				)}
				{isSubmitting ? "Creating..." : "Create Post"}
			</button>
			{/* Save as Draft */}
			<div className='flex items-center gap-4'>
				<button
					type='submit'
					disabled={isSubmitting}
					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
				>
					{isSubmitting && (
						<Loader2
							className='animate-spin'
							size={16}
						/>
					)}
					{isSubmitting ? "Saving..." : saveAsDraft ? "Save Draft" : "Publish"}
				</button>

				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={saveAsDraft}
						onChange={(e) => setSaveAsDraft(e.target.checked)}
						className='rounded border-gray-300'
					/>
					<span>Save as draft</span>
				</label>
			</div>
		</form>
	);
}
