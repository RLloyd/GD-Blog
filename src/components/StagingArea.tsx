// src/components/StagingArea.tsx
"use client";
import React, { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import { categories } from "@/data/categories";

// const StagingArea = () => {
export default function StagingArea() {
	const [draftPosts, setDraftPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		loadDrafts();
	}, []);

	const loadDrafts = async () => {
		try {
			const { data, error } = await supabaseClient.from("posts").select("*").eq("published", false).order("updated_at", { ascending: false });

			console.log("Drafts data:", data); // Add this log
			console.log("Error if any:", error); // Add this log

			if (error) throw error;
			setDraftPosts(data || []);
		} catch (err) {
			console.error("Error loading drafts:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const publishPost = async (postId) => {
		try {
			const { error } = await supabaseClient.from("posts").update({ published: true, updated_at: new Date().toISOString() }).eq("id", postId);

			if (error) throw error;
			loadDrafts();
			router.refresh();
		} catch (err) {
			console.error("Error publishing post:", err);
		}
	};

	const deletePost = async (postId) => {
		if (!window.confirm("Are you sure you want to delete this draft?")) return;

		try {
			const { error } = await supabaseClient.from("posts").delete().eq("id", postId);

			if (error) throw error;
			loadDrafts();
		} catch (err) {
			console.error("Error deleting post:", err);
		}
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-32'>
				<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500'></div>
			</div>
		);
	}

	return (
		<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-6'>
			<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>Draft Posts</h2>

			{draftPosts.length === 0 ? (
				<p className='text-gray-600 dark:text-gray-400'>No draft posts available.</p>
			) : (
				<div className='space-y-4'>
					{draftPosts.map((post) => (
						<div
							key={post.id}
							className='flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm'
						>
							<div className='flex-1'>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>{post.title}</h3>
								<div className='flex items-center gap-4'>
									<span className='text-sm text-gray-600 dark:text-gray-400'>Last updated: {new Date(post.updated_at).toLocaleDateString()}</span>
									<span className={`text-sm px-2 py-1 rounded-full ${categories.find((c) => c.id === post.category)?.color || "bg-gray-200 dark:bg-gray-600"}`}>{categories.find((c) => c.id === post.category)?.name || "Uncategorized"}</span>
								</div>
							</div>

							<div className='flex items-center gap-3'>
								<Link
									href={`/blog/${post.slug}?preview=true`}
									className='p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
								>
									<Eye size={20} />
								</Link>
								<Link
									href={`/blog/edit/${post.slug}`}
									className='p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
								>
									<Edit size={20} />
								</Link>
								<button
									onClick={() => publishPost(post.id)}
									className='p-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
									title='Publish post'
								>
									<CheckCircle size={20} />
								</button>
								<button
									onClick={() => deletePost(post.id)}
									className='p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
									title='Delete draft'
								>
									<Trash2 size={20} />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

// export default StagingArea;
