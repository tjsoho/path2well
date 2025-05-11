"use client";

import Image from "next/image";
import { ContactContent } from "./sections/ContactContent";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#001618] overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/newTech.png"
            alt="Contact Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Circuit Pattern Overlay */}
        <div
          className="absolute inset-0 bg-[url('/images/newTech.png')] opacity-5"
          style={{ backgroundSize: "30px 30px", backgroundRepeat: "repeat" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001618]/90 via-[#001618]/80 to-[#001618]/90" />
      </div>

      {/* Contact Content */}
      <ContactContent />
    </main>
  );
}
