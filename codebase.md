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

# .vscode/settings.json

```json
{
}
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
    "encoding": "^0.1.13",
    "lucide-react": "^0.462.0",
    "next": "15.0.3",
    "prismjs": "^1.29.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-markdown": "^9.0.1",
    "rehype-prism-plus": "^2.0.0",
    "remark-gfm": "^4.0.0"
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

# public/assets/MashMediaStudio.png

This is a binary file of the type: Image

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/notes/Article-Ideas.md

```md
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* Base styles */
body {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}

</style>

<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->

# Article Ideas
## Tech
- Light & Dark image backgrounds
   - Published in LinkedIn  ✅ Done!
   - Need to add in MyBlog

- Loaders
   - WIP

- AudioPlayer
- Using both TailwindCSS and Styled-Components
- Video player in your site
- Animations: CSS, Framer-Motion

## Media
- Video animations

```

# public/notes/misc.tsx

```tsx

```

# public/notes/misc2.tsx

```tsx
// src/components/ThemeToggle.tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
	const { isDark, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className='p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
			aria-label='Toggle theme'
		>
			{isDark ? <Sun className='h-5 w-5 text-yellow-500' /> : <Moon className='h-5 w-5 text-gray-700' />}
		</button>
	);
}

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

# public/notes/Theme Implementation Doc.md

```md
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* Base styles */
body {
  font-family: 'Libre Baskerville', serif;
  font-size: 1rem;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}

</style>

<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->

# Theme Implementation Documentation

## ThemeContext and Hook
\`\`\`typescript
// contexts/ThemeContext.tsx

// Context Type
type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

// Hook Implementation
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeContextProvider')
  }
  return context
}

// Usage Example
function Component() {
  const { theme, isDark, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>Toggle</button>
}
\`\`\`

## ThemeProvider Implementation
\`\`\`typescript
export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = stored ? stored === 'dark' : prefersDark

    setIsDark(shouldBeDark)
    setCurrentTheme(shouldBeDark ? darkTheme : lightTheme)

    if (shouldBeDark) document.documentElement.classList.add('dark')
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const newIsDark = !prev
      const newTheme = newIsDark ? darkTheme : lightTheme
      setCurrentTheme(newTheme)
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark')
      return newIsDark
    })
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
\`\`\`

## Integration Points

### Styled Components
\`\`\`typescript
const StyledComponent = styled.div<{ theme: Theme }>`
  color: ${({ theme }) => theme.isDark ? theme.colors.text.dark : theme.colors.text.light};
`
\`\`\`

### Tailwind CSS
\`\`\`typescript
function Component() {
  const { isDark } = useTheme()
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Content */}
    </div>
  )
}
\`\`\`

## Features
- System theme detection
- Theme persistence
- Type-safe theme access
- Synchronized styling
- No flash on page load
- Error boundary for hook usage

## Best Practices
1. Always use hook within ThemeProvider
2. Access theme values through hook
3. Combine with Tailwind for responsive design
4. Use theme object for complex dynamic styles
5. Maintain TypeScript types for theme objects
```

# public/notes/To-Do.md

```md
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* Base styles */
body {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}

</style>

<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->

# To Do

## Lists

### Date: 12.01.2024

- Claude timed me out: 5:45am - 8:am
- Use the same theme as portfolio-2025
  - Fonts: family, colors, sizes
  - Color Palette
  -
- Light & Dark theme ✅ Done!
- Integrate Styled-Components with TailwindCSS ✅ Done!
- Able to show code in content ✅ Done!
- Can we show who liked and commented on a post ✅ Done!
- Blog Posts Dashboard: ✅ Done!

  - Create a different category of posts ✅ Done!
    - Tech Articles
    - Other Medias
    - Fusion Food
    - Personal
  - Show two large cards of favorite category and show all the posts underneath in cards format as well ✅ Done!
    - Expanded to be able to show 1 - .n of Featured cards ✅ Done!
  - Similar to this design: https://www.loopple.com/preview-sample/dashboard-blogs-asteria?hide-banner=true&buttons=true

- Does readers have to be logged in to read, comment, like
- Fix <img to <Image in src/components/BlogDashboard.tsx line: 71, 97

- Changed: BlogDashboard.tsx : All posts container +to display 4 columns instead of 3 ✅ Done!
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

## Refactor

### Date: 12.02.2024

> - Claude timed me out: 6am - 9am **#😭**

- Add category assignment for New Post and Edit form. ✅ Fixed!
- Do we still need src/app/providers.tsx
- Add ARIA to the pages that readers will interact with. Don't need it for the admin.

### Date: 12.02.2024 @ 1:50pm

> ### - Claude timed me out again: 1:50pm - 3:00pm **#😭**

- Adjust featured card height BlogDashboard.tsx to 250px. Default: h-full ✅
  \`\`\`javascript
  <Link href={`/blog/${post.slug}`} className="buttonContainer group block h-[250px] aspect-[16/9]">
  \`\`\`
- Add light & dark mode feature ✅ Working, needs further checking. Need to do other things.

### Date: 12.03.2024 @ 4:20am

- Navbar, clicking on MyBlog goes to '/" but brings out another Navbar ✅ Fixed!
- Create a json or .ts file for Navbar data ✅ Done!

### Date: 12.03.2024 @ 6:30am

- We shouldn't require readers to sign in to be able to comment or Like a post. ✅ Done!
- We should also take out Write Post, Edit Post and Delete Post if the reader is not sign in ✅ Done!
- On the src/components/Navbar.tsx please use src/data/navbarConfig.ts ✅ Done!

- We need to get the theming color palette better implemented. Right now it's funky.
- In src/app/blog/page.tsx comment out or remove "Write Post" button. "New Post" button is already in the Navbar for the admin. ✅ Done!
- Keep the light/dark mode selection persist please!

<p style="color: orange; font-size:1.5rem; padding-top:2rem;">
December 04, 2024
</p>
<span style=color:red;  font-size:1.25rem">Claude kicked me out! 7:30pm - 9:00pm</span> **#😭**
<p></p>
- New comments are not showing up ✅ Done!
- Remove all refernces to Styled-Components ✅ Done!
- Text field in Edit mode should be white and black text
- Establish a theme for buttons
- Headers should be "Libre Baskerville" Text "Open Sans"

<p style="color: orange; font-size:1.5rem; padding-top:4rem;">
Future requirements:
</p>
- Add ARIA
- Login implementation

### December 05, 2024

- Staging area for post that are create but not published

```

# public/project-summaries/BlogDashboard Category Colors.md

```md
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* Base styles */
body {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}
</style>

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

# Fixing Category Button Colors in BlogDashboard

<span style="color: orange; font-size:1.5rem">
December 04, 2024
</span>
<p></p>
Here's what we accomplished with the blog's theme and styling:

1. Removed styled-components dependencies to resolve conflicts with Tailwind
2. Fixed theme functionality:

   - Default light theme
   - Persistent theme selection using localStorage
   - Working dark/light mode toggle
   - Proper hydration handling

3. Fixed BlogDashboard:

   - Resolved category button colors
   - Added distinct colors for each category
   - Fixed text colors for active/inactive states

4. Major fixes:

   \`\`\`typescript
   // Theme persistence
   localStorage.setItem("theme", newIsDark ? "dark" : "light");

   // Hydration fix
   const [mounted, setMounted] = useState(false);
   if (!mounted)
   	return null // Category button colors
   	`${isActive ? "bg-primary-600" : "bg-gray-800 hover:bg-gray-700"}`;
   \`\`\`

Outstanding tasks:

1. Remove remaining styled-components dependencies
2. Work on Navbar styling
3. Ensure consistent color palette usage across components
4. Test theme persistence across page reloads

Location of key theme configuration:

- `src/contexts/ThemeContext.tsx`: Theme state management
- `src/app/layout.tsx`: Global theme application
- `tailwind.config.ts`: Color palette definition

```

# public/project-summaries/BlogDashboard Category Fix.md

```md
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* Base styles */
body {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}
</style>

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

# BlogDashboard Category Fix

## Issue
The BlogDashboard component was incorrectly handling posts in the "media" category, causing the latest media post to be one post behind in the display.

## Root Cause
The original implementation tried to handle both tech and media posts as "featured" posts, which created complexities in the filtering logic. This dual-featured approach caused media posts to be filtered incorrectly from the main display.

## Solution
Simplified the post filtering logic by:
1. Only keeping tech posts as featured
2. Removing the latestMediaPost handling
3. Implementing a cleaner filtering approach that:
   - Shows all posts of a category when selected
   - Only excludes the featured tech post from the main list

## Code Changes
\`\`\`typescript
// Before
const latestMediaPost = posts.find(post => post.category === 'media');
const remainingPosts = posts.filter(post => {
  const isFeaturedTech = post.id === latestTechPost?.id;
  const isFeaturedMedia = post.id === latestMediaPost?.id;
  return !isFeaturedTech && !isFeaturedMedia;
});

// After
const filteredPosts = activeCategory
  ? posts.filter(post => post.category === activeCategory)
  : posts.filter(post => post.id !== latestTechPost?.id);
\`\`\`

## Testing
Test the fix by:
1. Creating new posts in the media category
2. Verifying posts appear immediately after creation
3. Checking category filtering works correctly
4. Ensuring featured tech post displays properly
```

# public/project-summaries/BlogDashboard Component Doc.md

```md
<style>
body {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}
</style>

# BlogDashboard Component Documentation

## Grid Layout Structure
The featured posts section uses a responsive grid layout with three breakpoints:

\`\`\`typescript
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
\`\`\`

### Featured Cards Placement
1. Tech Post (Large)
   - Mobile: Full width
   - Tablet: Spans 2 columns, 2 rows
   - Desktop: Same as tablet

2. Media Post (Medium)
   - Mobile: Full width
   - Tablet: Spans 2 columns
   - Desktop: Same as tablet

3. Food Post (Full)
   - Mobile: Full width
   - Tablet: Spans 2 columns
   - Desktop: Spans all 4 columns

## Card Size Types
\`\`\`typescript
type Size = "large" | "medium" | "full";
\`\`\`

### Size Properties
- `large`: Used for main feature (2x2)
- `medium`: Secondary features (1x1)
- `full`: Full-width feature (spans available columns)

## Implementation Notes
- `col-start-1` ensures the full-width card aligns properly
- `row-span-2` on large card creates space for medium card
- All cards maintain 16:9 aspect ratio for consistency

## Usage Example
\`\`\`typescript
<FeaturedCard
  post={post}
  category={categories[0]}
  size="large|medium|full"
  title="Custom Title"
  description="Optional description"
/>
\`\`\`
```

# public/project-summaries/Resolving-Hydration-Styling-Issues.md

```md
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* Base styles */
body {
  font-family: 'Libre Baskerville', serif;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #2D3748;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFFDF7;
}
</style>

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

# Resolving Hydration and Styling Issues
### Here's what we've implemented in the blog codebase:
#### Date: 12.02.2024 : 10:30am

1. Theme Integration
- Set up styled-components with Next.js 13+ App Router
- Created proper theme types and configuration
- Implemented dark/light mode detection
- Added global styles with proper theme support

2. Component Architecture
- Split server/client components appropriately
- Created BlogPostContent as client component
- Added BlogPost.styles with styled-components
- Implemented ClientOnly wrapper for hydration fixes

3. Fixed Hydration Issues
- Added proper mounting checks
- Used suppressHydrationWarning where needed
- Separated client-side functionality
- Fixed async client component error

4. Styling System
- Created type-safe theme utilities
- Set up proper font loading
- Implemented responsive styles
- Added proper CSS organization

Outstanding tasks:
1. Complete dark mode toggle implementation
2. Add more category-specific styling
3. Enhance loading states
4. Improve error boundaries
5. Add image optimization
6. Implement proper metadata

Would you like to proceed with any of these tasks?
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

# src/app/api/revalidate/route.ts

```ts
// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  revalidatePath('/blog')
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
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
// src/app/blog/[slug]/page.tsx - Server Component
import { supabaseClient } from '@/lib/auth'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/BlogPostContent'

export default async function BlogPostPage({
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

  return <BlogPostContent post={post} />
}


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
import { CategoryId } from '@/data/categories';
import { GridSize } from '@/components/BlogDashboard';

// Define featured setup type
type FeaturedSetup = {
  category: CategoryId;
  size: GridSize;
  order: number;
  title?: string;
  description?: string;
}[];

// Featured setup configuration
const featuredSetup: FeaturedSetup = [
  {
    category: 'tech',
    size: 'large',
    order: 0,
    title: 'Latest in Tech',
    description: 'Latest tech insights and tutorials'
  },
  {
    category: 'media',
    size: 'medium',
    order: 1,
    title: 'Media & Reviews'
  }
];

export default async function BlogList() {
  const { data: posts, error } = await supabaseClient
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return <div>Error loading posts</div>;
  }

  const formattedPosts = posts?.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    category: (post.category || 'tech') as CategoryId,
    date: new Date(post.created_at).toLocaleDateString(),
    slug: post.slug,
    cover_image: post.cover_image
  })) || [];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 px-4">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        {/* <Link
          href="/blog/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Write Post
        </Link> */}
      </div>

      <BlogDashboard
        posts={formattedPosts}
        featuredSetup={featuredSetup}
      />
    </div>
  );
}

// // src/app/blog/page.tsx
// import Link from "next/link";
// import { supabaseClient } from "@/lib/auth";
// import BlogDashboard from "@/components/BlogDashboard";
// import { CategoryId } from "@/data/categories";
// import { headers } from "next/headers";

// // Force dynamic rendering
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// export default async function BlogList() {
// 	// Force unique requests
// 	headers();

// 	const { data: posts, error } = await supabaseClient.from("posts").select("*").order("created_at", { ascending: false });

// 	if (error) {
// 		console.error("Supabase error:", error);
// 		return <div>Error loading posts</div>;
// 	}

// 	const formattedPosts =
// 		posts?.map((post) => ({
// 			id: post.id,
// 			title: post.title,
// 			excerpt: post.excerpt || "",
// 			category: (post.category || "tech") as CategoryId,
// 			date: new Date(post.created_at).toLocaleDateString(),
// 			slug: post.slug,
// 			cover_image: post.cover_image,
// 			published: post.published,
//    })) || [];

// 	const customFeatures = [
// 		{
// 			category: "food",
// 			size: "large",
// 			order: 0,
// 			title: "Featured Recipe",
// 			description: "Our latest culinary creation",
// 		},
// 		{
// 			category: "tech",
// 			size: "medium",
// 			order: 1,
// 			title: "Tech Update",
// 		},
// 	];

// 	return (
// 		<div className="max-w-7xl mx-auto">
// 			<div className="flex justify-between items-center mb-8 px-4">
// 				<h1 className="text-3xl font-bold">Blog Posts</h1>
// 				<Link href="/blog/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// 					Write Post
// 				</Link>
// 			</div>

// 			{/* <BlogDashboard posts={formattedPosts} /> */}
// 			<BlogDashboard posts={posts} featuredSetup={customFeatures} />
// 		</div>
// 	);
// }
// // // src/app/blog/page.tsx
// // import Link from 'next/link';
// // import { supabaseClient } from '@/lib/auth';
// // import BlogDashboard from '@/components/BlogDashboard';
// // import { CategoryId } from '@/data/categories';
// // import { unstable_noStore } from 'next/cache';

// // export default async function BlogList() {
// //   // Disable caching for this route
// //   unstable_noStore();

// //   const { data: posts, error } = await supabaseClient
// //     .from('posts')
// //     .select('*')
// //     .order('created_at', { ascending: false })

// //   if (error) {
// //     console.error('Supabase error:', error)
// //     return <div>Error loading posts</div>
// //   }

// //   const formattedPosts = posts?.map(post => ({
// //     id: post.id,
// //     title: post.title,
// //     excerpt: post.excerpt || '',
// //     category: (post.category || 'tech') as CategoryId,
// //     date: new Date(post.created_at).toLocaleDateString(),
// //     slug: post.slug,
// //     cover_image: post.cover_image,
// //     published: post.published
// //   })) || []

// //   return (
// //     <div className="max-w-7xl mx-auto">
// //       <div className="flex justify-between items-center mb-8 px-4">
// //         <h1 className="text-3xl font-bold">Blog Posts</h1>
// //         <Link
// //           href="/blog/new"
// //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //         >
// //           Write Post
// //         </Link>
// //       </div>

// //       <BlogDashboard posts={formattedPosts} />
// //     </div>
// //   )
// // }
// // // // src/app/blog/page.tsx

// // // import Link from 'next/link';
// // // import { supabaseClient } from '@/lib/auth';
// // // import BlogDashboard from '@/components/BlogDashboard';
// // // import { CategoryId } from '@/data/categories';

// // // /*---==============================================================
// // // This is a React functional component named BlogList that fetches
// // // and displays a list of published blog posts from a Supabase database.
// // // It handles errors, transforms the post data, and renders a
// // // dashboard with a "Write Post" link and a list of posts.
// // //  ==============================================================---*/
// // //  export default async function BlogList() {
// // //    const { data: posts, error } = await supabaseClient
// // //      .from('posts')
// // //      .select('*')
// // //      .order('created_at', { ascending: false })

// // //    if (error) {
// // //      console.error('Supabase error:', error)
// // //      return <div>Error loading posts</div>
// // //    }

// // //    const formattedPosts = posts?.map(post => ({
// // //      id: post.id,
// // //      title: post.title,
// // //      excerpt: post.excerpt || '',
// // //      category: (post.category || 'tech') as CategoryId,
// // //      date: new Date(post.created_at).toLocaleDateString(),
// // //      slug: post.slug,
// // //      cover_image: post.cover_image
// // //    })) || []

// // //    return (
// // //      <div className="max-w-7xl mx-auto">
// // //        <div className="flex justify-between items-center mb-8 px-4">
// // //          <h1 className="text-3xl font-bold">Blog Posts</h1>
// // //          <Link
// // //            href="/blog/new"
// // //            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // //          >
// // //            Write Post
// // //          </Link>
// // //        </div>

// // //        <BlogDashboard posts={formattedPosts} />
// // //      </div>
// // //    )
// // //  }
// // // // export default async function BlogList() {
// // // //   const { data: posts, error } = await supabaseClient
// // // //     .from('posts')
// // // //     .select('*')
// // // //     .eq('published', true)
// // // //     .order('created_at', { ascending: false })

// // // //   if (error) {
// // // //     console.error('Supabase error:', error)
// // // //     return <div>Error loading posts</div>
// // // //   }

// // // //   // Transform the posts data
// // // //   const formattedPosts = posts?.map(post => ({
// // // //     id: post.id,
// // // //     title: post.title,
// // // //     excerpt: post.excerpt || '',
// // // //     category: post.category || 'tech',
// // // //     date: new Date(post.created_at).toLocaleDateString(),
// // // //     slug: post.slug,
// // // //     cover_image: post.cover_image
// // // //   })) || []

// // // //   return (
// // // //     <div className="max-w-7xl mx-auto">
// // // //       <div className="flex justify-between items-center mb-8 px-4">
// // // //         <h1 className="text-3xl font-bold">Blog Posts</h1>
// // // //         <Link
// // // //           href="/blog/new"
// // // //           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // // //         >
// // // //           Write Post
// // // //         </Link>
// // // //       </div>

// // // //       <BlogDashboard posts={formattedPosts} />
// // // //     </div>
// // // //   )
// // // // }

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

@layer base {
	html {
		min-height: 100vh;
	}

	body {
		@apply min-h-screen flex flex-col;
		@apply bg-white text-gray-900;
		@apply dark:bg-gray-900 dark:text-white;
	}

	main {
		@apply flex-1;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		@apply font-baskerville text-primary-600 dark:text-primary-400 font-bold;
	}

	h1 {
		@apply text-4xl mb-6;
	}
	h2 {
		@apply text-3xl mb-5;
	}
	h3 {
		@apply text-2xl mb-4;
	}
	h4 {
		@apply text-xl mb-3;
	}
	h5 {
		@apply text-lg mb-2;
	}
	h6 {
		@apply text-base mb-2;
	}
}

.prose {
	@apply max-w-none;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
	@apply font-baskerville text-primary-600 dark:text-primary-400;
}

/* @tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	html {
		min-height: 100vh;
	}

	body {
		@apply min-h-screen flex flex-col bg-white dark:bg-gray-900;
	}

	main {
		@apply flex-1;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		@apply font-baskerville text-primary-600 dark:text-primary-400 font-bold;
	}

	h1 {
		@apply text-4xl mb-6;
	}
	h2 {
		@apply text-3xl mb-5;
	}
	h3 {
		@apply text-2xl mb-4;
	}
	h4 {
		@apply text-xl mb-3;
	}
	h5 {
		@apply text-lg mb-2;
	}
	h6 {
		@apply text-base mb-2;
	}
}

.prose {
	@apply max-w-none;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
	@apply font-baskerville text-primary-600 dark:text-primary-400;
} */

