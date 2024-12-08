// src/lib/theme.ts
"use client"
import { createGlobalStyle } from 'styled-components'
// import { lightTheme as portfolioLight, darkTheme as portfolioDark, Theme } from './portfolio-theme'
import { lightTheme as portfolioLight, darkTheme as portfolioDark } from './portfolio-theme'
import type { Theme } from './types'

export const theme = {
   light: {
      ...portfolioLight,
      // Blog-specific overrides
      prose: {
         headings: portfolioLight.colors.text.light.primary,
         body: portfolioLight.colors.text.light.secondary,
         links: portfolioLight.colors.primary[500],
         code: {
            background: portfolioLight.colors.gray[100],
            text: portfolioLight.colors.gray[900]
         }
      }
   },
   dark: {
      ...portfolioDark,
      // Blog-specific overrides
      prose: {
         headings: portfolioDark.colors.text.dark.primary,
         body: portfolioDark.colors.text.dark.secondary,
         links: portfolioDark.colors.primary[400],
         code: {
            background: portfolioDark.colors.gray[800],
            text: portfolioDark.colors.gray[100]
         }
      }
   }
}

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  :root {
   /* Only set CSS variables that won't conflict with Tailwind */
    --nav-height: ${({ theme }) => theme.sizes.navHeight};
 }

  body {
   min-height: 100vh;
   font-family: ${({ theme }) => theme.typography.body.fontFamily};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
   }

  // Prose styles for blog content
  .prose {
    h1 {
      font-size: ${({ theme }) => theme.typography.heading.sizes.h1};
      margin-bottom: 1.5rem;
    }
    h2 {
      font-size: ${({ theme }) => theme.typography.heading.sizes.h2};
      margin-bottom: 1.25rem;
    }
    h3 {
      font-size: ${({ theme }) => theme.typography.heading.sizes.h3};
      margin-bottom: 1rem;
    }

    p {
      font-size: ${({ theme }) => theme.typography.body.sizes.base};
      line-height: 1.75;
      margin-bottom: 1.5rem;
    }

    a {
      color: ${({ theme }) => theme.isDarkTheme ?
      theme.colors.primary[400] :
      theme.colors.primary[600]};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    code {
      background: ${({ theme }) => theme.isDarkTheme ?
      theme.colors.gray[800] :
      theme.colors.gray[100]};
      padding: 0.2em 0.4em;
      border-radius: 0.25rem;
      font-size: 0.875em;
    }

    pre {
      background: ${({ theme }) => theme.isDarkTheme ?
      theme.colors.gray[900] :
      theme.colors.gray[100]};
      padding: 1.5rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1.5rem 0;

      code {
        background: none;
        padding: 0;
      }
    }
  }
`

export type { Theme }