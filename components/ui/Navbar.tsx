import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, UserCheck, Volume2, VolumeX, Sun, Moon, Link as LucideLink, Menu, X as CloseIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { BRAND } from '../../constants';
// New Components
import { Button } from './Button';

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
        { label: 'Echipă', path: '/echipa' }, // Updated label from "Despre Noi" to "Echipă" to match spec generally or keep as is
        { label: 'Beneficii', id: 'beneficii' },
        { label: 'Metodă', id: 'metoda' },
        { label: 'Rezultate', id: 'rezultate' },
        { label: 'Programe', id: 'programe' },
        { label: 'Locații', id: 'locatii' },
        { label: 'FAQ', id: 'faq' }
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 h-[72px] flex items-center 
                ${isScrolled ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]' : 'bg-transparent border-b border-transparent'}`}>

                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src={isLight ? "/logo_dark.png" : "/logo_white.png"} alt="NeoBoost Logo" className="h-10 w-auto object-contain" />
                        {/* Removed the text logo next to image if image contains text, otherwise keep it but styling updated */}
                        <span className="text-xl font-bold font-display tracking-tight text-[var(--text-primary)] hidden md:block">{BRAND.name}</span>
                    </Link>

                    {/* Desktop Center Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map(item => (
                            <Link
                                key={item.label}
                                to={item.path || `/#${item.id}`}
                                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Right Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button onClick={() => setIsLight(!isLight)} className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                            {isLight ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        {/* Mute Toggle */}
                        <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>

                        {/* Auth / Account */}
                        {user ? (
                            <button onClick={() => supabase.auth.signOut()} className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]" title="Sign Out">
                                <LogOut size={20} />
                            </button>
                        ) : (
                            <Button variant="ghost" size="sm" onClick={onOpenAuth} leftIcon={<UserCheck size={16} />}>
                                Cont
                            </Button>
                        )}

                        <Button variant="primary" size="sm" onClick={onOpenBooking}>
                            Programează-te
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex lg:hidden items-center gap-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-full transition-colors"
                        >
                            {isMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[90] bg-[var(--bg-primary)]/95 backdrop-blur-xl transition-all duration-300 ease-in-out flex flex-col pt-28 px-8
                ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

                <div className="flex flex-col gap-8 text-3xl font-display font-bold uppercase tracking-tight">
                    {navItems.map((item, idx) => (
                        <Link
                            key={item.label}
                            to={item.path || `/#${item.id}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-between group border-b border-[var(--border-subtle)] pb-4"
                        >
                            <span className="flex items-center gap-6 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-xs font-mono text-[var(--text-muted)] mt-2">0{idx + 1}</span>
                                <span className="text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">{item.label}</span>
                            </span>
                            <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-[var(--accent-primary)] text-xl">→</span>
                        </Link>
                    ))}
                </div>

                <div className="mt-auto mb-12 flex flex-col gap-6">
                    <Button variant="primary" size="lg" className="w-full text-lg py-6" onClick={() => { setIsMenuOpen(false); onOpenBooking(); }}>
                        Programează-te Acum
                    </Button>

                    <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)]">
                        <Button variant="ghost" size="sm" onClick={onOpenAuth} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                            <UserCheck size={18} className="mr-2" /> Contul Meu
                        </Button>
                        <div className="flex gap-2">
                            <button onClick={() => setIsLight(!isLight)} className="p-3 bg-[var(--bg-secondary)] rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all">
                                {isLight ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                            <button onClick={() => setIsMuted(!isMuted)} className="p-3 bg-[var(--bg-secondary)] rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all">
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
