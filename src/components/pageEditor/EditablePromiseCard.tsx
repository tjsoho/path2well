"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { EditableImage } from "./EditableImage";

export interface PromiseCard {
    title: string;
    description: string;
    icon: string;
}

interface EditablePromiseCardProps {
    card: PromiseCard;
    index: number;
    isEditing?: boolean;
    onUpdate: (index: number, updatedCard: PromiseCard) => void;
}

export function EditablePromiseCard({
    card,
    index,
    isEditing = false,
    onUpdate,
}: EditablePromiseCardProps) {
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
            className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-teal-200 relative group cursor-default"
            onClick={() => isEditing && !isEditingInPlace && setIsEditingInPlace(true)}
        >
            {isEditingInPlace ? (
                <div className="space-y-2">
                    <div className="flex-shrink-0 mb-4">
                        <div className="w-12 h-12 rounded-full border border-brand-teal flex items-center justify-center">
                            <EditableImage
                                src={editedCard.icon}
                                alt={editedCard.title}
                                width={28}
                                height={28}
                                isEditing={isEditing}
                                onUpdate={(value) => setEditedCard({ ...editedCard, icon: value })}
                            />
                        </div>
                    </div>
                    <input
                        type="text"
                        value={editedCard.title}
                        onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
                        className="w-full text-black font-medium text-sm bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5 mb-2"
                        placeholder="Enter title..."
                    />
                    <textarea
                        value={editedCard.description}
                        onChange={(e) => setEditedCard({ ...editedCard, description: e.target.value })}
                        className="w-full text-gray-600 text-sm leading-relaxed bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5 resize-none mb-2"
                        placeholder="Enter description..."
                        rows={3}
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
                    <div className="flex-shrink-0 mb-4">
                        <div className="w-12 h-12 rounded-full border border-brand-teal flex items-center justify-center">
                            <EditableImage
                                src={card.icon}
                                alt={card.title}
                                width={28}
                                height={28}
                                isEditing={isEditing}
                                onUpdate={(value) => setEditedCard({ ...card, icon: value })}
                            />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium mb-2 text-gray-900">{card.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                </>
            )}
        </div>
    );
} 