// src/data/navbarConfig.ts
import type { ReactNode } from 'react'

export interface NavLink {
  href: string
  label: string
  icon?: ReactNode
  isButton?: boolean
  authRequired?: boolean
}

export const navLinks = {
  brand: {
    href: '/',
    label: 'My Blog'
  },
  mainLinks: [
    {
      href: '/blog',
      label: 'Blog'
    },
    {
      href: '/blog/new',
      label: 'New Post',
      authRequired: true
    }
  ],
  authLinks: {
    signIn: {
      label: 'Sign In',
      isButton: true
    },
    signOut: {
      label: 'Sign Out',
      isButton: true
    }
  }
} as const;

export const navStyles = {
  base: "bg-white dark:bg-gray-900 shadow-sm transition-colors",
  container: "container mx-auto px-4",
  inner: "flex justify-between h-16",
  brand: "flex items-center font-bold text-xl text-gray-900 dark:text-white",
  link: "hover:text-gray-600 dark:hover:text-gray-300",
  button: "bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
} as const;