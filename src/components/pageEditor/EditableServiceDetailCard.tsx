"use client";

import { useState } from "react";
import { Check, X, Plus, Trash } from "lucide-react";

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

interface EditableServiceDetailCardProps {
    service: ServiceDetail;
    index: number;
    isEditing?: boolean;
    onUpdate: (index: number, updatedService: ServiceDetail) => void;
}

export function EditableServiceDetailCard({
    service,
    index,
    isEditing = false,
    onUpdate,
}: EditableServiceDetailCardProps) {
    const [isEditingInPlace, setIsEditingInPlace] = useState(false);
    const [editedService, setEditedService] = useState(service);

    const handleSave = () => {
        onUpdate(index, editedService);
        setIsEditingInPlace(false);
    };

    const handleCancel = () => {
        setEditedService(service);
        setIsEditingInPlace(false);
    };

    const handleArrayChange = (field: 'whatsIncluded' | 'benefits', idx: number, value: string) => {
        setEditedService(prev => {
            const arr = [...prev[field]];
            arr[idx] = value;
            return { ...prev, [field]: arr };
        });
    };

    const handleArrayAdd = (field: 'whatsIncluded' | 'benefits') => {
        setEditedService(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const handleArrayRemove = (field: 'whatsIncluded' | 'benefits', idx: number) => {
        setEditedService(prev => {
            const arr = [...prev[field]];
            arr.splice(idx, 1);
            return { ...prev, [field]: arr };
        });
    };

    return (
        <div
            className="bg-[#020617]/30 backdrop-blur-xl border border-teal-400/20 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_32px_0_rgba(20,184,166,0.15)] transition-all duration-500 relative group cursor-default"
            onClick={() => isEditing && !isEditingInPlace && setIsEditingInPlace(true)}
        >
            {isEditingInPlace ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editedService.title}
                        onChange={e => setEditedService({ ...editedService, title: e.target.value })}
                        className="w-full text-white font-bold text-xl bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5"
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={editedService.subtitle}
                        onChange={e => setEditedService({ ...editedService, subtitle: e.target.value })}
                        className="w-full text-white/60 text-sm bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5"
                        placeholder="Subtitle"
                    />
                    <input
                        type="text"
                        value={editedService.price}
                        onChange={e => setEditedService({ ...editedService, price: e.target.value })}
                        className="w-full text-3xl font-bold text-white bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5"
                        placeholder="Price"
                    />
                    <div>
                        <h4 className="text-white font-medium mb-2">What&apos;s included:</h4>
                        {editedService.whatsIncluded.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 mb-1">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={e => handleArrayChange('whatsIncluded', i, e.target.value)}
                                    className="w-full text-white/80 text-sm bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5"
                                    placeholder="What's included item"
                                />
                                <button onClick={() => handleArrayRemove('whatsIncluded', i)} className="p-1"><Trash className="w-4 h-4 text-red-400" /></button>
                            </div>
                        ))}
                        <button onClick={() => handleArrayAdd('whatsIncluded')} className="flex items-center gap-1 text-xs text-pink-400 mt-1"><Plus className="w-4 h-4" /> Add</button>
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-2">Benefits:</h4>
                        {editedService.benefits.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 mb-1">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={e => handleArrayChange('benefits', i, e.target.value)}
                                    className="w-full text-white/80 text-sm bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5"
                                    placeholder="Benefit item"
                                />
                                <button onClick={() => handleArrayRemove('benefits', i)} className="p-1"><Trash className="w-4 h-4 text-red-400" /></button>
                            </div>
                        ))}
                        <button onClick={() => handleArrayAdd('benefits')} className="flex items-center gap-1 text-xs text-pink-400 mt-1"><Plus className="w-4 h-4" /> Add</button>
                    </div>
                    <input
                        type="text"
                        value={editedService.ctaText}
                        onChange={e => setEditedService({ ...editedService, ctaText: e.target.value })}
                        className="w-full text-teal-400 text-center bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5"
                        placeholder="CTA Text"
                    />
                    <input
                        type="text"
                        value={editedService.ctaLink}
                        onChange={e => setEditedService({ ...editedService, ctaLink: e.target.value })}
                        className="w-full text-teal-400 text-center bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5"
                        placeholder="CTA Link"
                    />
                    <input
                        type="text"
                        value={editedService.disclaimer || ''}
                        onChange={e => setEditedService({ ...editedService, disclaimer: e.target.value })}
                        className="w-full text-xs text-gray-400 bg-transparent border-b border-pink-200 focus:border-pink-400 focus:outline-none px-1 py-0.5"
                        placeholder="Disclaimer (optional)"
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
                    <h3 className="text-white text-xl font-bold font-sans mb-2 tracking-normal">
                        {service.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-6">
                        {service.subtitle}
                    </p>
                    <div className="text-3xl font-bold text-white mb-8">
                        {service.price}
                    </div>
                    <div className="mb-8">
                        <h4 className="text-white font-medium mb-4">What&apos;s included:</h4>
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
                </>
            )}
        </div>
    );
} 