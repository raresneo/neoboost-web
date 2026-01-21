import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { EMS_SOLUTIONS } from '../../constants';

// --- Science & Solutions Section ---
export const ScienceSolutionsSection = () => (
    <section className="py-32 bg-zinc-900 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3A86FF]/20 to-transparent"></div>
        <div className="container mx-auto px-6 md:px-24">
            <ScrollReveal>
                <div className="mb-20 max-w-3xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-1 bg-[#3A86FF]"></div>
                        <span className="mono-font text-[#3A86FF] uppercase tracking-widest text-xs font-black">Probleme & Soluții</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black impact-font text-white mb-8 heading-glow">
                        ȘTIINȚA DIN SPATELE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-cyan-600">REZULTATELOR.</span>
                    </h2>
                    <p className="text-white/60 text-lg font-light leading-relaxed">
                        Nu este magie, este bio-inginerie. NeoBoost abordează corpul uman la nivel celular pentru a rezolva probleme specifice.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
                {EMS_SOLUTIONS.map((sol, i) => (
                    <ScrollReveal key={sol.id} delay={i * 100}>
                        <div className="group relative bg-black border border-white/10 p-8 md:p-12 hover:border-[#3A86FF]/40 transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 scale-150 grayscale group-hover:grayscale-0">
                                {sol.icon}
                            </div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 text-[#3A86FF] group-hover:scale-110 transition-transform duration-500">
                                    {sol.icon}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-black impact-font text-white mb-4 group-hover:text-[#3A86FF] transition-colors">
                                    {sol.title}
                                </h3>

                                <p className="text-white/70 font-medium mb-6 text-lg">
                                    {sol.description}
                                </p>

                                <div className="pl-6 border-l-2 border-[#3A86FF]/30">
                                    <p className="text-white/40 text-sm italic font-light">
                                        "<span className="text-[#3A86FF]">Știința:</span> {sol.science}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);
