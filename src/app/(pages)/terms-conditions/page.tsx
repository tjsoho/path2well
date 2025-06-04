import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface TermsSection {
    title: string;
    content: string;
}

interface TermsContent {
    heroHeading?: string;
    heroSubheading?: string;
    sections: TermsSection[];
}

async function getTermsContent(): Promise<TermsContent | undefined> {
    const { data, error } = await supabase
        .from("page_content")
        .select("content")
        .eq("page_id", "terms")
        .eq("section_id", "TermsContent")
        .single();
    if (error) {
        console.error("Error fetching terms content:", error);
        return undefined;
    }
    return data?.content || undefined;
}

export default async function TermsPage() {
    const content = await getTermsContent();

    return (
        <main className="min-h-screen bg-[#001618] overflow-hidden relative">
            {/* Designer Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/services-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover opacity-30 blur-sm"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#001618]/80 via-[#001618]/90 to-[#001618]/95" />
            </div>
            {/* Terms Content */}
            <div className="relative z-10 max-w-3xl mx-auto py-24 px-4">
                <h1 className="text-4xl md:text-5xl font-kiona text-white mb-4 drop-shadow">
                    {content?.heroHeading || "Terms & Conditions"}
                </h1>
                <p className="text-lg text-white/80 font-kiona mb-10 text-center">
                    {content?.heroSubheading || "Please read these terms carefully."}
                </p>
                <div className="space-y-8">
                    {content?.sections?.map((section, idx) => (
                        <div
                            key={idx}
                            className="bg-[#001618]/80 border border-[#4ECDC4]/20 rounded-2xl p-8 shadow-lg shadow-brand-teal/10 backdrop-blur-xl"
                        >
                            <h2 className="text-2xl font-kiona text-[#4ECDC4] mb-4">
                                {section.title}
                            </h2>
                            <div className="text-white/80 font-kiona">
                                {(section.content || "").split('\n').map((para, i) =>
                                    <p key={i} className="mb-2">{para}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
