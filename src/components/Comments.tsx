// src/components/Comments.tsx
"use client";
import { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/auth";

type Comment = {
	id: string;
	post_id: string;
	content: string;
	author_name?: string;
	created_at: string;
};

export function Comments({ postId }: { postId: string }) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [content, setContent] = useState("");
	const [authorName, setAuthorName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadComments();
	}, [postId]);

	const loadComments = async () => {
		const { data, error } = await supabaseClient.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });

		if (error) {
			setError("Failed to load comments");
			return;
		}
		setComments(data || []);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim() || !authorName.trim()) return;

		setIsSubmitting(true);
		setError(null);

		try {
			const { error: insertError } = await supabaseClient.from("comments").insert({
				post_id: postId,
				content: content.trim(),
				author_name: authorName.trim(),
				created_at: new Date().toISOString(),
			});

			if (insertError) throw insertError;

			setContent("");
			setAuthorName("");
			await loadComments();
		} catch (err) {
			setError("Failed to post comment");
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='mt-12'>
			<h2 className='text-2xl font-bold mb-6 text-gray-100'>Comments</h2>
			{error && <div className='mb-4 p-3 bg-red-500/10 text-red-500 rounded'>{error}</div>}
			<form
				onSubmit={handleSubmit}
				className='mb-8 space-y-4'
			>
				<div>
					<label className='block text-sm font-medium mb-2 text-gray-300'>Name</label>
					<input
						type='text'
						value={authorName}
						onChange={(e) => setAuthorName(e.target.value)}
						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
						required
						placeholder='Your name'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium mb-2 text-gray-300'>Comment</label>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
						rows={3}
						required
						placeholder='Write a comment...'
					/>
				</div>
				<button
					type='submit'
					disabled={isSubmitting}
					className='bg-primary-500 text-gray-100 px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50'
				>
					{isSubmitting ? "Posting..." : "Post Comment"}
				</button>
			</form>

			<div className='space-y-4'>
				{comments.map((comment) => (
					<div
						key={comment.id}
						className='border border-gray-700 rounded p-4 bg-gray-800'
					>
						<div className='text-sm text-gray-400 mb-2'>
							{comment.author_name || "Anonymous"} • {new Date(comment.created_at).toLocaleDateString()}
						</div>
						<p className='text-gray-200'>{comment.content}</p>
					</div>
				))}
				{comments.length === 0 && <p className='text-gray-400'>No comments yet</p>}
			</div>
		</div>
	);
}
// // src/components/Comments.tsx
// "use client";
// import { useState, useEffect } from "react";
// import { supabaseClient } from "@/lib/auth";

// type Comment = {
// 	id: string;
// 	post_id: string;
// 	content: string;
// 	author_name: string;
// 	created_at: string;
// };

// export function Comments({ postId }: { postId: string }) {
// 	const [comments, setComments] = useState<Comment[]>([]);
// 	const [content, setContent] = useState("");
// 	const [authorName, setAuthorName] = useState("");
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		loadComments();
// 	}, [postId]);

// 	const loadComments = async () => {
// 		try {
// 			const { data, error } = await supabaseClient.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });

// 			if (error) throw error;
// 			setComments(data || []);
// 		} catch (err) {
// 			setError("Failed to load comments");
// 			console.error(err);
// 		}
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		setError(null);

// 		if (!content.trim() || !authorName.trim()) return;

// 		setIsSubmitting(true);
// 		try {
// 			// First create the comment
// 			const { error: insertError } = await supabaseClient.from("comments").insert({
// 				post_id: postId,
// 				content: content.trim(),
// 				author_name: authorName.trim(),
// 			});

// 			if (insertError) throw insertError;

// 			// Clear form and reload comments
// 			setContent("");
// 			setAuthorName("");
// 			await loadComments();
// 		} catch (err) {
// 			console.error("Insert error:", err);
// 			setError("Failed to post comment. Please try again.");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	return (
// 		<div className='mt-12'>
// 			<h2 className='text-2xl font-bold mb-6 text-gray-100'>Comments</h2>

