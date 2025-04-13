"use client";

import { useState, useEffect } from "react";
import { Edit2, Check, X } from "lucide-react";
import { motion } from "framer-motion";

export interface Benefit {
    title: string;
    description: string;
}

interface EditableBenefitCardProps {
    benefit: Benefit;
    index: number;
    isEditing?: boolean;
    onUpdate: (index: number, updatedBenefit: Benefit) => void;
    totalBenefits: number;
}

export function EditableBenefitCard({
    benefit,
    index,
    isEditing = false,
    onUpdate,
    totalBenefits
}: EditableBenefitCardProps) {
    const [isEditingInPlace, setIsEditingInPlace] = useState(false);
    const [editedBenefit, setEditedBenefit] = useState(benefit);
    const [isHovered, setIsHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSave = () => {
        onUpdate(index, editedBenefit);
        setIsEditingInPlace(false);
    };

    const handleCancel = () => {
        setEditedBenefit(benefit);
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

    const cardContent = (
        <>
            {/* Editing Overlay */}
            {isEditing && !isEditingInPlace && (
                <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/5 transition-colors">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500/90 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Click to edit
                    </div>
                </div>
            )}

            {/* Connector Lines */}
            {index < totalBenefits - 1 && (
                <>
                    {index % 2 !== 1 && (
                        <div className="hidden lg:block absolute right-[-1rem] top-1/2 w-8 h-[1px] bg-gradient-to-r from-brand-teal/50 to-transparent" />
                    )}
                    {index < totalBenefits - 2 && (
                        <div className="hidden lg:block absolute bottom-[-1rem] left-1/2 w-[1px] h-8 bg-gradient-to-b from-brand-teal/50 to-transparent" />
                    )}
                </>
            )}

            {/* Dot */}
            <div className={`w-3 h-3 rounded-full border ${isEditing ? 'border-pink-300' : 'border-brand-teal'} flex items-center justify-center mb-3`}>
                <div className={`w-1 h-1 rounded-full ${isEditing ? 'bg-pink-300' : 'bg-brand-teal'}`} />
            </div>

            {/* Content */}
            {isEditingInPlace ? (
                <div className="space-y-2">
                    <input
                        type="text"
                        value={editedBenefit.title}
                        onChange={(e) => setEditedBenefit({ ...editedBenefit, title: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className="w-full text-black font-medium text-xs md:text-sm bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5"
                        placeholder="Enter title..."
                    />
                    <textarea
                        value={editedBenefit.description}
                        onChange={(e) => setEditedBenefit({ ...editedBenefit, description: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className="w-full text-gray-600 text-xs leading-relaxed bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5 resize-none"
                        placeholder="Enter description..."
                        rows={3}
                    />
                    <div className="flex justify-end gap-1">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleSave(); }}
                            className="p-1 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
                        >
                            <Check className="w-3 h-3 text-pink-500" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleCancel(); }}
                            className="p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
                        >
                            <X className="w-3 h-3 text-red-500" />
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="text-black font-medium mb-1 text-xs md:text-sm">{benefit.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{benefit.description}</p>
                </>
            )}
        </>
    );

    // Return static version during SSR
    if (!isMounted) {
        return (
            <div className={`relative bg-white rounded-lg p-4 border ${isEditing ? 'border-pink-300 shadow-[0_0_0_2px_rgba(244,114,182,0.1)]' : 'border-brand-teal/30'
                } shadow-[0_0_10px_rgba(11,165,165,0.1)] group cursor-default`}>
                {cardContent}
            </div>
        );
    }

    // Return animated version after hydration
    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-white rounded-lg p-4 border ${isEditing ? 'border-pink-300 shadow-[0_0_0_2px_rgba(244,114,182,0.1)]' : 'border-brand-teal/30'
                } shadow-[0_0_10px_rgba(11,165,165,0.1)] hover:shadow-[0_0_15px_rgba(11,165,165,0.2)] transition-shadow group cursor-default`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => isEditing && !isEditingInPlace && setIsEditingInPlace(true)}
        >
            {cardContent}
        </motion.div>
    );
} 