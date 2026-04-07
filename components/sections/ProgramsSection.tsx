import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Target, Zap, Check, CheckCircle2 } from 'lucide-react';
import { PROGRAMS, MONTHLY_PACKAGES, BRAND } from '../../constants';
import { useStripeCheckout } from '../../lib/useStripeCheckout';
import { Session } from '@supabase/supabase-js';
import { Button } from '../ui/Button';
import { SpotlightCard } from '../ui/SpotlightCard';
import { TextScramble } from '../ui/TextScramble';
import { RevealText } from '../ui/RevealText';
import { TypingHeading } from '../ui/TypingHeading';

export const ProgramsSection = ({ showSpecializedPrograms = true }: { showSpecializedPrograms?: boolean }) => {
    const { session } = useOutletContext<{ session: Session | null }>();
    const { handleCheckout, isLoading } = useStripeCheckout();

    const currentPackages = MONTHLY_PACKAGES;

    return (
        <section id="programe" className="py-24 scroll-mt-32 bg-gray-50 relative z-20">
            <div className="container mx-auto px-6 lg:px-24">

                {/* Header */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-widest uppercase mb-6">
                        <CheckCircle2 size={14} />
                        <span>Planuri Flexibile</span>
                    </div>
                    <RevealText
                        text="Investește în Tine."
                        as="h2"
                        mode="char"
                        stagger={0.03}
                        className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-6 leading-tight uppercase italic"
                    />
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-12">
                        Alege pachetul de electrostimulare musculară care ți se potrivește. Fără costuri ascunse.
                    </p>


                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 auto-rows-fr">
                    {currentPackages.map((pkg, i) => (
                        <SpotlightCard
                            key={i}
                            spotlightColor={pkg.isRecommended ? "rgba(59, 130, 246, 0.15)" : "rgba(0, 0, 0, 0.03)"}
                            className={`p-6 md:p-10 rounded-[2.5rem] flex flex-col transition-all duration-500 relative overflow-hidden ${pkg.isRecommended ? 'bg-gradient-to-b from-white to-blue-50/30 border border-blue-200 shadow-[0_30px_60px_-15px_rgba(59,130,246,0.15)] md:scale-105 z-10' : 'bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-premium hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:border-gray-300/50'}`}
                        >
                            {pkg.isRecommended && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-white text-[10px] font-bold uppercase px-4 py-1.5 rounded-full shadow-lg tracking-widest border border-white">
                                    Recomandat
                                </div>
                            )}

                            <div className="absolute -right-4 -top-4 opacity-[0.03] pointer-events-none select-none overflow-hidden">
                                <span className="font-display font-black text-[8rem] md:text-[10rem] text-black italic tracking-tighter leading-none">
                                    {pkg.sessionCount.split(' ')[0]}
                                </span>
                            </div>

                            <h4 className="text-[var(--text-primary)] font-display font-bold text-xl mb-1 uppercase tracking-wide relative z-10">{pkg.title}</h4>
                            <p className="text-brand text-xs font-bold uppercase tracking-widest mb-4 relative z-10">{pkg.sessionCount} Ședințe / lună</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-3xl font-bold text-[var(--text-primary)]">{pkg.price}</span>
                                <span className="text-xs font-bold text-gray-400 uppercase">RON</span>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {pkg.features.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-3 text-sm font-medium text-gray-600 leading-relaxed">
                                        <Check size={16} className="text-brand shrink-0 mt-0.5" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-gray-100/50">
                                <Button
                                    variant={pkg.isRecommended ? 'primary' : 'outline'}
                                    className={`w-full justify-center ${pkg.isRecommended ? 'shadow-lg' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                    onClick={() => handleCheckout(pkg.stripePriceId, pkg.price, pkg.title, session)}
                                    isLoading={isLoading}
                                >
                                    Cumpără Acum
                                </Button>
                                <button
                                    onClick={() => window.open(`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salut! Vreau să discut despre abonamentul ${pkg.title} (${pkg.sessionCount} ședințe/lună).`)}`, '_blank')}
                                    className="w-full py-3 border border-transparent text-gray-500 font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 rounded-xl hover:bg-gray-50/80 hover:text-gray-900 transition-all active:scale-95"
                                >
                                    💬 Discută despre abonament
                                </button>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>




                {/* PROGRAMS SECTION */}
                {showSpecializedPrograms && (
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <Target className="text-brand" size={20} />
                            <span className="text-xs font-bold tracking-widest text-brand uppercase">Programe Specializate</span>
                        </div>
                        <RevealText
                            text="Construiește-ți Corpul Ideal."
                            as="h2"
                            className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-16 uppercase italic"
                        />

                        <div className="grid lg:grid-cols-1 gap-12">
                            {PROGRAMS.map((prog, i) => (
                                <SpotlightCard key={prog.id} spotlightColor="rgba(59, 130, 246, 0.1)" className="group bg-white border border-gray-100 rounded-[2.5rem] flex flex-col md:flex-row hover:border-brand/30 transition-all shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] overflow-hidden">

                                    {/* Image */}
                                    <Link to={`/program/${prog.id}`} className="block relative md:w-2/5 lg:w-1/3 min-h-[300px] md:min-h-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors z-10"></div>
                                        <img
                                            src={prog.image}
                                            alt={prog.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className={`absolute top-6 left-6 z-20 ${prog.tagColor || 'bg-white text-brand'} px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg`}>
                                            {prog.tag}
                                        </div>
                                    </Link>

                                    {/* Content */}
                                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <span className="text-[10px] text-brand font-bold uppercase tracking-widest block mb-2">Obiectiv: {prog.idealFor}</span>
                                                    <Link to={`/program/${prog.id}`}>
                                                        <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--text-primary)] mb-2 uppercase group-hover:text-brand transition-colors">
                                                            {prog.title}
                                                        </h3>
                                                    </Link>
                                                </div>
                                            </div>

                                            <p className="text-brand text-xs font-bold uppercase tracking-widest mb-6 border-l-2 border-brand pl-3">
                                                {prog.subtitle}
                                            </p>

                                            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-2xl font-medium">
                                                {prog.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-4 items-center pt-8 border-t border-gray-100 mt-auto">
                                            <div className="mr-auto">
                                                {/* <span className="text-2xl font-bold text-white">{prog.price}</span> */}
                                            </div>
                                            <div className="flex w-full md:w-auto gap-4">
                                                <Link to={`/program/${prog.id}`} className="flex-1 md:flex-none">
                                                    <Button variant="secondary" className="w-full bg-gray-50 text-[var(--text-primary)] border-gray-200 hover:bg-gray-100 uppercase text-xs tracking-wider">
                                                        Detalii
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="primary"
                                                    className="flex-1 md:flex-none min-w-[170px] uppercase text-xs tracking-wider font-bold shadow-lg shadow-brand/20"
                                                    onClick={() => window.open(`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}?text=Salut! Sunt interesat de programul ${prog.title}`, '_blank')}
                                                >
                                                    Vreau Programul
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
