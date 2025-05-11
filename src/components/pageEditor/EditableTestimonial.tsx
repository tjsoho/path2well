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
    onUpdate?: (index: number, testimonial: Testimonial) => void;
    onDelete?: (index: number) => void;
}

export function EditableTestimonial({
    testimonial,
    index,
    isEditing = false,
    onUpdate,
    onDelete,
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
            onUpdate(index, editedTestimonial);
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
        setEditedTestimonial(prev => ({
            ...prev,
            [field]: value
        }));
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
                        <div className="flex justify-center gap-2 mt-2">
                            <button
                                onClick={() => onDelete?.(index)}
                                className="p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300"
                                title="Delete testimonial"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
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
                        className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden cursor-pointer relative"
                        onClick={handleClick}
                    >
                        <div className="relative h-64">
                            <EditableImage
                                src={testimonial.image}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                                isEditing={isEditing}
                                onUpdate={(newImageUrl) => onUpdate?.(index, { ...testimonial, image: newImageUrl })}
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-white text-xl mb-2">{testimonial.name}</h3>
                            <p className="text-brand-teal text-sm mb-4">{testimonial.title}</p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {testimonial.quote}
                            </p>
                        </div>

                        {/* Delete Button */}
                        {isEditing && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the edit mode
                                    if (window.confirm('Are you sure you want to delete this testimonial?')) {
                                        onDelete?.(index);
                                    }
                                }}
                                className={`absolute bottom-4 right-4 p-2 rounded-full bg-red-500/90 text-white shadow-lg
                                transform transition-all duration-300 cursor-pointer
                                hover:bg-red-600 hover:scale-110
                                ${isHovered ? "opacity-100" : "opacity-0"}`}
                                title="Delete testimonial"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Edit Icon */}
                    {isEditing && (
                        <div
                            className={`absolute bottom-4 left-4 p-2.5 
                         rounded-full bg-pink-500 text-white shadow-lg
                         transform transition-all duration-300 cursor-pointer
                         hover:bg-pink-600 hover:scale-110
                         ${isHovered
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-2"
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