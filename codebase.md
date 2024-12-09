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
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   images: {
      domains: ['example.com', 'localhost', 'images.unsplash.com'],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },
};

export default nextConfig;

// // next.config.ts
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       'localhost',
//       process.env.NEXT_PUBLIC_SUPABASE_URL!.replace('https://', ''),
//     ],
//   },
// };

// export default nextConfig;

// // // next.config.ts
// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   images: {
// //     domains: ['https://cwqfksyohgvbvojewrzr.supabase.co'], // Replace with your actual Supabase domain
// //   },
// // };

// // export default nextConfig;
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
    "@types/prismjs": "^1.26.5",
    "@types/react-syntax-highlighter": "^15.5.13",
    "encoding": "^0.1.13",
    "highlight.js": "^11.10.0",
    "lucide-react": "^0.462.0",
    "next": "15.0.3",
    "prismjs": "^1.29.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-markdown": "^9.0.1",
    "react-syntax-highlighter": "^15.6.1",
    "recharts": "^2.14.1",
    "rehype-highlight": "^7.0.1",
    "rehype-prism-plus": "^2.0.0",
    "rehype-raw": "^7.0.0",
    "rehype-sanitize": "^6.0.0",
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

# public/assets/Be-the-first.png

This is a binary file of the type: Image

# public/assets/GD-Fusion-logo.png

This is a binary file of the type: Image

# public/assets/LittleLloyd-FB.jpg

This is a binary file of the type: Image

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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { ImageUpload } from "@/components/ImageUpload";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
import { Loader2 } from "lucide-react";
import { categories, CategoryId } from "@/data/categories";

type ReactComponentData = {
	name: string;
	props: Record<string, any>;
	code: string;
};

function parseReactComponent(content: string): ReactComponentData {
	try {
		const nameMatch = content.match(/(?:function|const)\s+(\w+)/);
		const name = nameMatch ? nameMatch[1] : "MyComponent";

		const propsMatch = content.match(/(?:function|const)\s+\w+\s*\((\{[^}]*\})\)/);
		const propsString = propsMatch ? propsMatch[1] : "{}";
		const props = Function(`return ${propsString}`)();

		return { name, props, code: content };
	} catch (e) {
		return { name: "MyComponent", props: {}, code: content };
	}
}

function generateReactComponent(name: string, props: Record<string, any>, code: string): string {
	if (!code.includes("export default")) {
		const propsString = Object.keys(props).length ? `{ ${Object.keys(props).join(", ")} }` : "props";
		return `export default function ${name}(${propsString}) {
  return (
    ${code}
  );
}`;
	}
	return code;
}

export function EditForm({ post }: { post: Post }) {
	const router = useRouter();
	const { user } = useAuth();
	const [contentFormat, setContentFormat] = useState(() => {
		return post.content.includes("export default") ? "react" : "markdown";
	});

	const [componentData, setComponentData] = useState<ReactComponentData>(() => {
		return contentFormat === "react" ? parseReactComponent(post.content) : { name: "MyComponent", props: {}, code: "" };
	});

	const [formData, setFormData] = useState({
		title: post.title,
		content: post.content,
		excerpt: post.excerpt || "",
		cover_image: post.cover_image || "",
		category: post.category || ("tech" as CategoryId),
	});

	const handleComponentChange = (field: keyof ReactComponentData, value: any) => {
		setComponentData((prev) => {
			const updated = { ...prev, [field]: value };
			const newContent = generateReactComponent(updated.name, updated.props, updated.code);
			setFormData((prev) => ({ ...prev, content: newContent }));
			return updated;
		});
	};

	// Rest of the component remains the same until the return statement

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-6 max-w-4xl mx-auto px-4'
		>
			{/* Previous form fields remain the same */}

			<div>
				<label className='block text-sm font-medium mb-2'>Content</label>
				{contentFormat === "react" ? (
					<div className='space-y-4'>
						<div>
							<label className='block text-sm font-medium mb-2'>Component Name</label>
							<input
								type='text'
								value={componentData.name}
								onChange={(e) => handleComponentChange("name", e.target.value)}
								className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-2'>Component Props (JSON)</label>
							<textarea
								value={JSON.stringify(componentData.props, null, 2)}
								onChange={(e) => {
									try {
										const props = JSON.parse(e.target.value);
										handleComponentChange("props", props);
									} catch {} // Ignore invalid JSON while typing
								}}
								className='w-full h-32 p-2 font-mono text-sm bg-white dark:bg-gray-800 border rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
								spellCheck={false}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium mb-2'>Component Code</label>
							<textarea
								value={componentData.code}
								onChange={(e) => handleComponentChange("code", e.target.value)}
								className='w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 border rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
								spellCheck={false}
							/>
						</div>
					</div>
				) : (
					<RichMarkdownEditor
						initialContent={formData.content}
						onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
					/>
				)}
			</div>

			{/* Submit buttons remain the same */}
		</form>
	);
}

```

# public/notes/misc2.tsx

```tsx

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

- Staging area for post that are created but not published

### December 06, 2024

- // src/components/BlogDashboard.tsx
- Adjusted Featured text area container to wrap around content {/_---== Featured Posts Grid ===---_/}
- Adjusted the all posts layout template to accomodate padding and changed background {/_---== Regular Posts Grid ===---_/}
- Changed the light & dark mode background : /_ src/app/globals.css _/
- Markdwon wasn't working:
  - Changed BlogPostContent.tsx code

### December 07, 2024

- Change content area font:size to 1rem instead of the regular blog font size of 1.125rem
-

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

# public/project-summaries/Delete Posy Implementation.md

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

# Delete Post Implementation

## Overview

Implemented secure post deletion functionality in the blog with proper Row Level Security (RLS) and user authorization checks.

## Key Components Modified

### 1. Supabase RLS Policy

Added a new Row Level Security policy to allow users to delete only their own posts:

\`\`\`sql
create policy "Users can delete own posts"
  on posts
  for delete
  using (auth.uid() = author_id);
\`\`\`

### 2. DeletePost Component

Location: `src/components/DeletePost.tsx`

- Implemented secure deletion with user verification
- Added loading states and error handling
- Includes proper navigation and cache revalidation

\`\`\`typescript
export function DeletePost({ postId }: { postId: string }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		if (!confirm("Are you sure you want to delete this post?")) return;
		setIsDeleting(true);

		try {
			const { error: deleteError } = await supabaseClient.from("posts").delete().eq("id", postId);

			if (deleteError) throw deleteError;

			await router.push("/blog");
			router.refresh();
			await fetch("/api/revalidate", { method: "POST" });
		} catch (err) {
			console.error("Delete error:", err);
			alert("Failed to delete post");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<button
			onClick={handleDelete}
			disabled={isDeleting}
			className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
		>
			{isDeleting && (
				<Loader2
					className='animate-spin'
					size={16}
				/>
			)}
			{isDeleting ? "Deleting..." : "Delete Post"}
		</button>
	);
}
\`\`\`

### 3. Revalidation Endpoint

Location: `src/app/api/revalidate/route.ts`

- Handles cache revalidation after post deletion
- Ensures blog listing is updated immediately

## Security Features

1. Row Level Security (RLS) ensures users can only delete their own posts
2. Confirmation dialog prevents accidental deletions
3. Loading states prevent duplicate delete requests
4. Error handling with user feedback

## User Flow

1. User clicks "Delete Post"
2. Confirmation dialog appears
3. If confirmed:
   - Button shows loading state
   - Post is deleted from database
   - User is redirected to blog listing
   - Cache is revalidated
   - Blog listing is refreshed

## Error Handling

- Failed deletions show alert messages
- Console errors are logged for debugging
- Loading state is cleared after success/failure

## Git Commit Message Template

\`\`\`git
feat(blog): implement secure post deletion

- Add RLS policy for post deletion
- Implement DeletePost component with loading states
- Add revalidation endpoint for cache management
- Include confirmation dialog and error handling
- Ensure proper user authorization

Requires Supabase RLS policy to be set up for post deletion.
\`\`\`

## Testing Checklist

- [x] RLS policy is properly configured in Supabase
- [x] Delete confirmation appears
- [x] Loading state shows during deletion
- [x] Successful deletion redirects to blog listing
- [x] Blog listing updates after deletion
- [x] Error messages appear for failed deletions

```

# public/project-summaries/Markdown Implementation.md

```md
# Markdown Implementation in Blog Platform

## Final Solution

- Added rehype-highlight for syntax highlighting
- Integrated with ReactMarkdown for content rendering
- Implemented custom styling for markdown elements

## Required Dependencies

\`\`\`bash
npm install react-markdown rehype-highlight highlight.js
\`\`\`

## Core Implementation

\`\`\`typescript
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // or other themes

<ReactMarkdown
	rehypePlugins={[rehypeHighlight]}
	components={{
		p: ({ children }) => <p className='text-gray-300 mb-4'>{children}</p>,
		h2: ({ children }) => <h2 className='text-2xl font-bold mt-8 mb-4'>{children}</h2>,
		// Other component styles...
	}}
>
	{content}
</ReactMarkdown>;
\`\`\`

## Available Dark Code Themes

- github-dark.css
- monokai-sublime.css
- tokyo-night-dark.css
- base16/material-darker.css
- base16/tomorrow-night.css

## Markdown Features

- Headers (#, ##, ###)
- Code blocks (\`\`\`)
- Lists (-, 1.)
- Blockquotes (>)
- Inline styles (**bold**, _italic_)

```

# public/project-summaries/Project-Structure-Overview.md

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

# Project Structure Overview:

Pages:

- `/` (HomePage)

  - Landing page introducing blog categories and content overview
  - Simple welcome section with categories highlights

- `/blog` (BlogList)

  - Main blog dashboard with categorized posts
  - Featured posts grid and filterable post list
  - Category-based navigation

- `/blog/[slug]` (BlogPost)

  - Individual post display with full content
  - Comments and reactions
  - Author info and metadata

- `/blog/new` (NewPost)

  - Post creation form for authenticated users
  - Rich markdown editor
  - Image upload capability

- `/blog/edit/[slug]` (EditPost)

  - Post editing interface
  - Pre-populated form with existing content
  - Update/delete functionality

- `/blog/drafts` (DraftsPage)
  - Draft posts management
  - Publishing controls
  - Preview capabilities

Key Components:

- `BlogDashboard`: Category-based post display manager
- `BlogPostContent`: Post display with formatting
- `PostForm`: Shared form for creating/editing posts
- `Comments`: Comment system interface
- `Reactions`: Post reaction/likes system
- `Navbar`: Site navigation with auth controls
- `RichMarkdownEditor`: Text editor with markdown support
- `ImageUpload`: Image upload handling
- `StagingArea`: Draft post management interface
- `ThemeToggle`: Dark/light mode switcher

Core Features:

- Authentication (GitHub)
- Post CRUD operations
- Comments & Reactions
- Category Management
- Image Uploads
- Dark/Light Themes
- Draft System

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

# public/project-summaries/Theme Implementation Doc.md

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
};

// Hook Implementation
export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeContextProvider");
	}
	return context;
}

// Usage Example
function Component() {
	const { theme, isDark, toggleTheme } = useTheme();
	return <button onClick={toggleTheme}>Toggle</button>;
}
\`\`\`

## ThemeProvider Implementation

\`\`\`typescript
export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
	const [isDark, setIsDark] = useState(false);
	const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const shouldBeDark = stored ? stored === "dark" : prefersDark;

		setIsDark(shouldBeDark);
		setCurrentTheme(shouldBeDark ? darkTheme : lightTheme);

		if (shouldBeDark) document.documentElement.classList.add("dark");
	}, []);

	const toggleTheme = () => {
		setIsDark((prev) => {
			const newIsDark = !prev;
			const newTheme = newIsDark ? darkTheme : lightTheme;
			setCurrentTheme(newTheme);
			localStorage.setItem("theme", newIsDark ? "dark" : "light");
			document.documentElement.classList.toggle("dark");
			return newIsDark;
		});
	};

	return <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}
\`\`\`

## Integration Points

### Styled Components

\`\`\`typescript
const StyledComponent = styled.div<{ theme: Theme }>`
	color: ${({ theme }) => (theme.isDark ? theme.colors.text.dark : theme.colors.text.light)};
`;
\`\`\`

### Tailwind CSS

\`\`\`typescript
function Component() {
	const { isDark } = useTheme();
	return <div className='bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>{/* Content */}</div>;
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
// app/blog/[slug]/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/BlogPostContent";

export default async function BlogPostPage({ params: { slug }, searchParams }: { params: { slug: string }; searchParams: { preview?: string } }) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const query = supabase.from("posts").select("*, profiles(username)").eq("slug", slug).single();

	// Only allow preview if user is authenticated
	if (!searchParams.preview || !session) {
		query.eq("published", true);
	}

	const { data: post } = await query;

	if (!post) notFound();

	return <BlogPostContent post={post} />;
}
// // src/app/blog/[slug]/page.tsx - Server Component
// import { supabaseClient } from '@/lib/auth'
// import { notFound } from 'next/navigation'
// import BlogPostContent from '@/components/BlogPostContent'

// export default async function BlogPostPage({
//   params: { slug }
// }: {
//   params: { slug: string }
// }) {
//   const { data: post } = await supabaseClient
//     .from('posts')
//     .select('*, profiles(username)')
//     .eq('slug', slug)
//     .single()

//   if (!post) notFound()

//   return <BlogPostContent post={post} />
// }

```

# src/app/blog/drafts/page.tsx

```tsx
// app/blog/drafts/page.tsx
import StagingArea from "@/components/StagingArea";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function DraftsPage() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/auth/signin");
	}

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8'>Manage Drafts</h1>
			<StagingArea />
		</div>
	);
}

```

# src/app/blog/edit/[slug]/page.tsx

```tsx
// app/blog/edit/[slug]/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { EditForm } from "@/components/EditForm";

export default async function EditPost({ params: { slug } }: { params: { slug: string } }) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/auth/signin");
	}

	const { data: post } = await supabase.from("posts").select("*").eq("slug", slug).eq("author_id", session.user.id).single();

	if (!post) notFound();

	return (
		<div className='max-w-4xl mx-auto'>
			<h1 className='text-3xl font-bold mb-8'>Edit Post</h1>
			<EditForm post={post} />
		</div>
	);
}

// // src/app/blog/edit/[slug]/page.tsx
// import { supabaseClient } from '@/lib/auth'
// import { notFound } from 'next/navigation'
// import { EditForm } from '@/components/EditForm'

// export default async function EditPost({
//   params: { slug }
// }: {
//   params: { slug: string }
// }) {
//   const { data: post } = await supabaseClient
//     .from('posts')
//     .select('*')
//     .eq('slug', slug)
//     .single()

//   if (!post) notFound()

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
//       <EditForm post={post} />
//     </div>
//   )
// }

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
import Link from "next/link";
import { supabaseClient } from "@/lib/auth";
import BlogDashboard from "@/components/BlogDashboard";
import { CategoryId } from "@/data/categories";
import { GridSize } from "@/components/BlogDashboard";
import { unstable_noStore } from "next/cache";

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
		category: "tech",
		size: "large",
		order: 0,
		title: "Latest in Tech",
		description: "Latest tech insights and tutorials",
	},
	{
		category: "media",
		size: "medium",
		order: 1,
		title: "Media & Reviews",
	},
];

export default async function BlogList() {
	unstable_noStore();

	const { data: posts, error } = await supabaseClient.from("posts").select("*").order("created_at", { ascending: false });

	if (error) {
		console.error("Supabase error:", error);
		return <div>Error loading posts</div>;
	}

	const formattedPosts =
		posts?.map((post) => ({
			id: post.id,
			title: post.title,
			excerpt: post.excerpt || "",
			category: (post.category || "tech") as CategoryId,
			date: new Date(post.created_at).toLocaleDateString(),
			slug: post.slug,
			cover_image: post.cover_image,
		})) || [];

	return (
		// <div className='max-w-7xl mx-auto'>
		<div className='max-w-page mx-auto'>
			<div className='flex justify-between items-center mb-8 px-4'>
				<h1 className='text-3xl font-bold'>Blog Posts</h1>
			</div>

			<BlogDashboard
				posts={formattedPosts}
				featuredSetup={featuredSetup}
			/>
		</div>
	);
}

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
	--nav-height: 80px;
	--page-width: 1080px;
}

@layer base {
	html {
		min-height: 100vh;
	}

	body {
		@apply min-h-screen flex flex-col font-opensans;
		@apply bg-primary-50/20 min-h-screen text-primary-900;
		@apply dark:bg-gradient-to-t from-primary-950 to-primary-900 min-h-screen dark:text-primary-50;
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

	p,
	span,
	div,
	li,
	a {
		@apply font-opensans;
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

/*
@layer base {
	html {
		min-height: 100vh;
	}

	body {
		@apply min-h-screen flex flex-col;
		@apply bg-primary-50/20 min-h-screen text-primary-900;
		@apply dark:bg-gradient-to-t from-primary-950 to-primary-900 min-h-screen dark:text-primary-50;
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
import { Libre_Baskerville, Open_Sans } from "next/font/google";
import { Providers } from "./providers";
// import { Navbar } from "@/components/Navbar";
import "./globals.css";
// import MobileNavbar from "@/components/MobileNavbar";
import { Navbar } from "@/components/MobileNavbar";

const baskerville = Libre_Baskerville({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-baskerville",
});

const openSans = Open_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-opensans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={`${baskerville.variable} ${openSans.variable}`}
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
				className={openSans.className}
				suppressHydrationWarning
			>
				<Providers>
					<div className='min-h-screen flex flex-col'>
						<Navbar />
						{/* <MobileNavbar /> */}
						<main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}

// // src/app/layout.tsx
// import { Libre_Baskerville } from "next/font/google";
// import { Providers } from "./providers";
// import { Navbar } from "@/components/Navbar";
// import "./globals.css";

// const baskerville = Libre_Baskerville({
// 	subsets: ["latin"],
// 	weight: ["400", "700"],
// });

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
//               if (localStorage.theme === 'dark') {
//                 document.documentElement.classList.add('dark')
//               } else {
//                 document.documentElement.classList.remove('dark')
//                 localStorage.setItem('theme', 'light')
//               }
//             `,
// 					}}
// 				/>
// 			</head>
// 			<body
// 				className={baskerville.className}
// 				suppressHydrationWarning
// 			>
// 				<Providers>
// 					<div className='min-h-screen flex flex-col'>
{
	/* <Navbar />; */
}
// 						<main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
// 					</div>
// 				</Providers>
// 			</body>
// 		</html>
// 	);
// }

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
			{/* <section className='max-w-4xl mx-auto space-y-8'> */}
			<section className='max-w-page mx-auto space-y-8'>
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

```

# src/app/providers.tsx

```tsx
// src/app/providers.tsx
"use client";
import { ThemeContextProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return <ThemeContextProvider>{children}</ThemeContextProvider>;
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

# src/components/blog-components/CodeBlock.tsx

```tsx
// src/components/blog-components/CodeBlock.tsx
"use client";
import Prism from "prismjs";
import { useState, useEffect } from "react";
import { Copy, CheckCircle } from "lucide-react";
import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-markup"; // For HTML
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

// type Theme = "tomorrow" | "twilight" | "okaidia" | "dark" | "funky";

type CodeBlockProps = {
	code: string;
	language?: string;
	fontSize?: string;
};

export function CodeBlock({
	code,
	language = "typescript",
	fontSize = "0.875rem", // Default size (14px)
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	// useEffect(() => {
	// 	Prism.highlightAll();
	// }, [code]);
	useEffect(() => {
		Prism.plugins.NormalizeWhitespace.setDefaults({
			"remove-trailing": true,
			"remove-indent": true,
			"left-trim": true,
			"right-trim": true,
		});

		Prism.highlightAll();
	}, [code]);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='relative group my-6'>
			<div className='absolute right-2 top-2 flex items-center space-x-2'>
				<span className='text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded'>{language}</span>
				<button
					onClick={handleCopy}
					className='p-2 text-gray-400 hover:text-white transition-colors'
				>
					{copied ? (
						<CheckCircle
							size={16}
							className='text-green-500'
						/>
					) : (
						<Copy size={16} />
					)}
				</button>
			</div>

			<pre
				className='!mt-0 !bg-[#282c34]'
				style={{ fontSize }}
			>
				<code className={`language-${language}`}>{code}</code>
			</pre>
		</div>
	);
}

// Usage:
{
	/* <CodeBlock
  code={sampleCode}
  language="javascript"
  fontSize="1rem" // 16px
/> */
}
// // src/components/blog-components/CodeBlock.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { Copy, CheckCircle } from "lucide-react";
// import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
// // import "prismjs/themes/prism-funky.css";
// // Import language support
// import "prismjs/components/prism-typescript";
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-jsx";
// import "prismjs/components/prism-tsx";
// import "prismjs/components/prism-css";
// import "prismjs/components/prism-json";

// type Theme = "tomorrow" | "twilight" | "okaidia" | "dark" | "funky";

// type CodeBlockProps = {
// 	code: string;
// 	language?: string;
// 	theme?: Theme;
// 	showLineNumbers?: boolean;
// };

// export function CodeBlock({ code, language = "typescript", showLineNumbers = true }: CodeBlockProps) {
// 	const [copied, setCopied] = useState(false);

// 	useEffect(() => {
// 		Prism.highlightAll();
// 	}, [code]);

// 	const handleCopy = async () => {
// 		await navigator.clipboard.writeText(code);
// 		setCopied(true);
// 		setTimeout(() => setCopied(false), 2000);
// 	};

// 	return (
// 		<div className='relative group my-6'>
// 			<div className='absolute right-2 top-2 flex items-center space-x-2'>
// 				<span className='text-xs text-primary-400 bg-gray-800/50 px-2 py-1 rounded'>{language}</span>
// 				<button
// 					onClick={handleCopy}
// 					className='p-2 text-primary-400 hover:text-white transition-colors'
// 				>
// 					{copied ? (
// 						<CheckCircle
// 							size={16}
// 							className='text-green-500'
// 						/>
// 					) : (
// 						<Copy size={16} />
// 					)}
// 				</button>
// 			</div>

// 			<pre className='!mt-0 !bg-[#282c34]'>
// 				<code className={`language-${language}`}>{code}</code>
// 			</pre>
// 		</div>
// 	);
// }
// // // src/components/blog-components/CodeBlock.tsx
// // "use client";
// // import { useState } from "react";
// // import { Copy, CheckCircle } from "lucide-react";

// // type Theme = "monokai" | "github-dark" | "dracula" | "nord" | "one-dark";

// // type CodeBlockProps = {
// // 	code: string;
// // 	language?: string;
// // 	theme?: Theme;
// // };

// // const themes = {
// // 	monokai: {
// // 		bg: "bg-[#272822]",
// // 		text: "text-[#F8F8F2]",
// // 		lineNumbers: "text-[#75715E]",
// // 		keywords: "text-[#F92672]",
// // 		strings: "text-[#E6DB74]",
// // 		numbers: "text-[#AE81FF]",
// // 		comments: "text-[#75715E]",
// // 	},
// // 	"github-dark": {
// // 		bg: "bg-[#24292e]",
// // 		text: "text-[#e1e4e8]",
// // 		lineNumbers: "text-[#6a737d]",
// // 		keywords: "text-[#ff7b72]",
// // 		strings: "text-[#a5d6ff]",
// // 		numbers: "text-[#79c0ff]",
// // 		comments: "text-[#8b949e]",
// // 	},
// // 	dracula: {
// // 		bg: "bg-[#282a36]",
// // 		text: "text-[#f8f8f2]",
// // 		lineNumbers: "text-[#6272a4]",
// // 		keywords: "text-[#ff79c6]",
// // 		strings: "text-[#f1fa8c]",
// // 		numbers: "text-[#bd93f9]",
// // 		comments: "text-[#6272a4]",
// // 	},
// // 	nord: {
// // 		bg: "bg-[#2e3440]",
// // 		text: "text-[#d8dee9]",
// // 		lineNumbers: "text-[#4c566a]",
// // 		keywords: "text-[#81a1c1]",
// // 		strings: "text-[#a3be8c]",
// // 		numbers: "text-[#b48ead]",
// // 		comments: "text-[#4c566a]",
// // 	},
// // 	"one-dark": {
// // 		bg: "bg-[#282c34]",
// // 		text: "text-[#abb2bf]",
// // 		lineNumbers: "text-[#495162]",
// // 		keywords: "text-[#c678dd]",
// // 		strings: "text-[#98c379]",
// // 		numbers: "text-[#d19a66]",
// // 		comments: "text-[#7f848e]",
// // 	},
// // };

// // export function CodeBlock({ code, language = "typescript", theme = "github-dark" }: CodeBlockProps) {
// // 	const [copied, setCopied] = useState(false);
// // 	const lines = code.split("\n");
// // 	const currentTheme = themes[theme];

// // 	const handleCopy = async () => {
// // 		await navigator.clipboard.writeText(code);
// // 		setCopied(true);
// // 		setTimeout(() => setCopied(false), 2000);
// // 	};

// // 	return (
// // 		<div className='relative group my-6'>
// // 			<div className='absolute right-2 top-2 flex items-center space-x-2 z-10'>
// // 				<span className={`text-xs ${currentTheme.text} px-2 py-1 rounded-md bg-opacity-50 ${currentTheme.bg}`}>{language}</span>
// // 				<button
// // 					onClick={handleCopy}
// // 					className={`p-2 ${currentTheme.text} hover:opacity-80 transition-opacity rounded-md`}
// // 					aria-label='Copy code'
// // 				>
// // 					{copied ? (
// // 						<CheckCircle
// // 							size={16}
// // 							className='text-green-500'
// // 						/>
// // 					) : (
// // 						<Copy size={16} />
// // 					)}
// // 				</button>
// // 			</div>

// // 			<pre className={`${currentTheme.bg} rounded-lg p-4 overflow-x-auto`}>
// // 				<code className='block'>
// // 					{lines.map((line, i) => (
// // 						<div
// // 							key={i}
// // 							className='table-row'
// // 						>
// // 							<span className={`table-cell text-right pr-4 ${currentTheme.lineNumbers} select-none w-8`}>{i + 1}</span>
// // 							<span className={`table-cell pl-4 ${currentTheme.text}`}>{line || "\n"}</span>
// // 						</div>
// // 					))}
// // 				</code>
// // 			</pre>
// // 		</div>
// // 	);
// // }

// // // Usage example:
// // // export default function TechnicalPost() {
// // // 	const sampleCode = `function example() {
// // //   const greeting = "Hello World";
// // //   console.log(greeting);
// // //   return greeting;
// // // }`;

// // // 	return (
// // // 		<div className='space-y-6'>
// // // 			<h2>Monokai Theme</h2>
// // // 			<CodeBlock
// // // 				code={sampleCode}
// // // 				language='javascript'
// // // 				theme='monokai'
// // // 			/>

// // // 			<h2>GitHub Dark Theme</h2>
// // // 			<CodeBlock
// // // 				code={sampleCode}
// // // 				language='javascript'
// // // 				theme='github-dark'
// // // 			/>

// // // 			<h2>Dracula Theme</h2>
// // // 			<CodeBlock
// // // 				code={sampleCode}
// // // 				language='javascript'
// // // 				theme='dracula'
// // // 			/>
// // // 		</div>
// // // 	);
// // // }
// // // // src/components/blog-components/CodeBlock.tsx
// // // "use client";
// // // import { useState } from "react";
// // // import { Copy, CheckCircle } from "lucide-react";

// // // type CodeBlockProps = {
// // // 	code: string;
// // // 	language?: string;
// // // };

// // // export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
// // // 	const [copied, setCopied] = useState(false);
// // // 	const lines = code.split("\n");

// // // 	const handleCopy = async () => {
// // // 		await navigator.clipboard.writeText(code);
// // // 		setCopied(true);
// // // 		setTimeout(() => setCopied(false), 2000);
// // // 	};

// // // 	return (
// // // 		<div className='relative group my-6'>
// // // 			<div className='absolute right-2 top-2 flex items-center space-x-2'>
// // // 				<span className='text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded'>{language}</span>
// // // 				<button
// // // 					onClick={handleCopy}
// // // 					className='p-2 text-gray-400 hover:text-white transition-colors'
// // // 					aria-label='Copy code'
// // // 				>
// // // 					{copied ? (
// // // 						<CheckCircle
// // // 							size={16}
// // // 							className='text-green-500'
// // // 						/>
// // // 					) : (
// // // 						<Copy size={16} />
// // // 					)}
// // // 				</button>
// // // 			</div>

// // // 			<pre className='bg-gray-900 rounded-lg p-4 overflow-x-auto'>
// // // 				<code>
// // // 					{lines.map((line, i) => (
// // // 						<div
// // // 							key={i}
// // // 							className='table-row'
// // // 						>
// // // 							<span className='table-cell text-right pr-4 text-gray-500 select-none w-8'>{i + 1}</span>
// // // 							<span className='table-cell pl-4 text-gray-200'>{line || "\n"}</span>
// // // 						</div>
// // // 					))}
// // // 				</code>
// // // 			</pre>
// // // 		</div>
// // // 	);
// // // }

```

# src/components/blog-components/InteractiveChartPost.tsx

```tsx
// src/components/blog-components/InteractiveChartPost.tsx
"use client";
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function InteractiveChartPost() {
	const [timeframe, setTimeframe] = useState("1y");

	// Sample data - in real usage, this would be passed as props
	const data = {
		"1m": [
			{ date: "1/1", users: 1200, revenue: 5400 },
			{ date: "1/8", users: 1400, revenue: 6200 },
			{ date: "1/15", users: 1800, revenue: 7800 },
			{ date: "1/22", users: 1600, revenue: 7200 },
		],
		"6m": [
			{ date: "Jul", users: 1000, revenue: 4000 },
			{ date: "Aug", users: 1500, revenue: 6000 },
			{ date: "Sep", users: 2000, revenue: 8000 },
			{ date: "Oct", users: 2500, revenue: 10000 },
			{ date: "Nov", users: 3000, revenue: 12000 },
			{ date: "Dec", users: 3500, revenue: 14000 },
		],
		"1y": [
			{ date: "Jan", users: 1000, revenue: 4000 },
			{ date: "Mar", users: 2000, revenue: 8000 },
			{ date: "Jun", users: 3000, revenue: 12000 },
			{ date: "Sep", users: 4000, revenue: 16000 },
			{ date: "Dec", users: 5000, revenue: 20000 },
		],
	};

	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Growth Metrics</h2>
				<div className='flex gap-2'>
					{["1m", "6m", "1y"].map((period) => (
						<button
							key={period}
							onClick={() => setTimeframe(period)}
							className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${timeframe === period ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"}`}
						>
							{period}
						</button>
					))}
				</div>
			</div>

			<div className='h-80'>
				<ResponsiveContainer
					width='100%'
					height='100%'
				>
					<LineChart
						data={data[timeframe]}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke='#374151'
						/>
						<XAxis
							dataKey='date'
							stroke='#9CA3AF'
							tick={{ fill: "#9CA3AF" }}
						/>
						<YAxis
							yAxisId='left'
							stroke='#9CA3AF'
							tick={{ fill: "#9CA3AF" }}
						/>
						<YAxis
							yAxisId='right'
							orientation='right'
							stroke='#9CA3AF'
							tick={{ fill: "#9CA3AF" }}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "#1F2937",
								border: "none",
								borderRadius: "0.5rem",
								color: "#F3F4F6",
							}}
						/>
						<Legend />
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='users'
							stroke='#3B82F6'
							strokeWidth={2}
							dot={{ fill: "#3B82F6", strokeWidth: 2 }}
							activeDot={{ r: 8 }}
						/>
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke='#10B981'
							strokeWidth={2}
							dot={{ fill: "#10B981", strokeWidth: 2 }}
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className='space-y-4 text-gray-600 dark:text-gray-300'>
				<p>This interactive chart shows our growth in users and revenue over time. You can toggle between different timeframes to see the trends.</p>
				<ul className='list-disc pl-5 space-y-2'>
					<li>The blue line represents active users</li>
					<li>The green line represents revenue in USD</li>
					<li>Hover over data points to see exact values</li>
				</ul>
			</div>
		</div>
	);
}

```

# src/components/blog-components/InteractiveCounterPost.tsx

```tsx
"use client";
import { useState } from "react";
// import LoadingSpinner from "../blog/articles/LoadingSpinner";
import Spinner from "../blog/articles/Spinner";

