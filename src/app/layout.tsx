// src/app/layout.tsx - Updated with strict CSR marking
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'
import "@/styles/globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "My Blog",
  description: "A personal blog built with Next.js and Styled Components",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
// // src/app/layout.tsx
// import type { Metadata } from "next"
// import localFont from "next/font/local"
// import { Providers } from './providers'
// import { Navbar } from '@/components/Navbar'
// import "@/styles/globals.css"

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// })

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })

// export const metadata: Metadata = {
//   title: "My Blog",
//   description: "A personal blog built with Next.js and Styled Components",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <Providers>
//           <Navbar />
//           <main>
//             {children}
//           </main>
//         </Providers>
//       </body>
//     </html>
//   )
// }


// // // src/app/layout.tsx
// // import localFont from "next/font/local"
// // import StyledComponentsRegistry from '@/lib/registry'

// // const geistSans = localFont({
// //   src: "./fonts/GeistVF.woff",
// //   variable: "--font-geist-sans",
// //   weight: "100 900",
// // })

// // const geistMono = localFont({
// //   src: "./fonts/GeistMonoVF.woff",
// //   variable: "--font-geist-mono",
// //   weight: "100 900",
// // })

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode
// // }) {
// //   return (
// //     <html lang="en" suppressHydrationWarning>
// //       <body>
// //         <StyledComponentsRegistry>
// //           <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}>
// //             {children}
// //           </div>
// //         </StyledComponentsRegistry>
// //       </body>
// //     </html>
// //   )
// // }



// // // // src/app/layout.tsx
// // // import localFont from "next/font/local"
// // // import { Navbar } from '@/components/Navbar'
// // // import { ThemeLayout } from '@/components/ThemeLayout'

// // // const geistSans = localFont({
// // //   src: "./fonts/GeistVF.woff",
// // //   variable: "--font-geist-sans",
// // //   weight: "100 900",
// // // })

// // // const geistMono = localFont({
// // //   src: "./fonts/GeistMonoVF.woff",
// // //   variable: "--font-geist-mono",
// // //   weight: "100 900",
// // // })

// // // export default function RootLayout({
// // //   children,
// // // }: {
// // //   children: React.ReactNode
// // // }) {
// // //   return (
// // //     <html lang="en" suppressHydrationWarning>
// // //       <body>
// // //         <ThemeLayout>
// // //           <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
// // //             <Navbar />
// // //             <main className="container mx-auto px-4 py-8">
// // //               {children}
// // //             </main>
// // //           </div>
// // //         </ThemeLayout>
// // //       </body>
// // //     </html>
// // //   )
// // // }


// // // // // src/app/layout.tsx
// // // // "use client"
// // // // import localFont from "next/font/local"
// // // // import { Providers } from './providers'
// // // // import { ThemeProvider } from 'styled-components'
// // // // import { lightTheme } from '@/lib/theme-config'
// // // // import { GlobalStyle } from '@/lib/theme'
// // // // import StyledComponentsRegistry from '@/lib/registry'
// // // // import { Navbar } from '@/components/Navbar'

// // // // const geistSans = localFont({
// // // //   src: "./fonts/GeistVF.woff",
// // // //   variable: "--font-geist-sans",
// // // //   weight: "100 900",
// // // // })

// // // // const geistMono = localFont({
// // // //   src: "./fonts/GeistMonoVF.woff",
// // // //   variable: "--font-geist-mono",
// // // //   weight: "100 900",
// // // // })

