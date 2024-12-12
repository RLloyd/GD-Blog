# .eslintrc.json

```json
{
	"extends": ["next/core-web-vitals", "next/typescript"]
}
```

# .gitignore

```
# See https:

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
	"editor.fontWeight": "normal"
}
```

# next-env.d.ts

```ts

```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["example.com", "localhost", "images.unsplash.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};

export default nextConfig;
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
		"framer-motion": "^11.13.4",
		"highlight.js": "^11.10.0",
		"lucide-react": "^0.462.0",
		"next": "15.0.3",
		"prismjs": "^1.29.0",
		"react": "^18.2.0",
		"react-dom": "^18.2.0",
		"react-intersection-observer": "^9.13.1",
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

# public/assets/Bubbles-Fishes.webp

This is a binary file of the type: Image

# public/assets/GD-Fusion-logo.png

This is a binary file of the type: Image

# public/assets/LittleLloyd-FB.jpg

This is a binary file of the type: Image

# public/assets/MashMediaStudio.png

This is a binary file of the type: Image

# public/assets/somethingBig.png

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
@import url('https:

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

  - Published in LinkedIn ✅ Done!
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

# public/notes/Bridge-ColorPalette.md

```md
Bridge Color Palette:
#675CC8
#F8951F
#F8951F - #9CDA66
```

# public/notes/misc.tsx

```tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

interface BubbleLoaderProps {
	duration?: number;
	onComplete?: () => void;
}

interface Bubble {
	id: number;
	x: number;
	size: number;
	color: string;
	delay: number;
}

const BubbleLoader: React.FC<BubbleLoaderProps> = ({ duration = 5000, onComplete }) => {
	const [isActive, setIsActive] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [progress, setProgress] = useState(0);
	const [bubbles, setBubbles] = useState<Bubble[]>([]);
	const [points, setPoints] = useState(0);
	const progressIntervalRef = useRef<NodeJS.Timer>();
	const bubbleIntervalRef = useRef<NodeJS.Timer>();

	const colors = ["#60A5FA", "#C084FC", "#34D399", "#F472B6", "#A5B4FC", "#93C5FD", "#F9A8D4", "#86EFAC", "#38BDF8", "#FB7185", "#4ADE80", "#F472B6"];

	const handleBubblePop = (id: number) => {
		setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
		setPoints((prev) => prev + 10);
	};

	const startLoader = () => {
		setIsActive(true);
		setProgress(0);
		setBubbles([]);
		setPoints(0);
		setIsComplete(false);

		bubbleIntervalRef.current = setInterval(() => {
			setBubbles((prev) => [
				...prev.slice(-20),
				{
					id: Date.now(),
					x: Math.random() * 1000,
					size: Math.random() * 30 + 15,
					color: colors[Math.floor(Math.random() * colors.length)],
					delay: Math.random() * 0.5,
				},
			]);
		}, 200);

		progressIntervalRef.current = setInterval(() => {
			setProgress((prev) => {
				const newProgress = Math.min(prev + 1, 100);
				if (newProgress === 100) {
					if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
					if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
					setIsComplete(true);
					onComplete?.();
				}
				return newProgress;
			});
		}, duration / 100);
	};

	useEffect(() => {
		return () => {
			if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
			if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
		};
	}, []);

	return (
		<div className='relative w-full max-w-2xl mx-auto'>
			<div className='relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden'>
				{!isActive ? (
					<button onClick={startLoader} className='absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white'>
						<Play size={32} />
					</button>
				) : (
					<>
						<AnimatePresence>
							{isComplete ? (
								<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='absolute inset-0'>
									<Image src='/api/placeholder/400/320' alt='Completion' fill className='object-cover' sizes='(max-width: 768px) 100vw, 32rem' />
								</motion.div>
							) : (
								<svg viewBox='0 0 1000 500' preserveAspectRatio='none' className='absolute inset-0 w-full h-full'>
									{bubbles.map((bubble) => (
										<motion.circle
											key={bubble.id}
											cx={bubble.x}
											r={bubble.size}
											fill={bubble.color}
											initial={{ cy: 500, opacity: 0 }}
											animate={{ cy: -50, opacity: [0, 0.8, 0] }}
											transition={{
												duration: 4,
												delay: bubble.delay,
												ease: "easeOut",
											}}
											onMouseEnter={() => handleBubblePop(bubble.id)}
											style={{ cursor: "pointer" }}
										/>
									))}
								</svg>
							)}
						</AnimatePresence>

						<div className='absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 transition-all' style={{ width: `${progress}%` }} />
						<div className='absolute top-4 left-4 flex justify-between w-full px-4'>
							<span className='text-lg font-semibold text-white'>{Math.floor(progress)}%</span>
							<span className='text-lg font-semibold text-yellow-400'>Points: {points}</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default BubbleLoader;
```

# public/notes/misc2.tsx

```tsx

```

# public/notes/project-structure.md

```md
<style>
@import url('https:

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
├── src/ <- Source code directory
│ ├── app/ <- This is where your pages live
│ │ ├── page.tsx <- This is your homepage (/)
│ │ └── layout.tsx <- Main layout template
│ └── lib/ <- For utility functions and shared code
├── public/ <- For static files (images, etc.)
└── .env.local <- For private environment variables

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
@import url('https:

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
@import url('https:

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
  - Similar to this design: https:

- Does readers have to be logged in to read, comment, like
- Fix <img to <Image in src/components/BlogDashboard.tsx line: 71, 97

- Changed: BlogDashboard.tsx : All posts container +to display 4 columns instead of 3 ✅ Done!
  - <div className="allPostsContainer grid gap-6 md:grid-cols-2 lg:grid-cols-4">

### Codeblock:

\`\`\`javascript
/_ Code blocks _/
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

-
- Adjusted Featured text area container to wrap around content {/_---== Featured Posts Grid ===---_/}
- Adjusted the all posts layout template to accomodate padding and changed background {/_---== Regular Posts Grid ===---_/}
- Changed the light & dark mode background : /_ src/app/globals.css _/
- Markdwon wasn't working:
  - Changed BlogPostContent.tsx code

### December 07, 2024

- Change content area font:size to 1rem instead of the regular blog font size of 1.125rem
-

### December 09, 2024

- BlogDashboard: Needs re-factoring to new structure
  - src/components/blog/dashboard
    ├── types.ts
    ├── index.tsx (main BlogDashboard)
    ├── FeaturedCard.tsx
    ├── CategoryButtons.tsx
    ├── PostGrid.tsx
    └── DynamicComponentPreview.tsx
- EditForm: Not editing React Component mode
```

# public/project-summaries/BlogDashboard Category Colors.md

```md
<style>
@import url('https:

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

   localStorage.setItem("theme", newIsDark ? "dark" : "light");

   const [mounted, setMounted] = useState(false);
   if (!mounted)
   return null
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
@import url('https:

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

const latestMediaPost = posts.find(post => post.category === 'media');
const remainingPosts = posts.filter(post => {
const isFeaturedTech = post.id === latestTechPost?.id;
const isFeaturedMedia = post.id === latestMediaPost?.id;
return !isFeaturedTech && !isFeaturedMedia;
});

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
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

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
	size='large|medium|full'
	title='Custom Title'
	description='Optional description'
/>
\`\`\`
```

# public/project-summaries/BlogDashboard-Component-Refactoring.md

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
<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

# Blog Dashboard Component Refactoring

## Overview

During this session, we refactored the blog dashboard components to improve maintainability, accessibility, and type safety. The main focus was on breaking down large components into smaller, reusable pieces and fixing TypeScript errors.

## Key Changes

### 1. Component Structure

Reorganized components into a cleaner structure:

\`\`\`
src/components/blog/dashboard/
├── types.ts
├── index.tsx
├── FeaturedCard.tsx
├── CategoryButtons.tsx
├── PostGrid.tsx
└── DynamicComponentPreview.tsx
\`\`\`

### 2. Type Safety Improvements

- Replaced generic `any` types with specific type definitions
- Added proper type definitions for component props
- Created reusable type definitions in `types.ts`
- Added proper TypeScript interfaces for all components

### 3. Accessibility Enhancements

In the EditForm component:

- Added proper labels for all form elements
- Included ARIA attributes
- Added descriptive placeholders
- Improved form structure with semantic HTML
- Added proper role attributes for alerts

### 4. Component Separation

Split the large BlogDashboard component into smaller, focused components:

- `FeaturedCard`: Handles featured post display
- `CategoryButtons`: Manages category filtering
- `PostGrid`: Displays the grid of posts
- `DynamicComponentPreview`: Handles dynamic component loading

### 5. Features Added

- Dynamic component loading with proper loading states
- Improved type safety for React components
- Better handling of markdown vs component posts
- Enhanced error handling
- Proper image optimization

## Key Components

### FeaturedCard

Handles the display of featured posts with support for:

- Component preview
- Image display
- Category-based gradients
- Responsive layout

### EditForm

Improved form handling with:

- Proper validation
- Accessibility improvements
- Better type safety
- Component/markdown switching
- Image upload integration

### PostGrid

Enhanced post display with:

- Responsive grid layout
- Dynamic component support
- Improved image handling
- Better category integration

## Next Steps

1. Add proper testing coverage
2. Implement error boundaries
3. Add loading states for all async operations
4. Enhance component preview capabilities
5. Add proper form validation
6. Consider adding animation transitions

## Technical Debt Resolved

1. Removed implicit any types
2. Fixed accessibility issues
3. Improved component organization
4. Added proper TypeScript definitions
5. Enhanced error handling

Let me know if you need any clarification or have questions about the refactoring!
```

# public/project-summaries/Delete Posy Implementation.md

```md
<style>
@import url('https:

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
import "highlight.js/styles/github-dark.css";

<ReactMarkdown
rehypePlugins={[rehypeHighlight]}
components={{
		p: ({ children }) => <p className='text-gray-300 mb-4'>{children}</p>,
		h2: ({ children }) => <h2 className='text-2xl font-bold mt-8 mb-4'>{children}</h2>,

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
@import url('https:

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
@import url('https:

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
@import url('https:

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

type ThemeContextType = {
theme: Theme;
isDark: boolean;
toggleTheme: () => void;
};

export function useTheme() {
const context = useContext(ThemeContext);
if (!context) {
throw new Error("useTheme must be used within ThemeContextProvider");
}
return context;
}

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
const StyledComponent = styled.div<{ theme: Theme }>`	color: ${({ theme }) => (theme.isDark ? theme.colors.text.dark : theme.colors.text.light)};`;
\`\`\`

### Tailwind CSS

\`\`\`typescript
function Component() {
const { isDark } = useTheme();
return <div className='bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>{/_ Content _/}</div>;
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
This is a [Next.js](https:

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

Open [http:

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https:

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https:
- [Learn Next.js](https:

You can check out [the Next.js GitHub repository](https:

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https:

Check out our [Next.js deployment documentation](https:

# GD-Blog
```

# src/app/api/revalidate/route.ts

```ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
	revalidatePath("/blog");
	return NextResponse.json({ revalidated: true, now: Date.now() });
}
```

# src/app/auth-test/page.tsx

```tsx
"use client";
import { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";

export default function AuthTest() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((_, session) => {
			setUser(session?.user ?? null);
		});
		return () => subscription.unsubscribe();
	}, []);

	const signIn = () => {
		supabaseClient.auth.signInWithOAuth({
			provider: "github",
			options: { redirectTo: `${window.location.origin}/auth/callback` },
		});
	};

	const signOut = () => supabaseClient.auth.signOut();

	return (
		<div className='p-8'>
			<h1 className='text-2xl mb-4'>Auth Test</h1>

			{user ? (
				<div>
					<p>Logged in as: {user.email}</p>
					<button onClick={signOut} className='bg-red-500 text-white px-4 py-2 rounded mt-4'>
						Sign Out
					</button>
				</div>
			) : (
				<button onClick={signIn} className='bg-black text-white px-4 py-2 rounded'>
					Sign in with GitHub
				</button>
			)}
		</div>
	);
}
```

# src/app/auth/callback/route.ts

```ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const supabase = createRouteHandlerClient({ cookies });
		await supabase.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(requestUrl.origin);
}
```

# src/app/blog/[slug]/page.tsx

```tsx
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

	if (!searchParams.preview || !session) {
		query.eq("published", true);
	}

	const { data: post } = await query;

	if (!post) notFound();

	return <BlogPostContent post={post} />;
}
```

# src/app/blog/drafts/page.tsx

```tsx
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
```

# src/app/blog/new/page.tsx

```tsx
import { PostForm } from "@/components/PostForm";

export default function NewPost() {
	return (
		<div className='max-w-4xl mx-auto'>
			<h1 className='text-3xl font-bold mb-8'>Create New Post</h1>
			<PostForm />
		</div>
	);
}
```

# src/app/blog/page.tsx

```tsx
import { supabaseClient } from "@/lib/auth";

import { CategoryId } from "@/data/categories";
import { GridSize } from "@/components/BlogDashboard-Old";
import { unstable_noStore } from "next/cache";
import BlogDashboard from "@/components/blog/dashboard";

type FeaturedSetup = {
	category: CategoryId;
	size: GridSize;
	order: number;
	title?: string;
	description?: string;
}[];

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
	{
		category: "personal",
		size: "medium",
		order: 2,
		title: "Personal Stories",
	},
];

export default async function BlogList() {
	unstable_noStore();

	const { data: posts, error } = await supabaseClient.from("posts").select("*").order("created_at", { ascending: false });

	if (error) {
		console.error("Supabase error:", error);
		return <div>Error loading posts</div>;
	}

	return (
		<div className='max-w-page mx-auto'>
			<div className='flex justify-between items-center mb-8 px-4'>
				<h1 className='text-3xl font-bold'>Blog Posts</h1>
			</div>

			<BlogDashboard posts={posts} featuredSetup={featuredSetup} />
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
import { Libre_Baskerville, Open_Sans } from "next/font/google";
import { Providers } from "./providers";

import "./globals.css";

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
		<html lang='en' suppressHydrationWarning className={`${baskerville.variable} ${openSans.variable}`}>
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
			<body className={openSans.className} suppressHydrationWarning>
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

{
	/* <Navbar />; */
}
```

# src/app/page.tsx

```tsx
"use client";

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
"use client";
import { ThemeContextProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
```

# src/components/AuthButton.tsx

```tsx
"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/auth";

export function AuthButton() {
	const router = useRouter();
	const supabase = createClient();

	const handleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};

	return (
		<button onClick={handleSignIn} className='bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700'>
			Sign In with GitHub
		</button>
	);
}
```

# src/components/blog-components/articles/CircularSVG2.tsx

```tsx
import { motion } from "framer-motion";

const CircularSVG2 = () => {
	return (
		<svg
			width='3082'
			height='3082'
			viewBox='0 0 3082 3082'
			fill='none'
			xmlns='http:
		>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 4, ease: "linear", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M2464.25 2774.81C2786.8 2533.45 3002.01 2175.37 3063.78 1777.28C3125.55 1379.18 3028.96 972.724 2794.72 644.968C2560.47 317.211 2207.19 94.2194 1810.54 23.7553C1413.89 -46.7088 1005.41 40.9585 672.611 267.98C339.808 495 109.14 843.322 30.0153 1238.33C-49.1098 1633.35 29.6001 2043.64 249.286 2381.33C468.971 2719.02 812.163 2957.25 1205.35 3045C1598.54 3132.75 2010.45 3063.03 2352.87 2850.79L2064.99 2386.35C1843.99 2523.33 1578.14 2568.33 1324.37 2511.69C1070.6 2455.06 849.106 2301.3 707.32 2083.35C565.533 1865.41 514.733 1600.6 565.801 1345.66C616.869 1090.71 765.743 865.905 980.536 719.385C1195.33 572.864 1458.96 516.283 1714.96 561.761C1970.96 607.239 2198.97 751.159 2350.16 962.695C2501.34 1174.23 2563.68 1436.56 2523.81 1693.49C2483.94 1950.43 2345.05 2181.53 2136.87 2337.31L2464.25 2774.81Z'
				fill='#3C493D'
			/>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: -360 }}
				transition={{ duration: 5, ease: "easeIn", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M106.965 1774.99C154.874 2068.61 291.756 2340.44 499.115 2553.76C706.475 2767.08 974.318 2911.61 1266.46 2967.83L1329.8 2638.64C1105.06 2595.4 899.008 2484.21 739.488 2320.11C579.968 2156 474.667 1946.88 437.811 1721.01L106.965 1774.99Z'
				fill='#BE2809'
			/>
			{/* <motion.circle cx="1541" cy="1541" r="1271" stroke="#1EBCDC" stroke-width="250" stroke-dasharray="100 100" initial={{ rotate: 0 }} animate={{ rotate: -360 }} transition={{ duration: 5, ease: "easeIn", repeat: Infinity }} /> */}
			{/* <motion.circle cx="1541" cy="1541" r="1271" stroke="#1EBCDC" stroke-width="250" stroke-dasharray="100 100" initial={{ rotate: 0 }} animate={{ rotate: -360 }} transition={{ duration: 5, ease: "easeIn", repeat: Infinity }} style={{ originX: "50%", originY: "50%" }}/> */}
			{/* <circle cx="1541" cy="1541" r="1271" stroke="#1EBCDC" stroke-width="250" stroke-dasharray="100 100"/> */}
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 6, ease: "easeOut", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M2847.83 2267.11C2949.11 2084.83 3011.13 1883.38 3029.92 1675.7C3048.71 1468.02 3023.84 1258.71 2956.92 1061.21C2890 863.712 2782.5 682.4 2641.33 528.923C2500.16 375.446 2328.45 253.199 2137.22 170.036C1946 86.8727 1739.49 44.6341 1530.97 46.0337C1322.44 47.4333 1116.52 92.4402 926.428 178.163C736.335 263.885 566.278 388.426 427.184 543.785C288.089 699.143 183.034 881.882 118.768 1080.26L446.891 1186.56C496.33 1033.95 577.148 893.368 684.152 773.852C791.156 654.336 921.979 558.528 1068.22 492.582C1214.45 426.637 1372.87 392.013 1533.28 390.937C1693.69 389.86 1852.56 422.354 1999.67 486.33C2146.78 550.307 2278.87 644.351 2387.47 762.419C2496.07 880.488 2578.77 1019.97 2630.25 1171.9C2681.74 1323.83 2700.87 1484.86 2686.41 1644.62C2671.96 1804.39 2624.24 1959.36 2546.33 2099.59L2847.83 2267.11Z'
				fill='#FF8000'
			/>
			<motion.circle
				cx='1541'
				cy='1541'
				r='1271'
				stroke='#1EBCDC'
				strokeWidth='250'
				strokeDasharray='100 100'
				fill='transparent'
				style={{
					originX: "50%",
					originY: "50%",
				}}
				animate={{
					rotate: 360,
				}}
				transition={{
					repeat: Infinity,
					duration: 5,
					ease: "linear",
				}}
			/>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M2443.14 2607.8C2662.4 2422.36 2819.18 2173.82 2892.15 1896.03C2965.12 1618.23 2950.72 1324.69 2850.91 1055.38C2751.1 786.072 2570.74 554.081 2334.39 391.005C2098.03 227.93 1817.18 141.695 1530.07 144.047L1531.69 342.385C1778.04 340.367 2019.02 414.358 2221.81 554.28C2424.61 694.203 2579.37 893.256 2665 1124.33C2750.64 1355.4 2762.99 1607.27 2700.39 1845.62C2637.78 2083.97 2503.25 2297.23 2315.13 2456.34L2443.14 2607.8Z'
				fill='#0E9DBA'
			/>
			{/* <motion.circle
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
               style={{ originX: "0%", originY: "0%" }}
               r='1271'
               stroke='#1EBCDC'
               stroke-width='250'
               stroke-dasharray='100 100'
               /> */}
			{/* <motion.circle cx="1541" cy="1523" r="1271" stroke="#1EBCDC" stroke-width="250" stroke-dasharray="100 100"/> */}

			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: -360 }}
				transition={{ duration: 12, ease: "linear", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M301.123 899.502C186.139 1121.74 133.002 1370.8 147.272 1620.61C161.542 1870.43 242.695 2111.82 382.238 2319.52C521.781 2527.22 714.585 2693.59 940.471 2801.23C1166.36 2908.87 1417.02 2953.82 1666.24 2931.37L1643.64 2680.55C1439.39 2698.95 1233.94 2662.11 1048.8 2573.89C863.667 2485.67 705.645 2349.3 591.276 2179.07C476.906 2008.84 410.392 1811 398.697 1606.25C387.001 1401.5 430.552 1197.37 524.793 1015.23L301.123 899.502Z'
				fill='#88A751'
			/>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 5, ease: "linear", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M1935.7 142.637C1719.73 81.6756 1492.57 71.5699 1272.03 113.112C1051.49 154.654 843.578 246.715 664.584 382.076L786.248 542.958C940.394 426.387 1119.45 347.107 1309.37 311.331C1499.29 275.556 1694.92 284.259 1880.91 336.758L1935.7 142.637Z'
				fill='#F1D5AE'
			/>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M546.095 482.051C407.032 612.703 295.065 769.467 216.586 943.392C138.107 1117.32 94.653 1305 88.7059 1495.71L423.764 1506.16C428.339 1359.44 461.767 1215.06 522.141 1081.27C582.514 947.467 668.649 826.87 775.629 726.36L546.095 482.051Z'
				fill='#D8FE93'
			/>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 8, ease: "linear", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M2123.2 2724.55C2351.06 2612.47 2541.72 2436.99 2672.28 2219.2C2802.85 2001.41 2867.77 1750.56 2859.26 1496.77L2625.11 1504.62C2632.12 1713.33 2578.73 1919.63 2471.35 2098.74C2363.97 2277.85 2207.18 2422.16 2019.79 2514.34L2123.2 2724.55Z'
				fill='#E45C04'
			/>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: -360 }}
				transition={{ duration: 10, ease: "linear", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M606.559 503.872C466.976 629.634 354.216 782.277 275.034 952.658C195.852 1123.04 151.877 1307.65 145.744 1495.43L359.248 1502.4C364.443 1343.36 401.688 1187 468.754 1042.69C535.82 898.378 631.325 769.092 749.548 662.574L606.559 503.872Z'
				fill='#184D5D'
			/>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M2676.89 1286.74C2620.31 1033.96 2481.03 807.278 2281.09 642.579C2081.16 477.88 1832 384.577 1573.06 377.442L1570.04 487.216C1804.54 493.677 2030.2 578.178 2211.27 727.339C2392.34 876.5 2518.48 1081.8 2569.73 1310.73L2676.89 1286.74Z'
				fill='#32DCFE'
			/>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 9, ease: "linear", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M384.541 1408.72C366.746 1564.29 380.522 1721.85 425.044 1871.97C469.567 2022.09 543.92 2161.68 643.654 2282.39C743.388 2403.11 866.452 2502.46 1005.48 2574.5C1144.51 2646.54 1296.64 2689.78 1452.77 2701.65L1461.1 2592.15C1319.69 2581.4 1181.91 2542.24 1056 2476.99C930.091 2411.75 818.637 2321.77 728.312 2212.45C637.988 2103.12 570.649 1976.7 530.327 1840.74C490.005 1704.78 477.529 1562.09 493.645 1421.2L384.541 1408.72Z'
				fill='#D8FE93'
			/>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: -360 }}
				transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M2218.76 2591.31C2013.72 2723.62 1774.44 2793.02 1530.43 2790.96L1531.37 2679.21C1753.57 2681.09 1971.46 2617.89 2158.16 2497.41L2218.76 2591.31Z'
				fill='#F7D3B9'
			/>
			<motion.path
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ duration: 10, ease: "linear", repeat: Infinity }}
				style={{ originX: "50%", originY: "50%" }}
				d='M391.874 1923.14C460.675 2130.03 584.054 2314.51 748.989 2457.1L805.507 2391.73C652.342 2259.31 537.768 2088 473.877 1895.87L391.874 1923.14Z'
				fill='#0E9DBA'
			/>
		</svg>
	);
};

export default CircularSVG2;

```

# src/components/blog-components/articles/LoadingSpinner.tsx

```tsx
"use client";
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
				<CodeBlock code={sampleCode} language='HTML' fontSize='1rem' />

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

# src/components/blog-components/articles/PercentageCircularLoader.css

```css
/* styles.css */
.loaderAnimationContainer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
}

.counterAnimContainer {
	display: flex;
	flex-direction: column;
	align-items: center;
	line-height: 1;
	position: relative;
	top: 6px;
}

.countdown {
	font-size: 3rem;
	text-align: center;
	margin: 0;
}

.loadingText {
	font-size: 1rem;
	font-weight: bold;
}

.svgContainer {
	position: absolute;
}
```

# src/components/blog-components/articles/PercentageCircularLoader.tsx

```tsx
"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import "./PercentageCircularLoader.css";

const PercentageCircularLoader = ({ timer }: { timer: number }) => {
	const [count, setCount] = useState(0);
	const tymer = timer / 1000;
	const easing = [0.35, 0.27, 0.3, 0.83];

	const timerDelay = {
		initDelay: 0.5,
		circDelay: 1,
		iconDelay: 2,
		descDelay: 2,
	};

	useEffect(() => {
		const interval = setInterval(() => setCount((prev) => prev + 1), 100);
		return () => clearInterval(interval);
	}, []);

	const animationProps = useMemo(
		() => ({
			rotate: { duration: tymer, ease: easing },
			colors: ["#85aab6", "#ff8d53"],
		}),
		[tymer, easing]
	);

	return (
		<div className='loaderAnimationContainer'>
			<div className='counterAnimContainer'>
				<div className='loadingText'>LOADING...</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<h2 className='countdown'>{Math.floor((count / (timer / 100)) * 100)}</h2>
					<span style={{ fontSize: "2rem" }}>%</span>
				</div>
			</div>
			{/* Rings animation */}
			<div className='svgContainer'>
				<motion.svg
					width='314'
					height='314'
					viewBox='0 0 314 314'
					fill='none'
					xmlns='http:
				>
					<motion.path
						initial={{ rotate: 0 }}
						animate={{ rotate: 720 }}
						transition={{ duration: tymer, ease: easing, delay: timerDelay.circDelay + 0 }}
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M156.699 33.1997C88.4921 33.1997 33.1992 88.4925 33.1992 156.7C33.1992 224.907 88.4921 280.2 156.699 280.2C224.906 280.2 280.199 224.907 280.199 156.7C280.199 88.4925 224.906 33.1997 156.699 33.1997ZM31.1992 156.7C31.1992 87.388 87.3875 31.1997 156.699 31.1997C226.011 31.1997 282.199 87.388 282.199 156.7C282.199 226.011 226.011 282.2 156.699 282.2C87.3875 282.2 31.1992 226.011 31.1992 156.7Z'
						fill='#85aab6'
					/>
					<motion.path
						initial={{ rotate: 0 }}
						animate={{ rotate: 60 }}
						transition={{ duration: tymer, ease: easing, delay: timerDelay.circDelay + 0 }}
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M147.046 36.5809C150.231 36.3283 153.451 36.1997 156.699 36.1997C159.948 36.1997 163.167 36.3283 166.352 36.5809L165.72 44.5559C162.745 44.32 159.737 44.1997 156.699 44.1997C153.662 44.1997 150.654 44.32 147.678 44.5559L147.046 36.5809ZM120.556 41.7153C126.636 39.8059 132.924 38.3655 139.375 37.4363L140.516 45.3546C134.493 46.2219 128.626 47.5662 122.953 49.3478L120.556 41.7153ZM174.023 37.4363C180.475 38.3655 186.762 39.8059 192.843 41.7153L190.446 49.3478C184.773 47.5662 178.905 46.2219 172.883 45.3546L174.023 37.4363ZM95.8792 52.653C101.407 49.415 107.217 46.6045 113.262 44.2673L116.147 51.7291C110.506 53.91 105.083 56.5331 99.9227 59.5559L95.8792 52.653ZM200.136 44.2673C206.182 46.6045 211.991 49.415 217.519 52.6531L213.476 59.556C208.315 56.5331 202.893 53.9101 197.251 51.7291L200.136 44.2673ZM74.2661 68.8071C78.9555 64.4072 83.9975 60.3782 89.3455 56.7669L93.8225 63.3968C88.8288 66.7689 84.12 70.5316 79.7399 74.6412L74.2661 68.8071ZM224.053 56.7669C229.401 60.3782 234.443 64.4073 239.132 68.8071L233.659 74.6412C229.279 70.5317 224.57 66.769 219.576 63.3969L224.053 56.7669ZM56.7664 89.3459C60.3777 83.998 64.4068 78.956 68.8066 74.2665L74.6407 79.7404C70.5312 84.1204 66.7685 88.8293 63.3964 93.823L56.7664 89.3459ZM244.592 74.2666C248.992 78.956 253.021 83.998 256.632 89.346L250.002 93.823C246.63 88.8293 242.867 84.1205 238.758 79.7404L244.592 74.2666ZM44.2668 113.263C46.604 107.217 49.4145 101.408 52.6526 95.8797L59.5555 99.9231C56.5326 105.084 53.9096 110.506 51.7286 116.148L44.2668 113.263ZM260.746 95.8797C263.984 101.408 266.794 107.217 269.132 113.263L261.67 116.148C259.489 110.506 256.866 105.084 253.843 99.9232L260.746 95.8797ZM37.4358 139.376C38.365 132.924 39.8054 126.637 41.7148 120.556L49.3473 122.953C47.5657 128.626 46.2214 134.494 45.3541 140.516L37.4358 139.376ZM271.684 120.556C273.593 126.637 275.033 132.924 275.963 139.376L268.044 140.516C267.177 134.494 265.833 128.626 264.051 122.953L271.684 120.556ZM36.1992 156.7C36.1992 153.451 36.3279 150.232 36.5804 147.047L44.5554 147.679C44.3195 150.654 44.1992 153.662 44.1992 156.7C44.1992 159.737 44.3195 162.745 44.5554 165.72L36.5804 166.353C36.3279 163.168 36.1992 159.948 36.1992 156.7ZM276.818 147.047C277.071 150.232 277.199 153.451 277.199 156.7C277.199 159.948 277.071 163.168 276.818 166.353L268.843 165.72C269.079 162.745 269.199 159.737 269.199 156.7C269.199 153.662 269.079 150.654 268.843 147.679L276.818 147.047ZM41.7148 192.843C39.8054 186.763 38.365 180.475 37.4358 174.024L45.3541 172.883C46.2214 178.906 47.5657 184.773 49.3473 190.446L41.7148 192.843ZM275.963 174.024C275.033 180.475 273.593 186.763 271.684 192.843L264.051 190.446C265.833 184.773 267.177 178.906 268.044 172.883L275.963 174.024ZM52.6525 217.52C49.4145 211.992 46.604 206.182 44.2668 200.136L51.7286 197.252C53.9096 202.893 56.5326 208.316 59.5555 213.476L52.6525 217.52ZM269.132 200.136C266.794 206.182 263.984 211.992 260.746 217.52L253.843 213.476C256.866 208.316 259.489 202.893 261.67 197.252L269.132 200.136ZM68.8066 239.133C64.4067 234.443 60.3777 229.401 56.7664 224.053L63.3964 219.576C66.7684 224.57 70.5311 229.279 74.6407 233.659L68.8066 239.133ZM256.632 224.053C253.021 229.401 248.992 234.443 244.592 239.133L238.758 233.659C242.867 229.279 246.63 224.57 250.002 219.576L256.632 224.053ZM89.3455 256.633C83.9975 253.021 78.9555 248.992 74.266 244.592L79.7399 238.758C84.1199 242.868 88.8288 246.63 93.8225 250.003L89.3455 256.633ZM239.132 244.592C234.443 248.992 229.401 253.021 224.053 256.633L219.576 250.003C224.57 246.63 229.278 242.868 233.659 238.758L239.132 244.592ZM113.262 269.132C107.217 266.795 101.407 263.984 95.8792 260.746L99.9227 253.843C105.083 256.866 110.506 259.489 116.147 261.67L113.262 269.132ZM217.519 260.746C211.991 263.984 206.182 266.795 200.136 269.132L197.251 261.67C202.893 259.489 208.315 256.866 213.476 253.843L217.519 260.746ZM139.375 275.963C132.924 275.034 126.636 273.594 120.556 271.684L122.953 264.052C128.626 265.833 134.493 267.177 140.516 268.045L139.375 275.963ZM192.843 271.684C186.762 273.594 180.475 275.034 174.023 275.963L172.883 268.045C178.905 267.177 184.773 265.833 190.446 264.052L192.843 271.684ZM156.699 277.2C153.451 277.2 150.231 277.071 147.046 276.818L147.678 268.844C150.654 269.079 153.662 269.2 156.699 269.2C159.737 269.2 162.745 269.079 165.72 268.844L166.352 276.818C163.167 277.071 159.948 277.2 156.699 277.2Z'
						fill='#85aab6'
					/>
					<motion.path
						initial={{ rotate: 0 }}
						animate={{ rotate: -360 }}
						transition={{ duration: tymer, ease: easing, delay: timerDelay.circDelay + 0 }}
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M156.7 49.2993C97.3844 49.2993 49.2998 97.3839 49.2998 156.699C49.2998 216.015 97.3844 264.099 156.7 264.099C216.015 264.099 264.1 216.015 264.1 156.699C264.1 97.3839 216.015 49.2993 156.7 49.2993ZM47.2998 156.699C47.2998 96.2794 96.2799 47.2993 156.7 47.2993C217.12 47.2993 266.1 96.2794 266.1 156.699C266.1 217.119 217.12 266.099 156.7 266.099C96.2799 266.099 47.2998 217.119 47.2998 156.699Z'
						fill='#ff8d53'
					/>
					<motion.path
						initial={{ rotate: 0 }}
						animate={{ rotate: 360 }}
						transition={{ duration: tymer, ease: easing, delay: timerDelay.circDelay + 0 }}
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M156.7 67C107.114 67 67 107.114 67 156.7C67 206.286 107.114 246.4 156.7 246.4C206.282 246.4 246.4 206.19 246.4 156.7H258.4C258.4 212.81 212.918 258.4 156.7 258.4C100.486 258.4 55 212.914 55 156.7C55 100.486 100.486 55 156.7 55C184.75 55 210.266 66.3749 228.655 84.8696L220.145 93.3304C203.934 77.0251 181.45 67 156.7 67Z'
						fill='#85aab6'
					/>
					<motion.path
						initial={{ rotate: 0 }}
						animate={{ rotate: 360 * 4 }}
						transition={{ duration: tymer, ease: easing, delay: timerDelay.circDelay + 0 }}
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M171.65 71.8689C124.843 63.5629 80.1766 94.9308 71.8686 141.749L71.8685 141.749C67.3737 167.057 74.5041 191.781 89.3643 210.454L86.2344 212.945C70.6946 193.418 63.225 167.542 67.9301 141.05L69.8993 141.4L67.9301 141.05C76.6221 92.0685 123.355 59.2364 172.349 67.9304C221.33 76.6224 254.163 123.356 245.469 172.349C236.777 221.331 190.043 254.163 141.05 245.469L141.749 241.53C188.555 249.836 233.222 218.469 241.53 171.65C249.836 124.844 218.468 80.177 171.65 71.8689Z'
						fill='#f0fcff'
					/>
					<motion.path
						initial={{ rotate: 0 }}
						animate={{ rotate: -160 }}
						transition={{ duration: tymer, ease: easing, delay: timerDelay.circDelay + 0 }}
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M155.715 75.5054C156.042 75.5015 156.371 75.4995 156.699 75.4995C157.028 75.4995 157.356 75.5015 157.683 75.5054L157.648 78.5051C157.332 78.5014 157.016 78.4995 156.699 78.4995C156.382 78.4995 156.066 78.5014 155.75 78.5051L155.715 75.5054ZM145.934 76.2069C146.582 76.1212 147.231 76.0431 147.883 75.9727L148.205 78.9553C147.577 79.0231 146.952 79.0984 146.328 79.1809L145.934 76.2069ZM165.515 75.9727C166.167 76.0431 166.816 76.1212 167.464 76.2069L167.07 79.1809C166.446 79.0984 165.821 79.0231 165.193 78.9553L165.515 75.9727ZM136.312 78.0806C136.942 77.9175 137.576 77.7618 138.213 77.6135L138.893 80.5354C138.28 80.6781 137.67 80.828 137.063 80.9851L136.312 78.0806ZM175.185 77.6135C175.822 77.7618 176.456 77.9175 177.087 78.0806L176.335 80.9851C175.728 80.828 175.118 80.6781 174.505 80.5354L175.185 77.6135ZM126.981 81.1102C127.589 80.8709 128.201 80.6387 128.816 80.4138L129.846 83.2314C129.254 83.448 128.665 83.6715 128.079 83.9019L126.981 81.1102ZM184.582 80.4138C185.197 80.6387 185.809 80.8709 186.417 81.1102L185.319 83.9019C184.733 83.6715 184.144 83.448 183.552 83.2314L184.582 80.4138ZM118.091 85.2477C118.665 84.937 119.243 84.633 119.825 84.3358L121.189 87.0077C120.629 87.2939 120.072 87.5866 119.519 87.8859L118.091 85.2477ZM193.573 84.3358C194.155 84.633 194.733 84.937 195.307 85.2477L193.879 87.8859C193.326 87.5866 192.769 87.2939 192.209 87.0077L193.573 84.3358ZM202.02 89.3145C202.563 89.68 203.1 90.0518 203.633 90.4299L201.897 92.8767C201.384 92.5125 200.866 92.1543 200.344 91.8023L202.02 89.3145ZM109.765 90.43C110.298 90.0518 110.835 89.68 111.378 89.3145L113.054 91.8023C112.532 92.1544 112.014 92.5125 111.501 92.8767L109.765 90.43ZM102.123 96.5743C102.607 96.1351 103.096 95.7017 103.59 95.2741L105.553 97.5426C105.077 97.9545 104.606 98.372 104.14 98.7951L102.123 96.5743ZM209.808 95.2741C210.302 95.7017 210.791 96.1351 211.275 96.5743L209.258 98.7951C208.792 98.372 208.321 97.9545 207.845 97.5426L209.808 95.2741ZM216.824 102.124C217.263 102.607 217.697 103.096 218.124 103.591L215.856 105.554C215.444 105.078 215.026 104.607 214.603 104.141L216.824 102.124ZM95.2736 103.591C95.7012 103.096 96.1346 102.607 96.5739 102.124L98.7946 104.141C98.3715 104.607 97.954 105.078 97.5421 105.554L95.2736 103.591ZM222.969 109.765C223.347 110.298 223.719 110.836 224.084 111.378L221.596 113.055C221.244 112.532 220.886 112.014 220.522 111.501L222.969 109.765ZM89.314 111.378C89.6795 110.836 90.0513 110.298 90.4295 109.765L92.8762 111.501C92.512 112.014 92.1539 112.532 91.8019 113.055L89.314 111.378ZM84.3353 119.826C84.6325 119.244 84.9365 118.665 85.2473 118.092L87.8854 119.52C87.5861 120.073 87.2934 120.629 87.0072 121.19L84.3353 119.826ZM228.151 118.092C228.462 118.665 228.766 119.244 229.063 119.826L226.391 121.19C226.105 120.629 225.812 120.073 225.513 119.52L228.151 118.092ZM80.4133 128.817C80.6382 128.201 80.8704 127.59 81.1097 126.981L83.9014 128.08C83.671 128.665 83.4475 129.254 83.2309 129.847L80.4133 128.817ZM232.288 126.981C232.528 127.59 232.76 128.201 232.985 128.817L230.167 129.847C229.951 129.254 229.727 128.665 229.497 128.08L232.288 126.981ZM77.6131 138.213C77.7613 137.577 77.917 136.943 78.0801 136.312L80.9846 137.063C80.8275 137.67 80.6776 138.281 80.5349 138.893L77.6131 138.213ZM235.318 136.312C235.481 136.943 235.637 137.577 235.785 138.213L232.863 138.893C232.72 138.281 232.57 137.67 232.413 137.063L235.318 136.312ZM75.9722 147.884C76.0426 147.232 76.1207 146.582 76.2064 145.935L79.1805 146.329C79.0979 146.952 79.0226 147.578 78.9548 148.206L75.9722 147.884ZM237.192 145.935C237.277 146.582 237.355 147.232 237.426 147.884L234.443 148.206C234.375 147.578 234.3 146.952 234.218 146.329L237.192 145.935ZM75.499 156.7C75.499 156.371 75.501 156.043 75.5049 155.715L78.5047 155.751C78.5009 156.067 78.499 156.383 78.499 156.7C78.499 157.016 78.5009 157.332 78.5047 157.648L75.5049 157.684C75.501 157.356 75.499 157.028 75.499 156.7ZM237.893 155.715C237.897 156.043 237.899 156.371 237.899 156.7C237.899 157.028 237.897 157.356 237.893 157.684L234.893 157.648C234.897 157.332 234.899 157.016 234.899 156.7C234.899 156.383 234.897 156.067 234.893 155.751L237.893 155.715ZM76.2064 167.464C76.1207 166.817 76.0426 166.167 75.9722 165.515L78.9548 165.193C79.0226 165.821 79.0979 166.447 79.1805 167.07L76.2064 167.464ZM237.426 165.515C237.355 166.167 237.277 166.817 237.192 167.464L234.218 167.07C234.3 166.447 234.375 165.821 234.443 165.193L237.426 165.515ZM78.0801 177.087C77.917 176.456 77.7613 175.823 77.6131 175.186L80.5349 174.506C80.6776 175.118 80.8275 175.729 80.9846 176.336L78.0801 177.087ZM235.785 175.186C235.637 175.823 235.481 176.456 235.318 177.087L232.413 176.336C232.57 175.729 232.72 175.118 232.863 174.506L235.785 175.186ZM81.1097 186.418C80.8704 185.809 80.6382 185.198 80.4133 184.582L83.2309 183.552C83.4475 184.145 83.671 184.734 83.9014 185.319L81.1097 186.418ZM232.985 184.582C232.76 185.198 232.528 185.809 232.288 186.418L229.497 185.319C229.727 184.734 229.951 184.145 230.167 183.552L232.985 184.582ZM85.2473 195.307C84.9365 194.734 84.6325 194.156 84.3353 193.573L87.0072 192.209C87.2934 192.77 87.5861 193.326 87.8854 193.879L85.2473 195.307ZM229.063 193.573C228.766 194.156 228.462 194.734 228.151 195.307L225.513 193.879C225.812 193.326 226.105 192.77 226.391 192.209L229.063 193.573ZM224.084 202.021C223.719 202.563 223.347 203.101 222.969 203.634L220.522 201.898C220.886 201.385 221.244 200.867 221.596 200.344L224.084 202.021ZM90.4295 203.634C90.0513 203.101 89.6795 202.563 89.314 202.021L91.8019 200.344C92.1539 200.867 92.512 201.385 92.8762 201.898L90.4295 203.634ZM96.5739 211.275C96.1346 210.792 95.7012 210.303 95.2736 209.809L97.5421 207.845C97.954 208.321 98.3715 208.792 98.7946 209.258L96.5739 211.275ZM218.124 209.809C217.697 210.303 217.263 210.792 216.824 211.275L214.603 209.258C215.026 208.792 215.444 208.321 215.856 207.845L218.124 209.809ZM103.59 218.125C103.096 217.697 102.607 217.264 102.123 216.825L104.14 214.604C104.606 215.027 105.077 215.445 105.553 215.856L103.59 218.125ZM211.275 216.825C210.791 217.264 210.302 217.697 209.808 218.125L207.845 215.856C208.321 215.445 208.792 215.027 209.258 214.604L211.275 216.825ZM111.378 224.085C110.835 223.719 110.298 223.347 109.765 222.969L111.501 220.522C112.014 220.887 112.532 221.245 113.054 221.597L111.378 224.085ZM203.633 222.969C203.1 223.347 202.563 223.719 202.02 224.085L200.344 221.597C200.866 221.245 201.384 220.887 201.897 220.522L203.633 222.969ZM119.825 229.063C119.243 228.766 118.665 228.462 118.091 228.151L119.519 225.513C120.072 225.812 120.629 226.105 121.189 226.391L119.825 229.063ZM195.307 228.151C194.733 228.462 194.155 228.766 193.573 229.063L192.209 226.391C192.769 226.105 193.326 225.812 193.879 225.513L195.307 228.151ZM128.816 232.985C128.201 232.76 127.589 232.528 126.981 232.289L128.079 229.497C128.665 229.728 129.254 229.951 129.846 230.168L128.816 232.985ZM186.417 232.289C185.809 232.528 185.197 232.76 184.582 232.985L183.552 230.168C184.144 229.951 184.733 229.728 185.319 229.497L186.417 232.289ZM138.213 235.785C137.576 235.637 136.942 235.482 136.312 235.318L137.063 232.414C137.67 232.571 138.28 232.721 138.893 232.864L138.213 235.785ZM177.087 235.318C176.456 235.482 175.822 235.637 175.185 235.785L174.505 232.864C175.118 232.721 175.728 232.571 176.335 232.414L177.087 235.318ZM147.883 237.426C147.231 237.356 146.582 237.278 145.934 237.192L146.328 234.218C146.952 234.301 147.577 234.376 148.205 234.444L147.883 237.426ZM167.464 237.192C166.816 237.278 166.167 237.356 165.515 237.426L165.193 234.444C165.821 234.376 166.446 234.301 167.07 234.218L167.464 237.192ZM156.699 237.9C156.371 237.9 156.042 237.898 155.715 237.894L155.75 234.894C156.066 234.898 156.382 234.9 156.699 234.9C157.016 234.9 157.332 234.898 157.648 234.894L157.683 237.894C157.356 237.898 157.028 237.9 156.699 237.9Z'
						fill='#A7A9AC'
					/>
					<motion.path
						initial={{ rotate: 0 }}
						animate={{ rotate: 360 }}
						transition={{ duration: tymer, ease: easing, delay: timerDelay.circDelay + 0 }}
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M156.7 95.2993C138.384 95.2993 121.907 103.312 110.707 116.059L101.692 108.139C115.092 92.8871 134.816 83.2993 156.7 83.2993C197.214 83.2993 230.1 116.186 230.1 156.699C230.1 197.213 197.214 230.099 156.7 230.099C116.186 230.099 83.2998 197.213 83.2998 156.699H95.2998C95.2998 190.586 122.814 218.099 156.7 218.099C190.586 218.099 218.1 190.586 218.1 156.699C218.1 122.813 190.586 95.2993 156.7 95.2993Z'
						fill='#ff6a00'
					/>
					<motion.path
						initial={{ rotate: 0 }}
						animate={{ rotate: -260 }}
						transition={{ duration: tymer, ease: easing, delay: timerDelay.circDelay + 0 }}
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M166.383 101.654C136.009 96.339 106.97 116.654 101.655 147.014C98.807 163.443 103.365 179.476 113.039 191.521L108.361 195.278C97.6353 181.924 92.593 164.157 95.7439 145.987L95.7447 145.982C101.631 112.344 133.791 89.8598 167.417 95.7442C201.055 101.631 223.539 133.791 217.655 167.416C211.768 201.055 179.608 223.539 145.983 217.654L147.017 211.744C177.391 217.06 206.431 196.744 211.745 166.382C217.06 136.008 196.744 106.968 166.383 101.654Z'
						fill='#bad2d9'
					/>
				</motion.svg>
			</div>
		</div>
	);
};

export default PercentageCircularLoader;

```

# src/components/blog-components/articles/PercentageSVG2.css

```css
/* styles.css */

.container {
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 314px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* margin-bottom: 10rem; */
}

.loader-container {
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 200px;
}

.circular-svg {
	position: absolute;
	border-radius: 100%;
	width: 300px;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* z-index: 100; */
}

.image {
	max-width: 100%;
	width: 100%;
	height: auto;
	opacity: 0;
	transition: opacity 0.5s ease-in-out;
}

.image.loaded {
	opacity: 1;
}

.counter-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	line-height: 1;
	position: relative;
	/* z-index: 101; */
}

