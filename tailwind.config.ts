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
         colors: {
            primary: {
               50: '#f6f4fe',
               100: '#efecfb',
               200: '#dfdbf9',
               300: '#c7bef4',
               400: '#ab99ec',
               500: '#8e6fe3',
               600: '#8459d9',
               700: '#6e3ec3',
               800: '#5b33a4',
               900: '#4c2c86',
               950: '#2f1a5b',
            },
            secondary: {
               50: '#eefbfc',
               100: '#d4f3f6',
               200: '#afe6ee',
               300: '#77d2e2',
               400: '#3ab6cf',
               500: '#1d99b8',
               600: '#187a9b',
               700: '#19627d',
               800: '#1c5268',
               900: '#1b4559',
               950: '#0c2c3d',
            },
            accent: {
               50: '#fef2f2',
               100: '#fee2e2',
               200: '#fecaca',
               300: '#fca5a5',
               400: '#f87171',
               500: '#ef4444',
               600: '#dc2626',
               700: '#b91c1c',
               800: '#991b1b',
               900: '#7f1d1d',
               950: '#450a0a',
            },
            success: {
               50: '#f8ffe5',
               100: '#efffc7',
               200: '#deff95',
               300: '#bbff3d',
               400: '#aaf625',
               500: '#8add05',
               600: '#6ab100',
               700: '#508605',
               800: '#41690b',
               900: '#37590e',
               950: '#1b3201',
            },
         }
      }
   },
   plugins: [typography],
} satisfies Config;