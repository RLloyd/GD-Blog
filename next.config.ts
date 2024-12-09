// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   images: {
      domains: ['example.com', 'localhost', 'images.unsplash.com'],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },
};

export default nextConfig;

// // next.config.ts
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       'localhost',
//       process.env.NEXT_PUBLIC_SUPABASE_URL!.replace('https://', ''),
//     ],
//   },
// };

// export default nextConfig;

// // // next.config.ts
// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   images: {
// //     domains: ['https://cwqfksyohgvbvojewrzr.supabase.co'], // Replace with your actual Supabase domain
// //   },
// // };

// // export default nextConfig;