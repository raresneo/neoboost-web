import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { CinematicBackground } from '../backgrounds/CinematicBackground';
import { GYM_VS_EMS } from '../../constants';

// --- Evolution Video Background Component ---
const EvolutionVideoBackground = () => (
    <CinematicBackground image="/DSC00193.jpg" opacity={0.3} />
);

// --- New Competitive Comparison Section ---
export const ComparisonSection = () => (
    <section className="py-20 md:py-32 bg-transparent border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6 md:px-24 relative z-10">
            <ScrollReveal>
                <div className="text-center mb-16 relative z-10">
                    <p className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase mb-4">Tradiție vs Inovație</p>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic heading-glow">
                        CUM SE COMPARĂ CU <span className="text-[#3A86FF]">FITNESS-UL TRADIȚIONAL</span>
                    </h2>
                </div>
            </ScrollReveal>

            <div className="max-w-5xl mx-auto">
                {/* Table Header - Desktop Only */}
                <div className="hidden md:grid grid-cols-3 gap-4 mb-4 text-[9px] md:text-[10px] mono-font uppercase tracking-widest text-white/30 border-b border-white/10 pb-3">
                    <div className="pl-4">Criteriu</div>
                    <div className="text-center">Sală Tradițională</div>
                    <div className="text-center text-[#3A86FF]">NeoBoost System</div>
                </div>

                {/* Rows / Mobile Cards */}
                <div className="flex overflow-x-auto gap-4 pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:block snap-x snap-mandatory no-scrollbar items-stretch">
                    {GYM_VS_EMS.map((item, idx) => (
                        <ScrollReveal key={idx} delay={idx * 50} className="min-w-[85vw] md:min-w-0 md:w-full snap-center flex-shrink-0">
                            <div className="h-full group grid md:grid-cols-3 gap-4 items-center p-4 glass-block transition-all duration-300 hover:border-[#3A86FF]/30 hover:shadow-[0_0_20px_rgba(0,255,136,0.05)] rounded-2xl md:rounded-none">
                                {/* Feature Header (Mobile & Desktop) */}
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#3A86FF] group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <span className="font-bold text-white text-sm md:text-lg">{item.feature}</span>
                                </div>

                                {/* Comparison Values (Mobile: Stacked, Desktop: Grid columns) */}
                                <div className="grid grid-cols-2 md:contents gap-4">
                                    <div className="md:contents">
                                        <span className="md:hidden text-[10px] text-white/30 uppercase tracking-widest mb-1 block">Sală Tradițională</span>
                                        <div className="text-left md:text-center text-white/40 font-light text-sm md:text-base line-through decoration-white/20 decoration-2">
                                            {item.gym}
                                        </div>
                                    </div>

                                    <div className="md:contents">
                                        <span className="md:hidden text-[10px] text-[#3A86FF]/60 uppercase tracking-widest mb-1 block">NeoBoost</span>
                                        <div className="text-left md:text-center font-black text-[#3A86FF] text-lg md:text-xl shadow-[#3A86FF]/20 drop-shadow-[0_0_8px_rgba(0,255,136,0.3)]">
                                            {item.ems}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Bottom Callout */}
                <ScrollReveal delay={300}>
                    <div className="mt-8 text-center">
                        <p className="text-white/60 font-light italic text-base lg:text-lg mb-4 max-w-2xl mx-auto">
                            "De ce să te antrenezi 4 ore, când poți avea aceleași rezultate în doar 30 de minute?"
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    </section>
);
