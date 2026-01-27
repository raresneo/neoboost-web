import React, { useState } from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TRANSFORMATIONS, TESTIMONIALS } from '../../constants';
import { Quote, Star } from 'lucide-react';
import { useDraggableScroll } from '../../lib/useDraggableScroll';

// --- Testimonial Props Interface ---
interface InlineTestimonialProps {
    testimonial: any;
    index: number;
}

// --- Testimonial Card for inline use ---
const InlineTestimonial: React.FC<InlineTestimonialProps> = ({ testimonial, index }) => (
    <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col gap-3 min-w-[280px] md:min-w-[350px]">
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-[#3A86FF] text-[#3A86FF]" />)}
        </div>
        <p className="text-white/70 text-xs italic leading-relaxed">"{testimonial.text || testimonial.quote}"</p>
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#3A86FF]/20 flex items-center justify-center text-[#3A86FF] font-bold text-[10px]">
                {testimonial.author?.[0] || testimonial.name?.[0]}
            </div>
            <div>
                <p className="text-white font-bold text-[10px] uppercase tracking-wider">{testimonial.author || testimonial.name}</p>
                <p className="text-white/40 text-[8px] uppercase">{testimonial.role}</p>
            </div>
        </div>
    </div>
);

export const TransformationSection = ({ showHeader = true }: { showHeader?: boolean }) => {
    const [visibleCount, setVisibleCount] = useState(4);
    const visibleData = TRANSFORMATIONS.slice(0, visibleCount);

    const scrollRef = useDraggableScroll();
    const reviewScrollRef = useDraggableScroll();

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    return (
        <section id="rezultate" className="py-8 lg:py-[5vh] bg-transparent relative z-10 scroll-mt-20 border-t border-white/5 flex flex-col justify-center">
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

                {/* Transformations Slider */}
                <div ref={scrollRef} className="flex gap-6 md:gap-12 overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar overscroll-x-contain cursor-grab active:cursor-grabbing items-start">
                    {visibleData.map((data) => (
                        <div key={data.id} className="group min-w-[85vw] md:min-w-[450px] snap-center flex-shrink-0">
                            {/* Comparison Card */}
                            <div className={`relative w-full ${data.aspectRatio || 'aspect-[4/5]'} flex rounded-[2rem] border-none transition-colors gradient-border-spin overflow-hidden`}>
                                <div className="w-1/2 h-full relative overflow-hidden border-r border-white/10 rounded-l-2xl">
                                    <img src={data.imageBefore} alt={`${data.name} Before`} className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute bottom-3 left-0 right-0 text-center z-10"><span className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] tracking-[0.2em] text-white/50 font-medium">BEFORE</span></div>
                                </div>
                                <div className="w-1/2 h-full relative overflow-hidden rounded-r-2xl">
                                    <img src={data.imageAfter} alt={`${data.name} After`} className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute bottom-3 left-0 right-0 text-center z-10"><span className="bg-[#3A86FF]/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] tracking-[0.2em] text-white font-bold shadow-lg">AFTER</span></div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 px-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-black text-white mb-1 uppercase impact-font tracking-tight">{data.name}</h3>
                                        <div className="flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-wider">
                                            <span className="bg-[#3A86FF]/10 px-2 py-0.5 rounded text-[#3A86FF] border border-[#3A86FF]/20">{data.package}</span>
                                            <span className="bg-white/5 px-2 py-0.5 rounded text-white/60">{data.duration}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-0.5">Rezultat</div>
                                        <div className="text-[#00F5FF] font-black text-base uppercase impact-font">Validat</div>
                                    </div>
                                </div>
                                <p className="text-white/60 italic text-xs leading-relaxed border-l-2 border-[#3A86FF] pl-4 relative">"{data.quote}"</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* TESTIMONIALS SUB-SECTION */}
                <div className="mt-12 border-t border-white/5 pt-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                        <h3 className="text-xl font-black impact-font text-white uppercase tracking-widest flex items-center gap-3">
                            <Quote size={16} className="text-[#3A86FF]" />
                            Ce spun clienții
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
                    </div>

                    <div ref={reviewScrollRef} className="flex gap-4 overflow-x-auto pb-4 no-scrollbar overscroll-x-contain cursor-grab active:cursor-grabbing">
                        {TESTIMONIALS.map((t, i) => (
                            <InlineTestimonial key={i} testimonial={t} index={i} />
                        ))}
                    </div>
                </div>

                {visibleCount < TRANSFORMATIONS.length && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-transparent border border-[#3A86FF] text-[#3A86FF] hover:bg-[#3A86FF] hover:text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-300 transform hover:scale-105"
                        >
                            Vezi mai multe cazuri
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
