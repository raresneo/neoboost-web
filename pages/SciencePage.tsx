import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MoveUpRight } from 'lucide-react';
import { BenefitArticlesSection } from '../components/sections/BenefitArticlesSection';

// --- Science Page Component ---
export const SciencePage: React.FC = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-black text-white relative z-50">
            {/* Fixed Navigation Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-[#3A86FF]/20 px-6 py-4 flex items-center justify-between shadow-[0_0_30px_rgba(0,245,255,0.1)]">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="relative overflow-hidden flex items-center gap-3 text-[#3A86FF] hover:text-black bg-transparent hover:bg-[#3A86FF] transition-all px-6 py-3 rounded-lg border border-[#3A86FF]/30 hover:border-[#3A86FF] text-xs font-black uppercase tracking-[0.2em] group shadow-[0_0_15px_rgba(58,134,255,0.1)] hover:shadow-[0_0_30px_rgba(58,134,255,0.4)]"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            <MoveUpRight size={16} className="rotate-[225deg] group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
                            ÎNAPOI LA SITE
                        </span>
                    </Link>
                </div>
                <div className="mono-font text-[#3A86FF]/60 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase hidden sm:block">
                    NEOBOOST / RESEARCH
                </div>
                <img src="/logo_white.png" alt="Logo" className="w-8 h-8 object-contain opacity-50" />
            </div>

            <div className="pt-20">
                <BenefitArticlesSection className="!bg-transparent" />
            </div>

            {/* Footer minimal for this page */}
            <div className="py-10 border-t border-white/10 text-center">
                <p className="text-white/30 text-xs">© 2024 NeoBoost Oradea. Science & Research.</p>
            </div>
        </div>
    );
};
