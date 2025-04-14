"use client";

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { X, Loader2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
}

export function ImageLibraryModal({ isOpen, onClose, onSelect }: ImageLibraryModalProps) {
    const [images, setImages] = useState<{ name: string; url: string; }[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            loadImages();
        }
    }, [isOpen]);

    const loadImages = async () => {
        try {
            const { data, error } = await supabase.storage
                .from('section-images')
                .list();

            if (error) throw error;

            const imageUrls = await Promise.all(
                data.map(async (file) => {
                    const { data: { publicUrl } } = supabase.storage
                        .from('section-images')
                        .getPublicUrl(file.name);

                    return {
                        name: file.name,
                        url: publicUrl
                    };
                })
            );

            setImages(imageUrls);
        } catch (error) {
            console.error('Error loading images:', error);
            toast.error('Failed to load images', {
                style: {
                    background: 'white',
                    color: '#333',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
                iconTheme: {
                    primary: '#ef4444',
                    secondary: 'white',
                },
            });
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const uploadPromises = Array.from(files).map(async (file) => {
            try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('section-images')
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: true
                    });

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('section-images')
                    .getPublicUrl(fileName);

                setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
                return { name: fileName, url: publicUrl };
            } catch (error) {
                console.error(`Error uploading ${file.name}:`, error);
                toast.error(`Failed to upload ${file.name}`, {
                    style: {
                        background: 'white',
                        color: '#333',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: 'white',
                    },
                });
                return null;
            }
        });

        try {
            const uploadedImages = await Promise.all(uploadPromises);
            const validImages = uploadedImages.filter((img): img is { name: string; url: string; } => img !== null);

            if (validImages.length > 0) {
                setImages(prev => [...validImages, ...prev]);
                toast.success(`Successfully uploaded ${validImages.length} image${validImages.length > 1 ? 's' : ''}`, {
                    style: {
                        background: 'white',
                        color: '#333',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                    iconTheme: {
                        primary: '#4CAF50',
                        secondary: 'white',
                    },
                });
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        } finally {
            setIsUploading(false);
            setUploadProgress({});
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDelete = async (imageName: string) => {
        try {
            const { error } = await supabase.storage
                .from('section-images')
                .remove([imageName]);

            if (error) throw error;

            setImages(prev => prev.filter(img => img.name !== imageName));
            toast.success('Image deleted successfully', {
                style: {
                    background: 'white',
                    color: '#333',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
                iconTheme: {
                    primary: '#4CAF50',
                    secondary: 'white',
                },
            });
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Failed to delete image', {
                style: {
                    background: 'white',
                    color: '#333',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
                iconTheme: {
                    primary: '#ef4444',
                    secondary: 'white',
                },
            });
        }
    };

    // If the modal is not open, don't render anything
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-900">Image Library</h2>
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept="image/*"
                                multiple
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4" />
                                        <span>Upload Images</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                    </div>
                    {Object.keys(uploadProgress).length > 0 && (
                        <div className="mt-4 space-y-2">
                            {Object.entries(uploadProgress).map(([fileName, progress]) => (
                                <div key={fileName} className="space-y-1">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span className="truncate">{fileName}</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                            <div
                                key={image.name}
                                className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                            >
                                <Image
                                    src={image.url}
                                    alt={image.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                    <div className="text-white text-sm font-medium mb-2 px-2 text-center">
                                        {image.name}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onSelect(image.url)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Select
                                        </button>
                                        <button
                                            onClick={() => handleDelete(image.name)}
                                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 