.loading-text {
	font-size: 1rem;
	font-family: "Open Sans", sans-serif;
	margin: 0;
	color: #3f1f0b;
}

.countdown-text {
	display: flex;
	align-items: center;
	font-size: 3rem;
	margin: 0;
	color: #3f1f0b;
}
```

# src/components/blog-components/articles/PercentageSVG2.tsx

```tsx
"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./PercentageSVG2.css";

import CircularSVG2 from "./CircularSVG2";
import { CodeBlock } from "../CodeBlock";

interface ImageLoaderProps {
	src?: string;
	alt?: string;
	className?: string;
	mode?: string;
	timerDuration?: number;
}
const imageLoaderTSXCode = `
   import React, { useState, useEffect } from "react";
   import "./ImageLoader.css";

   interface ImageLoaderProps {
   src: string;
   alt: string;
   className?: string;
   }

   const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, className }) => {
   const [progress, setProgress] = useState(0);
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      const loadImage = (): Promise<void> => {
         return new Promise((resolve, reject) => {
         const xhr = new XMLHttpRequest();
         xhr.open("GET", src, true);
         xhr.responseType = "arraybuffer";

         xhr.onprogress = (event) => {
            if (event.lengthComputable) {
               const percentComplete = (event.loaded / event.total) * 100;
               setProgress(Math.round(percentComplete));
            }
         };

         xhr.onload = () => {
            if (xhr.status === 200) {
               setProgress(100);
               resolve();
            } else {
               reject(new Error(\`Failed to load image: \${xhr.statusText}\`));
            }
         };

         xhr.onerror = () => reject(new Error("Error loading image"));
         xhr.send();
         });
      };

      loadImage()
         .then(() => setIsLoaded(true))
         .catch((err) => console.error(err));

      return () => {

      };
   }, [src]);

   return (
      <div className="image-loader-container">
         {!isLoaded && (
         <div className="loader-overlay">
            <div className="loader-animation">
               {/* Replace this with your custom SVG animation */}
               <svg
               className="placeholder-svg"
               xmlns="http:
               viewBox="0 0 100 100"
               >
               <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#4caf50"
                  strokeWidth="5"
                  fill="none"
               />
               <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fontSize="20"
                  fill="#4caf50"
               >
                  Loading
               </text>
               </svg>
            </div>
            <div className="loader-progress">
               {progress}% {/* Shows the loading percentage */}
            </div>
         </div>
         )}
         <img
         src={src}
         alt={alt}
         className={\`\${className} image-loader-image\`}
         style={{ opacity: isLoaded ? 1 : 0 }}
         />
      </div>
   );
   };

   export default ImageLoader;
`;
const imageLoaderCSSCode = `
   .image-loader-container {
   position: relative;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   overflow: hidden;
   }

   .loader-overlay {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background: rgba(255, 255, 255, 0.8); /* Slight white overlay */
   z-index: 10;
   }

   .loader-animation {
   margin-bottom: 10px;
   }

   .placeholder-svg {
   width: 100px;
   height: 100px;
   animation: rotate 2s linear infinite;
   }

   @keyframes rotate {
   from {
      transform: rotate(0deg);
   }
   to {
      transform: rotate(360deg);
   }
   }

   .loader-progress {
   font-size: 1.5rem;
   color: #4caf50;
   font-weight: bold;
   }

   .image-loader-image {
   max-width: 100%;
   height: auto;
   transition: opacity 0.5s ease-in-out;
   }
`;
const imageLoaderSVGCode = `
   import { motion } from "framer-motion";

   const ImageLoaderSVG = () => {
      return (
         <svg
            width='3082'
            height='3082'
            viewBox='0 0 3082 3082'
            fill='none'
            xmlns='http:
         >
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 4, ease: "linear", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M2464.25 2774.81C2786.8 2533.45 3002.01 2175.37 3063.78 1777.28C3125.55 1379.18 3028.96 972.724 2794.72 644.968C2560.47 317.211 2207.19 94.2194 1810.54 23.7553C1413.89 -46.7088 1005.41 40.9585 672.611 267.98C339.808 495 109.14 843.322 30.0153 1238.33C-49.1098 1633.35 29.6001 2043.64 249.286 2381.33C468.971 2719.02 812.163 2957.25 1205.35 3045C1598.54 3132.75 2010.45 3063.03 2352.87 2850.79L2064.99 2386.35C1843.99 2523.33 1578.14 2568.33 1324.37 2511.69C1070.6 2455.06 849.106 2301.3 707.32 2083.35C565.533 1865.41 514.733 1600.6 565.801 1345.66C616.869 1090.71 765.743 865.905 980.536 719.385C1195.33 572.864 1458.96 516.283 1714.96 561.761C1970.96 607.239 2198.97 751.159 2350.16 962.695C2501.34 1174.23 2563.68 1436.56 2523.81 1693.49C2483.94 1950.43 2345.05 2181.53 2136.87 2337.31L2464.25 2774.81Z'
               fill='#3C493D'
            />
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: -360 }}
               transition={{ duration: 5, ease: "easeIn", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M106.965 1774.99C154.874 2068.61 291.756 2340.44 499.115 2553.76C706.475 2767.08 974.318 2911.61 1266.46 2967.83L1329.8 2638.64C1105.06 2595.4 899.008 2484.21 739.488 2320.11C579.968 2156 474.667 1946.88 437.811 1721.01L106.965 1774.99Z'
               fill='#BE2809'
            />
            {/* <motion.circle cx="1541" cy="1541" r="1271" stroke="#1EBCDC" stroke-width="250" stroke-dasharray="100 100" initial={{ rotate: 0 }} animate={{ rotate: -360 }} transition={{ duration: 5, ease: "easeIn", repeat: Infinity }} /> */}
            {/* <motion.circle cx="1541" cy="1541" r="1271" stroke="#1EBCDC" stroke-width="250" stroke-dasharray="100 100" initial={{ rotate: 0 }} animate={{ rotate: -360 }} transition={{ duration: 5, ease: "easeIn", repeat: Infinity }} style={{ originX: "50%", originY: "50%" }}/> */}
            {/* <circle cx="1541" cy="1541" r="1271" stroke="#1EBCDC" stroke-width="250" stroke-dasharray="100 100"/> */}
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 6, ease: "easeOut", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M2847.83 2267.11C2949.11 2084.83 3011.13 1883.38 3029.92 1675.7C3048.71 1468.02 3023.84 1258.71 2956.92 1061.21C2890 863.712 2782.5 682.4 2641.33 528.923C2500.16 375.446 2328.45 253.199 2137.22 170.036C1946 86.8727 1739.49 44.6341 1530.97 46.0337C1322.44 47.4333 1116.52 92.4402 926.428 178.163C736.335 263.885 566.278 388.426 427.184 543.785C288.089 699.143 183.034 881.882 118.768 1080.26L446.891 1186.56C496.33 1033.95 577.148 893.368 684.152 773.852C791.156 654.336 921.979 558.528 1068.22 492.582C1214.45 426.637 1372.87 392.013 1533.28 390.937C1693.69 389.86 1852.56 422.354 1999.67 486.33C2146.78 550.307 2278.87 644.351 2387.47 762.419C2496.07 880.488 2578.77 1019.97 2630.25 1171.9C2681.74 1323.83 2700.87 1484.86 2686.41 1644.62C2671.96 1804.39 2624.24 1959.36 2546.33 2099.59L2847.83 2267.11Z'
               fill='#FF8000'
            />
            <motion.circle
               cx='1541'
               cy='1541'
               r='1271'
               stroke='#1EBCDC'
               strokeWidth='250'
               strokeDasharray='100 100'
               fill='transparent'
               style={{
                  originX: "50%",
                  originY: "50%",
               }}
               animate={{
                  rotate: 360,
               }}
               transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "linear",
               }}
            />
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M2443.14 2607.8C2662.4 2422.36 2819.18 2173.82 2892.15 1896.03C2965.12 1618.23 2950.72 1324.69 2850.91 1055.38C2751.1 786.072 2570.74 554.081 2334.39 391.005C2098.03 227.93 1817.18 141.695 1530.07 144.047L1531.69 342.385C1778.04 340.367 2019.02 414.358 2221.81 554.28C2424.61 694.203 2579.37 893.256 2665 1124.33C2750.64 1355.4 2762.99 1607.27 2700.39 1845.62C2637.78 2083.97 2503.25 2297.23 2315.13 2456.34L2443.14 2607.8Z'
               fill='#0E9DBA'
            />
            {/* <motion.circle
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
                  style={{ originX: "0%", originY: "0%" }}
                  r='1271'
                  stroke='#1EBCDC'
                  stroke-width='250'
                  stroke-dasharray='100 100'
                  /> */}
            {/* <motion.circle cx="1541" cy="1523" r="1271" stroke="#1EBCDC" stroke-width="250" stroke-dasharray="100 100"/> */}

            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: -360 }}
               transition={{ duration: 12, ease: "linear", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M301.123 899.502C186.139 1121.74 133.002 1370.8 147.272 1620.61C161.542 1870.43 242.695 2111.82 382.238 2319.52C521.781 2527.22 714.585 2693.59 940.471 2801.23C1166.36 2908.87 1417.02 2953.82 1666.24 2931.37L1643.64 2680.55C1439.39 2698.95 1233.94 2662.11 1048.8 2573.89C863.667 2485.67 705.645 2349.3 591.276 2179.07C476.906 2008.84 410.392 1811 398.697 1606.25C387.001 1401.5 430.552 1197.37 524.793 1015.23L301.123 899.502Z'
               fill='#88A751'
            />
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 5, ease: "linear", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M1935.7 142.637C1719.73 81.6756 1492.57 71.5699 1272.03 113.112C1051.49 154.654 843.578 246.715 664.584 382.076L786.248 542.958C940.394 426.387 1119.45 347.107 1309.37 311.331C1499.29 275.556 1694.92 284.259 1880.91 336.758L1935.7 142.637Z'
               fill='#F1D5AE'
            />
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M546.095 482.051C407.032 612.703 295.065 769.467 216.586 943.392C138.107 1117.32 94.653 1305 88.7059 1495.71L423.764 1506.16C428.339 1359.44 461.767 1215.06 522.141 1081.27C582.514 947.467 668.649 826.87 775.629 726.36L546.095 482.051Z'
               fill='#D8FE93'
            />
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 8, ease: "linear", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M2123.2 2724.55C2351.06 2612.47 2541.72 2436.99 2672.28 2219.2C2802.85 2001.41 2867.77 1750.56 2859.26 1496.77L2625.11 1504.62C2632.12 1713.33 2578.73 1919.63 2471.35 2098.74C2363.97 2277.85 2207.18 2422.16 2019.79 2514.34L2123.2 2724.55Z'
               fill='#E45C04'
            />
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: -360 }}
               transition={{ duration: 10, ease: "linear", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M606.559 503.872C466.976 629.634 354.216 782.277 275.034 952.658C195.852 1123.04 151.877 1307.65 145.744 1495.43L359.248 1502.4C364.443 1343.36 401.688 1187 468.754 1042.69C535.82 898.378 631.325 769.092 749.548 662.574L606.559 503.872Z'
               fill='#184D5D'
            />
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M2676.89 1286.74C2620.31 1033.96 2481.03 807.278 2281.09 642.579C2081.16 477.88 1832 384.577 1573.06 377.442L1570.04 487.216C1804.54 493.677 2030.2 578.178 2211.27 727.339C2392.34 876.5 2518.48 1081.8 2569.73 1310.73L2676.89 1286.74Z'
               fill='#32DCFE'
            />
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 9, ease: "linear", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M384.541 1408.72C366.746 1564.29 380.522 1721.85 425.044 1871.97C469.567 2022.09 543.92 2161.68 643.654 2282.39C743.388 2403.11 866.452 2502.46 1005.48 2574.5C1144.51 2646.54 1296.64 2689.78 1452.77 2701.65L1461.1 2592.15C1319.69 2581.4 1181.91 2542.24 1056 2476.99C930.091 2411.75 818.637 2321.77 728.312 2212.45C637.988 2103.12 570.649 1976.7 530.327 1840.74C490.005 1704.78 477.529 1562.09 493.645 1421.2L384.541 1408.72Z'
               fill='#D8FE93'
            />
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: -360 }}
               transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M2218.76 2591.31C2013.72 2723.62 1774.44 2793.02 1530.43 2790.96L1531.37 2679.21C1753.57 2681.09 1971.46 2617.89 2158.16 2497.41L2218.76 2591.31Z'
               fill='#F7D3B9'
            />
            <motion.path
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 10, ease: "linear", repeat: Infinity }}
               style={{ originX: "50%", originY: "50%" }}
               d='M391.874 1923.14C460.675 2130.03 584.054 2314.51 748.989 2457.1L805.507 2391.73C652.342 2259.31 537.768 2088 473.877 1895.87L391.874 1923.14Z'
               fill='#0E9DBA'
            />
         </svg>
      );
   };

   export default ImageLoaderSVG;

`;
const imageLoaderUsageCode = `
   import React from "react";
   import ImageLoader from "./ImageLoader";

   const App = () => {
   return (
      <div>
         <ImageLoader
         src="https:
         alt="Sample Image"
         />
      </div>
   );
   };

   export default App;
   \`;
`;

