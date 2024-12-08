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
