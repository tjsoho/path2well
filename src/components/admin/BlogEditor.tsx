"use client";

import { useRouter } from "next/navigation";

export function BlogEditor() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-brand-cream p-8">
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-kiona text-brand-brown-dark">
            Blog Editor
          </h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-md"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-md shadow-md p-8">
          <p className="text-brand-brown-dark/80">Blog editor coming soon...</p>
        </div>
      </div>
    </div>
  );
}
