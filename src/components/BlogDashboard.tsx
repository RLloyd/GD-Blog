// src/components/BlogDashboard.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { categories, CategoryId } from "@/data/categories";

type Post = {
	id: string;
	title: string;
	excerpt: string;
	category: CategoryId;
	date: string;
	slug: string;
	cover_image?: string;
};

const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: "large" | "medium" | "full"; title?: string; description?: string }) => (
	<div className={`relative overflow-hidden rounded-xl bg-gray-800 ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"} transition-transform duration-300 hover:scale-[1.02]`}>
		{post ? (
			<Link href={`/blog/${post.slug}`} className="buttonContainer group block h-[250px] aspect-[16/9]">
				{post.cover_image ? (
					<div className="absolute inset-0">
						<Image src={post.cover_image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes={size === "full" ? "100vw" : "(max-width: 768px) 100vw, 50vw"} priority={size === "large"} />
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
					</div>
				) : (
					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
				)}
				<div className="absolute inset-0 p-6 flex flex-col justify-end">
					<div className={`text-sm font-medium ${category.textColor} mb-2`}>{title || category.name}</div>
					<h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
					<p className="text-gray-300 line-clamp-2">{description || post.excerpt}</p>
				</div>
			</Link>
		) : (
			<div className="aspect-[16/9] relative">
				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
					<div className="absolute inset-0 p-6 flex items-center justify-center">
						<p className="text-xl text-white/70">No {category.name} posts yet</p>
					</div>
				</div>
			</div>
		)}
	</div>
);

export default function BlogDashboard({ posts }: { posts: Post[] }) {
	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

	// Get featured posts
	const techPost = posts.find((post) => post.category === "tech");
	const mediaPost = posts.find((post) => post.category === "media");
	const foodPost = posts.find((post) => post.category === "food");

	// Filter remaining posts
	const featuredIds = [techPost?.id, mediaPost?.id, foodPost?.id].filter(Boolean);
	const remainingPosts = posts.filter((post) => !featuredIds.includes(post.id));

	return (
		<div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
			{/* Category buttons */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{categories.map((category) => {
					const Icon = category.icon;
					return (
						<button
							key={category.id}
							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
							className={`p-4 rounded-lg flex items-center space-x-3 transition-all
                ${activeCategory === category.id ? category.color + " text-white" : "bg-gray-800 hover:bg-gray-700"}`}
						>
							<Icon size={24} />
							<span className="font-medium">{category.name}</span>
						</button>
					);
				})}
			</div>

			{/* Featured Posts Grid */}
         {!activeCategory && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techPost && (
               <div className="md:col-span-2 md:row-span-2">
                  <FeaturedCard
                  post={techPost}
                  category={categories[0]}
                  size="large"
                  title="Featured Tech Article"
                  />
               </div>
            )}
            {mediaPost && (
               <div className="md:col-span-2">
                  <FeaturedCard
                  post={mediaPost}
                  category={categories[1]}
                  size="medium"
                  title="Latest Media"
                  />
               </div>
            )}
            {foodPost && (
               <div className="md:col-span-2 lg:col-span-4 lg:col-start-1">
                  <FeaturedCard
                  post={foodPost}
                  category={categories[2]}
                  size="full"
                  title="Latest Recipe"
                  />
               </div>
            )}
            </div>
         )}
			{/* Works but no responsiveness */}
         {/* {!activeCategory && (
				<div className="grid grid-cols-4 gap-6">
					{techPost && (
						<div className="col-span-2 row-span-2">
							<FeaturedCard post={techPost} category={categories[0]} size="large" title="Featured Tech Article" />
						</div>
					)}
					{mediaPost && (
						<div className="col-span-2">
							<FeaturedCard post={mediaPost} category={categories[1]} size="medium" title="Latest Media" />
						</div>
					)}
               {foodPost && (
                  <div className="col-span-4 col-start-1">
                     <FeaturedCard post={foodPost} category={categories[2]} size="full" title="Latest Recipe" />
                  </div>
               )}
				</div>
			)} */}

         {/* Doesn't work */}
			{/* {!activeCategory && (
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{techPost && (
						<div className="md:col-span-2 md:row-span-2">
							<FeaturedCard post={techPost} category={categories[0]} size="large" title="Featured Tech Article" />
						</div>
					)}
					{mediaPost && (
						<div className="md:col-span-2">
							<FeaturedCard post={mediaPost} category={categories[1]} size="medium" title="Latest Media" />
						</div>
					)}
					{foodPost && (
						<div className="md:col-span-2">
							// <FeaturedCard post={foodPost} category={categories[2]} size="medium" title="Latest Recipe" />
							<FeaturedCard post={foodPost} category={categories[2]} size="full" title="Latest Recipe" />
						</div>
					)}
				</div>
			)} */}

			{/* Regular Posts Grid */}
			<div>
				<h2 className="text-2xl font-bold mb-6">{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{(activeCategory ? posts.filter((post) => post.category === activeCategory) : remainingPosts).map((post) => (
						<Link key={post.id} href={`/blog/${post.slug}`} className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
							<div className="aspect-[16/9] relative bg-gray-900">{post.cover_image && <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />}</div>
							<div className="p-4">
								<div className="flex justify-between items-center mb-2">
									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
									<span className="text-sm text-gray-400">{post.date}</span>
								</div>
								<h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
								<p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
// src/components/BlogDashboard.tsx
// "use client";
// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ArrowLeft } from 'lucide-react';
// import { categories, CategoryId } from '@/data/categories';

// type Post = {
//   id: string;
//   title: string;
//   excerpt: string;
//   category: CategoryId;
//   date: string;
//   slug: string;
//   cover_image?: string;
// };

// const FeaturedCard = ({ post, category, size = "medium", title, description }: {
//   post?: Post;
//   category: typeof categories[number];
//   size: "large" | "medium";
//   title?: string;
//   description?: string;
// }) => (
//   <div className={`relative overflow-hidden rounded-xl bg-gray-800 ${
//     size === "large" ? "row-span-2 col-span-2" : "col-span-1"
//   } transition-transform duration-300 hover:scale-[1.02]`}>
//     {post ? (
//       <Link href={`/blog/${post.slug}`} className="group block h-full aspect-[16/9]">
//         {post.cover_image ? (
//           <div className="absolute inset-0">
//             <Image
//               src={post.cover_image}
//               alt={post.title}
//               fill
//               className="object-cover transition-transform duration-500 group-hover:scale-105"
//               sizes="(max-width: 768px) 100vw, 50vw"
//               priority={size === "large"}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
//           </div>
//         ) : (
//           <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
//         )}
//         <div className="absolute inset-0 p-6 flex flex-col justify-end">
//           <div className={`text-sm font-medium ${category.textColor} mb-2`}>
//             {title || category.name}
//           </div>
//           <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
//             {post.title}
//           </h3>
//           <p className="text-gray-300 line-clamp-2">
//             {description || post.excerpt}
//           </p>
//         </div>
//       </Link>
//     ) : (
//       <div className="aspect-[16/9] relative">
//         <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
//           <div className="absolute inset-0 p-6 flex items-center justify-center">
//             <p className="text-xl text-white/70">No {category.name} posts yet</p>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );

// export default function BlogDashboard({ posts }: { posts: Post[] }) {
//   const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

//   // Get featured posts
//   const techPost = posts.find(post => post.category === 'tech');
//   const mediaPost = posts.find(post => post.category === 'media');
//   const foodPost = posts.find(post => post.category === 'food');

//   // Filter remaining posts
//   const featuredIds = [techPost?.id, mediaPost?.id, foodPost?.id].filter(Boolean);
//   const remainingPosts = posts.filter(post => !featuredIds.includes(post.id));

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
//       {/* Category buttons */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {categories.map((category) => {
//           const Icon = category.icon;
//           return (
//             <button
//               key={category.id}
//               onClick={() => setActiveCategory(
//                 activeCategory === category.id ? null : category.id as CategoryId
//               )}
//               className={`p-4 rounded-lg flex items-center space-x-3 transition-all
//                 ${activeCategory === category.id ?
//                   category.color + ' text-white' :
//                   'bg-gray-800 hover:bg-gray-700'}`}
//             >
//               <Icon size={24} />
//               <span className="font-medium">{category.name}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Featured Posts Grid */}
//       {!activeCategory && (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {techPost && (
//             <div className="md:col-span-2 md:row-span-2">
//               <FeaturedCard
//                 post={techPost}
//                 category={categories[0]}
//                 size="large"
//                 title="Featured Tech Article"
//               />
//             </div>
//           )}
//           {mediaPost && (
//             <div className="md:col-span-2">
//               <FeaturedCard
//                 post={mediaPost}
//                 category={categories[1]}
//                 size="medium"
//                 title="Latest Media"
//               />
//             </div>
//           )}
//           {foodPost && (
//             <div className="md:col-span-2">
//               <FeaturedCard
//                 post={foodPost}
//                 category={categories[2]}
//                 size="medium"
//                 title="Latest Recipe"
//               />
//             </div>
//           )}
//         </div>
//       )}

//       {/* Regular Posts Grid */}
//       <div>
//         <h2 className="text-2xl font-bold mb-6">
//           {activeCategory ?
//             categories.find(c => c.id === activeCategory)?.name :
//             'All Posts'}
//         </h2>
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           {(activeCategory ?
//             posts.filter(post => post.category === activeCategory) :
//             remainingPosts
//           ).map((post) => (
//             <Link
//               key={post.id}
//               href={`/blog/${post.slug}`}
//               className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="aspect-[16/9] relative bg-gray-900">
//                 {post.cover_image && (
//                   <Image
//                     src={post.cover_image}
//                     alt={post.title}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 100vw, 25vw"
//                   />
//                 )}
//               </div>
//               <div className="p-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className={`text-sm ${
//                     categories.find(c => c.id === post.category)?.textColor
//                   }`}>
//                     {categories.find(c => c.id === post.category)?.name}
//                   </span>
//                   <span className="text-sm text-gray-400">{post.date}</span>
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
//                   {post.title}
//                 </h3>
//                 <p className="text-gray-300 text-sm line-clamp-2">
//                   {post.excerpt}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// // "use client";
// // import { useState } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { ArrowLeft } from "lucide-react";
// // import { categories, CategoryId } from "@/data/categories";
// // import { PostCard } from "@/components/PostCard";

// // // Grid size configuration types
// // type GridSize = "large" | "medium" | "small";

// // // interface GridConfig {
// // //   cols: number;
// // //   rows: number;
// // //   className: string;
// // // }

// // // const gridSizeConfigs: Record<GridSize, GridConfig> = {
// // //   large: {
// // //     cols: 2,
// // //     rows: 2,
// // //     className: 'col-span-2 row-span-2 aspect-[16/9]'
// // //   },
// // //   medium: {
// // //     cols: 1,
// // //     rows: 1,
// // //     className: 'col-span-1 row-span-1 aspect-[4/3]'
// // //   },
// // //   small: {
// // //     cols: 1,
// // //     rows: 1,
// // //     className: 'col-span-1 aspect-square'
// // //   }
// // // };

// // // type FeaturedSetup = {
// // //   category: CategoryId;
// // //   size: GridSize;
// // //   order: number;
// // //   title?: string;
// // //   description?: string;
// // // }[];

// // export type Post = {
// // 	id: string;
// // 	title: string;
// // 	excerpt: string;
// // 	category: CategoryId;
// // 	date: string;
// // 	slug: string;
// // 	cover_image?: string;
// // };

// // export type FeaturedSetup = {
// // 	category: CategoryId;
// // 	size: GridSize;
// // 	order: number;
// // 	title?: string;
// // 	description?: string;
// // }[];

// // interface GridConfig {
// // 	cols: number;
// // 	rows: number;
// // 	className: string;
// // }

// // const gridSizeConfigs: Record<GridSize, GridConfig> = {
// // 	large: {
// // 		cols: 2,
// // 		rows: 2,
// // 		className: "col-span-2 row-span-2 aspect-[16/9]",
// // 	},
// // 	medium: {
// // 		cols: 1,
// // 		rows: 1,
// // 		className: "col-span-1 row-span-1 aspect-[4/3]",
// // 	},
// // 	small: {
// // 		cols: 1,
// // 		rows: 1,
// // 		className: "col-span-1 aspect-square",
// // 	},
// // };

// // // Default featured setup - can be overridden via props
// // const defaultFeatures: FeaturedSetup = [
// // 	{
// // 		category: "tech",
// // 		size: "large",
// // 		order: 0,
// // 		title: "Latest in Tech",
// // 		description: "Latest tech insights and tutorials",
// // 	},
// // 	{
// // 		category: "media",
// // 		size: "medium",
// // 		order: 1,
// // 		title: "Media & Reviews",
// // 		description: "Recent media coverage and reviews",
// // 	},
// // 	{
// // 		category: "food",
// // 		size: "medium",
// // 		order: 2,
// // 		title: "Food & Recipes",
// // 		description: "Latest recipes and culinary adventures",
// // 	},
// // ];

// // interface BlogDashboardProps {
// // 	posts: Post[];
// // 	featuredSetup?: FeaturedSetup;
// // }

// // export default function BlogDashboard({ posts, featuredSetup = defaultFeatures }: BlogDashboardProps) {
// // 	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

// // 	// Calculate grid layout
// // 	const getFeaturedLayout = () => {
// // 		const totalCols = 4; // Base grid is 4 columns
// // 		let usedCols = 0;
// // 		let gridTemplateAreas = "";

// // 		featuredSetup.forEach((feature, index) => {
// // 			const config = gridSizeConfigs[feature.size];
// // 			if (usedCols + config.cols > totalCols) {
// // 				gridTemplateAreas += `"`;
// // 				usedCols = 0;
// // 			}
// // 			gridTemplateAreas += ` area${index}`;
// // 			usedCols += config.cols;
// // 		});

// // 		return gridTemplateAreas;
// // 	};

// // 	// Get featured posts based on setup
// // 	const featuredPosts = featuredSetup
// // 		.sort((a, b) => a.order - b.order)
// // 		.map((feature) => ({
// // 			post: posts.find((post) => post.category === feature.category),
// // 			category: categories.find((c) => c.id === feature.category)!,
// // 			size: feature.size,
// // 			title: feature.title,
// // 			description: feature.description,
// // 		}));

// // 	// Filter remaining posts, excluding featured ones
// // 	const featuredPostIds = featuredPosts.map((f) => f.post?.id).filter(Boolean) as string[];
// // 	const filteredPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => !featuredPostIds.includes(post.id));

// // 	const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[0]; size: GridSize; title?: string; description?: string }) => (
// // 		<div
// // 			className={`relative overflow-hidden rounded-xl bg-gray-800
// //       ${gridSizeConfigs[size].className}
// //       transition-transform duration-300 hover:scale-[1.02]`}
// // 		>
// // 			{post ? (
// // 				<Link href={`/blog/${post.slug}`} className="group block h-full">
// // 					{post.cover_image ? (
// // 						<div className="absolute inset-0">
// // 							<Image src={post.cover_image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes={size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"} priority={size === "large"} />
// // 							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// // 						</div>
// // 					) : (
// // 						<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// // 					)}
// // 					<div className="absolute inset-0 p-6 flex flex-col justify-end">
// // 						<div className={`text-sm font-medium ${category.textColor} mb-2`}>{title || category.name}</div>
// // 						<h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
// // 						<p className="text-gray-300 line-clamp-2">{description || post.excerpt}</p>
// // 					</div>
// // 				</Link>
// // 			) : (
// // 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// // 					<div className="absolute inset-0 p-6 flex items-center justify-center">
// // 						<p className="text-xl text-white/70">No {category.name} posts yet</p>
// // 					</div>
// // 				</div>
// // 			)}
// // 		</div>
// // 	);

// // 	return (
// // 		<div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// // 			{/* Categories buttons */}
// // 			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // 				{categories.map((category) => {
// // 					const Icon = category.icon;
// // 					return (
// // 						<button
// // 							key={category.id}
// // 							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
// // 							className={`p-4 rounded-lg flex items-center space-x-3 transition-all
// //                 ${activeCategory === category.id ? category.color + " text-white" : "bg-gray-800 hover:bg-gray-700"}`}
// // 						>
// // 							<Icon size={24} />
// // 							<span className="font-medium">{category.name}</span>
// // 						</button>
// // 					);
// // 				})}
// // 			</div>

// // 			{activeCategory ? (
// // 				<div className="space-y-8">
// // 					<div className="flex justify-between items-start">
// // 						<div>
// // 							<button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
// // 								<ArrowLeft size={20} />
// // 								<span>Back to all posts</span>
// // 							</button>
// // 							<h2 className="text-3xl font-bold mb-2">{categories.find((c) => c.id === activeCategory)?.name}</h2>
// // 							<p className="text-gray-300 max-w-2xl">{categories.find((c) => c.id === activeCategory)?.description}</p>
// // 						</div>
// // 					</div>
// // 					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// // 						{filteredPosts.map((post) => (
// // 							<PostCard key={post.id} post={post} />
// // 						))}
// // 					</div>
// // 				</div>
// // 			) : (
// // 				<>
// // 					<div
// // 						className="featuredBlogsContainer grid gap-8"
// // 						style={{
// // 							gridTemplateColumns: "repeat(4, 1fr)",
// // 							gridTemplateAreas: getFeaturedLayout(),
// // 						}}
// // 					>
// // 						{featuredPosts.map(({ post, category, size, title, description }, index) => (
// // 							<div key={post?.id || index} style={{ gridArea: `area${index}` }}>
// // 								<FeaturedCard post={post} category={category} size={size} title={title} description={description} />
// // 							</div>
// // 						))}
// // 					</div>

// // 					<div>
// // 						<h2 className="text-2xl font-bold mb-6">All Posts</h2>
// // 						<div className="allPostsContainer grid gap-6 md:grid-cols-2 lg:grid-cols-4">
// // 							{filteredPosts.map((post) => (
// // 								<PostCard key={post.id} post={post} />
// // 							))}
// // 						</div>
// // 					</div>
// // 				</>
// // 			)}
// // 		</div>
// // 	);
// // }
// // // // src/components/BlogDashboard.tsx
// // // "use client";

// // // import { useState } from "react";
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { ArrowLeft } from "lucide-react";
// // // import { categories, CategoryId } from "@/data/categories";
// // // import { PostCard } from "@/components/PostCard";

// // // type Post = {
// // // 	id: string;
// // // 	title: string;
// // // 	excerpt: string;
// // // 	category: CategoryId;
// // // 	date: string;
// // // 	slug: string;
// // // 	cover_image?: string;
// // // };

// // // export default function BlogDashboard({ posts }: { posts: Post[] }) {
// // // 	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

// // // 	// Find featured posts before any filtering
// // // 	const latestTechPost = posts.find((post) => post.category === "tech");
// // // 	const latestMediaPost = posts.find(post => post.category === 'media');

// // // 	// Get remaining posts AFTER removing both featured posts
// // // 	// const remainingPosts = posts.filter(post => {
// // // 	//   const isFeaturedTech = post.id === latestTechPost?.id;
// // // 	//   const isFeaturedMedia = post.id === latestMediaPost?.id;
// // // 	//   return !isFeaturedTech && !isFeaturedMedia;
// // // 	// });

// // // 	// Get filtered posts based on active category
// // // 	const filteredPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => post.id !== latestTechPost?.id);

// // // 	const FeaturedCard = ({ post, category }: { post?: Post; category: (typeof categories)[0] }) => (
// // // 		<div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800">
// // // 			{post ? (
// // // 				<Link href={`/blog/${post.slug}`} className="group block h-full">
// // // 					{post.cover_image ? (
// // // 						<div className="absolute inset-0">
// // // 							<Image src={post.cover_image} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
// // // 							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// // // 						</div>
// // // 					) : (
// // // 						<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// // // 					)}
// // // 					<div className="absolute inset-0 p-6 flex flex-col justify-end">
// // // 						<div className={`text-sm font-medium ${category.textColor} mb-2`}>{category.name}</div>
// // // 						<h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
// // // 						<p className="text-gray-300 line-clamp-2">{post.excerpt}</p>
// // // 					</div>
// // // 				</Link>
// // // 			) : (
// // // 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// // // 					<div className="absolute inset-0 p-6 flex items-center justify-center">
// // // 						<p className="text-xl text-white/70">No {category.name} posts yet</p>
// // // 					</div>
// // // 				</div>
// // // 			)}
// // // 			<Link
// // // 				href="#"
// // // 				onClick={(e) => {
// // // 					e.preventDefault();
// // // 					setActiveCategory(category.id as CategoryId);
// // // 				}}
// // // 				className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${category.color}
// // //           text-white text-sm font-medium hover:opacity-90 transition-opacity`}
// // // 			>
// // // 				{category.name}
// // // 			</Link>
// // // 		</div>
// // // 	);

// // // 	return (
// // // 		<div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// // // 			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // 				{categories.map((category) => {
// // // 					const Icon = category.icon;
// // // 					return (
// // // 						<button
// // // 							key={category.id}
// // // 							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
// // // 							className={`p-4 rounded-lg flex items-center space-x-3 transition-all
// // //                 ${activeCategory === category.id ? category.color + " text-white" : "bg-gray-800 hover:bg-gray-700"}`}
// // // 						>
// // // 							<Icon size={24} />
// // // 							<span className="font-medium">{category.name}</span>
// // // 						</button>
// // // 					);
// // // 				})}
// // // 			</div>

// // // 			{activeCategory ? (
// // // 				<div className="space-y-8">
// // // 					<div className="flex justify-between items-start">
// // // 						<div>
// // // 							<button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
// // // 								<ArrowLeft size={20} />
// // // 								<span>Back to all posts</span>
// // // 							</button>
// // // 							<h2 className="text-3xl font-bold mb-2">{categories.find((c) => c.id === activeCategory)?.name}</h2>
// // // 							<p className="text-gray-300 max-w-2xl">{categories.find((c) => c.id === activeCategory)?.description}</p>
// // // 						</div>
// // // 					</div>
// // // 					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// // // 						{filteredPosts.map((post) => (
// // // 							<PostCard key={post.id} post={post} />
// // // 						))}
// // // 					</div>
// // // 				</div>
// // // 			) : (
// // // 				<>
// // // 					<div className="featuredBogsContainer grid md:grid-cols-2 gap-8">
// // // 						<FeaturedCard post={latestTechPost} category={categories[0]} />
// // // 						<FeaturedCard post={latestMediaPost} category={categories[1]} />
// // // 					</div>

// // // 					<div>
// // // 						<h2 className="text-2xl font-bold mb-6">All Posts</h2>
// // // 						<div className="allPostsContainer grid gap-6 md:grid-cols-2 lg:grid-cols-4">
// // // 							{filteredPosts.map((post) => (
// // // 								<PostCard key={post.id} post={post} />
// // // 							))}
// // // 						</div>
// // // 					</div>
// // // 				</>
// // // 			)}
// // // 		</div>
// // // 	);
// // // }
