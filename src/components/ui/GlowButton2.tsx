"use client";

import { LucideIcon } from "lucide-react";

interface GlowButton2Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    icon?: LucideIcon;
    className?: string;
}

export function GlowButton2({
    text,
    icon: Icon,
    className = "",
    ...props
}: GlowButton2Props) {
    return (
        <button
            className={`inline-flex items-center gap-2 bg-brand-teal/80 backdrop-blur-sm 
                 rounded-full text-white font-medium tracking-wide
                 transition-all duration-300 
                 hover:bg-brand-teal/30
                 shadow-[0_0_0px_rgba(78,205,196,0.2)]
                 hover:shadow-[0_0_20px_rgba(78,205,196,0.4)] ${className}`}
            {...props}
        >
            {text}
            {Icon && <Icon className="w-5 h-5" />}
        </button>
    );
}
