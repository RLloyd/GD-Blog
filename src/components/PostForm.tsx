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

type PostType = 'markdown' | 'component';

type FormData = {
  title: string;
  content: string;
  excerpt: string;
  cover_image: string;
  category: CategoryId;
  type: PostType;
  component_name?: string;
  props?: string;
};

export function PostForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    excerpt: "",
    cover_image: "",
    category: "tech" as CategoryId,
    type: "markdown",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saveAsDraft, setSaveAsDraft] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   if (!user) {
     setError("User not authenticated");
     return;
   }

   setIsSubmitting(true);
   setError("");

   try {
     const slug = formData.title
       .toLowerCase()
       .trim()
       .replace(/[^a-z0-9]+/g, "-")
       .replace(/(^-|-$)+/g, "");

     // Prepare the base post data
     const basePostData = {
       title: formData.title,
       slug,
       excerpt: formData.excerpt,
       cover_image: formData.cover_image,
       category: formData.category,
       published: !saveAsDraft,
       author_id: user.id,
     };

     // Add type-specific data
     const postData = formData.type === 'markdown'
       ? {
           ...basePostData,
           content: formData.content,
           type: 'markdown' as const
         }
       : {
           ...basePostData,
           content: '', // Empty content for component posts
           type: 'component' as const,
           component_name: formData.component_name || '',
           component_props: formData.props ? JSON.stringify(formData.props) : '{}'
         };

     // Log the data being sent
     console.log('Sending post data:', postData);

     // Create the post
     const { data, error: postError } = await supabaseClient
       .from("posts")
       .insert([postData])
       .select()
       .single();

     if (postError) {
       console.error('Supabase error:', postError);
       throw new Error(postError.message);
     }

     if (!data) {
       throw new Error('No data returned from insert');
     }

     console.log('Post created successfully:', data);

     // Navigate and refresh
     router.push(saveAsDraft ? "/blog/drafts" : "/blog");
     router.refresh();
   } catch (err) {
     console.error("Error details:", {
       name: err?.name,
       message: err?.message,
       stack: err?.stack,
       error: err
     });

     if (err instanceof Error) {
       setError(err.message);
     } else {
       setError("Failed to create post. Please check the console for details.");
     }
   } finally {
     setIsSubmitting(false);
   }
 };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;

//     setIsSubmitting(true);
//     setError("");

//     try {
//       const slug = formData.title
//         .toLowerCase()
//         .trim()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)+/g, "");

//       let postData = {
//         title: formData.title,
//         slug,
//         excerpt: formData.excerpt,
//         cover_image: formData.cover_image,
//         category: formData.category,
//         published: !saveAsDraft,
//         author_id: user.id,
//         type: formData.type
//       };

//       // Add type-specific fields
//       if (formData.type === 'markdown') {
//         postData = {
//           ...postData,
//           content: formData.content
//         };
//       } else {
//         postData = {
//           ...postData,
//           component_name: formData.component_name || '',
//           props: formData.props ? JSON.parse(formData.props) : {},
//           content: '' // Empty content for component posts
//         };
//       }

//       const { data, error: postError } = await supabaseClient
//         .from("posts")
//         .insert([postData])
//         .select();

//       if (postError) throw postError;

