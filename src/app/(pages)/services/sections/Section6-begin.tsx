"use client";

import { EditableText } from "@/components/pageEditor/EditableText";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface BeginSectionProps {
    isEditing?: boolean;
    content?: {
        heading?: string;
        subheading?: string;
        buttonText?: string;
    };
    onUpdate?: (id: string, value: string) => void;
}

export function BeginSection({
    isEditing = false,
    content = {},
    onUpdate,
}: BeginSectionProps) {
    const safeContent = {
        heading: content.heading || "Ready to Begin Your Wellness Journey?",
        subheading: content.subheading || "Take the first step towards optimal health with a personalised consultation.",
        buttonText: content.buttonText || "Book Your Consultation Now"
    };

    return (
        <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="relative bg-brand-teal rounded-xl overflow-hidden">
                    {/* Tech pattern overlay */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/bg1.png"
                            alt="Tech pattern"
                            fill
                            className="object-cover opacity-20"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative p-12 md:p-16">
                        <div className="max-w-2xl">
                            <EditableText
                                id="heading"
                                type="heading"
                                content={safeContent.heading}
                                isEditing={isEditing}
                                onUpdate={onUpdate}
                                className="text-3xl md:text-4xl text-white font-light mb-6 whitespace-pre-line"
                            />

                            <EditableText
                                id="subheading"
                                type="paragraph"
                                content={safeContent.subheading}
                                isEditing={isEditing}
                                onUpdate={onUpdate}
                                className="text-white/80 text-lg mb-8"
                            />

                            <Button
                                icon={Calendar}
                                iconPosition="left"
                                className="mt-4"
                            >
                                <EditableText
                                    id="buttonText"
                                    type="paragraph"
                                    content={safeContent.buttonText}
                                    isEditing={isEditing}
                                    onUpdate={onUpdate}
                                    className="text-brand-teal font-semibold"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 