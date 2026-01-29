import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '../constants';

export const Footer = () => {
    return (
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] pt-16 pb-6 text-sm">
            <div className="container mx-auto px-6">
                {/* 4 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-3">
                            <img src="/logo_white.png" alt="NeoBoost Logo" className="h-8 w-auto object-contain" />
                            <span className="text-xl font-bold font-display text-white">{BRAND.name}</span>
                        </Link>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            Cea mai avansată tehnologie EMS din Oradea.
                            <br />
                            Transformare vizibilă în doar 30 de minute pe săptămână.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://facebook.com/neoboost.ems" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://instagram.com/neoboost.ems" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Navigare */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wide">Navigare</h4>
                        <ul className="flex flex-col gap-3 text-[var(--text-secondary)]">
                            <li><Link to="/echipa" className="hover:text-[var(--accent-primary)] transition-colors">Despre Noi</Link></li>
                            <li><Link to="/#beneficii" className="hover:text-[var(--accent-primary)] transition-colors">Beneficii</Link></li>
                            <li><Link to="/#metoda" className="hover:text-[var(--accent-primary)] transition-colors">Cum Funcționează</Link></li>
                            <li><Link to="/#rezultate" className="hover:text-[var(--accent-primary)] transition-colors">Rezultate</Link></li>
                            <li><Link to="/#faq" className="hover:text-[var(--accent-primary)] transition-colors">Întrebări Frecvente</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Programe */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wide">Programe</h4>
                        <ul className="flex flex-col gap-3 text-[var(--text-secondary)]">
                            <li><Link to="/articol/slabire-rapida" className="hover:text-[var(--accent-primary)] transition-colors">Slăbire Rapidă</Link></li>
                            <li><Link to="/articol/tonifiere-sculptare" className="hover:text-[var(--accent-primary)] transition-colors">Tonifiere & Sculptare</Link></li>
                            <li><Link to="/articol/terapie-spate" className="hover:text-[var(--accent-primary)] transition-colors">Terapie Spate</Link></li>
                            <li><Link to="/articol/recuperare-post-natal" className="hover:text-[var(--accent-primary)] transition-colors">Recuperare Post-Natal</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wide">Contact</h4>
                        <ul className="flex flex-col gap-4 text-[var(--text-secondary)]">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[var(--accent-primary)] mt-0.5 shrink-0" />
                                <span>Str. Calea Aradului nr. 9<br />(Hotel Ramada), Oradea</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[var(--accent-primary)] shrink-0" />
                                <a href="tel:+40769124019" className="hover:text-white transition-colors">0769 124 019</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[var(--accent-primary)] shrink-0" />
                                <a href="mailto:contact@neo-boost.com" className="hover:text-white transition-colors">contact@neo-boost.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[var(--border-subtle)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
                    <p>© {new Date().getFullYear()} NeoBoost EMS. Toate drepturile rezervate.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/legal/privacy" className="hover:text-white transition-colors">Politică de Confidențialitate</Link>
                        <Link to="/legal/terms" className="hover:text-white transition-colors">Termeni și Condiții</Link>
                        <Link to="/legal/cookies" className="hover:text-white transition-colors">Politica Cookie</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
