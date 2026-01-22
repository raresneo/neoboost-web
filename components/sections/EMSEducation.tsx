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

                <ScrollReveal className="mb-40">
                    <div className="flex items-center gap-6 mb-8">
                        <History className="text-[#3A86FF]" size={20} />
                        <span className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase">Context & Istoric</span>
                    </div>
                    <div className="text-6xl md:text-8xl font-black impact-font text-white mb-20 leading-[0.8] uppercase">
                        <StaggeredText text="Evoluția" className="inline-block mr-4" />
                        <StaggeredText text="EMS." className="inline-block text-[#3A86FF]" delay={200} />
                    </div>

                    <div className="space-y-32">
                        {/* 1780 */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="md:w-1/2 order-2 md:order-1 relative">
                                <div className="absolute inset-0 bg-[#3A86FF] blur-[100px] opacity-20 animate-pulse-fast"></div>
                                <img
                                    src="/ems-1780.png"
                                    alt="1780 Bioelectricity"
                                    className="relative z-10 w-full rounded-2xl border border-white/10 shadow-2xl animate-float grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="md:w-1/2 order-1 md:order-2 space-y-6">
                                <span className="text-[#3A86FF] font-black impact-font text-8xl md:text-9xl opacity-50 block mb-4">1780</span>
                                <h3 className="text-4xl text-white font-bold uppercase leading-none">Bioelectricitatea</h3>
                                <p className="text-white/60 text-lg leading-relaxed max-w-md">
                                    Luigi Galvani descoperă că impulsurile electrice pot activa mușchii. Experimentele sale fundamentale pe broaște deschid era bioelectricității și a înțelegerii sistemului nervos.
                                </p>
                            </div>
                        </div>

                        {/* 1960 */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="md:w-1/2 order-1 space-y-6 text-right">
                                <span className="text-[#3A86FF] font-black impact-font text-8xl md:text-9xl opacity-50 block mb-4">1960</span>
                                <h3 className="text-4xl text-white font-bold uppercase leading-none">Spațiu & Performanță</h3>
                                <p className="text-white/60 text-lg leading-relaxed max-w-md ml-auto">
                                    "Curenții Rusești" dezvoltați de Dr. Yakov Kots sunt utilizați pentru atleții olimpici sovietici și în programele spațiale pentru a preveni atrofia musculară în microgravitație.
                                </p>
                            </div>
                            <div className="md:w-1/2 order-2 relative">
                                <div className="absolute inset-0 bg-[#3A86FF] blur-[100px] opacity-20 animate-pulse-fast"></div>
                                <img
                                    src="/ems-1960.png"
                                    alt="1960 Space Race"
                                    className="relative z-10 w-full rounded-2xl border border-white/10 shadow-2xl animate-float grayscale hover:grayscale-0 transition-all duration-700"
                                    style={{ animationDelay: '1s' }}
                                />
                            </div>
                        </div>

                        {/* 1980 */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="md:w-1/2 order-2 md:order-1 relative">
                                <div className="absolute inset-0 bg-[#3A86FF] blur-[100px] opacity-20 animate-pulse-fast"></div>
                                <img
                                    src="/ems-1980.png"
                                    alt="1980 Medical Era"
                                    className="relative z-10 w-full rounded-2xl border border-white/10 shadow-2xl animate-float grayscale hover:grayscale-0 transition-all duration-700"
                                    style={{ animationDelay: '2s' }}
                                />
                            </div>
                            <div className="md:w-1/2 order-1 md:order-2 space-y-6">
                                <span className="text-[#3A86FF] font-black impact-font text-8xl md:text-9xl opacity-50 block mb-4">1980</span>
                                <h3 className="text-4xl text-white font-bold uppercase leading-none">Standard Medical</h3>
                                <p className="text-white/60 text-lg leading-relaxed max-w-md">
                                    EMS devine un instrument esențial în fizioterapie. Este folosit pe scară largă în spitale pentru recuperarea post-traumatică rapidă și prevenirea atrofiei la pacienții imobilizați.
                                </p>
                            </div>
                        </div>

                        {/* 2010 */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="md:w-1/2 order-1 space-y-6 text-right">
                                <span className="text-[#3A86FF] font-black impact-font text-8xl md:text-9xl opacity-50 block mb-4">2010</span>
                                <h3 className="text-4xl text-white font-bold uppercase leading-none">Era cu Cabluri</h3>
                                <p className="text-white/60 text-lg leading-relaxed max-w-md ml-auto">
                                    Tehnologia intră în fitness-ul comercial. Apar primele studiouri, însă costumele sunt grele, umezite cu apă și conectate prin cabluri groase de o consolă fixă.
                                </p>
                            </div>
                            <div className="md:w-1/2 order-2 relative">
                                <div className="absolute inset-0 bg-[#3A86FF] blur-[100px] opacity-20 animate-pulse-fast"></div>
                                <img
                                    src="/ems-wired.png"
                                    alt="2010 Wired EMS"
                                    className="relative z-10 w-full rounded-2xl border border-white/10 shadow-2xl animate-float grayscale hover:grayscale-0 transition-all duration-700"
                                    style={{ animationDelay: '3s' }}
                                />
                            </div>
                        </div>

                        {/* Present */}
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                            <div className="md:w-1/2 order-2 md:order-1 relative">
                                <div className="absolute inset-0 bg-[#3A86FF] blur-[100px] opacity-40 animate-pulse-fast"></div>
                                <img
                                    src="/ems-wireless.png"
                                    alt="Present Wireless"
                                    className="relative z-10 w-full rounded-2xl border-2 border-[#3A86FF] shadow-[0_0_50px_rgba(58,134,255,0.3)] animate-float"
                                    style={{ animationDelay: '4s' }}
                                />
                            </div>
                            <div className="md:w-1/2 order-1 md:order-2 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3A86FF]/20 text-[#3A86FF] border border-[#3A86FF]/50 mb-4">
                                    <Zap size={16} fill="currentColor" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Generația Nouă</span>
                                </div>
                                <span className="text-white font-black impact-font text-6xl md:text-8xl block mb-4">PREZENT</span>
                                <h3 className="text-3xl text-white font-bold uppercase leading-none text-[#3A86FF]">Libertate Wireless</h3>
                                <p className="text-white/80 text-lg leading-relaxed max-w-md">
                                    NeoBoost transformă industria cu tehnologia DrySuit Wireless. Fără apă, fără cabluri, cu monitorizare biometrică în timp real. Antrenament funcțional adevărat, fără limite.
                                </p>
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
