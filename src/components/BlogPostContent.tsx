// src/components/BlogPostContent.tsx - Client Component
'use client'
import { Article, Title, Metadata, Content } from './BlogPost.styles'
import { MarkdownContent } from '@/components/MarkdownContent'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { Reactions } from '@/components/Reactions'
import { Comments } from '@/components/Comments'
import Link from 'next/link'
import { DeletePost } from '@/components/DeletePost'

type Post = {
  id: string
  title: string
  content: string
  excerpt?: string
  cover_image?: string
  created_at: string
  slug: string
  profiles?: {
    username?: string
  }
}

export default function BlogPostContent({ post }: { post: Post }) {
  return (
    <Article>
      <div className="flex justify-between items-center mb-8">
        <Link href="/blog" className="text-blue-400 hover:text-blue-300">
          ← Back to posts
        </Link>
        <div className="space-x-4">
          <Link href={`/blog/edit/${post.slug}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit Post
          </Link>
          <DeletePost postId={post.id} />
        </div>
      </div>

      {post.cover_image && (
        <div className="relative rounded-lg overflow-hidden mb-8 aspect-video">
          <ImageWithFallback
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full"
            priority
          />
        </div>
      )}

      <header>
        <Title>{post.title}</Title>
        <Metadata>
          {new Date(post.created_at).toLocaleDateString()} •
          {post.profiles?.username || 'Anonymous'}
        </Metadata>
      </header>

      {post.excerpt && (
        <p className="text-xl text-gray-300 mb-8 font-serif italic">
          {post.excerpt}
        </p>
      )}

      <Content>
        <MarkdownContent content={post.content} />
        <div className="mt-8 border-t border-gray-700 pt-8">
          <Reactions postId={post.id} />
        </div>
      </Content>

      <Comments postId={post.id} />
    </Article>
  )
}