// src/data/categories.ts
import { Newspaper, Coffee, Laptop, User } from 'lucide-react';

export const categories = [
  {
    id: 'tech',
    name: 'Tech Articles',
    icon: Laptop,
    color: 'bg-blue-500',
    textColor: 'text-blue-400',
    gradient: 'from-blue-500 to-blue-700',
    description: 'Deep dives into software development, web technologies, and the latest tech trends. From coding tutorials to architectural insights.'
  },
  {
    id: 'media',
    name: 'Other Media',
    icon: Newspaper,
    color: 'bg-purple-500',
    textColor: 'text-purple-400',
    gradient: 'from-purple-500 to-purple-700',
    description: 'Exploring movies, books, games, and digital content. Reviews, analyses, and discussions about storytelling across different mediums.'
  },
  {
    id: 'food',
    name: 'Fusion Food',
    icon: Coffee,
    color: 'bg-orange-500',
    textColor: 'text-orange-400',
    gradient: 'from-orange-500 to-orange-700',
    description: 'Creative recipes blending different culinary traditions. Discover unique flavor combinations and cooking techniques from around the world.'
  },
  {
    id: 'personal',
    name: 'Personal',
    icon: User,
    color: 'bg-green-500',
    textColor: 'text-green-400',
    gradient: 'from-green-500 to-green-700',
    description: 'Personal reflections, experiences, and life lessons. A space for sharing thoughts on growth, creativity, and everyday adventures.'
  }
] as const;

export type CategoryId = typeof categories[number]['id'];

export function getCategoryById(id: CategoryId) {
  return categories.find(category => category.id === id);
}

export function getCategoryName(id: CategoryId) {
  return getCategoryById(id)?.name || id;
}

export function getCategoryColor(id: CategoryId) {
  return getCategoryById(id)?.color || 'bg-gray-500';
}

export function getCategoryTextColor(id: CategoryId) {
  return getCategoryById(id)?.textColor || 'text-gray-400';
}