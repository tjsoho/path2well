"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Trash2, Download } from "lucide-react";
import { toast } from "react-hot-toast";

interface PDFFile {
    id: string;
    name: string;
    url: string;
    created_at: string;
}

export function PDFManager() {
    const [pdfs, setPdfs] = useState<PDFFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

    useEffect(() => {
        fetchPDFs();
    }, []);

    const fetchPDFs = async () => {
        try {
            const { data, error } = await supabase
                .from('pdf_downloads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPdfs(data || []);
        } catch (error) {
            console.error('Error fetching PDFs:', error);
            toast.error('Failed to load PDFs');
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error('Please upload a PDF file');
            return;
        }

        setIsUploading(true);
        try {
            // Upload file to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('pdfs')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('pdfs')
                .getPublicUrl(fileName);

            // Save to database
            const { error: dbError } = await supabase
                .from('pdf_downloads')
                .insert([
                    {
                        name: file.name,
                        url: publicUrl,
                    }
                ]);

            if (dbError) throw dbError;

            toast.success('PDF uploaded successfully');
            fetchPDFs();
        } catch (error) {
            console.error('Error uploading PDF:', error);
            toast.error('Failed to upload PDF');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string, url: string) => {
        try {
            // Delete from storage
            const fileName = url.split('/').pop();
            if (fileName) {
                const { error: storageError } = await supabase.storage
                    .from('pdfs')
                    .remove([fileName]);

                if (storageError) throw storageError;
            }

            // Delete from database
            const { error: dbError } = await supabase
                .from('pdf_downloads')
                .delete()
                .eq('id', id);

            if (dbError) throw dbError;

            toast.success('PDF deleted successfully');
            fetchPDFs();
        } catch (error) {
            console.error('Error deleting PDF:', error);
            toast.error('Failed to delete PDF');
        }
    };

    const handleSetActive = async (id: string) => {
        try {
            // First, unset all PDFs as active
            await supabase
                .from('pdf_downloads')
                .update({ is_active: false })
                .eq('is_active', true);

            // Then set the selected PDF as active
            const { error } = await supabase
                .from('pdf_downloads')
                .update({ is_active: true })
                .eq('id', id);

            if (error) throw error;

            setSelectedPDF(id);
            toast.success('Active PDF updated');
        } catch (error) {
            console.error('Error updating active PDF:', error);
            toast.error('Failed to update active PDF');
        }
    };

    return (
        <div className="rounded-xl border-2 border-[#4ECDC4]/30 bg-[#001618]/90 shadow-lg shadow-brand-teal/20 p-6 backdrop-blur-xl mb-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white tracking-wide font-kiona drop-shadow">PDF Downloads</h2>
                <div className="relative">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="pdf-upload"
                        disabled={isUploading}
                    />
                    <label
                        htmlFor="pdf-upload"
                        className="flex items-center gap-2 px-4 py-2 bg-[#4ECDC4] text-[#001618] font-bold rounded-lg hover:bg-[#4ECDC4]/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#4ECDC4]/20"
                    >
                        {isUploading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-[#001618] border-t-transparent rounded-full animate-spin" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                <span>Upload PDF</span>
                            </>
                        )}
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                {pdfs.map((pdf) => (
                    <div
                        key={pdf.id}
                        className="flex items-center justify-between p-4 bg-[#001618]/80 border border-[#4ECDC4]/10 rounded-lg shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <Download className="w-5 h-5 text-[#4ECDC4]" />
                            <span className="text-white font-semibold">{pdf.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleSetActive(pdf.id)}
                                className={`px-3 py-1 rounded-md text-sm font-bold border transition-colors ${selectedPDF === pdf.id
                                    ? 'bg-[#4ECDC4] text-[#001618] border-[#4ECDC4]'
                                    : 'bg-[#001618] text-[#4ECDC4] border-[#4ECDC4]/40 hover:bg-[#4ECDC4]/10'}
                                `}
                            >
                                {selectedPDF === pdf.id ? 'Active' : 'Set Active'}
                            </button>
                            <button
                                onClick={() => handleDelete(pdf.id, pdf.url)}
                                className="p-2 text-pink-400 hover:bg-pink-400/10 rounded-md transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
                {pdfs.length === 0 && (
                    <p className="text-[#4ECDC4]/60 text-center py-8">
                        No PDFs uploaded yet. Upload your first PDF using the button above.
                    </p>
                )}
            </div>
        </div>
    );
} 