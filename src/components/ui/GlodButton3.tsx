"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface GlowButton3Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  text?: string;
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

export function GlowButton3({
  href,
  text,
  icon: Icon,
  className = "",
  children,
  ...props
}: GlowButton3Props) {
  const content = (
    <>
      {Icon && <Icon className="w-5 h-5" />}
      <span>{text || children}</span>
    </>
  );

  const baseStyles = `inline-flex items-center gap-2 px-4 py-2
                bg-brand-teal backdrop-blur-sm border border-white/50
                rounded-full text-white font-medium tracking-wide
                transition-all duration-300 
                hover:bg-[#4ECDC4]/30 hover:border-[#4ECDC4]/60
                shadow-[0_0_5px_#4ECDC4,0_0_30px_#4ECDC4,0_0_40px_#4ECDC4]
                hover:shadow-[0_0_25px_#4ECDC4,0_0_45px_#4ECDC4,0_0_60px_#4ECDC4]`;

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
