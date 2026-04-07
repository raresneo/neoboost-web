import React from 'react';
import { TrendingUp } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { StaggeredText } from '../ui/StaggeredText';
import { EMS_STEPS } from '../../constants';
import { ObjectivesWithSlider } from './ObjectivesWithSlider';

// --- EMS Protocol Subsection ---
export const EMSProtocolSubsection = () => {
    return (
        <div className="mt-40 md:mt-60">
            <ScrollReveal>
                <div className="flex items-center gap-6 mb-8">
                    <TrendingUp className="text-[#3A86FF]" size={20} />
                    <span className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase">Level 1 Briefing</span>
                </div>
                <div className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                    <StaggeredText text="OBIECTIVELE" className="block" />
                    <StaggeredText text="MISIUNII TALE" className="block text-[#3A86FF]" delay={200} />
                </div>

                {/* Gamification Progress Text */}
                <div className="mb-24 flex items-center gap-4">
                    <div className="px-4 py-2 bg-zinc-900 rounded border border-zinc-800 flex items-center gap-3">
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-sm animate-pulse"></div>
                            <div className="w-3 h-3 bg-zinc-700 rounded-sm"></div>
                            <div className="w-3 h-3 bg-zinc-700 rounded-sm"></div>
                            <div className="w-3 h-3 bg-zinc-700 rounded-sm"></div>
                        </div>
                        <span className="text-xs font-mono text-zinc-400 uppercase">
                            Status: <span className="text-white">Inițiere</span>
                        </span>
                    </div>
                    <p className="text-sm text-zinc-500 font-mono hidden md:block">
                        // Completează cei 4 pași pentru a debloca reducerea
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-32 items-start">
                {/* Steps Column */}
                <div className="space-y-12">
                    {EMS_STEPS.map((step, idx) => (
                        <ScrollReveal key={step.id} delay={idx * 150}>
                            <div className="flex gap-10 group">
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-[#3A86FF]/40 group-hover:bg-[#3A86FF]/5 transition-all duration-500">
                                        <span className="font-display font-bold text-xl text-[#3A86FF]">{step.id}</span>
                                    </div>
                                    {idx !== EMS_STEPS.length - 1 && <div className="w-px h-full bg-gradient-to-b from-[#3A86FF]/20 to-transparent my-4"></div>}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-[#3A86FF] transition-colors">{step.title}</h3>
                                    <p className="text-white/40 leading-relaxed font-light">{step.description}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Objectives Column with Interactive Slider */}
                <ObjectivesWithSlider />
            </div>
        </div>
    );
};
