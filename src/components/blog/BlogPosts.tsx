"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  tags: string[];
  image_url: string;
  status: "draft" | "published";
  views: number;
  created_at: string;
}

export function BlogPosts({ onEdit }: { onEdit: (post: BlogPost) => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this post?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                deletePost(id);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const deletePost = async (id: string) => {
    try {
      // First get all content images for this post
      const { data: images, error: fetchError } = await supabase
        .from("blog_content_images")
        .select("image_url")
        .eq("post_id", id);

      if (fetchError) {
        console.error("Error fetching images:", fetchError);
      } else {
        // Delete images from storage
        for (const image of images || []) {
          const path = image.image_url.split("/").pop(); // Get filename from URL
          if (path) {
            await supabase.storage
              .from("blog-images")
              .remove([`blog-content-images/${path}`]);
          }
        }
      }

      // Delete the post (this will cascade delete the blog_content_images records)
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .match({ id });

      if (error) throw error;
      toast.success("Post deleted successfully");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading posts...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-brand-teal/40 rounded-md shadow-md overflow-hidden"
        >
          {post.image_url && (
            <div className="relative h-48">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2 ">
              <span
                className={`px-2 py-1 rounded-md text-xs ${
                  post.status === "published"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {post.status}
              </span>
              <span className="text-sm text-gray-300">
                {post.views || 0} views
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-400 mb-4">{post.subtitle}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-brand-teal text-white rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Link
                href={`/${post.slug}`}
                className="px-3 py-1 text-brand-brown-dark hover:underline"
              >
                View
              </Link>
              <button
                onClick={() => onEdit(post)}
                className="px-3 py-1 text-green-400 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1 text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
