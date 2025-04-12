interface SaveButtonProps {
    isDirty: boolean;
    isSaving: boolean;
    onSave: () => void;
}

export function SaveButton({ isDirty, isSaving, onSave }: SaveButtonProps) {
    return (
        <button
            onClick={onSave}
            disabled={!isDirty || isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg
                transition-all duration-300
                ${!isDirty
                    ? "bg-brand-black/40 text-brand-white/50 border-transparent cursor-not-allowed"
                    : "bg-brand-teal text-brand-white hover:bg-brand-teal/90 border-brand-teal"
                }`}
        >
            {isSaving ? (
                <>
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>Saving...</span>
                </>
            ) : (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                    >
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>Save All Changes</span>
                </>
            )}
        </button>
    );
} 