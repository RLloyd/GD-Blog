// src/app/page.tsx
"use client";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/lib/theme-config";
import { Navbar } from "@/components/Navbar";

/*---==================================================================
This code snippet defines a functional component named `HomePage`
that is exported as the default export. When this component is rendered,
it returns a JSX structure. The JSX structure consists of a
`ThemeProvider` component from the `styled-components` library,
which wraps around the `Navbar` component and a `main` element.
The `ThemeProvider` component receives a `theme` prop,
which is set to the `lightTheme` variable. Inside the `main` element,
there is an `h1` element with the text "Welcome to the Blog".
This code snippet is likely part of a React application and is
responsible for rendering the home page of the blog.
==================================================================---*/
export default function HomePage() {
	return (
		<ThemeProvider theme={lightTheme}>
			<Navbar />
			<main className="container mx-auto px-4 py-8">
				<h1>Welcome to the Blog</h1>
			</main>
		</ThemeProvider>
	);
}
