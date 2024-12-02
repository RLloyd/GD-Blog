# .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}

```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

public/notes/*
```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

# next.config.ts

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'localhost',
      process.env.NEXT_PUBLIC_SUPABASE_URL!.replace('https://', ''),
    ],
  },
};

export default nextConfig;

// // next.config.ts
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['https://cwqfksyohgvbvojewrzr.supabase.co'], // Replace with your actual Supabase domain
//   },
// };

// export default nextConfig;
```

# package.json

```json
{
  "name": "gd-blog",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "@supabase/supabase-js": "^2.46.2",
    "@types/styled-components": "^5.1.34",
    "encoding": "^0.1.13",
    "lucide-react": "^0.462.0",
    "next": "15.0.3",
    "prismjs": "^1.29.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-markdown": "^9.0.1",
    "rehype-prism-plus": "^2.0.0",
    "remark-gfm": "^4.0.0",
    "styled-components": "^6.1.13"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.15",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "15.0.3",
    "postcss": "^8",
    "prisma": "^5.22.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# prisma/schema.prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

```

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/notes/misc.tsx

```tsx
// src/lib/portfolio-theme.ts
import 'styled-components'

// First, import your existing types
export type {
  ThemeMode,
  ColorWithShades,
  ColorShades,
  BorderColors,
  ColorPalette,
  Typography,
  Theme
} from './types'  // Move types to separate file

// Add Styled Components declaration
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// Export everything from your existing theme
export {
  colors,
  baseTheme,
  lightTheme,
  darkTheme,
  theme,
  getColor,
  getBackgroundColor,
  getTextColor,
  getBorderColor,
  getFontFamily,
  getFontWeight,
  getFontSize,
  applyFontStyle
} from './theme-config'  // Move theme configuration to separate file
```

# public/notes/misc2.tsx

```tsx
I need to open another chat. What do I need to bring?EditFor the next chat, bring:

theme.ts file from your portfolio
Updated files we created:

src/lib/registry.tsx
src/lib/portfolio-theme.ts
src/lib/types.ts
src/lib/theme-config.ts



This will help continue resolving the hydration and styling issues.
```

# public/notes/project-structure.md

```md
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* Base styles */
body {
  font-family: 'Open Sans', serif;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}

/* Typography scale */
h1 {
  font-family: 'Libre Baskerville', serif;
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1A202C;
  letter-spacing: -0.02em;
  border-bottom: 2px solid #E2E8F0;
  padding-bottom: 0.5rem;
}

h2 {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.875rem;
  line-height: 1.3;
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: #2D3748;
  letter-spacing: -0.01em;
}

h3 {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.5rem;
  line-height: 1.4;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #4A5568;
}

/* Paragraphs and lists */
p {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
}

ul, ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

/* Code blocks */
code {
  font-family: 'JetBrains Mono', Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 0.9em;
  background-color: #F7FAFC;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  border: 1px solid #E2E8F0;
}

pre {
  background-color: #F7FAFC;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  border: 1px solid #E2E8F0;
  margin: 1.5rem 0;
}

pre code {
  border: none;
  padding: 0;
}

/* Links */
a {
  color: #4A90E2;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

a:hover {
  border-bottom-color: currentColor;
}

/* Blockquotes */
blockquote {
  font-style: italic;
  margin: 1.5rem 0;
  padding-left: 1.5rem;
  border-left: 3px solid #CBD5E0;
  color: #4A5568;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #E2E8F0;
  text-align: left;
}

th {
  background-color: #F7FAFC;
  font-weight: 700;
}

/* Emphasis and strong */
em {
  font-style: italic;
}

strong {
  font-weight: 700;
  color: #1A202C;
}

/* Meta information */
.meta {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 2rem;
}

/* Feature list checkmarks */
.features li::before {
  content: "✓";
  color: #48BB78;
  font-weight: bold;
  display: inline-block;
  width: 1.5em;
  margin-left: -1.5em;
}

/* Command line prompts */
.command {
  display: block;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #2D3748;
  color: #FFFFFF;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
}

.command::before {
  content: "$ ";
  color: #A0AEC0;
}
</style>

# Project Structure

gd-blog/
  ├── src/              <- Source code directory
  │   ├── app/          <- This is where your pages live
  │   │   ├── page.tsx  <- This is your homepage (/)
  │   │   └── layout.tsx <- Main layout template
  │   └── lib/          <- For utility functions and shared code
  ├── public/           <- For static files (images, etc.)
  └── .env.local        <- For private environment variables

  - src
    - app
      - page.tsx
      - layout.tsx
   - lib
     - supabase.ts

## Basic Concepts:
app/page.tsx becomes your homepage (URL: /)
app/about/page.tsx becomes your about page (URL: /about)
app/layout.tsx wraps around all pages
Files in src/lib are for shared code (like our Supabase setup)
```

# public/notes/SioaPao.md

```md
# Ingredients
### For the Asado Filling

- 1 tablespoon canola oil
- 1 small onion, peeled and chopped
- 2 cloves garlic, peeled and minced
- 1 pound pork butt or shoulder, cut into large chunks
- 2 cups water
- ⅓ cup soy sauce
- 2 tablespoons oyster sauce
- 3 tablespoons sugar
- 2 star anise
- 1 tablespoon cornstarch

### For the Siopao Dough
- 260 ml warm milk (105 to 115 F)
- 2 teaspoons dry instant yeast
- 2 tablespoons sugar
- ½ teaspoon salt
- 500 grams all-purpose flour
- 2 teaspoons baking powder
- 100 grams sugar
- 2 tablespoons vegetable oil
- lime

## Instructions
### For the Siopao Filling
1. In a pot over medium heat, heat oil. Add onions and garlic and cook until softened.
2. Add pork and cook, turning as needed, until lightly browned.
3. Add 2 cups of the water, soy sauce, oyster sauce, sugar, and star anise. Stir until well-dispersed. Bring to a boil, skimming scum that may float on top.
4. Lower heat, cover, and continue to cook for about 1 hour or until meat is fork-tender. Add more water in half cup increments as needed to maintain 1 1 /2 cups liquid.
5. With a slotted spoon, remove pork from the pot and let cool to touch. Using two forks, shred meat.
Remove about 1 cup of the braising liquid and set aside. Return shredded meat to pot and bring to a boil.
In a bowl, combine cornstarch and bout ¼ cup water. Stir until smooth and cornstarch is dissolved. Add half of the cornstarch slurry to the pot of meat and stir to distribute. Continue to cook for about 1 to 2 minutes or until thickened. Remove from pan and allow to cool.
In a saucepan over medium heat, combine the reserved 1 cup braising liquid and the remaining half of the cornstarch slurry. Bring to a boil, stirring regularly, for about 2 to 3 minutes or until thickened. This well be the siopao sauce.
### For the Siopao Dough
In a bowl, combine milk, yeast, the 2 tablespoons sugar, and salt. Stir well until dissolved. Let stand for about 5 to 10 minutes or until the mixture is foamy.
In a large bowl, combine flour, the 100 grams sugar, baking powder, and vegetable oil. Mix well. Add a few drops of lime juice into the flour mixture.
Add yeast mixture to the flour mixture. Mix together until it forms a dough. Continue to mix and knead until the dough is smooth and no longer sticky.

Cover with a clean kitchen towel and allow to rise in a warm place for about 2 hours or until double in size.
Remove the dough from the bowl, place on a clean work surface, and form into a long log.
With a knife, cut the dough into 10 equal size pieces and then form each piece into smaller balls. Cover the dough with a clean kitchen towel and allow to rise for about 30 minutes.
To assemble Siopao Buns
On a clean working surface, place one piece of dough, and with a rolling pin, roll out into about 4 to 5-inch diameter, making sure to get edges thinner than the center.
Place about a tablespoon of the meat filling in the center.
Gather the edges of the dough, pleat around the filling, and twist to fully secure. Place bun on a piece of parchment or wax paper. Repeat with remaining dough and filling.
Arrange prepared buns in a single layer on a flat baking sheet, cover with a kitchen towel, and allow to rise again for another 10 minutes.
In a steamer, place buns in a single layer, an inch-apart. Add about 2 tablespoons of vinegar to the steaming water (for whiter buns).

Steam buns on low heat for about 15 to 20 minutes. Keep the lid on for about 3 to 5 minutes to prevent the buns from deflating.
Remove from steamer and serve with the asado sauce.

<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* Base styles */
body {
  font-family: 'Libre Baskerville', serif;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}

/* Typography scale */
h1 {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1A202C;
  letter-spacing: -0.02em;
  border-bottom: 2px solid #E2E8F0;
  padding-bottom: 0.5rem;
}

h2 {
  font-size: 1.875rem;
  line-height: 1.3;
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: #2D3748;
  letter-spacing: -0.01em;
}

h3 {
  font-size: 1.5rem;
  line-height: 1.4;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #4A5568;
}

/* Paragraphs and lists */
p {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

ul, ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

/* Code blocks */
code {
  font-family: 'JetBrains Mono', Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 0.9em;
  background-color: #F7FAFC;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  border: 1px solid #E2E8F0;
}

pre {
  background-color: #F7FAFC;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  border: 1px solid #E2E8F0;
  margin: 1.5rem 0;
}

pre code {
  border: none;
  padding: 0;
}

/* Links */
a {
  color: #4A90E2;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

a:hover {
  border-bottom-color: currentColor;
}

/* Blockquotes */
blockquote {
  font-style: italic;
  margin: 1.5rem 0;
  padding-left: 1.5rem;
  border-left: 3px solid #CBD5E0;
  color: #4A5568;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #E2E8F0;
  text-align: left;
}

th {
  background-color: #F7FAFC;
  font-weight: 700;
}

/* Emphasis and strong */
em {
  font-style: italic;
}

strong {
  font-weight: 700;
  color: #1A202C;
}

/* Meta information */
.meta {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 2rem;
}

/* Feature list checkmarks */
.features li::before {
  content: "✓";
  color: #48BB78;
  font-weight: bold;
  display: inline-block;
  width: 1.5em;
  margin-left: -1.5em;
}

/* Command line prompts */
.command {
  display: block;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #2D3748;
  color: #FFFFFF;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
}

.command::before {
  content: "$ ";
  color: #A0AEC0;
}
</style>


```

# public/notes/To-Do.md

```md
# To Do


## Lists
### Date: 12.01.2024
- Claude timed me out: 5:45am - 8:am
- Use the same theme as portfolio-2025
   - Fonts: family, colors, sizes
   - Color Palette
   -
- Light & Dark theme
- Integrate Styled-Components with TailwindCSS
- Able to show code in content
- Can we show who liked and commented on a post
- Blog Posts Dashboard:
   - Create a different category of posts
      - Tech Articles
      - Other Medias
      - Fusion Food
      - Personal
   - Show two large cards of favorite category and show all the posts underneath in cards format as well
   - Similar to this design: https://www.loopple.com/preview-sample/dashboard-blogs-asteria?hide-banner=true&buttons=true

- Does readers have to be logged in to read, comment, like
- Fix <img to <Image in src/components/BlogDashboard.tsx line: 71, 97

- Changed: BlogDashboard.tsx : All posts container +to display 4 columns instead of 3
   - <div className="allPostsContainer grid gap-6 md:grid-cols-2 lg:grid-cols-4">

### Codeblock:
\`\`\`javascript
/* Code blocks */
code {
  font-family: 'JetBrains Mono', Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 0.9em;
  background-color: #F7FAFC;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  border: 1px solid #E2E8F0;
}
\`\`\`
\`\`\`javascript
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};
greet("World");
\`\`\`
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* Base styles */
body {
  font-family: 'Libre Baskerville', serif;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}

/* Typography scale */
h1 {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1A202C;
  letter-spacing: -0.02em;
  border-bottom: 2px solid #E2E8F0;
  padding-bottom: 0.5rem;
}

h2 {
  font-size: 1.875rem;
  line-height: 1.3;
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: #2D3748;
  letter-spacing: -0.01em;
}

h3 {
  font-size: 1.5rem;
  line-height: 1.4;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #4A5568;
}

/* Paragraphs and lists */
p {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

ul, ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

/* Code blocks */
code {
  font-family: 'JetBrains Mono', Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 0.9em;
  background-color: #F7FAFC;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  border: 1px solid #E2E8F0;
}

pre {
  background-color: #F7FAFC;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  border: 1px solid #E2E8F0;
  margin: 1.5rem 0;
}

pre code {
  border: none;
  padding: 0;
}

/* Links */
a {
  color: #4A90E2;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

a:hover {
  border-bottom-color: currentColor;
}

/* Blockquotes */
blockquote {
  font-style: italic;
  margin: 1.5rem 0;
  padding-left: 1.5rem;
  border-left: 3px solid #CBD5E0;
  color: #4A5568;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #E2E8F0;
  text-align: left;
}

th {
  background-color: #F7FAFC;
  font-weight: 700;
}

/* Emphasis and strong */
em {
  font-style: italic;
}

strong {
  font-weight: 700;
  color: #1A202C;
}

/* Meta information */
.meta {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 2rem;
}

/* Feature list checkmarks */
.features li::before {
  content: "✓";
  color: #48BB78;
  font-weight: bold;
  display: inline-block;
  width: 1.5em;
  margin-left: -1.5em;
}

/* Command line prompts */
.command {
  display: block;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #2D3748;
  color: #FFFFFF;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
}

.command::before {
  content: "$ ";
  color: #A0AEC0;
}
</style>


```

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# GD-Blog

```

# src/app/auth-test/page.tsx

```tsx
// src/app/auth-test/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { supabaseClient } from '@/lib/auth'
import type { User } from '@supabase/supabase-js'

export default function AuthTest() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signIn = () => {
    supabaseClient.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  const signOut = () => supabaseClient.auth.signOut()

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Auth Test</h1>

      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={signIn}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Sign in with GitHub
        </button>
      )}
    </div>
  )
}
```

# src/app/auth/callback/route.ts

```ts
// src/app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestUrl.origin)
}
```

# src/app/blog/[slug]/page.tsx

```tsx
// src/app/blog/[slug]/page.tsx
import { Article, Title, Metadata, Content } from '@/components/BlogPost.styles'
import { MarkdownContent } from '@/components/MarkdownContent'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { Reactions } from '@/components/Reactions'
import { Comments } from '@/components/Comments'
import Link from 'next/link'
import { DeletePost } from '@/components/DeletePost'
import { supabaseClient } from '@/lib/auth'
import { notFound } from 'next/navigation'

