// src/components/EditForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/auth";
import { ImageUpload } from "@/components/ImageUpload";
import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
import { Loader2 } from "lucide-react";
import { categories, CategoryId } from "@/data/categories";

type Post = {
	id: string;
	title: string;
	content: string;
	type: "markdown" | "component";
	component_name?: string;
	component_props?: Record<string, unknown>;
	excerpt?: string;
	cover_image?: string;
	slug: string;
	category?: CategoryId;
	published?: boolean;
};

export function EditForm({ post }: { post: Post }) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		title: post.title,
		content: post.content,
		type: post.type || "markdown",
		component_name: post.component_name || "",
		component_props: post.component_props || {},
		excerpt: post.excerpt || "",
		cover_image: post.cover_image || "",
		category: post.category || ("tech" as CategoryId),
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const updateData = {
				...formData,
				updated_at: new Date().toISOString(),
				published: post.published,
			};

			const { error: updateError } = await supabaseClient.from("posts").update(updateData).eq("id", post.id);

			if (updateError) throw updateError;

			router.push(`/blog/${post.slug}`);
			router.refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to update post");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-6 max-w-4xl mx-auto px-4'
		>
			{error && (
				<div
					className='bg-red-500/10 text-red-500 p-4 rounded'
					role='alert'
				>
					{error}
				</div>
			)}

			<div>
				<label
					htmlFor='post-type'
					className='block text-sm font-medium mb-2'
				>
					Post Type
				</label>
				<select
					id='post-type'
					value={formData.type}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							type: e.target.value as "markdown" | "component",
						}))
					}
					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
					aria-label='Select post type'
				>
					<option value='markdown'>Markdown</option>
					<option value='component'>React Component</option>
				</select>
			</div>

			<div>
				<label
					htmlFor='title'
					className='block text-sm font-medium mb-2'
				>
					Title
				</label>
				<input
					id='title'
					type='text'
					value={formData.title}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							title: e.target.value,
						}))
					}
					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
					required
					aria-label='Post title'
					placeholder='Enter post title'
				/>
			</div>

			<div>
				<label
					htmlFor='category'
					className='block text-sm font-medium mb-2'
				>
					Category
				</label>
				<select
					id='category'
					value={formData.category}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							category: e.target.value as CategoryId,
						}))
					}
					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
					required
					aria-label='Select post category'
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
				<label
					htmlFor='excerpt'
					className='block text-sm font-medium mb-2'
				>
					Excerpt
				</label>
				<textarea
					id='excerpt'
					value={formData.excerpt}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							excerpt: e.target.value,
						}))
					}
					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
					placeholder='Enter a brief excerpt of your post'
					aria-label='Post excerpt'
				/>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Cover Image</label>
				<ImageUpload
					onUploadComplete={(url) =>
						setFormData((prev) => ({
							...prev,
							cover_image: url,
						}))
					}
					existingUrl={formData.cover_image}
				/>
			</div>

			{formData.type === "markdown" ? (
				<div>
					<label className='block text-sm font-medium mb-2'>Content</label>
					<div className='border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'>
						<RichMarkdownEditor
							initialContent={formData.content}
							onChange={(content) =>
								setFormData((prev) => ({
									...prev,
									content,
								}))
							}
						/>
					</div>
				</div>
			) : (
				<div className='space-y-4'>
					<div>
						<label
							htmlFor='component-name'
							className='block text-sm font-medium mb-2'
						>
							Component Name
						</label>
						<input
							id='component-name'
							type='text'
							value={formData.component_name}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									component_name: e.target.value,
								}))
							}
							className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
							placeholder='Enter component name'
							aria-label='Component name'
						/>
					</div>

					<div>
						<label
							htmlFor='component-props'
							className='block text-sm font-medium mb-2'
						>
							Component Props (JSON)
						</label>
						<textarea
							id='component-props'
							value={JSON.stringify(formData.component_props, null, 2)}
							onChange={(e) => {
								try {
									const props = JSON.parse(e.target.value);
									setFormData((prev) => ({
										...prev,
										component_props: props,
									}));
								} catch {} // Allow invalid JSON while typing
							}}
							className='w-full h-64 p-4 font-mono text-sm bg-white dark:bg-gray-800 border rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
							placeholder='{}'
							aria-label='Component props in JSON format'
						/>
					</div>
				</div>
			)}

			<div className='flex gap-4'>
				<button
					type='submit'
					disabled={isSubmitting}
					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
					aria-label={isSubmitting ? "Saving changes..." : "Save changes"}
				>
					{isSubmitting && (
						<Loader2
							className='animate-spin'
							size={16}
						/>
					)}
					{isSubmitting ? "Saving..." : "Save Changes"}
				</button>
				<button
					type='button'
					onClick={() => router.back()}
					className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
					aria-label='Cancel editing'
				>
					Cancel
				</button>
			</div>
		</form>
	);
}

// // src/components/EditForm.tsx
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseClient } from "@/lib/auth";
// import { useAuth } from "@/hooks/useAuth";
// import { ImageUpload } from "@/components/ImageUpload";
// import { ImageWithFallback } from "@/components/ImageWithFallback";
// import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// import { Loader2 } from "lucide-react";
// import { categories, CategoryId } from "@/data/categories";

// type Post = {
// 	id: string;
// 	title: string;
// 	content: string;
// 	type: "markdown" | "component";
// 	component_name?: string;
// 	component_props?: Record<string, unknown>;
// 	excerpt?: string;
// 	cover_image?: string;
// 	slug: string;
// 	category?: CategoryId;
// 	published?: boolean;
// };

// // export function EditForm({ post }: { post: Post }) {
// // 	const router = useRouter();
// // 	const { user } = useAuth();
// // 	const [formData, setFormData] = useState({
// // 		title: post.title,
// // 		content: post.content,
// // 		excerpt: post.excerpt || "",
// // 		cover_image: post.cover_image || "",
// // 		category: post.category || ("tech" as CategoryId),
// // 		format: post.format || detectFormat(post.content),
// // 	});
// // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// // 	const [error, setError] = useState("");
// export function EditForm({ post }: { post: Post }) {
// 	const router = useRouter();
// 	const [formData, setFormData] = useState({
// 		title: post.title,
// 		content: post.content,
// 		type: post.type || "markdown",
// 		component_name: post.component_name || "",
// 		component_props: post.component_props || {},
// 		excerpt: post.excerpt || "",
// 		cover_image: post.cover_image || "",
// 		category: post.category || ("tech" as CategoryId),
// 	});
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [error, setError] = useState("");

// 	// function detectFormat(content: string): "markdown" | "react" {
// 	// 	// Check for React component indicators
// 	// 	const hasJSXSyntax = content.includes("export default") || content.includes("function") || content.includes("return") || content.includes("useState") || content.includes("props");
// 	// 	return hasJSXSyntax ? "react" : "markdown";
// 	// }