// // // // export default function RootLayout({
// // // //   children,
// // // // }: {
// // // //   children: React.ReactNode
// // // // }) {
// // // //    return (
// // // //       <html lang="en" suppressHydrationWarning>
// // // //         <body>
// // // //           <Providers>
// // // //             <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
// // // //               <Navbar />
// // // //               <main className="container mx-auto px-4 py-8">
// // // //                 {children}
// // // //               </main>
// // // //             </div>
// // // //           </Providers>
// // // //         </body>
// // // //       </html>
// // // //     )
// // // // //   return (
// // // // //     <html lang="en" suppressHydrationWarning>
// // // // //       <body>
// // // // //         <StyledComponentsRegistry>
// // // // //           <ThemeProvider theme={lightTheme}>
// // // // //             <GlobalStyle />
// // // // //             <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
// // // // //               <Navbar />
// // // // //               <main className="container mx-auto px-4 py-8">
// // // // //                 {children}
// // // // //               </main>
// // // // //             </div>
// // // // //           </ThemeProvider>
// // // // //         </StyledComponentsRegistry>
// // // // //       </body>
// // // // //     </html>
// // // // //   )
// // // // }
// // // // // // src/app/layout.tsx
// // // // // 'use client'
// // // // // import { useState, useEffect } from 'react'
// // // // // import 'styled-components'
// // // // // import { ThemeProvider } from 'styled-components'
// // // // // import { theme, GlobalStyle } from '@/lib/theme'
// // // // // import StyledComponentsRegistry from '@/lib/registry'

// // // // // function ThemeWrapper({ children }: { children: React.ReactNode }) {
// // // // //   const [isDarkTheme, setIsDarkTheme] = useState(false)

// // // // //   useEffect(() => {
// // // // //     // Sync with portfolio theme preference
// // // // //     const darkMode = localStorage.getItem('darkMode') === 'true'
// // // // //     setIsDarkTheme(darkMode)
// // // // //   }, [])

// // // // //   return (
// // // // //     <ThemeProvider theme={isDarkTheme ? theme.dark : theme.light}>
// // // // //       <GlobalStyle />
// // // // //       {children}
// // // // //     </ThemeProvider>
// // // // //   )
// // // // // }

// // // // // export default function RootLayout({
// // // // //   children,
// // // // // }: {
// // // // //   children: React.ReactNode
// // // // // }) {
// // // // //   return (
// // // // //     <html lang="en" suppressHydrationWarning>
// // // // //       <body>
// // // // //         <StyledComponentsRegistry>
// // // // //           <ThemeWrapper>
// // // // //             <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
// // // // //               <Navbar />
// // // // //               <main className="container mx-auto px-4 py-8">
// // // // //                 {children}
// // // // //               </main>
// // // // //             </div>
// // // // //           </ThemeWrapper>
// // // // //         </StyledComponentsRegistry>
// // // // //       </body>
// // // // //     </html>
// // // // //   )
// // // // // }

// // // // // // // src/app/layout.tsx
// // // // // // import type { Metadata } from "next"
// // // // // // import localFont from "next/font/local"
// // // // // // import "./globals.css"
// // // // // // import { Navbar } from '@/components/Navbar'

// // // // // // const geistSans = localFont({
// // // // // //   src: "./fonts/GeistVF.woff",
// // // // // //   variable: "--font-geist-sans",
// // // // // //   weight: "100 900",
// // // // // // })

// // // // // // const geistMono = localFont({
// // // // // //   src: "./fonts/GeistMonoVF.woff",
// // // // // //   variable: "--font-geist-mono",
// // // // // //   weight: "100 900",
// // // // // // })

// // // // // // export const metadata: Metadata = {
// // // // // //   title: "My Blog",
// // // // // //   description: "A Next.js blog with Supabase",
// // // // // // }

// // // // // // export default function RootLayout({
// // // // // //   children,
// // // // // // }: {
// // // // // //   children: React.ReactNode
// // // // // // }) {
// // // // // //   return (
// // // // // //     <html lang="en" suppressHydrationWarning>
// // // // // //       <body suppressHydrationWarning>
// // // // // //         <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
// // // // // //           <Navbar />
// // // // // //           <main className="container mx-auto px-4 py-8">
// // // // // //             {children}
// // // // // //           </main>
// // // // // //         </div>
// // // // // //       </body>
// // // // // //     </html>
// // // // // //   )
// // // // // // }