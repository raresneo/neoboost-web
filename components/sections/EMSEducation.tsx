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

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Stage 1 */}
                        <div className="glass-block p-10 hover:border-[#3A86FF]/30 transition-all duration-500 group">
                            <span className="impact-font text-6xl text-white/5 group-hover:text-[#3A86FF]/20 transition-colors mb-6 block">01</span>
                            <h3 className="text-2xl font-black impact-font text-white mb-4 uppercase">Recuperare & <br />Reabilitare</h3>
                            <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">
                                Rădăcinile EMS sunt medicale. Creat pentru a activa musculatura când contracția voluntară era slabă.
                            </p>
                            <ul className="space-y-2 text-[10px] mono-font text-white/30 uppercase tracking-wider">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Activare musculară</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Menținere tonus</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Reeducare neuromotorie</li>
                            </ul>
                        </div>

                        {/* Stage 2 */}
                        <div className="glass-block p-10 hover:border-[#3A86FF]/30 transition-all duration-500 group">
                            <span className="impact-font text-6xl text-white/5 group-hover:text-[#3A86FF]/20 transition-colors mb-6 block">02</span>
                            <h3 className="text-2xl font-black impact-font text-white mb-4 uppercase">Performanță <br />Sportivă</h3>
                            <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">
                                Adoptat de atleți pentru recrutare musculară superioară și antrenament fără stress articular.
                            </p>
                            <ul className="space-y-2 text-[10px] mono-font text-white/30 uppercase tracking-wider">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Recrutare 90%+</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Recuperare activă</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#3A86FF]"></div> Control & Eficiență</li>
                            </ul>
                        </div>

                        {/* Stage 3 */}
                        <div className="glass-block border-[#3A86FF]/20 p-10 relative overflow-hidden group shadow-[0_0_30px_rgba(0,245,255,0.05)]">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={40} className="text-[#3A86FF]" /></div>
                            <span className="impact-font text-6xl text-[#3A86FF]/40 mb-6 block">03</span>
                            <h3 className="text-2xl font-black impact-font text-white mb-4 uppercase">Fitness Modern <br />& Eficiență</h3>
                            <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
                                Soluția pentru oamenii ocupați care vor rezultate structurate, fără "încercări la întâmplare".
                            </p>
                            <ul className="space-y-2 text-[10px] mono-font text-[#3A86FF] uppercase tracking-wider font-bold">
                                <li className="flex items-center gap-2"><CheckCircle2 size={10} /> Timp optimizat</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={10} /> Structură & Ghidaj</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={10} /> Mediu Sigur Exclusiv</li>
                            </ul>
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