// 	// const handleImageDelete = async () => {
// 	// 	if (!formData.cover_image) return;
// 	// 	setIsImageDeleting(true);
// 	// 	try {
// 	// 		const path = formData.cover_image.split("/").pop();
// 	// 		if (!path) throw new Error("Invalid image path");
// 	// 		const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);
// 	// 		if (deleteError) throw deleteError;
// 	// 		setFormData((prev) => ({ ...prev, cover_image: "" }));
// 	// 	} catch (err) {
// 	// 		setError("Failed to delete image");
// 	// 		console.error("Error deleting image:", err);
// 	// 	} finally {
// 	// 		setIsImageDeleting(false);
// 	// 	}
// 	// };

// 	// const handleSubmit = async (e: React.FormEvent) => {
// 	// 	e.preventDefault();
// 	// 	if (!user) return;

// 	// 	setIsSubmitting(true);
// 	// 	setError("");

// 	// 	try {
// 	// 		const { error: updateError } = await supabaseClient
// 	// 			.from("posts")
// 	// 			.update({
// 	// 				...formData,
// 	// 				updated_at: new Date().toISOString(),
// 	// 			})
// 	// 			.eq("id", post.id);

// 	// 		if (updateError) throw updateError;

// 	// 		if (post.published) {
// 	// 			router.push(`/blog/${post.slug}`);
// 	// 		} else {
// 	// 			router.push("/blog/drafts");
// 	// 		}
// 	// 		router.refresh();
// 	// 	} catch (err) {
// 	// 		setError(err instanceof Error ? err.message : "Failed to update post");
// 	// 	} finally {
// 	// 		setIsSubmitting(false);
// 	// 	}
// 	// };
//    const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		setIsSubmitting(true);
// 		setError("");

// 		try {
// 			const updateData = {
// 				...formData,
// 				updated_at: new Date().toISOString(),
// 				published: post.published,
// 			};

// 			const { error: updateError } = await supabaseClient.from("posts").update(updateData).eq("id", post.id);

// 			if (updateError) throw updateError;

// 			router.push(`/blog/${post.slug}`);
// 			router.refresh();
// 		} catch (err) {
// 			setError(err instanceof Error ? err.message : "Failed to update post");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	return (
// 		<form
// 			onSubmit={handleSubmit}
// 			className='space-y-6 max-w-4xl mx-auto px-4'
// 		>
// 			{/* {error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>} */}
//          {error && (
// 				<div
// 					className='bg-red-500/10 text-red-500 p-4 rounded'
// 					role='alert'
// 				>
// 					{error}
// 				</div>
// 			)}

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Title</label>
// 				<input
// 					type='text'
// 					value={formData.title}
// 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 					required
// 				/>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Category</label>
// 				<select
// 					value={formData.category}
// 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 					required
// 				>
// 					{categories.map((category) => (
// 						<option
// 							key={category.id}
// 							value={category.id}
// 						>
// 							{category.name}
// 						</option>
// 					))}
// 				</select>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Format</label>
// 				<select
// 					value={formData.format}
// 					onChange={(e) => setFormData((prev) => ({ ...prev, format: e.target.value as "markdown" | "react" }))}
// 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 				>
// 					<option value='markdown'>Markdown</option>
// 					<option value='react'>React Component</option>
// 				</select>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// 				{formData.cover_image ? (
// 					<div className='space-y-4'>
// 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// 							<ImageWithFallback
// 								src={formData.cover_image}
// 								alt='Cover image'
// 								className='w-full h-full'
// 							/>
// 						</div>
// 						<button
// 							type='button'
// 							onClick={handleImageDelete}
// 							disabled={isImageDeleting}
// 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// 						>
// 							{isImageDeleting && (
// 								<Loader2
// 									className='animate-spin'
// 									size={16}
// 								/>
// 							)}
// 							{isImageDeleting ? "Removing..." : "Remove Image"}
// 						</button>
// 					</div>
// 				) : (
// 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// 				)}
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// 				<textarea
// 					value={formData.excerpt}
// 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// 					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 				/>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Content</label>
// 				<div className='border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'>
// 					{formData.format === "react" ? (
// 						<textarea
// 							value={formData.content}
// 							onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
// 							className='w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
// 							spellCheck={false}
// 						/>
// 					) : (
// 						<RichMarkdownEditor
// 							initialContent={formData.content}
// 							onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// 						/>
// 					)}
// 				</div>
// 			</div>

// 			<div className='flex gap-4'>
// 				<button
// 					type='submit'
// 					disabled={isSubmitting}
// 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// 				>
// 					{isSubmitting && (
// 						<Loader2
// 							className='animate-spin'
// 							size={16}
// 						/>
// 					)}
// 					{isSubmitting ? "Saving..." : "Save Changes"}
// 				</button>
// 				<button
// 					type='button'
// 					onClick={() => router.back()}
// 					className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
// 				>
// 					Cancel
// 				</button>
// 			</div>
// 		</form>
// 	);
// }

// // // src/components/EditForm.tsx • from source control
// // "use client";
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { supabaseClient } from "@/lib/auth";
// // import { useAuth } from "@/hooks/useAuth";
// // import { ImageUpload } from "@/components/ImageUpload";
// // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// // import { Loader2 } from "lucide-react";
// // import { categories, CategoryId } from "@/data/categories";

// // type Post = {
// // 	id: string;
// // 	title: string;
// // 	content: string;
// // 	excerpt?: string;
// // 	cover_image?: string;
// // 	slug: string;
// // 	category?: CategoryId;
// // };

// // export function EditForm({ post }: { post: Post }) {
// // 	const router = useRouter();
// // 	const { user } = useAuth();
// // 	const [formData, setFormData] = useState({
// // 		title: post.title,
// // 		content: post.content,
// // 		excerpt: post.excerpt || "",
// // 		cover_image: post.cover_image || "",
// // 		category: post.category || ("tech" as CategoryId),
// // 	});
// // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// // 	const [error, setError] = useState("");

// // 	const handleImageDelete = async () => {
// // 		if (!formData.cover_image) return;

// // 		setIsImageDeleting(true);
// // 		try {
// // 			const path = formData.cover_image.split("/").pop();
// // 			if (!path) throw new Error("Invalid image path");

// // 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);

// // 			if (deleteError) throw deleteError;
// // 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// // 		} catch (err) {
// // 			setError("Failed to delete image");
// // 			console.error("Error deleting image:", err);
// // 		} finally {
// // 			setIsImageDeleting(false);
// // 		}
// // 	};

// // 	const handleSubmit = async (e: React.FormEvent) => {
// // 		e.preventDefault();
// // 		if (!user) return;

// // 		setIsSubmitting(true);
// // 		setError("");

// // 		try {
// // 			const { error: updateError } = await supabaseClient
// // 				.from("posts")
// // 				.update({
// // 					...formData,
// // 					updated_at: new Date().toISOString(),
// // 				})
// // 				.eq("id", post.id);

// // 			if (updateError) throw updateError;

// // 			if (post.published) {
// // 				router.push(`/blog/${post.slug}`);
// // 			} else {
// // 				router.push("/blog/drafts");
// // 			}
// // 			router.refresh();
// // 		} catch (err) {
// // 			setError(err instanceof Error ? err.message : "Failed to update post");
// // 		} finally {
// // 			setIsSubmitting(false);
// // 		}
// // 	};

// // 	const handleCancel = () => {
// // 		if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
// // 			router.push(`/blog/${post.slug}`);
// // 		}
// // 	};

