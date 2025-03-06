"use client";

import Link from "next/link";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-brand-cream p-8">
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-kiona text-brand-brown-dark">
            Admin Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/blog-editor"
            className="block p-8 bg-white rounded-md shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-kiona text-brand-brown-dark mb-4">
              Blog Editor
            </h2>
            <p className="text-brand-brown-dark/80">
              Create, edit, and manage blog posts
            </p>
          </Link>

          <Link
            href="/editor"
            className="block p-8 bg-white rounded-md shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-kiona text-brand-brown-dark mb-4">
              Page Editor
            </h2>
            <p className="text-brand-brown-dark/80">
              Edit website content and sections
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
