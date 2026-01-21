import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Target } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { BENEFIT_ARTICLES } from '../../constants';

// --- Benefit Articles Section ---
export const BenefitArticlesSection: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <section className={`py-20 bg-black relative z-10 ${className}`}>
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="text-center mb-24">
                        <p className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-bold uppercase mb-4">Science & Solutions</p>
                        <h2 className="text-4xl md:text-5xl font-black impact-font text-white uppercase">
                            Explicații <span className="text-[#3A86FF]">Științifice</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="space-y-32">
                    {BENEFIT_ARTICLES.map((article, idx) => (
                        <div key={article.id} id={article.id} className="scroll-mt-40">
                            <ScrollReveal delay={idx * 100}>
                                <div className="grid lg:grid-cols-[1fr_2fr] gap-12 border-t border-white/10 pt-16">
                                    {/* Header Column */}
                                    <div className="lg:sticky top-40 self-start">
                                        {/* Article Image - Newly Added */}
                                        {article.image && (
                                            <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 relative group">
                                                <div className="absolute inset-0 bg-[#3A86FF]/20 mix-blend-overlay z-10"></div>
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-64 object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out grayscale hover:grayscale-0"
                                                />
                                            </div>
                                        )}

                                        <Link to={`/articol/${article.id}`} className="block group-hover:text-[#3A86FF] transition-colors">
                                            <h3 className="text-4xl md:text-5xl font-black impact-font text-white mb-2 uppercase group-hover:underline decoration-[#3A86FF]/50 underline-offset-8 decoration-4">{article.title}</h3>
                                        </Link>
                                        <p className="text-[#3A86FF] mono-font text-xs font-bold tracking-widest uppercase mb-6">{article.subtitle}</p>
                                        <div className="text-white/40 text-sm leading-relaxed font-light">
                                            {article.intro}
                                        </div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="space-y-12">
                                        {/* Mechanisms */}
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {article.mechanisms.map((mech, mIdx) => (
                                                <div key={mIdx} className="bg-white/[0.02] border border-white/5 p-6 hover:border-[#3A86FF]/20 transition-colors duration-500">
                                                    <h4 className="text-white font-bold impact-font uppercase mb-3 text-lg">{mech.title}</h4>
                                                    <p className="text-white/50 text-xs leading-relaxed">{mech.desc}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Science & Expectations */}
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Activity size={16} className="text-[#3A86FF]" />
                                                    <h4 className="font-bold text-white uppercase text-sm tracking-wider">Ce spune știința</h4>
                                                </div>
                                                <p className="text-white/60 text-sm leading-relaxed pl-7 border-l border-[#3A86FF]/20">{article.science}</p>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Target size={16} className="text-[#3A86FF]" />
                                                    <h4 className="font-bold text-white uppercase text-sm tracking-wider">Așteptări Corecte</h4>
                                                </div>
                                                <p className="text-white/60 text-sm leading-relaxed pl-7 border-l border-[#3A86FF]/20">{article.expectations}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