export default async function BlogPost({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const { data: post } = await supabaseClient
    .from('posts')
    .select('*, profiles(username)')
    .eq('slug', slug)
    .single()

  if (!post) notFound()

  return (
    <Article>
      <div className="flex justify-between items-center mb-8">
        <Link href="/blog" className="text-blue-400 hover:text-blue-300">
          ← Back to posts
        </Link>
        <div className="space-x-4">
          <Link href={`/blog/edit/${slug}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit Post
          </Link>
          <DeletePost postId={post.id} />
        </div>
      </div>

      {post.cover_image && (
        <div className="relative rounded-lg overflow-hidden mb-8 aspect-video">
          <ImageWithFallback
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full"
            priority
          />
        </div>
      )}

      <header>
        <Title>{post.title}</Title>
        <Metadata>
          {new Date(post.created_at).toLocaleDateString()} •
          {post.profiles?.username || 'Anonymous'}
        </Metadata>
      </header>

      {post.excerpt && (
        <p className="text-xl text-gray-300 mb-8 font-serif italic">{post.excerpt}</p>
      )}

      <Content>
        <MarkdownContent content={post.content} />
        <div className="mt-8 border-t border-gray-700 pt-8">
          <Reactions postId={post.id} />
        </div>
      </Content>

      <Comments postId={post.id} />
    </Article>
  )
}
// // src/app/blog/[slug]/page.tsx
// import { supabaseClient } from "@/lib/auth";
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { MarkdownContent } from "@/components/MarkdownContent";
// import { DeletePost } from "@/components/DeletePost";
// import { Comments } from "@/components/Comments";
// import { Reactions } from "@/components/Reactions";
// import { ImageWithFallback } from "@/components/ImageWithFallback";

// export default async function BlogPost({ params: { slug } }: { params: { slug: string } }) {
// 	const { data: post } = await supabaseClient.from("posts").select("*, profiles(username)").eq("slug", slug).single();

// 	if (!post) notFound();

// 	return (
// 		<article className="max-w-3xl mx-auto">
// 			<div className="flex justify-between items-center mb-8">
// 				<Link href="/blog" className="text-blue-400 hover:text-blue-300">
// 					← Back to posts
// 				</Link>
// 				<div className="space-x-4">
// 					<Link href={`/blog/edit/${slug}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// 						Edit Post
// 					</Link>
// 					<DeletePost postId={post.id} />
// 				</div>
// 			</div>

// 			{post.cover_image && (
// 				<div className="relative rounded-lg overflow-hidden mb-8 aspect-video">
// 					<ImageWithFallback
// 						src={post.cover_image}
// 						alt={post.title}
// 						className="w-full h-full"
// 						// Use priority since this is the main post image
// 						priority
// 					/>
// 				</div>
// 			)}

// 			<header className="mb-8">
// 				<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// 				<div className="text-gray-400">
// 					{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
// 				</div>
// 			</header>

// 			{post.excerpt && <p className="text-xl text-gray-300 mb-8 font-serif italic">{post.excerpt}</p>}

// 			<div className="prose prose-lg max-w-none">
// 				<MarkdownContent content={post.content} />
// 			</div>

// 			<div className="mt-8 border-t border-gray-700 pt-8">
// 				<Reactions postId={post.id} />
// 			</div>

// 			<Comments postId={post.id} />
// 		</article>
// 	);
// }
// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
// // // src/app/blog/[slug]/page.tsx
// // import { supabaseClient } from '@/lib/auth'
// // import { notFound } from 'next/navigation'
// // import Link from 'next/link'
// // import { MarkdownContent } from '@/components/MarkdownContent'
// // import { DeletePost } from '@/components/DeletePost'
// // import { Comments } from '@/components/Comments'
// // import { Reactions } from '@/components/Reactions'

// // export default async function BlogPost({
// //   params: { slug }
// // }: {
// //   params: { slug: string }
// // }) {
// //   const { data: post } = await supabaseClient
// //     .from('posts')
// //     .select('*, profiles(username)')
// //     .eq('slug', slug)
// //     .single()

// //   if (!post) notFound()

// //   return (
// //     <article className="max-w-3xl mx-auto">
// //       <div className="flex justify-between items-center mb-8">
// //         <Link href="/blog" className="text-blue-500 hover:text-blue-600">
// //           ← Back to posts
// //         </Link>
// //         <div className="space-x-4">
// //           <Link
// //             href={`/blog/edit/${slug}`}
// //             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //           >
// //             Edit Post
// //           </Link>
// //           <DeletePost postId={post.id} />
// //         </div>
// //       </div>

// //       <header className="mb-8">
// //         <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// //         <div className="text-gray-600">
// //           {new Date(post.created_at).toLocaleDateString()}
// //         </div>
// //       </header>

// //       {post.excerpt && (
// //         <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
// //       )}

// //       <div className="prose prose-lg max-w-none">
// //         <MarkdownContent content={post.content} />

// //         {/*---= Reactions =---*/}
// //         <div className="mt-8">
// //             <Reactions postId={post.id} />
// //          </div>
// //       </div>
// //       <Comments postId={post.id} />
// //     </article>
// //   )
// // }

// // // // src/app/blog/[slug]/page.tsx
// // // import { supabaseClient } from '@/lib/auth'
// // // import { notFound } from 'next/navigation'
// // // import Link from 'next/link'
// // // import { MarkdownContent } from '@/components/MarkdownContent'

// // // export default async function BlogPost({
// // //   params: { slug }
// // // }: {
// // //   params: { slug: string }
// // // }) {
// // //   const { data: post } = await supabaseClient
// // //     .from('posts')
// // //     .select('*, profiles(username)')
// // //     .eq('slug', slug)
// // //     .single()

// // //   if (!post) notFound()

// // //   return (
// // //     <article className="max-w-3xl mx-auto">
// // //       <div className="flex justify-between items-center mb-8">
// // //         <Link href="/blog" className="text-blue-500 hover:text-blue-600">
// // //           ← Back to posts
// // //         </Link>
// // //         <Link
// // //           href={`/blog/edit/${slug}`}
// // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //         >
// // //           Edit Post
// // //         </Link>
// // //       </div>

// // //       <header className="mb-8">
// // //         <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// // //         <div className="text-gray-600">
// // //           {new Date(post.created_at).toLocaleDateString()}
// // //         </div>
// // //       </header>

// // //       {post.excerpt && (
// // //         <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
// // //       )}

// // //       <div className="prose prose-lg max-w-none">
// // //         <MarkdownContent content={post.content} />
// // //       </div>
// // //     </article>
// // //   )
// // // }
// // // // // src/app/blog/[slug]/page.tsx
// // // // import { supabaseClient } from '@/lib/auth'
// // // // import { notFound } from 'next/navigation'
// // // // import Link from 'next/link'
// // // // import { MarkdownContent } from '@/components/MarkdownContent'

// // // // export default async function BlogPost({
// // // //   params
// // // // }: {
// // // //   params: { slug: string }
// // // // }) {
// // // //   const slug = await Promise.resolve(params.slug)

// // // //   const { data: post } = await supabaseClient
// // // //     .from('posts')
// // // //     .select('*, profiles(username)')
// // // //     .eq('slug', slug)
// // // //     .single()

// // // //   if (!post) {
// // // //     notFound()
// // // //   }

// // // //   console.log('Post data:', post)

// // // //   return (
// // // //     <article className="max-w-3xl mx-auto">
// // // //       <Link href="/blog" className="text-blue-500 hover:text-blue-600 mb-8 inline-block">
// // // //         ← Back to posts
// // // //       </Link>

// // // //       <header className="mb-8">
// // // //         <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// // // //         <div className="text-gray-600">
// // // //           {new Date(post.created_at).toLocaleDateString()}
// // // //         </div>
// // // //       </header>

// // // //       {post.excerpt && (
// // // //         <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
// // // //       )}

// // // //       <div className="prose prose-lg max-w-none">
// // // //         <MarkdownContent content={post.content} />
// // // //       </div>
// // // //     </article>
// // // //   )
// // // // }

// // // // // // src/app/blog/[slug]/page.tsx
// // // // // import { supabaseClient } from '@/lib/auth'
// // // // // import { notFound } from 'next/navigation'
// // // // // import Link from 'next/link'
// // // // // import { MarkdownContent } from '@/components/MarkdownContent'

// // // // // export default async function BlogPost({
// // // // //   params: { slug }
// // // // // }: {
// // // // //   params: { slug: string }
// // // // // }) {
// // // // //   const { data: post } = await supabaseClient
// // // // //     .from('posts')
// // // // //     .select('*, profiles(username)')
// // // // //     .eq('slug', slug)
// // // // //     .single()

// // // // //   if (!post) {
// // // // //     notFound()
// // // // //   }

// // // // //   return (
// // // // //     <article className="max-w-3xl mx-auto">
// // // // //       <Link
// // // // //         href="/blog"
// // // // //         className="text-blue-500 hover:text-blue-600 mb-8 inline-block"
// // // // //       >
// // // // //         ← Back to posts
// // // // //       </Link>

// // // // //       <header className="mb-8">
// // // // //         <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// // // // //         <div className="text-gray-600">
// // // // //           {new Date(post.created_at).toLocaleDateString()} ·
// // // // //           {post.profiles?.username || 'Anonymous'}
// // // // //         </div>
// // // // //       </header>

// // // // //       {post.excerpt && (
// // // // //         <p className="text-xl text-gray-600 mb-8">
// // // // //           {post.excerpt}
// // // // //         </p>
// // // // //       )}

// // // // //       <div className="prose max-w-none">
// // // // //          <MarkdownContent content={post.content} />
// // // // //       </div>
// // // // //     </article>
// // // // //   )
// // // // // }

// // // // // // // src/app/blog/[slug]/page.tsx
// // // // // // import { blogApi } from '@/lib/supabase'
// // // // // // import { notFound } from 'next/navigation'

// // // // // // export default async function BlogPost({
// // // // // //   params: { slug }
// // // // // // }: {
// // // // // //   params: { slug: string }
// // // // // // }) {
// // // // // //   try {
// // // // // //     const post = await blogApi.getPostBySlug(slug)

// // // // // //     if (!post) {
// // // // // //       notFound()
// // // // // //     }

// // // // // //     return (
// // // // // //       <article className="max-w-3xl mx-auto">
// // // // // //         <header className="mb-8">
// // // // // //           <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// // // // // //           <div className="text-gray-600">
// // // // // //             {new Date(post.created_at).toLocaleDateString()}
// // // // // //           </div>
// // // // // //         </header>

// // // // // //         <div className="prose max-w-none">
// // // // // //           {post.content}
// // // // // //         </div>
// // // // // //       </article>
// // // // // //     )
// // // // // //   } catch (error) {
// // // // // //     notFound()
// // // // // //   }
// // // // // // }

```

# src/app/blog/edit/[slug]/page.tsx

```tsx
// src/app/blog/edit/[slug]/page.tsx
import { supabaseClient } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { EditForm } from '@/components/EditForm'

export default async function EditPost({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const { data: post } = await supabaseClient
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) notFound()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <EditForm post={post} />
    </div>
  )
}


```

# src/app/blog/new/page.tsx

```tsx
// src/app/blog/new/page.tsx
import { PostForm } from '@/components/PostForm'

export default function NewPost() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <PostForm />
    </div>
  )
}


```

# src/app/blog/page.tsx

```tsx
// src/app/blog/page.tsx

import Link from 'next/link';
import { supabaseClient } from '@/lib/auth';
import BlogDashboard from '@/components/BlogDashboard';

export default async function BlogList() {
  const { data: posts, error } = await supabaseClient
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    return <div>Error loading posts</div>
  }

  // Transform the posts data
  const formattedPosts = posts?.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    category: post.category || 'tech',
    date: new Date(post.created_at).toLocaleDateString(),
    slug: post.slug,
    cover_image: post.cover_image
  })) || []

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 px-4">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link
          href="/blog/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Write Post
        </Link>
      </div>

      <BlogDashboard posts={formattedPosts} />
    </div>
  )
}
// // src/app/blog/page.tsx
// import Link from 'next/link'
// import { supabaseClient } from '@/lib/auth'
// import { ImageWithFallback } from '@/components/ImageWithFallback'

// export default async function BlogList() {
//   const { data: posts, error } = await supabaseClient
//     .from('posts')
//     .select('*')
//     .eq('published', true)
//     .order('created_at', { ascending: false })

//   if (error) {
//     console.error('Supabase error:', error)
//     return <div>Error loading posts</div>
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Blog Posts</h1>
//         <Link
//           href="/blog/new"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Write PostXXX
//         </Link>
//       </div>

//       <div className="grid gap-8 md:grid-cols-2">
//         {posts?.map((post, index) => (
//           <article
//             key={post.id}
//             className="cardContainer
//                border
//                border-gray-700
//                rounded-3xl
//                overflow-hidden
//                hover:shadow-lg
//                transition-shadow
//                bg-gray-700
//                p-4
//                ">
//             {/* border: 1rem solid #4f4f4f;
//     border-radius: 1rem;
//     background: #4f4f4f; */}
//             {post.cover_image && (
//               <div className="aspect-video w-full relative rounded-2xl overflow-hidden">
//                 <ImageWithFallback
//                   src={post.cover_image}
//                   alt={post.title}
//                   className="object-cover w-full h-full"
//                   priority={index < 2} // Prioritize loading first two images
//                 />
//               </div>
//             )}
//             <div className="p-6">
//               <h2 className="text-xl font-semibold mb-2">
//                 <Link
//                   href={`/blog/${post.slug}`}
//                   className="hover:text-blue-400 transition-colors"
//                 >
//                   {post.title}
//                 </Link>
//               </h2>
//               {post.excerpt && (
//                 <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
//               )}
//               <div className="text-sm text-gray-400">
//                 {new Date(post.created_at).toLocaleDateString()}
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>

//       {!posts?.length && (
//         <p className="text-center text-gray-400">No posts yet. Be the first to write one!</p>
//       )}
//     </div>
//   )
// }
// // // src/app/blog/page.tsx
// // import Link from "next/link";
// // import { supabaseClient } from "@/lib/auth";
// // import { ImageWithFallback } from "@/components/ImageWithFallback";

// // export default async function BlogList() {
// // 	const { data: posts, error } = await supabaseClient.from("posts").select("*").eq("published", true).order("created_at", { ascending: false });

// // 	if (error) {
// // 		console.error("Supabase error:", error);
// // 		return <div>Error loading posts</div>;
// // 	}

// // 	return (
// // 		<div className="max-w-4xl mx-auto">
// // 			<div className="flex justify-between items-center mb-8">
// // 				<h1 className="text-3xl font-bold">Blog Posts</h1>
// // 				<Link href="/blog/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// // 					Write Post
// // 				</Link>
// // 			</div>

// // 			<div className="grid gap-8 md:grid-cols-2">
// // 				{posts?.map((post) => (
// // 					<article key={post.id} className="border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-gray-800">
// // 						{post.cover_image && (
// // 							<div className="relative aspect-video w-full">
// // 								<ImageWithFallback
// // 									src={post.cover_image}
// // 									alt={post.title}
// // 									className="w-full h-full"
// // 									// Use priority for images above the fold
// // 									priority={index === 0}
// // 								/>
// // 							</div>
// // 						)}

// // 						<div className="p-6">
// // 							<h2 className="text-xl font-semibold mb-2">
// // 								<Link href={`/blog/${post.slug}`} className="hover:text-blue-400 transition-colors">
// // 									{post.title}
// // 								</Link>
// // 							</h2>
// // 							{post.excerpt && <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>}
// // 							<div className="text-sm text-gray-400">{new Date(post.created_at).toLocaleDateString()}</div>
// // 						</div>
// // 					</article>
// // 				))}
// // 			</div>

// // 			{!posts?.length && <p className="text-center text-gray-400">No posts yet. Be the first to write one!</p>}
// // 		</div>
// // 	);
// // }
// // // // src/app/blog/page.tsx

// // // import Link from 'next/link'
// // // import { supabaseClient } from '@/lib/auth'
// // // import BlogDashboard from '@/components/BlogDashboard'

// // // export default async function BlogList() {
// // //   const { data: posts, error } = await supabaseClient
// // //     .from('posts')
// // //     .select('*')
// // //     .eq('published', true)
// // //     .order('created_at', { ascending: false })

// // //   if (error) {
// // //     console.error('Supabase error:', error)
// // //     return <div>Error loading posts</div>
// // //   }

// // //   // Transform the posts data to match the dashboard requirements
// // //   const formattedPosts = posts?.map(post => ({
// // //     id: post.id,
// // //     title: post.title,
// // //     excerpt: post.excerpt || '',
// // //     category: post.category || 'tech', // You'll need to add category to your posts table
// // //     date: new Date(post.created_at).toLocaleDateString(),
// // //     slug: post.slug,
// // //   })) || []

// // //   return (
// // //     <div className="max-w-7xl mx-auto">
// // //       <div className="flex justify-between items-center mb-8 px-4">
// // //         <h1 className="text-3xl font-bold">Blog Posts</h1>
// // //         <Link
// // //           href="/blog/new"
// // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //         >
// // //           Write Post
// // //         </Link>
// // //       </div>

// // //       <BlogDashboard posts={formattedPosts} />
// // //     </div>
// // //   )
// // // }
// // // // // src/app/blog/page.tsx
// // // // import Link from 'next/link'
// // // // import { supabaseClient } from '@/lib/auth'

// // // // export default async function BlogList() {
// // // //   const { data: posts, error } = await supabaseClient
// // // //     .from('posts')
// // // //     .select('*')
// // // //     .eq('published', true)
// // // //     .order('created_at', { ascending: false })

// // // //   console.log('Posts:', posts)
// // // //   console.log('Error:', error)

// // // //   if (error) {
// // // //     console.error('Supabase error:', error)
// // // //     return <div>Error loading posts</div>
// // // //   }

// // // //   if (!posts?.length) {
// // // //     return (
// // // //       <div className="max-w-4xl mx-auto">
// // // //         <div className="flex justify-between items-center mb-8">
// // // //           <h1 className="text-3xl font-bold">Blog Posts</h1>
// // // //           <Link href="/blog/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// // // //             Write Post
// // // //           </Link>
// // // //         </div>
// // // //         <p>No posts yet. Be the first to write one!</p>
// // // //       </div>
// // // //     )
// // // //   }
// // // //   return (
// // // //     <div className="max-w-4xl mx-auto">
// // // //       <div className="flex justify-between items-center mb-8">
// // // //         <h1 className="text-3xl font-bold">Blog Posts</h1>
// // // //         <Link
// // // //           href="/blog/new"
// // // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // // //         >
// // // //           Write Post
// // // //         </Link>
// // // //       </div>

// // // //       <div className="space-y-8">
// // // //         {posts?.map((post) => (
// // // //           <article key={post.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
// // // //             <h2 className="text-2xl font-semibold mb-2">
// // // //               <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
// // // //                 {post.title}
// // // //               </Link>
// // // //             </h2>
// // // //             {post.excerpt && (
// // // //               <p className="text-gray-600 mb-4">{post.excerpt}</p>
// // // //             )}
// // // //             <div className="text-sm text-gray-500">
// // // //               {new Date(post.created_at).toLocaleDateString()}
// // // //             </div>
// // // //           </article>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // // // src/app/blog/page.tsx
// // // // // import Link from 'next/link'
// // // // // import { blogApi } from '@/lib/supabase'

// // // // // export default async function BlogPage() {
// // // // //   const posts = await blogApi.getAllPosts()

// // // // //   return (
// // // // //     <div className="max-w-4xl mx-auto">
// // // // //       <div className="flex justify-between items-center mb-8">
// // // // //         <h1 className="text-3xl font-bold">Blog Posts</h1>
// // // // //         <Link
// // // // //           href="/blog/new"
// // // // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // // // //         >
// // // // //           New Post
// // // // //         </Link>
// // // // //       </div>

// // // // //       <div className="space-y-8">
// // // // //         {posts.map((post) => (
// // // // //           <article key={post.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
// // // // //             <h2 className="text-2xl font-semibold mb-2">
// // // // //               <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
// // // // //                 {post.title}
// // // // //               </Link>
// // // // //             </h2>
// // // // //             {post.excerpt && (
// // // // //               <p className="text-gray-600 mb-4">{post.excerpt}</p>
// // // // //             )}
// // // // //             <div className="text-sm text-gray-500">
// // // // //               {new Date(post.created_at).toLocaleDateString()}
// // // // //             </div>
// // // // //           </article>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/fonts/GeistMonoVF.woff

This is a binary file of the type: Binary

# src/app/fonts/GeistVF.woff

This is a binary file of the type: Binary

# src/app/globals.css

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground: #ededed;
  --background: #152327;
}

body {
  color: var(--foreground);
  background: var(--background);
}

/* Prism.js syntax highlighting customization */
pre[class*="language-"] {
  background: #2d2d2d !important;
  border-radius: 0.5rem;
  margin: 1.5rem 0 !important;
  padding: 1rem !important;
}

