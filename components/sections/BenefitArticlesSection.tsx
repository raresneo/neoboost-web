import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Target, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { BENEFIT_ARTICLES } from '../../constants';

// --- Benefit Articles Section ---
export const BenefitArticlesSection: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <section className={`py-24 bg-[var(--bg-secondary)] relative z-10 overflow-hidden ${className}`}>
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="text-center mb-24">
                        <p className="mono-font text-[10px] tracking-[0.5em] text-[var(--accent-primary)] font-bold uppercase mb-4">Science & Knowledge</p>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 uppercase text-glow">
                            Resurse <span className="text-[var(--accent-primary)]">Educaționale</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {BENEFIT_ARTICLES.map((article, idx) => {
                        return (
                            <div key={article.id} className="group flex flex-col h-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden hover:border-[var(--accent-primary)]/50 transition-all duration-500 shadow-xl hover:shadow-[var(--shadow-glow)]">
                                {/* Image Area */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-tertiary)] via-transparent to-transparent z-10 opacity-80"></div>
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white">{article.subtitle}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-display font-bold text-gray-900 uppercase mb-4 group-hover:text-[var(--accent-primary)] transition-colors">
                                        {article.title}
                                    </h3>

                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 line-clamp-3">
                                        {article.intro}
                                    </p>

                                    {/* Mini Grid for Mechanisms/Myths */}
                                    <div className="flex-1 space-y-3 mb-8">
                                        {article.mechanisms.slice(0, 2).map((mech, mIdx) => (
                                            <div key={mIdx} className="flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-white/5">
                                                <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[var(--accent-primary)] shrink-0"></div>
                                                <div>
                                                    <h4 className="text-gray-900 text-xs font-bold uppercase mb-1">{mech.title}</h4>
                                                    <p className="text-[var(--text-muted)] text-[10px] line-clamp-2">{mech.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer / CTA */}
                                    <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-6 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <Activity size={14} className="text-[var(--accent-primary)]" />
                                            <span className="text-[10px] font-bold uppercase text-[var(--text-muted)]">Verified Science</span>
                                        </div>
                                        <Link to={`/articol/${article.id}`} className="group/btn flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest hover:text-blue-800 transition-colors">
                                            Citește Tot
                                            <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

