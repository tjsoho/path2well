import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { X, Upload, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectImage: (url: string) => void;
}

export function ImageLibraryModal({ isOpen, onClose, onSelectImage }: ImageLibraryModalProps) {
    const [images, setImages] = useState<Array<{ name: string; url: string }>>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deletingImage, setDeletingImage] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            loadImages();
        }
    }, [isOpen]);

    const loadImages = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.storage
                .from('section-images')
                .list();

            if (error) throw error;

            const imageList = await Promise.all(
                (data || []).map(async (file) => {
                    const { data: { publicUrl } } = supabase.storage
                        .from('section-images')
                        .getPublicUrl(file.name);
                    return {
                        name: file.name,
                        url: publicUrl
                    };
                })
            );

            setImages(imageList);
        } catch (error) {
            console.error('Error loading images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('section-images')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (uploadError) throw uploadError;

            // Reload images after upload
            await loadImages();
        } catch (error) {
            console.error('Error uploading:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async (imageName: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent image selection when clicking delete
        try {
            setDeletingImage(imageName);
            const { error } = await supabase.storage
                .from('section-images')
                .remove([imageName]);

            if (error) throw error;

            // Remove image from state
            setImages(images.filter(img => img.name !== imageName));
        } catch (error) {
            console.error('Error deleting image:', error);
        } finally {
            setDeletingImage(null);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#001618] rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Image Library</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Upload Button */}
                <div className="mb-6">
                    <label className="inline-flex items-center px-4 py-2 bg-brand-teal text-white rounded-lg cursor-pointer hover:bg-brand-teal/80 transition-colors">
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? 'Uploading...' : 'Upload New Image'}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>

                {/* Image Grid */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image) => (
                                <motion.div
                                    key={image.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="relative aspect-square group cursor-pointer"
                                    onClick={() => {
                                        onSelectImage(image.url);
                                        onClose();
                                    }}
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.name}
                                        fill
                                        className="object-cover rounded-lg transition-all duration-300 group-hover:border-2 group-hover:border-pink-500"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                        <span className="text-white text-sm">Select Image</span>
                                    </div>
                                    <button
                                        onClick={(e) => handleDeleteImage(image.name, e)}
                                        className="absolute top-2 right-2 p-1.5 bg-pink-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-600"
                                        disabled={deletingImage === image.name}
                                    >
                                        {deletingImage === image.name ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
} 