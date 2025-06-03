"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface PageEditorContextType {
    isEditing: boolean;
    onUpdate: (id: string, value: string) => void;
}

const PageEditorContext = createContext<PageEditorContextType>({
    isEditing: false,
    onUpdate: () => { },
});

export function PageEditorProvider({ children }: { children: ReactNode }) {
    const [isEditing, setIsEditing] = useState(false);

    const onUpdate = async (id: string, value: string) => {
        try {
            // Here you would typically make an API call to save the content
            console.log('Updating content:', { id, value });
            // Example API call:
            // await fetch('/api/content', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ id, value }),
            // });
        } catch (error) {
            console.error('Error updating content:', error);
        }
    };

    return (
        <PageEditorContext.Provider value={{ isEditing, onUpdate }}>
            {children}
        </PageEditorContext.Provider>
    );
}

export const usePageEditor = () => useContext(PageEditorContext); 