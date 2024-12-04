// src/app/providers.tsx
"use client";
import { ThemeContextProvider } from "@/contexts/ThemeContext";

// Comment out styled-components imports
// import { ThemeProvider } from 'styled-components'
// import StyledComponentsRegistry from '@/lib/registry'
// import { GlobalStyle } from '@/lib/theme'
// import { ThemeContextProvider, useTheme } from '@/contexts/ThemeContext'

export function Providers({ children }: { children: React.ReactNode }) {
	// Temporarily just return children
	return <ThemeContextProvider>{children}</ThemeContextProvider>;

	// Comment out the previous providers
	// return (
	//   <StyledComponentsRegistry>
	//     <ThemeContextProvider>
	//       <ThemedContent>{children}</ThemedContent>
	//     </ThemeContextProvider>
	//   </StyledComponentsRegistry>
	// )
}
// // src/app/providers.tsx
// 'use client'
// import { ThemeProvider } from 'styled-components'
// import StyledComponentsRegistry from '@/lib/registry'
// import { ThemeContextProvider, useTheme } from '@/contexts/ThemeContext'
// import { GlobalStyle } from '@/lib/theme'

// function ThemedContent({ children }: { children: React.ReactNode }) {
//   const { theme } = useTheme()

//   return (
//     <ThemeProvider theme={theme}>
//       <GlobalStyle />
//       {children}
//     </ThemeProvider>
//   )
// }

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <StyledComponentsRegistry>
//       <ThemeContextProvider>
//         <ThemedContent>{children}</ThemedContent>
//       </ThemeContextProvider>
//     </StyledComponentsRegistry>
//   )
// }

// // // src/app/providers.tsx
// // 'use client'
// // import { useEffect } from 'react'
// // import StyledComponentsRegistry from '@/lib/registry'

// // export function Providers({ children }: { children: React.ReactNode }) {
// //   useEffect(() => {
// //     const theme = localStorage.getItem('theme')
// //     if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
// //       document.documentElement.classList.add('dark')
// //     }
// //   }, [])

// //   return (
// //     <StyledComponentsRegistry>
// //       {children}
// //     </StyledComponentsRegistry>
// //   )
// // }

// // // // src/app/providers.tsx
// // // 'use client'
// // // import { ThemeProvider as StyledThemeProvider } from 'styled-components'
// // // import { ThemeProvider } from '@/lib/ThemeContext'
// // // import StyledComponentsRegistry from '@/lib/registry'
// // // import { GlobalStyle } from '@/lib/theme'
// // // import { useTheme } from '@/lib/ThemeContext'

// // // function StyledProviders({ children }: { children: React.ReactNode }) {
// // //   const { theme } = useTheme()

// // //   return (
// // //     <StyledThemeProvider theme={theme}>
// // //       <GlobalStyle />
// // //       {children}
// // //     </StyledThemeProvider>
// // //   )
// // // }

// // // export function Providers({ children }: { children: React.ReactNode }) {
// // //   return (
// // //     <StyledComponentsRegistry>
// // //       <ThemeProvider>
// // //         <StyledProviders>
// // //           {children}
// // //         </StyledProviders>
// // //       </ThemeProvider>
// // //     </StyledComponentsRegistry>
// // //   )
// // // }
// // // // // src/app/providers.tsx - Updated to prevent hydration mismatches
// // // // 'use client'
// // // // import { useState, useEffect, useCallback } from 'react'
// // // // import { useTheme } from '@/hooks/useTheme'
// // // // import { ThemeProvider } from 'styled-components'
// // // // import { lightTheme, darkTheme } from '@/lib/theme-config'
// // // // import StyledComponentsRegistry from '@/lib/registry'
// // // // import { GlobalStyle } from '@/lib/theme'

// // // // export function Providers({ children }: { children: React.ReactNode }) {
// // // //    const { theme, mounted } = useTheme()

// // // //   if (!mounted) {
// // // //     return null
// // // //   }

// // // //   return (
// // // //     <StyledComponentsRegistry>
// // // //       <ThemeProvider theme={theme}>
// // // //         <GlobalStyle />
// // // //         {children}
// // // //       </ThemeProvider>
// // // //     </StyledComponentsRegistry>
// // // //   )
// // // // }

// // // // //   // Use null initial state to prevent hydration mismatch
// // // // //   const [mounted, setMounted] = useState(false)
// // // // //   const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null)

// // // // //   // Move theme detection to a separate effect
// // // // //   useEffect(() => {
// // // // //     const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
// // // // //     setIsDarkMode(darkModeQuery.matches)

// // // // //     const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
// // // // //     darkModeQuery.addEventListener('change', handleChange)
// // // // //     return () => darkModeQuery.removeEventListener('change', handleChange)
// // // // //   }, [])

// // // // //   // Separate mount effect to ensure sequential execution
// // // // //   useEffect(() => {
// // // // //     setMounted(true)
// // // // //   }, [])

// // // // //   // Render nothing until mounted and theme is detected
// // // // //   if (!mounted || isDarkMode === null) {
// // // // //     return null
// // // // //   }

// // // // //   return (
// // // // //     <StyledComponentsRegistry>
// // // // //       <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
// // // // //         <GlobalStyle />
// // // // //         {children}
// // // // //       </ThemeProvider>
// // // // //     </StyledComponentsRegistry>
// // // // //   )
// // // // // }
