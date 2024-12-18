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

# Next.js Blog & Portfolio Project Structure

## Core Directories Structure
```
src/
├── app/                 # Main application routes
│   ├── blog/            # Blog section routes
│   │   ├── [slug]/      # Individual blog post pages
│   │   ├── edit/        # Post editing pages
│   │   ├── new/         # New post creation
│   │   └── drafts/      # Draft posts management
│   ├── portfolio/       # Portfolio section routes
│   │   ├── [category]/  # Category-specific pages
│   │   └── multimedia/  # Multimedia project pages
│   └── layout.tsx       # Root layout
├── components/          # Shared components
├── contexts/            # Context providers
├── data/                # Static data and configurations
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and API
└── types/               # TypeScript type definitions
```

## Files to Keep

### Core Configuration Files
- `next.config.ts`
- `tailwind.config.ts`
- `tsconfig.json`
- `package.json`
- `.env.local`

### Blog Components (Keep)
```
src/components/blog/
├── dashboard/          # Blog dashboard components
├── BlogPostContent.tsx # Post content display
├── PostForm.tsx        # Post creation form
├── AuthorInfo.tsx      # Author information display
├── Comments.tsx        # Comments functionality
└── Reactions.tsx       # Post reactions system
```

### Portfolio Components (Keep)
```
src/components/parallaxScroll/
└── ParallaxScroll.tsx # Main parallax scroll component

src/components/
└── ParallaxNavigation.tsx # Portfolio navigation
```

## Files to Remove

### Unused Portfolio Components
```
src/components/portfolio/            # Remove entire folder
src/components/home/                 # Remove entire folder
src/lib/portfolio-theme.ts          # Remove
src/lib/theme-config.ts             # Remove
src/lib/types.ts                    # Remove
```

### Unused Blog Components
```
src/components/blog-components/     # Remove entire folder
src/components/data-list-components/# Remove entire folder
src/components/modal-components/    # Remove entire folder
src/components/ImageWithFallback.tsx# Remove
```

### Documentation and Notes (Optional to Remove)
```
public/notes/                      # Development notes
public/project-summaries/          # Project documentation
```

### Cleanup Tasks
1. Remove all references to styled-components
2. Clean up unused imports in remaining files
3. Remove test and example components
4. Remove duplicate components
5. Clean up unused assets in public folder

## Structure Notes

### Blog Section
- Uses Supabase for data storage
- Markdown and component-based posts
- Complete CRUD operations
- Draft system
- Comments and reactions

### Portfolio Section
- Static content with dynamic loading
- Parallax scrolling effects
- Category-based organization
- Multimedia showcase capabilities

### Shared Infrastructure
- Next.js 13+ App Router
- Tailwind CSS for styling
- TypeScript for type safety
- Supabase authentication
- Dark/light theme system