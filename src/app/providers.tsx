// src/app/providers.tsx - Updated to prevent hydration mismatches
'use client'
import { useState, useEffect, useCallback } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '@/lib/theme-config'
import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyle } from '@/lib/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  // Use null initial state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null)

  // Move theme detection to a separate effect
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(darkModeQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    darkModeQuery.addEventListener('change', handleChange)
    return () => darkModeQuery.removeEventListener('change', handleChange)
  }, [])

  // Separate mount effect to ensure sequential execution
  useEffect(() => {
    setMounted(true)
  }, [])

  // Render nothing until mounted and theme is detected
  if (!mounted || isDarkMode === null) {
    return null
  }

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}