// 			{error && <div className='mb-4 p-3 bg-red-500/10 text-red-500 rounded'>{error}</div>}

// 			<form
// 				onSubmit={handleSubmit}
// 				className='mb-8 space-y-4'
// 			>
// 				<div>
// 					<label className='block text-sm font-medium mb-2 text-gray-300'>Name</label>
// 					<input
// 						type='text'
// 						value={authorName}
// 						onChange={(e) => setAuthorName(e.target.value)}
// 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// 						required
// 						placeholder='Your name'
// 					/>
// 				</div>
// 				<div>
// 					<label className='block text-sm font-medium mb-2 text-gray-300'>Comment</label>
// 					<textarea
// 						value={content}
// 						onChange={(e) => setContent(e.target.value)}
// 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// 						rows={3}
// 						required
// 						placeholder='Write a comment...'
// 					/>
// 				</div>
// 				<button
// 					type='submit'
// 					disabled={isSubmitting}
// 					className='bg-primary-500 text-gray-100 px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50'
// 				>
// 					{isSubmitting ? "Posting..." : "Post Comment"}
// 				</button>
// 			</form>

// 			<div className='space-y-4'>
// 				{comments.map((comment) => (
// 					<div
// 						key={comment.id}
// 						className='border border-gray-700 rounded p-4 bg-gray-800'
// 					>
// 						<div className='text-sm text-gray-400 mb-2'>
// 							{comment.author_name} • {new Date(comment.created_at).toLocaleDateString()}
// 						</div>
// 						<p className='text-gray-200'>{comment.content}</p>
// 					</div>
// 				))}
// 				{comments.length === 0 && <p className='text-gray-400'>No comments yet</p>}
// 			</div>
// 		</div>
// 	);
// }

// // // src/components/Comments.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import { supabaseClient } from "@/lib/auth";

// // export function Comments({ postId }: { postId: string }) {
// // 	const [comments, setComments] = useState<any[]>([]);
// // 	const [content, setContent] = useState("");
// // 	const [authorName, setAuthorName] = useState("");
// // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // 	const [error, setError] = useState<string | null>(null);

// // 	useEffect(() => {
// // 		loadComments();
// // 	}, [postId]);

// // 	const loadComments = async () => {
// // 		try {
// // 			const { data, error } = await supabaseClient.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });

// // 			if (error) throw error;
// // 			setComments(data || []);
// // 		} catch (err) {
// // 			setError("Failed to load comments. Please try refreshing the page.");
// // 		}
// // 	};

// // 	const handleSubmit = async (e: React.FormEvent) => {
// // 		e.preventDefault();
// // 		setError(null);
// // 		if (!content.trim() || !authorName.trim()) return;

// // 		setIsSubmitting(true);
// // 		try {
// // 			const { error: insertError } = await supabaseClient.from("comments").insert([
// // 				{
// // 					content: content.trim(),
// // 					post_id: postId,
// // 					author_name: authorName.trim(),
// // 					created_at: new Date().toISOString(),
// // 				},
// // 			]);

// // 			if (insertError) throw insertError;

// // 			setContent("");
// // 			setAuthorName("");
// // 			await loadComments();
// // 		} catch (err) {
// // 			setError(err instanceof Error ? err.message : "Failed to post comment. Please try again.");
// // 		} finally {
// // 			setIsSubmitting(false);
// // 		}
// // 	};

// // 	return (
// // 		<div className='mt-12'>
// // 			<h2 className='text-2xl font-bold mb-6 text-gray-100'>Comments</h2>

// // 			{error && <div className='mb-4 p-3 bg-red-500/10 text-red-500 rounded'>{error}</div>}

