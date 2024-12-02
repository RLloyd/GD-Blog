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
          <div className="grid md:grid-cols-2 gap-8">
            <FeaturedCard
              post={latestTechPost}
              category={categories[0]}
            />
            <FeaturedCard
              post={latestMediaPost}
              category={categories[1]}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">All Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Newspaper, Coffee, Laptop, User, ArrowLeft } from "lucide-react";
// import { CategoryId } from '@/data/categories';
// import { categories } from "@/data/categories";
// import { PostCard } from "@/components/PostCard";

// type Post = {
// 	id: string;
// 	title: string;
// 	excerpt: string;
// 	category: CategoryId;  // This enforces the proper category types
// 	date: string;
// 	slug: string;
// 	cover_image?: string;
// };

// export default function BlogDashboard({ posts }: { posts: Post[] }) {
// 	const [activeCategory, setActiveCategory] = useState<string | null>(null);

// 	const latestTechPost = posts.find((post) => post.category === "tech");
// 	const latestMediaPost = posts.find((post) => post.category === "media");
// 	const remainingPosts = posts.filter((post) => post.id !== latestTechPost?.id && post.id !== latestMediaPost?.id);
// 	const filteredPosts = activeCategory ? remainingPosts.filter((post) => post.category === activeCategory) : remainingPosts;

// 	//   const categories = [
// 	//     {
// 	//       id: 'tech',
// 	//       name: 'Tech Articles',
// 	//       icon: Laptop,
// 	//       color: 'bg-blue-500',
// 	//       gradient: 'from-blue-500 to-blue-700',
// 	//       description: 'Deep dives into software development, web technologies, and the latest tech trends. From coding tutorials to architectural insights.'
// 	//     },
// 	//     {
// 	//       id: 'media',
// 	//       name: 'Other Media',
// 	//       icon: Newspaper,
// 	//       color: 'bg-purple-500',
// 	//       gradient: 'from-purple-500 to-purple-700',
// 	//       description: 'Exploring movies, books, games, and digital content. Reviews, analyses, and discussions about storytelling across different mediums.'
// 	//     },
// 	//     {
// 	//       id: 'food',
// 	//       name: 'Fusion Food',
// 	//       icon: Coffee,
// 	//       color: 'bg-orange-500',
// 	//       gradient: 'from-orange-500 to-orange-700',
// 	//       description: 'Creative recipes blending different culinary traditions. Discover unique flavor combinations and cooking techniques from around the world.'
// 	//     },
// 	//     {
// 	//       id: 'personal',
// 	//       name: 'Personal',
// 	//       icon: User,
// 	//       color: 'bg-green-500',
// 	//       gradient: 'from-green-500 to-green-700',
// 	//       description: 'Personal reflections, experiences, and life lessons. A space for sharing thoughts on growth, creativity, and everyday adventures.'
// 	//     }
// 	//   ];

// 	const FeaturedCard = ({ post, category }: { post?: Post; category: (typeof categories)[0] }) => (
// 		<div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800">
// 			{post ? (
// 				<PostCard post={post} />
// 			) : (
// 				// <Link href={`/blog/${post.slug}`} className="group block h-full">
// 				// 	{post.cover_image ? (
// 				// 		<div className="absolute inset-0">
// 				// 			<Image src={post.cover_image} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
// 				// 			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// 				// 		</div>
// 				// 	) : (
// 				// 		<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// 				// 	)}
// 				// 	<div className="absolute inset-0 p-6 flex flex-col justify-end">
// 				// 		<div className="text-sm font-medium text-blue-400 mb-2">Latest in {category.name}</div>
// 				// 		<h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
// 				// 		<p className="text-gray-300 line-clamp-2">{post.excerpt}</p>
// 				// 	</div>
// 				// </Link>
// 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// 					<div className="absolute inset-0 p-6 flex items-center justify-center">
// 						<p className="text-xl text-white/70">No {category.name} posts yet</p>
// 					</div>
// 				</div>
// 			)}
// 			<Link
// 				href="#"
// 				onClick={(e) => {
// 					e.preventDefault();
// 					setActiveCategory(category.id);
// 				}}
// 				className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${category.color}
//           text-white text-sm font-medium hover:opacity-90 transition-opacity`}
// 			>
// 				{category.name}
// 			</Link>
// 		</div>
// 	);

