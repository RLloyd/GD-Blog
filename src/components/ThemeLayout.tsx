// src/components/ThemeLayout.tsx
'use client'
import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from '@/lib/registry'
import { lightTheme } from '@/lib/theme-config'

export function ThemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={lightTheme}>
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}