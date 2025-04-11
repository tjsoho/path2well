"use client";

import Image from "next/image";
import { TipTapContent } from "@/components/blog/TipTapContent";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export function BlogPostContent({ post }: { post: BlogPost }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <article className="min-h-screen bg-[#001618] overflow-hidden">
            {/* Animated background grid */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-5"
                    style={{ backgroundSize: '30px 30px', backgroundRepeat: 'repeat' }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4]/5 to-transparent" />

                {/* Interactive light effect */}
                <div
                    className="absolute w-[500px] h-[500px] rounded-full bg-[#4ECDC4]/10 blur-[100px] pointer-events-none transition-opacity duration-300"
                    style={{
                        left: `${mousePosition.x - 250}px`,
                        top: `${mousePosition.y - 250}px`,
                        opacity: 0.7
                    }}
                />
            </div>

            {/* Hero Section with Featured Image */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                {post.image_url ? (
                    <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover filter contrast-125 brightness-75"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4]/30 to-[#4ECDC4]/10" />
                )}
                <div className="absolute inset-0 bg-black/90" />

                {/* Glitch effect overlay */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-20 mix-blend-overlay"
                        style={{ backgroundSize: '20px 20px', backgroundRepeat: 'repeat' }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4ECDC4]/20 to-transparent" />
                </div>

                {/* Back Button */}
                <Link
                    href="/blog"
                    className="absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-2 bg-[#001618]/40 backdrop-blur-lg text-white rounded-full border border-[#4ECDC4]/20 hover:bg-[#001618]/60 hover:border-[#4ECDC4]/40 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                    <span className="font-kiona text-sm tracking-wider">BACK TO BLOG</span>
                </Link>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Glitch effect for title */}
                            <div>
                            <h1 className="relative text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-kiona">
                                <span className="text-white">
                                    {post.title}
                                </span>
                            </h1>
                            <p className="text-xl text-white/80 max-w-2xl mx-auto font-kiona tracking-wide">
                                {post.subtitle}
                            </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#001618] to-transparent" />
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-8"
                >
                    {post.tags.map((tag: string) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-[#001618]/40 backdrop-blur-lg text-white rounded-full text-xs font-kiona tracking-wider border border-[#4ECDC4]/20 hover:border-[#4ECDC4]/40 transition-colors"
                        >
                            {tag.toUpperCase()}
                        </span>
                    ))}
                </motion.div>

                {/* Post Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-headings:font-kiona prose-headings:tracking-wide prose-p:text-white/80 prose-p:font-kiona prose-p:tracking-wide prose-a:text-[#4ECDC4] prose-a:font-kiona prose-strong:text-white prose-code:text-[#4ECDC4] prose-pre:bg-[#001618]/40 prose-pre:border prose-pre:border-[#4ECDC4]/20 prose-pre:font-kiona"
                >
                    <TipTapContent content={post.content} />
                </motion.div>

                {/* Metadata */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 pt-6 border-t border-[#4ECDC4]/20"
                >
                    <div className="flex justify-between items-center text-xs text-white/60 font-kiona tracking-wider">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#4ECDC4]" />
                            <span>
                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-[#4ECDC4]" />
                            <span>{post.views || 0} views</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </article>
    );
} 