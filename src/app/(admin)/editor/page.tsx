/*****************************************************************
 *                            Imports
 *****************************************************************/
import { PageEditor } from "@/components/pageEditor/PageEditor";
import Image from "next/image";

/*****************************************************************
 *                         Page Component
 *****************************************************************
 * EditorPage: Admin page for content editing
 * Features:
 * - Full-screen background with brand logo
 * - Gradient circle background element
 * - Centered content area with max width
 * - Responsive padding and spacing
 * - Semi-transparent overlay for better content visibility
 *****************************************************************/
export default function EditorPage() {
  return (
    <div className="relative min-h-screen bg-brand-black overflow-hidden">
      {/*****************************************************************
       *                    Background Gradient Circle
       *****************************************************************/}
      <div className="absolute w-[600px] h-[600px] left-40 top-40 opacity-30 z-10">
        <div className="w-full h-full rounded-full bg-gradient-radial from-brand-teal to-transparent blur-3xl" />
      </div>

      {/*****************************************************************
       *                    Background Logo Section
       *****************************************************************/}
      <div className="absolute inset-0 opacity-10 transform -rotate-12 scale-150 ">
        <div className="relative w-full h-full z-50">
          <Image
            src="/images/logo.png"
            alt="Background Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/*****************************************************************
       *                    Content Section
       *****************************************************************/}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-ethnocentric text-brand-white mb-8 pt-8">
          Content Editor
        </h1>
        <PageEditor />
      </div>
    </div>
  );
}