const PercentageSVG2: React.FC<ImageLoaderProps> = ({ timerDuration = 10000 }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
		}, timerDuration / 100);

		return () => clearInterval(interval);
	}, [timerDuration]);

	return (
		<>
			<div className='container'>
				<AnimatePresence>
					<div className='loader-container'>
						<div className='counter-container'>
							<p className='loading-text'>LOADING...</p>
							<h1 className='countdown-text'>
								<span>{progress}</span>
								<span>%</span>
							</h1>
						</div>
						<div className='circular-svg w-72 h-72 border border-primary-500'>
							<CircularSVG2 />
						</div>
					</div>
				</AnimatePresence>

				{/* <LoadingOverlay progress={progress} mode={mode} /> */}
			</div>
			<div>
				<div>Progress Indicators Codes:</div>
				<p className='mb-1'>ImageLoader.tsx</p>
				<CodeBlock code={imageLoaderTSXCode} language='TSX' fontSize='1rem' />
				<p className='mb-1'>ImageLoader.css</p>
				<CodeBlock code={imageLoaderCSSCode} language='CSS' fontSize='1rem' />
				<p className='mb-1'>ImageLoaderSVG.tsx</p>
				<CodeBlock code={imageLoaderSVGCode} language='CSS' fontSize='1rem' />
				<p className='mb-1'>Usage: In a parent component</p>
				<CodeBlock code={imageLoaderUsageCode} language='TSX' fontSize='1rem' />
			</div>
		</>
	);
};