// // 	return (
// // 		<form
// // 			onSubmit={handleSubmit}
// // 			className='space-y-6'
// // 		>
// // 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Title</label>
// // 				<input
// // 					type='text'
// // 					value={formData.title}
// // 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// // 					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// // 					required
// // 				/>
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Category</label>
// // 				<select
// // 					value={formData.category}
// // 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// // 					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// // 					required
// // 				>
// // 					{categories.map((category) => (
// // 						<option
// // 							key={category.id}
// // 							value={category.id}
// // 						>
// // 							{category.name}
// // 						</option>
// // 					))}
// // 				</select>
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// // 				{formData.cover_image ? (
// // 					<div className='space-y-4'>
// // 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// // 							<ImageWithFallback
// // 								src={formData.cover_image}
// // 								alt='Cover image'
// // 								className='w-full h-full'
// // 							/>
// // 						</div>
// // 						<button
// // 							type='button'
// // 							onClick={handleImageDelete}
// // 							disabled={isImageDeleting}
// // 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// // 						>
// // 							{isImageDeleting && (
// // 								<Loader2
// // 									className='animate-spin'
// // 									size={16}
// // 								/>
// // 							)}
// // 							{isImageDeleting ? "Removing..." : "Remove Image"}
// // 						</button>
// // 					</div>
// // 				) : (
// // 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// // 				)}
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// // 				<textarea
// // 					value={formData.excerpt}
// // 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// // 					className='w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100'
// // 				/>
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Content</label>
// // 				<div className='border border-gray-700 rounded-lg overflow-hidden'>
// // 					<RichMarkdownEditor
// // 						initialContent={formData.content}
// // 						onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// // 					/>
// // 				</div>
// // 			</div>

// // 			<div className='flex gap-4'>
// // 				<button
// // 					type='submit'
// // 					disabled={isSubmitting}
// // 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// // 				>
// // 					{isSubmitting && (
// // 						<Loader2
// // 							className='animate-spin'
// // 							size={16}
// // 						/>
// // 					)}
// // 					{isSubmitting ? "Saving..." : "Save Changes"}
// // 				</button>
// // 				<button
// // 					type='button'
// // 					onClick={handleCancel}
// // 					className='bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600'
// // 				>
// // 					Cancel
// // 				</button>
// // 			</div>
// // 		</form>
// // 	);
// // }

// // // src/components/EditForm.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { supabaseClient } from "@/lib/auth";
// // import { useAuth } from "@/hooks/useAuth";
// // import { ImageUpload } from "@/components/ImageUpload";
// // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// // import { Loader2 } from "lucide-react";
// // import { categories, CategoryId } from "@/data/categories";

// // // type Post = {
// // // 	id: string;
// // // 	title: string;
// // // 	content: string;
// // // 	excerpt?: string;
// // // 	cover_image?: string;
// // // 	slug: string;
// // // 	category?: CategoryId;
// // // };
// // type Post = {
// //    id: string;
// //    title: string;
// //    content: string;
// //    type: 'markdown' | 'component';
// //    component_name?: string;
// //    component_props?: Record<string, any>;
// //    excerpt?: string;
// //    cover_image?: string;
// //    slug: string;
// //    category?: CategoryId;
// //  };

// // type ReactComponentData = {
// // 	name: string;
// // 	props: Record<string, any>;
// // 	code: string;
// // };

// // function parseReactComponent(content: string): ReactComponentData {
// // 	try {
// // 		const nameMatch = content.match(/(?:function|const)\s+(\w+)/);
// // 		const name = nameMatch ? nameMatch[1] : "MyComponent";

// // 		const propsMatch = content.match(/(?:function|const)\s+\w+\s*\((\{[^}]*\})\)/);
// // 		const propsString = propsMatch ? propsMatch[1] : "{}";
// // 		const props = Function(`return ${propsString}`)();

// // 		return { name, props, code: content };
// // 	} catch (e) {
// // 		return { name: "MyComponent", props: {}, code: content };
// // 	}
// // }

// // function generateReactComponent(name: string, props: Record<string, any>, code: string): string {
// // 	if (!code.includes("export default")) {
// // 		const propsString = Object.keys(props).length ? `{ ${Object.keys(props).join(", ")} }` : "props";
// // 		return `export default function ${name}(${propsString}) {
// //    return (
// //      ${code}
// //    );
// //  }`;
// // 	}
// // 	return code;
// // }

// // export function EditForm({ post }: { post: Post }) {
// // 	const router = useRouter();
// // 	const { user } = useAuth();

// // 	// Initialize content format state
// // 	const [contentFormat, setContentFormat] = useState(() => {
// //       return post.content.includes('export default') ? 'react' : 'markdown';
// //     });

// //     const [componentData, setComponentData] = useState<ReactComponentData>(() => {
// //       return contentFormat === 'react'
// //         ? parseReactComponent(post.content)
// //         : { name: "MyComponent", props: {}, code: "" };
// //     });

// // 	// Initialize form data with post content
// // 	const [formData, setFormData] = useState({
// // 		title: post.title,
// // 		content: post.content,
// // 		excerpt: post.excerpt || "",
// // 		cover_image: post.cover_image || "",
// // 		category: post.category || ("tech" as CategoryId),
// // 	});

// //    const handleComponentChange = (field: keyof ReactComponentData, value: any) => {
// //       setComponentData(prev => {
// //         const updated = { ...prev, [field]: value };
// //         const newContent = generateReactComponent(updated.name, updated.props, updated.code);
// //         setFormData(prev => ({ ...prev, content: newContent }));
// //         return updated;
// //       });
// //     };

// // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// // 	const [error, setError] = useState("");

// // 	// Keep content in sync with editor changes
// // 	useEffect(() => {
// // 		setFormData((prev) => ({
// // 			...prev,
// // 			content: post.content,
// // 		}));
// // 	}, [post.content]);

// // 	const handleContentChange = (newContent: string) => {
// // 		setFormData((prev) => ({
// // 			...prev,
// // 			content: newContent,
// // 		}));
// // 	};

// // 	const handleSubmit = async (e: React.FormEvent) => {
// // 		e.preventDefault();
// // 		if (!user) return;

// // 		setIsSubmitting(true);
// // 		setError("");

// // 		try {
// // 			const { error: updateError } = await supabaseClient
// // 				.from("posts")
// // 				.update({
// // 					...formData,
// // 					updated_at: new Date().toISOString(),
// // 				})
// // 				.eq("id", post.id);

// // 			if (updateError) throw updateError;
// // 			router.push(`/blog/${post.slug}`);
// // 			router.refresh();
// // 		} catch (err) {
// // 			setError(err instanceof Error ? err.message : "Failed to update post");
// // 		} finally {
// // 			setIsSubmitting(false);
// // 		}
// // 	};

// // 	const handleImageDelete = async () => {
// // 		if (!formData.cover_image) return;
// // 		setIsImageDeleting(true);
// // 		try {
// // 			const path = formData.cover_image.split("/").pop();
// // 			if (!path) throw new Error("Invalid image path");
// // 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);
// // 			if (deleteError) throw deleteError;
// // 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// // 		} catch (err) {
// // 			setError("Failed to delete image");
// // 		} finally {
// // 			setIsImageDeleting(false);
// // 		}
// // 	};

