"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { toast } from "react-hot-toast";
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
    onUpdate?: (index: number, member: TeamMember) => void;
    onDelete?: (index: number) => void;
}

export function EditableTeamMember({
    member,
    index,
    isEditing = false,
    onUpdate,
    onDelete,
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
            onUpdate(index, editedMember);
        } else {
            console.warn('onUpdate function is not provided');
        }
        setIsEditingInPlace(false);
    };

    const handleCancel = () => {
        console.log(`Canceling edit for team member ${index}`);
        setEditedMember(member);
        setIsEditingInPlace(false);
    };

    const handleFieldChange = (field: keyof TeamMember, value: string) => {
        console.log('handleFieldChange called with:', { field, value });

        // Update the local state
        setEditedMember(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageUpdate = (newImageUrl: string) => {
        console.log(`Image updating to:`, newImageUrl);
        handleFieldChange('image', newImageUrl);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the edit mode
        toast((t) => (
            <div className="flex flex-col gap-2">
                <p>Are you sure you want to delete this team member?</p>
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
            className={`group relative ${isEditing
                ? "hover:bg-brand-teal/5 rounded-lg transition-all duration-300"
                : ""
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                if (isEditing && !isEditingInPlace) {
                    setIsEditingInPlace(true);
                }
            }}
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
                        <div className="flex justify-center gap-2 mt-2">
                            <button
                                onClick={handleDelete}
                                className="p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300"
                                title="Delete team member"
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
                                onUpdate?.(index, { ...member, image: newImageUrl });
                            }}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="mt-6 text-left pl-2">
                        <h3 className="text-base font-medium mb-1">{member.name}</h3>
                        <p className="text-white/70 text-sm">{member.role}</p>
                    </div>

                    {/* Delete Button */}
                    {isEditing && (
                        <button
                            onClick={handleDelete}
                            className={`absolute bottom-4 right-4 p-2 rounded-full bg-red-500/90 text-white shadow-lg
                            transform transition-all duration-300 cursor-pointer
                            hover:bg-red-600 hover:scale-110
                            ${isHovered ? "opacity-100" : "opacity-0"}`}
                            title="Delete team member"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
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
                         ${isHovered ? "border-pink-500/50" : "border-transparent"
                                }`}
                        />
                    )}
                </>
            )}
        </div>
    );
}






