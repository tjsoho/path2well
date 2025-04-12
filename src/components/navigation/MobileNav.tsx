"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, Info, Briefcase, BookOpen, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [activeLink, setActiveLink] = useState<string | null>(null);
    const [animationComplete, setAnimationComplete] = useState(false);

    const Star = ({ className = "" }) => (
        <div className={`relative ${className}`}>
          <div className="absolute w-4 h-4">
            {/* Create 10 points with random lengths */}
            {[...Array(10)].map((_, i) => {
              const angle = i * 36 * (Math.PI / 180); // 360/10 = 36 degrees
              const length = Math.random() < 0.3 ? "12px" : "8px"; // 30% chance of longer point
              return (
                <div
                  key={i}
                  className="absolute w-0.5 bg-[#4ECDC4]"
                  style={{
                    height: length,
                    left: "50%",
                    top: "50%",
                    transformOrigin: "0 0",
                    transform: `rotate(${angle}rad) translateY(-50%)`,
                    boxShadow: "0 0 10px #4ECDC4, 0 0 20px #4ECDC4",
                  }}
                />
              );
            })}
            {/* Center dot */}
            <div
              className="absolute w-2 h-2 bg-[#4ECDC4] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        shadow-[0_0_15px_#4ECDC4,0_0_30px_#4ECDC4,0_0_45px_#4ECDC4]"
            />
          </div>
        </div>
      );

    // Handle mounting animation
    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            // Trigger the animation sequence after a short delay
            setTimeout(() => {
                setAnimationComplete(true);
            }, 100);
        } else {
            setAnimationComplete(false);
            // Delay unmounting to allow exit animation to complete
            const timer = setTimeout(() => {
                setMounted(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const isActive = (path: string) => {
        return pathname === path;
    };

    // Generate random delay for staggered animations
    const getRandomDelay = (index: number) => {
        return `${0.1 + index * 0.1}s`;
    };

    if (!mounted) return null;

    return (
        <div
            className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"
                }`}
        >

<div className="absolute inset-4 z-10">
        {/* First star - moving right and down */}
        <motion.div
          className="absolute w-4 h-4 left-10 top-10"
          animate={{
            x: ["0%", "100%", "100%", "0%", "0%"],
            y: ["0%", "0%", "100%", "100%", "0%"],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Star />
        </motion.div>

        {/* Second star - moving left and up */}
        <motion.div
          className="absolute w-4 h-4 right-10 bottom-10"
          animate={{
            x: ["0%", "-100%", "-100%", "0%", "0%"],
            y: ["0%", "0%", "-100%", "-100%", "0%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Star />
        </motion.div>
      </div>
            {/* Sci-fi background with grid effect */}
            <div className="absolute inset-0 bg-[#001618]/95 backdrop-blur-md">
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4ECDC4]/5 to-transparent"></div>
            </div>

            {/* Animated border effect with rounded corners */}
            <div className="absolute inset-4 border-2 border-[#4ECDC4]/20 rounded-3xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4ECDC4] to-transparent animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4ECDC4] to-transparent animate-pulse"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#4ECDC4] to-transparent animate-pulse"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#4ECDC4] to-transparent animate-pulse"></div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4ECDC4] rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#4ECDC4] rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#4ECDC4] rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#4ECDC4] rounded-br-3xl"></div>
            </div>

            <div className="h-full flex flex-col relative z-10 p-4">
                {/* Header with close button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={onClose}
                        className="text-white hover:text-[#4ECDC4] transition-colors p-2 relative group"
                    >
                        <div className="absolute inset-0 bg-[#4ECDC4]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        <X className="h-6 w-6 relative z-10" />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-4">
                    {[
                        { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
                        { href: "/about", label: "About us", icon: <Info className="w-5 h-5" /> },
                        { href: "/services", label: "Services", icon: <Briefcase className="w-5 h-5" /> },
                        { href: "/blog", label: "Blog", icon: <BookOpen className="w-5 h-5" /> },
                    ].map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            onMouseEnter={() => setActiveLink(link.href)}
                            onMouseLeave={() => setActiveLink(null)}
                            className={`relative group text-2xl font-chocolates uppercase transition-all duration-300 ${isActive(link.href)
                                ? "text-[#4ECDC4]"
                                : "text-white/90 hover:text-[#4ECDC4]"
                                }`}
                            style={{
                                opacity: animationComplete ? 1 : 0,
                                transform: animationComplete
                                    ? "translateY(0) scale(1)"
                                    : `translateY(${20 + index * 10}px) scale(0.9)`,
                                transitionDelay: getRandomDelay(index),
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="relative z-10">{link.icon}</span>
                                <span className="relative z-10">{link.label}</span>
                            </div>
                            <div
                                className={`absolute inset-0 bg-[#4ECDC4]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ${activeLink === link.href ? "scale-100" : ""
                                    }`}
                            ></div>
                            {isActive(link.href) && (
                                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4ECDC4] animate-pulse"></div>
                            )}
                        </Link>
                    ))}

                    <Link
                        href="/contact"
                        onClick={onClose}
                        className={`bg-[#4ECDC4] text-[#001618] px-6 py-3 rounded-full text-lg font-medium 
                         hover:bg-[#4ECDC4]/90 transition-all duration-300 inline-flex items-center space-x-2 mt-4 relative group overflow-hidden ${animationComplete ? "opacity-100 translate-y-0 scale(1)" : "opacity-0 translate-y-20 scale(0.9)"
                            }`}
                        style={{ transitionDelay: "0.5s" }}
                    >
                        <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        <Calendar className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Book consultation</span>
                    </Link>
                </div>
            </div>
        </div>
    );
} 