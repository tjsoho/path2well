"use client";

import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section with Background Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <Image
            src="/images/blogBG.png"
            alt="Medical Technology Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/80" />
        <div
          className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-10"
          style={{
            backgroundSize: '50px 50px',
            backgroundRepeat: 'repeat',
          }}
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 text-center mt-8 lg:mt-0"
          >
            Research & Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl text-center px-4"
          >
            Exploring the intersection of medicine, technology, and wellness
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Latest Post Section - Compact Version */}
      {latestPost && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900/40 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-brand-teal/30 shadow-brand-teal/20"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="relative w-full lg:w-1/2 h-48 md:h-72">
                {latestPost.image_url ? (
                  <Image
                    src={latestPost.image_url}
                    alt={latestPost.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-teal/30 to-brand-teal/10" />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-brand-teal backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg">
                    Featured Article
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {latestPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-full text-xs font-medium border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {latestPost.title}
                  </h2>
                  <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                    {latestPost.subtitle}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/${latestPost.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-brand-teal/80 backdrop-blur-sm text-white rounded-full hover:bg-brand-teal/90 transition-colors duration-200 text-sm"
                  >
                    Read Article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(latestPost.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-8 bg-gray-900/40 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-800/50 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4 md:mb-6">
                Filter by Topic
              </h3>
              <BlogFilter tags={uniqueTags} onTagsChange={setSelectedTags} />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/${post.slug}`}
                    className="group block bg-gray-900/40 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800/50"
                  >
                    <div className="relative h-48 md:h-64">
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt={post.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-teal/30 to-brand-teal/10" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-full text-xs border border-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-brand-teal transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                        {post.subtitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(post.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                        <span className="text-brand-teal group-hover:translate-x-2 transition-transform duration-200">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
