import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Target, Zap, Check, CheckCircle2 } from 'lucide-react';
import { PROGRAMS, MONTHLY_PACKAGES, QUARTERLY_PACKAGES } from '../../constants';
import { useStripeCheckout } from '../../lib/useStripeCheckout';
import { Session } from '@supabase/supabase-js';
import { Button } from '../ui/Button';

export const ProgramsSection = () => {
    const { session } = useOutletContext<{ session: Session | null }>();
    const { handleCheckout, isLoading } = useStripeCheckout();

    const [pricingPeriod, setPricingPeriod] = useState<'monthly' | 'quarterly'>('monthly');
    const currentPackages = pricingPeriod === 'monthly' ? MONTHLY_PACKAGES : QUARTERLY_PACKAGES;

    return (
        <section id="programe" className="py-24 bg-[var(--bg-primary)] relative z-20 border-t border-[var(--border-subtle)]">
            <div className="container mx-auto px-6 lg:px-24">

                {/* Header */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-xs font-bold tracking-widest uppercase mb-6">
                        <CheckCircle2 size={14} />
                        <span>Planuri Flexibile</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                        Investește în <span className="text-[var(--accent-primary)]">Tine.</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-12">
                        Alege pachetul care ți se potrivește. Fără costuri ascunse.
                    </p>

                    {/* Period Switcher */}
                    <div className="inline-flex bg-[var(--bg-tertiary)] p-1 rounded-xl border border-[var(--border-subtle)]">
                        <button
                            onClick={() => setPricingPeriod('monthly')}
                            className={`px-8 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${pricingPeriod === 'monthly' ? 'bg-[var(--accent-primary)] text-white shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
                        >
                            Lunar
                        </button>
                        <button
                            onClick={() => setPricingPeriod('quarterly')}
                            className={`px-8 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${pricingPeriod === 'quarterly' ? 'bg-[var(--accent-primary)] text-white shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}
                        >
                            3 Luni
                        </button>
                    </div>
                </div>

                {/* PRICING CARDS */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {currentPackages.map((pkg, i) => (
                        <div key={i} className={`relative p-8 rounded-[var(--radius-xl)] border flex flex-col transition-all duration-300 ${pkg.isRecommended ? 'bg-[var(--bg-secondary)] border-[var(--accent-primary)] shadow-[var(--shadow-glow)] scale-105 z-10' : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50'}`}>
                            {pkg.isRecommended && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent-primary)] text-white text-[10px] font-bold uppercase px-4 py-1 rounded-full shadow-lg tracking-widest">
                                    Recomandat
                                </div>
                            )}

                            <h4 className="text-white font-display font-bold text-xl mb-2 uppercase tracking-wide">{pkg.title}</h4>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-3xl font-bold text-white">{pkg.price}</span>
                                <span className="text-xs font-bold text-[var(--text-muted)] uppercase">RON</span>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {pkg.features.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-3 text-xs font-medium text-[var(--text-secondary)] leading-relaxed">
                                        <Check size={14} className="text-[var(--accent-primary)] shrink-0 mt-0.5" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={pkg.isRecommended ? 'primary' : 'secondary'}
                                className="w-full justify-center"
                                onClick={() => handleCheckout(pkg.stripePriceId, pkg.price, pkg.title, session)}
                                isLoading={isLoading}
                            >
                                Alege Plan
                            </Button>
                        </div>
                    ))}
                </div>

                {/* PROGRAMS SECTION */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <Target className="text-[var(--accent-primary)]" size={20} />
                        <span className="text-xs font-bold tracking-widest text-[var(--accent-primary)] uppercase">Programe Specializate</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-16 uppercase italic">
                        Construiește-ți <span className="text-[var(--accent-primary)]">Corpul Ideal.</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-1 gap-12">
                    {PROGRAMS.map((prog, i) => (
                        <div key={prog.id} className="group relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[var(--radius-2xl)] overflow-hidden flex flex-col md:flex-row hover:border-[var(--accent-primary)] transition-all shadow-xl">

                            {/* Image */}
                            <Link to={`/program/${prog.id}`} className="block relative md:w-2/5 lg:w-1/3 min-h-[300px] md:min-h-0 overflow-hidden">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img
                                    src={prog.image}
                                    alt={prog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className={`absolute top-6 left-6 z-20 ${prog.tagColor || 'bg-[var(--accent-primary)]'} text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg`}>
                                    {prog.tag}
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-[10px] text-[var(--accent-primary)] font-bold uppercase tracking-widest block mb-2">Obiectiv: {prog.idealFor}</span>
                                            <Link to={`/program/${prog.id}`}>
                                                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 uppercase group-hover:text-[var(--accent-primary)] transition-colors">
                                                    {prog.title}
                                                </h3>
                                            </Link>
                                        </div>
                                    </div>

                                    <p className="text-[var(--accent-primary)] text-xs font-bold uppercase tracking-widest mb-6 border-l-2 border-[var(--accent-primary)] pl-3">
                                        {prog.subtitle}
                                    </p>

                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 max-w-2xl">
                                        {prog.description}
                                    </p>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 items-center pt-8 border-t border-[var(--border-subtle)] mt-auto">
                                    <div className="mr-auto">
                                        <span className="text-2xl font-bold text-white">{prog.price}</span>
                                    </div>
                                    <div className="flex w-full md:w-auto gap-4">
                                        <Link to={`/program/${prog.id}`} className="flex-1 md:flex-none">
                                            <Button variant="secondary" className="w-full">
                                                Detalii
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="primary"
                                            className="flex-1 md:flex-none min-w-[170px]"
                                            onClick={() => prog.stripePriceId && handleCheckout(prog.stripePriceId, prog.price!, prog.title, session)}
                                            isLoading={isLoading}
                                        >
                                            Vreau Programul
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