// // 	return (
// // 		<form
// // 			onSubmit={handleSubmit}
// // 			className='space-y-6 max-w-4xl mx-auto px-4'
// // 		>
// // 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Title</label>
// // 				<input
// // 					type='text'
// // 					value={formData.title}
// // 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // 					required
// // 				/>
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Category</label>
// // 				<select
// // 					value={formData.category}
// // 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // 					required
// // 				>
// // 					{categories.map((category) => (
// // 						<option
// // 							key={category.id}
// // 							value={category.id}
// // 						>
// // 							{category.name}
// // 						</option>
// // 					))}
// // 				</select>
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Format</label>
// // 				<select
// // 					value={contentFormat}
// // 					onChange={(e) => setContentFormat(e.target.value as "markdown" | "react")}
// // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // 				>
// // 					<option value='markdown'>Markdown</option>
// // 					<option value='react'>React Component</option>
// // 				</select>
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// // 				{formData.cover_image ? (
// // 					<div className='space-y-4'>
// // 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// // 							<ImageWithFallback
// // 								src={formData.cover_image}
// // 								alt='Cover image'
// // 								className='w-full h-full'
// // 							/>
// // 						</div>
// // 						<button
// // 							type='button'
// // 							onClick={handleImageDelete}
// // 							disabled={isImageDeleting}
// // 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// // 						>
// // 							{isImageDeleting && (
// // 								<Loader2
// // 									className='animate-spin'
// // 									size={16}
// // 								/>
// // 							)}
// // 							{isImageDeleting ? "Removing..." : "Remove Image"}
// // 						</button>
// // 					</div>
// // 				) : (
// // 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// // 				)}
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// // 				<textarea
// // 					value={formData.excerpt}
// // 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// // 					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // 				/>
// // 			</div>

// // 			<div>
// //          <div>
// //         <label className="block text-sm font-medium mb-2">Content</label>
// //         {contentFormat === 'react' ? (
// //           <div className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Component Name</label>
// //               <input
// //                 type="text"
// //                 value={componentData.name}
// //                 onChange={(e) => handleComponentChange('name', e.target.value)}
// //                 className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Component Props (JSON)</label>
// //               <textarea
// //                 value={JSON.stringify(componentData.props, null, 2)}
// //                 onChange={(e) => {
// //                   try {
// //                     const props = JSON.parse(e.target.value);
// //                     handleComponentChange('props', props);
// //                   } catch {} // Ignore invalid JSON while typing
// //                 }}
// //                 className="w-full h-32 p-2 font-mono text-sm bg-white dark:bg-gray-800 border rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
// //                 spellCheck={false}
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium mb-2">Component Code</label>
// //               <textarea
// //                 value={componentData.code}
// //                 onChange={(e) => handleComponentChange('code', e.target.value)}
// //                 className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 border rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
// //                 spellCheck={false}
// //               />
// //             </div>
// //           </div>
// //         ) : (
// //           <RichMarkdownEditor
// //             initialContent={formData.content}
// //             onChange={(content) => setFormData(prev => ({ ...prev, content }))}
// //           />
// // 					) : (
// // 						<textarea
// // 							value={formData.content}
// // 							onChange={(e) => handleContentChange(e.target.value)}
// // 							className='w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
// // 							spellCheck={false}
// // 						/>
// // 					)}
// // 				</div>
// // 			</div>

// // 			<div className='flex gap-4'>
// // 				<button
// // 					type='submit'
// // 					disabled={isSubmitting}
// // 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// // 				>
// // 					{isSubmitting && (
// // 						<Loader2
// // 							className='animate-spin'
// // 							size={16}
// // 						/>
// // 					)}
// // 					{isSubmitting ? "Saving..." : "Save Changes"}
// // 				</button>
// // 				<button
// // 					type='button'
// // 					onClick={() => router.back()}
// // 					className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
// // 				>
// // 					Cancel
// // 				</button>
// // 			</div>
// // 		</form>
// // 	);
// // }

// // // // src/components/EditForm.tsx
// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { supabaseClient } from "@/lib/auth";
// // // import { useAuth } from "@/hooks/useAuth";
// // // import { ImageUpload } from "@/components/ImageUpload";
// // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// // // import { Loader2 } from "lucide-react";
// // // import { categories, CategoryId } from "@/data/categories";

// // // type Post = {
// // // 	id: string;
// // // 	title: string;
// // // 	content: string;
// // // 	excerpt?: string;
// // // 	cover_image?: string;
// // // 	slug: string;
// // // 	category?: CategoryId;
// // // };

// // // export function EditForm({ post }: { post: Post }) {
// // // 	const router = useRouter();
// // // 	const { user } = useAuth();

// // // 	// Initialize content format state
// // // 	const [contentFormat, setContentFormat] = useState(() => {
// // // 		const hasJSXSyntax = post.content.includes("export default") || post.content.includes("function") || post.content.includes("return") || post.content.includes("<");
// // // 		return hasJSXSyntax ? "react" : "markdown";
// // // 	});

// // // 	// Initialize form data with post content
// // // 	const [formData, setFormData] = useState({
// // // 		title: post.title,
// // // 		content: post.content,
// // // 		excerpt: post.excerpt || "",
// // // 		cover_image: post.cover_image || "",
// // // 		category: post.category || ("tech" as CategoryId),
// // // 	});

// // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// // // 	const [error, setError] = useState("");

// // // 	// Keep content in sync with editor changes
// // // 	useEffect(() => {
// // // 		setFormData((prev) => ({
// // // 			...prev,
// // // 			content: post.content,
// // // 		}));
// // // 	}, [post.content]);

// // // 	const handleContentChange = (newContent: string) => {
// // // 		setFormData((prev) => ({
// // // 			...prev,
// // // 			content: newContent,
// // // 		}));
// // // 	};

// // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // 		e.preventDefault();
// // // 		if (!user) return;

// // // 		setIsSubmitting(true);
// // // 		setError("");

// // // 		try {
// // // 			const { error: updateError } = await supabaseClient
// // // 				.from("posts")
// // // 				.update({
// // // 					...formData,
// // // 					updated_at: new Date().toISOString(),
// // // 				})
// // // 				.eq("id", post.id);

// // // 			if (updateError) throw updateError;
// // // 			router.push(`/blog/${post.slug}`);
// // // 			router.refresh();
// // // 		} catch (err) {
// // // 			setError(err instanceof Error ? err.message : "Failed to update post");
// // // 		} finally {
// // // 			setIsSubmitting(false);
// // // 		}
// // // 	};

// // // 	const handleImageDelete = async () => {
// // // 		if (!formData.cover_image) return;
// // // 		setIsImageDeleting(true);
// // // 		try {
// // // 			const path = formData.cover_image.split("/").pop();
// // // 			if (!path) throw new Error("Invalid image path");
// // // 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);
// // // 			if (deleteError) throw deleteError;
// // // 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// // // 		} catch (err) {
// // // 			setError("Failed to delete image");
// // // 		} finally {
// // // 			setIsImageDeleting(false);
// // // 		}
// // // 	};

