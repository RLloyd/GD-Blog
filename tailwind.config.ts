// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
   darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   extend: {
     backgroundColor: {
       'dark-primary': '#1a1a1a',
       'dark-secondary': '#2d2d2d',
     },
     textColor: {
       'dark-primary': '#ffffff',
       'dark-secondary': '#a0a0a0',
     }
   }
 },
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
  plugins: [typography],
} satisfies Config;