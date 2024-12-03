// src/hooks/useTheme.ts
'use client'
import { useState, useEffect } from 'react'

export function useTheme() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return { darkMode, toggleTheme, mounted }
}


// // src/hooks/useTheme.ts
// 'use client'
// import { useState, useEffect } from 'react'
// import { Theme } from '@/lib/types'
// import { lightTheme, darkTheme } from '@/lib/theme-config'

// export function useTheme() {
//   const [theme, setTheme] = useState<Theme>(lightTheme)
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     const stored = localStorage.getItem('theme')
//     if (stored === 'dark') {
//       setTheme(darkTheme)
//     }
//     setMounted(true)
//   }, [])

//   const toggleTheme = () => {
//     const newTheme = theme.isDarkTheme ? lightTheme : darkTheme
//     setTheme(newTheme)
//     localStorage.setItem('theme', newTheme.isDarkTheme ? 'dark' : 'light')
//   }

//   return { theme, toggleTheme, mounted }
// }
