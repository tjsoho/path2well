"use client";

import { AnimatedImage } from "@/components/ui/AnimatedImage";

export function AnimatedImageExample() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Default Pulse Animation</h3>
                <div className="h-64 w-full relative">
                    <AnimatedImage
                        src="/images/bg1.png"
                        alt="Default pulse animation"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Custom Pulse Animation</h3>
                <div className="h-64 w-full relative">
                    <AnimatedImage
                        src="/images/bg1.png"
                        alt="Custom pulse animation"
                        fill
                        className="object-cover rounded-lg"
                        pulseDuration={5}
                        pulseScale={1.1}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Disabled Pulse Animation</h3>
                <div className="h-64 w-full relative">
                    <AnimatedImage
                        src="/images/bg1.png"
                        alt="No pulse animation"
                        fill
                        className="object-cover rounded-lg"
                        pulse={false}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">With Container Styling</h3>
                <div className="h-64 w-full relative">
                    <AnimatedImage
                        src="/images/bg1.png"
                        alt="With container styling"
                        fill
                        className="object-cover rounded-lg"
                        containerClassName="border-4 border-brand-teal rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
} 