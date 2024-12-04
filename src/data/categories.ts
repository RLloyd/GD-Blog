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

// // src/data/categories.ts
// import { Newspaper, Coffee, Laptop, User } from "lucide-react";

// export const categories = [
//    {
//       id: 'tech',
//       name: 'Tech Articles',
//       icon: Laptop,
//       color: 'bg-primary-600',
//       textColor: 'text-primary-300',
//       gradient: 'bg-gradient-to-br from-primary-500 to-primary-700',
//       description: 'Deep dives into software development, web technologies, and the latest tech trends.'
//    },
//    {
//       id: 'media',
//       name: 'Other Media',
//       icon: Newspaper,
//       color: 'bg-secondary-600',
//       textColor: 'text-secondary-300',
//       gradient: 'bg-gradient-to-br from-secondary-500 to-secondary-700',
//       description: 'Exploring movies, books, games, and digital content.'
//    },
//    {
//       id: 'food',
//       name: 'Fusion Food',
//       icon: Coffee,
//       color: 'bg-accent-600',
//       textColor: 'text-accent-300',
//       gradient: 'bg-gradient-to-br from-accent-500 to-accent-700',
//       description: 'Creative recipes blending different culinary traditions.'
//    },
//    {
//       id: 'personal',
//       name: 'Personal',
//       icon: User,
//       color: 'bg-primary-500',
//       textColor: 'text-primary-200',
//       gradient: 'bg-gradient-to-br from-primary-400 to-primary-600',
//       description: 'Personal reflections, experiences, and life lessons.'
//    }
// ] as const;

// export type CategoryId = typeof categories[number]['id'];