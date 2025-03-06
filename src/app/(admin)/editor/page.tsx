import { PageEditor } from "@/components/pageEditor/PageEditor";

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-kiona text-brand-brown-dark mb-8">
          Content Editor
        </h1>
        <PageEditor />
      </div>
    </div>
  );
} 