export default PercentageSVG2;
```

# src/components/blog-components/articles/Spinner.css

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
	animation: spin 4s ease-in-out infinite;
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

# src/components/blog-components/articles/Spinner.jsx

```jsx
"use client";
import "./Spinner.css";
import { CodeBlock } from "@/components/blog-components/CodeBlock";

const Spinner = () => {
	const htmlCode = `
      /*-= Usage =-*/

      <div className='spinner-container'>
         <div className='spinner'></div>
      </div>
   `;

	const cssCode = `
      /*-= CSS Styling & Animation =-*/

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
			<p>Simple Spinner Codes:</p>
			<CodeBlock code={htmlCode} language='HTML' fontSize='1rem' />
			<CodeBlock code={cssCode} language='CSS' fontSize='1rem' />
		</>
	);
};

export default Spinner;
```

# src/components/blog-components/articles/SpinningDots.tsx

```tsx
"use client";
import { motion } from "framer-motion";

const SpinningDots = () => {
	const rotations = [
		{ speed: 2, color: "magenta" },
		{ speed: 3, color: "cyan" },
		{ speed: 5, color: "yellow" },
		{ speed: 7, color: "black" },
	];

	return (
		<svg width='300' height='300' viewBox='0 0 300 300'>
			<circle cx='150' cy='150' r='110' stroke='grey' strokeWidth='2' fill='transparent' />
			{rotations.map((item, index) => (
				<motion.circle
					key={index}
					cx='100'
					cy='50'
					r='20'
					fill={item.color}
					style={{
						originX: "50%",
						originY: "50%",
					}}
					animate={{
						rotate: 360,
					}}
					transition={{
						repeat: Infinity,
						duration: item.speed,
						ease: "linear",
					}}
				/>
			))}
		</svg>
	);
};

export default SpinningDots;
```

# src/components/blog-components/BubbleLoader.css

```css
@keyframes rise {
	0% {
		transform: translateY(100%) scale(0);
		opacity: 0;
	}
	20% {
		opacity: 0.5;
		transform: translateY(80%) scale(0.8);
	}
	80% {
		opacity: 0.8;
		transform: translateY(20%) scale(1);
	}
	100% {
		transform: translateY(-100%) scale(1);
		opacity: 0;
	}
}

.animate-rise {
	animation: rise 4s ease-out forwards;
}

/* Prevent animation flash on page load */
@media (prefers-reduced-motion: no-preference) {
	.animate-rise {
		will-change: transform, opacity;
	}
}
```

# src/components/blog-components/BubbleLoader.module.css

```css
.container {
	position: relative;
	width: 100%;
	max-width: 32rem;
	margin: 0 auto;
	isolation: isolate;
}

.loaderBox {
	position: relative;
	aspect-ratio: 16/9;
	background: #1f2937;
	border-radius: 0.5rem;
	overflow: hidden;
}

.playButton {
	position: absolute;
	inset: 0;
	margin: auto;
	width: 4rem;
	height: 4rem;
	border-radius: 9999px;
	background-color: #3b82f6;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	cursor: pointer;
	transition: all 200ms;
	z-index: 10;
}

.playButton:hover {
	background-color: #2563eb;
	transform: scale(1.1);
}

.progressBar {
	position: absolute;
	bottom: 0;
	left: 0;
	height: 0.25rem;
	background-color: #3b82f6;
	transition: width 300ms ease-out;
}

.progressText {
	position: absolute;
	top: 1rem;
	left: 1rem;
	font-size: 1.125rem;
	font-weight: 600;
	color: white;
}

.bubble {
	position: absolute;
	border-radius: 9999px;
	background-color: rgba(96, 165, 250, 0.5);
	backdrop-filter: blur(4px);
	cursor: pointer;
	animation: rise 4s ease-out forwards;
	will-change: transform, opacity;
}

@keyframes rise {
	0% {
		transform: translateY(100%) scale(0);
		opacity: 0;
	}
	20% {
		transform: translateY(80%) scale(0.8);
		opacity: 0.5;
	}
	80% {
		transform: translateY(20%) scale(1);
		opacity: 0.8;
	}
	100% {
		transform: translateY(-100%) scale(1);
		opacity: 0;
	}
}
```

# src/components/blog-components/BubbleLoader.tsx

```tsx
/*-= src/components/blog-components/BubbleLoader.tsx =-*/
/*- Interactive Bubble Loader -*/
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

interface BubbleLoaderProps {
	duration?: number;
	onComplete?: () => void;
}

interface Bubble {
	id: number;
	x: number;
	size: number;
	color: string;
	delay: number;
}

const BubbleLoader: React.FC<BubbleLoaderProps> = ({ duration = 5000, onComplete }) => {
	const [isActive, setIsActive] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [progress, setProgress] = useState(0);
	const [bubbles, setBubbles] = useState<Bubble[]>([]);
	const [points, setPoints] = useState(0);
	const progressIntervalRef = useRef<NodeJS.Timer>();
	const bubbleIntervalRef = useRef<NodeJS.Timer>();

	const colors = ["#60A5FA", "#C084FC", "#34D399", "#F472B6", "#A5B4FC", "#93C5FD", "#F9A8D4", "#86EFAC", "#38BDF8", "#FB7185", "#4ADE80", "#F472B6"];

	const handleBubblePop = (id: number) => {
		setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
		setPoints((prev) => prev + 10);
	};

	const startLoader = () => {
		setIsActive(true);
		setProgress(0);
		setBubbles([]);
		setPoints(0);
		setIsComplete(false);

		bubbleIntervalRef.current = setInterval(() => {
			setBubbles((prev) => [
				...prev.slice(-20),
				{
					id: Date.now(),
					x: Math.random() * 1000,
					size: Math.random() * 30 + 15,
					color: colors[Math.floor(Math.random() * colors.length)],
					delay: Math.random() * 0.5,
				},
			]);
		}, 200);

		progressIntervalRef.current = setInterval(() => {
			setProgress((prev) => {
				const newProgress = Math.min(prev + 1, 100);
				if (newProgress === 100) {
					if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
					if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
					setIsComplete(true);
					onComplete?.();
				}
				return newProgress;
			});
		}, duration / 100);
	};

	useEffect(() => {
		return () => {
			if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
			if (bubbleIntervalRef.current) clearInterval(bubbleIntervalRef.current);
		};
	}, []);

	return (
		<div className='relative w-full max-w-2xl mx-auto'>
			<div className='relative aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden'>
				{!isActive ? (
					<button onClick={startLoader} className='absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white'>
						<Play size={32} />
					</button>
				) : (
					<>
						<AnimatePresence>
							{isComplete ? (
								<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='absolute inset-0'>
									<Image src='/public/assets/Bubbles-Fishes.webp' alt='Bubbles & Fishes' fill className='object-cover' sizes='(max-width: 768px) 100vw, 32rem' />
								</motion.div>
							) : (
								<svg viewBox='0 0 1000 500' preserveAspectRatio='none' className='absolute inset-0 w-full h-full'>
									{bubbles.map((bubble) => (
										<motion.circle
											key={bubble.id}
											cx={bubble.x}
											r={bubble.size}
											fill={bubble.color}
											initial={{ cy: 500, opacity: 0 }}
											animate={{ cy: -50, opacity: [0, 0.8, 0] }}
											transition={{
												duration: 4,
												delay: bubble.delay,
												ease: "easeOut",
											}}
											onMouseEnter={() => handleBubblePop(bubble.id)}
											style={{ cursor: "pointer" }}
										/>
									))}
								</svg>
							)}
						</AnimatePresence>

						<div className='absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-purple-400 transition-all' style={{ width: `${progress}%` }} />
						<div className='absolute top-4 left-4 flex justify-between w-full px-4'>
							<span className='text-lg font-semibold text-white'>{Math.floor(progress)}%</span>
							<span className='text-lg font-semibold text-yellow-400'>Points: {points}</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default BubbleLoader;
```

# src/components/blog-components/BubbleLoaderApp.tsx

```tsx
"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const BubbleLoaderApp = dynamic(() => import("@/components/blog-components/BubbleLoader"), { ssr: false });

function MyPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			{/* <DynamicBubbleLoader */}
			<BubbleLoaderApp duration={5000} onComplete={() => console.log("Complete!")} />
		</Suspense>
	);
}

export default BubbleLoaderApp;
```

# src/components/blog-components/CodeBlock.tsx

```tsx
"use client";
import Prism from "prismjs";
import { useState, useEffect } from "react";
import { Copy, CheckCircle } from "lucide-react";
import "prismjs/themes/prism-tomorrow.css";

import "prismjs/components/prism-markup";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

type CodeBlockProps = {
	code: string;
	language?: string;
	fontSize?: string;
};

export function CodeBlock({ code, language = "typescript", fontSize = "1.875rem" }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

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
		<div className='relative group my-0'>
			<div className='absolute right-2 top-2 flex items-center space-x-2'>
				<span className='text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded'>{language}</span>
				<button onClick={handleCopy} className='p-2 text-gray-400 hover:text-white transition-colors'>
					{copied ? <CheckCircle size={16} className='text-green-500' /> : <Copy size={16} />}
				</button>
			</div>

			<pre className='!bg-[#282c34] max-h-[300px] max-w-[700px] p-4 mt-0 mb-8' style={{ fontSize }}>
				<code className={`language-${language}`}>{code}</code>
			</pre>
		</div>
	);
}

{
	/* <CodeBlock
  code={sampleCode}
  language="javascript"
  fontSize="1rem"
/> */
}
```

# src/components/blog-components/ImageLoader.css

```css
.image-loader-container {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}

.loader-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: rgba(255, 255, 255, 0.8); /* Slight white overlay */
	z-index: 10;
}

.loader-animation {
	margin-bottom: 10px;
	border: 1px solid red;
	width: 200px;
	height: 200px;
	margin: 5rem;
}
.loader-progress {
	font-size: 1.5rem;
	/* color: #4caf50; */
	font-weight: bold;
}

.placeholder-svg {
	width: 100px;
	height: 100px;
	animation: rotate 2s linear infinite;
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.image-loader-image {
	max-width: 100%;
	height: auto;
	transition: opacity 0.5s ease-in-out;
}
```

# src/components/blog-components/ImageLoader.tsx

```tsx
"use client";
import React, { useState, useEffect } from "react";
import "./ImageLoader.css";
import "./articles/PercentageSVG2.css";
import Image from "next/image";
import CircularSVG2 from "./articles/CircularSVG2";

import { AnimatePresence } from "framer-motion";

const ImageLoader = ({ src, alt }: { src: string; alt: string }) => {
	const [progress, setProgress] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const loadImage = (src: string): Promise<void> => {
			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.open("GET", src, true);
				xhr.responseType = "arraybuffer";

				xhr.onprogress = (event) => {
					if (event.lengthComputable) {
						const percentComplete = (event.loaded / event.total) * 100;
						setProgress(Math.round(percentComplete));
					}
				};

				xhr.onload = () => {
					if (xhr.status === 200) {
						setProgress(100);
						resolve();
					} else {
						reject(new Error(`Failed to load image: ${xhr.statusText}`));
					}
				};

				xhr.onerror = () => reject(new Error("Error loading image"));
				xhr.send();
			});
		};

		loadImage(src)
			.then(() => setIsLoaded(true))
			.catch((err) => console.error(err));

		return () => {};
	}, [src]);

	return (
		<>
			<div className='image-loader-container'>
				{!isLoaded && (
					<div className='loader-overlay'>
						<div className='loader-animation'></div>
						<CircularSVG2 />
						<div className='loader-progress'>
							{progress}% {/* Shows the loading percentage */}
						</div>
					</div>
				)}
				<Image src={src} alt={alt} width={500} height={300} />
			</div>
		</>
	);
};

export default ImageLoader;
```

# src/components/blog-components/ImageLoaderApp.tsx

```tsx
import React from "react";
import "./ImageLoader.css";

interface ImageLoaderProps {
	src: string;
	alt: string;
	className?: string;
}

const ImageLoaderApp: React.FC<ImageLoaderProps> = ({ src, alt, className }) => {
	return (
		<div className='image-loader-container'>
			<div className='loader-overlay'>Loading...</div>
			<img src={src} alt={alt} className={`image-loader-image ${className || ""}`} />
		</div>
	);
};

export default ImageLoaderApp;
```

# src/components/blog-components/InteractiveChartPost.tsx

```tsx
"use client";
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function InteractiveChartPost() {
	const [timeframe, setTimeframe] = useState("1y");

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
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={data[timeframe]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='date' stroke='#9CA3AF' tick={{ fill: "#9CA3AF" }} />
						<YAxis yAxisId='left' stroke='#9CA3AF' tick={{ fill: "#9CA3AF" }} />
						<YAxis yAxisId='right' orientation='right' stroke='#9CA3AF' tick={{ fill: "#9CA3AF" }} />
						<Tooltip
							contentStyle={{
								backgroundColor: "#1F2937",
								border: "none",
								borderRadius: "0.5rem",
								color: "#F3F4F6",
							}}
						/>
						<Legend />
						<Line yAxisId='left' type='monotone' dataKey='users' stroke='#3B82F6' strokeWidth={2} dot={{ fill: "#3B82F6", strokeWidth: 2 }} activeDot={{ r: 8 }} />
						<Line yAxisId='right' type='monotone' dataKey='revenue' stroke='#10B981' strokeWidth={2} dot={{ fill: "#10B981", strokeWidth: 2 }} activeDot={{ r: 8 }} />
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

import Spinner from "./articles/Spinner";

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
						<button onClick={() => setCount((c) => c - 1)} className={`px-4 py-2 rounded text-white ${colors[theme]}`}>
							Decrease
						</button>
						<button onClick={() => setCount(0)} className='px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white'>
							Reset
						</button>
						<button onClick={() => setCount((c) => c + 1)} className={`px-4 py-2 rounded text-white ${colors[theme]}`}>
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

# src/components/blog-components/LazyImageLoader.tsx

```tsx
"use client";
import React, { useState, useEffect, useRef } from "react";

const BubbleLoader = React.lazy(() => import("./BubbleLoader"));

const LazyImageLoader: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const loaderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
		};
	}, []);

	const handleLoaderComplete = () => {
		setIsLoaded(true);
	};

	return (
		<div ref={loaderRef} style={{ position: "relative", minHeight: "300px" }}>
			{!isLoaded && isVisible && (
				<React.Suspense fallback={<div>Loading animation...</div>}>
					<BubbleLoader duration={5000} onComplete={handleLoaderComplete} />
				</React.Suspense>
			)}
			{isLoaded && <img src={src} alt={alt} style={{ display: "block", width: "100%", height: "auto", objectFit: "cover" }} />}
		</div>
	);
};

