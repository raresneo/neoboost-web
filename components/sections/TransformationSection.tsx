import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { StaggeredText } from '../ui/StaggeredText';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { BioMetricsGraph } from '../visuals/BioMetricsGraph';
import { TRANSFORMATIONS } from '../../constants';
import { Quote } from 'lucide-react';

export const TransformationSection = () => {
    const [visibleCount, setVisibleCount] = useState(4);
    const visibleData = TRANSFORMATIONS.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    return (
        <section id="rezultate" className="py-24 md:py-40 bg-[#020202] relative z-10 scroll-mt-20 border-t border-white/5">
            <div className="container mx-auto px-6 md:px-24">

                <ScrollReveal className="mb-20 text-center">
                    <p className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-bold uppercase mb-4">Rezultate Validate</p>
                    <h2 className="text-5xl md:text-7xl font-black impact-font text-white uppercase tracking-tight">
                        Transformare <span className="text-transparent" style={{ WebkitTextStroke: '1px #3A86FF' }}>Vizibilă.</span>
                    </h2>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
                    {visibleData.map((data, idx) => (
                        <div key={data.id} className="group">
                            {/* Slider */}
                            <div className={`relative w-full ${data.aspectRatio || 'aspect-[4/5]'} flex rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-[#3A86FF]/30 transition-colors`}>
                                {/* Left Half - BEFORE */}
                                <div className="w-1/2 h-full relative overflow-hidden border-r border-white/10">
                                    <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[9px] tracking-widest text-white/60 font-bold border border-white/10">BEFORE</div>
                                    <img
                                        src={data.imageBefore}
                                        alt={`${data.name} Before`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            ...data.styleBefore,
                                            transform: (data as any).shouldFlipBefore ? 'scaleX(-1)' : undefined
                                        }}
                                        loading="lazy"
                                    />
                                </div>
                                {/* Right Half - AFTER */}
                                <div className="w-1/2 h-full relative overflow-hidden">
                                    <div className="absolute top-3 right-3 z-10 bg-[#3A86FF]/90 px-2 py-0.5 rounded text-[9px] tracking-widest text-white font-bold shadow-[0_0_10px_rgba(58,134,255,0.4)]">AFTER</div>
                                    <img
                                        src={data.imageAfter}
                                        alt={`${data.name} After`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            ...data.styleAfter,
                                            transform: (data as any).shouldFlipAfter ? 'scaleX(-1)' : undefined
                                        }}
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-6 px-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-black text-white mb-2">{data.name}</h3>
                                        <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
                                            <span className="bg-[#3A86FF]/10 px-2 py-1 rounded text-[#3A86FF] border border-[#3A86FF]/20">
                                                {data.package}
                                            </span>
                                            <span className="bg-white/5 px-2 py-1 rounded text-white/60">
                                                {data.duration}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Mini Metrics Summary */}
                                    <div className="text-right">
                                        <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">Rezultat</div>
                                        <div className="text-[#00F5FF] font-black text-lg">
                                            {/* Show the most impressive metric diff if available, else generic */}
                                            Done
                                        </div>
                                    </div>
                                </div>

                                <p className="text-white/60 italic text-sm leading-relaxed border-l-2 border-[#3A86FF] pl-4 relative">
                                    "{data.quote}"
                                </p>

                                {/* Compact Metrics */}
                                <div className="space-y-3 pt-2">
                                    {Object.entries(data.metrics).map(([key, metric]) => {
                                        if (!metric) return null;
                                        // Calculate diff relative to start: End - Start. 
                                        // Negative = Loss (Good for weight), Positive = Gain (Good for muscle)
                                        const diff = metric.end - metric.start;
                                        const isPositive = diff > 0;

                                        // Format: e.g. -4.1 or +2.5
                                        const formattedDiff = `${isPositive ? '+' : ''}${diff.toFixed(1)}`;

                                        // Color logic: 
                                        // If Muscle => Gain is Good (Blue - #00F5FF), Loss is Bad/Neutral
                                        // If Fat/Weight => Loss is Good (Blue), Gain is Bad (Red maybe? or just White)
                                        // For simplicity, let's keep Blue for "Good" direction if we can infer it, otherwise neutral.
                                        // Actually, let's just color the difference distinctively regardless of good/bad for now, or match the user's "Cool" aesthetic.
                                        // User screenshot had NEGATIVE in BLUE. Alex D had POSITIVE in BLUE.
                                        // So let's make the difference ALWAYS Blue (#00F5FF) for consistency with the design language.

                                        return (
                                            <div key={key} className="flex justify-between items-center text-xs">
                                                <span className="text-white/40 uppercase font-bold w-20">{metric.label || key}</span>
                                                <div className="flex-1 mx-3 h-1 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#3A86FF]"
                                                        style={{ width: `${(metric.end / metric.start) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-white font-mono">
                                                    {metric.end} {metric.unit}
                                                    <span className="text-[#00F5FF] ml-1">({formattedDiff})</span>
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount < TRANSFORMATIONS.length && (
                    <div className="mt-20 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-transparent border border-[#3A86FF] text-[#3A86FF] hover:bg-[#3A86FF] hover:text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-105"
                        >
                            Vezi mai multe
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};
