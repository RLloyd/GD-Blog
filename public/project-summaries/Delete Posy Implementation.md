<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* Base styles */
body {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}
</style>

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

# Delete Post Implementation

## Overview

Implemented secure post deletion functionality in the blog with proper Row Level Security (RLS) and user authorization checks.

## Key Components Modified

### 1. Supabase RLS Policy

Added a new Row Level Security policy to allow users to delete only their own posts:

```sql
create policy "Users can delete own posts"
  on posts
  for delete
  using (auth.uid() = author_id);
```

### 2. DeletePost Component

Location: `src/components/DeletePost.tsx`

- Implemented secure deletion with user verification
- Added loading states and error handling
- Includes proper navigation and cache revalidation

```typescript
export function DeletePost({ postId }: { postId: string }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		if (!confirm("Are you sure you want to delete this post?")) return;
		setIsDeleting(true);

		try {
			const { error: deleteError } = await supabaseClient.from("posts").delete().eq("id", postId);

			if (deleteError) throw deleteError;

			await router.push("/blog");
			router.refresh();
			await fetch("/api/revalidate", { method: "POST" });
		} catch (err) {
			console.error("Delete error:", err);
			alert("Failed to delete post");
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
```

### 3. Revalidation Endpoint

Location: `src/app/api/revalidate/route.ts`

- Handles cache revalidation after post deletion
- Ensures blog listing is updated immediately

## Security Features

1. Row Level Security (RLS) ensures users can only delete their own posts
2. Confirmation dialog prevents accidental deletions
3. Loading states prevent duplicate delete requests
4. Error handling with user feedback

## User Flow

1. User clicks "Delete Post"
2. Confirmation dialog appears
3. If confirmed:
   - Button shows loading state
   - Post is deleted from database
   - User is redirected to blog listing
   - Cache is revalidated
   - Blog listing is refreshed

## Error Handling

- Failed deletions show alert messages
- Console errors are logged for debugging
- Loading state is cleared after success/failure

## Git Commit Message Template

```git
feat(blog): implement secure post deletion

- Add RLS policy for post deletion
- Implement DeletePost component with loading states
- Add revalidation endpoint for cache management
- Include confirmation dialog and error handling
- Ensure proper user authorization

Requires Supabase RLS policy to be set up for post deletion.
```

## Testing Checklist

- [x] RLS policy is properly configured in Supabase
- [x] Delete confirmation appears
- [x] Loading state shows during deletion
- [x] Successful deletion redirects to blog listing
- [x] Blog listing updates after deletion
- [x] Error messages appear for failed deletions
