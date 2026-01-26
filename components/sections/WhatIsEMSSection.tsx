import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

import { BioDecryption } from '../ui/BioDecryption';

export const WhatIsEMSSection = () => {
    return (
        <section className="py-4 lg:py-[4vh] bg-transparent relative z-10 overflow-hidden h-full flex items-center">
            {/* Ambient Background - More transparent to let body aurora through */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-transparent -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3A86FF]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-24">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">

                    {/* Text Content - Left Side (Red-ish Accent hint) */}
                    <ScrollReveal>
                        <div className="space-y-6 relative">
                            {/* Subtle Red Glow behind text */}
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200px] h-[200px] bg-red-600/10 rounded-full blur-[60px] pointer-events-none -z-10"></div>

                            <h2 className="text-xl md:text-3xl lg:text-4xl font-black impact-font text-white leading-tight uppercase">
                                De ce să alegi antrenamentul EMS la <span className="text-[#3A86FF]">NeoBoost Oradea</span>?
                            </h2>

                            <div className="space-y-4 lg:space-y-6">
                                <div className="flex gap-5 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="w-12 h-12 rounded-full bg-red-600/20 group-hover:bg-red-600/30 flex items-center justify-center shrink-0 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg lg:text-xl mb-1 group-hover:text-red-400 transition-colors leading-tight">Eficiență Maximă</h3>
                                        <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                                            Doar <strong className="text-white"><BioDecryption text="30" /> de minute</strong>, de 1-2 ori pe săptămână. Echivalentul a 4 ore de fitness convențional, activând <strong className="text-white"><BioDecryption text="90%" /></strong> din musculatură.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="w-12 h-12 rounded-full bg-[#3A86FF]/20 group-hover:bg-[#3A86FF]/30 flex items-center justify-center shrink-0 text-[#3A86FF] shadow-[0_0_15px_rgba(58,134,255,0.4)]">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg lg:text-xl mb-1 group-hover:text-[#3A86FF] transition-colors leading-tight">Antrenor Personal 1-la-1</h3>
                                        <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                                            Nu ești niciodată singur. Fiecare antrenament este ghidat de un specialist certificat care îți corectează postura și ajustează intensitatea.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5 group hover:translate-x-2 transition-transform duration-300">
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg lg:text-xl mb-1 group-hover:text-cyan-400 transition-colors leading-tight">Siguranță pentru Articulații</h3>
                                        <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                                            Lucrăm fără greutăți mari, protejând coloana și genunchii, ideal pentru recuperare sau pentru cei cu dureri de spate.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Link to="/science" className="text-[#3A86FF] font-bold tracking-widest uppercase text-sm border-b border-[#3A86FF] pb-1 hover:text-white hover:border-white transition-all">
                                    VEZI EXPLICAȚIA ȘTIINȚIFICĂ
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Image / Visual - Dual Tone Logic */}
                    <ScrollReveal delay={200}>
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group gradient-border-spin">
                            {/* Dual Tone Glows - Background */}
                            {/* Dual Tone Glows - Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-red-900/60 via-cyan-500/30 to-blue-900/60 mix-blend-overlay z-20 pointer-events-none"></div>

                            <img
                                src="/hero_user.jpg"
                                alt="Antrenament EMS NeoBoost Oradea Red Blue Style"
                                className="object-cover w-full h-full transition-all duration-700 scale-105 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20"></div>

                            <div className="absolute bottom-6 left-6 right-6 z-30">
                                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10 flex items-center justify-between group-hover:border-white/30 transition-colors">
                                    <div>
                                        <p className="text-white font-black text-4xl impact-font mb-1 flex items-baseline gap-2">
                                            30 <span className="text-sm font-bold text-[#3A86FF] tracking-widest">MINUTE</span>
                                        </p>
                                        <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Durata unei ședințe complete</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
                                        <div className="w-2 h-2 bg-red-500 rounded-full show-status"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
};
