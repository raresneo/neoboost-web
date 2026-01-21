import React from 'react';
import { History, Zap, CheckCircle2, Quote, Target } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { StaggeredText } from '../ui/StaggeredText';
import { AnimatedGraphic } from '../AnimatedGraphic';

// --- EMSEducation Component ---
export const EMSEducation = () => {
    return (
        <section className="py-32 md:py-60 bg-[#080808] relative z-10 overflow-hidden">
            <div className="container mx-auto px-6 md:px-24">

                {/* Evolution Section */}
                <ScrollReveal className="mb-40">
                    <div className="flex items-center gap-6 mb-8">
                        <History className="text-[#3A86FF]" size={20} />
                        <span className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase">Context & Istoric</span>
                    </div>
                    <div className="text-6xl md:text-8xl font-black impact-font text-white mb-20 leading-[0.8] uppercase">
                        <StaggeredText text="Evoluția" className="inline-block mr-4" />
                        <StaggeredText text="EMS." className="inline-block text-[#3A86FF]" delay={200} />
                        <span className="text-white/30 text-4xl md:text-5xl tracking-normal normal-case font-light block mt-6">De unde a început și de ce contează azi.</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {/* Stage 0: 1780 Bioelectricity */}
                        <div className="group relative h-[450px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#3A86FF] transition-all duration-500">
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/ems-1780.png"
                                    alt="Luigi Galvani Bioelectricity"
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 sepia-[0.5]"
                                />
                                <div className="absolute inset-0 bg-[#3A86FF]/60 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                            </div>

                            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                                <span className="text-[#3A86FF] font-black impact-font text-5xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">1780</span>
                                <h3 className="text-white font-bold text-xl uppercase mb-2 leading-tight">Bio<br />Electricitate</h3>
                                <div className="w-12 h-1 bg-[#3A86FF] mb-3"></div>
                                <p className="text-white/70 text-xs leading-relaxed mb-4 font-light">
                                    Luigi Galvani descoperă că impulsurile electrice mișcă mușchii. Experimentele pe broaște deschid era bioelectricității.
                                </p>
                                <ul className="space-y-1 text-[10px] mono-font text-white/40 uppercase tracking-wider">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Luigi Galvani</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Prima Scânteie</li>
                                </ul>
                            </div>
                        </div>

                        {/* Stage 0.5: 1960 Space & Sport */}
                        <div className="group relative h-[450px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#3A86FF] transition-all duration-500">
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/ems-1960.png"
                                    alt="Soviet Space Sport Science"
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-[#3A86FF]/60 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                            </div>

                            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                                <span className="text-[#3A86FF] font-black impact-font text-5xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">1960</span>
                                <h3 className="text-white font-bold text-xl uppercase mb-2 leading-tight">Spațiu &<br />Performanță</h3>
                                <div className="w-12 h-1 bg-[#3A86FF] mb-3"></div>
                                <p className="text-white/70 text-xs leading-relaxed mb-4 font-light">
                                    "Curenții Rusești" (Kots) folosiți pentru atleții de elită sovietici și programele spațiale pentru a preveni atrofia în microgravitație.
                                </p>
                                <ul className="space-y-1 text-[10px] mono-font text-white/40 uppercase tracking-wider">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Dr. Yakov Kots</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Programul Spațial</li>
                                </ul>
                            </div>
                        </div>

                        {/* Stage 1: 1980s Medical */}
                        <div className="group relative h-[450px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#3A86FF] transition-all duration-500">
                            {/* Image Background & Effects */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/ems-1980.png"
                                    alt="Medical EMS 1980"
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                {/* Blue Overlay - Disappears on hover */}
                                <div className="absolute inset-0 bg-[#3A86FF]/60 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-700"></div>
                                {/* Gradient for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                                <span className="text-[#3A86FF] font-black impact-font text-5xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">1980</span>
                                <h3 className="text-white font-bold text-xl uppercase mb-2 leading-tight">Origini <br />Medicale</h3>
                                <div className="w-12 h-1 bg-[#3A86FF] mb-3"></div>
                                <p className="text-white/70 text-xs leading-relaxed mb-4 font-light">
                                    Utilizat inițial exclusiv în fizioterapie și de către NASA pentru prevenirea atrofiei musculare. Static, dar eficient.
                                </p>
                                <ul className="space-y-1 text-[10px] mono-font text-white/40 uppercase tracking-wider">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Recuperare post-trauma</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Atrofie musculară</li>
                                </ul>
                            </div>
                        </div>

                        {/* Stage 2: 2010s Wired */}
                        <div className="group relative h-[450px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#3A86FF] transition-all duration-500">
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/ems-wired.png"
                                    alt="Wired EMS 2010"
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-[#3A86FF]/60 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                            </div>

                            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                                <span className="text-[#3A86FF] font-black impact-font text-5xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">2010</span>
                                <h3 className="text-white font-bold text-xl uppercase mb-2 leading-tight">Era <br />Cu Cabluri</h3>
                                <div className="w-12 h-1 bg-[#3A86FF] mb-3"></div>
                                <p className="text-white/70 text-xs leading-relaxed mb-4 font-light">
                                    Expansiunea în fitness comercial (ex. tehnologia clasică). Puternic, dar restrictiv din cauza cablurilor groase și a consolei fixe.
                                </p>
                                <ul className="space-y-1 text-[10px] mono-font text-white/40 uppercase tracking-wider">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Antrenament static</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Recrutare musculară</li>
                                </ul>
                            </div>
                        </div>

                        {/* Stage 3: Present Wireless */}
                        <div className="group relative h-[450px] rounded-2xl overflow-hidden border border-[#3A86FF]/50 shadow-[0_0_30px_rgba(58,134,255,0.1)] hover:shadow-[0_0_50px_rgba(58,134,255,0.3)] transition-all duration-500">
                            <div className="absolute inset-0 z-0">
                                <img
                                    src="/ems-wireless.png"
                                    alt="Wireless EMS Present"
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-[#3A86FF]/60 mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                            </div>

                            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                                <div className="absolute top-6 right-6 p-2 rounded-full bg-[#3A86FF] text-black animate-pulse">
                                    <Zap size={20} fill="currentColor" />
                                </div>
                                <span className="text-[#3A86FF] font-black impact-font text-5xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">PREZENT</span>
                                <h3 className="text-white font-bold text-xl uppercase mb-2 leading-tight">Libertate <br />Wireless</h3>
                                <div className="w-12 h-1 bg-[#3A86FF] mb-3"></div>
                                <p className="text-white/90 text-xs leading-relaxed mb-4 font-light">
                                    NeoBoost & Symbiont. Fără cabluri, fără umezire, date biometrice live. Libertate totală de mișcare pentru antrenamente funcționale reale.
                                </p>
                                <ul className="space-y-1 text-[10px] mono-font text-[#3A86FF] uppercase tracking-wider font-bold">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={12} /> Dry Suit (Fără apă)</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={12} /> Biosemnale Live</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={12} /> Mișcare Nelimitată</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Differentiation Section */}
                <ScrollReveal>
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-12 h-px bg-[#3A86FF]"></div>
                                <span className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase">NeoBoost Difference</span>
                            </div>
                            <h2 className="text-6xl md:text-7xl font-black impact-font text-white mb-10 leading-[0.85]">
                                TRANSFORMARE<br />
                                PRIN ACȚIUNI<br />
                                <span className="text-[#3A86FF]">PERSONALIZATE.</span>
                            </h2>
                            <p className="text-xl text-white/50 font-light leading-relaxed mb-12">
                                La NeoBoost, EMS nu e despre a împinge corpul la limită, ci despre a construi o transformare sustenabilă, într-un cadru de siguranță totală.
                            </p>

                            <div className="space-y-8 border-l border-white/10 pl-8">
                                <div>
                                    <h4 className="text-white font-bold impact-font text-xl uppercase mb-2 text-[#3A86FF]">Costumul = Interfața</h4>
                                    <p className="text-white/40 text-sm font-light leading-relaxed">
                                        Fiecare costum este calea prin care semnalul ajunge în corp. Ajustarea lui nu este un detaliu logistic, ci baza personalizării pentru structura ta corporală.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold impact-font text-xl uppercase mb-2 text-[#3A86FF]">Personalizare Reală</h4>
                                    <p className="text-white/40 text-sm font-light leading-relaxed">
                                        Nu doar intensitate. Configurăm frecvența, profunzimea stimulării și parametrii pe grupe musculare. Două persoane pot face "același antrenament" cu setări complet diferite.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-[#3A86FF]/5 blur-3xl rounded-full opacity-20"></div>
                            <div className="relative glass-block p-10 md:p-14">
                                <div className="mb-8">
                                    <AnimatedGraphic type="energy" className="h-56 w-full" />
                                </div>
                                <div className="mb-10">
                                    <Quote className="text-[#3A86FF] mb-6" size={40} />
                                    <h3 className="text-2xl md:text-3xl font-bold impact-font text-white uppercase leading-tight mb-6">
                                        "Noi nu urmărim să fie greu. Urmărim să fie corect pentru tine."
                                    </h3>
                                    <div className="h-px w-20 bg-[#3A86FF] opacity-50"></div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 border border-[#3A86FF]/30 flex items-center justify-center text-[#3A86FF] flex-shrink-0 bg-[#3A86FF]/5">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <h5 className="text-white font-bold impact-font uppercase mb-1">Expertiză</h5>
                                            <p className="text-white/30 text-xs leading-relaxed">Specialiști cu studii în electroterapie și kinetoterapie.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 border border-[#3A86FF]/30 flex items-center justify-center text-[#3A86FF] flex-shrink-0 bg-[#3A86FF]/5">
                                            <Target size={20} />
                                        </div>
                                        <div>
                                            <h5 className="text-white font-bold impact-font uppercase mb-1">Evaluare</h5>
                                            <p className="text-white/30 text-xs leading-relaxed">Evaluare de 5-7 minute înainte de prima sesiune pentru calibrare.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
};
