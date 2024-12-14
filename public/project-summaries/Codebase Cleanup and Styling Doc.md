# Blog Codebase Documentation

## Recent Changes and Improvements

### 1. CSS Standardization
- Removed individual CSS modules and styled-components
- Standardized on Tailwind CSS for all styling
- Converted component-specific CSS to Tailwind classes

### 2. Component Updates
The following components were updated to use Tailwind:

#### Spinner Component
```tsx
// Before: Used CSS file imports and custom styles
// After: Uses Tailwind classes
<div className='min-h-[200px] flex justify-center items-center'>
  <div className='relative w-[120px] h-[120px] before:content-[""]
    before:absolute before:inset-0 before:border-[16px]
    before:border-dashed before:rounded-full before:border-gray-400
    before:animate-spin'>
  </div>
</div>
```

#### PercentageSVG2
```tsx
// Before: Used external CSS file
// After: Uses Tailwind utility classes
<div className="relative w-full h-full min-h-[314px] flex justify-center items-center">
  <div className="absolute flex flex-col justify-center items-center w-[200px] h-[200px]">
    {/* Component content */}
  </div>
</div>
```

#### CircularLoader
```tsx
// Before: Used CSS modules
// After: Uses Tailwind with motion animations
<div className="relative w-full flex justify-center items-center min-h-[200px]">
  <div className="relative w-[200px] h-[200px] flex flex-col justify-center items-center">
    {/* Loader content */}
  </div>
</div>
```

### 3. Tailwind Configuration
Added custom configurations in `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'loader': 'loader 1s linear infinite',
      },
      keyframes: {
        loader: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    }
  },
  // ... other configurations
}
```

## Best Practices

### 1. Styling Guidelines
- Use Tailwind utility classes instead of custom CSS
- Implement dark mode using the `dark:` prefix
- Use `@apply` in globals.css for commonly reused class combinations

Example:
```css
/* In globals.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
  }
}
```

### 2. Performance Optimization
- Use React.memo() for static components
- Implement dynamic imports for larger components
- Add proper loading states

Example:
```tsx
const MemoizedComponent = React.memo(({ props }) => {
  // Component logic
});
```

### 3. Component Structure
Follow this structure for new components:
```tsx
'use client';

import React from 'react';

interface ComponentProps {
  // Define props
}

const Component: React.FC<ComponentProps> = ({ props }) => {
  // Component logic
  return (
    <div className="[tailwind-classes]">
      {/* Component content */}
    </div>
  );
};

export default Component;
```

## Common Patterns

### 1. Loading States
```tsx
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500" />
  </div>
);
```

### 2. Dark Mode Support
```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  {/* Content */}
</div>
```

### 3. Responsive Design
```tsx
<div className="w-full md:w-1/2 lg:w-1/3 p-4">
  {/* Responsive content */}
</div>
```

## Future Considerations

1. Component Updates:
   - Continue converting any remaining CSS to Tailwind
   - Implement error boundaries
   - Add proper TypeScript types

2. Performance:
   - Add Suspense boundaries
   - Implement proper code splitting
   - Optimize image loading

3. Maintenance:
   - Regular dependency updates
   - Code quality checks
   - Performance monitoring

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

For questions or clarifications about these changes, please refer to the documentation or create an issue in the repository.