// // // 	return (
// // // 		<form
// // // 			onSubmit={handleSubmit}
// // // 			className='space-y-6 max-w-4xl mx-auto px-4'
// // // 		>
// // // 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Title</label>
// // // 				<input
// // // 					type='text'
// // // 					value={formData.title}
// // // 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// // // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // 					required
// // // 				/>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Category</label>
// // // 				<select
// // // 					value={formData.category}
// // // 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// // // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // 					required
// // // 				>
// // // 					{categories.map((category) => (
// // // 						<option
// // // 							key={category.id}
// // // 							value={category.id}
// // // 						>
// // // 							{category.name}
// // // 						</option>
// // // 					))}
// // // 				</select>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Format</label>
// // // 				<select
// // // 					value={contentFormat}
// // // 					onChange={(e) => setContentFormat(e.target.value as "markdown" | "react")}
// // // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // 				>
// // // 					<option value='markdown'>Markdown</option>
// // // 					<option value='react'>React Component</option>
// // // 				</select>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// // // 				{formData.cover_image ? (
// // // 					<div className='space-y-4'>
// // // 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// // // 							<ImageWithFallback
// // // 								src={formData.cover_image}
// // // 								alt='Cover image'
// // // 								className='w-full h-full'
// // // 							/>
// // // 						</div>
// // // 						<button
// // // 							type='button'
// // // 							onClick={handleImageDelete}
// // // 							disabled={isImageDeleting}
// // // 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// // // 						>
// // // 							{isImageDeleting && (
// // // 								<Loader2
// // // 									className='animate-spin'
// // // 									size={16}
// // // 								/>
// // // 							)}
// // // 							{isImageDeleting ? "Removing..." : "Remove Image"}
// // // 						</button>
// // // 					</div>
// // // 				) : (
// // // 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// // // 				)}
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// // // 				<textarea
// // // 					value={formData.excerpt}
// // // 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// // // 					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // 				/>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Content</label>
// // // 				<div className='border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'>
// // // 					{contentFormat === "markdown" ? (
// // // 						<RichMarkdownEditor
// // // 							initialContent={formData.content}
// // // 							onChange={handleContentChange}
// // // 						/>
// // // 					) : (
// // // 						<textarea
// // // 							value={formData.content}
// // // 							onChange={(e) => handleContentChange(e.target.value)}
// // // 							className='w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
// // // 							spellCheck={false}
// // // 						/>
// // // 					)}
// // // 				</div>
// // // 			</div>

// // // 			<div className='flex gap-4'>
// // // 				<button
// // // 					type='submit'
// // // 					disabled={isSubmitting}
// // // 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// // // 				>
// // // 					{isSubmitting && (
// // // 						<Loader2
// // // 							className='animate-spin'
// // // 							size={16}
// // // 						/>
// // // 					)}
// // // 					{isSubmitting ? "Saving..." : "Save Changes"}
// // // 				</button>
// // // 				<button
// // // 					type='button'
// // // 					onClick={() => router.back()}
// // // 					className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
// // // 				>
// // // 					Cancel
// // // 				</button>
// // // 			</div>
// // // 		</form>
// // // 	);
// // // }

// // // // src/components/EditForm.tsx
// // // "use client";
// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { supabaseClient } from "@/lib/auth";
// // // import { useAuth } from "@/hooks/useAuth";
// // // import { ImageUpload } from "@/components/ImageUpload";
// // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// // // import { Loader2 } from "lucide-react";
// // // import { categories, CategoryId } from "@/data/categories";

// // // type Post = {
// // // 	id: string;
// // // 	title: string;
// // // 	content: string;
// // // 	excerpt?: string;
// // // 	cover_image?: string;
// // // 	slug: string;
// // // 	category?: CategoryId;
// // // };

// // // export function EditForm({ post }: { post: Post }) {
// // // 	const router = useRouter();
// // // 	const { user } = useAuth();
// // // 	const [isMarkdown, setIsMarkdown] = useState(() => {
// // // 		// Detect if content is markdown
// // // 		const hasJSXSyntax = post.content.includes("export default") || post.content.includes("function") || post.content.includes("return") || post.content.includes("<");
// // // 		return !hasJSXSyntax;
// // // 	});

// // // 	const [formData, setFormData] = useState({
// // // 		title: post.title || "",
// // // 		content: post.content || "",
// // // 		excerpt: post.excerpt || "",
// // // 		cover_image: post.cover_image || "",
// // // 		category: post.category || ("tech" as CategoryId),
// // // 	});
// // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// // // 	const [error, setError] = useState("");

// // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // 		e.preventDefault();
// // // 		if (!user) return;

// // // 		setIsSubmitting(true);
// // // 		setError("");

// // // 		try {
// // // 			const { error: updateError } = await supabaseClient
// // // 				.from("posts")
// // // 				.update({
// // // 					...formData,
// // // 					updated_at: new Date().toISOString(),
// // // 				})
// // // 				.eq("id", post.id);

// // // 			if (updateError) throw updateError;
// // // 			router.push(`/blog/${post.slug}`);
// // // 			router.refresh();
// // // 		} catch (err) {
// // // 			setError(err instanceof Error ? err.message : "Failed to update post");
// // // 		} finally {
// // // 			setIsSubmitting(false);
// // // 		}
// // // 	};

// // // 	const handleImageDelete = async () => {
// // // 		if (!formData.cover_image) return;
// // // 		setIsImageDeleting(true);
// // // 		try {
// // // 			const path = formData.cover_image.split("/").pop();
// // // 			if (!path) throw new Error("Invalid image path");
// // // 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);
// // // 			if (deleteError) throw deleteError;
// // // 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// // // 		} catch (err) {
// // // 			setError("Failed to delete image");
// // // 		} finally {
// // // 			setIsImageDeleting(false);
// // // 		}
// // // 	};

// // // 	return (
// // // 		<form
// // // 			onSubmit={handleSubmit}
// // // 			className='space-y-6 max-w-4xl mx-auto px-4'
// // // 		>
// // // 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Title</label>
// // // 				<input
// // // 					type='text'
// // // 					value={formData.title}
// // // 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// // // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // 					required
// // // 				/>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Category</label>
// // // 				<select
// // // 					value={formData.category}
// // // 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// // // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // 					required
// // // 				>
// // // 					{categories.map((category) => (
// // // 						<option
// // // 							key={category.id}
// // // 							value={category.id}
// // // 						>
// // // 							{category.name}
// // // 						</option>
// // // 					))}
// // // 				</select>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Format</label>
// // // 				<select
// // // 					value={isMarkdown ? "markdown" : "react"}
// // // 					onChange={(e) => setIsMarkdown(e.target.value === "markdown")}
// // // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // 				>
// // // 					<option value='markdown'>Markdown</option>
// // // 					<option value='react'>React Component</option>
// // // 				</select>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// // // 				{formData.cover_image ? (
// // // 					<div className='space-y-4'>
// // // 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// // // 							<ImageWithFallback
// // // 								src={formData.cover_image}
// // // 								alt='Cover image'
// // // 								className='w-full h-full'
// // // 							/>
// // // 						</div>
// // // 						<button
// // // 							type='button'
// // // 							onClick={handleImageDelete}
// // // 							disabled={isImageDeleting}
// // // 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// // // 						>
// // // 							{isImageDeleting && (
// // // 								<Loader2
// // // 									className='animate-spin'
// // // 									size={16}
// // // 								/>
// // // 							)}
// // // 							{isImageDeleting ? "Removing..." : "Remove Image"}
// // // 						</button>
// // // 					</div>
// // // 				) : (
// // // 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// // // 				)}
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// // // 				<textarea
// // // 					value={formData.excerpt}
// // // 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// // // 					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // 				/>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Content</label>
// // // 				<div className='border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'>
// // // 					{isMarkdown ? (
// // // 						<RichMarkdownEditor
// // // 							initialContent={formData.content}
// // // 							onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// // // 						/>
// // // 					) : (
// // // 						<textarea
// // // 							value={formData.content}
// // // 							onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
// // // 							className='w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
// // // 							spellCheck={false}
// // // 						/>
// // // 					)}
// // // 				</div>
// // // 			</div>

