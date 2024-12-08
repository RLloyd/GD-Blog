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

```typescript
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
```

## ThemeProvider Implementation

```typescript
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
```

## Integration Points

### Styled Components

```typescript
const StyledComponent = styled.div<{ theme: Theme }>`
	color: ${({ theme }) => (theme.isDark ? theme.colors.text.dark : theme.colors.text.light)};
`;
```

### Tailwind CSS

```typescript
function Component() {
	const { isDark } = useTheme();
	return <div className='bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>{/* Content */}</div>;
}
```

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
