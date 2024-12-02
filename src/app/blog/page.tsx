// src/app/blog/page.tsx

import Link from 'next/link';
import { supabaseClient } from '@/lib/auth';
import BlogDashboard from '@/components/BlogDashboard';

/*---==============================================================
This is a React functional component named BlogList that fetches
and displays a list of published blog posts from a Supabase database.
It handles errors, transforms the post data, and renders a
dashboard with a "Write Post" link and a list of posts.
 ==============================================================---*/
export default async function BlogList() {
  const { data: posts, error } = await supabaseClient
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    return <div>Error loading posts</div>
  }

  // Transform the posts data
  const formattedPosts = posts?.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    category: post.category || 'tech',
    date: new Date(post.created_at).toLocaleDateString(),
    slug: post.slug,
    cover_image: post.cover_image
  })) || []

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 px-4">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link
          href="/blog/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Write Post
        </Link>
      </div>

      <BlogDashboard posts={formattedPosts} />
    </div>
  )
}
