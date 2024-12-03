// src/contexts/ThemeContext.tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { lightTheme, darkTheme } from '@/lib/theme-config'
import type { Theme } from '@/lib/types'

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme)

  useEffect(() => {
    // Check local storage first
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const shouldBeDark = stored ? stored === 'dark' : prefersDark

    setIsDark(shouldBeDark)
    setCurrentTheme(shouldBeDark ? darkTheme : lightTheme)

    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const newIsDark = !prev
      const newTheme = newIsDark ? darkTheme : lightTheme

      setCurrentTheme(newTheme)
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light')

      if (newIsDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      return newIsDark
    })
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeContextProvider')
  }
  return context
}