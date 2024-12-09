// types/blog.ts
export type BasePost = {
   id: string;
   title: string;
   slug: string;
   category: string;
   excerpt?: string;
   cover_image?: string;
   created_at: string;
   updated_at: string;
   author_id: string;
};

export type MarkdownPost = BasePost & {
   type: 'markdown';
   content: string;
};

export type ComponentPost = BasePost & {
   type: 'component';
   component_name: string;
   props?: Record<string, unknown>;
};

export type Post = MarkdownPost | ComponentPost;

