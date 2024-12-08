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
      name: 'Visual Media',
      icon: Newspaper,
      description: 'In this section, I share my experiences working on creative projects like video editing with DaVinci Resolve, creating simple animations, designing clean static layouts, and developing intros for corporate presentations. It’s a place to explore the practical side of visual storytelling and design.'
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
      description: 'Personal reflections, experiences, and life lessons. In this section, I share my thoughts, experiences, and lessons I’ve learned along the way. It’s a place for personal stories and reflections on everyday life, offering a glimpse into my journey and the moments that matter most to me.'
   }
] as const;

export type CategoryId = typeof categories[number]['id'];
