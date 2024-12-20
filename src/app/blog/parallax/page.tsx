// src/app/blog/parallax/page.tsx
import { supabaseClient } from "@/lib/auth";
import { unstable_noStore } from "next/cache";
import { BlogSection } from "@/app/layout";
import BlogParallax from "@/components/blog-parallax/BlogParallax";

export default async function BlogParallaxPage() {
  unstable_noStore();

  const { data: posts, error } = await supabaseClient
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading posts:", error);
    return <div>Error loading posts</div>;
  }

  const featuredPost = posts.find(post => post.published);
  const remainingPosts = posts.filter(post => post.id !== featuredPost?.id && post.published);

  return (
    <BlogSection>
      <BlogParallax
        featuredPost={featuredPost}
        posts={remainingPosts}
      />
    </BlogSection>
  );
}

// /*-= src/app/blog/parallax/page.tsx =-*/
// /*-=  =-*/
// /*-============================================================
// Prompt:
// I want to re-design the Blog section to match closely to the Portfolio section.
// On the Blog homepage I want to display the latest article from the Tech Articles. Apply a parallax scrolling similar to portfolio. Underneath the main page will be the collection of all the posts. Make this as another version from the existing layout and call this new design BlogParallax.

// The new blog parallax implementation features:
//    • A full-screen hero section featuring the latest tech article
//    • Smooth parallax scrolling effect similar to the portfolio section
//    • A grid of remaining posts that appears as you scroll down
//    • Consistent styling with the portfolio section including:
//       Font families (Garamond for headings, Nunito Sans for body)
//       Color schemes
//       Animation timing and easing
//       Card layouts and hover effects
// To use this new layout:
//    • Create the /blog/parallax route by adding the new page file
//    • You can keep both layouts and choose which one to use, or replace the existing /blog page with this new version
//    • Add Lenis smooth scrolling
//    • Ensure the necessary dependencies are installed (gsap, @studio-freight/lenis)
// The parallax effect shows:
//    • The latest tech article in a full-screen hero section with a gradient overlay
//    • Smooth scroll transition to reveal the grid of other posts
//    • Consistent motion and animation with the portfolio section
// ================================================================-*/
// // src/app/blog/parallax/page.tsx
// import { supabaseClient } from "@/lib/auth";
// import { unstable_noStore } from "next/cache";
// import BlogParallax from "@/components/BlogParallax";
// import { BlogSection } from "@/app/layout";

// export default async function BlogParallaxPage() {
//   unstable_noStore();

//   const { data: posts, error } = await supabaseClient
//     .from("posts")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Supabase error:", error);
//     return <div>Error loading posts</div>;
//   }

//   return (
//     <BlogSection>
//       <BlogParallax posts={posts} />
//     </BlogSection>
//   );
// }

// // import { supabaseClient } from "@/lib/auth";
// // import { unstable_noStore } from "next/cache";
// // import BlogParallax from "@/components/BlogParallax";

// // export default async function BlogParallaxPage() {
// //   unstable_noStore();

// //   const { data: posts, error } = await supabaseClient
// //     .from("posts")
// //     .select("*")
// //     .order("created_at", { ascending: false });

// //   if (error) {
// //     console.error("Supabase error:", error);
// //     return <div>Error loading posts</div>;
// //   }

// //   return <BlogParallax posts={posts} />;
// // }
// /*-|=================================================================|-*/
