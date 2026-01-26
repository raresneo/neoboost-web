import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { StaggeredText } from '../ui/StaggeredText';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { BioMetricsGraph } from '../visuals/BioMetricsGraph';
import { TRANSFORMATIONS } from '../../constants';
import { Quote } from 'lucide-react';
import { useDraggableScroll } from '../../lib/useDraggableScroll';

export const TransformationSection = ({ showHeader = true }: { showHeader?: boolean }) => {
    const [visibleCount, setVisibleCount] = useState(4);
    const visibleData = TRANSFORMATIONS.slice(0, visibleCount);

    const scrollRef = useDraggableScroll();

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    return (
        <section id="rezultate" className="py-8 lg:py-[5vh] bg-transparent relative z-10 scroll-mt-20 border-t border-white/5 h-full flex flex-col justify-center">
            <div className="container mx-auto px-6 md:px-24">

                {showHeader && (
                    <ScrollReveal className="mb-8 text-center">
                        <p className="mono-font text-[9px] tracking-[0.5em] text-[#3A86FF] font-bold uppercase mb-2">Rezultate Validate</p>
                        <h2 className="text-3xl md:text-5xl font-black impact-font text-white uppercase tracking-tight">
                            Transformare <span className="text-transparent" style={{ WebkitTextStroke: '1px #3A86FF' }}>Vizibilă.</span>
                        </h2>
                        <p className="mt-4 text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            Nu promitem miracole peste noapte, ci <span className="text-white font-medium">rezultate măsurabile</span>.
                            Fără filtre, fără scurtături—doar știință și disciplină.
                        </p>
                    </ScrollReveal>
                )}

                <div ref={scrollRef} className="flex gap-6 md:gap-12 overflow-x-auto pb-12 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar overscroll-x-contain cursor-grab active:cursor-grabbing items-start">
                    {visibleData.map((data, idx) => (
                        <div key={data.id} className="group min-w-[85vw] md:min-w-[450px] snap-center flex-shrink-0">
                            {/* Slider */}
                            <div className={`relative w-full ${data.aspectRatio || 'aspect-[4/5]'} flex rounded-[2rem] border-none transition-colors gradient-border-spin overflow-hidden`}>
                                {/* Left Half - BEFORE */}
                                <div className="w-1/2 h-full relative overflow-hidden border-r border-white/10 rounded-l-2xl">
                                    <img
                                        src={data.imageBefore}
                                        alt={`${data.name} Before`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            ...data.styleBefore,
                                            transform: [
                                                data.styleBefore?.transform || '',
                                                (data as any).shouldFlipBefore ? 'scaleX(-1)' : ''
                                            ].filter(Boolean).join(' ') || undefined
                                        }}
                                        loading="lazy"
                                    />
                                    <div className="absolute bottom-3 left-0 right-0 text-center z-10">
                                        <span className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] tracking-[0.2em] text-white/50 font-medium">BEFORE</span>
                                    </div>
                                </div>
                                {/* Right Half - AFTER */}
                                <div className="w-1/2 h-full relative overflow-hidden rounded-r-2xl">
                                    <img
                                        src={data.imageAfter}
                                        alt={`${data.name} After`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            ...data.styleAfter,
                                            transform: [
                                                data.styleAfter?.transform || '',
                                                (data as any).shouldFlipAfter ? 'scaleX(-1)' : '',
                                                data.imageBefore === data.imageAfter ? 'translateX(-50%)' : ''
                                            ].filter(Boolean).join(' ') || undefined
                                        }}
                                        loading="lazy"
                                    />
                                    <div className="absolute bottom-3 left-0 right-0 text-center z-10">
                                        <span className="bg-[#3A86FF]/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] tracking-[0.2em] text-white font-bold shadow-lg">AFTER</span>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-6 px-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-black text-white mb-1 uppercase impact-font tracking-tight">{data.name}</h3>
                                        <div className="flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-wider">
                                            <span className="bg-[#3A86FF]/10 px-2 py-0.5 rounded text-[#3A86FF] border border-[#3A86FF]/20">
                                                {data.package}
                                            </span>
                                            <span className="bg-white/5 px-2 py-0.5 rounded text-white/60">
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

                                <p className="text-white/60 italic text-xs leading-relaxed border-l-2 border-[#3A86FF] pl-4 relative">
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
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-transparent border border-[#3A86FF] text-[#3A86FF] hover:bg-[#3A86FF] hover:text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-300 transform hover:scale-105"
                        >
                            Vezi mai multe
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};
