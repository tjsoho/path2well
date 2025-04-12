import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ethnocentric, ttChocolates, beauty } from "./fonts";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";
import { Toaster } from "react-hot-toast";
import { NavMenu } from "@/components/navigation/NavMenu";
import { PointerEffect } from "@/components/ui/PointerEffect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Path2Well",
  description: "Your journey to optimal wellness begins here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${ethnocentric.variable}
          ${ttChocolates.variable}
          ${beauty.variable}
          font-chocolates
          antialiased
          relative
        `}
        suppressHydrationWarning
      >
        <PointerEffect />
        <NavMenu />
        {children}
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