// // 			<form
// // 				onSubmit={handleSubmit}
// // 				className='mb-8 space-y-4'
// // 			>
// // 				<div>
// // 					<label className='block text-sm font-medium mb-2 text-gray-300'>Name</label>
// // 					<input
// // 						type='text'
// // 						value={authorName}
// // 						onChange={(e) => setAuthorName(e.target.value)}
// // 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// // 						required
// // 						placeholder='Your name'
// // 					/>
// // 				</div>
// // 				<div>
// // 					<label className='block text-sm font-medium mb-2 text-gray-300'>Comment</label>
// // 					<textarea
// // 						value={content}
// // 						onChange={(e) => setContent(e.target.value)}
// // 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// // 						rows={3}
// // 						required
// // 						placeholder='Write a comment...'
// // 					/>
// // 				</div>
// // 				<button
// // 					type='submit'
// // 					disabled={isSubmitting}
// // 					className='bg-primary-500 text-gray-100 px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50'
// // 				>
// // 					{isSubmitting ? "Posting..." : "Post Comment"}
// // 				</button>
// // 			</form>

// // 			<div className='space-y-4'>
// // 				{comments.map((comment) => (
// // 					<div
// // 						key={comment.id}
// // 						className='border border-gray-700 rounded p-4 bg-gray-800'
// // 					>
// // 						<div className='text-sm text-gray-400 mb-2'>
// // 							{comment.author_name} • {new Date(comment.created_at).toLocaleDateString()}
// // 						</div>
// // 						<p className='text-gray-200'>{comment.content}</p>
// // 					</div>
// // 				))}
// // 				{comments.length === 0 && <p className='text-gray-400'>No comments yet</p>}
// // 			</div>
// // 		</div>
// // 	);
// // }
// // // // src/components/Comments.tsx
// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { supabaseClient } from "@/lib/auth";

// // // export function Comments({ postId }: { postId: string }) {
// // // 	const [comments, setComments] = useState<any[]>([]);
// // // 	const [content, setContent] = useState("");
// // // 	const [authorName, setAuthorName] = useState("");
// // // 	const [isSubmitting, setIsSubmitting] = useState(false);

// // // 	useEffect(() => {
// // // 		loadComments();
// // // 	}, [postId]);

// // // 	const loadComments = async () => {
// // // 		const { data } = await supabaseClient.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });

// // // 		setComments(data || []);
// // // 	};

// // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // 		e.preventDefault();
// // // 		if (!content.trim() || !authorName.trim()) return;

// // // 		setIsSubmitting(true);
// // // 		try {
// // // 			await supabaseClient.from("comments").insert({
// // // 				content: content.trim(),
// // // 				post_id: postId,
// // // 				author_name: authorName.trim(),
// // // 			});
// // // 			setContent("");
// // // 			loadComments();
// // // 		} finally {
// // // 			setIsSubmitting(false);
// // // 		}
// // // 	};

// // // 	return (
// // // 		<div className='mt-12'>
// // // 			<h2 className='text-2xl font-bold mb-6 text-gray-100'>Comments</h2>

// // // 			<form
// // // 				onSubmit={handleSubmit}
// // // 				className='mb-8 space-y-4'
// // // 			>
// // // 				<div>
// // // 					<label className='block text-sm font-medium mb-2 text-gray-300'>Name</label>
// // // 					<input
// // // 						type='text'
// // // 						value={authorName}
// // // 						onChange={(e) => setAuthorName(e.target.value)}
// // // 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// // // 						required
// // // 						placeholder='Your name'
// // // 					/>
// // // 				</div>
// // // 				<div>
// // // 					<label className='block text-sm font-medium mb-2 text-gray-300'>Comment</label>
// // // 					<textarea
// // // 						value={content}
// // // 						onChange={(e) => setContent(e.target.value)}
// // // 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// // // 						rows={3}
// // // 						required
// // // 						placeholder='Write a comment...'
// // // 					/>
// // // 				</div>
// // // 				<button
// // // 					type='submit'
// // // 					disabled={isSubmitting}
// // // 					className='bg-primary-500 text-gray-100 px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50'
// // // 				>
// // // 					{isSubmitting ? "Posting..." : "Post Comment"}
// // // 				</button>
// // // 			</form>

