import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, UserCheck, Volume2, VolumeX, Sun, Moon, Link as LucideLink, Menu, X as CloseIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { BRAND } from '../../constants';

// --- Navbar Component ---
export const Navbar = ({ isMuted, setIsMuted, user, onOpenAuth, onOpenBooking, isLight, setIsLight }: { isMuted: boolean; setIsMuted: (m: boolean) => void; user: any; onOpenAuth: () => void; onOpenBooking: () => void; isLight: boolean; setIsLight: (l: boolean) => void }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const navItems = [
        { label: 'Pentru Cine', id: 'pentru-cine' },
        { label: 'Metodă', id: 'metoda' },
        { label: 'Rezultate', id: 'rezultate', isPage: true }, // Added new item
        { label: 'Programe', id: 'programe' },
        { label: 'Abonamente', id: 'abonamente' },
        { label: 'Locații', id: 'locatii' },
        { label: 'FAQ', id: 'faq' }
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-4 md:px-12 py-2 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl`}>
                <div className="max-w-[1600px] mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src="/logo_white.png" alt="NeoBoost Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform duration-500" />
                        <span className="text-xl md:text-2xl font-black impact-font tracking-tighter text-white">{BRAND.name}</span>
                    </div>

                    <div className="hidden 2xl:flex items-center gap-6">
                        {navItems.map(item => (
                            <Link
                                key={item.id}
                                to={item.isPage ? `/${item.id}` : `/#${item.id}`} // Conditional link target
                                className="mono-font text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-[#3A86FF] hover:shadow-[0_0_15px_rgba(0,255,136,0.5)] transition-all duration-300"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link
                            to="/oferta-speciala"
                            className="px-4 py-1.5 bg-[#3A86FF] text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all animate-pulse"
                        >
                            OFERTĂ 3+1
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                                <span className="text-white/40 text-xs text-right">
                                    <div className="mono-font text-[8px] uppercase tracking-widest text-[#3A86FF]">Active</div>
                                    <div className="font-bold">{user.email?.split('@')[0]}</div>
                                </span>
                                <button
                                    onClick={() => supabase.auth.signOut()}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#3A86FF]/20 flex items-center justify-center transition-colors group"
                                >
                                    <LogOut className="text-white/60 group-hover:text-[#3A86FF]" size={18} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={onOpenAuth}
                                className="ml-6 px-6 py-2 border border-[#3A86FF]/30 flex items-center gap-2 text-[#3A86FF] hover:bg-[#3A86FF] hover:text-black transition-all duration-300 rounded font-bold uppercase text-xs tracking-widest"
                            >
                                <UserCheck size={14} />
                                Contul Meu
                            </button>
                        )}

                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="group flex items-center gap-3 px-4 py-2 glass hover:glass-neon transition-all duration-500 rounded-full"
                            title={isMuted ? "Activează Sunetul" : "Dezactivează Sunetul"}
                        >
                            <div className="relative w-4 h-4 flex items-center justify-center">
                                {isMuted ? (
                                    <VolumeX size={14} className="text-white/20 group-hover:text-white/40" />
                                ) : (
                                    <>
                                        <Volume2 size={14} className="text-[#3A86FF] animate-pulse" />
                                        <span className="absolute -inset-1 border border-[#3A86FF]/20 rounded-full animate-ping"></span>
                                    </>
                                )}
                            </div>
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setIsLight(!isLight)}
                            className="group flex items-center gap-3 px-4 py-2 glass hover:glass-neon transition-all duration-500 rounded-full ml-2"
                            title="Schimbă Tema"
                        >
                            {isLight ? (
                                <Sun size={14} className="text-[#3A86FF]" />
                            ) : (
                                <Moon size={14} className="text-white/40 group-hover:text-[#3A86FF]" />
                            )}
                        </button>
                    </div>

                    {/* Mobile UI Buttons - FIXED Z-INDEX & VISIBILITY */}
                    <div className="flex 2xl:hidden items-center gap-3 relative z-[101]">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-all ${!isMuted ? 'bg-[#3A86FF]/20 border-[#3A86FF]/40 text-[#3A86FF]' : 'bg-black/40 text-white/40'}`}
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all backdrop-blur-md border border-white/10 ${isMenuOpen ? 'text-[#3A86FF] bg-black/60' : 'text-white bg-black/40'}`}
                        >
                            {isMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - MOVED OUTSIDE NAV TO ESCAPE BACKDROP-FILTER CONTEXT */}
            <div className={`fixed inset-0 bg-black z-[90] transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] flex flex-col pt-32 px-6 md:px-24 overflow-y-auto ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                {/* Dynamic Background Image with Theme Overlay */}
                <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm scale-105 grayscale contrast-[1.2]"
                        style={{ backgroundImage: 'url(/ems_training_1.jpg)' }}>
                    </div>
                    {/* Theme Layer: Cyan/Black Mix */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-[#3A86FF]/5"></div>
                </div>

                {/* Menu Header (Logo/Close) */}
                <div className="absolute top-8 left-6 right-6 flex justify-between items-center lg:hidden">
                    <div className="flex items-center gap-3">
                        <img src="/logo_white.png" alt="Logo" className="w-8 h-8" />
                        <span className="font-black impact-font text-white">{BRAND.name}</span>
                    </div>

                    {/* Close button with high z-index interaction */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                        <CloseIcon size={24} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-4 mb-16 relative z-10">
                    {navItems.map((item, idx) => (
                        <Link
                            key={item.id}
                            to={item.isPage ? `/${item.id}` : `/#${item.id}`} // Conditional link target
                            onClick={() => setIsMenuOpen(false)}
                            className="group flex flex-col py-2"
                            style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                            <span className="mono-font text-[10px] text-[#3A86FF] font-black tracking-widest uppercase mb-1">0{idx + 1}</span>
                            <span className="text-4xl md:text-5xl font-black impact-font text-white transition-all group-active:text-[#3A86FF] uppercase">
                                {item.label}
                            </span>
                        </Link>
                    ))}

                    <Link
                        to="/oferta-speciala"
                        onClick={() => setIsMenuOpen(false)}
                        className="mt-6 p-6 bg-[#3A86FF] text-black font-black impact-font text-3xl text-center uppercase shadow-[0_0_30px_rgba(58,134,255,0.4)] block rounded-xl"
                    >
                        Ofertă 3+1 Gratuit
                    </Link>

                    <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                        <button onClick={onOpenAuth} className="flex items-center gap-2 text-white/60 hover:text-white uppercase text-xs font-bold tracking-widest">
                            <UserCheck size={16} /> Contul Meu
                        </button>
                        <button onClick={() => setIsMuted(!isMuted)} className="flex items-center gap-2 text-white/60 hover:text-white uppercase text-xs font-bold tracking-widest">
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />} {isMuted ? 'Activează Sunet' : 'Oprește Sunet'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
