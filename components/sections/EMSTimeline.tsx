import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { StaggeredText } from '../ui/StaggeredText';
import { CinematicBackground } from '../backgrounds/CinematicBackground';
import { AnimatedGraphic } from '../AnimatedGraphic';
import { EMS_MILESTONES } from '../../constants';

// --- History Video Background Component ---
const HistoryVideoBackground = () => (
    <CinematicBackground image="/DSC04709.jpg" opacity={0.3} />
);

export const EMSTimeline = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="istoric" className="pt-24 md:pt-32 pb-16 md:pb-24 bg-[#050505] relative z-10 overflow-hidden scroll-mt-20">
            <HistoryVideoBackground />
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal className="mb-24">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-12 h-px bg-[#3A86FF]"></div>
                        <span className="mono-font text-[9px] text-[#3A86FF] font-black tracking-[0.6em] uppercase">Evoluție Tehnologică</span>
                    </div>
                    <div className="text-7xl md:text-[12vw] font-black impact-font text-white leading-[0.7] tracking-tighter">
                        <StaggeredText text="EMS." className="block" />
                        <StaggeredText text="ISTORIC." className="block text-[#3A86FF]" delay={200} />
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* Milestone Selection (Years) */}
                    <div className="lg:col-span-4 space-y-3">
                        {EMS_MILESTONES.map((m, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`group cursor-pointer flex items-center gap-6 p-6 transition-all duration-500 border-l-2 ${activeIndex === idx ? 'border-[#3A86FF] bg-white/[0.03]' : 'border-white/5 hover:border-white/20'}`}
                            >
                                <span className={`mono-font text-xl font-black transition-all duration-500 ${activeIndex === idx ? 'text-[#3A86FF] scale-110 translate-x-2' : 'text-white/20 group-hover:text-white/40'}`}>
                                    {m.year}
                                </span>
                                <span className={`impact-font text-2xl tracking-wide uppercase transition-all duration-500 ${activeIndex === idx ? 'text-white opacity-100' : 'text-white/20 group-hover:text-white/40'}`}>
                                    {m.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Active Milestone Display */}
                    <div className="lg:col-span-8 relative">
                        <div className="relative p-12 md:p-20 glass overflow-hidden group min-h-[400px] flex flex-col justify-center">
                            <div className="absolute inset-0 z-0">
                                <AnimatedGraphic type="tech" className="w-full h-full opacity-40" />
                            </div>
                            <div className="absolute top-0 right-0 p-12 text-white/[0.02] scale-[2] pointer-events-none">
                                {EMS_MILESTONES[activeIndex].icon}
                            </div>

                            <div className="relative z-10">
                                <div className={`w-16 h-16 flex items-center justify-center mb-10 transition-all duration-700 border border-white/10 ${EMS_MILESTONES[activeIndex].isNeo ? 'bg-[#3A86FF]/10 text-[#3A86FF] shadow-[0_0_50px_rgba(0,245,255,0.2)] border-[#3A86FF]/30' : 'bg-transparent text-white/40'}`}>
                                    {EMS_MILESTONES[activeIndex].icon}
                                </div>

                                <h3 className="text-5xl md:text-7xl font-black impact-font text-white mb-8 transition-all duration-700">
                                    {EMS_MILESTONES[activeIndex].title}
                                </h3>

                                <p className="text-xl md:text-2xl font-light text-white/50 leading-relaxed max-w-2xl transition-all duration-700">
                                    {EMS_MILESTONES[activeIndex].description}
                                </p>

                                {EMS_MILESTONES[activeIndex].isNeo && (
                                    <div className="mt-12 inline-flex items-center gap-3 px-6 py-2 border border-[#3A86FF]/20 bg-[#3A86FF]/5 rounded-full">
                                        <Zap size={14} className="text-[#3A86FF] animate-pulse" />
                                        <span className="mono-font text-[10px] text-[#3A86FF] uppercase tracking-widest font-black">Tehnologie activă în prezent</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
