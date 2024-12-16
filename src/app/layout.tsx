/*-= src/app/layout.tsx =-*/
// import { Libre_Baskerville, Open_Sans } from "next/font/google";
import { Providers } from "./providers";
// import { Navbar } from "@/components/Navbar";
import "./globals.css";
// import MobileNavbar from "@/components/MobileNavbar";
import { Navbar } from "@/components/MobileNavbar";

import React from 'react';

export const PortfolioSection = ({ children }: { children: React.ReactNode }) => (
   <section className="portfolioSectionContainer relative w-screen overflow-hidden">
      {/* <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8"> */}
      <div>
         {children}
      </div>
   </section>
);

export const BlogSection = ({ children }: { children: React.ReactNode }) => (
   <section className="blogSectionContainer relative w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
         {children}
      </div>
   </section>
);


// const baskerville = Libre_Baskerville({
// 	subsets: ["latin"],
// 	weight: ["400", "700"],
// 	variable: "--font-baskerville",
// });

// const openSans = Open_Sans({
// 	subsets: ["latin"],
// 	weight: ["400", "500", "600", "700"],
// 	variable: "--font-opensans",
// });

import { EB_Garamond, Nunito_Sans } from "next/font/google";

const garamond = EB_Garamond({
   subsets: ["latin"],
   weight: ["400", "700"],
   variable: "--font-garamond",
});

const nunitoSans = Nunito_Sans({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
   variable: "--font-nunitosans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html
         lang='en'
         suppressHydrationWarning
         // className={`${baskerville.variable} ${openSans.variable}`}
         className={`${garamond.variable} ${nunitoSans.variable}`}
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
            // className={openSans.className}
            className={nunitoSans.className}
            suppressHydrationWarning
         >
            <Providers>
               <div className='min-h-screen flex flex-col'>
                  <Navbar />
                  {/* <MobileNavbar /> */}
                  <main className='mainContainer flex-1 container mx-auto px-4 py-8'>{children}</main>
               </div>
            </Providers>
         </body>
      </html>
   );
}

// /*-= src/app/layout.tsx =-*/
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
{
   /* <Navbar />; */
}
// 						<main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
// 					</div>
// 				</Providers>
// 			</body>
// 		</html>
// 	);
// }
