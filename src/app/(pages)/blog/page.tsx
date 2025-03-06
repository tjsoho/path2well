"use client";

import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  tags: string[];
  image_url: string;
  status: "draft" | "published";
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
    }

    loadPosts();
  }, []);

  // Get unique tags from all posts
  const uniqueTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  // Get the latest post
  const latestPost = posts[0];

  // Filter other posts based on selected tags
  const filteredPosts = posts.slice(1).filter((post) => {
    if (selectedTags.length === 0) return true;
    return selectedTags.some((tag) => post.tags.includes(tag));
  });

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-brand-brown-dark">
        <div className="absolute inset-0">
          <Image
            src="/images/boatHero.jpeg"
            alt="Blog Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-kiona text-brand-cream text-center">
            Our Journal
          </h1>
        </div>
      </div>

      {/* Featured Post Card - Overlapping Hero */}
      {latestPost && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute -top-4 -left-4 z-50">
            <span className="px-6 py-3 bg-brand-blue text-brand-brown-dark rounded-md text-xl font-bold font-kiona shadow-lg transform -rotate-2">
              Latest Post
            </span>
          </div>
          <div className="-mt-32 mb-16">
            <div className="bg-white/90 backdrop-blur-md rounded-md shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-2/3 h-72 md:h-96">
                  {latestPost.image_url ? (
                    <Image
                      src={latestPost.image_url}
                      alt={latestPost.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-brown-dark/10" />
                  )}
                </div>
                <div className="w-full md:w-1/3 p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {latestPost.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-brand-brown-dark/5 text-brand-brown-dark rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-kiona text-brand-brown-dark mb-4">
                    {latestPost.title}
                  </h2>
                  <p className="text-brand-brown-dark/70 mb-6 line-clamp-3">
                    {latestPost.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/${latestPost.slug}`}
                      className="px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-md hover:bg-brand-brown-dark/90 transition-colors"
                    >
                      Read More
                    </Link>
                    <span className="text-sm text-brand-brown-dark/50">
                      {formatDistanceToNow(new Date(latestPost.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <BlogFilter tags={uniqueTags} onTagsChange={setSelectedTags} />
          </div>

          {/* Posts Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className="group block bg-white/90 backdrop-blur-md rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative h-64">
                    {post.image_url ? (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-brown-dark/10" />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-brand-brown-dark/5 text-brand-brown-dark rounded-md text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-kiona text-brand-brown-dark mb-2">
                      {post.title}
                    </h3>
                    <p className="text-brand-brown-dark/70 mb-4 line-clamp-2">
                      {post.subtitle}
                    </p>
                    <div className="text-sm text-brand-brown-dark/50">
                      {formatDistanceToNow(new Date(post.created_at), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
