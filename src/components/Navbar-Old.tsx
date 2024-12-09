// src/components/Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navLinks, navStyles } from "@/data/navbarConfig";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function Navbar() {
	const { isAuthenticated } = useAuth();
	const pathname = usePathname();
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	// Helper function to determine if we're on a valid blog post page
	const getBlogPostInfo = () => {
		const pathParts = pathname.split("/");

		// Check if we're on a blog post page
		if (pathParts[1] === "blog" && pathParts.length === 3) {
			const isNewPost = pathParts[2] === "new";
			const isDrafts = pathParts[2] === "drafts";
			const isEditPath = pathname.includes("/edit/");

			// Only return slug if we're on a regular blog post page
			if (!isNewPost && !isDrafts && !isEditPath) {
				return { isPost: true, slug: pathParts[2] };
			}
		}

		return { isPost: false, slug: null };
	};

	const { isPost, slug } = getBlogPostInfo();

	const handleDelete = async () => {
		if (!slug || !isAuthenticated) return;

		if (!confirm("Are you sure you want to delete this post?")) return;

		setIsDeleting(true);

		try {
			const { error: deleteError } = await supabaseClient.from("posts").delete().eq("slug", slug);

			if (deleteError) throw deleteError;

			await router.push("/blog");
			router.refresh();
			await fetch("/api/revalidate", { method: "POST" });
		} catch (err) {
			console.error("Failed to delete post:", err);
			alert("Failed to delete post");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<nav className='bg-white dark:bg-gray-900 shadow-lg transition-all'>
			{/* <div className={navStyles.container}> */}
			<div className='max-w-page mx-auto px-4'>
				<div className='flex justify-between items-center h-16'>
					{/* Left section with brand and main links */}
					<div className='flex items-center gap-8'>
						<Link
							href={navLinks.brand.href}
							className='flex items-center'
						>
							<Image
								src={navLinks.brand.logo}
								alt={navLinks.brand.label}
								width={90}
								height={90}
								priority
							/>
							<span className='sr-only'>{navLinks.brand.label}</span>
						</Link>

						{/* Main navigation links */}
						<div className='hidden md:flex items-center gap-6'>
							{navLinks.mainLinks.map((link) => {
								if ("authRequired" in link && link.authRequired && !isAuthenticated) {
									return null;
								}
								return (
									<Link
										key={link.href}
										href={link.href}
										className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
									>
										{link.label}
									</Link>
								);
							})}
						</div>
					</div>

					{/* Right section with post actions and auth */}
					<div className='flex items-center gap-4'>
						{/* Post management buttons - only show on blog post pages */}
						{isAuthenticated && isPost && (
							<div className='hidden md:flex items-center gap-3'>
								<Link
									href={`/blog/edit/${slug}`}
									className='px-3 py-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors'
								>
									Edit Post
								</Link>
								<button
									onClick={handleDelete}
									disabled={isDeleting}
									className='px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2'
								>
									{isDeleting && (
										<Loader2
											className='animate-spin'
											size={16}
										/>
									)}
									{isDeleting ? "Deleting..." : "Delete Post"}
								</button>
							</div>
						)}

						<ThemeToggle />

						{/* Auth button */}
						{isAuthenticated ? (
							<button
								onClick={() => supabaseClient.auth.signOut()}
								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
							>
								{navLinks.authLinks.signOut.label}
							</button>
						) : (
							<button
								onClick={() =>
									supabaseClient.auth.signInWithOAuth({
										provider: "github",
										options: { redirectTo: `${window.location.origin}/auth/callback` },
									})
								}
								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
							>
								{navLinks.authLinks.signIn.label}
							</button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

// src/components/Navbar.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useAuth } from "@/hooks/useAuth";
// import { supabaseClient } from "@/lib/auth";
// import { ThemeToggle } from "@/components/ThemeToggle";
// import { navLinks, navStyles } from "@/data/navbarConfig";
// import { usePathname } from "next/navigation";

// export function Navbar() {
// 	const { isAuthenticated } = useAuth();
// 	const pathname = usePathname();

// 	// Check if we're on a blog post page (but not edit page)
// 	const isBlogPost = pathname.startsWith("/blog/") && pathname.split("/").length === 3 && !pathname.includes("/edit");

// 	// Extract slug from pathname if we're on a blog post
// 	const postSlug = isBlogPost ? pathname.split("/")[2] : null;

// 	return (
// 		<nav className='bg-white dark:bg-gray-900 shadow-lg transition-all'>
// 			<div className={navStyles.container}>
// 				<div className='flex justify-between items-center h-16'>
// 					{/* Left section with brand and main links */}
// 					<div className='flex items-center gap-8'>
// 						<Link
// 							href={navLinks.brand.href}
// 							className='flex items-center'
// 						>
// 							<Image
// 								src={navLinks.brand.logo}
// 								alt={navLinks.brand.label}
// 								width={150}
// 								height={40}
// 								priority
// 							/>
// 							<span className='sr-only'>{navLinks.brand.label}</span>
// 						</Link>

// 						{/* Main navigation links */}
// 						<div className='hidden md:flex items-center gap-6'>
// 							{navLinks.mainLinks.map((link) => {
// 								if ("authRequired" in link && link.authRequired && !isAuthenticated) {
// 									return null;
// 								}
// 								return (
// 									<Link
// 										key={link.href}
// 										href={link.href}
// 										className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
// 									>
// 										{link.label}
// 									</Link>
// 								);
// 							})}
// 						</div>
// 					</div>

// 					{/* Right section with post actions and auth */}
// 					<div className='flex items-center gap-4'>
// 						{/* Post management buttons - only show on blog post pages */}
// 						{isAuthenticated && isBlogPost && (
// 							<div className='hidden md:flex items-center gap-3'>
// 								<Link
// 									href={`/blog/edit/${postSlug}`}
// 									className='px-3 py-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors'
// 								>
// 									Edit Post
// 								</Link>
// 							</div>
// 						)}

// 						<ThemeToggle />

// 						{/* Auth button */}
// 						{isAuthenticated ? (
// 							<button
// 								onClick={() => supabaseClient.auth.signOut()}
// 								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 							>
// 								{navLinks.authLinks.signOut.label}
// 							</button>
// 						) : (
// 							<button
// 								onClick={() =>
// 									supabaseClient.auth.signInWithOAuth({
// 										provider: "github",
// 										options: { redirectTo: `${window.location.origin}/auth/callback` },
// 									})
// 								}
// 								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 							>
// 								{navLinks.authLinks.signIn.label}
// 							</button>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// }

// // // src/components/Navbar.tsx
// // 'use client'
// // import Link from 'next/link'
// // import Image from 'next/image'
// // import { useAuth } from '@/hooks/useAuth'
// // import { supabaseClient } from '@/lib/auth'
// // import { ThemeToggle } from '@/components/ThemeToggle'
// // import { navLinks, navStyles } from '@/data/navbarConfig'

// // export function Navbar() {
// //   const { isAuthenticated } = useAuth()

// //   return (
// //     <nav className={navStyles.base}>
// //       <div className={navStyles.container}>
// //         <div className={navStyles.inner}>
// //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// //             <Image
// //               src={navLinks.brand.logo}
// //               alt={navLinks.brand.label}
// //               width={150}
// //               height={40}
// //               priority
// //             />
// //             <span className="sr-only">{navLinks.brand.label}</span>
// //           </Link>
// //           <div className="flex items-center space-x-8">
// //             {navLinks.mainLinks.map(link => {
// //               if ('authRequired' in link && link.authRequired && !isAuthenticated) {
// //                 return null;
// //               }
// //               return (
// //                 <Link
// //                   key={link.href}
// //                   href={link.href}
// //                   className={navStyles.link}
// //                 >
// //                   {link.label}
// //                 </Link>
// //               );
// //             })}
// //             <ThemeToggle />
// //             {isAuthenticated ? (
// //               <button
// //                 onClick={() => supabaseClient.auth.signOut()}
// //                 className={navStyles.button}
// //               >
// //                 {navLinks.authLinks.signOut.label}
// //               </button>
// //             ) : (
// //               <button
// //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// //                   provider: 'github',
// //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// //                 })}
// //                 className={navStyles.button}
// //               >
// //                 {navLinks.authLinks.signIn.label}
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   )
// // }
// // // // src/components/Navbar.tsx
// // // "use client";
// // // import Link from "next/link";
// // // import { useAuth } from "@/hooks/useAuth";
// // // import { supabaseClient } from "@/lib/auth";
// // // import { ThemeToggle } from "@/components/ThemeToggle";
// // // import { navLinks, navStyles } from "@/data/navbarConfig";

// // // export function Navbar() {
// // // 	const { isAuthenticated } = useAuth();

// // // 	return (
// // // 		<nav className={navStyles.base}>
// // // 			<div className={navStyles.container}>
// // // 				<div className={navStyles.inner}>
// // // 					<Link href={navLinks.brand.href} className={navStyles.brand}>
// // // 						{navLinks.brand.label}
// // // 					</Link>
// // // 					<div className="flex items-center space-x-8">
// // // 						{navLinks.mainLinks.map((link) => {
// // // 							if ("authRequired" in link && link.authRequired && !isAuthenticated) {
// // // 								return null;
// // // 							}
// // // 							return (
// // // 								<Link key={link.href} href={link.href} className={navStyles.link}>
// // // 									{link.label}
// // // 								</Link>
// // // 							);
// // // 						})}
// // // 						<ThemeToggle />
// // // 						{isAuthenticated ? (
// // // 							<button onClick={() => supabaseClient.auth.signOut()} className={navStyles.button}>
// // // 								{navLinks.authLinks.signOut.label}
// // // 							</button>
// // // 						) : (
// // // 							<button
// // // 								onClick={() =>
// // // 									supabaseClient.auth.signInWithOAuth({
// // // 										provider: "github",
// // // 										options: { redirectTo: `${window.location.origin}/auth/callback` },
// // // 									})
// // // 								}
// // // 								className={navStyles.button}
// // // 							>
// // // 								{navLinks.authLinks.signIn.label}
// // // 							</button>
// // // 						)}
// // // 					</div>
// // // 				</div>
// // // 			</div>
// // // 		</nav>
// // // 	);
// // // }

// // // // // src/components/Navbar.tsx
// // // // 'use client'
// // // // import Link from 'next/link'
// // // // import { useAuth } from '@/hooks/useAuth'
// // // // import { supabaseClient } from '@/lib/auth'
// // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // export function Navbar() {
// // // //   const { user, isAuthenticated } = useAuth()

// // // //   return (
// // // //     <nav className={navStyles.base}>
// // // //       <div className={navStyles.container}>
// // // //         <div className={navStyles.inner}>
// // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // //             {navLinks.brand.label}
// // // //           </Link>
// // // //           <div className="flex items-center space-x-8">
// // // //             {navLinks.mainLinks.map(link => (
// // // //               !link.authRequired || isAuthenticated ? (
// // // //                 <Link
// // // //                   key={link.href}
// // // //                   href={link.href}
// // // //                   className={navStyles.link}
// // // //                 >
// // // //                   {link.label}
// // // //                 </Link>
// // // //               ) : null
// // // //             ))}
// // // //             <ThemeToggle />
// // // //             {isAuthenticated ? (
// // // //               <button
// // // //                 onClick={() => supabaseClient.auth.signOut()}
// // // //                 className={navStyles.button}
// // // //               >
// // // //                 {navLinks.authLinks.signOut.label}
// // // //               </button>
// // // //             ) : (
// // // //               <button
// // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // //                   provider: 'github',
// // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // //                 })}
// // // //                 className={navStyles.button}
// // // //               >
// // // //                 {navLinks.authLinks.signIn.label}
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </nav>
// // // //   )
// // // // }

// // // // // // src/components/Navbar.tsx
// // // // // 'use client'
// // // // // import Link from 'next/link'
// // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // import { supabaseClient } from '@/lib/auth'
// // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // import { navLinks, navStyles } from '@/data/navbarConfig'
// // // // // import { Sun, Moon } from 'lucide-react'
// // // // // import { useTheme } from '@/hooks/useTheme'

// // // // // export function Navbar() {
// // // // //   const { isAuthenticated } = useAuth()
// // // // //   const { theme, toggleTheme } = useTheme()

// // // // //   const handleSignIn = () => {
// // // // //     supabaseClient.auth.signInWithOAuth({
// // // // //       provider: 'github',
// // // // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // //     })
// // // // //   }

// // // // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // // // //   return (
// // // // //     <nav className={navStyles.base}>
// // // // //       <div className={navStyles.container}>
// // // // //         <div className={navStyles.inner}>
// // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // //             {navLinks.brand.label}
// // // // //           </Link>

// // // // //           <div className="flex items-center space-x-8">
// // // // //             <Link href="/blog" className={navStyles.link}>Blog</Link>

// // // // //             {isAuthenticated && (
// // // // //               <Link href="/blog/new" className={navStyles.link}>New Post</Link>
// // // // //             )}

// // // // //             <button
// // // // //               onClick={toggleTheme}
// // // // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // // // //               aria-label="Toggle theme"
// // // // //             >
// // // // //               {theme === 'dark' ?
// // // // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // // // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // // // //               }
// // // // //             </button>

// // // // //             <ClientOnly>
// // // // //               {isAuthenticated ? (
// // // // //                 <button onClick={handleSignOut} className={navStyles.button}>
// // // // //                   {navLinks.authLinks.signOut.label}
// // // // //                 </button>
// // // // //               ) : (
// // // // //                 <button onClick={handleSignIn} className={navStyles.button}>
// // // // //                   {navLinks.authLinks.signIn.label}
// // // // //                 </button>
// // // // //               )}
// // // // //             </ClientOnly>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </nav>
// // // // //   )
// // // // // }
// // // // // // // src/components/Navbar.tsx
// // // // // // 'use client'
// // // // // // import Link from 'next/link'
// // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'
// // // // // // import { Sun, Moon } from 'lucide-react'
// // // // // // import { useState, useEffect } from 'react'

// // // // // // export function Navbar() {
// // // // // //   const { isAuthenticated } = useAuth()
// // // // // //   const [isDarkMode, setIsDarkMode] = useState(false)

// // // // // //   useEffect(() => {
// // // // // //     const isDark = document.documentElement.classList.contains('dark')
// // // // // //     setIsDarkMode(isDark)
// // // // // //   }, [])

// // // // // //   const toggleTheme = () => {
// // // // // //     document.documentElement.classList.toggle('dark')
// // // // // //     setIsDarkMode(!isDarkMode)
// // // // // //     localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
// // // // // //   }

// // // // // //   const handleSignIn = () => {
// // // // // //     supabaseClient.auth.signInWithOAuth({
// // // // // //       provider: 'github',
// // // // // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // //     })
// // // // // //   }

// // // // // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // // // // //   return (
// // // // // //     <nav className={navStyles.base}>
// // // // // //       <div className={navStyles.container}>
// // // // // //         <div className={navStyles.inner}>
// // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // //             {navLinks.brand.label}
// // // // // //           </Link>

// // // // // //           <div className="flex items-center space-x-8">
// // // // // //             <Link href="/blog" className={navStyles.link}>Blog</Link>

// // // // // //             {isAuthenticated && (
// // // // // //               <Link href="/blog/new" className={navStyles.link}>New Post</Link>
// // // // // //             )}

// // // // // //             <button
// // // // // //               onClick={toggleTheme}
// // // // // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // // // // //               aria-label="Toggle theme"
// // // // // //             >
// // // // // //               {isDarkMode ?
// // // // // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // // // // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // // // // //               }
// // // // // //             </button>

// // // // // //             <ClientOnly>
// // // // // //               {isAuthenticated ? (
// // // // // //                 <button
// // // // // //                   onClick={handleSignOut}
// // // // // //                   className={navStyles.button}
// // // // // //                 >
// // // // // //                   {navLinks.authLinks.signOut.label}
// // // // // //                 </button>
// // // // // //               ) : (
// // // // // //                 <button
// // // // // //                   onClick={handleSignIn}
// // // // // //                   className={navStyles.button}
// // // // // //                 >
// // // // // //                   {navLinks.authLinks.signIn.label}
// // // // // //                 </button>
// // // // // //               )}
// // // // // //             </ClientOnly>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </nav>
// // // // // //   )
// // // // // // }
// // // // // // // // src/components/Navbar.tsx
// // // // // // // 'use client'
// // // // // // // import Link from 'next/link'
// // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'
// // // // // // // import { Sun, Moon } from 'lucide-react'
// // // // // // // import { useState, useEffect } from 'react'

// // // // // // // export function Navbar() {
// // // // // // //   const { isAuthenticated } = useAuth()
// // // // // // //   const [isDarkMode, setIsDarkMode] = useState(false)

// // // // // // //   useEffect(() => {
// // // // // // //     const isDark = document.documentElement.classList.contains('dark')
// // // // // // //     setIsDarkMode(isDark)
// // // // // // //   }, [])

// // // // // // //   const toggleTheme = () => {
// // // // // // //     document.documentElement.classList.toggle('dark')
// // // // // // //     setIsDarkMode(!isDarkMode)
// // // // // // //     localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
// // // // // // //   }

// // // // // // //   const handleSignIn = () => {
// // // // // // //     supabaseClient.auth.signInWithOAuth({
// // // // // // //       provider: 'github',
// // // // // // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // //     })
// // // // // // //   }

// // // // // // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // // // // // //   return (
// // // // // // //     <nav className={navStyles.base}>
// // // // // // //       <div className={navStyles.container}>
// // // // // // //         <div className={navStyles.inner}>
// // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // //             {navLinks.brand.label}
// // // // // // //           </Link>

// // // // // // //           <div className="flex items-center space-x-8">
// // // // // // //             <Link href="/blog" className={navStyles.link}>Blog</Link>

// // // // // // //             <button
// // // // // // //               onClick={toggleTheme}
// // // // // // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // // // // // //               aria-label="Toggle theme"
// // // // // // //             >
// // // // // // //               {isDarkMode ?
// // // // // // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // // // // // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // // // // // //               }
// // // // // // //             </button>

// // // // // // //             <ClientOnly>
// // // // // // //               {isAuthenticated ? (
// // // // // // //                 <button
// // // // // // //                   onClick={handleSignOut}
// // // // // // //                   className={navStyles.button}
// // // // // // //                 >
// // // // // // //                   {navLinks.authLinks.signOut.label}
// // // // // // //                 </button>
// // // // // // //               ) : (
// // // // // // //                 <button
// // // // // // //                   onClick={handleSignIn}
// // // // // // //                   className={navStyles.button}
// // // // // // //                 >
// // // // // // //                   {navLinks.authLinks.signIn.label}
// // // // // // //                 </button>
// // // // // // //               )}
// // // // // // //             </ClientOnly>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </nav>
// // // // // // //   )
// // // // // // // }
// // // // // // // // // src/components/Navbar.tsx
// // // // // // // // 'use client'
// // // // // // // // import Link from 'next/link'
// // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // // // export function Navbar() {
// // // // // // // //   const { isAuthenticated } = useAuth()

// // // // // // // //   const handleSignIn = () => {
// // // // // // // //     supabaseClient.auth.signInWithOAuth({
// // // // // // // //       provider: 'github',
// // // // // // // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // //     })
// // // // // // // //   }

// // // // // // // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // // // // // // //   return (
// // // // // // // //     <nav className={navStyles.base}>
// // // // // // // //       <div className={navStyles.container}>
// // // // // // // //         <div className={navStyles.inner}>
// // // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // // //             {navLinks.brand.label}
// // // // // // // //           </Link>

// // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // //             {navLinks.mainLinks.map((link) => {
// // // // // // // //               if (link.authRequired && !isAuthenticated) return null;
// // // // // // // //               return (
// // // // // // // //                 <Link
// // // // // // // //                   key={link.href}
// // // // // // // //                   href={link.href}
// // // // // // // //                   className={navStyles.link}
// // // // // // // //                 >
// // // // // // // //                   {link.label}
// // // // // // // //                 </Link>
// // // // // // // //               );
// // // // // // // //             })}

// // // // // // // //             <ClientOnly>
// // // // // // // //               {isAuthenticated ? (
// // // // // // // //                 <button
// // // // // // // //                   onClick={handleSignOut}
// // // // // // // //                   className={navStyles.button}
// // // // // // // //                 >
// // // // // // // //                   {navLinks.authLinks.signOut.label}
// // // // // // // //                 </button>
// // // // // // // //               ) : (
// // // // // // // //                 <button
// // // // // // // //                   onClick={handleSignIn}
// // // // // // // //                   className={navStyles.button}
// // // // // // // //                 >
// // // // // // // //                   {navLinks.authLinks.signIn.label}
// // // // // // // //                 </button>
// // // // // // // //               )}
// // // // // // // //             </ClientOnly>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </nav>
// // // // // // // //   )
// // // // // // // // }
// // // // // // // // // // src/components/Navbar.tsx
// // // // // // // // // 'use client'
// // // // // // // // // import Link from 'next/link'
// // // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // // // // export function Navbar() {
// // // // // // // // //    const { isAuthenticated } = useAuth();

// // // // // // // // //   return (
// // // // // // // // //     <nav className={navStyles.base}>
// // // // // // // // //       <div className={navStyles.container}>
// // // // // // // // //         <div className={navStyles.inner}>
// // // // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // // // //             {navLinks.brand.label}
// // // // // // // // //           </Link>
// // // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // // //             {navLinks.mainLinks.map(link => (
// // // // // // // // //               !link.authRequired || isAuthenticated ? (
// // // // // // // // //                 <Link
// // // // // // // // //                   key={link.href}
// // // // // // // // //                   href={link.href}
// // // // // // // // //                   className={navStyles.link}
// // // // // // // // //                 >
// // // // // // // // //                   {link.label}
// // // // // // // // //                 </Link>
// // // // // // // // //               ) : null
// // // // // // // // //             ))}
// // // // // // // // //             <ThemeToggle />
// // // // // // // // //             {isAuthenticated ? (
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // //                 className={navStyles.button}
// // // // // // // // //               >
// // // // // // // // //                 {navLinks.authLinks.signOut.label}
// // // // // // // // //               </button>
// // // // // // // // //             ) : (
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // //                   provider: 'github',
// // // // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // //                 })}
// // // // // // // // //                 className={navStyles.button}
// // // // // // // // //               >
// // // // // // // // //                 {navLinks.authLinks.signIn.label}
// // // // // // // // //               </button>
// // // // // // // // //             )}
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </nav>
// // // // // // // // //   )
// // // // // // // // // }

// // // // // // // // // // // src/components/Navbar.tsx
// // // // // // // // // // 'use client'
// // // // // // // // // // import Link from 'next/link'
// // // // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // // // // // export function Navbar() {
// // // // // // // // // //   const { user, isAuthenticated } = useAuth()

// // // // // // // // // //   return (
// // // // // // // // // //     <nav className={navStyles.base}>
// // // // // // // // // //       <div className={navStyles.container}>
// // // // // // // // // //         <div className={navStyles.inner}>
// // // // // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // // // // //             {navLinks.brand.label}
// // // // // // // // // //           </Link>
// // // // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // // // //             {navLinks.mainLinks.map(link => (
// // // // // // // // // //               !link.authRequired || isAuthenticated ? (
// // // // // // // // // //                 <Link
// // // // // // // // // //                   key={link.href}
// // // // // // // // // //                   href={link.href}
// // // // // // // // // //                   className={navStyles.link}
// // // // // // // // // //                 >
// // // // // // // // // //                   {link.label}
// // // // // // // // // //                 </Link>
// // // // // // // // // //               ) : null
// // // // // // // // // //             ))}
// // // // // // // // // //             <ThemeToggle />
// // // // // // // // // //             {isAuthenticated ? (
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // // //                 className={navStyles.button}
// // // // // // // // // //               >
// // // // // // // // // //                 {navLinks.authLinks.signOut.label}
// // // // // // // // // //               </button>
// // // // // // // // // //             ) : (
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // // //                   provider: 'github',
// // // // // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // // //                 })}
// // // // // // // // // //                 className={navStyles.button}
// // // // // // // // // //               >
// // // // // // // // // //                 {navLinks.authLinks.signIn.label}
// // // // // // // // // //               </button>
// // // // // // // // // //             )}
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </nav>
// // // // // // // // // //   )
// // // // // // // // // // }

// // // // // // // // // // // // src/components/Navbar.tsx
// // // // // // // // // // // 'use client'
// // // // // // // // // // // import Link from 'next/link'
// // // // // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // // // // // // // // import { useTheme } from '@/contexts/ThemeContext'

// // // // // // // // // // // export function Navbar() {
// // // // // // // // // // //   const { user, isAuthenticated } = useAuth()
// // // // // // // // // // //   const { isDark } = useTheme()

// // // // // // // // // // //   return (
// // // // // // // // // // //     <nav className={`${
// // // // // // // // // // //       isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
// // // // // // // // // // //     } shadow-sm transition-colors`}>
// // // // // // // // // // //       <div className="container mx-auto px-4">
// // // // // // // // // // //         <div className="flex justify-between h-16">
// // // // // // // // // // //           <Link href="/" className="flex items-center font-bold text-xl">
// // // // // // // // // // //             My Blog
// // // // // // // // // // //           </Link>
// // // // // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // // // // //             <Link href="/blog" className="hover:text-gray-600 dark:hover:text-gray-300">
// // // // // // // // // // //               Blog
// // // // // // // // // // //             </Link>
// // // // // // // // // // //             <ThemeToggle />
// // // // // // // // // // //             {isAuthenticated ? (
// // // // // // // // // // //               <>
// // // // // // // // // // //                 <Link href="/blog/new" className="hover:text-gray-600 dark:hover:text-gray-300">
// // // // // // // // // // //                   New Post
// // // // // // // // // // //                 </Link>
// // // // // // // // // // //                 <button
// // // // // // // // // // //                   onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // // // //                   className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // // //                 >
// // // // // // // // // // //                   Sign Out
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               </>
// // // // // // // // // // //             ) : (
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // // // //                   provider: 'github',
// // // // // // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // // // //                 })}
// // // // // // // // // // //                 className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // // //               >
// // // // // // // // // // //                 Sign In
// // // // // // // // // // //               </button>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </nav>
// // // // // // // // // // //   )
// // // // // // // // // // // }

// // // // // // // // // // // // // src/components/Navbar.tsx - Updated to use ClientOnly
// // // // // // // // // // // // 'use client'
// // // // // // // // // // // // import Link from 'next/link'
// // // // // // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'

// // // // // // // // // // // // export function Navbar() {
// // // // // // // // // // // //   const { user, isAuthenticated } = useAuth()

// // // // // // // // // // // //   return (
// // // // // // // // // // // //    //  <nav className="bg-white shadow-sm">
// // // // // // // // // // // //     <nav className="bg-white dark:bg-dark-primary shadow-sm transition-colors duration-200">
// // // // // // // // // // // //       <div className="container mx-auto px-4">
// // // // // // // // // // // //         <div className="flex justify-between h-16">
// // // // // // // // // // // //           <Link href="/" className="flex items-center font-bold text-xl">
// // // // // // // // // // // //             My Blog
// // // // // // // // // // // //           </Link>
// // // // // // // // // // // //           <ClientOnly>
// // // // // // // // // // // //             <div className="flex items-center space-x-8">
// // // // // // // // // // // //               <Link href="/blog" className="hover:text-gray-600">Blog</Link>
// // // // // // // // // // // //               <ThemeToggle />
// // // // // // // // // // // //               {isAuthenticated ? (
// // // // // // // // // // // //                 <>
// // // // // // // // // // // //                   <Link href="/blog/new" className="hover:text-gray-600">New Post</Link>
// // // // // // // // // // // //                   <button
// // // // // // // // // // // //                     onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // // // // //                     className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // // // //                   >
// // // // // // // // // // // //                     Sign Out
// // // // // // // // // // // //                   </button>
// // // // // // // // // // // //                 </>
// // // // // // // // // // // //               ) : (
// // // // // // // // // // // //                 <button
// // // // // // // // // // // //                   onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // // // // //                     provider: 'github',
// // // // // // // // // // // //                     options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // // // // //                   })}
// // // // // // // // // // // //                   className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   Sign In
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //               )}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </ClientOnly>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </nav>
// // // // // // // // // // // //   )
// // // // // // // // // // // // }
