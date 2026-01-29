import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Target } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { BENEFIT_ARTICLES } from '../../constants';
// --- Benefit Articles Section ---
export const BenefitArticlesSection: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <section className={`py-20 bg-[var(--bg-secondary)] relative z-10 overflow-hidden ${className}`}>
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="text-center mb-32">
                        <p className="mono-font text-[10px] tracking-[0.5em] text-[var(--accent-primary)] font-bold uppercase mb-4">Science & Solutions</p>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">
                            Explicații <span className="text-[var(--accent-primary)]">Științifice</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="space-y-40">
                    {BENEFIT_ARTICLES.map((article, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div key={article.id} id={article.id} className="scroll-mt-40">
                                <ScrollReveal>
                                    <div className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                                        {/* Image Column (Flashcard Style) */}
                                        <div className={`w-full lg:w-1/2 relative group ${isEven ? 'reveal-left' : 'reveal-right'}`}>
                                            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] shadow-2xl hover:shadow-[var(--shadow-glow)] transition-all duration-700 h-[400px] md:h-[500px]">
                                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10"></div>
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                                                />

                                                {/* Floating Badge */}
                                                <div className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">{article.id.split('-').join(' ')}</span>
                                                </div>

                                                {/* Bottom Overlay Info */}
                                                <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    <p className="text-[var(--accent-primary)] mono-font text-xs font-bold tracking-widest uppercase mb-2">{article.subtitle}</p>
                                                    <h3 className="text-3xl font-display font-bold text-white uppercase leading-none">{article.title}</h3>
                                                </div>
                                            </div>

                                            {/* Decorative Elements behind */}
                                            <div className={`absolute -z-10 w-full h-full top-4 ${isEven ? '-left-4' : '-right-4'} border border-[var(--accent-primary)]/20 rounded-[2rem] bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                                        </div>

                                        {/* Content Column */}
                                        <div className={`w-full lg:w-1/2 space-y-10 ${isEven ? 'reveal-right' : 'reveal-left'}`}>
                                            <div>
                                                <div className="w-12 h-1 bg-[var(--accent-primary)] mb-6"></div>
                                                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 uppercase leading-tight">
                                                    {article.title}
                                                </h3>
                                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-light border-l-2 border-[var(--border-visible)] pl-6">
                                                    {article.intro}
                                                </p>
                                            </div>

                                            {/* Mechanisms Grid */}
                                            <div className="grid gap-4">
                                                {article.mechanisms.map((mech, mIdx) => (
                                                    <div key={mIdx} className="bg-[var(--bg-tertiary)]/50 border border-[var(--border-subtle)] p-5 rounded-xl hover:border-[var(--accent-primary)]/30 transition-colors group/card">
                                                        <h4 className="text-white font-bold font-display uppercase mb-2 text-sm flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
                                                            {mech.title}
                                                        </h4>
                                                        <p className="text-[var(--text-muted)] text-xs leading-relaxed pl-3.5 group-hover/card:text-[var(--text-secondary)] transition-colors">{mech.desc}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Science & Expectations Quick Look */}
                                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[var(--border-subtle)]">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Activity size={16} className="text-[var(--accent-primary)]" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Știință</span>
                                                    </div>
                                                    <p className="text-[var(--text-muted)] text-xs line-clamp-3 hover:line-clamp-none transition-all cursor-default">
                                                        {article.science}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Target size={16} className="text-[var(--accent-primary)]" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Așteptări</span>
                                                    </div>
                                                    <p className="text-[var(--text-muted)] text-xs line-clamp-3 hover:line-clamp-none transition-all cursor-default">
                                                        {article.expectations}
                                                    </p>
                                                </div>
                                            </div>

                                            <Link to={`/articol/${article.id}`}>
                                                <button className="mt-8 px-8 py-3 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-[var(--accent-primary)] hover:text-white transition-colors duration-300 rounded-lg">
                                                    Citește tot Articolul
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
