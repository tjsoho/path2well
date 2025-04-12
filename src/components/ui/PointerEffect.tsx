"use client";

import { useEffect, useState } from "react";

export function PointerEffect() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="fixed w-[500px] h-[500px] rounded-full bg-white/70 blur-[100px] pointer-events-none transition-opacity duration-300 z-0"
            style={{
                left: `${mousePosition.x - 250}px`,
                top: `${mousePosition.y - 250}px`,
                opacity: 0.2
            }}
        />
    );
} 