//       router.push(saveAsDraft ? "/blog/drafts" : "/blog");
//       router.refresh();
//     } catch (err) {
//       console.error("Error creating post:", err);
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("Failed to create post");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Post Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            type: e.target.value as PostType
          }))}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
        >
          <option value="markdown">Markdown</option>
          <option value="component">React Component</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            title: e.target.value
          }))}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            category: e.target.value as CategoryId
          }))}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Image</label>
        <ImageUpload
          onUploadComplete={(url) => setFormData(prev => ({
            ...prev,
            cover_image: url
          }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Excerpt</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            excerpt: e.target.value
          }))}
          className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
        />
      </div>

      {formData.type === 'markdown' ? (
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <RichMarkdownEditor
              initialContent={formData.content}
              onChange={(content) => setFormData(prev => ({
                ...prev,
                content
              }))}
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Component Name</label>
            <input
              type="text"
              value={formData.component_name || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                component_name: e.target.value
              }))}
              className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
              placeholder="e.g., InteractiveCounterPost"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Component Props (JSON)
            </label>
            <textarea
              value={formData.props || '{}'}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                props: e.target.value
              }))}
              className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
              placeholder="{}"
            />
          </div>
        </>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && (
            <Loader2 className="animate-spin" size={16} />
          )}
          {isSubmitting ? "Saving..." : saveAsDraft ? "Save Draft" : "Publish"}
        </button>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={saveAsDraft}
            onChange={(e) => setSaveAsDraft(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span>Save as draft</span>
        </label>
      </div>
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
// 	const [saveAsDraft, setSaveAsDraft] = useState(false);
// 	// Multiple post templates
// 	const [postType, setPostType] = useState<"markdown" | "component">("markdown");
// 	const [componentName, setComponentName] = useState("");
// 	const [componentProps, setComponentProps] = useState("{}");

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

// 			// Add logging
// 			console.log("Saving post with data:", {
// 				...formData,
// 				slug,
// 				published: !saveAsDraft,
// 				author_id: user.id,
// 			});

// 			const { data, error: postError } = await supabaseClient
// 				.from("posts")
// 				.insert([
// 					{
// 						...formData,
// 						slug,
// 						published: !saveAsDraft,
// 						author_id: user.id,
// 					},
// 				])
// 				.select();

// 			console.log("Save response:", { data, error: postError });

// 			if (postError) throw postError;

// 			router.push(saveAsDraft ? "/blog/drafts" : "/blog");
// 			router.refresh();
// 		} catch (err) {
// 			console.error("Error:", err);
// 			setError(err instanceof Error ? err.message : "Failed to create post");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<div>
// 				<label>Post Type</label>
// 				<select
// 					value={postType}
// 					onChange={(e) => setPostType(e.target.value as "markdown" | "component")}
// 				>
// 					<option value='markdown'>Markdown</option>
// 					<option value='component'>React Component</option>
// 				</select>
// 			</div>

// 			{postType === "markdown" ? (
// 				<RichMarkdownEditor
// 					initialContent={formData.content}
// 					onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// 				/>
// 			) : (
// 				<>
// 					<div>
// 						<label>Component Name</label>
// 						<input
// 							type='text'
// 							value={componentName}
// 							onChange={(e) => setComponentName(e.target.value)}
// 							placeholder='e.g., InteractiveChart'
// 						/>
// 					</div>
// 					<div>
// 						<label>Component Props (JSON)</label>
// 						<textarea
// 							value={componentProps}
// 							onChange={(e) => setComponentProps(e.target.value)}
// 							placeholder='{"data": [], "config": {}}'
// 						/>
// 					</div>
// 				</>
// 			)}
// 		</form>

// 		// <form
// 		// 	onSubmit={handleSubmit}
// 		// 	className='space-y-6'
// 		//    >
// 		// 	{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// 		// 	<div>
// 		// 		<label className='block text-sm font-medium mb-2'>Title</label>
// 		// 		<input
// 		// 			type='text'
// 		// 			value={formData.title}
// 		// 			onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// 		// 			className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// 		// 			required
// 		// 		/>
// 		// 	</div>

// 		// 	<div>
// 		// 		<label className='block text-sm font-medium mb-2'>Category</label>
// 		// 		<select
// 		// 			value={formData.category}
// 		// 			onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// 		// 			className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// 		// 			required
// 		// 		>
// 		// 			{categories.map((category) => (
// 		// 				<option
// 		// 					key={category.id}
// 		// 					value={category.id}
// 		// 				>
// 		// 					{category.name}
// 		// 				</option>
// 		// 			))}
// 		// 		</select>
// 		// 	</div>

// 		// 	<div>
// 		// 		<label className='block text-sm font-medium mb-2'>Cover Image</label>
// 		// 		<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// 		// 	</div>

// 		// 	<div>
// 		// 		<label className='block text-sm font-medium mb-2'>Excerpt</label>
// 		// 		<textarea
// 		// 			value={formData.excerpt}
// 		// 			onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// 		// 			className='w-full p-2 border rounded h-[700px] bg-gray-800 border-gray-700 text-gray-100'
// 		// 		/>
// 		// 	</div>

// 		// 	<div>
// 		// 		<label className='block text-sm font-medium mb-2'>Content</label>
// 		// 		<div className='border border-gray-700 rounded-lg overflow-hidden'>
// 		// 			<RichMarkdownEditor
// 		// 				initialContent={formData.content}
// 		// 				onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// 		// 			/>
// 		// 		</div>
// 		// 	</div>

// 		// 	<button
// 		// 		type='submit'
// 		// 		disabled={isSubmitting}
// 		// 		className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// 		// 	>
// 		// 		{isSubmitting && (
// 		// 			<Loader2
// 		// 				className='animate-spin'
// 		// 				size={16}
// 		// 			/>
// 		// 		)}
// 		// 		{isSubmitting ? "Creating..." : "Create Post"}
// 		// 	</button>
// 		// 	{/* Save as Draft */}
// 		// 	<div className='flex items-center gap-4'>
// 		// 		<button
// 		// 			type='submit'
// 		// 			disabled={isSubmitting}
// 		// 			className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// 		// 		>
// 		// 			{isSubmitting && (
// 		// 				<Loader2
// 		// 					className='animate-spin'
// 		// 					size={16}
// 		// 				/>
// 		// 			)}
// 		// 			{isSubmitting ? "Saving..." : saveAsDraft ? "Save Draft" : "Publish"}
// 		// 		</button>

// 		// 		<label className='flex items-center gap-2'>
// 		// 			<input
// 		// 				type='checkbox'
// 		// 				checked={saveAsDraft}
// 		// 				onChange={(e) => setSaveAsDraft(e.target.checked)}
// 		// 				className='rounded border-gray-300'
// 		// 			/>
// 		// 			<span>Save as draft</span>
// 		// 		</label>
// 		// 	</div>
// 		// </form>
// 	);
// }
