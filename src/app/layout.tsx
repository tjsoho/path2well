import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ethnocentric, ttChocolates, beauty } from "./fonts";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";
import { Toaster } from "react-hot-toast";
import { NavMenu } from "@/components/navigation/NavMenu";
import { PointerEffect } from "@/components/ui/PointerEffect";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";

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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://www.path2well.com.au'),
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
        <ImageLibraryProvider>
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
        </ImageLibraryProvider>
      </body>
    </html>
  );
}