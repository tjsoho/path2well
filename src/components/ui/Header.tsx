"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "./Menu";

const menuVariants = {
  initial: {
    gap: 8,
  },
  hover: {
    gap: 10,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const lineVariants = {
  initial: { width: 28 },
  hover: {
    width: 48,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const middleLineVariants = {
  initial: { width: 32 },
  hover: {
    width: 24,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userType, setUserType] = useState<"clients" | "advisors">("clients");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="mx-auto px-6 flex items-center justify-between">
          {/* Left space for symmetry - hidden on mobile */}
          <div className="w-32 hidden md:block" />

          {/* Logo - left on mobile, center on md+ */}
          <Link href="/" className="relative w-full md:w-64 h-32">
            <Image
              src="/images/logo.png"
              alt="Walker Lane"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Menu Button */}
          <div className="w-32 flex justify-end">
            <motion.button
              className="flex flex-col items-end cursor-pointer"
              variants={menuVariants}
              initial="initial"
              whileHover="hover"
              onClick={() => setIsMenuOpen(true)}
            >
              <motion.span
                className="h-[1px] bg-brand-brown-light"
                variants={lineVariants}
              />
              <motion.span
                className="h-[1px] bg-brand-brown-light"
                variants={middleLineVariants}
              />
              <motion.span
                className="h-[1px] bg-brand-brown-light"
                variants={lineVariants}
              />
            </motion.button>
          </div>
        </div>
      </header>

      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        userType={userType}
        onUserTypeChange={setUserType}
      />
    </>
  );
}
