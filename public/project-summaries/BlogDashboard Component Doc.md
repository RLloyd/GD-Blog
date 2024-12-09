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

```typescript
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

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

```typescript
type Size = "large" | "medium" | "full";
```

### Size Properties

- `large`: Used for main feature (2x2)
- `medium`: Secondary features (1x1)
- `full`: Full-width feature (spans available columns)

## Implementation Notes

- `col-start-1` ensures the full-width card aligns properly
- `row-span-2` on large card creates space for medium card
- All cards maintain 16:9 aspect ratio for consistency

## Usage Example

```typescript
<FeaturedCard
	post={post}
	category={categories[0]}
	size='large|medium|full'
	title='Custom Title'
	description='Optional description'
/>
```
