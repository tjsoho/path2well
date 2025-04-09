"use client";


import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export function Button({
  children,
  className,
  variant = 'primary',
  icon: Icon,
  iconPosition = 'left',
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ease-in-out bg-white text-brand-teal border border-brand-teal hover:bg-brand-teal/5";

  const variants = {
    primary: "bg-white hover:bg-brand-teal/5 text-brand-teal border border-brand-teal shadow-lg hover:shadow-xl shadow-[0_0_5px_#4ECDC4,0_0_10px_#4ECDC4,0_0_40px_#4ECDC4] hover:shadow-[0_0_5px_#4ECDC4,0_0_40px_#4ECDC4,0_0_40px_#4ECDC4]",
    secondary: "bg-white text-brand-teal border border-brand-teal hover:bg-brand-teal/5"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={20} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={20} />}
    </button>
  );
}
