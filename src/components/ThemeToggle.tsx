// src/components/ThemeToggle.tsx
'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  )
}

// // src/components/ThemeToggle.tsx
// 'use client'
// import { Moon, Sun } from 'lucide-react'
// import { useTheme } from '@/hooks/useTheme'

// export function ThemeToggle() {
//   const { darkMode, toggleTheme, mounted } = useTheme()

//   if (!mounted) return null

//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
//       aria-label="Toggle theme"
//     >
//       {darkMode ? (
//         <Sun className="w-5 h-5 text-yellow-500" />
//       ) : (
//         <Moon className="w-5 h-5 text-gray-800" />
//       )}
//     </button>
//   )
// }
// // // src/components/ThemeToggle.tsx
// // 'use client'
// // import { Moon, Sun } from 'lucide-react'
// // import { useTheme } from '@/hooks/useTheme'

// // export function ThemeToggle() {
// //   const { theme, toggleTheme } = useTheme()

// //   return (
// //     <button
// //       onClick={toggleTheme}
// //       className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
// //       aria-label="Toggle theme"
// //     >
// //       {theme.isDarkTheme ? (
// //         <Sun className="w-5 h-5 text-yellow-400" />
// //       ) : (
// //         <Moon className="w-5 h-5 text-blue-400" />
// //       )}
// //     </button>
// //   )
// // }


