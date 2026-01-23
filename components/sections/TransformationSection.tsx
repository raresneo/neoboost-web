import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { StaggeredText } from '../ui/StaggeredText';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { BioMetricsGraph } from '../visuals/BioMetricsGraph';
import { TRANSFORMATIONS } from '../../constants';
import { Quote } from 'lucide-react';

export const TransformationSection = () => {
    const [activeId, setActiveId] = useState(TRANSFORMATIONS[0].id);
    const activeData = TRANSFORMATIONS.find(t => t.id === activeId) || TRANSFORMATIONS[0];

    return (
        <section id="rezultate" className="py-24 md:py-40 bg-[#020202] relative z-10 scroll-mt-20 border-t border-white/5">
            <div className="container mx-auto px-6 md:px-24">

                <ScrollReveal className="mb-20 text-center">
                    <p className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-bold uppercase mb-4">Rezultate Validate</p>
                    <h2 className="text-5xl md:text-7xl font-black impact-font text-white uppercase tracking-tight">
                        Transformare <span className="text-transparent" style={{ WebkitTextStroke: '1px #3A86FF' }}>Vizibilă.</span>
                    </h2>
                </ScrollReveal>

                {/* Tabs / Switcher if multiple */}
                <div className="flex justify-center mb-16 gap-4">
                    {TRANSFORMATIONS.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setActiveId(t.id)}
                            className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm font-bold uppercase tracking-wider ${activeId === t.id ? 'bg-[#3A86FF] border-[#3A86FF] text-black' : 'bg-transparent border-white/20 text-white/50 hover:border-white/50'}`}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left: Slider */}
                    <ScrollReveal>
                        <BeforeAfterSlider
                            beforeImage={activeData.imageBefore}
                            afterImage={activeData.imageAfter}
                        />
                        <div className="flex justify-between mt-4 text-xs font-bold mono-font text-white/40 uppercase tracking-widest">
                            <span>Săptămâna 1</span>
                            <span>Săptămâna {parseInt(activeData.duration)}</span>
                        </div>
                    </ScrollReveal>

                    {/* Right: Data */}
                    <ScrollReveal delay={200}>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-3xl font-black text-white mb-2">{activeData.name}</h3>
                                <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
                                    <span className="bg-white/10 px-3 py-1 rounded text-[#3A86FF] border border-[#3A86FF]/20">
                                        Pachet: {activeData.package}
                                    </span>
                                    <span className="bg-white/5 px-3 py-1 rounded text-white/60">
                                        Durata: {activeData.duration}
                                    </span>
                                </div>
                            </div>

                            <p className="text-white/60 italic text-lg leading-relaxed border-l-2 border-[#3A86FF] pl-6 relative">
                                <Quote className="absolute -top-2 -left-2 text-[#3A86FF] opacity-20" size={24} />
                                "{activeData.quote}"
                            </p>

                            <BioMetricsGraph
                                weight={activeData.metrics.weight}
                                bodyFat={activeData.metrics.bodyFat}
                                muscle={activeData.metrics.muscle}
                            />

                            <div className="flex items-center gap-3 bg-[#3A86FF]/10 border border-[#3A86FF]/20 p-4 rounded-xl">
                                <div className="w-2 h-2 bg-[#00F5FF] rounded-full animate-pulse"></div>
                                <p className="text-[#00F5FF] text-xs font-bold uppercase tracking-wide">
                                    Rezultat verificat prin analiză corporală 3D
                                </p>
                            </div>

                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
};
