// src/components/BlogDashboard.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { categories, CategoryId } from '@/data/categories';
import { PostCard } from '@/components/PostCard';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: CategoryId;
  date: string;
  slug: string;
  cover_image?: string;
};

export default function BlogDashboard({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  const latestTechPost = posts.find(post => post.category === 'tech');
  const latestMediaPost = posts.find(post => post.category === 'media');
  const remainingPosts = posts.filter(post =>
    post.id !== latestTechPost?.id && post.id !== latestMediaPost?.id
  );
  const filteredPosts = activeCategory
    ? remainingPosts.filter(post => post.category === activeCategory)
    : remainingPosts;

  const FeaturedCard = ({ post, category }: { post?: Post, category: typeof categories[0] }) => (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800">
      {post ? (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
          {post.cover_image ? (
            <div className="absolute inset-0">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
          )}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className={`text-sm font-medium ${category.textColor} mb-2`}>
              {category.name}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-300 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </Link>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
          <div className="absolute inset-0 p-6 flex items-center justify-center">
            <p className="text-xl text-white/70">No {category.name} posts yet</p>
          </div>
        </div>
      )}
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveCategory(category.id as CategoryId);
        }}
        className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${category.color}
          text-white text-sm font-medium hover:opacity-90 transition-opacity`}
      >
        {category.name}
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(
                activeCategory === category.id ? null : category.id as CategoryId
              )}
              className={`p-4 rounded-lg flex items-center space-x-3 transition-all
                ${activeCategory === category.id
                  ? category.color + ' text-white'
                  : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <Icon size={24} />
              <span className="font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>

      {activeCategory ? (
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft size={20} />
                <span>Back to all posts</span>
              </button>
              <h2 className="text-3xl font-bold mb-2">
                {categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-gray-300 max-w-2xl">
                {categories.find(c => c.id === activeCategory)?.description}
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="featuredBogsContainer grid md:grid-cols-1 gap-8">
            <FeaturedCard
              post={latestTechPost}
              category={categories[0]}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">All Posts</h2>
            <div className="allPostsContainer grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
