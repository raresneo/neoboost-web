import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="py-12 bg-black border-t border-white/5 relative z-10">
            <div className="container mx-auto px-6 md:px-24">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[10px] mono-font uppercase tracking-widest text-white/40">
                        <Link to="/legal/privacy" className="hover:text-[#3A86FF] transition-colors">Politică de Confidențialitate</Link>
                        <Link to="/legal/terms" className="hover:text-[#3A86FF] transition-colors">Termeni și condiții</Link>
                        <Link to="/legal/rules" className="hover:text-[#3A86FF] transition-colors">Regulament Intern</Link>
                    </div>
                    <p className="mono-font text-[9px] text-white/20 uppercase tracking-[0.4em]">
                        © 2025 NeoBoost — Performanță Bio-Electrică Oradea <span className="text-white/10 ml-2">v1.1</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
