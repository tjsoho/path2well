"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { MobileNav } from "./MobileNav";

export function NavMenu() {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-3 ">
        <nav className="bg-[#001618]/70 backdrop-blur-md rounded-full border border-[#4ECDC4]/20 shadow-[0_0_15px_rgba(78,205,196,0.1)]">
          <div className="px-6 mx-auto">
            <div className="flex items-center justify-between h-12">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Path2Well"
                  width={24}
                  height={24}
                  className="w-32 h-auto"
                />
              </Link>

              {/* Navigation Links - Centered */}
              <div className="hidden md:flex items-center justify-center space-x-8 flex-1 mx-8 font-chocolates uppercase">
                <Link
                  href="/"
                  className={`${isActive("/")
                    ? "text-[#4ECDC4]"
                    : "text-white/90 hover:text-[#4ECDC4]"
                    } transition-colors tracking-wide text-sm`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`${isActive("/about")
                    ? "text-[#4ECDC4]"
                    : "text-white/90 hover:text-[#4ECDC4]"
                    } transition-colors tracking-wide text-sm`}
                >
                  About us
                </Link>
                <Link
                  href="/services"
                  className={`${isActive("/services")
                    ? "text-[#4ECDC4]"
                    : "text-white/90 hover:text-[#4ECDC4]"
                    } transition-colors tracking-wide text-sm`}
                >
                  Services
                </Link>
                <Link
                  href="/blog"
                  className={`${isActive("/blog")
                    ? "text-[#4ECDC4]"
                    : "text-white/90 hover:text-[#4ECDC4]"
                    } transition-colors tracking-wide text-sm`}
                >
                  Blog
                </Link>
              </div>

              {/* Book Consultation Button */}
              <div className="hidden md:block shrink-0">
                <Link
                  href="/contact"
                  className="bg-[#4ECDC4] text-[#001618] px-4 py-2 rounded-full text-sm font-medium 
                           hover:bg-[#4ECDC4]/90 transition-colors tracking-wide inline-flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book consultation</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="md:hidden text-white hover:text-[#4ECDC4] transition-colors p-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