```

# src/app/layout.tsx

```tsx
// src/app/layout.tsx
import { Libre_Baskerville } from "next/font/google";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const baskerville = Libre_Baskerville({
	subsets: ["latin"],
	weight: ["400", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              if (localStorage.theme === 'dark') {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
              }
            `,
					}}
				/>
			</head>
			<body
				className={baskerville.className}
				suppressHydrationWarning
			>
				<Providers>
					<div className='min-h-screen flex flex-col'>
						<Navbar />
						<main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}

// // src/app/layout.tsx
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import { Providers } from "./providers";
// import { Navbar } from "@/components/Navbar";
// import "./globals.css";
// import { Libre_Baskerville } from "next/font/google";

// const baskerville = Libre_Baskerville({
// 	subsets: ["latin"],
// 	weight: ["400", "700"],
// });

// const geistSans = localFont({
// 	src: "./fonts/GeistVF.woff",
// 	variable: "--font-geist-sans",
// 	weight: "100 900",
// });

// const geistMono = localFont({
// 	src: "./fonts/GeistMonoVF.woff",
// 	variable: "--font-geist-mono",
// 	weight: "100 900",
// });

// export const metadata: Metadata = {
// 	title: "My Blog",
// 	description: "A personal blog built with Next.js",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
// 	return (
// 		<html
// 			lang='en'
// 			suppressHydrationWarning
// 		>
// 			<head>
// 				<script
// 					dangerouslySetInnerHTML={{
// 						__html: `
//                if (localStorage.theme === 'dark') {
//                  document.documentElement.classList.add('dark')
//                } else {
//                  document.documentElement.classList.remove('dark')
//                  localStorage.setItem('theme', 'light')
//                }
//              `,
// 					}}
// 				/>
// 			</head>
// 			<body
// 				className={`${baskerville.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-200`}
// 				suppressHydrationWarning
// 			>
// 				<main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
// 			</body>
// 		</html>
// 	);
// }
// // // src/app/layout.tsx
// // import type { Metadata } from "next";
// // import localFont from "next/font/local";
// // import { Providers } from "./providers";
// // import { Navbar } from "@/components/Navbar";
// // import "./globals.css";

// // const geistSans = localFont({
// // 	src: "./fonts/GeistVF.woff",
// // 	variable: "--font-geist-sans",
// // 	weight: "100 900",
// // });

// // const geistMono = localFont({
// // 	src: "./fonts/GeistMonoVF.woff",
// // 	variable: "--font-geist-mono",
// // 	weight: "100 900",
// // });

// // export const metadata: Metadata = {
// // 	title: "My Blog",
// // 	description: "A personal blog built with Next.js",
// // };

// // export default function RootLayout({ children }: { children: React.ReactNode }) {
// // 	return (
// // 		<html
// // 			lang='en'
// // 			suppressHydrationWarning
// // 		>
// // 			<body
// // 				className={`${geistSans.variable} ${geistMono.variable}`}
// // 				suppressHydrationWarning
// // 			>
// // 				<Providers>
// // 					<Navbar />
// // 					<main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
// // 				</Providers>
// // 			</body>
// // 		</html>
// // 	);
// // }
// // // // src/app/layout.tsx
// // // import type { Metadata } from "next";
// // // import localFont from "next/font/local";
// // // import { Navbar } from "@/components/Navbar";
// // // import "./globals.css";

// // // const geistSans = localFont({
// // // 	src: "./fonts/GeistVF.woff",
// // // 	variable: "--font-geist-sans",
// // // 	weight: "100 900",
// // // });

// // // const geistMono = localFont({
// // // 	src: "./fonts/GeistMonoVF.woff",
// // // 	variable: "--font-geist-mono",
// // // 	weight: "100 900",
// // // });

// // // export const metadata: Metadata = {
// // // 	title: "My Blog",
// // // 	description: "A personal blog built with Next.js",
// // // };

// // // export default function RootLayout({ children }: { children: React.ReactNode }) {
// // // 	return (
// // // 		<html
// // // 			lang='en'
// // // 			className='light'
// // // 		>
// // // 			<body className={`${geistSans.variable} ${geistMono.variable} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
// // // 				<Navbar />
// // // 				<main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
// // // 			</body>
// // // 		</html>
// // // 	);
// // // }

// // // // // src/app/layout.tsx - Updated with strict CSR marking

// // // // import type { Metadata } from "next"
// // // // import localFont from "next/font/local"
// // // // import { Providers } from './providers'
// // // // import { Navbar } from '@/components/Navbar'
// // // // import "@/styles/globals.css"

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
// // // //   description: "A personal blog built with Next.js and Styled Components",
// // // // }

// // // // export default function RootLayout({
// // // //   children,
// // // // }: {
// // // //   children: React.ReactNode
// // // // }) {
// // // //   return (
// // // //     <html lang="en" suppressHydrationWarning>
// // // //       <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
// // // //         <Providers>
// // // //           <Navbar />
// // // //           {children}
// // // //         </Providers>
// // // //       </body>
// // // //     </html>
// // // //   )
// // // // }

```

# src/app/page.tsx

```tsx
// src/app/page.tsx
"use client";
// import { ThemeProvider } from "styled-components";
// import { lightTheme } from "@/lib/theme-config";

/*---==================================================================
The homepage serves as the entry point to our blog platform, providing:
- Overview of recent blog posts
- Summary of different content categories
- Quick access to featured articles
==================================================================---*/
export default function HomePage() {
	return (
		<main className='container mx-auto px-4 py-8'>
			<section className='max-w-4xl mx-auto space-y-8'>
				<h1 className='text-4xl font-bold mb-4'>Welcome to My Blog</h1>
				<div className='text-xl space-y-4'>
					<p>Dive into a world of creativity, innovation, and flavors! Here, you\'ll find:</p>
					<ul className='space-y-2'>
						<li>Tech Tutorials: Simplifying coding concepts and showcasing CSS & JavaScript animations</li>
						<li>Other Media: Explore the art of video production and animations</li>
						<li>Fusion Food: Savor the blend of Asian-inspired cuisine and global tastes</li>
						<li>Personal Stories: A window into my journey, thoughts, and experiences</li>
					</ul>
					<p>Whether you\'re here to learn, create, or simply be inspired, there\'s something for everyone.</p>
				</div>
			</section>
		</main>
	);
}
// export default function HomePage() {
// 	return (
// 		<ThemeProvider theme={lightTheme}>
// 			<main className='container mx-auto px-4 py-8'>
// 				<section className='max-w-4xl mx-auto space-y-8'>
// 					<h1 className='text-4xl font-bold mb-4'>Welcome to My Blog</h1>
// 					<div className='text-xl'>
// 						Dive into a world of creativity, innovation, and flavors! Here, you’ll find:
// 						<ul>
// 							<li>Tech Tutorials: Simplifying coding concepts and showcasing CSS & JavaScript animations to bring your web designs to life.</li>
// 							<li>Other Media: Explore the art of video production and animations, where visuals tell the story.</li>
// 							<li>Fusion Food: Savor the blend of Asian-inspired cuisine and global tastes for a culinary adventure.</li>
// 							<li>Personal Stories: A window into my journey, thoughts, and experiences.</li>
// 						</ul>
// 						<p>Whether you’re here to learn, create, or simply be inspired, there’s something for everyone. Let’s explore together!</p>
// 					</div>
// 				</section>
// 			</main>
// 		</ThemeProvider>
// 	);
// }

```

# src/app/providers.tsx

```tsx
// src/app/providers.tsx
"use client";
import { ThemeContextProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return <ThemeContextProvider>{children}</ThemeContextProvider>;
}

// // src/app/providers.tsx
// "use client";
// import { ThemeContextProvider } from "@/contexts/ThemeContext";

// // Comment out styled-components imports
// // import { ThemeProvider } from 'styled-components'
// // import StyledComponentsRegistry from '@/lib/registry'
// // import { GlobalStyle } from '@/lib/theme'
// // import { ThemeContextProvider, useTheme } from '@/contexts/ThemeContext'

// export function Providers({ children }: { children: React.ReactNode }) {
// 	// Temporarily just return children
// 	return <ThemeContextProvider>{children}</ThemeContextProvider>;

// 	// Comment out the previous providers
// 	// return (
// 	//   <StyledComponentsRegistry>
// 	//     <ThemeContextProvider>
// 	//       <ThemedContent>{children}</ThemedContent>
// 	//     </ThemeContextProvider>
// 	//   </StyledComponentsRegistry>
// 	// )
// }
// // // src/app/providers.tsx
// // 'use client'
// // import { ThemeProvider } from 'styled-components'
// // import StyledComponentsRegistry from '@/lib/registry'
// // import { ThemeContextProvider, useTheme } from '@/contexts/ThemeContext'
// // import { GlobalStyle } from '@/lib/theme'

// // function ThemedContent({ children }: { children: React.ReactNode }) {
// //   const { theme } = useTheme()

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <GlobalStyle />
// //       {children}
// //     </ThemeProvider>
// //   )
// // }

// // export function Providers({ children }: { children: React.ReactNode }) {
// //   return (
// //     <StyledComponentsRegistry>
// //       <ThemeContextProvider>
// //         <ThemedContent>{children}</ThemedContent>
// //       </ThemeContextProvider>
// //     </StyledComponentsRegistry>
// //   )
// // }

// // // // src/app/providers.tsx
// // // 'use client'
// // // import { useEffect } from 'react'
// // // import StyledComponentsRegistry from '@/lib/registry'

// // // export function Providers({ children }: { children: React.ReactNode }) {
// // //   useEffect(() => {
// // //     const theme = localStorage.getItem('theme')
// // //     if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
// // //       document.documentElement.classList.add('dark')
// // //     }
// // //   }, [])

// // //   return (
// // //     <StyledComponentsRegistry>
// // //       {children}
// // //     </StyledComponentsRegistry>
// // //   )
// // // }

// // // // // src/app/providers.tsx
// // // // 'use client'
// // // // import { ThemeProvider as StyledThemeProvider } from 'styled-components'
// // // // import { ThemeProvider } from '@/lib/ThemeContext'
// // // // import StyledComponentsRegistry from '@/lib/registry'
// // // // import { GlobalStyle } from '@/lib/theme'
// // // // import { useTheme } from '@/lib/ThemeContext'

// // // // function StyledProviders({ children }: { children: React.ReactNode }) {
// // // //   const { theme } = useTheme()

// // // //   return (
// // // //     <StyledThemeProvider theme={theme}>
// // // //       <GlobalStyle />
// // // //       {children}
// // // //     </StyledThemeProvider>
// // // //   )
// // // // }

// // // // export function Providers({ children }: { children: React.ReactNode }) {
// // // //   return (
// // // //     <StyledComponentsRegistry>
// // // //       <ThemeProvider>
// // // //         <StyledProviders>
// // // //           {children}
// // // //         </StyledProviders>
// // // //       </ThemeProvider>
// // // //     </StyledComponentsRegistry>
// // // //   )
// // // // }
// // // // // // src/app/providers.tsx - Updated to prevent hydration mismatches
// // // // // 'use client'
// // // // // import { useState, useEffect, useCallback } from 'react'
// // // // // import { useTheme } from '@/hooks/useTheme'
// // // // // import { ThemeProvider } from 'styled-components'
// // // // // import { lightTheme, darkTheme } from '@/lib/theme-config'
// // // // // import StyledComponentsRegistry from '@/lib/registry'
// // // // // import { GlobalStyle } from '@/lib/theme'

// // // // // export function Providers({ children }: { children: React.ReactNode }) {
// // // // //    const { theme, mounted } = useTheme()

// // // // //   if (!mounted) {
// // // // //     return null
// // // // //   }

// // // // //   return (
// // // // //     <StyledComponentsRegistry>
// // // // //       <ThemeProvider theme={theme}>
// // // // //         <GlobalStyle />
// // // // //         {children}
// // // // //       </ThemeProvider>
// // // // //     </StyledComponentsRegistry>
// // // // //   )
// // // // // }

// // // // // //   // Use null initial state to prevent hydration mismatch
// // // // // //   const [mounted, setMounted] = useState(false)
// // // // // //   const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null)

// // // // // //   // Move theme detection to a separate effect
// // // // // //   useEffect(() => {
// // // // // //     const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
// // // // // //     setIsDarkMode(darkModeQuery.matches)

// // // // // //     const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
// // // // // //     darkModeQuery.addEventListener('change', handleChange)
// // // // // //     return () => darkModeQuery.removeEventListener('change', handleChange)
// // // // // //   }, [])

// // // // // //   // Separate mount effect to ensure sequential execution
// // // // // //   useEffect(() => {
// // // // // //     setMounted(true)
// // // // // //   }, [])

// // // // // //   // Render nothing until mounted and theme is detected
// // // // // //   if (!mounted || isDarkMode === null) {
// // // // // //     return null
// // // // // //   }

// // // // // //   return (
// // // // // //     <StyledComponentsRegistry>
// // // // // //       <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
// // // // // //         <GlobalStyle />
// // // // // //         {children}
// // // // // //       </ThemeProvider>
// // // // // //     </StyledComponentsRegistry>
// // // // // //   )
// // // // // // }

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
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
// import { categories, CategoryId } from "@/data/categories";
// import styled from "styled-components";
import { categories, CategoryId } from "@/data/categories";

type Post = {
	id: string;
	title: string;
	excerpt: string;
	category: CategoryId;
	date: string;
	slug: string;
	cover_image?: string;
};

const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: "large" | "medium" | "full"; title?: string; description?: string }) => (
	<div
		className={`relative overflow-hidden rounded-xl bg-primary-800
      ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
         transition-transform duration-300 hover:scale-[1.02]`}
	>
		{post ? (
			<Link
				href={`/blog/${post.slug}`}
				className='buttonContainer group block h-[250px] aspect-[16/9]'
			>
				{post.cover_image ? (
					<div className='absolute inset-0'>
						<Image
							src={post.cover_image}
							alt={post.title}
							fill
							className='object-cover transition-transform duration-500 group-hover:scale-105'
							sizes={size === "full" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
							priority={size === "large"}
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
						{/* <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' /> */}
					</div>
				) : (
					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
				)}
				<div className='absolute inset-0 p-6 flex flex-col justify-end'>
					<div className={`text-sm font-medium ${category.textColor} mb-2`}>{title || category.name}</div>
					{/* <div className={`text-sm font-medium text-primary-300 mb-2`}>{title || category.name}</div> */}
					{/* <div className={`text-sm font-medium ${category.textColor} mb-2`}>{title || category.name}</div> */}
					<h3 className='text-2xl font-bold text-white mb-2 group-hover:text-brand-primary-200 transition-colors'>{post.title}</h3>
					{/* bg-brand-primary text-white */}
					{/* <h3 className='text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3> */}
					<p className='text-gray-300 line-clamp-2'>{description || post.excerpt}</p>
				</div>
			</Link>
		) : (
			<div className='aspect-[16/9] relative'>
				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
					<div className='absolute inset-0 p-6 flex items-center justify-center'>
						<p className='text-xl text-white/70'>No {category.name} posts yet</p>
					</div>
				</div>
			</div>
		)}
	</div>
);

export default function BlogDashboard({ posts }: { posts: Post[] }) {
	const [mounted, setMounted] = useState(false);
	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);
	// Don't render anything until component is mounted to prevent hydration mismatch
	if (!mounted) {
		return null;
	}

	// Helper function to get category background color
	const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
		switch (categoryId) {
			case "tech":
				return isActive ? "bg-primary-600" : "bg-primary-800 hover:bg-gray-700";
			case "media":
				return isActive ? "bg-secondary-600" : "bg-primary-800 hover:bg-gray-700";
			case "food":
				return isActive ? "bg-accent-600" : "bg-primary-800 hover:bg-gray-700";
			case "personal":
				return isActive ? "bg-success-600" : "bg-primary-800 hover:bg-gray-700";
			default:
				return "bg-primary-800 hover:bg-gray-700";
		}
	};

	// Helper function to get text color
	const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
		if (isActive) return "text-white";

		switch (categoryId) {
			case "tech":
				return "text-primary-300";
			case "media":
				return "text-secondary-300";
			case "food":
				return "text-accent-300";
			case "personal":
				return "text-primary-200";
			default:
				return "text-gray-300";
		}
	};

	// Get featured posts
	const techPost = posts.find((post) => post.category === "tech");
	const mediaPost = posts.find((post) => post.category === "media");
	const foodPost = posts.find((post) => post.category === "food");

	// Filter remaining posts
	const featuredIds = [techPost?.id, mediaPost?.id, foodPost?.id].filter(Boolean);
	const remainingPosts = posts.filter((post) => !featuredIds.includes(post.id));

	return (
		<div className='max-w-7xl mx-auto px-4 py-8 space-y-12'>
			{/* Category buttons */}
			<div className='featuredButtonsContainer grid grid-cols-1 md:grid-cols-4 gap-4'>
				{categories.map((category) => {
					const Icon = category.icon;
					const isActive = activeCategory === category.id;
					// console.log("Button Classes:", `p-4 rounded-lg flex items-center space-x-3 transition-all ${activeCategory === category.id ? `${category.color} text-white` : "bg-primary-800 hover:bg-primary-700"}`);
					return (
						<button
							key={category.id}
							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
							className={`
                        p-4 rounded-lg flex items-center space-x-3 transition-all
                        ${getCategoryColor(category.id, isActive)}
                      `}
						>
							<Icon
								size={24}
								className={getTextColor(category.id, isActive)}
							/>
							{/* orig */}
							{/* <span className={`font-medium ${isActive ? "text-white" : ""}`}>{category.name}</span> */}
							{/* manual */}
							{/* <span className={`font-medium ${isActive ? "text-white" : "text-gray-300 dark:text-gray-400"}`}>{category.name}</span> */}
							{/* using helper */}
							<span className={`font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
						</button>
					);
				})}
				{/* {categories.map((category) => {
					const Icon = category.icon;
					return (
						<button
							key={category.id}
							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
							className={`p-4 rounded-lg flex items-center space-x-3 transition-all ${activeCategory === category.id ? `${category.color} text-white dark:opacity-90` : "bg-primary-800 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"}`}
						>

							<Icon size={24} />
							<span className='font-medium'>{category.name}</span>
						</button>
					);
				})} */}
			</div>

			{/* Featured Posts Grid */}
			{!activeCategory && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{techPost && (
						<div className='md:col-span-2 md:row-span-2'>
							<FeaturedCard
								post={techPost}
								category={categories[0]}
								size='large'
								title='Featured Tech Article'
							/>
						</div>
					)}
					{mediaPost && (
						<div className='md:col-span-2'>
							<FeaturedCard
								post={mediaPost}
								category={categories[1]}
								size='medium'
								title='Latest Media'
							/>
						</div>
					)}
					{foodPost && (
						<div className='md:col-span-2 lg:col-span-4 lg:col-start-1'>
							<FeaturedCard
								post={foodPost}
								category={categories[2]}
								size='full'
								title='Latest Recipe'
							/>
						</div>
					)}
				</div>
			)}
			{/* Works but no responsiveness */}
			{/* {!activeCategory && (
				<div className="grid grid-cols-4 gap-6">
					{techPost && (
						<div className="col-span-2 row-span-2">
							<FeaturedCard post={techPost} category={categories[0]} size="large" title="Featured Tech Article" />
						</div>
					)}
					{mediaPost && (
						<div className="col-span-2">
							<FeaturedCard post={mediaPost} category={categories[1]} size="medium" title="Latest Media" />
						</div>
					)}
               {foodPost && (
                  <div className="col-span-4 col-start-1">
                     <FeaturedCard post={foodPost} category={categories[2]} size="full" title="Latest Recipe" />
                  </div>
               )}
				</div>
			)} */}

			{/* Doesn't work */}
			{/* {!activeCategory && (
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{techPost && (
						<div className="md:col-span-2 md:row-span-2">
							<FeaturedCard post={techPost} category={categories[0]} size="large" title="Featured Tech Article" />
						</div>
					)}
					{mediaPost && (
						<div className="md:col-span-2">
							<FeaturedCard post={mediaPost} category={categories[1]} size="medium" title="Latest Media" />
						</div>
					)}
					{foodPost && (
						<div className="md:col-span-2">
							// <FeaturedCard post={foodPost} category={categories[2]} size="medium" title="Latest Recipe" />
							<FeaturedCard post={foodPost} category={categories[2]} size="full" title="Latest Recipe" />
						</div>
					)}
				</div>
			)} */}

			{/* Regular Posts Grid */}
			<div>
				<h2 className='text-2xl font-bold mb-6'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
					{(activeCategory ? posts.filter((post) => post.category === activeCategory) : remainingPosts).map((post) => (
						<Link
							key={post.id}
							href={`/blog/${post.slug}`}
							className='group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow'
						>
							<div className='aspect-[16/9] relative bg-gray-900'>
								{post.cover_image && (
									<Image
										src={post.cover_image}
										alt={post.title}
										fill
										className='object-cover'
										sizes='(max-width: 768px) 100vw, 25vw'
									/>
								)}
							</div>
							<div className='p-4'>
								<div className='flex justify-between items-center mb-2'>
									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
									<span className='text-sm text-gray-400'>{post.date}</span>
								</div>
								<h3 className='text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3>
								<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
// src/components/BlogDashboard.tsx
// "use client";
// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ArrowLeft } from 'lucide-react';
// import { categories, CategoryId } from '@/data/categories';

// type Post = {
//   id: string;
//   title: string;
//   excerpt: string;
//   category: CategoryId;
//   date: string;
//   slug: string;
//   cover_image?: string;
// };

// const FeaturedCard = ({ post, category, size = "medium", title, description }: {
//   post?: Post;
//   category: typeof categories[number];
//   size: "large" | "medium";
//   title?: string;
//   description?: string;
// }) => (
//   <div className={`relative overflow-hidden rounded-xl bg-gray-800 ${
//     size === "large" ? "row-span-2 col-span-2" : "col-span-1"
//   } transition-transform duration-300 hover:scale-[1.02]`}>
//     {post ? (
//       <Link href={`/blog/${post.slug}`} className="group block h-full aspect-[16/9]">
//         {post.cover_image ? (
//           <div className="absolute inset-0">
//             <Image
//               src={post.cover_image}
//               alt={post.title}
//               fill
//               className="object-cover transition-transform duration-500 group-hover:scale-105"
//               sizes="(max-width: 768px) 100vw, 50vw"
//               priority={size === "large"}
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
//           </div>
//         ) : (
//           <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
//         )}
//         <div className="absolute inset-0 p-6 flex flex-col justify-end">
//           <div className={`text-sm font-medium ${category.textColor} mb-2`}>
//             {title || category.name}
//           </div>
//           <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
//             {post.title}
//           </h3>
//           <p className="text-gray-300 line-clamp-2">
//             {description || post.excerpt}
//           </p>
//         </div>
//       </Link>
//     ) : (
//       <div className="aspect-[16/9] relative">
//         <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
//           <div className="absolute inset-0 p-6 flex items-center justify-center">
//             <p className="text-xl text-white/70">No {category.name} posts yet</p>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );

// export default function BlogDashboard({ posts }: { posts: Post[] }) {
//   const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

//   // Get featured posts
//   const techPost = posts.find(post => post.category === 'tech');
//   const mediaPost = posts.find(post => post.category === 'media');
//   const foodPost = posts.find(post => post.category === 'food');

//   // Filter remaining posts
//   const featuredIds = [techPost?.id, mediaPost?.id, foodPost?.id].filter(Boolean);
//   const remainingPosts = posts.filter(post => !featuredIds.includes(post.id));

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
//       {/* Category buttons */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {categories.map((category) => {
//           const Icon = category.icon;
//           return (
//             <button
//               key={category.id}
//               onClick={() => setActiveCategory(
//                 activeCategory === category.id ? null : category.id as CategoryId
//               )}
//               className={`p-4 rounded-lg flex items-center space-x-3 transition-all
//                 ${activeCategory === category.id ?
//                   category.color + ' text-white' :
//                   'bg-gray-800 hover:bg-gray-700'}`}
//             >
//               <Icon size={24} />
//               <span className="font-medium">{category.name}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Featured Posts Grid */}
//       {!activeCategory && (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {techPost && (
//             <div className="md:col-span-2 md:row-span-2">
//               <FeaturedCard
//                 post={techPost}
//                 category={categories[0]}
//                 size="large"
//                 title="Featured Tech Article"
//               />
//             </div>
//           )}
//           {mediaPost && (
//             <div className="md:col-span-2">
//               <FeaturedCard
//                 post={mediaPost}
//                 category={categories[1]}
//                 size="medium"
//                 title="Latest Media"
//               />
//             </div>
//           )}
//           {foodPost && (
//             <div className="md:col-span-2">
//               <FeaturedCard
//                 post={foodPost}
//                 category={categories[2]}
//                 size="medium"
//                 title="Latest Recipe"
//               />
//             </div>
//           )}
//         </div>
//       )}

//       {/* Regular Posts Grid */}
//       <div>
//         <h2 className="text-2xl font-bold mb-6">
//           {activeCategory ?
//             categories.find(c => c.id === activeCategory)?.name :
//             'All Posts'}
//         </h2>
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           {(activeCategory ?
//             posts.filter(post => post.category === activeCategory) :
//             remainingPosts
//           ).map((post) => (
//             <Link
//               key={post.id}
//               href={`/blog/${post.slug}`}
//               className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <div className="aspect-[16/9] relative bg-gray-900">
//                 {post.cover_image && (
//                   <Image
//                     src={post.cover_image}
//                     alt={post.title}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 100vw, 25vw"
//                   />
//                 )}
//               </div>
//               <div className="p-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className={`text-sm ${
//                     categories.find(c => c.id === post.category)?.textColor
//                   }`}>
//                     {categories.find(c => c.id === post.category)?.name}
//                   </span>
//                   <span className="text-sm text-gray-400">{post.date}</span>
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
//                   {post.title}
//                 </h3>
//                 <p className="text-gray-300 text-sm line-clamp-2">
//                   {post.excerpt}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// // "use client";
// // import { useState } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { ArrowLeft } from "lucide-react";
// // import { categories, CategoryId } from "@/data/categories";
// // import { PostCard } from "@/components/PostCard";

// // // Grid size configuration types
// // type GridSize = "large" | "medium" | "small";

// // // interface GridConfig {
// // //   cols: number;
// // //   rows: number;
// // //   className: string;
// // // }

// // // const gridSizeConfigs: Record<GridSize, GridConfig> = {
// // //   large: {
// // //     cols: 2,
// // //     rows: 2,
// // //     className: 'col-span-2 row-span-2 aspect-[16/9]'
// // //   },
// // //   medium: {
// // //     cols: 1,
// // //     rows: 1,
// // //     className: 'col-span-1 row-span-1 aspect-[4/3]'
// // //   },
// // //   small: {
// // //     cols: 1,
// // //     rows: 1,
// // //     className: 'col-span-1 aspect-square'
// // //   }
// // // };

// // // type FeaturedSetup = {
// // //   category: CategoryId;
// // //   size: GridSize;
// // //   order: number;
// // //   title?: string;
// // //   description?: string;
// // // }[];

// // export type Post = {
// // 	id: string;
// // 	title: string;
// // 	excerpt: string;
// // 	category: CategoryId;
// // 	date: string;
// // 	slug: string;
// // 	cover_image?: string;
// // };

// // export type FeaturedSetup = {
// // 	category: CategoryId;
// // 	size: GridSize;
// // 	order: number;
// // 	title?: string;
// // 	description?: string;
// // }[];

// // interface GridConfig {
// // 	cols: number;
// // 	rows: number;
// // 	className: string;
// // }

// // const gridSizeConfigs: Record<GridSize, GridConfig> = {
// // 	large: {
// // 		cols: 2,
// // 		rows: 2,
// // 		className: "col-span-2 row-span-2 aspect-[16/9]",
// // 	},
// // 	medium: {
// // 		cols: 1,
// // 		rows: 1,
// // 		className: "col-span-1 row-span-1 aspect-[4/3]",
// // 	},
// // 	small: {
// // 		cols: 1,
// // 		rows: 1,
// // 		className: "col-span-1 aspect-square",
// // 	},
// // };

// // // Default featured setup - can be overridden via props
// // const defaultFeatures: FeaturedSetup = [
// // 	{
// // 		category: "tech",
// // 		size: "large",
// // 		order: 0,
// // 		title: "Latest in Tech",
// // 		description: "Latest tech insights and tutorials",
// // 	},
// // 	{
// // 		category: "media",
// // 		size: "medium",
// // 		order: 1,
// // 		title: "Media & Reviews",
// // 		description: "Recent media coverage and reviews",
// // 	},
// // 	{
// // 		category: "food",
// // 		size: "medium",
// // 		order: 2,
// // 		title: "Food & Recipes",
// // 		description: "Latest recipes and culinary adventures",
// // 	},
// // ];

// // interface BlogDashboardProps {
// // 	posts: Post[];
// // 	featuredSetup?: FeaturedSetup;
// // }

// // export default function BlogDashboard({ posts, featuredSetup = defaultFeatures }: BlogDashboardProps) {
// // 	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

// // 	// Calculate grid layout
// // 	const getFeaturedLayout = () => {
// // 		const totalCols = 4; // Base grid is 4 columns
// // 		let usedCols = 0;
// // 		let gridTemplateAreas = "";

// // 		featuredSetup.forEach((feature, index) => {
// // 			const config = gridSizeConfigs[feature.size];
// // 			if (usedCols + config.cols > totalCols) {
// // 				gridTemplateAreas += `"`;
// // 				usedCols = 0;
// // 			}
// // 			gridTemplateAreas += ` area${index}`;
// // 			usedCols += config.cols;
// // 		});

// // 		return gridTemplateAreas;
// // 	};

// // 	// Get featured posts based on setup
// // 	const featuredPosts = featuredSetup
// // 		.sort((a, b) => a.order - b.order)
// // 		.map((feature) => ({
// // 			post: posts.find((post) => post.category === feature.category),
// // 			category: categories.find((c) => c.id === feature.category)!,
// // 			size: feature.size,
// // 			title: feature.title,
// // 			description: feature.description,
// // 		}));

// // 	// Filter remaining posts, excluding featured ones
// // 	const featuredPostIds = featuredPosts.map((f) => f.post?.id).filter(Boolean) as string[];
// // 	const filteredPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => !featuredPostIds.includes(post.id));

// // 	const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[0]; size: GridSize; title?: string; description?: string }) => (
// // 		<div
// // 			className={`relative overflow-hidden rounded-xl bg-gray-800
// //       ${gridSizeConfigs[size].className}
// //       transition-transform duration-300 hover:scale-[1.02]`}
// // 		>
// // 			{post ? (
// // 				<Link href={`/blog/${post.slug}`} className="group block h-full">
// // 					{post.cover_image ? (
// // 						<div className="absolute inset-0">
// // 							<Image src={post.cover_image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes={size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"} priority={size === "large"} />
// // 							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// // 						</div>
// // 					) : (
// // 						<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// // 					)}
// // 					<div className="absolute inset-0 p-6 flex flex-col justify-end">
// // 						<div className={`text-sm font-medium ${category.textColor} mb-2`}>{title || category.name}</div>
// // 						<h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
// // 						<p className="text-gray-300 line-clamp-2">{description || post.excerpt}</p>
// // 					</div>
// // 				</Link>
// // 			) : (
// // 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// // 					<div className="absolute inset-0 p-6 flex items-center justify-center">
// // 						<p className="text-xl text-white/70">No {category.name} posts yet</p>
// // 					</div>
// // 				</div>
// // 			)}
// // 		</div>
// // 	);

// // 	return (
// // 		<div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// // 			{/* Categories buttons */}
// // 			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // 				{categories.map((category) => {
// // 					const Icon = category.icon;
// // 					return (
// // 						<button
// // 							key={category.id}
// // 							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
// // 							className={`p-4 rounded-lg flex items-center space-x-3 transition-all
// //                 ${activeCategory === category.id ? category.color + " text-white" : "bg-gray-800 hover:bg-gray-700"}`}
// // 						>
// // 							<Icon size={24} />
// // 							<span className="font-medium">{category.name}</span>
// // 						</button>
// // 					);
// // 				})}
// // 			</div>

// // 			{activeCategory ? (
// // 				<div className="space-y-8">
// // 					<div className="flex justify-between items-start">
// // 						<div>
// // 							<button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
// // 								<ArrowLeft size={20} />
// // 								<span>Back to all posts</span>
// // 							</button>
// // 							<h2 className="text-3xl font-bold mb-2">{categories.find((c) => c.id === activeCategory)?.name}</h2>
// // 							<p className="text-gray-300 max-w-2xl">{categories.find((c) => c.id === activeCategory)?.description}</p>
// // 						</div>
// // 					</div>
// // 					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// // 						{filteredPosts.map((post) => (
// // 							<PostCard key={post.id} post={post} />
// // 						))}
// // 					</div>
// // 				</div>
// // 			) : (
// // 				<>
// // 					<div
// // 						className="featuredBlogsContainer grid gap-8"
// // 						style={{
// // 							gridTemplateColumns: "repeat(4, 1fr)",
// // 							gridTemplateAreas: getFeaturedLayout(),
// // 						}}
// // 					>
// // 						{featuredPosts.map(({ post, category, size, title, description }, index) => (
// // 							<div key={post?.id || index} style={{ gridArea: `area${index}` }}>
// // 								<FeaturedCard post={post} category={category} size={size} title={title} description={description} />
// // 							</div>
// // 						))}
// // 					</div>

// // 					<div>
// // 						<h2 className="text-2xl font-bold mb-6">All Posts</h2>
// // 						<div className="allPostsContainer grid gap-6 md:grid-cols-2 lg:grid-cols-4">
// // 							{filteredPosts.map((post) => (
// // 								<PostCard key={post.id} post={post} />
// // 							))}
// // 						</div>
// // 					</div>
// // 				</>
// // 			)}
// // 		</div>
// // 	);
// // }
// // // // src/components/BlogDashboard.tsx
// // // "use client";

// // // import { useState } from "react";
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { ArrowLeft } from "lucide-react";
// // // import { categories, CategoryId } from "@/data/categories";
// // // import { PostCard } from "@/components/PostCard";

// // // type Post = {
// // // 	id: string;
// // // 	title: string;
// // // 	excerpt: string;
// // // 	category: CategoryId;
// // // 	date: string;
// // // 	slug: string;
// // // 	cover_image?: string;
// // // };

// // // export default function BlogDashboard({ posts }: { posts: Post[] }) {
// // // 	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

// // // 	// Find featured posts before any filtering
// // // 	const latestTechPost = posts.find((post) => post.category === "tech");
// // // 	const latestMediaPost = posts.find(post => post.category === 'media');

// // // 	// Get remaining posts AFTER removing both featured posts
// // // 	// const remainingPosts = posts.filter(post => {
// // // 	//   const isFeaturedTech = post.id === latestTechPost?.id;
// // // 	//   const isFeaturedMedia = post.id === latestMediaPost?.id;
// // // 	//   return !isFeaturedTech && !isFeaturedMedia;
// // // 	// });

// // // 	// Get filtered posts based on active category
// // // 	const filteredPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => post.id !== latestTechPost?.id);

// // // 	const FeaturedCard = ({ post, category }: { post?: Post; category: (typeof categories)[0] }) => (
// // // 		<div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800">
// // // 			{post ? (
// // // 				<Link href={`/blog/${post.slug}`} className="group block h-full">
// // // 					{post.cover_image ? (
// // // 						<div className="absolute inset-0">
// // // 							<Image src={post.cover_image} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
// // // 							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
// // // 						</div>
// // // 					) : (
// // // 						<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// // // 					)}
// // // 					<div className="absolute inset-0 p-6 flex flex-col justify-end">
// // // 						<div className={`text-sm font-medium ${category.textColor} mb-2`}>{category.name}</div>
// // // 						<h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
// // // 						<p className="text-gray-300 line-clamp-2">{post.excerpt}</p>
// // // 					</div>
// // // 				</Link>
// // // 			) : (
// // // 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// // // 					<div className="absolute inset-0 p-6 flex items-center justify-center">
// // // 						<p className="text-xl text-white/70">No {category.name} posts yet</p>
// // // 					</div>
// // // 				</div>
// // // 			)}
// // // 			<Link
// // // 				href="#"
// // // 				onClick={(e) => {
// // // 					e.preventDefault();
// // // 					setActiveCategory(category.id as CategoryId);
// // // 				}}
// // // 				className={`absolute top-4 right-4 px-3 py-1.5 rounded-full ${category.color}
// // //           text-white text-sm font-medium hover:opacity-90 transition-opacity`}
// // // 			>
// // // 				{category.name}
// // // 			</Link>
// // // 		</div>
// // // 	);

// // // 	return (
// // // 		<div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// // // 			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// // // 				{categories.map((category) => {
// // // 					const Icon = category.icon;
// // // 					return (
// // // 						<button
// // // 							key={category.id}
// // // 							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
// // // 							className={`p-4 rounded-lg flex items-center space-x-3 transition-all
// // //                 ${activeCategory === category.id ? category.color + " text-white" : "bg-gray-800 hover:bg-gray-700"}`}
// // // 						>
// // // 							<Icon size={24} />
// // // 							<span className="font-medium">{category.name}</span>
// // // 						</button>
// // // 					);
// // // 				})}
// // // 			</div>

// // // 			{activeCategory ? (
// // // 				<div className="space-y-8">
// // // 					<div className="flex justify-between items-start">
// // // 						<div>
// // // 							<button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
// // // 								<ArrowLeft size={20} />
// // // 								<span>Back to all posts</span>
// // // 							</button>
// // // 							<h2 className="text-3xl font-bold mb-2">{categories.find((c) => c.id === activeCategory)?.name}</h2>
// // // 							<p className="text-gray-300 max-w-2xl">{categories.find((c) => c.id === activeCategory)?.description}</p>
// // // 						</div>
// // // 					</div>
// // // 					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// // // 						{filteredPosts.map((post) => (
// // // 							<PostCard key={post.id} post={post} />
// // // 						))}
// // // 					</div>
// // // 				</div>
// // // 			) : (
// // // 				<>
// // // 					<div className="featuredBogsContainer grid md:grid-cols-2 gap-8">
// // // 						<FeaturedCard post={latestTechPost} category={categories[0]} />
// // // 						<FeaturedCard post={latestMediaPost} category={categories[1]} />
// // // 					</div>

// // // 					<div>
// // // 						<h2 className="text-2xl font-bold mb-6">All Posts</h2>
// // // 						<div className="allPostsContainer grid gap-6 md:grid-cols-2 lg:grid-cols-4">
// // // 							{filteredPosts.map((post) => (
// // // 								<PostCard key={post.id} post={post} />
// // // 							))}
// // // 						</div>
// // // 					</div>
// // // 				</>
// // // 			)}
// // // 		</div>
// // // 	);
// // // }

```

# src/components/BlogPostContent.tsx

```tsx
// src/components/BlogPostContent.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Reactions } from "@/components/Reactions";
import { Comments } from "@/components/Comments";
import { useAuth } from "@/hooks/useAuth";
import { DeletePost } from "./DeletePost";

type Post = {
	id: string;
	title: string;
	content: string;
	excerpt?: string;
	cover_image?: string;
	created_at: string;
	slug: string;
	profiles?: {
		username?: string;
	};
};

export default function BlogPostContent({ post }: { post: Post }) {
	const { isAuthenticated } = useAuth();

	return (
		<div className='max-w-screen-2xl mx-auto px-4'>
			{/* Header Section */}
			<div className='flex justify-between items-center mb-8'>
				<Link
					href='/blog'
					className='text-primary-400 hover:text-primary-300'
				>
					← Back to posts
				</Link>
				{isAuthenticated && (
					<div className='space-x-4'>
						<Link
							href={`/blog/edit/${post.slug}`}
							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
						>
							Edit Post
						</Link>
						<DeletePost postId={post.id} />
					</div>
				)}
			</div>

			{/* Main Content Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
				{/* Left Column - Article Content */}
				<article className='relative'>
					{post.cover_image && (
						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
							<ImageWithFallback
								src={post.cover_image}
								alt={post.title}
								className='w-full h-full object-cover'
								priority
							/>
						</div>
					)}
					{/* Content */}
					<div className='prose prose-lg dark:prose-invert max-w-none'>
						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
						<div className='text-gray-400 dark:text-gray-400 mb-8'>
							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
						</div>

						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

						<div className='mt-8'>{post.content}</div>

						{/* Engagement Bar */}
						<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
							<Reactions postId={post.id} />
						</div>
					</div>
				</article>

				{/* Right Column - Comments */}
				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
					<Comments postId={post.id} />
				</div>
			</div>
		</div>
	);
}

// // src/components/BlogPostContent.tsx
// "use client";
// import BlogPostLayout from "./BlogPostLayout";
// import Link from "next/link";
// import { ImageWithFallback } from "@/components/ImageWithFallback";
// import { Reactions } from "@/components/Reactions";
// import { Comments } from "@/components/Comments";
// import { useAuth } from "@/hooks/useAuth";
// import { DeletePost } from "./DeletePost";

// type Post = {
// 	id: string;
// 	title: string;
// 	content: string;
// 	excerpt?: string;
// 	cover_image?: string;
// 	created_at: string;
// 	slug: string;
// 	profiles?: {
// 		username?: string;
// 	};
// };

// export default function BlogPostContent({ post }: { post: Post }) {
// 	const { isAuthenticated } = useAuth();

// 	return (
// 		<div className='max-w-screen-2xl mx-auto px-4'>
// 			{/* Header Section */}
// 			<div className='flex justify-between items-center mb-8'>
// 				<Link
// 					href='/blog'
// 					className='text-primary-400 hover:text-primary-300'
// 				>
// 					← Back to posts
// 				</Link>
// 				{isAuthenticated && (
// 					<div className='space-x-4'>
// 						<Link
// 							href={`/blog/edit/${post.slug}`}
// 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// 						>
// 							Edit Post
// 						</Link>
// 						<DeletePost postId={post.id} />
// 					</div>
// 				)}
// 			</div>

// 			{/* Main Content Grid */}
// 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// 				{/* Left Column - Article Content */}
// 				<article className='relative'>
// 					{post.cover_image && (
// 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// 							<ImageWithFallback
// 								src={post.cover_image}
// 								alt={post.title}
// 								className='w-full h-full object-cover'
// 								priority
// 							/>
// 						</div>
// 					)}

// 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// 							{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
// 						</div>

// 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// 						<div className='mt-8 content'>{post.content}</div>

// 						{/* Engagement Bar */}
// 						<div className='sticky bottom-0 bg-gray-200/80 backdrop-blur mt-8 p-4 rounded-lg'>
// 							<Reactions postId={post.id} />
// 						</div>
// 					</div>
// 				</article>

// 				{/* Right Column - Comments */}
// 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 p-4 rounded-lg'>
// 					<Comments postId={post.id} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
// // // src/components/BlogPostContent.tsx
// // "use client";
// // import BlogPostLayout from "./BlogPostLayout";

// // type BlogPostProps = {
// // 	post: {
// // 		id: string;
// // 		title: string;
// // 		content: string;
// // 		excerpt?: string;
// // 		cover_image?: string;
// // 		created_at: string;
// // 		slug: string;
// // 		profiles?: {
// // 			username?: string;
// // 		};
// // 	};
// // };

// // export default function BlogPostContent({ post }: BlogPostProps) {
// // 	return (
// // 		<article className='max-w-3xl mx-auto'>
// // 			<header className='mb-8'>
// // 				<h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
// // 				<div className='text-sm text-gray-600 dark:text-gray-400'>
// // 					{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
// // 				</div>
// // 			</header>

// // 			{post.excerpt && <p className='text-xl text-gray-600 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // 			<div className='prose dark:prose-invert max-w-none'>
// // 				{/* Your content rendering here */}
// // 				{post.content}
// // 			</div>
// // 		</article>
// // 	);
// // }

// // // // src/components/BlogPostContent.tsx
// // // "use client";
// // // import BlogPostLayout from "./BlogPostLayout";

// // // type Post = {
// // // 	id: string;
// // // 	title: string;
// // // 	content: string;
// // // 	excerpt?: string;
// // // 	cover_image?: string;
// // // 	created_at: string;
// // // 	slug: string;
// // // 	profiles?: {
// // // 		username?: string;
// // // 	};
// // // };

// // // export default function BlogPostContent({ post }: { post: Post }) {
// // // 	return <BlogPostLayout post={post} />;
// // // }
// // // // // src/components/BlogPostContent.tsx - Client Component
// // // // "use client";
// // // // import { Article, Title, Metadata, Content } from "./BlogPost.styles";
// // // // import { MarkdownContent } from "@/components/MarkdownContent";
// // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // import { Reactions } from "@/components/Reactions";
// // // // import { Comments } from "@/components/Comments";
// // // // import Link from "next/link";
// // // // import { DeletePost } from "@/components/DeletePost";
// // // // import { useAuth } from "@/hooks/useAuth";

// // // // type Post = {
// // // // 	id: string;
// // // // 	title: string;
// // // // 	content: string;
// // // // 	excerpt?: string;
// // // // 	cover_image?: string;
// // // // 	created_at: string;
// // // // 	slug: string;
// // // // 	profiles?: {
// // // // 		username?: string;
// // // // 	};
// // // // };

// // // // /*-=====================================================================================
// // // // BlogPostContent component serves as the main display template for individual blog posts,
// // // // combining content presentation with interactive features.
// // // // ======================================================================================-*/
// // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // //    const { isAuthenticated } = useAuth();

// // // // 	return (
// // // // 		<Article>
// // // // 			<div className="flex justify-between items-center mb-8">
// // // // 				<Link href="/blog" className="text-blue-400 hover:text-blue-300">
// // // // 					← Back to posts
// // // // 				</Link>
// // // // 				{isAuthenticated && (
// // // // 					<div className="space-x-4">
// // // // 						<Link href={`/blog/edit/${post.slug}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// // // // 							Edit Post
// // // // 						</Link>
// // // // 						<DeletePost postId={post.id} />
// // // // 					</div>
// // // // 				)}
// // // // 			</div>

// // // // 			{post.cover_image && (
// // // // 				<div className="relative rounded-lg overflow-hidden mb-8 aspect-video">
// // // // 					<ImageWithFallback src={post.cover_image} alt={post.title} className="w-full h-full" priority />
// // // // 				</div>
// // // // 			)}

// // // // 			<header>
// // // // 				<Title>{post.title}</Title>
// // // // 				<Metadata>
// // // // 					{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
// // // // 				</Metadata>
// // // // 			</header>

// // // // 			{post.excerpt && <p className="text-xl text-gray-300 mb-8 font-serif italic">{post.excerpt}</p>}

// // // // 			<Content>
// // // // 				<MarkdownContent content={post.content} />
// // // // 				<div className="mt-8 border-t border-gray-700 pt-8">
// // // // 					<Reactions postId={post.id} />
// // // // 				</div>
// // // // 			</Content>

// // // // 			<Comments postId={post.id} />
// // // // 		</Article>
// // // // 	);
// // // // }

// // // // // // src/components/BlogPostContent.tsx - Client Component
// // // // // 'use client'
// // // // // import { Article, Title, Metadata, Content } from './BlogPost.styles'
// // // // // import { MarkdownContent } from '@/components/MarkdownContent'
// // // // // import { ImageWithFallback } from '@/components/ImageWithFallback'
// // // // // import { Reactions } from '@/components/Reactions'
// // // // // import { Comments } from '@/components/Comments'
// // // // // import Link from 'next/link'
// // // // // import { DeletePost } from '@/components/DeletePost'

// // // // // type Post = {
// // // // //   id: string
// // // // //   title: string
// // // // //   content: string
// // // // //   excerpt?: string
// // // // //   cover_image?: string
// // // // //   created_at: string
// // // // //   slug: string
// // // // //   profiles?: {
// // // // //     username?: string
// // // // //   }
// // // // // }

// // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // //   return (
// // // // //     <Article>
// // // // //       <div className="flex justify-between items-center mb-8">
// // // // //         <Link href="/blog" className="text-blue-400 hover:text-blue-300">
// // // // //           ← Back to posts
// // // // //         </Link>
// // // // //         <div className="space-x-4">
// // // // //           <Link href={`/blog/edit/${post.slug}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// // // // //             Edit Post
// // // // //           </Link>
// // // // //           <DeletePost postId={post.id} />
// // // // //         </div>
// // // // //       </div>

// // // // //       {post.cover_image && (
// // // // //         <div className="relative rounded-lg overflow-hidden mb-8 aspect-video">
// // // // //           <ImageWithFallback
// // // // //             src={post.cover_image}
// // // // //             alt={post.title}
// // // // //             className="w-full h-full"
// // // // //             priority
// // // // //           />
// // // // //         </div>
// // // // //       )}

// // // // //       <header>
// // // // //         <Title>{post.title}</Title>
// // // // //         <Metadata>
// // // // //           {new Date(post.created_at).toLocaleDateString()} •
// // // // //           {post.profiles?.username || 'Anonymous'}
// // // // //         </Metadata>
// // // // //       </header>

// // // // //       {post.excerpt && (
// // // // //         <p className="text-xl text-gray-300 mb-8 font-serif italic">
// // // // //           {post.excerpt}
// // // // //         </p>
// // // // //       )}

// // // // //       <Content>
// // // // //         <MarkdownContent content={post.content} />
// // // // //         <div className="mt-8 border-t border-gray-700 pt-8">
// // // // //           <Reactions postId={post.id} />
// // // // //         </div>
// // // // //       </Content>

// // // // //       <Comments postId={post.id} />
// // // // //     </Article>
// // // // //   )
// // // // // }

```

# src/components/BlogPostLayout.tsx

```tsx
// src/components/BlogPostLayout.tsx
import { useState } from "react";
import { Heart, Share2, MessageSquare } from "lucide-react";
import { Article, Title, Metadata, Content } from "./BlogPost.styles";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Reactions } from "@/components/Reactions";
import { Comments } from "@/components/Comments";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { DeletePost } from "./DeletePost";

type BlogPostLayoutProps = {
	post: {
		id: string;
		title: string;
		content: string;
		excerpt?: string;
		cover_image?: string;
		created_at: string;
		slug: string;
		profiles?: {
			username?: string;
		};
	};
	children?: React.ReactNode;
};

export default function BlogPostLayout({ post, children }: BlogPostLayoutProps) {
	const [isOpen, setIsOpen] = useState(true);
	const { isAuthenticated } = useAuth();

	return (
		<div className='max-w-screen-2xl mx-auto px-4'>
			{/* Header Section */}
			<div className='flex justify-between items-center mb-8'>
				<Link
					href='/blog'
					className='text-brand-primary-400 hover:text-brand-primary-300'
				>
					← Back to posts
				</Link>
				{isAuthenticated && (
					<div className='space-x-4'>
						<Link
							href={`/blog/edit/${post.slug}`}
							className='bg-brand-primary-500 text-white px-4 py-2 rounded hover:bg-brand-primary-600'
						>
							Edit Post
						</Link>
						<DeletePost postId={post.id} />
					</div>
				)}
			</div>

			{/* Main Content Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
				{/* Left Column - Article Content */}
				<article className='relative'>
					{post.cover_image && (
						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
							<ImageWithFallback
								src={post.cover_image}
								alt={post.title}
								className='w-full h-full'
								priority
							/>
						</div>
					)}

					<div className='prose prose-lg max-w-none'>
						{/* <Title>{post.title}</Title> • styled-components */}
						<h1 className='text-3xl font-bold mb-4 text-primary-500 dark:text-primary-400'>{post.title}</h1>
						<Metadata>
							{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
						</Metadata>
						<div className='dateContainer text-primary-400 mb-8 font-serif italic'>
							{new Date(post.created_at).toLocaleDateString()} •{post.profiles?.username || "Anonymous"}
						</div>

						{post.excerpt && <p className='text-xl text-gray-300 mb-8 font-serif italic'>{post.excerpt}</p>}

						<MarkdownContent content={post.content} />
					</div>

					{/* Engagement Bar */}
					<div className='sticky bottom-0 bg-gray-900/80 backdrop-blur mt-8 p-4 rounded-lg'>
						<div className='flex items-center justify-between'>
							<Reactions postId={post.id} />
							<div className='flex gap-4'>
								<button className='flex items-center gap-2 text-gray-300 hover:text-white'>
									<MessageSquare size={20} />
									<span>{isOpen ? "Hide" : "Show"} Comments</span>
								</button>
								<button className='flex items-center gap-2 text-gray-300 hover:text-white'>
									<Share2 size={20} />
									Share
								</button>
							</div>
						</div>
					</div>
				</article>

				{/* Right Column - Comments */}
				<div className={`lg:block ${isOpen ? "block" : "hidden"}`}>
					<div className='sticky top-4'>
						<Comments postId={post.id} />
					</div>
				</div>
			</div>
		</div>
	);
}

```

# src/components/ClientOnly.tsx

```tsx
// src/components/ClientOnly.tsx - New component for client-only rendering
'use client'
import { useEffect, useState } from 'react'

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <>{children}</>
}


```

# src/components/Comments.tsx

```tsx
// src/components/Comments.tsx
"use client";
import { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/auth";

type Comment = {
	id: string;
	post_id: string;
	content: string;
	author_name?: string;
	created_at: string;
};

export function Comments({ postId }: { postId: string }) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [content, setContent] = useState("");
	const [authorName, setAuthorName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadComments();
	}, [postId]);

	const loadComments = async () => {
		const { data, error } = await supabaseClient.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });

		if (error) {
			setError("Failed to load comments");
			return;
		}
		setComments(data || []);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim() || !authorName.trim()) return;

		setIsSubmitting(true);
		setError(null);

		try {
			const { error: insertError } = await supabaseClient.from("comments").insert({
				post_id: postId,
				content: content.trim(),
				author_name: authorName.trim(),
				created_at: new Date().toISOString(),
			});

			if (insertError) throw insertError;

			setContent("");
			setAuthorName("");
			await loadComments();
		} catch (err) {
			setError("Failed to post comment");
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='mt-12'>
			<h2 className='text-2xl font-bold mb-6 text-gray-100'>Comments</h2>
			{error && <div className='mb-4 p-3 bg-red-500/10 text-red-500 rounded'>{error}</div>}
			<form
				onSubmit={handleSubmit}
				className='mb-8 space-y-4'
			>
				<div>
					<label className='block text-sm font-medium mb-2 text-gray-300'>Name</label>
					<input
						type='text'
						value={authorName}
						onChange={(e) => setAuthorName(e.target.value)}
						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
						required
						placeholder='Your name'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium mb-2 text-gray-300'>Comment</label>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
						rows={3}
						required
						placeholder='Write a comment...'
					/>
				</div>
				<button
					type='submit'
					disabled={isSubmitting}
					className='bg-primary-500 text-gray-100 px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50'
				>
					{isSubmitting ? "Posting..." : "Post Comment"}
				</button>
			</form>

			<div className='space-y-4'>
				{comments.map((comment) => (
					<div
						key={comment.id}
						className='border border-gray-700 rounded p-4 bg-gray-800'
					>
						<div className='text-sm text-gray-400 mb-2'>
							{comment.author_name || "Anonymous"} • {new Date(comment.created_at).toLocaleDateString()}
						</div>
						<p className='text-gray-200'>{comment.content}</p>
					</div>
				))}
				{comments.length === 0 && <p className='text-gray-400'>No comments yet</p>}
			</div>
		</div>
	);
}
// // src/components/Comments.tsx
// "use client";
// import { useState, useEffect } from "react";
// import { supabaseClient } from "@/lib/auth";

// type Comment = {
// 	id: string;
// 	post_id: string;
// 	content: string;
// 	author_name: string;
// 	created_at: string;
// };

// export function Comments({ postId }: { postId: string }) {
// 	const [comments, setComments] = useState<Comment[]>([]);
// 	const [content, setContent] = useState("");
// 	const [authorName, setAuthorName] = useState("");
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		loadComments();
// 	}, [postId]);

// 	const loadComments = async () => {
// 		try {
// 			const { data, error } = await supabaseClient.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });

// 			if (error) throw error;
// 			setComments(data || []);
// 		} catch (err) {
// 			setError("Failed to load comments");
// 			console.error(err);
// 		}
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		setError(null);

// 		if (!content.trim() || !authorName.trim()) return;

// 		setIsSubmitting(true);
// 		try {
// 			// First create the comment
// 			const { error: insertError } = await supabaseClient.from("comments").insert({
// 				post_id: postId,
// 				content: content.trim(),
// 				author_name: authorName.trim(),
// 			});

// 			if (insertError) throw insertError;

// 			// Clear form and reload comments
// 			setContent("");
// 			setAuthorName("");
// 			await loadComments();
// 		} catch (err) {
// 			console.error("Insert error:", err);
// 			setError("Failed to post comment. Please try again.");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	return (
// 		<div className='mt-12'>
// 			<h2 className='text-2xl font-bold mb-6 text-gray-100'>Comments</h2>

// 			{error && <div className='mb-4 p-3 bg-red-500/10 text-red-500 rounded'>{error}</div>}

// 			<form
// 				onSubmit={handleSubmit}
// 				className='mb-8 space-y-4'
// 			>
// 				<div>
// 					<label className='block text-sm font-medium mb-2 text-gray-300'>Name</label>
// 					<input
// 						type='text'
// 						value={authorName}
// 						onChange={(e) => setAuthorName(e.target.value)}
// 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// 						required
// 						placeholder='Your name'
// 					/>
// 				</div>
// 				<div>
// 					<label className='block text-sm font-medium mb-2 text-gray-300'>Comment</label>
// 					<textarea
// 						value={content}
// 						onChange={(e) => setContent(e.target.value)}
// 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// 						rows={3}
// 						required
// 						placeholder='Write a comment...'
// 					/>
// 				</div>
// 				<button
// 					type='submit'
// 					disabled={isSubmitting}
// 					className='bg-primary-500 text-gray-100 px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50'
// 				>
// 					{isSubmitting ? "Posting..." : "Post Comment"}
// 				</button>
// 			</form>

// 			<div className='space-y-4'>
// 				{comments.map((comment) => (
// 					<div
// 						key={comment.id}
// 						className='border border-gray-700 rounded p-4 bg-gray-800'
// 					>
// 						<div className='text-sm text-gray-400 mb-2'>
// 							{comment.author_name} • {new Date(comment.created_at).toLocaleDateString()}
// 						</div>
// 						<p className='text-gray-200'>{comment.content}</p>
// 					</div>
// 				))}
// 				{comments.length === 0 && <p className='text-gray-400'>No comments yet</p>}
// 			</div>
// 		</div>
// 	);
// }

// // // src/components/Comments.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import { supabaseClient } from "@/lib/auth";

// // export function Comments({ postId }: { postId: string }) {
// // 	const [comments, setComments] = useState<any[]>([]);
// // 	const [content, setContent] = useState("");
// // 	const [authorName, setAuthorName] = useState("");
// // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // 	const [error, setError] = useState<string | null>(null);

// // 	useEffect(() => {
// // 		loadComments();
// // 	}, [postId]);

// // 	const loadComments = async () => {
// // 		try {
// // 			const { data, error } = await supabaseClient.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });

// // 			if (error) throw error;
// // 			setComments(data || []);
// // 		} catch (err) {
// // 			setError("Failed to load comments. Please try refreshing the page.");
// // 		}
// // 	};

// // 	const handleSubmit = async (e: React.FormEvent) => {
// // 		e.preventDefault();
// // 		setError(null);
// // 		if (!content.trim() || !authorName.trim()) return;

// // 		setIsSubmitting(true);
// // 		try {
// // 			const { error: insertError } = await supabaseClient.from("comments").insert([
// // 				{
// // 					content: content.trim(),
// // 					post_id: postId,
// // 					author_name: authorName.trim(),
// // 					created_at: new Date().toISOString(),
// // 				},
// // 			]);

// // 			if (insertError) throw insertError;

// // 			setContent("");
// // 			setAuthorName("");
// // 			await loadComments();
// // 		} catch (err) {
// // 			setError(err instanceof Error ? err.message : "Failed to post comment. Please try again.");
// // 		} finally {
// // 			setIsSubmitting(false);
// // 		}
// // 	};

// // 	return (
// // 		<div className='mt-12'>
// // 			<h2 className='text-2xl font-bold mb-6 text-gray-100'>Comments</h2>

// // 			{error && <div className='mb-4 p-3 bg-red-500/10 text-red-500 rounded'>{error}</div>}

// // 			<form
// // 				onSubmit={handleSubmit}
// // 				className='mb-8 space-y-4'
// // 			>
// // 				<div>
// // 					<label className='block text-sm font-medium mb-2 text-gray-300'>Name</label>
// // 					<input
// // 						type='text'
// // 						value={authorName}
// // 						onChange={(e) => setAuthorName(e.target.value)}
// // 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// // 						required
// // 						placeholder='Your name'
// // 					/>
// // 				</div>
// // 				<div>
// // 					<label className='block text-sm font-medium mb-2 text-gray-300'>Comment</label>
// // 					<textarea
// // 						value={content}
// // 						onChange={(e) => setContent(e.target.value)}
// // 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// // 						rows={3}
// // 						required
// // 						placeholder='Write a comment...'
// // 					/>
// // 				</div>
// // 				<button
// // 					type='submit'
// // 					disabled={isSubmitting}
// // 					className='bg-primary-500 text-gray-100 px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50'
// // 				>
// // 					{isSubmitting ? "Posting..." : "Post Comment"}
// // 				</button>
// // 			</form>

// // 			<div className='space-y-4'>
// // 				{comments.map((comment) => (
// // 					<div
// // 						key={comment.id}
// // 						className='border border-gray-700 rounded p-4 bg-gray-800'
// // 					>
// // 						<div className='text-sm text-gray-400 mb-2'>
// // 							{comment.author_name} • {new Date(comment.created_at).toLocaleDateString()}
// // 						</div>
// // 						<p className='text-gray-200'>{comment.content}</p>
// // 					</div>
// // 				))}
// // 				{comments.length === 0 && <p className='text-gray-400'>No comments yet</p>}
// // 			</div>
// // 		</div>
// // 	);
// // }
// // // // src/components/Comments.tsx
// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import { supabaseClient } from "@/lib/auth";

// // // export function Comments({ postId }: { postId: string }) {
// // // 	const [comments, setComments] = useState<any[]>([]);
// // // 	const [content, setContent] = useState("");
// // // 	const [authorName, setAuthorName] = useState("");
// // // 	const [isSubmitting, setIsSubmitting] = useState(false);

// // // 	useEffect(() => {
// // // 		loadComments();
// // // 	}, [postId]);

// // // 	const loadComments = async () => {
// // // 		const { data } = await supabaseClient.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true });

// // // 		setComments(data || []);
// // // 	};

// // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // 		e.preventDefault();
// // // 		if (!content.trim() || !authorName.trim()) return;

// // // 		setIsSubmitting(true);
// // // 		try {
// // // 			await supabaseClient.from("comments").insert({
// // // 				content: content.trim(),
// // // 				post_id: postId,
// // // 				author_name: authorName.trim(),
// // // 			});
// // // 			setContent("");
// // // 			loadComments();
// // // 		} finally {
// // // 			setIsSubmitting(false);
// // // 		}
// // // 	};

// // // 	return (
// // // 		<div className='mt-12'>
// // // 			<h2 className='text-2xl font-bold mb-6 text-gray-100'>Comments</h2>

// // // 			<form
// // // 				onSubmit={handleSubmit}
// // // 				className='mb-8 space-y-4'
// // // 			>
// // // 				<div>
// // // 					<label className='block text-sm font-medium mb-2 text-gray-300'>Name</label>
// // // 					<input
// // // 						type='text'
// // // 						value={authorName}
// // // 						onChange={(e) => setAuthorName(e.target.value)}
// // // 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// // // 						required
// // // 						placeholder='Your name'
// // // 					/>
// // // 				</div>
// // // 				<div>
// // // 					<label className='block text-sm font-medium mb-2 text-gray-300'>Comment</label>
// // // 					<textarea
// // // 						value={content}
// // // 						onChange={(e) => setContent(e.target.value)}
// // // 						className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400'
// // // 						rows={3}
// // // 						required
// // // 						placeholder='Write a comment...'
// // // 					/>
// // // 				</div>
// // // 				<button
// // // 					type='submit'
// // // 					disabled={isSubmitting}
// // // 					className='bg-primary-500 text-gray-100 px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50'
// // // 				>
// // // 					{isSubmitting ? "Posting..." : "Post Comment"}
// // // 				</button>
// // // 			</form>

// // // 			<div className='space-y-4'>
// // // 				{comments.map((comment) => (
// // // 					<div
// // // 						key={comment.id}
// // // 						className='border border-gray-700 rounded p-4 bg-gray-800'
// // // 					>
// // // 						<div className='text-sm text-gray-400 mb-2'>
// // // 							{comment.author_name || "Anonymous"} • {new Date(comment.created_at).toLocaleDateString()}
// // // 						</div>
// // // 						<p className='text-gray-200'>{comment.content}</p>
// // // 					</div>
// // // 				))}
// // // 				{comments.length === 0 && <p className='text-gray-400'>No comments yet</p>}
// // // 			</div>
// // // 		</div>
// // // 	);
// // // }

// // // // // src/components/Comments.tsx
// // // // 'use client'
// // // // import { useState, useEffect } from 'react'
// // // // import { useAuth } from '@/hooks/useAuth'
// // // // import { supabaseClient } from '@/lib/auth'

// // // // export function Comments({ postId }: { postId: string }) {
// // // //   const { user } = useAuth()
// // // //   const [comments, setComments] = useState<any[]>([])
// // // //   const [content, setContent] = useState('')
// // // //   const [isSubmitting, setIsSubmitting] = useState(false)

// // // //   useEffect(() => {
// // // //     loadComments()
// // // //   }, [postId])

// // // //   const loadComments = async () => {
// // // //     const { data } = await supabaseClient
// // // //       .from('comments')
// // // //       .select('*, profiles(username)')
// // // //       .eq('post_id', postId)
// // // //       .order('created_at', { ascending: true })

// // // //     setComments(data || [])
// // // //   }

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     if (!user || !content.trim()) return

// // // //     setIsSubmitting(true)
// // // //     try {
// // // //       await supabaseClient.from('comments').insert({
// // // //         content: content.trim(),
// // // //         post_id: postId,
// // // //         author_id: user.id
// // // //       })
// // // //       setContent('')
// // // //       loadComments()
// // // //     } finally {
// // // //       setIsSubmitting(false)
// // // //     }
// // // //   }

// // // //   return (
// // // //    <div className="mt-12">
// // // //      <h2 className="text-2xl font-bold mb-6 text-gray-100">Comments</h2>

// // // //      {user ? (
// // // //        <form onSubmit={handleSubmit} className="mb-8">
// // // //          <textarea
// // // //            value={content}
// // // //            onChange={(e) => setContent(e.target.value)}
// // // //            className="w-full p-2 border rounded bg-gray-800 text-gray-200 border-gray-700"
// // // //            rows={3}
// // // //            required
// // // //            placeholder="Write a comment..."
// // // //          />
// // // //          <button
// // // //            type="submit"
// // // //            disabled={isSubmitting}
// // // //            className="mt-2 bg-blue-500 text-gray-100 px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // //          >
// // // //            {isSubmitting ? 'Posting...' : 'Post Comment'}
// // // //          </button>
// // // //        </form>
// // // //      ) : (
// // // //        <p className="mb-8 text-gray-300">Please sign in to comment</p>
// // // //      )}

// // // //      <div className="space-y-4">
// // // //        {comments.map((comment) => (
// // // //          <div key={comment.id} className="border border-gray-700 rounded p-4 bg-gray-800">
// // // //            <div className="text-sm text-gray-400 mb-2">
// // // //              {comment.profiles?.username || 'Anonymous'} • {' '}
// // // //              {new Date(comment.created_at).toLocaleDateString()}
// // // //            </div>
// // // //            <p className="text-gray-200">{comment.content}</p>
// // // //          </div>
// // // //        ))}
// // // //        {comments.length === 0 && (
// // // //          <p className="text-gray-400">No comments yet</p>
// // // //        )}
// // // //      </div>
// // // //    </div>
// // // //  )

// // // // //   return (
// // // // //     <div className="mt-12">
// // // // //       <h2 className="text-2xl font-bold mb-6">Comments</h2>

// // // // //       {user ? (
// // // // //         <form onSubmit={handleSubmit} className="mb-8">
// // // // //           <textarea
// // // // //             value={content}
// // // // //             onChange={(e) => setContent(e.target.value)}
// // // // //             className="w-full p-2 border rounded bg-white text-gray-900"
// // // // //             rows={3}
// // // // //             required
// // // // //             placeholder="Write a comment..."
// // // // //           />
// // // // //           <button
// // // // //             type="submit"
// // // // //             disabled={isSubmitting}
// // // // //             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // // //           >
// // // // //             {isSubmitting ? 'Posting...' : 'Post Comment'}
// // // // //           </button>
// // // // //         </form>
// // // // //       ) : (
// // // // //         <p className="mb-8 text-gray-600">Please sign in to comment</p>
// // // // //       )}

// // // // //       <div className="space-y-4">
// // // // //         {comments.map((comment) => (
// // // // //           <div key={comment.id} className="border rounded p-4 bg-white">
// // // // //             <div className="text-sm text-gray-600 mb-2">
// // // // //               {comment.profiles?.username || 'Anonymous'} • {' '}
// // // // //               {new Date(comment.created_at).toLocaleDateString()}
// // // // //             </div>
// // // // //             <p>{comment.content}</p>
// // // // //           </div>
// // // // //         ))}
// // // // //         {comments.length === 0 && (
// // // // //           <p className="text-gray-500">No comments yet</p>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }
// // // // // 'use client'
// // // // // import { useState } from 'react'
// // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // import { supabaseClient } from '@/lib/auth'

// // // // // export function Comments({ postId }: { postId: string }) {
// // // // //   const { user } = useAuth()
// // // // //   const [comments, setComments] = useState<any[]>([])
// // // // //   const [content, setContent] = useState('')
// // // // //   const [isSubmitting, setIsSubmitting] = useState(false)

// // // // //   const loadComments = async () => {
// // // // //     const { data } = await supabaseClient
// // // // //       .from('comments')
// // // // //       .select('*, profiles(username)')
// // // // //       .eq('post_id', postId)
// // // // //       .order('created_at', { ascending: true })

// // // // //     setComments(data || [])
// // // // //   }

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault()
// // // // //     if (!user || !content.trim()) return

// // // // //     setIsSubmitting(true)
// // // // //     try {
// // // // //       await supabaseClient.from('comments').insert({
// // // // //         content: content.trim(),
// // // // //         post_id: postId,
// // // // //         author_id: user.id
// // // // //       })
// // // // //       setContent('')
// // // // //       loadComments()
// // // // //     } finally {
// // // // //       setIsSubmitting(false)
// // // // //     }
// // // // //   }

// // // // //   return (
// // // // //     <div className="mt-12">
// // // // //       <h2 className="text-2xl font-bold mb-6">Comments</h2>

// // // // //       {user ? (
// // // // //         <form onSubmit={handleSubmit} className="mb-8">
// // // // //           <textarea
// // // // //             value={content}
// // // // //             onChange={(e) => setContent(e.target.value)}
// // // // //             className="w-full p-2 border rounded bg-white text-gray-900"
// // // // //             rows={3}
// // // // //             required
// // // // //           />
// // // // //           <button
// // // // //             type="submit"
// // // // //             disabled={isSubmitting}
// // // // //             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // // //           >
// // // // //             {isSubmitting ? 'Posting...' : 'Post Comment'}
// // // // //           </button>
// // // // //         </form>
// // // // //       ) : (
// // // // //         <p>Please sign in to comment</p>
// // // // //       )}

// // // // //       <div className="space-y-4">
// // // // //         {comments.map((comment) => (
// // // // //           <div key={comment.id} className="border rounded p-4">
// // // // //             <div className="text-sm text-gray-600 mb-2">
// // // // //               {comment.profiles?.username || 'Anonymous'} •
// // // // //               {new Date(comment.created_at).toLocaleDateString()}
// // // // //             </div>
// // // // //             <p>{comment.content}</p>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

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
      const { error } = await supabaseClient
        .from('posts')
        .delete()
        .eq('id', postId)

      if (error) throw error

      // Push to blog page first
      await router.push('/blog')
      // Then refresh and revalidate
      router.refresh()
      await fetch('/api/revalidate', { method: 'POST' })

    } catch (error) {
      console.error('Error deleting post:', error)
      alert(`Failed to delete post: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsDeleting(false)
    }
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
// // src/components/DeletePost.tsx
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseClient } from "@/lib/auth";

// export function DeletePost({ postId }: { postId: string }) {
// 	const [isDeleting, setIsDeleting] = useState(false);
// 	const router = useRouter();

// 	const handleDelete = async () => {
// 		if (!confirm("Are you sure you want to delete this post?")) return;

// 		setIsDeleting(true);
// 		try {
// 			// Log pre-delete info
// 			console.log("Attempting to delete post:", postId);

// 			const { data, error } = await supabaseClient.from("posts").delete().eq("id", postId).select();

// 			console.log("Delete response:", { data, error });

// 			if (error) throw error;

// 			// Call revalidation API
// 			const revalidateResponse = await fetch("/api/revalidate", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ path: "/blog" }),
// 			});

// 			console.log("Revalidate response:", await revalidateResponse.json());

// 			router.push("/blog");
// 			router.refresh();
// 		} catch (error) {
// 			console.error("Error deleting post:", error);
// 			alert(`Failed to delete post: ${error instanceof Error ? error.message : "Unknown error"}`);
// 			setIsDeleting(false);
// 		}
// 	};

// 	return (
// 		<button
// 			onClick={handleDelete}
// 			disabled={isDeleting}
// 			className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50'
// 		>
// 			{isDeleting ? "Deleting..." : "Delete Post"}
// 		</button>
// 	);
// }
// // // src/components/DeletePost.tsx
// // 'use client'
// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { supabaseClient } from '@/lib/auth'

// // export function DeletePost({ postId }: { postId: string }) {
// //   const [isDeleting, setIsDeleting] = useState(false)
// //   const router = useRouter()

// //   const handleDelete = async () => {
// //     if (!confirm('Are you sure you want to delete this post?')) return

// //     setIsDeleting(true)
// //     try {
// //       const { error } = await supabaseClient
// //         .from('posts')
// //         .delete()
// //         .eq('id', postId)

// //       if (error) throw error

// //       // Call revalidation API
// //       await fetch('/api/revalidate', { method: 'POST' })

// //       router.push('/blog')
// //       router.refresh()
// //     } catch (error) {
// //       console.error('Error deleting post:', error)
// //       alert('Failed to delete post')
// //     } finally {
// //       setIsDeleting(false)
// //     }
// //   }

// //   return (
// //     <button
// //       onClick={handleDelete}
// //       disabled={isDeleting}
// //       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
// //     >
// //       {isDeleting ? 'Deleting...' : 'Delete Post'}
// //     </button>
// //   )
// // }

// // // // src/components/DeletePost.tsx
// // // 'use client'
// // // import { useState } from 'react'
// // // import { useRouter } from 'next/navigation'
// // // import { supabaseClient } from '@/lib/auth'

// // // export function DeletePost({ postId }: { postId: string }) {
// // //   const [isDeleting, setIsDeleting] = useState(false)
// // //   const router = useRouter()

// // //   const handleDelete = async () => {
// // //     if (!confirm('Are you sure you want to delete this post?')) return

// // //     setIsDeleting(true)
// // //     try {
// // //       await supabaseClient.from('posts').delete().eq('id', postId)
// // //       router.push('/blog')
// // //       router.refresh()
// // //     } catch (error) {
// // //       alert('Failed to delete post')
// // //     }
// // //     setIsDeleting(false)
// // //   }

// // //   return (
// // //     <button
// // //       onClick={handleDelete}
// // //       disabled={isDeleting}
// // //       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
// // //     >
// // //       {isDeleting ? 'Deleting...' : 'Delete Post'}
// // //     </button>
// // //   )
// // // }

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
import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
import { Loader2 } from 'lucide-react'
import { categories, CategoryId } from '@/data/categories'

type Post = {
  id: string
  title: string
  content: string
  excerpt?: string
  cover_image?: string
  slug: string
  category?: CategoryId
}

export function EditForm({ post }: { post: Post }) {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    excerpt: post.excerpt || '',
    cover_image: post.cover_image || '',
    category: post.category || 'tech' as CategoryId
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
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as CategoryId }))}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
          required
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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
// import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'//added Rich editor for edit
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
//       const path = formData.cover_image.split('/').pop()
//       if (!path) throw new Error('Invalid image path')

//       const { error: deleteError } = await supabaseClient.storage
//         .from('images')
//         .remove([`blog-images/${path}`])

//       if (deleteError) throw deleteError

//       setFormData(prev => ({ ...prev, cover_image: '' }))
//     } catch (err) {
//       setError('Failed to delete image')
//       console.error('Error deleting image:', err)
//     } finally {
//       setIsImageDeleting(false)
//     }
//   }

//   const handleCancel = () => {
//     if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
//       router.push(`/blog/${post.slug}`)
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

//       <div className="flex gap-4">
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
//         >
//           {isSubmitting && <Loader2 className="animate-spin" size={16} />}
//           {isSubmitting ? 'Saving...' : 'Save Changes'}
//         </button>
//         <button
//           type="button"
//           onClick={handleCancel}
//           className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   )
// }

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
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { supabaseClient } from '@/lib/auth'
import { ThemeToggle } from '@/components/ThemeToggle'
import { navLinks, navStyles } from '@/data/navbarConfig'

export function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <nav className={navStyles.base}>
      <div className={navStyles.container}>
        <div className={navStyles.inner}>
          <Link href={navLinks.brand.href} className={navStyles.brand}>
            <Image
              src={navLinks.brand.logo}
              alt={navLinks.brand.label}
              width={150}
              height={40}
              priority
            />
            <span className="sr-only">{navLinks.brand.label}</span>
          </Link>
          <div className="flex items-center space-x-8">
            {navLinks.mainLinks.map(link => {
              if ('authRequired' in link && link.authRequired && !isAuthenticated) {
                return null;
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navStyles.link}
                >
                  {link.label}
                </Link>
              );
            })}
            <ThemeToggle />
            {isAuthenticated ? (
              <button
                onClick={() => supabaseClient.auth.signOut()}
                className={navStyles.button}
              >
                {navLinks.authLinks.signOut.label}
              </button>
            ) : (
              <button
                onClick={() => supabaseClient.auth.signInWithOAuth({
                  provider: 'github',
                  options: { redirectTo: `${window.location.origin}/auth/callback` }
                })}
                className={navStyles.button}
              >
                {navLinks.authLinks.signIn.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
// // src/components/Navbar.tsx
// "use client";
// import Link from "next/link";
// import { useAuth } from "@/hooks/useAuth";
// import { supabaseClient } from "@/lib/auth";
// import { ThemeToggle } from "@/components/ThemeToggle";
// import { navLinks, navStyles } from "@/data/navbarConfig";

// export function Navbar() {
// 	const { isAuthenticated } = useAuth();

// 	return (
// 		<nav className={navStyles.base}>
// 			<div className={navStyles.container}>
// 				<div className={navStyles.inner}>
// 					<Link href={navLinks.brand.href} className={navStyles.brand}>
// 						{navLinks.brand.label}
// 					</Link>
// 					<div className="flex items-center space-x-8">
// 						{navLinks.mainLinks.map((link) => {
// 							if ("authRequired" in link && link.authRequired && !isAuthenticated) {
// 								return null;
// 							}
// 							return (
// 								<Link key={link.href} href={link.href} className={navStyles.link}>
// 									{link.label}
// 								</Link>
// 							);
// 						})}
// 						<ThemeToggle />
// 						{isAuthenticated ? (
// 							<button onClick={() => supabaseClient.auth.signOut()} className={navStyles.button}>
// 								{navLinks.authLinks.signOut.label}
// 							</button>
// 						) : (
// 							<button
// 								onClick={() =>
// 									supabaseClient.auth.signInWithOAuth({
// 										provider: "github",
// 										options: { redirectTo: `${window.location.origin}/auth/callback` },
// 									})
// 								}
// 								className={navStyles.button}
// 							>
// 								{navLinks.authLinks.signIn.label}
// 							</button>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// }

// // // src/components/Navbar.tsx
// // 'use client'
// // import Link from 'next/link'
// // import { useAuth } from '@/hooks/useAuth'
// // import { supabaseClient } from '@/lib/auth'
// // import { ThemeToggle } from '@/components/ThemeToggle'
// // import { navLinks, navStyles } from '@/data/navbarConfig'

// // export function Navbar() {
// //   const { user, isAuthenticated } = useAuth()

// //   return (
// //     <nav className={navStyles.base}>
// //       <div className={navStyles.container}>
// //         <div className={navStyles.inner}>
// //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// //             {navLinks.brand.label}
// //           </Link>
// //           <div className="flex items-center space-x-8">
// //             {navLinks.mainLinks.map(link => (
// //               !link.authRequired || isAuthenticated ? (
// //                 <Link
// //                   key={link.href}
// //                   href={link.href}
// //                   className={navStyles.link}
// //                 >
// //                   {link.label}
// //                 </Link>
// //               ) : null
// //             ))}
// //             <ThemeToggle />
// //             {isAuthenticated ? (
// //               <button
// //                 onClick={() => supabaseClient.auth.signOut()}
// //                 className={navStyles.button}
// //               >
// //                 {navLinks.authLinks.signOut.label}
// //               </button>
// //             ) : (
// //               <button
// //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// //                   provider: 'github',
// //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// //                 })}
// //                 className={navStyles.button}
// //               >
// //                 {navLinks.authLinks.signIn.label}
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   )
// // }

// // // // src/components/Navbar.tsx
// // // 'use client'
// // // import Link from 'next/link'
// // // import { useAuth } from '@/hooks/useAuth'
// // // import { supabaseClient } from '@/lib/auth'
// // // import { ClientOnly } from '@/components/ClientOnly'
// // // import { navLinks, navStyles } from '@/data/navbarConfig'
// // // import { Sun, Moon } from 'lucide-react'
// // // import { useTheme } from '@/hooks/useTheme'

// // // export function Navbar() {
// // //   const { isAuthenticated } = useAuth()
// // //   const { theme, toggleTheme } = useTheme()

// // //   const handleSignIn = () => {
// // //     supabaseClient.auth.signInWithOAuth({
// // //       provider: 'github',
// // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // //     })
// // //   }

// // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // //   return (
// // //     <nav className={navStyles.base}>
// // //       <div className={navStyles.container}>
// // //         <div className={navStyles.inner}>
// // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // //             {navLinks.brand.label}
// // //           </Link>

// // //           <div className="flex items-center space-x-8">
// // //             <Link href="/blog" className={navStyles.link}>Blog</Link>

// // //             {isAuthenticated && (
// // //               <Link href="/blog/new" className={navStyles.link}>New Post</Link>
// // //             )}

// // //             <button
// // //               onClick={toggleTheme}
// // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // //               aria-label="Toggle theme"
// // //             >
// // //               {theme === 'dark' ?
// // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // //               }
// // //             </button>

// // //             <ClientOnly>
// // //               {isAuthenticated ? (
// // //                 <button onClick={handleSignOut} className={navStyles.button}>
// // //                   {navLinks.authLinks.signOut.label}
// // //                 </button>
// // //               ) : (
// // //                 <button onClick={handleSignIn} className={navStyles.button}>
// // //                   {navLinks.authLinks.signIn.label}
// // //                 </button>
// // //               )}
// // //             </ClientOnly>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   )
// // // }
// // // // // src/components/Navbar.tsx
// // // // 'use client'
// // // // import Link from 'next/link'
// // // // import { useAuth } from '@/hooks/useAuth'
// // // // import { supabaseClient } from '@/lib/auth'
// // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // import { navLinks, navStyles } from '@/data/navbarConfig'
// // // // import { Sun, Moon } from 'lucide-react'
// // // // import { useState, useEffect } from 'react'

// // // // export function Navbar() {
// // // //   const { isAuthenticated } = useAuth()
// // // //   const [isDarkMode, setIsDarkMode] = useState(false)

// // // //   useEffect(() => {
// // // //     const isDark = document.documentElement.classList.contains('dark')
// // // //     setIsDarkMode(isDark)
// // // //   }, [])

// // // //   const toggleTheme = () => {
// // // //     document.documentElement.classList.toggle('dark')
// // // //     setIsDarkMode(!isDarkMode)
// // // //     localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
// // // //   }

// // // //   const handleSignIn = () => {
// // // //     supabaseClient.auth.signInWithOAuth({
// // // //       provider: 'github',
// // // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // //     })
// // // //   }

// // // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // // //   return (
// // // //     <nav className={navStyles.base}>
// // // //       <div className={navStyles.container}>
// // // //         <div className={navStyles.inner}>
// // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // //             {navLinks.brand.label}
// // // //           </Link>

// // // //           <div className="flex items-center space-x-8">
// // // //             <Link href="/blog" className={navStyles.link}>Blog</Link>

// // // //             {isAuthenticated && (
// // // //               <Link href="/blog/new" className={navStyles.link}>New Post</Link>
// // // //             )}

// // // //             <button
// // // //               onClick={toggleTheme}
// // // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // // //               aria-label="Toggle theme"
// // // //             >
// // // //               {isDarkMode ?
// // // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // // //               }
// // // //             </button>

// // // //             <ClientOnly>
// // // //               {isAuthenticated ? (
// // // //                 <button
// // // //                   onClick={handleSignOut}
// // // //                   className={navStyles.button}
// // // //                 >
// // // //                   {navLinks.authLinks.signOut.label}
// // // //                 </button>
// // // //               ) : (
// // // //                 <button
// // // //                   onClick={handleSignIn}
// // // //                   className={navStyles.button}
// // // //                 >
// // // //                   {navLinks.authLinks.signIn.label}
// // // //                 </button>
// // // //               )}
// // // //             </ClientOnly>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </nav>
// // // //   )
// // // // }
// // // // // // src/components/Navbar.tsx
// // // // // 'use client'
// // // // // import Link from 'next/link'
// // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // import { supabaseClient } from '@/lib/auth'
// // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // import { navLinks, navStyles } from '@/data/navbarConfig'
// // // // // import { Sun, Moon } from 'lucide-react'
// // // // // import { useState, useEffect } from 'react'

// // // // // export function Navbar() {
// // // // //   const { isAuthenticated } = useAuth()
// // // // //   const [isDarkMode, setIsDarkMode] = useState(false)

// // // // //   useEffect(() => {
// // // // //     const isDark = document.documentElement.classList.contains('dark')
// // // // //     setIsDarkMode(isDark)
// // // // //   }, [])

// // // // //   const toggleTheme = () => {
// // // // //     document.documentElement.classList.toggle('dark')
// // // // //     setIsDarkMode(!isDarkMode)
// // // // //     localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
// // // // //   }

// // // // //   const handleSignIn = () => {
// // // // //     supabaseClient.auth.signInWithOAuth({
// // // // //       provider: 'github',
// // // // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // //     })
// // // // //   }

// // // // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // // // //   return (
// // // // //     <nav className={navStyles.base}>
// // // // //       <div className={navStyles.container}>
// // // // //         <div className={navStyles.inner}>
// // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // //             {navLinks.brand.label}
// // // // //           </Link>

// // // // //           <div className="flex items-center space-x-8">
// // // // //             <Link href="/blog" className={navStyles.link}>Blog</Link>

// // // // //             <button
// // // // //               onClick={toggleTheme}
// // // // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // // // //               aria-label="Toggle theme"
// // // // //             >
// // // // //               {isDarkMode ?
// // // // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // // // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // // // //               }
// // // // //             </button>

// // // // //             <ClientOnly>
// // // // //               {isAuthenticated ? (
// // // // //                 <button
// // // // //                   onClick={handleSignOut}
// // // // //                   className={navStyles.button}
// // // // //                 >
// // // // //                   {navLinks.authLinks.signOut.label}
// // // // //                 </button>
// // // // //               ) : (
// // // // //                 <button
// // // // //                   onClick={handleSignIn}
// // // // //                   className={navStyles.button}
// // // // //                 >
// // // // //                   {navLinks.authLinks.signIn.label}
// // // // //                 </button>
// // // // //               )}
// // // // //             </ClientOnly>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </nav>
// // // // //   )
// // // // // }
// // // // // // // src/components/Navbar.tsx
// // // // // // 'use client'
// // // // // // import Link from 'next/link'
// // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // export function Navbar() {
// // // // // //   const { isAuthenticated } = useAuth()

// // // // // //   const handleSignIn = () => {
// // // // // //     supabaseClient.auth.signInWithOAuth({
// // // // // //       provider: 'github',
// // // // // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // //     })
// // // // // //   }

// // // // // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // // // // //   return (
// // // // // //     <nav className={navStyles.base}>
// // // // // //       <div className={navStyles.container}>
// // // // // //         <div className={navStyles.inner}>
// // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // //             {navLinks.brand.label}
// // // // // //           </Link>

// // // // // //           <div className="flex items-center space-x-8">
// // // // // //             {navLinks.mainLinks.map((link) => {
// // // // // //               if (link.authRequired && !isAuthenticated) return null;
// // // // // //               return (
// // // // // //                 <Link
// // // // // //                   key={link.href}
// // // // // //                   href={link.href}
// // // // // //                   className={navStyles.link}
// // // // // //                 >
// // // // // //                   {link.label}
// // // // // //                 </Link>
// // // // // //               );
// // // // // //             })}

// // // // // //             <ClientOnly>
// // // // // //               {isAuthenticated ? (
// // // // // //                 <button
// // // // // //                   onClick={handleSignOut}
// // // // // //                   className={navStyles.button}
// // // // // //                 >
// // // // // //                   {navLinks.authLinks.signOut.label}
// // // // // //                 </button>
// // // // // //               ) : (
// // // // // //                 <button
// // // // // //                   onClick={handleSignIn}
// // // // // //                   className={navStyles.button}
// // // // // //                 >
// // // // // //                   {navLinks.authLinks.signIn.label}
// // // // // //                 </button>
// // // // // //               )}
// // // // // //             </ClientOnly>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </nav>
// // // // // //   )
// // // // // // }
// // // // // // // // src/components/Navbar.tsx
// // // // // // // 'use client'
// // // // // // // import Link from 'next/link'
// // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // // export function Navbar() {
// // // // // // //    const { isAuthenticated } = useAuth();

// // // // // // //   return (
// // // // // // //     <nav className={navStyles.base}>
// // // // // // //       <div className={navStyles.container}>
// // // // // // //         <div className={navStyles.inner}>
// // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // //             {navLinks.brand.label}
// // // // // // //           </Link>
// // // // // // //           <div className="flex items-center space-x-8">
// // // // // // //             {navLinks.mainLinks.map(link => (
// // // // // // //               !link.authRequired || isAuthenticated ? (
// // // // // // //                 <Link
// // // // // // //                   key={link.href}
// // // // // // //                   href={link.href}
// // // // // // //                   className={navStyles.link}
// // // // // // //                 >
// // // // // // //                   {link.label}
// // // // // // //                 </Link>
// // // // // // //               ) : null
// // // // // // //             ))}
// // // // // // //             <ThemeToggle />
// // // // // // //             {isAuthenticated ? (
// // // // // // //               <button
// // // // // // //                 onClick={() => supabaseClient.auth.signOut()}
// // // // // // //                 className={navStyles.button}
// // // // // // //               >
// // // // // // //                 {navLinks.authLinks.signOut.label}
// // // // // // //               </button>
// // // // // // //             ) : (
// // // // // // //               <button
// // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // //                   provider: 'github',
// // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // //                 })}
// // // // // // //                 className={navStyles.button}
// // // // // // //               >
// // // // // // //                 {navLinks.authLinks.signIn.label}
// // // // // // //               </button>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </nav>
// // // // // // //   )
// // // // // // // }

// // // // // // // // // src/components/Navbar.tsx
// // // // // // // // 'use client'
// // // // // // // // import Link from 'next/link'
// // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // // // export function Navbar() {
// // // // // // // //   const { user, isAuthenticated } = useAuth()

// // // // // // // //   return (
// // // // // // // //     <nav className={navStyles.base}>
// // // // // // // //       <div className={navStyles.container}>
// // // // // // // //         <div className={navStyles.inner}>
// // // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // // //             {navLinks.brand.label}
// // // // // // // //           </Link>
// // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // //             {navLinks.mainLinks.map(link => (
// // // // // // // //               !link.authRequired || isAuthenticated ? (
// // // // // // // //                 <Link
// // // // // // // //                   key={link.href}
// // // // // // // //                   href={link.href}
// // // // // // // //                   className={navStyles.link}
// // // // // // // //                 >
// // // // // // // //                   {link.label}
// // // // // // // //                 </Link>
// // // // // // // //               ) : null
// // // // // // // //             ))}
// // // // // // // //             <ThemeToggle />
// // // // // // // //             {isAuthenticated ? (
// // // // // // // //               <button
// // // // // // // //                 onClick={() => supabaseClient.auth.signOut()}
// // // // // // // //                 className={navStyles.button}
// // // // // // // //               >
// // // // // // // //                 {navLinks.authLinks.signOut.label}
// // // // // // // //               </button>
// // // // // // // //             ) : (
// // // // // // // //               <button
// // // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // //                   provider: 'github',
// // // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // //                 })}
// // // // // // // //                 className={navStyles.button}
// // // // // // // //               >
// // // // // // // //                 {navLinks.authLinks.signIn.label}
// // // // // // // //               </button>
// // // // // // // //             )}
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </nav>
// // // // // // // //   )
// // // // // // // // }

// // // // // // // // // // src/components/Navbar.tsx
// // // // // // // // // 'use client'
// // // // // // // // // import Link from 'next/link'
// // // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // // // // // // import { useTheme } from '@/contexts/ThemeContext'

// // // // // // // // // export function Navbar() {
// // // // // // // // //   const { user, isAuthenticated } = useAuth()
// // // // // // // // //   const { isDark } = useTheme()

// // // // // // // // //   return (
// // // // // // // // //     <nav className={`${
// // // // // // // // //       isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
// // // // // // // // //     } shadow-sm transition-colors`}>
// // // // // // // // //       <div className="container mx-auto px-4">
// // // // // // // // //         <div className="flex justify-between h-16">
// // // // // // // // //           <Link href="/" className="flex items-center font-bold text-xl">
// // // // // // // // //             My Blog
// // // // // // // // //           </Link>
// // // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // // //             <Link href="/blog" className="hover:text-gray-600 dark:hover:text-gray-300">
// // // // // // // // //               Blog
// // // // // // // // //             </Link>
// // // // // // // // //             <ThemeToggle />
// // // // // // // // //             {isAuthenticated ? (
// // // // // // // // //               <>
// // // // // // // // //                 <Link href="/blog/new" className="hover:text-gray-600 dark:hover:text-gray-300">
// // // // // // // // //                   New Post
// // // // // // // // //                 </Link>
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // //                   className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // //                 >
// // // // // // // // //                   Sign Out
// // // // // // // // //                 </button>
// // // // // // // // //               </>
// // // // // // // // //             ) : (
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // //                   provider: 'github',
// // // // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // //                 })}
// // // // // // // // //                 className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // //               >
// // // // // // // // //                 Sign In
// // // // // // // // //               </button>
// // // // // // // // //             )}
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </nav>
// // // // // // // // //   )
// // // // // // // // // }

// // // // // // // // // // // src/components/Navbar.tsx - Updated to use ClientOnly
// // // // // // // // // // 'use client'
// // // // // // // // // // import Link from 'next/link'
// // // // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'

// // // // // // // // // // export function Navbar() {
// // // // // // // // // //   const { user, isAuthenticated } = useAuth()

// // // // // // // // // //   return (
// // // // // // // // // //    //  <nav className="bg-white shadow-sm">
// // // // // // // // // //     <nav className="bg-white dark:bg-dark-primary shadow-sm transition-colors duration-200">
// // // // // // // // // //       <div className="container mx-auto px-4">
// // // // // // // // // //         <div className="flex justify-between h-16">
// // // // // // // // // //           <Link href="/" className="flex items-center font-bold text-xl">
// // // // // // // // // //             My Blog
// // // // // // // // // //           </Link>
// // // // // // // // // //           <ClientOnly>
// // // // // // // // // //             <div className="flex items-center space-x-8">
// // // // // // // // // //               <Link href="/blog" className="hover:text-gray-600">Blog</Link>
// // // // // // // // // //               <ThemeToggle />
// // // // // // // // // //               {isAuthenticated ? (
// // // // // // // // // //                 <>
// // // // // // // // // //                   <Link href="/blog/new" className="hover:text-gray-600">New Post</Link>
// // // // // // // // // //                   <button
// // // // // // // // // //                     onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // // //                     className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // //                   >
// // // // // // // // // //                     Sign Out
// // // // // // // // // //                   </button>
// // // // // // // // // //                 </>
// // // // // // // // // //               ) : (
// // // // // // // // // //                 <button
// // // // // // // // // //                   onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // // //                     provider: 'github',
// // // // // // // // // //                     options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // // //                   })}
// // // // // // // // // //                   className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // //                 >
// // // // // // // // // //                   Sign In
// // // // // // // // // //                 </button>
// // // // // // // // // //               )}
// // // // // // // // // //             </div>
// // // // // // // // // //           </ClientOnly>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </nav>
// // // // // // // // // //   )
// // // // // // // // // // }

```

# src/components/PostCard.tsx

```tsx
// src/components/PostCard.tsx
import Link from "next/link";
import Image from "next/image";
import { getCategoryName, getCategoryTextColor, CategoryId } from "@/data/categories";

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
			className='group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow'
		>
			<div className='aspect-[16/9] relative bg-gray-900'>
				{post.cover_image ? (
					<Image
						src={post.cover_image}
						alt={post.title}
						fill
						className='object-cover'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				) : (
					<div className='absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800' />
				)}
			</div>
			<div className='p-4'>
				<div className='flex justify-between items-center mb-2'>
					<span className={`text-sm ${categoryTextColor}`}>{getCategoryName(post.category)}</span>
					<span className='text-sm text-gray-400'>{post.date}</span>
				</div>
				<h3 className='text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3>
				<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
			</div>
		</Link>
	);
}

// // src/components/PostCard.tsx
// import styled from "styled-components";
// import Link from "next/link";
// import Image from "next/image";
// import { getCategoryName, getCategoryTextColor, CategoryId } from "@/data/categories";

// type PostCardProps = {
// 	post: {
// 		id: string;
// 		title: string;
// 		excerpt: string;
// 		category: CategoryId;
// 		date: string;
// 		slug: string;
// 		cover_image?: string;
// 	};
// };

// const StyledCard = styled(Card)`
// 	&:hover {
// 		box-shadow: 0 4px 6px -1px ${({ theme }) => theme.colors.gray[300]};
// 	}
// `;

// export function PostCard({ post }: PostCardProps) {
// 	const categoryTextColor = getCategoryTextColor(post.category);

// 	return (
// 		<Link
// 			href={`/blog/${post.slug}`}
// 			className='group bg-gray-800 rounded-lg overflow-hidden'
// 		>
// 			{/* className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"> */}
// 			<StyledCard>
// 				<div className='aspect-[16/9] relative bg-gray-900'>
// 					{post.cover_image ? (
// 						<Image
// 							src={post.cover_image}
// 							alt={post.title}
// 							fill
// 							className='object-cover'
// 							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
// 						/>
// 					) : (
// 						<div className='absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800' />
// 					)}
// 				</div>
// 				<div className='p-4'>
// 					<div className='flex justify-between items-center mb-2'>
// 						<span className={`text-sm ${categoryTextColor}`}>{getCategoryName(post.category)}</span>
// 						<span className='text-sm text-gray-400'>{post.date}</span>
// 					</div>
// 					<h3 className='text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3>
// 					<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
// 				</div>
// 			</StyledCard>
// 		</Link>
// 	);
// }

```

# src/components/PostForm.tsx

```tsx
// src/components/PostForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { ImageUpload } from "@/components/ImageUpload";
import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
import { Loader2 } from "lucide-react";
import { categories, CategoryId } from "@/data/categories";

export function PostForm() {
	const router = useRouter();
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		excerpt: "",
		cover_image: "",
		category: "tech" as CategoryId,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;

		setIsSubmitting(true);
		setError("");

		try {
			const slug = formData.title
				.toLowerCase()
				.trim()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)+/g, "");

			const { error: postError } = await supabaseClient.from("posts").insert([
				{
					...formData,
					slug,
					published: true,
					author_id: user.id,
				},
			]);

			if (postError) throw postError;

			// Call revalidation API
			await fetch("/api/revalidate", { method: "POST" });
			router.push("/blog");
		} catch (err) {
			console.error("Error:", err);
			setError(err instanceof Error ? err.message : "Failed to create post");
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && <div className="bg-red-500/10 text-red-500 p-4 rounded">{error}</div>}

			<div>
				<label className="block text-sm font-medium mb-2">Title</label>
				<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100" required />
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Category</label>
				<select value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))} className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100" required>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Cover Image</label>
				<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Excerpt</label>
				<textarea value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100" />
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Content</label>
				<div className="border border-gray-700 rounded-lg overflow-hidden">
					<RichMarkdownEditor initialContent={formData.content} onChange={(content) => setFormData((prev) => ({ ...prev, content }))} />
				</div>
			</div>

			<button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2">
				{isSubmitting && <Loader2 className="animate-spin" size={16} />}
				{isSubmitting ? "Creating..." : "Create Post"}
			</button>
		</form>
	);
}
// // src/components/PostForm.tsx
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseClient } from "@/lib/auth";
// import { useAuth } from "@/hooks/useAuth";
// import { ImageUpload } from "@/components/ImageUpload";
// import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// import { Loader2 } from "lucide-react";
// import { categories, CategoryId } from "@/data/categories";

