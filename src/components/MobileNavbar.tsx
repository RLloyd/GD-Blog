// src/components/MobileNavbar.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabaseClient } from '@/lib/auth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { navLinks } from '@/data/navbarConfig';
import { usePathname, useRouter } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const getBlogPostInfo = () => {
    const pathParts = pathname.split("/");
    if (pathParts[1] === "blog" && pathParts.length === 3) {
      const isNewPost = pathParts[2] === "new";
      const isDrafts = pathParts[2] === "drafts";
      const isEditPath = pathname.includes("/edit/");
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
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg transition-all z-50">
        <div className="max-w-page mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href={navLinks.brand.href} className="flex items-center">
              <Image
                src={navLinks.brand.logo}
                alt={navLinks.brand.label}
                width={90}
                height={90}
                priority
                className="w-auto h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.mainLinks.map((link) => {
                if ("authRequired" in link && link.authRequired && !isAuthenticated) return null;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}

              {isAuthenticated && isPost && (
                <>
                  <Link
                    href={`/blog/edit/${slug}`}
                    className="px-3 py-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                  >
                    Edit Post
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isDeleting && <Loader2 className="animate-spin" size={16} />}
                    {isDeleting ? "Deleting..." : "Delete Post"}
                  </button>
                </>
              )}

              <ThemeToggle />

              {isAuthenticated ? (
                <button
                  onClick={() => supabaseClient.auth.signOut()}
                  className="px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  {navLinks.authLinks.signOut.label}
                </button>
              ) : (
                <button
                  onClick={() => supabaseClient.auth.signInWithOAuth({
                    provider: 'github',
                    options: { redirectTo: `${window.location.origin}/auth/callback` }
                  })}
                  className="px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  {navLinks.authLinks.signIn.label}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t dark:border-gray-800">
              <div className="flex flex-col space-y-4 p-4">
                {navLinks.mainLinks.map((link) => {
                  if ("authRequired" in link && link.authRequired && !isAuthenticated) return null;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {isAuthenticated && isPost && (
                  <>
                    <Link
                      href={`/blog/edit/${slug}`}
                      className="text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Edit Post
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete();
                        setIsOpen(false);
                      }}
                      disabled={isDeleting}
                      className="w-full text-left text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 px-4 py-2 rounded transition-colors flex items-center gap-2"
                    >
                      {isDeleting && <Loader2 className="animate-spin" size={16} />}
                      {isDeleting ? "Deleting..." : "Delete Post"}
                    </button>
                  </>
                )}

                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      supabaseClient.auth.signOut();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    {navLinks.authLinks.signOut.label}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      supabaseClient.auth.signInWithOAuth({
                        provider: 'github',
                        options: { redirectTo: `${window.location.origin}/auth/callback` }
                      });
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    {navLinks.authLinks.signIn.label}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
}
// // src/components/MobileNavbar.tsx
// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";
// import { supabaseClient } from "@/lib/auth";
// import { ThemeToggle } from "@/components/ThemeToggle";
// import { navLinks } from "@/data/navbarConfig";

// export function Navbar() {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const { isAuthenticated } = useAuth();

// 	return (
// 		<>
// 			<nav className='fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg transition-all z-50'>
// 				<div className='max-w-page mx-auto px-4'>
// 					<div className='flex justify-between items-center h-16'>
// 						<Link
// 							href={navLinks.brand.href}
// 							className='flex items-center'
// 						>
// 							<Image
// 								src={navLinks.brand.logo}
// 								alt={navLinks.brand.label}
// 								width={90}
// 								height={90}
// 								priority
// 								className='w-auto h-12'
// 							/>
// 						</Link>

// 						<div className='hidden md:flex items-center gap-6'>
// 							{navLinks.mainLinks.map((link) => {
// 								if ("authRequired" in link && link.authRequired && !isAuthenticated) return null;
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
// 							<ThemeToggle />
// 							{isAuthenticated ? (
// 								<button
// 									onClick={() => supabaseClient.auth.signOut()}
// 									className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 								>
// 									{navLinks.authLinks.signOut.label}
// 								</button>
// 							) : (
// 								<button
// 									onClick={() =>
// 										supabaseClient.auth.signInWithOAuth({
// 											provider: "github",
// 											options: { redirectTo: `${window.location.origin}/auth/callback` },
// 										})
// 									}
// 									className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 								>
// 									{navLinks.authLinks.signIn.label}
// 								</button>
// 							)}
// 						</div>

// 						<div className='md:hidden flex items-center gap-4'>
// 							<ThemeToggle />
// 							<button
// 								onClick={() => setIsOpen(!isOpen)}
// 								className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
// 							>
// 								{isOpen ? <X size={24} /> : <Menu size={24} />}
// 							</button>
// 						</div>
// 					</div>

// 					{isOpen && (
// 						<div className='md:hidden border-t dark:border-gray-800'>
// 							<div className='flex flex-col space-y-4 p-4'>
// 								{navLinks.mainLinks.map((link) => {
// 									if ("authRequired" in link && link.authRequired && !isAuthenticated) return null;
// 									return (
// 										<Link
// 											key={link.href}
// 											href={link.href}
// 											className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2'
// 											onClick={() => setIsOpen(false)}
// 										>
// 											{link.label}
// 										</Link>
// 									);
// 								})}
// 								{isAuthenticated ? (
// 									<button
// 										onClick={() => {
// 											supabaseClient.auth.signOut();
// 											setIsOpen(false);
// 										}}
// 										className='w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 									>
// 										{navLinks.authLinks.signOut.label}
// 									</button>
// 								) : (
// 									<button
// 										onClick={() => {
// 											supabaseClient.auth.signInWithOAuth({
// 												provider: "github",
// 												options: { redirectTo: `${window.location.origin}/auth/callback` },
// 											});
// 											setIsOpen(false);
// 										}}
// 										className='w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 									>
// 										{navLinks.authLinks.signIn.label}
// 									</button>
// 								)}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			</nav>
// 			<div className='h-16' /> {/* Spacer to prevent content from going under fixed navbar */}
// 		</>
// 	);
// }
// // // src/components/MobileNavbar.tsx
// // "use client";
// // import { useState } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { Menu, X } from "lucide-react";
// // import { useAuth } from "@/hooks/useAuth";
// // import { supabaseClient } from "@/lib/auth";
// // import { ThemeToggle } from "@/components/ThemeToggle";
// // import { navLinks } from "@/data/navbarConfig";

// // export default function MobileNavbar() {
// // 	const [isOpen, setIsOpen] = useState(false);
// // 	const { isAuthenticated } = useAuth();

// // 	const toggleMenu = () => setIsOpen(!isOpen);

// // 	return (
// // 		<nav className='bg-white dark:bg-gray-900 shadow-lg transition-all fixed w-full top-0 z-50'>
// // 			<div className='max-w-page mx-auto px-4'>

// // 				{/* Main Navigation Bar */}
// // 				<div className='flex justify-between items-center h-16'>
// // 					{/* Logo */}
// // 					<Link
// // 						href={navLinks.brand.href}
// // 						className='flex items-center'
// // 					>
// // 						<Image
// // 							src={navLinks.brand.logo}
// // 							alt={navLinks.brand.label}
// // 							width={90}
// // 							height={90}
// // 							priority
// // 							className='w-auto h-12'
// // 						/>
// // 					</Link>

// // 					{/* Desktop Navigation - Hidden on Mobile */}
// // 					<div className='hidden md:flex items-center space-x-6'>
// // 						{navLinks.mainLinks.map((link) => {
// // 							if ("authRequired" in link && link.authRequired && !isAuthenticated) {
// // 								return null;
// // 							}
// // 							return (
// // 								<Link
// // 									key={link.href}
// // 									href={link.href}
// // 									className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
// // 								>
// // 									{link.label}
// // 								</Link>
// // 							);
// // 						})}
// // 						<ThemeToggle />
// // 						{isAuthenticated ? (
// // 							<button
// // 								onClick={() => supabaseClient.auth.signOut()}
// // 								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// // 							>
// // 								{navLinks.authLinks.signOut.label}
// // 							</button>
// // 						) : (
// // 							<button
// // 								onClick={() =>
// // 									supabaseClient.auth.signInWithOAuth({
// // 										provider: "github",
// // 										options: { redirectTo: `${window.location.origin}/auth/callback` },
// // 									})
// // 								}
// // 								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// // 							>
// // 								{navLinks.authLinks.signIn.label}
// // 							</button>
// // 						)}
// // 					</div>

// // 					{/* Mobile Menu Button */}
// // 					<div className='md:hidden flex items-center space-x-4'>
// // 						<ThemeToggle />
// // 						<button
// // 							onClick={toggleMenu}
// // 							className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
// // 						>
// // 							{isOpen ? <X size={24} /> : <Menu size={24} />}
// // 						</button>
// // 					</div>
// // 				</div>

// // 				{/* Mobile Menu Overlay */}
// // 				{isOpen && (
// // 					<div className='md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg'>
// // 						<div className='flex flex-col space-y-4 p-4'>
// // 							{navLinks.mainLinks.map((link) => {
// // 								if ("authRequired" in link && link.authRequired && !isAuthenticated) {
// // 									return null;
// // 								}
// // 								return (
// // 									<Link
// // 										key={link.href}
// // 										href={link.href}
// // 										className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2'
// // 										onClick={() => setIsOpen(false)}
// // 									>
// // 										{link.label}
// // 									</Link>
// // 								);
// // 							})}
// // 							{isAuthenticated ? (
// // 								<button
// // 									onClick={() => {
// // 										supabaseClient.auth.signOut();
// // 										setIsOpen(false);
// // 									}}
// // 									className='w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// // 								>
// // 									{navLinks.authLinks.signOut.label}
// // 								</button>
// // 							) : (
// // 								<button
// // 									onClick={() => {
// // 										supabaseClient.auth.signInWithOAuth({
// // 											provider: "github",
// // 											options: { redirectTo: `${window.location.origin}/auth/callback` },
// // 										});
// // 										setIsOpen(false);
// // 									}}
// // 									className='w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// // 								>
// // 									{navLinks.authLinks.signIn.label}
// // 								</button>
// // 							)}
// // 						</div>
// // 					</div>
// // 				)}
// // 			</div>
// // 		</nav>
// // 	);
// // }
