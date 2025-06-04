"use client";

import Link from "next/link";
import { Pencil, BookOpen, } from "lucide-react";
import { PDFManager } from "./PDFManager";
import { LeadsList } from "./LeadsList";
import { PrivacyPolicyEditor } from "./PrivacyPolicyEditor";
import { TermsAndConditionsEditor } from "./TermsAndConditionsEditor";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#001618] p-8">
      <div className="max-w-4xl mx-auto mt-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white tracking-wider">
            Admin Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link
            href="/blog-editor"
            className="group block p-8 bg-[#001618] border-2 border-[#4ECDC4]/20 rounded-xl 
                     shadow-lg shadow-[#4ECDC4]/10 hover:border-[#4ECDC4]/40 
                     transition-all duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <BookOpen className="w-6 h-6 text-[#4ECDC4]" />
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Blog Editor
              </h2>
            </div>
            <p className="text-white/70 tracking-wide">
              Create, edit, and manage blog posts
            </p>
            <div className="mt-4 text-[#4ECDC4]/70 text-sm tracking-wider group-hover:text-[#4ECDC4] transition-colors">
              Open Blog Editor →
            </div>
          </Link>

          <Link
            href="/editor"
            className="group block p-8 bg-[#001618] border-2 border-[#4ECDC4]/20 rounded-xl 
                     shadow-lg shadow-[#4ECDC4]/10 hover:border-[#4ECDC4]/40 
                     transition-all duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Pencil className="w-6 h-6 text-[#4ECDC4]" />
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Page Editor
              </h2>
            </div>
            <p className="text-white/70 tracking-wide">
              Edit website content and sections
            </p>
            <div className="mt-4 text-[#4ECDC4]/70 text-sm tracking-wider group-hover:text-[#4ECDC4] transition-colors">
              Open Page Editor →
            </div>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">

          </div>
          <PDFManager />
        </div>
        <LeadsList />
        <PrivacyPolicyEditor />
        <TermsAndConditionsEditor />
      </div>
    </div>
  );
}
