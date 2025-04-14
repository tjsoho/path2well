"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import { useImageLibrary } from '@/contexts/ImageLibraryContext';

interface EditableImageProps {
    src: string;
    alt: string;
    className?: string;
    isEditing?: boolean;
    onUpdate?: (newImageUrl: string) => void;
    fill?: boolean;
    width?: number;
    height?: number;
}

export function EditableImage({
    src,
    alt,
    className = '',
    isEditing = false,
    onUpdate,
    fill = false,
    width,
    height
}: EditableImageProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const { openImageLibrary } = useImageLibrary();

    useEffect(() => {
        console.log('EditableImage mounted/updated:', {
            src,
            isEditing,
            timestamp: new Date().toISOString()
        });
        setImageError(false);
    }, [src, isEditing]);

    const handleImageClick = (e: React.MouseEvent) => {
        console.log('Image clicked:', {
            isEditing,
            timestamp: new Date().toISOString()
        });

        if (!isEditing) {
            console.log('Click ignored - not in editing mode');
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        console.log('Opening image library...');
        openImageLibrary((url) => {
            console.log('Image selected:', {
                url,
                timestamp: new Date().toISOString()
            });
            if (onUpdate) {
                onUpdate(url);
            }
        });
    };

    const handleImageError = () => {
        console.error('Image failed to load:', {
            src,
            error: new Error().stack,
            timestamp: new Date().toISOString()
        });
        setImageError(true);
    };

    const handleMouseEnter = () => {
        if (isEditing) {
            console.log('Mouse entered - showing overlay');
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        console.log('Mouse left - hiding overlay');
        setIsHovered(false);
    };

    return (
        <div
            className="relative group cursor-pointer"
            style={{ width: fill ? '100%' : 'auto', height: fill ? '100%' : 'auto' }}
            onClick={handleImageClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image
                src={imageError ? '/images/logo.png' : src}
                alt={alt}
                className={`transition-all duration-300 object-cover rounded-lg ${className}`}
                {...(fill ? { fill: true } : { width, height })}
                onError={handleImageError}
                unoptimized
                priority
            />

            {isEditing && isHovered && (
                <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg hover:border-4 group-hover:border-pink-500"
                    style={{ zIndex: 10 }}
                >
                    <div className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Upload size={20} />
                        <span>Choose Image</span>
                    </div>
                </div>
            )}
        </div>
    );
} 