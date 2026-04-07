import React, { useState } from 'react';
import { RICH_TRANSFORMATIONS, TESTIMONIALS, MIXED_REVIEWS } from '../../constants';
import { Star, Quote, ArrowDown, ChevronDown, CheckCircle2 } from 'lucide-react';
import { CountUp } from '../ui/CountUp';
import { DualToneImage } from '../ui/DualToneImage';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TextScramble } from '../ui/TextScramble';
import { SpotlightCard } from '../ui/SpotlightCard';
import { ReviewCard } from '../ui/ReviewCard';
import { ComparisonSlider } from '../ui/ComparisonSlider';
import { SnapCarousel } from '../ui/SnapCarousel';
import { StackCarousel } from '../ui/StackCarousel';
import { TypingHeading } from '../ui/TypingHeading';

export const TransformationSection = () => {
    // const [visibleCount, setVisibleCount] = useState(10); // Removed for Carousel
    // show all by default in carousel

    return (
        <section className="py-24 bg-white relative z-20 border-t border-gray-100">
            <div className="container mx-auto px-6 lg:px-24 relative z-30">

                {/* Header */}
                <ScrollReveal className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-widest uppercase mb-6">
                        <CheckCircle2 size={14} />
                        <span>Eficiență Validată</span>
                    </div>
                    <TypingHeading
                        text="Rezultate reale ale clienților NeoBoost"
                        highlightText="NeoBoost"
                        highlightColor="text-brand"
                        className="text-4xl md:text-6xl font-display font-black text-gray-900 mb-6 leading-tight tracking-tight"
                    />
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto font-medium">
                        Clienții NeoBoost vin cu obiective diferite – de la slăbire și tonifiere, până la revenirea în formă după perioade mai sedentare. Mai jos sunt câteva exemple de transformări obținute cu ajutorul antrenamentelor EMS.
                    </p>
                </ScrollReveal>

                {/* Transformations Carousel (Holo Style) */}
                <div className="mb-32">
                    <SnapCarousel itemWidth="min-w-[90vw] md:min-w-[900px]">
                        {RICH_TRANSFORMATIONS.map((item, idx) => (
                            <div key={item.id} className="pb-8 pl-1">
                                <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all h-full flex flex-col lg:flex-row">

                                    {/* Image Area - 55% */}
                                    <div className="lg:w-[55%] relative h-[400px] md:h-[500px] lg:h-auto overflow-hidden bg-gray-50">
                                        {item.images.isCombined ? (
                                            /* SINGLE ORIGINAL IMAGE VIEW */
                                            <div className="relative h-full w-full flex items-center justify-center bg-gray-50 group-hover:scale-105 transition-transform duration-700">
                                                <img
                                                    src={item.images.combined}
                                                    alt={`${item.name} Transformation`}
                                                    className="w-full h-full object-contain"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent pointer-events-none"></div>
                                                <div className="absolute top-6 left-6 z-40 bg-white/90 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded text-[8px] md:text-[10px] font-bold text-gray-900 uppercase border border-gray-200 tracking-widest shadow-sm">Original Results</div>
                                                <div className="absolute bottom-6 right-6 z-40 bg-brand px-2 py-1 md:px-3 md:py-1.5 rounded text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">Verified</div>
                                            </div>
                                        ) : (
                                            /* COMPARISON SLIDER VIEW */
                                            <div className="h-full w-full group-hover:scale-[1.02] transition-transform duration-700">
                                                <ComparisonSlider
                                                    beforeImage={(item.images as any).before}
                                                    afterImage={(item.images as any).after}
                                                    beforeLabel="Start"
                                                    afterLabel="Rezultat"
                                                    className="h-full"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Area - 45% */}
                                    <div className="lg:w-[45%] p-5 md:p-10 flex flex-col justify-between relative bg-white">

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4 mb-6">
                                                <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 uppercase">{item.name}</h3>
                                                <div className="flex gap-2">
                                                    <span className="px-3 py-1 bg-brand/10 text-brand border border-brand/20 rounded text-[10px] font-bold uppercase tracking-wider">{item.program}</span>
                                                    <span className="px-3 py-1 bg-gray-50 text-gray-500 border border-gray-100 rounded text-[10px] font-bold uppercase tracking-wider">{item.duration}</span>
                                                </div>
                                            </div>

                                            <div className="relative mb-8 pl-6 border-l-2 border-brand">
                                                <Quote size={20} className="absolute -top-3 -left-2.5 text-brand bg-white" />
                                                <p className="text-base text-gray-500 italic font-light leading-relaxed">"{item.quote}"</p>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 gap-3 relative z-10">
                                            {item.stats.map((stat, sIdx) => (
                                                <div key={sIdx} className="bg-gray-50 p-4 rounded-2xl hover:bg-brand/5 transition-colors">
                                                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">{stat.label}</div>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className={`text-xs font-medium text-gray-300 line-through`}>{stat.start}</span>
                                                        <ArrowDown size={12} className="text-gray-400 -rotate-90" />
                                                        <div className={`text-lg font-bold ${stat.color === 'text-[#3A86FF]' ? 'text-brand' : 'text-gray-900'} flex items-center`}>
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
                    </SnapCarousel>
                </div>

                {/* REVIEWS SECTION */}
                <div className="border-t border-gray-100 pt-24">
                    <ScrollReveal className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold tracking-widest uppercase mb-6">
                            <Star size={14} fill="currentColor" />
                            <span>Rezultate Dovedite</span>
                        </div>
                        <TypingHeading
                            text="Ce spun membrii NeoBoost"
                            highlightText="NeoBoost"
                            highlightColor="text-brand"
                            className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] uppercase mb-4"
                        />
                        <div className="flex items-center justify-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} fill="currentColor" size={24} />
                            ))}
                            <span className="text-[var(--text-primary)] font-bold ml-3 text-lg">5.0 / 5.0 pe Google</span>
                        </div>
                    </ScrollReveal>

                    {/* MIXED 3D REVIEWS CAROUSEL */}
                    <div className="relative py-12">
                        {/* 3D Stack Carousel Implementation */}
                        <StackCarousel>
                            {MIXED_REVIEWS.map((review, i) => (
                                <ReviewCard key={i} review={review} />
                            ))}
                        </StackCarousel>
                    </div>

                    <div className="text-center mt-8">
                        <a
                            href="https://www.google.com/search?q=neoboost+oradea+recenzii"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brand transition-colors uppercase tracking-widest border-b border-transparent hover:border-brand pb-0.5"
                        >
                            Vezi toate recenziile Google <ArrowDown size={14} className="-rotate-90" />
                        </a>
                    </div>

                </div>

            </div>
        </section>
    );
};
