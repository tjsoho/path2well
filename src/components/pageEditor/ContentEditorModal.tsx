import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onSave: (newContent: string) => void;
  title: string;
  type: "heading" | "subtext" | "paragraph";
  helpText?: string;
}

export function ContentEditorModal({
  isOpen,
  onClose,
  content,
  onSave,
  title,
}: ContentEditorModalProps) {
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(editedContent);
    setIsSaving(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-0 top-[2%] flex justify-center z-50"
          >
            <div className="w-full max-w-2xl mx-4 bg-brand-black border border-brand-teal/30 rounded-lg shadow-lg shadow-brand-teal/20">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-brand-teal/20">
                <h3 className="text-lg font-medium text-brand-white">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="text-brand-white/70 hover:text-brand-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full min-h-[200px] p-4 rounded-lg
                           bg-white/5 text-brand-white
                           border border-brand-teal/30 focus:border-brand-teal
                           outline-none transition-all duration-300
                           font-chocolates resize-y whitespace-pre-wrap"
                  placeholder="Enter your content here..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const textarea = e.target as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const beforeText = editedContent.substring(0, start);
                      const afterText = editedContent.substring(end);
                      const newContent = beforeText + "\n" + afterText;
                      setEditedContent(newContent);
                      // Restore cursor position after the new line
                      setTimeout(() => {
                        if (textarea) {
                          textarea.focus();
                          textarea.setSelectionRange(start + 1, start + 1);
                        }
                      }, 0);
                    }
                  }}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-4 border-t border-brand-teal/20">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-brand-white/70 hover:text-brand-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg
                          bg-brand-teal text-brand-white hover:bg-brand-teal/90
                          transition-all duration-300 disabled:opacity-50"
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
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