// 	return (
// 		<div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// 			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// 				{categories.map((category) => {
// 					const Icon = category.icon;
// 					return (
// 						<button
// 							key={category.id}
// 							onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
// 							className={`p-4 rounded-lg flex items-center space-x-3 transition-all
//                 ${activeCategory === category.id ? category.color + " text-white" : "bg-gray-800 hover:bg-gray-700"}`}
// 						>
// 							<Icon size={24} />
// 							<span className="font-medium">{category.name}</span>
// 						</button>
// 					);
// 				})}
// 			</div>

// 			{activeCategory ? (
// 				<div className="space-y-8">
// 					<div className="flex justify-between items-start">
// 						<div>
// 							<button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
// 								<ArrowLeft size={20} />
// 								<span>Back to all posts</span>
// 							</button>
// 							<h2 className="text-3xl font-bold mb-2">{categories.find((c) => c.id === activeCategory)?.name}</h2>
// 							<p className="text-gray-300 max-w-2xl">{categories.find((c) => c.id === activeCategory)?.description}</p>
// 						</div>
// 					</div>
// 					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// 						{filteredPosts.map((post) => (
// 							<PostCard key={post.id} post={post} />
// 						))}
// 						{/* {filteredPosts.map((post) => (
// 							<Link href={`/blog/${post.slug}`} key={post.id} className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
// 								<div className="aspect-[16/9] relative bg-gray-900">{post.cover_image ? <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> : <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />}</div>
// 								<div className="p-4">
// 									<div className="text-sm text-gray-400 mb-1">{post.date}</div>
// 									<h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
// 									<p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
// 								</div>
// 							</Link>
// 						))} */}
// 					</div>
// 				</div>
// 			) : (
// 				<>
// 					<div className="grid md:grid-cols-2 gap-8">
// 						<FeaturedCard post={latestTechPost} category={categories[0]} />
// 						<FeaturedCard post={latestMediaPost} category={categories[1]} />
// 					</div>

// 					<div>
// 						<h2 className="text-2xl font-bold mb-6">All Posts</h2>
// 						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// 							{filteredPosts.map((post) => (
// 								<PostCard key={post.id} post={post} />
// 							))}
// 							{/* {filteredPosts.map((post) => (
// 								<Link href={`/blog/${post.slug}`} key={post.id} className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
// 									<div className="aspect-[16/9] relative bg-gray-900">{post.cover_image ? <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> : <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />}</div>
// 									<div className="p-4">
// 										<div className="text-sm text-gray-400 mb-1">{post.date}</div>
// 										<h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
// 										<p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
// 									</div>
// 								</Link>
// 							))} */}
// 						</div>
// 					</div>
// 				</>
// 			)}
// 		</div>
// 	);
// }

// // 'use client'

// // import { useState } from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { Newspaper, Coffee, Laptop, User } from 'lucide-react';

// // type Post = {
// //   id: string;
// //   title: string;
// //   excerpt: string;
// //   category: string;
// //   date: string;
// //   slug: string;
// //   cover_image?: string;
// // };

// // export default function BlogDashboard({ posts }: { posts: Post[] }) {
// //   const [activeCategory, setActiveCategory] = useState<string | null>(null);

// //   const latestTechPost = posts.find(post => post.category === 'tech');
// //   const latestMediaPost = posts.find(post => post.category === 'media');
// //   const remainingPosts = posts.filter(post =>
// //     post.id !== latestTechPost?.id && post.id !== latestMediaPost?.id
// //   );
// //   const filteredPosts = activeCategory
// //     ? remainingPosts.filter(post => post.category === activeCategory)
// //     : remainingPosts;

