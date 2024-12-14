/*-= src/components/DeletePost.tsx =-*/
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export function DeletePost({ postId }: { postId: string }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		if (!confirm("Are you sure you want to delete this post?")) return;

		console.log("Starting delete process for post:", postId);
		setIsDeleting(true);

		try {
			// First verify we can delete this post
			const { data: post, error: fetchError } = await supabaseClient.from("posts").select("id, author_id").eq("id", postId).single();

			if (fetchError) throw fetchError;

			// Get current user
			const {
				data: { user },
				error: userError,
			} = await supabaseClient.auth.getUser();
			if (userError) throw userError;

			if (!user) {
				throw new Error("Not authenticated");
			}

			// Verify ownership
			if (post.author_id !== user.id) {
				throw new Error("Not authorized to delete this post");
			}

			// Delete the post
			const { error: deleteError } = await supabaseClient.from("posts").delete().eq("id", postId).eq("author_id", user.id); // Additional safety check

			if (deleteError) throw deleteError;

			// Navigate and revalidate
			await router.push("/blog");
			await fetch("/api/revalidate", { method: "POST" });
			router.refresh();
		} catch (err) {
			console.error("Failed to delete post:", err);
			alert(err instanceof Error ? err.message : "Failed to delete post");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<button
			onClick={handleDelete}
			disabled={isDeleting}
			className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
		>
			{isDeleting && (
				<Loader2
					className='animate-spin'
					size={16}
				/>
			)}
			{isDeleting ? "Deleting..." : "Delete Post"}
		</button>
	);
}
