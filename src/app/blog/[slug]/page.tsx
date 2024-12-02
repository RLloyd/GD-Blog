// src/app/blog/[slug]/page.tsx - Server Component
import { supabaseClient } from '@/lib/auth'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/BlogPostContent'

export default async function BlogPostPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const { data: post } = await supabaseClient
    .from('posts')
    .select('*, profiles(username)')
    .eq('slug', slug)
    .single()

  if (!post) notFound()

  return <BlogPostContent post={post} />
}

