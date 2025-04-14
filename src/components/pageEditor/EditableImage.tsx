import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import { ImageLibraryModal } from './ImageLibraryModal';

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
    const [showLibrary, setShowLibrary] = useState(false);

    useEffect(() => {
        console.log('EditableImage src changed:', {
            src,
            timestamp: new Date().toISOString()
        });
        setImageError(false);
    }, [src]);

    const handleImageClick = (e: React.MouseEvent) => {
        if (!isEditing) return;
        e.preventDefault();
        e.stopPropagation();
        setShowLibrary(true);
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
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
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
                    className={`transition-all duration-300 object-cover rounded-lg  ${className}`}
                    {...(fill ? { fill: true } : { width, height })}
                    onError={handleImageError}
                    unoptimized
                    priority
                />

                {isEditing && isHovered && (
                    <div
                        className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg hover:border-4 group-hover:border-pink-500 "
                        style={{ zIndex: 10 }}
                    >
                        <div className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            <Upload size={20} />
                            <span>Choose Image</span>
                        </div>
                    </div>
                )}
            </div>

            <ImageLibraryModal
                isOpen={showLibrary}
                onClose={() => setShowLibrary(false)}
                onSelectImage={(url) => {
                    onUpdate?.(url);
                    setShowLibrary(false);
                }}
            />
        </>
    );
} 