import { getBlogs } from "./server-actions/get-blogs";
import { MetadataRoute } from "next";

interface BlogPost {
  slug: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Main pages with high priority
  const mainPages = [
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Blog related pages
  const blogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    // Individual blog posts
    ...blogs.map((blog: BlogPost) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(), // Ideally use blog.lastModified if available
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  // Legal pages with lower priority
  const legalPages = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Combine all pages
  return [...mainPages, ...blogPages, ...legalPages];
}
