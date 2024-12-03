// src/app/blog/page.tsx
import Link from 'next/link';
import { supabaseClient } from '@/lib/auth';
import BlogDashboard from '@/components/BlogDashboard';
import { CategoryId } from '@/data/categories';
import { GridSize } from '@/components/BlogDashboard';

// Define featured setup type
type FeaturedSetup = {
  category: CategoryId;
  size: GridSize;
  order: number;
  title?: string;
  description?: string;
}[];

// Featured setup configuration
const featuredSetup: FeaturedSetup = [
  {
    category: 'tech',
    size: 'large',
    order: 0,
    title: 'Latest in Tech',
    description: 'Latest tech insights and tutorials'
  },
  {
    category: 'media',
    size: 'medium',
    order: 1,
    title: 'Media & Reviews'
  }
];

export default async function BlogList() {
  const { data: posts, error } = await supabaseClient
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return <div>Error loading posts</div>;
  }

  const formattedPosts = posts?.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    category: (post.category || 'tech') as CategoryId,
    date: new Date(post.created_at).toLocaleDateString(),
    slug: post.slug,
    cover_image: post.cover_image
  })) || [];

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

      <BlogDashboard
        posts={formattedPosts}
        featuredSetup={featuredSetup}
      />
    </div>
  );
}

// // src/app/blog/page.tsx
// import Link from "next/link";
// import { supabaseClient } from "@/lib/auth";
// import BlogDashboard from "@/components/BlogDashboard";
// import { CategoryId } from "@/data/categories";
// import { headers } from "next/headers";

// // Force dynamic rendering
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// export default async function BlogList() {
// 	// Force unique requests
// 	headers();

// 	const { data: posts, error } = await supabaseClient.from("posts").select("*").order("created_at", { ascending: false });

// 	if (error) {
// 		console.error("Supabase error:", error);
// 		return <div>Error loading posts</div>;
// 	}

// 	const formattedPosts =
// 		posts?.map((post) => ({
// 			id: post.id,
// 			title: post.title,
// 			excerpt: post.excerpt || "",
// 			category: (post.category || "tech") as CategoryId,
// 			date: new Date(post.created_at).toLocaleDateString(),
// 			slug: post.slug,
// 			cover_image: post.cover_image,
// 			published: post.published,
//    })) || [];

// 	const customFeatures = [
// 		{
// 			category: "food",
// 			size: "large",
// 			order: 0,
// 			title: "Featured Recipe",
// 			description: "Our latest culinary creation",
// 		},
// 		{
// 			category: "tech",
// 			size: "medium",
// 			order: 1,
// 			title: "Tech Update",
// 		},
// 	];

// 	return (
// 		<div className="max-w-7xl mx-auto">
// 			<div className="flex justify-between items-center mb-8 px-4">
// 				<h1 className="text-3xl font-bold">Blog Posts</h1>
// 				<Link href="/blog/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// 					Write Post
// 				</Link>
// 			</div>

// 			{/* <BlogDashboard posts={formattedPosts} /> */}
// 			<BlogDashboard posts={posts} featuredSetup={customFeatures} />
// 		</div>
// 	);
// }
// // // src/app/blog/page.tsx
// // import Link from 'next/link';
// // import { supabaseClient } from '@/lib/auth';
// // import BlogDashboard from '@/components/BlogDashboard';
// // import { CategoryId } from '@/data/categories';
// // import { unstable_noStore } from 'next/cache';

// // export default async function BlogList() {
// //   // Disable caching for this route
// //   unstable_noStore();

// //   const { data: posts, error } = await supabaseClient
// //     .from('posts')
// //     .select('*')
// //     .order('created_at', { ascending: false })

// //   if (error) {
// //     console.error('Supabase error:', error)
// //     return <div>Error loading posts</div>
// //   }

// //   const formattedPosts = posts?.map(post => ({
// //     id: post.id,
// //     title: post.title,
// //     excerpt: post.excerpt || '',
// //     category: (post.category || 'tech') as CategoryId,
// //     date: new Date(post.created_at).toLocaleDateString(),
// //     slug: post.slug,
// //     cover_image: post.cover_image,
// //     published: post.published
// //   })) || []

// //   return (
// //     <div className="max-w-7xl mx-auto">
// //       <div className="flex justify-between items-center mb-8 px-4">
// //         <h1 className="text-3xl font-bold">Blog Posts</h1>
// //         <Link
// //           href="/blog/new"
// //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //         >
// //           Write Post
// //         </Link>
// //       </div>

// //       <BlogDashboard posts={formattedPosts} />
// //     </div>
// //   )
// // }
// // // // src/app/blog/page.tsx

// // // import Link from 'next/link';
// // // import { supabaseClient } from '@/lib/auth';
// // // import BlogDashboard from '@/components/BlogDashboard';
// // // import { CategoryId } from '@/data/categories';

// // // /*---==============================================================
// // // This is a React functional component named BlogList that fetches
// // // and displays a list of published blog posts from a Supabase database.
// // // It handles errors, transforms the post data, and renders a
// // // dashboard with a "Write Post" link and a list of posts.
// // //  ==============================================================---*/
// // //  export default async function BlogList() {
// // //    const { data: posts, error } = await supabaseClient
// // //      .from('posts')
// // //      .select('*')
// // //      .order('created_at', { ascending: false })

// // //    if (error) {
// // //      console.error('Supabase error:', error)
// // //      return <div>Error loading posts</div>
// // //    }

// // //    const formattedPosts = posts?.map(post => ({
// // //      id: post.id,
// // //      title: post.title,
// // //      excerpt: post.excerpt || '',
// // //      category: (post.category || 'tech') as CategoryId,
// // //      date: new Date(post.created_at).toLocaleDateString(),
// // //      slug: post.slug,
// // //      cover_image: post.cover_image
// // //    })) || []

// // //    return (
// // //      <div className="max-w-7xl mx-auto">
// // //        <div className="flex justify-between items-center mb-8 px-4">
// // //          <h1 className="text-3xl font-bold">Blog Posts</h1>
// // //          <Link
// // //            href="/blog/new"
// // //            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //          >
// // //            Write Post
// // //          </Link>
// // //        </div>

// // //        <BlogDashboard posts={formattedPosts} />
// // //      </div>
// // //    )
// // //  }
// // // // export default async function BlogList() {
// // // //   const { data: posts, error } = await supabaseClient
// // // //     .from('posts')
// // // //     .select('*')
// // // //     .eq('published', true)
// // // //     .order('created_at', { ascending: false })

// // // //   if (error) {
// // // //     console.error('Supabase error:', error)
// // // //     return <div>Error loading posts</div>
// // // //   }

// // // //   // Transform the posts data
// // // //   const formattedPosts = posts?.map(post => ({
// // // //     id: post.id,
// // // //     title: post.title,
// // // //     excerpt: post.excerpt || '',
// // // //     category: post.category || 'tech',
// // // //     date: new Date(post.created_at).toLocaleDateString(),
// // // //     slug: post.slug,
// // // //     cover_image: post.cover_image
// // // //   })) || []

// // // //   return (
// // // //     <div className="max-w-7xl mx-auto">
// // // //       <div className="flex justify-between items-center mb-8 px-4">
// // // //         <h1 className="text-3xl font-bold">Blog Posts</h1>
// // // //         <Link
// // // //           href="/blog/new"
// // // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // // //         >
// // // //           Write Post
// // // //         </Link>
// // // //       </div>

// // // //       <BlogDashboard posts={formattedPosts} />
// // // //     </div>
// // // //   )
// // // // }
