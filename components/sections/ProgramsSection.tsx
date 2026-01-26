import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Target, Zap, MoveUpRight, Baby, Users, Dumbbell, Calendar, Crown } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PROGRAMS, MONTHLY_PACKAGES, QUARTERLY_PACKAGES } from '../../constants';
import { useStripeCheckout } from '../../lib/useStripeCheckout';
import { Session } from '@supabase/supabase-js';
import { useDraggableScroll } from '../../lib/useDraggableScroll';

export const ProgramsSection = () => {
    const { session } = useOutletContext<{ session: Session | null }>();
    const { handleCheckout, isLoading } = useStripeCheckout();
    const scrollRef = useDraggableScroll();

    const [pricingPeriod, setPricingPeriod] = useState<'monthly' | 'quarterly'>('monthly');
    const currentPackages = pricingPeriod === 'monthly' ? MONTHLY_PACKAGES : QUARTERLY_PACKAGES;

    const getIcon = (iconId: string) => {
        switch (iconId) {
            case 'zap': return <Zap size={20} />;
            case 'baby': return <Baby size={20} />;
            case 'users': return <Users size={20} />;
            case 'muscle': return <Dumbbell size={20} />;
            case 'calendar': return <Calendar size={20} />;
            case 'target': return <Target size={20} />;
            case 'crown': return <Crown size={20} />;
            default: return <Zap size={20} />;
        }
    };

    return (
        <section id="programe" className="py-8 lg:py-[5vh] bg-transparent relative z-20 border-t border-white/5 flex flex-col justify-center">
            <div className="container mx-auto px-6 md:px-24">
                <ScrollReveal>
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <Target className="text-[#3A86FF]" size={16} />
                                <span className="mono-font text-[10px] tracking-[0.5em] text-[#3A86FF] font-black uppercase">Începe Transformarea</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black impact-font text-white uppercase leading-[0.8] heading-glow">
                                ALEGE <br /><span className="text-transparent" style={{ WebkitTextStroke: '2px #3A86FF' }}>OBIECTIVUL.</span>
                            </h2>
                        </div>
                        <p className="text-gray-200 max-w-md text-right text-xs font-medium leading-relaxed hidden md:block readable-text bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                            Fie că vrei să slăbești, să scapi de dureri sau să crești masa musculară, avem un plan exact pentru tine.
                        </p>
                    </div>
                </ScrollReveal>

                <div ref={scrollRef} className="flex gap-6 md:gap-10 overflow-x-auto pb-12 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar overscroll-x-contain cursor-grab active:cursor-grabbing">
                    {PROGRAMS.map((prog, i) => (
                        <div key={prog.id} className="min-w-[85vw] md:min-w-[400px] flex-shrink-0 snap-center">
                            <div className="group relative h-full bg-[#0a0a0a] border-none transition-all duration-700 overflow-hidden flex flex-col rounded-[2rem] shadow-2xl gradient-border-spin">
                                <Link to={`/program/${prog.id}`} className="relative h-48 lg:h-64 overflow-hidden block">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-transparent to-blue-900/40 mix-blend-overlay z-20 pointer-events-none"></div>
                                    <img src={prog.image} className="absolute inset-0 w-full h-full object-cover reveal-color transform transition-transform duration-1000 group-hover:scale-110" alt={prog.title} loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 z-20"></div>
                                    <div className={`absolute top-6 left-6 z-10 ${prog.tagColor || 'bg-[#3A86FF]'} text-black px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full`}>{prog.tag}</div>
                                    <div className="absolute top-6 right-6 z-10 bg-black/60 backdrop-blur-xl px-4 py-1.5 text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 rounded-full">{prog.duration}</div>
                                </Link>

                                <div className="p-6 lg:p-8 flex flex-col flex-1 relative z-10 -mt-6 bg-gradient-to-b from-[#0a0a0a]/80 to-[#0a0a0a] backdrop-blur-md rounded-t-[2rem]">
                                    <span className="text-[10px] text-[#3A86FF] font-black uppercase tracking-[0.2em] block mb-2">OBIECTIV: {prog.idealFor}</span>
                                    <Link to={`/program/${prog.id}`}><h3 className="text-2xl md:text-3xl font-black impact-font text-white mb-2 uppercase tracking-tighter truncate group-hover:text-[#3A86FF] transition-colors">{prog.title}</h3></Link>
                                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4 border-l-2 border-[#3A86FF] pl-4">{prog.subtitle}</p>
                                    <p className="text-white/40 text-xs leading-relaxed mb-6 flex-grow line-clamp-3">{prog.description}</p>

                                    <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-2xl font-black text-white">{prog.price}</span>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#3A86FF]">{getIcon(prog.iconId || 'zap')}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link to={`/program/${prog.id}`} className="w-full py-3 bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/10 transition-all">Detalii</Link>
                                            <button
                                                onClick={() => prog.stripePriceId && handleCheckout(prog.stripePriceId, prog.price!, prog.title, session)}
                                                disabled={isLoading}
                                                className="w-full py-3 bg-[#3A86FF] text-black text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded-xl"
                                            >
                                                {isLoading ? '...' : 'Alege'} <MoveUpRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PRICING SECTION */}
                <div className="mt-16 pt-16 border-t border-white/5">
                    <ScrollReveal>
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black impact-font text-white uppercase mb-2">ABONAMENTE.</h2>
                                <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Investește în tine</p>
                            </div>
                            <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                                <button
                                    onClick={() => setPricingPeriod('monthly')}
                                    className={`px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${pricingPeriod === 'monthly' ? 'bg-[#3A86FF] text-black' : 'text-white/40 hover:text-white'}`}
                                >
                                    Lunar
                                </button>
                                <button
                                    onClick={() => setPricingPeriod('quarterly')}
                                    className={`px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${pricingPeriod === 'quarterly' ? 'bg-[#3A86FF] text-black' : 'text-white/40 hover:text-white'}`}
                                >
                                    3 Luni
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {currentPackages.map((pkg, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-[#3A86FF]/30 transition-all flex flex-col">
                                {pkg.isRecommended && <div className="absolute top-0 right-0 bg-[#3A86FF] text-black text-[8px] font-black uppercase px-3 py-1 rounded-bl-lg">Popular</div>}
                                <h4 className="text-white font-black impact-font text-xl mb-1 uppercase tracking-tighter">{pkg.title}</h4>
                                <div className="flex items-baseline gap-1 mb-6 text-[#3A86FF]">
                                    <span className="text-3xl font-black">{pkg.price}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">RON</span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {pkg.features.map((f, fi) => (
                                        <li key={fi} className="flex items-center gap-3 text-[10px] font-bold text-white/60 uppercase tracking-tight">
                                            <Zap size={10} className="text-[#3A86FF]" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleCheckout(pkg.stripePriceId, pkg.price, pkg.title, session)}
                                    className="w-full py-3 bg-[#3A86FF] hover:bg-[#3A86FF]/90 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all"
                                >
                                    Alege Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