// export function PostForm() {
// 	const router = useRouter();
// 	const { user } = useAuth();
// 	const [formData, setFormData] = useState({
// 		title: "",
// 		content: "",
// 		excerpt: "",
// 		cover_image: "",
// 		category: "tech" as CategoryId,
// 	});
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [error, setError] = useState("");

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!user) return;

// 		setIsSubmitting(true);
// 		setError("");

// 		try {
// 			const slug = formData.title
// 				.toLowerCase()
// 				.trim()
// 				.replace(/[^a-z0-9]+/g, "-")
// 				.replace(/(^-|-$)+/g, "");

// 			const { error: postError } = await supabaseClient.from("posts").insert([
// 				{
// 					...formData,
// 					slug,
// 					published: true,
// 					author_id: user.id,
// 				},
// 			]);

// 			if (postError) throw postError;

// 			// Force revalidation of the blog page
// 			await fetch("/blog", { method: "GET", cache: "no-store" });
// 			router.refresh();
// 			router.push("/blog");
// 		} catch (err) {
// 			console.error("Error:", err);
// 			setError(err instanceof Error ? err.message : "Failed to create post");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	return (
// 		<form onSubmit={handleSubmit} className="space-y-6">
// 			{error && <div className="bg-red-500/10 text-red-500 p-4 rounded">{error}</div>}

