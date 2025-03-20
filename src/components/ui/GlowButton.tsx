"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface GlowButtonProps {
  href: string;
  text: string;
  icon?: LucideIcon;
  className?: string;
}

export function GlowButton({
  href,
  text,
  icon: Icon,
  className = "",
}: GlowButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-8 py-4 
                bg-brand-teal backdrop-blur-sm border border-white/50
                rounded-full text-white font-medium tracking-wide
                transition-all duration-300 
                hover:bg-[#4ECDC4]/30 hover:border-[#4ECDC4]/60
                shadow-[0_0_5px_#4ECDC4,0_0_30px_#4ECDC4,0_0_40px_#4ECDC4]
                hover:shadow-[0_0_25px_#4ECDC4,0_0_45px_#4ECDC4,0_0_60px_#4ECDC4]
                ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{text}</span>
    </Link>
  );
}
