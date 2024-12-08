// src/app/layout.tsx
import { Libre_Baskerville, Open_Sans } from "next/font/google";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const baskerville = Libre_Baskerville({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-baskerville",
});

const openSans = Open_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-opensans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={`${baskerville.variable} ${openSans.variable}`}
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
				className={openSans.className}
				suppressHydrationWarning
			>
				<Providers>
					<div className='min-h-screen flex flex-col'>
						<Navbar />
						<main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}

// // src/app/layout.tsx
// import { Libre_Baskerville } from "next/font/google";
// import { Providers } from "./providers";
// import { Navbar } from "@/components/Navbar";
// import "./globals.css";

// const baskerville = Libre_Baskerville({
// 	subsets: ["latin"],
// 	weight: ["400", "700"],
// });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
// 	return (
// 		<html
// 			lang='en'
// 			suppressHydrationWarning
// 		>
// 			<head>
// 				<script
// 					dangerouslySetInnerHTML={{
// 						__html: `
//               if (localStorage.theme === 'dark') {
//                 document.documentElement.classList.add('dark')
//               } else {
//                 document.documentElement.classList.remove('dark')
//                 localStorage.setItem('theme', 'light')
//               }
//             `,
// 					}}
// 				/>
// 			</head>
// 			<body
// 				className={baskerville.className}
// 				suppressHydrationWarning
// 			>
// 				<Providers>
// 					<div className='min-h-screen flex flex-col'>
// 						<Navbar />
// 						<main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
// 					</div>
// 				</Providers>
// 			</body>
// 		</html>
// 	);
// }
