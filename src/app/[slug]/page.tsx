import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";

async function getBlogPost(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  // Increment view count
  await supabase
    .from("blog_posts")
    .update({ views: (data.views || 0) + 1 })
    .eq("id", data.id);

  return data;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}

// Add this for static generation optimization
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}