// // // 			<div className='flex gap-4'>
// // // 				<button
// // // 					type='submit'
// // // 					disabled={isSubmitting}
// // // 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// // // 				>
// // // 					{isSubmitting && (
// // // 						<Loader2
// // // 							className='animate-spin'
// // // 							size={16}
// // // 						/>
// // // 					)}
// // // 					{isSubmitting ? "Saving..." : "Save Changes"}
// // // 				</button>
// // // 				<button
// // // 					type='button'
// // // 					onClick={() => router.back()}
// // // 					className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
// // // 				>
// // // 					Cancel
// // // 				</button>
// // // 			</div>
// // // 		</form>
// // // 	);
// // // }
// // // // // src/components/EditForm.tsx
// // // // "use client";
// // // // import { useState, useEffect } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { supabaseClient } from "@/lib/auth";
// // // // import { useAuth } from "@/hooks/useAuth";
// // // // import { ImageUpload } from "@/components/ImageUpload";
// // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// // // // import { Loader2 } from "lucide-react";
// // // // import { categories, CategoryId } from "@/data/categories";

// // // // type Post = {
// // // // 	id: string;
// // // // 	title: string;
// // // // 	content: string;
// // // // 	excerpt?: string;
// // // // 	cover_image?: string;
// // // // 	slug: string;
// // // // 	category?: CategoryId;
// // // // 	format?: "markdown" | "react";
// // // // };

// // // // export function EditForm({ post }: { post: Post }) {
// // // // 	const router = useRouter();
// // // // 	const { user } = useAuth();
// // // // 	const [formData, setFormData] = useState({
// // // // 		title: post.title,
// // // // 		content: post.content,
// // // // 		excerpt: post.excerpt || "",
// // // // 		cover_image: post.cover_image || "",
// // // // 		category: post.category || ("tech" as CategoryId),
// // // // 		format: post.format || detectFormat(post.content),
// // // // 	});
// // // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // // 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// // // // 	const [error, setError] = useState("");

// // // // 	function detectFormat(content: string): "markdown" | "react" {
// // // // 		// Check for React component indicators
// // // // 		const hasJSXSyntax = content.includes("export default") || content.includes("function") || content.includes("return") || content.includes("useState") || content.includes("props");
// // // // 		return hasJSXSyntax ? "react" : "markdown";
// // // // 	}

// // // // 	const handleImageDelete = async () => {
// // // // 		if (!formData.cover_image) return;
// // // // 		setIsImageDeleting(true);
// // // // 		try {
// // // // 			const path = formData.cover_image.split("/").pop();
// // // // 			if (!path) throw new Error("Invalid image path");
// // // // 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);
// // // // 			if (deleteError) throw deleteError;
// // // // 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// // // // 		} catch (err) {
// // // // 			setError("Failed to delete image");
// // // // 			console.error("Error deleting image:", err);
// // // // 		} finally {
// // // // 			setIsImageDeleting(false);
// // // // 		}
// // // // 	};

// // // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // // 		e.preventDefault();
// // // // 		if (!user) return;

// // // // 		setIsSubmitting(true);
// // // // 		setError("");

// // // // 		try {
// // // // 			const { error: updateError } = await supabaseClient
// // // // 				.from("posts")
// // // // 				.update({
// // // // 					...formData,
// // // // 					updated_at: new Date().toISOString(),
// // // // 				})
// // // // 				.eq("id", post.id);

// // // // 			if (updateError) throw updateError;

// // // // 			if (post.published) {
// // // // 				router.push(`/blog/${post.slug}`);
// // // // 			} else {
// // // // 				router.push("/blog/drafts");
// // // // 			}
// // // // 			router.refresh();
// // // // 		} catch (err) {
// // // // 			setError(err instanceof Error ? err.message : "Failed to update post");
// // // // 		} finally {
// // // // 			setIsSubmitting(false);
// // // // 		}
// // // // 	};

// // // // 	return (
// // // // 		<form
// // // // 			onSubmit={handleSubmit}
// // // // 			className='space-y-6 max-w-4xl mx-auto px-4'
// // // // 		>
// // // // 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Title</label>
// // // // 				<input
// // // // 					type='text'
// // // // 					value={formData.title}
// // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// // // // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // // 					required
// // // // 				/>
// // // // 			</div>

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Category</label>
// // // // 				<select
// // // // 					value={formData.category}
// // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// // // // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // // 					required
// // // // 				>
// // // // 					{categories.map((category) => (
// // // // 						<option
// // // // 							key={category.id}
// // // // 							value={category.id}
// // // // 						>
// // // // 							{category.name}
// // // // 						</option>
// // // // 					))}
// // // // 				</select>
// // // // 			</div>

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Format</label>
// // // // 				<select
// // // // 					value={formData.format}
// // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, format: e.target.value as "markdown" | "react" }))}
// // // // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // // 				>
// // // // 					<option value='markdown'>Markdown</option>
// // // // 					<option value='react'>React Component</option>
// // // // 				</select>
// // // // 			</div>

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// // // // 				{formData.cover_image ? (
// // // // 					<div className='space-y-4'>
// // // // 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// // // // 							<ImageWithFallback
// // // // 								src={formData.cover_image}
// // // // 								alt='Cover image'
// // // // 								className='w-full h-full'
// // // // 							/>
// // // // 						</div>
// // // // 						<button
// // // // 							type='button'
// // // // 							onClick={handleImageDelete}
// // // // 							disabled={isImageDeleting}
// // // // 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// // // // 						>
// // // // 							{isImageDeleting && (
// // // // 								<Loader2
// // // // 									className='animate-spin'
// // // // 									size={16}
// // // // 								/>
// // // // 							)}
// // // // 							{isImageDeleting ? "Removing..." : "Remove Image"}
// // // // 						</button>
// // // // 					</div>
// // // // 				) : (
// // // // 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// // // // 				)}
// // // // 			</div>

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// // // // 				<textarea
// // // // 					value={formData.excerpt}
// // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// // // // 					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // // // 				/>
// // // // 			</div>

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Content</label>
// // // // 				<div className='border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'>
// // // // 					{formData.format === "react" ? (
// // // // 						<textarea
// // // // 							value={formData.content}
// // // // 							onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
// // // // 							className='w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
// // // // 							spellCheck={false}
// // // // 						/>
// // // // 					) : (
// // // // 						<RichMarkdownEditor
// // // // 							initialContent={formData.content}
// // // // 							onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// // // // 						/>
// // // // 					)}
// // // // 				</div>
// // // // 			</div>