code[class*="language-"] {
  background: transparent !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
}

:not(pre) > code[class*="language-"] {
  background: #2d2d2d !important;
  color: #e0e0e0 !important;
  padding: 0.2em 0.4em !important;
  border-radius: 0.25rem !important;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #999 !important;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol {
  color: #f08d49 !important;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin {
  color: #7ec699 !important;
}

.token.operator,
.token.entity,
.token.url,
.token.variable {
  color: #67cdcc !important;
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #cc99cd !important;
}

/* src/app/globals.css */

/* @tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground: #ededed;
  --background: #152327;
}

body {
  color: var(--foreground);
  background: var(--background);
} */

/* Add these utility classes */
/* .text-light {
  color: #ededed;
}

.bg-dark {
  background-color: #242424;
} */

 /* Update components with lighter text: */
 /* In blog/[slug]/page.tsx, navbar, postform, and anywhere else using text-gray-600: */
 /* Change text-gray-600 to text-gray-300 */
 /* Change bg-white to bg-dark */

/* @tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
} */

```

# src/app/layout.tsx

```tsx
// src/app/layout.tsx
import localFont from "next/font/local"
import StyledComponentsRegistry from '@/lib/registry'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}>
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}



// // src/app/layout.tsx
// import localFont from "next/font/local"
// import { Navbar } from '@/components/Navbar'
// import { ThemeLayout } from '@/components/ThemeLayout'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// })

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body>
//         <ThemeLayout>
//           <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
//             <Navbar />
//             <main className="container mx-auto px-4 py-8">
//               {children}
//             </main>
//           </div>
//         </ThemeLayout>
//       </body>
//     </html>
//   )
// }


// // // src/app/layout.tsx
// // "use client"
// // import localFont from "next/font/local"
// // import { Providers } from './providers'
// // import { ThemeProvider } from 'styled-components'
// // import { lightTheme } from '@/lib/theme-config'
// // import { GlobalStyle } from '@/lib/theme'
// // import StyledComponentsRegistry from '@/lib/registry'
// // import { Navbar } from '@/components/Navbar'

// // const geistSans = localFont({
// //   src: "./fonts/GeistVF.woff",
// //   variable: "--font-geist-sans",
// //   weight: "100 900",
// // })

// // const geistMono = localFont({
// //   src: "./fonts/GeistMonoVF.woff",
// //   variable: "--font-geist-mono",
// //   weight: "100 900",
// // })

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode
// // }) {
// //    return (
// //       <html lang="en" suppressHydrationWarning>
// //         <body>
// //           <Providers>
// //             <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
// //               <Navbar />
// //               <main className="container mx-auto px-4 py-8">
// //                 {children}
// //               </main>
// //             </div>
// //           </Providers>
// //         </body>
// //       </html>
// //     )
// // //   return (
// // //     <html lang="en" suppressHydrationWarning>
// // //       <body>
// // //         <StyledComponentsRegistry>
// // //           <ThemeProvider theme={lightTheme}>
// // //             <GlobalStyle />
// // //             <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
// // //               <Navbar />
// // //               <main className="container mx-auto px-4 py-8">
// // //                 {children}
// // //               </main>
// // //             </div>
// // //           </ThemeProvider>
// // //         </StyledComponentsRegistry>
// // //       </body>
// // //     </html>
// // //   )
// // }
// // // // src/app/layout.tsx
// // // 'use client'
// // // import { useState, useEffect } from 'react'
// // // import 'styled-components'
// // // import { ThemeProvider } from 'styled-components'
// // // import { theme, GlobalStyle } from '@/lib/theme'
// // // import StyledComponentsRegistry from '@/lib/registry'

// // // function ThemeWrapper({ children }: { children: React.ReactNode }) {
// // //   const [isDarkTheme, setIsDarkTheme] = useState(false)

// // //   useEffect(() => {
// // //     // Sync with portfolio theme preference
// // //     const darkMode = localStorage.getItem('darkMode') === 'true'
// // //     setIsDarkTheme(darkMode)
// // //   }, [])

// // //   return (
// // //     <ThemeProvider theme={isDarkTheme ? theme.dark : theme.light}>
// // //       <GlobalStyle />
// // //       {children}
// // //     </ThemeProvider>
// // //   )
// // // }

// // // export default function RootLayout({
// // //   children,
// // // }: {
// // //   children: React.ReactNode
// // // }) {
// // //   return (
// // //     <html lang="en" suppressHydrationWarning>
// // //       <body>
// // //         <StyledComponentsRegistry>
// // //           <ThemeWrapper>
// // //             <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
// // //               <Navbar />
// // //               <main className="container mx-auto px-4 py-8">
// // //                 {children}
// // //               </main>
// // //             </div>
// // //           </ThemeWrapper>
// // //         </StyledComponentsRegistry>
// // //       </body>
// // //     </html>
// // //   )
// // // }

// // // // // src/app/layout.tsx
// // // // import type { Metadata } from "next"
// // // // import localFont from "next/font/local"
// // // // import "./globals.css"
// // // // import { Navbar } from '@/components/Navbar'

// // // // const geistSans = localFont({
// // // //   src: "./fonts/GeistVF.woff",
// // // //   variable: "--font-geist-sans",
// // // //   weight: "100 900",
// // // // })

// // // // const geistMono = localFont({
// // // //   src: "./fonts/GeistMonoVF.woff",
// // // //   variable: "--font-geist-mono",
// // // //   weight: "100 900",
// // // // })

// // // // export const metadata: Metadata = {
// // // //   title: "My Blog",
// // // //   description: "A Next.js blog with Supabase",
// // // // }

// // // // export default function RootLayout({
// // // //   children,
// // // // }: {
// // // //   children: React.ReactNode
// // // // }) {
// // // //   return (
// // // //     <html lang="en" suppressHydrationWarning>
// // // //       <body suppressHydrationWarning>
// // // //         <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
// // // //           <Navbar />
// // // //           <main className="container mx-auto px-4 py-8">
// // // //             {children}
// // // //           </main>
// // // //         </div>
// // // //       </body>
// // // //     </html>
// // // //   )
// // // // }
```

# src/app/page.tsx

```tsx
// src/app/page.tsx
'use client'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/lib/theme-config'
import { Navbar } from '@/components/Navbar'

export default function HomePage() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1>Welcome to the Blog</h1>
      </main>
    </ThemeProvider>
  )
}
// // src/app/page.tsx
// import Link from 'next/link'

// export default function Home() {
//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6">Welcome to My Blog</h1>
//       <p className="text-lg mb-4">
//         Exploring ideas, sharing knowledge, and documenting my journey.
//       </p>
//       <Link
//         href="/blog"
//         className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
//       >
//         Read Blog Posts
//       </Link>
//     </div>
//   )
// }

// // // app/page.tsx
// // import { blogApi } from '@/lib/supabase'

// // export default async function Home() {
// //   // Fetch posts
// //   const posts = await blogApi.getAllPosts()

// //   return (
// //     <main className="max-w-4xl mx-auto py-8 px-4">
// //       <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

// //       <div className="space-y-6">
// //         {posts.map((post) => (
// //           <article key={post.id} className="border rounded-lg p-6">
// //             <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
// //             {post.excerpt && (
// //               <p className="text-gray-600 mb-4">{post.excerpt}</p>
// //             )}
// //             <div className="text-sm text-gray-500">
// //               Published on {new Date(post.created_at).toLocaleDateString()}
// //             </div>
// //           </article>
// //         ))}
// //       </div>
// //     </main>
// //   )
// // }
```

# src/app/providers.tsx

```tsx
// src/app/providers.tsx
'use client'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/lib/theme-config'
import { GlobalStyle } from '@/lib/theme'
import StyledComponentsRegistry from '@/lib/registry'
import { useState, useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}
```

# src/components/AuthButton.tsx

```tsx
// src/components/AuthButton.tsx
'use client'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/auth'

export function AuthButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <button
      onClick={handleSignIn}
      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      Sign In with GitHub
    </button>
  )
}


```

# src/components/BlogDashboard.tsx

```tsx
// src/components/BlogDashboard.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { categories, CategoryId } from '@/data/categories';
import { PostCard } from '@/components/PostCard';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: CategoryId;
  date: string;
  slug: string;
  cover_image?: string;
};