// 			<div>
// 				<label className="block text-sm font-medium mb-2">Title</label>
// 				<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100" required />
// 			</div>

// 			<div>
// 				<label className="block text-sm font-medium mb-2">Category</label>
// 				<select value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))} className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100" required>
// 					{categories.map((category) => (
// 						<option key={category.id} value={category.id}>
// 							{category.name}
// 						</option>
// 					))}
// 				</select>
// 			</div>

// 			<div>
// 				<label className="block text-sm font-medium mb-2">Cover Image</label>
// 				<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// 			</div>

// 			<div>
// 				<label className="block text-sm font-medium mb-2">Excerpt</label>
// 				<textarea value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100" />
// 			</div>

// 			<div>
// 				<label className="block text-sm font-medium mb-2">Content</label>
// 				<div className="border border-gray-700 rounded-lg overflow-hidden">
// 					<RichMarkdownEditor initialContent={formData.content} onChange={(content) => setFormData((prev) => ({ ...prev, content }))} />
// 				</div>
// 			</div>

// 			<button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2">
// 				{isSubmitting && <Loader2 className="animate-spin" size={16} />}
// 				{isSubmitting ? "Creating..." : "Create Post"}
// 			</button>
// 		</form>
// 	);
// }

// // 'use client'
// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { supabaseClient } from '@/lib/auth'
// // import { useAuth } from '@/hooks/useAuth'
// // import { ImageUpload } from '@/components/ImageUpload'
// // import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
// // import { Loader2 } from 'lucide-react'
// // import { categories, CategoryId } from '@/data/categories'