// // // // 			<div className='flex gap-4'>
// // // // 				<button
// // // // 					type='submit'
// // // // 					disabled={isSubmitting}
// // // // 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// // // // 				>
// // // // 					{isSubmitting && (
// // // // 						<Loader2
// // // // 							className='animate-spin'
// // // // 							size={16}
// // // // 						/>
// // // // 					)}
// // // // 					{isSubmitting ? "Saving..." : "Save Changes"}
// // // // 				</button>
// // // // 				<button
// // // // 					type='button'
// // // // 					onClick={() => router.back()}
// // // // 					className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
// // // // 				>
// // // // 					Cancel
// // // // 				</button>
// // // // 			</div>
// // // // 		</form>
// // // // 	);
// // // // }
// // // // // // src/components/EditForm.tsx
// // // // // "use client";
// // // // // import { useState } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { supabaseClient } from "@/lib/auth";
// // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // import { ImageUpload } from "@/components/ImageUpload";
// // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// // // // // import { Loader2 } from "lucide-react";
// // // // // import { categories, CategoryId } from "@/data/categories";

// // // // // type Post = {
// // // // // 	id: string;
// // // // // 	title: string;
// // // // // 	content: string;
// // // // // 	excerpt?: string;
// // // // // 	cover_image?: string;
// // // // // 	slug: string;
// // // // // 	category?: CategoryId;
// // // // // };

// // // // // export function EditForm({ post }: { post: Post }) {
// // // // // 	const router = useRouter();
// // // // // 	const { user } = useAuth();
// // // // // 	const [formData, setFormData] = useState({
// // // // // 		title: post.title,
// // // // // 		content: post.content,
// // // // // 		excerpt: post.excerpt || "",
// // // // // 		cover_image: post.cover_image || "",
// // // // // 		category: post.category || ("tech" as CategoryId),
// // // // // 	});
// // // // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// // // // // 	const [error, setError] = useState("");

// // // // // 	const handleImageDelete = async () => {
// // // // // 		if (!formData.cover_image) return;

// // // // // 		setIsImageDeleting(true);
// // // // // 		try {
// // // // // 			const path = formData.cover_image.split("/").pop();
// // // // // 			if (!path) throw new Error("Invalid image path");

// // // // // 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);

// // // // // 			if (deleteError) throw deleteError;
// // // // // 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// // // // // 		} catch (err) {
// // // // // 			setError("Failed to delete image");
// // // // // 			console.error("Error deleting image:", err);
// // // // // 		} finally {
// // // // // 			setIsImageDeleting(false);
// // // // // 		}
// // // // // 	};

// // // // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // // // 		e.preventDefault();
// // // // // 		if (!user) return;

// // // // // 		setIsSubmitting(true);
// // // // // 		setError("");

// // // // // 		try {
// // // // // 			const { error: updateError } = await supabaseClient
// // // // // 				.from("posts")
// // // // // 				.update({
// // // // // 					...formData,
// // // // // 					updated_at: new Date().toISOString(),
// // // // // 				})
// // // // // 				.eq("id", post.id);

// // // // // 			if (updateError) throw updateError;

// // // // // 			if (post.published) {
// // // // // 				router.push(`/blog/${post.slug}`);
// // // // // 			} else {
// // // // // 				router.push("/blog/drafts");
// // // // // 			}
// // // // // 			router.refresh();
// // // // // 		} catch (err) {
// // // // // 			setError(err instanceof Error ? err.message : "Failed to update post");
// // // // // 		} finally {
// // // // // 			setIsSubmitting(false);
// // // // // 		}
// // // // // 	};

// // // // // 	const handleCancel = () => {
// // // // // 		if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
// // // // // 			router.push(`/blog/${post.slug}`);
// // // // // 		}
// // // // // 	};

// // // // // 	return (
// // // // // 		<form
// // // // // 			onSubmit={handleSubmit}
// // // // // 			className='space-y-6'
// // // // // 		>
// // // // // 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// // // // // 			<div>
// // // // // 				<label className='block text-sm font-medium mb-2'>Title</label>
// // // // // 				<input
// // // // // 					type='text'
// // // // // 					value={formData.title}
// // // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// // // // // 					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// // // // // 					required
// // // // // 				/>
// // // // // 			</div>

// // // // // 			<div>
// // // // // 				<label className='block text-sm font-medium mb-2'>Category</label>
// // // // // 				<select
// // // // // 					value={formData.category}
// // // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// // // // // 					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// // // // // 					required
// // // // // 				>
// // // // // 					{categories.map((category) => (
// // // // // 						<option
// // // // // 							key={category.id}
// // // // // 							value={category.id}
// // // // // 						>
// // // // // 							{category.name}
// // // // // 						</option>
// // // // // 					))}
// // // // // 				</select>
// // // // // 			</div>

// // // // // 			<div>
// // // // // 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// // // // // 				{formData.cover_image ? (
// // // // // 					<div className='space-y-4'>
// // // // // 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// // // // // 							<ImageWithFallback
// // // // // 								src={formData.cover_image}
// // // // // 								alt='Cover image'
// // // // // 								className='w-full h-full'
// // // // // 							/>
// // // // // 						</div>
// // // // // 						<button
// // // // // 							type='button'
// // // // // 							onClick={handleImageDelete}
// // // // // 							disabled={isImageDeleting}
// // // // // 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// // // // // 						>
// // // // // 							{isImageDeleting && (
// // // // // 								<Loader2
// // // // // 									className='animate-spin'
// // // // // 									size={16}
// // // // // 								/>
// // // // // 							)}
// // // // // 							{isImageDeleting ? "Removing..." : "Remove Image"}
// // // // // 						</button>
// // // // // 					</div>
// // // // // 				) : (
// // // // // 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// // // // // 				)}
// // // // // 			</div>

// // // // // 			<div>
// // // // // 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// // // // // 				<textarea
// // // // // 					value={formData.excerpt}
// // // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// // // // // 					className='w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100'
// // // // // 				/>
// // // // // 			</div>

// // // // // 			<div>
// // // // // 				<label className='block text-sm font-medium mb-2'>Content</label>
// // // // // 				<div className='border border-gray-700 rounded-lg overflow-hidden'>
// // // // // 					<RichMarkdownEditor
// // // // // 						initialContent={formData.content}
// // // // // 						onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// // // // // 					/>
// // // // // 				</div>
// // // // // 			</div>

// // // // // 			<div className='flex gap-4'>
// // // // // 				<button
// // // // // 					type='submit'
// // // // // 					disabled={isSubmitting}
// // // // // 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// // // // // 				>
// // // // // 					{isSubmitting && (
// // // // // 						<Loader2
// // // // // 							className='animate-spin'
// // // // // 							size={16}
// // // // // 						/>
// // // // // 					)}
// // // // // 					{isSubmitting ? "Saving..." : "Save Changes"}
// // // // // 				</button>
// // // // // 				<button
// // // // // 					type='button'
// // // // // 					onClick={handleCancel}
// // // // // 					className='bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600'
// // // // // 				>
// // // // // 					Cancel
// // // // // 				</button>
// // // // // 			</div>
// // // // // 		</form>
// // // // // 	);
// // // // // }

