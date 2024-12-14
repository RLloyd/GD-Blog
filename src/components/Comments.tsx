/*-= src/components/Comments.tsx =-*/
"use client";
import { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/auth";
import Image from "next/image";

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
			<h2 className='text-2xl font-bold mb-6 text-gray-500'>Comments</h2>
			{error && <div className='mb-4 p-3 bg-red-500/10 text-red-500 rounded'>{error}</div>}
			<form
				onSubmit={handleSubmit}
				className='mb-8 space-y-4'
			>
				<div>
					<label className='block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400'>Name</label>
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
					<label className='block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400'>Comment</label>
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

			{/* <div className='space-y-4'>
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
			</div> */}

			<div className='space-y-4'>
				{comments.length === 0 ? (
					<div className='text-center'>
						<Image
							src='/assets/Be-the-first.png'
							alt='Be the first to comment'
							width={200}
							height={150}
							className='mx-auto mb-4'
						/>
						<p className='text-gray-400'>No comments yet</p>
					</div>
				) : (
					comments.map((comment) => (
						<div
							key={comment.id}
							className='border border-gray-700 rounded p-4 bg-gray-800'
						>
							<div className='text-sm text-gray-400 mb-2'>
								{comment.author_name || "Anonymous"} • {new Date(comment.created_at).toLocaleDateString()}
							</div>
							<p className='text-gray-200'>{comment.content}</p>
						</div>
					))
				)}
			</div>
		</div>
	);
}
