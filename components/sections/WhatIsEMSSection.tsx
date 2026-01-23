import React from 'react';
import { Zap, Clock, UserCheck } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

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
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-2 text-[#3A86FF]">
                                <Zap size={20} />
                                <span className="mono-font text-[10px] tracking-[0.4em] font-bold uppercase">Tehnologie Explicată</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black impact-font text-white leading-tight">
                                Ce este antrenamentul EMS și de ce funcționează în <span className="text-[#3A86FF]">doar 20 de minute</span>?
                            </h2>

                            <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
                                <p>
                                    <strong className="text-white font-bold">EMS (Electro Muscle Stimulation)</strong> este un tip de antrenament revoluționar în care mușchii tăi sunt stimulați cu impulsuri electrice ușoare, printr-un costum special tehnologizat.
                                </p>
                                <p>
                                    În loc să lucrezi fiecare grupă musculară separat (ca la sala clasică), tehnologia noastră activează <strong>simultan peste 90% din fibrele musculare</strong>, în timp ce faci exerciții simple, ghidate de un antrenor personal certificat.
                                </p>
                                <p>
                                    O ședință durează aproximativ 20 de minute și este echivalentă cu un antrenament convențional de 90 de minute, datorită densității efortului. La <strong>NeoBoost EMS Oradea</strong>, antrenamentele sunt 1-la-1 sau în grupuri mici, cu atenție maximă pe siguranță și execuție corectă.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 pt-4">
                                <div className="glass-block p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                                    <Clock className="text-[#3A86FF] mb-4" size={28} />
                                    <h4 className="text-white font-bold mb-2">Eficiență Maximă</h4>
                                    <p className="text-sm text-gray-400">20 minute de 1-2 ori pe săptămână pentru rezultate vizibile.</p>
                                </div>
                                <div className="glass-block p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                                    <UserCheck className="text-[#3A86FF] mb-4" size={28} />
                                    <h4 className="text-white font-bold mb-2">Personalizat 100%</h4>
                                    <p className="text-sm text-gray-400">Antrenorul ajustează intensitatea pentru confortul și obiectivele tale.</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Visual / Image */}
                    <ScrollReveal delay={200}>
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                            <img
                                src="/studio_session_1.jpg"
                                alt="Antrenament EMS la NeoBoost Oradea"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl">
                                    <p className="text-white font-medium text-lg italic">
                                        "Este incredibil cât de intens lucrezi în doar 20 de minute. Recomand oricui are programul încărcat."
                                    </p>
                                    <p className="text-[#3A86FF] font-bold mt-4 text-sm uppercase tracking-wider">
                                        — Experiența NeoBoost
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
};
