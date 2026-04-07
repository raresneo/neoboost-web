import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, UserCheck, Volume2, VolumeX, Sun, Moon, Menu, X as CloseIcon, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Button } from './Button';

// Lightning spark that bursts on click
const NavSpark: React.FC<{ x: number; y: number; onDone: () => void }> = ({ x, y, onDone }) => {
    useEffect(() => { const t = setTimeout(onDone, 600); return () => clearTimeout(t); }, [onDone]);
    return (
        <div className="fixed pointer-events-none z-[200]" style={{ left: x - 20, top: y - 20 }}>
            {Array.from({ length: 5 }).map((_, i) => {
                const angle = (i * 72) * (Math.PI / 180);
                return (
                    <motion.div key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ left: 20, top: 20, background: i % 2 ? '#3B82F6' : '#FBBF24', boxShadow: i % 2 ? '0 0 4px #3B82F6' : '0 0 4px #FBBF24' }}
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{ x: Math.cos(angle) * 16, y: Math.sin(angle) * 16, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                );
            })}
        </div>
    );
};

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
        { label: 'Servicii', path: '/servicii-ems' },   // 1. Discovery & Method
        { label: 'Prețuri', path: '/preturi' }, // 2. Pricing
        { label: 'Oferte', path: '/oferta-3-plus-1' }, // 2.5. Special Offer
        { label: 'Programe', path: '/programe' }, // 3. What we offer
        { label: 'Rezultate', id: 'rezultate' }, // 4. Proof
        { label: 'Echipă', path: '/echipa' },    // 5. Trust
        { label: 'Locații', id: 'locatii' },     // 6. Action
        { label: 'FAQ', id: 'faq' },             // 7. Objections
        { label: 'Blog', path: '/blog' }          // 8. Research & Articles
    ];

    return (
        <>
            {/* TOP GRADIENT MASK - Fades content as it scrolls under the navbar area */}
            <div className={`fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-white via-white/95 to-transparent pointer-events-none z-[99] transition-all duration-700 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}></div>

            {/* FLOATING GLASS NAVBAR CONTAINER - Centered & Detached */}
            <div className={`fixed top-0 left-0 w-full z-[100] flex justify-center transition-all duration-700 ease-out pointer-events-none 
                ${isScrolled ? 'py-4 md:py-6' : 'py-6 md:py-10'}`}>

                <nav className={`
                    pointer-events-auto flex items-center justify-between
                    transition-all duration-700 ease-out
                    ${isScrolled
                        ? 'w-[90%] md:w-[75%] max-w-5xl h-[60px] md:h-16 rounded-full bg-white/70 backdrop-blur-2xl shadow-premium border border-white/60'
                        : 'w-[92%] md:w-[85%] max-w-6xl h-20 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-sm'
                    }
                    px-5 md:px-8
                `}>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className={`relative transition-all duration-500 ${isScrolled ? 'w-8 h-8 md:w-9 md:h-9' : 'w-10 h-10 md:w-11 md:h-11'}`}>
                            {/* Logo Glow */}
                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <img src="/logo_white.webp" alt="NeoBoost Logo" className="w-full h-full object-contain relative z-10 invert drop-shadow-sm transition-transform duration-500 group-hover:rotate-6 scale-95" />
                        </div>
                        <span className={`font-display font-black tracking-widest text-gray-900 transition-all duration-500 origin-left ${isScrolled ? 'text-sm md:text-lg scale-95' : 'text-base md:text-xl scale-100'}`}>
                            NEO<span className="text-blue-600">BOOST</span>
                        </span>
                    </Link>

                    {/* Desktop Center Nav — Elegant layout */}
                    <div className={`hidden lg:flex items-center justify-center transition-all duration-500 ${isScrolled ? 'gap-1' : 'gap-2'}`}>
                        {navItems.map(item => (
                            item.id ? (
                                // In-page scroll
                                <button
                                    key={item.label}
                                    onClick={() => {
                                        const el = document.getElementById(item.id!);
                                        if (el) {
                                            el.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            window.location.href = `/#${item.id}`;
                                        }
                                    }}
                                    className={`group relative px-4 py-2 font-bold uppercase tracking-wider text-[11px] md:text-xs transition-all duration-300 rounded-full hover:bg-black/5 ${isScrolled ? 'text-gray-600' : 'text-gray-700'}`}
                                >
                                    <span className="relative z-10">{item.label}</span>
                                </button>
                            ) : (
                                // Regular route
                                <Link
                                    key={item.label}
                                    to={item.path!}
                                    className={`group relative px-4 py-2 font-bold uppercase tracking-wider text-[11px] md:text-xs transition-all duration-300 rounded-full hover:bg-black/5 ${isScrolled ? 'text-gray-600' : 'text-gray-700'} ${item.path === window.location.pathname ? 'text-brand bg-brand/5' : ''}`}
                                >
                                    <span className="relative z-10">{item.label}</span>
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Desktop Right Actions */}
                    <div className="hidden xl:flex items-center gap-3">
                        {/* Mute Toggle */}
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-200"
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>

                        {/* Auth / Account */}
                        {user ? (
                            <div className="flex items-center gap-2 p-1 pr-2 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <Link to="/profile" className="flex items-center gap-2 group">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px]">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-black text-gray-900 group-hover:bg-gray-50 transition-colors">
                                            RP
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors pr-1">Rareș</span>
                                </Link>
                                <div className="w-px h-4 bg-gray-200"></div>
                                <button
                                    onClick={() => supabase.auth.signOut()}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                    title="Deconectare"
                                >
                                    <LogOut size={14} />
                                </button>
                            </div>
                        ) : (
                            <Button variant="ghost" size="sm" onClick={onOpenAuth} className="rounded-full !px-5 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                                <UserCheck size={16} className="mr-2" /> Cont
                            </Button>
                        )}

                        <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a
                                href="tel:+40769124019"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all"
                                title="Sună-ne Acum"
                            >
                                <Phone size={20} className="fill-current" />
                            </a>
                        </motion.div>

                        <motion.div className="relative" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            {/* CTA glow ring */}
                            <motion.div
                                className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-0 blur-sm"
                                whileHover={{ opacity: 0.4 }}
                                transition={{ duration: 0.3 }}
                            />
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={onOpenBooking}
                                className={`relative rounded-full shadow-lg shadow-blue-500/20 transition-all ${isScrolled ? '!px-6 !py-2.5' : '!px-8 !py-3'}`}
                            >
                                <span className="mr-1.5">⚡</span> Programează-te
                            </Button>
                        </motion.div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex xl:hidden items-center gap-2 md:gap-3">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all duration-300 ${!isMuted ? 'text-blue-500 bg-blue-50 animate-pulse-slow' : 'text-gray-600 bg-white/50 hover:bg-gray-100'}`}
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white text-gray-900 shadow-md border border-gray-100 active:scale-95 transition-all"
                        >
                            {isMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay - Refined Glass Style */}
            <div className={`fixed inset-0 z-[90] bg-white/60 backdrop-blur-2xl transition-all duration-300 ease-in-out flex flex-col pt-32 px-6 pb-12
                ${isMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`}>

                {/* Decorative background orbs in menu */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="flex flex-col gap-2 relative z-10 w-full max-w-lg mx-auto">
                    {navItems.map((item, idx) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: idx * 0.06, duration: 0.3 }}
                        >
                            {item.id ? (
                                // In-page scroll — button to prevent routing
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setTimeout(() => {
                                            const el = document.getElementById(item.id!);
                                            if (el) {
                                                el.scrollIntoView({ behavior: 'smooth' });
                                            } else {
                                                window.location.href = `/#${item.id}`;
                                            }
                                        }, 300);
                                    }}
                                    className="w-full group flex items-center justify-between p-4 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 border border-transparent hover:border-blue-100 transition-all duration-300"
                                >
                                    <span className="flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 font-mono text-xs flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            ⚡
                                        </span>
                                        <span className="text-xl font-bold text-gray-800 group-hover:text-gray-900 group-hover:translate-x-1 transition-all">{item.label}</span>
                                    </span>
                                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 group-hover:text-yellow-500 group-hover:bg-yellow-50 transition-all opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0">
                                        ⚡
                                    </span>
                                </button>
                            ) : (
                                <Link
                                    to={item.path!}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 border border-transparent hover:border-blue-100 transition-all duration-300"
                                >
                                    <span className="flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 font-mono text-xs flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            ⚡
                                        </span>
                                        <span className="text-xl font-bold text-gray-800 group-hover:text-gray-900 group-hover:translate-x-1 transition-all">{item.label}</span>
                                    </span>
                                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 group-hover:text-yellow-500 group-hover:bg-yellow-50 transition-all opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0">
                                        ⚡
                                    </span>
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="mt-auto w-full max-w-lg mx-auto flex flex-col gap-4 relative z-10">
                    <Button variant="primary" size="lg" className="w-full !rounded-2xl !py-5 text-lg shadow-xl shadow-blue-600/20" onClick={() => { setIsMenuOpen(false); onOpenBooking(); }}>
                        Rezervă Acum
                    </Button>
                    <div className="flex gap-4">
                        <Button variant="outline" className="w-full !rounded-2xl border-gray-200 bg-white/50" onClick={onOpenAuth}>
                            <UserCheck size={18} className="mr-2" /> Cont
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
