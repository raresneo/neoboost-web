import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

import { BioDecryption } from '../ui/BioDecryption';

export const WhatIsEMSSection = () => {
    return (
        <section className="py-20 md:py-32 bg-[#020202] relative z-10 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#050505] to-[#020202] -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3A86FF]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <ScrollReveal>
                        <div className="space-y-10">
                            <h2 className="text-3xl md:text-5xl font-black impact-font text-white leading-tight">
                                De ce să alegi antrenamentul EMS la <span className="text-[#3A86FF]">NeoBoost Oradea</span>?
                            </h2>

                            <div className="space-y-8">
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-full bg-[#3A86FF]/10 flex items-center justify-center shrink-0 text-[#3A86FF]">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl mb-2">Eficiență Maximă</h3>
                                        <p className="text-white/60 text-base leading-relaxed">
                                            Doar <strong className="text-white"><BioDecryption text="20" /> de minute</strong>, de 1-2 ori pe săptămână. Echivalentul a 4 ore de fitness convențional, activând <strong className="text-white"><BioDecryption text="90%" /></strong> din musculatură.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-full bg-[#3A86FF]/10 flex items-center justify-center shrink-0 text-[#3A86FF]">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl mb-2">Antrenor Personal 1-la-1</h3>
                                        <p className="text-white/60 text-base leading-relaxed">
                                            Nu ești niciodată singur. Fiecare antrenament este ghidat de un specialist certificat care îți corectează postura și ajustează intensitatea.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-full bg-[#3A86FF]/10 flex items-center justify-center shrink-0 text-[#3A86FF]">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl mb-2">Siguranță pentru Articulații</h3>
                                        <p className="text-white/60 text-base leading-relaxed">
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

                    {/* Image / Visual */}
                    <ScrollReveal delay={200}>
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                            <img
                                src="/ems_training_2.jpg"
                                alt="Antrenament EMS NeoBoost Oradea"
                                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                                    <p className="text-[#3A86FF] font-black text-4xl impact-font mb-1">20 MIN</p>
                                    <p className="text-white text-xs uppercase tracking-widest font-bold opacity-80">Durata unei ședințe complete</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
};
