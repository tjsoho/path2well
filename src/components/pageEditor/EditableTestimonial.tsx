"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";

import { EditableImage } from "./EditableImage";

export interface Testimonial {
    name: string;
    image: string;
    quote: string;
    title: string;
}

export interface EditableTestimonialProps {
    testimonial: Testimonial;
    index: number;
    isEditing?: boolean;
    onUpdate?: (index: number, field: keyof Testimonial, value: string) => void;
}

export function EditableTestimonial({
    testimonial,
    index,
    isEditing = false,
    onUpdate,
}: EditableTestimonialProps) {
    const [isEditingInPlace, setIsEditingInPlace] = useState(false);
    const [editedTestimonial, setEditedTestimonial] = useState<Testimonial>(testimonial);
    const [isHovered, setIsHovered] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Update editedTestimonial when testimonial prop changes
    useEffect(() => {
        setEditedTestimonial(testimonial);
    }, [testimonial]);

    // Focus textarea when editing starts
    useEffect(() => {
        if (isEditingInPlace && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditingInPlace]);

    const handleClick = () => {
        if (isEditing && !isEditingInPlace) {
            setIsEditingInPlace(true);
        }
    };

    const handleSave = async () => {
        if (onUpdate) {
            // Update each field individually
            Object.keys(editedTestimonial).forEach((key) => {
                const field = key as keyof Testimonial;
                if (editedTestimonial[field] !== testimonial[field]) {
                    onUpdate(index, field, editedTestimonial[field]);
                }
            });
        }
        setIsEditingInPlace(false);
    };

    const handleCancel = () => {
        setEditedTestimonial(testimonial);
        setIsEditingInPlace(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const handleFieldChange = (field: keyof Testimonial, value: string) => {
        setEditedTestimonial({
            ...editedTestimonial,
            [field]: value,
        });
    };

    const handleImageUpdate = (newImageUrl: string) => {
        handleFieldChange('image', newImageUrl);
    };

    return (
        <div
            className={`group relative ${isEditing
                ? "hover:bg-brand-teal/5 rounded-lg transition-all duration-300"
                : ""
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isEditingInPlace ? (
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden">
                    <div className="relative h-64">
                        <EditableImage
                            src={editedTestimonial.image}
                            alt={editedTestimonial.name}
                            fill
                            className="object-cover"
                            isEditing={isEditing}
                            onUpdate={handleImageUpdate}
                        />
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-white text-sm mb-1">Name</label>
                            <input
                                type="text"
                                value={editedTestimonial.name}
                                onChange={(e) => handleFieldChange('name', e.target.value)}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Title</label>
                            <input
                                type="text"
                                value={editedTestimonial.title}
                                onChange={(e) => handleFieldChange('title', e.target.value)}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Quote</label>
                            <textarea
                                ref={textareaRef}
                                value={editedTestimonial.quote}
                                onChange={(e) => handleFieldChange('quote', e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                rows={3}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={handleCancel}
                                className="p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleSave}
                                className="p-2 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300"
                            >
                                <Check className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden cursor-pointer"
                        onClick={handleClick}
                    >
                        <div className="relative h-64">
                            <EditableImage
                                src={testimonial.image}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                                isEditing={isEditing}
                                onUpdate={(newImageUrl) => onUpdate?.(index, 'image', newImageUrl)}
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-white text-xl mb-2">{testimonial.name}</h3>
                            <p className="text-brand-teal text-sm mb-4">{testimonial.title}</p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {testimonial.quote}
                            </p>
                        </div>
                    </div>

                    {/* Edit Icon */}
                    {isEditing && (
                        <div
                            className={`absolute -right-12 top-1/2 -translate-y-1/2 p-2.5 
                         rounded-full bg-pink-500 text-white shadow-lg
                         transform transition-all duration-300 cursor-pointer
                         hover:bg-pink-600 hover:scale-110
                         ${isHovered
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-2"
                                }`}
                            onClick={handleClick}
                        >
                            <Pencil className="w-5 h-5" />
                        </div>
                    )}

                    {/* Edit Indicator */}
                    {isEditing && (
                        <div
                            className={`absolute inset-0 rounded-lg border-2 border-dashed 
                         pointer-events-none transition-all duration-300
                         ${isHovered ? "border-pink-500/50" : "border-transparent"
                                }`}
                        />
                    )}
                </>
            )}
        </div>
    );
} 