// // // 			<div className='space-y-4'>
// // // 				{comments.map((comment) => (
// // // 					<div
// // // 						key={comment.id}
// // // 						className='border border-gray-700 rounded p-4 bg-gray-800'
// // // 					>
// // // 						<div className='text-sm text-gray-400 mb-2'>
// // // 							{comment.author_name || "Anonymous"} • {new Date(comment.created_at).toLocaleDateString()}
// // // 						</div>
// // // 						<p className='text-gray-200'>{comment.content}</p>
// // // 					</div>
// // // 				))}
// // // 				{comments.length === 0 && <p className='text-gray-400'>No comments yet</p>}
// // // 			</div>
// // // 		</div>
// // // 	);
// // // }

// // // // // src/components/Comments.tsx
// // // // 'use client'
// // // // import { useState, useEffect } from 'react'
// // // // import { useAuth } from '@/hooks/useAuth'
// // // // import { supabaseClient } from '@/lib/auth'

// // // // export function Comments({ postId }: { postId: string }) {
// // // //   const { user } = useAuth()
// // // //   const [comments, setComments] = useState<any[]>([])
// // // //   const [content, setContent] = useState('')
// // // //   const [isSubmitting, setIsSubmitting] = useState(false)

// // // //   useEffect(() => {
// // // //     loadComments()
// // // //   }, [postId])

// // // //   const loadComments = async () => {
// // // //     const { data } = await supabaseClient
// // // //       .from('comments')
// // // //       .select('*, profiles(username)')
// // // //       .eq('post_id', postId)
// // // //       .order('created_at', { ascending: true })

// // // //     setComments(data || [])
// // // //   }

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     if (!user || !content.trim()) return

// // // //     setIsSubmitting(true)
// // // //     try {
// // // //       await supabaseClient.from('comments').insert({
// // // //         content: content.trim(),
// // // //         post_id: postId,
// // // //         author_id: user.id
// // // //       })
// // // //       setContent('')
// // // //       loadComments()
// // // //     } finally {
// // // //       setIsSubmitting(false)
// // // //     }
// // // //   }

// // // //   return (
// // // //    <div className="mt-12">
// // // //      <h2 className="text-2xl font-bold mb-6 text-gray-100">Comments</h2>

// // // //      {user ? (
// // // //        <form onSubmit={handleSubmit} className="mb-8">
// // // //          <textarea
// // // //            value={content}
// // // //            onChange={(e) => setContent(e.target.value)}
// // // //            className="w-full p-2 border rounded bg-gray-800 text-gray-200 border-gray-700"
// // // //            rows={3}
// // // //            required
// // // //            placeholder="Write a comment..."
// // // //          />
// // // //          <button
// // // //            type="submit"
// // // //            disabled={isSubmitting}
// // // //            className="mt-2 bg-blue-500 text-gray-100 px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // //          >
// // // //            {isSubmitting ? 'Posting...' : 'Post Comment'}
// // // //          </button>
// // // //        </form>
// // // //      ) : (
// // // //        <p className="mb-8 text-gray-300">Please sign in to comment</p>
// // // //      )}

// // // //      <div className="space-y-4">
// // // //        {comments.map((comment) => (
// // // //          <div key={comment.id} className="border border-gray-700 rounded p-4 bg-gray-800">
// // // //            <div className="text-sm text-gray-400 mb-2">
// // // //              {comment.profiles?.username || 'Anonymous'} • {' '}
// // // //              {new Date(comment.created_at).toLocaleDateString()}
// // // //            </div>
// // // //            <p className="text-gray-200">{comment.content}</p>
// // // //          </div>
// // // //        ))}
// // // //        {comments.length === 0 && (
// // // //          <p className="text-gray-400">No comments yet</p>
// // // //        )}
// // // //      </div>
// // // //    </div>
// // // //  )

// // // // //   return (
// // // // //     <div className="mt-12">
// // // // //       <h2 className="text-2xl font-bold mb-6">Comments</h2>

