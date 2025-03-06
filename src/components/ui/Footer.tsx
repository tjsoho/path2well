"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  RiInstagramLine,
  RiFacebookBoxLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin" },
];

const legalLinks = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  {
    icon: RiInstagramLine,
    href: "https://instagram.com",
    label: "Follow us on Instagram",
  },
  {
    icon: RiFacebookBoxLine,
    href: "https://facebook.com",
    label: "Follow us on Facebook",
  },
  {
    icon: RiLinkedinBoxLine,
    href: "https://linkedin.com",
    label: "Follow us on LinkedIn",
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <>
      <footer className="bg-brand-blue">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8 ">
            {/* Logo & Description */}
            <div className="lg:col-span-2 flex flex-col justify-end h-full">
              <div>
                <Link href="/" className="inline-block mb-6">
                  <Image
                    src="/images/logo.png"
                    alt="Walker Lane"
                    width={180}
                    height={60}
                    className="h-12 w-auto -ml-5"
                  />
                </Link>
                <p className="text-brand-brown-dark text-lg max-w-md">
                  Empowering Australians to thrive financially through
                  personalized guidance and expert solutions.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-brand-brown-dark font-kiona mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-brand-brown-dark/80 hover:text-brand-brown-dark transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-brand-brown-dark font-kiona mb-4">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-brand-brown-dark/80 hover:text-brand-brown-dark transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links & Newsletter */}
            <div className="text-right">
              <h4 className="text-brand-brown-dark font-kiona mb-4">
                Connect With Us
              </h4>
              <div className="flex justify-end space-x-4 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-brown-dark/80 hover:text-brand-brown-dark transition-colors border border-brand-brown-dark/20 p-2 rounded-md"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              {/* Newsletter */}
              <div className="ml-auto">
                <h4 className="text-brand-brown-dark font-kiona mb-4">
                  Financial Insights
                </h4>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 w-[200px] ml-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-md bg-transparent text-brand-brown-dark placeholder:text-brand-brown-dark/50 border border-brand-brown-dark/20 focus:outline-none focus:ring-2 focus:ring-brand-brown-dark"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-brand-brown-dark text-brand-cream rounded-md hover:bg-brand-brown-dark/90 transition-colors font-kiona"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-brand-brown-dark/50">
            <p className="text-brand-brown-dark text-sm text-center">
              © {new Date().getFullYear()} Walker Lane. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Designer Banner */}
      <div className="bg-brand-brown-dark h-[50px] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-brand-cream/90 text-sm tracking-wider">
            Designed By{" "}
            <a
              href="https://www.ai-guy.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-cream font-medium hover:text-brand-cream/80 transition-colors"
            >
              AI GUY BUSINESS SOLUTIONS
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
