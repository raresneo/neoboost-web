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
                    <span className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase">Standard de Performanță</span>
                </div>
                <div className="text-6xl md:text-8xl font-display font-bold text-white mb-24">
                    <StaggeredText text="CUM FUNCȚIONEAZĂ" className="block" />
                    <StaggeredText text="PROTOCOLUL EMS." className="block text-[#3A86FF]" delay={200} />
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