// // export function PostForm() {
// //   const router = useRouter()
// //   const { user } = useAuth()
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     content: '',
// //     excerpt: '',
// //     cover_image: '',
// //     category: 'tech' as CategoryId
// //   })
// //   const [isSubmitting, setIsSubmitting] = useState(false)
// //   const [error, setError] = useState('')

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (!user) return

// //     setIsSubmitting(true)
// //     setError('')

// //     try {
// //       const slug = formData.title
// //         .toLowerCase()
// //         .trim()
// //         .replace(/[^a-z0-9]+/g, '-')
// //         .replace(/(^-|-$)+/g, '')

// //       const { error: postError } = await supabaseClient
// //         .from('posts')
// //         .insert([{
// //           ...formData,
// //           slug,
// //           published: true,
// //           author_id: user.id
// //         }])

// //       if (postError) throw postError

// //       router.push('/blog')
// //       router.refresh()
// //     } catch (err) {
// //       console.error('Error:', err)
// //       setError(err instanceof Error ? err.message : 'Failed to create post')
// //     } finally {
// //       setIsSubmitting(false)
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
// //         <label className="block text-sm font-medium mb-2">Category</label>
// //         <select
// //           value={formData.category}
// //           onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as CategoryId }))}
// //           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
// //           required
// //         >
// //           {categories.map(category => (
// //             <option key={category.id} value={category.id}>
// //               {category.name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       <div>
// //         <label className="block text-sm font-medium mb-2">Cover Image</label>
// //         <ImageUpload
// //           onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
// //         />
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
// //         <label className="block text-sm font-medium mb-2">Content</label>
// //         <div className="border border-gray-700 rounded-lg overflow-hidden">
// //           <RichMarkdownEditor
// //             initialContent={formData.content}
// //             onChange={(content) => setFormData(prev => ({...prev, content}))}
// //           />
// //         </div>
// //       </div>

