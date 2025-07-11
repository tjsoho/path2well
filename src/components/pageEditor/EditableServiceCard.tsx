"use client";

import { useState, useEffect } from "react";
import { Check, X, Trash, Pencil } from "lucide-react";
import { EditableImage } from "./EditableImage";
import { toast } from "react-hot-toast";
import Link from "next/link";

export interface ServiceCard {
    image: string;
    title: string;
    description: string;
    disclaimer?: string;
}

interface EditableServiceCardProps {
    card: ServiceCard;
    index: number;
    isEditing?: boolean;
    onUpdate: (index: number, updatedCard: ServiceCard) => void;
    onDelete?: (index: number) => void;
}

export function EditableServiceCard({
    card,
    index,
    isEditing = false,
    onUpdate,
    onDelete,
}: EditableServiceCardProps) {
    const [isEditingInPlace, setIsEditingInPlace] = useState(false);
    const [editedCard, setEditedCard] = useState<ServiceCard>(card);
    const [isHovered, setIsHovered] = useState(false);

    // Update editedCard when card prop changes
    useEffect(() => {
        setEditedCard(card);
    }, [card]);

    const handleClick = () => {
        if (isEditing && !isEditingInPlace) {
            setIsEditingInPlace(true);
        }
    };

    const handleSave = () => {
        if (onUpdate) {
            onUpdate(index, editedCard);
        }
        setIsEditingInPlace(false);
    };

    const handleCancel = () => {
        setEditedCard(card);
        setIsEditingInPlace(false);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        toast((t) => (
            <div className="flex flex-col gap-2">
                <p>Are you sure you want to delete this service card?</p>
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
                            <label className="block text-white text-sm mb-1">Image URL</label>
                            <input
                                type="text"
                                value={editedCard.image}
                                onChange={(e) => setEditedCard({ ...editedCard, image: e.target.value })}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Title</label>
                            <input
                                type="text"
                                value={editedCard.title}
                                onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Description</label>
                            <textarea
                                value={editedCard.description}
                                onChange={(e) => setEditedCard({ ...editedCard, description: e.target.value })}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                rows={3}
                            />
                        </div>
                        {editedCard.disclaimer && (
                            <div>
                                <label className="block text-white text-sm mb-1">Disclaimer</label>
                                <textarea
                                    value={editedCard.disclaimer}
                                    onChange={(e) => setEditedCard({ ...editedCard, disclaimer: e.target.value })}
                                    className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    rows={2}
                                />
                            </div>
                        )}
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                                onClick={handleDelete}
                                className="p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300"
                                title="Delete service card"
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
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/10">
                        <Link href="/services#section-header" scroll={true}>
                            <EditableImage
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                isEditing={isEditing}
                                onUpdate={(newImageUrl) => onUpdate?.(index, { ...card, image: newImageUrl })}
                                width={400}
                                height={300}
                            />
                        </Link>
                    </div>
                    <div className="mt-4 text-left pl-2">
                        <h3 className="text-lg font-medium mb-1 text-white">{card.title}</h3>
                        <p className="text-white/70 text-sm">{card.description}</p>
                        {card.disclaimer && (
                            <p className="text-white/50 text-xs italic mt-2">{card.disclaimer}</p>
                        )}
                        <a
                            href="/contact"
                            className="inline-block mt-4 px-6 py-2 bg-[#4ECDC4] text-[#001618] rounded-lg font-bold hover:bg-[#4ECDC4]/90 transition-colors"
                        >
                            Contact Us
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
                            title="Delete service card"
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