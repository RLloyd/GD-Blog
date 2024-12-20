/*-= tailwind.config.ts =-*/
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
   darkMode: "class",
   content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      extend: {
         height: {
            screen: '100vh',
            'screen-small': '100svh',
         },
         transitionProperty: {
            height: 'height',
         },
         maxWidth: {
            'page': 'var(--page-width)',
         },
         fontFamily: {
            // baskerville: ["var(--font-baskerville)", "serif"],
            // opensans: ["var(--font-opensans)", "system-ui", "sans-serif"],
            garamond: ["var(--font-garamond)", "serif"],
            nunitosans: ["var(--font-nunitosans)", "system-ui", "sans-serif"],
         },
         colors: {
            primary: {
               50: '#ecffff',
               100: '#ceffff',
               200: '#a3fbfe',
               300: '#64f6fc',
               400: '#1ee6f2',
               500: '#02cad8',
               600: '#04a1b6',
               700: '#0c899d',
               800: '#136777',
               900: '#145565',
               950: '#073945',
               // 50: "#f6f4fe",
               // 100: "#efecfb",
               // 200: "#dfdbf9",
               // 300: "#c7bef4",
               // 400: "#ab99ec",
               // 500: "#8e6fe3",
               // 600: "#8459d9",
               // 700: "#6e3ec3",
               // 800: "#5b33a4",
               // 900: "#4c2c86",
               // 950: "#2f1a5b",
            },
            secondary: {
               50: '#fff1fe',
               100: '#ffe1fe',
               200: '#ffc3fd',
               300: '#ff94f8',
               400: '#ff54f4',
               500: '#ff16f2',
               600: '#f700ff',
               700: '#d300d9',
               800: '#ae00b1',
               900: '#80007f',
               950: '#630063',
               // 50: "#fefde8",
               // 100: "#fefbc3",
               // 200: "#fef48a",
               // 300: "#fde647",
               // 400: "#fbd82d",
               // 500: "#ebba07",
               // 600: "#ca9004",
               // 700: "#a16707",
               // 800: "#85510e",
               // 900: "#714212",
               // 950: "#422206",
               // 50: '#eefbfc',
               // 100: '#d4f3f6',
               // 200: '#afe6ee',
               // 300: '#77d2e2',
               // 400: '#3ab6cf',
               // 500: '#1d99b8',
               // 600: '#187a9b',
               // 700: '#19627d',
               // 800: '#1c5268',
               // 900: '#1b4559',
               // 950: '#0c2c3d',
            },
            accent: {
               50: '#fff9ec',
               100: '#fff3d3',
               200: '#ffe2a5',
               300: '#ffcc6d',
               400: '#ffab32',
               500: '#ff900a',
               600: '#fa7500',
               700: '#cc5602',
               800: '#a1430b',
               900: '#82390c',
               950: '#461a04',
               // 50: "#fef2f2",
               // 100: "#fee2e2",
               // 200: "#fecaca",
               // 300: "#fca5a5",
               // 400: "#f87171",
               // 500: "#ef4444",
               // 600: "#dc2626",
               // 700: "#b91c1c",
               // 800: "#991b1b",
               // 900: "#7f1d1d",
               // 950: "#450a0a",
            },
            success: {
               50: "#f8ffe5",
               100: "#efffc7",
               200: "#deff95",
               300: "#bbff3d",
               400: "#aaf625",
               500: "#8add05",
               600: "#6ab100",
               700: "#508605",
               800: "#41690b",
               900: "#37590e",
               950: "#1b3201",
            },
         },
         typography: {
            DEFAULT: {
               css: {
                  fontSize: '1rem',
                  p: {
                     fontSize: '1rem',
                  }
               }
            }
         },
         keyframes: {
            rise: {
               '0%': {
                  transform: 'translateY(100%) scale(0)',
                  opacity: '0'
               },
               '20%': {
                  opacity: '0.5',
                  transform: 'translateY(80%) scale(0.8)'
               },
               '80%': {
                  opacity: '0.8',
                  transform: 'translateY(20%) scale(1)'
               },
               '100%': {
                  transform: 'translateY(-100%) scale(1)',
                  opacity: '0'
               }
            },
            loader: {
               '0%': { transform: 'scale(0)' },
               '100%': { transform: 'scale(1)' },
            }
         },
         animation: {
            'rise': 'rise 4s ease-out forwards',
            'spin-slow': 'spin 3s linear infinite',
            'spin-custom': 'spin 4s ease-in-out infinite',
            // 'spin-custom': 'spin 4s ease-in-out 7',
            'loader': 'loader 1s linear infinite',
         },
         boxShadow: {
            'custom': '0px 28px 98px 56px rgba(0, 0, 0, 0.5)',
          },
      },
   },
   plugins: [typography],
} satisfies Config;