export default LazyImageLoader;
```

# src/components/blog-components/LoaderComponentPost.tsx

```tsx
"use client";
import React, { Suspense } from "react";
import Spinner from "./articles/Spinner";
import ImageLoader from "./ImageLoader";

import dynamic from "next/dynamic";

const PercentageSVG2 = React.lazy(() => import("./articles/PercentageSVG2"));

const BubbleLoader = dynamic(() => import("./BubbleLoader"), {
	ssr: false,
	loading: () => <div className='w-full max-w-2xl mx-auto aspect-[16/9] bg-gray-800 rounded-lg' />,
});

const LoaderComponentPost = () => {
	return (
		<div>
			<div className=''>The concept of loaders on the web has come a long way, mirroring the evolution of user expectations and advancements in web technologies. Initially a functional necessity, loaders have transformed into a critical UX element designed to improve user engagement and reduce perceived wait times. Here’s a look at their progression:</div>

			{/*---= Simple Spinner =---*/}
			<div>
				<h3>Simple Spinner:</h3>
				<div>Web Loaders In the early days of the web, spinner loaders were the norm. These were simple, often animated GIFs or CSS-based circular animations designed to inform users that the application was processing a request or loading content. While functional, spinners had several limitations:</div>
				<ul>
					<li>They provided no context or feedback about the progress or what was loading.</li>
					<li>They increased perceived wait times due to their generic nature.</li>
					<li>Users had no way of knowing how long they needed to wait. Despite these drawbacks, spinners were lightweight and easy to implement, making them a staple in early web applications.</li>
				</ul>

				<Spinner />
			</div>
			<div>
				<h4>Simpler Still:</h4>
				<p>Loading...</p>
			</div>

			{/*---= Progress Indicator =---*/}
			<div className='mt-20'>
				<h3>Progress Indicators:</h3>
				<div>A Step Toward Transparency To address the shortcomings of spinners, progress indicators became more common. These loaders, often seen as progress bars, provided users with real-time feedback on the percentage of data loaded. </div>
				<div>Examples included:</div>
				<ul>
					<li>Linear progress bars (e.g., the classic loading bar).</li>
					<li>Circular progress indicators showing incremental loading. Progress indicators improved user satisfaction by setting clearer expectations about wait times but were limited to applications where precise loading percentages could be calculated.</li>
				</ul>
			</div>

			{/* <SpinningDots /> */}
			{/* <CircularLoader timer={4} /> */}
			{/* <ImageLoader /> */}
			<Suspense fallback={<div>Loading...</div>}>
				<PercentageSVG2 />
			</Suspense>

			<ImageLoader src='/assets/somethingBig.png' alt='Sample Image' />

			{/*---= Skeleton Loader =---*/}
			<div>
				<h3>Content-Aware Loaders:</h3>
				<div>Placeholder and Skeleton Loaders As web applications became more dynamic and content-rich, spinners and progress bars were deemed insufficient. Users expected faster and more intuitive interactions. This led to the rise of placeholder and skeleton loaders, which provided a more contextual loading experience. Placeholder Loaders Placeholder loaders temporarily replaced content with blank or generic shapes resembling the final layout. These loaders made pages feel faster by giving users a visual cue about what to expect. Skeleton Loaders A more advanced version of placeholder loaders, skeleton loaders show a framework of the content being loaded (e.g., grey boxes for images or text). These loaders:</div>
				<ul>
					<li>Mimic the structure of the actual content.</li>
					<li>Create an illusion of faster loading by appearing closer to the final design.</li>
					<li>Offer a smoother visual transition from “loading” to “loaded.” Skeleton loaders became popular with modern frameworks like React, Angular, and Vue, where tools like React Content Loader and NgxSkeletonLoader emerged.</li>
				</ul>
				<h3>Shimmer Effects:</h3>
				<div>Adding Motion for Perceived Speed Skeleton loaders evolved further with the introduction of shimmer effects—animated gradients that sweep across the skeleton layout. Shimmer effects:</div>
				<ul>
					<li>Give users a sense of progress even when the loading time is static.</li>
					<li>Add a modern, polished touch to loaders.</li>
					<li>Are lightweight to implement using CSS or libraries. Apps like Facebook and LinkedIn popularized shimmer skeleton loaders, setting a new standard for modern web loaders.</li>
				</ul>
				<h3>Intelligent Loaders:</h3>
				<div>AI and Predictive Loading Today, loaders are becoming smarter, leveraging AI and predictive techniques to optimize the loading experience. Examples include:</div>
				<ul>
					<li>Progressive Rendering: Content is rendered in chunks, with critical sections prioritized, reducing the need for noticeable loaders.</li>
					<li>Lazy Loading: Loaders are triggered only when content comes into view, improving perceived performance.</li>
					<li>Preemptive Loading: AI analyzes user behavior to predict what they might view next and preloads content, reducing the need for loaders altogether.</li>
				</ul>

				{/*---= Gamified Loader =---*/}
				<h3>The Future of Loaders:</h3>
				<div>Micro-Interactions and Beyond Modern loaders are shifting away from “waiting indicators” toward micro-interactions that subtly entertain or engage users. This includes:</div>
				<ul>
					<li>Gamified Loaders: Interactive loaders that turn waiting into a playful experience.</li>
					<li>Personalized Loaders: Custom messages or visuals that align with user preferences.</li>
					<li>Invisible Loaders: Innovations like instantaneous loading states (e.g., skeleton loaders seamlessly integrated into the DOM) make traditional loaders less noticeable. With the rise of WebAssembly and edge computing, loaders might one day become obsolete as websites achieve near-instantaneous load times. Conclusion The evolution of loaders reflects the changing landscape of web development and user expectations. From simple spinners to sophisticated skeleton loaders and intelligent predictive systems, loaders have transformed into a critical component of user experience. As web technologies continue to advance, the focus will increasingly shift toward making loaders seamless, invisible, or entirely unnecessary.</li>
				</ul>
				<div className='p-4'>
					<BubbleLoader duration={5000} onComplete={() => console.log("Animation complete")} />
				</div>
				{/* <BubbleLoader
               duration={5000}
               bubbleCount={15}
               minSize={15}
               maxSize={35}
               primaryColor="rgb(99, 102, 241)"
               secondaryColor="rgb(67, 56, 202)"
               onComplete={() => console.log('Loading complete')}
            /> */}
			</div>
		</div>
	);
};

