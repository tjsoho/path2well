import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface PolicySection {
    title: string;
    content: string;
}

interface PrivacyPolicyContent {
    heroHeading?: string;
    heroSubheading?: string;
    sections: PolicySection[];
}

async function getPrivacyContent(): Promise<PrivacyPolicyContent | undefined> {
    const { data, error } = await supabase
        .from("page_content")
        .select("content")
        .eq("page_id", "privacy-policy")
        .eq("section_id", "PrivacyContent")
        .single();
    if (error) {
        console.error("Error fetching privacy content:", error);
        return undefined;
    }
    return data?.content || undefined;
}

export default async function PrivacyPolicyPage() {
    const content = await getPrivacyContent();

    return (
        <main className="min-h-screen bg-[#001618] overflow-hidden relative">
            {/* Designer Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/tech1.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-30 blur-sm"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#001618]/30 via-[#001618]/50 to-[#001618]/45" />
            </div>

            {/* Privacy Policy Content */}
            <div className="relative z-10 max-w-3xl mx-auto py-24 px-4">
                <h1 className="text-4xl md:text-5xl font-kiona text-white mb-4 drop-shadow">
                    {content?.heroHeading || "Privacy Policy"}
                </h1>
                <p className="text-lg text-white/80 font-kiona mb-10">
                    {content?.heroSubheading || "Your privacy is our priority."}
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
                            <div className="text-white/80 font-kiona whitespace-pre-line">
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
} 