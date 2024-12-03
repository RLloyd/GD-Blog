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
          <p className="text-xl">
            Explore articles about technology, media, food, and personal experiences.
          </p>
        </section>
      </main>
    </ThemeProvider>
  )
}