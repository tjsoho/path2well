import { supabase } from "@/lib/supabase";

export async function getBlogs() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }

  return data || [];
}
