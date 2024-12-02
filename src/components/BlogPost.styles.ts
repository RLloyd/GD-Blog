// src/components/BlogPost.styles.ts
'use client'
import styled from 'styled-components'
import type { Theme } from '@/lib/types'

export const Article = styled.article`
  max-width: 65ch;
  margin: 0 auto;

  header {
    margin-bottom: ${({ theme }) => theme.typography.heading.sizes.h2};
  }
`

export const Title = styled.h1<{ theme: Theme }>`
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-size: ${({ theme }) => theme.typography.heading.sizes.h1};
  color: ${({ theme }) => theme.isDarkTheme ?
    theme.colors.text.dark.primary :
    theme.colors.text.light.primary};
  margin-bottom: ${({ theme }) => theme.typography.heading.sizes.h6};
`

export const Metadata = styled.div<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.typography.body.sizes.sm};
  color: ${({ theme }) => theme.isDarkTheme ?
    theme.colors.text.dark.secondary :
    theme.colors.text.light.secondary};
`

export const Content = styled.div<{ theme: Theme }>`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.sizes.lg};
  line-height: 1.75;

  h2 {
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    font-size: ${({ theme }) => theme.typography.heading.sizes.h2};
    margin-top: 2em;
    margin-bottom: 1em;
  }

  p {
    margin-bottom: 1.5em;
  }

  a {
    color: ${({ theme }) => theme.colors.primary[500]};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`