export default LoaderComponentPost;
```

# src/components/blog/AuthorInfo.tsx

```tsx
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
			<Image src='/assets/LittleLloyd-FB.jpg' alt='R.Lloyd Gonzales' width={56} height={56} className='border border-gray-500 rounded-full' />
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
			<button onClick={handleCopy} className='absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors' aria-label='Copy code'>
				{copied ? <CheckCircle size={16} className='text-green-500' /> : <Copy size={16} />}
			</button>

			{/* Code Content */}
			<pre className='p-4 bg-gray-900 rounded-lg overflow-x-auto'>
				<code className='relative flex'>
					{showLineNumbers && (
						<div className='pr-4 text-gray-500 select-none text-right'>
							{code.split("\n").map((_, i) => (
								<span key={i} className='block'>
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
import Image from "next/image";

type CoverImageProps = {
	src?: string;
	alt: string;
};

export function CoverImage({ src, alt }: CoverImageProps) {
	if (!src) return null;

	return (
		<div className='relative aspect-[2/1] rounded-lg overflow-hidden mb-8'>
			<Image src={src} alt={alt} fill className='object-cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw' priority />
		</div>
	);
}
```

# src/components/blog/dashboard/CategoryButtons.tsx

```tsx
import { categories, CategoryId } from "@/data/categories";

type CategoryButtonsProps = {
	activeCategory: CategoryId | null;
	onCategoryChange: (category: CategoryId | null) => void;
};

export function CategoryButtons({ activeCategory, onCategoryChange }: CategoryButtonsProps) {
	const getBackgroundColor = (isActive: boolean) => {
		return isActive ? "bg-primary-600 hover:bg-primary-700" : "bg-gray-800 hover:bg-gray-700";
	};

	const getTextColor = (isActive: boolean) => {
		return isActive ? "text-white" : "text-gray-300 hover:text-white";
	};

	const getIconColor = (isActive: boolean) => {
		return isActive ? "text-white" : "text-primary-400 group-hover:text-primary-300";
	};

	return (
		<div className='categoryButtonsContainer grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4'>
			{categories.map((category) => {
				const Icon = category.icon;
				const isActive = activeCategory === category.id;
				return (
					<button
						key={category.id}
						onClick={() => onCategoryChange(activeCategory === category.id ? null : category.id)}
						className={`group p-3 sm:p-4 rounded-lg flex items-center justify-center sm:justify-start
              space-x-2 transition-all ${getBackgroundColor(isActive)}`}
					>
						<Icon size={20} className={getIconColor(isActive)} />
						<span className={`hidden sm:inline font-medium ${getTextColor(isActive)}`}>{category.name}</span>
					</button>
				);
			})}
		</div>
	);
}
```

# src/components/blog/dashboard/DynamicComponentPreview.tsx

```tsx
import dynamic from "next/dynamic";

type DynamicComponentPreviewProps = {
	componentName: string;
	props?: Record<string, unknown>;
};

export function DynamicComponentPreview({ componentName, props = {} }: DynamicComponentPreviewProps) {
	const Component = dynamic(() => import(`@/components/blog-components/${componentName}`), {
		loading: () => (
			<div className='flex items-center justify-center h-full bg-gray-800'>
				<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500' />
			</div>
		),
		ssr: true,
	});

	return <Component {...props} />;
}
```

# src/components/blog/dashboard/FeaturedCard.tsx

```tsx
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { DynamicComponentPreview } from "./DynamicComponentPreview";
import type { Post, GridSize } from "./types";

type Category = (typeof categories)[number] & {
	gradient: string;
};

type FeaturedCardProps = {
	post?: Post;

	category: Category;
	size: GridSize;
	title?: string;
	description?: string;
};

function PostContent({ post, category }: { post: Post; category: Category }) {
	if (post.cover_image) {
		return (
			<div className='absolute inset-0'>
				<Image src={post.cover_image} alt={post.title} fill className='object-cover transition-transform duration-500 group-hover:scale-105' sizes='(max-width: 768px) 100vw, 50vw' priority />
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
			</div>
		);
	}

	if (post.type === "component" && post.component_name) {
		return (
			<div className='absolute inset-0'>
				<DynamicComponentPreview componentName={post.component_name} props={post.component_props} />
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-primary-800/60 to-transparent' />
			</div>
		);
	}

	return <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />;
}

export function FeaturedCard({ post, category, size = "medium", title, description }: FeaturedCardProps) {
	const cardClasses = `relative overflow-hidden rounded-xl bg-primary-800
    ${size === "large" ? "row-span-2 col-span-2" : size === "full" ? "col-span-full" : "col-span-1"}
    transition-transform duration-300 hover:scale-[1.02]`;

	if (!post) {
		return (
			<div className={cardClasses}>
				<div className='aspect-[16/9] relative'>
					<div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50`}>
						<div className='absolute inset-0 p-6 flex items-center justify-center'>
							<p className='text-xl text-white/70'>No {category.name} posts yet</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={cardClasses}>
			<Link href={`/blog/${post.slug}`} className='block h-64 sm:h-96 aspect-[16/9]'>
				<PostContent post={post} category={category} />
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
		</div>
	);
}
```

# src/components/blog/dashboard/index.tsx

```tsx
"use client";
import { useState, useEffect } from "react";
import { categories, CategoryId } from "@/data/categories";
import { CategoryButtons } from "./CategoryButtons";
import { FeaturedCard } from "./FeaturedCard";
import { PostGrid } from "./PostGrid";
import type { Post, FeaturedSetup } from "./types";

type DashboardProps = {
	posts: Post[];
	featuredSetup: FeaturedSetup;
};

export default function BlogDashboard({ posts, featuredSetup }: DashboardProps) {
	const [mounted, setMounted] = useState(false);
	const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const featuredPosts = featuredSetup.map((setup) => ({
		post: posts.find((p) => p.category === setup.category),
		...setup,
	}));

	const featuredIds = featuredPosts.map((f) => f.post?.id).filter(Boolean) as string[];
	const remainingPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => !featuredIds.includes(post.id));

	const activeCategoryData = activeCategory ? categories.find((c): c is (typeof categories)[number] => c.id === activeCategory) : null;

	return (
		<div className='max-w-page mx-auto px-4 py-8 space-y-8'>
			<CategoryButtons activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

			{/* {!activeCategory && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
					{featuredPosts.map(({ post, category, size, title, description }) => (
						<FeaturedCard
							key={post?.id}
							post={post}
							category={categories.find((c) => c.id === category)!}
							size={size}
							title={title}
							description={description}
						/>
					))}
				</div>
			)} */}

			{!activeCategory && (
				<div className='featuredPostsContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
					{featuredPosts.map(({ post, category, size, title, description }) => {
						const categoryData = categories.find((c): c is (typeof categories)[number] => c.id === category);
						if (!categoryData) return null;

						return <FeaturedCard key={post?.id ?? category} post={post} category={categoryData} size={size} title={title} description={description} />;
					})}
				</div>
			)}

			{/* <div>
				<h2 className='text-2xl font-bold mb-2'>{activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All Posts"}</h2>
				{activeCategory && <p className='text-gray-400 text-lg mt-0 mb-6'>{categories.find((c) => c.id === activeCategory)?.description}</p>}
				<PostGrid posts={remainingPosts} />
			</div> */}
			<div>
				<h2 className='text-2xl font-bold mb-2'>{activeCategoryData?.name ?? "All Posts"}</h2>
				{activeCategoryData && <p className='text-gray-400 text-lg mt-0 mb-6'>{activeCategoryData.description}</p>}
				<PostGrid posts={remainingPosts} />
			</div>
		</div>
	);
}
```

# src/components/blog/dashboard/PostGrid.tsx

```tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { categories, CategoryId } from "@/data/categories";

import type { Post } from "./types";

function PostContent({ post }: { post: Post }) {
	if (post.cover_image) {
		return (
			<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
				<Image src={post.cover_image} alt={post.title} fill className='object-cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
			</div>
		);
	}

	if (post.cover_image) {
		return (
			<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>
				<Image src={post.cover_image} alt={post.title} fill className='object-cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
			</div>
		);
	}

	return <div className='aspect-[16/9] relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-md' />;
}

function CategoryLabel({ categoryId }: { categoryId: CategoryId }) {
	const category = categories.find((c) => c.id === categoryId);
	return <span className={`text-sm ${category?.textColor || "text-gray-400"}`}>{category?.name || "Uncategorized"}</span>;
}

export function PostGrid({ posts }: { posts: Post[] }) {
	return (
		<div className='allPostsGridContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
			{posts.map((post) => (
				<Link
					key={post.id}
					href={`/blog/${post.slug}`}
					className='group bg-white dark:bg-primary-800 p-2 rounded-lg overflow-hidden
            shadow-lg hover:shadow-xl transition-shadow border border-primary-900/10'
				>
					<PostContent post={post} />
					<div className='p-4'>
						<div className='flex justify-between items-center mb-2'>
							<CategoryLabel categoryId={post.category} />
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
	);
}
```

# src/components/blog/dashboard/types.ts

```ts
import { CategoryId } from "@/data/categories";

export type GridSize = "large" | "medium" | "full";

export type ComponentProps = {
	[key: string]: string | number | boolean | null | undefined | ComponentProps | Array<ComponentProps>;
};

export type Post = {
	id: string;
	title: string;
	content: string;
	type: "markdown" | "component";
	component_name?: string;
	component_props?: ComponentProps;
	excerpt: string;
	category: CategoryId;
	date: string;
	slug: string;
	cover_image?: string;
};

export type FeaturedSetup = Array<{
	category: CategoryId;
	size: GridSize;
	order: number;
	title?: string;
	description?: string;
}>;
```

# src/components/blog/EngagementBar.tsx

```tsx
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
				<button onClick={handleCopy} className='flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors'>
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
						<div key={i} className='table-row'>
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

					return <CodeBlock code={content} language={language} />;
				},
				img: ({ src, alt, ...props }) => {
					if (!src) return null;

					if (src.startsWith("http")) {
						return <img src={src} alt={alt || ""} className='rounded-lg max-w-full h-auto my-4' />;
					}

					const imageSrc = src.startsWith("/") ? src : `/${src}`;
					return (
						<div className='relative w-full aspect-[16/9] my-8'>
							<Image src={imageSrc} alt={alt || ""} fill className='object-cover rounded-lg' sizes='(max-width: 768px) 100vw, (max-width: 992px) 992px' loading='lazy' />
						</div>
					);
				},
			}}
		>
			{content}
		</ReactMarkdown>
	);
}
```

# src/components/BlogDashboard-Old.tsx

```tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, CategoryId } from "@/data/categories";

export type GridSize = "large" | "medium" | "full";

type Post = {
	id: string;
	title: string;
	content: string;
	type: "markdown" | "component";
	component_name?: string;
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
			<Link href={`/blog/${post.slug}`} className='block h-64 sm:h-96 aspect-[16/9]'>
				{post.cover_image ? (
					<div className='absolute inset-0'>
						<Image src={post.cover_image} alt={post.title} fill className='object-cover transition-transform duration-500 group-hover:scale-105' sizes={size === "full" ? "100vw" : "(max-width: 768px) 100vw, 50vw"} priority={size === "large"} />
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

	const featuredPosts = featuredSetup.map((setup) => ({
		post: posts.find((p) => p.category === setup.category),
		...setup,
	}));

	const featuredIds = featuredPosts.map((f) => f.post?.id).filter(Boolean);
	const remainingPosts = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts.filter((post) => !featuredIds.includes(post.id));

	return (
		<div className='max-w-page mx-auto px-4 py-8 space-y-8'>
			{/* Category buttons */}
			<div className='categoryButtonsContainer grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4'>
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
							<Icon size={20} className={getTextColor(category.id, isActive)} />
							<span className={`hidden sm:inline font-medium ${isActive ? "text-white" : getTextColor(category.id, false)}`}>{category.name}</span>
						</button>
					);
				})}
			</div>

			{/* Featured Posts Grid */}
			{!activeCategory && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>{featuredPosts.map(({ post, category, size, title, description }) => post && <FeaturedCard key={post.id} post={post} category={categories.find((c) => c.id === category)!} size={size} title={title} description={description} />)}</div>}

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
							<div className='aspect-[16/9] relative bg-gray-900 rounded-md overflow-hidden'>{post.cover_image && <Image src={post.cover_image} alt={post.title} fill className='object-cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />}</div>
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
```

# src/components/BlogPostContent-Old.tsx

```tsx
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
			{post.type === "markdown" ? <MarkdownRenderer content={post.content} /> : <DynamicComponentRenderer componentName={post.component_name} props={post.props} />}
		</div>
	);
}

function DynamicComponentRenderer({ componentName, props = {} }: { componentName: string; props?: Record<string, unknown> }) {
	const Component = dynamic(() => import(`@/components/blog-components/${componentName}`), {
		loading: () => <div>Loading component...</div>,
	});

	return <Component {...props} />;
}
```

# src/components/BlogPostContent.tsx

```tsx
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
					<CoverImage src={post.cover_image} alt={post.title} />

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
									<DynamicComponent componentName={post.component_name} props={post.component_props} />
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
```

# src/components/ClientOnly.tsx

```tsx
"use client";
import { useEffect, useState } from "react";

export function ClientOnly({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return <>{children}</>;
}
```

# src/components/Comments.tsx

```tsx
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
			<form onSubmit={handleSubmit} className='mb-8 space-y-4'>
				<div>
					<label className='block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400'>Name</label>
					<input type='text' value={authorName} onChange={(e) => setAuthorName(e.target.value)} className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400' required placeholder='Your name' />
				</div>
				<div>
					<label className='block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400'>Comment</label>
					<textarea value={content} onChange={(e) => setContent(e.target.value)} className='w-full p-2 border rounded bg-gray-100 text-gray-800 border-gray-400' rows={3} required placeholder='Write a comment...' />
				</div>
				<button type='submit' disabled={isSubmitting} className='bg-primary-500 text-gray-100 px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50'>
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
						<Image src='/assets/Be-the-first.png' alt='Be the first to comment' width={200} height={150} className='mx-auto mb-4' />
						<p className='text-gray-400'>No comments yet</p>
					</div>
				) : (
					comments.map((comment) => (
						<div key={comment.id} className='border border-gray-700 rounded p-4 bg-gray-800'>
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
			const { data: post, error: fetchError } = await supabaseClient.from("posts").select("id, author_id").eq("id", postId).single();

			if (fetchError) throw fetchError;

			const {
				data: { user },
				error: userError,
			} = await supabaseClient.auth.getUser();
			if (userError) throw userError;

			if (!user) {
				throw new Error("Not authenticated");
			}

			if (post.author_id !== user.id) {
				throw new Error("Not authorized to delete this post");
			}

			const { error: deleteError } = await supabaseClient.from("posts").delete().eq("id", postId).eq("author_id", user.id);

			if (deleteError) throw deleteError;

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
		<button onClick={handleDelete} disabled={isDeleting} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 flex items-center gap-2'>
			{isDeleting && <Loader2 className='animate-spin' size={16} />}
			{isDeleting ? "Deleting..." : "Delete Post"}
		</button>
	);
}
```

# src/components/EditForm.tsx

```tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/auth";
import { ImageUpload } from "@/components/ImageUpload";
import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
import { Loader2 } from "lucide-react";
import { categories, CategoryId } from "@/data/categories";

type Post = {
	id: string;
	title: string;
	content: string;
	type: "markdown" | "component";
	component_name?: string;
	component_props?: Record<string, unknown>;
	excerpt?: string;
	cover_image?: string;
	slug: string;
	category?: CategoryId;
	published?: boolean;
};

export function EditForm({ post }: { post: Post }) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		title: post.title,
		content: post.content,
		type: post.type || "markdown",
		component_name: post.component_name || "",
		component_props: post.component_props || {},
		excerpt: post.excerpt || "",
		cover_image: post.cover_image || "",
		category: post.category || ("tech" as CategoryId),
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const updateData = {
				...formData,
				updated_at: new Date().toISOString(),
				published: post.published,
			};

			const { error: updateError } = await supabaseClient.from("posts").update(updateData).eq("id", post.id);

			if (updateError) throw updateError;

			router.push(`/blog/${post.slug}`);
			router.refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to update post");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6 max-w-4xl mx-auto px-4'>
			{error && (
				<div className='bg-red-500/10 text-red-500 p-4 rounded' role='alert'>
					{error}
				</div>
			)}

			<div>
				<label htmlFor='post-type' className='block text-sm font-medium mb-2'>
					Post Type
				</label>
				<select
					id='post-type'
					value={formData.type}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							type: e.target.value as "markdown" | "component",
						}))
					}
					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
					aria-label='Select post type'
				>
					<option value='markdown'>Markdown</option>
					<option value='component'>React Component</option>
				</select>
			</div>

			<div>
				<label htmlFor='title' className='block text-sm font-medium mb-2'>
					Title
				</label>
				<input
					id='title'
					type='text'
					value={formData.title}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							title: e.target.value,
						}))
					}
					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
					required
					aria-label='Post title'
					placeholder='Enter post title'
				/>
			</div>

			<div>
				<label htmlFor='category' className='block text-sm font-medium mb-2'>
					Category
				</label>
				<select
					id='category'
					value={formData.category}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							category: e.target.value as CategoryId,
						}))
					}
					className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
					required
					aria-label='Select post category'
				>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor='excerpt' className='block text-sm font-medium mb-2'>
					Excerpt
				</label>
				<textarea
					id='excerpt'
					value={formData.excerpt}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							excerpt: e.target.value,
						}))
					}
					className='w-full p-2 border rounded h-24 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
					placeholder='Enter a brief excerpt of your post'
					aria-label='Post excerpt'
				/>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Cover Image</label>
				<ImageUpload
					onUploadComplete={(url) =>
						setFormData((prev) => ({
							...prev,
							cover_image: url,
						}))
					}
					existingUrl={formData.cover_image}
				/>
			</div>

			{formData.type === "markdown" ? (
				<div>
					<label className='block text-sm font-medium mb-2'>Content</label>
					<div className='border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden'>
						<RichMarkdownEditor
							initialContent={formData.content}
							onChange={(content) =>
								setFormData((prev) => ({
									...prev,
									content,
								}))
							}
						/>
					</div>
				</div>
			) : (
				<div className='space-y-4'>
					<div>
						<label htmlFor='component-name' className='block text-sm font-medium mb-2'>
							Component Name
						</label>
						<input
							id='component-name'
							type='text'
							value={formData.component_name}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									component_name: e.target.value,
								}))
							}
							className='w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
							placeholder='Enter component name'
							aria-label='Component name'
						/>
					</div>

					<div>
						<label htmlFor='component-props' className='block text-sm font-medium mb-2'>
							Component Props (JSON)
						</label>
						<textarea
							id='component-props'
							value={JSON.stringify(formData.component_props, null, 2)}
							onChange={(e) => {
								try {
									const props = JSON.parse(e.target.value);
									setFormData((prev) => ({
										...prev,
										component_props: props,
									}));
								} catch {}
							}}
							className='w-full h-64 p-4 font-mono text-sm bg-white dark:bg-gray-800 border rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
							placeholder='{}'
							aria-label='Component props in JSON format'
						/>
					</div>
				</div>
			)}

			<div className='flex gap-4'>
				<button type='submit' disabled={isSubmitting} className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2' aria-label={isSubmitting ? "Saving changes..." : "Save changes"}>
					{isSubmitting && <Loader2 className='animate-spin' size={16} />}
					{isSubmitting ? "Saving..." : "Save Changes"}
				</button>
				<button type='button' onClick={() => router.back()} className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600' aria-label='Cancel editing'>
					Cancel
				</button>
			</div>
		</form>
	);
}
```

# src/components/ImageUpload.tsx

```tsx
"use client";
import { useState } from "react";
import { supabaseClient } from "@/lib/auth";
import { Upload, Loader2 } from "lucide-react";
import Image from "next/image";

type ImageUploadProps = {
	onUploadComplete: (url: string) => void;
	existingUrl?: string;
};

export function ImageUpload({ onUploadComplete, existingUrl }: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [preview, setPreview] = useState<string | null>(existingUrl || null);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			setError("Please select an image file");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			setError("Image must be less than 5MB");
			return;
		}

		setIsUploading(true);
		setError(null);

		try {
			const fileExt = file.name.split(".").pop();
			const fileName = `${Date.now()}.${fileExt}`;

			const { error: uploadError, data } = await supabaseClient.storage.from("images").upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
			});

			if (uploadError) {
				throw new Error(uploadError.message);
			}

			const {
				data: { publicUrl },
			} = supabaseClient.storage.from("images").getPublicUrl(fileName);

			setPreview(publicUrl);
			onUploadComplete(publicUrl);
		} catch (err) {
			console.error("Upload error:", err);
			setError(err instanceof Error ? err.message : "Failed to upload image");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className='space-y-4'>
			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}

			<label className='block'>
				<div className='flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 cursor-pointer bg-gray-800'>
					<div className='space-y-2 text-center'>
						{isUploading ? (
							<div className='flex items-center gap-2 text-gray-300'>
								<Loader2 className='animate-spin' />
								<span>Uploading...</span>
							</div>
						) : (
							<>
								<Upload className='mx-auto text-gray-400' />
								<div className='text-gray-400'>Click to upload image</div>
								<div className='text-gray-500 text-sm'>Max size: 5MB</div>
							</>
						)}
					</div>
				</div>
				<input type='file' className='hidden' accept='image/*' onChange={handleFileChange} disabled={isUploading} />
			</label>

			{preview && (
				<div className='mt-4 relative aspect-video w-full max-w-sm'>
					<Image src={preview} alt='Upload preview' fill className='rounded border border-gray-700 object-cover' sizes='(max-width: 640px) 100vw, 384px' />
				</div>
			)}
		</div>
	);
}
```

# src/components/ImageWithFallback.tsx

```tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ImageWithFallbackProps {
	src: string;
	alt: string;
	className?: string;
	priority?: boolean;
}

export function ImageWithFallback({ src, alt, className = "", priority = false }: ImageWithFallbackProps) {
	const [error, setError] = useState(false);

	if (error) {
		return (
			<div className={`flex items-center justify-center bg-gray-900 ${className}`}>
				<ImageOff className='text-gray-600' size={48} />
			</div>
		);
	}

	return (
		<div className={`relative ${className}`}>
			<Image src={src} alt={alt} fill className='object-cover' onError={() => setError(true)} priority={priority} sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
		</div>
	);
}
```

# src/components/MobileNavbar.tsx

```tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabaseClient } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navLinks } from "@/data/navbarConfig";
import { usePathname, useRouter } from "next/navigation";

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
			<nav className='fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg transition-all z-50'>
				<div className='max-w-page mx-auto px-4'>
					<div className='flex justify-between items-center h-16'>
						<Link href={navLinks.brand.href} className='flex items-center'>
							<Image src={navLinks.brand.logo} alt={navLinks.brand.label} width={90} height={90} priority className='w-auto h-12' />
						</Link>

						{/* Desktop Navigation */}
						<div className='hidden md:flex items-center gap-6'>
							{navLinks.mainLinks.map((link) => {
								if ("authRequired" in link && link.authRequired && !isAuthenticated) return null;
								return (
									<Link key={link.href} href={link.href} className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>
										{link.label}
									</Link>
								);
							})}

							{isAuthenticated && isPost && (
								<>
									<Link href={`/blog/edit/${slug}`} className='px-3 py-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors'>
										Edit Post
									</Link>
									<button onClick={handleDelete} disabled={isDeleting} className='px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2'>
										{isDeleting && <Loader2 className='animate-spin' size={16} />}
										{isDeleting ? "Deleting..." : "Delete Post"}
									</button>
								</>
							)}

							<ThemeToggle />

							{isAuthenticated ? (
								<button onClick={() => supabaseClient.auth.signOut()} className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'>
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

						{/* Mobile Menu Button */}
						<div className='md:hidden flex items-center gap-4'>
							<ThemeToggle />
							<button onClick={() => setIsOpen(!isOpen)} className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>
								{isOpen ? <X size={24} /> : <Menu size={24} />}
							</button>
						</div>
					</div>

					{/* Mobile Menu */}
					{isOpen && (
						<div className='md:hidden border-t dark:border-gray-800'>
							<div className='flex flex-col space-y-4 p-4'>
								{navLinks.mainLinks.map((link) => {
									if ("authRequired" in link && link.authRequired && !isAuthenticated) return null;
									return (
										<Link key={link.href} href={link.href} className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2' onClick={() => setIsOpen(false)}>
											{link.label}
										</Link>
									);
								})}

								{isAuthenticated && isPost && (
									<>
										<Link href={`/blog/edit/${slug}`} className='text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded transition-colors' onClick={() => setIsOpen(false)}>
											Edit Post
										</Link>
										<button
											onClick={() => {
												handleDelete();
												setIsOpen(false);
											}}
											disabled={isDeleting}
											className='w-full text-left text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 px-4 py-2 rounded transition-colors flex items-center gap-2'
										>
											{isDeleting && <Loader2 className='animate-spin' size={16} />}
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
										className='w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
									>
										{navLinks.authLinks.signOut.label}
									</button>
								) : (
									<button
										onClick={() => {
											supabaseClient.auth.signInWithOAuth({
												provider: "github",
												options: { redirectTo: `${window.location.origin}/auth/callback` },
											});
											setIsOpen(false);
										}}
										className='w-full text-left px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'
									>
										{navLinks.authLinks.signIn.label}
									</button>
								)}
							</div>
						</div>
					)}
				</div>
			</nav>
			<div className='h-16' />
		</>
	);
}
```

# src/components/Navbar-Old.tsx

```tsx
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
		<nav className='bg-white dark:bg-gray-900 shadow-lg transition-all'>
			{/* <div className={navStyles.container}> */}
			<div className='max-w-page mx-auto px-4'>
				<div className='flex justify-between items-center h-16'>
					{/* Left section with brand and main links */}
					<div className='flex items-center gap-8'>
						<Link href={navLinks.brand.href} className='flex items-center'>
							<Image src={navLinks.brand.logo} alt={navLinks.brand.label} width={90} height={90} priority />
							<span className='sr-only'>{navLinks.brand.label}</span>
						</Link>

						{/* Main navigation links */}
						<div className='hidden md:flex items-center gap-6'>
							{navLinks.mainLinks.map((link) => {
								if ("authRequired" in link && link.authRequired && !isAuthenticated) {
									return null;
								}
								return (
									<Link key={link.href} href={link.href} className='text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'>
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
								<Link href={`/blog/edit/${slug}`} className='px-3 py-2 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors'>
									Edit Post
								</Link>
								<button onClick={handleDelete} disabled={isDeleting} className='px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2'>
									{isDeleting && <Loader2 className='animate-spin' size={16} />}
									{isDeleting ? "Deleting..." : "Delete Post"}
								</button>
							</div>
						)}

						<ThemeToggle />

						{/* Auth button */}
						{isAuthenticated ? (
							<button onClick={() => supabaseClient.auth.signOut()} className='px-4 py-2 text-sm bg-gray-800 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors'>
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
```

# src/components/PostCard.tsx

```tsx
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
		<Link href={`/blog/${post.slug}`} className='group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow'>
			<div className='aspect-[16/9] relative bg-gray-900'>{post.cover_image ? <Image src={post.cover_image} alt={post.title} fill className='object-cover' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' /> : <div className='absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800' />}</div>
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
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { ImageUpload } from "@/components/ImageUpload";
import { RichMarkdownEditor } from "@/components/RichMarkdownEditor";
import { Loader2 } from "lucide-react";
import { categories, CategoryId } from "@/data/categories";

type PostType = "markdown" | "component";

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

			const basePostData = {
				title: formData.title,
				slug,
				excerpt: formData.excerpt,
				cover_image: formData.cover_image,
				category: formData.category,
				published: !saveAsDraft,
				author_id: user.id,
			};

			const postData =
				formData.type === "markdown"
					? {
							...basePostData,
							content: formData.content,
							type: "markdown" as const,
					  }
					: {
							...basePostData,
							content: "",
							type: "component" as const,
							component_name: formData.component_name || "",
							component_props: formData.props ? JSON.stringify(formData.props) : "{}",
					  };

			console.log("Sending post data:", postData);

			const { data, error: postError } = await supabaseClient.from("posts").insert([postData]).select().single();

			if (postError) {
				console.error("Supabase error:", postError);
				throw new Error(postError.message);
			}

			if (!data) {
				throw new Error("No data returned from insert");
			}

			console.log("Post created successfully:", data);

			router.push(saveAsDraft ? "/blog/drafts" : "/blog");
			router.refresh();
		} catch (err) {
			console.error("Error details:", {
				name: err?.name,
				message: err?.message,
				stack: err?.stack,
				error: err,
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

	return (
		<form onSubmit={handleSubmit} className='space-y-6' aria-label='Create new post'>
			{error && <div className='bg-red-500/10 text-red-500 p-4 rounded'>{error}</div>}
			<div>
				<label className='block text-sm font-medium mb-2'>Post Type</label>
				<select id='post-category' value={formData.type} onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as PostType }))} className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100' aria-label='Select post category' title='Select post category'>
					<option value='markdown'>Markdown</option>
					<option value='component'>React Component</option>
				</select>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Title</label>
				<input
					id='title'
					type='text'
					value={formData.title}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							title: e.target.value,
						}))
					}
					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
					placeholder='Enter title'
					title='title'
					aria-label='title'
					required
				/>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Category</label>
				<select
					id='category'
					value={formData.category}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							category: e.target.value as CategoryId,
						}))
					}
					className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
					aria-label='Select post category'
					title='Select post category'
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
				<label className='block text-sm font-medium mb-2'>Cover Image</label>
				<ImageUpload
					onUploadComplete={(url) =>
						setFormData((prev) => ({
							...prev,
							cover_image: url,
						}))
					}
				/>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Excerpt</label>
				<textarea
					id='excerpt'
					value={formData.excerpt}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							excerpt: e.target.value,
						}))
					}
					className='w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100'
					placeholder='Enter a brief excerpt of your post'
					title='Post excerpt'
					aria-label='Post excerpt'
				/>
			</div>

			{formData.type === "markdown" ? (
				<div>
					<label className='block text-sm font-medium mb-2'>Content</label>
					<div className='border border-gray-700 rounded-lg overflow-hidden'>
						<RichMarkdownEditor
							initialContent={formData.content}
							onChange={(content) =>
								setFormData((prev) => ({
									...prev,
									content,
								}))
							}
						/>
					</div>
				</div>
			) : (
				<>
					<div>
						<label htmlFor='component-name' className='block text-sm font-medium mb-2'>
							Component Name
						</label>
						<input
							type='text'
							value={formData.component_name || ""}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									component_name: e.target.value,
								}))
							}
							className='w-full p-2 border rounded bg-gray-800 border-gray-700 text-gray-100'
							placeholder='Enter component name'
							title='Component name'
							aria-label='Component name'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium mb-2'>Component Props (JSON)</label>
						<textarea
							value={formData.props || "{}"}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									props: e.target.value,
								}))
							}
							className='w-full p-2 border rounded h-24 bg-gray-800 border-gray-700 text-gray-100'
							placeholder='Enter component props in JSON format'
							title='Component props in JSON format'
							aria-label='Component props in JSON format'
						/>
					</div>
				</>
			)}

			<div className='flex items-center gap-4'>
				<button type='submit' disabled={isSubmitting} className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2'>
					{isSubmitting && <Loader2 className='animate-spin' size={16} />}
					{isSubmitting ? "Saving..." : saveAsDraft ? "Save Draft" : "Publish"}
				</button>

				<label className='flex items-center gap-2'>
					<input type='checkbox' checked={saveAsDraft} onChange={(e) => setSaveAsDraft(e.target.checked)} className='rounded border-gray-300' />
					<span>Save as draft</span>
				</label>
			</div>
		</form>
	);
}
```

# src/components/Reactions.tsx

```tsx
"use client";
import { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/auth";
import { Heart, ThumbsUp, Star, Coffee } from "lucide-react";

const REACTIONS = [
	{ type: "like", icon: ThumbsUp },
	{ type: "love", icon: Heart },
	{ type: "star", icon: Star },
	{ type: "coffee", icon: Coffee },
] as const;

export function Reactions({ postId }: { postId: string }) {
	const [counts, setCounts] = useState<Record<string, number>>({});

	useEffect(() => {
		loadReactions();
	}, [postId]);

	const loadReactions = async () => {
		const { data } = await supabaseClient.from("reactions").select("type").eq("post_id", postId);

		const newCounts: Record<string, number> = {};
		data?.forEach((reaction) => {
			newCounts[reaction.type] = (newCounts[reaction.type] || 0) + 1;
		});
		setCounts(newCounts);
	};

	const handleReaction = async (type: string) => {
		try {
			await supabaseClient.from("reactions").insert({
				post_id: postId,
				type,
			});
			loadReactions();
		} catch (error) {
			console.error("Error updating reaction:", error);
		}
	};

	return (
		<div className='flex gap-4 items-center'>
			{REACTIONS.map(({ type, icon: Icon }) => (
				<button
					key={type}
					onClick={() => handleReaction(type)}
					className='flex items-center gap-1 p-2 rounded-full transition-colors
            bg-gray-800 text-gray-300 hover:bg-gray-700'
				>
					<Icon size={20} />
					<span className='text-sm'>{counts[type] || 0}</span>
				</button>
			))}
		</div>
	);
}
```

# src/components/RichMarkdownEditor.tsx

```tsx
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
		{ icon: Code, label: "Code", prefix: "```\n", suffix: "\n```", block: true },
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
			const beforeSelection = content.substring(0, start);
			const needsNewLine = beforeSelection.length > 0 && !beforeSelection.endsWith("\n");
			newText = (needsNewLine ? "\n" : "") + prefix + selectedText + suffix;
		} else {
			newText = prefix + selectedText + suffix;
		}

		const newContent = content.substring(0, start) + newText + content.substring(end);

		setContent(newContent);
		onChange(newContent);

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
					<button key={action.label} type='button' onClick={() => insertTextAtCursor(action.prefix, action.suffix, action.block)} className='p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded' title={action.label}>
						<action.icon size={18} />
					</button>
				))}
				<div className='w-px h-6 bg-gray-700 mx-1' />
				<button type='button' onClick={() => fileInputRef.current?.click()} className='p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded' disabled={isUploading} title='Upload Image'>
					{isUploading ? <Loader2 className='animate-spin' size={18} /> : <ImageIcon size={18} />}
				</button>
				<button type='button' onClick={() => setShowHelp((prev) => !prev)} className='p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded ml-auto' title='Markdown Help'>
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
"use client";
import React, { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import { categories } from "@/data/categories";

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

			console.log("Drafts data:", data);
			console.log("Error if any:", error);

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
						<div key={post.id} className='flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm'>
							<div className='flex-1'>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1'>{post.title}</h3>
								<div className='flex items-center gap-4'>
									<span className='text-sm text-gray-600 dark:text-gray-400'>Last updated: {new Date(post.updated_at).toLocaleDateString()}</span>
									<span className={`text-sm px-2 py-1 rounded-full ${categories.find((c) => c.id === post.category)?.color || "bg-gray-200 dark:bg-gray-600"}`}>{categories.find((c) => c.id === post.category)?.name || "Uncategorized"}</span>
								</div>
							</div>

							<div className='flex items-center gap-3'>
								<Link href={`/blog/${post.slug}?preview=true`} className='p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'>
									<Eye size={20} />
								</Link>
								<Link href={`/blog/edit/${post.slug}`} className='p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'>
									<Edit size={20} />
								</Link>
								<button onClick={() => publishPost(post.id)} className='p-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300' title='Publish post'>
									<CheckCircle size={20} />
								</button>
								<button onClick={() => deletePost(post.id)} className='p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' title='Delete draft'>
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
```

# src/components/ThemeToggle.tsx

```tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
	const { isDark, toggleTheme } = useTheme();

	return (
		<button onClick={toggleTheme} className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors' aria-label='Toggle theme'>
			{isDark ? <Sun className='h-5 w-5 text-yellow-500' /> : <Moon className='h-5 w-5 text-gray-700' />}
		</button>
	);
}
```

# src/contexts/ThemeContext.tsx

```tsx
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
```

# src/data/categories.ts

```ts
import { Newspaper, Coffee, Laptop, User } from "lucide-react";

export const categories = [
	{
		id: "tech",
		name: "Tech Articles",
		icon: Laptop,
		description: "Deep dives into software development, web technologies, and the latest tech trends.",
		gradient: "from-blue-500 to-blue-700",
		textColor: "text-primary-400",
	},
	{
		id: "media",
		name: "Visual Media",
		icon: Newspaper,
		description: "In this section, I share my experiences working on creative projects like video editing with DaVinci Resolve, creating simple animations, designing clean static layouts, and developing intros for corporate presentations. It’s a place to explore the practical side of visual storytelling and design.",
		gradient: "from-purple-500 to-purple-700",
		textColor: "text-secondary-400",
	},
	{
		id: "food",
		name: "Fusion Food",
		icon: Coffee,
		description: "Creative recipes blending different culinary traditions.",
		gradient: "from-green-500 to-green-700",
		textColor: "text-accent-400",
	},
	{
		id: "personal",
		name: "Personal",
		icon: User,
		description: "Personal reflections, experiences, and life lessons. In this section, I share my thoughts, experiences, and lessons I’ve learned along the way. It’s a place for personal stories and reflections on everyday life, offering a glimpse into my journey and the moments that matter most to me.",
		gradient: "from-yellow-500 to-yellow-700",
		textColor: "text-success-400",
	},
] as const;

export type CategoryId = (typeof categories)[number]["id"];
```

# src/data/navbarConfig.ts

```ts
import type { ReactNode } from "react";
import Image from "next/image";

export interface NavLink {
	href: string;
	label: string;
	icon?: ReactNode;
	isButton?: boolean;
	authRequired?: boolean;
}

export const navLinks = {
	brand: {
		href: "/",
		label: "Mash Media Studio",
		logo: "/assets/GD-Fusion-logo.png",
	},
	mainLinks: [
		{
			href: "/blog",
			label: "Blog",
		},
		{
			href: "/blog/new",
			label: "New Post",
			authRequired: true,
		},
		{
			href: "/blog/drafts",
			label: "Drafts",
			authRequired: true,
		},
	],
	authLinks: {
		signIn: {
			label: "Sign In",
			isButton: true,
		},
		signOut: {
			label: "Sign Out",
			isButton: true,
		},
	},
} as const;

export const navStyles = {
	base: "bg-white dark:bg-gray-900 shadow-lg transition-colors",

	container: "max-w-page mx-auto px-4",
	inner: "flex justify-between h-16",
	brand: "flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white",
	link: "hover:text-gray-600 dark:hover:text-gray-300",
	button: "bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700",
} as const;
```

# src/hooks/useAuth.ts

```ts
"use client";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((_, session) => {
			setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	}, []);

	return { user, isAuthenticated: !!user };
}
```

# src/hooks/useTheme.ts

```ts
"use client";
import { useState, useEffect } from "react";

export function useTheme() {
	const [darkMode, setDarkMode] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const isDark = document.documentElement.classList.contains("dark");
		setDarkMode(isDark);
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		const newDarkMode = !darkMode;
		setDarkMode(newDarkMode);

		if (newDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};

	return { darkMode, toggleTheme, mounted };
}
```

# src/lib/auth.ts

```ts
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseClient = createClientComponentClient();
```

# src/lib/portfolio-theme.ts

```ts
export type { ThemeMode, ColorWithShades, ColorShades, BorderColors, ColorPalette, Typography, Theme } from "./types";

export { colors, baseTheme, lightTheme, darkTheme, theme, getColor, getBackgroundColor, getTextColor, getBorderColor, getFontFamily, getFontWeight, getFontSize, applyFontStyle } from "./theme-config";
```

# src/lib/supabase.ts

```ts
import { createClient } from "@supabase/supabase-js";
import { CategoryId } from "@/data/categories";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Post = {
	id: string;
	title: string;
	slug: string;
	content: string;
	excerpt?: string;
	category: CategoryId;
	published: boolean;
	created_at: string;
	updated_at: string;
};

export const blogApi = {
	async getAllPosts() {
		const { data, error } = await supabase.from("posts").select("*").eq("published", true).order("created_at", { ascending: false });

		if (error) throw error;
		return data as Post[];
	},

	async getPostBySlug(slug: string) {
		const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();

		if (error) throw error;
		return data as Post;
	},

	async createPost(post: Omit<Post, "id" | "created_at" | "updated_at">) {
		const { data, error } = await supabase.from("posts").insert([post]).select().single();

		if (error) throw error;
		return data as Post;
	},

	async updatePost(id: string, updates: Partial<Post>) {
		const { data, error } = await supabase.from("posts").update(updates).eq("id", id).select().single();

		if (error) throw error;
		return data as Post;
	},

	async deletePost(id: string) {
		const { error } = await supabase.from("posts").delete().eq("id", id);

		if (error) throw error;

		const res = await fetch("/api/revalidate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ path: "/blog" }),
		});

		if (!res.ok) {
			throw new Error("Failed to revalidate cache");
		}

		return true;
	},
};
```

# src/lib/theme-config.ts

```ts
import { ThemeMode, ColorWithShades, ColorShades, BorderColors, Theme } from "./portfolio-theme";

type HeadingSizes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type BodySizes = "xs" | "sm" | "base" | "lg" | "xl";

export const baseTheme = {
	typography: {
		heading: {
			fontFamily: '"Libre Baskerville", serif',
			weights: {
				regular: 400,
				medium: 500,
				bold: 700,
			},
			sizes: {
				h1: "2.5rem",
				h2: "2rem",
				h3: "1.75rem",
				h4: "1.5rem",
				h5: "1.25rem",
				h6: "1rem",
			},
		},
		body: {
			fontFamily: '"Open Sans", sans-serif',
			weights: {
				regular: 400,
				medium: 500,
				bold: 700,
			},
			sizes: {
				xs: "0.75rem",
				sm: "0.875rem",
				base: "1rem",
				lg: "1.125rem",
				xl: "1.25rem",
			},
		},
	},
} as const;

export const colors = {
	primary: {
		100: "#EBE5F6",
		200: "#D7CCED",
		300: "#C3B2E3",
		400: "#AF99DA",
		500: "#8465C3",
		600: "#6A51C0",
		700: "#503DBD",
		800: "#3629BA",
		900: "#1C15B7",
	},
	secondary: {
		100: "#E6FEFF",
		200: "#CCFEFF",
		300: "#B3FDFF",
		400: "#99FCFF",
		500: "#3AF1F9",
		600: "#2ED8E0",
		700: "#22BFC6",
		800: "#16A6AD",
		900: "#0A8D93",
	},
	accent: {
		100: "#FFE9E3",
		200: "#FFD3C8",
		300: "#FFBDAC",
		400: "#FFA791",
		500: "#F46A47",
		600: "#DB503D",
		700: "#C23633",
		800: "#A91C29",
		900: "#90021F",
	},
	success: {
		100: "#F0F7E6",
		200: "#E1EFCC",
		300: "#D2E7B3",
		400: "#C3DF99",
		500: "#A2C465",
		600: "#88AB4B",
		700: "#6F9231",
		800: "#557917",
		900: "#3C5F00",
	},
	warning: {
		100: "#FFF5EB",
		200: "#FFEBD7",
		300: "#FFE1C3",
		400: "#FFD7AF",
		500: "#FAD8B4",
		600: "#E1BF9A",
		700: "#C8A680",
		800: "#AF8D66",
		900: "#96744C",
	},
	danger: {
		100: "#FFE5E8",
		200: "#FFCCD1",
		300: "#FFB2BA",
		400: "#FF99A3",
		500: "#F5536A",
		600: "#DC3950",
		700: "#C21F36",
		800: "#A9051C",
		900: "#900002",
	},
	gray: {
		100: "#F7F7F7",
		200: "#E6E6E6",
		300: "#D5D5D5",
		400: "#C4C4C4",
		500: "#676767",
		600: "#525252",
		700: "#3D3D3D",
		800: "#282828",
		900: "#131313",
	},

	border: {
		light: {
			primary: "#0F66AF",
		},
		dark: {
			primary: "#0D94A0",
		},
	},
};

export const lightTheme: Theme = {
	isDarkTheme: false,
	colors: {
		...colors,
		backgrounds: {
			light: "#EBE5F6",
			dark: "#121212",
			nav: "rgba(255, 255, 255, 0.8)",
		},
		text: {
			light: {
				primary: "red",
				secondary: "yellow",
				accent: "magenta",
				disabled: "#CCCCCC",
				svgColor1: "red",
				svgColor2: "blue",
				svgColor3: "magenta",
				svgColor4: "cyan",
				svgColor5: "green",
			},
			dark: {
				primary: "",
				secondary: "",
				accent: "",
				svgColor1: "",
				svgColor2: "",
				svgColor3: "",
				svgColor4: "",
				svgColor5: "",
				disabled: "",
			},
		},
		border: colors.border,
	},
	typography: baseTheme.typography,
	sizes: {
		navHeight: "80px",
	},
	navBackground: "rgba(255, 255, 255, 0.8)",
	textSecondary: "#8F8F8F",
	border: "#E5E7EB",
	error: "#DC2626",
};

export const darkTheme: Theme = {
	isDarkTheme: true,
	colors: {
		...colors,
		backgrounds: {
			light: "#121212",
			dark: "#000000",

			nav: "#C21F36",
		},
		text: {
			light: {
				primary: "",
				secondary: "",
				accent: "",
				svgColor1: "",
				svgColor2: "",
				svgColor3: "",
				svgColor4: "",
				svgColor5: "",
				disabled: "",
			},
			dark: {
				primary: "yellowGreen",

				secondary: "#0d94a0cc",
				accent: "yellowgreen",
				disabled: "#6E6E6E",
				svgColor1: "#C4C4C4",
				svgColor2: "#900002",
				svgColor3: "#6F9231",
				svgColor4: "orange",
				svgColor5: "green",
			},
		},
		border: colors.border,
	},
	typography: baseTheme.typography,
	sizes: {
		navHeight: "80px",
	},
	navBackground: "#FAD8B4",
	textSecondary: "#E0E0E0",
	border: "#374151",
	error: "#EF4444",
};

export const theme = lightTheme;

export const getColor = (colorName: ColorWithShades, shade: keyof ColorShades = 500): string => {
	const color = theme.colors[colorName];

	if (!isColorShades(color)) {
		throw new Error(`Color ${colorName} does not have shades`);
	}
	return color[shade];
};

const isColorShades = (color: unknown): color is ColorShades => {
	return typeof color === "object" && color !== null && "500" in color;
};

export const getBackgroundColor = (mode: ThemeMode, type: "default" | "nav" = "default"): string => {
	if (type === "nav") {
		return theme.colors.backgrounds.nav;
	}
	return theme.colors.backgrounds[mode];
};

export const getTextColor = (mode: ThemeMode, variant: "primary" | "secondary" | "disabled"): string => {
	return theme.colors.text[mode][variant];
};

export const getBorderColor = (mode: ThemeMode, variant: keyof BorderColors): string => {
	return theme.colors.border[mode][variant];
};

export const getFontFamily = (type: "heading" | "body"): string => {
	return theme.typography[type].fontFamily;
};

export const getFontWeight = (type: "heading" | "body", weight: "regular" | "medium" | "bold"): number => {
	return theme.typography[type].weights[weight];
};

export const getFontSize = (type: "heading" | "body", size: HeadingSizes | BodySizes): string => {
	if (type === "heading" && isHeadingSize(size)) {
		return theme.typography.heading.sizes[size];
	}
	if (type === "body" && isBodySize(size)) {
		return theme.typography.body.sizes[size];
	}
	throw new Error(`Invalid size ${size} for type ${type}`);
};

const isHeadingSize = (size: HeadingSizes | BodySizes): size is HeadingSizes => {
	return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(size);
};

const isBodySize = (size: HeadingSizes | BodySizes): size is BodySizes => {
	return ["xs", "sm", "base", "lg", "xl"].includes(size);
};

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
"use client";
import { createGlobalStyle } from "styled-components";

import { lightTheme as portfolioLight, darkTheme as portfolioDark } from "./portfolio-theme";
import type { Theme } from "./types";

export const theme = {
	light: {
		...portfolioLight,

		prose: {
			headings: portfolioLight.colors.text.light.primary,
			body: portfolioLight.colors.text.light.secondary,
			links: portfolioLight.colors.primary[500],
			code: {
				background: portfolioLight.colors.gray[100],
				text: portfolioLight.colors.gray[900],
			},
		},
	},
	dark: {
		...portfolioDark,

		prose: {
			headings: portfolioDark.colors.text.dark.primary,
			body: portfolioDark.colors.text.dark.secondary,
			links: portfolioDark.colors.primary[400],
			code: {
				background: portfolioDark.colors.gray[800],
				text: portfolioDark.colors.gray[100],
			},
		},
	},
};

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
      color: ${({ theme }) => (theme.isDarkTheme ? theme.colors.primary[400] : theme.colors.primary[600])};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    code {
      background: ${({ theme }) => (theme.isDarkTheme ? theme.colors.gray[800] : theme.colors.gray[100])};
      padding: 0.2em 0.4em;
      border-radius: 0.25rem;
      font-size: 0.875em;
    }

    pre {
      background: ${({ theme }) => (theme.isDarkTheme ? theme.colors.gray[900] : theme.colors.gray[100])};
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
`;

export type { Theme };
```

# src/lib/ThemeContext.tsx

```tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/lib/theme-config";
import type { Theme } from "@/lib/types";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>(lightTheme);

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

		if (stored === "dark" || (!stored && systemDark)) {
			setTheme(darkTheme);
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleTheme = () => {
		setTheme((prev) => {
			const newTheme = prev.isDarkTheme ? lightTheme : darkTheme;
			localStorage.setItem("theme", newTheme.isDarkTheme ? "dark" : "light");

			if (newTheme.isDarkTheme) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}

			return newTheme;
		});
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within ThemeProvider");
	return context;
};
```

# src/lib/types.ts

```ts
export interface BaseInterface {
	someProperty: string;
}

export type ThemeMode = "light" | "dark";

export type ColorWithShades = "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "gray";

export interface ColorShades {
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
}

export interface BorderColors {
	primary: string;
}

export interface ColorPalette {
	primary: ColorShades;
	secondary: ColorShades;
	accent: ColorShades;
	success: ColorShades;
	warning: ColorShades;
	danger: ColorShades;
	gray: ColorShades;
	backgrounds: {
		light: string;
		dark: string;
		nav: string;
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
	};
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
	isDarkTheme: boolean;
	colors: ColorPalette;

	typography: Typography;
	sizes: {
		navHeight: string;
	};
	navBackground: string;
	textSecondary: string;

	border: string;

	error: string;
	backgroundColor?: string;
	backgroundBlendMode?: string;
}
```

# src/middleware.ts

```ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session && req.nextUrl.pathname.startsWith("/blog/new")) {
		return NextResponse.redirect(new URL("/auth/signin", req.url));
	}

	return res;
}

export const config = {
	matcher: ["/blog/new", "/blog/drafts"],
};
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
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
	darkMode: "class",
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			maxWidth: {
				page: "var(--page-width)",
			},
			fontFamily: {
				baskerville: ["var(--font-baskerville)", "serif"],
				opensans: ["var(--font-opensans)", "system-ui", "sans-serif"],
			},
			colors: {
				primary: {
					50: "#ecffff",
					100: "#ceffff",
					200: "#a3fbfe",
					300: "#64f6fc",
					400: "#1ee6f2",
					500: "#02cad8",
					600: "#04a1b6",
					700: "#0c899d",
					800: "#136777",
					900: "#145565",
					950: "#073945",
				},
				secondary: {
					50: "#fff1fe",
					100: "#ffe1fe",
					200: "#ffc3fd",
					300: "#ff94f8",
					400: "#ff54f4",
					500: "#ff16f2",
					600: "#f700ff",
					700: "#d300d9",
					800: "#ae00b1",
					900: "#80007f",
					950: "#630063",
				},
				accent: {
					50: "#fff9ec",
					100: "#fff3d3",
					200: "#ffe2a5",
					300: "#ffcc6d",
					400: "#ffab32",
					500: "#ff900a",
					600: "#fa7500",
					700: "#cc5602",
					800: "#a1430b",
					900: "#82390c",
					950: "#461a04",
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
						fontSize: "1rem",
						p: {
							fontSize: "1rem",
						},
					},
				},
			},
			keyframes: {
				rise: {
					"0%": {
						transform: "translateY(100%) scale(0)",
						opacity: "0",
					},
					"20%": {
						opacity: "0.5",
						transform: "translateY(80%) scale(0.8)",
					},
					"80%": {
						opacity: "0.8",
						transform: "translateY(20%) scale(1)",
					},
					"100%": {
						transform: "translateY(-100%) scale(1)",
						opacity: "0",
					},
				},
			},
			animation: {
				rise: "rise 4s ease-out forwards",
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

# types/blog.ts

```ts
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
	type: "markdown";
	content: string;
};

export type ComponentPost = BasePost & {
	type: "component";
	component_name: string;
	props?: Record<string, unknown>;
};

export type Post = MarkdownPost | ComponentPost;
```
