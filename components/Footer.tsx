import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND } from '../constants';

export const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-6 text-sm relative z-50">
            <div className="container mx-auto px-6">
                {/* 4 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-3">
                            <img src="/logo_white.webp" alt="NeoBoost Logo" className="h-8 w-auto object-contain" />
                            <span className="text-xl font-bold font-display text-white">{BRAND.name}</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            Cea mai avansată tehnologie EMS din Oradea.
                            <br />
                            Transformare vizibilă în doar 30 de minute pe săptămână.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://facebook.com/neoboost.ems" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://instagram.com/neoboost.ems" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Navigare */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wide">Navigare</h4>
                        <ul className="flex flex-col gap-3 text-gray-400">
                            <li><Link to="/echipa" className="hover:text-blue-600 transition-colors">Despre Noi</Link></li>
                            <li><Link to="/servicii-ems" className="hover:text-blue-600 transition-colors">Servicii EMS / Cum funcționează</Link></li>
                            <li><Link to="/preturi" className="hover:text-blue-600 transition-colors">Prețuri & Pachete</Link></li>
                            <li><Link to="/#beneficii" className="hover:text-blue-600 transition-colors">Beneficii</Link></li>
                            <li><Link to="/#metoda" className="hover:text-blue-600 transition-colors">Cum Funcționează</Link></li>
                            <li><Link to="/rezultate" className="hover:text-blue-600 transition-colors">Rezultate</Link></li>
                            <li><Link to="/#faq" className="hover:text-blue-600 transition-colors">Întrebări Frecvente</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Programe */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wide">Programe</h4>
                        <ul className="flex flex-col gap-3 text-gray-400">
                            <li><Link to="/articol/slabire-rapida" className="hover:text-blue-500 transition-colors">Slăbire Rapidă</Link></li>
                            <li><Link to="/articol/tonifiere-sculptare" className="hover:text-blue-500 transition-colors">Tonifiere & Sculptare</Link></li>
                            <li><Link to="/articol/terapie-spate" className="hover:text-blue-500 transition-colors">Terapie Spate</Link></li>
                            <li><Link to="/articol/recuperare-post-natal" className="hover:text-blue-500 transition-colors">Recuperare Post-Natal</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-6 uppercase tracking-wide">Contact</h4>
                        <ul className="flex flex-col gap-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-blue-500 mt-0.5 shrink-0" />
                                <span>Str. Calea Aradului nr. 9<br />(Hotel Ramada), Oradea</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-blue-500 shrink-0" />
                                <a href="tel:+40769124019" className="hover:text-white transition-colors">0769 124 019</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-blue-500 shrink-0" />
                                <a href="mailto:contact@neo-boost.com" className="hover:text-white transition-colors">contact@neo-boost.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 py-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-2xl text-gray-400 text-xs leading-relaxed text-center md:text-left">
                            <p className="mb-2 font-bold text-gray-300">Informații pentru consumatori</p>
                            <p>
                                NeoBoost respectă cu strictețe legislația în vigoare privind protecția consumatorilor.
                                Operăm cu transparență totală în ceea ce privește prețurile, serviciile și politica de retur.
                                Pentru orice sesizare, vă stăm la dispoziție prin canalele de contact afișate sau puteți apela la organele abilitate.
                                Drepturile dumneavoastră sunt prioritare pentru noi.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 shrink-0 items-center">
                            <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <img
                                    src="https://wpfitness.eu/wp-content/uploads/2022/10/anpc-sal.png"
                                    alt="Soluționarea Alternativă a Litigiilor"
                                    className="h-[50px] w-auto"
                                />
                            </a>
                            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <img
                                    src="https://wpfitness.eu/wp-content/uploads/2022/10/anpc-sol.png"
                                    alt="Soluționarea Online a Litigiilor"
                                    className="h-[50px] w-auto"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 text-xs text-slate-500">
                    <p className="min-w-max">© {new Date().getFullYear()} NeoBoost EMS. Toate drepturile rezervate.</p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 w-full lg:justify-end">
                        <Link to="/legal/terms" className="hover:text-blue-600 transition-colors">Termeni și Condiții</Link>
                        <Link to="/legal/privacy" className="hover:text-blue-600 transition-colors">Politică de Confidențialitate</Link>
                        <Link to="/legal/cookies" className="hover:text-blue-600 transition-colors">Politica Cookie</Link>
                        <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">ANPC</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
