// src/components/Navbar.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { supabaseClient } from '@/lib/auth'
import { ThemeToggle } from '@/components/ThemeToggle'
import { navLinks, navStyles } from '@/data/navbarConfig'

export function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <nav className={navStyles.base}>
      <div className={navStyles.container}>
        <div className={navStyles.inner}>
          <Link href={navLinks.brand.href} className={navStyles.brand}>
            <Image
              src={navLinks.brand.logo}
              alt={navLinks.brand.label}
              width={150}
              height={40}
              priority
            />
            <span className="sr-only">{navLinks.brand.label}</span>
          </Link>
          <div className="flex items-center space-x-8">
            {navLinks.mainLinks.map(link => {
              if ('authRequired' in link && link.authRequired && !isAuthenticated) {
                return null;
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navStyles.link}
                >
                  {link.label}
                </Link>
              );
            })}
            <ThemeToggle />
            {isAuthenticated ? (
              <button
                onClick={() => supabaseClient.auth.signOut()}
                className={navStyles.button}
              >
                {navLinks.authLinks.signOut.label}
              </button>
            ) : (
              <button
                onClick={() => supabaseClient.auth.signInWithOAuth({
                  provider: 'github',
                  options: { redirectTo: `${window.location.origin}/auth/callback` }
                })}
                className={navStyles.button}
              >
                {navLinks.authLinks.signIn.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
// // src/components/Navbar.tsx
// "use client";
// import Link from "next/link";
// import { useAuth } from "@/hooks/useAuth";
// import { supabaseClient } from "@/lib/auth";
// import { ThemeToggle } from "@/components/ThemeToggle";
// import { navLinks, navStyles } from "@/data/navbarConfig";

// export function Navbar() {
// 	const { isAuthenticated } = useAuth();

// 	return (
// 		<nav className={navStyles.base}>
// 			<div className={navStyles.container}>
// 				<div className={navStyles.inner}>
// 					<Link href={navLinks.brand.href} className={navStyles.brand}>
// 						{navLinks.brand.label}
// 					</Link>
// 					<div className="flex items-center space-x-8">
// 						{navLinks.mainLinks.map((link) => {
// 							if ("authRequired" in link && link.authRequired && !isAuthenticated) {
// 								return null;
// 							}
// 							return (
// 								<Link key={link.href} href={link.href} className={navStyles.link}>
// 									{link.label}
// 								</Link>
// 							);
// 						})}
// 						<ThemeToggle />
// 						{isAuthenticated ? (
// 							<button onClick={() => supabaseClient.auth.signOut()} className={navStyles.button}>
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
// 								className={navStyles.button}
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
// // import { useAuth } from '@/hooks/useAuth'
// // import { supabaseClient } from '@/lib/auth'
// // import { ThemeToggle } from '@/components/ThemeToggle'
// // import { navLinks, navStyles } from '@/data/navbarConfig'

// // export function Navbar() {
// //   const { user, isAuthenticated } = useAuth()

// //   return (
// //     <nav className={navStyles.base}>
// //       <div className={navStyles.container}>
// //         <div className={navStyles.inner}>
// //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// //             {navLinks.brand.label}
// //           </Link>
// //           <div className="flex items-center space-x-8">
// //             {navLinks.mainLinks.map(link => (
// //               !link.authRequired || isAuthenticated ? (
// //                 <Link
// //                   key={link.href}
// //                   href={link.href}
// //                   className={navStyles.link}
// //                 >
// //                   {link.label}
// //                 </Link>
// //               ) : null
// //             ))}
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
// // // 'use client'
// // // import Link from 'next/link'
// // // import { useAuth } from '@/hooks/useAuth'
// // // import { supabaseClient } from '@/lib/auth'
// // // import { ClientOnly } from '@/components/ClientOnly'
// // // import { navLinks, navStyles } from '@/data/navbarConfig'
// // // import { Sun, Moon } from 'lucide-react'
// // // import { useTheme } from '@/hooks/useTheme'

// // // export function Navbar() {
// // //   const { isAuthenticated } = useAuth()
// // //   const { theme, toggleTheme } = useTheme()

// // //   const handleSignIn = () => {
// // //     supabaseClient.auth.signInWithOAuth({
// // //       provider: 'github',
// // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // //     })
// // //   }

// // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // //   return (
// // //     <nav className={navStyles.base}>
// // //       <div className={navStyles.container}>
// // //         <div className={navStyles.inner}>
// // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // //             {navLinks.brand.label}
// // //           </Link>

// // //           <div className="flex items-center space-x-8">
// // //             <Link href="/blog" className={navStyles.link}>Blog</Link>

// // //             {isAuthenticated && (
// // //               <Link href="/blog/new" className={navStyles.link}>New Post</Link>
// // //             )}

// // //             <button
// // //               onClick={toggleTheme}
// // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // //               aria-label="Toggle theme"
// // //             >
// // //               {theme === 'dark' ?
// // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // //               }
// // //             </button>

// // //             <ClientOnly>
// // //               {isAuthenticated ? (
// // //                 <button onClick={handleSignOut} className={navStyles.button}>
// // //                   {navLinks.authLinks.signOut.label}
// // //                 </button>
// // //               ) : (
// // //                 <button onClick={handleSignIn} className={navStyles.button}>
// // //                   {navLinks.authLinks.signIn.label}
// // //                 </button>
// // //               )}
// // //             </ClientOnly>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   )
// // // }
// // // // // src/components/Navbar.tsx
// // // // 'use client'
// // // // import Link from 'next/link'
// // // // import { useAuth } from '@/hooks/useAuth'
// // // // import { supabaseClient } from '@/lib/auth'
// // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // import { navLinks, navStyles } from '@/data/navbarConfig'
// // // // import { Sun, Moon } from 'lucide-react'
// // // // import { useState, useEffect } from 'react'

// // // // export function Navbar() {
// // // //   const { isAuthenticated } = useAuth()
// // // //   const [isDarkMode, setIsDarkMode] = useState(false)

// // // //   useEffect(() => {
// // // //     const isDark = document.documentElement.classList.contains('dark')
// // // //     setIsDarkMode(isDark)
// // // //   }, [])

// // // //   const toggleTheme = () => {
// // // //     document.documentElement.classList.toggle('dark')
// // // //     setIsDarkMode(!isDarkMode)
// // // //     localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
// // // //   }

// // // //   const handleSignIn = () => {
// // // //     supabaseClient.auth.signInWithOAuth({
// // // //       provider: 'github',
// // // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // //     })
// // // //   }

// // // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // // //   return (
// // // //     <nav className={navStyles.base}>
// // // //       <div className={navStyles.container}>
// // // //         <div className={navStyles.inner}>
// // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // //             {navLinks.brand.label}
// // // //           </Link>

// // // //           <div className="flex items-center space-x-8">
// // // //             <Link href="/blog" className={navStyles.link}>Blog</Link>

// // // //             {isAuthenticated && (
// // // //               <Link href="/blog/new" className={navStyles.link}>New Post</Link>
// // // //             )}

// // // //             <button
// // // //               onClick={toggleTheme}
// // // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // // //               aria-label="Toggle theme"
// // // //             >
// // // //               {isDarkMode ?
// // // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // // //               }
// // // //             </button>

// // // //             <ClientOnly>
// // // //               {isAuthenticated ? (
// // // //                 <button
// // // //                   onClick={handleSignOut}
// // // //                   className={navStyles.button}
// // // //                 >
// // // //                   {navLinks.authLinks.signOut.label}
// // // //                 </button>
// // // //               ) : (
// // // //                 <button
// // // //                   onClick={handleSignIn}
// // // //                   className={navStyles.button}
// // // //                 >
// // // //                   {navLinks.authLinks.signIn.label}
// // // //                 </button>
// // // //               )}
// // // //             </ClientOnly>
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
// // // // // import { useState, useEffect } from 'react'

// // // // // export function Navbar() {
// // // // //   const { isAuthenticated } = useAuth()
// // // // //   const [isDarkMode, setIsDarkMode] = useState(false)

// // // // //   useEffect(() => {
// // // // //     const isDark = document.documentElement.classList.contains('dark')
// // // // //     setIsDarkMode(isDark)
// // // // //   }, [])

// // // // //   const toggleTheme = () => {
// // // // //     document.documentElement.classList.toggle('dark')
// // // // //     setIsDarkMode(!isDarkMode)
// // // // //     localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
// // // // //   }

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

// // // // //             <button
// // // // //               onClick={toggleTheme}
// // // // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // // // //               aria-label="Toggle theme"
// // // // //             >
// // // // //               {isDarkMode ?
// // // // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // // // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // // // //               }
// // // // //             </button>

// // // // //             <ClientOnly>
// // // // //               {isAuthenticated ? (
// // // // //                 <button
// // // // //                   onClick={handleSignOut}
// // // // //                   className={navStyles.button}
// // // // //                 >
// // // // //                   {navLinks.authLinks.signOut.label}
// // // // //                 </button>
// // // // //               ) : (
// // // // //                 <button
// // // // //                   onClick={handleSignIn}
// // // // //                   className={navStyles.button}
// // // // //                 >
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

// // // // // // export function Navbar() {
// // // // // //   const { isAuthenticated } = useAuth()

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
// // // // // //             {navLinks.mainLinks.map((link) => {
// // // // // //               if (link.authRequired && !isAuthenticated) return null;
// // // // // //               return (
// // // // // //                 <Link
// // // // // //                   key={link.href}
// // // // // //                   href={link.href}
// // // // // //                   className={navStyles.link}
// // // // // //                 >
// // // // // //                   {link.label}
// // // // // //                 </Link>
// // // // // //               );
// // // // // //             })}

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
// // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // // export function Navbar() {
// // // // // // //    const { isAuthenticated } = useAuth();

// // // // // // //   return (
// // // // // // //     <nav className={navStyles.base}>
// // // // // // //       <div className={navStyles.container}>
// // // // // // //         <div className={navStyles.inner}>
// // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // //             {navLinks.brand.label}
// // // // // // //           </Link>
// // // // // // //           <div className="flex items-center space-x-8">
// // // // // // //             {navLinks.mainLinks.map(link => (
// // // // // // //               !link.authRequired || isAuthenticated ? (
// // // // // // //                 <Link
// // // // // // //                   key={link.href}
// // // // // // //                   href={link.href}
// // // // // // //                   className={navStyles.link}
// // // // // // //                 >
// // // // // // //                   {link.label}
// // // // // // //                 </Link>
// // // // // // //               ) : null
// // // // // // //             ))}
// // // // // // //             <ThemeToggle />
// // // // // // //             {isAuthenticated ? (
// // // // // // //               <button
// // // // // // //                 onClick={() => supabaseClient.auth.signOut()}
// // // // // // //                 className={navStyles.button}
// // // // // // //               >
// // // // // // //                 {navLinks.authLinks.signOut.label}
// // // // // // //               </button>
// // // // // // //             ) : (
// // // // // // //               <button
// // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // //                   provider: 'github',
// // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // //                 })}
// // // // // // //                 className={navStyles.button}
// // // // // // //               >
// // // // // // //                 {navLinks.authLinks.signIn.label}
// // // // // // //               </button>
// // // // // // //             )}
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
// // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // // // export function Navbar() {
// // // // // // // //   const { user, isAuthenticated } = useAuth()

// // // // // // // //   return (
// // // // // // // //     <nav className={navStyles.base}>
// // // // // // // //       <div className={navStyles.container}>
// // // // // // // //         <div className={navStyles.inner}>
// // // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // // //             {navLinks.brand.label}
// // // // // // // //           </Link>
// // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // //             {navLinks.mainLinks.map(link => (
// // // // // // // //               !link.authRequired || isAuthenticated ? (
// // // // // // // //                 <Link
// // // // // // // //                   key={link.href}
// // // // // // // //                   href={link.href}
// // // // // // // //                   className={navStyles.link}
// // // // // // // //                 >
// // // // // // // //                   {link.label}
// // // // // // // //                 </Link>
// // // // // // // //               ) : null
// // // // // // // //             ))}
// // // // // // // //             <ThemeToggle />
// // // // // // // //             {isAuthenticated ? (
// // // // // // // //               <button
// // // // // // // //                 onClick={() => supabaseClient.auth.signOut()}
// // // // // // // //                 className={navStyles.button}
// // // // // // // //               >
// // // // // // // //                 {navLinks.authLinks.signOut.label}
// // // // // // // //               </button>
// // // // // // // //             ) : (
// // // // // // // //               <button
// // // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // //                   provider: 'github',
// // // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // //                 })}
// // // // // // // //                 className={navStyles.button}
// // // // // // // //               >
// // // // // // // //                 {navLinks.authLinks.signIn.label}
// // // // // // // //               </button>
// // // // // // // //             )}
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
// // // // // // // // // import { useTheme } from '@/contexts/ThemeContext'

// // // // // // // // // export function Navbar() {
// // // // // // // // //   const { user, isAuthenticated } = useAuth()
// // // // // // // // //   const { isDark } = useTheme()

// // // // // // // // //   return (
// // // // // // // // //     <nav className={`${
// // // // // // // // //       isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
// // // // // // // // //     } shadow-sm transition-colors`}>
// // // // // // // // //       <div className="container mx-auto px-4">
// // // // // // // // //         <div className="flex justify-between h-16">
// // // // // // // // //           <Link href="/" className="flex items-center font-bold text-xl">
// // // // // // // // //             My Blog
// // // // // // // // //           </Link>
// // // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // // //             <Link href="/blog" className="hover:text-gray-600 dark:hover:text-gray-300">
// // // // // // // // //               Blog
// // // // // // // // //             </Link>
// // // // // // // // //             <ThemeToggle />
// // // // // // // // //             {isAuthenticated ? (
// // // // // // // // //               <>
// // // // // // // // //                 <Link href="/blog/new" className="hover:text-gray-600 dark:hover:text-gray-300">
// // // // // // // // //                   New Post
// // // // // // // // //                 </Link>
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // //                   className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // //                 >
// // // // // // // // //                   Sign Out
// // // // // // // // //                 </button>
// // // // // // // // //               </>
// // // // // // // // //             ) : (
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // //                   provider: 'github',
// // // // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // //                 })}
// // // // // // // // //                 className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // //               >
// // // // // // // // //                 Sign In
// // // // // // // // //               </button>
// // // // // // // // //             )}
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </nav>
// // // // // // // // //   )
// // // // // // // // // }

// // // // // // // // // // // src/components/Navbar.tsx - Updated to use ClientOnly
// // // // // // // // // // 'use client'
// // // // // // // // // // import Link from 'next/link'
// // // // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'

// // // // // // // // // // export function Navbar() {
// // // // // // // // // //   const { user, isAuthenticated } = useAuth()

// // // // // // // // // //   return (
// // // // // // // // // //    //  <nav className="bg-white shadow-sm">
// // // // // // // // // //     <nav className="bg-white dark:bg-dark-primary shadow-sm transition-colors duration-200">
// // // // // // // // // //       <div className="container mx-auto px-4">
// // // // // // // // // //         <div className="flex justify-between h-16">
// // // // // // // // // //           <Link href="/" className="flex items-center font-bold text-xl">
// // // // // // // // // //             My Blog
// // // // // // // // // //           </Link>
// // // // // // // // // //           <ClientOnly>
// // // // // // // // // //             <div className="flex items-center space-x-8">
// // // // // // // // // //               <Link href="/blog" className="hover:text-gray-600">Blog</Link>
// // // // // // // // // //               <ThemeToggle />
// // // // // // // // // //               {isAuthenticated ? (
// // // // // // // // // //                 <>
// // // // // // // // // //                   <Link href="/blog/new" className="hover:text-gray-600">New Post</Link>
// // // // // // // // // //                   <button
// // // // // // // // // //                     onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // // //                     className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // //                   >
// // // // // // // // // //                     Sign Out
// // // // // // // // // //                   </button>
// // // // // // // // // //                 </>
// // // // // // // // // //               ) : (
// // // // // // // // // //                 <button
// // // // // // // // // //                   onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // // //                     provider: 'github',
// // // // // // // // // //                     options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // // //                   })}
// // // // // // // // // //                   className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // //                 >
// // // // // // // // // //                   Sign In
// // // // // // // // // //                 </button>
// // // // // // // // // //               )}
// // // // // // // // // //             </div>
// // // // // // // // // //           </ClientOnly>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </nav>
// // // // // // // // // //   )
// // // // // // // // // // }
