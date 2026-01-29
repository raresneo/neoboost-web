import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { EMS_SOLUTIONS } from '../../constants';

// --- Science & Solutions Section ---
export const ScienceSolutionsSection = () => (
    <section className="py-20 md:py-32 bg-transparent border-b border-white/5 relative z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3A86FF]/20 to-transparent"></div>
        <div className="container mx-auto px-6 md:px-24">
            <ScrollReveal>
                <div className="mb-16 max-w-3xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-1 bg-[#3A86FF]"></div>
                        <span className="mono-font text-[#3A86FF] uppercase tracking-[0.3em] text-[10px] font-black">Probleme & Soluții</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 heading-glow uppercase italic leading-[1.1]">
                        ȘTIINȚA <span className="text-[#3A86FF]">REZULTATELOR.</span>
                    </h2>
                    <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                        Nu este magie, este bio-inginerie. NeoBoost abordează corpul uman la nivel celular pentru a rezolva probleme specifice.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {EMS_SOLUTIONS.map((sol, i) => (
                    <ScrollReveal key={sol.id} delay={i * 100}>
                        <div className="group relative bg-[var(--bg-primary)] border border-white/10 p-6 md:p-8 hover:border-[#3A86FF]/40 transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 scale-125 grayscale group-hover:grayscale-0">
                                {sol.icon}
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#3A86FF] group-hover:scale-110 transition-transform duration-500">
                                    {sol.icon}
                                </div>

                                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2 group-hover:text-[#3A86FF] transition-colors uppercase">
                                    {sol.title}
                                </h3>

                                <p className="text-white/70 font-medium mb-4 text-sm md:text-base">
                                    {sol.description}
                                </p>

                                <div className="pl-4 border-l border-[#3A86FF]/30">
                                    <p className="text-white/40 text-[11px] md:text-xs italic font-light">
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