// //       <button
// //         type="submit"
// //         disabled={isSubmitting}
// //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
// //       >
// //         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
// //         {isSubmitting ? 'Creating...' : 'Create Post'}
// //       </button>
// //     </form>
// //   )
// // }

// // // 'use client'
// // // import { useState } from 'react'
// // // import { useRouter } from 'next/navigation'
// // // import { supabaseClient } from '@/lib/auth'
// // // import { useAuth } from '@/hooks/useAuth'
// // // import { ImageUpload } from '@/components/ImageUpload'
// // // import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
// // // import { Loader2 } from 'lucide-react'

// // // export function PostForm() {
// // //   const router = useRouter()
// // //   const { user } = useAuth()
// // //   const [formData, setFormData] = useState({
// // //     title: '',
// // //     content: '',
// // //     excerpt: '',
// // //     cover_image: ''
// // //   })
// // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // //   const [error, setError] = useState('')

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     if (!user) return

// // //     setIsSubmitting(true)
// // //     setError('')

// // //     try {
// // //       const slug = formData.title
// // //         .toLowerCase()
// // //         .trim()
// // //         .replace(/[^a-z0-9]+/g, '-')
// // //         .replace(/(^-|-$)+/g, '')

// // //       const { error: postError } = await supabaseClient
// // //         .from('posts')
// // //         .insert([{
// // //           ...formData,
// // //           slug,
// // //           published: true,
// // //           author_id: user.id
// // //         }])