export default function InteractiveCounterPost() {
	const [count, setCount] = useState(0);
	const [theme, setTheme] = useState("blue");

	const colors = {
		blue: "bg-blue-500 hover:bg-blue-600",
		green: "bg-green-500 hover:bg-green-600",
		purple: "bg-purple-500 hover:bg-purple-600",
	};

	return (
		<>
			<div className='bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6'>
				<div className='flex justify-between items-center'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Interactive Counter Demo</h2>
					<div className='flex gap-2'>
						{Object.keys(colors).map((color) => (
							<button
								key={color}
								onClick={() => setTheme(color)}
								className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${theme === color ? `${colors[color]} text-white` : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"}`}
							>
								{color}
							</button>
						))}
					</div>
				</div>

				<div className='flex flex-col items-center gap-4 py-8'>
					<div className='text-6xl font-bold text-gray-900 dark:text-white'>{count}</div>
					<div className='flex gap-2'>
						<button
							onClick={() => setCount((c) => c - 1)}
							className={`px-4 py-2 rounded text-white ${colors[theme]}`}
						>
							Decrease
						</button>
						<button
							onClick={() => setCount(0)}
							className='px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white'
						>
							Reset
						</button>
						<button
							onClick={() => setCount((c) => c + 1)}
							className={`px-4 py-2 rounded text-white ${colors[theme]}`}
						>
							Increase
						</button>
					</div>
				</div>

				<div className='space-y-4 text-gray-600 dark:text-gray-300'>
					<p>This is a simple interactive component demonstrating how React components can be embedded in blog posts. Try these features:</p>
					<ul className='list-disc pl-5 space-y-2'>
						<li>Click the buttons to change the counter value</li>
						<li>Use the color buttons to change the theme</li>
						<li>Notice how the component maintains state</li>
					</ul>
				</div>
			</div>
			{/* <LoadingSpinner /> */}
			<Spinner />
		</>
	);
}

```

# src/components/blog/articles/CodeModal.js

```js
// src/components/blog/articles/CodeModal.js
import React, { useState } from "react";

function CodeModal() {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			{/* ... other content */}
			<button
				id='showModal'
				onClick={handleShowModal}
			>
				Show Code
			</button>

			{showModal && (
				<div className='modal'>
					<div className='modal-content'>
						{/* Your code snippet or other content here */}
						<pre>
							<code>
								{/* Your code snippet */}
								<div
									id='codeModal'
									style='display: none;'
								>
									<h2>Code Snippet</h2>
									<pre>
										\`\`\`html
										<div class='loader'></div>
										\`\`\`
                              \`\`\`css
                              .loader {
                                    border: 16px solid #f3f3f3; /* Light grey */
                                    border-top: 16px solid #3498db; /* Blue */
                                    border-radius: 50%;
                                    width: 120px;
                                    height: 120px;
                                    animation: spin 2s linear infinite;
                                    }

                                    @keyframes spin {
                                    0% { transform: rotate(0deg); }
                                    100% { transform: rotate(360deg); }
                                    }
										\`\`\`
									</pre>
									<button id='closeModal'>Close</button>
								</div>
							</code>
						</pre>
						<button onClick={handleCloseModal}>Close</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default CodeModal;

```

# src/components/blog/articles/LoadingSpinner.tsx

```tsx
// src/components/blog/articles/LoadingSpinner.tsx
import { CodeBlock } from "@/components/blog-components/CodeBlock";
import { useState, useEffect } from "react";

const LoadingSpinner = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const sampleCode = `
   <div className='flex justify-center items-center min-h-[200px]'>
      <div className="relative w-[120px] h-[120px] before:content-['']
         before:absolute before:inset-0 before:border-[16px] before:border-gray-200 dark:before:border-gray-700
         before:border-dashed before:rounded-full before:border-t-primary-500 before:animate-[spin_4s_linear_3]"
      />
   </div>
   `;

	return (
		<>
			<div className='flex justify-center items-center min-h-[200px]'>
				<div
					className="
            relative w-[120px] h-[120px] before:content-['']
            before:absolute before:inset-0 before:border-[16px] before:border-gray-200 dark:before:border-gray-700
            before:border-dashed before:rounded-full before:border-t-primary-500 before:animate-[spin_4s_linear_3]"
				/>
			</div>

			<div className='space-y-6'>
				<h3>Codeblock Theme</h3>
				<CodeBlock
					code={sampleCode}
					language='HTML'
					// language='typescript'
					// theme='monokai'
					fontSize='1rem' // 16px
				/>

				{/* <h2>GitHub Dark Theme</h2>
				<CodeBlock
					code={sampleCode}
					language='javascript'
					theme='github-dark'
				/>

				<h2>Dracula Theme</h2>
				<CodeBlock
					code={sampleCode}
					language='javascript'
					theme='dracula'
				/> */}
			</div>
		</>
	);
};

export default LoadingSpinner;

```

# src/components/blog/articles/Post.jsx

```jsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Modal from "./Modal"; // Reusable Modal Component
import markdownContent from "./post.md"; // Your Markdown file

const Post = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div>
			{/* Render Markdown */}
			<ReactMarkdown
				children={markdownContent}
				components={{
					button: ({ node, ...props }) => (
						<button
							{...props}
							onClick={openModal}
						>
							{props.children}
						</button>
					),
				}}
			/>

			{/* Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
			>
				<h2>Modal Header</h2>
				<p>This is the content inside the modal.</p>
			</Modal>
		</div>
	);
};

export default Post;

```

# src/components/blog/articles/Spinner.css

```css
.spinner-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 200px;
}

.spinner {
	position: relative;
	width: 120px;
	height: 120px;
}

.spinner::before {
	content: "";
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	border: 16px dashed;
	border-color: gray;
	border-radius: 50%;
	animation: spin 4s ease-in-out 7;
}

/* Keyframes for spin animation */
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

```

# src/components/blog/articles/Spinner.jsx

```jsx
// src/components/blog-components/Spinner.jsx
"use client";
import "./Spinner.css";
import { CodeBlock } from "@/components/blog-components/CodeBlock";
// import { useState, useEffect } from "react";

const Spinner = () => {
	// const [mounted, setMounted] = useState(false);

	// useEffect(() => {
	// 	setMounted(true);
	// }, []);

	// if (!mounted) return null;

	const htmlCode = `
      <div className='spinner-container'>
         <div className='spinner'></div>
      </div>
   `;

	const cssCode = `
      .spinner-container {
         display: flex;
         justify-content: center;
         align-items: center;
         min-height: 200px;
      }

      .spinner {
         position: relative;
         width: 120px;
         height: 120px;
      }

      .spinner::before {
         content: "";
         position: absolute;
         top: 0;
         right: 0;
         bottom: 0;
         left: 0;
         border: 16px dashed;
         border-color: gray;
         border-radius: 50%;
         animation: spin 4s ease-in-out 7;
      }

      /* Keyframes for spin animation */
      @keyframes spin {
         0% {
            transform: rotate(0deg);
         }
         100% {
            transform: rotate(360deg);
         }
      }
   `;

	return (
		<>
			<div className='spinner-container'>
				<div className='spinner'></div>
			</div>
			<h3>Basic Spinner Codes:</h3>
			<CodeBlock
				code={htmlCode}
				language='HTML'
				fontSize='1rem' // 16px
			/>
			<CodeBlock
				code={cssCode}
				language='CSS'
				fontSize='1rem' // 16px
			/>
		</>
	);
};

export default Spinner;

```

# src/components/blog/AuthorInfo.tsx

```tsx
// src/components/blog/AuthorInfo.tsx
import Image from "next/image";

type AuthorInfoProps = {
	date: string;
};

export function AuthorInfo({ date }: AuthorInfoProps) {
	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<div className='flex items-start gap-4 mb-8'>
			<Image
				src='/assets/LittleLloyd-FB.jpg'
				alt='R.Lloyd Gonzales'
				width={56}
				height={56}
				className='border border-gray-500 rounded-full'
			/>
			<div>
				<h3 className='text-lg font-semibold text-gray-600 dark:text-gray-400 mb-0'>Lloyd</h3>
				<p className='text-gray-600 dark:text-gray-400 text-sm mb-0 m-0'>Software Engineer</p>
				<time className='text-gray-500 dark:text-gray-500 text-sm mt-0'>{formatDate(date)}</time>
			</div>
		</div>
	);
}

```

# src/components/blog/CodeBlock.tsx

```tsx
// src/components/blog/CodeBlock.tsx
"use client";
import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";

type CodeBlockProps = {
	code: string;
	language?: string;
	showLineNumbers?: boolean;
};

export function CodeBlock({ code, language, showLineNumbers = true }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='relative group'>
			{/* Language Label */}
			{language && <div className='absolute top-2 right-12 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded'>{language}</div>}

			{/* Copy Button */}
			<button
				onClick={handleCopy}
				className='absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors'
				aria-label='Copy code'
			>
				{copied ? (
					<CheckCircle
						size={16}
						className='text-green-500'
					/>
				) : (
					<Copy size={16} />
				)}
			</button>

			{/* Code Content */}
			<pre className='p-4 bg-gray-900 rounded-lg overflow-x-auto'>
				<code className='relative flex'>
					{showLineNumbers && (
						<div className='pr-4 text-gray-500 select-none text-right'>
							{code.split("\n").map((_, i) => (
								<span
									key={i}
									className='block'
								>
									{i + 1}
								</span>
							))}
						</div>
					)}
					<div className='flex-1'>{code}</div>
				</code>
			</pre>
		</div>
	);
}

```

# src/components/blog/CoverImage.tsx

```tsx
// src/components/blog/CoverImage.tsx
import Image from "next/image";

type CoverImageProps = {
	src?: string;
	alt: string;
};

export function CoverImage({ src, alt }: CoverImageProps) {
	if (!src) return null;

	return (
		<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
			<Image
				src={src}
				alt={alt}
				fill
				className='object-cover'
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
				priority
			/>
		</div>
	);
}

```

# src/components/blog/EngagementBar.tsx

```tsx
// src/components/blog/EngagementBar.tsx
import { Reactions } from "@/components/Reactions";

type EngagementBarProps = {
	postId: string;
};

export function EngagementBar({ postId }: EngagementBarProps) {
	return (
		<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
			<Reactions postId={postId} />
		</div>
	);
}

```

# src/components/blog/MarkdownRenderer.tsx

```tsx
// src/components/blog/MarkdownRenderer.tsx
"use client";

import ReactMarkdown from "react-markdown";
import Image from "next/image";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";
import type { ReactNode } from "react";

type CodeBlockProps = {
	code: string;
	language?: string;
};

type MarkdownRendererProps = {
	content: string;
};

const CodeBlock = ({ code, language }: CodeBlockProps) => {
	const [copied, setCopied] = useState(false);
	const lines = code.split("\n");

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='relative mt-4 mb-8'>
			<div className='absolute top-0 right-0 left-0 flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg z-10'>
				<span className='text-sm text-gray-400'>{language || "text"}</span>
				<button
					onClick={handleCopy}
					className='flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors'
				>
					{copied ? (
						<>
							<CheckCheck size={16} />
							<span>Copied!</span>
						</>
					) : (
						<>
							<Copy size={16} />
							<span>Copy</span>
						</>
					)}
				</button>
			</div>

			<pre className='overflow-x-auto bg-gray-900 rounded-lg pt-12 pb-4'>
				<code className='block min-w-full'>
					{lines.map((line, i) => (
						<div
							key={i}
							className='table-row'
						>
							<span className='table-cell text-right pr-4 text-gray-500 select-none w-12'>{i + 1}</span>
							<span className='table-cell pl-4 text-gray-200'>{line || "\n"}</span>
						</div>
					))}
				</code>
			</pre>
		</div>
	);
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw, rehypeSanitize]}
			components={{
				p: ({ children }: { children?: ReactNode }) => {
					if (!children) return <p />;

					const child = Array.isArray(children) ? children[0] : children;
					if (typeof child === "object" && child !== null && "type" in child && (child.type === "code" || child.type === "img")) {
						return <>{children}</>;
					}
					return <p>{children}</p>;
				},
				code({ className, children, ...props }) {
					if (!children) return null;
					const match = /language-(\w+)/.exec(className || "");
					const language = match ? match[1] : undefined;
					const content = String(children).trim();

					if (props.inline) {
						return <code className='px-1.5 py-0.5 bg-gray-800 text-gray-200 rounded'>{content}</code>;
					}

					return (
						<CodeBlock
							code={content}
							language={language}
						/>
					);
				},
				img: ({ src, alt, ...props }) => {
					if (!src) return null;

					if (src.startsWith("http")) {
						return (
							<img
								src={src}
								alt={alt || ""}
								className='rounded-lg max-w-full h-auto my-4'
							/>
						);
					}

					const imageSrc = src.startsWith("/") ? src : `/${src}`;
					return (
						<div className='relative w-full aspect-[16/9] my-8'>
							<Image
								src={imageSrc}
								alt={alt || ""}
								fill
								className='object-cover rounded-lg'
								sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
								loading='lazy'
							/>
						</div>
					);
				},
			}}
		>
			{content}
		</ReactMarkdown>
	);
}

// // src/components/blog/MarkdownRenderer.tsx
// "use client";

// import ReactMarkdown from "react-markdown";
// import Image from "next/image";
// import rehypeRaw from "rehype-raw";
// import rehypeSanitize from "rehype-sanitize";
// import remarkGfm from "remark-gfm";
// import { useState } from "react";
// import { Copy, CheckCheck } from "lucide-react";

// const CodeBlock = ({ code, language }: { code: string; language?: string }) => {
// 	const [copied, setCopied] = useState(false);
// 	const lines = code.split("\n");

// 	const handleCopy = async () => {
// 		await navigator.clipboard.writeText(code);
// 		setCopied(true);
// 		setTimeout(() => setCopied(false), 2000);
// 	};

// 	return (
// 		<div className='relative mt-4 mb-8'>
// 			<div className='absolute top-0 right-0 left-0 flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg z-10'>
// 				<span className='text-sm text-gray-400'>{language || "text"}</span>
// 				<button
// 					onClick={handleCopy}
// 					className='flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors'
// 				>
// 					{copied ? (
// 						<>
// 							<CheckCheck size={16} />
// 							<span>Copied!</span>
// 						</>
// 					) : (
// 						<>
// 							<Copy size={16} />
// 							<span>Copy</span>
// 						</>
// 					)}
// 				</button>
// 			</div>

// 			<pre className='overflow-x-auto bg-gray-900 rounded-lg pt-12 pb-4'>
// 				<code className='block min-w-full'>
// 					{lines.map((line, i) => (
// 						<div
// 							key={i}
// 							className='table-row'
// 						>
// 							<span className='table-cell text-right pr-4 text-gray-500 select-none w-12'>{i + 1}</span>
// 							<span className='table-cell pl-4 text-gray-200'>{line || "\n"}</span>
// 						</div>
// 					))}
// 				</code>
// 			</pre>
// 		</div>
// 	);
// };

// export function MarkdownRenderer({ content }: { content: string }) {
// 	return (
// 		<ReactMarkdown
// 			remarkPlugins={[remarkGfm]}
// 			rehypePlugins={[rehypeRaw, rehypeSanitize]}
// 			components={{
// 				// Override paragraph rendering when it contains code or images
// 				p: ({ children }) => {
// 					const child = children[0];
// 					if (typeof child === "object" && child !== null && "type" in child) {
// 						if (child.type === "code" || child.type === "img") {
// 							return <>{children}</>;
// 						}
// 					}
// 					return <p>{children}</p>;
// 				},
// 				code({ inline, className, children }) {
// 					const match = /language-(\w+)/.exec(className || "");
// 					const language = match ? match[1] : undefined;
// 					const content = String(children).trim();

// 					if (inline) {
// 						return <code className='px-1.5 py-0.5 bg-gray-800 text-gray-200 rounded'>{content}</code>;
// 					}

// 					return (
// 						<CodeBlock
// 							code={content}
// 							language={language}
// 						/>
// 					);
// 				},
// 				img: ({ src, alt, ...props }) => {
// 					if (!src) return null;

// 					if (src.startsWith("http")) {
// 						return (
// 							<img
// 								src={src}
// 								alt={alt || ""}
// 								className='rounded-lg max-w-full h-auto my-4'
// 								{...props}
// 							/>
// 						);
// 					}

// 					const imageSrc = src.startsWith("/") ? src : `/${src}`;
// 					return (
// 						<div className='relative w-full aspect-[16/9] my-8'>
// 							<Image
// 								src={imageSrc}
// 								alt={alt || ""}
// 								fill
// 								className='object-cover rounded-lg'
// 								sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// 								loading='lazy'
// 								{...props}
// 							/>
// 						</div>
// 					);
// 				},
// 			}}
// 		>
// 			{content}
// 		</ReactMarkdown>
// 	);
// }
// // // src/components/blog/MarkdownRenderer.tsx
// // "use client";

// // import ReactMarkdown from "react-markdown";
// // import Image from "next/image";
// // import rehypeRaw from "rehype-raw";
// // import rehypeSanitize from "rehype-sanitize";
// // import remarkGfm from "remark-gfm";
// // import { useState } from "react";
// // import { Copy, CheckCheck } from "lucide-react";

// // const CodeBlock = ({ code, language }: { code: string; language?: string }) => {
// // 	const [copied, setCopied] = useState(false);
// // 	const lines = code.split("\n");

// // 	const handleCopy = async () => {
// // 		await navigator.clipboard.writeText(code);
// // 		setCopied(true);
// // 		setTimeout(() => setCopied(false), 2000);
// // 	};

// // 	return (
// // 		<div className='relative mt-4 mb-8'>
// // 			<div className='absolute top-0 right-0 left-0 flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg'>
// // 				<span className='text-sm text-gray-400'>{language || "text"}</span>
// // 				<button
// // 					onClick={handleCopy}
// // 					className='flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors'
// // 				>
// // 					{copied ? (
// // 						<>
// // 							<CheckCheck size={16} />
// // 							<span>Copied!</span>
// // 						</>
// // 					) : (
// // 						<>
// // 							<Copy size={16} />
// // 							<span>Copy</span>
// // 						</>
// // 					)}
// // 				</button>
// // 			</div>

// // 			<div className='relative'>
// // 				<pre className='overflow-x-auto bg-gray-900 rounded-lg pt-12 pb-4'>
// // 					<code className='block min-w-full'>
// // 						{lines.map((line, i) => (
// // 							<div
// // 								key={i}
// // 								className='table-row'
// // 							>
// // 								<span className='table-cell text-right pr-4 text-gray-500 select-none w-12'>{i + 1}</span>
// // 								<span className='table-cell pl-4 text-gray-200'>{line || "\n"}</span>
// // 							</div>
// // 						))}
// // 					</code>
// // 				</pre>
// // 			</div>
// // 		</div>
// // 	);
// // };

// // export function MarkdownRenderer({ content }: { content: string }) {
// // 	return (
// // 		<ReactMarkdown
// // 			remarkPlugins={[remarkGfm]}
// // 			rehypePlugins={[rehypeRaw, rehypeSanitize]}
// // 			components={{
// // 				code({ inline, className, children }) {
// // 					const match = /language-(\w+)/.exec(className || "");
// // 					const language = match ? match[1] : undefined;
// // 					const content = String(children).trim();

// // 					if (inline) {
// // 						return <code className='px-1.5 py-0.5 bg-gray-800 text-gray-200 rounded'>{content}</code>;
// // 					}

// // 					return (
// // 						<CodeBlock
// // 							code={content}
// // 							language={language}
// // 						/>
// // 					);
// // 				},
// // 				img: ({ src, alt, ...props }) => {
// // 					if (!src) return null;

// // 					if (src.startsWith("http")) {
// // 						return (
// // 							<img
// // 								src={src}
// // 								alt={alt || ""}
// // 								className='rounded-lg max-w-full h-auto my-4'
// // 								{...props}
// // 							/>
// // 						);
// // 					}

// // 					const imageSrc = src.startsWith("/") ? src : `/${src}`;
// // 					return (
// // 						<div className='relative w-full aspect-[16/9] my-8'>
// // 							<Image
// // 								src={imageSrc}
// // 								alt={alt || ""}
// // 								fill
// // 								className='object-cover rounded-lg'
// // 								sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// // 								loading='lazy'
// // 								{...props}
// // 							/>
// // 						</div>
// // 					);
// // 				},
// // 			}}
// // 		>
// // 			{content}
// // 		</ReactMarkdown>
// // 	);
// // }

// // // // src/components/blog/MarkdownRenderer.tsx
// // // import ReactMarkdown from "react-markdown";
// // // import Image from "next/image";
// // // import rehypeHighlight from "rehype-highlight";
// // // import rehypeRaw from "rehype-raw";
// // // import rehypeSanitize from "rehype-sanitize";
// // // import remarkGfm from "remark-gfm";
// // // import hljs from "highlight.js/lib/core";
// // // import javascript from "highlight.js/lib/languages/javascript";
// // // import typescript from "highlight.js/lib/languages/typescript";
// // // import xml from "highlight.js/lib/languages/xml";
// // // import css from "highlight.js/lib/languages/css";
// // // import markdown from "highlight.js/lib/languages/markdown";
// // // import json from "highlight.js/lib/languages/json";
// // // import bash from "highlight.js/lib/languages/bash";
// // // import sql from "highlight.js/lib/languages/sql";

// // // // Import base style
// // // import "highlight.js/styles/base16/material-darker.css";
// // // import { CodeBlock } from "./CodeBlock";

// // // // Register languages
// // // hljs.registerLanguage("javascript", javascript);
// // // hljs.registerLanguage("typescript", typescript);
// // // hljs.registerLanguage("html", xml);
// // // hljs.registerLanguage("xml", xml);
// // // hljs.registerLanguage("css", css);
// // // hljs.registerLanguage("markdown", markdown);
// // // hljs.registerLanguage("json", json);
// // // hljs.registerLanguage("bash", bash);
// // // hljs.registerLanguage("sql", sql);

// // // const ALLOWED_TAGS = ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "blockquote", "hr", "br", "a", "img"];

// // // const ALLOWED_ATTRIBUTES = {
// // // 	a: ["href", "title", "target", "rel"],
// // // 	img: ["src", "alt", "title", "width", "height", "loading"],
// // // 	div: ["class", "style"],
// // // 	span: ["class", "style"],
// // // 	code: ["class", "language"],
// // // };

// // // type MarkdownRendererProps = {
// // // 	content: string;
// // // };

// // // export function MarkdownRenderer({ content }: MarkdownRendererProps) {
// // // 	return (
// // // 		<ReactMarkdown
// // // 			remarkPlugins={[remarkGfm]}
// // // 			rehypePlugins={[rehypeRaw, rehypeSanitize]}
// // // 			components={{
// // // 				p: ({ node, children }) => {
// // // 					if (node?.children[0]?.type === "element" && node.children[0].tagName === "img") {
// // // 						return <div>{children}</div>;
// // // 					}
// // // 					return <p>{children}</p>;
// // // 				},
// // // 				img: ({ src, alt, ...props }) => {
// // // 					if (!src) return null;

// // // 					// Use regular img tag for external URLs
// // // 					if (src.startsWith("http")) {
// // // 						return (
// // // 							<img
// // // 								src={src}
// // // 								alt={alt || ""}
// // // 								className='rounded-lg max-w-full h-auto my-4'
// // // 								{...props}
// // // 							/>
// // // 						);
// // // 					}

// // // 					// Use Next/Image for local images
// // // 					const imageSrc = src.startsWith("/") ? src : `/${src}`;
// // // 					return (
// // // 						<div className='relative w-full aspect-[16/9] my-8'>
// // // 							<Image
// // // 								src={imageSrc}
// // // 								alt={alt || ""}
// // // 								fill
// // // 								className='object-cover rounded-lg'
// // // 								sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// // // 								loading='lazy'
// // // 								{...props}
// // // 							/>
// // // 						</div>
// // // 					);
// // // 				},
// // // 				// img: ({ src, alt, ...props }) => {
// // // 				// 	if (!src) return null;

// // // 				// const imageSrc = src.startsWith("/") ? src : src.startsWith("http") ? src : `/${src}`;

// // // 				// return (
// // // 				// 	<div className='relative w-full aspect-[16/9] my-8'>
// // // 				// 		<Image
// // // 				// 			src={imageSrc}
// // // 				// 			alt={alt || ""}
// // // 				// 			fill
// // // 				// 			className='object-cover rounded-lg'
// // // 				// 			sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// // // 				// 			loading='lazy'
// // // 				// 			{...props}
// // // 				// 		/>
// // // 				// 	</div>
// // // 				// );
// // // 				// },
// // // 				a: ({ href, children, ...props }) => {
// // // 					if (!href) return null;
// // // 					const isExternal = href.startsWith("http");
// // // 					return (
// // // 						<a
// // // 							href={href}
// // // 							{...props}
// // // 							{...(isExternal
// // // 								? {
// // // 										target: "_blank",
// // // 										rel: "noopener noreferrer",
// // // 								  }
// // // 								: {})}
// // // 							className='text-primary-400 hover:text-primary-300 transition-colors'
// // // 						>
// // // 							{children}
// // // 						</a>
// // // 					);
// // // 				},
// // // 				code: ({ node, inline, className, children, ...props }) => {
// // // 					const match = /language-(\w+)/.exec(className || "");
// // // 					const language = match ? match[1] : "";
// // // 					const codeString = Array.isArray(children) ? children.join("") : String(children);

// // // 					if (!inline && language) {
// // // 						let highlighted;
// // // 						try {
// // // 							highlighted = language && hljs.highlight(codeString, { language }).value;
// // // 						} catch (err) {
// // // 							highlighted = codeString;
// // // 						}

// // // 						return (
// // // 							<pre className={`language-${language} relative overflow-x-auto p-4 bg-gray-900 rounded-lg`}>
// // // 								<code
// // // 									className={className}
// // // 									dangerouslySetInnerHTML={{ __html: highlighted }}
// // // 									{...props}
// // // 								/>
// // // 							</pre>
// // // 						);
// // // 					}

// // // 					// return <code className='px-1.5 py-0.5 bg-gray-800 text-gray-200 rounded'>{codeString}</code>;
// // // 					return (
// // // 						<CodeBlock
// // // 							code={content}
// // // 							language={language}
// // // 						/>
// // // 					);
// // // 				},
// // // 			}}
// // // 		>
// // // 			{content}
// // // 		</ReactMarkdown>
// // // 	);
// // // }

// // // // // src/components/blog/MarkdownRenderer.tsx
// // // // import ReactMarkdown from "react-markdown";
// // // // import Image from "next/image";
// // // // import rehypeHighlight from "rehype-highlight";
// // // // import rehypeRaw from "rehype-raw";
// // // // import rehypeSanitize from "rehype-sanitize";
// // // // import remarkGfm from "remark-gfm";
// // // // import hljs from "highlight.js/lib/core";
// // // // import javascript from "highlight.js/lib/languages/javascript";
// // // // import typescript from "highlight.js/lib/languages/typescript";
// // // // import xml from "highlight.js/lib/languages/xml";
// // // // import css from "highlight.js/lib/languages/css";
// // // // import markdown from "highlight.js/lib/languages/markdown";
// // // // import json from "highlight.js/lib/languages/json";
// // // // import bash from "highlight.js/lib/languages/bash";
// // // // import sql from "highlight.js/lib/languages/sql";

// // // // // Import base style
// // // // import "highlight.js/styles/base16/material-darker.css";

// // // // // Register languages
// // // // hljs.registerLanguage("javascript", javascript);
// // // // hljs.registerLanguage("typescript", typescript);
// // // // hljs.registerLanguage("html", xml);
// // // // hljs.registerLanguage("xml", xml);
// // // // hljs.registerLanguage("css", css);
// // // // hljs.registerLanguage("markdown", markdown);
// // // // hljs.registerLanguage("json", json);
// // // // hljs.registerLanguage("bash", bash);
// // // // hljs.registerLanguage("sql", sql);

// // // // const ALLOWED_TAGS = ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "blockquote", "hr", "br", "a", "img"];

// // // // const ALLOWED_ATTRIBUTES = {
// // // // 	a: ["href", "title", "target", "rel"],
// // // // 	img: ["src", "alt", "title", "width", "height", "loading"],
// // // // 	div: ["class", "style"],
// // // // 	span: ["class", "style"],
// // // // 	code: ["class", "language"],
// // // // };

// // // // type MarkdownRendererProps = {
// // // // 	content: string;
// // // // };

// // // // export function MarkdownRenderer({ content }: MarkdownRendererProps) {
// // // // 	return (
// // // // 		<ReactMarkdown
// // // // 			remarkPlugins={[remarkGfm]}
// // // // 			rehypePlugins={[
// // // // 				[rehypeHighlight, { ignoreMissing: true }],
// // // // 				rehypeRaw,
// // // // 				[
// // // // 					rehypeSanitize,
// // // // 					{
// // // // 						allowedTags: ALLOWED_TAGS,
// // // // 						allowedAttributes: ALLOWED_ATTRIBUTES,
// // // // 					},
// // // // 				],
// // // // 			]}
// // // // 			components={{
// // // // 				p: ({ node, children }) => {
// // // // 					if (node?.children[0]?.type === "element" && node.children[0].tagName === "img") {
// // // // 						return <div>{children}</div>;
// // // // 					}
// // // // 					return <p>{children}</p>;
// // // // 				},
// // // // 				img: ({ src, alt, ...props }) => {
// // // // 					if (!src) return null;
// // // // 					const imageSrc = src.startsWith("/") ? src : src.startsWith("http") ? src : `/${src}`;

// // // // 					return (
// // // // 						<div className='relative w-full aspect-[16/9] my-8'>
// // // // 							<Image
// // // // 								src={imageSrc}
// // // // 								alt={alt || ""}
// // // // 								fill
// // // // 								className='object-cover rounded-lg'
// // // // 								sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// // // // 								loading='lazy'
// // // // 								{...props}
// // // // 							/>
// // // // 						</div>
// // // // 					);
// // // // 				},
// // // // 				a: ({ href, children, ...props }) => {
// // // // 					if (!href) return null;
// // // // 					const isExternal = href.startsWith("http");
// // // // 					return (
// // // // 						<a
// // // // 							href={href}
// // // // 							{...props}
// // // // 							{...(isExternal
// // // // 								? {
// // // // 										target: "_blank",
// // // // 										rel: "noopener noreferrer",
// // // // 								  }
// // // // 								: {})}
// // // // 							className='text-primary-400 hover:text-primary-300 transition-colors'
// // // // 						>
// // // // 							{children}
// // // // 						</a>
// // // // 					);
// // // // 				},
// // // // 				code: ({ node, inline, className, children, ...props }) => {
// // // // 					const match = /language-(\w+)/.exec(className || "");
// // // // 					const language = match ? match[1] : "";
// // // // 					const codeString = Array.isArray(children) ? children.join("") : String(children);

// // // // 					if (!inline && language) {
// // // // 						let highlighted;
// // // // 						try {
// // // // 							highlighted = language && hljs.highlight(codeString, { language }).value;
// // // // 						} catch (err) {
// // // // 							highlighted = codeString;
// // // // 						}

// // // // 						return (
// // // // 							<pre className={`language-${language} relative overflow-x-auto p-4 bg-gray-900 rounded-lg`}>
// // // // 								<code
// // // // 									className={className}
// // // // 									dangerouslySetInnerHTML={{ __html: highlighted }}
// // // // 									{...props}
// // // // 								/>
// // // // 							</pre>
// // // // 						);
// // // // 					}

// // // // 					return <code className='px-1.5 py-0.5 bg-gray-800 text-gray-200 rounded'>{codeString}</code>;
// // // // 				},
// // // // 			}}
// // // // 		>
// // // // 			{content}
// // // // 		</ReactMarkdown>
// // // // 	);
// // // // }

```

# src/components/BlogDashboard.tsx

```tsx
// // src/components/BlogDashboard.tsx : v2
// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowLeft } from "lucide-react";
// import { categories, CategoryId } from "@/data/categories";

// type Post = {
// 	id: string;
// 	title: string;
// 	excerpt: string;
// 	category: CategoryId;
// 	date: string;
// 	slug: string;
// 	cover_image?: string;
// };

// const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: "large" | "medium" | "full"; title?: string; description?: string }) => (
// 	<div
// 		className={`relative overflow-hidden rounded-xl bg-primary-800
//       ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
//          transition-transform duration-300 hover:scale-[1.02]`}
// 	>
// 		{post ? (
// 			<Link
// 				href={`/blog/${post.slug}`}
// 				// className='buttonContainer group block h-[250px] aspect-[16/9]'
// 				className='featuredGroup group block h-96 aspect-[16/9]'
// 			>
// 				{post.cover_image ? (
// 					<div className='absolute inset-0'>
// 						<Image
// 							src={post.cover_image}
// 							alt={post.title}
// 							fill
// 							className='object-cover transition-transform duration-500 group-hover:scale-105'
// 							sizes={size === "full" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
// 							priority={size === "large"}
// 						/>
// 						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
// 						{/* <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' /> */}
// 					</div>
// 				) : (
// 					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// 				)}
// 				<div className='featuredContainer absolute inset-0 p-6 flex flex-col justify-end'>
// 					{/*--=== Featured text container ===--*/}
// 					<div className='featuredTextContainer flex flex-col gap-2 self-start border border-primary-200/20 rounded-lg p-3 pr-10 bg-gradient-to-t from-primary-900/70 via-primary-800/70 to-primary-600/70'>
// 						<div className='text-sm font-medium text-primary-300'>{title || category.name}</div>
// 						<h3 className='text-2xl font-bold text-white group-hover:text-brand-primary-200 transition-colors'>{post.title}</h3>
// 						<p className='text-gray-300 line-clamp-2'>{description || post.excerpt}</p>
// 					</div>
// 					{/* <div className='featuredTextContainer inline-block border border-primary-200/20 rounded-lg p-4 bg-gradient-to-t from-primary-800/70 via-primary-600/70 to-primary-400/70'>
// 						<div className={`text-sm font-medium text-primary-300 mb-2`}>{title || category.name}</div>
// 						<h3 className='text-2xl font-bold text-white mb-2 group-hover:text-brand-primary-200 transition-colors'>{post.title}</h3>
// 						<p className='text-gray-300 line-clamp-2'>{description || post.excerpt}</p>
// 					</div> */}
// 				</div>
// 			</Link>
// 		) : (
// 			<div className='aspect-[16/9] relative'>
// 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// 					<div className='absolute inset-0 p-6 flex items-center justify-center'>
// 						<p className='text-xl text-white/70'>No {category.name} posts yet</p>
// 					</div>
// 				</div>
// 			</div>
// 		)}
// 	</div>
// );

// export default function BlogDashboard({ posts }: { posts: Post[] }) {
// 	const [mounted, setMounted] = useState(false);
// 	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

// 	useEffect(() => {
// 		setMounted(true);
// 	}, []);
// 	// Don't render anything until component is mounted to prevent hydration mismatch
// 	if (!mounted) {
// 		return null;
// 	}

// 	// Helper function to get category background color
// 	const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
// 		switch (categoryId) {
// 			case "tech":
// 				return isActive ? "bg-primary-600" : "bg-primary-800 hover:bg-gray-700";
// 			case "media":
// 				return isActive ? "bg-secondary-600" : "bg-primary-800 hover:bg-gray-700";
// 			case "food":
// 				return isActive ? "bg-accent-600" : "bg-primary-800 hover:bg-gray-700";
// 			case "personal":
// 				return isActive ? "bg-success-600" : "bg-primary-800 hover:bg-gray-700";
// 			default:
// 				return "bg-primary-800 hover:bg-gray-700";
// 		}
// 	};

// 	// Helper function to get text color
// 	const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
// 		if (isActive) return "text-white";

// 		switch (categoryId) {
// 			case "tech":
// 				return "text-primary-300";
// 			case "media":
// 				return "text-primary-300";
// 			case "food":
// 				return "text-primary-300";
// 			case "personal":
// 				return "text-primary-200";
// 			default:
// 				return "text-gray-300";
// 		}
// 	};

// 	// Get featured posts
// 	const techPost = posts.find((post) => post.category === "tech");
// 	const mediaPost = posts.find((post) => post.category === "media");
// 	const foodPost = posts.find((post) => post.category === "food");

// 	// Filter remaining posts
// 	const featuredIds = [techPost?.id, mediaPost?.id, foodPost?.id].filter(Boolean);
// 	const remainingPosts = posts.filter((post) => !featuredIds.includes(post.id));

// 	return (
// 		// <div className='max-w-7xl mx-auto px-4 py-8 space-y-12'>
// 		<div className='max-w-page mx-auto px-4 py-8 space-y-12'>
// 			{/* Category buttons */}
// 			<div className='featuredButtonsContainer grid grid-cols-1 md:grid-cols-4 gap-4'>
// 				{categories.map((category) => {
// 					const Icon = category.icon;
// 					const isActive = activeCategory === category.id;
// 					// console.log("Button Classes:", `p-4 rounded-lg flex items-center space-x-3 transition-all ${activeCategory === category.id ? `${category.color} text-white` : "bg-primary-800 hover:bg-primary-700"}`);
// 					return (
// 						<button
// 							key={category.id}
// 							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
// 							className={`
//                         p-4 rounded-lg flex items-center space-x-3 transition-all
//                         ${getCategoryColor(category.id, isActive)}
//                       `}
// 						>
// 							<Icon
// 								size={24}
// 								className={getTextColor(category.id, isActive)}
// 							/>
// 							{/* orig */}
// 							{/* <span className={`font-medium ${isActive ? "text-white" : ""}`}>{category.name}</span> */}
// 							{/* manual */}
// 							{/* <span className={`font-medium ${isActive ? "text-white" : "text-gray-300 dark:text-gray-400"}`}>{category.name}</span> */}
// 							{/* using helper */}
// 							<span className={`font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
// 						</button>
// 					);
// 				})}
// 			</div>

// 			{/*---== Featured Posts Grid ===---*/}
// 			{!activeCategory && (
// 				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
// 					{techPost && (
// 						// <div className='md:col-span-4 md:row-span-2'>
// 						<div className='md:col-span-2 lg:col-span-2 lg:col-start-1'>
// 							<FeaturedCard
// 								post={techPost}
// 								category={categories[0]}
// 								size='full'
// 								// size='large'
// 								title='Featured Tech Article'
// 							/>
// 						</div>
// 					)}
// 					{mediaPost && (
// 						<div className='md:col-span-2'>
// 							<FeaturedCard
// 								post={mediaPost}
// 								category={categories[1]}
// 								size='medium'
// 								title='Latest Media'
// 							/>
// 						</div>
// 					)}
// 					{foodPost && (
// 						<div className='md:col-span-2 lg:col-span-4 lg:col-start-1'>
// 							<FeaturedCard
// 								post={foodPost}
// 								category={categories[2]}
// 								size='full'
// 								title='Latest Recipe'
// 							/>
// 						</div>
// 					)}
// 				</div>
// 			)}

// 			{/*---== Regular Posts Grid ===---*/}
// 			<div>
// 				{/*-== Category title ==-*/}
// 				<h2 className='text-2xl font-bold mb-2'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
// 				{/*-== Category description ==-*/}
// 				{activeCategory && <p className='text-gray-400 text-lg mt-0 mb-20'>{categories.find((c) => c.id === activeCategory)?.description}</p>}
// 				{/*-== Category all posts ==-*/}
// 				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
// 					{(activeCategory ? posts.filter((post) => post.category === activeCategory) : remainingPosts).map((post) => (
// 						<Link
// 							key={post.id}
// 							href={`/blog/${post.slug}`}
// 							/*-= Individual post container template style =-*/
// 							className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
// 						>
// 							<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
// 								{post.cover_image && (
// 									<Image
// 										src={post.cover_image}
// 										alt={post.title}
// 										fill
// 										className='object-cover'
// 										sizes='(max-width: 768px) 100vw, 25vw'
// 									/>
// 								)}
// 							</div>
// 							<div className='p-4'>
// 								<div className='flex justify-between items-center mb-2'>
// 									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
// 									<span className='text-sm text-gray-400'>{post.date}</span>
// 								</div>
// 								<h3 className='text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3>
// 								<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
// 							</div>
// 						</Link>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// src/components/BlogDashboard.tsx • Mobile-Friendly Blog Dashboard : v3
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, CategoryId } from "@/data/categories";

export type GridSize = "large" | "medium" | "full";

type Post = {
	id: string;
	title: string;
	excerpt: string;
	category: CategoryId;
	date: string;
	slug: string;
	cover_image?: string;
};

type FeaturedSetup = {
	category: CategoryId;
	size: GridSize;
	order: number;
	title?: string;
	description?: string;
}[];

const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: GridSize; title?: string; description?: string }) => (
	<div
		className={`relative overflow-hidden rounded-xl bg-primary-800
    ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
    transition-transform duration-300 hover:scale-[1.02]`}
	>
		{post ? (
			<Link
				href={`/blog/${post.slug}`}
				className='block h-64 sm:h-96 aspect-[16/9]'
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
					</div>
				) : (
					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
				)}
				<div className='absolute inset-0 p-4 sm:p-6 flex flex-col justify-end'>
					<div
						className='flex flex-col gap-2 self-start border border-primary-200/20 rounded-lg p-3 pr-6 sm:pr-10
            bg-gradient-to-t from-primary-900/70 via-primary-800/70 to-primary-600/70'
					>
						<div className='text-sm font-medium text-primary-300'>{title || category.name}</div>
						<h3
							className='text-lg sm:text-2xl font-bold text-white group-hover:text-brand-primary-200
              transition-colors line-clamp-2'
						>
							{post.title}
						</h3>
						<p className='text-gray-300 line-clamp-2 text-sm sm:text-base'>{description || post.excerpt}</p>
					</div>
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

export default function BlogDashboard({ posts, featuredSetup }: { posts: Post[]; featuredSetup: FeaturedSetup }) {
	const [mounted, setMounted] = useState(false);
	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
		const category = categories.find((c) => c.id === categoryId);
		return isActive ? `bg-${category?.id}-600` : `bg-primary-800 hover:bg-gray-700`;
	};

	const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
		if (isActive) return "text-white";
		const category = categories.find((c) => c.id === categoryId);
		return `text-${category?.id}-300`;
	};

	// Get featured posts
	const featuredPosts = featuredSetup.map((setup) => ({
		post: posts.find((p) => p.category === setup.category),
		...setup,
	}));

	// Filter remaining posts
	const featuredIds = featuredPosts.map((f) => f.post?.id).filter(Boolean);
	const remainingPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => !featuredIds.includes(post.id));

	return (
		<div className='max-w-page mx-auto px-4 py-8 space-y-8'>
			{/* Category buttons */}
			<div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4'>
				{categories.map((category) => {
					const Icon = category.icon;
					const isActive = activeCategory === category.id;
					return (
						<button
							key={category.id}
							onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
							className={`p-3 sm:p-4 rounded-lg flex items-center justify-center sm:justify-start
                space-x-2 transition-all ${getCategoryColor(category.id, isActive)}`}
						>
							<Icon
								size={20}
								className={getTextColor(category.id, isActive)}
							/>
							<span className={`hidden sm:inline font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
						</button>
					);
				})}
			</div>

			{/* Featured Posts Grid */}
			{!activeCategory && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
					{featuredPosts.map(
						({ post, category, size, title, description }) =>
							post && (
								<FeaturedCard
									key={post.id}
									post={post}
									category={categories.find((c) => c.id === category)!}
									size={size}
									title={title}
									description={description}
								/>
							)
					)}
				</div>
			)}

			{/* Regular Posts Grid */}
			<div>
				<h2 className='text-2xl font-bold mb-2'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
				{activeCategory && <p className='text-gray-400 text-lg mt-0 mb-6'>{categories.find((c) => c.id === activeCategory)?.description}</p>}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
					{remainingPosts.map((post) => (
						<Link
							key={post.id}
							href={`/blog/${post.slug}`}
							className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden
                shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
						>
							<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
								{post.cover_image && (
									<Image
										src={post.cover_image}
										alt={post.title}
										fill
										className='object-cover'
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									/>
								)}
							</div>
							<div className='p-4'>
								<div className='flex justify-between items-center mb-2'>
									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
									<span className='text-sm text-gray-400'>{post.date}</span>
								</div>
								<h3
									className='text-lg font-semibold mb-2 group-hover:text-blue-400
                  transition-colors line-clamp-2'
								>
									{post.title}
								</h3>
								<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

// // // src/components/BlogDashboard.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { categories, CategoryId } from "@/data/categories";

// // export type GridSize = "large" | "medium" | "full";

// // type Post = {
// // 	id: string;
// // 	title: string;
// // 	excerpt: string;
// // 	category: CategoryId;
// // 	date: string;
// // 	slug: string;
// // 	cover_image?: string;
// // };

// // type FeaturedSetup = {
// // 	category: CategoryId;
// // 	size: GridSize;
// // 	order: number;
// // 	title?: string;
// // 	description?: string;
// // }[];

// // const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: GridSize; title?: string; description?: string }) => (
// // 	<div
// // 		className={`relative overflow-hidden rounded-xl bg-primary-800
// //     ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
// //     transition-transform duration-300 hover:scale-[1.02]`}
// // 	>
// // 		{post ? (
// // 			<Link
// // 				href={`/blog/${post.slug}`}
// // 				className='block h-64 sm:h-96 aspect-[16/9]'
// // 			>
// // 				{post.cover_image ? (
// // 					<div className='absolute inset-0'>
// // 						<Image
// // 							src={post.cover_image}
// // 							alt={post.title}
// // 							fill
// // 							className='object-cover transition-transform duration-500 group-hover:scale-105'
// // 							sizes={size === "full" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
// // 							priority={size === "large"}
// // 						/>
// // 						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
// // 					</div>
// // 				) : (
// // 					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// // 				)}
// // 				<div className='absolute inset-0 p-4 sm:p-6 flex flex-col justify-end'>
// // 					<div
// // 						className='flex flex-col gap-2 self-start border border-primary-200/20 rounded-lg p-3 pr-6 sm:pr-10
// //             bg-gradient-to-t from-primary-900/70 via-primary-800/70 to-primary-600/70'
// // 					>
// // 						<div className='text-sm font-medium text-primary-300'>{title || category.name}</div>
// // 						<h3
// // 							className='text-lg sm:text-2xl font-bold text-white group-hover:text-brand-primary-200
// //               transition-colors line-clamp-2'
// // 						>
// // 							{post.title}
// // 						</h3>
// // 						<p className='text-gray-300 line-clamp-2 text-sm sm:text-base'>{description || post.excerpt}</p>
// // 					</div>
// // 				</div>
// // 			</Link>
// // 		) : (
// // 			<div className='aspect-[16/9] relative'>
// // 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// // 					<div className='absolute inset-0 p-6 flex items-center justify-center'>
// // 						<p className='text-xl text-white/70'>No {category.name} posts yet</p>
// // 					</div>
// // 				</div>
// // 			</div>
// // 		)}
// // 	</div>
// // );

// // export default function BlogDashboard({ posts, featuredSetup }: { posts: Post[]; featuredSetup: FeaturedSetup }) {
// // 	const [mounted, setMounted] = useState(false);
// // 	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

// // 	useEffect(() => {
// // 		setMounted(true);
// // 	}, []);

// // 	if (!mounted) return null;

// // 	const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
// // 		const category = categories.find((c) => c.id === categoryId);
// // 		return isActive ? `bg-${category?.id}-600` : `bg-primary-800 hover:bg-gray-700`;
// // 	};

// // 	const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
// // 		if (isActive) return "text-white";
// // 		const category = categories.find((c) => c.id === categoryId);
// // 		return `text-${category?.id}-300`;
// // 	};

// // 	// Get featured posts
// // 	const featuredPosts = featuredSetup.map((setup) => ({
// // 		post: posts.find((p) => p.category === setup.category),
// // 		...setup,
// // 	}));

// // 	// Filter remaining posts
// // 	const featuredIds = featuredPosts.map((f) => f.post?.id).filter(Boolean);
// // 	const remainingPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => !featuredIds.includes(post.id));

// // 	return (
// // 		<div className='max-w-page mx-auto px-4 py-8 space-y-8'>
// // 			{/* Category buttons */}
// // 			<div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4'>
// // 				{categories.map((category) => {
// // 					const Icon = category.icon;
// // 					const isActive = activeCategory === category.id;
// // 					return (
// // 						<button
// // 							key={category.id}
// // 							onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
// // 							className={`p-3 sm:p-4 rounded-lg flex items-center justify-center sm:justify-start
// //                 space-x-2 transition-all ${getCategoryColor(category.id, isActive)}`}
// // 						>
// // 							<Icon
// // 								size={20}
// // 								className={getTextColor(category.id, isActive)}
// // 							/>
// // 							<span className={`hidden sm:inline font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
// // 						</button>
// // 					);
// // 				})}
// // 			</div>

// // 			{/* Featured Posts Grid */}
// // 			{!activeCategory && (
// // 				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
// // 					{featuredPosts.map(
// // 						({ post, category, size, title, description }) =>
// // 							post && (
// // 								<FeaturedCard
// // 									key={post.id}
// // 									post={post}
// // 									category={categories.find((c) => c.id === category)!}
// // 									size={size}
// // 									title={title}
// // 									description={description}
// // 								/>
// // 							)
// // 					)}
// // 				</div>
// // 			)}

// // 			{/* Regular Posts Grid */}
// // 			<div>
// // 				<h2 className='text-2xl font-bold mb-2'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
// // 				{activeCategory && <p className='text-gray-400 text-lg mt-0 mb-6'>{categories.find((c) => c.id === activeCategory)?.description}</p>}
// // 				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
// // 					{remainingPosts.map((post) => (
// // 						<Link
// // 							key={post.id}
// // 							href={`/blog/${post.slug}`}
// // 							className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden
// //                 shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
// // 						>
// // 							<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
// // 								{post.cover_image && (
// // 									<Image
// // 										src={post.cover_image}
// // 										alt={post.title}
// // 										fill
// // 										className='object-cover'
// // 										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
// // 									/>
// // 								)}
// // 							</div>
// // 							<div className='p-4'>
// // 								<div className='flex justify-between items-center mb-2'>
// // 									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
// // 									<span className='text-sm text-gray-400'>{post.date}</span>
// // 								</div>
// // 								<h3
// // 									className='text-lg font-semibold mb-2 group-hover:text-blue-400
// //                   transition-colors line-clamp-2'
// // 								>
// // 									{post.title}
// // 								</h3>
// // 								<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
// // 							</div>
// // 						</Link>
// // 					))}
// // 				</div>
// // 			</div>
// // 		</div>
// // 	);
// // }

// // // // src/components/BlogDashboard.tsx
// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { ArrowLeft } from "lucide-react";
// // // import { categories, CategoryId } from "@/data/categories";

// // // type Post = {
// // // 	id: string;
// // // 	title: string;
// // // 	excerpt: string;
// // // 	category: CategoryId;
// // // 	date: string;
// // // 	slug: string;
// // // 	cover_image?: string;
// // // };

// // // const FeaturedCard = ({ post, category, size = "medium", title, description }: { post?: Post; category: (typeof categories)[number]; size: "large" | "medium" | "full"; title?: string; description?: string }) => (
// // // 	<div
// // // 		className={`relative overflow-hidden rounded-xl bg-primary-800
// // //       ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
// // //          transition-transform duration-300 hover:scale-[1.02]`}
// // // 	>
// // // 		{post ? (
// // // 			<Link
// // // 				href={`/blog/${post.slug}`}
// // // 				// className='buttonContainer group block h-[250px] aspect-[16/9]'
// // // 				className='featuredGroup group block h-96 aspect-[16/9]'
// // // 			>
// // // 				{post.cover_image ? (
// // // 					<div className='absolute inset-0'>
// // // 						<Image
// // // 							src={post.cover_image}
// // // 							alt={post.title}
// // // 							fill
// // // 							className='object-cover transition-transform duration-500 group-hover:scale-105'
// // // 							sizes={size === "full" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
// // // 							priority={size === "large"}
// // // 						/>
// // // 						<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
// // // 						{/* <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' /> */}
// // // 					</div>
// // // 				) : (
// // // 					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
// // // 				)}
// // // 				<div className='featuredContainer absolute inset-0 p-6 flex flex-col justify-end'>
// // // 					{/*--=== Featured text container ===--*/}
// // // 					<div className='featuredTextContainer flex flex-col gap-2 self-start border border-primary-200/20 rounded-lg p-3 pr-10 bg-gradient-to-t from-primary-900/70 via-primary-800/70 to-primary-600/70'>
// // // 						<div className='text-sm font-medium text-primary-300'>{title || category.name}</div>
// // // 						<h3 className='text-2xl font-bold text-white group-hover:text-brand-primary-200 transition-colors'>{post.title}</h3>
// // // 						<p className='text-gray-300 line-clamp-2'>{description || post.excerpt}</p>
// // // 					</div>
// // // 					{/* <div className='featuredTextContainer inline-block border border-primary-200/20 rounded-lg p-4 bg-gradient-to-t from-primary-800/70 via-primary-600/70 to-primary-400/70'>
// // // 						<div className={`text-sm font-medium text-primary-300 mb-2`}>{title || category.name}</div>
// // // 						<h3 className='text-2xl font-bold text-white mb-2 group-hover:text-brand-primary-200 transition-colors'>{post.title}</h3>
// // // 						<p className='text-gray-300 line-clamp-2'>{description || post.excerpt}</p>
// // // 					</div> */}
// // // 				</div>
// // // 			</Link>
// // // 		) : (
// // // 			<div className='aspect-[16/9] relative'>
// // // 				<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
// // // 					<div className='absolute inset-0 p-6 flex items-center justify-center'>
// // // 						<p className='text-xl text-white/70'>No {category.name} posts yet</p>
// // // 					</div>
// // // 				</div>
// // // 			</div>
// // // 		)}
// // // 	</div>
// // // );

// // // export default function BlogDashboard({ posts }: { posts: Post[] }) {
// // // 	const [mounted, setMounted] = useState(false);
// // // 	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

// // // 	useEffect(() => {
// // // 		setMounted(true);
// // // 	}, []);
// // // 	// Don't render anything until component is mounted to prevent hydration mismatch
// // // 	if (!mounted) {
// // // 		return null;
// // // 	}

// // // 	// Helper function to get category background color
// // // 	const getCategoryColor = (categoryId: CategoryId, isActive: boolean) => {
// // // 		switch (categoryId) {
// // // 			case "tech":
// // // 				return isActive ? "bg-primary-600" : "bg-primary-800 hover:bg-gray-700";
// // // 			case "media":
// // // 				return isActive ? "bg-secondary-600" : "bg-primary-800 hover:bg-gray-700";
// // // 			case "food":
// // // 				return isActive ? "bg-accent-600" : "bg-primary-800 hover:bg-gray-700";
// // // 			case "personal":
// // // 				return isActive ? "bg-success-600" : "bg-primary-800 hover:bg-gray-700";
// // // 			default:
// // // 				return "bg-primary-800 hover:bg-gray-700";
// // // 		}
// // // 	};

// // // 	// Helper function to get text color
// // // 	const getTextColor = (categoryId: CategoryId, isActive: boolean) => {
// // // 		if (isActive) return "text-white";

// // // 		switch (categoryId) {
// // // 			case "tech":
// // // 				return "text-primary-300";
// // // 			case "media":
// // // 				return "text-primary-300";
// // // 			case "food":
// // // 				return "text-primary-300";
// // // 			case "personal":
// // // 				return "text-primary-200";
// // // 			default:
// // // 				return "text-gray-300";
// // // 		}
// // // 	};

// // // 	// Get featured posts
// // // 	const techPost = posts.find((post) => post.category === "tech");
// // // 	const mediaPost = posts.find((post) => post.category === "media");
// // // 	const foodPost = posts.find((post) => post.category === "food");

// // // 	// Filter remaining posts
// // // 	const featuredIds = [techPost?.id, mediaPost?.id, foodPost?.id].filter(Boolean);
// // // 	const remainingPosts = posts.filter((post) => !featuredIds.includes(post.id));

// // // 	return (
// // // 		// <div className='max-w-7xl mx-auto px-4 py-8 space-y-12'>
// // // 		<div className='max-w-page mx-auto px-4 py-8 space-y-12'>
// // // 			{/* Category buttons */}
// // // 			<div className='featuredButtonsContainer grid grid-cols-1 md:grid-cols-4 gap-4'>
// // // 				{categories.map((category) => {
// // // 					const Icon = category.icon;
// // // 					const isActive = activeCategory === category.id;
// // // 					// console.log("Button Classes:", `p-4 rounded-lg flex items-center space-x-3 transition-all ${activeCategory === category.id ? `${category.color} text-white` : "bg-primary-800 hover:bg-primary-700"}`);
// // // 					return (
// // // 						<button
// // // 							key={category.id}
// // // 							onClick={() => setActiveCategory(activeCategory === category.id ? null : (category.id as CategoryId))}
// // // 							className={`
// // //                         p-4 rounded-lg flex items-center space-x-3 transition-all
// // //                         ${getCategoryColor(category.id, isActive)}
// // //                       `}
// // // 						>
// // // 							<Icon
// // // 								size={24}
// // // 								className={getTextColor(category.id, isActive)}
// // // 							/>
// // // 							{/* orig */}
// // // 							{/* <span className={`font-medium ${isActive ? "text-white" : ""}`}>{category.name}</span> */}
// // // 							{/* manual */}
// // // 							{/* <span className={`font-medium ${isActive ? "text-white" : "text-gray-300 dark:text-gray-400"}`}>{category.name}</span> */}
// // // 							{/* using helper */}
// // // 							<span className={`font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
// // // 						</button>
// // // 					);
// // // 				})}
// // // 			</div>

// // // 			{/*---== Featured Posts Grid ===---*/}
// // // 			{!activeCategory && (
// // // 				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
// // // 					{techPost && (
// // // 						// <div className='md:col-span-4 md:row-span-2'>
// // // 						<div className='md:col-span-2 lg:col-span-2 lg:col-start-1'>
// // // 							<FeaturedCard
// // // 								post={techPost}
// // // 								category={categories[0]}
// // // 								size='full'
// // // 								// size='large'
// // // 								title='Featured Tech Article'
// // // 							/>
// // // 						</div>
// // // 					)}
// // // 					{mediaPost && (
// // // 						<div className='md:col-span-2'>
// // // 							<FeaturedCard
// // // 								post={mediaPost}
// // // 								category={categories[1]}
// // // 								size='medium'
// // // 								title='Latest Media'
// // // 							/>
// // // 						</div>
// // // 					)}
// // // 					{foodPost && (
// // // 						<div className='md:col-span-2 lg:col-span-4 lg:col-start-1'>
// // // 							<FeaturedCard
// // // 								post={foodPost}
// // // 								category={categories[2]}
// // // 								size='full'
// // // 								title='Latest Recipe'
// // // 							/>
// // // 						</div>
// // // 					)}
// // // 				</div>
// // // 			)}

// // // 			{/*---== Regular Posts Grid ===---*/}
// // // 			<div>
// // // 				{/*-== Category title ==-*/}
// // // 				<h2 className='text-2xl font-bold mb-2'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
// // // 				{/*-== Category description ==-*/}
// // // 				{activeCategory && <p className='text-gray-400 text-lg mt-0 mb-20'>{categories.find((c) => c.id === activeCategory)?.description}</p>}
// // // 				{/*-== Category all posts ==-*/}
// // // 				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
// // // 					{(activeCategory ? posts.filter((post) => post.category === activeCategory) : remainingPosts).map((post) => (
// // // 						<Link
// // // 							key={post.id}
// // // 							href={`/blog/${post.slug}`}
// // // 							/*-= Individual post container template style =-*/
// // // 							className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
// // // 						>
// // // 							<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
// // // 								{post.cover_image && (
// // // 									<Image
// // // 										src={post.cover_image}
// // // 										alt={post.title}
// // // 										fill
// // // 										className='object-cover'
// // // 										sizes='(max-width: 768px) 100vw, 25vw'
// // // 									/>
// // // 								)}
// // // 							</div>
// // // 							<div className='p-4'>
// // // 								<div className='flex justify-between items-center mb-2'>
// // // 									<span className={`text-sm ${categories.find((c) => c.id === post.category)?.textColor}`}>{categories.find((c) => c.id === post.category)?.name}</span>
// // // 									<span className='text-sm text-gray-400'>{post.date}</span>
// // // 								</div>
// // // 								<h3 className='text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors'>{post.title}</h3>
// // // 								<p className='text-gray-300 text-sm line-clamp-2'>{post.excerpt}</p>
// // // 							</div>
// // // 						</Link>
// // // 					))}
// // // 				</div>
// // // 			</div>
// // // 		</div>
// // // 	);
// // // }

```

# src/components/BlogPostContent-Old.tsx

```tsx
// components/BlogPostContent.tsx
import dynamic from "next/dynamic";
import { MarkdownRenderer } from "./blog/MarkdownRenderer";
import type { Post } from "@/types/blog";

export default function BlogPostContent({ post }: { post: Post }) {
	const { title, category, cover_image, excerpt, created_at } = post;

	return (
		<div className='max-w-page mx-auto px-4'>
			{/* Common header section */}
			<header>
				<h1>{title}</h1>
				<div className='meta'>{/* ... meta info ... */}</div>
			</header>

			{/* Conditional content rendering */}
			{post.type === "markdown" ? (
				<MarkdownRenderer content={post.content} />
			) : (
				<DynamicComponentRenderer
					componentName={post.component_name}
					props={post.props}
				/>
			)}
		</div>
	);
}

// Component renderer with dynamic imports
function DynamicComponentRenderer({ componentName, props = {} }: { componentName: string; props?: Record<string, unknown> }) {
	const Component = dynamic(() => import(`@/components/blog-components/${componentName}`), {
		loading: () => <div>Loading component...</div>,
	});

	return <Component {...props} />;
}

// // src/components/BlogPostContent.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import ReactMarkdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import rehypePrism from "rehype-prism-plus";
// import { Reactions } from "@/components/Reactions";
// import { Comments } from "@/components/Comments";
// import { useAuth } from "@/hooks/useAuth";
// import { DeletePost } from "./DeletePost";
// // import 'highlight.js/styles/github-dark.css';
// // import 'highlight.js/styles/monokai-sublime.css'
// // import 'highlight.js/styles/tokyo-night-dark.css'
// import "highlight.js/styles/base16/material-darker.css";
// import rehypeRaw from "rehype-raw";
// import rehypeSanitize from "rehype-sanitize";
// import remarkGfm from "remark-gfm";
// // import 'highlight.js/styles/base16/tomorrow-night.css'

// /*-= Restrict which HTML tags & attributes are allowed =-*/
// const ALLOWED_TAGS = ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em", "code", "pre", "table", "thead", "tbody", "tr", "th", "td", "blockquote", "hr", "br", "a", "img"];

// const ALLOWED_ATTRIBUTES = {
// 	a: ["href", "title", "target", "rel"],
// 	img: ["src", "alt", "title", "width", "height", "loading"],
// 	div: ["class", "style"],
// 	span: ["class", "style"],
// 	code: ["class", "language"],
// };

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

// 	const formatDate = (date: string) => {
// 		return new Date(date).toLocaleDateString("en-US", {
// 			month: "long",
// 			day: "numeric",
// 			year: "numeric",
// 		});
// 	};

// 	return (
// 		// <div className='max-w-screen-2xl mx-auto px-4'>
// 		<div className='max-w-page mx-auto px-4'>
// 			{/* Header Section */}
// 			<div className='flex justify-between items-center mb-8'>
// 				<Link
// 					href='/blog'
// 					className='text-primary-400 hover:text-primary-300'
// 				>
// 					← Back to posts
// 				</Link>
// 				{/* {isAuthenticated && (
// 					<div className='space-x-4'>
// 						<Link
// 							href={`/blog/edit/${post.slug}`}
// 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// 						>
// 							Edit Post
// 						</Link>
// 						<DeletePost postId={post.id} />
// 					</div>
// 				)} */}
// 			</div>

// 			{/* Main Content Grid */}
// 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// 				{/* Left Column - Article Content */}
// 				<article className='relative'>
// 					{post.cover_image && (
// 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// 							<Image
// 								src={post.cover_image}
// 								alt='Cover image'
// 								fill
// 								className='object-cover'
// 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// 								priority
// 							/>
// 						</div>
// 					)}

// 					{/* Content */}
// 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

// 						{/* Author Info */}
// 						<div className='flex items-start gap-4 mb-8'>
// 							<Image
// 								src='/assets/LittleLloyd-FB.jpg'
// 								alt='R.Lloyd Gonzales'
// 								width={56}
// 								height={56}
// 								className='border border-gray-500 rounded-full'
// 							/>
// 							<div>
// 								<h3 className='text-lg font-semibold text-gray-600 dark:text-gray-400 mb-0'>Lloyd</h3>
// 								<p className='text-gray-600 dark:text-gray-400 text-sm mb-0 m-0'>Software Engineer</p>
// 								<time className='text-gray-500 dark:text-gray-500 text-sm mt-0'>{formatDate(post.created_at)}</time>
// 							</div>
// 						</div>

// 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// 						<ReactMarkdown
// 							remarkPlugins={[remarkGfm]}
// 							rehypePlugins={[
// 								rehypePrism,
// 								rehypeRaw,
// 								[
// 									rehypeSanitize,
// 									{
// 										allowedTags: ALLOWED_TAGS,
// 										allowedAttributes: ALLOWED_ATTRIBUTES,
// 									},
// 								],
// 							]}
// 							components={{
// 								// p: ({ children }) => <p className='text-gray-600 mb-4'>{children}</p>,
// 								p: ({ node, children }) => {
// 									if (node?.children[0]?.type === "element" && node.children[0].tagName === "img") {
// 										return <div>{children}</div>;
// 									}
// 									return <p>{children}</p>;
// 								},
// 								h1: ({ children }) => <h1 className='text-4xl font-bold mb-6'>{children}</h1>,
// 								h2: ({ children }) => <h2 className='text-3xl font-bold mb-4'>{children}</h2>,
// 								h3: ({ children }) => <h3 className='text-2xl font-bold mb-3'>{children}</h3>,
// 								h4: ({ children }) => <h4 className='text-xl font-bold mb-2'>{children}</h4>,

// 								ul: ({ children }) => <ul className='list-disc pl-6 mb-4 text-gray-600'>{children}</ul>,
// 								ol: ({ children }) => <ol className='list-decimal pl-6 mb-4 text-gray-600'>{children}</ol>,
// 								blockquote: ({ children }) => <blockquote className='border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400'>{children}</blockquote>,
// 								img: ({ src, alt, ...props }) => {
// 									if (!src) return null;
// 									const imageSrc = src.startsWith("/") ? src : src.startsWith("http") ? src : `/${src}`;

// 									return (
// 										<div className='relative w-full aspect-[16/9] my-8'>
// 											<Image
// 												src={imageSrc}
// 												alt={alt || ""}
// 												fill
// 												className='object-cover rounded-lg'
// 												sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px'
// 												loading='lazy'
// 												{...props}
// 											/>
// 										</div>
// 									);
// 								},
// 								a: ({ href, children, ...props }) => {
// 									if (!href) return null;
// 									const isExternal = href.startsWith("http");
// 									return (
// 										<a
// 											href={href}
// 											{...props}
// 											{...(isExternal
// 												? {
// 														target: "_blank",
// 														rel: "noopener noreferrer",
// 												  }
// 												: {})}
// 											className='text-primary-400 hover:text-primary-300 transition-colors'
// 										>
// 											{children}
// 										</a>
// 									);
// 								},
// 								code: ({ node, inline, className, children, ...props }) => {
// 									const match = /language-(\w+)/.exec(className || "");
// 									return !inline && match ? (
// 										<pre className={`language-${match[1]} overflow-x-auto`}>
// 											<code
// 												className={className}
// 												{...props}
// 											>
// 												{children}
// 											</code>
// 										</pre>
// 									) : (
// 										<code
// 											className={className}
// 											{...props}
// 										>
// 											{children}
// 										</code>
// 									);
// 								},
// 								/*---+++++++++++++++++++++++++++++++++++++++++++++++++++++---*/
// 							}}
// 						>
// 							{post.content}
// 						</ReactMarkdown>
// 					</div>

// 					{/* Engagement Bar */}
// 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// 						<Reactions postId={post.id} />
// 					</div>
// 				</article>

// 				{/* Right Column - Comments */}
// 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// 					<Comments postId={post.id} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
// // // src/components/BlogPostContent.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import ReactMarkdown from "react-markdown";
// // import { Reactions } from "@/components/Reactions";
// // import { Comments } from "@/components/Comments";
// // import { useAuth } from "@/hooks/useAuth";
// // import { DeletePost } from "./DeletePost";
// // import Prism from "prismjs";
// // import "prismjs/themes/prism-tomorrow.css";
// // import "prismjs/components/prism-javascript";
// // import "prismjs/components/prism-typescript";
// // import "prismjs/components/prism-css";
// // import "prismjs/components/prism-python";

// // type Post = {
// //     id: string;
// //     title: string;
// //     content: string;
// //     excerpt?: string;
// //     cover_image?: string;
// //     created_at: string;
// //     slug: string;
// //     profiles?: {
// //         username?: string;
// //     };
// // };

// // export default function BlogPostContent({ post }: { post: Post }) {
// //     const { isAuthenticated } = useAuth();

// //     useEffect(() => {
// //         Prism.highlightAll();
// //     }, [post.content]);

// //     return (
// //         <div className='max-w-screen-2xl mx-auto px-4'>
// //             <div className='flex justify-between items-center mb-8'>
// //                 <Link href='/blog' className='text-primary-400 hover:text-primary-300'>
// //                     ← Back to posts
// //                 </Link>
// //                 {isAuthenticated && (
// //                     <div className='space-x-4'>
// //                         <Link href={`/blog/edit/${post.slug}`} className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'>
// //                             Edit Post
// //                         </Link>
// //                         <DeletePost postId={post.id} />
// //                     </div>
// //                 )}
// //             </div>

// //             <div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// //                 <article className='relative'>
// //                     {post.cover_image && (
// //                         <div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// //                             <img src={post.cover_image} alt={post.title} className='w-full h-full object-cover' />
// //                         </div>
// //                     )}

// //                     <div className='prose prose-lg dark:prose-invert max-w-none'>
// //                         <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// //                         <div className='text-gray-400 mb-8'>
// //                             {new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// //                         </div>

// //                         {post.excerpt &&
// //                             <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>
// //                                 {post.excerpt}
// //                             </p>
// //                         }

// //                         <ReactMarkdown
// //                             components={{
// //                                 code({node, inline, className, children, ...props}) {
// //                                     const match = /language-(\w+)/.exec(className || '');
// //                                     const language = match ? match[1] : '';

// //                                     if (!inline && language) {
// //                                         return (
// //                                             <pre className={`language-${language}`}>
// //                                                 <code className={`language-${language}`} {...props}>
// //                                                     {String(children).replace(/\n$/, '')}
// //                                                 </code>
// //                                             </pre>
// //                                         );
// //                                     }

// //                                     return (
// //                                         <code className={className} {...props}>
// //                                             {children}
// //                                         </code>
// //                                     );
// //                                 },
// //                                 p: ({children}) => <p className="text-gray-300 mb-4">{children}</p>,
// //                                 h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
// //                                 h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
// //                                 ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
// //                                 ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
// //                                 blockquote: ({children}) => (
// //                                     <blockquote className="border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400">
// //                                         {children}
// //                                     </blockquote>
// //                                 ),
// //                             }}
// //                         >
// //                             {post.content}
// //                         </ReactMarkdown>
// //                     </div>

// //                     <div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// //                         <Reactions postId={post.id} />
// //                     </div>
// //                 </article>

// //                 <div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// //                     <Comments postId={post.id} />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// // // // src/components/BlogPostContent.tsx
// // // "use client";
// // // import { useState } from "react";
// // // import Link from "next/link";
// // // import ReactMarkdown from "react-markdown";
// // // import { Reactions } from "@/components/Reactions";
// // // import { Comments } from "@/components/Comments";
// // // import { useAuth } from "@/hooks/useAuth";
// // // import { DeletePost } from "./DeletePost";

// // // type Post = {
// // //     id: string;
// // //     title: string;
// // //     content: string;
// // //     excerpt?: string;
// // //     cover_image?: string;
// // //     created_at: string;
// // //     slug: string;
// // //     profiles?: {
// // //         username?: string;
// // //     };
// // // };

// // // export default function BlogPostContent({ post }: { post: Post }) {
// // //     const { isAuthenticated } = useAuth();

// // //     return (
// // //         <div className='max-w-screen-2xl mx-auto px-4'>
// // //             <div className='flex justify-between items-center mb-8'>
// // //                 <Link href='/blog' className='text-primary-400 hover:text-primary-300'>
// // //                     ← Back to posts
// // //                 </Link>
// // //                 {isAuthenticated && (
// // //                     <div className='space-x-4'>
// // //                         <Link href={`/blog/edit/${post.slug}`} className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'>
// // //                             Edit Post
// // //                         </Link>
// // //                         <DeletePost postId={post.id} />
// // //                     </div>
// // //                 )}
// // //             </div>

// // //             <div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // //                 <article className='relative'>
// // //                     {post.cover_image && (
// // //                         <div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // //                             <img src={post.cover_image} alt={post.title} className='w-full h-full object-cover' />
// // //                         </div>
// // //                     )}

// // //                     <div className='prose prose-lg dark:prose-invert max-w-none'>
// // //                         <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // //                         <div className='text-gray-400 mb-8'>
// // //                             {new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // //                         </div>

// // //                         {post.excerpt &&
// // //                             <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>
// // //                                 {post.excerpt}
// // //                             </p>
// // //                         }

// // //                         <ReactMarkdown
// // //                             components={{
// // //                                 code({node, inline, className, children, ...props}) {
// // //                                     return (
// // //                                         <code className="block bg-gray-800 rounded-md p-4 text-gray-100 my-4" {...props}>
// // //                                             {children}
// // //                                         </code>
// // //                                     );
// // //                                 },
// // //                                 p: ({children}) => <p className="text-gray-300 mb-4">{children}</p>,
// // //                                 h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
// // //                                 h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
// // //                                 ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
// // //                                 ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
// // //                                 blockquote: ({children}) => (
// // //                                     <blockquote className="border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400">
// // //                                         {children}
// // //                                     </blockquote>
// // //                                 ),
// // //                             }}
// // //                         >
// // //                             {post.content}
// // //                         </ReactMarkdown>
// // //                     </div>

// // //                     <div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // //                         <Reactions postId={post.id} />
// // //                     </div>
// // //                 </article>

// // //                 <div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // //                     <Comments postId={post.id} />
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // // // src/components/BlogPostContent.tsx
// // // // "use client";
// // // // import ReactMarkdown from "react-markdown";
// // // // import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// // // // import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

// // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // 	return (
// // // // 		<div className='max-w-4xl mx-auto p-4'>
// // // // 			<h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
// // // // 			<ReactMarkdown
// // // // 				components={{
// // // // 					code({ node, inline, className, children, ...props }) {
// // // // 						const match = /language-(\w+)/.exec(className || "");
// // // // 						return !inline && match ? (
// // // // 							<SyntaxHighlighter
// // // // 								style={atomDark}
// // // // 								language={match[1]}
// // // // 								PreTag='div'
// // // // 								{...props}
// // // // 							>
// // // // 								{String(children).replace(/\n$/, "")}
// // // // 							</SyntaxHighlighter>
// // // // 						) : (
// // // // 							<code
// // // // 								className={className}
// // // // 								{...props}
// // // // 							>
// // // // 								{children}
// // // // 							</code>
// // // // 						);
// // // // 					},
// // // // 				}}
// // // // 			>
// // // // 				{post.content}
// // // // 			</ReactMarkdown>
// // // // 		</div>
// // // // 	);
// // // // }
// // // // // // src/components/BlogPostContent.tsx
// // // // // "use client";
// // // // // import ReactMarkdown from "react-markdown";

// // // // // type Post = {
// // // // // 	id: string;
// // // // // 	title: string;
// // // // // 	content: string;
// // // // // 	excerpt?: string;
// // // // // 	cover_image?: string;
// // // // // 	created_at: string;
// // // // // 	slug: string;
// // // // // 	profiles?: {
// // // // // 		username?: string;
// // // // // 	};
// // // // // };

// // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // 	// Debug: Log the content to verify what we're receiving
// // // // // 	console.log("Content being passed to ReactMarkdown:", post.content);

// // // // // 	return (
// // // // // 		<div className='max-w-4xl mx-auto p-4'>
// // // // // 			<h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
// // // // // 			<ReactMarkdown>{post.content}</ReactMarkdown>
// // // // // 		</div>
// // // // // 	);
// // // // // }
// // // // // // // src/components/BlogPostContent.tsx
// // // // // // "use client";
// // // // // // import { useState } from "react";
// // // // // // import Link from "next/link";
// // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // import { Comments } from "@/components/Comments";
// // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // import { DeletePost } from "./DeletePost";
// // // // // // import ReactMarkdown from "react-markdown";
// // // // // // import remarkGfm from "remark-gfm";

// // // // // // type Post = {
// // // // // // 	id: string;
// // // // // // 	title: string;
// // // // // // 	content: string;
// // // // // // 	excerpt?: string;
// // // // // // 	cover_image?: string;
// // // // // // 	created_at: string;
// // // // // // 	slug: string;
// // // // // // 	profiles?: {
// // // // // // 		username?: string;
// // // // // // 	};
// // // // // // };

// // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // 	return (
// // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // 			{/* Header Section */}
// // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // 				<Link
// // // // // // 					href='/blog'
// // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // 				>
// // // // // // 					← Back to posts
// // // // // // 				</Link>
// // // // // // 				{isAuthenticated && (
// // // // // // 					<div className='space-x-4'>
// // // // // // 						<Link
// // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // 						>
// // // // // // 							Edit Post
// // // // // // 						</Link>
// // // // // // 						<DeletePost postId={post.id} />
// // // // // // 					</div>
// // // // // // 				)}
// // // // // // 			</div>

// // // // // // 			{/* Main Content Grid */}
// // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // 				{/* Left Column - Article Content */}
// // // // // // 				<article className='relative'>
// // // // // // 					{post.cover_image && (
// // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // 							<img
// // // // // // 								src={post.cover_image}
// // // // // // 								alt={post.title}
// // // // // // 								className='w-full h-full object-cover'
// // // // // // 							/>
// // // // // // 						</div>
// // // // // // 					)}

// // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // 						</div>

// // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // 						<div className='mt-8'>
// // // // // // 							<ReactMarkdown
// // // // // // 								remarkPlugins={[remarkGfm]}
// // // // // // 								className='prose dark:prose-invert'
// // // // // // 							>
// // // // // // 								{post.content}
// // // // // // 							</ReactMarkdown>
// // // // // // 						</div>
// // // // // // 					</div>

// // // // // // 					{/* Engagement Bar */}
// // // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // 						<Reactions postId={post.id} />
// // // // // // 					</div>
// // // // // // 				</article>

// // // // // // 				{/* Right Column - Comments */}
// // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // 					<Comments postId={post.id} />
// // // // // // 				</div>
// // // // // // 			</div>
// // // // // // 		</div>
// // // // // // 	);
// // // // // // }
// // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // "use client";
// // // // // // // import { useState } from "react";
// // // // // // // import Link from "next/link";
// // // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // import { DeletePost } from "./DeletePost";

// // // // // // // type Post = {
// // // // // // // 	id: string;
// // // // // // // 	title: string;
// // // // // // // 	content: string;
// // // // // // // 	excerpt?: string;
// // // // // // // 	cover_image?: string;
// // // // // // // 	created_at: string;
// // // // // // // 	slug: string;
// // // // // // // 	profiles?: {
// // // // // // // 		username?: string;
// // // // // // // 	};
// // // // // // // };

// // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // // 	return (
// // // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // 			{/* Header Section */}
// // // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // // 				<Link
// // // // // // // 					href='/blog'
// // // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // // 				>
// // // // // // // 					← Back to posts
// // // // // // // 				</Link>
// // // // // // // 				{isAuthenticated && (
// // // // // // // 					<div className='space-x-4'>
// // // // // // // 						<Link
// // // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // // 						>
// // // // // // // 							Edit Post
// // // // // // // 						</Link>
// // // // // // // 						<DeletePost postId={post.id} />
// // // // // // // 					</div>
// // // // // // // 				)}
// // // // // // // 			</div>

// // // // // // // 			{/* Main Content Grid */}
// // // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // 				{/* Left Column - Article Content */}
// // // // // // // 				<article className='relative'>
// // // // // // // 					{post.cover_image && (
// // // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // 							<img
// // // // // // // 								src={post.cover_image}
// // // // // // // 								alt={post.title}
// // // // // // // 								className='w-full h-full object-cover'
// // // // // // // 							/>
// // // // // // // 						</div>
// // // // // // // 					)}
// // // // // // // 					{/* Content */}
// // // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // 						<h1 className='postTitle text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // 						</div>

// // // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // // 						<div className='mt-8 content'>
// // // // // // // 							<img
// // // // // // // 								src={post.content.match(/!\[.*?\]\((.*?)\)/)?.[1]}
// // // // // // // 								alt={post.content.match(/!\[(.*?)\]/)?.[1] || ""}
// // // // // // // 								className='w-full h-auto rounded-lg my-4'
// // // // // // // 							/>
// // // // // // // 							{post.content.replace(/!\[.*?\]\(.*?\)/g, "")}
// // // // // // // 						</div>
// // // // // // // 					</div>

// // // // // // // 					{/* Engagement Bar */}
// // // // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // 						<Reactions postId={post.id} />
// // // // // // // 					</div>
// // // // // // // 				</article>

// // // // // // // 				{/* Right Column - Comments */}
// // // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // 					<Comments postId={post.id} />
// // // // // // // 				</div>
// // // // // // // 			</div>
// // // // // // // 		</div>
// // // // // // // 	);
// // // // // // // }

// // // // // // // // "use client";
// // // // // // // // import { useState } from "react";
// // // // // // // // import Link from "next/link";
// // // // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // // import { DeletePost } from "./DeletePost";

// // // // // // // // type Post = {
// // // // // // // // 	id: string;
// // // // // // // // 	title: string;
// // // // // // // // 	content: string;
// // // // // // // // 	excerpt?: string;
// // // // // // // // 	cover_image?: string;
// // // // // // // // 	created_at: string;
// // // // // // // // 	slug: string;
// // // // // // // // 	profiles?: {
// // // // // // // // 		username?: string;
// // // // // // // // 	};
// // // // // // // // };

// // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // // // 	return (
// // // // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // // 			{/* Header Section */}
// // // // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // // // 				<Link
// // // // // // // // 					href='/blog'
// // // // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // // // 				>
// // // // // // // // 					← Back to posts
// // // // // // // // 				</Link>
// // // // // // // // 				{isAuthenticated && (
// // // // // // // // 					<div className='space-x-4'>
// // // // // // // // 						<Link
// // // // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // // // 						>
// // // // // // // // 							Edit Post
// // // // // // // // 						</Link>
// // // // // // // // 						<DeletePost postId={post.id} />
// // // // // // // // 					</div>
// // // // // // // // 				)}
// // // // // // // // 			</div>

// // // // // // // // 			{/* Main Content Grid */}
// // // // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // // 				{/* Left Column - Article Content */}
// // // // // // // // 				<article className='relative'>
// // // // // // // // 					{post.cover_image && (
// // // // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // // 							<ImageWithFallback
// // // // // // // // 								src={post.cover_image}
// // // // // // // // 								alt={post.title}
// // // // // // // // 								className='w-full h-full object-cover'
// // // // // // // // 								priority
// // // // // // // // 							/>
// // // // // // // // 						</div>
// // // // // // // // 					)}
// // // // // // // // 					{/* Content */}
// // // // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // // 						</div>

// // // // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // // // 						<div className='mt-8'>{post.content}</div>

// // // // // // // // 						{/* Engagement Bar */}
// // // // // // // // 						<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // // 							<Reactions postId={post.id} />
// // // // // // // // 						</div>
// // // // // // // // 					</div>
// // // // // // // // 				</article>

// // // // // // // // 				{/* Right Column - Comments */}
// // // // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // // 					<Comments postId={post.id} />
// // // // // // // // 				</div>
// // // // // // // // 			</div>
// // // // // // // // 		</div>
// // // // // // // // 	);
// // // // // // // // }
// // // src/components/BlogPostContent.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { Reactions } from "@/components/Reactions";
// // import { Comments } from "@/components/Comments";
// // import ReactMarkdown from "react-markdown";
// // import remarkGfm from "remark-gfm";
// // import { MarkdownContent } from "./MarkdownContent";

// // type Post = {
// // 	id: string;
// // 	title: string;
// // 	content: string;
// // 	excerpt?: string;
// // 	cover_image?: string;
// // 	created_at: string;
// // 	slug: string;
// // 	profiles?: {
// // 		username?: string;
// // 	};
// // };

// // export default function BlogPostContent({ post }: { post: Post }) {
// // 	const formatDate = (date: string) => {
// // 		return new Date(date).toLocaleDateString("en-US", {
// // 			month: "long",
// // 			day: "numeric",
// // 			year: "numeric",
// // 		});
// // 	};

// // 	return (
// // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // 			{/* Header Section */}
// // 			<div className='flex justify-between items-center mb-8'>
// // 				<Link
// // 					href='/blog'
// // 					className='text-primary-400 hover:text-primary-300'
// // 				>
// // 					← Back to posts
// // 				</Link>
// // 			</div>

// // 			{/* Main Content Grid */}
// // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // 				{/* Left Column - Article Content */}
// // 				<article className='relative'>
// // 					{post.cover_image && (
// // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // 							<Image
// // 								src={post.cover_image}
// // 								alt='Cover image'
// // 								fill
// // 								className='object-cover'
// // 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // 								priority
// // 							/>
// // 						</div>
// // 					)}

// // 					{/* Author Info */}
// // 					<div className='flex items-start gap-4 mb-8'>
// // 						<Image
// // 							src='/assets/MashMediaStudio.png'
// // 							alt='R.Lloyd Gonzales'
// // 							width={56}
// // 							height={56}
// // 							className='rounded-full'
// // 							priority
// // 						/>
// // 						<div>
// // 							<h3 className='text-lg font-semibold mb-1'>R.Lloyd Gonzales</h3>
// // 							<p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Software Engineer</p>
// // 							<time className='text-gray-500 dark:text-gray-500 text-sm'>{formatDate(post.created_at)}</time>
// // 						</div>
// // 					</div>

// // 					{/* Content */}
// // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

// // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // 						<div className='mt-8'>
// // 							<MarkdownContent content={post.content} />
// // 						</div>
// // 					</div>

// // 					{/* Engagement Bar */}
// // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // 						<Reactions postId={post.id} />
// // 					</div>
// // 				</article>

// // 				{/* Right Column - Comments */}
// // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // 					<Comments postId={post.id} />
// // 				</div>
// // 			</div>
// // 		</div>
// // 	);
// // }
// // // "use client";
// // // // import { useState } from "react"
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { Reactions } from "@/components/Reactions";
// // // import { Comments } from "@/components/Comments";
// // // import ReactMarkdown from "react-markdown";
// // // import remarkGfm from "remark-gfm";
// // // import rehypePrism from "rehype-prism-plus";
// // // import "prismjs/themes/prism-tomorrow.css";
// // // import "prismjs/components/prism-typescript";
// // // import "prismjs/components/prism-javascript";
// // // import "prismjs/components/prism-css";
// // // import "prismjs/components/prism-bash";
// // // import "prismjs/components/prism-json";
// // // import "prismjs/components/prism-markdown";

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
// // // 	const formatDate = (date: string) => {
// // // 		return new Date(date).toLocaleDateString("en-US", {
// // // 			month: "long",
// // // 			day: "numeric",
// // // 			year: "numeric",
// // // 		});
// // // 	};

// // // 	return (
// // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // 			{/* Header Section */}
// // // 			<div className='flex justify-between items-center mb-8'>
// // // 				<Link
// // // 					href='/blog'
// // // 					className='text-primary-400 hover:text-primary-300'
// // // 				>
// // // 					← Back to posts
// // // 				</Link>
// // // 			</div>

// // // 			{/* Main Content Grid */}
// // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // 				{/* Left Column - Article Content */}
// // // 				<article className='relative'>
// // // 					{post.cover_image && (
// // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // 							<Image
// // // 								src={post.cover_image}
// // // 								alt='Cover image'
// // // 								fill
// // // 								className='object-cover'
// // // 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // 								priority
// // // 							/>
// // // 						</div>
// // // 					)}

// // // 					{/* Author Info */}
// // // 					<div className='flex items-start gap-4 mb-8'>
// // // 						<Image
// // // 							src='/assets/MashMediaStudio.png'
// // // 							alt='R.Lloyd Gonzales'
// // // 							width={56}
// // // 							height={56}
// // // 							className='rounded-full'
// // // 							priority
// // // 						/>
// // // 						<div>
// // // 							<h3 className='text-lg font-semibold mb-1'>R.Lloyd Gonzales</h3>
// // // 							<p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Software Engineer</p>
// // // 							<time className='text-gray-500 dark:text-gray-500 text-sm'>{formatDate(post.created_at)}</time>
// // // 						</div>
// // // 					</div>

// // // 					{/* Content */}
// // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

// // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // 						<div className='mt-8'>
// // // 							<ReactMarkdown
// // // 								remarkPlugins={[remarkGfm]}
// // // 								rehypePlugins={[rehypePrism]}
// // // 								components={{
// // // 									p: ({ children }) => {
// // // 										if (typeof children === "object" && children && "type" in children && children.type === "img") {
// // // 											return <>{children}</>;
// // // 										}
// // // 										return <p>{children}</p>;
// // // 									},
// // // 									img: ({ src, alt }) => {
// // // 										if (!src) return null;
// // // 										return (
// // // 											<div className='relative w-full aspect-video mb-4'>
// // // 												<Image
// // // 													src={src}
// // // 													alt={alt || ""}
// // // 													fill
// // // 													className='rounded-lg object-cover'
// // // 													sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // 												/>
// // // 											</div>
// // // 										);
// // // 									},
// // // 								}}
// // // 							>
// // // 								{post.content}
// // // 							</ReactMarkdown>
// // // 						</div>
// // // 					</div>

// // // 					{/* Engagement Bar */}
// // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // 						<Reactions postId={post.id} />
// // // 					</div>
// // // 				</article>

// // // 				{/* Right Column - Comments */}
// // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // 					<Comments postId={post.id} />
// // // 				</div>
// // // 			</div>
// // // 		</div>
// // // 	);
// // // }
// // // // "use client";
// // // // // import { useState } from "react";
// // // // import Link from "next/link";
// // // // import Image from "next/image";
// // // // import { Reactions } from "@/components/Reactions";
// // // // import { Comments } from "@/components/Comments";
// // // // import ReactMarkdown from "react-markdown";
// // // // import remarkGfm from "remark-gfm";

// // // // import rehypePrism from "rehype-prism-plus";
// // // // import rehypeHighlight from "rehype-highlight";

// // // // import "prismjs/themes/prism-tomorrow.css";

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

// // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // 	const formatDate = (date: string) => {
// // // // 		return new Date(date).toLocaleDateString("en-US", {
// // // // 			month: "long",
// // // // 			day: "numeric",
// // // // 			year: "numeric",
// // // // 		});
// // // // 	};

// // // // 	return (
// // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // 			{/* Header Section */}
// // // // 			<div className='flex justify-between items-center mb-8'>
// // // // 				<Link
// // // // 					href='/blog'
// // // // 					className='text-primary-400 hover:text-primary-300'
// // // // 				>
// // // // 					← Back to posts
// // // // 				</Link>
// // // // 			</div>

// // // // 			{/* Main Content Grid */}
// // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // 				{/* Left Column - Article Content */}
// // // // 				<article className='relative'>
// // // // 					{post.cover_image && (
// // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // 							<Image
// // // // 								src={post.cover_image}
// // // // 								alt='Cover image'
// // // // 								fill
// // // // 								className='object-cover'
// // // // 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // // 								priority
// // // // 							/>
// // // // 						</div>
// // // // 					)}

// // // // 					{/* Author Info */}
// // // // 					<div className='flex items-start gap-4 mb-8'>
// // // // 						<Image
// // // // 							src='/assets/MashMediaStudio.png'
// // // // 							alt='R.Lloyd Gonzales'
// // // // 							width={56}
// // // // 							height={56}
// // // // 							className='rounded-full'
// // // // 							priority
// // // // 						/>
// // // // 						<div>
// // // // 							<h3 className='text-lg font-semibold mb-1'>R.Lloyd Gonzales</h3>
// // // // 							<p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Software Engineer</p>
// // // // 							<time className='text-gray-500 dark:text-gray-500 text-sm'>{formatDate(post.created_at)}</time>
// // // // 						</div>
// // // // 					</div>

// // // // 					{/* Content */}
// // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

// // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // 						<div className='mt-8'>
// // // // 							<ReactMarkdown
// // // // 								remarkPlugins={[remarkGfm]}
// // // // 								rehypePlugins={[rehypeHighlight]}
// // // // 								components={{
// // // // 									p: ({ children }) => <p className='text-gray-300 mb-4'>{children}</p>,
// // // // 									h2: ({ children }) => <h2 className='text-2xl font-bold mt-8 mb-4'>{children}</h2>,
// // // // 									h3: ({ children }) => <h3 className='text-xl font-bold mt-6 mb-3'>{children}</h3>,
// // // // 									ul: ({ children }) => <ul className='list-disc pl-6 mb-4 text-gray-300'>{children}</ul>,
// // // // 									ol: ({ children }) => <ol className='list-decimal pl-6 mb-4 text-gray-300'>{children}</ol>,
// // // // 									blockquote: ({ children }) => <blockquote className='border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400'>{children}</blockquote>,
// // // // 									img: ({ src, alt, ...props }) => {
// // // // 										if (!src) return null;
// // // // 										return (
// // // // 											<div className='relative w-full aspect-video mb-4'>
// // // // 												<Image
// // // // 													src={src}
// // // // 													alt={alt || ""}
// // // // 													fill
// // // // 													className='rounded-lg object-cover'
// // // // 													sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // // 												/>
// // // // 											</div>
// // // // 										);
// // // // 									},
// // // // 									code: ({ inline, className, children, ...props }) => {
// // // // 										const match = /language-(\w+)/.exec(className || "");
// // // // 										const language = match ? match[1] : "";

// // // // 										if (!inline && language) {
// // // // 											return (
// // // // 												<pre className={`language-${language}`}>
// // // // 													<code
// // // // 														className={`language-${language}`}
// // // // 														{...props}
// // // // 													>
// // // // 														{String(children).replace(/\n$/, "")}
// // // // 													</code>
// // // // 												</pre>
// // // // 											);
// // // // 										}

// // // // 										return (
// // // // 											<code
// // // // 												className={className}
// // // // 												{...props}
// // // // 											>
// // // // 												{children}
// // // // 											</code>
// // // // 										);
// // // // 									},
// // // // 								}}
// // // // 							>
// // // // 								{post.content}
// // // // 							</ReactMarkdown>
// // // // 						</div>
// // // // 					</div>

// // // // 					{/* Engagement Bar */}
// // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // 						<Reactions postId={post.id} />
// // // // 					</div>
// // // // 				</article>

// // // // 				{/* Right Column - Comments */}
// // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // 					<Comments postId={post.id} />
// // // // 				</div>
// // // // 			</div>
// // // // 		</div>
// // // // 	);
// // // // }

// // // // // // src/components/BlogPostContent.tsx
// // // // // "use client";
// // // // // import Link from "next/link";
// // // // // import Image from "next/image";
// // // // // import { Reactions } from "@/components/Reactions";
// // // // // import { Comments } from "@/components/Comments";
// // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // import ReactMarkdown from "react-markdown";
// // // // // import remarkGfm from "remark-gfm";
// // // // // import rehypePrism from "rehype-prism-plus";
// // // // // // import Link from "next/link";
// // // // // // import Image from "next/image";
// // // // // // import ReactMarkdown from "react-markdown";
// // // // // import rehypeHighlight from "rehype-highlight";
// // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // import { Comments } from "@/components/Comments";
// // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // import { DeletePost } from "./DeletePost";
// // // // // // import 'highlight.js/styles/github-dark.css';
// // // // // // import 'highlight.js/styles/monokai-sublime.css'
// // // // // // import 'highlight.js/styles/tokyo-night-dark.css'
// // // // // import "highlight.js/styles/base16/material-darker.css";
// // // // // // import 'highlight.js/styles/base16/tomorrow-night.css'

// // // // // type Post = {
// // // // // 	id: string;
// // // // // 	title: string;
// // // // // 	content: string;
// // // // // 	excerpt?: string;
// // // // // 	cover_image?: string;
// // // // // 	created_at: string;
// // // // // 	slug: string;
// // // // // 	profiles?: {
// // // // // 		username?: string;
// // // // // 	};
// // // // // };

// // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // 	const { isAuthenticated } = useAuth();

// // // // // 	const formatDate = (date: string) => {
// // // // // 		return new Date(date).toLocaleDateString("en-US", {
// // // // // 			month: "long",
// // // // // 			day: "numeric",
// // // // // 			year: "numeric",
// // // // // 		});
// // // // // 	};

// // // // // 	return (
// // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // 			{/* Header Section */}
// // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // 				<Link
// // // // // 					href='/blog'
// // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // 				>
// // // // // 					← Back to posts
// // // // // 				</Link>
// // // // // 			</div>

// // // // // 			{/* Main Content Grid */}
// // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // 				{/* Left Column - Article Content */}
// // // // // 				<article className='relative'>
// // // // // 					{post.cover_image && (
// // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // 							<Image
// // // // // 								src={post.cover_image}
// // // // // 								alt='Cover image'
// // // // // 								fill
// // // // // 								className='object-cover'
// // // // // 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // // // 								priority
// // // // // 							/>
// // // // // 						</div>
// // // // // 					)}

// // // // // 					{/* Author Info */}
// // // // // 					<div className='flex items-start gap-4 mb-8'>
// // // // // 						<Image
// // // // // 							src='/assets/MashMediaStudio.png'
// // // // // 							alt='R.Lloyd Gonzales'
// // // // // 							width={56}
// // // // // 							height={56}
// // // // // 							className='rounded-full'
// // // // // 							priority
// // // // // 						/>
// // // // // 						<div>
// // // // // 							<h3 className='text-lg font-semibold mb-1'>R.Lloyd Gonzales</h3>
// // // // // 							<p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>Software Engineer</p>
// // // // // 							<time className='text-gray-500 dark:text-gray-500 text-sm'>{formatDate(post.created_at)}</time>
// // // // // 						</div>
// // // // // 					</div>

// // // // // 					{/* Content */}
// // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

// // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // 						<div className='mt-8'>
// // // // // 							<ReactMarkdown
// // // // // 								remarkPlugins={[remarkGfm]}
// // // // // 								rehypePlugins={[rehypePrism]}
// // // // // 								components={{
// // // // // 									img: ({ node, src, alt, ...props }) => {
// // // // // 										if (!src) return null;
// // // // // 										return (
// // // // // 											<div className='relative w-full aspect-video mb-4'>
// // // // // 												<Image
// // // // // 													src={src}
// // // // // 													alt={alt || ""}
// // // // // 													fill
// // // // // 													className='rounded-lg object-cover'
// // // // // 													sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw'
// // // // // 												/>
// // // // // 											</div>
// // // // // 										);
// // // // // 									},
// // // // // 									code: ({ node, inline, className, children, ...props }) => {
// // // // // 										const match = /language-(\w+)/.exec(className || "");
// // // // // 										const language = match ? match[1] : "";

// // // // // 										if (!inline && language) {
// // // // // 											return (
// // // // // 												<pre className={`language-${language}`}>
// // // // // 													<code
// // // // // 														className={`language-${language}`}
// // // // // 														{...props}
// // // // // 													>
// // // // // 														{String(children).replace(/\n$/, "")}
// // // // // 													</code>
// // // // // 												</pre>
// // // // // 											);
// // // // // 										}

// // // // // 										return (
// // // // // 											<code
// // // // // 												className={className}
// // // // // 												{...props}
// // // // // 											>
// // // // // 												{children}
// // // // // 											</code>
// // // // // 										);
// // // // // 									},
// // // // // 								}}
// // // // // 							>
// // // // // 								{post.content}
// // // // // 							</ReactMarkdown>
// // // // // 						</div>
// // // // // 					</div>

// // // // // 					{/* Engagement Bar */}
// // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // 						<Reactions postId={post.id} />
// // // // // 					</div>
// // // // // 				</article>

// // // // // 				{/* Right Column - Comments */}
// // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // 					<Comments postId={post.id} />
// // // // // 				</div>
// // // // // 			</div>
// // // // // 		</div>
// // // // // 	);
// // // // // }

// // // // // // // src/components/BlogPostContent.tsx
// // // // // // "use client";
// // // // // // import Link from "next/link";
// // // // // // import Image from "next/image";
// // // // // // import ReactMarkdown from "react-markdown";
// // // // // // import rehypeHighlight from "rehype-highlight";
// // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // import { Comments } from "@/components/Comments";
// // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // import { DeletePost } from "./DeletePost";
// // // // // // // import 'highlight.js/styles/github-dark.css';
// // // // // // // import 'highlight.js/styles/monokai-sublime.css'
// // // // // // // import 'highlight.js/styles/tokyo-night-dark.css'
// // // // // // import "highlight.js/styles/base16/material-darker.css";
// // // // // // // import 'highlight.js/styles/base16/tomorrow-night.css'

// // // // // // type Post = {
// // // // // // 	id: string;
// // // // // // 	title: string;
// // // // // // 	content: string;
// // // // // // 	excerpt?: string;
// // // // // // 	cover_image?: string;
// // // // // // 	created_at: string;
// // // // // // 	slug: string;
// // // // // // 	profiles?: {
// // // // // // 		username?: string;
// // // // // // 	};
// // // // // // };

// // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // 	return (
// // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // 				<Link
// // // // // // 					href='/blog'
// // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // 				>
// // // // // // 					← Back to posts
// // // // // // 				</Link>
// // // // // // 				{isAuthenticated && (
// // // // // // 					<div className='space-x-4'>
// // // // // // 						<Link
// // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // 						>
// // // // // // 							Edit Post
// // // // // // 						</Link>
// // // // // // 						<DeletePost postId={post.id} />
// // // // // // 					</div>
// // // // // // 				)}
// // // // // // 			</div>

// // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // 				<article className='relative'>
// // // // // // 					{post.cover_image && (
// // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // 							<Image
// // // // // // 								src={post.cover_image}
// // // // // // 								alt={post.title}
// // // // // // 								fill
// // // // // // 								className='object-cover'
// // // // // // 								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
// // // // // // 								priority
// // // // // // 							/>
// // // // // // 							{/* <img
// // // // // // 								src={post.cover_image}
// // // // // // 								alt={post.title}
// // // // // // 								className='w-full h-full object-cover'
// // // // // // 							/> */}
// // // // // // 						</div>
// // // // // // 					)}

// // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // 						<div className='text-gray-400 mb-8 text-sm'>
// // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // 						</div>

// // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // 						<ReactMarkdown
// // // // // // 							rehypePlugins={[rehypeHighlight]}
// // // // // // 							components={{
// // // // // // 								p: ({ children }) => <p className='text-[1rem] text-gray-600 dark:text-gray-400 mb-4'>{children}</p>,
// // // // // // 								h2: ({ children }) => <h2 className='text-2xl font-bold mt-8 mb-4'>{children}</h2>,
// // // // // // 								h3: ({ children }) => <h3 className='text-xl font-bold mt-6 mb-3'>{children}</h3>,
// // // // // // 								ul: ({ children }) => <ul className='list-disc pl-6 mb-4 text-gray-600 dark:text-gray-400'>{children}</ul>,
// // // // // // 								ol: ({ children }) => <ol className='list-decimal pl-6 mb-4 text-gray-300'>{children}</ol>,
// // // // // // 								blockquote: ({ children }) => <blockquote className='border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400'>{children}</blockquote>,
// // // // // // 								img: ({ src, alt }) => (
// // // // // // 									<div className='relative aspect-[16/9] my-8'>
// // // // // // 										<Image
// // // // // // 											src={src || ""}
// // // // // // 											alt={alt || ""}
// // // // // // 											fill
// // // // // // 											className='object-cover rounded-lg'
// // // // // // 											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
// // // // // // 										/>
// // // // // // 									</div>
// // // // // // 								),
// // // // // // 							}}
// // // // // // 						>
// // // // // // 							{post.content}
// // // // // // 						</ReactMarkdown>
// // // // // // 					</div>

// // // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // 						<Reactions postId={post.id} />
// // // // // // 					</div>
// // // // // // 				</article>

// // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // 					<Comments postId={post.id} />
// // // // // // 				</div>
// // // // // // 			</div>
// // // // // // 		</div>
// // // // // // 	);
// // // // // // }
// // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // "use client";
// // // // // // // import { useState, useEffect } from "react";
// // // // // // // import Link from "next/link";
// // // // // // // import ReactMarkdown from "react-markdown";
// // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // import { DeletePost } from "./DeletePost";
// // // // // // // import Prism from "prismjs";
// // // // // // // import "prismjs/themes/prism-tomorrow.css";
// // // // // // // import "prismjs/components/prism-javascript";
// // // // // // // import "prismjs/components/prism-typescript";
// // // // // // // import "prismjs/components/prism-css";
// // // // // // // import "prismjs/components/prism-python";

// // // // // // // type Post = {
// // // // // // //     id: string;
// // // // // // //     title: string;
// // // // // // //     content: string;
// // // // // // //     excerpt?: string;
// // // // // // //     cover_image?: string;
// // // // // // //     created_at: string;
// // // // // // //     slug: string;
// // // // // // //     profiles?: {
// // // // // // //         username?: string;
// // // // // // //     };
// // // // // // // };

// // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // //     const { isAuthenticated } = useAuth();

// // // // // // //     useEffect(() => {
// // // // // // //         Prism.highlightAll();
// // // // // // //     }, [post.content]);

// // // // // // //     return (
// // // // // // //         <div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // //             <div className='flex justify-between items-center mb-8'>
// // // // // // //                 <Link href='/blog' className='text-primary-400 hover:text-primary-300'>
// // // // // // //                     ← Back to posts
// // // // // // //                 </Link>
// // // // // // //                 {isAuthenticated && (
// // // // // // //                     <div className='space-x-4'>
// // // // // // //                         <Link href={`/blog/edit/${post.slug}`} className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'>
// // // // // // //                             Edit Post
// // // // // // //                         </Link>
// // // // // // //                         <DeletePost postId={post.id} />
// // // // // // //                     </div>
// // // // // // //                 )}
// // // // // // //             </div>

// // // // // // //             <div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // //                 <article className='relative'>
// // // // // // //                     {post.cover_image && (
// // // // // // //                         <div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // //                             <img src={post.cover_image} alt={post.title} className='w-full h-full object-cover' />
// // // // // // //                         </div>
// // // // // // //                     )}

// // // // // // //                     <div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // //                         <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // //                         <div className='text-gray-400 mb-8'>
// // // // // // //                             {new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // //                         </div>

// // // // // // //                         {post.excerpt &&
// // // // // // //                             <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>
// // // // // // //                                 {post.excerpt}
// // // // // // //                             </p>
// // // // // // //                         }

// // // // // // //                         <ReactMarkdown
// // // // // // //                             components={{
// // // // // // //                                 code({node, inline, className, children, ...props}) {
// // // // // // //                                     const match = /language-(\w+)/.exec(className || '');
// // // // // // //                                     const language = match ? match[1] : '';

// // // // // // //                                     if (!inline && language) {
// // // // // // //                                         return (
// // // // // // //                                             <pre className={`language-${language}`}>
// // // // // // //                                                 <code className={`language-${language}`} {...props}>
// // // // // // //                                                     {String(children).replace(/\n$/, '')}
// // // // // // //                                                 </code>
// // // // // // //                                             </pre>
// // // // // // //                                         );
// // // // // // //                                     }

// // // // // // //                                     return (
// // // // // // //                                         <code className={className} {...props}>
// // // // // // //                                             {children}
// // // // // // //                                         </code>
// // // // // // //                                     );
// // // // // // //                                 },
// // // // // // //                                 p: ({children}) => <p className="text-gray-300 mb-4">{children}</p>,
// // // // // // //                                 h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
// // // // // // //                                 h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
// // // // // // //                                 ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
// // // // // // //                                 ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
// // // // // // //                                 blockquote: ({children}) => (
// // // // // // //                                     <blockquote className="border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400">
// // // // // // //                                         {children}
// // // // // // //                                     </blockquote>
// // // // // // //                                 ),
// // // // // // //                             }}
// // // // // // //                         >
// // // // // // //                             {post.content}
// // // // // // //                         </ReactMarkdown>
// // // // // // //                     </div>

// // // // // // //                     <div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // //                         <Reactions postId={post.id} />
// // // // // // //                     </div>
// // // // // // //                 </article>

// // // // // // //                 <div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // //                     <Comments postId={post.id} />
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }
// // // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // // "use client";
// // // // // // // // import { useState } from "react";
// // // // // // // // import Link from "next/link";
// // // // // // // // import ReactMarkdown from "react-markdown";
// // // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // // import { DeletePost } from "./DeletePost";

// // // // // // // // type Post = {
// // // // // // // //     id: string;
// // // // // // // //     title: string;
// // // // // // // //     content: string;
// // // // // // // //     excerpt?: string;
// // // // // // // //     cover_image?: string;
// // // // // // // //     created_at: string;
// // // // // // // //     slug: string;
// // // // // // // //     profiles?: {
// // // // // // // //         username?: string;
// // // // // // // //     };
// // // // // // // // };

// // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // //     const { isAuthenticated } = useAuth();

// // // // // // // //     return (
// // // // // // // //         <div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // //             <div className='flex justify-between items-center mb-8'>
// // // // // // // //                 <Link href='/blog' className='text-primary-400 hover:text-primary-300'>
// // // // // // // //                     ← Back to posts
// // // // // // // //                 </Link>
// // // // // // // //                 {isAuthenticated && (
// // // // // // // //                     <div className='space-x-4'>
// // // // // // // //                         <Link href={`/blog/edit/${post.slug}`} className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'>
// // // // // // // //                             Edit Post
// // // // // // // //                         </Link>
// // // // // // // //                         <DeletePost postId={post.id} />
// // // // // // // //                     </div>
// // // // // // // //                 )}
// // // // // // // //             </div>

// // // // // // // //             <div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // //                 <article className='relative'>
// // // // // // // //                     {post.cover_image && (
// // // // // // // //                         <div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // //                             <img src={post.cover_image} alt={post.title} className='w-full h-full object-cover' />
// // // // // // // //                         </div>
// // // // // // // //                     )}

// // // // // // // //                     <div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // //                         <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // //                         <div className='text-gray-400 mb-8'>
// // // // // // // //                             {new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // //                         </div>

// // // // // // // //                         {post.excerpt &&
// // // // // // // //                             <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>
// // // // // // // //                                 {post.excerpt}
// // // // // // // //                             </p>
// // // // // // // //                         }

// // // // // // // //                         <ReactMarkdown
// // // // // // // //                             components={{
// // // // // // // //                                 code({node, inline, className, children, ...props}) {
// // // // // // // //                                     return (
// // // // // // // //                                         <code className="block bg-gray-800 rounded-md p-4 text-gray-100 my-4" {...props}>
// // // // // // // //                                             {children}
// // // // // // // //                                         </code>
// // // // // // // //                                     );
// // // // // // // //                                 },
// // // // // // // //                                 p: ({children}) => <p className="text-gray-300 mb-4">{children}</p>,
// // // // // // // //                                 h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
// // // // // // // //                                 h3: ({children}) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
// // // // // // // //                                 ul: ({children}) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
// // // // // // // //                                 ol: ({children}) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
// // // // // // // //                                 blockquote: ({children}) => (
// // // // // // // //                                     <blockquote className="border-l-4 border-gray-600 pl-4 my-4 italic text-gray-400">
// // // // // // // //                                         {children}
// // // // // // // //                                     </blockquote>
// // // // // // // //                                 ),
// // // // // // // //                             }}
// // // // // // // //                         >
// // // // // // // //                             {post.content}
// // // // // // // //                         </ReactMarkdown>
// // // // // // // //                     </div>

// // // // // // // //                     <div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // //                         <Reactions postId={post.id} />
// // // // // // // //                     </div>
// // // // // // // //                 </article>

// // // // // // // //                 <div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // //                     <Comments postId={post.id} />
// // // // // // // //                 </div>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // // // "use client";
// // // // // // // // // import ReactMarkdown from "react-markdown";
// // // // // // // // // import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// // // // // // // // // import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// // // // // // // // // type Post = {
// // // // // // // // // 	id: string;
// // // // // // // // // 	title: string;
// // // // // // // // // 	content: string;
// // // // // // // // // 	excerpt?: string;
// // // // // // // // // 	cover_image?: string;
// // // // // // // // // 	created_at: string;
// // // // // // // // // 	slug: string;
// // // // // // // // // 	profiles?: {
// // // // // // // // // 		username?: string;
// // // // // // // // // 	};
// // // // // // // // // };

// // // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // // 	return (
// // // // // // // // // 		<div className='max-w-4xl mx-auto p-4'>
// // // // // // // // // 			<h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // // 			<ReactMarkdown
// // // // // // // // // 				components={{
// // // // // // // // // 					code({ node, inline, className, children, ...props }) {
// // // // // // // // // 						const match = /language-(\w+)/.exec(className || "");
// // // // // // // // // 						return !inline && match ? (
// // // // // // // // // 							<SyntaxHighlighter
// // // // // // // // // 								style={atomDark}
// // // // // // // // // 								language={match[1]}
// // // // // // // // // 								PreTag='div'
// // // // // // // // // 								{...props}
// // // // // // // // // 							>
// // // // // // // // // 								{String(children).replace(/\n$/, "")}
// // // // // // // // // 							</SyntaxHighlighter>
// // // // // // // // // 						) : (
// // // // // // // // // 							<code
// // // // // // // // // 								className={className}
// // // // // // // // // 								{...props}
// // // // // // // // // 							>
// // // // // // // // // 								{children}
// // // // // // // // // 							</code>
// // // // // // // // // 						);
// // // // // // // // // 					},
// // // // // // // // // 				}}
// // // // // // // // // 			>
// // // // // // // // // 				{post.content}
// // // // // // // // // 			</ReactMarkdown>
// // // // // // // // // 		</div>
// // // // // // // // // 	);
// // // // // // // // // }
// // // // // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // // // // "use client";
// // // // // // // // // // import ReactMarkdown from "react-markdown";

// // // // // // // // // // type Post = {
// // // // // // // // // // 	id: string;
// // // // // // // // // // 	title: string;
// // // // // // // // // // 	content: string;
// // // // // // // // // // 	excerpt?: string;
// // // // // // // // // // 	cover_image?: string;
// // // // // // // // // // 	created_at: string;
// // // // // // // // // // 	slug: string;
// // // // // // // // // // 	profiles?: {
// // // // // // // // // // 		username?: string;
// // // // // // // // // // 	};
// // // // // // // // // // };

// // // // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // // // 	// Debug: Log the content to verify what we're receiving
// // // // // // // // // // 	console.log("Content being passed to ReactMarkdown:", post.content);

// // // // // // // // // // 	return (
// // // // // // // // // // 		<div className='max-w-4xl mx-auto p-4'>
// // // // // // // // // // 			<h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // // // 			<ReactMarkdown>{post.content}</ReactMarkdown>
// // // // // // // // // // 		</div>
// // // // // // // // // // 	);
// // // // // // // // // // }
// // // // // // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // // // // // "use client";
// // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // import Link from "next/link";
// // // // // // // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // // // // // import { DeletePost } from "./DeletePost";
// // // // // // // // // // // import ReactMarkdown from "react-markdown";
// // // // // // // // // // // import remarkGfm from "remark-gfm";

// // // // // // // // // // // type Post = {
// // // // // // // // // // // 	id: string;
// // // // // // // // // // // 	title: string;
// // // // // // // // // // // 	content: string;
// // // // // // // // // // // 	excerpt?: string;
// // // // // // // // // // // 	cover_image?: string;
// // // // // // // // // // // 	created_at: string;
// // // // // // // // // // // 	slug: string;
// // // // // // // // // // // 	profiles?: {
// // // // // // // // // // // 		username?: string;
// // // // // // // // // // // 	};
// // // // // // // // // // // };

// // // // // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // // // // // // 	return (
// // // // // // // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // // // // // 			{/* Header Section */}
// // // // // // // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // // // // // // 				<Link
// // // // // // // // // // // 					href='/blog'
// // // // // // // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // // // // // // 				>
// // // // // // // // // // // 					← Back to posts
// // // // // // // // // // // 				</Link>
// // // // // // // // // // // 				{isAuthenticated && (
// // // // // // // // // // // 					<div className='space-x-4'>
// // // // // // // // // // // 						<Link
// // // // // // // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // // // // // // 						>
// // // // // // // // // // // 							Edit Post
// // // // // // // // // // // 						</Link>
// // // // // // // // // // // 						<DeletePost postId={post.id} />
// // // // // // // // // // // 					</div>
// // // // // // // // // // // 				)}
// // // // // // // // // // // 			</div>

// // // // // // // // // // // 			{/* Main Content Grid */}
// // // // // // // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // // // // // 				{/* Left Column - Article Content */}
// // // // // // // // // // // 				<article className='relative'>
// // // // // // // // // // // 					{post.cover_image && (
// // // // // // // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // // // // // 							<img
// // // // // // // // // // // 								src={post.cover_image}
// // // // // // // // // // // 								alt={post.title}
// // // // // // // // // // // 								className='w-full h-full object-cover'
// // // // // // // // // // // 							/>
// // // // // // // // // // // 						</div>
// // // // // // // // // // // 					)}

// // // // // // // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // // // // // 						</div>

// // // // // // // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // // // // // // 						<div className='mt-8'>
// // // // // // // // // // // 							<ReactMarkdown
// // // // // // // // // // // 								remarkPlugins={[remarkGfm]}
// // // // // // // // // // // 								className='prose dark:prose-invert'
// // // // // // // // // // // 							>
// // // // // // // // // // // 								{post.content}
// // // // // // // // // // // 							</ReactMarkdown>
// // // // // // // // // // // 						</div>
// // // // // // // // // // // 					</div>

// // // // // // // // // // // 					{/* Engagement Bar */}
// // // // // // // // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // // // // // 						<Reactions postId={post.id} />
// // // // // // // // // // // 					</div>
// // // // // // // // // // // 				</article>

// // // // // // // // // // // 				{/* Right Column - Comments */}
// // // // // // // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // // // // // 					<Comments postId={post.id} />
// // // // // // // // // // // 				</div>
// // // // // // // // // // // 			</div>
// // // // // // // // // // // 		</div>
// // // // // // // // // // // 	);
// // // // // // // // // // // }
// // // // // // // // // // // // // src/components/BlogPostContent.tsx
// // // // // // // // // // // // "use client";
// // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // import Link from "next/link";
// // // // // // // // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // // // // // // import { DeletePost } from "./DeletePost";

// // // // // // // // // // // // type Post = {
// // // // // // // // // // // // 	id: string;
// // // // // // // // // // // // 	title: string;
// // // // // // // // // // // // 	content: string;
// // // // // // // // // // // // 	excerpt?: string;
// // // // // // // // // // // // 	cover_image?: string;
// // // // // // // // // // // // 	created_at: string;
// // // // // // // // // // // // 	slug: string;
// // // // // // // // // // // // 	profiles?: {
// // // // // // // // // // // // 		username?: string;
// // // // // // // // // // // // 	};
// // // // // // // // // // // // };

// // // // // // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // // // // // // // 	return (
// // // // // // // // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // // // // // // 			{/* Header Section */}
// // // // // // // // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // // // // // // // 				<Link
// // // // // // // // // // // // 					href='/blog'
// // // // // // // // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // // // // // // // 				>
// // // // // // // // // // // // 					← Back to posts
// // // // // // // // // // // // 				</Link>
// // // // // // // // // // // // 				{isAuthenticated && (
// // // // // // // // // // // // 					<div className='space-x-4'>
// // // // // // // // // // // // 						<Link
// // // // // // // // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // // // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // // // // // // // 						>
// // // // // // // // // // // // 							Edit Post
// // // // // // // // // // // // 						</Link>
// // // // // // // // // // // // 						<DeletePost postId={post.id} />
// // // // // // // // // // // // 					</div>
// // // // // // // // // // // // 				)}
// // // // // // // // // // // // 			</div>

// // // // // // // // // // // // 			{/* Main Content Grid */}
// // // // // // // // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // // // // // // 				{/* Left Column - Article Content */}
// // // // // // // // // // // // 				<article className='relative'>
// // // // // // // // // // // // 					{post.cover_image && (
// // // // // // // // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // // // // // // 							<img
// // // // // // // // // // // // 								src={post.cover_image}
// // // // // // // // // // // // 								alt={post.title}
// // // // // // // // // // // // 								className='w-full h-full object-cover'
// // // // // // // // // // // // 							/>
// // // // // // // // // // // // 						</div>
// // // // // // // // // // // // 					)}
// // // // // // // // // // // // 					{/* Content */}
// // // // // // // // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // // // // // // 						<h1 className='postTitle text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // // // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // // // // // // 						</div>

// // // // // // // // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // // // // // // // 						<div className='mt-8 content'>
// // // // // // // // // // // // 							<img
// // // // // // // // // // // // 								src={post.content.match(/!\[.*?\]\((.*?)\)/)?.[1]}
// // // // // // // // // // // // 								alt={post.content.match(/!\[(.*?)\]/)?.[1] || ""}
// // // // // // // // // // // // 								className='w-full h-auto rounded-lg my-4'
// // // // // // // // // // // // 							/>
// // // // // // // // // // // // 							{post.content.replace(/!\[.*?\]\(.*?\)/g, "")}
// // // // // // // // // // // // 						</div>
// // // // // // // // // // // // 					</div>

// // // // // // // // // // // // 					{/* Engagement Bar */}
// // // // // // // // // // // // 					<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // // // // // // 						<Reactions postId={post.id} />
// // // // // // // // // // // // 					</div>
// // // // // // // // // // // // 				</article>

// // // // // // // // // // // // 				{/* Right Column - Comments */}
// // // // // // // // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // // // // // // 					<Comments postId={post.id} />
// // // // // // // // // // // // 				</div>
// // // // // // // // // // // // 			</div>
// // // // // // // // // // // // 		</div>
// // // // // // // // // // // // 	);
// // // // // // // // // // // // }

// // // // // // // // // // // // // "use client";
// // // // // // // // // // // // // import { useState } from "react";
// // // // // // // // // // // // // import Link from "next/link";
// // // // // // // // // // // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // // // // // // // // // // import { Reactions } from "@/components/Reactions";
// // // // // // // // // // // // // import { Comments } from "@/components/Comments";
// // // // // // // // // // // // // import { useAuth } from "@/hooks/useAuth";
// // // // // // // // // // // // // import { DeletePost } from "./DeletePost";

// // // // // // // // // // // // // type Post = {
// // // // // // // // // // // // // 	id: string;
// // // // // // // // // // // // // 	title: string;
// // // // // // // // // // // // // 	content: string;
// // // // // // // // // // // // // 	excerpt?: string;
// // // // // // // // // // // // // 	cover_image?: string;
// // // // // // // // // // // // // 	created_at: string;
// // // // // // // // // // // // // 	slug: string;
// // // // // // // // // // // // // 	profiles?: {
// // // // // // // // // // // // // 		username?: string;
// // // // // // // // // // // // // 	};
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default function BlogPostContent({ post }: { post: Post }) {
// // // // // // // // // // // // // 	const { isAuthenticated } = useAuth();

// // // // // // // // // // // // // 	return (
// // // // // // // // // // // // // 		<div className='max-w-screen-2xl mx-auto px-4'>
// // // // // // // // // // // // // 			{/* Header Section */}
// // // // // // // // // // // // // 			<div className='flex justify-between items-center mb-8'>
// // // // // // // // // // // // // 				<Link
// // // // // // // // // // // // // 					href='/blog'
// // // // // // // // // // // // // 					className='text-primary-400 hover:text-primary-300'
// // // // // // // // // // // // // 				>
// // // // // // // // // // // // // 					← Back to posts
// // // // // // // // // // // // // 				</Link>
// // // // // // // // // // // // // 				{isAuthenticated && (
// // // // // // // // // // // // // 					<div className='space-x-4'>
// // // // // // // // // // // // // 						<Link
// // // // // // // // // // // // // 							href={`/blog/edit/${post.slug}`}
// // // // // // // // // // // // // 							className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600'
// // // // // // // // // // // // // 						>
// // // // // // // // // // // // // 							Edit Post
// // // // // // // // // // // // // 						</Link>
// // // // // // // // // // // // // 						<DeletePost postId={post.id} />
// // // // // // // // // // // // // 					</div>
// // // // // // // // // // // // // 				)}
// // // // // // // // // // // // // 			</div>

// // // // // // // // // // // // // 			{/* Main Content Grid */}
// // // // // // // // // // // // // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // // // // // // // // // // // // 				{/* Left Column - Article Content */}
// // // // // // // // // // // // // 				<article className='relative'>
// // // // // // // // // // // // // 					{post.cover_image && (
// // // // // // // // // // // // // 						<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
// // // // // // // // // // // // // 							<ImageWithFallback
// // // // // // // // // // // // // 								src={post.cover_image}
// // // // // // // // // // // // // 								alt={post.title}
// // // // // // // // // // // // // 								className='w-full h-full object-cover'
// // // // // // // // // // // // // 								priority
// // // // // // // // // // // // // 							/>
// // // // // // // // // // // // // 						</div>
// // // // // // // // // // // // // 					)}
// // // // // // // // // // // // // 					{/* Content */}
// // // // // // // // // // // // // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // // // // // // // // // // // // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // // // // // // // // // // // // 						<div className='text-gray-400 dark:text-gray-400 mb-8'>
// // // // // // // // // // // // // 							{new Date(post.created_at).toLocaleDateString()} • {post.profiles?.username || "Anonymous"}
// // // // // // // // // // // // // 						</div>

// // // // // // // // // // // // // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

// // // // // // // // // // // // // 						<div className='mt-8'>{post.content}</div>

// // // // // // // // // // // // // 						{/* Engagement Bar */}
// // // // // // // // // // // // // 						<div className='sticky bottom-0 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur mt-8 p-4 rounded-lg'>
// // // // // // // // // // // // // 							<Reactions postId={post.id} />
// // // // // // // // // // // // // 						</div>
// // // // // // // // // // // // // 					</div>
// // // // // // // // // // // // // 				</article>

// // // // // // // // // // // // // 				{/* Right Column - Comments */}
// // // // // // // // // // // // // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // // // // // // // // // // // // 					<Comments postId={post.id} />
// // // // // // // // // // // // // 				</div>
// // // // // // // // // // // // // 			</div>
// // // // // // // // // // // // // 		</div>
// // // // // // // // // // // // // 	);
// // // // // // // // // // // // // }

```

# src/components/BlogPostContent.tsx

```tsx
// src/components/BlogPostContent.tsx
import Link from "next/link";
import { Comments } from "@/components/Comments";
import { AuthorInfo } from "./blog/AuthorInfo";
import { CoverImage } from "./blog/CoverImage";
import { MarkdownRenderer } from "./blog/MarkdownRenderer";
import { EngagementBar } from "./blog/EngagementBar";
import dynamic from "next/dynamic";

type Post = {
	id: string;
	title: string;
	content: string;
	type: "markdown" | "component";
	component_name?: string;
	component_props?: Record<string, any>;
	excerpt?: string;
	cover_image?: string;
	created_at: string;
	slug: string;
	profiles?: {
		username?: string;
	};
};

// Dynamic component loader
const DynamicComponent = ({ componentName, props = {} }) => {
	const Component = dynamic(() => import(`@/components/blog-components/${componentName}`), {
		loading: () => (
			<div className='flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500'></div>
			</div>
		),
	});

	return <Component {...props} />;
};

export default function BlogPostContent({ post }: { post: Post }) {
	return (
		<div className='max-w-page mx-auto px-4'>
			{/* <div className='flex justify-between items-center mb-8'>
				<Link
					href='/blog'
					className='text-primary-400 hover:text-primary-300'
				>
					← Back to posts
				</Link>
			</div> */}

			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
				<article className='relative'>
					{/* Cover Image */}
					<CoverImage
						src={post.cover_image}
						alt={post.title}
					/>

					{/* Main Content Area */}
					<div className='prose prose-lg dark:prose-invert max-w-none'>
						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

						{/* Author Info */}
						<AuthorInfo date={post.created_at} />

						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}

						{/* Conditional Content Rendering */}
						<div className='mt-8'>
							{post.type === "markdown" ? (
								<MarkdownRenderer content={post.content} />
							) : (
								<div className='bg-white dark:bg-gray-800 rounded-lg overflow-hidden'>
									<DynamicComponent
										componentName={post.component_name}
										props={post.component_props}
									/>
								</div>
							)}
						</div>
					</div>

					{/* Engagement Bar */}
					<EngagementBar postId={post.id} />
				</article>

				{/* Comments Section */}
				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
					<Comments postId={post.id} />
				</div>
			</div>
		</div>
	);
}

// // src/components/BlogPostContent.tsx
// "use client";
// import Link from "next/link";
// import { Comments } from "@/components/Comments";
// import { AuthorInfo } from "./blog/AuthorInfo";
// import { CoverImage } from "./blog/CoverImage";
// // import { MarkdownRenderer } from "./blog/MarkdownRenderer";
// import { EngagementBar } from "./blog/EngagementBar";

// import dynamic from "next/dynamic";
// import { MarkdownRenderer } from "./blog/MarkdownRenderer";
// import { Post } from "../../types/blog";

// // type Post = {
// // 	id: string;
// // 	title: string;
// // 	content: string;
// // 	excerpt?: string;
// // 	cover_image?: string;
// // 	created_at: string;
// // 	slug: string;
// // 	profiles?: {
// // 		username?: string;
// // 	};
// // };

// export default function BlogPostContent({ post }: { post: Post }) {
// 	const { title, category, cover_image, excerpt, created_at } = post;

// 	return (
// 		<div className='max-w-page mx-auto px-4'>
// 			<div className='flex justify-between items-center mb-8'>
// 				<Link
// 					href='/blog'
// 					className='text-primary-400 hover:text-primary-300'
// 				>
// 					← Back to posts
// 				</Link>
// 			</div>

// 			{/* Common header section */}
// 			<header>
// 				<h1>{title}</h1>
// 				<div className='meta'>{/* ... meta info ... */}</div>
// 			</header>

// 			{/* Conditional content rendering */}
// 			{post.type === "markdown" ? (
// 				<MarkdownRenderer content={post.content} />
// 			) : (
// 				<DynamicComponentRenderer
// 					componentName={post.component_name}
// 					props={post.props}
// 				/>
// 			)}

// 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// 				<article className='relative'>
// 					<CoverImage
// 						src={post.cover_image}
// 						alt={post.title}
// 					/>

// 					<AuthorInfo date={post.created_at} />

// 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}
// 						<MarkdownRenderer content={post.content} />
// 					</div>

// 					<EngagementBar postId={post.id} />
// 				</article>

// 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// 					<Comments postId={post.id} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// // Component renderer with dynamic imports
// function DynamicComponentRenderer({ componentName, props = {} }: { componentName: string; props?: Record<string, unknown> }) {
// 	const Component = dynamic(() => import(`@/components/blog-components/${componentName}`), {
// 		loading: () => <div>Loading component...</div>,
// 	});

// 	return <Component {...props} />;
// }

// // // src/components/BlogPostContent.tsx (Refactored)
// // import Link from "next/link";
// // import { Comments } from "@/components/Comments";
// // import { AuthorInfo } from "./blog/AuthorInfo";
// // import { CoverImage } from "./blog/CoverImage";
// // import { MarkdownRenderer } from "./blog/MarkdownRenderer";
// // import { EngagementBar } from "./blog/EngagementBar";

// // type Post = {
// // 	id: string;
// // 	title: string;
// // 	content: string;
// // 	excerpt?: string;
// // 	cover_image?: string;
// // 	created_at: string;
// // 	slug: string;
// // 	profiles?: {
// // 		username?: string;
// // 	};
// // };

// // export default function BlogPostContent({ post }: { post: Post }) {
// // 	return (
// // 		<div className='max-w-page mx-auto px-4'>
// // 			<div className='flex justify-between items-center mb-8'>
// // 				<Link
// // 					href='/blog'
// // 					className='text-primary-400 hover:text-primary-300'
// // 				>
// // 					← Back to posts
// // 				</Link>
// // 			</div>

// // 			<div className='grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8'>
// // 				<article className='relative'>
// // 					<CoverImage
// // 						src={post.cover_image}
// // 						alt={post.title}
// // 					/>

// // 					<AuthorInfo date={post.created_at} />

// // 					<div className='prose prose-lg dark:prose-invert max-w-none'>
// // 						<h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
// // 						{post.excerpt && <p className='text-xl text-gray-500 dark:text-gray-400 mb-8 font-serif italic'>{post.excerpt}</p>}
// // 						<MarkdownRenderer content={post.content} />
// // 					</div>

// // 					<EngagementBar postId={post.id} />
// // 				</article>

// // 				<div className='lg:sticky lg:top-4 space-y-6 bg-primary-50/80 dark:bg-gray-800/80 p-4 rounded-lg'>
// // 					<Comments postId={post.id} />
// // 				</div>
// // 			</div>
// // 		</div>
// // 	);
// // }

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
import Image from "next/image";

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
			<h2 className='text-2xl font-bold mb-6 text-gray-500'>Comments</h2>
			{error && <div className='mb-4 p-3 bg-red-500/10 text-red-500 rounded'>{error}</div>}
			<form
				onSubmit={handleSubmit}
				className='mb-8 space-y-4'
			>
				<div>
					<label className='block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400'>Name</label>
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
					<label className='block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400'>Comment</label>
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

			{/* <div className='space-y-4'>
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
			</div> */}

			<div className='space-y-4'>
				{comments.length === 0 ? (
					<div className='text-center'>
						<Image
							src='/assets/Be-the-first.png'
							alt='Be the first to comment'
							width={200}
							height={150}
							className='mx-auto mb-4'
						/>
						<p className='text-gray-400'>No comments yet</p>
					</div>
				) : (
					comments.map((comment) => (
						<div
							key={comment.id}
							className='border border-gray-700 rounded p-4 bg-gray-800'
						>
							<div className='text-sm text-gray-400 mb-2'>
								{comment.author_name || "Anonymous"} • {new Date(comment.created_at).toLocaleDateString()}
							</div>
							<p className='text-gray-200'>{comment.content}</p>
						</div>
					))
				)}
			</div>
		</div>
	);
}

```

# src/components/DeletePost.tsx

```tsx
// src/components/DeletePost.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export function DeletePost({ postId }: { postId: string }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		if (!confirm("Are you sure you want to delete this post?")) return;

		console.log("Starting delete process for post:", postId);
		setIsDeleting(true);

		try {
			// First verify we can delete this post
			const { data: post, error: fetchError } = await supabaseClient.from("posts").select("id, author_id").eq("id", postId).single();

			if (fetchError) throw fetchError;

			// Get current user
			const {
				data: { user },
				error: userError,
			} = await supabaseClient.auth.getUser();
			if (userError) throw userError;

			if (!user) {
				throw new Error("Not authenticated");
			}

			// Verify ownership
			if (post.author_id !== user.id) {
				throw new Error("Not authorized to delete this post");
			}

			// Delete the post
			const { error: deleteError } = await supabaseClient.from("posts").delete().eq("id", postId).eq("author_id", user.id); // Additional safety check

			if (deleteError) throw deleteError;

			// Navigate and revalidate
			await router.push("/blog");
			await fetch("/api/revalidate", { method: "POST" });
			router.refresh();
		} catch (err) {
			console.error("Failed to delete post:", err);
			alert(err instanceof Error ? err.message : "Failed to delete post");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<button
			onClick={handleDelete}
			disabled={isDeleting}
			className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
		>
			{isDeleting && (
				<Loader2
					className='animate-spin'
					size={16}
				/>
			)}
			{isDeleting ? "Deleting..." : "Delete Post"}
		</button>
	);
}

```

# src/components/EditForm.tsx

```tsx
// src/components/EditForm.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { ImageUpload } from "@/components/ImageUpload";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
import { Loader2 } from "lucide-react";
import { categories, CategoryId } from "@/data/categories";

type Post = {
	id: string;
	title: string;
	content: string;
	excerpt?: string;
	cover_image?: string;
	slug: string;
	category?: CategoryId;
};

type ReactComponentData = {
	name: string;
	props: Record<string, any>;
	code: string;
};

function parseReactComponent(content: string): ReactComponentData {
	try {
		const nameMatch = content.match(/(?:function|const)\s+(\w+)/);
		const name = nameMatch ? nameMatch[1] : "MyComponent";

		const propsMatch = content.match(/(?:function|const)\s+\w+\s*\((\{[^}]*\})\)/);
		const propsString = propsMatch ? propsMatch[1] : "{}";
		const props = Function(`return ${propsString}`)();

		return { name, props, code: content };
	} catch (e) {
		return { name: "MyComponent", props: {}, code: content };
	}
}

function generateReactComponent(name: string, props: Record<string, any>, code: string): string {
	if (!code.includes("export default")) {
		const propsString = Object.keys(props).length ? `{ ${Object.keys(props).join(", ")} }` : "props";
		return `export default function ${name}(${propsString}) {
   return (
     ${code}
   );
 }`;
	}
	return code;
}

export function EditForm({ post }: { post: Post }) {
	const router = useRouter();
	const { user } = useAuth();

	// Initialize content format state
	const [contentFormat, setContentFormat] = useState(() => {
      return post.content.includes('export default') ? 'react' : 'markdown';
    });

    const [componentData, setComponentData] = useState<ReactComponentData>(() => {
      return contentFormat === 'react'
        ? parseReactComponent(post.content)
        : { name: "MyComponent", props: {}, code: "" };
    });

	// Initialize form data with post content
	const [formData, setFormData] = useState({
		title: post.title,
		content: post.content,
		excerpt: post.excerpt || "",
		cover_image: post.cover_image || "",
		category: post.category || ("tech" as CategoryId),
	});

   const handleComponentChange = (field: keyof ReactComponentData, value: any) => {
      setComponentData(prev => {
        const updated = { ...prev, [field]: value };
        const newContent = generateReactComponent(updated.name, updated.props, updated.code);
        setFormData(prev => ({ ...prev, content: newContent }));
        return updated;
      });
    };

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isImageDeleting, setIsImageDeleting] = useState(false);
	const [error, setError] = useState("");

	// Keep content in sync with editor changes
	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			content: post.content,
		}));
	}, [post.content]);

	const handleContentChange = (newContent: string) => {
		setFormData((prev) => ({
			...prev,
			content: newContent,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;

		setIsSubmitting(true);
		setError("");

		try {
			const { error: updateError } = await supabaseClient
				.from("posts")
				.update({
					...formData,
					updated_at: new Date().toISOString(),
				})
				.eq("id", post.id);

			if (updateError) throw updateError;
			router.push(`/blog/${post.slug}`);
			router.refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to update post");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleImageDelete = async () => {
		if (!formData.cover_image) return;
		setIsImageDeleting(true);
		try {
			const path = formData.cover_image.split("/").pop();
			if (!path) throw new Error("Invalid image path");
			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);
			if (deleteError) throw deleteError;
			setFormData((prev) => ({ ...prev, cover_image: "" }));
		} catch (err) {
			setError("Failed to delete image");
		} finally {
			setIsImageDeleting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-6 max-w-4xl mx-auto px-4'
		>
			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

			<div>
				<label className='block text-sm font-medium mb-2'>Title</label>
				<input
					type='text'
					value={formData.title}
					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
					required
				/>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Category</label>
				<select
					value={formData.category}
					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
					required
				>
					{categories.map((category) => (
						<option
							key={category.id}
							value={category.id}
						>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Format</label>
				<select
					value={contentFormat}
					onChange={(e) => setContentFormat(e.target.value as "markdown" | "react")}
					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
				>
					<option value='markdown'>Markdown</option>
					<option value='react'>React Component</option>
				</select>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Cover Image</label>
				{formData.cover_image ? (
					<div className='space-y-4'>
						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
							<ImageWithFallback
								src={formData.cover_image}
								alt='Cover image'
								className='w-full h-full'
							/>
						</div>
						<button
							type='button'
							onClick={handleImageDelete}
							disabled={isImageDeleting}
							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
						>
							{isImageDeleting && (
								<Loader2
									className='animate-spin'
									size={16}
								/>
							)}
							{isImageDeleting ? "Removing..." : "Remove Image"}
						</button>
					</div>
				) : (
					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
				)}
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Excerpt</label>
				<textarea
					value={formData.excerpt}
					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
				/>
			</div>

			<div>
         <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        {contentFormat === 'react' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Component Name</label>
              <input
                type="text"
                value={componentData.name}
                onChange={(e) => handleComponentChange('name', e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Component Props (JSON)</label>
              <textarea
                value={JSON.stringify(componentData.props, null, 2)}
                onChange={(e) => {
                  try {
                    const props = JSON.parse(e.target.value);
                    handleComponentChange('props', props);
                  } catch {} // Ignore invalid JSON while typing
                }}
                className="w-full h-32 p-2 font-mono text-sm bg-white dark:bg-gray-800 border rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                spellCheck={false}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Component Code</label>
              <textarea
                value={componentData.code}
                onChange={(e) => handleComponentChange('code', e.target.value)}
                className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 border rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                spellCheck={false}
              />
            </div>
          </div>
        ) : (
          <RichMarkdownEditor
            initialContent={formData.content}
            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
          />
					) : (
						<textarea
							value={formData.content}
							onChange={(e) => handleContentChange(e.target.value)}
							className='w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
							spellCheck={false}
						/>
					)}
				</div>
			</div>

			<div className='flex gap-4'>
				<button
					type='submit'
					disabled={isSubmitting}
					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
				>
					{isSubmitting && (
						<Loader2
							className='animate-spin'
							size={16}
						/>
					)}
					{isSubmitting ? "Saving..." : "Save Changes"}
				</button>
				<button
					type='button'
					onClick={() => router.back()}
					className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
				>
					Cancel
				</button>
			</div>
		</form>
	);
}

// // src/components/EditForm.tsx
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseClient } from "@/lib/auth";
// import { useAuth } from "@/hooks/useAuth";
// import { ImageUpload } from "@/components/ImageUpload";
// import { ImageWithFallback } from "@/components/ImageWithFallback";
// import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// import { Loader2 } from "lucide-react";
// import { categories, CategoryId } from "@/data/categories";

// type Post = {
// 	id: string;
// 	title: string;
// 	content: string;
// 	excerpt?: string;
// 	cover_image?: string;
// 	slug: string;
// 	category?: CategoryId;
// };

// export function EditForm({ post }: { post: Post }) {
// 	const router = useRouter();
// 	const { user } = useAuth();

// 	// Initialize content format state
// 	const [contentFormat, setContentFormat] = useState(() => {
// 		const hasJSXSyntax = post.content.includes("export default") || post.content.includes("function") || post.content.includes("return") || post.content.includes("<");
// 		return hasJSXSyntax ? "react" : "markdown";
// 	});

// 	// Initialize form data with post content
// 	const [formData, setFormData] = useState({
// 		title: post.title,
// 		content: post.content,
// 		excerpt: post.excerpt || "",
// 		cover_image: post.cover_image || "",
// 		category: post.category || ("tech" as CategoryId),
// 	});

// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// 	const [error, setError] = useState("");

// 	// Keep content in sync with editor changes
// 	useEffect(() => {
// 		setFormData((prev) => ({
// 			...prev,
// 			content: post.content,
// 		}));
// 	}, [post.content]);

// 	const handleContentChange = (newContent: string) => {
// 		setFormData((prev) => ({
// 			...prev,
// 			content: newContent,
// 		}));
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!user) return;

// 		setIsSubmitting(true);
// 		setError("");

// 		try {
// 			const { error: updateError } = await supabaseClient
// 				.from("posts")
// 				.update({
// 					...formData,
// 					updated_at: new Date().toISOString(),
// 				})
// 				.eq("id", post.id);

// 			if (updateError) throw updateError;
// 			router.push(`/blog/${post.slug}`);
// 			router.refresh();
// 		} catch (err) {
// 			setError(err instanceof Error ? err.message : "Failed to update post");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	const handleImageDelete = async () => {
// 		if (!formData.cover_image) return;
// 		setIsImageDeleting(true);
// 		try {
// 			const path = formData.cover_image.split("/").pop();
// 			if (!path) throw new Error("Invalid image path");
// 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);
// 			if (deleteError) throw deleteError;
// 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// 		} catch (err) {
// 			setError("Failed to delete image");
// 		} finally {
// 			setIsImageDeleting(false);
// 		}
// 	};

// 	return (
// 		<form
// 			onSubmit={handleSubmit}
// 			className='space-y-6 max-w-4xl mx-auto px-4'
// 		>
// 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Title</label>
// 				<input
// 					type='text'
// 					value={formData.title}
// 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 					required
// 				/>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Category</label>
// 				<select
// 					value={formData.category}
// 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 					required
// 				>
// 					{categories.map((category) => (
// 						<option
// 							key={category.id}
// 							value={category.id}
// 						>
// 							{category.name}
// 						</option>
// 					))}
// 				</select>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Format</label>
// 				<select
// 					value={contentFormat}
// 					onChange={(e) => setContentFormat(e.target.value as "markdown" | "react")}
// 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 				>
// 					<option value='markdown'>Markdown</option>
// 					<option value='react'>React Component</option>
// 				</select>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// 				{formData.cover_image ? (
// 					<div className='space-y-4'>
// 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// 							<ImageWithFallback
// 								src={formData.cover_image}
// 								alt='Cover image'
// 								className='w-full h-full'
// 							/>
// 						</div>
// 						<button
// 							type='button'
// 							onClick={handleImageDelete}
// 							disabled={isImageDeleting}
// 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// 						>
// 							{isImageDeleting && (
// 								<Loader2
// 									className='animate-spin'
// 									size={16}
// 								/>
// 							)}
// 							{isImageDeleting ? "Removing..." : "Remove Image"}
// 						</button>
// 					</div>
// 				) : (
// 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// 				)}
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// 				<textarea
// 					value={formData.excerpt}
// 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// 					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 				/>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Content</label>
// 				<div className='border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'>
// 					{contentFormat === "markdown" ? (
// 						<RichMarkdownEditor
// 							initialContent={formData.content}
// 							onChange={handleContentChange}
// 						/>
// 					) : (
// 						<textarea
// 							value={formData.content}
// 							onChange={(e) => handleContentChange(e.target.value)}
// 							className='w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
// 							spellCheck={false}
// 						/>
// 					)}
// 				</div>
// 			</div>

// 			<div className='flex gap-4'>
// 				<button
// 					type='submit'
// 					disabled={isSubmitting}
// 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// 				>
// 					{isSubmitting && (
// 						<Loader2
// 							className='animate-spin'
// 							size={16}
// 						/>
// 					)}
// 					{isSubmitting ? "Saving..." : "Save Changes"}
// 				</button>
// 				<button
// 					type='button'
// 					onClick={() => router.back()}
// 					className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
// 				>
// 					Cancel
// 				</button>
// 			</div>
// 		</form>
// 	);
// }

// // src/components/EditForm.tsx
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabaseClient } from "@/lib/auth";
// import { useAuth } from "@/hooks/useAuth";
// import { ImageUpload } from "@/components/ImageUpload";
// import { ImageWithFallback } from "@/components/ImageWithFallback";
// import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// import { Loader2 } from "lucide-react";
// import { categories, CategoryId } from "@/data/categories";

// type Post = {
// 	id: string;
// 	title: string;
// 	content: string;
// 	excerpt?: string;
// 	cover_image?: string;
// 	slug: string;
// 	category?: CategoryId;
// };

// export function EditForm({ post }: { post: Post }) {
// 	const router = useRouter();
// 	const { user } = useAuth();
// 	const [isMarkdown, setIsMarkdown] = useState(() => {
// 		// Detect if content is markdown
// 		const hasJSXSyntax = post.content.includes("export default") || post.content.includes("function") || post.content.includes("return") || post.content.includes("<");
// 		return !hasJSXSyntax;
// 	});

// 	const [formData, setFormData] = useState({
// 		title: post.title || "",
// 		content: post.content || "",
// 		excerpt: post.excerpt || "",
// 		cover_image: post.cover_image || "",
// 		category: post.category || ("tech" as CategoryId),
// 	});
// 	const [isSubmitting, setIsSubmitting] = useState(false);
// 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// 	const [error, setError] = useState("");

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!user) return;

// 		setIsSubmitting(true);
// 		setError("");

// 		try {
// 			const { error: updateError } = await supabaseClient
// 				.from("posts")
// 				.update({
// 					...formData,
// 					updated_at: new Date().toISOString(),
// 				})
// 				.eq("id", post.id);

// 			if (updateError) throw updateError;
// 			router.push(`/blog/${post.slug}`);
// 			router.refresh();
// 		} catch (err) {
// 			setError(err instanceof Error ? err.message : "Failed to update post");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	const handleImageDelete = async () => {
// 		if (!formData.cover_image) return;
// 		setIsImageDeleting(true);
// 		try {
// 			const path = formData.cover_image.split("/").pop();
// 			if (!path) throw new Error("Invalid image path");
// 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);
// 			if (deleteError) throw deleteError;
// 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// 		} catch (err) {
// 			setError("Failed to delete image");
// 		} finally {
// 			setIsImageDeleting(false);
// 		}
// 	};

// 	return (
// 		<form
// 			onSubmit={handleSubmit}
// 			className='space-y-6 max-w-4xl mx-auto px-4'
// 		>
// 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Title</label>
// 				<input
// 					type='text'
// 					value={formData.title}
// 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 					required
// 				/>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Category</label>
// 				<select
// 					value={formData.category}
// 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 					required
// 				>
// 					{categories.map((category) => (
// 						<option
// 							key={category.id}
// 							value={category.id}
// 						>
// 							{category.name}
// 						</option>
// 					))}
// 				</select>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Format</label>
// 				<select
// 					value={isMarkdown ? "markdown" : "react"}
// 					onChange={(e) => setIsMarkdown(e.target.value === "markdown")}
// 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 				>
// 					<option value='markdown'>Markdown</option>
// 					<option value='react'>React Component</option>
// 				</select>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// 				{formData.cover_image ? (
// 					<div className='space-y-4'>
// 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// 							<ImageWithFallback
// 								src={formData.cover_image}
// 								alt='Cover image'
// 								className='w-full h-full'
// 							/>
// 						</div>
// 						<button
// 							type='button'
// 							onClick={handleImageDelete}
// 							disabled={isImageDeleting}
// 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// 						>
// 							{isImageDeleting && (
// 								<Loader2
// 									className='animate-spin'
// 									size={16}
// 								/>
// 							)}
// 							{isImageDeleting ? "Removing..." : "Remove Image"}
// 						</button>
// 					</div>
// 				) : (
// 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// 				)}
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// 				<textarea
// 					value={formData.excerpt}
// 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// 					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// 				/>
// 			</div>

// 			<div>
// 				<label className='block text-sm font-medium mb-2'>Content</label>
// 				<div className='border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'>
// 					{isMarkdown ? (
// 						<RichMarkdownEditor
// 							initialContent={formData.content}
// 							onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// 						/>
// 					) : (
// 						<textarea
// 							value={formData.content}
// 							onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
// 							className='w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
// 							spellCheck={false}
// 						/>
// 					)}
// 				</div>
// 			</div>

// 			<div className='flex gap-4'>
// 				<button
// 					type='submit'
// 					disabled={isSubmitting}
// 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// 				>
// 					{isSubmitting && (
// 						<Loader2
// 							className='animate-spin'
// 							size={16}
// 						/>
// 					)}
// 					{isSubmitting ? "Saving..." : "Save Changes"}
// 				</button>
// 				<button
// 					type='button'
// 					onClick={() => router.back()}
// 					className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
// 				>
// 					Cancel
// 				</button>
// 			</div>
// 		</form>
// 	);
// }
// // // src/components/EditForm.tsx
// // "use client";
// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { supabaseClient } from "@/lib/auth";
// // import { useAuth } from "@/hooks/useAuth";
// // import { ImageUpload } from "@/components/ImageUpload";
// // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// // import { Loader2 } from "lucide-react";
// // import { categories, CategoryId } from "@/data/categories";

// // type Post = {
// // 	id: string;
// // 	title: string;
// // 	content: string;
// // 	excerpt?: string;
// // 	cover_image?: string;
// // 	slug: string;
// // 	category?: CategoryId;
// // 	format?: "markdown" | "react";
// // };

// // export function EditForm({ post }: { post: Post }) {
// // 	const router = useRouter();
// // 	const { user } = useAuth();
// // 	const [formData, setFormData] = useState({
// // 		title: post.title,
// // 		content: post.content,
// // 		excerpt: post.excerpt || "",
// // 		cover_image: post.cover_image || "",
// // 		category: post.category || ("tech" as CategoryId),
// // 		format: post.format || detectFormat(post.content),
// // 	});
// // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// // 	const [error, setError] = useState("");

// // 	function detectFormat(content: string): "markdown" | "react" {
// // 		// Check for React component indicators
// // 		const hasJSXSyntax = content.includes("export default") || content.includes("function") || content.includes("return") || content.includes("useState") || content.includes("props");
// // 		return hasJSXSyntax ? "react" : "markdown";
// // 	}

// // 	const handleImageDelete = async () => {
// // 		if (!formData.cover_image) return;
// // 		setIsImageDeleting(true);
// // 		try {
// // 			const path = formData.cover_image.split("/").pop();
// // 			if (!path) throw new Error("Invalid image path");
// // 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);
// // 			if (deleteError) throw deleteError;
// // 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// // 		} catch (err) {
// // 			setError("Failed to delete image");
// // 			console.error("Error deleting image:", err);
// // 		} finally {
// // 			setIsImageDeleting(false);
// // 		}
// // 	};

// // 	const handleSubmit = async (e: React.FormEvent) => {
// // 		e.preventDefault();
// // 		if (!user) return;

// // 		setIsSubmitting(true);
// // 		setError("");

// // 		try {
// // 			const { error: updateError } = await supabaseClient
// // 				.from("posts")
// // 				.update({
// // 					...formData,
// // 					updated_at: new Date().toISOString(),
// // 				})
// // 				.eq("id", post.id);

// // 			if (updateError) throw updateError;

// // 			if (post.published) {
// // 				router.push(`/blog/${post.slug}`);
// // 			} else {
// // 				router.push("/blog/drafts");
// // 			}
// // 			router.refresh();
// // 		} catch (err) {
// // 			setError(err instanceof Error ? err.message : "Failed to update post");
// // 		} finally {
// // 			setIsSubmitting(false);
// // 		}
// // 	};

// // 	return (
// // 		<form
// // 			onSubmit={handleSubmit}
// // 			className='space-y-6 max-w-4xl mx-auto px-4'
// // 		>
// // 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Title</label>
// // 				<input
// // 					type='text'
// // 					value={formData.title}
// // 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // 					required
// // 				/>
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Category</label>
// // 				<select
// // 					value={formData.category}
// // 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // 					required
// // 				>
// // 					{categories.map((category) => (
// // 						<option
// // 							key={category.id}
// // 							value={category.id}
// // 						>
// // 							{category.name}
// // 						</option>
// // 					))}
// // 				</select>
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Format</label>
// // 				<select
// // 					value={formData.format}
// // 					onChange={(e) => setFormData((prev) => ({ ...prev, format: e.target.value as "markdown" | "react" }))}
// // 					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // 				>
// // 					<option value='markdown'>Markdown</option>
// // 					<option value='react'>React Component</option>
// // 				</select>
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// // 				{formData.cover_image ? (
// // 					<div className='space-y-4'>
// // 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// // 							<ImageWithFallback
// // 								src={formData.cover_image}
// // 								alt='Cover image'
// // 								className='w-full h-full'
// // 							/>
// // 						</div>
// // 						<button
// // 							type='button'
// // 							onClick={handleImageDelete}
// // 							disabled={isImageDeleting}
// // 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// // 						>
// // 							{isImageDeleting && (
// // 								<Loader2
// // 									className='animate-spin'
// // 									size={16}
// // 								/>
// // 							)}
// // 							{isImageDeleting ? "Removing..." : "Remove Image"}
// // 						</button>
// // 					</div>
// // 				) : (
// // 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// // 				)}
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// // 				<textarea
// // 					value={formData.excerpt}
// // 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// // 					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
// // 				/>
// // 			</div>

// // 			<div>
// // 				<label className='block text-sm font-medium mb-2'>Content</label>
// // 				<div className='border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'>
// // 					{formData.format === "react" ? (
// // 						<textarea
// // 							value={formData.content}
// // 							onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
// // 							className='w-full h-96 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
// // 							spellCheck={false}
// // 						/>
// // 					) : (
// // 						<RichMarkdownEditor
// // 							initialContent={formData.content}
// // 							onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// // 						/>
// // 					)}
// // 				</div>
// // 			</div>

// // 			<div className='flex gap-4'>
// // 				<button
// // 					type='submit'
// // 					disabled={isSubmitting}
// // 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// // 				>
// // 					{isSubmitting && (
// // 						<Loader2
// // 							className='animate-spin'
// // 							size={16}
// // 						/>
// // 					)}
// // 					{isSubmitting ? "Saving..." : "Save Changes"}
// // 				</button>
// // 				<button
// // 					type='button'
// // 					onClick={() => router.back()}
// // 					className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'
// // 				>
// // 					Cancel
// // 				</button>
// // 			</div>
// // 		</form>
// // 	);
// // }
// // // // src/components/EditForm.tsx
// // // "use client";
// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { supabaseClient } from "@/lib/auth";
// // // import { useAuth } from "@/hooks/useAuth";
// // // import { ImageUpload } from "@/components/ImageUpload";
// // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// // // import { Loader2 } from "lucide-react";
// // // import { categories, CategoryId } from "@/data/categories";

// // // type Post = {
// // // 	id: string;
// // // 	title: string;
// // // 	content: string;
// // // 	excerpt?: string;
// // // 	cover_image?: string;
// // // 	slug: string;
// // // 	category?: CategoryId;
// // // };

// // // export function EditForm({ post }: { post: Post }) {
// // // 	const router = useRouter();
// // // 	const { user } = useAuth();
// // // 	const [formData, setFormData] = useState({
// // // 		title: post.title,
// // // 		content: post.content,
// // // 		excerpt: post.excerpt || "",
// // // 		cover_image: post.cover_image || "",
// // // 		category: post.category || ("tech" as CategoryId),
// // // 	});
// // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // 	const [isImageDeleting, setIsImageDeleting] = useState(false);
// // // 	const [error, setError] = useState("");

// // // 	const handleImageDelete = async () => {
// // // 		if (!formData.cover_image) return;

// // // 		setIsImageDeleting(true);
// // // 		try {
// // // 			const path = formData.cover_image.split("/").pop();
// // // 			if (!path) throw new Error("Invalid image path");

// // // 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);

// // // 			if (deleteError) throw deleteError;
// // // 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// // // 		} catch (err) {
// // // 			setError("Failed to delete image");
// // // 			console.error("Error deleting image:", err);
// // // 		} finally {
// // // 			setIsImageDeleting(false);
// // // 		}
// // // 	};

// // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // 		e.preventDefault();
// // // 		if (!user) return;

// // // 		setIsSubmitting(true);
// // // 		setError("");

// // // 		try {
// // // 			const { error: updateError } = await supabaseClient
// // // 				.from("posts")
// // // 				.update({
// // // 					...formData,
// // // 					updated_at: new Date().toISOString(),
// // // 				})
// // // 				.eq("id", post.id);

// // // 			if (updateError) throw updateError;

// // // 			if (post.published) {
// // // 				router.push(`/blog/${post.slug}`);
// // // 			} else {
// // // 				router.push("/blog/drafts");
// // // 			}
// // // 			router.refresh();
// // // 		} catch (err) {
// // // 			setError(err instanceof Error ? err.message : "Failed to update post");
// // // 		} finally {
// // // 			setIsSubmitting(false);
// // // 		}
// // // 	};

// // // 	const handleCancel = () => {
// // // 		if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
// // // 			router.push(`/blog/${post.slug}`);
// // // 		}
// // // 	};

// // // 	return (
// // // 		<form
// // // 			onSubmit={handleSubmit}
// // // 			className='space-y-6'
// // // 		>
// // // 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Title</label>
// // // 				<input
// // // 					type='text'
// // // 					value={formData.title}
// // // 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// // // 					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// // // 					required
// // // 				/>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Category</label>
// // // 				<select
// // // 					value={formData.category}
// // // 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// // // 					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// // // 					required
// // // 				>
// // // 					{categories.map((category) => (
// // // 						<option
// // // 							key={category.id}
// // // 							value={category.id}
// // // 						>
// // // 							{category.name}
// // // 						</option>
// // // 					))}
// // // 				</select>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// // // 				{formData.cover_image ? (
// // // 					<div className='space-y-4'>
// // // 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// // // 							<ImageWithFallback
// // // 								src={formData.cover_image}
// // // 								alt='Cover image'
// // // 								className='w-full h-full'
// // // 							/>
// // // 						</div>
// // // 						<button
// // // 							type='button'
// // // 							onClick={handleImageDelete}
// // // 							disabled={isImageDeleting}
// // // 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// // // 						>
// // // 							{isImageDeleting && (
// // // 								<Loader2
// // // 									className='animate-spin'
// // // 									size={16}
// // // 								/>
// // // 							)}
// // // 							{isImageDeleting ? "Removing..." : "Remove Image"}
// // // 						</button>
// // // 					</div>
// // // 				) : (
// // // 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// // // 				)}
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// // // 				<textarea
// // // 					value={formData.excerpt}
// // // 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// // // 					className='w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100'
// // // 				/>
// // // 			</div>

// // // 			<div>
// // // 				<label className='block text-sm font-medium mb-2'>Content</label>
// // // 				<div className='border border-gray-700 rounded-lg overflow-hidden'>
// // // 					<RichMarkdownEditor
// // // 						initialContent={formData.content}
// // // 						onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// // // 					/>
// // // 				</div>
// // // 			</div>

// // // 			<div className='flex gap-4'>
// // // 				<button
// // // 					type='submit'
// // // 					disabled={isSubmitting}
// // // 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// // // 				>
// // // 					{isSubmitting && (
// // // 						<Loader2
// // // 							className='animate-spin'
// // // 							size={16}
// // // 						/>
// // // 					)}
// // // 					{isSubmitting ? "Saving..." : "Save Changes"}
// // // 				</button>
// // // 				<button
// // // 					type='button'
// // // 					onClick={handleCancel}
// // // 					className='bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600'
// // // 				>
// // // 					Cancel
// // // 				</button>
// // // 			</div>
// // // 		</form>
// // // 	);
// // // }

// // // // // src/components/EditForm.tsx
// // // // "use client";
// // // // import { useState } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import { supabaseClient } from "@/lib/auth";
// // // // import { useAuth } from "@/hooks/useAuth";
// // // // import { ImageUpload } from "@/components/ImageUpload";
// // // // import { ImageWithFallback } from "@/components/ImageWithFallback";
// // // // import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
// // // // import { Loader2 } from "lucide-react";
// // // // import { categories, CategoryId } from "@/data/categories";

// // // // type Post = {
// // // // 	id: string;
// // // // 	title: string;
// // // // 	content: string;
// // // // 	excerpt?: string;
// // // // 	cover_image?: string;
// // // // 	slug: string;
// // // // 	category?: CategoryId;
// // // // };

// // // // export function EditForm({ post }: { post: Post }) {
// // // // 	const router = useRouter();
// // // // 	const { user } = useAuth();
// // // // 	const [formData, setFormData] = useState({
// // // // 		title: post.title,
// // // // 		content: post.content,
// // // // 		excerpt: post.excerpt || "",
// // // // 		cover_image: post.cover_image || "",
// // // // 		category: post.category || ("tech" as CategoryId),
// // // // 	});
// // // // 	const [isSubmitting, setIsSubmitting] = useState(false);
// // // // 	const [error, setError] = useState("");

// // // // 	const handleSubmit = async (e: React.FormEvent) => {
// // // // 		e.preventDefault();
// // // // 		if (!user) return;

// // // // 		setIsSubmitting(true);
// // // // 		setError("");

// // // // 		try {
// // // // 			const { error: updateError } = await supabaseClient
// // // // 				.from("posts")
// // // // 				.update({
// // // // 					...formData,
// // // // 					updated_at: new Date().toISOString(),
// // // // 				})
// // // // 				.eq("id", post.id);

// // // // 			if (updateError) throw updateError;

// // // // 			if (post.published) {
// // // // 				router.push(`/blog/${post.slug}`);
// // // // 			} else {
// // // // 				router.push("/blog/drafts");
// // // // 			}
// // // // 			router.refresh();
// // // // 		} catch (err) {
// // // // 			setError(err instanceof Error ? err.message : "Failed to update post");
// // // // 		} finally {
// // // // 			setIsSubmitting(false);
// // // // 		}
// // // // 	};

// // // // 	const handleImageDelete = async () => {
// // // // 		if (!formData.cover_image) return;

// // // // 		setIsImageDeleting(true);
// // // // 		try {
// // // // 			const path = formData.cover_image.split("/").pop();
// // // // 			if (!path) throw new Error("Invalid image path");

// // // // 			const { error: deleteError } = await supabaseClient.storage.from("images").remove([`blog-images/${path}`]);

// // // // 			if (deleteError) throw deleteError;

// // // // 			setFormData((prev) => ({ ...prev, cover_image: "" }));
// // // // 		} catch (err) {
// // // // 			setError("Failed to delete image");
// // // // 			console.error("Error deleting image:", err);
// // // // 		} finally {
// // // // 			setIsImageDeleting(false);
// // // // 		}
// // // // 	};

// // // // 	const handleCancel = () => {
// // // // 		if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
// // // // 			router.push(`/blog/${post.slug}`);
// // // // 		}
// // // // 	};

// // // // 	return (
// // // // 		<form
// // // // 			onSubmit={handleSubmit}
// // // // 			className='space-y-6'
// // // // 		>
// // // // 			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Title</label>
// // // // 				<input
// // // // 					type='text'
// // // // 					value={formData.title}
// // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// // // // 					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// // // // 					required
// // // // 				/>
// // // // 			</div>

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Category</label>
// // // // 				<select
// // // // 					value={formData.category}
// // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// // // // 					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// // // // 					required
// // // // 				>
// // // // 					{categories.map((category) => (
// // // // 						<option
// // // // 							key={category.id}
// // // // 							value={category.id}
// // // // 						>
// // // // 							{category.name}
// // // // 						</option>
// // // // 					))}
// // // // 				</select>
// // // // 			</div>

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Cover Image</label>
// // // // 				{formData.cover_image ? (
// // // // 					<div className='space-y-4'>
// // // // 						<div className='relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden'>
// // // // 							<ImageWithFallback
// // // // 								src={formData.cover_image}
// // // // 								alt='Cover image'
// // // // 								className='w-full h-full'
// // // // 							/>
// // // // 						</div>
// // // // 						<button
// // // // 							type='button'
// // // // 							onClick={handleImageDelete}
// // // // 							disabled={isImageDeleting}
// // // // 							className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'
// // // // 						>
// // // // 							{isImageDeleting && (
// // // // 								<Loader2
// // // // 									className='animate-spin'
// // // // 									size={16}
// // // // 								/>
// // // // 							)}
// // // // 							{isImageDeleting ? "Removing..." : "Remove Image"}
// // // // 						</button>
// // // // 					</div>
// // // // 				) : (
// // // // 					<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// // // // 				)}
// // // // 			</div>

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Excerpt</label>
// // // // 				<textarea
// // // // 					value={formData.excerpt}
// // // // 					onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// // // // 					className='w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100'
// // // // 				/>
// // // // 			</div>

// // // // 			<div>
// // // // 				<label className='block text-sm font-medium mb-2'>Content</label>
// // // // 				<div className='border border-gray-700 rounded-lg overflow-hidden'>
// // // // 					<RichMarkdownEditor
// // // // 						initialContent={formData.content}
// // // // 						onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// // // // 					/>
// // // // 				</div>
// // // // 			</div>

// // // // 			<div className='flex gap-4'>
// // // // 				<button
// // // // 					type='submit'
// // // // 					disabled={isSubmitting}
// // // // 					className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// // // // 				>
// // // // 					{isSubmitting && (
// // // // 						<Loader2
// // // // 							className='animate-spin'
// // // // 							size={16}
// // // // 						/>
// // // // 					)}
// // // // 					{isSubmitting ? "Saving..." : "Save Changes"}
// // // // 				</button>
// // // // 				<button
// // // // 					type='button'
// // // // 					onClick={handleCancel}
// // // // 					className='bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600'
// // // // 				>
// // // // 					Cancel
// // // // 				</button>
// // // // 			</div>
// // // // 		</form>
// // // // 	);
// // // // }

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

# src/components/MobileNavbar.tsx

```tsx
// src/components/MobileNavbar.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabaseClient } from '@/lib/auth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { navLinks } from '@/data/navbarConfig';
import { usePathname, useRouter } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const getBlogPostInfo = () => {
    const pathParts = pathname.split("/");
    if (pathParts[1] === "blog" && pathParts.length === 3) {
      const isNewPost = pathParts[2] === "new";
      const isDrafts = pathParts[2] === "drafts";
      const isEditPath = pathname.includes("/edit/");
      if (!isNewPost && !isDrafts && !isEditPath) {
        return { isPost: true, slug: pathParts[2] };
      }
    }
    return { isPost: false, slug: null };
  };

  const { isPost, slug } = getBlogPostInfo();

  const handleDelete = async () => {
    if (!slug || !isAuthenticated) return;
    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    try {
      const { error: deleteError } = await supabaseClient.from("posts").delete().eq("slug", slug);
      if (deleteError) throw deleteError;

      await router.push("/blog");
      router.refresh();
      await fetch("/api/revalidate", { method: "POST" });
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg transition-all z-50">
        <div className="max-w-page mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href={navLinks.brand.href} className="flex items-center">
              <Image
                src={navLinks.brand.logo}
                alt={navLinks.brand.label}
                width={90}
                height={90}
                priority
                className="w-auto h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.mainLinks.map((link) => {
                if ("authRequired" in link && link.authRequired && !isAuthenticated) return null;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}

              {isAuthenticated && isPost && (
                <>
                  <Link
                    href={`/blog/edit/${slug}`}
                    className="px-3 py-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
                  >
                    Edit Post
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isDeleting && <Loader2 className="animate-spin" size={16} />}
                    {isDeleting ? "Deleting..." : "Delete Post"}
                  </button>
                </>
              )}

              <ThemeToggle />

              {isAuthenticated ? (
                <button
                  onClick={() => supabaseClient.auth.signOut()}
                  className="px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  {navLinks.authLinks.signOut.label}
                </button>
              ) : (
                <button
                  onClick={() => supabaseClient.auth.signInWithOAuth({
                    provider: 'github',
                    options: { redirectTo: `${window.location.origin}/auth/callback` }
                  })}
                  className="px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  {navLinks.authLinks.signIn.label}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t dark:border-gray-800">
              <div className="flex flex-col space-y-4 p-4">
                {navLinks.mainLinks.map((link) => {
                  if ("authRequired" in link && link.authRequired && !isAuthenticated) return null;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {isAuthenticated && isPost && (
                  <>
                    <Link
                      href={`/blog/edit/${slug}`}
                      className="text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Edit Post
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete();
                        setIsOpen(false);
                      }}
                      disabled={isDeleting}
                      className="w-full text-left text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 px-4 py-2 rounded transition-colors flex items-center gap-2"
                    >
                      {isDeleting && <Loader2 className="animate-spin" size={16} />}
                      {isDeleting ? "Deleting..." : "Delete Post"}
                    </button>
                  </>
                )}

                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      supabaseClient.auth.signOut();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    {navLinks.authLinks.signOut.label}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      supabaseClient.auth.signInWithOAuth({
                        provider: 'github',
                        options: { redirectTo: `${window.location.origin}/auth/callback` }
                      });
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    {navLinks.authLinks.signIn.label}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
}
// // src/components/MobileNavbar.tsx
// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";
// import { supabaseClient } from "@/lib/auth";
// import { ThemeToggle } from "@/components/ThemeToggle";
// import { navLinks } from "@/data/navbarConfig";

// export function Navbar() {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const { isAuthenticated } = useAuth();

// 	return (
// 		<>
// 			<nav className='fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg transition-all z-50'>
// 				<div className='max-w-page mx-auto px-4'>
// 					<div className='flex justify-between items-center h-16'>
// 						<Link
// 							href={navLinks.brand.href}
// 							className='flex items-center'
// 						>
// 							<Image
// 								src={navLinks.brand.logo}
// 								alt={navLinks.brand.label}
// 								width={90}
// 								height={90}
// 								priority
// 								className='w-auto h-12'
// 							/>
// 						</Link>

// 						<div className='hidden md:flex items-center gap-6'>
// 							{navLinks.mainLinks.map((link) => {
// 								if ("authRequired" in link && link.authRequired && !isAuthenticated) return null;
// 								return (
// 									<Link
// 										key={link.href}
// 										href={link.href}
// 										className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
// 									>
// 										{link.label}
// 									</Link>
// 								);
// 							})}
// 							<ThemeToggle />
// 							{isAuthenticated ? (
// 								<button
// 									onClick={() => supabaseClient.auth.signOut()}
// 									className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 								>
// 									{navLinks.authLinks.signOut.label}
// 								</button>
// 							) : (
// 								<button
// 									onClick={() =>
// 										supabaseClient.auth.signInWithOAuth({
// 											provider: "github",
// 											options: { redirectTo: `${window.location.origin}/auth/callback` },
// 										})
// 									}
// 									className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 								>
// 									{navLinks.authLinks.signIn.label}
// 								</button>
// 							)}
// 						</div>

// 						<div className='md:hidden flex items-center gap-4'>
// 							<ThemeToggle />
// 							<button
// 								onClick={() => setIsOpen(!isOpen)}
// 								className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
// 							>
// 								{isOpen ? <X size={24} /> : <Menu size={24} />}
// 							</button>
// 						</div>
// 					</div>

// 					{isOpen && (
// 						<div className='md:hidden border-t dark:border-gray-800'>
// 							<div className='flex flex-col space-y-4 p-4'>
// 								{navLinks.mainLinks.map((link) => {
// 									if ("authRequired" in link && link.authRequired && !isAuthenticated) return null;
// 									return (
// 										<Link
// 											key={link.href}
// 											href={link.href}
// 											className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2'
// 											onClick={() => setIsOpen(false)}
// 										>
// 											{link.label}
// 										</Link>
// 									);
// 								})}
// 								{isAuthenticated ? (
// 									<button
// 										onClick={() => {
// 											supabaseClient.auth.signOut();
// 											setIsOpen(false);
// 										}}
// 										className='w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 									>
// 										{navLinks.authLinks.signOut.label}
// 									</button>
// 								) : (
// 									<button
// 										onClick={() => {
// 											supabaseClient.auth.signInWithOAuth({
// 												provider: "github",
// 												options: { redirectTo: `${window.location.origin}/auth/callback` },
// 											});
// 											setIsOpen(false);
// 										}}
// 										className='w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 									>
// 										{navLinks.authLinks.signIn.label}
// 									</button>
// 								)}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			</nav>
// 			<div className='h-16' /> {/* Spacer to prevent content from going under fixed navbar */}
// 		</>
// 	);
// }
// // // src/components/MobileNavbar.tsx
// // "use client";
// // import { useState } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { Menu, X } from "lucide-react";
// // import { useAuth } from "@/hooks/useAuth";
// // import { supabaseClient } from "@/lib/auth";
// // import { ThemeToggle } from "@/components/ThemeToggle";
// // import { navLinks } from "@/data/navbarConfig";

// // export default function MobileNavbar() {
// // 	const [isOpen, setIsOpen] = useState(false);
// // 	const { isAuthenticated } = useAuth();

// // 	const toggleMenu = () => setIsOpen(!isOpen);

// // 	return (
// // 		<nav className='bg-white dark:bg-gray-900 shadow-lg transition-all fixed w-full top-0 z-50'>
// // 			<div className='max-w-page mx-auto px-4'>

// // 				{/* Main Navigation Bar */}
// // 				<div className='flex justify-between items-center h-16'>
// // 					{/* Logo */}
// // 					<Link
// // 						href={navLinks.brand.href}
// // 						className='flex items-center'
// // 					>
// // 						<Image
// // 							src={navLinks.brand.logo}
// // 							alt={navLinks.brand.label}
// // 							width={90}
// // 							height={90}
// // 							priority
// // 							className='w-auto h-12'
// // 						/>
// // 					</Link>

// // 					{/* Desktop Navigation - Hidden on Mobile */}
// // 					<div className='hidden md:flex items-center space-x-6'>
// // 						{navLinks.mainLinks.map((link) => {
// // 							if ("authRequired" in link && link.authRequired && !isAuthenticated) {
// // 								return null;
// // 							}
// // 							return (
// // 								<Link
// // 									key={link.href}
// // 									href={link.href}
// // 									className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
// // 								>
// // 									{link.label}
// // 								</Link>
// // 							);
// // 						})}
// // 						<ThemeToggle />
// // 						{isAuthenticated ? (
// // 							<button
// // 								onClick={() => supabaseClient.auth.signOut()}
// // 								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// // 							>
// // 								{navLinks.authLinks.signOut.label}
// // 							</button>
// // 						) : (
// // 							<button
// // 								onClick={() =>
// // 									supabaseClient.auth.signInWithOAuth({
// // 										provider: "github",
// // 										options: { redirectTo: `${window.location.origin}/auth/callback` },
// // 									})
// // 								}
// // 								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// // 							>
// // 								{navLinks.authLinks.signIn.label}
// // 							</button>
// // 						)}
// // 					</div>

// // 					{/* Mobile Menu Button */}
// // 					<div className='md:hidden flex items-center space-x-4'>
// // 						<ThemeToggle />
// // 						<button
// // 							onClick={toggleMenu}
// // 							className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
// // 						>
// // 							{isOpen ? <X size={24} /> : <Menu size={24} />}
// // 						</button>
// // 					</div>
// // 				</div>

// // 				{/* Mobile Menu Overlay */}
// // 				{isOpen && (
// // 					<div className='md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg'>
// // 						<div className='flex flex-col space-y-4 p-4'>
// // 							{navLinks.mainLinks.map((link) => {
// // 								if ("authRequired" in link && link.authRequired && !isAuthenticated) {
// // 									return null;
// // 								}
// // 								return (
// // 									<Link
// // 										key={link.href}
// // 										href={link.href}
// // 										className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2'
// // 										onClick={() => setIsOpen(false)}
// // 									>
// // 										{link.label}
// // 									</Link>
// // 								);
// // 							})}
// // 							{isAuthenticated ? (
// // 								<button
// // 									onClick={() => {
// // 										supabaseClient.auth.signOut();
// // 										setIsOpen(false);
// // 									}}
// // 									className='w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// // 								>
// // 									{navLinks.authLinks.signOut.label}
// // 								</button>
// // 							) : (
// // 								<button
// // 									onClick={() => {
// // 										supabaseClient.auth.signInWithOAuth({
// // 											provider: "github",
// // 											options: { redirectTo: `${window.location.origin}/auth/callback` },
// // 										});
// // 										setIsOpen(false);
// // 									}}
// // 									className='w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// // 								>
// // 									{navLinks.authLinks.signIn.label}
// // 								</button>
// // 							)}
// // 						</div>
// // 					</div>
// // 				)}
// // 			</div>
// // 		</nav>
// // 	);
// // }

```

# src/components/Navbar-Old.tsx

```tsx
// src/components/Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navLinks, navStyles } from "@/data/navbarConfig";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function Navbar() {
	const { isAuthenticated } = useAuth();
	const pathname = usePathname();
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	// Helper function to determine if we're on a valid blog post page
	const getBlogPostInfo = () => {
		const pathParts = pathname.split("/");

		// Check if we're on a blog post page
		if (pathParts[1] === "blog" && pathParts.length === 3) {
			const isNewPost = pathParts[2] === "new";
			const isDrafts = pathParts[2] === "drafts";
			const isEditPath = pathname.includes("/edit/");

			// Only return slug if we're on a regular blog post page
			if (!isNewPost && !isDrafts && !isEditPath) {
				return { isPost: true, slug: pathParts[2] };
			}
		}

		return { isPost: false, slug: null };
	};

	const { isPost, slug } = getBlogPostInfo();

	const handleDelete = async () => {
		if (!slug || !isAuthenticated) return;

		if (!confirm("Are you sure you want to delete this post?")) return;

		setIsDeleting(true);

		try {
			const { error: deleteError } = await supabaseClient.from("posts").delete().eq("slug", slug);

			if (deleteError) throw deleteError;

			await router.push("/blog");
			router.refresh();
			await fetch("/api/revalidate", { method: "POST" });
		} catch (err) {
			console.error("Failed to delete post:", err);
			alert("Failed to delete post");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<nav className='bg-white dark:bg-gray-900 shadow-lg transition-all'>
			{/* <div className={navStyles.container}> */}
			<div className='max-w-page mx-auto px-4'>
				<div className='flex justify-between items-center h-16'>
					{/* Left section with brand and main links */}
					<div className='flex items-center gap-8'>
						<Link
							href={navLinks.brand.href}
							className='flex items-center'
						>
							<Image
								src={navLinks.brand.logo}
								alt={navLinks.brand.label}
								width={90}
								height={90}
								priority
							/>
							<span className='sr-only'>{navLinks.brand.label}</span>
						</Link>

						{/* Main navigation links */}
						<div className='hidden md:flex items-center gap-6'>
							{navLinks.mainLinks.map((link) => {
								if ("authRequired" in link && link.authRequired && !isAuthenticated) {
									return null;
								}
								return (
									<Link
										key={link.href}
										href={link.href}
										className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
									>
										{link.label}
									</Link>
								);
							})}
						</div>
					</div>

					{/* Right section with post actions and auth */}
					<div className='flex items-center gap-4'>
						{/* Post management buttons - only show on blog post pages */}
						{isAuthenticated && isPost && (
							<div className='hidden md:flex items-center gap-3'>
								<Link
									href={`/blog/edit/${slug}`}
									className='px-3 py-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors'
								>
									Edit Post
								</Link>
								<button
									onClick={handleDelete}
									disabled={isDeleting}
									className='px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2'
								>
									{isDeleting && (
										<Loader2
											className='animate-spin'
											size={16}
										/>
									)}
									{isDeleting ? "Deleting..." : "Delete Post"}
								</button>
							</div>
						)}

						<ThemeToggle />

						{/* Auth button */}
						{isAuthenticated ? (
							<button
								onClick={() => supabaseClient.auth.signOut()}
								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
							>
								{navLinks.authLinks.signOut.label}
							</button>
						) : (
							<button
								onClick={() =>
									supabaseClient.auth.signInWithOAuth({
										provider: "github",
										options: { redirectTo: `${window.location.origin}/auth/callback` },
									})
								}
								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
							>
								{navLinks.authLinks.signIn.label}
							</button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

// src/components/Navbar.tsx
// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useAuth } from "@/hooks/useAuth";
// import { supabaseClient } from "@/lib/auth";
// import { ThemeToggle } from "@/components/ThemeToggle";
// import { navLinks, navStyles } from "@/data/navbarConfig";
// import { usePathname } from "next/navigation";

// export function Navbar() {
// 	const { isAuthenticated } = useAuth();
// 	const pathname = usePathname();

// 	// Check if we're on a blog post page (but not edit page)
// 	const isBlogPost = pathname.startsWith("/blog/") && pathname.split("/").length === 3 && !pathname.includes("/edit");

// 	// Extract slug from pathname if we're on a blog post
// 	const postSlug = isBlogPost ? pathname.split("/")[2] : null;

// 	return (
// 		<nav className='bg-white dark:bg-gray-900 shadow-lg transition-all'>
// 			<div className={navStyles.container}>
// 				<div className='flex justify-between items-center h-16'>
// 					{/* Left section with brand and main links */}
// 					<div className='flex items-center gap-8'>
// 						<Link
// 							href={navLinks.brand.href}
// 							className='flex items-center'
// 						>
// 							<Image
// 								src={navLinks.brand.logo}
// 								alt={navLinks.brand.label}
// 								width={150}
// 								height={40}
// 								priority
// 							/>
// 							<span className='sr-only'>{navLinks.brand.label}</span>
// 						</Link>

// 						{/* Main navigation links */}
// 						<div className='hidden md:flex items-center gap-6'>
// 							{navLinks.mainLinks.map((link) => {
// 								if ("authRequired" in link && link.authRequired && !isAuthenticated) {
// 									return null;
// 								}
// 								return (
// 									<Link
// 										key={link.href}
// 										href={link.href}
// 										className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
// 									>
// 										{link.label}
// 									</Link>
// 								);
// 							})}
// 						</div>
// 					</div>

// 					{/* Right section with post actions and auth */}
// 					<div className='flex items-center gap-4'>
// 						{/* Post management buttons - only show on blog post pages */}
// 						{isAuthenticated && isBlogPost && (
// 							<div className='hidden md:flex items-center gap-3'>
// 								<Link
// 									href={`/blog/edit/${postSlug}`}
// 									className='px-3 py-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors'
// 								>
// 									Edit Post
// 								</Link>
// 							</div>
// 						)}

// 						<ThemeToggle />

// 						{/* Auth button */}
// 						{isAuthenticated ? (
// 							<button
// 								onClick={() => supabaseClient.auth.signOut()}
// 								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
// 							>
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
// 								className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
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
// // import Image from 'next/image'
// // import { useAuth } from '@/hooks/useAuth'
// // import { supabaseClient } from '@/lib/auth'
// // import { ThemeToggle } from '@/components/ThemeToggle'
// // import { navLinks, navStyles } from '@/data/navbarConfig'

// // export function Navbar() {
// //   const { isAuthenticated } = useAuth()

// //   return (
// //     <nav className={navStyles.base}>
// //       <div className={navStyles.container}>
// //         <div className={navStyles.inner}>
// //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// //             <Image
// //               src={navLinks.brand.logo}
// //               alt={navLinks.brand.label}
// //               width={150}
// //               height={40}
// //               priority
// //             />
// //             <span className="sr-only">{navLinks.brand.label}</span>
// //           </Link>
// //           <div className="flex items-center space-x-8">
// //             {navLinks.mainLinks.map(link => {
// //               if ('authRequired' in link && link.authRequired && !isAuthenticated) {
// //                 return null;
// //               }
// //               return (
// //                 <Link
// //                   key={link.href}
// //                   href={link.href}
// //                   className={navStyles.link}
// //                 >
// //                   {link.label}
// //                 </Link>
// //               );
// //             })}
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
// // // "use client";
// // // import Link from "next/link";
// // // import { useAuth } from "@/hooks/useAuth";
// // // import { supabaseClient } from "@/lib/auth";
// // // import { ThemeToggle } from "@/components/ThemeToggle";
// // // import { navLinks, navStyles } from "@/data/navbarConfig";

// // // export function Navbar() {
// // // 	const { isAuthenticated } = useAuth();

// // // 	return (
// // // 		<nav className={navStyles.base}>
// // // 			<div className={navStyles.container}>
// // // 				<div className={navStyles.inner}>
// // // 					<Link href={navLinks.brand.href} className={navStyles.brand}>
// // // 						{navLinks.brand.label}
// // // 					</Link>
// // // 					<div className="flex items-center space-x-8">
// // // 						{navLinks.mainLinks.map((link) => {
// // // 							if ("authRequired" in link && link.authRequired && !isAuthenticated) {
// // // 								return null;
// // // 							}
// // // 							return (
// // // 								<Link key={link.href} href={link.href} className={navStyles.link}>
// // // 									{link.label}
// // // 								</Link>
// // // 							);
// // // 						})}
// // // 						<ThemeToggle />
// // // 						{isAuthenticated ? (
// // // 							<button onClick={() => supabaseClient.auth.signOut()} className={navStyles.button}>
// // // 								{navLinks.authLinks.signOut.label}
// // // 							</button>
// // // 						) : (
// // // 							<button
// // // 								onClick={() =>
// // // 									supabaseClient.auth.signInWithOAuth({
// // // 										provider: "github",
// // // 										options: { redirectTo: `${window.location.origin}/auth/callback` },
// // // 									})
// // // 								}
// // // 								className={navStyles.button}
// // // 							>
// // // 								{navLinks.authLinks.signIn.label}
// // // 							</button>
// // // 						)}
// // // 					</div>
// // // 				</div>
// // // 			</div>
// // // 		</nav>
// // // 	);
// // // }

// // // // // src/components/Navbar.tsx
// // // // 'use client'
// // // // import Link from 'next/link'
// // // // import { useAuth } from '@/hooks/useAuth'
// // // // import { supabaseClient } from '@/lib/auth'
// // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // export function Navbar() {
// // // //   const { user, isAuthenticated } = useAuth()

// // // //   return (
// // // //     <nav className={navStyles.base}>
// // // //       <div className={navStyles.container}>
// // // //         <div className={navStyles.inner}>
// // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // //             {navLinks.brand.label}
// // // //           </Link>
// // // //           <div className="flex items-center space-x-8">
// // // //             {navLinks.mainLinks.map(link => (
// // // //               !link.authRequired || isAuthenticated ? (
// // // //                 <Link
// // // //                   key={link.href}
// // // //                   href={link.href}
// // // //                   className={navStyles.link}
// // // //                 >
// // // //                   {link.label}
// // // //                 </Link>
// // // //               ) : null
// // // //             ))}
// // // //             <ThemeToggle />
// // // //             {isAuthenticated ? (
// // // //               <button
// // // //                 onClick={() => supabaseClient.auth.signOut()}
// // // //                 className={navStyles.button}
// // // //               >
// // // //                 {navLinks.authLinks.signOut.label}
// // // //               </button>
// // // //             ) : (
// // // //               <button
// // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // //                   provider: 'github',
// // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // //                 })}
// // // //                 className={navStyles.button}
// // // //               >
// // // //                 {navLinks.authLinks.signIn.label}
// // // //               </button>
// // // //             )}
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
// // // // // import { useTheme } from '@/hooks/useTheme'

// // // // // export function Navbar() {
// // // // //   const { isAuthenticated } = useAuth()
// // // // //   const { theme, toggleTheme } = useTheme()

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

// // // // //             {isAuthenticated && (
// // // // //               <Link href="/blog/new" className={navStyles.link}>New Post</Link>
// // // // //             )}

// // // // //             <button
// // // // //               onClick={toggleTheme}
// // // // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // // // //               aria-label="Toggle theme"
// // // // //             >
// // // // //               {theme === 'dark' ?
// // // // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // // // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // // // //               }
// // // // //             </button>

// // // // //             <ClientOnly>
// // // // //               {isAuthenticated ? (
// // // // //                 <button onClick={handleSignOut} className={navStyles.button}>
// // // // //                   {navLinks.authLinks.signOut.label}
// // // // //                 </button>
// // // // //               ) : (
// // // // //                 <button onClick={handleSignIn} className={navStyles.button}>
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
// // // // // // import { Sun, Moon } from 'lucide-react'
// // // // // // import { useState, useEffect } from 'react'

// // // // // // export function Navbar() {
// // // // // //   const { isAuthenticated } = useAuth()
// // // // // //   const [isDarkMode, setIsDarkMode] = useState(false)

// // // // // //   useEffect(() => {
// // // // // //     const isDark = document.documentElement.classList.contains('dark')
// // // // // //     setIsDarkMode(isDark)
// // // // // //   }, [])

// // // // // //   const toggleTheme = () => {
// // // // // //     document.documentElement.classList.toggle('dark')
// // // // // //     setIsDarkMode(!isDarkMode)
// // // // // //     localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
// // // // // //   }

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
// // // // // //             <Link href="/blog" className={navStyles.link}>Blog</Link>

// // // // // //             {isAuthenticated && (
// // // // // //               <Link href="/blog/new" className={navStyles.link}>New Post</Link>
// // // // // //             )}

// // // // // //             <button
// // // // // //               onClick={toggleTheme}
// // // // // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // // // // //               aria-label="Toggle theme"
// // // // // //             >
// // // // // //               {isDarkMode ?
// // // // // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // // // // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // // // // //               }
// // // // // //             </button>

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
// // // // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'
// // // // // // // import { Sun, Moon } from 'lucide-react'
// // // // // // // import { useState, useEffect } from 'react'

// // // // // // // export function Navbar() {
// // // // // // //   const { isAuthenticated } = useAuth()
// // // // // // //   const [isDarkMode, setIsDarkMode] = useState(false)

// // // // // // //   useEffect(() => {
// // // // // // //     const isDark = document.documentElement.classList.contains('dark')
// // // // // // //     setIsDarkMode(isDark)
// // // // // // //   }, [])

// // // // // // //   const toggleTheme = () => {
// // // // // // //     document.documentElement.classList.toggle('dark')
// // // // // // //     setIsDarkMode(!isDarkMode)
// // // // // // //     localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
// // // // // // //   }

// // // // // // //   const handleSignIn = () => {
// // // // // // //     supabaseClient.auth.signInWithOAuth({
// // // // // // //       provider: 'github',
// // // // // // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // //     })
// // // // // // //   }

// // // // // // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // // // // // //   return (
// // // // // // //     <nav className={navStyles.base}>
// // // // // // //       <div className={navStyles.container}>
// // // // // // //         <div className={navStyles.inner}>
// // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // //             {navLinks.brand.label}
// // // // // // //           </Link>

// // // // // // //           <div className="flex items-center space-x-8">
// // // // // // //             <Link href="/blog" className={navStyles.link}>Blog</Link>

// // // // // // //             <button
// // // // // // //               onClick={toggleTheme}
// // // // // // //               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
// // // // // // //               aria-label="Toggle theme"
// // // // // // //             >
// // // // // // //               {isDarkMode ?
// // // // // // //                 <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> :
// // // // // // //                 <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
// // // // // // //               }
// // // // // // //             </button>

// // // // // // //             <ClientOnly>
// // // // // // //               {isAuthenticated ? (
// // // // // // //                 <button
// // // // // // //                   onClick={handleSignOut}
// // // // // // //                   className={navStyles.button}
// // // // // // //                 >
// // // // // // //                   {navLinks.authLinks.signOut.label}
// // // // // // //                 </button>
// // // // // // //               ) : (
// // // // // // //                 <button
// // // // // // //                   onClick={handleSignIn}
// // // // // // //                   className={navStyles.button}
// // // // // // //                 >
// // // // // // //                   {navLinks.authLinks.signIn.label}
// // // // // // //                 </button>
// // // // // // //               )}
// // // // // // //             </ClientOnly>
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
// // // // // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // // // export function Navbar() {
// // // // // // // //   const { isAuthenticated } = useAuth()

// // // // // // // //   const handleSignIn = () => {
// // // // // // // //     supabaseClient.auth.signInWithOAuth({
// // // // // // // //       provider: 'github',
// // // // // // // //       options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // //     })
// // // // // // // //   }

// // // // // // // //   const handleSignOut = () => supabaseClient.auth.signOut()

// // // // // // // //   return (
// // // // // // // //     <nav className={navStyles.base}>
// // // // // // // //       <div className={navStyles.container}>
// // // // // // // //         <div className={navStyles.inner}>
// // // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // // //             {navLinks.brand.label}
// // // // // // // //           </Link>

// // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // //             {navLinks.mainLinks.map((link) => {
// // // // // // // //               if (link.authRequired && !isAuthenticated) return null;
// // // // // // // //               return (
// // // // // // // //                 <Link
// // // // // // // //                   key={link.href}
// // // // // // // //                   href={link.href}
// // // // // // // //                   className={navStyles.link}
// // // // // // // //                 >
// // // // // // // //                   {link.label}
// // // // // // // //                 </Link>
// // // // // // // //               );
// // // // // // // //             })}

// // // // // // // //             <ClientOnly>
// // // // // // // //               {isAuthenticated ? (
// // // // // // // //                 <button
// // // // // // // //                   onClick={handleSignOut}
// // // // // // // //                   className={navStyles.button}
// // // // // // // //                 >
// // // // // // // //                   {navLinks.authLinks.signOut.label}
// // // // // // // //                 </button>
// // // // // // // //               ) : (
// // // // // // // //                 <button
// // // // // // // //                   onClick={handleSignIn}
// // // // // // // //                   className={navStyles.button}
// // // // // // // //                 >
// // // // // // // //                   {navLinks.authLinks.signIn.label}
// // // // // // // //                 </button>
// // // // // // // //               )}
// // // // // // // //             </ClientOnly>
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
// // // // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // // // // export function Navbar() {
// // // // // // // // //    const { isAuthenticated } = useAuth();

// // // // // // // // //   return (
// // // // // // // // //     <nav className={navStyles.base}>
// // // // // // // // //       <div className={navStyles.container}>
// // // // // // // // //         <div className={navStyles.inner}>
// // // // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // // // //             {navLinks.brand.label}
// // // // // // // // //           </Link>
// // // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // // //             {navLinks.mainLinks.map(link => (
// // // // // // // // //               !link.authRequired || isAuthenticated ? (
// // // // // // // // //                 <Link
// // // // // // // // //                   key={link.href}
// // // // // // // // //                   href={link.href}
// // // // // // // // //                   className={navStyles.link}
// // // // // // // // //                 >
// // // // // // // // //                   {link.label}
// // // // // // // // //                 </Link>
// // // // // // // // //               ) : null
// // // // // // // // //             ))}
// // // // // // // // //             <ThemeToggle />
// // // // // // // // //             {isAuthenticated ? (
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // //                 className={navStyles.button}
// // // // // // // // //               >
// // // // // // // // //                 {navLinks.authLinks.signOut.label}
// // // // // // // // //               </button>
// // // // // // // // //             ) : (
// // // // // // // // //               <button
// // // // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // //                   provider: 'github',
// // // // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // //                 })}
// // // // // // // // //                 className={navStyles.button}
// // // // // // // // //               >
// // // // // // // // //                 {navLinks.authLinks.signIn.label}
// // // // // // // // //               </button>
// // // // // // // // //             )}
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </nav>
// // // // // // // // //   )
// // // // // // // // // }

// // // // // // // // // // // src/components/Navbar.tsx
// // // // // // // // // // 'use client'
// // // // // // // // // // import Link from 'next/link'
// // // // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // // // // // // // import { navLinks, navStyles } from '@/data/navbarConfig'

// // // // // // // // // // export function Navbar() {
// // // // // // // // // //   const { user, isAuthenticated } = useAuth()

// // // // // // // // // //   return (
// // // // // // // // // //     <nav className={navStyles.base}>
// // // // // // // // // //       <div className={navStyles.container}>
// // // // // // // // // //         <div className={navStyles.inner}>
// // // // // // // // // //           <Link href={navLinks.brand.href} className={navStyles.brand}>
// // // // // // // // // //             {navLinks.brand.label}
// // // // // // // // // //           </Link>
// // // // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // // // //             {navLinks.mainLinks.map(link => (
// // // // // // // // // //               !link.authRequired || isAuthenticated ? (
// // // // // // // // // //                 <Link
// // // // // // // // // //                   key={link.href}
// // // // // // // // // //                   href={link.href}
// // // // // // // // // //                   className={navStyles.link}
// // // // // // // // // //                 >
// // // // // // // // // //                   {link.label}
// // // // // // // // // //                 </Link>
// // // // // // // // // //               ) : null
// // // // // // // // // //             ))}
// // // // // // // // // //             <ThemeToggle />
// // // // // // // // // //             {isAuthenticated ? (
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // // //                 className={navStyles.button}
// // // // // // // // // //               >
// // // // // // // // // //                 {navLinks.authLinks.signOut.label}
// // // // // // // // // //               </button>
// // // // // // // // // //             ) : (
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // // //                   provider: 'github',
// // // // // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // // //                 })}
// // // // // // // // // //                 className={navStyles.button}
// // // // // // // // // //               >
// // // // // // // // // //                 {navLinks.authLinks.signIn.label}
// // // // // // // // // //               </button>
// // // // // // // // // //             )}
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </nav>
// // // // // // // // // //   )
// // // // // // // // // // }

// // // // // // // // // // // // src/components/Navbar.tsx
// // // // // // // // // // // 'use client'
// // // // // // // // // // // import Link from 'next/link'
// // // // // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'
// // // // // // // // // // // import { useTheme } from '@/contexts/ThemeContext'

// // // // // // // // // // // export function Navbar() {
// // // // // // // // // // //   const { user, isAuthenticated } = useAuth()
// // // // // // // // // // //   const { isDark } = useTheme()

// // // // // // // // // // //   return (
// // // // // // // // // // //     <nav className={`${
// // // // // // // // // // //       isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
// // // // // // // // // // //     } shadow-sm transition-colors`}>
// // // // // // // // // // //       <div className="container mx-auto px-4">
// // // // // // // // // // //         <div className="flex justify-between h-16">
// // // // // // // // // // //           <Link href="/" className="flex items-center font-bold text-xl">
// // // // // // // // // // //             My Blog
// // // // // // // // // // //           </Link>
// // // // // // // // // // //           <div className="flex items-center space-x-8">
// // // // // // // // // // //             <Link href="/blog" className="hover:text-gray-600 dark:hover:text-gray-300">
// // // // // // // // // // //               Blog
// // // // // // // // // // //             </Link>
// // // // // // // // // // //             <ThemeToggle />
// // // // // // // // // // //             {isAuthenticated ? (
// // // // // // // // // // //               <>
// // // // // // // // // // //                 <Link href="/blog/new" className="hover:text-gray-600 dark:hover:text-gray-300">
// // // // // // // // // // //                   New Post
// // // // // // // // // // //                 </Link>
// // // // // // // // // // //                 <button
// // // // // // // // // // //                   onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // // // //                   className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // // //                 >
// // // // // // // // // // //                   Sign Out
// // // // // // // // // // //                 </button>
// // // // // // // // // // //               </>
// // // // // // // // // // //             ) : (
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // // // //                   provider: 'github',
// // // // // // // // // // //                   options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // // // //                 })}
// // // // // // // // // // //                 className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // // //               >
// // // // // // // // // // //                 Sign In
// // // // // // // // // // //               </button>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </nav>
// // // // // // // // // // //   )
// // // // // // // // // // // }

// // // // // // // // // // // // // src/components/Navbar.tsx - Updated to use ClientOnly
// // // // // // // // // // // // 'use client'
// // // // // // // // // // // // import Link from 'next/link'
// // // // // // // // // // // // import { useAuth } from '@/hooks/useAuth'
// // // // // // // // // // // // import { supabaseClient } from '@/lib/auth'
// // // // // // // // // // // // import { ClientOnly } from '@/components/ClientOnly'
// // // // // // // // // // // // import { ThemeToggle } from '@/components/ThemeToggle'

// // // // // // // // // // // // export function Navbar() {
// // // // // // // // // // // //   const { user, isAuthenticated } = useAuth()

// // // // // // // // // // // //   return (
// // // // // // // // // // // //    //  <nav className="bg-white shadow-sm">
// // // // // // // // // // // //     <nav className="bg-white dark:bg-dark-primary shadow-sm transition-colors duration-200">
// // // // // // // // // // // //       <div className="container mx-auto px-4">
// // // // // // // // // // // //         <div className="flex justify-between h-16">
// // // // // // // // // // // //           <Link href="/" className="flex items-center font-bold text-xl">
// // // // // // // // // // // //             My Blog
// // // // // // // // // // // //           </Link>
// // // // // // // // // // // //           <ClientOnly>
// // // // // // // // // // // //             <div className="flex items-center space-x-8">
// // // // // // // // // // // //               <Link href="/blog" className="hover:text-gray-600">Blog</Link>
// // // // // // // // // // // //               <ThemeToggle />
// // // // // // // // // // // //               {isAuthenticated ? (
// // // // // // // // // // // //                 <>
// // // // // // // // // // // //                   <Link href="/blog/new" className="hover:text-gray-600">New Post</Link>
// // // // // // // // // // // //                   <button
// // // // // // // // // // // //                     onClick={() => supabaseClient.auth.signOut()}
// // // // // // // // // // // //                     className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // // // //                   >
// // // // // // // // // // // //                     Sign Out
// // // // // // // // // // // //                   </button>
// // // // // // // // // // // //                 </>
// // // // // // // // // // // //               ) : (
// // // // // // // // // // // //                 <button
// // // // // // // // // // // //                   onClick={() => supabaseClient.auth.signInWithOAuth({
// // // // // // // // // // // //                     provider: 'github',
// // // // // // // // // // // //                     options: { redirectTo: `${window.location.origin}/auth/callback` }
// // // // // // // // // // // //                   })}
// // // // // // // // // // // //                   className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
// // // // // // // // // // // //                 >
// // // // // // // // // // // //                   Sign In
// // // // // // // // // // // //                 </button>
// // // // // // // // // // // //               )}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </ClientOnly>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </nav>
// // // // // // // // // // // //   )
// // // // // // // // // // // // }

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

type PostType = 'markdown' | 'component';

type FormData = {
  title: string;
  content: string;
  excerpt: string;
  cover_image: string;
  category: CategoryId;
  type: PostType;
  component_name?: string;
  props?: string;
};

export function PostForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    excerpt: "",
    cover_image: "",
    category: "tech" as CategoryId,
    type: "markdown",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saveAsDraft, setSaveAsDraft] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   if (!user) {
     setError("User not authenticated");
     return;
   }

   setIsSubmitting(true);
   setError("");

   try {
     const slug = formData.title
       .toLowerCase()
       .trim()
       .replace(/[^a-z0-9]+/g, "-")
       .replace(/(^-|-$)+/g, "");

     // Prepare the base post data
     const basePostData = {
       title: formData.title,
       slug,
       excerpt: formData.excerpt,
       cover_image: formData.cover_image,
       category: formData.category,
       published: !saveAsDraft,
       author_id: user.id,
     };

     // Add type-specific data
     const postData = formData.type === 'markdown'
       ? {
           ...basePostData,
           content: formData.content,
           type: 'markdown' as const
         }
       : {
           ...basePostData,
           content: '', // Empty content for component posts
           type: 'component' as const,
           component_name: formData.component_name || '',
           component_props: formData.props ? JSON.stringify(formData.props) : '{}'
         };

     // Log the data being sent
     console.log('Sending post data:', postData);

     // Create the post
     const { data, error: postError } = await supabaseClient
       .from("posts")
       .insert([postData])
       .select()
       .single();

     if (postError) {
       console.error('Supabase error:', postError);
       throw new Error(postError.message);
     }

     if (!data) {
       throw new Error('No data returned from insert');
     }

     console.log('Post created successfully:', data);

     // Navigate and refresh
     router.push(saveAsDraft ? "/blog/drafts" : "/blog");
     router.refresh();
   } catch (err) {
     console.error("Error details:", {
       name: err?.name,
       message: err?.message,
       stack: err?.stack,
       error: err
     });

     if (err instanceof Error) {
       setError(err.message);
     } else {
       setError("Failed to create post. Please check the console for details.");
     }
   } finally {
     setIsSubmitting(false);
   }
 };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;

//     setIsSubmitting(true);
//     setError("");

//     try {
//       const slug = formData.title
//         .toLowerCase()
//         .trim()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)+/g, "");

//       let postData = {
//         title: formData.title,
//         slug,
//         excerpt: formData.excerpt,
//         cover_image: formData.cover_image,
//         category: formData.category,
//         published: !saveAsDraft,
//         author_id: user.id,
//         type: formData.type
//       };

//       // Add type-specific fields
//       if (formData.type === 'markdown') {
//         postData = {
//           ...postData,
//           content: formData.content
//         };
//       } else {
//         postData = {
//           ...postData,
//           component_name: formData.component_name || '',
//           props: formData.props ? JSON.parse(formData.props) : {},
//           content: '' // Empty content for component posts
//         };
//       }

//       const { data, error: postError } = await supabaseClient
//         .from("posts")
//         .insert([postData])
//         .select();

//       if (postError) throw postError;

//       router.push(saveAsDraft ? "/blog/drafts" : "/blog");
//       router.refresh();
//     } catch (err) {
//       console.error("Error creating post:", err);
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("Failed to create post");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Post Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            type: e.target.value as PostType
          }))}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
        >
          <option value="markdown">Markdown</option>
          <option value="component">React Component</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            title: e.target.value
          }))}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            category: e.target.value as CategoryId
          }))}
          className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Image</label>
        <ImageUpload
          onUploadComplete={(url) => setFormData(prev => ({
            ...prev,
            cover_image: url
          }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Excerpt</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            excerpt: e.target.value
          }))}
          className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
        />
      </div>

      {formData.type === 'markdown' ? (
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <RichMarkdownEditor
              initialContent={formData.content}
              onChange={(content) => setFormData(prev => ({
                ...prev,
                content
              }))}
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Component Name</label>
            <input
              type="text"
              value={formData.component_name || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                component_name: e.target.value
              }))}
              className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100"
              placeholder="e.g., InteractiveCounterPost"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Component Props (JSON)
            </label>
            <textarea
              value={formData.props || '{}'}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                props: e.target.value
              }))}
              className="w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100"
              placeholder="{}"
            />
          </div>
        </>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && (
            <Loader2 className="animate-spin" size={16} />
          )}
          {isSubmitting ? "Saving..." : saveAsDraft ? "Save Draft" : "Publish"}
        </button>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={saveAsDraft}
            onChange={(e) => setSaveAsDraft(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span>Save as draft</span>
        </label>
      </div>
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
// 	const [saveAsDraft, setSaveAsDraft] = useState(false);
// 	// Multiple post templates
// 	const [postType, setPostType] = useState<"markdown" | "component">("markdown");
// 	const [componentName, setComponentName] = useState("");
// 	const [componentProps, setComponentProps] = useState("{}");

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

// 			// Add logging
// 			console.log("Saving post with data:", {
// 				...formData,
// 				slug,
// 				published: !saveAsDraft,
// 				author_id: user.id,
// 			});

// 			const { data, error: postError } = await supabaseClient
// 				.from("posts")
// 				.insert([
// 					{
// 						...formData,
// 						slug,
// 						published: !saveAsDraft,
// 						author_id: user.id,
// 					},
// 				])
// 				.select();

// 			console.log("Save response:", { data, error: postError });

// 			if (postError) throw postError;

// 			router.push(saveAsDraft ? "/blog/drafts" : "/blog");
// 			router.refresh();
// 		} catch (err) {
// 			console.error("Error:", err);
// 			setError(err instanceof Error ? err.message : "Failed to create post");
// 		} finally {
// 			setIsSubmitting(false);
// 		}
// 	};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<div>
// 				<label>Post Type</label>
// 				<select
// 					value={postType}
// 					onChange={(e) => setPostType(e.target.value as "markdown" | "component")}
// 				>
// 					<option value='markdown'>Markdown</option>
// 					<option value='component'>React Component</option>
// 				</select>
// 			</div>

// 			{postType === "markdown" ? (
// 				<RichMarkdownEditor
// 					initialContent={formData.content}
// 					onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// 				/>
// 			) : (
// 				<>
// 					<div>
// 						<label>Component Name</label>
// 						<input
// 							type='text'
// 							value={componentName}
// 							onChange={(e) => setComponentName(e.target.value)}
// 							placeholder='e.g., InteractiveChart'
// 						/>
// 					</div>
// 					<div>
// 						<label>Component Props (JSON)</label>
// 						<textarea
// 							value={componentProps}
// 							onChange={(e) => setComponentProps(e.target.value)}
// 							placeholder='{"data": [], "config": {}}'
// 						/>
// 					</div>
// 				</>
// 			)}
// 		</form>

// 		// <form
// 		// 	onSubmit={handleSubmit}
// 		// 	className='space-y-6'
// 		//    >
// 		// 	{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

// 		// 	<div>
// 		// 		<label className='block text-sm font-medium mb-2'>Title</label>
// 		// 		<input
// 		// 			type='text'
// 		// 			value={formData.title}
// 		// 			onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
// 		// 			className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// 		// 			required
// 		// 		/>
// 		// 	</div>

// 		// 	<div>
// 		// 		<label className='block text-sm font-medium mb-2'>Category</label>
// 		// 		<select
// 		// 			value={formData.category}
// 		// 			onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as CategoryId }))}
// 		// 			className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
// 		// 			required
// 		// 		>
// 		// 			{categories.map((category) => (
// 		// 				<option
// 		// 					key={category.id}
// 		// 					value={category.id}
// 		// 				>
// 		// 					{category.name}
// 		// 				</option>
// 		// 			))}
// 		// 		</select>
// 		// 	</div>

// 		// 	<div>
// 		// 		<label className='block text-sm font-medium mb-2'>Cover Image</label>
// 		// 		<ImageUpload onUploadComplete={(url) => setFormData((prev) => ({ ...prev, cover_image: url }))} />
// 		// 	</div>

// 		// 	<div>
// 		// 		<label className='block text-sm font-medium mb-2'>Excerpt</label>
// 		// 		<textarea
// 		// 			value={formData.excerpt}
// 		// 			onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
// 		// 			className='w-full p-2 border rounded h-[700px] bg-gray-800 border-gray-700 text-gray-100'
// 		// 		/>
// 		// 	</div>

// 		// 	<div>
// 		// 		<label className='block text-sm font-medium mb-2'>Content</label>
// 		// 		<div className='border border-gray-700 rounded-lg overflow-hidden'>
// 		// 			<RichMarkdownEditor
// 		// 				initialContent={formData.content}
// 		// 				onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
// 		// 			/>
// 		// 		</div>
// 		// 	</div>

// 		// 	<button
// 		// 		type='submit'
// 		// 		disabled={isSubmitting}
// 		// 		className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// 		// 	>
// 		// 		{isSubmitting && (
// 		// 			<Loader2
// 		// 				className='animate-spin'
// 		// 				size={16}
// 		// 			/>
// 		// 		)}
// 		// 		{isSubmitting ? "Creating..." : "Create Post"}
// 		// 	</button>
// 		// 	{/* Save as Draft */}
// 		// 	<div className='flex items-center gap-4'>
// 		// 		<button
// 		// 			type='submit'
// 		// 			disabled={isSubmitting}
// 		// 			className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'
// 		// 		>
// 		// 			{isSubmitting && (
// 		// 				<Loader2
// 		// 					className='animate-spin'
// 		// 					size={16}
// 		// 				/>
// 		// 			)}
// 		// 			{isSubmitting ? "Saving..." : saveAsDraft ? "Save Draft" : "Publish"}
// 		// 		</button>

// 		// 		<label className='flex items-center gap-2'>
// 		// 			<input
// 		// 				type='checkbox'
// 		// 				checked={saveAsDraft}
// 		// 				onChange={(e) => setSaveAsDraft(e.target.checked)}
// 		// 				className='rounded border-gray-300'
// 		// 			/>
// 		// 			<span>Save as draft</span>
// 		// 		</label>
// 		// 	</div>
// 		// </form>
// 	);
// }

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
"use client";
import { useState, useRef } from "react";
import { supabaseClient } from "@/lib/auth";
import { Upload, Image as ImageIcon, Loader2, Bold, Italic, Heading, List, ListOrdered, Link as LinkIcon, Quote, Code, Minus, AlertCircle } from "lucide-react";

interface EditorProps {
	initialContent: string;
	onChange: (content: string) => void;
}

type FormatAction = {
	icon: typeof Bold;
	label: string;
	prefix: string;
	suffix: string;
	block?: boolean;
};

export function RichMarkdownEditor({ initialContent, onChange }: EditorProps) {
	const [content, setContent] = useState(initialContent);
	const [isUploading, setIsUploading] = useState(false);
	const [dragActive, setDragActive] = useState(false);
	const [showHelp, setShowHelp] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const formatActions: FormatAction[] = [
		{ icon: Bold, label: "Bold", prefix: "**", suffix: "**" },
		{ icon: Italic, label: "Italic", prefix: "_", suffix: "_" },
		{ icon: Heading, label: "Heading", prefix: "## ", suffix: "", block: true },
		{ icon: List, label: "Bullet List", prefix: "- ", suffix: "", block: true },
		{ icon: ListOrdered, label: "Numbered List", prefix: "1. ", suffix: "", block: true },
		{ icon: LinkIcon, label: "Link", prefix: "[", suffix: "](url)" },
		{ icon: Quote, label: "Quote", prefix: "> ", suffix: "", block: true },
		{ icon: Code, label: "Code", prefix: "\`\`\`\n", suffix: "\n\`\`\`", block: true },
		{ icon: Minus, label: "Horizontal Rule", prefix: "\n---\n", suffix: "", block: true },
	];

	const insertTextAtCursor = (prefix: string, suffix: string = "", block: boolean = false) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = content.substring(start, end);

		let newText = "";
		if (block) {
			// For block-level elements, ensure we're starting on a new line
			const beforeSelection = content.substring(0, start);
			const needsNewLine = beforeSelection.length > 0 && !beforeSelection.endsWith("\n");
			newText = (needsNewLine ? "\n" : "") + prefix + selectedText + suffix;
		} else {
			newText = prefix + selectedText + suffix;
		}

		const newContent = content.substring(0, start) + newText + content.substring(end);

		setContent(newContent);
		onChange(newContent);

		// Reset cursor position
		const newCursorPos = block ? start + prefix.length + selectedText.length + suffix.length : start + prefix.length + (selectedText.length || suffix.length);

		setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(newCursorPos, newCursorPos);
		}, 0);
	};

	const handleImageUpload = async (file: File) => {
		if (!file.type.startsWith("image/")) {
			alert("Please select an image file");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			alert("Image must be less than 5MB");
			return;
		}

		setIsUploading(true);

		try {
			const fileExt = file.name.split(".").pop();
			const fileName = `${Date.now()}.${fileExt}`;

			const { error: uploadError, data } = await supabaseClient.storage.from("images").upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
			});

			if (uploadError) throw uploadError;

			const {
				data: { publicUrl },
			} = supabaseClient.storage.from("images").getPublicUrl(fileName);

			insertTextAtCursor(`\n![${file.name}](${publicUrl})\n`);
		} catch (err) {
			console.error("Upload error:", err);
			alert("Failed to upload image");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className='relative'>
			{/* Toolbar */}
			<div className='flex flex-wrap items-center gap-1 p-2 border-b border-gray-700 bg-gray-800'>
				{formatActions.map((action) => (
					<button
						key={action.label}
						type='button'
						onClick={() => insertTextAtCursor(action.prefix, action.suffix, action.block)}
						className='p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded'
						title={action.label}
					>
						<action.icon size={18} />
					</button>
				))}
				<div className='w-px h-6 bg-gray-700 mx-1' />
				<button
					type='button'
					onClick={() => fileInputRef.current?.click()}
					className='p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded'
					disabled={isUploading}
					title='Upload Image'
				>
					{isUploading ? (
						<Loader2
							className='animate-spin'
							size={18}
						/>
					) : (
						<ImageIcon size={18} />
					)}
				</button>
				<button
					type='button'
					onClick={() => setShowHelp((prev) => !prev)}
					className='p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded ml-auto'
					title='Markdown Help'
				>
					<AlertCircle size={18} />
				</button>
			</div>

			{/* Help Modal */}
			{showHelp && (
				<div className='absolute right-0 top-12 w-64 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10'>
					<h3 className='font-medium mb-2'>Markdown Shortcuts</h3>
					<div className='space-y-1 text-sm text-gray-300'>
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
				className={`relative ${dragActive ? "bg-blue-500/10" : ""}`}
				onDragOver={(e) => {
					e.preventDefault();
					setDragActive(true);
				}}
				onDragLeave={() => setDragActive(false)}
				onDrop={(e) => {
					e.preventDefault();
					setDragActive(false);
					const file = e.dataTransfer.files[0];
					if (file) handleImageUpload(file);
				}}
			>
				<textarea
					ref={textareaRef}
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
						onChange(e.target.value);
					}}
					onPaste={(e) => {
						const items = e.clipboardData.items;
						for (const item of items) {
							if (item.type.startsWith("image/")) {
								e.preventDefault();
								const file = item.getAsFile();
								if (file) handleImageUpload(file);
								break;
							}
						}
					}}
					className='w-full min-h-[900px] p-4 bg-gray-800 text-gray-100 font-mono text-sm resize-y focus:outline-none'
					placeholder='Write your content here... You can drag & drop images or paste them directly!'
				/>
			</div>

			{/* Hidden file input */}
			<input
				ref={fileInputRef}
				type='file'
				className='hidden'
				accept='image/*'
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (file) handleImageUpload(file);
				}}
			/>
		</div>
	);
}

