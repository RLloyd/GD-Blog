// src/components/ThemeLayout.tsx
'use client'
import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from '@/lib/registry'
import { lightTheme } from '@/lib/theme-config'

/*---=====================================================
This is a React functional component named ThemeLayout.
It wraps its child components (children) with two providers:
StyledComponentsRegistry and ThemeProvider.
The ThemeProvider sets the theme to lightTheme,
which is imported from @/lib/theme-config.
This allows the child components to access the
light theme's styles and settings.
=====================================================---*/
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={lightTheme}>
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}