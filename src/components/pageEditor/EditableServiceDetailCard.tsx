"use client";

import { useState, useEffect } from "react";
import { Check, X, Plus, Trash, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";

export interface ServiceDetail {
    title: string;
    subtitle: string;
    price: string;
    whatsIncluded: string[];
    benefits: string[];
    ctaText: string;
    ctaLink: string;
    disclaimer?: string;
}

export interface EditableServiceDetailCardProps {
    service: ServiceDetail;
    index: number;
    isEditing?: boolean;
    onUpdate: (index: number, updatedService: ServiceDetail) => void;
    onDelete?: (index: number) => void;
}

export function EditableServiceDetailCard({
    service,
    index,
    isEditing = false,
    onUpdate,
    onDelete,
}: EditableServiceDetailCardProps) {
    const [isEditingInPlace, setIsEditingInPlace] = useState(false);
    const [editedService, setEditedService] = useState<ServiceDetail>(service);
    const [isHovered, setIsHovered] = useState(false);

    // Update editedService when service prop changes
    useEffect(() => {
        setEditedService(service);
    }, [service]);

    const handleClick = () => {
        if (isEditing && !isEditingInPlace) {
            setIsEditingInPlace(true);
        }
    };

    const handleSave = () => {
        if (onUpdate) {
            onUpdate(index, editedService);
        }
        setIsEditingInPlace(false);
    };

    const handleCancel = () => {
        setEditedService(service);
        setIsEditingInPlace(false);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        toast((t) => (
            <div className="flex flex-col gap-2">
                <p>Are you sure you want to delete this service detail?</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onDelete?.(index);
                            toast.dismiss(t.id);
                        }}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            position: 'top-center',
        });
    };

    const handleAddItem = (type: 'whatsIncluded' | 'benefits') => {
        setEditedService(prev => ({
            ...prev,
            [type]: [...prev[type], '']
        }));
    };

    const handleRemoveItem = (type: 'whatsIncluded' | 'benefits', index: number) => {
        setEditedService(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    };

    const handleUpdateItem = (type: 'whatsIncluded' | 'benefits', index: number, value: string) => {
        setEditedService(prev => ({
            ...prev,
            [type]: prev[type].map((item, i) => i === index ? value : item)
        }));
    };

    return (
        <div
            className={`group relative ${isEditing ? "hover:bg-brand-teal/5 rounded-lg transition-all duration-300" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {isEditingInPlace ? (
                <div className="relative bg-white/10 rounded-3xl overflow-hidden p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-white text-sm mb-1">Title</label>
                            <input
                                type="text"
                                value={editedService.title}
                                onChange={(e) => setEditedService({ ...editedService, title: e.target.value })}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Subtitle</label>
                            <textarea
                                value={editedService.subtitle}
                                onChange={(e) => setEditedService({ ...editedService, subtitle: e.target.value })}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                rows={2}
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Price</label>
                            <input
                                type="text"
                                value={editedService.price}
                                onChange={(e) => setEditedService({ ...editedService, price: e.target.value })}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">What&apos;s Included</label>
                            <div className="space-y-2">
                                {editedService.whatsIncluded.map((item, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => handleUpdateItem('whatsIncluded', i, e.target.value)}
                                            className="flex-1 bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                        <button
                                            onClick={() => handleRemoveItem('whatsIncluded', i)}
                                            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleAddItem('whatsIncluded')}
                                    className="w-full p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                                >
                                    <Plus className="w-4 h-4 mx-auto" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Benefits</label>
                            <div className="space-y-2">
                                {editedService.benefits.map((item, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => handleUpdateItem('benefits', i, e.target.value)}
                                            className="flex-1 bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                        <button
                                            onClick={() => handleRemoveItem('benefits', i)}
                                            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleAddItem('benefits')}
                                    className="w-full p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                                >
                                    <Plus className="w-4 h-4 mx-auto" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">CTA Text</label>
                            <input
                                type="text"
                                value={editedService.ctaText}
                                onChange={(e) => setEditedService({ ...editedService, ctaText: e.target.value })}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">CTA Link</label>
                            <input
                                type="text"
                                value={editedService.ctaLink}
                                onChange={(e) => setEditedService({ ...editedService, ctaLink: e.target.value })}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        {editedService.disclaimer && (
                            <div>
                                <label className="block text-white text-sm mb-1">Disclaimer</label>
                                <textarea
                                    value={editedService.disclaimer}
                                    onChange={(e) => setEditedService({ ...editedService, disclaimer: e.target.value })}
                                    className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    rows={2}
                                />
                            </div>
                        )}
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                                onClick={handleDelete}
                                className="p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300"
                                title="Delete service detail"
                            >
                                <Trash className="w-5 h-5" />
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
                    <div className="backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden border border-white/20 p-6">
                        <h3 className="text-white text-xl font-semibold mb-3">{service.title}</h3>
                        <p className="text-white/80 text-sm mb-4">{service.subtitle}</p>
                        <div className="text-teal-400 text-2xl font-bold mb-6">{service.price}</div>

                        {service.whatsIncluded && (
                            <div className="mb-8">
                                <h4 className="text-white font-medium mb-4">What&apos;s Included:</h4>
                                <ul className="space-y-3">
                                    {service.whatsIncluded.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                                            <svg className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {service.benefits && (
                            <div className="mb-8">
                                <h4 className="text-white font-medium mb-4">Benefits of {service.title.split(' ').slice(-1)[0]}:</h4>
                                <ul className="space-y-3">
                                    {service.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                                            <svg className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {service.disclaimer && (
                            <p className="text-white/60 text-xs italic mb-6">
                                {service.disclaimer}
                            </p>
                        )}
                        <a
                            href={service.ctaLink}
                            className="block w-full py-3 px-6 bg-transparent border border-teal-400 text-teal-400 text-center rounded-full hover:bg-teal-400 hover:text-black transition-all duration-300"
                        >
                            {service.ctaText}
                        </a>
                    </div>

                    {/* Delete Button */}
                    {isEditing && (
                        <button
                            onClick={handleDelete}
                            className={`absolute bottom-4 right-4 p-2 rounded-full bg-red-500/90 text-white shadow-lg
                            transform transition-all duration-300 cursor-pointer
                            hover:bg-red-600 hover:scale-110
                            ${isHovered ? "opacity-100" : "opacity-0"}`}
                            title="Delete service detail"
                        >
                            <Trash className="w-5 h-5" />
                        </button>
                    )}

                    {/* Edit Icon */}
                    {isEditing && isHovered && (
                        <div className="flex justify-center mt-2">
                            <button
                                type="button"
                                className="p-2.5 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 hover:scale-110 transition-all duration-300"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Edit Indicator */}
                    {isEditing && (
                        <div
                            className={`absolute inset-0 rounded-lg border-2 border-dashed 
                         pointer-events-none transition-all duration-300
                         ${isHovered ? "border-pink-500/50" : "border-transparent"}`}
                        />
                    )}
                </>
            )}
        </div>
    );
} 