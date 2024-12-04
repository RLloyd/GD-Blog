// src/contexts/ThemeContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
	isDark: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
	isDark: false,
	toggleTheme: () => {},
});

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		const shouldBeDark = stored === "dark";

		setIsDark(shouldBeDark);
		if (shouldBeDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setIsDark((prev) => {
			const newIsDark = !prev;
			localStorage.setItem("theme", newIsDark ? "dark" : "light");

			if (newIsDark) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}

			return newIsDark;
		});
	};

	if (!mounted) return null;

	return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeContextProvider");
	}
	return context;
}
// // src/contexts/ThemeContext.tsx
// "use client";
// import { createContext, useContext, useEffect, useState } from "react";

// type ThemeContextType = {
// 	isDark: boolean;
// 	toggleTheme: () => void;
// };

// const ThemeContext = createContext<ThemeContextType>({
// 	isDark: false,
// 	toggleTheme: () => {},
// });

// export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
// 	const [mounted, setMounted] = useState(false);
// 	const [isDark, setIsDark] = useState(false);

// 	useEffect(() => {
// 		// Only run theme detection after mount to prevent hydration mismatch
// 		const stored = localStorage.getItem("theme");
// 		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// 		const shouldBeDark = stored ? stored === "dark" : prefersDark;

// 		setIsDark(shouldBeDark);
// 		if (shouldBeDark) {
// 			document.documentElement.classList.add("dark");
// 		}
// 		setMounted(true);
// 	}, []);

// 	const toggleTheme = () => {
// 		setIsDark((prev) => {
// 			const newIsDark = !prev;
// 			localStorage.setItem("theme", newIsDark ? "dark" : "light");

// 			if (newIsDark) {
// 				document.documentElement.classList.add("dark");
// 			} else {
// 				document.documentElement.classList.remove("dark");
// 			}

// 			return newIsDark;
// 		});
// 	};

// 	// Prevent flash during SSR by rendering children only after mount
// 	if (!mounted) {
// 		return null;
// 	}

// 	return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
// }

// export function useTheme() {
// 	const context = useContext(ThemeContext);
// 	if (!context) {
// 		throw new Error("useTheme must be used within ThemeContextProvider");
// 	}
// 	return context;
// }
// // // src/contexts/ThemeContext.tsx
// // "use client";
// // import { createContext, useContext, useEffect, useState } from "react";

// // type ThemeContextType = {
// // 	isDark: boolean;
// // 	toggleTheme: () => void;
// // };

// // const ThemeContext = createContext<ThemeContextType>({
// // 	isDark: false,
// // 	toggleTheme: () => {},
// // });

// // export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
// // 	const [isDark, setIsDark] = useState(false);

// // 	useEffect(() => {
// // 		// Check local storage first
// // 		const stored = localStorage.getItem("theme");
// // 		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// // 		const shouldBeDark = stored ? stored === "dark" : prefersDark;

// // 		setIsDark(shouldBeDark);
// // 		if (shouldBeDark) {
// // 			document.documentElement.classList.add("dark");
// // 		}
// // 	}, []);

// // 	const toggleTheme = () => {
// // 		setIsDark((prev) => {
// // 			const newIsDark = !prev;
// // 			localStorage.setItem("theme", newIsDark ? "dark" : "light");

// // 			if (newIsDark) {
// // 				document.documentElement.classList.add("dark");
// // 			} else {
// // 				document.documentElement.classList.remove("dark");
// // 			}

// // 			return newIsDark;
// // 		});
// // 	};

// // 	return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
// // }

// // export function useTheme() {
// // 	const context = useContext(ThemeContext);
// // 	if (!context) {
// // 		throw new Error("useTheme must be used within ThemeContextProvider");
// // 	}
// // 	return context;
// // }
// // // // src/contexts/ThemeContext.tsx
// // // 'use client'
// // // import { createContext, useContext, useEffect, useState } from 'react'
// // // import { lightTheme, darkTheme } from '@/lib/theme-config'
// // // import type { Theme } from '@/lib/types'

// // // type ThemeContextType = {
// // //   theme: Theme;
// // //   isDark: boolean;
// // //   toggleTheme: () => void;
// // // }

// // // const ThemeContext = createContext<ThemeContextType | null>(null)

// // // export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
// // //   const [isDark, setIsDark] = useState(false)
// // //   const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme)

// // //   useEffect(() => {
// // //     // Check local storage first
// // //     const stored = localStorage.getItem('theme')
// // //     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// // //     const shouldBeDark = stored ? stored === 'dark' : prefersDark

// // //     setIsDark(shouldBeDark)
// // //     setCurrentTheme(shouldBeDark ? darkTheme : lightTheme)

// // //     if (shouldBeDark) {
// // //       document.documentElement.classList.add('dark')
// // //     }
// // //   }, [])

// // //   const toggleTheme = () => {
// // //     setIsDark(prev => {
// // //       const newIsDark = !prev
// // //       const newTheme = newIsDark ? darkTheme : lightTheme

// // //       setCurrentTheme(newTheme)
// // //       localStorage.setItem('theme', newIsDark ? 'dark' : 'light')

// // //       if (newIsDark) {
// // //         document.documentElement.classList.add('dark')
// // //       } else {
// // //         document.documentElement.classList.remove('dark')
// // //       }

// // //       return newIsDark
// // //     })
// // //   }

// // //   return (
// // //     <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme }}>
// // //       {children}
// // //     </ThemeContext.Provider>
// // //   )
// // // }

// // // export function useTheme() {
// // //   const context = useContext(ThemeContext)
// // //   if (!context) {
// // //     throw new Error('useTheme must be used within ThemeContextProvider')
// // //   }
// // //   return context
// // // }
