import React, { useState } from 'react';
import { RICH_TRANSFORMATIONS, TESTIMONIALS } from '../../constants';
import { Star, Quote, ArrowDown, ChevronDown, CheckCircle2 } from 'lucide-react';
import { CountUp } from '../ui/CountUp';
import { DualToneImage } from '../ui/DualToneImage';
import { Button } from '../ui/Button';

export const TransformationSection = () => {
    const [visibleCount, setVisibleCount] = useState(10); // Show all models by default

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 2);
    };

    return (
        <section id="rezultate" className="py-24 bg-[var(--bg-primary)] relative z-20 border-t border-[var(--border-subtle)]">
            <div className="container mx-auto px-6 lg:px-24 relative z-30">

                {/* Header */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-xs font-bold tracking-widest uppercase mb-6">
                        <CheckCircle2 size={14} />
                        <span>Eficiență Validată</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                        Transformări <span className="text-[var(--accent-primary)]">Reale.</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                        Nu promitem miracole peste noapte, ci rezultate măsurabile obținute prin știință și consecvență.
                    </p>
                </div>

                {/* Transformations Stack */}
                <div className="flex flex-col gap-24 mb-32">
                    {RICH_TRANSFORMATIONS.slice(0, visibleCount).map((item, idx) => (
                        <div key={item.id} className="group relative bg-[var(--bg-secondary)] rounded-[var(--radius-2xl)] overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-colors shadow-2xl">
                            <div className="flex flex-col lg:flex-row">

                                {/* Image Area - 60% */}
                                <div className="lg:w-[60%] relative h-[500px] lg:h-auto overflow-hidden bg-black/50 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]">
                                    {item.images.isCombined ? (
                                        /* SINGLE ORIGINAL IMAGE VIEW (For Combined Sprites) */
                                        <div className="relative h-full w-full flex items-center justify-center bg-[#050505]">
                                            <img
                                                src={item.images.combined}
                                                alt={`${item.name} Transformation`}
                                                className="w-full h-full object-contain"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                                            {/* Tags */}
                                            <div className="absolute top-6 left-6 z-40 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-[10px] font-bold text-white uppercase border border-white/10 tracking-widest">Original Results</div>
                                            <div className="absolute bottom-6 right-6 z-40 bg-[var(--accent-primary)] px-3 py-1.5 rounded text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">Verified</div>
                                        </div>
                                    ) : (
                                        /* SPLIT SLIDER VIEW (For Separate Before/After) */
                                        <div className="flex h-full w-full">
                                            {/* LEFT SIDE: BEFORE */}
                                            <div className="w-1/2 relative h-full overflow-hidden border-r border-white/10 group-hover:border-[var(--accent-primary)]/30 transition-colors">
                                                <DualToneImage
                                                    src={item.images.before}
                                                    alt={`${item.name} Before`}
                                                    className="w-full h-full"
                                                    style={{ objectFit: 'cover' }}
                                                    intensity="subtle"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none"></div>
                                                <div className="absolute top-6 left-6 z-40 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-[10px] font-bold text-white uppercase border border-white/10 tracking-widest">Before</div>
                                            </div>

                                            {/* RIGHT SIDE: AFTER */}
                                            <div className="w-1/2 relative h-full overflow-hidden">
                                                <DualToneImage
                                                    src={item.images.after}
                                                    alt={`${item.name} After`}
                                                    className="w-full h-full"
                                                    style={{ objectFit: 'cover' }}
                                                    intensity="none" // Real colors for AFTER
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-l from-[var(--accent-primary)]/20 via-transparent to-transparent pointer-events-none"></div>
                                                <div className="absolute top-6 right-6 z-40 bg-[var(--accent-primary)] px-3 py-1.5 rounded text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">After</div>
                                            </div>

                                            {/* Separation Line (Divider) */}
                                            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/20 z-30 pointer-events-none group-hover:bg-[var(--accent-primary)]/50 transition-colors shadow-[0_0_15px_rgba(58,134,255,0.3)]"></div>
                                        </div>
                                    )}
                                </div>

                                {/* Content Area - 40% */}
                                <div className="lg:w-[40%] p-8 md:p-12 flex flex-col justify-between relative bg-[var(--bg-secondary)]">

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <h3 className="text-3xl font-display font-bold text-white uppercase">{item.name}</h3>
                                            <div className="flex gap-2">
                                                <span className="px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 rounded text-[10px] font-bold uppercase tracking-wider">{item.program}</span>
                                                <span className="px-3 py-1 bg-white/5 text-[var(--text-secondary)] border border-white/10 rounded text-[10px] font-bold uppercase tracking-wider">{item.duration}</span>
                                            </div>
                                        </div>

                                        <div className="relative mb-12 pl-6 border-l-2 border-[var(--accent-primary)]">
                                            <Quote size={20} className="absolute -top-3 -left-2.5 text-[var(--accent-primary)] bg-[var(--bg-secondary)]" />
                                            <p className="text-lg text-[var(--text-secondary)] italic font-light leading-relaxed">"{item.quote}"</p>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 relative z-10">
                                        {item.stats.map((stat, sIdx) => (
                                            <div key={sIdx} className="bg-[var(--bg-tertiary)] p-4 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/30 transition-colors">
                                                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">{stat.label}</div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className={`text-sm font-medium text-[var(--text-disabled)] line-through`}>{stat.start}</span>
                                                    <ArrowDown size={12} className="text-[var(--text-muted)] -rotate-90" />
                                                    <div className={`text-xl font-bold ${stat.color === 'text-[#3A86FF]' ? 'text-[var(--accent-primary)]' : 'text-white'} flex items-center`}>
                                                        <CountUp start={stat.start} end={Number(stat.end)} suffix={stat.unit ? ` ${stat.unit}` : ''} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount < RICH_TRANSFORMATIONS.length && (
                    <div className="text-center mb-32">
                        <Button
                            variant="secondary"
                            onClick={handleLoadMore}
                            rightIcon={<ChevronDown size={14} />}
                        >
                            VEZI MAI MULTE REZULTATE
                        </Button>
                    </div>
                )}

                {/* REVIEWS SECTION */}
                <div className="border-t border-[var(--border-subtle)] pt-20">
                    <div className="text-center mb-16">
                        <h4 className="text-3xl font-display font-bold text-white uppercase mb-4">Ce spun clienții noștri</h4>
                        <div className="flex items-center justify-center gap-1 text-[var(--accent-primary)]">
                            <Star fill="currentColor" size={20} />
                            <Star fill="currentColor" size={20} />
                            <Star fill="currentColor" size={20} />
                            <Star fill="currentColor" size={20} />
                            <Star fill="currentColor" size={20} />
                            <span className="text-white font-bold ml-3 text-sm">5.0 / 5.0 pe Google</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((review, i) => (
                            <div key={i} className="bg-[var(--bg-secondary)] p-8 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] relative group hover:border-[var(--accent-primary)] hover:-translate-y-1 transition-all">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--bg-tertiary)]">
                                        <img src={review.imageUrl} alt={review.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-sm">{review.name}</div>
                                        <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{review.role}</div>
                                    </div>
                                    <a href={review.link} target="_blank" rel="noopener noreferrer" className="ml-auto opacity-50 hover:opacity-100 transition-opacity">
                                        <img src="/google_icon.png" alt="Google" className="w-5 h-5 invert opacity-70" />
                                    </a>
                                </div>
                                <div className="flex gap-0.5 mb-4 text-[var(--accent-primary)]">
                                    {[...Array(5)].map((_, starI) => (
                                        <Star key={starI} size={14} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-4 group-hover:line-clamp-none transition-all">"{review.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
