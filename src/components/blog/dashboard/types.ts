// src/components/blog/dashboard/types.ts
import { CategoryId } from "@/data/categories";

export type GridSize = "large" | "medium" | "full";

// Define specific type for component props instead of Record<string, any>
export type ComponentProps = {
   [key: string]: string | number | boolean | null | undefined | ComponentProps | Array<ComponentProps>;
};

export type Post = {
   id: string;
   title: string;
   content: string;
   type: 'markdown' | 'component';
   component_name?: string;
   component_props?: ComponentProps;
   excerpt: string;
   category: CategoryId;
   date: string;
   slug: string;
   cover_image?: string;
};

export type FeaturedSetup = Array<{
   category: CategoryId;
   size: GridSize;
   order: number;
   title?: string;
   description?: string;
}>;