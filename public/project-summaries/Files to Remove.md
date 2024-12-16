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

# Files to Remove
Portfolio-Related Files/Folders That Can Be Removed

### Unused Portfolio Components:

src/components/portfolio/HeroSection.tsx
src/components/portfolio/ParallaxSection.tsx
src/components/portfolio/ProjectCard.tsx
src/components/portfolio/ProjectSection.tsx

### Unused Portfolio Styles:

src/lib/portfolio-theme.ts
src/lib/theme-config.ts
src/lib/types.ts

### Unused Portfolio Pages:

src/app/portfolio/page.tsx
src/app/portfolio/projects/page.tsx
Blog-Related Files/Folders That Can Be Removed

### Duplicate/Unused Components:

src/components/blog-components/CircularLoader.css
src/components/blog-components/CircularLoaderApp.tsx
src/components/blog-components/LazyImageLoader.tsx
src/components/blog-components/articles/SpinningDots.tsx
src/components/data-list-components/ (entire folder)
src/components/modal-components/Spinner.js
src/components/modal-components/ProgressRing.tsx

### Unused Blog Components:

src/components/ImageWithFallback.tsx
src/components/blog/CodeBlock.tsx (duplicate of blog-components/CodeBlock.tsx)

### General Cleanup:

public/notes/ (entire folder, appears to be just documentation)
public/project-summaries/ (can be moved to documentation if needed)

### Unused Configuration Files:

.vscode/settings.json (minimal settings)
cleanup.sh (not essential for the app)
Keep Important Files
Ensure we keep these critical files:

### Core Blog Components:

src/components/blog/dashboard/
src/components/BlogPostContent.tsx
src/components/PostForm.tsx
src/components/RichMarkdownEditor.tsx

### Core Portfolio Components:

src/components/parallaxScroll/ParallaxScroll.tsx (main parallax component)

### Essential Configuration:

next.config.ts
tailwind.config.ts
tsconfig.json
package.json

### Core Application Files:

src/app/layout.tsx
src/app/page.tsx
src/contexts/ThemeContext.tsx
src/lib/auth.ts
src/lib/supabase.ts