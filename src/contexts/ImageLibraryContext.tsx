"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ImageLibraryModal } from '@/components/pageEditor/ImageLibraryModal';

interface ImageLibraryContextType {
    openImageLibrary: (onSelect: (url: string) => void) => void;
}

const ImageLibraryContext = createContext<ImageLibraryContextType | undefined>(undefined);

export function ImageLibraryProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [onSelectCallback, setOnSelectCallback] = useState<((url: string) => void) | null>(null);

    const openImageLibrary = (onSelect: (url: string) => void) => {
        console.log('Opening image library modal');
        setOnSelectCallback(() => onSelect);
        setIsOpen(true);
    };

    const handleClose = () => {
        console.log('Closing image library modal');
        setIsOpen(false);
    };

    const handleSelectImage = (url: string) => {
        console.log('Selected image:', url);
        if (onSelectCallback) {
            onSelectCallback(url);
        }
        setIsOpen(false);
    };

    return (
        <ImageLibraryContext.Provider value={{ openImageLibrary }}>
            {children}
            <ImageLibraryModal
                isOpen={isOpen}
                onClose={handleClose}
                onSelect={handleSelectImage}
            />
        </ImageLibraryContext.Provider>
    );
}

export function useImageLibrary() {
    const context = useContext(ImageLibraryContext);
    if (context === undefined) {
        throw new Error('useImageLibrary must be used within an ImageLibraryProvider');
    }
    return context;
} 