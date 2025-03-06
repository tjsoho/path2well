"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiHome5Line,
  RiInformationLine,
  RiBriefcase2Line,
  RiNewspaperLine,
  RiMailLine,
  RiLinkedinBoxLine,
  RiTwitterXLine,
  RiInstagramLine,
  // RiArrowRightLine,
} from "react-icons/ri";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  userType: "clients" | "advisors";
  onUserTypeChange: (type: "clients" | "advisors") => void;
}

export function Menu({
  isOpen,
  onClose,
  userType,
  onUserTypeChange,
}: MenuProps) {
  const pathname = usePathname();

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const menuItems = [
    { title: "Home", href: "/", icon: RiHome5Line },
    { title: "About", href: "/about", icon: RiInformationLine },
    { title: "Services", href: "/services", icon: RiBriefcase2Line },
    { title: "Blog", href: "/blog", icon: RiNewspaperLine },
    { title: "Contact", href: "/contact", icon: RiMailLine },
  ];

  const socialLinks = [
    { icon: RiLinkedinBoxLine, href: "#", label: "LinkedIn" },
    { icon: RiTwitterXLine, href: "#", label: "Twitter" },
    { icon: RiInstagramLine, href: "#", label: "Instagram" },
  ];

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  const linkVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    tap: {
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const arrowVariants = {
    initial: {
      width: 0,
      opacity: 0,
    },
    hover: {
      width: "4rem",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    tap: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const arrowHeadVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    hover: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    tap: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full bg-brand-brown-dark w-full md:w-1/2 z-50 overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 lg:top-8 right-8 text-brand-cream hover:text-brand-brown-light transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Menu Content */}
            <div className="pt-16 px-8 pb-8 h-full flex flex-col">
              {/* Mobile User Type Selector */}
              <div className="md:hidden flex gap-4 mb-12">
                <motion.button
                  variants={itemVariants}
                  custom={0}
                  onClick={() => onUserTypeChange("clients")}
                  className={`flex-1 px-4 py-2 text-sm transition-all duration-300 border rounded-md ${
                    userType === "clients"
                      ? "bg-brand-brown-light text-brand-black border-brand-brown-light"
                      : "bg-transparent text-brand-brown-light border-brand-brown-light"
                  }`}
                >
                  CLIENTS
                </motion.button>
                <motion.button
                  variants={itemVariants}
                  custom={0}
                  onClick={() => onUserTypeChange("advisors")}
                  className={`flex-1 px-4 py-2 text-sm transition-all duration-300 border rounded-md ${
                    userType === "advisors"
                      ? "bg-brand-brown-light text-brand-black border-brand-brown-light"
                      : "bg-transparent text-brand-brown-light border-brand-brown-light"
                  }`}
                >
                  ADVISORS
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-12">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i + 1}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <motion.div
                      className="group relative inline-flex items-center"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center text-4xl md:text-5xl transition-colors ${
                          pathname === item.href
                            ? "text-brand-brown-light"
                            : "text-brand-cream hover:text-brand-brown-light"
                        }`}
                        onClick={onClose}
                      >
                        <item.icon className="w-8 h-8 md:w-10 md:h-10 mr-4" />
                        <span className="font-kiona relative">
                          {item.title}
                          {pathname === item.href && (
                            <motion.div
                              layoutId="underline"
                              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-brand-brown-light"
                            />
                          )}
                        </span>
                      </Link>
                      <div className="relative ml-4 flex items-center">
                        <motion.div
                          variants={arrowVariants}
                          className="h-[1px] bg-brand-brown-light self-center"
                        />
                        <motion.div
                          variants={arrowHeadVariants}
                          className="absolute right-0 transform translate-x-1/2"
                        >
                          <div className="w-2 h-2 border-t border-r border-brand-brown-light rotate-45" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </nav>

              {/* Social Links & Email */}
              <motion.div
                variants={itemVariants}
                custom={9}
                className="mt-auto flex gap-6 items-center"
              >
                <a
                  href="mailto:contact@walkerlane.com"
                  className="text-brand-cream hover:text-brand-brown-light transition-colors"
                  aria-label="Email us"
                >
                  <RiMailLine className="w-6 h-6" />
                </a>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-brand-cream hover:text-brand-brown-light transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