// // //       if (postError) throw postError

// // //       router.push('/blog')
// // //       router.refresh()
// // //     } catch (err) {
// // //       console.error('Error:', err)
// // //       setError(err instanceof Error ? err.message : 'Failed to create post')
// // //     } finally {
// // //       setIsSubmitting(false)
// // //     }
// // //   }

// // //   return (
// // //     <form onSubmit={handleSubmit} className="space-y-6">
// // //       {error && (
// // //         <div className="bg-red-500/10 text-red-500 p-4 rounded">
// // //           {error}
// // //         </div>
// // //       )}

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Title</label>
// // //         <input
// // //           type="text"
// // //           value={formData.title}
// // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // //           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
// // //           required
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Cover Image</label>
// // //         <ImageUpload
// // //           onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// // //         <textarea
// // //           value={formData.excerpt}
// // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // //           className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
// // //         />
// // //       </div>

// // //       <div>
// // //         <label className="block text-sm font-medium mb-2">Content</label>
// // //         <div className="border border-gray-700 rounded-lg overflow-hidden">
// // //           <RichMarkdownEditor
// // //             initialContent={formData.content}
// // //             onChange={(content) => setFormData(prev => ({...prev, content}))}
// // //           />
// // //         </div>
// // //       </div>

// // //       <button
// // //         type="submit"
// // //         disabled={isSubmitting}
// // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
// // //       >
// // //         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
// // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // //       </button>
// // //     </form>
// // //   )
// // // }
// // // // 'use client'
// // // // import { useState } from 'react'
// // // // import { useRouter } from 'next/navigation'
// // // // import { supabaseClient } from '@/lib/auth'
// // // // import { useAuth } from '@/hooks/useAuth'
// // // // import { ImageUpload } from '@/components/ImageUpload'
// // // // import { RichMarkdownEditor } from '@/components/RichMarkdownEditor'
// // // // import { Loader2 } from 'lucide-react'

// // // // export function PostForm() {
// // // //   const router = useRouter()
// // // //   const { user } = useAuth()
// // // //   const [formData, setFormData] = useState({
// // // //     title: '',
// // // //     content: '',
// // // //     excerpt: '',
// // // //     cover_image: ''
// // // //   })
// // // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // //   const [error, setError] = useState('')

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     if (!user) return

// // // //     setIsSubmitting(true)
// // // //     setError('')

// // // //     try {
// // // //       // First, ensure profile exists
// // // //       const { error: profileError } = await supabaseClient
// // // //         .from('profiles')
// // // //         .insert([{
// // // //           id: user.id,
// // // //           username: user.email?.split('@')[0] || 'anonymous'
// // // //         }])
// // // //         .select()
// // // //         .single()

// // // //       // Ignore if profile already exists
// // // //       if (profileError && !profileError.message.includes('duplicate')) {
// // // //         throw profileError
// // // //       }

// // // //       // Create post
// // // //       const slug = formData.title
// // // //         .toLowerCase()
// // // //         .trim()
// // // //         .replace(/[^a-z0-9]+/g, '-')
// // // //         .replace(/(^-|-$)+/g, '')

// // // //       const { error: postError } = await supabaseClient
// // // //         .from('posts')
// // // //         .insert([{
// // // //           ...formData,
// // // //           slug,
// // // //           published: true,
// // // //           author_id: user.id
// // // //         }])

// // // //       if (postError) throw postError

// // // //       router.push('/blog')
// // // //       router.refresh()
// // // //     } catch (err) {
// // // //       console.error('Error:', err)
// // // //       setError(err instanceof Error ? err.message : 'Failed to create post')
// // // //     } finally {
// // // //       setIsSubmitting(false)
// // // //     }
// // // //   }

// // // //   return (
// // // //     <form onSubmit={handleSubmit} className="space-y-6">
// // // //       {error && (
// // // //         <div className="bg-red-500/10 text-red-500 p-4 rounded">
// // // //           {error}
// // // //         </div>
// // // //       )}

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Title</label>
// // // //         <input
// // // //           type="text"
// // // //           value={formData.title}
// // // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // // //           className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
// // // //           required
// // // //         />
// // // //       </div>

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Cover Image</label>
// // // //         <ImageUpload
// // // //           onUploadComplete={(url) => setFormData(prev => ({...prev, cover_image: url}))}
// // // //         />
// // // //       </div>

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// // // //         <textarea
// // // //           value={formData.excerpt}
// // // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // // //           className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
// // // //         />
// // // //       </div>

// // // //       <div>
// // // //         <label className="block text-sm font-medium mb-2">Content</label>
// // // //         <RichMarkdownEditor
// // // //           initialContent={formData.content}
// // // //           onChange={(content) => setFormData(prev => ({...prev, content}))}
// // // //         />
// // // //       </div>

// // // //       <button
// // // //         type="submit"
// // // //         disabled={isSubmitting}
// // // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
// // // //       >
// // // //         {isSubmitting && <Loader2 className="animate-spin" size={16} />}
// // // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // // //       </button>
// // // //     </form>
// // // //   )
// // // // }

// // // // // // src/components/PostForm.tsx
// // // // // "use client";
// // // // // import { useState } from "react";
// // // // // import { useRouter } from "next/navigation";
// // // // // import { supabaseClient } from "@/lib/auth";
// // // // // import { useAuth } from "@/hooks/useAuth";

// // // // // export function PostForm() {
// // // // // 	const router = useRouter();
// // // // // 	const { user } = useAuth();
// // // // // 	const [formData, setFormData] = useState({
// // // // // 		title: "",
// // // // // 		content: "",
// // // // // 		excerpt: "",
// // // // // 		category: "tech", // Add this line
// // // // // 	});
// // // // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // 	const [error, setError] = useState("");

// // // // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // // // 		e.preventDefault();
// // // // // 		if (!user) return;

// // // // // 		setIsSubmitting(true);
// // // // // 		setError("");

// // // // // 		try {
// // // // // 			// First, ensure profile exists
// // // // // 			const { error: profileError } = await supabaseClient
// // // // // 				.from("profiles")
// // // // // 				.insert([
// // // // // 					{
// // // // // 						id: user.id,
// // // // // 						username: user.email?.split("@")[0] || "anonymous",
// // // // // 					},
// // // // // 				])
// // // // // 				.select()
// // // // // 				.single();

// // // // // 			// Ignore if profile already exists
// // // // // 			if (profileError && !profileError.message.includes("duplicate")) {
// // // // // 				throw profileError;
// // // // // 			}

// // // // // 			// Then create post
// // // // // 			const slug = formData.title
// // // // // 				.toLowerCase()
// // // // // 				.trim()
// // // // // 				.replace(/[^a-z0-9]+/g, "-")
// // // // // 				.replace(/(^-|-$)+/g, "");

// // // // // 			const { error: postError } = await supabaseClient.from("posts").insert([
// // // // // 				{
// // // // // 					...formData,
// // // // // 					slug,
// // // // // 					published: true,
// // // // // 					author_id: user.id,
// // // // // 				},
// // // // // 			]);

// // // // // 			if (postError) throw postError;

// // // // // 			router.push("/blog");
// // // // // 			router.refresh();
// // // // // 		} catch (err) {
// // // // // 			console.error("Error:", err);
// // // // // 			setError(err instanceof Error ? err.message : "Failed to create post");
// // // // // 		} finally {
// // // // // 			setIsSubmitting(false);
// // // // // 		}
// // // // // 	};

// // // // // 	return (
// // // // // 		<form onSubmit={handleSubmit} className="space-y-6">
// // // // // 			{error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}
// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Title</label>
// // // // // 				<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded bg-white text-gray-900" required />
// // // // // 			</div>
// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Excerpt</label>
// // // // // 				<textarea value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-2 border rounded h-24 bg-white text-gray-900" />
// // // // // 			</div>
// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Content</label>
// // // // // 				<textarea value={formData.content} onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} className="w-full p-2 border rounded h-64 bg-white text-gray-900" required />
// // // // // 			</div>
// // // // // 			{/* // Add this to your form JSX, before the submit button */}
// // // // // 			<div>
// // // // // 				<label className="block text-sm font-medium mb-2">Category</label>
// // // // // 				<select value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} className="w-full p-2 border rounded bg-white text-gray-900" required>
// // // // // 					<option value="tech">Tech Articles</option>
// // // // // 					<option value="food">Fusion Food</option>
// // // // // 					<option value="media">Other Media</option>
// // // // // 					<option value="personal">Personal</option>
// // // // // 				</select>
// // // // // 			</div>
// // // // // 			<button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
// // // // // 				{isSubmitting ? "Creating..." : "Create Post"}
// // // // // 			</button>
// // // // // 		</form>
// // // // // 	);
// // // // // }

// // // // // // 'use client'
// // // // // // import { useState } from 'react'
// // // // // // import { useRouter } from 'next/navigation'
// // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // import { useAuth } from '@/hooks/useAuth'

// // // // // // export function PostForm() {
// // // // // //   const router = useRouter()
// // // // // //   const { user } = useAuth()
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     title: '',
// // // // // //     content: '',
// // // // // //     excerpt: ''
// // // // // //   })
// // // // // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // // // //   const [error, setError] = useState('')

// // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // //     e.preventDefault()
// // // // // //     if (!user) {
// // // // // //       setError('User not authenticated')
// // // // // //       return
// // // // // //     }

// // // // // //     setIsSubmitting(true)
// // // // // //     setError('')

// // // // // //     try {
// // // // // //       const slug = formData.title
// // // // // //         .toLowerCase()
// // // // // //         .trim()
// // // // // //         .replace(/[^a-z0-9]+/g, '-')
// // // // // //         .replace(/(^-|-$)+/g, '')

// // // // // //       console.log('Creating post:', {
// // // // // //         ...formData,
// // // // // //         slug,
// // // // // //         published: true,
// // // // // //         author_id: user.id
// // // // // //       })

// // // // // //       const { data, error: insertError } = await supabaseClient
// // // // // //         .from('posts')
// // // // // //         .insert([{
// // // // // //           ...formData,
// // // // // //           slug,
// // // // // //           published: true,
// // // // // //           author_id: user.id
// // // // // //         }])
// // // // // //         .select()
// // // // // //         .single()

// // // // // //       if (insertError) {
// // // // // //         throw insertError
// // // // // //       }

// // // // // //       console.log('Post created:', data)
// // // // // //       router.push('/blog')
// // // // // //       router.refresh()
// // // // // //     } catch (err) {
// // // // // //       console.error('Error details:', err)
// // // // // //       setError(err instanceof Error ? err.message : 'Failed to create post')
// // // // // //     } finally {
// // // // // //       setIsSubmitting(false)
// // // // // //     }
// // // // // //   }

// // // // // //   return (
// // // // // //     <form onSubmit={handleSubmit} className="space-y-6">
// // // // // //       {error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}

// // // // // //       <div>
// // // // // //         <label className="block text-sm font-medium mb-2">Title</label>
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           value={formData.title}
// // // // // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // // // // //           className="w-full p-2 border rounded bg-white text-gray-900"
// // // // // //           required
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div>
// // // // // //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// // // // // //         <textarea
// // // // // //           value={formData.excerpt}
// // // // // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // // // // //           className="w-full p-2 border rounded h-24 bg-white text-gray-900"
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div>
// // // // // //         <label className="block text-sm font-medium mb-2">Content</label>
// // // // // //         <textarea
// // // // // //           value={formData.content}
// // // // // //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// // // // // //           className="w-full p-2 border rounded h-64 bg-white text-gray-900"
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

// // // // // // // // src/components/PostForm.tsx
// // // // // // // 'use client'
// // // // // // // import { useState } from 'react'
// // // // // // // import { useRouter } from 'next/navigation'
// // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // import { useAuth } from '@/hooks/useAuth'

// // // // // // // export function PostForm() {
// // // // // // //   const router = useRouter()
// // // // // // //   const { user } = useAuth()
// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     title: '',
// // // // // // //     content: '',
// // // // // // //     excerpt: ''
// // // // // // //   })
// // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // // // // //   const [error, setError] = useState('')

// // // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // // //     e.preventDefault()
// // // // // // //     if (!user) return

// // // // // // //     setIsSubmitting(true)
// // // // // // //     setError('')

// // // // // // //     try {
// // // // // // //       const slug = formData.title
// // // // // // //         .toLowerCase()
// // // // // // //         .replace(/[^a-z0-9]+/g, '-')
// // // // // // //         .replace(/(^-|-$)+/g, '')

// // // // // // //       await supabaseClient.from('posts').insert([{
// // // // // // //         ...formData,
// // // // // // //         slug,
// // // // // // //         published: true,
// // // // // // //         author_id: user.id
// // // // // // //       }])

// // // // // // //       router.push('/blog')
// // // // // // //       router.refresh()
// // // // // // //     } catch (err) {
// // // // // // //       setError('Failed to create post')
// // // // // // //       console.error(err)
// // // // // // //     } finally {
// // // // // // //       setIsSubmitting(false)
// // // // // // //     }
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <form onSubmit={handleSubmit} className="space-y-6">
// // // // // // //       {error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}

// // // // // // //       <div>
// // // // // // //         <label className="block text-sm font-medium mb-2">Title</label>
// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           value={formData.title}
// // // // // // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // // // // // //           className="w-full p-2 border rounded"
// // // // // // //           required
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       <div>
// // // // // // //         <label className="block text-sm font-medium mb-2">Excerpt</label>
// // // // // // //         <textarea
// // // // // // //           value={formData.excerpt}
// // // // // // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // // // // // //           className="w-full p-2 border rounded h-24"
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       <div>
// // // // // // //         <label className="block text-sm font-medium mb-2">Content</label>
// // // // // // //         <textarea
// // // // // // //           value={formData.content}
// // // // // // //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// // // // // // //           className="w-full p-2 border rounded h-64"
// // // // // // //           required
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       <button
// // // // // // //         type="submit"
// // // // // // //         disabled={isSubmitting}
// // // // // // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // // // // //       >
// // // // // // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // // // // // //       </button>
// // // // // // //     </form>
// // // // // // //   )
// // // // // // // }

// // // // // // // // // src/components/PostForm.tsx - Updated version
// // // // // // // // "use client";
// // // // // // // // import { useState } from "react";
// // // // // // // // import { useRouter } from "next/navigation";
// // // // // // // // import { blogApi } from "@/lib/supabase";
// // // // // // // // import { useAuth } from "@/hooks/useAuth";

// // // // // // // // export function PostForm() {
// // // // // // // // 	const { user, isAuthenticated } = useAuth();
// // // // // // // // 	const router = useRouter();
// // // // // // // // 	const [formData, setFormData] = useState({
// // // // // // // // 		title: "",
// // // // // // // // 		content: "",
// // // // // // // // 		excerpt: "",
// // // // // // // // 	});
// // // // // // // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // // // // // // 	const [error, setError] = useState("");

// // // // // // // // 	if (!isAuthenticated) {
// // // // // // // // 		return <div>Please sign in to create posts.</div>;
// // // // // // // // 	}

// // // // // // // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // 		e.preventDefault();
// // // // // // // // 		setIsSubmitting(true);
// // // // // // // // 		setError("");

// // // // // // // // 		try {
// // // // // // // // 			const slug = formData.title
// // // // // // // // 				.toLowerCase()
// // // // // // // // 				.replace(/[^a-z0-9]+/g, "-")
// // // // // // // // 				.replace(/(^-|-$)+/g, "");

// // // // // // // // 			await blogApi.createPost({
// // // // // // // // 				...formData,
// // // // // // // // 				slug,
// // // // // // // // 				published: false,
// // // // // // // // 				author_id: user.id,
// // // // // // // // 			});

// // // // // // // // 			router.push("/blog");
// // // // // // // // 			router.refresh();
// // // // // // // // 		} catch (err) {
// // // // // // // // 			setError("Failed to create post");
// // // // // // // // 			console.error(err);
// // // // // // // // 		} finally {
// // // // // // // // 			setIsSubmitting(false);
// // // // // // // // 		}
// // // // // // // // 	};

// // // // // // // // 	return (
// // // // // // // // 		<form onSubmit={handleSubmit} className="space-y-6">
// // // // // // // // 			{error && <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>}

