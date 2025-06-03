"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Lead {
    id: string;
    name: string;
    email: string;
    created_at: string;
}

export function LeadsList() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchLeads();
        // eslint-disable-next-line
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("leads")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            setLeads(data || []);
        } catch {
            setError("Failed to fetch leads.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-xl border-2 border-[#4ECDC4]/30 bg-[#001618]/90 shadow-lg shadow-brand-teal/20 p-6 backdrop-blur-xl mt-8">
            <h2 className="text-2xl font-bold mb-4 text-white tracking-wide font-kiona drop-shadow">Leads</h2>
            {loading ? (
                <div className="text-[#4ECDC4]">Loading...</div>
            ) : error ? (
                <div className="text-pink-400 font-semibold">{error}</div>
            ) : leads.length === 0 ? (
                <div className="text-[#4ECDC4]/60">No leads yet.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-[#4ECDC4]/10">
                        <thead>
                            <tr className="bg-[#001618]/80">
                                <th className="px-4 py-2 text-left text-[#4ECDC4] font-semibold">Name</th>
                                <th className="px-4 py-2 text-left text-[#4ECDC4] font-semibold">Email</th>
                                <th className="px-4 py-2 text-left text-[#4ECDC4] font-semibold">Submitted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead.id} className="border-t border-[#4ECDC4]/10 hover:bg-[#4ECDC4]/5 transition-colors">
                                    <td className="px-4 py-2 text-white font-semibold">{lead.name}</td>
                                    <td className="px-4 py-2 text-[#4ECDC4] underline">{lead.email}</td>
                                    <td className="px-4 py-2 text-white/80">{new Date(lead.created_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
} 