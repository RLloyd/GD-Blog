// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "My Blog",
	description: "A personal blog built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
               if (localStorage.theme === 'dark') {
                 document.documentElement.classList.add('dark')
               } else {
                 document.documentElement.classList.remove('dark')
                 localStorage.setItem('theme', 'light')
               }
             `,
					}}
				/>
			</head>
			<body
				className={`
        ${geistSans.variable}
        ${geistMono.variable}
        bg-white text-gray-900
        dark:bg-gray-900 dark:text-white
        transition-colors duration-200
      `}
				suppressHydrationWarning
			>
				<Providers>
					<Navbar />
					<main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
// // src/app/layout.tsx
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import { Providers } from "./providers";
// import { Navbar } from "@/components/Navbar";
// import "./globals.css";

// const geistSans = localFont({
// 	src: "./fonts/GeistVF.woff",
// 	variable: "--font-geist-sans",
// 	weight: "100 900",
// });

// const geistMono = localFont({
// 	src: "./fonts/GeistMonoVF.woff",
// 	variable: "--font-geist-mono",
// 	weight: "100 900",
// });

// export const metadata: Metadata = {
// 	title: "My Blog",
// 	description: "A personal blog built with Next.js",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
// 	return (
// 		<html
// 			lang='en'
// 			suppressHydrationWarning
// 		>
// 			<body
// 				className={`${geistSans.variable} ${geistMono.variable}`}
// 				suppressHydrationWarning
// 			>
// 				<Providers>
// 					<Navbar />
// 					<main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
// 				</Providers>
// 			</body>
// 		</html>
// 	);
// }
// // // src/app/layout.tsx
// // import type { Metadata } from "next";
// // import localFont from "next/font/local";
// // import { Navbar } from "@/components/Navbar";
// // import "./globals.css";

// // const geistSans = localFont({
// // 	src: "./fonts/GeistVF.woff",
// // 	variable: "--font-geist-sans",
// // 	weight: "100 900",
// // });

// // const geistMono = localFont({
// // 	src: "./fonts/GeistMonoVF.woff",
// // 	variable: "--font-geist-mono",
// // 	weight: "100 900",
// // });

// // export const metadata: Metadata = {
// // 	title: "My Blog",
// // 	description: "A personal blog built with Next.js",
// // };

// // export default function RootLayout({ children }: { children: React.ReactNode }) {
// // 	return (
// // 		<html
// // 			lang='en'
// // 			className='light'
// // 		>
// // 			<body className={`${geistSans.variable} ${geistMono.variable} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
// // 				<Navbar />
// // 				<main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
// // 			</body>
// // 		</html>
// // 	);
// // }

// // // // src/app/layout.tsx - Updated with strict CSR marking

// // // import type { Metadata } from "next"
// // // import localFont from "next/font/local"
// // // import { Providers } from './providers'
// // // import { Navbar } from '@/components/Navbar'
// // // import "@/styles/globals.css"

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

// // // export const metadata: Metadata = {
// // //   title: "My Blog",
// // //   description: "A personal blog built with Next.js and Styled Components",
// // // }

// // // export default function RootLayout({
// // //   children,
// // // }: {
// // //   children: React.ReactNode
// // // }) {
// // //   return (
// // //     <html lang="en" suppressHydrationWarning>
// // //       <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
// // //         <Providers>
// // //           <Navbar />
// // //           {children}
// // //         </Providers>
// // //       </body>
// // //     </html>
// // //   )
// // // }
