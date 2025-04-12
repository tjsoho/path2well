"use client";

import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface AnimatedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
    pulse?: boolean;
    pulseDuration?: number;
    pulseScale?: number;
    className?: string;
    containerClassName?: string;
}

export function AnimatedImage({
    pulse = true,
    pulseDuration = 3,
    pulseScale = 1.05,
    className = "",
    containerClassName = "",
    ...imageProps
}: AnimatedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Animation variants
    const pulseVariants = {
        initial: { scale: 1 },
        animate: {
            scale: [1, pulseScale, 1],
            transition: {
                duration: pulseDuration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop" as const,
            },
        },
    };

    return (
        <motion.div
            className={`relative overflow-hidden ${containerClassName}`}
            initial="initial"
            animate={pulse && isLoaded ? "animate" : "initial"}
            variants={pulseVariants}
        >
            <Image
                {...imageProps}
                className={`${className}`}
                onLoad={() => setIsLoaded(true)}
            />
        </motion.div>
    );
} 