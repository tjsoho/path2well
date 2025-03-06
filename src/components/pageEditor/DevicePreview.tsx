"use client";

import { Laptop, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

type DeviceType = "desktop" | "tablet" | "mobile";

interface DevicePreviewProps {
  children: React.ReactNode;
}

const deviceSizes = {
  desktop: "w-full",
  tablet: "w-[768px]", // md breakpoint
  mobile: "w-[390px]", // typical mobile width
};

export function DevicePreview({ children }: DevicePreviewProps) {
  const [device, setDevice] = useState<DeviceType>("desktop");

  return (
    <div className="w-full">
      {/* Device Controls */}
      <div className="bg-white border-b border-brand-brown-dark/10 p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDevice("desktop")}
              className={`p-2 rounded-md transition-colors ${
                device === "desktop"
                  ? "bg-brand-brown-dark text-white"
                  : "text-brand-brown-dark hover:bg-brand-brown-dark/5"
              }`}
              title="Desktop View"
            >
              <Laptop className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`p-2 rounded-md transition-colors ${
                device === "tablet"
                  ? "bg-brand-brown-dark text-white"
                  : "text-brand-brown-dark hover:bg-brand-brown-dark/5"
              }`}
              title="Tablet View"
            >
              <Tablet className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`p-2 rounded-md transition-colors ${
                device === "mobile"
                  ? "bg-brand-brown-dark text-white"
                  : "text-brand-brown-dark hover:bg-brand-brown-dark/5"
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex justify-center bg-brand-cream/50">
        <div className={`${deviceSizes[device]} transition-all duration-300`}>
          {children}
        </div>
      </div>
    </div>
  );
}
