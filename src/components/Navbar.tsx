// src/components/Navbar.tsx - Updated to use ClientOnly
'use client'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { supabaseClient } from '@/lib/auth'
import { ClientOnly } from '@/components/ClientOnly'

export function Navbar() {
  const { user, isAuthenticated } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link href="/" className="flex items-center font-bold text-xl">
            My Blog
          </Link>
          <ClientOnly>
            <div className="flex items-center space-x-8">
              <Link href="/blog" className="hover:text-gray-600">Blog</Link>
              {isAuthenticated ? (
                <>
                  <Link href="/blog/new" className="hover:text-gray-600">New Post</Link>
                  <button
                    onClick={() => supabaseClient.auth.signOut()}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => supabaseClient.auth.signInWithOAuth({
                    provider: 'github',
                    options: { redirectTo: `${window.location.origin}/auth/callback` }
                  })}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </ClientOnly>
        </div>
      </div>
    </nav>
  )
}


// // src/components/Navbar.tsx
// 'use client'
// import Link from 'next/link'
// import { useAuth } from '@/hooks/useAuth'
// import { supabaseClient } from '@/lib/auth'
// import { useRouter } from 'next/navigation'
// import { useState, useEffect } from 'react'

// export function Navbar() {
//   const { user, isAuthenticated } = useAuth()
//   const router = useRouter()
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) {
//     return (
//       <nav className="bg-white shadow-sm">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between h-16">
//             <Link href="/" className="flex items-center font-bold text-xl">
//               My Blog
//             </Link>
//             <div className="flex items-center space-x-8">
//               <Link href="/blog" className="hover:text-gray-600">Blog</Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//     )
//   }

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between h-16">
//           <Link href="/" className="flex items-center font-bold text-xl">
//             My Blog
//           </Link>
//           <div className="flex items-center space-x-8">
//             <Link href="/blog" className="hover:text-gray-600">Blog</Link>
//             {isAuthenticated ? (
//               <>
//                 <Link href="/blog/new" className="hover:text-gray-600">New Post</Link>
//                 <button
//                   onClick={() => supabaseClient.auth.signOut()}
//                   className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
//                 >
//                   Sign Out
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => supabaseClient.auth.signInWithOAuth({
//                   provider: 'github',
//                   options: { redirectTo: `${window.location.origin}/auth/callback` }
//                 })}
//                 className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
//               >
//                 Sign In
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }