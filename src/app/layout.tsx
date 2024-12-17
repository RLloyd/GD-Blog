/*-= src/app/layout.tsx =-*/
import { Providers } from "./providers";
import "./globals.css";
import { Navbar } from "@/components/MobileNavbar";
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

export const PortfolioSection = ({ children }: { children: React.ReactNode }) => (
   <section className="portfolioSectionContainer relative w-screen overflow-hidden">
      <div>{children}</div>
   </section>
);

export const BlogSection = ({ children }: { children: React.ReactNode }) => (
   <section className="blogSectionContainer relative w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
         {children}
      </div>
   </section>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" suppressHydrationWarning className={`${garamond.variable} ${nunitoSans.variable}`}>
         <body suppressHydrationWarning className={nunitoSans.className}>
            <Providers>
               <div className="min-h-screen flex flex-col">
                  <Navbar />
                  {children}
               </div>
            </Providers>
         </body>
      </html>
   );
}
