import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TipTapContent } from "@/components/blog/TipTapContent";

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

interface BlogPostPageProps {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function BlogPost(props: BlogPostPageProps) {
  const post = await getBlogPost(props.params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-brand-cream">
      {/* Hero Section with Featured Image */}
      <div className="relative h-[60vh] w-full">
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-brand-brown-dark/10" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-5xl font-kiona mb-4">{post.title}</h1>
            <p className="text-xl opacity-90">{post.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-brand-brown-dark/10 text-brand-brown-dark rounded-md text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <TipTapContent content={post.content} />
        </div>

        {/* Metadata */}
        <div className="mt-12 pt-6 border-t border-brand-brown-dark/10">
          <div className="flex justify-between items-center text-sm text-brand-brown-dark/60">
            <span>
              Published:{" "}
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>{post.views || 0} views</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// Add this for static generation optimization (optional)
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}