```

# src/components/StagingArea.tsx

```tsx
// src/components/StagingArea.tsx
"use client";
import React, { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import { categories } from "@/data/categories";

// const StagingArea = () => {
export default function StagingArea() {
	const [draftPosts, setDraftPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		loadDrafts();
	}, []);

	const loadDrafts = async () => {
		try {
			const { data, error } = await supabaseClient.from("posts").select("*").eq("published", false).order("updated_at", { ascending: false });

			console.log("Drafts data:", data); // Add this log
			console.log("Error if any:", error); // Add this log

			if (error) throw error;
			setDraftPosts(data || []);
		} catch (err) {
			console.error("Error loading drafts:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const publishPost = async (postId) => {
		try {
			const { error } = await supabaseClient.from("posts").update({ published: true, updated_at: new Date().toISOString() }).eq("id", postId);

			if (error) throw error;
			loadDrafts();
			router.refresh();
		} catch (err) {
			console.error("Error publishing post:", err);
		}
	};

	const deletePost = async (postId) => {
		if (!window.confirm("Are you sure you want to delete this draft?")) return;

		try {
			const { error } = await supabaseClient.from("posts").delete().eq("id", postId);

			if (error) throw error;
			loadDrafts();
		} catch (err) {
			console.error("Error deleting post:", err);
		}
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-32'>
				<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500'></div>
			</div>
		);
	}

	return (
		<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-6'>
			<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>Draft Posts</h2>

			{draftPosts.length === 0 ? (
				<p className='text-gray-600 dark:text-gray-400'>No draft posts available.</p>
			) : (
				<div className='space-y-4'>
					{draftPosts.map((post) => (
						<div
							key={post.id}
							className='flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm'
						>
							<div className='flex-1'>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>{post.title}</h3>
								<div className='flex items-center gap-4'>
									<span className='text-sm text-gray-600 dark:text-gray-400'>Last updated: {new Date(post.updated_at).toLocaleDateString()}</span>
									<span className={`text-sm px-2 py-1 rounded-full ${categories.find((c) => c.id === post.category)?.color || "bg-gray-200 dark:bg-gray-600"}`}>{categories.find((c) => c.id === post.category)?.name || "Uncategorized"}</span>
								</div>
							</div>

							<div className='flex items-center gap-3'>
								<Link
									href={`/blog/${post.slug}?preview=true`}
									className='p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
								>
									<Eye size={20} />
								</Link>
								<Link
									href={`/blog/edit/${post.slug}`}
									className='p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
								>
									<Edit size={20} />
								</Link>
								<button
									onClick={() => publishPost(post.id)}
									className='p-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
									title='Publish post'
								>
									<CheckCircle size={20} />
								</button>
								<button
									onClick={() => deletePost(post.id)}
									className='p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
									title='Delete draft'
								>
									<Trash2 size={20} />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

// export default StagingArea;

```

# src/components/ThemeToggle.tsx

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
			className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
			aria-label='Toggle theme'
		>
			{isDark ? <Sun className='h-5 w-5 text-yellow-500' /> : <Moon className='h-5 w-5 text-gray-700' />}
		</button>
	);
}

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
      name: 'Visual Media',
      icon: Newspaper,
      description: 'In this section, I share my experiences working on creative projects like video editing with DaVinci Resolve, creating simple animations, designing clean static layouts, and developing intros for corporate presentations. It’s a place to explore the practical side of visual storytelling and design.'
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
      description: 'Personal reflections, experiences, and life lessons. In this section, I share my thoughts, experiences, and lessons I’ve learned along the way. It’s a place for personal stories and reflections on everyday life, offering a glimpse into my journey and the moments that matter most to me.'
   }
] as const;

export type CategoryId = typeof categories[number]['id'];

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
      logo: '/assets/GD-Fusion-logo.png'
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
      },
      {
         href: '/blog/drafts',
         label: 'Drafts',
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
   base: "bg-white dark:bg-gray-900 shadow-lg transition-colors",
   // container: "container mx-auto px-4",
   container: "max-w-page mx-auto px-4",
   inner: "flex justify-between h-16",
   brand: "flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white",
   link: "hover:text-gray-600 dark:hover:text-gray-300",
   button: "bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
} as const;

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
   category: CategoryId
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
   },

   // Delete post
   async deletePost(id: string) {
      const { error } = await supabase
         .from('posts')
         .delete()
         .eq('id', id)

      if (error) throw error

      // Call revalidation endpoint
      const res = await fetch('/api/revalidate', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ path: '/blog' })
      })

      if (!res.ok) {
         throw new Error('Failed to revalidate cache')
      }

      return true
   }
}

```

# src/lib/theme-config.ts

```ts
//src/lib/theme-config.ts : used for portfolio-theme.ts

// Add Styled Components declaration
// declare module 'styled-components' {
//    export interface DefaultTheme extends Theme { }
// }

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
   matcher: ['/blog/new', '/blog/drafts']
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
import typography from "@tailwindcss/typography";

export default {
   darkMode: "class",
   content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      extend: {
         maxWidth: {
            'page': 'var(--page-width)',
         },
         fontFamily: {
            baskerville: ["var(--font-baskerville)", "serif"],
            opensans: ["var(--font-opensans)", "system-ui", "sans-serif"],
         },
         colors: {
            primary: {
               50: '#ecffff',
               100: '#ceffff',
               200: '#a3fbfe',
               300: '#64f6fc',
               400: '#1ee6f2',
               500: '#02cad8',
               600: '#04a1b6',
               700: '#0c899d',
               800: '#136777',
               900: '#145565',
               950: '#073945',
               // 50: "#f6f4fe",
               // 100: "#efecfb",
               // 200: "#dfdbf9",
               // 300: "#c7bef4",
               // 400: "#ab99ec",
               // 500: "#8e6fe3",
               // 600: "#8459d9",
               // 700: "#6e3ec3",
               // 800: "#5b33a4",
               // 900: "#4c2c86",
               // 950: "#2f1a5b",
            },
            secondary: {
               50: '#fff1fe',
               100: '#ffe1fe',
               200: '#ffc3fd',
               300: '#ff94f8',
               400: '#ff54f4',
               500: '#ff16f2',
               600: '#f700ff',
               700: '#d300d9',
               800: '#ae00b1',
               900: '#80007f',
               950: '#630063',
               // 50: "#fefde8",
               // 100: "#fefbc3",
               // 200: "#fef48a",
               // 300: "#fde647",
               // 400: "#fbd82d",
               // 500: "#ebba07",
               // 600: "#ca9004",
               // 700: "#a16707",
               // 800: "#85510e",
               // 900: "#714212",
               // 950: "#422206",
               // 50: '#eefbfc',
               // 100: '#d4f3f6',
               // 200: '#afe6ee',
               // 300: '#77d2e2',
               // 400: '#3ab6cf',
               // 500: '#1d99b8',
               // 600: '#187a9b',
               // 700: '#19627d',
               // 800: '#1c5268',
               // 900: '#1b4559',
               // 950: '#0c2c3d',
            },
            accent: {
               50: '#fff9ec',
               100: '#fff3d3',
               200: '#ffe2a5',
               300: '#ffcc6d',
               400: '#ffab32',
               500: '#ff900a',
               600: '#fa7500',
               700: '#cc5602',
               800: '#a1430b',
               900: '#82390c',
               950: '#461a04',
               // 50: "#fef2f2",
               // 100: "#fee2e2",
               // 200: "#fecaca",
               // 300: "#fca5a5",
               // 400: "#f87171",
               // 500: "#ef4444",
               // 600: "#dc2626",
               // 700: "#b91c1c",
               // 800: "#991b1b",
               // 900: "#7f1d1d",
               // 950: "#450a0a",
            },
            success: {
               50: "#f8ffe5",
               100: "#efffc7",
               200: "#deff95",
               300: "#bbff3d",
               400: "#aaf625",
               500: "#8add05",
               600: "#6ab100",
               700: "#508605",
               800: "#41690b",
               900: "#37590e",
               950: "#1b3201",
            },
         },
         typography: {
            DEFAULT: {
               css: {
                  fontSize: '1rem',
                  p: {
                     fontSize: '1rem',
                  }
               }
            }
         }
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

# types/blog.ts

```ts
// types/blog.ts
export type BasePost = {
   id: string;
   title: string;
   slug: string;
   category: string;
   excerpt?: string;
   cover_image?: string;
   created_at: string;
   updated_at: string;
   author_id: string;
};

export type MarkdownPost = BasePost & {
   type: 'markdown';
   content: string;
};

export type ComponentPost = BasePost & {
   type: 'component';
   component_name: string;
   props?: Record<string, unknown>;
};

export type Post = MarkdownPost | ComponentPost;


```

