import React from 'react';
import { ShieldCheck, HeartPulse, AlertTriangle } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const SafetySection = () => {
    return (
        <section className="py-8 lg:py-[5vh] bg-transparent border-y border-white/5 relative overflow-hidden h-full flex flex-col justify-center">
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <ShieldCheck className="text-[#3A86FF]" size={20} />
                            <span className="text-[#3A86FF] font-black uppercase tracking-[0.3em] text-[10px]">Siguranță & Eligibilitate</span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black impact-font text-white uppercase mb-4">
                            ESTE EMS <span className="text-[#3A86FF]">POTRIVIT PENTRU TINE?</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="flex flex-col md:grid md:grid-cols-2 landscape:flex-row landscape:overflow-x-auto gap-6 md:gap-12 landscape:gap-6 landscape:pb-8 md:pb-0 landscape:snap-x landscape:snap-mandatory no-scrollbar">
                    {/* Suitable For */}
                    <ScrollReveal delay={100} className="w-full landscape:min-w-[85vw] landscape:w-auto landscape:snap-center">
                        <div className="h-full glass-block p-6 rounded-3xl border border-white/10 hover:border-[#3A86FF]/30 transition-all flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-[#3A86FF]/20 flex items-center justify-center text-[#3A86FF] flex-shrink-0">
                                    <HeartPulse size={20} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase">ESTE PENTRU TINE DACĂ...</h3>
                            </div>
                            <ul className="space-y-4 text-white/70 flex-grow">
                                <li className="flex gap-3">
                                    <span className="text-[#3A86FF] font-bold">✓</span>
                                    <span>Ești adult fără afecțiuni cardiace grave diagnosticate.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#3A86FF] font-bold">✓</span>
                                    <span>Nu ai implanturi electronice active (ex: pacemaker).</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#3A86FF] font-bold">✓</span>
                                    <span>Vrei să accelerezi rezultate de slăbire / tonifiere sau să îți susții coloana și postura.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#3A86FF] font-bold">✓</span>
                                    <span>Cauți o metodă eficientă care protejează articulațiile.</span>
                                </li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    {/* Not Suitable For */}
                    <ScrollReveal delay={200} className="w-full landscape:min-w-[85vw] landscape:w-auto landscape:snap-center">
                        <div className="h-full glass-block p-6 rounded-3xl border border-white/10 hover:border-red-500/30 transition-all flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
                                    <AlertTriangle size={20} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase">NU ESTE INDICAT DACĂ...</h3>
                            </div>
                            <ul className="space-y-4 text-white/70 flex-grow">
                                <li className="flex gap-3">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <span>Ai un dispozitiv medical electronic implantat (ex: stimulator cardiac).</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <span>Ești însărcinată.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <span>Ai epilepsie sau tulburări neurologice severe.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <span>Ești în perioada imediată de recuperare după o operație (fără acordul medicului).</span>
                                </li>
                            </ul>
                        </div>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={300}>
                    <div className="mt-6 text-center max-w-2xl mx-auto">
                        <p className="text-white/50 text-[10px] md:text-xs italic border-l-2 border-[#3A86FF]/30 pl-4 py-1">
                            "În caz de dubiu, te rugăm să ne spui înainte de ședință – antrenorii noștri verifică mereu siguranța înainte de orice antrenament și adaptează intensitatea."
                        </p>
                    </div>
                </ScrollReveal>

                {/* EMS Tech Explanation Box */}
                <ScrollReveal delay={400}>
                    <div className="mt-8 glass-block p-6 rounded-2xl bg-[#0a0a0a]/50 border border-white/5">
                        <h4 className="text-base font-bold text-white mb-2">Cum funcționează tehnologia EMS?</h4>
                        <p className="text-white/60 leading-relaxed text-[10px] md:text-sm">
                            EMS (Electrostimulare Musculară) este o tehnologie care stimulează fibrele musculare prin impulsuri electrice controlate. Asta înseamnă că într-un antrenament de ~20 de minute poți obține un nivel de activare musculară similar cu o sesiune mult mai lungă în sala clasică. Toate ședințele sunt supravegheate 1 la 1, iar intensitatea este adaptată nivelului tău.
                        </p>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
};