export default function BlogDashboard({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  const latestTechPost = posts.find(post => post.category === 'tech');
  const latestMediaPost = posts.find(post => post.category === 'media');
  const remainingPosts = posts.filter(post =>
    post.id !== latestTechPost?.id && post.id !== latestMediaPost?.id
  );
  const filteredPosts = activeCategory
    ? remainingPosts.filter(post => post.category === activeCategory)
    : remainingPosts;

  const FeaturedCard = ({ post, category }: { post?: Post, category: typeof categories[0] }) => (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800">
      {post ? (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
          {post.cover_image ? (
            <div className="absolute inset-0">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
          )}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className={`text-sm font-medium ${category.textColor} mb-2`}>
              {category.name}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-300 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </Link>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
          <div className="absolute inset-0 p-6 flex items-center justify-center">
            <p className="text-xl text-white/70">No {category.name} posts yet</p>
          </div>
        </div>
      )}
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveCategory(category.id as CategoryId);
        }}
        className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${category.color}
          text-white text-sm font-medium hover:opacity-90 transition-opacity`}
      >
        {category.name}
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(
                activeCategory === category.id ? null : category.id as CategoryId
              )}
              className={`p-4 rounded-lg flex items-center space-x-3 transition-all
                ${activeCategory === category.id
                  ? category.color + ' text-white'
                  : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <Icon size={24} />
              <span className="font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>

      {activeCategory ? (
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft size={20} />
                <span>Back to all posts</span>
              </button>
              <h2 className="text-3xl font-bold mb-2">
                {categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-gray-300 max-w-2xl">
                {categories.find(c => c.id === activeCategory)?.description}
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="featuredBogsContainer grid md:grid-cols-1 gap-8">
            <FeaturedCard
              post={latestTechPost}
              category={categories[0]}
            />
            {/* <FeaturedCard
              post={latestMediaPost}
              category={categories[1]}
            /> */}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">All Posts</h2>
            <div className="allPostsContainer grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Newspaper, Coffee, Laptop, User, ArrowLeft } from "lucide-react";
// import { CategoryId } from '@/data/categories';
// import { categories } from "@/data/categories";
// import { PostCard } from "@/components/PostCard";

// type Post = {
// 	id: string;
// 	title: string;
// 	excerpt: string;
// 	category: CategoryId;  // This enforces the proper category types
// 	date: string;
// 	slug: string;
// 	cover_image?: string;
// };

// export default function BlogDashboard({ posts }: { posts: Post[] }) {
// 	const [activeCategory, setActiveCategory] = useState<string | null>(null);

// 	const latestTechPost = posts.find((post) => post.category === "tech");
// 	const latestMediaPost = posts.find((post) => post.category === "media");
// 	const remainingPosts = posts.filter((post) => post.id !== latestTechPost?.id && post.id !== latestMediaPost?.id);
// 	const filteredPosts = activeCategory ? remainingPosts.filter((post) => post.category === activeCategory) : remainingPosts;

// 	//   const categories = [
// 	//     {
// 	//       id: 'tech',
// 	//       name: 'Tech Articles',
// 	//       icon: Laptop,
// 	//       color: 'bg-blue-500',
// 	//       gradient: 'from-blue-500 to-blue-700',
// 	//       description: 'Deep dives into software development, web technologies, and the latest tech trends. From coding tutorials to architectural insights.'
// 	//     },
// 	//     {
// 	//       id: 'media',
// 	//       name: 'Other Media',
// 	//       icon: Newspaper,
// 	//       color: 'bg-purple-500',
// 	//       gradient: 'from-purple-500 to-purple-700',
// 	//       description: 'Exploring movies, books, games, and digital content. Reviews, analyses, and discussions about storytelling across different mediums.'
// 	//     },
// 	//     {
// 	//       id: 'food',
// 	//       name: 'Fusion Food',
// 	//       icon: Coffee,
// 	//       color: 'bg-orange-500',
// 	//       gradient: 'from-orange-500 to-orange-700',
// 	//       description: 'Creative recipes blending different culinary traditions. Discover unique flavor combinations and cooking techniques from around the world.'
// 	//     },
// 	//     {
// 	//       id: 'personal',
// 	//       name: 'Personal',
// 	//       icon: User,
// 	//       color: 'bg-green-500',
// 	//       gradient: 'from-green-500 to-green-700',
// 	//       description: 'Personal reflections, experiences, and life lessons. A space for sharing thoughts on growth, creativity, and everyday adventures.'
// 	//     }
// 	//   ];

// 	const FeaturedCard = ({ post, category }: { post?: Post; category: (typeof categories)[0] }) => (
// 		<div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800">
// 			{post ? (
// 				<PostCard post={post} />
// 			) : (
// 				// <Link href={`/blog/${post.slug}`} className="group block h-full">
// 				// 	{post.cover_image ? (
// 				// 		<div className="absolute inset-0">
// 				// 			<Image src={post.cover_image} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
// 				// 			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// 				// 		</div>
// 				// 	) : (
// 				// 		<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// 				// 	)}
// 				// 	<div className="absolute inset-0 p-6 flex flex-col justify-end">
// 				// 		<div className="text-sm font-medium text-blue-400 mb-2">Latest in {category.name}</div>
// 				// 		<h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
// 				// 		<p className="text-gray-300 line-clamp-2">{post.excerpt}</p>
// 				// 	</div>
// 				// </Link>
// 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// 					<div className="absolute inset-0 p-6 flex items-center justify-center">
// 						<p className="text-xl text-white/70">No {category.name} posts yet</p>
// 					</div>
// 				</div>
// 			)}
// 			<Link
// 				href="#"
// 				onClick={(e) => {
// 					e.preventDefault();
// 					setActiveCategory(category.id);
// 				}}
// 				className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${category.color}
//           text-white text-sm font-medium hover:opacity-90 transition-opacity`}
// 			>
// 				{category.name}
// 			</Link>
// 		</div>
// 	);

// 	return (
// 		<div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// 			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// 				{categories.map((category) => {
// 					const Icon = category.icon;
// 					return (
// 						<button
// 							key={category.id}
// 							onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
// 							className={`p-4 rounded-lg flex items-center space-x-3 transition-all
//                 ${activeCategory === category.id ? category.color + " text-white" : "bg-gray-800 hover:bg-gray-700"}`}
// 						>
// 							<Icon size={24} />
// 							<span className="font-medium">{category.name}</span>
// 						</button>
// 					);
// 				})}
// 			</div>

// 			{activeCategory ? (
// 				<div className="space-y-8">
// 					<div className="flex justify-between items-start">
// 						<div>
// 							<button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
// 								<ArrowLeft size={20} />
// 								<span>Back to all posts</span>
// 							</button>
// 							<h2 className="text-3xl font-bold mb-2">{categories.find((c) => c.id === activeCategory)?.name}</h2>
// 							<p className="text-gray-300 max-w-2xl">{categories.find((c) => c.id === activeCategory)?.description}</p>
// 						</div>
// 					</div>
// 					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// 						{filteredPosts.map((post) => (
// 							<PostCard key={post.id} post={post} />
// 						))}
// 						{/* {filteredPosts.map((post) => (
// 							<Link href={`/blog/${post.slug}`} key={post.id} className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
// 								<div className="aspect-[16/9] relative bg-gray-900">{post.cover_image ? <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> : <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />}</div>
// 								<div className="p-4">
// 									<div className="text-sm text-gray-400 mb-1">{post.date}</div>
// 									<h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
// 									<p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
// 								</div>
// 							</Link>
// 						))} */}
// 					</div>
// 				</div>
// 			) : (
// 				<>
// 					<div className="grid md:grid-cols-2 gap-8">
// 						<FeaturedCard post={latestTechPost} category={categories[0]} />
// 						<FeaturedCard post={latestMediaPost} category={categories[1]} />
// 					</div>

// 					<div>
// 						<h2 className="text-2xl font-bold mb-6">All Posts</h2>
// 						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// 							{filteredPosts.map((post) => (
// 								<PostCard key={post.id} post={post} />
// 							))}
// 							{/* {filteredPosts.map((post) => (
// 								<Link href={`/blog/${post.slug}`} key={post.id} className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
// 									<div className="aspect-[16/9] relative bg-gray-900">{post.cover_image ? <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" /> : <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />}</div>
// 									<div className="p-4">
// 										<div className="text-sm text-gray-400 mb-1">{post.date}</div>
// 										<h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
// 										<p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
// 									</div>
// 								</Link>
// 							))} */}
// 						</div>
// 					</div>
// 				</>
// 			)}
// 		</div>
// 	);
// }

// // 'use client'

// // import { useState } from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { Newspaper, Coffee, Laptop, User } from 'lucide-react';

// // type Post = {
// //   id: string;
// //   title: string;
// //   excerpt: string;
// //   category: string;
// //   date: string;
// //   slug: string;
// //   cover_image?: string;
// // };

// // export default function BlogDashboard({ posts }: { posts: Post[] }) {
// //   const [activeCategory, setActiveCategory] = useState<string | null>(null);

// //   const latestTechPost = posts.find(post => post.category === 'tech');
// //   const latestMediaPost = posts.find(post => post.category === 'media');
// //   const remainingPosts = posts.filter(post =>
// //     post.id !== latestTechPost?.id && post.id !== latestMediaPost?.id
// //   );
// //   const filteredPosts = activeCategory
// //     ? remainingPosts.filter(post => post.category === activeCategory)
// //     : remainingPosts;

// //   const categories = [
// //     { id: 'tech', name: 'Tech Articles', icon: Laptop, color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-700' },
// //     { id: 'media', name: 'Other Media', icon: Newspaper, color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-700' },
// //     { id: 'food', name: 'Fusion Food', icon: Coffee, color: 'bg-orange-500', gradient: 'from-orange-500 to-orange-700' },
// //     { id: 'personal', name: 'Personal', icon: User, color: 'bg-green-500', gradient: 'from-green-500 to-green-700' }
// //   ];

// //   const FeaturedCard = ({ post, category }: { post?: Post, category: typeof categories[0] }) => (
// //     <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800">
// //       {post ? (
// //         <Link href={`/blog/${post.slug}`} className="group block h-full">
// //           {post.cover_image ? (
// //             <div className="absolute inset-0">
// //               <Image
// //                 src={post.cover_image}
// //                 alt={post.title}
// //                 fill
// //                 className="object-cover transition-transform group-hover:scale-105"
// //                 sizes="(max-width: 768px) 100vw, 50vw"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// //             </div>
// //           ) : (
// //             <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// //           )}
// //           <div className="absolute inset-0 p-6 flex flex-col justify-end">
// //             <div className="text-sm font-medium text-blue-400 mb-2">
// //               Latest in {category.name}
// //             </div>
// //             <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
// //               {post.title}
// //             </h3>
// //             <p className="text-gray-300 line-clamp-2">
// //               {post.excerpt}
// //             </p>
// //           </div>
// //         </Link>
// //       ) : (
// //         <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// //           <div className="absolute inset-0 p-6 flex items-center justify-center">
// //             <p className="text-xl text-white/70">No {category.name} posts yet</p>
// //           </div>
// //         </div>
// //       )}
// //       <Link
// //         href="#"
// //         onClick={(e) => {
// //           e.preventDefault();
// //           setActiveCategory(category.id);
// //         }}
// //         className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${category.color}
// //           text-white text-sm font-medium hover:opacity-90 transition-opacity`}
// //       >
// //         {category.name}
// //       </Link>
// //     </div>
// //   );

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         {categories.map((category) => {
// //           const Icon = category.icon;
// //           return (
// //             <button
// //               key={category.id}
// //               onClick={() => setActiveCategory(
// //                 activeCategory === category.id ? null : category.id
// //               )}
// //               className={`p-4 rounded-lg flex items-center space-x-3 transition-all
// //                 ${activeCategory === category.id
// //                   ? category.color + ' text-white'
// //                   : 'bg-gray-800 hover:bg-gray-700'}`}
// //             >
// //               <Icon size={24} />
// //               <span className="font-medium">{category.name}</span>
// //             </button>
// //           );
// //         })}
// //       </div>

// //       {!activeCategory && (
// //         <div className="grid md:grid-cols-2 gap-8">
// //           <FeaturedCard
// //             post={latestTechPost}
// //             category={categories[0]}
// //           />
// //           <FeaturedCard
// //             post={latestMediaPost}
// //             category={categories[1]}
// //           />
// //         </div>
// //       )}

// //       <div>
// //         <h2 className="text-2xl font-bold mb-6">
// //           {activeCategory
// //             ? `${categories.find(c => c.id === activeCategory)?.name}`
// //             : 'All Posts'
// //           }
// //         </h2>
// //         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //           {filteredPosts.map((post) => (
// //             <Link
// //               href={`/blog/${post.slug}`}
// //               key={post.id}
// //               className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
// //             >
// //               <div className="aspect-[16/9] relative bg-gray-900">
// //                 {post.cover_image ? (
// //                   <Image
// //                     src={post.cover_image}
// //                     alt={post.title}
// //                     fill
// //                     className="object-cover"
// //                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //                   />
// //                 ) : (
// //                   <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />
// //                 )}
// //               </div>
// //               <div className="p-4">
// //                 <div className="text-sm text-gray-400 mb-1">{post.date}</div>
// //                 <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
// //                   {post.title}
// //                 </h3>
// //                 <p className="text-gray-300 text-sm line-clamp-2">
// //                   {post.excerpt}
// //                 </p>
// //               </div>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // 'use client'

// // import { useState } from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { Newspaper, Coffee, Laptop, User } from 'lucide-react';

// // type Post = {
// //   id: string;
// //   title: string;
// //   excerpt: string;
// //   category: string;
// //   date: string;
// //   slug: string;
// //   cover_image?: string;
// // };

// // export default function BlogDashboard({ posts }: { posts: Post[] }) {
// //   const [activeCategory, setActiveCategory] = useState<string | null>(null);

// //   const latestTechPost = posts.find(post => post.category === 'tech');
// //   const latestMediaPost = posts.find(post => post.category === 'media');
// //   const remainingPosts = posts.filter(post =>
// //     post.id !== latestTechPost?.id && post.id !== latestMediaPost?.id
// //   );
// //   const filteredPosts = activeCategory
// //     ? remainingPosts.filter(post => post.category === activeCategory)
// //     : remainingPosts;

// //   const categories = [
// //     { id: 'tech', name: 'Tech Articles', icon: Laptop, color: 'bg-blue-500' },
// //     { id: 'media', name: 'Other Media', icon: Newspaper, color: 'bg-purple-500' },
// //     { id: 'food', name: 'Fusion Food', icon: Coffee, color: 'bg-orange-500' },
// //     { id: 'personal', name: 'Personal', icon: User, color: 'bg-green-500' }
// //   ];

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         {categories.map((category) => {
// //           const Icon = category.icon;
// //           return (
// //             <button
// //               key={category.id}
// //               onClick={() => setActiveCategory(
// //                 activeCategory === category.id ? null : category.id
// //               )}
// //               className={`p-4 rounded-lg flex items-center space-x-3 transition-all
// //                 ${activeCategory === category.id
// //                   ? category.color + ' text-white'
// //                   : 'bg-gray-800 hover:bg-gray-700'}`}
// //             >
// //               <Icon size={24} />
// //               <span className="font-medium">{category.name}</span>
// //             </button>
// //           );
// //         })}
// //       </div>

// //       {!activeCategory && (
// //         <div className="grid md:grid-cols-2 gap-8">
// //           {latestTechPost && (
// //             <Link
// //               href={`/blog/${latestTechPost.slug}`}
// //               className="group relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800"
// //             >
// //               {latestTechPost.cover_image ? (
// //                 <div className="absolute inset-0">
// //                   <Image
// //                     src={latestTechPost.cover_image}
// //                     alt={latestTechPost.title}
// //                     fill
// //                     className="object-cover transition-transform group-hover:scale-105"
// //                     sizes="(max-width: 768px) 100vw, 50vw"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// //                 </div>
// //               ) : (
// //                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
// //               )}
// //               <div className="absolute inset-0 p-6 flex flex-col justify-end">
// //                 <div className="text-sm font-medium text-blue-400 mb-2">
// //                   Latest in Tech
// //                 </div>
// //                 <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
// //                   {latestTechPost.title}
// //                 </h3>
// //                 <p className="text-gray-300 line-clamp-2">
// //                   {latestTechPost.excerpt}
// //                 </p>
// //               </div>
// //             </Link>
// //           )}

// //           {latestMediaPost && (
// //             <Link
// //               href={`/blog/${latestMediaPost.slug}`}
// //               className="group relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800"
// //             >
// //               {latestMediaPost.cover_image ? (
// //                 <div className="absolute inset-0">
// //                   <Image
// //                     src={latestMediaPost.cover_image}
// //                     alt={latestMediaPost.title}
// //                     fill
// //                     className="object-cover transition-transform group-hover:scale-105"
// //                     sizes="(max-width: 768px) 100vw, 50vw"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// //                 </div>
// //               ) : (
// //                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700" />
// //               )}
// //               <div className="absolute inset-0 p-6 flex flex-col justify-end">
// //                 <div className="text-sm font-medium text-purple-400 mb-2">
// //                   Latest in Media
// //                 </div>
// //                 <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
// //                   {latestMediaPost.title}
// //                 </h3>
// //                 <p className="text-gray-300 line-clamp-2">
// //                   {latestMediaPost.excerpt}
// //                 </p>
// //               </div>
// //             </Link>
// //           )}
// //         </div>
// //       )}

// //       <div>
// //         <h2 className="text-2xl font-bold mb-6">
// //           {activeCategory
// //             ? `${categories.find(c => c.id === activeCategory)?.name}`
// //             : 'All Posts'
// //           }
// //         </h2>
// //         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //           {filteredPosts.map((post) => (
// //             <Link
// //               href={`/blog/${post.slug}`}
// //               key={post.id}
// //               className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
// //             >
// //               <div className="aspect-[16/9] relative bg-gray-900">
// //                 {post.cover_image ? (
// //                   <Image
// //                     src={post.cover_image}
// //                     alt={post.title}
// //                     fill
// //                     className="object-cover"
// //                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //                   />
// //                 ) : (
// //                   <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />
// //                 )}
// //               </div>
// //               <div className="p-4">
// //                 <div className="text-sm text-gray-400 mb-1">{post.date}</div>
// //                 <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
// //                   {post.title}
// //                 </h3>
// //                 <p className="text-gray-300 text-sm line-clamp-2">
// //                   {post.excerpt}
// //                 </p>
// //               </div>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // 'use client'
// // import React, { useState } from 'react';
// // import Link from 'next/link';
// // import { Newspaper, Coffee, Laptop, User } from 'lucide-react';

// // // Types for our blog posts
// // type Post = {
// //   id: string;
// //   title: string;
// //   excerpt: string;
// //   category: string;
// //   date: string;
// //   slug: string;
// //   imageUrl?: string;
// // };

// // // Categories configuration
// // const categories = [
// //   { id: 'tech', name: 'Tech Articles', icon: Laptop, color: 'bg-blue-500' },
// //   { id: 'food', name: 'Fusion Food', icon: Coffee, color: 'bg-orange-500' },
// //   { id: 'media', name: 'Other Media', icon: Newspaper, color: 'bg-purple-500' },
// //   { id: 'personal', name: 'Personal', icon: User, color: 'bg-green-500' }
// // ];

// // export default function BlogDashboard({ posts }: { posts: Post[] }) {
// //   const [activeCategory, setActiveCategory] = useState<string | null>(null);

// //   // Filter posts by category
// //   const filteredPosts = activeCategory
// //     ? posts.filter(post => post.category === activeCategory)
// //     : posts;

// //   // Get featured posts (first two posts from different categories)
// //   const featuredPosts = posts.reduce((acc: Post[], post) => {
// //     if (acc.length < 2 && !acc.find(p => p.category === post.category)) {
// //       acc.push(post);
// //     }
// //     return acc;
// //   }, []);

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       {/* Categories */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// //         {categories.map((category) => {
// //           const Icon = category.icon;
// //           return (
// //             <button
// //               key={category.id}
// //               onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
// //               className={`p-4 rounded-lg flex items-center space-x-3 transition-all
// //                 ${activeCategory === category.id ? category.color + ' text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
// //             >
// //               <Icon size={24} />
// //               <span className="font-medium">{category.name}</span>
// //             </button>
// //           );
// //         })}
// //       </div>

// //       {/* Featured Posts */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
// //         {featuredPosts.map((post) => (
// //           <Link
// //             href={`/blog/${post.slug}`}
// //             key={post.id}
// //             className="group relative overflow-hidden rounded-xl shadow-lg"
// //           >
// //             <div className="aspect-w-16 aspect-h-9 bg-gray-100">
// //               <img
// //                 src="/api/placeholder/800/450"
// //                 alt={post.title}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
// //               <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
// //                 {post.title}
// //               </h3>
// //               <p className="text-gray-200 line-clamp-2">{post.excerpt}</p>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>

// //       {/* All Posts Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {filteredPosts.map((post) => (
// //           <Link
// //             href={`/blog/${post.slug}`}
// //             key={post.id}
// //             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
// //           >
// //             <div className="aspect-w-16 aspect-h-9 bg-gray-100">
// //               <img
// //                 src="/api/placeholder/400/225"
// //                 alt={post.title}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //             <div className="p-4">
// //               <div className="text-sm text-gray-500 mb-1">{post.date}</div>
// //               <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
// //               <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

```

# src/components/BlogPost.styles.ts

```ts
// src/components/BlogPost.styles.ts
import styled from 'styled-components'

export const Article = styled.article`
  max-width: 65ch;
  margin: 0 auto;

  header {
    margin-bottom: ${({ theme }) => theme.typography.heading.sizes.h2};
  }
`

export const Title = styled.h1`
  ${({ theme }) => `
    font-family: ${theme.typography.heading.fontFamily};
    font-size: ${theme.typography.heading.sizes.h1};
    color: ${theme.isDarkTheme ? theme.colors.text.dark.primary : theme.colors.text.light.primary};
    margin-bottom: ${theme.typography.heading.sizes.h6};
  `}
`

export const Metadata = styled.div`
  ${({ theme }) => `
    font-size: ${theme.typography.body.sizes.sm};
    color: ${theme.isDarkTheme ? theme.colors.text.dark.secondary : theme.colors.text.light.secondary};
  `}
`

export const Content = styled.div`
  ${({ theme }) => `
    font-family: ${theme.typography.body.fontFamily};
    font-size: ${theme.typography.body.sizes.lg};
    line-height: 1.75;

    h2 {
      font-family: ${theme.typography.heading.fontFamily};
      font-size: ${theme.typography.heading.sizes.h2};
      margin-top: 2em;
      margin-bottom: 1em;
    }

    p {
      margin-bottom: 1.5em;
    }

    a {
      color: ${theme.colors.primary[500]};
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }
  `}
`
```

# src/components/Comments.tsx

```tsx
// src/components/Comments.tsx
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabaseClient } from '@/lib/auth'

export function Comments({ postId }: { postId: string }) {
  const { user } = useAuth()
  const [comments, setComments] = useState<any[]>([])
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadComments()
  }, [postId])

  const loadComments = async () => {
    const { data } = await supabaseClient
      .from('comments')
      .select('*, profiles(username)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    setComments(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !content.trim()) return

    setIsSubmitting(true)
    try {
      await supabaseClient.from('comments').insert({
        content: content.trim(),
        post_id: postId,
        author_id: user.id
      })
      setContent('')
      loadComments()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
   <div className="mt-12">
     <h2 className="text-2xl font-bold mb-6 text-gray-100">Comments</h2>

     {user ? (
       <form onSubmit={handleSubmit} className="mb-8">
         <textarea
           value={content}
           onChange={(e) => setContent(e.target.value)}
           className="w-full p-2 border rounded bg-gray-800 text-gray-200 border-gray-700"
           rows={3}
           required
           placeholder="Write a comment..."
         />
         <button
           type="submit"
           disabled={isSubmitting}
           className="mt-2 bg-blue-500 text-gray-100 px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
         >
           {isSubmitting ? 'Posting...' : 'Post Comment'}
         </button>
       </form>
     ) : (
       <p className="mb-8 text-gray-300">Please sign in to comment</p>
     )}

     <div className="space-y-4">
       {comments.map((comment) => (
         <div key={comment.id} className="border border-gray-700 rounded p-4 bg-gray-800">
           <div className="text-sm text-gray-400 mb-2">
             {comment.profiles?.username || 'Anonymous'} • {' '}
             {new Date(comment.created_at).toLocaleDateString()}
           </div>
           <p className="text-gray-200">{comment.content}</p>
         </div>
       ))}
       {comments.length === 0 && (
         <p className="text-gray-400">No comments yet</p>
       )}
     </div>
   </div>
 )

//   return (
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold mb-6">Comments</h2>

//       {user ? (
//         <form onSubmit={handleSubmit} className="mb-8">
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full p-2 border rounded bg-white text-gray-900"
//             rows={3}
//             required
//             placeholder="Write a comment..."
//           />
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {isSubmitting ? 'Posting...' : 'Post Comment'}
//           </button>
//         </form>
//       ) : (
//         <p className="mb-8 text-gray-600">Please sign in to comment</p>
//       )}

//       <div className="space-y-4">
//         {comments.map((comment) => (
//           <div key={comment.id} className="border rounded p-4 bg-white">
//             <div className="text-sm text-gray-600 mb-2">
//               {comment.profiles?.username || 'Anonymous'} • {' '}
//               {new Date(comment.created_at).toLocaleDateString()}
//             </div>
//             <p>{comment.content}</p>
//           </div>
//         ))}
//         {comments.length === 0 && (
//           <p className="text-gray-500">No comments yet</p>
//         )}
//       </div>
//     </div>
//   )
// }
// 'use client'
// import { useState } from 'react'
// import { useAuth } from '@/hooks/useAuth'
// import { supabaseClient } from '@/lib/auth'

// export function Comments({ postId }: { postId: string }) {
//   const { user } = useAuth()
//   const [comments, setComments] = useState<any[]>([])
//   const [content, setContent] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const loadComments = async () => {
//     const { data } = await supabaseClient
//       .from('comments')
//       .select('*, profiles(username)')
//       .eq('post_id', postId)
//       .order('created_at', { ascending: true })

//     setComments(data || [])
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!user || !content.trim()) return

//     setIsSubmitting(true)
//     try {
//       await supabaseClient.from('comments').insert({
//         content: content.trim(),
//         post_id: postId,
//         author_id: user.id
//       })
//       setContent('')
//       loadComments()
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold mb-6">Comments</h2>

//       {user ? (
//         <form onSubmit={handleSubmit} className="mb-8">
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full p-2 border rounded bg-white text-gray-900"
//             rows={3}
//             required
//           />
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {isSubmitting ? 'Posting...' : 'Post Comment'}
//           </button>
//         </form>
//       ) : (
//         <p>Please sign in to comment</p>
//       )}

//       <div className="space-y-4">
//         {comments.map((comment) => (
//           <div key={comment.id} className="border rounded p-4">
//             <div className="text-sm text-gray-600 mb-2">
//               {comment.profiles?.username || 'Anonymous'} •
//               {new Date(comment.created_at).toLocaleDateString()}
//             </div>
//             <p>{comment.content}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
```

# src/components/DeletePost.tsx

```tsx
// src/components/DeletePost.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/auth'

export function DeletePost({ postId }: { postId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setIsDeleting(true)
    try {
      await supabaseClient.from('posts').delete().eq('id', postId)
      router.push('/blog')
      router.refresh()
    } catch (error) {
      alert('Failed to delete post')
    }
    setIsDeleting(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete Post'}
    </button>
  )
}
```

# src/components/EditForm.tsx

```tsx
// src/components/EditForm.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/auth'
import { useAuth } from '@/hooks/useAuth'
import { ImageUpload } from '@/components/ImageUpload'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'//added Rich editor for edit
import { Loader2 } from 'lucide-react'

type Post = {
  id: string
  title: string
  content: string
  excerpt?: string
  cover_image?: string
  slug: string
}

export function EditForm({ post }: { post: Post }) {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    excerpt: post.excerpt || '',
    cover_image: post.cover_image || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isImageDeleting, setIsImageDeleting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)
    setError('')

    try {
      const { error: updateError } = await supabaseClient
        .from('posts')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id)

      if (updateError) throw updateError

      router.push(`/blog/${post.slug}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageDelete = async () => {
    if (!formData.cover_image) return

    setIsImageDeleting(true)
    try {
      const path = formData.cover_image.split('/').pop()
      if (!path) throw new Error('Invalid image path')

      const { error: deleteError } = await supabaseClient.storage
        .from('images')
        .remove([`blog-images/${path}`])

      if (deleteError) throw deleteError

      setFormData(prev => ({ ...prev, cover_image: '' }))
    } catch (err) {
      setError('Failed to delete image')
      console.error('Error deleting image:', err)
    } finally {
      setIsImageDeleting(false)
    }
  }

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push(`/blog/${post.slug}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Image</label>
        {formData.cover_image ? (
          <div className="space-y-4">
            <div className="relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden">
              <ImageWithFallback
                src={formData.cover_image}
                alt="Cover image"
                className="w-full h-full"
              />
            </div>
            <button
              type="button"
              onClick={handleImageDelete}
              disabled={isImageDeleting}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
            >
              {isImageDeleting && <Loader2 className="animate-spin" size={16} />}
              {isImageDeleting ? 'Removing...' : 'Remove Image'}
            </button>
          </div>
        ) : (
          <ImageUpload
            onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Excerpt</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
          className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <RichMarkdownEditor
            initialContent={formData.content}
            onChange={(content) => setFormData(prev => ({...prev, content}))}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin" size={16} />}
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { supabaseClient } from '@/lib/auth'
// import { useAuth } from '@/hooks/useAuth'
// import { ImageUpload } from '@/components/ImageUpload'
// import { ImageWithFallback } from '@/components/ImageWithFallback'
// import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
// import { Loader2 } from 'lucide-react'

// type Post = {
//   id: string
//   title: string
//   content: string
//   excerpt?: string
//   cover_image?: string
//   slug: string
// }

// export function EditForm({ post }: { post: Post }) {
//   const router = useRouter()
//   const { user } = useAuth()
//   const [formData, setFormData] = useState({
//     title: post.title,
//     content: post.content,
//     excerpt: post.excerpt || '',
//     cover_image: post.cover_image || ''
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState('')
//   const [isImageDeleting, setIsImageDeleting] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!user) return

//     setIsSubmitting(true)
//     setError('')

//     try {
//       const { error: updateError } = await supabaseClient
//         .from('posts')
//         .update({
//           ...formData,
//           updated_at: new Date().toISOString()
//         })
//         .eq('id', post.id)

//       if (updateError) throw updateError

//       router.push(`/blog/${post.slug}`)
//       router.refresh()
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to update post')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleImageDelete = async () => {
//     if (!formData.cover_image) return

//     setIsImageDeleting(true)
//     try {
//       // Extract the file path from the URL
//       const path = formData.cover_image.split('/').pop()
//       if (!path) throw new Error('Invalid image path')

//       // Delete from Supabase Storage
//       const { error: deleteError } = await supabaseClient.storage
//         .from('images')
//         .remove([`blog-images/${path}`])

//       if (deleteError) throw deleteError

//       // Update the post to remove the cover_image
//       setFormData(prev => ({ ...prev, cover_image: '' }))
//     } catch (err) {
//       setError('Failed to delete image')
//       console.error('Error deleting image:', err)
//     } finally {
//       setIsImageDeleting(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {error && (
//         <div className="bg-red-500/10 text-red-500 p-4 rounded">
//           {error}
//         </div>
//       )}

//       <div>
//         <label className="block text-sm font-medium mb-2">Title</label>
//         <input
//           type="text"
//           value={formData.title}
//           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
//           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Cover Image</label>
//         {formData.cover_image ? (
//           <div className="space-y-4">
//             <div className="relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden">
//               <ImageWithFallback
//                 src={formData.cover_image}
//                 alt="Cover image"
//                 className="w-full h-full"
//               />
//             </div>
//             <button
//               type="button"
//               onClick={handleImageDelete}
//               disabled={isImageDeleting}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
//             >
//               {isImageDeleting && <Loader2 className="animate-spin" size={16} />}
//               {isImageDeleting ? 'Removing...' : 'Remove Image'}
//             </button>
//           </div>
//         ) : (
//           <ImageUpload
//             onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
//           />
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Excerpt</label>
//         <textarea
//           value={formData.excerpt}
//           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
//           className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Content</label>
//         <div className="border border-gray-700 rounded-lg overflow-hidden">
//           <RichMarkdownEditor
//             initialContent={formData.content}
//             onChange={(content) => setFormData(prev => ({...prev, content}))}
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
//       >
//         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
//         {isSubmitting ? 'Saving...' : 'Save Changes'}
//       </button>
//     </form>
//   )
// }
// // 'use client'
// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { supabaseClient } from '@/lib/auth'
// // import { useAuth } from '@/hooks/useAuth'
// // import { ImageUpload } from '@/components/ImageUpload'
// // import { ImageWithFallback } from '@/components/ImageWithFallback'
// // import { Loader2 } from 'lucide-react'

// // type Post = {
// //   id: string
// //   title: string
// //   content: string
// //   excerpt?: string
// //   cover_image?: string
// //   slug: string
// // }

// // export function EditForm({ post }: { post: Post }) {
// //   const router = useRouter()
// //   const { user } = useAuth()
// //   const [formData, setFormData] = useState({
// //     title: post.title,
// //     content: post.content,
// //     excerpt: post.excerpt || '',
// //     cover_image: post.cover_image || ''
// //   })
// //   const [isSubmitting, setIsSubmitting] = useState(false)
// //   const [error, setError] = useState('')
// //   const [isImageDeleting, setIsImageDeleting] = useState(false)

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!user) return

// //     setIsSubmitting(true)
// //     setError('')

// //     try {
// //       const { error: updateError } = await supabaseClient
// //         .from('posts')
// //         .update({
// //           ...formData,
// //           updated_at: new Date().toISOString()
// //         })
// //         .eq('id', post.id)

// //       if (updateError) throw updateError

// //       router.push(`/blog/${post.slug}`)
// //       router.refresh()
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'Failed to update post')
// //     } finally {
// //       setIsSubmitting(false)
// //     }
// //   }

// //   const handleImageDelete = async () => {
// //     if (!formData.cover_image) return

// //     setIsImageDeleting(true)
// //     try {
// //       // Extract the file path from the URL
// //       const path = formData.cover_image.split('/').pop()
// //       if (!path) throw new Error('Invalid image path')

// //       // Delete from Supabase Storage
// //       const { error: deleteError } = await supabaseClient.storage
// //         .from('images')
// //         .remove([`blog-images/${path}`])

// //       if (deleteError) throw deleteError

// //       // Update the post to remove the cover_image
// //       setFormData(prev => ({ ...prev, cover_image: '' }))
// //     } catch (err) {
// //       setError('Failed to delete image')
// //       console.error('Error deleting image:', err)
// //     } finally {
// //       setIsImageDeleting(false)
// //     }
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-6">
// //       {error && (
// //         <div className="bg-red-500/10 text-red-500 p-4 rounded">
// //           {error}
// //         </div>
// //       )}

// //       <div>
// //         <label className="block text-sm font-medium mb-2">Title</label>
// //         <input
// //           type="text"
// //           value={formData.title}
// //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// //           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
// //           required
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium mb-2">Cover Image</label>
// //         {formData.cover_image ? (
// //           <div className="space-y-4">
// //             <div className="relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden">
// //               <ImageWithFallback
// //                 src={formData.cover_image}
// //                 alt="Cover image"
// //                 className="w-full h-full"
// //               />
// //             </div>
// //             <button
// //               type="button"
// //               onClick={handleImageDelete}
// //               disabled={isImageDeleting}
// //               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
// //             >
// //               {isImageDeleting && <Loader2 className="animate-spin" size={16} />}
// //               {isImageDeleting ? 'Removing...' : 'Remove Image'}
// //             </button>
// //           </div>
// //         ) : (
// //           <ImageUpload
// //             onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
// //           />
// //         )}
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// //         <textarea
// //           value={formData.excerpt}
// //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// //           className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
// //         />
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium mb-2">Content (Markdown supported)</label>
// //         <textarea
// //           value={formData.content}
// //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// //           className="w-full p-2 border rounded h-64 bg-gray-800 border-gray-700 text-gray-100 font-mono"
// //           required
// //         />
// //       </div>

// //       <button
// //         type="submit"
// //         disabled={isSubmitting}
// //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
// //       >
// //         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
// //         {isSubmitting ? 'Saving...' : 'Save Changes'}
// //       </button>
// //     </form>
// //   )
// // }
```

# src/components/ImageUpload.tsx

```tsx
// src/components/ImageUpload.tsx
'use client'
import { useState } from 'react'
import { supabaseClient } from '@/lib/auth'
import { Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'

type ImageUploadProps = {
  onUploadComplete: (url: string) => void
  existingUrl?: string
}

export function ImageUpload({ onUploadComplete, existingUrl }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(existingUrl || null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      // Directly attempt upload
      const { error: uploadError, data } = await supabaseClient
        .storage
        .from('images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(fileName)

      setPreview(publicUrl)
      onUploadComplete(publicUrl)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded">
          {error}
        </div>
      )}

      <label className="block">
        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 cursor-pointer bg-gray-800">
          <div className="space-y-2 text-center">
            {isUploading ? (
              <div className="flex items-center gap-2 text-gray-300">
                <Loader2 className="animate-spin" />
                <span>Uploading...</span>
              </div>
            ) : (
              <>
                <Upload className="mx-auto text-gray-400" />
                <div className="text-gray-400">Click to upload image</div>
                <div className="text-gray-500 text-sm">Max size: 5MB</div>
              </>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>

      {preview && (
        <div className="mt-4 relative aspect-video w-full max-w-sm">
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="rounded border border-gray-700 object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      )}
    </div>
  )
}
// 'use client'
// import { useState } from 'react'
// import { supabaseClient } from '@/lib/auth'
// import { Upload, Loader2 } from 'lucide-react'
// import Image from 'next/image'

// type ImageUploadProps = {
//   onUploadComplete: (url: string) => void
//   existingUrl?: string
// }

// export function ImageUpload({ onUploadComplete, existingUrl }: ImageUploadProps) {
//   const [isUploading, setIsUploading] = useState(false)
//   const [preview, setPreview] = useState<string | null>(existingUrl || null)
//   const [error, setError] = useState<string | null>(null)

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     console.log('Selected file:', file.name, 'Size:', file.size, 'Type:', file.type)

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       setError('Please select an image file')
//       return
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       setError('Image must be less than 5MB')
//       return
//     }

//     setIsUploading(true)
//     setError(null)

//     try {
//       // Create a unique file name
//       const fileExt = file.name.split('.').pop()
//       const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
//       const filePath = `${fileName}` // Simplified path

//       console.log('Attempting upload to:', filePath)

//       // First, check if we can access the bucket
//       const { data: bucketData, error: bucketError } = await supabaseClient
//         .storage
//         .getBucket('images')

//       if (bucketError) {
//         console.error('Bucket access error:', bucketError)
//         throw new Error('Unable to access storage bucket')
//       }

//       console.log('Bucket access confirmed:', bucketData)

//       // Attempt the upload
//       const { error: uploadError, data: uploadData } = await supabaseClient
//         .storage
//         .from('images')
//         .upload(filePath, file, {
//           cacheControl: '3600',
//           upsert: false
//         })

//       if (uploadError) {
//         console.error('Upload error details:', uploadError)
//         throw new Error(uploadError.message || 'Failed to upload file')
//       }

//       console.log('Upload successful:', uploadData)

//       // Get public URL
//       const { data: { publicUrl } } = supabaseClient
//         .storage
//         .from('images')
//         .getPublicUrl(filePath)

//       console.log('Generated public URL:', publicUrl)

//       setPreview(publicUrl)
//       onUploadComplete(publicUrl)
//     } catch (err) {
//       console.error('Full error details:', err)
//       setError(err instanceof Error ? err.message : 'Failed to upload image. Please try again.')
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <div className="space-y-4">
//       {error && (
//         <div className="bg-red-500/10 text-red-500 p-4 rounded">
//           {error}
//         </div>
//       )}

//       <label className="block">
//         <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 cursor-pointer bg-gray-800">
//           <div className="space-y-2 text-center">
//             {isUploading ? (
//               <div className="flex items-center gap-2 text-gray-300">
//                 <Loader2 className="animate-spin" />
//                 <span>Uploading...</span>
//               </div>
//             ) : (
//               <>
//                 <Upload className="mx-auto text-gray-400" />
//                 <div className="text-gray-400">Click to upload image</div>
//                 <div className="text-gray-500 text-sm">Max size: 5MB</div>
//               </>
//             )}
//           </div>
//         </div>
//         <input
//           type="file"
//           className="hidden"
//           accept="image/*"
//           onChange={handleFileChange}
//           disabled={isUploading}
//         />
//       </label>

//       {preview && (
//         <div className="mt-4 relative aspect-video w-full max-w-sm">
//           <Image
//             src={preview}
//             alt="Upload preview"
//             fill
//             className="rounded border border-gray-700 object-cover"
//             sizes="(max-width: 640px) 100vw, 384px"
//           />
//         </div>
//       )}
//     </div>
//   )
// }
// // 'use client'
// // import { useState } from 'react'
// // import { supabaseClient } from '@/lib/auth'
// // import { Upload, Loader2 } from 'lucide-react'
// // import Image from 'next/image'

// // type ImageUploadProps = {
// //   onUploadComplete: (url: string) => void
// //   existingUrl?: string
// // }

// // export function ImageUpload({ onUploadComplete, existingUrl }: ImageUploadProps) {
// //   const [isUploading, setIsUploading] = useState(false)
// //   const [preview, setPreview] = useState<string | null>(existingUrl || null)
// //   const [error, setError] = useState<string | null>(null)

// //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0]
// //     if (!file) return

// //     console.log('Selected file:', file)

// //     // Validate file type
// //     if (!file.type.startsWith('image/')) {
// //       setError('Please select an image file')
// //       return
// //     }

// //     // Validate file size (max 5MB)
// //     if (file.size > 5 * 1024 * 1024) {
// //       setError('Image must be less than 5MB')
// //       return
// //     }

// //     setIsUploading(true)
// //     setError(null)

// //     try {
// //       // Create a unique file name
// //       const fileExt = file.name.split('.').pop()
// //       const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
// //       const filePath = `blog-images/${fileName}`

// //       console.log('Uploading to path:', filePath)

// //       // Upload to Supabase Storage
// //       const { error: uploadError, data } = await supabaseClient.storage
// //         .from('images')
// //         .upload(filePath, file, {
// //           cacheControl: '3600',
// //           upsert: false
// //         })

// //       if (uploadError) {
// //         console.error('Upload error:', uploadError)
// //         throw uploadError
// //       }

// //       console.log('Upload successful:', data)

// //       // Get public URL
// //       const { data: { publicUrl } } = supabaseClient.storage
// //         .from('images')
// //         .getPublicUrl(filePath)

// //       console.log('Public URL:', publicUrl)

// //       setPreview(publicUrl)
// //       onUploadComplete(publicUrl)
// //     } catch (err) {
// //       console.error('Upload error:', err)
// //       setError('Failed to upload image. Please try again.')
// //     } finally {
// //       setIsUploading(false)
// //     }
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {error && (
// //         <div className="text-red-500 text-sm">{error}</div>
// //       )}

// //       <label className="block">
// //         <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 cursor-pointer bg-gray-800">
// //           <div className="space-y-2 text-center">
// //             {isUploading ? (
// //               <div className="flex items-center gap-2">
// //                 <Loader2 className="animate-spin" />
// //                 <span>Uploading...</span>
// //               </div>
// //             ) : (
// //               <>
// //                 <Upload className="mx-auto text-gray-400" />
// //                 <div className="text-gray-400">Click to upload image</div>
// //                 <div className="text-gray-500 text-sm">Max size: 5MB</div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //         <input
// //           type="file"
// //           className="hidden"
// //           accept="image/*"
// //           onChange={handleFileChange}
// //           disabled={isUploading}
// //         />
// //       </label>

// //       {preview && (
// //         <div className="mt-4 relative aspect-video w-full max-w-sm">
// //           <Image
// //             src={preview}
// //             alt="Upload preview"
// //             fill
// //             className="rounded border border-gray-700 object-cover"
// //             sizes="(max-width: 640px) 100vw, 384px"
// //           />
// //         </div>
// //       )}
// //     </div>
// //   )
// // }
```

# src/components/ImageWithFallback.tsx

```tsx
// src/components/ImageWithFallback.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  priority = false
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 ${className}`}>
        <ImageOff className="text-gray-600" size={48} />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
```

# src/components/MarkdownContent.tsx

```tsx
// src/components/MarkdownContent.tsx
'use client'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Prism from 'prismjs'
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-css"
import "prismjs/components/prism-python"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"

export function MarkdownContent({ content }: { content: string }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [content])

  return (
    <div className="prose prose-invert prose-lg max-w-none
      prose-h1:text-4xl prose-h1:font-serif prose-h1:text-gray-100 prose-h1:mb-6
      prose-h2:text-3xl prose-h2:font-serif prose-h2:text-gray-200 prose-h2:mb-4
      prose-h3:text-2xl prose-h3:font-serif prose-h3:text-gray-200 prose-h3:mb-3
      prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-200
      prose-ul:text-gray-300
      prose-ol:text-gray-300
      prose-pre:bg-[#2d2d2d] prose-pre:text-gray-200
      prose-code:bg-[#2d2d2d] prose-code:text-gray-200
      prose-blockquote:border-gray-500 prose-blockquote:text-gray-300"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''

            if (!inline && language) {
              return (
                <pre className={`language-${language}`}>
                  <code className={`language-${language}`} {...props}>
                    {String(children).replace(/\n$/, '')}
                  </code>
                </pre>
              )
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// // src/components/MarkdownContent.tsx
// 'use client'
// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'

// export function MarkdownContent({ content }: { content: string }) {
//   return (
//     <div className="prose prose-invert prose-lg max-w-none
//       prose-h1:text-4xl prose-h1:font-serif prose-h1:text-gray-100 prose-h1:mb-6
//       prose-h2:text-3xl prose-h2:font-serif prose-h2:text-gray-200 prose-h2:mb-4
//       prose-h3:text-2xl prose-h3:font-serif prose-h3:text-gray-200 prose-h3:mb-3
//       prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4
//       prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
//       prose-strong:text-gray-200
//       prose-ul:text-gray-300
//       prose-ol:text-gray-300
//       prose-code:bg-gray-800 prose-code:text-gray-200
//       prose-pre:bg-gray-800 prose-pre:text-gray-200
//       prose-blockquote:border-gray-500 prose-blockquote:text-gray-300"
//     >
//       <ReactMarkdown remarkPlugins={[remarkGfm]}>
//         {content}
//       </ReactMarkdown>
//     </div>
//   )
// }

// // // src/components/MarkdownContent.tsx
// // 'use client'
// // import ReactMarkdown from 'react-markdown'
// // import remarkGfm from 'remark-gfm'

// // export function MarkdownContent({ content }: { content: string }) {
// //   return (
// //     <div className="prose prose-lg prose-slate max-w-none
// //       prose-headings:font-bold
// //       prose-h1:text-3xl prose-h1:mb-4
// //       prose-h2:text-2xl prose-h2:mb-3
// //       prose-h3:text-xl prose-h3:mb-2
// //       prose-p:mb-4
// //       prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
// //       prose-strong:text-gray-900
// //       prose-ul:list-disc prose-ul:pl-4
// //       prose-ol:list-decimal prose-ol:pl-4
// //       prose-li:mb-1
// //       prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
// //       prose-pre:bg-gray-100 prose-pre:p-4
// //       prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
// //       prose-img:rounded-lg prose-img:shadow-md"
// //     >
// //       <ReactMarkdown remarkPlugins={[remarkGfm]}>
// //         {content}
// //       </ReactMarkdown>
// //     </div>
// //   )
// // }

// // // // src/components/MarkdownContent.tsx
// // // 'use client'
// // // import ReactMarkdown from 'react-markdown'
// // // import remarkGfm from 'remark-gfm'

// // // export function MarkdownContent({ content }: { content: string }) {
// // //   console.log('Markdown content:', content)
// // //   return (
// // //     <div className="prose prose-lg max-w-none">
// // //       <ReactMarkdown
// // //         remarkPlugins={[remarkGfm]}
// // //         components={{
// // //           h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
// // //           h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3" {...props} />,
// // //           p: ({node, ...props}) => <p className="my-2" {...props} />,
// // //         }}
// // //       >
// // //         {content}
// // //       </ReactMarkdown>
// // //     </div>
// // //   )
// // // }



// // // // // First install:
// // // // // npm install react-markdown remark-gfm

// // // // // src/components/MarkdownContent.tsx
// // // // 'use client'
// // // // import ReactMarkdown from 'react-markdown'
// // // // import remarkGfm from 'remark-gfm'

// // // // export function MarkdownContent({ content }: { content: string }) {
// // // //   return (
// // // //     <ReactMarkdown
// // // //       remarkPlugins={[remarkGfm]}
// // // //       className="prose prose-blue max-w-none"
// // // //       components={{
// // // //         // Custom components for markdown elements
// // // //         h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
// // // //         h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3" {...props} />,
// // // //         h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2" {...props} />,
// // // //         a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
// // // //         code: ({node, inline, ...props}) =>
// // // //           inline ?
// // // //             <code className="bg-gray-100 rounded px-1" {...props} /> :
// // // //             <code className="block bg-gray-100 p-4 rounded my-2" {...props} />
// // // //       }}
// // // //     />
// // // //   )
// // // // }


```

# src/components/Navbar.tsx

```tsx
// src/components/Navbar.tsx
'use client'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { supabaseClient } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <Link href="/" className="flex items-center font-bold text-xl">
              My Blog
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/blog" className="hover:text-gray-600">Blog</Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link href="/" className="flex items-center font-bold text-xl">
            My Blog
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/blog" className="hover:text-gray-600">Blog</Link>
            {isAuthenticated ? (
              <>
                <Link href="/blog/new" className="hover:text-gray-600">New Post</Link>
                <button
                  onClick={() => supabaseClient.auth.signOut()}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => supabaseClient.auth.signInWithOAuth({
                  provider: 'github',
                  options: { redirectTo: `${window.location.origin}/auth/callback` }
                })}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

# src/components/PostCard.tsx

```tsx
// src/components/PostCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getCategoryName, getCategoryTextColor, CategoryId } from '@/data/categories';

type PostCardProps = {
  post: {
    id: string;
    title: string;
    excerpt: string;
    category: CategoryId;
    date: string;
    slug: string;
    cover_image?: string;
  };
};

export function PostCard({ post }: PostCardProps) {
  const categoryTextColor = getCategoryTextColor(post.category);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[16/9] relative bg-gray-900">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800" />
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm ${categoryTextColor}`}>
            {getCategoryName(post.category)}
          </span>
          <span className="text-sm text-gray-400">{post.date}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
```

# src/components/PostForm.tsx

```tsx
// src/components/PostForm.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/auth'
import { useAuth } from '@/hooks/useAuth'
import { ImageUpload } from '@/components/ImageUpload'
import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
import { Loader2 } from 'lucide-react'

export function PostForm() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    cover_image: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)
    setError('')

    try {
      const slug = formData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

      const { error: postError } = await supabaseClient
        .from('posts')
        .insert([{
          ...formData,
          slug,
          published: true,
          author_id: user.id
        }])

      if (postError) throw postError

      router.push('/blog')
      router.refresh()
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Image</label>
        <ImageUpload
          onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Excerpt</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
          className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <RichMarkdownEditor
            initialContent={formData.content}
            onChange={(content) => setFormData(prev => ({...prev, content}))}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
      >
        {isSubmitting && <Loader2 className="animate-spin" size={16} />}
        {isSubmitting ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  )
}
// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { supabaseClient } from '@/lib/auth'
// import { useAuth } from '@/hooks/useAuth'
// import { ImageUpload } from '@/components/ImageUpload'
// import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
// import { Loader2 } from 'lucide-react'

// export function PostForm() {
//   const router = useRouter()
//   const { user } = useAuth()
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     excerpt: '',
//     cover_image: ''
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!user) return

//     setIsSubmitting(true)
//     setError('')

//     try {
//       // First, ensure profile exists
//       const { error: profileError } = await supabaseClient
//         .from('profiles')
//         .insert([{
//           id: user.id,
//           username: user.email?.split('@')[0] || 'anonymous'
//         }])
//         .select()
//         .single()

//       // Ignore if profile already exists
//       if (profileError && !profileError.message.includes('duplicate')) {
//         throw profileError
//       }

//       // Create post
//       const slug = formData.title
//         .toLowerCase()
//         .trim()
//         .replace(/[^a-z0-9]+/g, '-')
//         .replace(/(^-|-$)+/g, '')

//       const { error: postError } = await supabaseClient
//         .from('posts')
//         .insert([{
//           ...formData,
//           slug,
//           published: true,
//           author_id: user.id
//         }])

//       if (postError) throw postError

//       router.push('/blog')
//       router.refresh()
//     } catch (err) {
//       console.error('Error:', err)
//       setError(err instanceof Error ? err.message : 'Failed to create post')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {error && (
//         <div className="bg-red-500/10 text-red-500 p-4 rounded">
//           {error}
//         </div>
//       )}

//       <div>
//         <label className="block text-sm font-medium mb-2">Title</label>
//         <input
//           type="text"
//           value={formData.title}
//           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
//           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Cover Image</label>
//         <ImageUpload
//           onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Excerpt</label>
//         <textarea
//           value={formData.excerpt}
//           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
//           className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-2">Content</label>
//         <RichMarkdownEditor
//           initialContent={formData.content}
//           onChange={(content) => setFormData(prev => ({...prev, content}))}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
//       >
//         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
//         {isSubmitting ? 'Creating...' : 'Create Post'}
//       </button>
//     </form>
//   )
// }

// // // src/components/PostForm.tsx
// // "use client";
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { supabaseClient } from "@/lib/auth";
// // import { useAuth } from "@/hooks/useAuth";

// // export function PostForm() {
// // 	const router = useRouter();
// // 	const { user } = useAuth();
// // 	const [formData, setFormData] = useState({
// // 		title: "",
// // 		content: "",
// // 		excerpt: "",
// // 		category: "tech", // Add this line
// // 	});
// // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // 	const [error, setError] = useState("");

// // 	const handleSubmit = async (e: React.FormEvent) => {
// // 		e.preventDefault();
// // 		if (!user) return;

// // 		setIsSubmitting(true);
// // 		setError("");

// // 		try {
// // 			// First, ensure profile exists
// // 			const { error: profileError } = await supabaseClient
// // 				.from("profiles")
// // 				.insert([
// // 					{
// // 						id: user.id,
// // 						username: user.email?.split("@")[0] || "anonymous",
// // 					},
// // 				])
// // 				.select()
// // 				.single();

// // 			// Ignore if profile already exists
// // 			if (profileError && !profileError.message.includes("duplicate")) {
// // 				throw profileError;
// // 			}

// // 			// Then create post
// // 			const slug = formData.title
// // 				.toLowerCase()
// // 				.trim()
// // 				.replace(/[^a-z0-9]+/g, "-")
// // 				.replace(/(^-|-$)+/g, "");

// // 			const { error: postError } = await supabaseClient.from("posts").insert([
// // 				{
// // 					...formData,
// // 					slug,
// // 					published: true,
// // 					author_id: user.id,
// // 				},
// // 			]);

// // 			if (postError) throw postError;

// // 			router.push("/blog");
// // 			router.refresh();
// // 		} catch (err) {
// // 			console.error("Error:", err);
// // 			setError(err instanceof Error ? err.message : "Failed to create post");
// // 		} finally {
// // 			setIsSubmitting(false);
// // 		}
// // 	};

// // 	return (
// // 		<form onSubmit={handleSubmit} className="space-y-6">
// // 			{error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}
// // 			<div>
// // 				<label className="block text-sm font-medium mb-2">Title</label>
// // 				<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded bg-white text-gray-900" required />
// // 			</div>
// // 			<div>
// // 				<label className="block text-sm font-medium mb-2">Excerpt</label>
// // 				<textarea value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-2 border rounded h-24 bg-white text-gray-900" />
// // 			</div>
// // 			<div>
// // 				<label className="block text-sm font-medium mb-2">Content</label>
// // 				<textarea value={formData.content} onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} className="w-full p-2 border rounded h-64 bg-white text-gray-900" required />
// // 			</div>
// // 			{/* // Add this to your form JSX, before the submit button */}
// // 			<div>
// // 				<label className="block text-sm font-medium mb-2">Category</label>
// // 				<select value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} className="w-full p-2 border rounded bg-white text-gray-900" required>
// // 					<option value="tech">Tech Articles</option>
// // 					<option value="food">Fusion Food</option>
// // 					<option value="media">Other Media</option>
// // 					<option value="personal">Personal</option>
// // 				</select>
// // 			</div>
// // 			<button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
// // 				{isSubmitting ? "Creating..." : "Create Post"}
// // 			</button>
// // 		</form>
// // 	);
// // }

// // // 'use client'
// // // import { useState } from 'react'
// // // import { useRouter } from 'next/navigation'
// // // import { supabaseClient } from '@/lib/auth'
// // // import { useAuth } from '@/hooks/useAuth'

// // // export function PostForm() {
// // //   const router = useRouter()
// // //   const { user } = useAuth()
// // //   const [formData, setFormData] = useState({
// // //     title: '',
// // //     content: '',
// // //     excerpt: ''
// // //   })
// // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // //   const [error, setError] = useState('')

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     if (!user) {
// // //       setError('User not authenticated')
// // //       return
// // //     }

// // //     setIsSubmitting(true)
// // //     setError('')

// // //     try {
// // //       const slug = formData.title
// // //         .toLowerCase()
// // //         .trim()
// // //         .replace(/[^a-z0-9]+/g, '-')
// // //         .replace(/(^-|-$)+/g, '')

// // //       console.log('Creating post:', {
// // //         ...formData,
// // //         slug,
// // //         published: true,
// // //         author_id: user.id
// // //       })

// // //       const { data, error: insertError } = await supabaseClient
// // //         .from('posts')
// // //         .insert([{
// // //           ...formData,
// // //           slug,
// // //           published: true,
// // //           author_id: user.id
// // //         }])
// // //         .select()
// // //         .single()

// // //       if (insertError) {
// // //         throw insertError
// // //       }

// // //       console.log('Post created:', data)
// // //       router.push('/blog')
// // //       router.refresh()
// // //     } catch (err) {
// // //       console.error('Error details:', err)
// // //       setError(err instanceof Error ? err.message : 'Failed to create post')
// // //     } finally {
// // //       setIsSubmitting(false)
// // //     }
// // //   }

// // //   return (
// // //     <form onSubmit={handleSubmit} className="space-y-6">
// // //       {error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Title</label>
// // //         <input
// // //           type="text"
// // //           value={formData.title}
// // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // //           className="w-full p-2 border rounded bg-white text-gray-900"
// // //           required
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// // //         <textarea
// // //           value={formData.excerpt}
// // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // //           className="w-full p-2 border rounded h-24 bg-white text-gray-900"
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Content</label>
// // //         <textarea
// // //           value={formData.content}
// // //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// // //           className="w-full p-2 border rounded h-64 bg-white text-gray-900"
// // //           required
// // //         />
// // //       </div>

// // //       <button
// // //         type="submit"
// // //         disabled={isSubmitting}
// // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // //       >
// // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // //       </button>
// // //     </form>
// // //   )
// // // }

// // // // // src/components/PostForm.tsx
// // // // 'use client'
// // // // import { useState } from 'react'
// // // // import { useRouter } from 'next/navigation'
// // // // import { supabaseClient } from '@/lib/auth'
// // // // import { useAuth } from '@/hooks/useAuth'

// // // // export function PostForm() {
// // // //   const router = useRouter()
// // // //   const { user } = useAuth()
// // // //   const [formData, setFormData] = useState({
// // // //     title: '',
// // // //     content: '',
// // // //     excerpt: ''
// // // //   })
// // // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // //   const [error, setError] = useState('')

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     if (!user) return

// // // //     setIsSubmitting(true)
// // // //     setError('')

// // // //     try {
// // // //       const slug = formData.title
// // // //         .toLowerCase()
// // // //         .replace(/[^a-z0-9]+/g, '-')
// // // //         .replace(/(^-|-$)+/g, '')

// // // //       await supabaseClient.from('posts').insert([{
// // // //         ...formData,
// // // //         slug,
// // // //         published: true,
// // // //         author_id: user.id
// // // //       }])

// // // //       router.push('/blog')
// // // //       router.refresh()
// // // //     } catch (err) {
// // // //       setError('Failed to create post')
// // // //       console.error(err)
// // // //     } finally {
// // // //       setIsSubmitting(false)
// // // //     }
// // // //   }

// // // //   return (
// // // //     <form onSubmit={handleSubmit} className="space-y-6">
// // // //       {error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Title</label>
// // // //         <input
// // // //           type="text"
// // // //           value={formData.title}
// // // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // // //           className="w-full p-2 border rounded"
// // // //           required
// // // //         />
// // // //       </div>

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// // // //         <textarea
// // // //           value={formData.excerpt}
// // // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // // //           className="w-full p-2 border rounded h-24"
// // // //         />
// // // //       </div>

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Content</label>
// // // //         <textarea
// // // //           value={formData.content}
// // // //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// // // //           className="w-full p-2 border rounded h-64"
// // // //           required
// // // //         />
// // // //       </div>

// // // //       <button
// // // //         type="submit"
// // // //         disabled={isSubmitting}
// // // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // //       >
// // // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // // //       </button>
// // // //     </form>
// // // //   )
// // // // }

// // // // // // src/components/PostForm.tsx - Updated version
// // // // // "use client";
// // // // // import { useState } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { blogApi } from "@/lib/supabase";
// // // // // import { useAuth } from "@/hooks/useAuth";

// // // // // export function PostForm() {
// // // // // 	const { user, isAuthenticated } = useAuth();
// // // // // 	const router = useRouter();
// // // // // 	const [formData, setFormData] = useState({
// // // // // 		title: "",
// // // // // 		content: "",
// // // // // 		excerpt: "",
// // // // // 	});
// // // // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // 	const [error, setError] = useState("");

// // // // // 	if (!isAuthenticated) {
// // // // // 		return <div>Please sign in to create posts.</div>;
// // // // // 	}

// // // // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // // // 		e.preventDefault();
// // // // // 		setIsSubmitting(true);
// // // // // 		setError("");

// // // // // 		try {
// // // // // 			const slug = formData.title
// // // // // 				.toLowerCase()
// // // // // 				.replace(/[^a-z0-9]+/g, "-")
// // // // // 				.replace(/(^-|-$)+/g, "");

// // // // // 			await blogApi.createPost({
// // // // // 				...formData,
// // // // // 				slug,
// // // // // 				published: false,
// // // // // 				author_id: user.id,
// // // // // 			});

// // // // // 			router.push("/blog");
// // // // // 			router.refresh();
// // // // // 		} catch (err) {
// // // // // 			setError("Failed to create post");
// // // // // 			console.error(err);
// // // // // 		} finally {
// // // // // 			setIsSubmitting(false);
// // // // // 		}
// // // // // 	};

// // // // // 	return (
// // // // // 		<form onSubmit={handleSubmit} className="space-y-6">
// // // // // 			{error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}

// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Title</label>
// // // // // 				<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded" required />
// // // // // 			</div>

// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Excerpt (optional)</label>
// // // // // 				<textarea value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-2 border rounded h-24" />
// // // // // 			</div>

// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Content</label>
// // // // // 				<textarea value={formData.content} onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} className="w-full p-2 border rounded h-64" required />
// // // // // 			</div>

// // // // // 			<button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
// // // // // 				{isSubmitting ? "Creating..." : "Create Post"}
// // // // // 			</button>
// // // // // 		</form>
// // // // // 	);
// // // // // }

// // // // // // // src/components/PostForm.tsx
// // // // // // 'use client'

// // // // // // import { useState } from 'react'
// // // // // // import { blogApi } from '@/lib/supabase'
// // // // // // import { useRouter } from 'next/navigation'

// // // // // // export function PostForm() {
// // // // // //   const router = useRouter()
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     title: '',
// // // // // //     content: '',
// // // // // //     excerpt: ''
// // // // // //   })
// // // // // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // // // //   const [error, setError] = useState('')

// // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // //     e.preventDefault()
// // // // // //     setIsSubmitting(true)
// // // // // //     setError('')

// // // // // //     try {
// // // // // //       const slug = formData.title
// // // // // //         .toLowerCase()
// // // // // //         .replace(/[^a-z0-9]+/g, '-')
// // // // // //         .replace(/(^-|-$)+/g, '')

// // // // // //       await blogApi.createPost({
// // // // // //         ...formData,
// // // // // //         slug,
// // // // // //         published: false,
// // // // // //         author_id: 'placeholder-id' // Replace with actual auth user ID
// // // // // //       })

// // // // // //       router.push('/blog')
// // // // // //       router.refresh()
// // // // // //     } catch (err) {
// // // // // //       setError('Failed to create post')
// // // // // //       console.error(err)
// // // // // //     } finally {
// // // // // //       setIsSubmitting(false)
// // // // // //     }
// // // // // //   }

// // // // // //   return (
// // // // // //     <form onSubmit={handleSubmit} className="space-y-6">
// // // // // //       {error && (
// // // // // //         <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>
// // // // // //       )}

// // // // // //       <div>
// // // // // //         <label className="block text-sm font-medium mb-2">Title</label>
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           value={formData.title}
// // // // // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // // // // //           className="w-full p-2 border rounded"
// // // // // //           required
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div>
// // // // // //         <label className="block text-sm font-medium mb-2">Excerpt (optional)</label>
// // // // // //         <textarea
// // // // // //           value={formData.excerpt}
// // // // // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // // // // //           className="w-full p-2 border rounded h-24"
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div>
// // // // // //         <label className="block text-sm font-medium mb-2">Content</label>
// // // // // //         <textarea
// // // // // //           value={formData.content}
// // // // // //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// // // // // //           className="w-full p-2 border rounded h-64"
// // // // // //           required
// // // // // //         />
// // // // // //       </div>

// // // // // //       <button
// // // // // //         type="submit"
// // // // // //         disabled={isSubmitting}
// // // // // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // // // //       >
// // // // // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // // // // //       </button>
// // // // // //     </form>
// // // // // //   )
// // // // // // }

```

# src/components/Reactions.tsx

```tsx
// src/components/Reactions.tsx
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabaseClient } from '@/lib/auth'
import { Heart, ThumbsUp, ThumbsDown, Star, Coffee } from 'lucide-react'

const REACTIONS = [
  { type: 'like', icon: ThumbsUp },
  { type: 'love', icon: Heart },
  { type: 'star', icon: Star },
  { type: 'coffee', icon: Coffee },
] as const

export function Reactions({ postId }: { postId: string }) {
  const { user } = useAuth()
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [userReaction, setUserReaction] = useState<string | null>(null)

  useEffect(() => {
    loadReactions()
    if (user) loadUserReaction()
  }, [postId, user])

  const loadReactions = async () => {
    const { data } = await supabaseClient
      .from('reactions')
      .select('type')
      .eq('post_id', postId)

    const newCounts: Record<string, number> = {}
    data?.forEach(reaction => {
      newCounts[reaction.type] = (newCounts[reaction.type] || 0) + 1
    })
    setCounts(newCounts)
  }

  const loadUserReaction = async () => {
    if (!user) return
    const { data } = await supabaseClient
      .from('reactions')
      .select('type')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single()

    setUserReaction(data?.type || null)
  }

  const handleReaction = async (type: string) => {
    if (!user) return

    try {
      if (userReaction === type) {
        await supabaseClient
          .from('reactions')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)
        setUserReaction(null)
      } else {
        await supabaseClient
          .from('reactions')
          .upsert({
            post_id: postId,
            user_id: user.id,
            type
          })
        setUserReaction(type)
      }
      loadReactions()
    } catch (error) {
      console.error('Error updating reaction:', error)
    }
  }

  return (
    <div className="flex gap-4 items-center">
      {REACTIONS.map(({ type, icon: Icon }) => (
        <button
          key={type}
          onClick={() => handleReaction(type)}
          className={`flex items-center gap-1 p-2 rounded-full transition-colors
            ${userReaction === type
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        >
          <Icon size={20} />
          <span className="text-sm">{counts[type] || 0}</span>
        </button>
      ))}
    </div>
  )
}
```

# src/components/RichMarkdownEditor.tsx

```tsx
// src/components/RichMarkdownEditor.tsx
'use client'
import { useState, useRef } from 'react'
import { supabaseClient } from '@/lib/auth'
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  Bold,
  Italic,
  Heading,
  List,
  ListOrdered,
  Link as LinkIcon,
  Quote,
  Code,
  Minus,
  AlertCircle
} from 'lucide-react'

interface EditorProps {
  initialContent: string
  onChange: (content: string) => void
}

type FormatAction = {
  icon: typeof Bold
  label: string
  prefix: string
  suffix: string
  block?: boolean
}

export function RichMarkdownEditor({ initialContent, onChange }: EditorProps) {
  const [content, setContent] = useState(initialContent)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatActions: FormatAction[] = [
    { icon: Bold, label: 'Bold', prefix: '**', suffix: '**' },
    { icon: Italic, label: 'Italic', prefix: '_', suffix: '_' },
    { icon: Heading, label: 'Heading', prefix: '## ', suffix: '', block: true },
    { icon: List, label: 'Bullet List', prefix: '- ', suffix: '', block: true },
    { icon: ListOrdered, label: 'Numbered List', prefix: '1. ', suffix: '', block: true },
    { icon: LinkIcon, label: 'Link', prefix: '[', suffix: '](url)' },
    { icon: Quote, label: 'Quote', prefix: '> ', suffix: '', block: true },
    { icon: Code, label: 'Code', prefix: '\`\`\`\n', suffix: '\n\`\`\`', block: true },
    { icon: Minus, label: 'Horizontal Rule', prefix: '\n---\n', suffix: '', block: true }
  ]

  const insertTextAtCursor = (prefix: string, suffix: string = '', block: boolean = false) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let newText = ''
    if (block) {
      // For block-level elements, ensure we're starting on a new line
      const beforeSelection = content.substring(0, start)
      const needsNewLine = beforeSelection.length > 0 && !beforeSelection.endsWith('\n')
      newText = (needsNewLine ? '\n' : '') + prefix + selectedText + suffix
    } else {
      newText = prefix + selectedText + suffix
    }

    const newContent =
      content.substring(0, start) +
      newText +
      content.substring(end)

    setContent(newContent)
    onChange(newContent)

    // Reset cursor position
    const newCursorPos = block ?
      start + prefix.length + selectedText.length + suffix.length :
      start + prefix.length + (selectedText.length || suffix.length)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    setIsUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { error: uploadError, data } = await supabaseClient
        .storage
        .from('images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(fileName)

      insertTextAtCursor(`\n![${file.name}](${publicUrl})\n`)
    } catch (err) {
      console.error('Upload error:', err)
      alert('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="relative">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-700 bg-gray-800">
        {formatActions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => insertTextAtCursor(action.prefix, action.suffix, action.block)}
            className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded"
            title={action.label}
          >
            <action.icon size={18} />
          </button>
        ))}
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded"
          disabled={isUploading}
          title="Upload Image"
        >
          {isUploading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <ImageIcon size={18} />
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowHelp(prev => !prev)}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded ml-auto"
          title="Markdown Help"
        >
          <AlertCircle size={18} />
        </button>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="absolute right-0 top-12 w-64 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
          <h3 className="font-medium mb-2">Markdown Shortcuts</h3>
          <div className="space-y-1 text-sm text-gray-300">
            <p>**bold**</p>
            <p>_italic_</p>
            <p># Heading 1</p>
            <p>## Heading 2</p>
            <p>- Bullet list</p>
            <p>1. Numbered list</p>
            <p>[Link](url)</p>
            <p>![Image](url)</p>
            <p>&gt; Quote</p>
            <p>`code`</p>
          </div>
        </div>
      )}

      {/* Editor Area */}
      <div
        className={`relative ${dragActive ? 'bg-blue-500/10' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          const file = e.dataTransfer.files[0]
          if (file) handleImageUpload(file)
        }}
      >
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            onChange(e.target.value)
          }}
          onPaste={(e) => {
            const items = e.clipboardData.items
            for (const item of items) {
              if (item.type.startsWith('image/')) {
                e.preventDefault()
                const file = item.getAsFile()
                if (file) handleImageUpload(file)
                break
              }
            }
          }}
          className="w-full min-h-[300px] p-4 bg-gray-800 text-gray-100 font-mono text-sm resize-y focus:outline-none"
          placeholder="Write your content here... You can drag & drop images or paste them directly!"
        />
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleImageUpload(file)
        }}
      />
    </div>
  )
}
// 'use client'
// import { useState, useRef } from 'react'
// import { supabaseClient } from '@/lib/auth'
// import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react'
// import Image from 'next/image'

// interface EditorProps {
//   initialContent: string
//   onChange: (content: string) => void
// }

// export function RichMarkdownEditor({ initialContent, onChange }: EditorProps) {
//   const [content, setContent] = useState(initialContent)
//   const [isUploading, setIsUploading] = useState(false)
//   const [dragActive, setDragActive] = useState(false)
//   const textareaRef = useRef<HTMLTextAreaElement>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const insertTextAtCursor = (text: string) => {
//     const textarea = textareaRef.current
//     if (!textarea) return

//     const start = textarea.selectionStart
//     const end = textarea.selectionEnd
//     const newContent = content.substring(0, start) + text + content.substring(end)

//     setContent(newContent)
//     onChange(newContent)

//     // Reset cursor position
//     setTimeout(() => {
//       textarea.focus()
//       textarea.setSelectionRange(start + text.length, start + text.length)
//     }, 0)
//   }

//   const handleImageUpload = async (file: File) => {
//     if (!file.type.startsWith('image/')) {
//       alert('Please select an image file')
//       return
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       alert('Image must be less than 5MB')
//       return
//     }

//     setIsUploading(true)

//     try {
//       const fileExt = file.name.split('.').pop()
//       const fileName = `${Date.now()}.${fileExt}`

//       const { error: uploadError, data } = await supabaseClient
//         .storage
//         .from('images')
//         .upload(fileName, file, {
//           cacheControl: '3600',
//           upsert: false
//         })

//       if (uploadError) throw uploadError

//       const { data: { publicUrl } } = supabaseClient
//         .storage
//         .from('images')
//         .getPublicUrl(fileName)

//       insertTextAtCursor(`\n![${file.name}](${publicUrl})\n`)
//     } catch (err) {
//       console.error('Upload error:', err)
//       alert('Failed to upload image')
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <div className="relative">
//       {/* Toolbar */}
//       <div className="flex items-center gap-2 p-2 border-b border-gray-700">
//         <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded"
//           disabled={isUploading}
//         >
//           {isUploading ? (
//             <Loader2 className="animate-spin" size={16} />
//           ) : (
//             <ImageIcon size={16} />
//           )}
//           Add Image
//         </button>
//       </div>

//       {/* Editor Area */}
//       <div
//         className={`relative ${dragActive ? 'bg-blue-500/10' : ''}`}
//         onDragOver={(e) => {
//           e.preventDefault()
//           setDragActive(true)
//         }}
//         onDragLeave={() => setDragActive(false)}
//         onDrop={(e) => {
//           e.preventDefault()
//           setDragActive(false)
//           const file = e.dataTransfer.files[0]
//           if (file) handleImageUpload(file)
//         }}
//       >
//         <textarea
//           ref={textareaRef}
//           value={content}
//           onChange={(e) => {
//             setContent(e.target.value)
//             onChange(e.target.value)
//           }}
//           onPaste={(e) => {
//             const items = e.clipboardData.items
//             for (const item of items) {
//               if (item.type.startsWith('image/')) {
//                 e.preventDefault()
//                 const file = item.getAsFile()
//                 if (file) handleImageUpload(file)
//                 break
//               }
//             }
//           }}
//           className="w-full min-h-[300px] p-4 bg-gray-800 text-gray-100 font-mono text-sm resize-y focus:outline-none"
//           placeholder="Write your content here... You can drag & drop images or paste them directly!"
//         />
//       </div>

//       {/* Hidden file input */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         className="hidden"
//         accept="image/*"
//         onChange={(e) => {
//           const file = e.target.files?.[0]
//           if (file) handleImageUpload(file)
//         }}
//       />
//     </div>
//   )
// }
// // 'use client'
// // import { useState, useRef } from 'react'
// // import { supabaseClient } from '@/lib/auth'
// // import { Upload, Image as ImageIcon, X, Plus } from 'lucide-react'
// // import Image from 'next/image'

// // interface EditorProps {
// //   initialContent: string
// //   onChange: (content: string) => void
// // }

// // export function RichMarkdownEditor({ initialContent, onChange }: EditorProps) {
// //   const [content, setContent] = useState(initialContent)
// //   const [isUploading, setIsUploading] = useState(false)
// //   const [dragActive, setDragActive] = useState(false)
// //   const textareaRef = useRef<HTMLTextAreaElement>(null)
// //   const fileInputRef = useRef<HTMLInputElement>(null)

// //   const insertTextAtCursor = (text: string) => {
// //     const textarea = textareaRef.current
// //     if (!textarea) return

// //     const start = textarea.selectionStart
// //     const end = textarea.selectionEnd

// //     const newContent =
// //       content.substring(0, start) +
// //       text +
// //       content.substring(end)

// //     setContent(newContent)
// //     onChange(newContent)

// //     // Reset cursor position
// //     setTimeout(() => {
// //       textarea.focus()
// //       textarea.setSelectionRange(
// //         start + text.length,
// //         start + text.length
// //       )
// //     }, 0)
// //   }

// //   const handleImageUpload = async (file: File) => {
// //     if (!file.type.startsWith('image/')) {
// //       alert('Please select an image file')
// //       return
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       alert('Image must be less than 5MB')
// //       return
// //     }

// //     setIsUploading(true)

// //     try {
// //       const fileExt = file.name.split('.').pop()
// //       const fileName = `${Date.now()}.${fileExt}`

// //       const { error: uploadError, data } = await supabaseClient
// //         .storage
// //         .from('images')
// //         .upload(fileName, file, {
// //           cacheControl: '3600',
// //           upsert: false
// //         })

// //       if (uploadError) throw uploadError

// //       const { data: { publicUrl } } = supabaseClient
// //         .storage
// //         .from('images')
// //         .getPublicUrl(fileName)

// //       // Insert markdown image syntax at cursor
// //       insertTextAtCursor(`\n![${file.name}](${publicUrl})\n`)
// //     } catch (err) {
// //       console.error('Upload error:', err)
// //       alert('Failed to upload image')
// //     } finally {
// //       setIsUploading(false)
// //     }
// //   }

// //   const handleDrop = async (e: React.DragEvent) => {
// //     e.preventDefault()
// //     setDragActive(false)

// //     const file = e.dataTransfer.files[0]
// //     if (file) {
// //       await handleImageUpload(file)
// //     }
// //   }

// //   const handlePaste = async (e: React.ClipboardEvent) => {
// //     const items = e.clipboardData.items
// //     for (const item of items) {
// //       if (item.type.startsWith('image/')) {
// //         e.preventDefault()
// //         const file = item.getAsFile()
// //         if (file) {
// //           await handleImageUpload(file)
// //         }
// //         break
// //       }
// //     }
// //   }

// //   return (
// //     <div className="space-y-2">
// //       <div className="flex gap-2">
// //         <button
// //           type="button"
// //           onClick={() => fileInputRef.current?.click()}
// //           className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-md"
// //         >
// //           <ImageIcon size={16} />
// //           Add Image
// //         </button>
// //       </div>

// //       <div
// //         className={`relative border rounded-md ${
// //           dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700'
// //         }`}
// //         onDragOver={(e) => {
// //           e.preventDefault()
// //           setDragActive(true)
// //         }}
// //         onDragLeave={() => setDragActive(false)}
// //         onDrop={handleDrop}
// //       >
// //         <textarea
// //           ref={textareaRef}
// //           value={content}
// //           onChange={(e) => {
// //             setContent(e.target.value)
// //             onChange(e.target.value)
// //           }}
// //           onPaste={handlePaste}
// //           className="w-full h-64 p-4 bg-transparent resize-y font-mono text-sm focus:outline-none"
// //           placeholder="Write your content here... You can drag & drop images or paste them directly!"
// //         />

// //         {isUploading && (
// //           <div className="absolute inset-0 flex items-center justify-center bg-black/50">
// //             <div className="text-white">Uploading image...</div>
// //           </div>
// //         )}

// //         <input
// //           ref={fileInputRef}
// //           type="file"
// //           className="hidden"
// //           accept="image/*"
// //           onChange={(e) => {
// //             const file = e.target.files?.[0]
// //             if (file) handleImageUpload(file)
// //           }}
// //         />
// //       </div>

// //       {dragActive && (
// //         <div className="absolute inset-0 bg-black/20 pointer-events-none" />
// //       )}
// //     </div>
// //   )
// // }
```

# src/components/ThemeLayout.tsx

```tsx
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
```

# src/data/categories.ts

```ts
// src/data/categories.ts
import { Newspaper, Coffee, Laptop, User } from 'lucide-react';

export const categories = [
  {
    id: 'tech',
    name: 'Tech Articles',
    icon: Laptop,
    color: 'bg-blue-500',
    textColor: 'text-blue-400',
    gradient: 'from-blue-500 to-blue-700',
    description: 'Deep dives into software development, web technologies, and the latest tech trends. From coding tutorials to architectural insights.'
  },
  {
    id: 'media',
    name: 'Other Media',
    icon: Newspaper,
    color: 'bg-purple-500',
    textColor: 'text-purple-400',
    gradient: 'from-purple-500 to-purple-700',
    description: 'Exploring movies, books, games, and digital content. Reviews, analyses, and discussions about storytelling across different mediums.'
  },
  {
    id: 'food',
    name: 'Fusion Food',
    icon: Coffee,
    color: 'bg-orange-500',
    textColor: 'text-orange-400',
    gradient: 'from-orange-500 to-orange-700',
    description: 'Creative recipes blending different culinary traditions. Discover unique flavor combinations and cooking techniques from around the world.'
  },
  {
    id: 'personal',
    name: 'Personal',
    icon: User,
    color: 'bg-green-500',
    textColor: 'text-green-400',
    gradient: 'from-green-500 to-green-700',
    description: 'Personal reflections, experiences, and life lessons. A space for sharing thoughts on growth, creativity, and everyday adventures.'
  }
] as const;

export type CategoryId = typeof categories[number]['id'];

export function getCategoryById(id: CategoryId) {
  return categories.find(category => category.id === id);
}

export function getCategoryName(id: CategoryId) {
  return getCategoryById(id)?.name || id;
}

export function getCategoryColor(id: CategoryId) {
  return getCategoryById(id)?.color || 'bg-gray-500';
}

export function getCategoryTextColor(id: CategoryId) {
  return getCategoryById(id)?.textColor || 'text-gray-400';
}
```

# src/hooks/useAuth.ts

```ts
// src/hooks/useAuth.ts
'use client'
import { useEffect, useState } from 'react'
import { supabaseClient } from '@/lib/auth'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, isAuthenticated: !!user }
}
```

# src/lib/auth.ts

```ts
// src/lib/auth.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabaseClient = createClientComponentClient()
```

# src/lib/portfolio-theme.ts

```ts
// src/styles/theme.ts : from Portfolio 2025


export type {
   ThemeMode,
   ColorWithShades,
   ColorShades,
   BorderColors,
   ColorPalette,
   Typography,
   Theme
 } from './types'

 export {
   colors,
   baseTheme,
   lightTheme,
   darkTheme,
   theme,
   getColor,
   getBackgroundColor,
   getTextColor,
   getBorderColor,
   getFontFamily,
   getFontWeight,
   getFontSize,
   applyFontStyle
 } from './theme-config'








```

# src/lib/registry.tsx

```tsx
// src/lib/registry.tsx
'use client'
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
```

# src/lib/supabase.ts

```ts
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { CategoryId } from '@/data/categories';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Define types for your blog posts
export type Post = {
   id: string
   title: string
   slug: string
   content: string
   excerpt?: string
   // category: string // Add this line
   category: CategoryId;  // This enforces the proper category types
   published: boolean
   created_at: string
   updated_at: string
}

// API functions for posts
export const blogApi = {
  // Get all posts
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Post[]
  },

  // Get single post by slug
  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data as Post
  },

  // Create new post
  async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
      .single()

    if (error) throw error
    return data as Post
  },

  // Update post
  async updatePost(id: string, updates: Partial<Post>) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Post
  }
}
```

# src/lib/theme-config.ts

```ts
//src/lib/theme-config.ts : used for portfolio-theme.ts

 // Add Styled Components declaration
 declare module 'styled-components' {
   export interface DefaultTheme extends Theme {}
 }

 import {ThemeMode,
   ColorWithShades,
   ColorShades,
   BorderColors,
   // ColorPalette,
   // Typography,
   Theme} from "./portfolio-theme";

type HeadingSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type BodySizes = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

// Base theme configuration
export const baseTheme = {
   typography: {
      heading: {
         fontFamily: '"Libre Baskerville", serif',
         weights: {
            regular: 400,
            medium: 500,
            bold: 700
         },
         sizes: {
            h1: '2.5rem',
            h2: '2rem',
            h3: '1.75rem',
            h4: '1.5rem',
            h5: '1.25rem',
            h6: '1rem'
         }
      },
      body: {
         fontFamily: '"Open Sans", sans-serif',
         weights: {
            regular: 400,
            medium: 500,
            bold: 700
         },
         sizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem'
         }
      }
   }
} as const;

// Color definitions
export const colors = {
   primary: {
      100: '#EBE5F6',
      200: '#D7CCED',
      300: '#C3B2E3',
      400: '#AF99DA',
      500: '#8465C3',
      600: '#6A51C0',
      700: '#503DBD',
      800: '#3629BA',
      900: '#1C15B7'
   },
   secondary: {
      100: '#E6FEFF',
      200: '#CCFEFF',
      300: '#B3FDFF',
      400: '#99FCFF',
      500: '#3AF1F9',
      600: '#2ED8E0',
      700: '#22BFC6',
      800: '#16A6AD',
      900: '#0A8D93'
   },
   accent: {
      100: '#FFE9E3',
      200: '#FFD3C8',
      300: '#FFBDAC',
      400: '#FFA791',
      500: '#F46A47',
      600: '#DB503D',
      700: '#C23633',
      800: '#A91C29',
      900: '#90021F'
   },
   success: {
      100: '#F0F7E6',
      200: '#E1EFCC',
      300: '#D2E7B3',
      400: '#C3DF99',
      500: '#A2C465',
      600: '#88AB4B',
      700: '#6F9231',
      800: '#557917',
      900: '#3C5F00'
   },
   warning: {
      100: '#FFF5EB',
      200: '#FFEBD7',
      300: '#FFE1C3',
      400: '#FFD7AF',
      500: '#FAD8B4',
      600: '#E1BF9A',
      700: '#C8A680',
      800: '#AF8D66',
      900: '#96744C'
   },
   danger: {
      100: '#FFE5E8',
      200: '#FFCCD1',
      300: '#FFB2BA',
      400: '#FF99A3',
      500: '#F5536A',
      600: '#DC3950',
      700: '#C21F36',
      800: '#A9051C',
      900: '#900002'
   },
   gray: {
      100: '#F7F7F7',
      200: '#E6E6E6',
      300: '#D5D5D5',
      400: '#C4C4C4',
      500: '#676767',
      600: '#525252',
      700: '#3D3D3D',
      800: '#282828',
      900: '#131313'
   },
   // Add border configuration
   border: {
      light: {
        primary: '#0F66AF'
      },
      dark: {
        primary: '#0D94A0'
      }
    }
};

// Theme definitions
export const lightTheme: Theme = {
   isDarkTheme: false,
   colors: {
      ...colors,
      backgrounds: {  // Changed from 'background' to 'backgrounds'
         light: '#EBE5F6',
         dark: '#121212',
         nav: 'rgba(255, 255, 255, 0.8)' // Add nav background here
      },
      text: {
         light: {
            primary: '#3629BA',
            secondary: '#F6F2C3CC',
            accent: 'magenta',
            disabled: '#CCCCCC',
            svgColor1: "red",
            svgColor2: "blue",
            svgColor3: "magenta",
            svgColor4: "cyan",
            svgColor5: "green",
         },
         dark: {
            primary: '#FFFFFF',
            secondary: '#3AF1F9',
            accent: '',
            svgColor1: "",
            svgColor2: "",
            svgColor3: "",
            svgColor4: "",
            svgColor5: "",
            disabled: ''
         }
      },
      border: colors.border  // Add this
   },
   typography: baseTheme.typography,
   sizes: {
      navHeight: '80px'
   },
   navBackground: 'rgba(255, 255, 255, 0.8)',
   textSecondary: '#8F8F8F',
   border: '#E5E7EB',  // Add this
   error: '#DC2626'
};

export const darkTheme: Theme = {
   isDarkTheme: true,
   colors: {
      ...colors,
      backgrounds: {  // Changed from 'background' to 'backgrounds'
         light: '#121212',
         dark: '#000000',
         // nav: 'rgba(18, 18, 18, 0.8)' // Add nav background here
         nav: "#C21F36" // Add nav background here
      },
      text: {
         light: {
            primary: '#F46A47',
            secondary: '#99FCFF91',
            accent: '',
            svgColor1: "",
            svgColor2: "",
            svgColor3: "",
            svgColor4: "",
            svgColor5: "",
            disabled: ''
         },
         dark: {
            primary: '#AF99DA',
            secondary: '#0d94a0cc',
            accent: 'yellowgreen',
            disabled: '#6E6E6E',
            svgColor1: "#C4C4C4",
            svgColor2: "#900002",
            svgColor3: "#6F9231",
            svgColor4: "orange",
            svgColor5: "green",
         }
      },
      border: colors.border  // Add this
   },
   typography: baseTheme.typography,
   sizes: {
      navHeight: '80px'
   },
   navBackground: "#FAD8B4", // 'rgba(18, 18, 18, 0.8)',
   textSecondary: '#E0E0E0',
   border: '#374151',  // Add this
   error: '#EF4444'
};

// Default theme for utilities
export const theme = lightTheme;

// Utility functions
// export const getColor = (colorName: keyof Omit<ColorPalette, "background" | "text">, shade: keyof ColorShades = 500): string => {
//   return theme.colors[colorName][shade];
// };
// Update the getColor function with proper type checking
// export const getColor = (
export const getColor = (
   colorName: ColorWithShades,
   shade: keyof ColorShades = 500
): string => {
   const color = theme.colors[colorName];

   if (!isColorShades(color)) {
      throw new Error(`Color ${colorName} does not have shades`);
   }
   return color[shade];
};

// Type guard to check if a color has shades
// const isColorShades = (color: any): color is ColorShades => {
//    return color && typeof color === 'object' && '500' in color;
// };
const isColorShades = (color: unknown): color is ColorShades => {
   return typeof color === 'object' &&
          color !== null &&
          '500' in color;
};

// export const getBackgroundColor = (mode: ThemeMode): string => {
//    //   return theme.colors.backgrounds[mode];
//    return theme.colors.backgrounds.light;
// };
export const getBackgroundColor = (
   mode: ThemeMode,
   type: 'default' | 'nav' = 'default'
 ): string => {
   if (type === 'nav') {
     return theme.colors.backgrounds.nav;
   }
   return theme.colors.backgrounds[mode];
 };

export const getTextColor = (
   mode: ThemeMode,
   variant: "primary" | "secondary" | "disabled"
): string => {
   return theme.colors.text[mode][variant];
};

export const getBorderColor = (mode: ThemeMode, variant: keyof BorderColors): string => {
   return theme.colors.border[mode][variant];
 };

export const getFontFamily = (
   type: "heading" | "body"
): string => {
   return theme.typography[type].fontFamily;
};

export const getFontWeight = (
   type: "heading" | "body",
   weight: "regular" | "medium" | "bold"
): number => {
   return theme.typography[type].weights[weight];
};

export const getFontSize = (
   type: "heading" | "body",
   size: HeadingSizes | BodySizes
): string => {
   if (type === "heading" && isHeadingSize(size)) {
      return theme.typography.heading.sizes[size];
   }
   if (type === "body" && isBodySize(size)) {
      return theme.typography.body.sizes[size];
   }
   throw new Error(`Invalid size ${size} for type ${type}`);
};

// Type guards
const isHeadingSize = (size: HeadingSizes | BodySizes): size is HeadingSizes => {
   return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(size);
};

const isBodySize = (size: HeadingSizes | BodySizes): size is BodySizes => {
   return ["xs", "sm", "base", "lg", "xl"].includes(size);
};

// CSS helper
export const applyFontStyle = (type: "heading" | "body", weight: "regular" | "medium" | "bold", size: HeadingSizes | BodySizes): string => {
   return `
    font-family: ${getFontFamily(type)};
    font-weight: ${getFontWeight(type, weight)};
    font-size: ${getFontSize(type, size)};
  `;
};

```

# src/lib/theme.ts

```ts
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
    --background: ${({ theme }) => theme.isDarkTheme ?
      theme.colors.backgrounds.dark :
      theme.colors.backgrounds.light};
    --foreground: ${({ theme }) => theme.isDarkTheme ?
      theme.colors.text.dark.primary :
      theme.colors.text.light.primary};
  }

  body {
   //  background-color: var(--background);
   //  color: var(--foreground);
   //  font-family: ${({ theme }) => theme.typography.body.fontFamily};
   background-color: ${({ theme }) => theme.colors.backgrounds.light};
    color: ${({ theme }) => theme.colors.text.light.primary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    color: ${({ theme }) => theme.isDarkTheme ?
      theme.colors.text.dark.primary :
      theme.colors.text.light.primary};
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
      font-size: ${({ theme }) => theme.typography.body.sizes.lg};
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
```

# src/lib/types.ts

```ts
export interface BaseInterface {
   someProperty: string;
   // Add at least one property to avoid the empty interface warning
 }

export type ThemeMode = 'light' | 'dark';

// Create a type for color keys that can have shades
export type ColorWithShades = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'gray';

// Shared type definitions
export interface ColorShades {
   100: string;
   200: string;
   300: string;
   400: string;
   500: string; // Base color
   600: string;
   700: string;
   800: string;
   900: string;
}

export interface BorderColors {
   primary: string;
   // secondary: string;
   // accent: string;
   // disabled: string;
 }

export interface ColorPalette {
   primary: ColorShades;
   secondary: ColorShades;
   accent: ColorShades;
   success: ColorShades;
   warning: ColorShades;
   danger: ColorShades;
   gray: ColorShades;
   backgrounds: {  // Changed from 'background' to 'backgrounds'
      light: string;
      dark: string;
      nav: string; // Add this for navBackground
   };
   text: {
      light: {
         primary: string;
         secondary: string;
         accent: string;
         disabled: string;
         svgColor1: string;
         svgColor2: string;
         svgColor3: string;
         svgColor4: string;
         svgColor5: string;
      };
      dark: {
         primary: string;
         secondary: string;
         accent: string;
         disabled: string;
         svgColor1: string;
         svgColor2: string;
         svgColor3: string;
         svgColor4: string;
         svgColor5: string;
      };
   };
   border: {
      light: BorderColors;
      dark: BorderColors;
    }
}

export interface Typography {
   heading: {
      fontFamily: string;
      weights: {
         regular: number;
         medium: number;
         bold: number;
      };
      sizes: {
         h1: string;
         h2: string;
         h3: string;
         h4: string;
         h5: string;
         h6: string;
      };
   };
   body: {
      fontFamily: string;
      weights: {
         regular: number;
         medium: number;
         bold: number;
      };
      sizes: {
         xs: string;
         sm: string;
         base: string;
         lg: string;
         xl: string;
      };
   };
}

export interface Theme {
   isDarkTheme: boolean;  // Add this property
   colors: ColorPalette;
   // colors: ColorPalette & {
   //    border: {
   //      light: BorderColors;
   //      dark: BorderColors;
   //    };
   //  };
   typography: Typography;
   sizes: {
      navHeight: string;
   };
   navBackground: string;
   textSecondary: string;
   // border: ColorPalette;
   border: string;
   // border: {
   //    light: BorderColors;
   //    dark: BorderColors;
   //  };
   error: string;
   backgroundColor?: string;
   backgroundBlendMode?: string;
}

```

# src/middleware.ts

```ts
// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname.startsWith('/blog/new')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  return res
}

export const config = {
  matcher: ['/blog/new']
}
```

# tailwind.config.ts

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

