import React from 'react';
import { History, Zap, CheckCircle2, Quote, Target } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { StaggeredText } from '../ui/StaggeredText';
import { AnimatedGraphic } from '../AnimatedGraphic';

import { BioDecryption } from '../ui/BioDecryption';
import { EMS_MILESTONES } from '../../constants';

// --- EMSEducation Component ---
export const EMSEducation = () => {
    // Helper to render a milestone
    const renderMilestone = (milestone: any, isLeft: boolean) => (
        <div key={milestone.year} className="flex flex-col gap-6 relative group">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[#3A86FF] font-black impact-font text-5xl opacity-80 block mb-1">
                        {milestone.year}
                    </span>
                    <h3 className="text-xl md:text-2xl text-white font-bold uppercase leading-none mb-2">{milestone.title}</h3>
                </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed border-l border-[#3A86FF]/50 pl-4">
                {milestone.description}
            </p>
        </div>
    );

    return (
        <React.Fragment>
            {/* SLIDE 1: ORIGINS (1780 - 1960) */}
            <div className="w-[100vw] h-screen shrink-0 relative bg-[#050a14] text-white flex items-center justify-center snap-center overflow-y-auto no-scrollbar">
                <div className="container mx-auto px-6 md:px-24 h-full flex flex-col justify-center py-24">
                    <ScrollReveal className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <History size={20} className="text-[#3A86FF]" />
                            <span className="text-[#3A86FF] font-bold uppercase tracking-widest text-xs">Chapter 1: Origins</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black impact-font uppercase text-white">
                            GENEZA <span className="text-transparent" style={{ WebkitTextStroke: '1px #3A86FF' }}>EMS.</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
                        {/* 1780 */}
                        {renderMilestone(EMS_MILESTONES[0], true)}
                        {/* 1960 */}
                        <div className="md:mt-24">
                            {renderMilestone(EMS_MILESTONES[1], false)}
                        </div>
                    </div>
                </div>
            </div>

            {/* SLIDE 2: MODERN ERA (1990 - 2010) */}
            <div className="w-[100vw] h-screen shrink-0 relative bg-[#050a14] text-white flex items-center justify-center snap-center overflow-y-auto no-scrollbar">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="container mx-auto px-6 md:px-24 h-full flex flex-col justify-center py-24 relative z-10">
                    <ScrollReveal className="mb-12 text-center">
                        <span className="text-[#3A86FF] font-bold uppercase tracking-widest text-xs mb-4 block">Chapter 2: Evolution</span>
                        <h2 className="text-5xl md:text-7xl font-black impact-font uppercase text-white">
                            STANDARDIZARE.
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
                        {/* 1990 */}
                        {renderMilestone(EMS_MILESTONES[2], true)}
                        {/* 2010 */}
                        <div className="md:mt-24">
                            {renderMilestone(EMS_MILESTONES[3], false)}
                        </div>
                    </div>
                </div>
            </div>

            {/* SLIDE 3: NEOBOOST REVOLUTION (2024+) */}
            <div className="w-[100vw] h-screen shrink-0 relative bg-black text-white flex items-center justify-center snap-center overflow-y-auto no-scrollbar">
                {/* Gradient Background for "New Era" */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A86FF]/20 via-transparent to-black z-0"></div>

                <div className="container mx-auto px-6 md:px-24 h-full flex flex-col justify-center py-24 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* 2024 Milestone Highlight */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-[#3A86FF]/20 blur-3xl rounded-full"></div>
                            {renderMilestone(EMS_MILESTONES[4], true)}
                        </div>

                        {/* NeoBoost Difference Text */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-black impact-font text-white mb-6 leading-[0.9]">
                                    TRANSFORMARE<br />
                                    <span className="text-[#3A86FF]">PERSONALIZATĂ.</span>
                                </h2>
                                <p className="text-white/60 text-lg leading-relaxed">
                                    La NeoBoost, EMS nu e despre a împinge corpul la limită, ci despre a construi o transformare sustenabilă, într-un cadru de siguranță totală.
                                </p>
                            </div>

                            <div className="space-y-6 border-l border-white/10 pl-8">
                                <div>
                                    <h4 className="text-white font-bold impact-font text-xl uppercase mb-2 text-[#3A86FF]">Costumul = Interfața</h4>
                                    <p className="text-white/40 text-sm font-light leading-relaxed">
                                        Fiecare costum este calea prin care semnalul ajunge în corp. Ajustarea lui nu este un detaliu logistic, ci baza personalizării.
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
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
