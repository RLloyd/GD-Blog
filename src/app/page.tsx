// src/app/page.tsx
"use client";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/lib/theme-config";

/*---==================================================================
The homepage serves as the entry point to our blog platform, providing:
- Overview of recent blog posts
- Summary of different content categories
- Quick access to featured articles
==================================================================---*/
export default function HomePage() {
	return (
		<ThemeProvider theme={lightTheme}>
			<main className="container mx-auto px-4 py-8">
				<section className="max-w-4xl mx-auto space-y-8">
					<h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
					<div className="text-xl">
						Dive into a world of creativity, innovation, and flavors! Here, you’ll find:
						<ul>
							<li>Tech Tutorials: Simplifying coding concepts and showcasing CSS & JavaScript animations to bring your web designs to life.</li>
							<li>Other Media: Explore the art of video production and animations, where visuals tell the story.</li>
							<li>Fusion Food: Savor the blend of Asian-inspired cuisine and global tastes for a culinary adventure.</li>
							<li>Personal Stories: A window into my journey, thoughts, and experiences.</li>
						</ul>
						<p>Whether you’re here to learn, create, or simply be inspired, there’s something for everyone. Let’s explore together!</p>
					</div>
				</section>
			</main>
		</ThemeProvider>
	);
}
