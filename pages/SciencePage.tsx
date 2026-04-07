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
        <div className="min-h-screen bg-white text-gray-900 relative z-50">
            {/* Fixed Navigation Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="relative overflow-hidden flex items-center gap-3 text-blue-600 hover:text-black bg-blue-50 hover:bg-blue-100 transition-all px-6 py-3 rounded-lg border border-blue-100 font-bold text-xs uppercase tracking-[0.2em] group"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            <MoveUpRight size={16} className="rotate-[225deg] group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
                            ÎNAPOI LA SITE
                        </span>
                    </Link>
                </div>
                <div className="mono-font text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase hidden sm:block">
                    NEOBOOST / RESEARCH
                </div>
                <img src="/logo_white.webp" alt="Logo" className="w-8 h-8 object-contain opacity-100 invert" />
            </div>

            <div className="pt-20">
                <BenefitArticlesSection className="!bg-transparent" />
            </div>

            {/* Footer minimal for this page */}
            <div className="py-10 border-t border-gray-100 text-center">
                <p className="text-gray-400 text-xs">© 2024 NeoBoost Oradea. Science & Research.</p>
            </div>
        </div>
    );
};