// //   const categories = [
// //     { id: 'tech', name: 'Tech Articles', icon: Laptop, color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-700' },
// //     { id: 'media', name: 'Other Media', icon: Newspaper, color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-700' },
// //     { id: 'food', name: 'Fusion Food', icon: Coffee, color: 'bg-orange-500', gradient: 'from-orange-500 to-orange-700' },
// //     { id: 'personal', name: 'Personal', icon: User, color: 'bg-green-500', gradient: 'from-green-500 to-green-700' }
// //   ];

// //   const FeaturedCard = ({ post, category }: { post?: Post, category: typeof categories[0] }) => (
// //     <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800">
// //       {post ? (
// //         <Link href={`/blog/${post.slug}`} className="group block h-full">
// //           {post.cover_image ? (
// //             <div className="absolute inset-0">
// //               <Image
// //                 src={post.cover_image}
// //                 alt={post.title}
// //                 fill
// //                 className="object-cover transition-transform group-hover:scale-105"
// //                 sizes="(max-width: 768px) 100vw, 50vw"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// //             </div>
// //           ) : (
// //             <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// //           )}
// //           <div className="absolute inset-0 p-6 flex flex-col justify-end">
// //             <div className="text-sm font-medium text-blue-400 mb-2">
// //               Latest in {category.name}
// //             </div>
// //             <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
// //               {post.title}
// //             </h3>
// //             <p className="text-gray-300 line-clamp-2">
// //               {post.excerpt}
// //             </p>
// //           </div>
// //         </Link>
// //       ) : (
// //         <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// //           <div className="absolute inset-0 p-6 flex items-center justify-center">
// //             <p className="text-xl text-white/70">No {category.name} posts yet</p>
// //           </div>
// //         </div>
// //       )}
// //       <Link
// //         href="#"
// //         onClick={(e) => {
// //           e.preventDefault();
// //           setActiveCategory(category.id);
// //         }}
// //         className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${category.color}
// //           text-white text-sm font-medium hover:opacity-90 transition-opacity`}
// //       >
// //         {category.name}
// //       </Link>
// //     </div>
// //   );

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         {categories.map((category) => {
// //           const Icon = category.icon;
// //           return (
// //             <button
// //               key={category.id}
// //               onClick={() => setActiveCategory(
// //                 activeCategory === category.id ? null : category.id
// //               )}
// //               className={`p-4 rounded-lg flex items-center space-x-3 transition-all
// //                 ${activeCategory === category.id
// //                   ? category.color + ' text-white'
// //                   : 'bg-gray-800 hover:bg-gray-700'}`}
// //             >
// //               <Icon size={24} />
// //               <span className="font-medium">{category.name}</span>
// //             </button>
// //           );
// //         })}
// //       </div>

// //       {!activeCategory && (
// //         <div className="grid md:grid-cols-2 gap-8">
// //           <FeaturedCard
// //             post={latestTechPost}
// //             category={categories[0]}
// //           />
// //           <FeaturedCard
// //             post={latestMediaPost}
// //             category={categories[1]}
// //           />
// //         </div>
// //       )}

// //       <div>
// //         <h2 className="text-2xl font-bold mb-6">
// //           {activeCategory
// //             ? `${categories.find(c => c.id === activeCategory)?.name}`
// //             : 'All Posts'
// //           }
// //         </h2>
// //         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //           {filteredPosts.map((post) => (
// //             <Link
// //               href={`/blog/${post.slug}`}
// //               key={post.id}
// //               className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
// //             >
// //               <div className="aspect-[16/9] relative bg-gray-900">
// //                 {post.cover_image ? (
// //                   <Image
// //                     src={post.cover_image}
// //                     alt={post.title}
// //                     fill
// //                     className="object-cover"
// //                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //                   />
// //                 ) : (
// //                   <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />
// //                 )}
// //               </div>
// //               <div className="p-4">
// //                 <div className="text-sm text-gray-400 mb-1">{post.date}</div>
// //                 <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
// //                   {post.title}
// //                 </h3>
// //                 <p className="text-gray-300 text-sm line-clamp-2">
// //                   {post.excerpt}
// //                 </p>
// //               </div>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // 'use client'

// // import { useState } from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { Newspaper, Coffee, Laptop, User } from 'lucide-react';

// // type Post = {
// //   id: string;
// //   title: string;
// //   excerpt: string;
// //   category: string;
// //   date: string;
// //   slug: string;
// //   cover_image?: string;
// // };

// // export default function BlogDashboard({ posts }: { posts: Post[] }) {
// //   const [activeCategory, setActiveCategory] = useState<string | null>(null);

// //   const latestTechPost = posts.find(post => post.category === 'tech');
// //   const latestMediaPost = posts.find(post => post.category === 'media');
// //   const remainingPosts = posts.filter(post =>
// //     post.id !== latestTechPost?.id && post.id !== latestMediaPost?.id
// //   );
// //   const filteredPosts = activeCategory
// //     ? remainingPosts.filter(post => post.category === activeCategory)
// //     : remainingPosts;

// //   const categories = [
// //     { id: 'tech', name: 'Tech Articles', icon: Laptop, color: 'bg-blue-500' },
// //     { id: 'media', name: 'Other Media', icon: Newspaper, color: 'bg-purple-500' },
// //     { id: 'food', name: 'Fusion Food', icon: Coffee, color: 'bg-orange-500' },
// //     { id: 'personal', name: 'Personal', icon: User, color: 'bg-green-500' }
// //   ];

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         {categories.map((category) => {
// //           const Icon = category.icon;
// //           return (
// //             <button
// //               key={category.id}
// //               onClick={() => setActiveCategory(
// //                 activeCategory === category.id ? null : category.id
// //               )}
// //               className={`p-4 rounded-lg flex items-center space-x-3 transition-all
// //                 ${activeCategory === category.id
// //                   ? category.color + ' text-white'
// //                   : 'bg-gray-800 hover:bg-gray-700'}`}
// //             >
// //               <Icon size={24} />
// //               <span className="font-medium">{category.name}</span>
// //             </button>
// //           );
// //         })}
// //       </div>

// //       {!activeCategory && (
// //         <div className="grid md:grid-cols-2 gap-8">
// //           {latestTechPost && (
// //             <Link
// //               href={`/blog/${latestTechPost.slug}`}
// //               className="group relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800"
// //             >
// //               {latestTechPost.cover_image ? (
// //                 <div className="absolute inset-0">
// //                   <Image
// //                     src={latestTechPost.cover_image}
// //                     alt={latestTechPost.title}
// //                     fill
// //                     className="object-cover transition-transform group-hover:scale-105"
// //                     sizes="(max-width: 768px) 100vw, 50vw"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// //                 </div>
// //               ) : (
// //                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
// //               )}
// //               <div className="absolute inset-0 p-6 flex flex-col justify-end">
// //                 <div className="text-sm font-medium text-blue-400 mb-2">
// //                   Latest in Tech
// //                 </div>
// //                 <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
// //                   {latestTechPost.title}
// //                 </h3>
// //                 <p className="text-gray-300 line-clamp-2">
// //                   {latestTechPost.excerpt}
// //                 </p>
// //               </div>
// //             </Link>
// //           )}

// //           {latestMediaPost && (
// //             <Link
// //               href={`/blog/${latestMediaPost.slug}`}
// //               className="group relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800"
// //             >
// //               {latestMediaPost.cover_image ? (
// //                 <div className="absolute inset-0">
// //                   <Image
// //                     src={latestMediaPost.cover_image}
// //                     alt={latestMediaPost.title}
// //                     fill
// //                     className="object-cover transition-transform group-hover:scale-105"
// //                     sizes="(max-width: 768px) 100vw, 50vw"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// //                 </div>
// //               ) : (
// //                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700" />
// //               )}
// //               <div className="absolute inset-0 p-6 flex flex-col justify-end">
// //                 <div className="text-sm font-medium text-purple-400 mb-2">
// //                   Latest in Media
// //                 </div>
// //                 <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
// //                   {latestMediaPost.title}
// //                 </h3>
// //                 <p className="text-gray-300 line-clamp-2">
// //                   {latestMediaPost.excerpt}
// //                 </p>
// //               </div>
// //             </Link>
// //           )}
// //         </div>
// //       )}

// //       <div>
// //         <h2 className="text-2xl font-bold mb-6">
// //           {activeCategory
// //             ? `${categories.find(c => c.id === activeCategory)?.name}`
// //             : 'All Posts'
// //           }
// //         </h2>
// //         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //           {filteredPosts.map((post) => (
// //             <Link
// //               href={`/blog/${post.slug}`}
// //               key={post.id}
// //               className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
// //             >
// //               <div className="aspect-[16/9] relative bg-gray-900">
// //                 {post.cover_image ? (
// //                   <Image
// //                     src={post.cover_image}
// //                     alt={post.title}
// //                     fill
// //                     className="object-cover"
// //                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //                   />
// //                 ) : (
// //                   <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />
// //                 )}
// //               </div>
// //               <div className="p-4">
// //                 <div className="text-sm text-gray-400 mb-1">{post.date}</div>
// //                 <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
// //                   {post.title}
// //                 </h3>
// //                 <p className="text-gray-300 text-sm line-clamp-2">
// //                   {post.excerpt}
// //                 </p>
// //               </div>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // 'use client'
// // import React, { useState } from 'react';
// // import Link from 'next/link';
// // import { Newspaper, Coffee, Laptop, User } from 'lucide-react';

// // // Types for our blog posts
// // type Post = {
// //   id: string;
// //   title: string;
// //   excerpt: string;
// //   category: string;
// //   date: string;
// //   slug: string;
// //   imageUrl?: string;
// // };

// // // Categories configuration
// // const categories = [
// //   { id: 'tech', name: 'Tech Articles', icon: Laptop, color: 'bg-blue-500' },
// //   { id: 'food', name: 'Fusion Food', icon: Coffee, color: 'bg-orange-500' },
// //   { id: 'media', name: 'Other Media', icon: Newspaper, color: 'bg-purple-500' },
// //   { id: 'personal', name: 'Personal', icon: User, color: 'bg-green-500' }
// // ];

// // export default function BlogDashboard({ posts }: { posts: Post[] }) {
// //   const [activeCategory, setActiveCategory] = useState<string | null>(null);

// //   // Filter posts by category
// //   const filteredPosts = activeCategory
// //     ? posts.filter(post => post.category === activeCategory)
// //     : posts;

// //   // Get featured posts (first two posts from different categories)
// //   const featuredPosts = posts.reduce((acc: Post[], post) => {
// //     if (acc.length < 2 && !acc.find(p => p.category === post.category)) {
// //       acc.push(post);
// //     }
// //     return acc;
// //   }, []);

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       {/* Categories */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// //         {categories.map((category) => {
// //           const Icon = category.icon;
// //           return (
// //             <button
// //               key={category.id}
// //               onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
// //               className={`p-4 rounded-lg flex items-center space-x-3 transition-all
// //                 ${activeCategory === category.id ? category.color + ' text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
// //             >
// //               <Icon size={24} />
// //               <span className="font-medium">{category.name}</span>
// //             </button>
// //           );
// //         })}
// //       </div>

// //       {/* Featured Posts */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
// //         {featuredPosts.map((post) => (
// //           <Link
// //             href={`/blog/${post.slug}`}
// //             key={post.id}
// //             className="group relative overflow-hidden rounded-xl shadow-lg"
// //           >
// //             <div className="aspect-w-16 aspect-h-9 bg-gray-100">
// //               <img
// //                 src="/api/placeholder/800/450"
// //                 alt={post.title}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
// //               <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
// //                 {post.title}
// //               </h3>
// //               <p className="text-gray-200 line-clamp-2">{post.excerpt}</p>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>

// //       {/* All Posts Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {filteredPosts.map((post) => (
// //           <Link
// //             href={`/blog/${post.slug}`}
// //             key={post.id}
// //             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
// //           >
// //             <div className="aspect-w-16 aspect-h-9 bg-gray-100">
// //               <img
// //                 src="/api/placeholder/400/225"
// //                 alt={post.title}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //             <div className="p-4">
// //               <div className="text-sm text-gray-500 mb-1">{post.date}</div>
// //               <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
// //               <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
