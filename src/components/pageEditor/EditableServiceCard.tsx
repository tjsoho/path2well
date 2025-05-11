"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { EditableImage } from "./EditableImage";

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
}

export function EditableServiceCard({
    card,
    index,
    isEditing = false,
    onUpdate,
}: EditableServiceCardProps) {
    const [isEditingInPlace, setIsEditingInPlace] = useState(false);
    const [editedCard, setEditedCard] = useState(card);

    const handleSave = () => {
        onUpdate(index, editedCard);
        setIsEditingInPlace(false);
    };

    const handleCancel = () => {
        setEditedCard(card);
        setIsEditingInPlace(false);
    };

    return (
        <div
            className="backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden border border-white/20 relative group cursor-default"
            onClick={() => isEditing && !isEditingInPlace && setIsEditingInPlace(true)}
        >
            {isEditingInPlace ? (
                <div className="space-y-2 p-4">
                    <EditableImage
                        src={editedCard.image}
                        alt={editedCard.title}
                        width={400}
                        height={250}
                        isEditing={isEditing}
                        onUpdate={(value) => setEditedCard({ ...editedCard, image: value })}
                    />
                    <input
                        type="text"
                        value={editedCard.title}
                        onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
                        className="w-full text-black font-medium text-xl bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5 mb-2"
                        placeholder="Enter title..."
                    />
                    <textarea
                        value={editedCard.description}
                        onChange={(e) => setEditedCard({ ...editedCard, description: e.target.value })}
                        className="w-full text-gray-600 text-sm leading-relaxed bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5 resize-none mb-2"
                        placeholder="Enter description..."
                        rows={3}
                    />
                    <input
                        type="text"
                        value={editedCard.disclaimer || ''}
                        onChange={(e) => setEditedCard({ ...editedCard, disclaimer: e.target.value })}
                        className="w-full text-xs text-gray-500 bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5 mb-2"
                        placeholder="Enter disclaimer... (optional)"
                    />
                    <div className="flex justify-center gap-2 mt-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleSave(); }}
                            className="p-2 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300"
                        >
                            <Check className="w-5 h-5" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleCancel(); }}
                            className="p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="relative">
                        <EditableImage
                            src={card.image}
                            alt={card.title}
                            width={400}
                            height={250}
                            isEditing={isEditing}
                            onUpdate={(value) => setEditedCard({ ...card, image: value })}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        {card.disclaimer && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm">
                                <p className="text-white text-xs">{card.disclaimer}</p>
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <h3 className="text-white text-xl font-semibold mb-3">{card.title}</h3>
                        <p className="text-white/80 text-sm">{card.description}</p>
                    </div>
                </>
            )}
        </div>
    );
} 