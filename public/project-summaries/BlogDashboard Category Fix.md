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
```typescript
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
```

## Testing
Test the fix by:
1. Creating new posts in the media category
2. Verifying posts appear immediately after creation
3. Checking category filtering works correctly
4. Ensuring featured tech post displays properly