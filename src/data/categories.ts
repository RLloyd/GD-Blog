// src/data/categories.ts
import { Newspaper, Coffee, Laptop, User } from "lucide-react";

export const categories = [
   {
      id: 'tech',
      name: 'Tech Articles',
      icon: Laptop,
      description: 'Deep dives into software development, web technologies, and the latest tech trends.'
   },
   {
      id: 'media',
      name: 'Other Media',
      icon: Newspaper,
      description: 'Exploring movies, books, games, and digital content.'
   },
   {
      id: 'food',
      name: 'Fusion Food',
      icon: Coffee,
      description: 'Creative recipes blending different culinary traditions.'
   },
   {
      id: 'personal',
      name: 'Personal',
      icon: User,
      description: 'Personal reflections, experiences, and life lessons.'
   }
] as const;

export type CategoryId = typeof categories[number]['id'];
