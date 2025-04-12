"use client";

import { useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import { GlowButton2 } from "./GlowButton2";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const pageLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const adminLinks = [
  { name: "Admin", href: "/admin" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-brand-blue-dark overflow-hidden">
      {/* Tech pattern background */}
      <div className="absolute inset-0">
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
            src="/images/bg12.png"
            alt="Tech pattern"
            fill
            className="object-cover opacity-30"
          />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Newsletter section */}
        <div className="text-center mb-16">
          <h2 className="text-white text-2xl mb-2">Stay Updated with Modern Medicine</h2>
          <p className="text-white/80 mb-8">Download the latest news and research in modern medicine.</p>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full bg-transparent border border-brand-teal rounded-full px-6 py-3 pr-32 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-teal/50 shadow-[0_0_10px_rgba(78,205,196,0.1)] focus:shadow-[0_0_15px_rgba(78,205,196,0.2)]"
              />
              <div className="absolute right-2">
                <GlowButton2
                  text="Submit"
                  className="py-2 px-6"
                  type="submit"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Links section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Pages */}
          <div>
            <h3 className="text-white mb-6 text-lg">Pages</h3>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Admin Links */}
          <div>
            <h3 className="text-white mb-6 text-lg">Legal</h3>
            <ul className="space-y-3">
              {adminLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white mb-6 text-lg">Connect With Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4 md:mb-0">
            <span>© {new Date().getFullYear()} Path2Well. All rights reserved.</span>
          </div>
          <div className="text-white/60 text-sm">
            Designed by{" "}
            <a
              href="https://www.ai-guy.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal hover:text-brand-teal/80 transition-colors"
            >
              The AI Guy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
