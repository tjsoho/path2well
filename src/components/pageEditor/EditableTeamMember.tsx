"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { EditableImage } from "./EditableImage";

export interface TeamMember {
    image: string;
    name: string;
    role: string;
}

export interface EditableTeamMemberProps {
    member: TeamMember;
    index: number;
    isEditing?: boolean;
    onUpdate?: (index: number, field: keyof TeamMember, value: string) => void;
}

export function EditableTeamMember({
    member,
    index,
    isEditing = false,
    onUpdate,
}: EditableTeamMemberProps) {
    console.log(`EditableTeamMember rendering for index ${index}:`, { member, isEditing });

    const [isEditingInPlace, setIsEditingInPlace] = useState(false);
    const [editedMember, setEditedMember] = useState<TeamMember>(member);
    const [isHovered, setIsHovered] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Update editedMember when member prop changes
    useEffect(() => {
        console.log(`Member prop changed for index ${index}:`, member);
        setEditedMember(member);
    }, [member, index]);

    // Focus textarea when editing starts
    useEffect(() => {
        if (isEditingInPlace && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditingInPlace]);

    const handleClick = () => {
        if (isEditing && !isEditingInPlace) {
            console.log(`Starting edit for team member ${index}`);
            setIsEditingInPlace(true);
        }
    };

    const handleSave = () => {
        console.log('handleSave called with edited member:', editedMember);

        if (onUpdate) {
            // Update each field individually to ensure all changes are captured
            if (editedMember.name !== member.name) {
                onUpdate(index, 'name', editedMember.name);
            }
            if (editedMember.role !== member.role) {
                onUpdate(index, 'role', editedMember.role);
            }
            if (editedMember.image !== member.image) {
                onUpdate(index, 'image', editedMember.image);
            }
            setIsEditingInPlace(false);
        } else {
            console.warn('onUpdate function is not provided');
        }
    };

    const handleCancel = () => {
        console.log(`Canceling edit for team member ${index}`);
        setEditedMember(member);
        setIsEditingInPlace(false);
    };

  

    const handleFieldChange = (field: keyof TeamMember, value: string) => {
        console.log('handleFieldChange called with:', { field, value });

        // Update the local state
        setEditedMember(prev => {
            const updated = { ...prev, [field]: value };
            console.log('Updated edited member:', updated);
            return updated;
        });
    };

    const handleImageUpdate = (newImageUrl: string) => {
        console.log(`Image updating to:`, newImageUrl);
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
                <div className="relative bg-white/10 rounded-3xl overflow-hidden">
                    <div className="relative aspect-square">
                        <EditableImage
                            src={editedMember.image}
                            alt={editedMember.name}
                            fill
                            className="object-cover"
                            isEditing={isEditing}
                            onUpdate={handleImageUpdate}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-white text-sm mb-1">Name</label>
                            <input
                                type="text"
                                value={editedMember.name}
                                onChange={(e) => handleFieldChange('name', e.target.value)}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm mb-1">Role</label>
                            <input
                                type="text"
                                value={editedMember.role}
                                onChange={(e) => handleFieldChange('role', e.target.value)}
                                className="w-full bg-black/50 text-white p-2 rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                        className="rounded-3xl overflow-hidden aspect-square relative bg-white/10 cursor-pointer"
                        onClick={handleClick}
                    >
                        <EditableImage
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover"
                            isEditing={isEditing}
                            onUpdate={(newImageUrl) => {
                                console.log(`Direct image update for team member ${index}:`, newImageUrl);
                                onUpdate?.(index, 'image', newImageUrl);
                            }}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="mt-6 text-left pl-2">
                        <h3 className="text-base font-medium mb-1">{member.name}</h3>
                        <p className="text-white/70 text-sm">{member.role}</p>
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