// // // // // // // src/components/EditForm.tsx
// // // // // // "use client";
// // // // // // import { useState } from "react";
// // // // // // import { useRouter } from "next/navigation";
// // // // // // import { supabaseClient } from "@/lib/auth";
// // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // import { ImageUpload } from "@/components/ImageUpload";
// // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// // // // // // import { Loader2 } from "lucide-react";
// // // // // // import { categories, CategoryId } from "@/data/categories";

// // // // // // type Post = {
// // // // // // 	id: string;
// // // // // // 	title: string;
// // // // // // 	content: string;
// // // // // // 	excerpt?: string;
// // // // // // 	cover_image?: string;
// // // // // // 	slug: string;
// // // // // // 	category?: CategoryId;
// // // // // // };

// // // // // // export function EditForm({ post }: { post: Post }) {
// // // // // // 	const router = useRouter();
// // // // // // 	const { user } = useAuth();
// // // // // // 	const [formData, setFormData] = useState({
// // // // // // 		title: post.title,
// // // // // // 		content: post.content,
// // // // // // 		excerpt: post.excerpt || "",
// // // // // // 		cover_image: post.cover_image || "",
// // // // // // 		category: post.category || ("tech" as CategoryId),
// // // // // // 	});
// // // // // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // // 	const [error, setError] = useState("");

// // // // // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // // // // 		e.preventDefault();
// // // // // // 		if (!user) return;

// // // // // // 		setIsSubmitting(true);
// // // // // // 		setError("");

// // // // // // 		try {
// // // // // // 			const { error: updateError } = await supabaseClient
// // // // // // 				.from("posts")
// // // // // // 				.update({
// // // // // // 					...formData,
// // // // // // 					updated_at: new Date().toISOString(),
// // // // // // 				})
// // // // // // 				.eq("id", post.id);

// // // // // // 			if (updateError) throw updateError;

// // // // // // 			if (post.published) {
// // // // // // 				router.push(`/blog/${post.slug}`);
// // // // // // 			} else {
// // // // // // 				router.push("/blog/drafts");
// // // // // // 			}
// // // // // // 			router.refresh();
// // // // // // 		} catch (err) {
// // // // // // 			setError(err instanceof Error ? err.message : "Failed to update post");
// // // // // // 		} finally {
// // // // // // 			setIsSubmitting(false);
// // // // // // 		}
// // // // // // 	};

// // // // // // 	const handleImageDelete = async () => {
// // // // // // 		if (!formData.cover_image) return;

// // // // // // 		setIsImageDeleting(true);
// // // // // // 		try {
// // // // // // 			const path = formData.cover_image.split("/").pop();
// // // // // // 			if (!path) throw new Error("Invalid image path");

// // // // // // 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);

// // // // // // 			if (deleteError) throw deleteError;

// // // // // // 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// // // // // // 		} catch (err) {
// // // // // // 			setError("Failed to delete image");
// // // // // // 			console.error("Error deleting image:", err);
// // // // // // 		} finally {
// // // // // // 			setIsImageDeleting(false);
// // // // // // 		}
// // // // // // 	};

// // // // // // 	const handleCancel = () => {
// // // // // // 		if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
// // // // // // 			router.push(`/blog/${post.slug}`);
// // // // // // 		}
// // // // // // 	};

// // // // // // 	return (
// // // // // // 		<form
// // // // // // 			onSubmit={handleSubmit}
// // // // // // 			className='space-y-6'
// // // // // // 		>
// // // // // // 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// // // // // // 			<div>
// // // // // // 				<label className='block text-sm font-medium mb-2'>Title</label>
// // // // // // 				<input
// // // // // // 					type='text'
// // // // // // 					value={formData.title}
// // // // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// // // // // // 					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// // // // // // 					required
// // // // // // 				/>
// // // // // // 			</div>

// // // // // // 			<div>
// // // // // // 				<label className='block text-sm font-medium mb-2'>Category</label>
// // // // // // 				<select
// // // // // // 					value={formData.category}
// // // // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// // // // // // 					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// // // // // // 					required
// // // // // // 				>
// // // // // // 					{categories.map((category) => (
// // // // // // 						<option
// // // // // // 							key={category.id}
// // // // // // 							value={category.id}
// // // // // // 						>
// // // // // // 							{category.name}
// // // // // // 						</option>
// // // // // // 					))}
// // // // // // 				</select>
// // // // // // 			</div>

// // // // // // 			<div>
// // // // // // 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// // // // // // 				{formData.cover_image ? (
// // // // // // 					<div className='space-y-4'>
// // // // // // 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// // // // // // 							<ImageWithFallback
// // // // // // 								src={formData.cover_image}
// // // // // // 								alt='Cover image'
// // // // // // 								className='w-full h-full'
// // // // // // 							/>
// // // // // // 						</div>
// // // // // // 						<button
// // // // // // 							type='button'
// // // // // // 							onClick={handleImageDelete}
// // // // // // 							disabled={isImageDeleting}
// // // // // // 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// // // // // // 						>
// // // // // // 							{isImageDeleting && (
// // // // // // 								<Loader2
// // // // // // 									className='animate-spin'
// // // // // // 									size={16}
// // // // // // 								/>
// // // // // // 							)}
// // // // // // 							{isImageDeleting ? "Removing..." : "Remove Image"}
// // // // // // 						</button>
// // // // // // 					</div>
// // // // // // 				) : (
// // // // // // 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// // // // // // 				)}
// // // // // // 			</div>

// // // // // // 			<div>
// // // // // // 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// // // // // // 				<textarea
// // // // // // 					value={formData.excerpt}
// // // // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// // // // // // 					className='w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100'
// // // // // // 				/>
// // // // // // 			</div>

// // // // // // 			<div>
// // // // // // 				<label className='block text-sm font-medium mb-2'>Content</label>
// // // // // // 				<div className='border border-gray-700 rounded-lg overflow-hidden'>
// // // // // // 					<RichMarkdownEditor
// // // // // // 						initialContent={formData.content}
// // // // // // 						onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// // // // // // 					/>
// // // // // // 				</div>
// // // // // // 			</div>

// // // // // // 			<div className='flex gap-4'>
// // // // // // 				<button
// // // // // // 					type='submit'
// // // // // // 					disabled={isSubmitting}
// // // // // // 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// // // // // // 				>
// // // // // // 					{isSubmitting && (
// // // // // // 						<Loader2
// // // // // // 							className='animate-spin'
// // // // // // 							size={16}
// // // // // // 						/>
// // // // // // 					)}
// // // // // // 					{isSubmitting ? "Saving..." : "Save Changes"}
// // // // // // 				</button>
// // // // // // 				<button
// // // // // // 					type='button'
// // // // // // 					onClick={handleCancel}
// // // // // // 					className='bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600'
// // // // // // 				>
// // // // // // 					Cancel
// // // // // // 				</button>
// // // // // // 			</div>
// // // // // // 		</form>
// // // // // // 	);
// // // // // // }