// // // // // // // // 			<div>
// // // // // // // // 				<label className="block text-sm font-medium mb-2">Title</label>
// // // // // // // // 				<input type="text" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full p-2 border rounded" required />
// // // // // // // // 			</div>

// // // // // // // // 			<div>
// // // // // // // // 				<label className="block text-sm font-medium mb-2">Excerpt (optional)</label>
// // // // // // // // 				<textarea value={formData.excerpt} onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))} className="w-full p-2 border rounded h-24" />
// // // // // // // // 			</div>

// // // // // // // // 			<div>
// // // // // // // // 				<label className="block text-sm font-medium mb-2">Content</label>
// // // // // // // // 				<textarea value={formData.content} onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} className="w-full p-2 border rounded h-64" required />
// // // // // // // // 			</div>

// // // // // // // // 			<button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
// // // // // // // // 				{isSubmitting ? "Creating..." : "Create Post"}
// // // // // // // // 			</button>
// // // // // // // // 		</form>
// // // // // // // // 	);
// // // // // // // // }

// // // // // // // // // // src/components/PostForm.tsx
// // // // // // // // // 'use client'

// // // // // // // // // import { useState } from 'react'
// // // // // // // // // import { blogApi } from '@/lib/supabase'
// // // // // // // // // import { useRouter } from 'next/navigation'

// // // // // // // // // export function PostForm() {
// // // // // // // // //   const router = useRouter()
// // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // //     title: '',
// // // // // // // // //     content: '',
// // // // // // // // //     excerpt: ''
// // // // // // // // //   })
// // // // // // // // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // // // // // // // //   const [error, setError] = useState('')

// // // // // // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // // // // // //     e.preventDefault()
// // // // // // // // //     setIsSubmitting(true)
// // // // // // // // //     setError('')

// // // // // // // // //     try {
// // // // // // // // //       const slug = formData.title
// // // // // // // // //         .toLowerCase()
// // // // // // // // //         .replace(/[^a-z0-9]+/g, '-')
// // // // // // // // //         .replace(/(^-|-$)+/g, '')

// // // // // // // // //       await blogApi.createPost({
// // // // // // // // //         ...formData,
// // // // // // // // //         slug,
// // // // // // // // //         published: false,
// // // // // // // // //         author_id: 'placeholder-id' // Replace with actual auth user ID
// // // // // // // // //       })

// // // // // // // // //       router.push('/blog')
// // // // // // // // //       router.refresh()
// // // // // // // // //     } catch (err) {
// // // // // // // // //       setError('Failed to create post')
// // // // // // // // //       console.error(err)
// // // // // // // // //     } finally {
// // // // // // // // //       setIsSubmitting(false)
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <form onSubmit={handleSubmit} className="space-y-6">
// // // // // // // // //       {error && (
// // // // // // // // //         <div className="bg-red-50 text-red-500 p-4 rounded">{error}</div>
// // // // // // // // //       )}

// // // // // // // // //       <div>
// // // // // // // // //         <label className="block text-sm font-medium mb-2">Title</label>
// // // // // // // // //         <input
// // // // // // // // //           type="text"
// // // // // // // // //           value={formData.title}
// // // // // // // // //           onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
// // // // // // // // //           className="w-full p-2 border rounded"
// // // // // // // // //           required
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       <div>
// // // // // // // // //         <label className="block text-sm font-medium mb-2">Excerpt (optional)</label>
// // // // // // // // //         <textarea
// // // // // // // // //           value={formData.excerpt}
// // // // // // // // //           onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
// // // // // // // // //           className="w-full p-2 border rounded h-24"
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       <div>
// // // // // // // // //         <label className="block text-sm font-medium mb-2">Content</label>
// // // // // // // // //         <textarea
// // // // // // // // //           value={formData.content}
// // // // // // // // //           onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
// // // // // // // // //           className="w-full p-2 border rounded h-64"
// // // // // // // // //           required
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       <button
// // // // // // // // //         type="submit"
// // // // // // // // //         disabled={isSubmitting}
// // // // // // // // //         className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// // // // // // // // //       >
// // // // // // // // //         {isSubmitting ? 'Creating...' : 'Create Post'}
// // // // // // // // //       </button>
// // // // // // // // //     </form>
// // // // // // // // //   )
// // // // // // // // // }

```

# src/components/Reactions.tsx

```tsx
// src/components/Reactions.tsx
'use client'
import { useState, useEffect } from 'react'
import { supabaseClient } from '@/lib/auth'
import { Heart, ThumbsUp, Star, Coffee } from 'lucide-react'

const REACTIONS = [
  { type: 'like', icon: ThumbsUp },
  { type: 'love', icon: Heart },
  { type: 'star', icon: Star },
  { type: 'coffee', icon: Coffee },
] as const


export function Reactions({ postId }: { postId: string }) {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    loadReactions()
  }, [postId])

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

  const handleReaction = async (type: string) => {
    try {
      await supabaseClient
        .from('reactions')
        .insert({
          post_id: postId,
          type
        })
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
          className="flex items-center gap-1 p-2 rounded-full transition-colors
            bg-gray-800 text-gray-300 hover:bg-gray-700"
        >
          <Icon size={20} />
          <span className="text-sm">{counts[type] || 0}</span>
        </button>
      ))}
    </div>
  )
}

// // src/components/Reactions.tsx
// 'use client'
// import { useState, useEffect } from 'react'
// import { useAuth } from '@/hooks/useAuth'
// import { supabaseClient } from '@/lib/auth'
// import { Heart, ThumbsUp, ThumbsDown, Star, Coffee } from 'lucide-react'

// const REACTIONS = [
//   { type: 'like', icon: ThumbsUp },
//   { type: 'love', icon: Heart },
//   { type: 'star', icon: Star },
//   { type: 'coffee', icon: Coffee },
// ] as const

// export function Reactions({ postId }: { postId: string }) {
//   const { user } = useAuth()
//   const [counts, setCounts] = useState<Record<string, number>>({})
//   const [userReaction, setUserReaction] = useState<string | null>(null)

//   useEffect(() => {
//     loadReactions()
//     if (user) loadUserReaction()
//   }, [postId, user])

//   const loadReactions = async () => {
//     const { data } = await supabaseClient
//       .from('reactions')
//       .select('type')
//       .eq('post_id', postId)

//     const newCounts: Record<string, number> = {}
//     data?.forEach(reaction => {
//       newCounts[reaction.type] = (newCounts[reaction.type] || 0) + 1
//     })
//     setCounts(newCounts)
//   }

//   const loadUserReaction = async () => {
//     if (!user) return
//     const { data } = await supabaseClient
//       .from('reactions')
//       .select('type')
//       .eq('post_id', postId)
//       .eq('user_id', user.id)
//       .single()

//     setUserReaction(data?.type || null)
//   }

//   const handleReaction = async (type: string) => {
//     if (!user) return

//     try {
//       if (userReaction === type) {
//         await supabaseClient
//           .from('reactions')
//           .delete()
//           .eq('post_id', postId)
//           .eq('user_id', user.id)
//         setUserReaction(null)
//       } else {
//         await supabaseClient
//           .from('reactions')
//           .upsert({
//             post_id: postId,
//             user_id: user.id,
//             type
//           })
//         setUserReaction(type)
//       }
//       loadReactions()
//     } catch (error) {
//       console.error('Error updating reaction:', error)
//     }
//   }

//   return (
//     <div className="flex gap-4 items-center">
//       {REACTIONS.map(({ type, icon: Icon }) => (
//         <button
//           key={type}
//           onClick={() => handleReaction(type)}
//           className={`flex items-center gap-1 p-2 rounded-full transition-colors
//             ${userReaction === type
//               ? 'bg-blue-500 text-white'
//               : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
//         >
//           <Icon size={20} />
//           <span className="text-sm">{counts[type] || 0}</span>
//         </button>
//       ))}
//     </div>
//   )
// }
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
```

# src/components/ThemeToggle.tsx

```tsx
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



```

# src/contexts/ThemeContext.tsx

```tsx
// src/contexts/ThemeContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
	isDark: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
	isDark: false,
	toggleTheme: () => {},
});

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		const shouldBeDark = stored === "dark";

		setIsDark(shouldBeDark);
		if (shouldBeDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setIsDark((prev) => {
			const newIsDark = !prev;
			localStorage.setItem("theme", newIsDark ? "dark" : "light");

			if (newIsDark) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}

			return newIsDark;
		});
	};

	if (!mounted) return null;

	return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeContextProvider");
	}
	return context;
}
// // src/contexts/ThemeContext.tsx
// "use client";
// import { createContext, useContext, useEffect, useState } from "react";

// type ThemeContextType = {
// 	isDark: boolean;
// 	toggleTheme: () => void;
// };

// const ThemeContext = createContext<ThemeContextType>({
// 	isDark: false,
// 	toggleTheme: () => {},
// });

// export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
// 	const [mounted, setMounted] = useState(false);
// 	const [isDark, setIsDark] = useState(false);

// 	useEffect(() => {
// 		// Only run theme detection after mount to prevent hydration mismatch
// 		const stored = localStorage.getItem("theme");
// 		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// 		const shouldBeDark = stored ? stored === "dark" : prefersDark;

// 		setIsDark(shouldBeDark);
// 		if (shouldBeDark) {
// 			document.documentElement.classList.add("dark");
// 		}
// 		setMounted(true);
// 	}, []);

// 	const toggleTheme = () => {
// 		setIsDark((prev) => {
// 			const newIsDark = !prev;
// 			localStorage.setItem("theme", newIsDark ? "dark" : "light");

// 			if (newIsDark) {
// 				document.documentElement.classList.add("dark");
// 			} else {
// 				document.documentElement.classList.remove("dark");
// 			}

// 			return newIsDark;
// 		});
// 	};

// 	// Prevent flash during SSR by rendering children only after mount
// 	if (!mounted) {
// 		return null;
// 	}

// 	return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
// }

// export function useTheme() {
// 	const context = useContext(ThemeContext);
// 	if (!context) {
// 		throw new Error("useTheme must be used within ThemeContextProvider");
// 	}
// 	return context;
// }
// // // src/contexts/ThemeContext.tsx
// // "use client";
// // import { createContext, useContext, useEffect, useState } from "react";

// // type ThemeContextType = {
// // 	isDark: boolean;
// // 	toggleTheme: () => void;
// // };

// // const ThemeContext = createContext<ThemeContextType>({
// // 	isDark: false,
// // 	toggleTheme: () => {},
// // });

// // export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
// // 	const [isDark, setIsDark] = useState(false);

// // 	useEffect(() => {
// // 		// Check local storage first
// // 		const stored = localStorage.getItem("theme");
// // 		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// // 		const shouldBeDark = stored ? stored === "dark" : prefersDark;

// // 		setIsDark(shouldBeDark);
// // 		if (shouldBeDark) {
// // 			document.documentElement.classList.add("dark");
// // 		}
// // 	}, []);

// // 	const toggleTheme = () => {
// // 		setIsDark((prev) => {
// // 			const newIsDark = !prev;
// // 			localStorage.setItem("theme", newIsDark ? "dark" : "light");

// // 			if (newIsDark) {
// // 				document.documentElement.classList.add("dark");
// // 			} else {
// // 				document.documentElement.classList.remove("dark");
// // 			}

// // 			return newIsDark;
// // 		});
// // 	};

// // 	return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
// // }

// // export function useTheme() {
// // 	const context = useContext(ThemeContext);
// // 	if (!context) {
// // 		throw new Error("useTheme must be used within ThemeContextProvider");
// // 	}
// // 	return context;
// // }
// // // // src/contexts/ThemeContext.tsx
// // // 'use client'
// // // import { createContext, useContext, useEffect, useState } from 'react'
// // // import { lightTheme, darkTheme } from '@/lib/theme-config'
// // // import type { Theme } from '@/lib/types'

// // // type ThemeContextType = {
// // //   theme: Theme;
// // //   isDark: boolean;
// // //   toggleTheme: () => void;
// // // }

// // // const ThemeContext = createContext<ThemeContextType | null>(null)

// // // export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
// // //   const [isDark, setIsDark] = useState(false)
// // //   const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme)

// // //   useEffect(() => {
// // //     // Check local storage first
// // //     const stored = localStorage.getItem('theme')
// // //     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// // //     const shouldBeDark = stored ? stored === 'dark' : prefersDark

// // //     setIsDark(shouldBeDark)
// // //     setCurrentTheme(shouldBeDark ? darkTheme : lightTheme)

// // //     if (shouldBeDark) {
// // //       document.documentElement.classList.add('dark')
// // //     }
// // //   }, [])

// // //   const toggleTheme = () => {
// // //     setIsDark(prev => {
// // //       const newIsDark = !prev
// // //       const newTheme = newIsDark ? darkTheme : lightTheme

// // //       setCurrentTheme(newTheme)
// // //       localStorage.setItem('theme', newIsDark ? 'dark' : 'light')

// // //       if (newIsDark) {
// // //         document.documentElement.classList.add('dark')
// // //       } else {
// // //         document.documentElement.classList.remove('dark')
// // //       }

// // //       return newIsDark
// // //     })
// // //   }

// // //   return (
// // //     <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme }}>
// // //       {children}
// // //     </ThemeContext.Provider>
// // //   )
// // // }

// // // export function useTheme() {
// // //   const context = useContext(ThemeContext)
// // //   if (!context) {
// // //     throw new Error('useTheme must be used within ThemeContextProvider')
// // //   }
// // //   return context
// // // }

```

# src/data/categories.ts

```ts
// src/data/categories.ts
import { Newspaper, Coffee, Laptop, User } from "lucide-react";

export const categories = [
   {
      id: 'tech',
      name: 'Tech Articles',
      icon: Laptop,
      description: 'Deep dives into software development, web technologies, and the latest tech trends.'
   },
   {
      id: 'media',
      name: 'Other Media',
      icon: Newspaper,
      description: 'Exploring movies, books, games, and digital content.'
   },
   {
      id: 'food',
      name: 'Fusion Food',
      icon: Coffee,
      description: 'Creative recipes blending different culinary traditions.'
   },
   {
      id: 'personal',
      name: 'Personal',
      icon: User,
      description: 'Personal reflections, experiences, and life lessons.'
   }
] as const;

export type CategoryId = typeof categories[number]['id'];

// // src/data/categories.ts
// import { Newspaper, Coffee, Laptop, User } from "lucide-react";

// export const categories = [
//    {
//       id: 'tech',
//       name: 'Tech Articles',
//       icon: Laptop,
//       color: 'bg-primary-600',
//       textColor: 'text-primary-300',
//       gradient: 'bg-gradient-to-br from-primary-500 to-primary-700',
//       description: 'Deep dives into software development, web technologies, and the latest tech trends.'
//    },
//    {
//       id: 'media',
//       name: 'Other Media',
//       icon: Newspaper,
//       color: 'bg-secondary-600',
//       textColor: 'text-secondary-300',
//       gradient: 'bg-gradient-to-br from-secondary-500 to-secondary-700',
//       description: 'Exploring movies, books, games, and digital content.'
//    },
//    {
//       id: 'food',
//       name: 'Fusion Food',
//       icon: Coffee,
//       color: 'bg-accent-600',
//       textColor: 'text-accent-300',
//       gradient: 'bg-gradient-to-br from-accent-500 to-accent-700',
//       description: 'Creative recipes blending different culinary traditions.'
//    },
//    {
//       id: 'personal',
//       name: 'Personal',
//       icon: User,
//       color: 'bg-primary-500',
//       textColor: 'text-primary-200',
//       gradient: 'bg-gradient-to-br from-primary-400 to-primary-600',
//       description: 'Personal reflections, experiences, and life lessons.'
//    }
// ] as const;

// export type CategoryId = typeof categories[number]['id'];
```

# src/data/navbarConfig.ts

```ts
// src/data/navbarConfig.ts
import type { ReactNode } from 'react'
import Image from 'next/image'

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
    label: 'Mash Media Studio',
    logo: '/assets/MashMediaStudio.png'
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
  brand: "flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white",
  link: "hover:text-gray-600 dark:hover:text-gray-300",
  button: "bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
} as const;
// // src/data/navbarConfig.ts
// import type { ReactNode } from 'react'

// export interface NavLink {
//   href: string
//   label: string
//   icon?: ReactNode
//   isButton?: boolean
//   authRequired?: boolean
// }

// export const navLinks = {
//   brand: {
//     href: '/',
//     label: 'MMS | MashMedia Studio'
//   },
//   mainLinks: [
//     {
//       href: '/blog',
//       label: 'Blog'
//     },
//     {
//       href: '/blog/new',
//       label: 'New Post',
//       authRequired: true
//     }
//   ],
//   authLinks: {
//     signIn: {
//       label: 'Sign In',
//       isButton: true
//     },
//     signOut: {
//       label: 'Sign Out',
//       isButton: true
//     }
//   }
// } as const;

// export const navStyles = {
//   base: "bg-white dark:bg-gray-900 shadow-sm transition-colors",
//   container: "container mx-auto px-4",
//   inner: "flex justify-between h-16",
//   brand: "flex items-center font-bold text-xl text-gray-900 dark:text-white",
//   link: "hover:text-gray-600 dark:hover:text-gray-300",
//   button: "bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// } as const;
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

# src/hooks/useTheme.ts

```ts
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

```

# src/lib/auth.ts

```ts
// src/lib/auth.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabaseClient = createClientComponentClient()
```

# src/lib/portfolio-theme.ts

```ts
// src/styles/theme.ts : originall from Portfolio 2025

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
   export interface DefaultTheme extends Theme { }
}

import {
   ThemeMode,
   ColorWithShades,
   ColorShades,
   BorderColors,
   // ColorPalette,
   // Typography,
   Theme
} from "./portfolio-theme";

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
            primary: 'red',
            secondary: 'yellow',
            accent: 'magenta',
            disabled: '#CCCCCC',
            svgColor1: "red",
            svgColor2: "blue",
            svgColor3: "magenta",
            svgColor4: "cyan",
            svgColor5: "green",
         },
         dark: {
            primary: '',
            secondary: '',
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
            primary: '',
            secondary: '',
            accent: '',
            svgColor1: "",
            svgColor2: "",
            svgColor3: "",
            svgColor4: "",
            svgColor5: "",
            disabled: ''
         },
         dark: {
            primary: 'yellowGreen',
            // primary: '#AF99DA',
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

# src/lib/ThemeContext.tsx

```tsx
// src/lib/ThemeContext.tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { lightTheme, darkTheme } from '@/lib/theme-config'
import type { Theme } from '@/lib/types'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(lightTheme)

  useEffect(() => {
    // Check localStorage and system preference
    const stored = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (stored === 'dark' || (!stored && systemDark)) {
      setTheme(darkTheme)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev.isDarkTheme ? lightTheme : darkTheme
      localStorage.setItem('theme', newTheme.isDarkTheme ? 'dark' : 'light')

      if (newTheme.isDarkTheme) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}


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

# src/styles/globals.css

```css
/* src/styles/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Only include core styles that don't depend on theme */
html {
	scroll-behavior: smooth;
}

body {
	min-height: 100vh;
}

/* Use CSS variables for theme values */
:root {
	--nav-height: 80px;
}

/* Remove default styles that might conflict */
button,
input,
textarea {
	all: unset;
}

```

# tailwind.config.ts

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
   darkMode: 'class',
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         fontFamily: {
            baskerville: ['Libre Baskerville', 'serif'],
         },
         colors: {
            primary: {
               50: '#f6f4fe',
               100: '#efecfb',
               200: '#dfdbf9',
               300: '#c7bef4',
               400: '#ab99ec',
               500: '#8e6fe3',
               600: '#8459d9',
               700: '#6e3ec3',
               800: '#5b33a4',
               900: '#4c2c86',
               950: '#2f1a5b',
            },
            secondary: {
               50: '#eefbfc',
               100: '#d4f3f6',
               200: '#afe6ee',
               300: '#77d2e2',
               400: '#3ab6cf',
               500: '#1d99b8',
               600: '#187a9b',
               700: '#19627d',
               800: '#1c5268',
               900: '#1b4559',
               950: '#0c2c3d',
            },
            accent: {
               50: '#fef2f2',
               100: '#fee2e2',
               200: '#fecaca',
               300: '#fca5a5',
               400: '#f87171',
               500: '#ef4444',
               600: '#dc2626',
               700: '#b91c1c',
               800: '#991b1b',
               900: '#7f1d1d',
               950: '#450a0a',
            },
            success: {
               50: '#f8ffe5',
               100: '#efffc7',
               200: '#deff95',
               300: '#bbff3d',
               400: '#aaf625',
               500: '#8add05',
               600: '#6ab100',
               700: '#508605',
               800: '#41690b',
               900: '#37590e',
               950: '#1b3201',
            },
         }
      }
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

