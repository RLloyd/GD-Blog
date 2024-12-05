// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { CategoryId } from '@/data/categories';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Define types for your blog posts
export type Post = {
   id: string
   title: string
   slug: string
   content: string
   excerpt?: string
   category: CategoryId
   published: boolean
   created_at: string
   updated_at: string
}

// API functions for posts
export const blogApi = {
   // Get all posts
   async getAllPosts() {
      const { data, error } = await supabase
         .from('posts')
         .select('*')
         .eq('published', true)
         .order('created_at', { ascending: false })

      if (error) throw error
      return data as Post[]
   },

   // Get single post by slug
   async getPostBySlug(slug: string) {
      const { data, error } = await supabase
         .from('posts')
         .select('*')
         .eq('slug', slug)
         .single()

      if (error) throw error
      return data as Post
   },

   // Create new post
   async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
      const { data, error } = await supabase
         .from('posts')
         .insert([post])
         .select()
         .single()

      if (error) throw error
      return data as Post
   },

   // Update post
   async updatePost(id: string, updates: Partial<Post>) {
      const { data, error } = await supabase
         .from('posts')
         .update(updates)
         .eq('id', id)
         .select()
         .single()

      if (error) throw error
      return data as Post
   },

   // Delete post
   async deletePost(id: string) {
      const { error } = await supabase
         .from('posts')
         .delete()
         .eq('id', id)

      if (error) throw error

      // Call revalidation endpoint
      const res = await fetch('/api/revalidate', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ path: '/blog' })
      })

      if (!res.ok) {
         throw new Error('Failed to revalidate cache')
      }

      return true
   }
}