// // // // //       {user ? (
// // // // //         <form onSubmit={handleSubmit} className="mb-8">
// // // // //           <textarea
// // // // //             value={content}
// // // // //             onChange={(e) => setContent(e.target.value)}
// // // // //             className="w-full p-2 border rounded bg-white text-gray-900"
// // // // //             rows={3}
// // // // //             required
// // // // //             placeholder="Write a comment..."
// // // // //           />
// // // // //           <button
// // // // //             type="submit"
// // // // //             disabled={isSubmitting}
// // // // //             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // // //           >
// // // // //             {isSubmitting ? 'Posting...' : 'Post Comment'}
// // // // //           </button>
// // // // //         </form>
// // // // //       ) : (
// // // // //         <p className="mb-8 text-gray-600">Please sign in to comment</p>
// // // // //       )}

// // // // //       <div className="space-y-4">
// // // // //         {comments.map((comment) => (
// // // // //           <div key={comment.id} className="border rounded p-4 bg-white">
// // // // //             <div className="text-sm text-gray-600 mb-2">
// // // // //               {comment.profiles?.username || 'Anonymous'} • {' '}
// // // // //               {new Date(comment.created_at).toLocaleDateString()}
// // // // //             </div>
// // // // //             <p>{comment.content}</p>
// // // // //           </div>
// // // // //         ))}
// // // // //         {comments.length === 0 && (
// // // // //           <p className="text-gray-500">No comments yet</p>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }
// // // // // 'use client'
// // // // // import { useState } from 'react'
// // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // import { supabaseClient } from '@/lib/auth'

// // // // // export function Comments({ postId }: { postId: string }) {
// // // // //   const { user } = useAuth()
// // // // //   const [comments, setComments] = useState<any[]>([])
// // // // //   const [content, setContent] = useState('')
// // // // //   const [isSubmitting, setIsSubmitting] = useState(false)

// // // // //   const loadComments = async () => {
// // // // //     const { data } = await supabaseClient
// // // // //       .from('comments')
// // // // //       .select('*, profiles(username)')
// // // // //       .eq('post_id', postId)
// // // // //       .order('created_at', { ascending: true })

// // // // //     setComments(data || [])
// // // // //   }

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault()
// // // // //     if (!user || !content.trim()) return

// // // // //     setIsSubmitting(true)
// // // // //     try {
// // // // //       await supabaseClient.from('comments').insert({
// // // // //         content: content.trim(),
// // // // //         post_id: postId,
// // // // //         author_id: user.id
// // // // //       })
// // // // //       setContent('')
// // // // //       loadComments()
// // // // //     } finally {
// // // // //       setIsSubmitting(false)
// // // // //     }
// // // // //   }

// // // // //   return (
// // // // //     <div className="mt-12">
// // // // //       <h2 className="text-2xl font-bold mb-6">Comments</h2>

// // // // //       {user ? (
// // // // //         <form onSubmit={handleSubmit} className="mb-8">
// // // // //           <textarea
// // // // //             value={content}
// // // // //             onChange={(e) => setContent(e.target.value)}
// // // // //             className="w-full p-2 border rounded bg-white text-gray-900"
// // // // //             rows={3}
// // // // //             required
// // // // //           />
// // // // //           <button
// // // // //             type="submit"
// // // // //             disabled={isSubmitting}
// // // // //             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // // //           >
// // // // //             {isSubmitting ? 'Posting...' : 'Post Comment'}
// // // // //           </button>
// // // // //         </form>
// // // // //       ) : (
// // // // //         <p>Please sign in to comment</p>
// // // // //       )}

// // // // //       <div className="space-y-4">
// // // // //         {comments.map((comment) => (
// // // // //           <div key={comment.id} className="border rounded p-4">
// // // // //             <div className="text-sm text-gray-600 mb-2">
// // // // //               {comment.profiles?.username || 'Anonymous'} •
// // // // //               {new Date(comment.created_at).toLocaleDateString()}
// // // // //             </div>
// // // // //             <p>{comment.content}</p>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }
